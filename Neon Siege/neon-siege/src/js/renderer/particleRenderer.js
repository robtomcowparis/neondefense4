// ============================================================
// particleRenderer.js — Renders particle data from particles.js
// ============================================================
import * as THREE from 'three';
import { makeAccentMaterial, makeGlowMaterial } from './scene.js';
import { COLORS } from '../config.js';

const POOL_SIZE = 200;
const DEBRIS_POOL_SIZE = 30;
const sphereGeo = new THREE.SphereGeometry(1, 6, 4);
const boxGeo = new THREE.BoxGeometry(1, 1, 1);

let pool = [];
let debrisPool = [];
let parentScene = null;

export function initParticleRenderer(scene) {
  parentScene = scene;
  pool = [];
  debrisPool = [];

  // Standard sphere particle pool
  for (let i = 0; i < POOL_SIZE; i++) {
    const mat = makeAccentMaterial(COLORS.CYAN);
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.visible = false;
    scene.add(mesh);

    const glowMat = makeGlowMaterial(COLORS.CYAN, 0.4);
    const glow = new THREE.Mesh(sphereGeo, glowMat);
    glow.scale.setScalar(2.0);
    mesh.add(glow);

    pool.push({ mesh, mat, glow, glowMat, inUse: false });
  }

  // Box geometry debris pool (for wallBreak)
  for (let i = 0; i < DEBRIS_POOL_SIZE; i++) {
    const mat = makeAccentMaterial(COLORS.CYAN);
    const mesh = new THREE.Mesh(boxGeo, mat);
    mesh.visible = false;
    scene.add(mesh);

    const glowMat = makeGlowMaterial(COLORS.CYAN, 0.3);
    const glow = new THREE.Mesh(boxGeo, glowMat);
    glow.scale.setScalar(1.6);
    mesh.add(glow);

    debrisPool.push({ mesh, mat, glow, glowMat, inUse: false });
  }
}

export function updateParticleRenderer(now, particles) {
  // Reset all pool entries
  for (let i = 0; i < pool.length; i++) {
    pool[i].inUse = false;
  }
  for (let i = 0; i < debrisPool.length; i++) {
    debrisPool[i].inUse = false;
  }

  let poolIdx = 0;
  let debrisIdx = 0;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const t = 1 - p.life / p.maxLife; // 0 -> 1 over lifetime

    // wallBreak uses box debris pool
    if (p.type === 'wallBreak') {
      if (debrisIdx >= debrisPool.length) continue;
      const entry = debrisPool[debrisIdx++];
      entry.inUse = true;

      const scale = p.size * (1 - t * 0.5);
      const opacity = (1 - t) * (1 - t); // quadratic fade

      entry.mesh.visible = true;
      entry.mesh.position.set(p.x, p.y, p.z);
      entry.mesh.scale.set(
        Math.max(scale * 0.7, 0.1),
        Math.max(scale * 0.5, 0.1),
        Math.max(scale, 0.1)
      ); // angular fragment shape
      // Tumble rotation
      const rot = (p.rotSpeed || 0) * t * 3;
      entry.mesh.rotation.set(rot * 0.7, rot, rot * 0.4);

      entry.mat.color.set(p.color);
      entry.glowMat.color.set(p.color);
      entry.glowMat.opacity = opacity * 0.3;
      continue;
    }

    // wallRepair uses sphere pool with upward scaling
    if (p.type === 'wallRepair') {
      if (poolIdx >= pool.length) continue;
      const entry = pool[poolIdx++];
      entry.inUse = true;

      // Quick ramp-in, slow fade-out
      const fadeIn = Math.min(1, t * 6);
      const fadeOut = 1 - t;
      const opacity = fadeIn * fadeOut;
      const scale = p.size * (0.5 + 0.5 * fadeIn) * fadeOut;

      entry.mesh.visible = true;
      entry.mesh.position.set(p.x, p.y, p.z);
      entry.mesh.scale.setScalar(Math.max(scale, 0.1));

      entry.mat.color.set(p.color);
      entry.glowMat.color.set(p.color);
      entry.glowMat.opacity = opacity * 0.5;
      continue;
    }

    // Default sphere particles (burst, flash, wallHit, etc.)
    if (poolIdx >= pool.length) continue;
    const entry = pool[poolIdx++];
    entry.inUse = true;

    const scale = p.size * (1 - t * 0.6);
    const opacity = 1 - t;

    entry.mesh.visible = true;
    entry.mesh.position.set(p.x, p.y, p.z);
    entry.mesh.scale.setScalar(Math.max(scale, 0.1));

    // Update color
    entry.mat.color.set(p.color);
    entry.glowMat.color.set(p.color);
    entry.glowMat.opacity = opacity * 0.4;
  }

  // Hide unused pool meshes
  for (let i = 0; i < pool.length; i++) {
    if (!pool[i].inUse) {
      pool[i].mesh.visible = false;
    }
  }
  for (let i = 0; i < debrisPool.length; i++) {
    if (!debrisPool[i].inUse) {
      debrisPool[i].mesh.visible = false;
    }
  }
}
