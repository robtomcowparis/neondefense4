// ============================================================
// combat.js — Targeting and damage resolution (NO rendering code)
// ============================================================
import {
  BUILDING_STATS, TEAM_PLAYER, TEAM_ENEMY, BTYPE_TURRET,
  COMBAT_LOW_HP_BONUS, COMBAT_DISTANCE_WEIGHT,
  COMBAT_PRIORITY_TABLE, COMBAT_WALL_BONUS, COMBAT_SELF_DEFENSE_BONUS, COMBAT_SELF_DEFENSE_RANGE,
  UNIT_STATS, HELI_FLY_HEIGHT,
  TARGET_ANY,
  STANCE_RALLY,
  UTYPE_RIFLE, UTYPE_ASSAULT, UTYPE_TANK, UTYPE_HELICOPTER,
  COMBAT_SPATIAL_CELL_SIZE,
  HIT_FLASH_DURATION,
} from './config.js';
import { dist, SpatialHash } from './utils.js';
import { getTurretStats } from './buildings.js';

// --- Combat spatial hashes (rebuilt per frame) ---
const _unitHash = new SpatialHash(COMBAT_SPATIAL_CELL_SIZE);
const _buildingHash = new SpatialHash(COMBAT_SPATIAL_CELL_SIZE);

/**
 * Unified target scoring function.
 * Used by both unit targeting and turret targeting.
 */
function targetScore(attacker, target, d) {
  const distScore = (1 - d / attacker.range) * COMBAT_DISTANCE_WEIGHT;
  const hpRatio = target.hp / target.maxHp;
  const lowHpScore = (1 - hpRatio) * COMBAT_LOW_HP_BONUS;

  // Priority bonus from table
  const prioKey = attacker.stance === STANCE_RALLY ? 'rally' : (attacker.targetPriority || TARGET_ANY);
  const table = COMBAT_PRIORITY_TABLE[prioKey] || COMBAT_PRIORITY_TABLE.any;
  const targetType = target.type || 'core';
  const prioScore = table[targetType] || 0;

  // Wall bonus: units targeting a specific wall get bonus for that wall
  const wallBonus = (attacker._wallTarget && attacker._wallTarget === target) ? COMBAT_WALL_BONUS : 0;

  // Self-defense: rally-stance units prioritize very close enemies
  const selfDefense = (attacker.stance === STANCE_RALLY && d <= attacker.range * COMBAT_SELF_DEFENSE_RANGE) ? COMBAT_SELF_DEFENSE_BONUS : 0;

  return distScore + lowHpScore + prioScore + wallBonus + selfDefense;
}

/**
 * Update combat: units and turrets acquire targets and fire projectiles.
 * Also resolves projectile hits.
 */
export function updateCombat(dt, callbacks) {
  const units = callbacks.getUnits();
  const buildings = callbacks.getBuildings();

  // --- Build per-frame spatial hashes for O(n*k) targeting ---
  _unitHash.clear();
  _buildingHash.clear();
  for (let i = 0; i < units.length; i++) {
    if (units[i].alive) _unitHash.insert(units[i]);
  }
  for (let i = 0; i < buildings.length; i++) {
    if (buildings[i].alive) _buildingHash.insert(buildings[i]);
  }

  // --- Unit combat (table-driven targeting) ---
  const MUZZLE_OFFSET = { [UTYPE_RIFLE]: 12, [UTYPE_ASSAULT]: 10, [UTYPE_TANK]: 25, [UTYPE_HELICOPTER]: 29 };

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.alive) continue;
    // Support units (Medic/Engineer) never attack
    if (u.isSupport) continue;
    if (u.fireCooldown > 0 && !u.inCombat) {
      u.targetX = undefined;
      u.targetZ = undefined;
      continue;
    }

    const enemyTeam = u.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;

    let target = null;
    let bestScore = -Infinity;

    // Score enemy units in range
    const nearbyUnits = _unitHash.queryNear(u.x, u.z);
    for (let j = 0; j < nearbyUnits.length; j++) {
      const other = nearbyUnits[j];
      if (!other.alive || other.team !== enemyTeam) continue;
      const d = dist(u.x, u.z, other.x, other.z);
      if (d > u.range) continue;

      const score = targetScore(u, other, d);
      if (score > bestScore) {
        bestScore = score;
        target = other;
      }
    }

    // Score enemy buildings
    const nearbyBuildings = _buildingHash.queryNear(u.x, u.z);
    for (let j = 0; j < nearbyBuildings.length; j++) {
      const b = nearbyBuildings[j];
      if (!b.alive || b.team !== enemyTeam) continue;
      const d = dist(u.x, u.z, b.x, b.z);
      if (d > u.range) continue;

      const score = targetScore(u, b, d);
      if (score > bestScore) {
        bestScore = score;
        target = b;
      }
    }

    // Store target position for renderer facing
    if (target) {
      u.targetX = target.x;
      u.targetZ = target.z;
    } else {
      u.targetX = undefined;
      u.targetZ = undefined;
    }

    // Fire at target when cooldown is ready
    if (target && u.fireCooldown <= 0) {
      u.fireCooldown = 1 / u.fireRate;
      const adx = target.x - u.x;
      const adz = target.z - u.z;
      const ad = Math.sqrt(adx * adx + adz * adz) || 1;
      const muzzleOff = MUZZLE_OFFSET[u.type] || 10;
      const spawnX = u.x + (adx / ad) * muzzleOff;
      const spawnZ = u.z + (adz / ad) * muzzleOff;
      const isAir = UNIT_STATS[u.type] && UNIT_STATS[u.type].isAir;
      const spawnY = isAir ? HELI_FLY_HEIGHT - 5 : undefined;
      callbacks.createProjectile(spawnX, spawnZ, target.x, target.z, u.team, u.damage, spawnY);
    }
  }

  // --- Turret combat (Pulse tower system) ---
  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    if (!b.alive) continue;

    if (b.type === BTYPE_TURRET) {
      updatePulseTurret(b, dt, callbacks);
      continue;
    }

    // Legacy turret handling for non-pulse buildings with range/damage
    const stats = BUILDING_STATS[b.type];
    if (!stats || !stats.range || !stats.damage) continue;
    if (b.buildProgress < b.buildTime) continue;

    if (b.fireCooldown > 0) {
      b.fireCooldown -= dt;
      continue;
    }

    const enemyTeam = b.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
    let target = null;
    let bestDist = stats.range;

    const nearbyUnits = _unitHash.queryNear(b.x, b.z);
    for (let j = 0; j < nearbyUnits.length; j++) {
      const u = nearbyUnits[j];
      if (!u.alive || u.team !== enemyTeam) continue;
      const d = dist(b.x, b.z, u.x, u.z);
      if (d <= bestDist) {
        bestDist = d;
        target = u;
      }
    }

    if (target) {
      b.fireCooldown = 1 / stats.fireRate;
      callbacks.createProjectile(b.x, b.z, target.x, target.z, b.team, stats.damage);
    }
  }

  // --- Projectile hit detection (straight-line only; homing handles its own) ---
  const allProjectiles = callbacks.getProjectiles ? callbacks.getProjectiles() : [];

  for (let i = 0; i < allProjectiles.length; i++) {
    const p = allProjectiles[i];
    if (!p.alive || p.homing) continue;

    const enemyTeam = p.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
    let hit = false;

    const nearbyUnits = _unitHash.queryNear(p.x, p.z);
    for (let j = 0; j < nearbyUnits.length; j++) {
      const u = nearbyUnits[j];
      if (!u.alive || u.team !== enemyTeam) continue;
      const d = dist(p.x, p.z, u.x, u.z);
      if (d < 15) {
        u.hp -= p.damage;
        u.hitFlashTimer = HIT_FLASH_DURATION;
        if (u.hp <= 0) {
          callbacks.removeUnit(u);
        }
        if (callbacks.removeProjectile) callbacks.removeProjectile(p);
        else p.alive = false;
        hit = true;
        break;
      }
    }

    if (hit) continue;

    const nearbyBuildings = _buildingHash.queryNear(p.x, p.z);
    for (let j = 0; j < nearbyBuildings.length; j++) {
      const b = nearbyBuildings[j];
      if (!b.alive || b.team !== enemyTeam) continue;
      const d = dist(p.x, p.z, b.x, b.z);
      if (d < 15) {
        b.hp -= p.damage;
        b.hitFlashTimer = HIT_FLASH_DURATION;
        if (b.hp <= 0) {
          callbacks.removeBuilding(b);
        }
        if (callbacks.removeProjectile) callbacks.removeProjectile(p);
        else p.alive = false;
        break;
      }
    }
  }

  // --- Handle homing projectile splash damage + kill tracking ---
  for (let i = 0; i < allProjectiles.length; i++) {
    const p = allProjectiles[i];
    if (p.alive || !p.homing) continue;

    if (p.hitTarget && p.target && p.target.hp <= 0 && p.target.alive) {
      callbacks.removeUnit(p.target);
    }

    if (p.splashHit && p.splashRadius > 0) {
      const enemyTeam = p.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
      const nearbyUnits = _unitHash.queryNear(p.splashX, p.splashZ);
      for (let j = 0; j < nearbyUnits.length; j++) {
        const u = nearbyUnits[j];
        if (u === p.target || !u.alive || u.team !== enemyTeam) continue;
        const d = dist(p.splashX, p.splashZ, u.x, u.z);
        if (d <= p.splashRadius) {
          u.hp -= p.splashDamage;
          u.hitFlashTimer = HIT_FLASH_DURATION;
          if (p.sourceBuilding) p.sourceBuilding.totalDamage += p.splashDamage;
          if (u.hp <= 0) {
            callbacks.removeUnit(u);
          }
        }
      }
      p.splashHit = false;
    }
  }
}

/** Expose combat spatial hashes for reuse by other systems. */
export function getCombatUnitHash() { return _unitHash; }
export function getCombatBuildingHash() { return _buildingHash; }

/** Pulse turret targeting and firing logic. */
function updatePulseTurret(b, dt, callbacks) {
  if (b.constructionState) return;
  if (b.buildProgress < b.buildTime) return;

  const tStats = getTurretStats(b);
  if (!tStats) return;

  b.fireTimer -= dt;

  const enemyTeam = b.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
  const range = tStats.range;

  // Find nearest enemy via spatial hash (turrets use simple closest-target)
  let best = null;
  let bestDist = range;

  const nearbyUnits = _unitHash.queryNear(b.x, b.z);
  for (let j = 0; j < nearbyUnits.length; j++) {
    const u = nearbyUnits[j];
    if (!u.alive || u.team !== enemyTeam) continue;
    const d = dist(b.x, b.z, u.x, u.z);
    if (d <= bestDist) {
      bestDist = d;
      best = u;
    }
  }

  const nearbyBuildings = _buildingHash.queryNear(b.x, b.z);
  for (let j = 0; j < nearbyBuildings.length; j++) {
    const other = nearbyBuildings[j];
    if (!other.alive || other.team !== enemyTeam || other === b) continue;
    const d = dist(b.x, b.z, other.x, other.z);
    if (d <= bestDist) {
      bestDist = d;
      best = other;
    }
  }

  if (!best) {
    b.target = null;
    b.targetX = undefined;
    b.targetZ = undefined;
    return;
  }

  b.target = best;
  b.targetX = best.x;
  b.targetZ = best.z;

  if (b.fireTimer <= 0) {
    b.fireTimer = tStats.fireRate;
    b.lastFireTime = performance.now();

    if (callbacks.createHomingProjectile) {
      const fp = callbacks.getFirePoint ? callbacks.getFirePoint(b) : { x: b.x, y: 20, z: b.z };
      callbacks.createHomingProjectile(
        fp.x, fp.z, fp.y,
        best,
        b.team,
        tStats.damage,
        b,
        tStats.splashRadius || 0,
        tStats.splashDamage || 0,
        b.level,
        b.branch
      );
    }
  }
}
