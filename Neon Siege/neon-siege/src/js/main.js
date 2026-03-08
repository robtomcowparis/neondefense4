// ============================================================
// main.js — Game loop, state management, orchestration
// ============================================================
import {
  MAP_W, MAP_H, TILE_SIZE, GRID_COLS, GRID_ROWS,
  TEAM_PLAYER, TEAM_ENEMY,
  STATE_MENU, STATE_PLAYING, STATE_PAUSED, STATE_VICTORY, STATE_DEFEAT,
  PLAYER_BASE_COL, PLAYER_BASE_ROW, ENEMY_BASE_COL, ENEMY_BASE_ROW,
  BTYPE_CORE, BTYPE_TURRET, BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL, BUILDING_STATS, PLAYER_BUILDABLE,
  COLORS, BASE_DEFENSE_RADIUS,
  SHARED_ZONE_UNIT_RADIUS, SHARED_BUILD_ROW_MIN, SHARED_BUILD_ROW_MAX,
  UTYPE_HELICOPTER,
  WALL_HORIZONTAL, WALL_VERTICAL, WALL_CORNER_NE, WALL_CORNER_NW, WALL_CORNER_SE, WALL_CORNER_SW,
  TILE_WALL,
  UNIT_CLICK_RADIUS,
  STANCE_ADVANCE, STANCE_RALLY,
} from './config.js';
import { gridToWorld, dist } from './utils.js';
import {
  createSquad, removeSquad, getSquadByBuilding, assignUnitToSquad,
  removeUnitFromSquad,
  setSquadSpawnStance, setSquadSpawnTargetPriority,
  setUnitStance, setUnitTargetPriority,
  setUnitsStance, setUnitsTargetPriority, setUnitsRally,
  setAllUnitsStance, setAllUnitsTargetPriority, setAllUnitsRally,
  getSquads, getSquadById, getSquadUnitCount, getUnitsBySquad,
  cleanSquadMembership, resetSquads,
} from './squads.js';

// --- Renderer imports ---
import { initScene, getScene, getCamera, getComposer, getControls, getRenderer } from './renderer/scene.js';
import { initGrid, updateGrid, resetDragHighlights } from './renderer/grid.js';
import { createBuildingMesh, updateBuildingMeshes, removeBuildingMesh, rebuildBuildingMesh, getFirePoint } from './renderer/buildingMeshes.js';
import { createUnitMesh, updateUnitMeshes, removeUnitMesh } from './renderer/unitMeshes.js';
import { createProjectileMesh, updateProjectileMeshes, removeProjectileMesh } from './renderer/projectileRenderer.js';
import { initParticleRenderer, updateParticleRenderer } from './renderer/particleRenderer.js';
import { initEffectRenderer, updateEffectRenderer } from './renderer/effectRenderer.js';

// --- Logic imports ---
import { createMap, isBuildable, getObstacles, getTile, setSharedZoneUnitCheck } from './map.js';
import { findPath, findPathThroughWalls, beginPathFrame } from './path.js';
import {
  createBuilding, updateBuildings, getBuildings, removeBuilding, resetBuildings,
  canUpgradeTurret, canBranchTurret, getUpgradeCost, getBranchCost,
  startTurretUpgrade, startTurretBranch,
  canUpgradeBuilding, canBranchBuilding, startUpgrade, startBranch,
  canRepairWall, getRepairCost, startWallRepair,
  setWallOrientation, demolishBuilding,
} from './buildings.js';
import { createUnit, updateUnits, getUnits, removeUnit, resetUnits, setHelicopterRally, getHelicopters } from './units.js';
import { createProjectile, createHomingProjectile, updateProjectiles, getProjectiles, removeProjectile, resetProjectiles } from './projectiles.js';
import { updateCombat, getCombatUnitHash, getCombatBuildingHash } from './combat.js';
import { createEconomy, updateEconomy, getEnergy, spendEnergy, addEnergy, getIncomeBreakdown, resetEconomy } from './economy.js';
import { initAI, updateAI, updatePlayerRally, resetAI, getPlayerRallyState, forcePlayerPush, assignEnemyUnitRally } from './waves.js';
import { initHUD, updateHUD, clearBuildSelection, selectBuilding, deselectBuilding, getSelectedBuilding, showHelicopterInfo, hideHelicopterInfo, setSquadRallyPending as setHudSquadRallyPending } from './hud.js';
import { initInput, getHoveredTile, setPlacementMode, getPlacementMode, setClickCallback, setSelectCallback, setBoxSelectCallback, setCameraSnapCallback, setHelicopterRallyCallback, setGetHelicoptersCallback, getSelectedHelicopter, setSelectedHelicopter, setDragPlaceCallback, getDragTiles, isDragActive, setSquadRallyCallback, setSquadRallyPending as setInputSquadRallyPending, getSelectionBoxScreenCoords } from './input.js';
import { initParticles, updateParticles, getParticles, spawnParticle, resetParticles } from './particles.js';
import { playSound } from './sound.js';

// --- State ---
let gameState = STATE_MENU;
let lastTime = 0;
let matchTime = 0;
// Difficulty is managed by the inline script in game.html via window._selectedDifficulty
let _lastBaseAlert = false;
let _cachedObstacles = null;

// --- Unit selection state ---
let selectedUnits = [];        // array of unit refs currently selected

// --- DOM refs ---
const menuOverlay = document.getElementById('menu-overlay');
const pauseOverlay = document.getElementById('pause-overlay');
const victoryOverlay = document.getElementById('victory-overlay');
const defeatOverlay = document.getElementById('defeat-overlay');

// --- State transitions ---
function setState(newState) {
  gameState = newState;
  menuOverlay.classList.toggle('hidden', newState !== STATE_MENU);
  pauseOverlay.classList.toggle('hidden', newState !== STATE_PAUSED);
  victoryOverlay.classList.toggle('hidden', newState !== STATE_VICTORY);
  defeatOverlay.classList.toggle('hidden', newState !== STATE_DEFEAT);
}

function startGame() {
  resetAll();
  initMatch();
  setState(STATE_PLAYING);
}

function resetAll() {
  const scene = getScene();

  // Clean up existing entity meshes before resetting data
  if (scene) {
    for (const b of getBuildings()) removeBuildingMesh(b, scene);
    for (const u of getUnits()) removeUnitMesh(u, scene);
    for (const p of getProjectiles()) removeProjectileMesh(p, scene);
  }

  matchTime = 0;
  _lastBaseAlert = false;
  resetBuildings();
  resetUnits();
  resetProjectiles();
  resetParticles();
  resetEconomy();
  resetAI();
  resetSquads();
  resetDragHighlights();
  selectedUnits = [];
  deselectBuilding();
  hideHelicopterInfo();
  setSelectedHelicopter(null);
  setHudSquadRallyPending(null);
  setInputSquadRallyPending(null);
  initParticles();
  createMap();
}

function initMatch() {
  // Place player base
  const playerBase = createBuilding(BTYPE_CORE, PLAYER_BASE_COL, PLAYER_BASE_ROW, TEAM_PLAYER);
  createBuildingMesh(playerBase, getScene());

  // Place enemy base
  const enemyBase = createBuilding(BTYPE_CORE, ENEMY_BASE_COL, ENEMY_BASE_ROW, TEAM_ENEMY);
  createBuildingMesh(enemyBase, getScene());

  // Init grid rendering (reads obstacles from map)
  initGrid(getScene());

  // Init economy
  createEconomy(window._selectedDifficulty || 'normal');

  // Init AI
  initAI(window._selectedDifficulty || 'normal');

  // Cache obstacles (they don't change during a match)
  _cachedObstacles = getObstacles();

  // Clear build selection
  clearBuildSelection();
  setPlacementMode(null);
}

// --- Build placement ---
function handleBuildPlacement(col, row, buildingType) {
  if (!buildingType) return false;
  const stats = BUILDING_STATS[buildingType];
  if (!stats) return false;

  const energy = getEnergy(TEAM_PLAYER);
  if (energy < stats.cost) {
    playSound('denied');
    return false;
  }

  if (!isBuildable(col, row, stats.size, TEAM_PLAYER)) {
    playSound('denied');
    return false;
  }

  if (!spendEnergy(TEAM_PLAYER, stats.cost)) return false;

  const building = createBuilding(buildingType, col, row, TEAM_PLAYER);
  createBuildingMesh(building, getScene());

  // Create a squad for production buildings
  if (buildingType === BTYPE_BARRACKS || buildingType === BTYPE_FACTORY || buildingType === BTYPE_HELIPAD) {
    createSquad(building.id, TEAM_PLAYER, buildingType);
  }

  playSound(buildingType === BTYPE_WALL ? 'wall_build' : buildingType === BTYPE_GENERATOR ? 'build_generator' : 'build');
  return true;
}

// --- Building selection ---
function handleTileSelect(col, row) {
  if (col < 0 || row < 0) {
    deselectBuilding();
    return;
  }

  // Find a building at this tile
  const buildings = getBuildings();
  for (const b of buildings) {
    if (!b.alive || b.team !== TEAM_PLAYER) continue;
    const stats = BUILDING_STATS[b.type];
    if (!stats) continue;
    if (col >= b.col && col < b.col + stats.size &&
        row >= b.row && row < b.row + stats.size) {
      // Select any upgradeable building (turret, barracks, factory)
      if (stats.levels) {
        selectBuilding(b);
        playSound('select');
      } else {
        deselectBuilding();
      }
      return;
    }
  }
  deselectBuilding();
}

// --- Building upgrade/branch handlers ---
function handleBuildingUpgrade(building) {
  if (!building || !canUpgradeBuilding(building)) return;
  const cost = getUpgradeCost(building);
  if (!spendEnergy(TEAM_PLAYER, cost)) {
    playSound('denied');
    return;
  }
  startUpgrade(building);
  playSound('build');
}

function handleBuildingBranch(building, key) {
  if (!building || !canBranchBuilding(building)) return;
  const cost = getBranchCost(building, key);
  if (!spendEnergy(TEAM_PLAYER, cost)) {
    playSound('denied');
    return;
  }
  startBranch(building, key);
  playSound('build');
}

// --- Rally handler (for selection-based rally or global rally) ---
function handleRallySet(target, worldX, worldZ) {
  if (target === 'all') {
    setAllUnitsRally(TEAM_PLAYER, worldX, worldZ, getUnits);
  } else if (target === 'selection') {
    setUnitsRally(selectedUnits, worldX, worldZ);
  } else {
    // target is a squad ID — rally all units in that squad
    const units = getUnitsBySquad(Number(target), getUnits);
    setUnitsRally(units, worldX, worldZ);
  }
  setHudSquadRallyPending(null);
  setInputSquadRallyPending(null);
  playSound('heli_rally');
}

// --- Unit selection helpers ---
function clearUnitSelection() {
  for (let i = 0; i < selectedUnits.length; i++) {
    selectedUnits[i].selected = false;
  }
  // Clear all squad highlights
  const allUnits = getUnits();
  for (let i = 0; i < allUnits.length; i++) {
    allUnits[i].squadHighlight = false;
  }
  selectedUnits = [];
}

function selectUnit(unit) {
  clearUnitSelection();
  if (!unit || !unit.alive || unit.team !== TEAM_PLAYER) return;
  unit.selected = true;
  selectedUnits = [unit];
  // Highlight squadmates
  if (unit.squadId != null) {
    const squadmates = getUnitsBySquad(unit.squadId, getUnits);
    for (let i = 0; i < squadmates.length; i++) {
      if (squadmates[i].id !== unit.id) {
        squadmates[i].squadHighlight = true;
      }
    }
    // Show parent building info in sidebar
    const squad = getSquadById(unit.squadId);
    if (squad) {
      const buildings = getBuildings();
      const parentBuilding = buildings.find(b => b.id === squad.buildingId && b.alive);
      if (parentBuilding) selectBuilding(parentBuilding);
    }
  }
}

function selectUnitsInBox(x1, z1, x2, z2) {
  clearUnitSelection();
  const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
  const minZ = Math.min(z1, z2), maxZ = Math.max(z1, z2);
  const allUnits = getUnits();
  const selected = [];
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive || u.team !== TEAM_PLAYER || u.isAir) continue;
    if (u.x >= minX && u.x <= maxX && u.z >= minZ && u.z <= maxZ) {
      u.selected = true;
      selected.push(u);
    }
  }
  selectedUnits = selected;
}

function selectSquadUnits(squadId) {
  clearUnitSelection();
  const units = getUnitsBySquad(squadId, getUnits);
  for (let i = 0; i < units.length; i++) {
    units[i].selected = true;
  }
  selectedUnits = units;
}

function findUnitAtWorldPos(worldX, worldZ) {
  const allUnits = getUnits();
  let best = null;
  let bestDist = UNIT_CLICK_RADIUS;
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (!u.alive || u.team !== TEAM_PLAYER || u.isAir) continue;
    const d = dist(worldX, worldZ, u.x, u.z);
    if (d < bestDist) {
      bestDist = d;
      best = u;
    }
  }
  return best;
}

// --- Wall auto-orientation ---
function findWallAt(col, row) {
  const buildings = getBuildings();
  for (const b of buildings) {
    if (b.alive && b.type === BTYPE_WALL && b.col === col && b.row === row) return b;
  }
  return null;
}

function computeWallOrientation(col, row) {
  const hasLeft  = getTile(col - 1, row) === TILE_WALL;
  const hasRight = getTile(col + 1, row) === TILE_WALL;
  const hasUp    = getTile(col, row - 1) === TILE_WALL;
  const hasDown  = getTile(col, row + 1) === TILE_WALL;

  const h = hasLeft || hasRight;
  const v = hasUp || hasDown;

  if (h && !v) return WALL_HORIZONTAL;
  if (v && !h) return WALL_VERTICAL;

  // Corner cases: exactly two perpendicular neighbors
  if (hasRight && hasDown && !hasLeft && !hasUp) return WALL_CORNER_SE;
  if (hasLeft  && hasDown && !hasRight && !hasUp) return WALL_CORNER_SW;
  if (hasRight && hasUp   && !hasLeft && !hasDown) return WALL_CORNER_NE;
  if (hasLeft  && hasUp   && !hasRight && !hasDown) return WALL_CORNER_NW;

  // T-junction or cross: default to horizontal
  if (h && v) return WALL_HORIZONTAL;

  // Isolated wall: keep null to preserve existing orientation
  return null;
}

function autoOrientWalls(placedTiles) {
  // Collect all affected tiles: placed walls + their immediate neighbors
  const affected = new Set();
  for (const t of placedTiles) {
    const key = `${t.col},${t.row}`;
    affected.add(key);
    // Add neighbors
    for (const [dc, dr] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nc = t.col + dc;
      const nr = t.row + dr;
      if (getTile(nc, nr) === TILE_WALL) {
        affected.add(`${nc},${nr}`);
      }
    }
  }

  for (const key of affected) {
    const [col, row] = key.split(',').map(Number);
    const wall = findWallAt(col, row);
    if (!wall) continue;

    const newOrientation = computeWallOrientation(col, row);
    if (newOrientation && newOrientation !== wall.orientation) {
      setWallOrientation(wall, newOrientation);
      rebuildBuildingMesh(wall, getScene());
    }
  }
}

// --- Game loop ---
function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);

  const now = timestamp / 1000;
  const dt = Math.min(now - lastTime, 0.05);
  lastTime = now;

  // Always update controls
  const controls = getControls();
  if (controls) controls.update();

  if (gameState === STATE_PLAYING) {
    matchTime += dt;

    // Reset per-frame path budget and advance real time
    beginPathFrame(dt);

    // Update economy
    updateEconomy(dt, { getBuildings });

    // Update AI
    updateAI(dt, matchTime, {
      getEnergy: () => getEnergy(TEAM_ENEMY),
      spendEnergy: (amount) => spendEnergy(TEAM_ENEMY, amount),
      getBuildings,
      getUnits,
      createBuilding: (type, col, row) => {
        const b = createBuilding(type, col, row, TEAM_ENEMY);
        createBuildingMesh(b, getScene());
        // Create squad for AI production buildings too (for consistency)
        if (type === BTYPE_BARRACKS || type === BTYPE_FACTORY || type === BTYPE_HELIPAD) {
          createSquad(b.id, TEAM_ENEMY, type);
        }
        // Auto-orient AI walls (corners, verticals) same as player walls
        if (type === BTYPE_WALL) {
          autoOrientWalls([{ col, row }]);
        }
        return b;
      },
      isBuildable: (col, row, size) => isBuildable(col, row, size, TEAM_ENEMY),
      findPath,
      canUpgradeTurret,
      startTurretUpgrade,
      canBranchTurret,
      startTurretBranch,
      canUpgradeBuilding,
      canBranchBuilding,
      startUpgrade,
      startBranch,
      getUpgradeCost,
      getBranchCost,
      getIncomeBreakdown: () => getIncomeBreakdown(TEAM_ENEMY),
      setHelicopterRally,
      canRepairWall,
      startWallRepair,
      getRepairCost,
      // Squad management callbacks for AI — now sets stances directly on units
      getSquads: (team) => getSquads(team),
      getUnitsBySquad: (squadId) => getUnitsBySquad(squadId, getUnits),
      setUnitStance,
      setUnitTargetPriority,
      setUnitsStance,
      setUnitsTargetPriority,
    });

    // Update player unit rally/grouping
    updatePlayerRally(matchTime, { getUnits });

    // Update buildings (production + turret construction)
    const justFinished = updateBuildings(dt, matchTime, {
      createUnit: (type, x, z, team, bonuses, parentBuildingId) => {
        const u = createUnit(type, x, z, team, bonuses);
        createUnitMesh(u, getScene());
        // Assign unit to the producing building's squad
        if (parentBuildingId != null) {
          assignUnitToSquad(u, parentBuildingId);
        }
        // Immediately assign rally hold for enemy units (prevents 1-frame advance)
        if (team === TEAM_ENEMY) {
          assignEnemyUnitRally(u);
        }
        return u;
      },
      findPath,
    });

    // Rebuild meshes for buildings that just finished upgrading/branching/repairing
    for (const b of justFinished) {
      rebuildBuildingMesh(b, getScene());
      if (b.type === BTYPE_WALL && b._justRepaired) {
        spawnParticle(b.x, b.z, b.team === TEAM_PLAYER ? COLORS.CYAN : COLORS.RED, 'wallRepair');
        playSound('wall_repair');
        b._justRepaired = false;
      } else {
        playSound('upgrade');
      }
    }

    // Update combat first (targeting + firing + builds spatial hashes for units)
    updateCombat(dt, {
      getUnits,
      getBuildings,
      getProjectiles,
      getFirePoint: (building) => getFirePoint(building),
      createProjectile: (x, z, tx, tz, team, damage, spawnY) => {
        const p = createProjectile(x, z, tx, tz, team, damage, spawnY);
        if (p) createProjectileMesh(p, getScene());
        return p;
      },
      createHomingProjectile: (x, z, y, target, team, damage, source, splashR, splashD, level, branch) => {
        const p = createHomingProjectile(x, z, y, target, team, damage, source, splashR, splashD, level, branch);
        if (p) createProjectileMesh(p, getScene());
        playSound('shoot_pulse');
        return p;
      },
      removeUnit: (u) => {
        // Deselect helicopter if it was selected
        if (u.isAir && getSelectedHelicopter() === u.id) {
          setSelectedHelicopter(null);
          hideHelicopterInfo();
        }

        // Remove from squad membership
        removeUnitFromSquad(u);

        removeUnit(u);
        removeUnitMesh(u, getScene());
        spawnParticle(u.x, u.z, u.team === TEAM_PLAYER ? COLORS.CYAN : COLORS.RED, 'explosion');
        playSound('explosion');
      },
      removeBuilding: (b) => {
        // Remove squad linked to this building
        const squad = getSquadByBuilding(b.id);
        if (squad) removeSquad(squad.id, getUnits);

        removeBuilding(b);
        removeBuildingMesh(b, getScene());

        // Wall-specific or standard destruction effects
        if (b.type === BTYPE_WALL) {
          spawnParticle(b.x, b.z, b.team === TEAM_PLAYER ? COLORS.CYAN : COLORS.RED, 'wallBreak');
          playSound('wall_break');
        } else {
          spawnParticle(b.x, b.z, b.team === TEAM_PLAYER ? COLORS.CYAN : COLORS.RED, 'bigExplosion');
          playSound('bigExplosion');
        }
        // If the destroyed building was selected, deselect it
        if (getSelectedBuilding() === b) deselectBuilding();
      },
      spawnParticle,
    });

    // Update units (movement + pathfinding, uses combat spatial hashes)
    updateUnits(dt, {
      findPath,
      findPathThroughWalls,
      getBuildings,
      getUnits,
      combatUnitHash: getCombatUnitHash(),
      combatBuildingHash: getCombatBuildingHash(),
    });

    // Update projectiles — also cleans up combat-killed ones
    const expiredProjectiles = updateProjectiles(dt);
    for (const p of expiredProjectiles) {
      removeProjectileMesh(p, getScene());
    }

    // Update particles
    updateParticles(dt);

    // Check win/loss
    const buildings = getBuildings();
    const playerCore = buildings.find(b => b.type === BTYPE_CORE && b.team === TEAM_PLAYER);
    const enemyCore = buildings.find(b => b.type === BTYPE_CORE && b.team === TEAM_ENEMY);

    if (!enemyCore || enemyCore.hp <= 0) {
      setState(STATE_VICTORY);
      playSound('victory');
    } else if (!playerCore || playerCore.hp <= 0) {
      setState(STATE_DEFEAT);
      playSound('defeat');
    }

    // Detect base under attack
    let baseUnderAttack = false;
    if (playerCore && playerCore.alive) {
      const allUnits = getUnits();
      for (let i = 0; i < allUnits.length; i++) {
        const u = allUnits[i];
        if (u.alive && u.team === TEAM_ENEMY) {
          if (dist(u.x, u.z, playerCore.x, playerCore.z) < BASE_DEFENSE_RADIUS) {
            baseUnderAttack = true;
            break;
          }
        }
      }
    }

    // Play base alert sound on rising edge
    if (baseUnderAttack && !_lastBaseAlert) {
      playSound('baseAlert');
    }
    _lastBaseAlert = baseUnderAttack;

    // Clean squad membership periodically (every ~60 frames)
    if (matchTime % 1 < dt) {
      cleanSquadMembership(getUnits);
    }

    // Clean stale selected units (dead ones)
    selectedUnits = selectedUnits.filter(u => u.alive);
    for (let i = 0; i < selectedUnits.length; i++) {
      if (!selectedUnits[i].alive) selectedUnits[i].selected = false;
    }

    // Build squad data for HUD — only include squads with alive buildings
    const playerSquads = getSquads(TEAM_PLAYER);
    const allBuildingsForSquads = getBuildings();
    const squadData = [];
    for (let i = 0; i < playerSquads.length; i++) {
      const s = playerSquads[i];
      const building = allBuildingsForSquads.find(b => b.id === s.buildingId);
      if (!building || !building.alive) {
        // Stale squad — clean it up
        removeSquad(s.id, getUnits);
        continue;
      }
      squadData.push({
        id: s.id,
        buildingId: s.buildingId,
        label: s.label,
        buildingType: s.buildingType,
        spawnStance: s.spawnStance,
        spawnTargetPriority: s.spawnTargetPriority,
        unitCount: getSquadUnitCount(s, getUnits),
        buildingAlive: true,
        rallyX: s.rallyX,
        rallyZ: s.rallyZ,
      });
    }

    // Get rally state for HUD
    const rallyState = getPlayerRallyState();

    // Camera info for minimap viewport rect
    const cam = getCamera();
    const ctrl = getControls();
    let cameraInfo = null;
    if (cam && ctrl) {
      const camDist = cam.position.distanceTo(ctrl.target);
      const fovRad = cam.fov * Math.PI / 180;
      const viewH = 2 * Math.tan(fovRad / 2) * camDist;
      cameraInfo = {
        x: ctrl.target.x,
        z: ctrl.target.z,
        viewWidth: viewH * cam.aspect,
        viewHeight: viewH,
      };
    }

    // Find selected helicopter for HUD
    const selectedHeliId = getSelectedHelicopter();
    let selectedHelicopter = null;
    if (selectedHeliId) {
      const helis = getHelicopters();
      selectedHelicopter = helis.find(h => h.id === selectedHeliId) || null;
    }

    // Update HUD
    updateHUD({
      energy: getEnergy(TEAM_PLAYER),
      enemyEnergy: getEnergy(TEAM_ENEMY),
      incomeBreakdown: getIncomeBreakdown(TEAM_PLAYER),
      buildings,
      units: getUnits(),
      matchTime,
      buildable: PLAYER_BUILDABLE,
      dt,
      baseUnderAttack,
      rallyActive: rallyState.rallyActive,
      rallyHoldingCount: rallyState.holdingCount,
      rallyPushSize: rallyState.pushSize,
      rallyTimeRemaining: rallyState.timeRemaining,
      obstacles: _cachedObstacles,
      cameraInfo,
      selectedHelicopter,
      selectedHelicopterId: selectedHeliId,
      squads: squadData,
      selectedUnitCount: selectedUnits.length,
      selectionBoxScreen: getSelectionBoxScreenCoords(),
    });
  }

  // --- Render ---
  const allBuildings = getBuildings();
  const allUnits = getUnits();
  const allProjectiles = getProjectiles();

  updateBuildingMeshes(now, allBuildings);
  updateUnitMeshes(now, allUnits, getSelectedHelicopter());
  updateProjectileMeshes(now, allProjectiles);
  updateParticleRenderer(now, getParticles());
  updateEffectRenderer(now);

  // Grid update: augment hovered tile with building size for placement preview
  const hovered = getHoveredTile();
  let gridHover = null;
  if (hovered && gameState === STATE_PLAYING) {
    const pm = getPlacementMode();
    if (pm) {
      const stats = BUILDING_STATS[pm];
      gridHover = { col: hovered.col, row: hovered.row, size: stats ? stats.size : 1 };
    }
  }
  updateGrid(now, gridHover, isDragActive() ? getDragTiles() : null);

  const composer = getComposer();
  if (composer) composer.render();
}

// --- Button wiring ---
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-resume').addEventListener('click', () => setState(STATE_PLAYING));
document.getElementById('btn-quit').addEventListener('click', () => {
  resetAll();
  setState(STATE_MENU);
});
document.getElementById('btn-restart-win').addEventListener('click', startGame);
document.getElementById('btn-restart-lose').addEventListener('click', startGame);

// Pause on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (gameState === STATE_PLAYING) {
      setState(STATE_PAUSED);
    } else if (gameState === STATE_PAUSED) {
      setState(STATE_PLAYING);
    }
  }
});

// --- Init ---
function init() {
  const renderTarget = document.getElementById('render-target');
  initScene(renderTarget);
  initInput(getRenderer(), getCamera(), getControls());

  // Shared zone building requires a nearby friendly ground unit
  setSharedZoneUnitCheck((col, row, size, team) => {
    const cx = col * TILE_SIZE + (TILE_SIZE * size) / 2;
    const cz = row * TILE_SIZE + (TILE_SIZE * size) / 2;
    const r2 = SHARED_ZONE_UNIT_RADIUS * SHARED_ZONE_UNIT_RADIUS;
    for (const u of getUnits()) {
      if (u.team !== team || u.isAir) continue;
      const dx = u.x - cx;
      const dz = u.z - cz;
      if (dx * dx + dz * dz <= r2) return true;
    }
    return false;
  });

  // Wire click callback for build placement
  setClickCallback((col, row, buildingType) => {
    if (col < 0 || !buildingType) {
      // Cancellation
      clearBuildSelection();
      setPlacementMode(null);
      return;
    }
    if (handleBuildPlacement(col, row, buildingType)) {
      // Successful placement — exit build mode so user can select buildings
      clearBuildSelection();
      setPlacementMode(null);
    } else {
      // Placement failed — if there's a player building here, select it instead
      handleTileSelect(col, row);
      if (getSelectedBuilding()) {
        clearBuildSelection();
        setPlacementMode(null);
      }
    }
  });

  // Wire select callback for building/helicopter/unit selection
  setSelectCallback((col, row, worldX, worldZ) => {
    if (col === -2 && row === -2) {
      // Helicopter selection signal from input.js
      const heliId = getSelectedHelicopter();
      if (heliId) {
        const helis = getHelicopters();
        const heli = helis.find(h => h.id === heliId);
        if (heli) {
          clearUnitSelection();
          deselectBuilding();
          showHelicopterInfo(heli);
          playSound('heli_select');
        }
      }
      return;
    }
    hideHelicopterInfo();
    setSelectedHelicopter(null);

    // Try building selection first
    handleTileSelect(col, row);
    if (getSelectedBuilding()) {
      clearUnitSelection();
      return;
    }

    // No building found — try unit selection via world position
    if (worldX != null && worldZ != null) {
      const unit = findUnitAtWorldPos(worldX, worldZ);
      if (unit) {
        selectUnit(unit);
        playSound('select');
        return;
      }
    }

    // Nothing found — clear selection
    clearUnitSelection();
    deselectBuilding();
  });

  // Wire box select callback
  setBoxSelectCallback((x1, z1, x2, z2) => {
    hideHelicopterInfo();
    setSelectedHelicopter(null);
    deselectBuilding();
    selectUnitsInBox(x1, z1, x2, z2);
    if (selectedUnits.length > 0) playSound('select');
  });

  // Wire helicopter rally callback
  setHelicopterRallyCallback((unitId, worldX, worldZ) => {
    setHelicopterRally(unitId, worldX, worldZ);
    hideHelicopterInfo();
    playSound('heli_rally');
  });

  // Wire helicopter list callback for click detection
  setGetHelicoptersCallback(() => getHelicopters());

  // Wire squad rally callback for map clicks
  setSquadRallyCallback((target, worldX, worldZ) => {
    handleRallySet(target, worldX, worldZ);
  });

  // Wire drag-to-place callback for walls
  setDragPlaceCallback((tiles) => {
    const placed = [];
    for (const t of tiles) {
      if (handleBuildPlacement(t.col, t.row, BTYPE_WALL)) {
        placed.push(t);
      }
    }
    if (placed.length > 0) {
      autoOrientWalls(placed);
    }
    // Stay in wall placement mode after drag (don't exit like single builds)
  });

  initHUD(document.getElementById('sidebar'), {
    onBuildSelect: (type) => {
      deselectBuilding();
      setPlacementMode(type);
      // Cancel squad rally pending if entering build mode
      setHudSquadRallyPending(null);
      setInputSquadRallyPending(null);
      if (type) playSound('select');
      else playSound('cancel');
    },
    onBuildingUpgrade: (building) => {
      handleBuildingUpgrade(building);
    },
    onBuildingBranch: (building, key) => {
      handleBuildingBranch(building, key);
    },
    onPushNow: () => {
      forcePlayerPush();
      playSound('select');
    },
    onMinimapClick: (worldX, worldZ) => {
      snapCameraTo(worldX, worldZ);
    },
    onHelicopterRally: (heliId, worldX, worldZ) => {
      setHelicopterRally(heliId, worldX, worldZ);
      playSound('heli_rally');
    },
    onHeliDeselect: () => {
      setSelectedHelicopter(null);
      hideHelicopterInfo();
    },
    // --- Spawn stance controls (per-building, affects future units only) ---
    onSpawnStanceChange: (squadId, stance) => {
      setSquadSpawnStance(Number(squadId), stance);
      playSound('select');
    },
    onSpawnTargetChange: (squadId, priority) => {
      setSquadSpawnTargetPriority(Number(squadId), priority);
      playSound('select');
    },
    // --- Selection-based commands (from command bar) ---
    onSelectionStance: (stance) => {
      if (selectedUnits.length > 0) {
        setUnitsStance(selectedUnits, stance);
      }
      setHudSquadRallyPending(null);
      setInputSquadRallyPending(null);
      playSound('select');
    },
    onSelectionTarget: (priority) => {
      if (selectedUnits.length > 0) {
        setUnitsTargetPriority(selectedUnits, priority);
      }
      playSound('select');
    },
    onSelectionDeselect: () => {
      clearUnitSelection();
    },
    onSelectionRallyClick: () => {
      // Enter rally placement mode for current selection
      setHudSquadRallyPending('selection');
      setInputSquadRallyPending('selection');
      clearBuildSelection();
      setPlacementMode(null);
      setSelectedHelicopter(null);
      hideHelicopterInfo();
      playSound('select');
    },
    // --- Squad card click (selects all units in that squad) ---
    onSquadCardClick: (squadId) => {
      selectSquadUnits(Number(squadId));
      playSound('select');
    },
    // --- Global commands (all player units) ---
    onGlobalStance: (stance) => {
      setAllUnitsStance(TEAM_PLAYER, stance, getUnits);
      setHudSquadRallyPending(null);
      setInputSquadRallyPending(null);
      playSound('select');
    },
    onGlobalTarget: (priority) => {
      setAllUnitsTargetPriority(TEAM_PLAYER, priority, getUnits);
      playSound('select');
    },
    onGlobalRallyClick: () => {
      setHudSquadRallyPending('all');
      setInputSquadRallyPending('all');
      clearBuildSelection();
      setPlacementMode(null);
      setSelectedHelicopter(null);
      hideHelicopterInfo();
      playSound('select');
    },
    onRallySet: (target, worldX, worldZ) => {
      handleRallySet(target, worldX, worldZ);
    },
    onWallRepair: (building) => {
      if (!building || !canRepairWall(building)) return;
      const cost = getRepairCost(building);
      if (!spendEnergy(TEAM_PLAYER, cost)) {
        playSound('denied');
        return;
      }
      startWallRepair(building);
      playSound('wall_repair');
    },
    onWallDemolish: (building) => {
      if (!building || building.type !== BTYPE_WALL || !building.alive) return;
      const refund = demolishBuilding(building);
      if (refund > 0) {
        addEnergy(TEAM_PLAYER, refund);
      }
      removeBuildingMesh(building, getScene());
      spawnParticle(building.x, building.z, COLORS.CYAN, 'wallBreak');
      playSound('wall_break');
      deselectBuilding();
    },
    onWallOrient: (building, orientation) => {
      if (!building || building.type !== BTYPE_WALL || !building.alive) return;
      setWallOrientation(building, orientation);
      rebuildBuildingMesh(building, getScene());
      playSound('select');
    },
  });
  initParticleRenderer(getScene());
  initEffectRenderer(getScene());
  initParticles();

  // Wire camera home key to snap to player base
  const playerBaseWorld = gridToWorld(PLAYER_BASE_COL, PLAYER_BASE_ROW, TILE_SIZE);
  setCameraSnapCallback(() => {
    snapCameraTo(playerBaseWorld.x, playerBaseWorld.z);
  });

  setState(STATE_MENU);
  requestAnimationFrame(gameLoop);
}

// --- Camera snap helper ---
function snapCameraTo(worldX, worldZ) {
  const cam = getCamera();
  const ctrl = getControls();
  if (!cam || !ctrl) return;
  const dx = worldX - ctrl.target.x;
  const dz = worldZ - ctrl.target.z;
  ctrl.target.x = worldX;
  ctrl.target.z = worldZ;
  cam.position.x += dx;
  cam.position.z += dz;
}

init();
