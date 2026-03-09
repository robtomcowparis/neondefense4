// ============================================================
// effectRenderer.js — Visual effects (beams, rings) that auto-expire
// ============================================================
import * as THREE from 'three';
import { makeAccentMaterial, makeGlowMaterial } from './scene.js';

const activeEffects = [];
let parentScene = null;
let lastNow = 0;

export function initEffectRenderer(scene) {
  parentScene = scene;
  activeEffects.length = 0;
  lastNow = 0;
}

/**
 * Spawn a temporary beam line between two world positions (using X/Z + fixed Y).
 */
export function spawnBeamEffect(fromX, fromZ, toX, toZ, color) {
  const y = 12;
  const dx = toX - fromX;
  const dz = toZ - fromZ;
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 1) return;

  const group = new THREE.Group();

  // Inner beam cylinder
  const innerGeo = new THREE.CylinderGeometry(1.0, 1.0, length, 6, 1);
  innerGeo.rotateZ(Math.PI / 2);
  const innerMat = makeAccentMaterial(color);
  const inner = new THREE.Mesh(innerGeo, innerMat);
  group.add(inner);

  // Outer glow cylinder
  const outerGeo = new THREE.CylinderGeometry(2.5, 2.5, length, 6, 1);
  outerGeo.rotateZ(Math.PI / 2);
  const outerMat = makeGlowMaterial(color, 0.15);
  const outer = new THREE.Mesh(outerGeo, outerMat);
  group.add(outer);

  // Position at midpoint, rotate to face target
  const mx = (fromX + toX) / 2;
  const mz = (fromZ + toZ) / 2;
  group.position.set(mx, y, mz);
  group.rotation.y = -Math.atan2(dz, dx);

  parentScene.add(group);

  activeEffects.push({
    type: 'beam',
    group,
    innerMat,
    outerMat,
    life: 0.15,
    maxLife: 0.15,
  });
}

/**
 * Spawn an expanding ring effect at a world position.
 */
export function spawnExplosionRing(x, z, color, radius) {
  const y = 8;
  const group = new THREE.Group();

  const ringGeo = new THREE.TorusGeometry(1, 0.4, 6, 24);
  const ringMat = makeAccentMaterial(color);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const glowGeo = new THREE.TorusGeometry(1, 1.0, 6, 24);
  const glowMat = makeGlowMaterial(color, 0.3);
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = Math.PI / 2;
  group.add(glow);

  group.position.set(x, y, z);
  parentScene.add(group);

  activeEffects.push({
    type: 'ring',
    group,
    ringMat,
    glowMat,
    targetRadius: radius,
    life: 0.5,
    maxLife: 0.5,
  });
}

/**
 * Spawn a large expanding shockwave ring for air strike impact.
 */
export function spawnAirStrikeRing(x, z, color, radius) {
  const y = 6;
  const group = new THREE.Group();

  // Inner bright ring
  const ringGeo = new THREE.TorusGeometry(1, 0.8, 8, 32);
  const ringMat = makeAccentMaterial(color);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Outer glow ring
  const glowGeo = new THREE.TorusGeometry(1, 2.5, 8, 32);
  const glowMat = makeGlowMaterial(color, 0.4);
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = Math.PI / 2;
  group.add(glow);

  // Ground flash disc
  const discGeo = new THREE.CircleGeometry(1, 32);
  const discMat = makeGlowMaterial(0xFFFFFF, 0.5);
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 1;
  group.add(disc);

  group.position.set(x, y, z);
  parentScene.add(group);

  activeEffects.push({
    type: 'airStrikeRing',
    group,
    ringMat,
    glowMat,
    discMat,
    targetRadius: radius,
    life: 1.2,
    maxLife: 1.2,
  });
}

export function updateEffectRenderer(now) {
  const dt = lastNow > 0 ? Math.min(now - lastNow, 0.05) : 0;
  lastNow = now;

  for (let i = activeEffects.length - 1; i >= 0; i--) {
    const fx = activeEffects[i];
    fx.life -= dt;

    if (fx.life <= 0) {
      parentScene.remove(fx.group);
      // Dispose geometries and materials
      fx.group.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      activeEffects.splice(i, 1);
      continue;
    }

    const t = 1 - fx.life / fx.maxLife; // 0 -> 1

    if (fx.type === 'beam') {
      const opacity = 1 - t;
      fx.outerMat.opacity = 0.15 * opacity;
      fx.innerMat.color.lerp(new THREE.Color(0xffffff), t * 0.3);
    }

    if (fx.type === 'ring') {
      const scale = 1 + t * (fx.targetRadius - 1);
      fx.group.scale.set(scale, 1, scale);
      const opacity = (1 - t) * (1 - t);
      fx.glowMat.opacity = 0.3 * opacity;
    }

    if (fx.type === 'airStrikeRing') {
      // Fast initial expansion that decelerates
      const easeT = 1 - (1 - t) * (1 - t); // ease-out quadratic
      const scale = 1 + easeT * (fx.targetRadius - 1);
      fx.group.scale.set(scale, 1, scale);
      const opacity = (1 - t) * (1 - t);
      fx.glowMat.opacity = 0.4 * opacity;
      if (fx.discMat) {
        fx.discMat.opacity = 0.5 * opacity * opacity;
        // Scale disc separately so it fills the ring area
        const disc = fx.group.children[2];
        if (disc) disc.scale.set(scale * 0.8, scale * 0.8, 1);
      }
    }
  }
}
