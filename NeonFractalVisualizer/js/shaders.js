// V4 GLSL shaders — fractal + post-processing, all with audio integration

// ============================================================
// Common GLSL utilities (complex math, V2 variations, symmetry)
// ============================================================
export const COMMON_GLSL = `
// --- Complex number operations ---
vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}
vec2 csqr(vec2 z) {
    return vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y);
}
vec2 cdiv(vec2 a, vec2 b) {
    float d = dot(b, b) + 1e-20;
    return vec2(dot(a, b), a.y*b.x - a.x*b.y) / d;
}
float cabs(vec2 z) { return length(z); }
vec2 cpow(vec2 z, float n) {
    float r = length(z);
    if (r < 1e-20) return vec2(0.0);
    float theta = atan(z.y, z.x);
    return pow(r, n) * vec2(cos(n*theta), sin(n*theta));
}

// --- V2 variation functions (domain warps) ---
vec2 var_spherical(vec2 z) {
    float r2 = dot(z, z) + 1e-10;
    return z / r2;
}
vec2 var_swirl(vec2 z) {
    float r2 = dot(z, z);
    float sr = sin(r2), cr = cos(r2);
    return vec2(z.x*sr - z.y*cr, z.x*cr + z.y*sr);
}
vec2 var_sinusoidal(vec2 z) {
    return vec2(sin(z.x), sin(z.y));
}
vec2 var_horseshoe(vec2 z) {
    float r = length(z) + 1e-10;
    return vec2((z.x-z.y)*(z.x+z.y), 2.0*z.x*z.y) / r;
}
vec2 var_disc(vec2 z) {
    float r = length(z) + 1e-10;
    float theta = atan(z.y, z.x);
    float tn = theta / 3.14159265;
    return vec2(tn * sin(3.14159265*r), tn * cos(3.14159265*r));
}
vec2 var_spiral(vec2 z) {
    float r = length(z) + 1e-10;
    float theta = atan(z.y, z.x);
    float s = 1.0 / r;
    return vec2(s*(cos(theta) + sin(r)), s*(sin(theta) - cos(r)));
}
vec2 var_heart(vec2 z) {
    float r = length(z);
    float theta = atan(z.y, z.x);
    return vec2(r*sin(theta*r), -r*cos(theta*r));
}
vec2 var_diamond(vec2 z) {
    float r = length(z);
    float theta = atan(z.y, z.x);
    return vec2(sin(theta)*cos(r), cos(theta)*sin(r));
}
vec2 var_bent(vec2 z) {
    float xo = z.x < 0.0 ? 2.0*z.x : z.x;
    float yo = z.y < 0.0 ? z.y*0.5 : z.y;
    return vec2(xo, yo);
}
vec2 var_curl(vec2 z, float c1, float c2) {
    float t1 = 1.0 + c1*z.x + c2*(z.x*z.x - z.y*z.y);
    float t2 = c1*z.y + 2.0*c2*z.x*z.y;
    float d = 1.0 / (t1*t1 + t2*t2 + 1e-10);
    return vec2((z.x*t1 + z.y*t2)*d, (z.y*t1 - z.x*t2)*d);
}
vec2 var_julia(vec2 z) {
    float r = length(z);
    float sqr = sqrt(r);
    float theta = atan(z.y, z.x) * 0.5;
    return sqr * vec2(cos(theta), sin(theta));
}
vec2 var_polar(vec2 z) {
    float theta = atan(z.y, z.x);
    float r = length(z);
    return vec2(theta / 3.14159265, r - 1.0);
}

// --- Palette lookup ---
vec3 paletteColor(float t, sampler2D paletteTex) {
    return texture(paletteTex, vec2(t, 0.5)).rgb;
}

// --- Symmetry transforms ---
vec2 applySymmetry(vec2 z, int mode, int order) {
    if (mode == 1) {
        z.x = abs(z.x);
    } else if (mode == 2) {
        float angle = atan(z.y, z.x);
        float sector = 6.28318530718 / float(order);
        angle = mod(angle + sector*0.5, sector) - sector*0.5;
        float r = length(z);
        z = vec2(cos(angle), sin(angle)) * r;
    } else if (mode == 3) {
        float angle = atan(z.y, z.x);
        float sector = 6.28318530718 / float(order);
        angle = mod(angle + sector*0.5, sector) - sector*0.5;
        angle = abs(angle);
        float r = length(z);
        z = vec2(cos(angle), sin(angle)) * r;
    }
    return z;
}

vec2 rotate2D(vec2 z, float angle) {
    float c = cos(angle), s = sin(angle);
    return vec2(z.x*c - z.y*s, z.x*s + z.y*c);
}

// --- Simplex noise for fractal noise type ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((x*34.0 + 1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0*fract(p*C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
    vec3 g;
    g.x = a0.x*x0.x + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0 * dot(m, g);
}
`;

// ============================================================
// Vertex shader
// ============================================================
export const FULLSCREEN_QUAD_VERT = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 v_uv;
void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// ============================================================
// Audio uniform block (shared by all fractal shaders)
// ============================================================
const AUDIO_UNIFORMS = `
uniform float u_bassEnergy;
uniform float u_lowMidEnergy;
uniform float u_midEnergy;
uniform float u_highMidEnergy;
uniform float u_highEnergy;
uniform float u_rmsEnergy;
uniform float u_beatFlash;
uniform float u_spectralCentroid;
uniform float u_breathScale;
uniform float u_noiseWarpAmount;
uniform float u_pulsePositions[8];
uniform float u_pulseStrengths[8];
uniform sampler2D u_fftTex;
uniform sampler2D u_waveformTex;
uniform int u_pulseWarpEnabled;
`;

// ============================================================
// Shared fractal uniform block
// ============================================================
const FRACTAL_UNIFORMS = `
uniform vec2 u_center;
uniform float u_scale;
uniform float u_aspectRatio;
uniform float u_time;
uniform float u_paletteSpeed;
uniform float u_paletteRotation;
uniform sampler2D u_paletteTex;
uniform int u_symmetryMode;
uniform int u_symmetryOrder;
uniform float u_rotation;
`;

// ============================================================
// Pulse wave displacement function (shared)
// ============================================================
const PULSE_WAVE_FUNC = `
vec2 applyPulseWaves(vec2 z, float dist) {
    // Pulse waves now only produce very subtle geometry displacement.
    // The main pulse visual effect is the color flash in the composite shader.
    vec2 dir = length(z) > 1e-6 ? normalize(z) : vec2(1.0, 0.0);
    vec2 displacement = vec2(0.0);
    for (int i = 0; i < 8; i++) {
        float wavePos = u_pulsePositions[i];
        float waveStr = u_pulseStrengths[i];
        if (waveStr < 0.005) continue;
        float waveDist = abs(dist - wavePos);
        float envelope = waveStr * exp(-waveDist * 6.0) * exp(-wavePos * 0.8);
        displacement += dir * envelope * 0.02 * sin(waveDist * 15.0 - wavePos * 3.0);
    }
    return displacement;
}
`;

// ============================================================
// Noise warp function — fractal noise distortion for all shaders
// ============================================================
const NOISE_WARP_FUNC = `
vec2 applyNoiseWarp(vec2 z, float amount, float time) {
    if (amount < 0.001) return z;
    // Two-layer FBM domain warp
    vec2 q = vec2(
        snoise(z * 1.5 + vec2(0.0, 0.0) + time * 0.08),
        snoise(z * 1.5 + vec2(5.2, 1.3) + time * 0.08)
    );
    vec2 r = vec2(
        snoise(z * 1.5 + 3.0*q + vec2(1.7, 9.2) + time * 0.05),
        snoise(z * 1.5 + 3.0*q + vec2(8.3, 2.8) + time * 0.05)
    );
    return z + r * amount * 0.3;
}
`;

// ============================================================
// Fractal Type 1: Domain-Warped Julia Set (flagship)
// ============================================================
export const DOMAIN_WARPED_JULIA_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

${FRACTAL_UNIFORMS}
${AUDIO_UNIFORMS}
uniform vec2 u_c;
uniform int u_maxIterations;
uniform float u_warpPreset;

${COMMON_GLSL}
${PULSE_WAVE_FUNC}
${NOISE_WARP_FUNC}

void main() {
    vec2 uv = v_uv - 0.5;
    uv.x *= u_aspectRatio;
    vec2 z = uv * u_scale * u_breathScale;
    z = rotate2D(z, u_rotation);
    z += u_center;
    z = applySymmetry(z, u_symmetryMode, u_symmetryOrder);

    float dist = length(z);

    // === PULSE WAVE DISPLACEMENT (optional — toggled by u_pulseWarpEnabled) ===
    if (u_pulseWarpEnabled == 1) {
        z += applyPulseWaves(z, dist);
        // Noise warp only when pulse warp is enabled
        z = applyNoiseWarp(z, u_noiseWarpAmount * 0.25, u_time);
        // Beat-driven domain warp
        float beatWarp = u_beatFlash * 0.02;
        z = mix(z, var_spherical(z), beatWarp);
        // Waveform angular displacement
        float angle = atan(z.y, z.x);
        float waveIdx = (angle / 6.28318 + 0.5);
        float waveVal = texture(u_waveformTex, vec2(waveIdx, 0.5)).r;
        vec2 wDir = length(z) > 1e-6 ? normalize(z) : vec2(1.0, 0.0);
        z += wDir * waveVal * u_rmsEnergy * 0.015;
        // FFT radial mapping
        float freqIdx = clamp(length(z) * 0.25, 0.0, 1.0);
        float fftVal = texture(u_fftTex, vec2(freqIdx, 0.5)).r;
        z *= 1.0 + fftVal * u_rmsEnergy * 0.03;
    }

    // === JULIA ITERATION ===
    vec2 c = u_c;
    float iter = 0.0;
    float maxIter = float(u_maxIterations);

    // Orbit trap accumulators
    float trapCircle = 1e10;
    float trapLine = 1e10;
    float trapCross = 1e10;

    for (float i = 0.0; i < 1000.0; i += 1.0) {
        if (i >= maxIter) break;
        z = csqr(z) + c;

        // Orbit traps
        float d = length(z);
        trapCircle = min(trapCircle, abs(d - 1.0));
        trapLine = min(trapLine, abs(z.y));
        trapCross = min(trapCross, min(abs(z.x), abs(z.y)));

        if (dot(z, z) > 256.0) { iter = i; break; }
        iter = i;
    }

    if (dot(z, z) <= 256.0) {
        // Interior — use orbit trap for color
        float trapT = exp(-trapCircle * 4.0) * 0.5 + exp(-trapCross * 6.0) * 0.3;
        vec3 color = paletteColor(fract(trapT + u_paletteRotation), u_paletteTex) * 0.4;
        fragColor = vec4(color, 0.0);
    } else {
        float smoothIter = iter - log2(log2(dot(z, z))) + 4.0;
        float t = fract(smoothIter * u_paletteSpeed * 0.02 + u_paletteRotation);
        vec3 color = paletteColor(t, u_paletteTex);

        // Orbit trap ribbon overlay
        float ribbon = exp(-trapCircle * 5.0) * 0.6 + exp(-trapLine * 8.0) * 0.3;
        vec3 trapColor = paletteColor(fract(t + 0.3 + u_spectralCentroid * 0.2), u_paletteTex);
        color = mix(color, trapColor, ribbon * 0.5);

        fragColor = vec4(color, smoothIter);
    }
}
`;

// ============================================================
// Fractal Type 2: Kaleidoscopic IFS (KIFS)
// ============================================================
export const KIFS_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

${FRACTAL_UNIFORMS}
${AUDIO_UNIFORMS}
uniform int u_maxIterations;
uniform float u_kifsScale;
uniform float u_kifsRotation;
uniform vec2 u_kifsOffset;

${COMMON_GLSL}
${PULSE_WAVE_FUNC}
${NOISE_WARP_FUNC}

void main() {
    vec2 uv = v_uv - 0.5;
    uv.x *= u_aspectRatio;
    vec2 z = uv * u_scale * u_breathScale;
    z = rotate2D(z, u_rotation);
    z += u_center;

    float dist = length(z);
    if (u_pulseWarpEnabled == 1) {
        z += applyPulseWaves(z, dist);
        z = applyNoiseWarp(z, u_noiseWarpAmount, u_time);
    }

    float colorAcc = 0.0;
    float minDist = 1e10;
    float maxIter = float(u_maxIterations);

    for (float i = 0.0; i < 200.0; i += 1.0) {
        if (i >= maxIter) break;

        // Kaleidoscopic fold
        z = abs(z);

        // Audio-modulated rotation per iteration (subtle — preserves kaleidoscope structure)
        float rotAngle = u_kifsRotation + u_beatFlash * 0.04 * sin(i * 0.5 + u_time * 0.5);
        z = rotate2D(z, rotAngle);

        // Scale and translate
        z = z * u_kifsScale - u_kifsOffset;

        // Very subtle per-iteration wobble on beats only
        z += vec2(u_beatFlash * 0.008 * sin(i * 1.7),
                  u_beatFlash * 0.008 * cos(i * 1.3));

        float d = length(z);
        colorAcc += exp(-d * 0.5);
        minDist = min(minDist, d);
    }

    // Color from accumulated orbit distance
    float t = fract(colorAcc * 0.05 * u_paletteSpeed + u_paletteRotation);
    vec3 color = paletteColor(t, u_paletteTex);

    // Brighten based on minimum distance (edge glow)
    float glow = exp(-minDist * 2.0);
    color += glow * paletteColor(fract(t + 0.4), u_paletteTex) * 0.4;

    // FFT-based color modulation
    float fftVal = texture(u_fftTex, vec2(clamp(minDist * 0.2, 0.0, 1.0), 0.5)).r;
    color *= 1.0 + fftVal * 0.3;

    float brightness = clamp(colorAcc * 0.02, 0.0, 1.0);
    fragColor = vec4(color * brightness, colorAcc);
}
`;

// ============================================================
// Fractal Type 3: Audio-Power Mandelbrot
// ============================================================
export const AUDIO_POWER_MANDELBROT_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

${FRACTAL_UNIFORMS}
${AUDIO_UNIFORMS}
uniform int u_maxIterations;
uniform float u_basePower;

${COMMON_GLSL}
${PULSE_WAVE_FUNC}
${NOISE_WARP_FUNC}

void main() {
    vec2 uv = v_uv - 0.5;
    uv.x *= u_aspectRatio;
    vec2 pos = uv * u_scale * u_breathScale;
    pos = rotate2D(pos, u_rotation);
    vec2 c = u_center + pos;
    c = applySymmetry(c, u_symmetryMode, u_symmetryOrder);

    float dist = length(c - u_center);
    if (u_pulseWarpEnabled == 1) {
        c += applyPulseWaves(c - u_center, dist);
        c = applyNoiseWarp(c, u_noiseWarpAmount * 0.7, u_time);
    }

    // Audio modulates the power: z^(power) + c (clamped to keep set visible)
    float power = u_basePower + u_bassEnergy * 0.3 + u_beatFlash * 0.2;

    vec2 z = vec2(0.0);
    float iter = 0.0;
    float maxIter = float(u_maxIterations);
    float trapCircle = 1e10;

    for (float i = 0.0; i < 1000.0; i += 1.0) {
        if (i >= maxIter) break;

        if (power == 2.0) {
            z = csqr(z) + c;
        } else {
            z = cpow(z, power) + c;
        }

        trapCircle = min(trapCircle, abs(length(z) - 1.0));

        if (dot(z, z) > 256.0) { iter = i; break; }
        iter = i;
    }

    if (dot(z, z) <= 256.0) {
        float trapT = exp(-trapCircle * 4.0);
        vec3 color = paletteColor(fract(trapT + u_paletteRotation), u_paletteTex) * 0.35;
        fragColor = vec4(color, 0.0);
    } else {
        float smoothIter = iter - log2(log2(dot(z, z))) + 4.0;
        float t = fract(smoothIter * u_paletteSpeed * 0.02 + u_paletteRotation);
        // Scale exterior brightness by iteration depth for more contrast
        float depthFade = clamp(smoothIter * 0.02, 0.3, 0.9);
        vec3 color = paletteColor(t, u_paletteTex) * depthFade;
        float ribbon = exp(-trapCircle * 5.0);
        vec3 ribbonColor = paletteColor(fract(t + 0.35), u_paletteTex);
        color = mix(color, ribbonColor, ribbon * 0.3);
        fragColor = vec4(color, smoothIter);
    }
}
`;

// ============================================================
// Fractal Type 4: Domain-Warped Fractal Noise
// ============================================================
export const FRACTAL_NOISE_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

${FRACTAL_UNIFORMS}
${AUDIO_UNIFORMS}
uniform int u_octaves;

${COMMON_GLSL}
${PULSE_WAVE_FUNC}

float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = v_uv - 0.5;
    uv.x *= u_aspectRatio;
    vec2 z = uv * u_scale * u_breathScale;
    z = rotate2D(z, u_rotation);
    z += u_center;

    float dist = length(z);
    if (u_pulseWarpEnabled == 1) {
        z += applyPulseWaves(z, dist);
    }

    // Domain warp: each octave is distorted by audio
    vec2 q = vec2(
        fbm(z + vec2(0.0, 0.0) + u_time * 0.05 * u_rmsEnergy, u_octaves),
        fbm(z + vec2(5.2, 1.3) + u_time * 0.05 * u_rmsEnergy, u_octaves)
    );

    // Audio-driven secondary warp
    vec2 r = vec2(
        fbm(z + 4.0*q + vec2(1.7, 9.2) + u_bassEnergy * 1.5, u_octaves),
        fbm(z + 4.0*q + vec2(8.3, 2.8) + u_midEnergy * 1.5, u_octaves)
    );

    // Third layer for depth
    float f = fbm(z + 4.0*r + u_highEnergy * vec2(0.5, 0.3), u_octaves);

    // Waveform displacement
    float waveAngle = atan(z.y, z.x);
    float wIdx = (waveAngle / 6.28318 + 0.5);
    float wVal = texture(u_waveformTex, vec2(wIdx, 0.5)).r;
    f += wVal * u_rmsEnergy * 0.3;

    // FFT radial
    float fftIdx = clamp(dist * 0.3, 0.0, 1.0);
    float fftVal = texture(u_fftTex, vec2(fftIdx, 0.5)).r;
    f += fftVal * 0.2;

    // Color mapping
    float t = fract(f * 0.5 * u_paletteSpeed + u_paletteRotation + length(q) * 0.3);
    vec3 color = paletteColor(t, u_paletteTex);

    // Modulate brightness by warped value
    float brightness = clamp(0.5 + f * 0.6, 0.1, 1.0);
    color *= brightness;

    // Edge glow from warp gradient
    float glow = length(r) * 0.3;
    color += glow * paletteColor(fract(t + 0.4), u_paletteTex) * 0.2;

    fragColor = vec4(color, f * 10.0);
}
`;

// ============================================================
// Fractal Type 5: Nova Fractal (Newton + Mandelbrot hybrid)
// Much more dynamic than plain Newton — adds a Mandelbrot-like
// perturbation c to the Newton iteration: z = z - d*f(z)/f'(z) + c
// This creates swirling, Julia-like structures around the Newton basins
// ============================================================
export const NOVA_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

${FRACTAL_UNIFORMS}
${AUDIO_UNIFORMS}
uniform int u_maxIterations;
uniform float u_rootCount;
uniform float u_baseDamping;

${COMMON_GLSL}
${PULSE_WAVE_FUNC}
${NOISE_WARP_FUNC}

void main() {
    vec2 uv = v_uv - 0.5;
    uv.x *= u_aspectRatio;
    vec2 pos = uv * u_scale * u_breathScale;
    pos = rotate2D(pos, u_rotation);
    vec2 c = u_center + pos;
    c = applySymmetry(c, u_symmetryMode, u_symmetryOrder);

    float dist = length(c - u_center);
    if (u_pulseWarpEnabled == 1) {
        c += applyPulseWaves(c - u_center, dist);
        c = applyNoiseWarp(c, u_noiseWarpAmount, u_time);
    }

    // Minimal domain warp — only on strong beats
    float beatWarp = u_beatFlash * 0.05;
    vec2 warped = mix(c, var_swirl(c * 0.8), beatWarp);

    vec2 z = warped;
    float n = u_rootCount;

    // Damping with audio modulation (clamped tighter to keep convergence)
    float damping = u_baseDamping + u_bassEnergy * 0.25 + u_beatFlash * 0.15;
    damping = clamp(damping, 0.5, 1.6);

    float maxIter = float(u_maxIterations);
    float iter = 0.0;

    // Orbit trap accumulators for richer coloring
    float trapCircle = 1e10;
    float trapSpiral = 1e10;
    float orbitSum = 0.0;

    for (float i = 0.0; i < 500.0; i += 1.0) {
        if (i >= maxIter) break;

        vec2 zn = cpow(z, n);
        vec2 zn1 = cpow(z, n - 1.0);
        vec2 f = zn - vec2(1.0, 0.0);
        vec2 fp = vec2(n) * zn1;
        vec2 step = cdiv(f, fp);

        // Nova iteration: z = z - damping * f/f' + c (the +c is what makes it interesting)
        float localDamp = damping + u_highEnergy * 0.15 * sin(i * 0.7);
        z = z - vec2(localDamp) * step + c * 0.15;

        // Orbit traps
        float d = length(z);
        trapCircle = min(trapCircle, abs(d - 1.0));
        float spiralAngle = atan(z.y, z.x) + d * 3.0;
        trapSpiral = min(trapSpiral, abs(sin(spiralAngle) * d));
        orbitSum += exp(-d * 0.3);

        // Escape check (Nova can escape unlike plain Newton)
        if (dot(z, z) > 100.0) { iter = i; break; }
        // Convergence check
        if (dot(step, step) < 1e-10) { iter = i; break; }
        iter = i;
    }

    // Rich coloring from orbit data
    float escaped = dot(z, z) > 100.0 ? 1.0 : 0.0;

    // Determine closest root
    float angle = atan(z.y, z.x);
    float rootAngle = 6.28318530718 / n;
    float closest = floor(mod(angle / rootAngle + n + 0.5, n));

    float shade = 1.0 - iter / maxIter;
    shade = pow(shade, 0.4);

    // Multiple color channels from different orbit properties
    float ribbonCircle = exp(-trapCircle * 5.0);
    float ribbonSpiral = exp(-trapSpiral * 4.0);
    float orbitGlow = clamp(orbitSum * 0.015, 0.0, 1.0);

    // Base color from root + iteration
    float t = fract(closest / n + shade * u_paletteSpeed * 0.2 + u_paletteRotation);
    vec3 color = paletteColor(t, u_paletteTex) * shade;

    // Orbit trap ribbons — use mix instead of add to preserve range
    vec3 ribbonColor1 = paletteColor(fract(t + 0.3), u_paletteTex);
    vec3 ribbonColor2 = paletteColor(fract(t + 0.55), u_paletteTex);
    vec3 glowColor = paletteColor(fract(t + 0.15 + u_spectralCentroid * 0.3), u_paletteTex);
    color = mix(color, ribbonColor1, ribbonCircle * 0.45);
    color = mix(color, ribbonColor2, ribbonSpiral * 0.3);
    color = mix(color, glowColor, orbitGlow * 0.25);

    // Escaped regions get smooth coloring like Julia/Mandelbrot
    if (escaped > 0.5) {
        float smoothIter = iter - log2(log2(dot(z, z) + 1.0)) + 4.0;
        float tEsc = fract(smoothIter * u_paletteSpeed * 0.02 + u_paletteRotation);
        vec3 escColor = paletteColor(tEsc, u_paletteTex);
        color = mix(color, escColor, 0.5);
    }

    // FFT modulation (subtle)
    float fftVal = texture(u_fftTex, vec2(clamp(shade, 0.0, 1.0), 0.5)).r;
    color *= 1.0 + fftVal * u_rmsEnergy * 0.2;

    fragColor = vec4(color, orbitSum);
}
`;

// ============================================================
// Transition blend shader — crossfade between two fractal FBOs
// ============================================================
export const BLEND_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform float u_mix;
void main() {
    vec4 a = texture(u_texA, v_uv);
    vec4 b = texture(u_texB, v_uv);
    fragColor = mix(a, b, u_mix);
}
`;

// ============================================================
// Post-processing shaders
// ============================================================

export const BLOOM_EXTRACT_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_texture;
uniform float u_bloomThreshold;

void main() {
    vec4 color = texture(u_texture, v_uv);
    float lum = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;
    if (lum > u_bloomThreshold) {
        fragColor = vec4(color.rgb * (lum - u_bloomThreshold), 1.0);
    } else {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
`;

export const BLUR_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_texture;
uniform vec2 u_direction;
uniform vec2 u_resolution;
uniform float u_blurRadius;

void main() {
    vec2 texelSize = 1.0 / u_resolution;
    vec3 result = vec3(0.0);
    float totalWeight = 0.0;
    float sigma = max(u_blurRadius * 0.5, 0.001);
    for (int i = -12; i <= 12; i++) {
        float offset = float(i);
        float weight = exp(-0.5 * offset * offset / (sigma * sigma));
        vec2 sampleUV = v_uv + u_direction * texelSize * offset * u_blurRadius / 12.0;
        result += texture(u_texture, sampleUV).rgb * weight;
        totalWeight += weight;
    }
    fragColor = vec4(result / totalWeight, 1.0);
}
`;

export const COMPOSITE_FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_fractalTex;
uniform sampler2D u_bloomTex;
uniform sampler2D u_paletteTex;

uniform float u_gamma;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_vibrancy;
uniform float u_highlightPower;
uniform float u_bloomIntensity;
uniform float u_vignetteStrength;
uniform float u_colorCycleSpeed;
uniform float u_paletteSpeed;
uniform float u_time;
uniform float u_aspectRatio;

// Beat pulse flash uniforms
uniform float u_beatFlash;
uniform float u_pulsePositions[8];
uniform float u_pulseStrengths[8];

${COMMON_GLSL}

void main() {
    vec4 fractalData = texture(u_fractalTex, v_uv);
    vec3 color = fractalData.rgb;
    float iterData = fractalData.a;

    // Color cycling
    if (u_colorCycleSpeed > 0.001 && iterData > 0.0) {
        float t = fract(iterData * u_paletteSpeed * 0.02 + u_time * u_colorCycleSpeed);
        color = paletteColor(t, u_paletteTex);
    }

    // Gamma
    color = pow(max(color, vec3(0.0001)), vec3(1.0 / u_gamma));

    // Brightness
    color *= u_brightness;

    // Contrast
    color = (color - 0.5) * u_contrast + 0.5;

    // Vibrancy
    float lum = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;
    color = mix(vec3(lum), color, u_vibrancy);

    // Highlight power (gentle boost, not multiplicative blow-out)
    float hlum = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;
    float boost = pow(max(hlum, 0.0), u_highlightPower);
    color *= 1.0 + boost * 0.25;

    // Bloom (additive, but we'll tone-map after)
    vec3 bloom = texture(u_bloomTex, v_uv).rgb;
    color += bloom * u_bloomIntensity;

    // Beat pulse flash overlay — radial gradient from pulse wavefronts
    vec2 flashUV = (v_uv - 0.5) * vec2(u_aspectRatio, 1.0);
    float flashDist = length(flashUV);
    float flashIntensity = 0.0;
    for (int i = 0; i < 8; i++) {
        float wavePos = u_pulsePositions[i] * 0.25;
        float waveStr = u_pulseStrengths[i];
        if (waveStr < 0.005) continue;
        float waveDist = abs(flashDist - wavePos);
        flashIntensity += waveStr * exp(-waveDist * 8.0) * 0.2;
    }
    // Global beat flash (tinted toward palette to feel musical, not just white)
    flashIntensity += u_beatFlash * 0.08 * exp(-flashDist * 1.5);
    color += flashIntensity * vec3(1.0, 0.95, 0.88);

    // Vignette (applied before tone mapping for natural falloff)
    vec2 vigUV = v_uv - 0.5;
    float vigDist = length(vigUV * vec2(1.0, 1.0/u_aspectRatio) * 2.0);
    float vig = 1.0 - clamp(vigDist * u_vignetteStrength * 0.5, 0.0, 1.0);
    color *= vig;

    // Modified ACES tone mapping — compresses highlights while keeping true blacks
    vec3 mapped = color * (2.51 * color + vec3(0.03)) / (color * (2.43 * color + vec3(0.59)) + vec3(0.14));
    // Subtract the black lift that ACES introduces (0.03/0.14 ≈ 0.214) and rescale
    // This preserves true blacks for dark palettes
    float blackPoint = 0.03 / 0.14;
    color = max(vec3(0.0), (mapped - blackPoint) / (1.0 - blackPoint));

    color = clamp(color, 0.0, 1.0);
    fragColor = vec4(color, 1.0);
}
`;
