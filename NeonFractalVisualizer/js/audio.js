// V4 Audio Engine — Mic-only, FFT/waveform textures, spectral flux beat detection

export class AudioEngine {
    constructor() {
        this.context = null;
        this.analyser = null;
        this.source = null;

        this.frequencyData = null;
        this.timeDomainData = null;

        // 5-band envelope followers
        this.envelopes = { bass: 0, lowMid: 0, mid: 0, highMid: 0, high: 0, rms: 0 };

        // Fixed: attack = fast rise, release = slow decay
        this.envelopeParams = {
            bass:    { attack: 0.6,  release: 0.05 },
            lowMid:  { attack: 0.55, release: 0.045 },
            mid:     { attack: 0.5,  release: 0.04 },
            highMid: { attack: 0.6,  release: 0.035 },
            high:    { attack: 0.7,  release: 0.03 },
            rms:     { attack: 0.5,  release: 0.04 },
        };

        // Spectral flux beat detection — separate for bass, mid, high
        this._prevSpectrum = { bass: null, mid: null, high: null };
        this._fluxHistory = {
            bass: new Float32Array(120),
            mid:  new Float32Array(120),
            high: new Float32Array(120),
        };
        this._fluxIdx = { bass: 0, mid: 0, high: 0 };
        this.beats = { bass: 0, mid: 0, high: 0 };

        // Audio textures (WebGL) — created externally, updated here
        this._fftFloat = null;       // Float32Array for FFT upload
        this._waveFloat = null;      // Float32Array for waveform upload
        this.fftTextureData = null;   // Float32Array(512)
        this.waveformTextureData = null; // Float32Array(1024)

        // Sensitivity
        this.sensitivity = { bass: 1.0, lowMid: 1.0, mid: 1.0, highMid: 1.0, high: 1.0, rms: 1.0 };
        this.reactivityMultiplier = 1.5;

        this.active = false;
        this._micStream = null;

        // T1: Pre-allocated spectrum buffers (avoids per-frame allocation)
        this._spectrumBuffers = {
            bass: new Float32Array(2048),
            mid:  new Float32Array(2048),
            high: new Float32Array(2048),
        };

        // T2: Source type tracking
        this._sourceType = 'none';
        this._audioElement = null;
        this._audioElementURL = null;

        // T3: Simulation state
        this._simMode = null;
        this._simStartTime = 0;
        this._simOptions = {};

        // T4: Last spectral centroid for serializeState()
        this._lastSpectralCentroid = 0.5;
    }

    get sourceType() {
        return this._sourceType;
    }

    _ensureContext() {
        if (!this.context) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.context.createAnalyser();
            this.analyser.fftSize = 4096;
            this.analyser.smoothingTimeConstant = 0.7;
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.timeDomainData = new Uint8Array(this.analyser.fftSize);

            // Pre-allocate float buffers for GPU texture upload
            this.fftTextureData = new Float32Array(512);
            this.waveformTextureData = new Float32Array(1024);
        }
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }

    async connectMicrophone() {
        this._ensureContext();
        this.disconnect();

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                }
            });
            this.source = this.context.createMediaStreamSource(stream);
            this.source.connect(this.analyser);
            this.active = true;
            this._micStream = stream;
            this._sourceType = 'mic';
            return true;
        } catch (err) {
            console.error('Microphone access denied:', err);
            return false;
        }
    }

    // T2: Connect an audio File object for playback + analysis
    connectFile(file) {
        this._ensureContext();
        this.disconnect();

        const url = URL.createObjectURL(file);
        const el = new Audio();
        el.src = url;
        el.loop = true;
        this._audioElement = el;
        this._audioElementURL = url;

        this.source = this.context.createMediaElementSource(el);
        this.source.connect(this.analyser);
        this.source.connect(this.context.destination);

        el.play();
        this.active = true;
        this._sourceType = 'file';
    }

    disconnect() {
        if (this.source) {
            try { this.source.disconnect(); } catch (e) { /* ignore */ }
            this.source = null;
        }
        if (this._micStream) {
            this._micStream.getTracks().forEach(t => t.stop());
            this._micStream = null;
        }
        if (this._audioElement) {
            this._audioElement.pause();
            this._audioElement = null;
        }
        if (this._audioElementURL) {
            URL.revokeObjectURL(this._audioElementURL);
            this._audioElementURL = null;
        }
        if (this.analyser) {
            try { this.analyser.disconnect(); } catch (e) { /* ignore */ }
        }
        this.active = false;
        this._sourceType = 'none';
        this._simMode = null;
        for (const k in this.envelopes) this.envelopes[k] = 0;
        this.beats = { bass: 0, mid: 0, high: 0 };
    }

    // T3: Start audio simulation
    startSimulation(mode, options) {
        this._ensureContext();
        this.disconnect();

        this._sourceType = 'simulation';
        this._simMode = mode;
        this._simStartTime = performance.now();
        this._simOptions = options || {};
        this.active = true;
    }

    // T3: Stop audio simulation
    stopSimulation() {
        this.disconnect();
    }

    // T3: Fill frequencyData and timeDomainData with synthetic values for the current sim mode
    _generateSimulatedData() {
        const elapsed = (performance.now() - this._simStartTime) / 1000; // seconds
        const binCount = this.analyser.frequencyBinCount; // 2048
        const fftSize = this.analyser.fftSize; // 4096
        const mode = this._simMode;

        // Default: silence
        this.frequencyData.fill(0);
        this.timeDomainData.fill(128);

        if (mode === 'silence') {
            // already set above

        } else if (mode === 'bass_hit') {
            const amp = Math.round(255 * Math.exp(-elapsed * 4));
            for (let i = 0; i <= 15 && i < binCount; i++) {
                this.frequencyData[i] = amp;
            }
            // low-freq sine in time domain
            for (let i = 0; i < fftSize; i++) {
                const v = Math.sin(2 * Math.PI * 60 * i / (this.context.sampleRate || 48000));
                this.timeDomainData[i] = Math.round(128 + 64 * v * Math.exp(-elapsed * 4));
            }

        } else if (mode === 'steady_tone') {
            // 440 Hz -> bin ~ 440 / (sampleRate / fftSize)
            const sr = this.context.sampleRate || 48000;
            const binWidth = sr / fftSize;
            const toneBin = Math.round(440 / binWidth);
            const spread = 3;
            for (let i = Math.max(0, toneBin - spread); i <= Math.min(binCount - 1, toneBin + spread); i++) {
                const dist = Math.abs(i - toneBin);
                this.frequencyData[i] = Math.round(180 * (1 - dist / (spread + 1)));
            }
            // background low noise
            for (let i = 0; i < binCount; i++) {
                if (this.frequencyData[i] === 0) this.frequencyData[i] = Math.round(Math.random() * 10);
            }

        } else if (mode === 'frequency_sweep') {
            // sweep from bin 0 to bin 1024 over 5 seconds, looping
            const sweepBin = Math.floor(((elapsed % 5) / 5) * 1024);
            const spread = 10;
            for (let i = Math.max(0, sweepBin - spread); i <= Math.min(binCount - 1, sweepBin + spread); i++) {
                const dist = Math.abs(i - sweepBin);
                this.frequencyData[i] = Math.round(200 * (1 - dist / (spread + 1)));
            }

        } else if (mode === 'full_spectrum') {
            for (let i = 0; i < binCount; i++) {
                this.frequencyData[i] = Math.round(50 + Math.random() * 100);
            }
            for (let i = 0; i < fftSize; i++) {
                this.timeDomainData[i] = Math.round(128 + (Math.random() - 0.5) * 40);
            }

        } else if (mode === 'beat_pattern') {
            // 120 BPM = pulse every 500ms; 100ms attack, 400ms decay
            const beatPeriod = 0.5;
            const phaseInBeat = elapsed % beatPeriod;
            let amp;
            if (phaseInBeat < 0.1) {
                amp = phaseInBeat / 0.1; // attack
            } else {
                amp = 1 - (phaseInBeat - 0.1) / 0.4; // decay
            }
            amp = Math.max(0, amp);
            // Bass bins get the pulse
            const bassBins = 20;
            for (let i = 0; i < bassBins && i < binCount; i++) {
                this.frequencyData[i] = Math.round(220 * amp);
            }
            // Low-frequency sine in time domain
            const sr = this.context.sampleRate || 48000;
            for (let i = 0; i < fftSize; i++) {
                const v = Math.sin(2 * Math.PI * 80 * i / sr);
                this.timeDomainData[i] = Math.round(128 + 80 * v * amp);
            }
        }
    }

    // Get average energy in a frequency range
    _getBandEnergy(lowFreq, highFreq) {
        if (!this.analyser || !this.frequencyData) return 0;
        const sr = this.context.sampleRate;
        const binCount = this.analyser.frequencyBinCount;
        const binWidth = sr / (binCount * 2);
        const lo = Math.max(0, Math.floor(lowFreq / binWidth));
        const hi = Math.min(binCount - 1, Math.ceil(highFreq / binWidth));
        let sum = 0, count = 0;
        for (let i = lo; i <= hi; i++) {
            sum += this.frequencyData[i] / 255.0;
            count++;
        }
        return count > 0 ? sum / count : 0;
    }

    // T1: Get raw spectrum slice for spectral flux — writes into pre-allocated buffer
    _getBandSpectrum(bandKey, lowFreq, highFreq) {
        const sr = this.context.sampleRate;
        const binCount = this.analyser.frequencyBinCount;
        const binWidth = sr / (binCount * 2);
        const lo = Math.max(0, Math.floor(lowFreq / binWidth));
        const hi = Math.min(binCount - 1, Math.ceil(highFreq / binWidth));
        const buf = this._spectrumBuffers[bandKey];
        const length = hi - lo + 1;
        for (let i = lo; i <= hi; i++) {
            buf[i - lo] = this.frequencyData[i] / 255.0;
        }
        return { buffer: buf, length };
    }

    _getRMS() {
        if (!this.analyser || !this.timeDomainData) return 0;
        // In simulation mode, timeDomainData is already filled by _generateSimulatedData
        if (this._sourceType !== 'simulation') {
            this.analyser.getByteTimeDomainData(this.timeDomainData);
        }
        let sum = 0;
        for (let i = 0; i < this.timeDomainData.length; i++) {
            const v = (this.timeDomainData[i] - 128) / 128.0;
            sum += v * v;
        }
        return Math.sqrt(sum / this.timeDomainData.length);
    }

    _applyEnvelope(key, rawValue) {
        const params = this.envelopeParams[key];
        const current = this.envelopes[key];
        if (rawValue > current) {
            this.envelopes[key] = current + params.attack * (rawValue - current);
        } else {
            this.envelopes[key] = current + params.release * (rawValue - current);
        }
        return this.envelopes[key];
    }

    // T1: Spectral flux beat detection — uses pre-allocated buffer return format
    _detectBeat(bandKey, lowFreq, highFreq) {
        const current = this._getBandSpectrum(bandKey, lowFreq, highFreq);
        const prev = this._prevSpectrum[bandKey];

        let flux = 0;
        if (prev && prev.length === current.length) {
            for (let i = 0; i < current.length; i++) {
                const diff = current.buffer[i] - prev.buffer[i];
                if (diff > 0) flux += diff;
            }
            flux /= current.length;
        }

        // Copy current buffer into prev storage (reuse the slot)
        if (!prev || prev.length !== current.length) {
            this._prevSpectrum[bandKey] = { buffer: new Float32Array(current.buffer.subarray(0, current.length)), length: current.length };
        } else {
            prev.buffer.set(current.buffer.subarray(0, current.length));
            prev.length = current.length;
        }

        // Store in history
        const hist = this._fluxHistory[bandKey];
        const idx = this._fluxIdx[bandKey];
        hist[idx] = flux;
        this._fluxIdx[bandKey] = (idx + 1) % hist.length;

        // Adaptive threshold: mean + 1.5 * stddev
        let mean = 0;
        for (let i = 0; i < hist.length; i++) mean += hist[i];
        mean /= hist.length;

        let variance = 0;
        for (let i = 0; i < hist.length; i++) {
            const d = hist[i] - mean;
            variance += d * d;
        }
        const stddev = Math.sqrt(variance / hist.length);
        const threshold = mean + 1.5 * stddev;

        if (flux > threshold && flux > 0.01) {
            // Beat strength: how much above threshold (0-1 clamped)
            return Math.min(1.0, (flux - threshold) / (mean + 0.01) * 2.0);
        }
        return 0;
    }

    // Compute spectral centroid (0-1, brightness of sound)
    _getSpectralCentroid() {
        if (!this.frequencyData) return 0.5;
        let weightedSum = 0, totalEnergy = 0;
        const binCount = Math.min(512, this.analyser.frequencyBinCount);
        for (let i = 0; i < binCount; i++) {
            const mag = this.frequencyData[i] / 255.0;
            weightedSum += i * mag;
            totalEnergy += mag;
        }
        if (totalEnergy < 0.01) return 0.5;
        return Math.min(1.0, (weightedSum / totalEnergy) / binCount * 2.0);
    }

    // Update FFT texture data (512 floats)
    _updateFFTTextureData() {
        if (!this.fftTextureData || !this.frequencyData) return;
        const binCount = this.analyser.frequencyBinCount;
        const step = binCount / 512;
        for (let i = 0; i < 512; i++) {
            const bin = Math.floor(i * step);
            this.fftTextureData[i] = this.frequencyData[Math.min(bin, binCount - 1)] / 255.0;
        }
    }

    // Update waveform texture data (1024 floats, 0-1 range)
    _updateWaveformTextureData() {
        if (!this.waveformTextureData || !this.timeDomainData) return;
        const len = this.timeDomainData.length;
        const step = len / 1024;
        for (let i = 0; i < 1024; i++) {
            const idx = Math.floor(i * step);
            // Map from 0-255 to -1..1, then store as 0..1
            this.waveformTextureData[i] = (this.timeDomainData[Math.min(idx, len - 1)] - 128) / 128.0;
        }
    }

    // T4: Serialize current audio state for external consumers
    serializeState() {
        return {
            active: this.active,
            sourceType: this._sourceType,
            simMode: this._simMode || null,
            bands: {
                bass:    this.envelopes.bass,
                lowMid:  this.envelopes.lowMid,
                mid:     this.envelopes.mid,
                highMid: this.envelopes.highMid,
                high:    this.envelopes.high,
            },
            rms: this.envelopes.rms,
            beats: { ...this.beats },
            spectralCentroid: this._lastSpectralCentroid,
        };
    }

    // Call every frame
    analyze() {
        if (!this.active || !this.analyser) {
            return {
                bass: 0, lowMid: 0, mid: 0, highMid: 0, high: 0, rms: 0,
                beats: { bass: 0, mid: 0, high: 0 },
                spectralCentroid: 0.5,
                active: false,
            };
        }

        // T3: If simulating, fill data arrays synthetically instead of reading from analyser
        if (this._sourceType === 'simulation') {
            this._generateSimulatedData();
        } else {
            // Get FFT + time domain data from real source
            this.analyser.getByteFrequencyData(this.frequencyData);
        }

        // Band energies with envelope followers
        const bass    = this._applyEnvelope('bass',    this._getBandEnergy(20, 150))    * this.sensitivity.bass;
        const lowMid  = this._applyEnvelope('lowMid',  this._getBandEnergy(150, 500))   * this.sensitivity.lowMid;
        const mid     = this._applyEnvelope('mid',     this._getBandEnergy(500, 2000))   * this.sensitivity.mid;
        const highMid = this._applyEnvelope('highMid', this._getBandEnergy(2000, 6000))  * this.sensitivity.highMid;
        const high    = this._applyEnvelope('high',    this._getBandEnergy(6000, 16000))  * this.sensitivity.high;
        const rms     = this._applyEnvelope('rms',     this._getRMS())                   * this.sensitivity.rms;

        // Beat detection
        const beats = {
            bass: this._detectBeat('bass', 20, 150),
            mid:  this._detectBeat('mid', 500, 2000),
            high: this._detectBeat('high', 2000, 16000),
        };

        const spectralCentroid = this._getSpectralCentroid();
        this._lastSpectralCentroid = spectralCentroid; // T4: store for serializeState

        // Update texture data
        this._updateFFTTextureData();
        this._updateWaveformTextureData();

        const mult = this.reactivityMultiplier;
        return {
            bass: Math.min(1.0, bass * mult),
            lowMid: Math.min(1.0, lowMid * mult),
            mid: Math.min(1.0, mid * mult),
            highMid: Math.min(1.0, highMid * mult),
            high: Math.min(1.0, high * mult),
            rms: Math.min(1.0, rms * mult),
            beats,
            spectralCentroid,
            active: true,
        };
    }
}
