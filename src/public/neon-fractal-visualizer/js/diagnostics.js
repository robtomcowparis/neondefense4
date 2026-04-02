// DiagnosticsEngine — frame capture, sequence capture, and metadata export
// Redirects the composite pass to a capture FBO, blits to screen, then reads pixels.

export class DiagnosticsEngine {
    constructor({ canvas, gl, renderer, getState, getVisualizer, getAudioEngine }) {
        this.canvas = canvas;
        this.gl = gl;
        this.renderer = renderer;
        this.getState = getState;
        this.getVisualizer = getVisualizer;
        this.getAudioEngine = getAudioEngine;

        this.active = false;
        this._captureFBO = null;
        this._captureRequested = false;
        this._offscreenCanvas = null; // created lazily
        this._captures = [];
        this._frameNumber = 0;
        this._sequenceState = null;
    }

    activate() {
        if (this.active) return;
        const w = this.renderer.width;
        const h = this.renderer.height;
        this._captureFBO = this.renderer.createFBO(w, h, this.gl.RGBA8);
        this.active = true;
    }

    deactivate() {
        if (!this.active) return;
        this.renderer.deleteFBO(this._captureFBO);
        this._captureFBO = null;
        this.active = false;
    }

    // Returns the FBO to use as the composite render target, or null for default (screen).
    getCompositeTarget() {
        if (this.active && (this._captureRequested || this._sequenceState)) {
            return this._captureFBO;
        }
        return null;
    }

    // Call after composite pass. Blits captureFBO to screen so the user still sees output.
    afterComposite() {
        if (!this.active) return;
        const gl = this.gl;
        const w = this.renderer.width;
        const h = this.renderer.height;
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this._captureFBO.fbo);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        gl.blitFramebuffer(0, 0, w, h, 0, 0, w, h, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    }

    async captureFrame() {
        const gl = this.gl;
        const w = this.renderer.width;
        const h = this.renderer.height;

        // 1. Read pixels from capture FBO
        const pixels = new Uint8Array(w * h * 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._captureFBO.fbo);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // 2. Y-flip — WebGL reads bottom-to-top, image data is top-to-bottom
        const flipped = new Uint8Array(w * h * 4);
        const rowBytes = w * 4;
        for (let y = 0; y < h; y++) {
            const srcRow = (h - 1 - y) * rowBytes;
            const dstRow = y * rowBytes;
            flipped.set(pixels.subarray(srcRow, srcRow + rowBytes), dstRow);
        }

        // 3. Convert to PNG via OffscreenCanvas
        if (!this._offscreenCanvas) {
            this._offscreenCanvas = new OffscreenCanvas(w, h);
        } else if (this._offscreenCanvas.width !== w || this._offscreenCanvas.height !== h) {
            this._offscreenCanvas.width = w;
            this._offscreenCanvas.height = h;
        }
        const oc = this._offscreenCanvas;
        const ctx = oc.getContext('2d');
        const imageData = new ImageData(new Uint8ClampedArray(flipped.buffer), w, h);
        ctx.putImageData(imageData, 0, 0);
        const blob = await oc.convertToBlob({ type: 'image/png' });

        // 4. Build metadata
        const metadata = this.buildMetadata();

        // 5. Return capture object
        return {
            imageBlob: blob,
            metadata,
            dataURL: URL.createObjectURL(blob),
        };
    }

    requestCapture() {
        this._captureRequested = true;
    }

    // Called by main.js after the composite pass each frame when capture is active.
    async onFrameRendered() {
        this._frameNumber++;
        if (this._captureRequested) {
            this._captureRequested = false;
            const capture = await this.captureFrame();
            this._captures.push(capture);
            return capture;
        }
        if (this._sequenceState) {
            return this._processSequenceFrame();
        }
        return null;
    }

    buildMetadata(frameInSequence, totalFrames) {
        const state = this.getState();
        const visualizer = this.getVisualizer();
        const audio = this.getAudioEngine();

        const fractalType = state.fractal.currentType;
        const fractalDef = this._getFractalDef(fractalType);

        return {
            timestamp: state.time,
            frameNumber: this._frameNumber,
            audio: audio.serializeState ? audio.serializeState() : { active: false },
            visualizer: visualizer.serializeState ? visualizer.serializeState() : {},
            fractal: {
                type: fractalType,
                params: fractalDef ? { ...fractalDef.params } : {},
            },
            view: { ...state.view },
            palette: { ...state.palette },
            postProcessing: { ...state.postProcessing },
            symmetry: { ...state.symmetry },
            resolution: { width: this.renderer.width, height: this.renderer.height },
            ...(frameInSequence !== undefined ? { frameInSequence, totalFrames } : {}),
        };
    }

    // Attempt to read fractal params from the FRACTAL_TYPES registry if available on window.
    _getFractalDef(typeName) {
        if (typeof window !== 'undefined' && window.__FRACTAL_TYPES__) {
            return window.__FRACTAL_TYPES__[typeName] || null;
        }
        return null;
    }

    // --- Sequence capture ---

    startSequence(count = 8) {
        this._sequenceState = {
            total: count,
            remaining: count,
            captures: [],
            startTime: performance.now(),
        };
        this.activate(); // Ensure diagnostics are active
    }

    async _processSequenceFrame() {
        if (!this._sequenceState || this._sequenceState.remaining <= 0) return null;
        const s = this._sequenceState;
        const frameIdx = s.total - s.remaining;
        const capture = await this.captureFrame();
        capture.metadata.frameInSequence = frameIdx + 1;
        capture.metadata.totalFrames = s.total;
        s.captures.push(capture);
        s.remaining--;
        if (s.remaining <= 0) {
            const results = s.captures;
            this._sequenceState = null;
            return { sequenceComplete: true, captures: results };
        }
        return { sequenceComplete: false, framesRemaining: s.remaining };
    }

    isCapturingSequence() {
        return !!this._sequenceState && this._sequenceState.remaining > 0;
    }

    getSequenceResults() {
        if (this._sequenceState) return this._sequenceState.captures;
        return this._captures;
    }

    // --- Download helpers ---

    async downloadSingle(capture) {
        const a = document.createElement('a');
        a.href = capture.dataURL || URL.createObjectURL(capture.imageBlob);
        a.download = `fractal_capture_${capture.metadata.frameNumber}.png`;
        a.click();

        const jsonBlob = new Blob([JSON.stringify(capture.metadata, null, 2)], { type: 'application/json' });
        const b = document.createElement('a');
        b.href = URL.createObjectURL(jsonBlob);
        b.download = `fractal_capture_${capture.metadata.frameNumber}.json`;
        b.click();
    }

    async downloadSequence(captures) {
        for (const capture of (captures || this._captures)) {
            await this.downloadSingle(capture);
            // Small delay to avoid browser blocking multiple downloads
            await new Promise(r => setTimeout(r, 100));
        }
    }
}
