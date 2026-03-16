// ============================================================
// waves.js — Enemy AI decision loop + Player rally coordination
// ============================================================

import {
  TEAM_PLAYER, TEAM_ENEMY,
  BTYPE_CORE, BTYPE_BARRACKS, BTYPE_TURRET, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL,
  BUILDING_STATS, TILE_SIZE,
  GRID_COLS, GRID_ROWS,
  ENEMY_BUILD_ROW_MIN, ENEMY_BUILD_ROW_MAX,
  SHARED_BUILD_ROW_MIN, SHARED_BUILD_ROW_MAX,
  ENEMY_BASE_COL, ENEMY_BASE_ROW,
  AI_TICK_INTERVAL,
  AI_ENERGY_RESERVE,
  AI_LIMITS,
  AI_TIMING,
  AI_THREAT_RADIUS,
  AI_THREAT_OUTER_RADIUS,
  AI_THREAT_HIGH_THRESHOLD,
  AI_THREAT_LOW_THRESHOLD,
  AI_PUSH,
  AI_PROFILES,
  AI_BUILD_ORDER,
  AI_TEMPO,
  DIFFICULTY,
  AI_MAX_ACTIONS_PER_TICK,
  AI_WAVE_POWER,
  AI_HELI_POWER_WEIGHT,
  AI_WALL_REPAIR_THRESHOLD,
  AI_MAX_REPAIRS_PER_TICK,
  AI_REPAIR_HP_THRESHOLD,
  AI_REPAIR_MAX_ATTEMPTS,
  AI_REPAIR_ATTEMPT_WINDOW,
  AI_REPAIR_ENERGY_RESERVE_MULT,
  UTYPE_HELICOPTER,
  UTYPE_RIFLE, UTYPE_TANK,
  UTYPE_MEDIC, UTYPE_ENGINEER,
  MEDIC_SPAWN_COST, ENGINEER_SPAWN_COST,
  AI_MEDIC_MIN_TIME, AI_MEDIC_INJURED_THRESHOLD,
  AI_ENGINEER_MIN_TIME, AI_ENGINEER_INJURED_THRESHOLD,
  STANCE_ADVANCE,
  STANCE_DEFEND,
  TARGET_ANY, TARGET_UNITS,
  TARGET_BUILDINGS,
  TILE_EMPTY, TILE_OBSTACLE, TILE_BUILDING,
  TILE_WALL,
  AI_INTEL_UPDATE_INTERVAL,
  AI_HELICOPTER_CLUSTER_RADIUS,
  AI_HELI_RALLY_COMMIT_TIME,
  AI_HELI_RALLY_REVAL_DISTANCE,
  AI_WALL_ZONE_MIN_ROW,
  AI_WALL_ZONE_MAX_ROW,
  AI_TURRET_IDEAL_DISTANCE,
  AI_MAX_WALL_REPAIRS_PER_TICK,
  PLAYER_RALLY_ROW,
  PLAYER_PUSH_SIZE,
  PLAYER_MAX_RALLY_TIME,
  AIRSTRIKE_COST,
  AI_AIRSTRIKE_MIN_TIME,
  AI_AIRSTRIKE_ENERGY_THRESHOLD,
  PLAYER_BASE_COL, PLAYER_BASE_ROW,
  AI_REACTIVE_ARMY_RATIO,
  AI_REACTIVE_TURRET_THRESHOLD,
  AI_REACTIVE_RUSH_BARRACKS,
  AI_REACTIVE_OVERWHELM_RATIO,
  AI_COUNTER_QUEUE_MAX,
  AI_FLANK_SCAN_INTERVAL,
  AI_FLANK_MAX_OFFSET,
  AI_HARASS_MIN_GENERATORS,
  AI_HARASS_UNIT_COUNT,
  AI_HARASS_MIN_TIME,
  AI_FORWARD_BUILD_ENABLED,
  AI_FORWARD_BUILD_TYPES,
  AI_FORWARD_BUILD_MIN_TIME,
} from './config.js';
import { randomInt, gridToWorld, dist } from './utils.js';
import { getTile } from './map.js';

// ============================================================
// Intel — army power + unit counts
// ============================================================

function freshIntel() {
  return {
    lastUpdate: 0,
    playerBarracks: 0,
    playerTurrets: 0,
    playerFactories: 0,
    playerGenerators: 0,
    playerWalls: 0,
    playerTotalUnits: 0,
    playerHelicopters: 0,
    playerArmyPower: 0,
    aiArmyPower: 0,
  };
}

let aiState = {
  lastTick: 0,
  rallyStartTime: 0,
  pushActive: false,
  profile: null,
  profileKey: null,
  difficulty: 'normal',
  diffSettings: null,
  tempo: null,
  intel: freshIntel(),
  // Build order tracking
  buildOrderIndex: 0,
  lastBuildTime: 0,
  lastUpgradeTime: 0,
  // Push tracking
  lastPushUnitCount: 0,
  dynamicPushBonus: 0,
  consecutiveFailures: 0,
  pushStartTime: 0,
  pushCooldownUntil: 0,
  _pushMarkedSuccess: false,
  _lastRallyUpdateTime: 0,
  // Helicopter rally commitment
  heliRallyX: 0, heliRallyZ: 0, heliRallyCommitUntil: 0,
  // Counter-building queue
  _urgentBuildQueue: [],
  // Flank-aware push
  _lastFlankScanTime: 0,
  _flankOffsetX: 0,
  // Forward building
  _attemptForwardBuild: false,
  _forwardBuildAttempted: false,
  // Building repair tracking: { [buildingId]: { count, firstTime } }
  _repairAttempts: {},
};

let playerRallyState = {
  rallyStartTime: 0,
  pushActive: false,
};

// Module-level state for rally exports
let _matchTime = 0;
let _getUnitsRef = null;

// ============================================================
// Initialization
// ============================================================

export function initAI(difficulty) {
  const diff = difficulty || 'normal';
  const diffSettings = DIFFICULTY[diff] || DIFFICULTY.normal;
  const tempo = AI_TEMPO[diff] || AI_TEMPO.normal;

  // Randomly pick a strategy profile
  const profileKeys = Object.keys(AI_PROFILES);
  const profileKey = profileKeys[Math.floor(Math.random() * profileKeys.length)];
  const profile = AI_PROFILES[profileKey];

  aiState = {
    lastTick: 0,
    rallyStartTime: 0,
    pushActive: false,
    profile,
    profileKey,
    difficulty: diff,
    diffSettings,
    tempo,
    intel: freshIntel(),
    buildOrderIndex: 0,
    lastBuildTime: 0,
    lastUpgradeTime: 0,
    lastPushUnitCount: 0,
    dynamicPushBonus: 0,
    consecutiveFailures: 0,
    pushStartTime: 0,
    pushCooldownUntil: 0,
    _pushMarkedSuccess: false,
    _lastRallyUpdateTime: 0,
    heliRallyX: 0, heliRallyZ: 0, heliRallyCommitUntil: 0,
    _urgentBuildQueue: [],
    _lastFlankScanTime: 0,
    _flankOffsetX: 0,
    _attemptForwardBuild: false,
    _forwardBuildAttempted: false,
    _repairAttempts: {},
  };
  playerRallyState = { rallyStartTime: 0, pushActive: false };
}

// ============================================================
// Main AI Update
// ============================================================

export function updateAI(dt, matchTime, callbacks) {
  _matchTime = matchTime;

  // Wave coordination: manage rally and push
  updateEnemyRally(matchTime, callbacks);

  // Helicopter rally management
  updateAIHelicopterRallies(callbacks);

  // AI Air Strike check (runs every tick, not gated by tick interval)
  tryAIAirStrike(matchTime, callbacks);

  // AI Support unit spawn check
  tryAISupportSpawn(matchTime, callbacks);

  // Ticked decisions (building, upgrading)
  if (matchTime - aiState.lastTick < AI_TICK_INTERVAL) return;
  aiState.lastTick = matchTime;

  const allBuildings = callbacks.getBuildings();
  const allUnits = callbacks.getUnits();

  // Update scouting intel
  updateIntel(matchTime, allBuildings, allUnits);

  // Assess threat level
  const aiBuildings = allBuildings.filter(b => b.team === TEAM_ENEMY && b.alive);
  const threat = assessThreat(aiBuildings, allUnits);

  // AI squad management based on threat
  updateAISquads(matchTime, threat, callbacks);

  // Emergency rebuilds: critical buildings
  const barracksCount = aiBuildings.filter(b => b.type === BTYPE_BARRACKS).length;
  if (barracksCount === 0 && matchTime >= AI_TIMING.build.barracks) {
    if (tryBuildStrategic(BTYPE_BARRACKS, aiBuildings, callbacks, matchTime)) return;
  }
  const factoryCount = aiBuildings.filter(b => b.type === BTYPE_FACTORY).length;
  if (factoryCount === 0 && matchTime >= AI_TIMING.build.factory * 0.6) {
    if (tryBuildStrategic(BTYPE_FACTORY, aiBuildings, callbacks, matchTime)) return;
  }
  const generatorCount = aiBuildings.filter(b => b.type === BTYPE_GENERATOR).length;
  if (generatorCount === 0 && matchTime >= 10) {
    if (tryBuildStrategic(BTYPE_GENERATOR, aiBuildings, callbacks, matchTime)) return;
  }

  // Forward building after successful push
  tryForwardBuild(matchTime, aiBuildings, callbacks);

  // Multi-action loop
  for (let actionCount = 0; actionCount < AI_MAX_ACTIONS_PER_TICK; actionCount++) {
    const energy = callbacks.getEnergy();
    const currentAIBuildings = callbacks.getBuildings().filter(b => b.team === TEAM_ENEMY && b.alive);
    const action = pickNextAction(matchTime, energy, currentAIBuildings, callbacks);
    if (!action) break;
    const spent = executeAction(action, currentAIBuildings, callbacks, matchTime);
    if (!spent) break;
  }
}

// ============================================================
// Build-Order Based Action Selection
// ============================================================

function pickNextAction(matchTime, energy, aiBuildings, callbacks) {
  const tempo = aiState.tempo;

  // --- Building repair (all types, throttled) ---
  // Expire old repair attempt records
  for (const id in aiState._repairAttempts) {
    if (matchTime - aiState._repairAttempts[id].firstTime > AI_REPAIR_ATTEMPT_WINDOW) {
      delete aiState._repairAttempts[id];
    }
  }

  // Find damaged buildings below HP threshold that aren't already repairing/upgrading
  const repairCandidates = aiBuildings
    .filter(b => {
      if (b.type === BTYPE_CORE) return false;
      if (!b.alive || b._repairing || b.constructionState) return false;
      if ((b.hp / b.maxHp) >= AI_REPAIR_HP_THRESHOLD) return false;
      // Skip buildings that have been repaired too many times recently
      const attempts = aiState._repairAttempts[b.id];
      if (attempts && attempts.count >= AI_REPAIR_MAX_ATTEMPTS) return false;
      return true;
    });

  // Score repair priority: turrets and generators are more valuable to repair
  const repairPriority = (b) => {
    const hpRatio = b.hp / b.maxHp;
    let typeWeight = 1;
    if (b.type === BTYPE_TURRET) typeWeight = 3;
    else if (b.type === BTYPE_GENERATOR) typeWeight = 2.5;
    else if (b.type === BTYPE_FACTORY) typeWeight = 2;
    else if (b.type === BTYPE_BARRACKS) typeWeight = 1.5;
    else if (b.type === BTYPE_HELIPAD) typeWeight = 2;
    // Upgraded buildings are more valuable to keep alive
    const levelBonus = 1 + (b.level || 0) * 0.3 + (b.branch ? 0.5 : 0);
    return (1 - hpRatio) * typeWeight * levelBonus;
  };

  repairCandidates.sort((a, b) => repairPriority(b) - repairPriority(a));

  // AI keeps a larger energy reserve before spending on repairs
  const repairReserve = AI_ENERGY_RESERVE * AI_REPAIR_ENERGY_RESERVE_MULT;
  let repairsQueued = 0;

  for (const building of repairCandidates) {
    if (repairsQueued >= AI_MAX_REPAIRS_PER_TICK) break;
    if (callbacks.canRepairBuilding && callbacks.canRepairBuilding(building)) {
      const repairCost = callbacks.getRepairCostForBuilding(building);
      if (energy >= repairCost + repairReserve) {
        return { type: 'repairBuilding', meta: { target: building } };
      }
    }
  }

  // --- Upgrades (after upgradeDelay, every upgradeInterval) ---
  if (matchTime >= tempo.upgradeDelay && matchTime - aiState.lastUpgradeTime >= tempo.upgradeInterval) {
    const upgradeAction = pickUpgradeAction(matchTime, energy, aiBuildings, callbacks);
    if (upgradeAction) return upgradeAction;
  }

  // --- Reactive build override (bypasses buildInterval) ---
  const reactiveType = getReactiveBuildOverride(matchTime, energy, aiBuildings, callbacks);
  if (reactiveType) {
    return { type: 'build', meta: { buildType: reactiveType } };
  }

  // --- Urgent counter-build queue (respects buildInterval) ---
  if (matchTime - aiState.lastBuildTime >= tempo.buildInterval && aiState._urgentBuildQueue.length > 0) {
    const urgentAction = pickFromUrgentQueue(matchTime, energy, aiBuildings, callbacks);
    if (urgentAction) return urgentAction;
  }

  // --- Build order walk ---
  if (matchTime - aiState.lastBuildTime < tempo.buildInterval) return null;

  const buildOrder = AI_BUILD_ORDER[aiState.profileKey] || AI_BUILD_ORDER.balanced;
  const limitMap = {
    barracks: AI_LIMITS.barracks,
    turret: AI_LIMITS.turrets,
    factory: AI_LIMITS.factories,
    generator: AI_LIMITS.generators,
    helipad: AI_LIMITS.helipads,
    wall: AI_LIMITS.walls,
  };
  const btypeMap = {
    barracks: BTYPE_BARRACKS,
    turret: BTYPE_TURRET,
    factory: BTYPE_FACTORY,
    generator: BTYPE_GENERATOR,
    helipad: BTYPE_HELIPAD,
    wall: BTYPE_WALL,
  };

  // Walk build order from current index, find next affordable + buildable item
  for (let scan = 0; scan < buildOrder.length; scan++) {
    const idx = (aiState.buildOrderIndex + scan) % buildOrder.length;
    const itemName = buildOrder[idx];
    const btype = btypeMap[itemName];
    if (!btype) continue;

    // Check timing gate
    const timingGate = AI_TIMING.build[itemName] || 0;
    if (matchTime < timingGate) continue;

    // Check limit
    const count = aiBuildings.filter(b => b.type === btype).length;
    const limit = limitMap[itemName] || 4;
    if (count >= limit) continue;

    // Check cost (generators use scaling cost)
    const cost = (btype === BTYPE_GENERATOR && callbacks.getGeneratorCost)
      ? callbacks.getGeneratorCost() : BUILDING_STATS[btype].cost;
    if (energy < cost + AI_ENERGY_RESERVE) continue;

    // Found a buildable item — advance index
    aiState.buildOrderIndex = (idx + 1) % buildOrder.length;
    return { type: 'build', meta: { buildType: btype, cost } };
  }

  // Build order exhausted — no build action
  return null;
}

// ============================================================
// Upgrade Action Selection
// ============================================================

function pickUpgradeAction(matchTime, energy, aiBuildings, callbacks) {
  const upgradeTimingMap = {
    [BTYPE_TURRET]: AI_TIMING.upgrade.turret,
    [BTYPE_BARRACKS]: AI_TIMING.upgrade.barracks,
    [BTYPE_FACTORY]: AI_TIMING.upgrade.factory,
    [BTYPE_GENERATOR]: AI_TIMING.upgrade.generator,
    [BTYPE_HELIPAD]: AI_TIMING.upgrade.helipad,
    [BTYPE_WALL]: AI_TIMING.upgrade.wall,
  };

  // Try turret upgrades first
  if (matchTime >= upgradeTimingMap[BTYPE_TURRET]) {
    const turrets = aiBuildings
      .filter(b => b.type === BTYPE_TURRET && b.alive)
      .sort((a, b) => (b.totalDamage || 0) - (a.totalDamage || 0));

    for (const t of turrets) {
      if (callbacks.canUpgradeTurret && callbacks.canUpgradeTurret(t)) {
        const cost = callbacks.getUpgradeCost(t);
        if (energy >= cost + AI_ENERGY_RESERVE) {
          return { type: 'upgradeTurret', meta: { target: t } };
        }
      }
      if (callbacks.canBranchTurret && callbacks.canBranchTurret(t)) {
        const branch = pickTurretBranch(aiState.intel, aiBuildings);
        const cost = callbacks.getBranchCost(t, branch);
        if (energy >= cost + AI_ENERGY_RESERVE) {
          return { type: 'branchTurret', meta: { target: t, branch } };
        }
      }
    }
  }

  // Production building upgrades
  for (const btype of [BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD]) {
    const minTime = upgradeTimingMap[btype] || 0;
    if (matchTime < minTime) continue;

    const targets = aiBuildings
      .filter(b => b.type === btype && b.alive)
      .sort((a, b) => a.level - b.level);

    for (const t of targets) {
      if (callbacks.canUpgradeBuilding && callbacks.canUpgradeBuilding(t)) {
        const cost = callbacks.getUpgradeCost(t);
        if (energy >= cost + AI_ENERGY_RESERVE) {
          return { type: 'upgradeProduction', meta: { target: t } };
        }
      }
      if (callbacks.canBranchBuilding && callbacks.canBranchBuilding(t)) {
        const branch = pickProductionBranch(btype, aiState.intel, aiBuildings, matchTime);
        const cost = callbacks.getBranchCost(t, branch);
        if (energy >= cost + AI_ENERGY_RESERVE) {
          return { type: 'branchProduction', meta: { target: t, branch } };
        }
      }
    }
  }

  // Wall upgrades
  if (matchTime >= upgradeTimingMap[BTYPE_WALL]) {
    const walls = aiBuildings
      .filter(b => b.type === BTYPE_WALL && b.alive)
      .sort((a, b) => a.level - b.level);

    for (const wall of walls) {
      if (callbacks.canUpgradeBuilding && callbacks.canUpgradeBuilding(wall)) {
        const cost = callbacks.getUpgradeCost(wall);
        if (energy >= cost + AI_ENERGY_RESERVE) {
          return { type: 'upgradeWall', meta: { target: wall } };
        }
      }
    }
  }

  return null;
}

// ============================================================
// Execute Action — returns true if energy was spent
// ============================================================

function executeAction(action, aiBuildings, callbacks, matchTime) {
  switch (action.type) {
    case 'build': {
      const result = tryBuildStrategic(action.meta.buildType, aiBuildings, callbacks, matchTime);
      if (result) aiState.lastBuildTime = matchTime;
      return result;
    }
    case 'upgradeTurret':
      if (callbacks.canUpgradeTurret(action.meta.target)) {
        const cost = callbacks.getUpgradeCost(action.meta.target);
        if (callbacks.spendEnergy(cost)) {
          callbacks.startTurretUpgrade(action.meta.target);
          aiState.lastUpgradeTime = matchTime;
          return true;
        }
      }
      return false;
    case 'branchTurret':
      if (callbacks.canBranchTurret(action.meta.target)) {
        const cost = callbacks.getBranchCost(action.meta.target, action.meta.branch);
        if (callbacks.spendEnergy(cost)) {
          callbacks.startTurretBranch(action.meta.target, action.meta.branch);
          aiState.lastUpgradeTime = matchTime;
          return true;
        }
      }
      return false;
    case 'repairWall':
    case 'repairBuilding': {
      const target = action.meta.target;
      const canRepair = callbacks.canRepairBuilding
        ? callbacks.canRepairBuilding(target)
        : (callbacks.canRepairWall && callbacks.canRepairWall(target));
      if (!canRepair) return false;
      const repairCost = callbacks.getRepairCostForBuilding
        ? callbacks.getRepairCostForBuilding(target)
        : (callbacks.getRepairCost ? callbacks.getRepairCost(target) : 0);
      if (!callbacks.spendEnergy(repairCost)) return false;
      if (callbacks.startBuildingRepair) {
        callbacks.startBuildingRepair(target);
      } else if (callbacks.startWallRepair) {
        callbacks.startWallRepair(target);
      }
      // Track repair attempt for this building
      if (!aiState._repairAttempts[target.id]) {
        aiState._repairAttempts[target.id] = { count: 0, firstTime: matchTime };
      }
      aiState._repairAttempts[target.id].count++;
      return true;
    }
    case 'upgradeWall':
    case 'upgradeProduction':
      if (callbacks.canUpgradeBuilding && callbacks.canUpgradeBuilding(action.meta.target)) {
        const cost = callbacks.getUpgradeCost(action.meta.target);
        if (callbacks.spendEnergy(cost)) {
          callbacks.startUpgrade(action.meta.target);
          aiState.lastUpgradeTime = matchTime;
          return true;
        }
      }
      return false;
    case 'branchProduction':
      if (callbacks.canBranchBuilding(action.meta.target)) {
        const cost = callbacks.getBranchCost(action.meta.target, action.meta.branch);
        if (callbacks.spendEnergy(cost)) {
          callbacks.startBranch(action.meta.target, action.meta.branch);
          aiState.lastUpgradeTime = matchTime;
          return true;
        }
      }
      return false;
    default:
      return false;
  }
}

// ============================================================
// Branch Picking Helpers
// ============================================================

function pickTurretBranch(intel, aiBuildings) {
  const branchedTurrets = aiBuildings.filter(b => b.type === BTYPE_TURRET && b.branch);
  if (branchedTurrets.length > 0) {
    const hasA = branchedTurrets.some(b => b.branch === 'A');
    const hasB = branchedTurrets.some(b => b.branch === 'B');
    if (hasA && !hasB) return 'B';
    if (hasB && !hasA) return 'A';
  }
  if (intel.playerTotalUnits > 4 || intel.playerBarracks >= 2) return 'B';
  if (intel.playerTanks >= 2) return 'A';
  return 'A';
}

function pickProductionBranch(btype, intel, aiBuildings, matchTime) {
  const branchedSameType = aiBuildings.filter(b => b.type === btype && b.branch);
  if (branchedSameType.length > 0) {
    const hasA = branchedSameType.some(b => b.branch === 'A');
    const hasB = branchedSameType.some(b => b.branch === 'B');
    if (hasA && !hasB) return 'B';
    if (hasB && !hasA) return 'A';
  }

  if (btype === BTYPE_BARRACKS) {
    const hasFactory = aiBuildings.some(b => b.type === BTYPE_FACTORY && b.alive);
    if (!hasFactory && matchTime > 60) return 'A';
    if (hasFactory) return 'B';
    if (intel.playerTanks >= 2) return 'A';
    return 'B';
  }

  if (btype === BTYPE_GENERATOR) {
    const genCount = aiBuildings.filter(b => b.type === BTYPE_GENERATOR && b.alive).length;
    if (genCount <= 1) return 'A';
    if (intel.playerGenerators > genCount) return 'A';
    return 'B';
  }

  if (btype === BTYPE_HELIPAD) {
    if (intel.playerTurrets >= 3) return 'B';
    if (intel.playerTurrets < 2 && intel.playerTotalUnits > 6) return 'A';
    return 'B';
  }

  // Factory
  if (intel.playerTotalUnits > 6 || matchTime > 150) return 'B';
  if (intel.playerTurrets >= 3) return 'A';
  return 'A';
}

// ============================================================
// Scouting / Intel (simplified — army power + unit counts only)
// ============================================================

function updateIntel(matchTime, allBuildings, allUnits) {
  const intelInterval = aiState.difficulty === 'hard' ? 4.0 : AI_INTEL_UPDATE_INTERVAL;
  if (matchTime - aiState.intel.lastUpdate < intelInterval) return;
  aiState.intel.lastUpdate = matchTime;

  const intel = aiState.intel;
  intel.playerBarracks = 0;
  intel.playerTurrets = 0;
  intel.playerFactories = 0;
  intel.playerGenerators = 0;
  intel.playerWalls = 0;
  intel.playerTotalUnits = 0;
  intel.playerHelicopters = 0;
  intel.playerTanks = 0;

  let playerArmyPower = 0;
  let aiArmyPower = 0;

  for (let i = 0; i < allBuildings.length; i++) {
    const b = allBuildings[i];
    if (b.team !== TEAM_PLAYER || !b.alive) continue;
    if (b.type === BTYPE_BARRACKS) intel.playerBarracks++;
    else if (b.type === BTYPE_TURRET) intel.playerTurrets++;
    else if (b.type === BTYPE_FACTORY) intel.playerFactories++;
    else if (b.type === BTYPE_GENERATOR) intel.playerGenerators++;
    else if (b.type === BTYPE_WALL) intel.playerWalls++;
  }

  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive) continue;

    if (u.team === TEAM_PLAYER) {
      intel.playerTotalUnits++;
      if (u.type === 'tank') intel.playerTanks++;
      else if (u.type === UTYPE_HELICOPTER) intel.playerHelicopters++;

      const unitPower = AI_WAVE_POWER[u.type] || 1.0;
      const heliMult = u.type === UTYPE_HELICOPTER ? AI_HELI_POWER_WEIGHT : 1.0;
      playerArmyPower += u.hp * unitPower * heliMult;
    } else if (u.team === TEAM_ENEMY) {
      const unitPower = AI_WAVE_POWER[u.type] || 1.0;
      const heliMult = u.type === UTYPE_HELICOPTER ? AI_HELI_POWER_WEIGHT : 1.0;
      aiArmyPower += u.hp * unitPower * heliMult;
    }
  }

  intel.playerArmyPower = playerArmyPower;
  intel.aiArmyPower = aiArmyPower;

  // Re-assess build priorities based on updated intel
  reassessBuildPriority(allBuildings);
}

// ============================================================
// Player Rally — groups player units before pushing
// ============================================================

export function updatePlayerRally(matchTime, callbacks) {
  _matchTime = matchTime;
  _getUnitsRef = callbacks.getUnits;
  const allUnits = callbacks.getUnits();
  const playerUnits = allUnits.filter(u => u.alive && u.team === TEAM_PLAYER && u.type !== UTYPE_HELICOPTER && !u.isSupport && (u.stance ?? STANCE_ADVANCE) === STANCE_ADVANCE);

  const rallyPos = gridToWorld(Math.floor(GRID_COLS / 2), PLAYER_RALLY_ROW, TILE_SIZE);

  let holdingCount = 0;
  for (const u of playerUnits) {
    if (u.rallyHold) holdingCount++;
  }

  const rallyTimedOut = playerRallyState.rallyStartTime > 0 &&
    (matchTime - playerRallyState.rallyStartTime) >= PLAYER_MAX_RALLY_TIME;

  if (holdingCount >= PLAYER_PUSH_SIZE || (holdingCount > 0 && rallyTimedOut)) {
    for (const u of playerUnits) {
      if (u.rallyHold) {
        u.rallyHold = false;
        u.path = null;
        u.pathIndex = 0;
      }
    }
    playerRallyState.rallyStartTime = 0;
    playerRallyState.pushActive = true;
  }

  if (playerRallyState.pushActive) {
    const advancingCount = playerUnits.filter(u => !u.rallyHold).length;
    if (advancingCount === 0) {
      playerRallyState.pushActive = false;
    }
  }

  if (!playerRallyState.pushActive) {
    for (const u of playerUnits) {
      if (!u.rallyHold && !u._rallyAssigned) {
        u.rallyHold = true;
        u.rallyX = rallyPos.x + (Math.random() - 0.5) * 160;
        u.rallyZ = rallyPos.z + (Math.random() - 0.5) * 120;
        u._rallyAssigned = true;

        if (playerRallyState.rallyStartTime === 0) {
          playerRallyState.rallyStartTime = matchTime;
        }
      }
    }
  }
}

// ============================================================
// Threat Assessment
// ============================================================

function assessThreat(aiBuildings, allUnits) {
  const basePos = gridToWorld(ENEMY_BASE_COL, ENEMY_BASE_ROW, TILE_SIZE);

  let playerThreatHP = 0;
  let aiArmyHP = 0;

  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive) continue;

    if (u.team === TEAM_PLAYER) {
      const d = dist(u.x, u.z, basePos.x, basePos.z);
      if (d < AI_THREAT_RADIUS) {
        playerThreatHP += u.hp;
      } else if (d < AI_THREAT_OUTER_RADIUS) {
        const t = (d - AI_THREAT_RADIUS) / (AI_THREAT_OUTER_RADIUS - AI_THREAT_RADIUS);
        playerThreatHP += u.hp * (1.0 - t * 0.7);
      } else if (u.z < basePos.z + 200) {
        playerThreatHP += u.hp * 0.15;
      }
    } else {
      if (u.rallyHold) {
        aiArmyHP += u.hp * 0.3;
      } else {
        aiArmyHP += u.hp;
      }
    }
  }

  if (aiArmyHP <= 0 && playerThreatHP > 0) return 1.0;
  if (playerThreatHP <= 0) return 0.0;
  return Math.min(1.0, playerThreatHP / (aiArmyHP + playerThreatHP));
}

// ============================================================
// Enemy Wave Coordination — simplified push logic
// ============================================================

function updateEnemyRally(matchTime, callbacks) {
  const allUnits = callbacks.getUnits();
  const aiUnits = allUnits.filter(u => u.alive && u.team === TEAM_ENEMY && u.type !== UTYPE_HELICOPTER && !u.isSupport && (u.stance ?? STANCE_ADVANCE) === STANCE_ADVANCE);

  const rallyPos = gridToWorld(Math.floor(GRID_COLS / 2), AI_PUSH.rallyRow, TILE_SIZE);

  let holdingCount = 0;
  let waveStrength = 0;

  for (const u of aiUnits) {
    if (u.rallyHold) {
      holdingCount++;
      const power = AI_WAVE_POWER[u.type] || 1.0;
      waveStrength += u.hp * power;
    }
  }

  // Update time tracking
  aiState._lastRallyUpdateTime = matchTime;

  // --- Player-relative strength gating ---
  const intel = aiState.intel;
  const playerDefense = intel.playerArmyPower
    + intel.playerTurrets * AI_PUSH.turretPower
    + intel.playerWalls * AI_PUSH.wallPower;

  let requiredStrength = Math.max(
    AI_PUSH.minWaveStrength,
    playerDefense * (aiState.profile.pushRatio || 0.9)
  );

  // Consecutive failure multiplier
  if (aiState.consecutiveFailures > 0) {
    requiredStrength *= (1 + aiState.consecutiveFailures * AI_PUSH.failureStrengthMult);
  }

  const onCooldown = matchTime < aiState.pushCooldownUntil;

  const shouldPush = (
    holdingCount >= AI_PUSH.minSize &&
    waveStrength >= requiredStrength &&
    !onCooldown
  );

  if (shouldPush) {
    // Try economic harassment when releasing a push
    tryEconomicHarass(matchTime, aiUnits, callbacks);

    for (const u of aiUnits) {
      if (u.rallyHold) {
        u.rallyHold = false;
        u.path = null;
        u.pathIndex = 0;
      }
    }
    aiState.rallyStartTime = 0;
    aiState.pushActive = true;
    aiState.pushStartTime = matchTime;
    aiState._pushMarkedSuccess = false;
    aiState._forwardBuildAttempted = false;
    aiState.lastPushUnitCount = holdingCount;
  }

  if (aiState.pushActive) {
    const advancingCount = aiUnits.filter(u => !u.rallyHold).length;
    const pushDuration = matchTime - aiState.pushStartTime;

    // Push success: units survive 15+ seconds
    if (!aiState._pushMarkedSuccess && advancingCount > 0 && pushDuration > 15) {
      aiState._pushMarkedSuccess = true;
      aiState.dynamicPushBonus = Math.max(0, aiState.dynamicPushBonus - AI_PUSH.sizeShrink);
      aiState.consecutiveFailures = 0;
      // Flag forward building attempt on next AI tick
      if (!aiState._forwardBuildAttempted) {
        aiState._attemptForwardBuild = true;
      }
    }

    if (advancingCount === 0) {
      if (aiState.lastPushUnitCount > 0 && !aiState._pushMarkedSuccess) {
        aiState.dynamicPushBonus = Math.min(
          AI_PUSH.maxSize,
          aiState.dynamicPushBonus + AI_PUSH.sizeGrow
        );
        aiState.consecutiveFailures++;
        aiState.pushCooldownUntil = matchTime + AI_PUSH.cooldownAfterFailure;
      }
      aiState.pushActive = false;
      aiState.lastPushUnitCount = 0;
      aiState._pushMarkedSuccess = false;
    }
  }

  if (!aiState.pushActive) {
    // Scan for flank weakness during rally formation
    scanFlankWeakness(matchTime, callbacks);

    const flankOffset = aiState._flankOffsetX * TILE_SIZE;
    for (const u of aiUnits) {
      if (!u.rallyHold && !u._rallyAssigned) {
        u.rallyHold = true;
        u.rallyX = rallyPos.x + flankOffset + (Math.random() - 0.5) * 60;
        u.rallyZ = rallyPos.z + (Math.random() - 0.5) * 60;
        u._rallyAssigned = true;

        if (aiState.rallyStartTime === 0) {
          aiState.rallyStartTime = matchTime;
        }
      }
    }
  }
}

// ============================================================
// Immediate rally assignment for newly created enemy units
// ============================================================

export function assignEnemyUnitRally(u) {
  if (aiState.pushActive) return;
  if (u.type === UTYPE_HELICOPTER) return;
  if (u.isSupport) return;
  if ((u.stance ?? STANCE_ADVANCE) !== STANCE_ADVANCE) return;

  const rallyPos = gridToWorld(Math.floor(GRID_COLS / 2), AI_PUSH.rallyRow, TILE_SIZE);
  const flankOffset = aiState._flankOffsetX * TILE_SIZE;
  u.rallyHold = true;
  u.rallyX = rallyPos.x + flankOffset + (Math.random() - 0.5) * 60;
  u.rallyZ = rallyPos.z + (Math.random() - 0.5) * 60;
  u._rallyAssigned = true;

  if (aiState.rallyStartTime === 0) {
    aiState.rallyStartTime = _matchTime;
  }
}

// ============================================================
// AI Air Strike — uses fully-upgraded helipads to call air strikes
// ============================================================

function tryAIAirStrike(matchTime, callbacks) {
  // Don't try before minimum time
  if (matchTime < AI_AIRSTRIKE_MIN_TIME) return;

  const energy = callbacks.getEnergy();
  if (energy < AI_AIRSTRIKE_ENERGY_THRESHOLD) return;
  if (energy < AIRSTRIKE_COST + AI_ENERGY_RESERVE) return;

  // Find a fully upgraded helipad that can air strike
  const allBuildings = callbacks.getBuildings();
  let strikeHelipad = null;
  for (let i = 0; i < allBuildings.length; i++) {
    const b = allBuildings[i];
    if (b.team !== TEAM_ENEMY || !b.alive || b.type !== BTYPE_HELIPAD) continue;
    if (callbacks.canAirStrike && callbacks.canAirStrike(b)) {
      strikeHelipad = b;
      break;
    }
  }
  if (!strikeHelipad) return;

  // Find the best target: densest cluster of player units/buildings
  const allUnits = callbacks.getUnits();
  const playerUnits = allUnits.filter(u => u.alive && u.team === TEAM_PLAYER);
  const playerBuildings = allBuildings.filter(b => b.alive && b.team === TEAM_PLAYER);

  if (playerUnits.length === 0 && playerBuildings.length === 0) return;

  // Score target locations — use player units and buildings as candidate centers
  let bestX = 0, bestZ = 0, bestScore = 0;

  // Check player base as a target
  const basePos = gridToWorld(PLAYER_BASE_COL, PLAYER_BASE_ROW, TILE_SIZE);
  const baseScore = scoreAirStrikeTarget(basePos.x, basePos.z, playerUnits, playerBuildings);
  if (baseScore > bestScore) {
    bestScore = baseScore;
    bestX = basePos.x;
    bestZ = basePos.z;
  }

  // Check densest unit cluster
  for (let i = 0; i < Math.min(playerUnits.length, 10); i++) {
    const u = playerUnits[i];
    const score = scoreAirStrikeTarget(u.x, u.z, playerUnits, playerBuildings);
    if (score > bestScore) {
      bestScore = score;
      bestX = u.x;
      bestZ = u.z;
    }
  }

  // Check building clusters
  for (let i = 0; i < Math.min(playerBuildings.length, 6); i++) {
    const b = playerBuildings[i];
    const score = scoreAirStrikeTarget(b.x, b.z, playerUnits, playerBuildings);
    if (score > bestScore) {
      bestScore = score;
      bestX = b.x;
      bestZ = b.z;
    }
  }

  // Require a minimum score threshold to actually strike
  // (don't waste air strike on one unit)
  if (bestScore < 500) return;

  // Execute air strike
  if (callbacks.spendEnergy(AIRSTRIKE_COST)) {
    callbacks.markAirStrikeUsed(strikeHelipad);
    callbacks.initiateAirStrike(TEAM_ENEMY, bestX, bestZ);
  }
}

function scoreAirStrikeTarget(tx, tz, playerUnits, playerBuildings) {
  let score = 0;
  const blastR = 140; // AIRSTRIKE_BLAST_RADIUS

  for (let i = 0; i < playerUnits.length; i++) {
    const u = playerUnits[i];
    const d = dist(u.x, u.z, tx, tz);
    if (d < blastR) {
      score += u.hp * (1 - d / blastR);
    }
  }

  for (let i = 0; i < playerBuildings.length; i++) {
    const b = playerBuildings[i];
    const d = dist(b.x, b.z, tx, tz);
    if (d < blastR) {
      // Buildings are higher value targets
      const value = b.type === BTYPE_CORE ? 5000 : b.hp * 2;
      score += value * (1 - d / blastR);
    }
  }

  return score;
}

// ============================================================
// AI Support Unit Spawn — Medic / Engineer
// ============================================================

function tryAISupportSpawn(matchTime, callbacks) {
  const energy = callbacks.getEnergy();
  const allBuildings = callbacks.getBuildings();
  const allUnits = callbacks.getUnits();

  // --- Medic spawn ---
  if (matchTime >= AI_MEDIC_MIN_TIME && energy >= MEDIC_SPAWN_COST + AI_ENERGY_RESERVE) {
    // Count injured infantry
    let injuredInfantry = 0;
    for (let i = 0; i < allUnits.length; i++) {
      const u = allUnits[i];
      if (!u.alive || u.team !== TEAM_ENEMY) continue;
      if ((u.type === UTYPE_RIFLE || u.type === 'assault') && u.hp < u.maxHp) {
        injuredInfantry++;
      }
    }
    if (injuredInfantry >= AI_MEDIC_INJURED_THRESHOLD) {
      // Find a branched barracks that can spawn
      for (let i = 0; i < allBuildings.length; i++) {
        const b = allBuildings[i];
        if (b.team !== TEAM_ENEMY || b.type !== BTYPE_BARRACKS) continue;
        if (callbacks.canSpawnMedic && callbacks.canSpawnMedic(b)) {
          if (callbacks.spendEnergy(MEDIC_SPAWN_COST)) {
            callbacks.spawnSupportUnit(UTYPE_MEDIC, b);
          }
          break;
        }
      }
    }
  }

  // --- Engineer spawn ---
  if (matchTime >= AI_ENGINEER_MIN_TIME && energy >= ENGINEER_SPAWN_COST + AI_ENERGY_RESERVE) {
    // Count injured tanks
    let injuredTanks = 0;
    for (let i = 0; i < allUnits.length; i++) {
      const u = allUnits[i];
      if (!u.alive || u.team !== TEAM_ENEMY) continue;
      if (u.type === UTYPE_TANK && u.hp < u.maxHp) {
        injuredTanks++;
      }
    }
    if (injuredTanks >= AI_ENGINEER_INJURED_THRESHOLD) {
      for (let i = 0; i < allBuildings.length; i++) {
        const b = allBuildings[i];
        if (b.team !== TEAM_ENEMY || b.type !== BTYPE_FACTORY) continue;
        if (callbacks.canSpawnEngineer && callbacks.canSpawnEngineer(b)) {
          if (callbacks.spendEnergy(ENGINEER_SPAWN_COST)) {
            callbacks.spawnSupportUnit(UTYPE_ENGINEER, b);
          }
          break;
        }
      }
    }
  }
}

// ============================================================
// AI Helicopter Rally — target densest player clusters
// ============================================================

function updateAIHelicopterRallies(callbacks) {
  const allUnits = callbacks.getUnits();
  const aiHelis = [];
  const playerUnits = [];

  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive) continue;
    if (u.team === TEAM_ENEMY && u.type === UTYPE_HELICOPTER) {
      aiHelis.push(u);
    } else if (u.team === TEAM_PLAYER) {
      playerUnits.push(u);
    }
  }

  if (aiHelis.length === 0) return;

  if (playerUnits.length === 0) {
    const basePos = gridToWorld(Math.floor(GRID_COLS / 2), PLAYER_RALLY_ROW, TILE_SIZE);
    _commitHeliRally(basePos.x, basePos.z, aiHelis, callbacks);
    return;
  }

  if (_matchTime < aiState.heliRallyCommitUntil) {
    const bestPos = _findDensestCluster(playerUnits);
    const shiftDist = dist(bestPos.x, bestPos.z, aiState.heliRallyX, aiState.heliRallyZ);
    if (shiftDist < AI_HELI_RALLY_REVAL_DISTANCE) {
      return;
    }
  }

  const bestPos = _findDensestCluster(playerUnits);
  _commitHeliRally(bestPos.x, bestPos.z, aiHelis, callbacks);
}

function _findDensestCluster(playerUnits) {
  let bestUnit = playerUnits[0];
  let bestCount = 0;

  for (let i = 0; i < playerUnits.length; i++) {
    const pu = playerUnits[i];
    let nearbyCount = 0;
    for (let j = 0; j < playerUnits.length; j++) {
      if (i === j) continue;
      const d = dist(pu.x, pu.z, playerUnits[j].x, playerUnits[j].z);
      if (d <= AI_HELICOPTER_CLUSTER_RADIUS) nearbyCount++;
    }
    if (nearbyCount > bestCount) {
      bestCount = nearbyCount;
      bestUnit = pu;
    }
  }

  return { x: bestUnit.x, z: bestUnit.z };
}

function _commitHeliRally(x, z, aiHelis, callbacks) {
  aiState.heliRallyX = x;
  aiState.heliRallyZ = z;
  aiState.heliRallyCommitUntil = _matchTime + AI_HELI_RALLY_COMMIT_TIME;

  for (const heli of aiHelis) {
    if (callbacks.setHelicopterRally) {
      callbacks.setHelicopterRally(heli.id, x, z);
    }
  }
}

// ============================================================
// Strategic Building Placement
// ============================================================

function scorePlacement(type, col, row, existingBuildings, matchTime) {
  const stats = BUILDING_STATS[type];
  const size = stats.size;
  const cx = (col + size / 2) * TILE_SIZE;
  const cz = (row + size / 2) * TILE_SIZE;

  let score = 0;

  if (type === BTYPE_TURRET) {
    const canGoShared = matchTime >= AI_TIMING.shared.turret;

    if (!canGoShared) {
      let closestProdDist = Infinity;
      for (const b of existingBuildings) {
        if ((b.type === BTYPE_BARRACKS || b.type === BTYPE_FACTORY) && b.alive) {
          const d = dist(cx, cz, b.x, b.z);
          if (d < closestProdDist) closestProdDist = d;
        }
      }
      if (closestProdDist < Infinity) {
        const idealDist = TILE_SIZE * AI_TURRET_IDEAL_DISTANCE;
        score += Math.max(0, 10 - Math.abs(closestProdDist - idealDist) / TILE_SIZE);
      }

      const distFromBase = Math.abs(row - ENEMY_BASE_ROW);
      score += Math.min(distFromBase, 8);
      score -= Math.max(0, distFromBase - 8) * 2;
    } else {
      const frontRow = SHARED_BUILD_ROW_MAX;
      const rowDist = Math.abs(row - frontRow);
      score += (10 - rowDist) * 3;
    }

    let minTurretDist = Infinity;
    for (const b of existingBuildings) {
      if (b.type === BTYPE_TURRET && b.alive) {
        const d = dist(cx, cz, b.x, b.z);
        if (d < minTurretDist) minTurretDist = d;
      }
    }
    if (minTurretDist < Infinity) {
      score += Math.min(minTurretDist / TILE_SIZE, 8);
    }

    const centerDist = Math.abs(col - GRID_COLS / 2);
    score -= centerDist * 0.5;

  } else if (type === BTYPE_WALL) {
    const idealRowMin = AI_WALL_ZONE_MIN_ROW;
    const idealRowMax = AI_WALL_ZONE_MAX_ROW;
    if (row >= idealRowMin && row <= idealRowMax) {
      score += 6;
    } else {
      const distFromIdeal = Math.min(Math.abs(row - idealRowMin), Math.abs(row - idealRowMax));
      score -= distFromIdeal * 1.5;
    }

    // Base perimeter bonus
    const baseSize = BUILDING_STATS[BTYPE_CORE].size;
    const baseCenterCol = ENEMY_BASE_COL + Math.floor(baseSize / 2);
    const baseSouthRow = ENEMY_BASE_ROW + baseSize;

    if (row === baseSouthRow || row === baseSouthRow + 1) {
      const colDist = Math.abs(col - baseCenterCol);
      if (colDist <= baseSize + 2) {
        score += 14 - colDist;
      }
    }
    if ((col === ENEMY_BASE_COL - 1 || col === ENEMY_BASE_COL + baseSize) &&
        row >= ENEMY_BASE_ROW && row <= baseSouthRow) {
      score += 10;
    }

    // Don't wall in own production buildings
    let adjacentToOwnBuilding = false;
    for (const b of existingBuildings) {
      if (b.type === BTYPE_WALL || b.type === BTYPE_CORE) continue;
      const bCol = Math.round((b.x - TILE_SIZE / 2) / TILE_SIZE);
      const bRow = Math.round((b.z - TILE_SIZE / 2) / TILE_SIZE);
      const bSize = BUILDING_STATS[b.type] ? BUILDING_STATS[b.type].size : 1;
      if (col >= bCol - 1 && col <= bCol + bSize &&
          row >= bRow - 1 && row <= bRow + bSize) {
        adjacentToOwnBuilding = true;
        break;
      }
    }
    if (adjacentToOwnBuilding) score -= 6;

    // Wall adjacency and continuity
    let adjacentToWall = false;
    let wallInSameRowVeryClose = false;
    let wallInSameRowClose = false;
    let wallInSameCol = false;
    for (const b of existingBuildings) {
      if (b.type !== BTYPE_WALL) continue;
      const wCol = Math.round((b.x - TILE_SIZE / 2) / TILE_SIZE);
      const wRow = Math.round((b.z - TILE_SIZE / 2) / TILE_SIZE);
      const d = Math.abs(col - wCol) + Math.abs(row - wRow);
      if (d === 1) adjacentToWall = true;
      if (wRow === row) {
        const colDist = Math.abs(col - wCol);
        if (colDist <= 2) wallInSameRowClose = true;
        if (colDist === 1) wallInSameRowVeryClose = true;
      }
      if (wCol === col && Math.abs(row - wRow) === 1) wallInSameCol = true;
    }
    if (adjacentToWall) score += 5;
    if (wallInSameRowVeryClose) score += 8;
    else if (wallInSameRowClose) score += 6;
    if (wallInSameCol) score += 4;

    // Horizontal gap detection
    {
      let gapStart = -1;
      let inGap = false;
      let bestGapScore = 0;
      for (let c = 0; c <= GRID_COLS; c++) {
        const tile = c < GRID_COLS ? getTile(c, row) : TILE_OBSTACLE;
        if (tile === TILE_OBSTACLE || tile === TILE_BUILDING) {
          if (inGap) {
            const gapWidth = c - gapStart;
            if (gapWidth >= 1 && gapWidth <= 8 && col >= gapStart && col < c) {
              const gs = Math.max(5, 18 - gapWidth * 2);
              bestGapScore = Math.max(bestGapScore, gs);
            }
            inGap = false;
          }
        } else {
          if (!inGap) { gapStart = c; inGap = true; }
        }
      }
      score += bestGapScore;
    }

    // Vertical gap detection
    {
      let nearestNorth = -1;
      let nearestSouth = -1;
      for (let r = row - 1; r >= Math.max(0, row - 6); r--) {
        if (getTile(col, r) === TILE_OBSTACLE) { nearestNorth = r; break; }
      }
      for (let r = row + 1; r <= Math.min(GRID_ROWS - 1, row + 6); r++) {
        if (getTile(col, r) === TILE_OBSTACLE) { nearestSouth = r; break; }
      }
      if (nearestNorth >= 0 && nearestSouth >= 0) {
        const vGap = nearestSouth - nearestNorth - 1;
        if (vGap >= 1 && vGap <= 6) {
          score += Math.max(3, 12 - vGap * 2);
        }
      }
    }

    // Line completion
    {
      let connectsLeft = false;
      let connectsRight = false;
      if (col > 0) {
        const leftTile = getTile(col - 1, row);
        if (leftTile === TILE_OBSTACLE || leftTile === TILE_WALL) connectsLeft = true;
      }
      if (col < GRID_COLS - 1) {
        const rightTile = getTile(col + 1, row);
        if (rightTile === TILE_OBSTACLE || rightTile === TILE_WALL) connectsRight = true;
      }
      if (connectsLeft && connectsRight) score += 10;
    }

    // Center approach path blocking
    const centerCol = Math.floor(GRID_COLS / 2);
    const distFromCenter = Math.abs(col - centerCol);
    if (distFromCenter <= 8) {
      score += Math.max(0, 5 - distFromCenter * 0.5);
    }

    score += Math.random() * 3;

  } else if (type === BTYPE_GENERATOR) {
    const baseDistBonus = Math.max(0, 8 - Math.abs(row - ENEMY_BASE_ROW));
    score += baseDistBonus * 1.5;

    if (row >= SHARED_BUILD_ROW_MIN && row <= SHARED_BUILD_ROW_MAX) {
      score += 8;
    }

    let minGenDist = Infinity;
    for (const b of existingBuildings) {
      if (b.type === BTYPE_GENERATOR && b.alive) {
        const d = dist(cx, cz, b.x, b.z);
        if (d < minGenDist) minGenDist = d;
      }
    }
    if (minGenDist < Infinity) {
      score += Math.min(minGenDist / TILE_SIZE, 5);
    }

    const centerDist = Math.abs(col - GRID_COLS / 2);
    score -= centerDist * 0.3;

  } else {
    const safeRow = Math.floor((ENEMY_BUILD_ROW_MIN + ENEMY_BUILD_ROW_MAX) / 2);
    const rowDist = Math.abs(row - safeRow);
    score += (10 - rowDist) * 2;

    const baseDistBonus = Math.max(0, 8 - Math.abs(row - ENEMY_BASE_ROW));
    score += baseDistBonus * 0.5;

    let minSameDist = Infinity;
    for (const b of existingBuildings) {
      if (b.type === type && b.alive) {
        const d = dist(cx, cz, b.x, b.z);
        if (d < minSameDist) minSameDist = d;
      }
    }
    if (minSameDist < Infinity) {
      score += Math.min(minSameDist / TILE_SIZE, 6);
    }

    const centerDist = Math.abs(col - GRID_COLS / 2);
    score -= centerDist * 0.3;
  }

  score += Math.random() * 2;

  return score;
}

function tryBuildStrategic(type, existingBuildings, callbacks, matchTime) {
  const stats = BUILDING_STATS[type];
  const size = stats.size;

  let rowMax;
  if (type === BTYPE_TURRET && matchTime >= AI_TIMING.shared.turret) {
    rowMax = SHARED_BUILD_ROW_MAX;
  } else if (type === BTYPE_GENERATOR && matchTime >= AI_TIMING.shared.generator) {
    rowMax = SHARED_BUILD_ROW_MAX;
  } else if (type === BTYPE_WALL && matchTime >= AI_TIMING.shared.wall) {
    rowMax = SHARED_BUILD_ROW_MAX;
  } else {
    rowMax = ENEMY_BUILD_ROW_MAX;
  }

  const candidates = [];
  const attempts = type === BTYPE_WALL ? 50 : 30;
  for (let attempt = 0; attempt < attempts; attempt++) {
    const col = randomInt(2, GRID_COLS - 3 - size + 1);
    const row = randomInt(ENEMY_BUILD_ROW_MIN, rowMax - size + 1);

    if (callbacks.isBuildable(col, row, size)) {
      const score = scorePlacement(type, col, row, existingBuildings, matchTime);
      candidates.push({ col, row, score });
    }
  }

  // For walls: add targeted high-value positions
  if (type === BTYPE_WALL) {
    const seen = new Set(candidates.map(c => `${c.col},${c.row}`));
    const tryAdd = (c, r) => {
      const key = `${c},${r}`;
      if (seen.has(key)) return;
      if (r < ENEMY_BUILD_ROW_MIN || r > rowMax) return;
      if (c < 1 || c >= GRID_COLS - 1) return;
      if (!callbacks.isBuildable(c, r, 1)) return;
      seen.add(key);
      candidates.push({ col: c, row: r, score: scorePlacement(type, c, r, existingBuildings, matchTime) });
    };

    // Base perimeter positions
    const baseSize = BUILDING_STATS[BTYPE_CORE].size;
    const perimRow = ENEMY_BASE_ROW + baseSize;
    for (let c = ENEMY_BASE_COL - 2; c <= ENEMY_BASE_COL + baseSize + 1; c++) {
      for (let r = ENEMY_BASE_ROW; r <= perimRow + 1; r++) {
        tryAdd(c, r);
      }
    }

    // Adjacent to existing walls
    for (const b of existingBuildings) {
      if (b.type !== BTYPE_WALL) continue;
      const wCol = Math.round((b.x - TILE_SIZE / 2) / TILE_SIZE);
      const wRow = Math.round((b.z - TILE_SIZE / 2) / TILE_SIZE);
      for (const [dc, dr] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        tryAdd(wCol + dc, wRow + dr);
      }
    }

    // Gap-fill positions between obstacles
    for (let r = AI_WALL_ZONE_MIN_ROW; r <= Math.min(AI_WALL_ZONE_MAX_ROW, rowMax); r++) {
      let gapStart = -1;
      let inGap = false;
      for (let c = 0; c <= GRID_COLS; c++) {
        const tile = c < GRID_COLS ? getTile(c, r) : TILE_OBSTACLE;
        if (tile === TILE_OBSTACLE || tile === TILE_BUILDING) {
          if (inGap && c - gapStart <= 8) {
            for (let gc = gapStart; gc < c; gc++) tryAdd(gc, r);
          }
          inGap = false;
        } else if (tile === TILE_EMPTY) {
          if (!inGap) { gapStart = c; inGap = true; }
        }
      }
    }
  }

  if (candidates.length === 0) return false;

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  const buildCost = (type === BTYPE_GENERATOR && callbacks.getGeneratorCost)
    ? callbacks.getGeneratorCost() : stats.cost;
  if (callbacks.spendEnergy(buildCost)) {
    callbacks.createBuilding(type, best.col, best.row, buildCost);
    return true;
  }
  return false;
}

// ============================================================
// AI Squad Management — simplified
// ============================================================

function updateAISquads(matchTime, threat, callbacks) {
  const squads = callbacks.getSquads?.(TEAM_ENEMY);
  if (!squads || squads.length === 0) return;

  // Simple rule: if enemy units near AI base → 50% squads DEFEND; else all ADVANCE
  let defendTarget;
  if (threat > AI_THREAT_HIGH_THRESHOLD) {
    defendTarget = squads.length; // all defend
  } else if (threat > AI_THREAT_LOW_THRESHOLD) {
    defendTarget = Math.max(1, Math.ceil(squads.length * 0.5));
  } else {
    defendTarget = squads.length > 1 ? 1 : 0; // 1 home guard
  }

  // Emergency rally release: release rally-held units when base threatened
  if (threat > AI_THREAT_LOW_THRESHOLD && !aiState.pushActive) {
    const allUnits = callbacks.getUnits?.();
    if (allUnits) {
      for (let i = 0; i < allUnits.length; i++) {
        const u = allUnits[i];
        if (!u.alive || u.team !== TEAM_ENEMY || u.isAir) continue;
        if (u.rallyHold) {
          u.rallyHold = false;
          u._rallyAssigned = false;
          u.path = null;
          u.pathIndex = 0;
        }
      }
      aiState.rallyStartTime = 0;
    }
  }

  // Sort: barracks first (best for defend), then factory, then helipad
  const sorted = [...squads].sort((a, b) => {
    const order = (t) => t === BTYPE_BARRACKS ? 0 : t === BTYPE_FACTORY ? 1 : 2;
    return order(a.buildingType) - order(b.buildingType);
  });

  for (let i = 0; i < sorted.length; i++) {
    const squad = sorted[i];
    const units = callbacks.getUnitsBySquad?.(squad.id) ?? [];

    if (i < defendTarget) {
      callbacks.setUnitsStance?.(units, STANCE_DEFEND);
      callbacks.setUnitsTargetPriority?.(units, TARGET_UNITS);
    } else {
      callbacks.setUnitsStance?.(units, STANCE_ADVANCE);
      // During push: factory squads focus buildings
      const wantPriority = (aiState.pushActive && squad.buildingType === BTYPE_FACTORY)
        ? TARGET_BUILDINGS : TARGET_ANY;
      callbacks.setUnitsTargetPriority?.(units, wantPriority);
    }
  }
}

// ============================================================
// Change 2: Reactive Build Priority Override
// Bypasses buildInterval for emergency responses
// ============================================================

function getReactiveBuildOverride(matchTime, energy, aiBuildings, callbacks) {
  const intel = aiState.intel;

  const btypeMap = {
    barracks: BTYPE_BARRACKS,
    turret: BTYPE_TURRET,
    factory: BTYPE_FACTORY,
    generator: BTYPE_GENERATOR,
  };
  const limitMap = {
    barracks: AI_LIMITS.barracks,
    turret: AI_LIMITS.turrets,
    factory: AI_LIMITS.factories,
    generator: AI_LIMITS.generators,
  };

  const tryReactive = (itemName) => {
    const btype = btypeMap[itemName];
    const timingGate = AI_TIMING.build[itemName] || 0;
    if (matchTime < timingGate) return null;
    const count = aiBuildings.filter(b => b.type === btype).length;
    if (count >= (limitMap[itemName] || 4)) return null;
    const cost = (btype === BTYPE_GENERATOR && callbacks.getGeneratorCost)
      ? callbacks.getGeneratorCost() : BUILDING_STATS[btype].cost;
    if (energy < cost + AI_ENERGY_RESERVE) return null;
    return btype;
  };

  // Player army overwhelming AI → force barracks
  const aiBarracksCount = aiBuildings.filter(b => b.type === BTYPE_BARRACKS).length;
  if (intel.playerArmyPower > intel.aiArmyPower * AI_REACTIVE_ARMY_RATIO &&
      intel.playerBarracks > aiBarracksCount) {
    const result = tryReactive('barracks');
    if (result) return result;
  }

  // Player turret-heavy → force factory (tanks counter turrets)
  const aiFactoryCount = aiBuildings.filter(b => b.type === BTYPE_FACTORY).length;
  if (intel.playerTurrets >= AI_REACTIVE_TURRET_THRESHOLD && aiFactoryCount < 2) {
    const result = tryReactive('factory');
    if (result) return result;
  }

  // Player has many units, AI has few turrets → force turret
  const aiTurretCount = aiBuildings.filter(b => b.type === BTYPE_TURRET).length;
  if (intel.playerTotalUnits > 6 && aiTurretCount < 2) {
    const result = tryReactive('turret');
    if (result) return result;
  }

  return null;
}

// ============================================================
// Change 3: Counter-Building Queue
// Populated by reassessBuildPriority(), consumed by pickNextAction()
// ============================================================

function reassessBuildPriority(allBuildings) {
  const intel = aiState.intel;
  const aiBuildings = allBuildings.filter(b => b.team === TEAM_ENEMY && b.alive);
  const queue = [];

  const aiFactoryCount = aiBuildings.filter(b => b.type === BTYPE_FACTORY).length;
  const aiBarracksCount = aiBuildings.filter(b => b.type === BTYPE_BARRACKS).length;
  const aiTurretCount = aiBuildings.filter(b => b.type === BTYPE_TURRET).length;
  const aiGeneratorCount = aiBuildings.filter(b => b.type === BTYPE_GENERATOR).length;

  // Player turret-heavy, AI lacks tanks → queue factory
  if (intel.playerTurrets >= AI_REACTIVE_TURRET_THRESHOLD && aiFactoryCount < 2) {
    queue.push('factory');
  }

  // Player rushing (0 turrets, many barracks) → queue turret
  if (intel.playerTurrets === 0 && intel.playerBarracks >= AI_REACTIVE_RUSH_BARRACKS) {
    if (!queue.includes('turret')) queue.push('turret');
  }

  // Player army massively outnumbers AI → queue barracks
  if (intel.playerArmyPower > intel.aiArmyPower * AI_REACTIVE_OVERWHELM_RATIO) {
    if (!queue.includes('barracks')) queue.push('barracks');
  }

  // AI has no generators → queue generator
  if (aiGeneratorCount === 0) {
    if (!queue.includes('generator')) queue.push('generator');
  }

  // Limit queue size
  aiState._urgentBuildQueue = queue.slice(0, AI_COUNTER_QUEUE_MAX);
}

function pickFromUrgentQueue(matchTime, energy, aiBuildings, callbacks) {
  const btypeMap = {
    barracks: BTYPE_BARRACKS,
    turret: BTYPE_TURRET,
    factory: BTYPE_FACTORY,
    generator: BTYPE_GENERATOR,
  };
  const limitMap = {
    barracks: AI_LIMITS.barracks,
    turret: AI_LIMITS.turrets,
    factory: AI_LIMITS.factories,
    generator: AI_LIMITS.generators,
  };

  for (let i = 0; i < aiState._urgentBuildQueue.length; i++) {
    const itemName = aiState._urgentBuildQueue[i];
    const btype = btypeMap[itemName];
    if (!btype) continue;

    const timingGate = AI_TIMING.build[itemName] || 0;
    if (matchTime < timingGate) continue;

    const count = aiBuildings.filter(b => b.type === btype).length;
    if (count >= (limitMap[itemName] || 4)) continue;

    const cost = (btype === BTYPE_GENERATOR && callbacks.getGeneratorCost)
      ? callbacks.getGeneratorCost() : BUILDING_STATS[btype].cost;
    if (energy < cost + AI_ENERGY_RESERVE) continue;

    // Remove from queue and return build action
    aiState._urgentBuildQueue.splice(i, 1);
    return { type: 'build', meta: { buildType: btype, cost } };
  }
  return null;
}

// ============================================================
// Change 4: Flank-Aware Push Rally
// Scans player defenses left vs right, biases rally toward weaker side
// ============================================================

function scanFlankWeakness(matchTime, callbacks) {
  if (matchTime - aiState._lastFlankScanTime < AI_FLANK_SCAN_INTERVAL) return;
  aiState._lastFlankScanTime = matchTime;

  const allBuildings = callbacks.getBuildings();
  const mapCenterX = (GRID_COLS / 2) * TILE_SIZE;

  let leftDefense = 0;
  let rightDefense = 0;

  for (let i = 0; i < allBuildings.length; i++) {
    const b = allBuildings[i];
    if (b.team !== TEAM_PLAYER || !b.alive) continue;
    if (b.type !== BTYPE_TURRET && b.type !== BTYPE_WALL) continue;

    const weight = b.type === BTYPE_TURRET ? 3 : 1;
    if (b.x < mapCenterX) {
      leftDefense += weight;
    } else {
      rightDefense += weight;
    }
  }

  // Bias toward weaker side (negative = left, positive = right)
  if (leftDefense === rightDefense) {
    aiState._flankOffsetX = 0;
  } else if (leftDefense < rightDefense) {
    // Left side weaker — push left (negative X offset)
    const ratio = rightDefense > 0 ? 1 - (leftDefense / rightDefense) : 1;
    aiState._flankOffsetX = -Math.round(AI_FLANK_MAX_OFFSET * Math.min(ratio, 1));
  } else {
    // Right side weaker — push right (positive X offset)
    const ratio = leftDefense > 0 ? 1 - (rightDefense / leftDefense) : 1;
    aiState._flankOffsetX = Math.round(AI_FLANK_MAX_OFFSET * Math.min(ratio, 1));
  }
}

// ============================================================
// Change 5: Economic Harassment
// Diverts a few expendable units toward player generators
// ============================================================

function tryEconomicHarass(matchTime, aiUnits, callbacks) {
  if (matchTime < AI_HARASS_MIN_TIME) return;

  const intel = aiState.intel;
  if (intel.playerGenerators < AI_HARASS_MIN_GENERATORS) return;

  // Find nearest player generator (closest to AI side = lowest Z)
  const allBuildings = callbacks.getBuildings();
  const playerGens = [];
  for (let i = 0; i < allBuildings.length; i++) {
    const b = allBuildings[i];
    if (b.team === TEAM_PLAYER && b.alive && b.type === BTYPE_GENERATOR) {
      playerGens.push(b);
    }
  }
  if (playerGens.length === 0) return;

  // Sort by Z ascending (closest to AI base first)
  playerGens.sort((a, b) => a.z - b.z);
  const target = playerGens[0];

  // Divert up to AI_HARASS_UNIT_COUNT rifle units
  let diverted = 0;
  for (const u of aiUnits) {
    if (diverted >= AI_HARASS_UNIT_COUNT) break;
    if (u.type !== UTYPE_RIFLE) continue;
    if (!u.rallyHold) continue;

    u.rallyHold = false;
    u.path = null;
    u.pathIndex = 0;
    u.targetPriority = TARGET_BUILDINGS;
    // Override rally to generator location
    u._harassTarget = true;
    u.rallyX = target.x;
    u.rallyZ = target.z;
    diverted++;
  }
}

// ============================================================
// Change 6: Forward Building After Successful Push
// AI places a turret or generator in the shared zone
// ============================================================

function tryForwardBuild(matchTime, aiBuildings, callbacks) {
  if (!AI_FORWARD_BUILD_ENABLED) return;
  if (!aiState._attemptForwardBuild) return;
  if (matchTime < AI_FORWARD_BUILD_MIN_TIME) return;

  // Consume the flag
  aiState._attemptForwardBuild = false;
  aiState._forwardBuildAttempted = true;

  // Need at least 2 AI ground units in the shared zone
  const allUnits = callbacks.getUnits();
  const sharedMinZ = SHARED_BUILD_ROW_MIN * TILE_SIZE;
  const sharedMaxZ = SHARED_BUILD_ROW_MAX * TILE_SIZE;
  const sharedUnits = [];

  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive || u.team !== TEAM_ENEMY || u.isAir) continue;
    if (u.z >= sharedMinZ && u.z <= sharedMaxZ) {
      sharedUnits.push(u);
    }
  }
  if (sharedUnits.length < 2) return;

  // Average position as search center
  let avgX = 0, avgZ = 0;
  for (const u of sharedUnits) {
    avgX += u.x;
    avgZ += u.z;
  }
  avgX /= sharedUnits.length;
  avgZ /= sharedUnits.length;

  // Try each forward building type
  const btypeMap = { turret: BTYPE_TURRET, generator: BTYPE_GENERATOR };
  for (const typeName of AI_FORWARD_BUILD_TYPES) {
    const btype = btypeMap[typeName];
    if (!btype) continue;

    const stats = BUILDING_STATS[btype];
    const energy = callbacks.getEnergy();
    const buildCost = (btype === BTYPE_GENERATOR && callbacks.getGeneratorCost)
      ? callbacks.getGeneratorCost() : stats.cost;
    if (energy < buildCost + AI_ENERGY_RESERVE) continue;

    // Check limit
    const count = aiBuildings.filter(b => b.type === btype).length;
    const limitKey = typeName === 'turret' ? 'turrets' : typeName + 's';
    if (count >= (AI_LIMITS[limitKey] || 4)) continue;

    // Search near the average position for a buildable spot
    const centerCol = Math.round(avgX / TILE_SIZE);
    const centerRow = Math.round(avgZ / TILE_SIZE);
    const size = stats.size;

    let bestCol = -1, bestRow = -1, bestScore = -Infinity;
    for (let dr = -4; dr <= 4; dr++) {
      for (let dc = -4; dc <= 4; dc++) {
        const col = centerCol + dc;
        const row = centerRow + dr;
        if (row < SHARED_BUILD_ROW_MIN || row > SHARED_BUILD_ROW_MAX - size + 1) continue;
        if (col < 1 || col >= GRID_COLS - 1 - size + 1) continue;
        if (!callbacks.isBuildable(col, row, size)) continue;

        const score = scorePlacement(btype, col, row, aiBuildings, matchTime);
        if (score > bestScore) {
          bestScore = score;
          bestCol = col;
          bestRow = row;
        }
      }
    }

    if (bestCol >= 0 && callbacks.spendEnergy(buildCost)) {
      callbacks.createBuilding(btype, bestCol, bestRow, buildCost);
      return;
    }
  }
}

// ============================================================
// Player Rally State Query + Manual Push
// ============================================================

export function getPlayerRallyState() {
  let holdingCount = 0;
  if (_getUnitsRef) {
    const allUnits = _getUnitsRef();
    for (let i = 0; i < allUnits.length; i++) {
      const u = allUnits[i];
      if (u.alive && u.team === TEAM_PLAYER && u.rallyHold && (u.stance ?? STANCE_ADVANCE) === STANCE_ADVANCE) {
        holdingCount++;
      }
    }
  }

  const timeElapsed = playerRallyState.rallyStartTime > 0
    ? _matchTime - playerRallyState.rallyStartTime
    : 0;

  return {
    holdingCount,
    pushSize: PLAYER_PUSH_SIZE,
    rallyActive: !playerRallyState.pushActive,
    timeRemaining: Math.max(0, PLAYER_MAX_RALLY_TIME - timeElapsed),
  };
}

export function forcePlayerPush() {
  if (!_getUnitsRef) return;

  const allUnits = _getUnitsRef();
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (u.alive && u.team === TEAM_PLAYER && u.rallyHold && (u.stance ?? STANCE_ADVANCE) === STANCE_ADVANCE) {
      u.rallyHold = false;
      u.path = null;
      u.pathIndex = 0;
    }
  }
  playerRallyState.rallyStartTime = 0;
  playerRallyState.pushActive = true;
}

export function resetAI() {
  aiState = {
    lastTick: 0,
    rallyStartTime: 0,
    pushActive: false,
    profile: null,
    profileKey: null,
    difficulty: 'normal',
    diffSettings: null,
    tempo: null,
    intel: freshIntel(),
    buildOrderIndex: 0,
    lastBuildTime: 0,
    lastUpgradeTime: 0,
    lastPushUnitCount: 0,
    dynamicPushBonus: 0,
    consecutiveFailures: 0,
    pushStartTime: 0,
    pushCooldownUntil: 0,
    _pushMarkedSuccess: false,
    _lastRallyUpdateTime: 0,
    heliRallyX: 0, heliRallyZ: 0, heliRallyCommitUntil: 0,
    _urgentBuildQueue: [],
    _lastFlankScanTime: 0,
    _flankOffsetX: 0,
    _attemptForwardBuild: false,
    _forwardBuildAttempted: false,
  };
  playerRallyState = { rallyStartTime: 0, pushActive: false };
  _matchTime = 0;
  _getUnitsRef = null;
}
