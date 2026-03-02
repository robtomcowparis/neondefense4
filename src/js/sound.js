// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — sound.js
//  Procedural sound generation via Web Audio API
// ═══════════════════════════════════════════════════════════════

export class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.masterGain = null;
        this._initialized = false;
    }

    /** Must be called from a user gesture (click/key) */
    init() {
        if (this._initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.25;
            this.masterGain.connect(this.ctx.destination);
            this._initialized = true;
        } catch (e) {
            console.warn('Web Audio not available:', e);
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 0.25;
        }
        return this.muted;
    }

    setMuted(val) {
        this.muted = val;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 0.25;
        }
    }

    play(name) {
        if (!this._initialized || this.muted) return;
        this.resume();
        try {
            switch (name) {
                case 'shoot_pulse':   this._tone(880, 0.06, 0.6); break;
                case 'shoot_rail':    this._sweep(1200, 400, 0.15, 0.8); break;
                case 'shoot_tesla':   this._noiseBurst(0.08, 0.5); break;
                case 'shoot_cryo':    this._tone(300, 0.12, 0.4); break;
                case 'shoot_nova':    this._sweep(200, 800, 0.25, 1.0); break;
                case 'enemy_die':     this._sweep(600, 100, 0.1, 0.6); break;
                case 'wave_start':    this._sweep(400, 1200, 0.3, 0.8); break;
                case 'place_tower':   this._tone(660, 0.1, 0.6); break;
                case 'sell':          this._sweep(1000, 500, 0.1, 0.6); break;
                case 'upgrade':       this._sweep(500, 1000, 0.15, 0.6); break;
                case 'boss_spawn':    this._sweep(150, 600, 0.4, 1.2); break;
                case 'sapper_shoot':  this._sweep(900, 500, 0.08, 0.5); break;
                case 'tower_hit':     this._tone(120, 0.1, 0.7); break;
                case 'tower_destroyed': this._sweep(600, 80, 0.4, 1.2); break;
                case 'repair':        this._sweep(400, 900, 0.12, 0.5); break;
                case 'game_over':     this._sweep(800, 100, 0.5, 1.0); break;
                case 'research':      this._sweep(300, 1100, 0.2, 0.5); break;
                case 'wave_clear':    this._sweepDouble(500, 1200, 0.2, 0.7); break;
            }
        } catch (e) { /* fail silently */ }
    }

    _tone(freq, duration, gain = 0.5) {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        g.gain.setValueAtTime(gain, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + duration + 0.01);
    }

    _sweep(startFreq, endFreq, duration, gain = 0.5) {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
        g.gain.setValueAtTime(gain, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + duration + 0.01);
    }

    _sweepDouble(startFreq, endFreq, duration, gain = 0.5) {
        this._sweep(startFreq, endFreq, duration, gain * 0.6);
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(startFreq * 1.5, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq * 1.5), t + 0.05 + duration);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain * 0.4, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.05 + duration);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + duration + 0.1);
    }

    _noiseBurst(duration, gain = 0.3) {
        const t = this.ctx.currentTime;
        const bufferSize = Math.round(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(gain, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + duration);
        // Bandpass for more interesting sound
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3000;
        filter.Q.value = 1.5;
        src.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain);
        src.start(t);
        src.stop(t + duration + 0.01);
    }
}
