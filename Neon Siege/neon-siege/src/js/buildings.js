// ============================================================
// buildings.js — Building logic (NO rendering code)
// ============================================================
import {
  BUILDING_STATS, TILE_BUILDING, TILE_EMPTY, TILE_SIZE, TILE_WALL,
  TEAM_PLAYER, BTYPE_TURRET, BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL,
  TURRET_UPGRADE_TIME, TURRET_BRANCH_TIME,
  TURRET_HP_PER_LEVEL, TURRET_HP_BRANCH_BONUS,
  BARRACKS_UPGRADE_TIME, BARRACKS_BRANCH_TIME,
  BARRACKS_HP_PER_LEVEL, BARRACKS_HP_BRANCH_BONUS,
  FACTORY_UPGRADE_TIME, FACTORY_BRANCH_TIME,
  FACTORY_HP_PER_LEVEL, FACTORY_HP_BRANCH_BONUS,
  GENERATOR_UPGRADE_TIME, GENERATOR_BRANCH_TIME,
  GENERATOR_HP_PER_LEVEL, GENERATOR_HP_BRANCH_BONUS,
  HELIPAD_UPGRADE_TIME, HELIPAD_BRANCH_TIME,
  HELIPAD_HP_PER_LEVEL, HELIPAD_HP_BRANCH_BONUS,
  WALL_UPGRADE_TIME, WALL_HP_PER_LEVEL, WALL_HP_BRANCH_BONUS,
  WALL_HORIZONTAL, WALL_VERTICAL, WALL_CORNER_NE, WALL_CORNER_NW, WALL_CORNER_SE, WALL_CORNER_SW,
  WALL_DEMOLISH_REFUND_RATIO,
} from './config.js';
import { gridToWorld, nextId } from './utils.js';
import { setTile } from './map.js';

const UPGRADEABLE_TYPES = [BTYPE_TURRET, BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL];

// Per-type upgrade/branch timing and HP scaling
const UPGRADE_PARAMS = {
  [BTYPE_TURRET]:    { times: TURRET_UPGRADE_TIME,    branchTime: TURRET_BRANCH_TIME,    hpPerLevel: TURRET_HP_PER_LEVEL,    hpBranch: TURRET_HP_BRANCH_BONUS },
  [BTYPE_BARRACKS]:  { times: BARRACKS_UPGRADE_TIME,  branchTime: BARRACKS_BRANCH_TIME,  hpPerLevel: BARRACKS_HP_PER_LEVEL,  hpBranch: BARRACKS_HP_BRANCH_BONUS },
  [BTYPE_FACTORY]:   { times: FACTORY_UPGRADE_TIME,   branchTime: FACTORY_BRANCH_TIME,   hpPerLevel: FACTORY_HP_PER_LEVEL,   hpBranch: FACTORY_HP_BRANCH_BONUS },
  [BTYPE_GENERATOR]: { times: GENERATOR_UPGRADE_TIME, branchTime: GENERATOR_BRANCH_TIME, hpPerLevel: GENERATOR_HP_PER_LEVEL, hpBranch: GENERATOR_HP_BRANCH_BONUS },
  [BTYPE_HELIPAD]:   { times: HELIPAD_UPGRADE_TIME,   branchTime: HELIPAD_BRANCH_TIME,   hpPerLevel: HELIPAD_HP_PER_LEVEL,   hpBranch: HELIPAD_HP_BRANCH_BONUS },
  [BTYPE_WALL]:      { times: WALL_UPGRADE_TIME,     branchTime: 0,                     hpPerLevel: WALL_HP_PER_LEVEL,     hpBranch: WALL_HP_BRANCH_BONUS },
};

let buildings = [];
let _dirty = true;
let _aliveCache = [];
let _getCalls = 0;

/**
 * Create a building of the given type at grid (col, row) for the given team.
 * Marks tiles as occupied and returns the building object.
 */
export function createBuilding(type, col, row, team) {
  const stats = BUILDING_STATS[type];
  if (!stats) return null;

  const { x, z } = gridToWorld(col, row, TILE_SIZE);
  // For multi-tile buildings, center the world position on the size x size area
  const offset = ((stats.size - 1) * TILE_SIZE) / 2;

  const isUpgradeable = UPGRADEABLE_TYPES.includes(type);

  const building = {
    id: nextId(),
    type,
    col,
    row,
    team,
    hp: stats.hp,
    maxHp: stats.hp,
    x: x + offset,
    z: z + offset,
    buildProgress: 0,
    buildTime: stats.buildTime,
    producing: false,
    produceTimer: 0,
    alive: true,
    fireCooldown: 0,
    idOffset: Math.random() * Math.PI * 2,

    // Upgrade system (for all upgradeable types)
    level: 0,
    branch: null,
    constructionState: isUpgradeable ? 'building' : null,
    constructionTimer: 0,
    constructionDuration: stats.buildTime,
    fireTimer: 0,
    target: null,
    angle: 0,
    lastFireTime: 0,
    totalDamage: 0,
    kills: 0,
    investedCost: stats.cost,
    orientation: type === BTYPE_WALL ? WALL_HORIZONTAL : null,
  };

  // Mark tiles as occupied (walls use TILE_WALL, others use TILE_BUILDING)
  const tileType = type === BTYPE_WALL ? TILE_WALL : TILE_BUILDING;
  for (let r = row; r < row + stats.size; r++) {
    for (let c = col; c < col + stats.size; c++) {
      setTile(c, r, tileType);
    }
  }

  buildings.push(building);
  _dirty = true;
  return building;
}

/** Get the current stat block for a turret based on its level/branch. */
export function getTurretStats(b) {
  if (b.type !== BTYPE_TURRET) return null;
  const data = BUILDING_STATS[BTYPE_TURRET];
  if (b.branch) return data.branches[b.branch];
  return data.levels[b.level];
}

/** Get the current production stats for a barracks, factory, or helipad based on level/branch. */
export function getProductionStats(b) {
  if (b.type !== BTYPE_BARRACKS && b.type !== BTYPE_FACTORY && b.type !== BTYPE_HELIPAD) return null;
  const data = BUILDING_STATS[b.type];
  if (!data.levels) return null;
  if (b.branch) return data.branches[b.branch];
  return data.levels[b.level];
}

/** Get the current generator stats (incomeBonus, territoryMult) based on level/branch. */
export function getGeneratorStats(b) {
  if (b.type !== BTYPE_GENERATOR) return null;
  const data = BUILDING_STATS[BTYPE_GENERATOR];
  if (!data.levels) return null;
  if (b.branch) return data.branches[b.branch];
  return data.levels[b.level];
}

/** Compute max HP based on level and branch for any upgradeable building. */
function computeMaxHp(b) {
  // Walls use absolute HP from their level table, not multipliers
  if (b.type === BTYPE_WALL) {
    const data = BUILDING_STATS[BTYPE_WALL];
    return data.levels[b.level].hp;
  }
  const params = UPGRADE_PARAMS[b.type];
  if (!params) return BUILDING_STATS[b.type].hp;
  const base = BUILDING_STATS[b.type].hp;
  if (b.branch) {
    return Math.round(base * (1.0 + params.hpPerLevel * 2 + params.hpBranch));
  }
  return Math.round(base * (1.0 + params.hpPerLevel * b.level));
}

/** Can this building be upgraded (L0->L1 or L1->L2)? */
export function canUpgradeBuilding(b) {
  if (!UPGRADEABLE_TYPES.includes(b.type)) return false;
  const data = BUILDING_STATS[b.type];
  if (!data.levels) return false;
  return b.level < data.levels.length - 1 && b.branch === null && !b.constructionState;
}

// Keep turret-specific aliases for backward compatibility
export function canUpgradeTurret(b) {
  return b.type === BTYPE_TURRET && canUpgradeBuilding(b);
}

/** Can this building branch (must be max level, no branch yet)? Walls have no branches. */
export function canBranchBuilding(b) {
  if (!UPGRADEABLE_TYPES.includes(b.type)) return false;
  if (b.type === BTYPE_WALL) return false; // walls have no branches
  const data = BUILDING_STATS[b.type];
  if (!data.levels || !data.branches) return false;
  return b.level >= data.levels.length - 1 && b.branch === null && !b.constructionState;
}

export function canBranchTurret(b) {
  return b.type === BTYPE_TURRET && canBranchBuilding(b);
}

/** Get the cost to upgrade to the next level. */
export function getUpgradeCost(b) {
  if (!canUpgradeBuilding(b)) return Infinity;
  return BUILDING_STATS[b.type].levels[b.level + 1].upgradeCost;
}

/** Get the cost to apply a branch. */
export function getBranchCost(b, key) {
  if (!canBranchBuilding(b)) return Infinity;
  const branches = BUILDING_STATS[b.type].branches;
  if (!branches || !branches[key]) return Infinity;
  return branches[key].cost;
}

/** Start an upgrade (puts building into construction state). */
export function startUpgrade(b) {
  const params = UPGRADE_PARAMS[b.type];
  if (!params) return;
  b.constructionState = 'upgrading';
  b.constructionTimer = 0;
  b.constructionDuration = params.times[b.level + 1];
}

// Turret-specific alias
export function startTurretUpgrade(b) { startUpgrade(b); }

/** Start a branch (puts building into construction state). */
export function startBranch(b, key) {
  const params = UPGRADE_PARAMS[b.type];
  if (!params) return;
  b.constructionState = 'branching';
  b.constructionTimer = 0;
  b.constructionDuration = params.branchTime;
  b._pendingBranchKey = key;
}

// Turret-specific alias
export function startTurretBranch(b, key) { startBranch(b, key); }

/** Can this wall be repaired? */
export function canRepairWall(b) {
  return b.type === BTYPE_WALL && b.alive && b.hp < b.maxHp && !b.constructionState;
}

/** Get the energy cost to repair a wall. */
export function getRepairCost(b) {
  return BUILDING_STATS[BTYPE_WALL].repairCost;
}

/** Start repairing a wall (puts it into 'repairing' construction state). */
export function startWallRepair(b) {
  b.constructionState = 'repairing';
  b.constructionTimer = 0;
  b.constructionDuration = BUILDING_STATS[BTYPE_WALL].repairTime;
}

/** Set wall orientation (flags mesh for rebuild). */
export function setWallOrientation(building, orientation) {
  if (building.type !== BTYPE_WALL || !building.alive) return;
  building.orientation = orientation;
  building._orientationChanged = true;
}

/** Demolish a player building, returning energy refund. */
export function demolishBuilding(building) {
  if (!building.alive || building.team !== TEAM_PLAYER) return 0;
  const refund = Math.floor(building.investedCost * WALL_DEMOLISH_REFUND_RATIO);
  removeBuilding(building);
  return refund;
}

/** Finish an upgrade — increment level, scale HP. */
function finishUpgrade(b) {
  b.level++;
  const oldMax = b.maxHp;
  b.maxHp = computeMaxHp(b);
  b.hp += (b.maxHp - oldMax); // heal the upgrade amount
  b.investedCost += BUILDING_STATS[b.type].levels[b.level].upgradeCost;
}

/** Finish a branch — apply branch, scale HP. */
function finishBranch(b) {
  b.branch = b._pendingBranchKey;
  b._pendingBranchKey = null;
  const oldMax = b.maxHp;
  b.maxHp = computeMaxHp(b);
  b.hp += (b.maxHp - oldMax);
  b.investedCost += BUILDING_STATS[b.type].branches[b.branch].cost;
}

/**
 * Update all alive buildings: build progress and unit production.
 * callbacks.createUnit(unitType, x, z, team, bonuses) — spawns a unit.
 * Returns array of buildings that just finished construction (for mesh rebuild).
 */
export function updateBuildings(dt, matchTime, callbacks) {
  const justFinished = [];

  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    if (!b.alive) continue;

    const stats = BUILDING_STATS[b.type];
    const isUpgradeable = UPGRADEABLE_TYPES.includes(b.type);

    // --- Construction state (building / upgrading / branching) for upgradeable types ---
    if (isUpgradeable && b.constructionState) {
      b.constructionTimer += dt;
      // Also advance legacy buildProgress for the initial 'building' state
      if (b.constructionState === 'building') {
        b.buildProgress = b.constructionTimer;
      }
      if (b.constructionTimer >= b.constructionDuration) {
        const prevState = b.constructionState;
        if (prevState === 'upgrading') finishUpgrade(b);
        else if (prevState === 'branching') finishBranch(b);
        else if (prevState === 'repairing') {
          b.hp = b.maxHp;
          b._justRepaired = true;
        }
        b.constructionState = null;
        if (prevState === 'building') {
          b.buildProgress = b.buildTime; // mark fully built
        }
        if (prevState === 'upgrading' || prevState === 'branching' || prevState === 'repairing') {
          justFinished.push(b);
        }
      }
      continue; // can't produce or fire during construction
    }

    // Build progress (non-upgradeable buildings)
    if (!isUpgradeable && b.buildProgress < b.buildTime) {
      b.buildProgress += dt;
      if (b.buildProgress > b.buildTime) b.buildProgress = b.buildTime;
      continue; // still building, don't produce yet
    }

    // Unit production
    if (stats.produceUnit && stats.produceTime) {
      // Get production stats based on level/branch
      const pStats = getProductionStats(b);
      const produceTime = pStats ? pStats.produceTime : stats.produceTime;
      const produceUnit = (pStats && pStats.produceUnit) ? pStats.produceUnit : stats.produceUnit;

      b.produceTimer += dt;
      if (b.produceTimer >= produceTime) {
        b.produceTimer -= produceTime;
        // Spawn offset: south for player, north for enemy
        const spawnOffset = b.team === TEAM_PLAYER ? -40 : 40;
        if (callbacks && callbacks.createUnit) {
          // Build unit bonuses from production stats
          const bonuses = pStats ? {
            hpMult: pStats.hpMult || 1,
            damageMult: pStats.damageMult || 1,
            speedMult: pStats.speedMult || 1,
            rangeMult: pStats.rangeMult || 1,
            level: b.level,
            branch: b.branch,
          } : null;
          callbacks.createUnit(produceUnit, b.x, b.z + spawnOffset, b.team, bonuses, b.id);
        }
      }
    }
  }

  return justFinished;
}

/** Return all alive buildings. */
export function getBuildings() {
  if (_dirty) {
    _aliveCache = buildings.filter(b => b.alive);
    _dirty = false;
    _getCalls = 0;
  }
  _getCalls++;
  if (_getCalls % 60 === 0) {
    buildings = buildings.filter(b => b.alive);
  }
  return _aliveCache;
}

/** Mark a building as dead and clear its tiles. */
export function removeBuilding(b) {
  b.alive = false;
  _dirty = true;
  const stats = BUILDING_STATS[b.type];
  if (stats) {
    for (let r = b.row; r < b.row + stats.size; r++) {
      for (let c = b.col; c < b.col + stats.size; c++) {
        setTile(c, r, TILE_EMPTY);
      }
    }
  }
  // Clear any unit wall targets pointing to this building
  if (b.type === BTYPE_WALL) {
    b._wallDestroyed = true;
  }
}

/** Reset all buildings. */
export function resetBuildings() {
  buildings = [];
  _dirty = true;
  _aliveCache = [];
  _getCalls = 0;
}
