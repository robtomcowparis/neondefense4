// FractalGeneratorV4 — Music Visualizer — Main entry point and render loop

import { Renderer } from './renderer.js';
import {
    FULLSCREEN_QUAD_VERT,
    BLEND_FRAG,
    BLOOM_EXTRACT_FRAG,
    BLUR_FRAG,
    COMPOSITE_FRAG,
} from './shaders.js';
import { FRACTAL_TYPES, FRACTAL_NAMES, getFractalUniforms } from './fractals.js';
import { PALETTES, PALETTE_NAMES, createPaletteTexture } from './palettes.js';
import { AudioEngine } from './audio.js';
import { Visualizer } from './visualizer.js';
import { DiagnosticsEngine } from './diagnostics.js';
import { ControlPanel } from './controls.js';

// Application state
export const state = {
    fractal: { currentType: 'domainJulia' },
    view: {
        center: [0, 0],
        scale: 3.0,
        rotation: 0,
        aspectRatio: 1,
    },
    palette: {
        name: 'Electric Neon',
        speed: 1.0,
        rotation: 0.0,
        cycleSpeed: 0.05,
    },
    postProcessing: {
        gamma: 2.2,
        brightness: 1.0,
        contrast: 1.0,
        vibrancy: 1.0,
        highlightPower: 1.0,
        bloomIntensity: 0.4,
        bloomRadius: 18,
        bloomThreshold: 0.45,
        vignetteStrength: 0.3,
    },
    symmetry: { mode: 0, order: 4 },
    time: 0,
};

let renderer;
let paletteTexture;
let audioEngine;
let visualizer;
let diagnosticsEngine;
let controlPanel;
let fpsCounter;
let frameCount = 0;
let lastFpsTime = 0;
let lastTimestamp = 0;

// Adaptive quality: scale iterations based on FPS
let smoothFps = 60;
let fpsAdaptiveScale = 1.0;

// Audio textures
let fftTexture;
let waveformTexture;

// Auto-pilot
let autoPilot = false;
let autoPilotTimer = 0;
let autoPilotInterval = 10;

// Auto-pilot crossfade state
let autoPilotFading = false;
let autoPilotFrom = null;  // key being faded out
let autoPilotTo = null;    // key being faded in
let autoPilotFadeProgress = 0;

// Palette transition: keep old palette during crossfade
let oldPaletteTexture = null;

// Palette shuffle (independent of auto-pilot)
let paletteShuffle = false;
let paletteShuffleTimer = 0;
let paletteShuffleInterval = 15;
let _recentShufflePalettes = [];

// Multi-fractal mixer state: array of { key, weight }
let activeMix = null;

function init() {
    const canvas = document.getElementById('fractal-canvas');
    fpsCounter = document.getElementById('fps-counter');

    renderer = new Renderer(canvas);
    const gl = renderer.gl;

    // Palette texture
    paletteTexture = createPaletteTexture(gl, PALETTES[state.palette.name]);

    // Audio textures
    fftTexture = renderer.createAudioTexture(512);
    waveformTexture = renderer.createAudioTexture(1024);

    // Compile all fractal shaders
    for (const [key, fractalType] of Object.entries(FRACTAL_TYPES)) {
        try {
            renderer.createProgram(fractalType.shaderKey, FULLSCREEN_QUAD_VERT, fractalType.fragSource);
        } catch (e) {
            console.error(`Failed to compile ${key} shader:`, e);
        }
    }

    // Post-processing shaders
    renderer.createProgram('blend', FULLSCREEN_QUAD_VERT, BLEND_FRAG);
    renderer.createProgram('bloomExtract', FULLSCREEN_QUAD_VERT, BLOOM_EXTRACT_FRAG);
    renderer.createProgram('blur', FULLSCREEN_QUAD_VERT, BLUR_FRAG);
    renderer.createProgram('composite', FULLSCREEN_QUAD_VERT, COMPOSITE_FRAG);

    // Set initial view
    const initialFractal = FRACTAL_TYPES[state.fractal.currentType];
    state.view.center = [...initialFractal.defaultView.center];
    state.view.scale = initialFractal.defaultView.scale;
    state.view.aspectRatio = renderer.aspectRatio;

    // Audio engine and visualizer need to be created before setting interest points
    // (moved below)

    // Audio engine and visualizer
    audioEngine = new AudioEngine();
    visualizer = new Visualizer();

    // Set initial interest points and camera position
    visualizer.setInterestPoints(initialFractal.interestPoints, initialFractal.defaultView);
    visualizer.cameraCenter = [...initialFractal.defaultView.center];
    visualizer.cameraScale = initialFractal.defaultView.scale;

    // Diagnostics engine
    diagnosticsEngine = new DiagnosticsEngine({
        canvas,
        gl,
        renderer,
        getState: () => state,
        getVisualizer: () => visualizer,
        getAudioEngine: () => audioEngine,
    });

    // Expose FRACTAL_TYPES for diagnostics metadata access
    window.__FRACTAL_TYPES__ = FRACTAL_TYPES;

    // Control panel
    controlPanel = new ControlPanel(state, {
        switchFractal: switchFractalType,
        switchPalette: switchPalette,
        connectMic: () => audioEngine.connectMicrophone(),
        disconnectAudio: () => audioEngine.disconnect(),
        toggleAutoPilot: () => { autoPilot = !autoPilot; return autoPilot; },
        setReactivity: (val) => { audioEngine.reactivityMultiplier = val; },
        getAudioEngine: () => audioEngine,
        getVisualizer: () => visualizer,
        // Multi-fractal mixer: array of { key, weight }
        setFractalMix: (mix) => {
            activeMix = mix;
            // Set currentType to highest-weight fractal (for params, iteration scaling)
            const primary = mix.reduce((a, b) => b.weight > a.weight ? b : a, mix[0]);
            const prevType = state.fractal.currentType;
            state.fractal.currentType = primary.key;
            // Only update waypoints when the primary fractal actually changes
            if (primary.key !== prevType) {
                const ft = FRACTAL_TYPES[primary.key];
                if (ft) visualizer.setInterestPoints(ft.interestPoints, ft.defaultView);
            }
        },
        togglePaletteShuffle: () => { paletteShuffle = !paletteShuffle; paletteShuffleTimer = 0; },
        isPaletteShuffling: () => paletteShuffle,
        setPaletteShuffleInterval: (val) => { paletteShuffleInterval = val; },
        connectFile: (file) => audioEngine.connectFile(file),
        startSimulation: (mode) => audioEngine.startSimulation(mode),
        stopSimulation: () => audioEngine.stopSimulation(),
        getDiagnostics: () => diagnosticsEngine,
        captureSnapshot: () => {
            diagnosticsEngine.activate();
            diagnosticsEngine.requestCapture();
        },
        captureSequence: (count) => {
            diagnosticsEngine.startSequence(count);
        },
        downloadLastCapture: () => {
            const captures = diagnosticsEngine.getSequenceResults();
            if (captures.length > 0) {
                diagnosticsEngine.downloadSingle(captures[captures.length - 1]);
            }
        },
        downloadAllCaptures: () => {
            diagnosticsEngine.downloadSequence();
        },
    });

    // Resize handler
    window.addEventListener('resize', onResize);

    // Keyboard shortcuts
    window.addEventListener('keydown', onKeyDown);

    // Start render loop
    requestAnimationFrame(renderLoop);
}

function onResize() {
    renderer.resize();
    state.view.aspectRatio = renderer.aspectRatio;
}

function onKeyDown(e) {
    switch (e.key) {
        case 'F1': case 'F2': case 'F3': case 'F4': case 'F5': {
            e.preventDefault();
            const idx = parseInt(e.key[1]) - 1;
            if (idx < FRACTAL_NAMES.length) {
                switchFractalType(FRACTAL_NAMES[idx]);
            }
            break;
        }
        case 'f':
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
            break;
        case 'p': case 'P': {
            const currentIdx = PALETTE_NAMES.indexOf(state.palette.name);
            const nextIdx = (currentIdx + (e.shiftKey ? -1 : 1) + PALETTE_NAMES.length) % PALETTE_NAMES.length;
            switchPalette(PALETTE_NAMES[nextIdx]);
            break;
        }
        case 'm': case 'M':
            if (audioEngine.active) {
                audioEngine.disconnect();
            } else {
                audioEngine.connectMicrophone();
            }
            if (controlPanel) controlPanel.updateMicState(audioEngine.active);
            break;
        case 'a': case 'A':
            autoPilot = !autoPilot;
            if (controlPanel) controlPanel.updateAutoPilotState(autoPilot);
            break;
        case 'd':
            // Single capture
            diagnosticsEngine.activate();
            diagnosticsEngine.requestCapture();
            break;
        case 'D':
            // Sequence capture (8 frames)
            diagnosticsEngine.startSequence(8);
            break;
    }
}

export function switchFractalType(typeName, smooth = false) {
    if (!FRACTAL_TYPES[typeName]) return;
    if (typeName === state.fractal.currentType) return;

    const oldType = state.fractal.currentType;

    // Start transition if visualizer supports it
    if (visualizer && !visualizer.transitionActive) {
        visualizer.startTransition(oldType);
    }

    state.fractal.currentType = typeName;
    const fractal = FRACTAL_TYPES[typeName];

    if (smooth) {
        // Smooth mode: blend waypoints from both old and new during transition
        const oldFractal = FRACTAL_TYPES[oldType];
        visualizer.setBlendedInterestPoints(
            oldFractal?.interestPoints || [],
            fractal.interestPoints || [],
            0.5 // start at even mix, transition progress will shift weight
        );
    } else {
        // Direct switch: use only new fractal's waypoints
        visualizer.setInterestPoints(fractal.interestPoints, fractal.defaultView);
    }

    // In manual mode (F-keys, buttons), jump to the default view
    if (!smooth) {
        state.view.center = [...fractal.defaultView.center];
        state.view.scale = fractal.defaultView.scale;
        state.view.rotation = 0;
        visualizer.cameraCenter = [...fractal.defaultView.center];
        visualizer.cameraScale = fractal.defaultView.scale;
    }

    if (controlPanel) controlPanel.updateFractalButtons(typeName);
}

export function switchPalette(name) {
    if (!PALETTES[name]) return;
    if (name === state.palette.name) return;
    state.palette.name = name;
    const gl = renderer.gl;
    // Keep old palette texture for crossfade during transitions
    if (visualizer && visualizer.transitionActive) {
        if (oldPaletteTexture) gl.deleteTexture(oldPaletteTexture);
        oldPaletteTexture = paletteTexture;
    } else {
        gl.deleteTexture(paletteTexture);
    }
    paletteTexture = createPaletteTexture(gl, PALETTES[name]);
    if (controlPanel) controlPanel.updatePaletteSelect(name);
}

function renderLoop(timestamp) {
    requestAnimationFrame(renderLoop);

    const dt = Math.min((timestamp - lastTimestamp) / 1000.0, 0.1);
    lastTimestamp = timestamp;
    state.time = timestamp / 1000.0;
    state.view.aspectRatio = renderer.aspectRatio;

    // Adaptive quality: track FPS and scale iteration counts
    if (dt > 0) {
        smoothFps = smoothFps * 0.95 + (1.0 / dt) * 0.05;
        if (smoothFps < 30) {
            fpsAdaptiveScale = Math.max(0.4, fpsAdaptiveScale - dt * 0.5);
        } else if (smoothFps > 50) {
            fpsAdaptiveScale = Math.min(1.0, fpsAdaptiveScale + dt * 0.2);
        }
    }

    // --- Audio analysis ---
    const audioData = audioEngine.analyze();

    // --- Visualizer update (pulse waves, beat flash, drift) ---
    visualizer.update(audioData, dt);

    // Apply visualizer drift to state (only when audio is active)
    if (audioData.active) {
        state.palette.rotation = visualizer.paletteRotation;
        state.view.rotation = visualizer.rotation;

        const fractal = FRACTAL_TYPES[state.fractal.currentType];

        // Waypoint camera: visualizer smoothly navigates between interest points
        state.view.center[0] = visualizer.cameraCenter[0];
        state.view.center[1] = visualizer.cameraCenter[1];
        state.view.scale = visualizer.cameraScale;

        // Auto-scale iterations based on zoom level and adaptive FPS
        if (fractal.paramDefs.maxIterations) {
            const baseIter = fractal.paramDefs.maxIterations.default;
            const defaultScale = fractal.defaultView.scale;
            const zoomDepth = Math.max(0, Math.log(defaultScale / Math.max(0.01, state.view.scale)));
            fractal.params.maxIterations = Math.min(
                Math.round(baseIter * (1.0 + zoomDepth * 0.5) * fpsAdaptiveScale),
                400
            );
        }

        // Apply c-drift to Julia types
        if (fractal.params.c_real !== undefined) {
            const baseCR = fractal.paramDefs.c_real.default;
            const baseCI = fractal.paramDefs.c_imag.default;
            fractal.params.c_real = baseCR + visualizer.cDriftReal;
            fractal.params.c_imag = baseCI + visualizer.cDriftImag;
        }
    }

    // --- Auto-pilot (drives the mixer directly) ---
    if (autoPilot) {
        const cfg = visualizer.autoPilotConfig;

        if (autoPilotFading) {
            // Animate the crossfade by updating mixer weights
            autoPilotFadeProgress += dt / cfg.fadeDuration;
            if (autoPilotFadeProgress >= 1.0) {
                // Fade complete: fully on the new fractal
                autoPilotFadeProgress = 1.0;
                autoPilotFading = false;
                activeMix = [{ key: autoPilotTo, weight: 1.0 }];
                state.fractal.currentType = autoPilotTo;
                if (controlPanel) controlPanel.setMixerState([autoPilotTo]);
                autoPilotTimer = 0;
                // Now safe to set waypoints — transition is done
                const ft = FRACTAL_TYPES[autoPilotTo];
                if (ft) visualizer.setInterestPoints(ft.interestPoints, ft.defaultView);
                // Clean up old palette
                if (oldPaletteTexture) {
                    renderer.gl.deleteTexture(oldPaletteTexture);
                    oldPaletteTexture = null;
                }
            } else {
                // Mid-fade: blend from -> to
                const ease = autoPilotFadeProgress < 0.5
                    ? 4 * autoPilotFadeProgress * autoPilotFadeProgress * autoPilotFadeProgress
                    : 1 - Math.pow(-2 * autoPilotFadeProgress + 2, 3) / 2;
                activeMix = [
                    { key: autoPilotFrom, weight: 1.0 - ease },
                    { key: autoPilotTo, weight: ease },
                ];
                // DON'T change currentType mid-fade — keep the "from" fractal's
                // view params active so the camera doesn't jump
            }
        } else {
            // Waiting between fades
            autoPilotTimer += dt;
            const timeBetween = cfg.timeBetweenFades || 10;
            if (autoPilotTimer >= timeBetween) {
                // Start a new fade
                const rec = visualizer.getAutoPilotRecommendation(
                    FRACTAL_NAMES, PALETTE_NAMES,
                    state.fractal.currentType, state.palette.name
                );
                autoPilotFrom = state.fractal.currentType;
                autoPilotTo = rec.fractal;
                autoPilotFading = true;
                autoPilotFadeProgress = 0;
                if (rec.palette) switchPalette(rec.palette);
                autoPilotInterval = rec.delay;
                // DON'T set waypoints here — wait until fade completes
                // Camera stays on current waypoints during the crossfade
            }
        }
    }

    // --- Palette shuffle (independent of auto-pilot) ---
    if (paletteShuffle && !autoPilotFading) {
        paletteShuffleTimer += dt;
        if (paletteShuffleTimer >= paletteShuffleInterval) {
            paletteShuffleTimer = 0;
            // Pick a palette not recently used
            let candidates = PALETTE_NAMES.filter(p => !_recentShufflePalettes.includes(p) && p !== state.palette.name);
            if (candidates.length === 0) candidates = PALETTE_NAMES.filter(p => p !== state.palette.name);
            if (candidates.length === 0) candidates = PALETTE_NAMES;
            const pick = candidates[Math.floor(Math.random() * candidates.length)];
            _recentShufflePalettes.push(pick);
            if (_recentShufflePalettes.length > 4) _recentShufflePalettes.shift();
            switchPalette(pick);
        }
    }

    // --- Update audio textures ---
    if (audioEngine.fftTextureData) {
        renderer.updateAudioTexture(fftTexture, audioEngine.fftTextureData);
    }
    if (audioEngine.waveformTextureData) {
        renderer.updateAudioTexture(waveformTexture, audioEngine.waveformTextureData);
    }

    // --- Resize check ---
    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.floor(renderer.canvas.clientWidth * dpr);
    const targetH = Math.floor(renderer.canvas.clientHeight * dpr);
    if (targetW !== renderer.width || targetH !== renderer.height) {
        renderer.resize(targetW, targetH);
        state.view.aspectRatio = renderer.aspectRatio;
    }

    // --- Render fractals ---
    const audioUniforms = visualizer.getAudioUniforms(audioData);

    // Build the mix list: either from the mixer or single fractal + auto-pilot transition
    let renderMix;
    if (activeMix && activeMix.length > 0) {
        renderMix = activeMix;
    } else {
        renderMix = [{ key: state.fractal.currentType, weight: 1.0 }];
        // Add auto-pilot transition blend if active
        if (visualizer.transitionActive && visualizer.transitionFromType && !visualizer.manualBlend) {
            const oldWeight = 1.0 - visualizer.transitionEased;
            const newWeight = visualizer.transitionEased;
            renderMix = [
                { key: visualizer.transitionFromType, weight: oldWeight },
                { key: state.fractal.currentType, weight: newWeight },
            ];
        }
    }

    // Normalize weights
    const totalWeight = renderMix.reduce((sum, m) => sum + m.weight, 0);
    if (totalWeight < 0.001) renderMix = [{ key: state.fractal.currentType, weight: 1.0 }];

    // Adaptive iterations for non-primary fractals in the mix
    for (const { key } of renderMix) {
        const ft = FRACTAL_TYPES[key];
        if (ft?.paramDefs?.maxIterations && key !== state.fractal.currentType) {
            ft.params.maxIterations = Math.max(
                ft.paramDefs.maxIterations.min || 20,
                Math.round(ft.paramDefs.maxIterations.default * fpsAdaptiveScale)
            );
        }
    }

    // Render and blend fractals incrementally
    // First fractal goes to fbos.fractal, each subsequent one blends in
    let runningWeight = 0;
    for (let i = 0; i < renderMix.length; i++) {
        const { key, weight } = renderMix[i];
        const ft = FRACTAL_TYPES[key];
        const prog = renderer.programs[ft?.shaderKey];
        if (!ft || !prog) continue;

        const uniforms = getFractalUniforms(ft, state);
        const palTex = (i > 0 && oldPaletteTexture) ? oldPaletteTexture : paletteTexture;

        if (i === 0) {
            // First fractal: render directly to fbos.fractal
            renderer.renderPass(prog, renderer.fbos.fractal,
                { 0: palTex, 1: fftTexture, 2: waveformTexture },
                { ...uniforms, ...audioUniforms, u_paletteTex: 0, u_fftTex: 1, u_waveformTex: 2 }
            );
            runningWeight = weight;
        } else {
            // Subsequent fractals: render to fbos.fractalB, then blend into fbos.fractal
            renderer.renderPass(prog, renderer.fbos.fractalB,
                { 0: paletteTexture, 1: fftTexture, 2: waveformTexture },
                { ...uniforms, ...audioUniforms, u_paletteTex: 0, u_fftTex: 1, u_waveformTex: 2 }
            );
            // Incremental blend: mixAmt = weight / (runningWeight + weight)
            const mixAmt = weight / (runningWeight + weight);
            // Blend into bloomExtract as temp, then copy back
            renderer.renderPass(renderer.programs.blend, renderer.fbos.bloomExtract,
                { 0: renderer.fbos.fractal.texture, 1: renderer.fbos.fractalB.texture },
                { u_texA: 0, u_texB: 1, u_mix: mixAmt }
            );
            renderer.renderPass(renderer.programs.blend, renderer.fbos.fractal,
                { 0: renderer.fbos.bloomExtract.texture, 1: renderer.fbos.bloomExtract.texture },
                { u_texA: 0, u_texB: 1, u_mix: 0.0 }
            );
            runningWeight += weight;
        }
    }

    // Post-processing uniforms (audio-modulated)
    const postUniforms = visualizer.getPostProcessUniforms(audioData, state.postProcessing);

    // Pass 2: Bloom Extract
    renderer.renderPass(renderer.programs.bloomExtract, renderer.fbos.bloomExtract,
        { 0: renderer.fbos.fractal.texture },
        { u_bloomThreshold: postUniforms.u_bloomThreshold }
    );

    // Pass 3: Horizontal Blur (half-resolution FBOs)
    const blurRadius = state.postProcessing.bloomRadius * (1.0 + (audioData.rms || 0) * 0.5);
    const blurW = renderer.fbos.blurPing.width;
    const blurH = renderer.fbos.blurPing.height;
    renderer.renderPass(renderer.programs.blur, renderer.fbos.blurPing,
        { 0: renderer.fbos.bloomExtract.texture },
        { u_direction: [1, 0], u_resolution: [blurW, blurH], u_blurRadius: blurRadius }
    );

    // Pass 4: Vertical Blur
    renderer.renderPass(renderer.programs.blur, renderer.fbos.blurPong,
        { 0: renderer.fbos.blurPing.texture },
        { u_direction: [0, 1], u_resolution: [blurW, blurH], u_blurRadius: blurRadius }
    );

    // Pass 5: Composite — render to diagnostics FBO if capture is pending, otherwise to screen
    const compositeTarget = diagnosticsEngine ? diagnosticsEngine.getCompositeTarget() : null;

    // Build composite textures and uniforms
    const compositeTextures = { 0: renderer.fbos.fractal.texture, 1: renderer.fbos.blurPong.texture, 2: paletteTexture };
    // During transitions, suppress color cycling so the blended palette colors
    // from the two fractal renders carry through without being overridden
    const effectiveCycleSpeed = visualizer.transitionActive ? 0.0 : state.palette.cycleSpeed;

    const compositeUniforms = {
        u_fractalTex: 0,
        u_bloomTex: 1,
        u_paletteTex: 2,
        ...postUniforms,
        u_colorCycleSpeed: effectiveCycleSpeed,
        u_paletteSpeed: state.palette.speed,
        u_time: state.time,
        u_aspectRatio: state.view.aspectRatio,
        u_beatFlash: visualizer.beatFlash,
        u_pulsePositions: visualizer.pulsePositions,
        u_pulseStrengths: visualizer.pulseStrengths,
    };

    // Composite pass (transition blend already applied to fractal FBO above)
    renderer.renderPass(renderer.programs.composite, compositeTarget,
        compositeTextures,
        compositeUniforms
    );

    // --- Diagnostics: blit to screen and process captures ---
    if (diagnosticsEngine && diagnosticsEngine.active) {
        diagnosticsEngine.afterComposite();
        diagnosticsEngine.onFrameRendered();
    }

    // FPS counter
    frameCount++;
    if (timestamp - lastFpsTime >= 500) {
        const fps = Math.round(frameCount / ((timestamp - lastFpsTime) / 1000));
        fpsCounter.textContent = `${fps} FPS`;
        frameCount = 0;
        lastFpsTime = timestamp;
    }

    // Update audio meters in control panel
    if (controlPanel) controlPanel.updateAudioMeters(audioData, visualizer.beatFlash);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
