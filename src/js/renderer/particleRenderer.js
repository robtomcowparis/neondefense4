// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/particleRenderer.js
//  Three.js Points-based particle rendering
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { scene } from './scene.js';

const MAX_PARTICLES = 4000;

// Buffer arrays
const positions = new Float32Array(MAX_PARTICLES * 3);
const colors = new Float32Array(MAX_PARTICLES * 3);
const sizes = new Float32Array(MAX_PARTICLES);
const alphas = new Float32Array(MAX_PARTICLES);

const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

// Particles use world-space size with perspective attenuation
const mat = new THREE.PointsMaterial({
    size: 12,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
});

const points = new THREE.Points(geo, mat);
points.position.y = 0;
points.frustumCulled = false;

let _particleSystemRef = null;
let _initialized = false;

export function initParticleRenderer(particleSystem) {
    _particleSystemRef = particleSystem;
    if (!_initialized) {
        scene.add(points);
        _initialized = true;
    }
}

export function updateParticleRenderer() {
    if (!_particleSystemRef) return;
    const particles = _particleSystemRef.particles;
    const count = Math.min(particles.length, MAX_PARTICLES);

    for (let i = 0; i < count; i++) {
        const p = particles[i];
        const lifeRatio = Math.max(0, p.life / p.maxLife);

        positions[i * 3]     = p.x;
        positions[i * 3 + 1] = p.y3d || 0;  // 3D world height
        positions[i * 3 + 2] = p.y;

        colors[i * 3]     = p.color[0] / 255;
        colors[i * 3 + 1] = p.color[1] / 255;
        colors[i * 3 + 2] = p.color[2] / 255;

        sizes[i] = Math.max(1, p.size * lifeRatio);
    }

    // Zero out remaining slots
    for (let i = count; i < MAX_PARTICLES; i++) {
        positions[i * 3 + 1] = -9999; // hide below ground
        sizes[i] = 0;
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    geo.attributes.size.needsUpdate = true;
    geo.setDrawRange(0, Math.max(count, 1));
}
