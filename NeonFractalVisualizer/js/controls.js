// V4 Control Panel — Simplified for music-first experience

import { FRACTAL_TYPES, FRACTAL_NAMES } from './fractals.js';
import { PALETTE_NAMES, PALETTE_DEFINITIONS, PALETTES } from './palettes.js';

export class ControlPanel {
    constructor(state, actions) {
        this.state = state;
        this.actions = actions;
        this._meterAnimId = null;

        this._build();
    }

    _build() {
        // Panel container
        const panel = document.createElement('div');
        panel.id = 'control-panel';

        // Header
        const header = document.createElement('div');
        header.className = 'panel-header';
        header.innerHTML = '<div class="panel-title">FRACTAL MUSIC VISUALIZER</div>';
        panel.appendChild(header);

        // Scroll area
        const scroll = document.createElement('div');
        scroll.className = 'panel-scroll';

        // --- Audio Source Section (mic + file + simulation) ---
        scroll.appendChild(this._buildAudioSourceSection());

        // --- Audio Meters Section ---
        scroll.appendChild(this._buildMetersSection());

        // --- Diagnostics Section ---
        scroll.appendChild(this._buildDiagnosticsSection());

        // --- Fractal Type Section ---
        scroll.appendChild(this._buildFractalSection());

        // --- Palette Section ---
        scroll.appendChild(this._buildPaletteSection());

        // --- Reactivity Section ---
        scroll.appendChild(this._buildReactivitySection());

        // --- Camera Behaviour ---
        scroll.appendChild(this._buildCameraSection());

        // --- Auto-Pilot Settings ---
        scroll.appendChild(this._buildAutoPilotSection());

        // --- Symmetry Section ---
        scroll.appendChild(this._buildSymmetrySection());

        // --- Controls Section (collapsed) ---
        scroll.appendChild(this._buildControlsSection());

        panel.appendChild(scroll);
        document.body.appendChild(panel);

        // Toggle button
        const toggle = document.createElement('button');
        toggle.id = 'panel-toggle';
        toggle.textContent = '\u25C0';
        toggle.addEventListener('click', () => {
            const hidden = panel.style.transform === 'translateX(-100%)';
            panel.style.transform = hidden ? '' : 'translateX(-100%)';
            toggle.style.left = hidden ? '320px' : '0';
            toggle.textContent = hidden ? '\u25C0' : '\u25B6';
        });
        document.body.appendChild(toggle);

        // Keyboard shortcut to toggle panel
        window.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                toggle.click();
            }
        });
    }

    // ---- AUDIO SOURCE (mic + file + simulation) ----
    _buildAudioSourceSection() {
        const section = this._createSection('Audio Source', true);
        const body = section.querySelector('.section-body');

        // Microphone button
        this._micBtn = document.createElement('button');
        this._micBtn.className = 'control-btn mic-btn';
        this._micBtn.textContent = 'Enable Microphone';
        this._micBtn.addEventListener('click', async () => {
            if (this.actions.getAudioEngine().active && this.actions.getAudioEngine().sourceType === 'mic') {
                this.actions.disconnectAudio();
                this._updateSourceStatus('none');
            } else {
                const ok = await this.actions.connectMic();
                this._updateSourceStatus(ok ? 'mic' : 'none');
            }
        });
        body.appendChild(this._micBtn);

        // File upload button
        const fileRow = document.createElement('div');
        fileRow.className = 'control-row';
        const fileBtn = document.createElement('button');
        fileBtn.className = 'control-btn';
        fileBtn.textContent = 'Load Audio File';
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.style.display = 'none';
        fileBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                this.actions.connectFile(fileInput.files[0]);
                this._updateSourceStatus('file', fileInput.files[0].name);
            }
        });
        fileRow.appendChild(fileBtn);
        fileRow.appendChild(fileInput);
        body.appendChild(fileRow);

        // Simulation dropdown
        const simRow = document.createElement('div');
        simRow.className = 'control-row';
        const simLabel = document.createElement('label');
        simLabel.textContent = 'Simulate Audio';
        simRow.appendChild(simLabel);

        const simSelect = document.createElement('select');
        simSelect.className = 'control-select';
        const simModes = ['-- Off --', 'silence', 'bass_hit', 'steady_tone', 'frequency_sweep', 'full_spectrum', 'beat_pattern'];
        simModes.forEach(mode => {
            const opt = document.createElement('option');
            opt.value = mode;
            opt.textContent = mode === '-- Off --' ? mode : mode.replace(/_/g, ' ');
            simSelect.appendChild(opt);
        });
        simSelect.addEventListener('change', () => {
            if (simSelect.value === '-- Off --') {
                this.actions.stopSimulation();
                this._updateSourceStatus('none');
            } else {
                this.actions.startSimulation(simSelect.value);
                this._updateSourceStatus('simulation', simSelect.value);
            }
        });
        simRow.appendChild(simSelect);
        body.appendChild(simRow);

        // Status text
        this._sourceStatus = document.createElement('div');
        this._sourceStatus.className = 'mic-status';
        this._sourceStatus.textContent = 'Not connected';
        body.appendChild(this._sourceStatus);

        return section;
    }

    _updateSourceStatus(type, detail) {
        const labels = {
            none: 'Not connected',
            mic: 'Microphone active',
            file: `Playing: ${detail || 'audio file'}`,
            simulation: `Simulating: ${detail || ''}`,
        };
        if (this._sourceStatus) {
            this._sourceStatus.textContent = labels[type] || 'Not connected';
            this._sourceStatus.style.color = type === 'none' ? '#667788' : '#00ff88';
            if (type !== 'none') this._sourceStatus.style.textShadow = '0 0 6px rgba(0, 255, 136, 0.4)';
            else this._sourceStatus.style.textShadow = 'none';
        }
        if (this._micBtn) {
            const isMic = type === 'mic';
            this._micBtn.textContent = isMic ? 'Disconnect Microphone' : 'Enable Microphone';
            this._micBtn.classList.toggle('active', isMic);
        }
    }

    updateMicState(active) {
        this._updateSourceStatus(active ? 'mic' : 'none');
    }

    // ---- AUDIO METERS ----
    _buildMetersSection() {
        const section = this._createSection('Audio Levels', true);
        const body = section.querySelector('.section-body');

        const bands = ['bass', 'lowMid', 'mid', 'highMid', 'high'];
        const labels = ['Bass', 'Low Mid', 'Mid', 'High Mid', 'High'];
        this._meters = {};

        const metersDiv = document.createElement('div');
        metersDiv.className = 'audio-meters';

        bands.forEach((band, i) => {
            const row = document.createElement('div');
            row.className = 'meter-row';

            const label = document.createElement('span');
            label.className = 'meter-label';
            label.textContent = labels[i];

            const barContainer = document.createElement('div');
            barContainer.className = 'meter-bar-container';

            const bar = document.createElement('div');
            bar.className = 'meter-bar';
            bar.style.width = '0%';
            barContainer.appendChild(bar);

            row.appendChild(label);
            row.appendChild(barContainer);
            metersDiv.appendChild(row);

            this._meters[band] = bar;
        });

        // Beat indicators
        const beatRow = document.createElement('div');
        beatRow.className = 'beat-indicators';
        this._beatDots = {};
        ['bass', 'mid', 'high'].forEach(band => {
            const dot = document.createElement('div');
            dot.className = 'beat-dot';
            dot.dataset.band = band;
            const label = document.createElement('span');
            label.textContent = band.charAt(0).toUpperCase() + band.slice(1);
            label.className = 'beat-dot-label';
            const wrapper = document.createElement('div');
            wrapper.className = 'beat-dot-wrapper';
            wrapper.appendChild(dot);
            wrapper.appendChild(label);
            beatRow.appendChild(wrapper);
            this._beatDots[band] = dot;
        });
        metersDiv.appendChild(beatRow);

        body.appendChild(metersDiv);
        return section;
    }

    updateAudioMeters(audioData, beatFlash) {
        if (!audioData.active) {
            for (const bar of Object.values(this._meters)) {
                bar.style.width = '0%';
            }
            for (const dot of Object.values(this._beatDots)) {
                dot.classList.remove('active');
            }
            return;
        }

        const bands = { bass: audioData.bass, lowMid: audioData.lowMid, mid: audioData.mid,
                        highMid: audioData.highMid, high: audioData.high };
        for (const [band, val] of Object.entries(bands)) {
            if (this._meters[band]) {
                this._meters[band].style.width = `${Math.min(100, val * 100)}%`;
            }
        }

        // Beat indicators
        if (audioData.beats) {
            for (const band of ['bass', 'mid', 'high']) {
                if (this._beatDots[band]) {
                    if (audioData.beats[band] > 0.1) {
                        this._beatDots[band].classList.add('active');
                    } else {
                        this._beatDots[band].classList.remove('active');
                    }
                }
            }
        }
    }

    // ---- DIAGNOSTICS ----
    _buildDiagnosticsSection() {
        const section = this._createSection('Diagnostics', false);
        const body = section.querySelector('.section-body');

        // Capture snapshot button
        const captureBtn = document.createElement('button');
        captureBtn.className = 'control-btn';
        captureBtn.textContent = 'Capture Snapshot (D)';
        captureBtn.addEventListener('click', () => this.actions.captureSnapshot());
        body.appendChild(captureBtn);

        // Sequence capture row
        const seqRow = document.createElement('div');
        seqRow.className = 'control-row';
        seqRow.style.display = 'flex';
        seqRow.style.gap = '6px';

        const seqBtn = document.createElement('button');
        seqBtn.className = 'control-btn';
        seqBtn.style.flex = '1';
        seqBtn.textContent = 'Capture Sequence';
        const seqCountInput = document.createElement('input');
        seqCountInput.type = 'number';
        seqCountInput.min = 2;
        seqCountInput.max = 20;
        seqCountInput.value = 8;
        seqCountInput.style.width = '50px';
        seqBtn.addEventListener('click', () => {
            this.actions.captureSequence(parseInt(seqCountInput.value) || 8);
        });
        seqRow.appendChild(seqBtn);
        seqRow.appendChild(seqCountInput);
        body.appendChild(seqRow);

        // Download buttons
        const dlRow = document.createElement('div');
        dlRow.className = 'control-row';
        dlRow.style.display = 'flex';
        dlRow.style.gap = '6px';

        const dlLastBtn = document.createElement('button');
        dlLastBtn.className = 'control-btn';
        dlLastBtn.style.flex = '1';
        dlLastBtn.textContent = 'Download Last';
        dlLastBtn.addEventListener('click', () => this.actions.downloadLastCapture());
        dlRow.appendChild(dlLastBtn);

        const dlAllBtn = document.createElement('button');
        dlAllBtn.className = 'control-btn';
        dlAllBtn.style.flex = '1';
        dlAllBtn.textContent = 'Download All';
        dlAllBtn.addEventListener('click', () => this.actions.downloadAllCaptures());
        dlRow.appendChild(dlAllBtn);

        body.appendChild(dlRow);

        // Capture count status
        this._captureStatus = document.createElement('div');
        this._captureStatus.className = 'mic-status';
        this._captureStatus.textContent = 'No captures yet';
        body.appendChild(this._captureStatus);

        return section;
    }

    // ---- FRACTAL MIXER ----
    // Each fractal has an on/off toggle and a level fader.
    // Multiple fractals can be active simultaneously — they blend by weight.
    //
    _buildFractalSection() {
        const section = this._createSection('Fractal Mixer', true);
        const body = section.querySelector('.section-body');

        // Initialize mixer state: first fractal is on at 1.0, rest off
        this._mixerState = {};
        FRACTAL_NAMES.forEach((key, i) => {
            this._mixerState[key] = {
                enabled: i === 0,
                level: i === 0 ? 1.0 : 1.0, // level stored even when off
            };
        });

        this._mixerRows = {};

        FRACTAL_NAMES.forEach((key, i) => {
            const ms = this._mixerState[key];

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '5px';
            row.style.alignItems = 'center';
            row.style.marginBottom = '4px';

            // On/off toggle
            const toggle = document.createElement('button');
            toggle.style.cssText = 'width:28px;height:22px;font-size:9px;font-weight:700;padding:0;border-radius:3px;cursor:pointer;border:1px solid #334455;flex-shrink:0;font-family:Consolas,monospace;letter-spacing:1px;transition:all 0.2s ease;';
            toggle.textContent = ms.enabled ? 'ON' : 'OFF';
            toggle.style.background = ms.enabled ? 'rgba(0, 255, 255, 0.15)' : '#10102a';
            toggle.style.color = ms.enabled ? '#00ffff' : '#667788';
            toggle.style.borderColor = ms.enabled ? '#00ffff' : '#334455';
            if (ms.enabled) toggle.style.textShadow = '0 0 6px rgba(0,255,255,0.4)';
            else toggle.style.textShadow = 'none';
            toggle.addEventListener('click', () => {
                ms.enabled = !ms.enabled;
                toggle.textContent = ms.enabled ? 'ON' : 'OFF';
                toggle.style.background = ms.enabled ? 'rgba(0, 255, 255, 0.15)' : '#10102a';
                toggle.style.color = ms.enabled ? '#00ffff' : '#667788';
                toggle.style.borderColor = ms.enabled ? '#00ffff' : '#334455';
                toggle.style.textShadow = ms.enabled ? '0 0 6px rgba(0,255,255,0.4)' : 'none';
                fader.style.opacity = ms.enabled ? '1' : '0.3';
                this._applyMixer();
            });

            // Fractal name label
            const label = document.createElement('span');
            label.style.cssText = 'font-size:10px;color:#aaccff;width:60px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;font-family:Consolas,monospace;letter-spacing:0.5px;transition:color 0.2s;';
            label.textContent = FRACTAL_TYPES[key].name.split(' ').slice(0, 2).join(' ');
            label.title = FRACTAL_TYPES[key].name + ` (F${i + 1})`;
            // Click name to solo this fractal
            label.addEventListener('click', () => {
                FRACTAL_NAMES.forEach(k => {
                    this._mixerState[k].enabled = k === key;
                });
                this._refreshMixerUI();
                this._applyMixer();
            });

            // Level fader
            const fader = document.createElement('input');
            fader.type = 'range';
            fader.min = 0;
            fader.max = 1;
            fader.step = 0.01;
            fader.value = ms.level;
            fader.style.flex = '1';
            fader.style.opacity = ms.enabled ? '1' : '0.3';
            fader.addEventListener('input', () => {
                ms.level = parseFloat(fader.value);
                this._applyMixer();
            });

            row.appendChild(toggle);
            row.appendChild(label);
            row.appendChild(fader);
            body.appendChild(row);

            this._mixerRows[key] = { toggle, label, fader };
        });

        // Active count display
        this._mixerStatus = document.createElement('div');
        this._mixerStatus.style.cssText = 'font-size:10px;color:#667788;margin-top:4px;letter-spacing:1px;font-family:Consolas,monospace;';
        this._mixerStatus.textContent = '1 active';
        body.appendChild(this._mixerStatus);

        return section;
    }

    _applyMixer() {
        // Collect active fractals with their weights
        const active = [];
        for (const key of FRACTAL_NAMES) {
            const ms = this._mixerState[key];
            if (ms.enabled && ms.level > 0.001) {
                active.push({ key, weight: ms.level });
            }
        }

        if (active.length === 0) {
            // Nothing active — show first fractal
            this.actions.setFractalMix([{ key: FRACTAL_NAMES[0], weight: 1.0 }]);
        } else {
            this.actions.setFractalMix(active);
        }

        // Update status
        if (this._mixerStatus) {
            this._mixerStatus.textContent = `${active.length} active`;
        }
    }

    _refreshMixerUI() {
        for (const [key, row] of Object.entries(this._mixerRows)) {
            const ms = this._mixerState[key];
            row.toggle.textContent = ms.enabled ? 'ON' : 'OFF';
            row.toggle.style.background = ms.enabled ? 'rgba(0, 255, 255, 0.15)' : '#10102a';
            row.toggle.style.color = ms.enabled ? '#00ffff' : '#667788';
            row.toggle.style.borderColor = ms.enabled ? '#00ffff' : '#334455';
            row.toggle.style.textShadow = ms.enabled ? '0 0 6px rgba(0,255,255,0.4)' : 'none';
            row.fader.value = ms.level;
            row.fader.style.opacity = ms.enabled ? '1' : '0.3';
        }
    }

    // Called by auto-pilot to update the mixer UI to match
    setMixerState(activeKeys) {
        if (!this._mixerState) return;
        for (const key of FRACTAL_NAMES) {
            this._mixerState[key].enabled = activeKeys.includes(key);
        }
        this._refreshMixerUI();
    }

    updateFractalButtons(activeKey) {
        // Called by main.js (auto-pilot, F-keys)
        this._rebuildAdvancedSection();
    }

    // ---- PALETTE ----
    _buildPaletteSection() {
        const section = this._createSection('Palette', true);
        const body = section.querySelector('.section-body');

        const select = document.createElement('select');
        select.className = 'control-select';
        PALETTE_NAMES.forEach(name => {
            const opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            if (name === this.state.palette.name) opt.selected = true;
            select.appendChild(opt);
        });
        select.addEventListener('change', () => this.actions.switchPalette(select.value));
        body.appendChild(select);
        this._paletteSelect = select;

        // Palette preview
        const preview = document.createElement('canvas');
        preview.className = 'palette-preview';
        preview.width = 256;
        preview.height = 1;
        body.appendChild(preview);
        this._palettePreview = preview;
        this._drawPalettePreview();

        // Palette speed
        body.appendChild(this._createSlider('Speed', 0.1, 5, 0.1, this.state.palette.speed,
            (val) => { this.state.palette.speed = val; }));

        // Color cycle speed
        body.appendChild(this._createSlider('Color Cycle', 0, 0.5, 0.01, this.state.palette.cycleSpeed,
            (val) => { this.state.palette.cycleSpeed = val; }));

        // Palette shuffle toggle
        const shuffleRow = document.createElement('div');
        shuffleRow.className = 'control-row';
        const shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'control-btn';
        shuffleBtn.textContent = 'Palette Shuffle: OFF';
        shuffleBtn.addEventListener('click', () => {
            this.actions.togglePaletteShuffle();
            const on = this.actions.isPaletteShuffling();
            shuffleBtn.textContent = `Palette Shuffle: ${on ? 'ON' : 'OFF'}`;
            shuffleBtn.classList.toggle('active', on);
        });
        shuffleRow.appendChild(shuffleBtn);
        body.appendChild(shuffleRow);

        // Shuffle interval
        body.appendChild(this._createSlider('Shuffle Interval (s)', 5, 60, 1, 15,
            (val) => { this.actions.setPaletteShuffleInterval(val); }));

        return section;
    }

    _drawPalettePreview() {
        const ctx = this._palettePreview.getContext('2d');
        const data = PALETTES[this.state.palette.name];
        const imgData = ctx.createImageData(256, 1);
        for (let i = 0; i < 256; i++) {
            imgData.data[i * 4 + 0] = Math.round(data[i * 3 + 0] * 255);
            imgData.data[i * 4 + 1] = Math.round(data[i * 3 + 1] * 255);
            imgData.data[i * 4 + 2] = Math.round(data[i * 3 + 2] * 255);
            imgData.data[i * 4 + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

    updatePaletteSelect(name) {
        if (this._paletteSelect) this._paletteSelect.value = name;
        this._drawPalettePreview();
    }

    // ---- REACTIVITY ----
    _buildReactivitySection() {
        const section = this._createSection('Reactivity', true);
        const body = section.querySelector('.section-body');

        body.appendChild(this._createSlider('Intensity', 0.5, 3.0, 0.1, 1.5,
            (val) => { this.actions.setReactivity(val); }));

        // Pulse warp toggle
        const pulseRow = document.createElement('div');
        pulseRow.className = 'control-row';
        this._pulseWarpBtn = document.createElement('button');
        this._pulseWarpBtn.className = 'control-btn';
        this._pulseWarpBtn.textContent = 'Pulse Warp: OFF';
        this._pulseWarpBtn.addEventListener('click', () => {
            const vis = this.actions.getVisualizer();
            vis.pulseWarpEnabled = !vis.pulseWarpEnabled;
            this._pulseWarpBtn.textContent = `Pulse Warp: ${vis.pulseWarpEnabled ? 'ON' : 'OFF'}`;
            this._pulseWarpBtn.classList.toggle('active', vis.pulseWarpEnabled);
        });
        pulseRow.appendChild(this._pulseWarpBtn);
        body.appendChild(pulseRow);

        // Auto-pilot toggle
        const autoPilotRow = document.createElement('div');
        autoPilotRow.className = 'control-row';
        this._autoPilotBtn = document.createElement('button');
        this._autoPilotBtn.className = 'control-btn';
        this._autoPilotBtn.textContent = 'Auto-Pilot: OFF';
        this._autoPilotBtn.addEventListener('click', () => {
            const on = this.actions.toggleAutoPilot();
            this.updateAutoPilotState(on);
        });
        autoPilotRow.appendChild(this._autoPilotBtn);
        body.appendChild(autoPilotRow);

        // Fullscreen button
        const fsBtn = document.createElement('button');
        fsBtn.className = 'control-btn';
        fsBtn.textContent = 'Fullscreen (F)';
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
        body.appendChild(fsBtn);

        return section;
    }

    updateAutoPilotState(on) {
        if (this._autoPilotBtn) {
            this._autoPilotBtn.textContent = `Auto-Pilot: ${on ? 'ON' : 'OFF'}`;
            this._autoPilotBtn.classList.toggle('active', on);
        }
    }

    // ---- AUTO-PILOT SETTINGS ----
    // ---- CAMERA BEHAVIOUR ----
    _buildCameraSection() {
        const section = this._createSection('Camera Behaviour', false);
        const body = section.querySelector('.section-body');
        const cc = () => this.actions.getVisualizer().cameraConfig;

        body.appendChild(this._createSlider('Orbit Speed', 0.01, 0.4, 0.01, 0.1,
            (val) => { cc().orbitSpeed = val; }));

        body.appendChild(this._createSlider('Orbit Radius', 0.1, 1.0, 0.05, 0.35,
            (val) => { cc().orbitRadius = val; }));

        body.appendChild(this._createSlider('Migration Speed', 0.01, 0.2, 0.01, 0.05,
            (val) => { cc().migrationSpeed = val; }));

        body.appendChild(this._createSlider('Waypoint Hang Time', 5, 60, 1, 25,
            (val) => { cc().waypointHangTime = val; }));

        body.appendChild(this._createSlider('Zoom Depth', 0.1, 0.8, 0.02, 0.38,
            (val) => { cc().zoomDepth = val; }));

        body.appendChild(this._createSlider('Zoom Min', 0.05, 0.5, 0.01, 0.2,
            (val) => { cc().zoomMin = val; }));

        body.appendChild(this._createSlider('Rotation Speed', 0, 0.05, 0.001, 0.008,
            (val) => { cc().rotationSpeed = val; }));

        body.appendChild(this._createSlider('Music → Orbit', 0, 1, 0.05, 0.5,
            (val) => { cc().musicOrbitInfluence = val; }));

        body.appendChild(this._createSlider('Music → Zoom', 0, 1, 0.05, 0.5,
            (val) => { cc().musicZoomInfluence = val; }));

        body.appendChild(this._createSlider('Music → Rotation', 0, 1, 0.05, 0.5,
            (val) => { cc().musicRotInfluence = val; }));

        body.appendChild(this._createSlider('Beat Breath', 0, 0.15, 0.01, 0.05,
            (val) => { cc().breathAmount = val; }));

        return section;
    }

    _buildAutoPilotSection() {
        const section = this._createSection('Auto-Pilot Settings', false);
        const body = section.querySelector('.section-body');
        const vis = () => this.actions.getVisualizer();

        // Fade Duration slider
        body.appendChild(this._createSlider('Fade Duration (s)', 1, 30, 0.5, 6,
            (val) => { vis().autoPilotConfig.fadeDuration = val; }));

        // Stay Duration slider
        body.appendChild(this._createSlider('Time Between Fades (s)', 0, 60, 1, 10,
            (val) => { vis().autoPilotConfig.timeBetweenFades = val; }));

        // Auto Palette toggle
        const palRow = document.createElement('div');
        palRow.className = 'control-row';
        const palBtn = document.createElement('button');
        palBtn.className = 'control-btn active';
        palBtn.textContent = 'Auto Palette: ON';
        palBtn.addEventListener('click', () => {
            const cfg = vis().autoPilotConfig;
            cfg.autoPalette = !cfg.autoPalette;
            palBtn.textContent = `Auto Palette: ${cfg.autoPalette ? 'ON' : 'OFF'}`;
            palBtn.classList.toggle('active', cfg.autoPalette);
        });
        palRow.appendChild(palBtn);
        body.appendChild(palRow);

        // Fractal type checkboxes
        const fractalLabel = document.createElement('label');
        fractalLabel.style.display = 'block';
        fractalLabel.style.fontSize = '11px';
        fractalLabel.style.color = '#88aacc';
        fractalLabel.style.marginTop = '8px';
        fractalLabel.style.marginBottom = '4px';
        fractalLabel.style.letterSpacing = '1px';
        fractalLabel.style.textTransform = 'uppercase';
        fractalLabel.textContent = 'Enabled Fractals';
        body.appendChild(fractalLabel);

        const fractalChecks = document.createElement('div');
        fractalChecks.style.display = 'flex';
        fractalChecks.style.flexDirection = 'column';
        fractalChecks.style.gap = '3px';

        FRACTAL_NAMES.forEach(key => {
            const row = document.createElement('label');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '6px';
            row.style.fontSize = '11px';
            row.style.color = '#aaccff';
            row.style.cursor = 'pointer';

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = true;
            cb.style.accentColor = '#00ffff';
            cb.addEventListener('change', () => {
                const cfg = vis().autoPilotConfig;
                if (!cfg.enabledFractals) {
                    // First uncheck: init set with all fractals then remove this one
                    cfg.enabledFractals = new Set(FRACTAL_NAMES);
                }
                if (cb.checked) {
                    cfg.enabledFractals.add(key);
                } else {
                    cfg.enabledFractals.delete(key);
                    // Don't allow empty — re-check if last one
                    if (cfg.enabledFractals.size === 0) {
                        cfg.enabledFractals.add(key);
                        cb.checked = true;
                    }
                }
            });

            row.appendChild(cb);
            row.appendChild(document.createTextNode(FRACTAL_TYPES[key].name));
            fractalChecks.appendChild(row);
        });
        body.appendChild(fractalChecks);

        // Palette checkboxes
        const palLabel = document.createElement('label');
        palLabel.style.display = 'block';
        palLabel.style.fontSize = '11px';
        palLabel.style.color = '#88aacc';
        palLabel.style.marginTop = '8px';
        palLabel.style.marginBottom = '4px';
        palLabel.style.letterSpacing = '1px';
        palLabel.style.textTransform = 'uppercase';
        palLabel.textContent = 'Enabled Palettes';
        body.appendChild(palLabel);

        const palChecks = document.createElement('div');
        palChecks.style.display = 'flex';
        palChecks.style.flexDirection = 'column';
        palChecks.style.gap = '3px';
        palChecks.style.maxHeight = '150px';
        palChecks.style.overflowY = 'auto';

        PALETTE_NAMES.forEach(name => {
            const row = document.createElement('label');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '6px';
            row.style.fontSize = '11px';
            row.style.color = '#aaccff';
            row.style.cursor = 'pointer';

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = true;
            cb.style.accentColor = '#00ffff';
            cb.addEventListener('change', () => {
                const cfg = vis().autoPilotConfig;
                if (!cfg.enabledPalettes) {
                    cfg.enabledPalettes = new Set(PALETTE_NAMES);
                }
                if (cb.checked) {
                    cfg.enabledPalettes.add(name);
                } else {
                    cfg.enabledPalettes.delete(name);
                    if (cfg.enabledPalettes.size === 0) {
                        cfg.enabledPalettes.add(name);
                        cb.checked = true;
                    }
                }
            });

            row.appendChild(cb);
            row.appendChild(document.createTextNode(name));
            palChecks.appendChild(row);
        });
        body.appendChild(palChecks);

        return section;
    }

    // ---- SYMMETRY ----
    _buildSymmetrySection() {
        const section = this._createSection('Symmetry', false);
        const body = section.querySelector('.section-body');

        const modes = ['None', 'Bilateral', 'Rotational', 'Dihedral'];
        const modeSelect = document.createElement('select');
        modeSelect.className = 'control-select';
        modes.forEach((name, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = name;
            if (i === this.state.symmetry.mode) opt.selected = true;
            modeSelect.appendChild(opt);
        });
        modeSelect.addEventListener('change', () => {
            this.state.symmetry.mode = parseInt(modeSelect.value);
        });
        body.appendChild(modeSelect);

        body.appendChild(this._createSlider('Order', 2, 12, 1, this.state.symmetry.order,
            (val) => { this.state.symmetry.order = val; }));

        return section;
    }

    // ---- ADVANCED CONTROLS (collapsed) ----
    _buildControlsSection() {
        const section = this._createSection('Advanced', false);
        this._advancedBody = section.querySelector('.section-body');
        this._rebuildAdvancedSection();
        return section;
    }

    _rebuildAdvancedSection() {
        if (!this._advancedBody) return;
        const body = this._advancedBody;
        body.innerHTML = '';

        const fractalType = FRACTAL_TYPES[this.state.fractal.currentType];
        if (fractalType.paramDefs.maxIterations) {
            body.appendChild(this._createSlider('Max Iterations',
                fractalType.paramDefs.maxIterations.min,
                fractalType.paramDefs.maxIterations.max,
                fractalType.paramDefs.maxIterations.step,
                fractalType.params.maxIterations,
                (val) => {
                    const ft = FRACTAL_TYPES[this.state.fractal.currentType];
                    ft.params.maxIterations = val;
                }));
        }

        body.appendChild(this._createSlider('Bloom Intensity', 0, 1.5, 0.05,
            this.state.postProcessing.bloomIntensity,
            (val) => { this.state.postProcessing.bloomIntensity = val; }));

        body.appendChild(this._createSlider('Bloom Threshold', 0.1, 1.0, 0.05,
            this.state.postProcessing.bloomThreshold,
            (val) => { this.state.postProcessing.bloomThreshold = val; }));

        body.appendChild(this._createSlider('Gamma', 0.5, 4.0, 0.1,
            this.state.postProcessing.gamma,
            (val) => { this.state.postProcessing.gamma = val; }));

        body.appendChild(this._createSlider('Vignette', 0, 1.0, 0.05,
            this.state.postProcessing.vignetteStrength,
            (val) => { this.state.postProcessing.vignetteStrength = val; }));
    }

    // ---- HELPERS ----
    _createSection(title, open = true) {
        const section = document.createElement('div');
        section.className = 'section';

        const header = document.createElement('div');
        header.className = 'section-header';
        const arrow = document.createElement('span');
        arrow.className = 'section-arrow';
        arrow.textContent = open ? '\u25BC' : '\u25B6';
        header.appendChild(arrow);
        header.appendChild(document.createTextNode(' ' + title));

        const body = document.createElement('div');
        body.className = 'section-body';
        body.style.display = open ? '' : 'none';

        header.addEventListener('click', () => {
            const visible = body.style.display !== 'none';
            body.style.display = visible ? 'none' : '';
            arrow.textContent = visible ? '\u25B6' : '\u25BC';
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }

    _createSlider(label, min, max, step, initial, onChange) {
        const row = document.createElement('div');
        row.className = 'control-row';

        const labelEl = document.createElement('label');
        labelEl.textContent = label;
        const valueSpan = document.createElement('span');
        valueSpan.className = 'slider-value';
        valueSpan.textContent = Number(initial).toFixed(step < 1 ? 2 : 0);
        labelEl.appendChild(valueSpan);

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = initial;
        slider.addEventListener('input', () => {
            const val = parseFloat(slider.value);
            valueSpan.textContent = val.toFixed(step < 1 ? 2 : 0);
            onChange(val);
        });

        row.appendChild(labelEl);
        row.appendChild(slider);
        return row;
    }
}
