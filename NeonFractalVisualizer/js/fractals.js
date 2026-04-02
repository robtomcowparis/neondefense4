// Fractal type registry — defines each fractal's parameters, defaults, shader key, and audio mappings

import {
    DOMAIN_WARPED_JULIA_FRAG,
    KIFS_FRAG,
    AUDIO_POWER_MANDELBROT_FRAG,
    FRACTAL_NOISE_FRAG,
    NOVA_FRAG,
} from './shaders.js';

class FractalType {
    constructor(config) {
        this.name = config.name;
        this.shaderKey = config.shaderKey;
        this.fragSource = config.fragSource;
        this.params = {};
        this.paramDefs = config.params;
        this.defaultView = config.defaultView;
        this.interestPoints = config.interestPoints || [];

        for (const [key, def] of Object.entries(config.params)) {
            this.params[key] = def.default;
        }
    }

    getUniforms(state) {
        const uniforms = {
            u_center: state.view.center,
            u_scale: state.view.scale,
            u_aspectRatio: state.view.aspectRatio,
            u_time: state.time,
            u_paletteSpeed: state.palette.speed,
            u_paletteRotation: state.palette.rotation,
            u_symmetryMode: state.symmetry.mode,
            u_symmetryOrder: state.symmetry.order,
            u_rotation: state.view.rotation,
        };

        for (const [key, def] of Object.entries(this.paramDefs)) {
            if (def.uniform) {
                uniforms[def.uniform] = this.params[key];
            }
        }

        return uniforms;
    }

    resetParams() {
        for (const [key, def] of Object.entries(this.paramDefs)) {
            this.params[key] = def.default;
        }
    }
}

export const FRACTAL_TYPES = {
    domainJulia: new FractalType({
        name: 'Domain-Warped Julia',
        shaderKey: 'domainJulia',
        fragSource: DOMAIN_WARPED_JULIA_FRAG,
        defaultView: { center: [0, 0], scale: 1.8 },
        // Points of interest on the Julia boundary (c = -0.7269 + 0.1889i)
        interestPoints: [
            { center: [0.35, 0.35], scale: 0.2 },    // spiral arm — deep
            { center: [-0.4, 0.3], scale: 0.25 },    // boundary cusp
            { center: [0.0, 0.55], scale: 0.18 },    // top tendril — tight
            { center: [0.5, -0.1], scale: 0.15 },    // right boundary detail — very close
            { center: [-0.3, -0.4], scale: 0.22 },   // lower left spiral
            { center: [0.15, -0.5], scale: 0.2 },    // bottom boundary
            { center: [-0.55, 0.0], scale: 0.25 },   // left wing
            { center: [0.2, 0.25], scale: 0.12 },    // deep spiral detail — deepest
        ],
        params: {
            maxIterations: { default: 200, min: 50, max: 800, step: 10, label: 'Max Iterations', uniform: 'u_maxIterations' },
            c_real: { default: -0.7269, min: -2, max: 2, step: 0.001, label: 'C Real', uniform: null },
            c_imag: { default: 0.1889, min: -2, max: 2, step: 0.001, label: 'C Imag', uniform: null },
            warpPreset: { default: 0, min: 0, max: 3, step: 1, label: 'Warp Style', uniform: 'u_warpPreset' },
        },
    }),

    kifs: new FractalType({
        name: 'Kaleidoscopic IFS',
        shaderKey: 'kifs',
        fragSource: KIFS_FRAG,
        defaultView: { center: [0.8, 0.8], scale: 0.8 },
        // KIFS has repeating structure — dive into the fold boundaries
        interestPoints: [
            { center: [1.0, 1.0], scale: 0.15 },     // primary fold — deep
            { center: [0.5, 0.5], scale: 0.12 },     // inner fold detail — very close
            { center: [1.5, 0.8], scale: 0.2 },      // outer fold pattern
            { center: [0.8, 1.5], scale: 0.2 },      // upper fold
            { center: [1.2, 1.2], scale: 0.1 },      // deep fold center — deepest
            { center: [0.3, 1.0], scale: 0.18 },     // edge detail
            { center: [1.0, 0.3], scale: 0.18 },     // lower edge
            { center: [0.7, 0.7], scale: 0.15 },     // inner structure
        ],
        params: {
            maxIterations: { default: 60, min: 10, max: 200, step: 5, label: 'Iterations', uniform: 'u_maxIterations' },
            kifsScale: { default: 1.5, min: 1.1, max: 3.0, step: 0.01, label: 'Scale', uniform: 'u_kifsScale' },
            kifsRotation: { default: 0.78, min: 0, max: 6.28, step: 0.01, label: 'Rotation', uniform: 'u_kifsRotation' },
            kifsOffsetX: { default: 1.0, min: -3, max: 3, step: 0.01, label: 'Offset X', uniform: null },
            kifsOffsetY: { default: 1.0, min: -3, max: 3, step: 0.01, label: 'Offset Y', uniform: null },
        },
    }),

    audioPower: new FractalType({
        name: 'Audio-Power Mandelbrot',
        shaderKey: 'audioPower',
        fragSource: AUDIO_POWER_MANDELBROT_FRAG,
        defaultView: { center: [-0.5, 0], scale: 3.5 },
        // Classic Mandelbrot boundary points — deep dives
        interestPoints: [
            { center: [-0.75, 0.1], scale: 0.06 },    // Seahorse Valley — deep
            { center: [-0.16, 1.035], scale: 0.04 },  // top antenna — very close
            { center: [0.28, 0.008], scale: 0.015 },  // elephant valley — deepest
            { center: [-1.25, 0.0], scale: 0.08 },    // period-2 bulb tip
            { center: [-0.5, 0.56], scale: 0.12 },    // upper boundary
            { center: [-0.108, 0.9], scale: 0.06 },   // filament
            { center: [-1.77, 0.0], scale: 0.05 },    // far left tip
            { center: [-0.745, 0.186], scale: 0.02 }, // deep seahorse spiral
        ],
        params: {
            maxIterations: { default: 200, min: 50, max: 800, step: 10, label: 'Max Iterations', uniform: 'u_maxIterations' },
            basePower: { default: 2.0, min: 1.5, max: 6.0, step: 0.1, label: 'Base Power', uniform: 'u_basePower' },
        },
    }),

    fractalNoise: new FractalType({
        name: 'Fractal Noise',
        shaderKey: 'fractalNoise',
        fragSource: FRACTAL_NOISE_FRAG,
        defaultView: { center: [0, 0], scale: 4.0 },
        // Fractal noise has detail everywhere — dive close
        interestPoints: [
            { center: [1.0, 0.5], scale: 0.5 },
            { center: [-0.8, 1.2], scale: 0.4 },
            { center: [0.3, -1.0], scale: 0.6 },
            { center: [-1.5, -0.5], scale: 0.5 },
            { center: [0.5, 1.5], scale: 0.35 },
            { center: [0.0, 0.0], scale: 0.8 },
        ],
        params: {
            octaves: { default: 6, min: 2, max: 8, step: 1, label: 'Octaves', uniform: 'u_octaves' },
        },
    }),

    nova: new FractalType({
        name: 'Nova Fractal',
        shaderKey: 'nova',
        fragSource: NOVA_FRAG,
        defaultView: { center: [0, 0], scale: 3.5 },
        // Nova root basin boundaries — deep dives into fractal edges
        interestPoints: [
            { center: [1.0, 0.0], scale: 0.15 },      // near root at (1,0)
            { center: [-0.5, 0.866], scale: 0.15 },   // near root at 120°
            { center: [-0.5, -0.866], scale: 0.15 },  // near root at 240°
            { center: [0.3, 0.5], scale: 0.1 },       // basin boundary — close
            { center: [-0.3, 0.2], scale: 0.12 },     // central boundary
            { center: [0.7, 0.4], scale: 0.08 },      // between roots — deep
        ],
        params: {
            maxIterations: { default: 100, min: 20, max: 300, step: 5, label: 'Iterations', uniform: 'u_maxIterations' },
            rootCount: { default: 3, min: 3, max: 8, step: 1, label: 'Root Count', uniform: 'u_rootCount' },
            baseDamping: { default: 1.0, min: 0.3, max: 2.0, step: 0.01, label: 'Damping', uniform: 'u_baseDamping' },
        },
    }),
};

export const FRACTAL_NAMES = Object.keys(FRACTAL_TYPES);

export function getFractalUniforms(fractalType, state) {
    const uniforms = fractalType.getUniforms(state);

    // Julia c parameter
    if (fractalType.params.c_real !== undefined) {
        uniforms.u_c = [fractalType.params.c_real, fractalType.params.c_imag];
    }

    // KIFS offset
    if (fractalType.params.kifsOffsetX !== undefined) {
        uniforms.u_kifsOffset = [fractalType.params.kifsOffsetX, fractalType.params.kifsOffsetY];
    }

    return uniforms;
}
