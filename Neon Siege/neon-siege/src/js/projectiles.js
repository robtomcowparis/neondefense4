// ============================================================
// projectiles.js — Projectile logic (NO rendering code)
// ============================================================
import { PROJECTILE_SPEED, PROJECTILE_LIFETIME, TURRET_PROJECTILE_SPEED, HIT_FLASH_DURATION } from './config.js';
import { nextId, dist } from './utils.js';

let projectiles = [];
let _dirty = true;
let _aliveCache = [];
let _getCalls = 0;

/**
 * Create a straight-line projectile from (x, z) toward (tx, tz).
 * @param {number} [spawnY=15] — optional Y height for the projectile
 */
export function createProjectile(x, z, tx, tz, team, damage, spawnY) {
  const dx = tx - x;
  const dz = tz - z;
  const d = Math.sqrt(dx * dx + dz * dz);
  if (d === 0) return null;

  const vx = (dx / d) * PROJECTILE_SPEED;
  const vz = (dz / d) * PROJECTILE_SPEED;

  const proj = {
    id: nextId(),
    x,
    z,
    y: spawnY ?? 15,
    tx,
    tz,
    team,
    damage,
    vx,
    vz,
    life: PROJECTILE_LIFETIME,
    alive: true,
    homing: false,
  };

  projectiles.push(proj);
  _dirty = true;
  return proj;
}

/**
 * Create a homing projectile that tracks a target (for turrets).
 */
export function createHomingProjectile(x, z, y, target, team, damage, sourceBuilding, splashRadius, splashDamage, turretLevel, turretBranch) {
  const proj = {
    id: nextId(),
    x,
    z,
    y: y || 20,
    team,
    damage,
    alive: true,
    homing: true,
    target,
    speed: TURRET_PROJECTILE_SPEED,
    trail: [],
    sourceBuilding,
    splashRadius: splashRadius || 0,
    splashDamage: splashDamage || 0,
    life: 3.0,
    turretLevel: turretLevel || 0,
    turretBranch: turretBranch || null,
  };

  projectiles.push(proj);
  _dirty = true;
  return proj;
}

/**
 * Update all alive projectiles. Move them and check lifetime.
 * Returns array of projectiles that expired or hit their target.
 */
export function updateProjectiles(dt) {
  const expired = [];

  for (let i = 0; i < projectiles.length; i++) {
    const p = projectiles[i];
    if (!p.alive) {
      expired.push(p);
      continue;
    }

    if (p.homing) {
      updateHomingProjectile(p, dt);
      if (!p.alive) expired.push(p);
      continue;
    }

    // Straight-line movement
    p.x += p.vx * dt;
    p.z += p.vz * dt;
    p.life -= dt;

    // Check if close to target
    const dx = p.tx - p.x;
    const dz = p.tz - p.z;
    const d2 = dx * dx + dz * dz;
    if (d2 < 10 * 10) {
      p.alive = false;
      expired.push(p);
      continue;
    }

    if (p.life <= 0) {
      p.alive = false;
      expired.push(p);
    }
  }

  if (expired.length > 0) _dirty = true;
  return expired;
}

function updateHomingProjectile(p, dt) {
  // Target died mid-flight
  if (!p.target || !p.target.alive) {
    if (p.splashRadius > 0) doSplash(p);
    p.alive = false;
    return;
  }

  // Store trail
  p.trail.push([p.x, p.y, p.z]);
  if (p.trail.length > 6) p.trail.shift();

  // Move toward target
  const dx = p.target.x - p.x;
  const dz = p.target.z - p.z;
  const d = Math.sqrt(dx * dx + dz * dz);

  if (d < p.speed * dt + 5) {
    // HIT
    p.target.hp -= p.damage;
    p.target.hitFlashTimer = HIT_FLASH_DURATION;
    if (p.sourceBuilding) {
      p.sourceBuilding.totalDamage += p.damage;
      if (p.target.hp <= 0) p.sourceBuilding.kills += 1;
    }
    if (p.splashRadius > 0) doSplash(p);
    p.hitTarget = true;
    p.alive = false;
    return;
  }

  p.x += (dx / d) * p.speed * dt;
  p.z += (dz / d) * p.speed * dt;

  p.life -= dt;
  if (p.life <= 0) {
    p.alive = false;
  }
}

function doSplash(p) {
  // Splash damages all enemies within splashRadius of the impact point
  // We'll store splash info so combat.js can apply it
  p.splashHit = true;
  p.splashX = p.target ? p.target.x : p.x;
  p.splashZ = p.target ? p.target.z : p.z;
}

/** Return all alive projectiles. */
export function getProjectiles() {
  if (_dirty) {
    _aliveCache = projectiles.filter(p => p.alive);
    _dirty = false;
    _getCalls = 0;
  }
  _getCalls++;
  if (_getCalls % 60 === 0) {
    projectiles = projectiles.filter(p => p.alive);
  }
  return _aliveCache;
}

/** Return ALL projectiles (including dead, for cleanup). */
export function getAllProjectiles() {
  return projectiles;
}

/** Mark a projectile as dead. */
export function removeProjectile(p) {
  p.alive = false;
  _dirty = true;
}

/** Reset all projectiles. */
export function resetProjectiles() {
  projectiles = [];
  _dirty = true;
  _aliveCache = [];
  _getCalls = 0;
}
