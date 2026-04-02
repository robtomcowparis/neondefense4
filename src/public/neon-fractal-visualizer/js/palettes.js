// 15 palettes ported from FractalGeneratorV2
// Each palette is defined by control points, interpolated into 256 RGB entries

function makePalette(controlPoints) {
    const palette = new Float32Array(256 * 3);
    const n = controlPoints.length;
    for (let i = 0; i < 256; i++) {
        const t = (i / 255.0) * (n - 1);
        const idx = Math.floor(t);
        const frac = t - idx;
        const a = Math.min(idx, n - 1);
        const b = Math.min(idx + 1, n - 1);
        palette[i * 3 + 0] = controlPoints[a][0] * (1 - frac) + controlPoints[b][0] * frac;
        palette[i * 3 + 1] = controlPoints[a][1] * (1 - frac) + controlPoints[b][1] * frac;
        palette[i * 3 + 2] = controlPoints[a][2] * (1 - frac) + controlPoints[b][2] * frac;
    }
    return palette;
}

export const PALETTE_DEFINITIONS = {
    "Electric Neon": [
        [0.0, 0.0, 0.0], [0.0, 0.8, 1.0], [1.0, 0.0, 1.0],
        [1.0, 1.0, 0.0], [1.0, 1.0, 1.0],
    ],
    "Deep Space": [
        [0.0, 0.0, 0.0], [0.15, 0.0, 0.3], [0.3, 0.0, 0.5],
        [0.8, 0.1, 0.5], [1.0, 1.0, 1.0],
    ],
    "Fire": [
        [0.0, 0.0, 0.0], [0.5, 0.0, 0.0], [0.9, 0.3, 0.0],
        [1.0, 0.8, 0.0], [1.0, 1.0, 0.9],
    ],
    "Ocean": [
        [0.0, 0.0, 0.05], [0.0, 0.1, 0.4], [0.0, 0.4, 0.5],
        [0.0, 0.8, 0.9], [0.8, 1.0, 1.0],
    ],
    "Psychedelic Rainbow": [
        [1.0, 0.0, 0.0], [1.0, 0.5, 0.0], [1.0, 1.0, 0.0],
        [0.0, 1.0, 0.0], [0.0, 0.5, 1.0], [0.3, 0.0, 1.0],
        [0.8, 0.0, 0.8], [1.0, 0.0, 0.0],
    ],
    "Vaporwave": [
        [0.05, 0.0, 0.1], [0.9, 0.3, 0.6], [0.5, 0.1, 0.8],
        [0.0, 0.8, 0.8], [0.5, 1.0, 0.8],
    ],
    "Northern Lights": [
        [0.0, 0.0, 0.05], [0.0, 0.6, 0.3], [0.0, 0.5, 0.5],
        [0.4, 0.1, 0.6], [0.8, 0.3, 0.5], [0.3, 0.8, 0.4],
    ],
    "Molten Gold": [
        [0.0, 0.0, 0.0], [0.3, 0.0, 0.0], [0.7, 0.2, 0.0],
        [0.9, 0.6, 0.1], [1.0, 0.85, 0.4], [1.0, 1.0, 0.9],
    ],
    "Toxic": [
        [0.0, 0.0, 0.0], [0.0, 0.2, 0.0], [0.2, 0.7, 0.0],
        [0.6, 0.9, 0.0], [1.0, 1.0, 0.5],
    ],
    "Cosmic": [
        [0.0, 0.0, 0.05], [0.15, 0.0, 0.4], [0.1, 0.1, 0.7],
        [0.6, 0.0, 0.8], [1.0, 1.0, 1.0], [0.1, 0.3, 0.8],
    ],
    "Infrared": [
        [0.0, 0.0, 0.0], [0.3, 0.0, 0.0], [0.7, 0.0, 0.0],
        [1.0, 0.3, 0.0], [1.0, 0.8, 0.2],
    ],
    "Cyberpunk": [
        [0.1, 0.0, 0.2], [0.3, 0.0, 0.4], [1.0, 0.1, 0.5],
        [0.0, 0.9, 1.0], [1.0, 1.0, 1.0],
    ],
    "Sunset": [
        [0.1, 0.0, 0.2], [0.3, 0.0, 0.4], [0.7, 0.0, 0.2],
        [1.0, 0.4, 0.0], [1.0, 0.75, 0.2],
    ],
    "Bioluminescent": [
        [0.0, 0.0, 0.05], [0.0, 0.05, 0.3], [0.0, 0.5, 0.6],
        [0.1, 0.8, 0.3], [0.6, 1.0, 0.3], [0.9, 1.0, 0.6],
    ],
    "Fractal Classic": [
        [0.0, 0.0, 0.3], [0.0, 0.5, 0.8], [0.9, 0.9, 1.0],
        [1.0, 1.0, 0.3], [0.8, 0.1, 0.0], [0.3, 0.0, 0.0],
    ],

    // --- NEON DARK MODES ---

    "Neon Void": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.9, 1.0],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [1.0, 0.0, 0.8],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
    ],
    "Neon Pulse": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.02], [0.0, 1.0, 0.4],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.02], [1.0, 0.0, 0.5],
        [0.0, 0.0, 0.0],
    ],
    "Midnight Laser": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.9, 0.0, 0.1], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.3, 1.0], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0],
    ],
    "Dark Synth": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.5, 0.0, 0.9],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.9, 0.1, 0.5], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
    ],
    "Abyss Glow": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.7, 0.9], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.9, 0.4], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0],
    ],
    "Blacklight": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.4, 0.0, 0.9], [0.8, 0.0, 1.0], [0.4, 0.0, 0.9],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
    ],
    "Neon Grid": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.9, 0.5], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [1.0, 0.6, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
    ],
    "Blood Moon": [
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.7, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.8, 0.15, 0.0],
        [0.0, 0.0, 0.0], [0.0, 0.0, 0.0],
    ],
};

export const PALETTE_NAMES = Object.keys(PALETTE_DEFINITIONS);

const PALETTES = {};
for (const name of PALETTE_NAMES) {
    PALETTES[name] = makePalette(PALETTE_DEFINITIONS[name]);
}
export { PALETTES };

export function createPaletteTexture(gl, paletteData) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const floatExt = gl.getExtension('OES_texture_float_linear');
    if (floatExt) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB32F, 256, 1, 0, gl.RGB, gl.FLOAT, paletteData);
    } else {
        const u8 = new Uint8Array(256 * 3);
        for (let i = 0; i < 256 * 3; i++) {
            u8[i] = Math.round(Math.max(0, Math.min(1, paletteData[i])) * 255);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 256, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, u8);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    return texture;
}
