// Pulse wave manager and audio-to-visual state mapping

const MAX_PULSES = 8;

class PulseWave {
    constructor(strength, speed = 2.0) {
        this.position = 0.0;
        this.strength = strength;
        this.speed = speed;
        this.age = 0.0;
        this.maxAge = 2.0;
    }

    update(dt) {
        this.age += dt;
        this.position += this.speed * dt;
        this.strength *= Math.pow(0.12, dt); // ~88% decay per second
        return this.age < this.maxAge && this.strength > 0.005;
    }
}

export class Visualizer {
    constructor() {
        this.pulses = [];

        // Uniform arrays for shader
        this.pulsePositions = new Float32Array(MAX_PULSES);
        this.pulseStrengths = new Float32Array(MAX_PULSES);

        // Smoothed beat flash (fast attack, slow decay)
        this.beatFlash = 0;

        // Accumulated slow drift values (only move with audio)
        this.paletteRotation = 0;
        this.rotation = 0;
        this.breathScale = 1.0;

        // Camera config — all tweakable from the UI
        this.cameraConfig = {
            orbitSpeed: 0.1,          // base radians/sec (higher = faster circling)
            orbitRadius: 0.35,        // orbit size relative to waypoint scale
            migrationSpeed: 0.05,     // how fast orbit center drifts to next waypoint
            waypointHangTime: 25,     // base seconds at each waypoint
            waypointHangRandom: 15,   // random extra seconds (total = hang + random*Math.random)
            zoomDepth: 0.38,          // base zoom as fraction of waypoint scale (lower = closer)
            zoomMin: 0.2,             // minimum zoom depth
            rotationSpeed: 0.008,     // base radians/sec view rotation
            musicOrbitInfluence: 0.5, // 0 = no music on orbit, 1 = full
            musicZoomInfluence: 0.5,  // 0 = no music on zoom, 1 = full
            musicRotInfluence: 0.5,   // 0 = no music on rotation, 1 = full
            breathAmount: 0.05,       // beat zoom pulse strength
        };

        // Camera runtime state
        this.cameraCenter = [0, 0];
        this.cameraScale = 1.8;
        this._orbitCenter = [0, 0];
        this._attractor = [0, 0];
        this._attractorScale = 0.5;
        this._attractorTimer = 0;
        this._attractorInterval = 25;
        this._lastAttractorIdx = -1;
        this._currentInterestPoints = [];
        this._orbitAngle = Math.random() * Math.PI * 2;
        this._orbitRadius = 0.15;

        // C parameter drift for Julia
        this.cDriftReal = 0;
        this.cDriftImag = 0;

        // Noise warp intensity (passed to shader)
        this.noiseWarpAmount = 0;

        // Fractal transition state
        this.transitionActive = false;
        this.transitionProgress = 0;
        this.transitionFromType = null;
        this.transitionDuration = 6.0; // default, overridden by autoPilotConfig

        // Auto-pilot configuration
        this.autoPilotConfig = {
            enabledFractals: null,  // null = all enabled; otherwise Set of fractal keys
            fadeDuration: 6.0,      // seconds for crossfade
            timeBetweenFades: 10.0, // seconds of pure display before next fade starts
            autoPalette: true,      // also cycle palettes
            enabledPalettes: null,  // null = all enabled; otherwise Set of palette names
        };

        // Auto-pilot recent history
        this._recentFractals = [];
        this._recentPalettes = [];

        // Pulse wave spatial distortion toggle (off by default)
        this.pulseWarpEnabled = false;
    }

    update(audioData, dt) {
        if (!audioData.active) {
            // When no audio, decay everything toward zero
            this.beatFlash *= Math.pow(0.01, dt);
            for (let i = 0; i < MAX_PULSES; i++) {
                this.pulsePositions[i] = 0;
                this.pulseStrengths[i] = 0;
            }
            return;
        }

        const { bass, lowMid, mid, highMid, high, rms, beats, spectralCentroid } = audioData;

        // --- Spawn pulse waves on strong beats only (for composite color flash) ---
        if (beats.bass > 0.4) {
            this._spawnPulse(beats.bass * 0.7, 1.8 + bass);
        }
        if (beats.mid > 0.6) {
            this._spawnPulse(beats.mid * 0.4, 2.5);
        }

        // --- Update active pulses ---
        this.pulses = this.pulses.filter(p => p.update(dt));

        // Write to uniform arrays
        for (let i = 0; i < MAX_PULSES; i++) {
            if (i < this.pulses.length) {
                this.pulsePositions[i] = this.pulses[i].position;
                this.pulseStrengths[i] = this.pulses[i].strength;
            } else {
                this.pulsePositions[i] = 0;
                this.pulseStrengths[i] = 0;
            }
        }

        // --- Beat flash (fast up, medium decay) ---
        const flashImpulse = beats.bass * 0.8 + beats.mid * 0.3 + beats.high * 0.15;
        if (flashImpulse > this.beatFlash) {
            this.beatFlash = Math.min(1.0, flashImpulse);
        } else {
            this.beatFlash *= Math.pow(0.05, dt); // decay over ~0.3s
        }

        // --- Slow drift (accumulates only when audio is active) ---
        this.paletteRotation = (this.paletteRotation + high * 0.003 + this.beatFlash * 0.015) % 1.0;
        this.rotation += bass * 0.001 + mid * 0.0003;

        // --- ORBITING CAMERA (all values from cameraConfig) ---
        const cc = this.cameraConfig;
        const mi = cc.musicOrbitInfluence;
        this._attractorTimer += dt;

        // Pick next attractor on timer
        if (this._attractorTimer >= this._attractorInterval && this._currentInterestPoints.length > 0) {
            this._pickNextAttractor();
            this._attractorInterval = cc.waypointHangTime + Math.random() * cc.waypointHangRandom;
        }

        // Orbit center migrates toward attractor
        const migrationSpeed = cc.migrationSpeed + bass * 0.02 * mi;
        this._orbitCenter[0] += (this._attractor[0] - this._orbitCenter[0]) * dt * migrationSpeed;
        this._orbitCenter[1] += (this._attractor[1] - this._orbitCenter[1]) * dt * migrationSpeed;

        // Orbit radius
        const targetRadius = this._attractorScale * (cc.orbitRadius + rms * 0.1 * mi);
        this._orbitRadius += (targetRadius - this._orbitRadius) * dt * 0.15;

        // Orbit speed
        const orbitSpeed = cc.orbitSpeed + (rms * 0.04 + this.beatFlash * 0.08) * mi;
        this._orbitAngle += orbitSpeed * dt;

        // Camera position = orbit center + circular offset + wobble
        const wobble = Math.sin(this._orbitAngle * 0.37) * this._orbitRadius * 0.3;
        this.cameraCenter[0] = this._orbitCenter[0]
            + Math.cos(this._orbitAngle) * this._orbitRadius
            + Math.cos(this._orbitAngle * 0.6) * wobble;
        this.cameraCenter[1] = this._orbitCenter[1]
            + Math.sin(this._orbitAngle) * this._orbitRadius
            + Math.sin(this._orbitAngle * 0.8) * wobble;

        // Zoom
        const mzi = cc.musicZoomInfluence;
        const musicDepth = -rms * 0.12 * mzi;
        const zoomCycle = Math.sin(this._orbitAngle * 0.15) * 0.06;
        const targetScale = this._attractorScale * Math.max(cc.zoomMin, cc.zoomDepth + musicDepth + zoomCycle);
        this.cameraScale += (targetScale - this.cameraScale) * dt * 0.25;

        // Rotation
        const mri = cc.musicRotInfluence;
        this.rotation += (cc.rotationSpeed + bass * 0.006 * mri) * dt;

        // Beat-driven zoom pulse
        const targetBreath = 1.0 - this.beatFlash * cc.breathAmount;
        this.breathScale += (targetBreath - this.breathScale) * Math.min(1.0, dt * 10.0);

        // Noise warp amount — gentle organic flow, spikes briefly on beats
        const targetNoise = rms * 0.1 + this.beatFlash * 0.15;
        this.noiseWarpAmount += (targetNoise - this.noiseWarpAmount) * Math.min(1.0, dt * 6.0);

        // C parameter drift for Julia-type fractals (subtle wandering)
        this.cDriftReal += Math.sin(this.rotation * 3.0) * rms * 0.001;
        this.cDriftImag += Math.cos(this.rotation * 2.5) * rms * 0.001;
        this.cDriftReal *= Math.pow(0.7, dt);
        this.cDriftImag *= Math.pow(0.7, dt);

        // --- Fractal transition progress (skip if manual blend — slider controls it) ---
        if (this.transitionActive && !this.manualBlend) {
            this.transitionProgress += dt / this.transitionDuration;
            let t = this.transitionProgress;
            if (t >= 1.0) {
                this.transitionProgress = 1.0;
                this.transitionActive = false;
                this.transitionFromType = null;
            }
        }
    }

    setInterestPoints(points, defaultView) {
        const isFirstSetup = this._currentInterestPoints.length === 0 && (points?.length > 0 || defaultView);
        this._currentInterestPoints = points || [];
        if (this._currentInterestPoints.length > 0) {
            this._pickNextAttractor();
            // Only snap orbit center on very first setup — after that, let it migrate
            if (isFirstSetup) {
                this._orbitCenter = [...this._attractor];
            }
        } else if (defaultView) {
            this._attractor = [...defaultView.center];
            this._attractorScale = defaultView.scale * 0.3;
            if (isFirstSetup) {
                this._orbitCenter = [...defaultView.center];
            }
        }
    }

    _pickNextAttractor() {
        const pts = this._currentInterestPoints;
        if (pts.length === 0) return;
        let idx;
        if (pts.length === 1) {
            idx = 0;
        } else {
            do {
                idx = Math.floor(Math.random() * pts.length);
            } while (idx === this._lastAttractorIdx);
        }
        this._lastAttractorIdx = idx;
        this._attractor = [...pts[idx].center];
        this._attractorScale = pts[idx].scale;
        this._attractorTimer = 0;
    }

    startTransition(fromType) {
        this.transitionActive = true;
        this.transitionProgress = 0;
        this.transitionFromType = fromType;
        this.manualBlend = false; // auto-pilot transition, not manual
    }

    // Manual blend: set two fractal types and a crossfade amount (0-1)
    setManualBlend(fractalA, fractalB, mix) {
        this.transitionFromType = fractalA;
        this.transitionActive = true;
        this.transitionProgress = mix;
        this.manualBlend = true;
    }

    clearManualBlend() {
        if (this.manualBlend) {
            this.transitionActive = false;
            this.transitionFromType = null;
            this.manualBlend = false;
        }
    }

    get transitionEased() {
        // Manual blend uses linear (slider is already the desired position)
        if (this.manualBlend) return this.transitionProgress;
        const t = this.transitionProgress;
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    getAutoPilotRecommendation(fractalNames, paletteNames, currentFractal, currentPalette) {
        const cfg = this.autoPilotConfig;

        // Apply transition duration from config
        this.transitionDuration = cfg.fadeDuration;

        // Filter to enabled fractals
        let candidateFractals = fractalNames;
        if (cfg.enabledFractals && cfg.enabledFractals.size > 0) {
            candidateFractals = fractalNames.filter(f => cfg.enabledFractals.has(f));
            if (candidateFractals.length === 0) candidateFractals = fractalNames; // fallback
        }

        // Pick fractal not in recent history
        let availFractals = candidateFractals.filter(f => !this._recentFractals.includes(f) && f !== currentFractal);
        if (availFractals.length === 0) availFractals = candidateFractals.filter(f => f !== currentFractal);
        if (availFractals.length === 0) availFractals = candidateFractals;
        const fractal = availFractals[Math.floor(Math.random() * availFractals.length)];

        // Pick palette (only if autoPalette is on)
        let palette = null;
        if (cfg.autoPalette) {
            let candidatePalettes = paletteNames;
            if (cfg.enabledPalettes && cfg.enabledPalettes.size > 0) {
                candidatePalettes = paletteNames.filter(p => cfg.enabledPalettes.has(p));
                if (candidatePalettes.length === 0) candidatePalettes = paletteNames;
            }
            let availPalettes = candidatePalettes.filter(p => !this._recentPalettes.includes(p) && p !== currentPalette);
            if (availPalettes.length === 0) availPalettes = candidatePalettes.filter(p => p !== currentPalette);
            if (availPalettes.length === 0) availPalettes = candidatePalettes;
            palette = availPalettes[Math.floor(Math.random() * availPalettes.length)];
            this._recentPalettes.push(palette);
            if (this._recentPalettes.length > 3) this._recentPalettes.shift();
        }

        // Track recent fractals
        this._recentFractals.push(fractal);
        if (this._recentFractals.length > 3) this._recentFractals.shift();

        return { fractal, palette, delay: cfg.fadeDuration + cfg.timeBetweenFades };
    }

    serializeState() {
        return {
            beatFlash: this.beatFlash,
            cameraCenter: [...this.cameraCenter],
            cameraScale: this.cameraScale,
            attractor: [...this._attractor],
            attractorScale: this._attractorScale,
            rotation: this.rotation,
            paletteRotation: this.paletteRotation,
            driftTime: this._driftTime,
            cDriftReal: this.cDriftReal,
            cDriftImag: this.cDriftImag,
            noiseWarpAmount: this.noiseWarpAmount,
            breathScale: this.breathScale,
            activePulses: this.pulses.length,
            pulsePositions: Array.from(this.pulsePositions),
            pulseStrengths: Array.from(this.pulseStrengths),
            transitionActive: this.transitionActive,
            transitionProgress: this.transitionProgress,
            transitionFromType: this.transitionFromType,
        };
    }

    _spawnPulse(strength, speed) {
        if (this.pulses.length >= MAX_PULSES) {
            // Replace weakest pulse
            let minIdx = 0, minStr = this.pulses[0].strength;
            for (let i = 1; i < this.pulses.length; i++) {
                if (this.pulses[i].strength < minStr) {
                    minStr = this.pulses[i].strength;
                    minIdx = i;
                }
            }
            this.pulses[minIdx] = new PulseWave(strength, speed);
        } else {
            this.pulses.push(new PulseWave(strength, speed));
        }
    }

    // Build uniforms to send to the fractal shader
    getAudioUniforms(audioData) {
        return {
            u_bassEnergy: audioData.active ? audioData.bass : 0,
            u_lowMidEnergy: audioData.active ? audioData.lowMid : 0,
            u_midEnergy: audioData.active ? audioData.mid : 0,
            u_highMidEnergy: audioData.active ? audioData.highMid : 0,
            u_highEnergy: audioData.active ? audioData.high : 0,
            u_rmsEnergy: audioData.active ? audioData.rms : 0,
            u_beatFlash: this.beatFlash,
            u_spectralCentroid: audioData.active ? audioData.spectralCentroid : 0.5,
            u_pulsePositions: this.pulsePositions,
            u_pulseStrengths: this.pulseStrengths,
            u_breathScale: this.breathScale,
            u_noiseWarpAmount: this.noiseWarpAmount,
            u_pulseWarpEnabled: this.pulseWarpEnabled ? 1 : 0,
        };
    }

    // Build post-processing uniforms modulated by audio
    // The composite shader has ACES tone mapping, so we can be more generous here
    getPostProcessUniforms(audioData, baseState) {
        const rms = audioData.active ? audioData.rms : 0;
        const bass = audioData.active ? audioData.bass : 0;
        const mid = audioData.active ? audioData.mid : 0;
        const flash = this.beatFlash;

        return {
            u_gamma: baseState.gamma,
            u_brightness: baseState.brightness + rms * 0.2 + flash * 0.25,
            u_contrast: baseState.contrast + mid * 0.1,
            u_vibrancy: Math.min(baseState.vibrancy + rms * 0.3 + flash * 0.2, 1.8),
            u_highlightPower: baseState.highlightPower + flash * 0.6,
            u_bloomIntensity: baseState.bloomIntensity * (1.0 + rms * 0.5 + flash * 1.2),
            u_bloomThreshold: Math.max(0.2, baseState.bloomThreshold - bass * 0.12 - flash * 0.1),
            u_vignetteStrength: baseState.vignetteStrength,
        };
    }
}
