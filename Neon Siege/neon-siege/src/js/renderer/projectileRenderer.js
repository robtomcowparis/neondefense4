// ============================================================
// projectileRenderer.js — Projectile rendering
// ============================================================
import * as THREE from 'three';
import { makeAccentMaterial, makeGlowMaterial } from './scene.js';
import { COLORS, TEAM_PLAYER } from '../config.js';

// Shared geometries
const sphereGeo = new THREE.SphereGeometry(1, 8, 6);
const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 6);
const torusGeo = new THREE.TorusGeometry(1, 0.2, 4, 10);

// Shared trail materials keyed by color+opacity bucket (avoids per-trail material allocation)
const _trailMaterialCache = new Map();

function _getTrailMaterial(color, opacity) {
  // Bucket opacity to nearest 0.05 to keep cache small
  const opBucket = Math.round(opacity * 20) / 20;
  const key = color * 100 + opBucket;
  let mat = _trailMaterialCache.get(key);
  if (!mat) {
    mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: opBucket,
    });
    _trailMaterialCache.set(key, mat);
  }
  return mat;
}

/**
 * Create a 3D mesh group for a projectile and add it to the scene.
 */
export function createProjectileMesh(proj, scene) {
  const color = proj.team === TEAM_PLAYER ? COLORS.PROJECTILE_PLAYER : COLORS.PROJECTILE_ENEMY;
  const group = new THREE.Group();

  if (proj.homing) {
    buildPulseProjectile(group, proj, color);
  } else {
    buildBasicProjectile(group, color);
  }

  group.position.set(proj.x, proj.y, proj.z);

  scene.add(group);
  proj.mesh = group;
}

// ---- Basic straight-line projectile (for units) ----
function buildBasicProjectile(group, color) {
  const coreGeo = new THREE.SphereGeometry(1.2, 8, 6);
  const core = new THREE.Mesh(coreGeo, makeAccentMaterial(color));
  group.add(core);

  const glowGeo = new THREE.SphereGeometry(2.5, 8, 6);
  const glow = new THREE.Mesh(glowGeo, makeGlowMaterial(color, 0.25));
  group.add(glow);
}

// ---- Pulse turret projectile (per-level shapes) ----
function buildPulseProjectile(group, proj, color) {
  const mat = makeAccentMaterial(color);
  const glowMat = makeGlowMaterial(color, 0.3);
  const level = proj.turretLevel || 0;
  const branch = proj.turretBranch;

  if (branch === 'A') {
    // Branch A: thin fast needle
    const needle = new THREE.Mesh(cylinderGeo.clone(), mat);
    needle.scale.set(0.6, 4, 0.6);
    needle.rotation.x = Math.PI / 2;
    group.add(needle);

    const glow = new THREE.Mesh(sphereGeo.clone(), glowMat);
    glow.scale.setScalar(1.2);
    group.add(glow);
    group.userData.trailCount = 3;

  } else if (branch === 'B') {
    // Branch B: large sphere + 2 orbiting spheres
    const core = new THREE.Mesh(sphereGeo.clone(), mat);
    core.scale.setScalar(2);
    group.add(core);

    const glow = new THREE.Mesh(sphereGeo.clone(), glowMat);
    glow.scale.setScalar(3.5);
    group.add(glow);

    const orbiters = [];
    for (let i = 0; i < 2; i++) {
      const orb = new THREE.Mesh(sphereGeo.clone(), mat.clone());
      orb.scale.setScalar(0.8);
      group.add(orb);
      orbiters.push(orb);
    }
    group.userData.orbiters = orbiters;
    group.userData.trailCount = 8;

  } else if (level >= 2) {
    // L2: sphere + spinning torus ring
    const core = new THREE.Mesh(sphereGeo.clone(), mat);
    core.scale.setScalar(1.2);
    group.add(core);

    const ring = new THREE.Mesh(torusGeo.clone(), mat.clone());
    ring.scale.setScalar(2);
    group.add(ring);
    group.userData.ring = ring;

    const glow = new THREE.Mesh(sphereGeo.clone(), glowMat);
    glow.scale.setScalar(2.5);
    group.add(glow);
    group.userData.trailCount = 6;

  } else if (level >= 1) {
    // L1: elongated sphere
    const core = new THREE.Mesh(sphereGeo.clone(), mat);
    core.scale.set(1, 1, 2.5);
    group.add(core);

    const glow = new THREE.Mesh(sphereGeo.clone(), glowMat);
    glow.scale.set(1.5, 1.5, 3);
    group.add(glow);
    group.userData.trailCount = 5;

  } else {
    // L0: small sphere
    const core = new THREE.Mesh(sphereGeo.clone(), mat);
    core.scale.setScalar(1.0);
    group.add(core);

    const glow = new THREE.Mesh(sphereGeo.clone(), glowMat);
    glow.scale.setScalar(2);
    group.add(glow);
    group.userData.trailCount = 4;
  }

  // Create trail spheres (shared materials via pool)
  const trailCount = group.userData.trailCount || 4;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const opacity = 0.35 * (1 - i / trailCount);
    const t = new THREE.Mesh(
      sphereGeo.clone(),
      _getTrailMaterial(color, opacity)
    );
    t.scale.setScalar(0.6 * (1 - i / trailCount * 0.5));
    t.visible = false;
    group.add(t);
    trails.push(t);
  }
  group.userData.trails = trails;
}

/**
 * Update all projectile meshes.
 */
export function updateProjectileMeshes(now, projectiles) {
  const nowMs = now * 1000;

  for (let i = 0; i < projectiles.length; i++) {
    const p = projectiles[i];
    if (!p.mesh) continue;

    // Sync position
    p.mesh.position.set(p.x, p.y, p.z);

    // Homing projectile animations
    if (p.homing && p.mesh.userData) {
      // Orient elongated shapes toward target
      if (p.target && p.target.alive) {
        const dx = p.target.x - p.x;
        const dz = p.target.z - p.z;
        p.mesh.rotation.y = Math.atan2(dx, dz);
      }

      // L2 ring spin
      if (p.mesh.userData.ring) {
        p.mesh.userData.ring.rotation.z = nowMs * 0.005;
      }

      // Branch B orbiters
      if (p.mesh.userData.orbiters) {
        const oAngle = nowMs * 0.006;
        const orbs = p.mesh.userData.orbiters;
        if (orbs[0]) {
          orbs[0].position.x = Math.cos(oAngle) * 4;
          orbs[0].position.z = Math.sin(oAngle) * 4;
        }
        if (orbs[1]) {
          orbs[1].position.x = Math.cos(oAngle + Math.PI) * 4;
          orbs[1].position.z = Math.sin(oAngle + Math.PI) * 4;
        }
      }

      // Trail spheres from trail history
      if (p.mesh.userData.trails && p.trail) {
        const trails = p.mesh.userData.trails;
        for (let j = 0; j < trails.length; j++) {
          const idx = p.trail.length - 1 - j;
          if (idx >= 0) {
            trails[j].visible = true;
            // Trail positions are in world coords; convert to local
            trails[j].position.set(
              p.trail[idx][0] - p.x,
              0,
              p.trail[idx][1] - p.z
            );
          }
        }
      }
    }
  }
}

/**
 * Remove a projectile mesh from the scene and dispose geometry/materials.
 */
export function removeProjectileMesh(proj, scene) {
  if (!proj.mesh) return;
  scene.remove(proj.mesh);
  disposeGroup(proj.mesh);
  proj.mesh = null;
}

// ---- Helpers ----

function disposeGroup(group) {
  group.traverse(child => {
    if (child.isMesh) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    }
  });
}
