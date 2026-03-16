// ============================================================
// units.js — Unit logic (NO rendering code)
// ============================================================
import {
  UNIT_STATS, TILE_SIZE, TILE_EMPTY, TILE_PATH, TILE_WALL,
  GRID_COLS, GRID_ROWS,
  TEAM_PLAYER, TEAM_ENEMY,
  PLAYER_BASE_COL, PLAYER_BASE_ROW,
  ENEMY_BASE_COL, ENEMY_BASE_ROW,
  COMBAT_STOP_TO_FIGHT,
  BASE_DEFENSE_RADIUS, BASE_DEFENSE_RECALL_RADIUS,
  UNIT_COLLISION_FORCE, UNIT_COLLISION_RADIUS_SCALE,
  STUCK_TIME_THRESHOLD, STUCK_PROGRESS_MIN,
  SPATIAL_HASH_CELL_SIZE,
  UTYPE_HELICOPTER,
  HELI_FLY_HEIGHT, HELI_ORBIT_RADIUS, HELI_ORBIT_SPEED, HELI_APPROACH_SPEED, HELI_ORBIT_DRIFT_SPEED,
  STANCE_ADVANCE, STANCE_DEFEND, STANCE_HOLD, STANCE_RALLY,
  DEFEND_ROW_OFFSET, DEFEND_HOLD_RADIUS, DEFEND_ZONE_RADIUS,
  SQUAD_RALLY_ENGAGE_RADIUS, SQUAD_RALLY_HOLD_RADIUS,
  BTYPE_WALL,
  UTYPE_MEDIC, UTYPE_ENGINEER,
} from './config.js';
import { nextId, worldToGrid, gridToWorld, dist, SpatialHash } from './utils.js';
import { getTile } from './map.js';

let units = [];
let _dirty = true;
let _aliveCache = [];
let _getCalls = 0;
let _frameCount = 0;
const _spatialHash = new SpatialHash(SPATIAL_HASH_CELL_SIZE);

/**
 * Create a unit of the given type at world position (x, z) for the given team.
 * bonuses (optional): { hpMult, damageMult, speedMult, rangeMult, level, branch }
 */
export function createUnit(type, x, z, team, bonuses = null) {
  const stats = UNIT_STATS[type];
  if (!stats) return null;

  const hpMult = (bonuses && bonuses.hpMult) || 1;
  const dmgMult = (bonuses && bonuses.damageMult) || 1;
  const spdMult = (bonuses && bonuses.speedMult) || 1;
  const rngMult = (bonuses && bonuses.rangeMult) || 1;

  const hp = Math.round(stats.hp * hpMult);
  const damage = Math.round(stats.damage * dmgMult);
  const speed = stats.speed * spdMult;
  const range = Math.round(stats.range * rngMult);

  const unit = {
    id: nextId(),
    type,
    team,
    x,
    z,
    hp,
    maxHp: hp,
    speed,
    damage,
    range,
    fireRate: stats.fireRate,
    size: stats.size,
    fireCooldown: 0,
    path: null,
    pathIndex: 0,
    targetId: null,
    alive: true,
    inCombat: false,
    rallyHold: false,
    rallyX: 0,
    rallyZ: 0,
    _rallyAssigned: false,
    _stuckTime: 0,
    _lastProgressX: x,
    _lastProgressZ: z,
    idOffset: Math.random() * Math.PI * 2,
    // Track upgrade level for visual differentiation
    upgradeLevel: bonuses ? (bonuses.level || 0) : 0,
    upgradeBranch: bonuses ? (bonuses.branch || null) : null,
    // Squad command fields (set by squads.js via assignUnitToSquad)
    stance: STANCE_ADVANCE,
    targetPriority: 'any',
    squadId: null,
    // Defend stance fields
    _defendTargetId: null,
    // Squad rally fields (set by squads.js propagation)
    squadRallyX: null,
    squadRallyZ: null,
    // Wall targeting
    _wallTarget: null,
    // Selection render flags (set by main.js, read by unitMeshes.js)
    selected: false,
    squadHighlight: false,
    // Support unit fields
    isSupport: !!(stats.isSupport),
    healRate: stats.healRate || 0,
    healRange: stats.healRange || 0,
    healTargets: stats.healTargets || null,
    _healTargetId: null,
    _parentBuildingId: null,
    _healing: false,
  };

  // Helicopter air unit fields
  if (type === UTYPE_HELICOPTER) {
    unit.isAir = true;
    unit.orbitX = x;
    unit.orbitZ = z;
    unit.orbitAngle = Math.random() * Math.PI * 2;
    unit.flyHeight = HELI_FLY_HEIGHT;
    unit.orbitRadius = HELI_ORBIT_RADIUS;
  }

  units.push(unit);
  _dirty = true;
  return unit;
}

/**
 * Update all alive units: pathfinding and movement.
 * callbacks.findPath(fromCol, fromRow, toCol, toRow) — returns path array [{col, row}, ...] or null.
 * callbacks.getUnits() — returns alive units (for stop-to-fight check).
 * callbacks.getBuildings() — returns alive buildings (for stop-to-fight check).
 */
export function updateUnits(dt, callbacks) {
  const allUnits = (callbacks && callbacks.getUnits) ? callbacks.getUnits() : [];
  const allBuildings = (callbacks && callbacks.getBuildings) ? callbacks.getBuildings() : [];
  // Combat spatial hashes (built by combat.js, passed via callbacks for O(n*k) enemy checks)
  const combatUnitHash = callbacks && callbacks.combatUnitHash;
  const combatBuildingHash = callbacks && callbacks.combatBuildingHash;

  // --- Base defense detection ---
  // Check if each team's base is under attack (enemies within defense radius)
  const playerBasePos = gridToWorld(PLAYER_BASE_COL, PLAYER_BASE_ROW, TILE_SIZE);
  const enemyBasePos = gridToWorld(ENEMY_BASE_COL, ENEMY_BASE_ROW, TILE_SIZE);
  let playerBaseUnderAttack = false;
  let enemyBaseUnderAttack = false;

  for (let j = 0; j < allUnits.length; j++) {
    const other = allUnits[j];
    if (!other.alive) continue;
    if (other.team === TEAM_ENEMY) {
      if (!playerBaseUnderAttack && dist(other.x, other.z, playerBasePos.x, playerBasePos.z) <= BASE_DEFENSE_RADIUS) {
        playerBaseUnderAttack = true;
      }
    } else {
      if (!enemyBaseUnderAttack && dist(other.x, other.z, enemyBasePos.x, enemyBasePos.z) <= BASE_DEFENSE_RADIUS) {
        enemyBaseUnderAttack = true;
      }
    }
    if (playerBaseUnderAttack && enemyBaseUnderAttack) break;
  }

  // --- First pass: detect stuck units ---
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.alive || u.inCombat || u.isAir) continue;

    const moved = dist(u.x, u.z, u._lastProgressX, u._lastProgressZ);
    if (moved >= STUCK_PROGRESS_MIN) {
      u._stuckTime = 0;
      u._lastProgressX = u.x;
      u._lastProgressZ = u.z;
    } else if (u.path && u.pathIndex < u.path.length) {
      u._stuckTime += dt;
    }
  }

  // Store pre-movement positions for tile validation after collision separation
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.alive || u.isAir) continue;
    u._prevX = u.x;
    u._prevZ = u.z;
  }

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.alive) continue;

    // Air units skip ground pathfinding, collision, and rally entirely
    if (u.isAir) {
      if (u.fireCooldown > 0) {
        u.fireCooldown -= dt;
        if (u.fireCooldown < 0) u.fireCooldown = 0;
      }
      updateHelicopter(u, dt);
      continue;
    }

    // Support units (Medic/Engineer) have their own movement AI
    if (u.isSupport) {
      updateSupportUnit(u, dt, allUnits, callbacks);
      continue;
    }

    // Decrement fire cooldown
    if (u.fireCooldown > 0) {
      u.fireCooldown -= dt;
      if (u.fireCooldown < 0) u.fireCooldown = 0;
    }

    // --- Stuck nudge: random walkable offset to unstick ---
    if (u._stuckTime >= STUCK_TIME_THRESHOLD && (u.id % 4) === (_frameCount % 4)) {
      const grid = worldToGrid(u.x, u.z, TILE_SIZE);
      const offsetRange = 3 + Math.floor(Math.random() * 3); // 3-5 tiles
      const angle = Math.random() * Math.PI * 2;
      const nudgeCol = Math.max(0, Math.min(GRID_COLS - 1, grid.col + Math.round(Math.cos(angle) * offsetRange)));
      const nudgeRow = Math.max(0, Math.min(GRID_ROWS - 1, grid.row + Math.round(Math.sin(angle) * offsetRange)));
      const nudgeTile = getTile(nudgeCol, nudgeRow);
      if ((nudgeTile === TILE_EMPTY || nudgeTile === TILE_PATH) && callbacks && callbacks.findPath) {
        const nudgePath = callbacks.findPath(grid.col, grid.row, nudgeCol, nudgeRow);
        if (nudgePath && nudgePath.length > 0) {
          u.path = nudgePath;
          u.pathIndex = 0;
        }
      }
      u._stuckTime = 0;
      u._lastProgressX = u.x;
      u._lastProgressZ = u.z;
    }

    // Stop-to-fight: check if any enemy is within attack range (spatial hash)
    if (COMBAT_STOP_TO_FIGHT) {
      const enemyTeam = u.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
      let enemyInRange = false;

      if (combatUnitHash) {
        const nearby = combatUnitHash.queryNear(u.x, u.z);
        for (let j = 0; j < nearby.length; j++) {
          const other = nearby[j];
          if (!other.alive || other.team !== enemyTeam) continue;
          if (dist(u.x, u.z, other.x, other.z) <= u.range) {
            enemyInRange = true;
            break;
          }
        }
      }

      if (!enemyInRange && combatBuildingHash) {
        const nearby = combatBuildingHash.queryNear(u.x, u.z);
        for (let j = 0; j < nearby.length; j++) {
          const b = nearby[j];
          if (!b.alive || b.team !== enemyTeam) continue;
          if (dist(u.x, u.z, b.x, b.z) <= u.range) {
            enemyInRange = true;
            break;
          }
        }
      }

      u.inCombat = enemyInRange;
      // Rally-stance units keep moving toward rally point even while in combat;
      // combat.js still fires at targets in range independently.
      if (enemyInRange && u.stance !== STANCE_RALLY) continue;
    }

    // --- Base defense: recall ADVANCE-stance units to defend their own base ---
    // Only auto-recall advance-stance units. HOLD, DEFEND, and RALLY units
    // are under explicit player command and should not be overridden.
    const ownBaseUnderAttack = u.team === TEAM_PLAYER ? playerBaseUnderAttack : enemyBaseUnderAttack;
    const ownBasePos = u.team === TEAM_PLAYER ? playerBasePos : enemyBasePos;

    if (ownBaseUnderAttack && u.stance === STANCE_ADVANCE) {
      const distToOwnBase = dist(u.x, u.z, ownBasePos.x, ownBasePos.z);

      if (distToOwnBase <= BASE_DEFENSE_RECALL_RADIUS) {
        // Break rally hold to defend
        if (u.rallyHold) {
          u.rallyHold = false;
        }

        // Path toward own base area — spread out around base, not all to center
        const baseCol = u.team === TEAM_PLAYER ? PLAYER_BASE_COL : ENEMY_BASE_COL;
        const baseRow = u.team === TEAM_PLAYER ? PLAYER_BASE_ROW : ENEMY_BASE_ROW;
        // Use unit ID to deterministically spread defense positions
        const spreadCol = baseCol + ((u.id % 5) - 2); // -2 to +2 tile offset
        const spreadRow = baseRow + ((u.id % 3) - 1);  // -1 to +1 tile offset
        const defCol = Math.max(0, Math.min(GRID_COLS - 1, spreadCol));
        const defRow = Math.max(0, Math.min(GRID_ROWS - 1, spreadRow));

        if (!u.path || u.pathIndex >= u.path.length || !u._defending) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          if (callbacks && callbacks.findPath) {
            const newPath = callbacks.findPath(grid.col, grid.row, defCol, defRow);
            if (newPath && newPath.length > 0) {
              u.path = newPath;
              u.pathIndex = 0;
            }
          }
        }

        u._defending = true;

        // Move toward current waypoint (same movement code as normal advance)
        if (u.path && u.pathIndex < u.path.length) {
          const wp = u.path[u.pathIndex];
          const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
          const dx = target.x - u.x;
          const dz = target.z - u.z;
          const d = Math.sqrt(dx * dx + dz * dz);

          if (d < TILE_SIZE / 2) {
            u.pathIndex++;
          } else {
            const moveSpeed = u.speed * dt;
            const step = Math.min(moveSpeed, d);
            u.x += (dx / d) * step;
            u.z += (dz / d) * step;
          }
        }
        continue;
      }
    }

    // Clear defending state when base is no longer under attack
    if (u._defending && !ownBaseUnderAttack) {
      u._defending = false;
      u.path = null;
      u.pathIndex = 0;
    }

    // --- Stance: HOLD — stop all movement, stay in place (combat still works) ---
    if (u.stance === STANCE_HOLD) {
      continue;
    }

    // --- Stance: DEFEND — return to base, actively intercept enemies in base zone ---
    if (u.stance === STANCE_DEFEND) {
      const ownBaseCol = u.team === TEAM_PLAYER ? PLAYER_BASE_COL : ENEMY_BASE_COL;
      const ownBaseRow = u.team === TEAM_PLAYER ? PLAYER_BASE_ROW : ENEMY_BASE_ROW;
      const basePos = u.team === TEAM_PLAYER ? playerBasePos : enemyBasePos;
      const enemyTeam = u.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;

      // Find nearest enemy unit within defend zone of own base (spatial hash)
      let nearestEnemy = null;
      let nearestEnemyDist = Infinity;
      let nearestEnemyIsUnit = false;

      if (combatUnitHash) {
        const nearby = combatUnitHash.queryNear(basePos.x, basePos.z);
        for (let j = 0; j < nearby.length; j++) {
          const other = nearby[j];
          if (!other.alive || other.team !== enemyTeam) continue;
          const dToBase = dist(other.x, other.z, basePos.x, basePos.z);
          if (dToBase > DEFEND_ZONE_RADIUS) continue;
          const dToSelf = dist(u.x, u.z, other.x, other.z);
          if (dToSelf < nearestEnemyDist) {
            nearestEnemyDist = dToSelf;
            nearestEnemy = other;
            nearestEnemyIsUnit = true;
          }
        }
      }

      // Also check enemy buildings in the zone if no unit targets found
      if (!nearestEnemy && combatBuildingHash) {
        const nearby = combatBuildingHash.queryNear(basePos.x, basePos.z);
        for (let j = 0; j < nearby.length; j++) {
          const b = nearby[j];
          if (!b.alive || b.team !== enemyTeam) continue;
          const dToBase = dist(b.x, b.z, basePos.x, basePos.z);
          if (dToBase > DEFEND_ZONE_RADIUS) continue;
          const dToSelf = dist(u.x, u.z, b.x, b.z);
          if (dToSelf < nearestEnemyDist) {
            nearestEnemyDist = dToSelf;
            nearestEnemy = b;
            nearestEnemyIsUnit = false;
          }
        }
      }

      if (nearestEnemy) {
        // Intercept: path toward nearest enemy threatening the base
        const targetChanged = u._defendTargetId !== nearestEnemy.id;
        if ((targetChanged || !u.path || u.pathIndex >= u.path.length)
            && (u.id % 4) === (_frameCount % 4)) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          const tGrid = worldToGrid(nearestEnemy.x, nearestEnemy.z, TILE_SIZE);
          if (callbacks && callbacks.findPath) {
            const newPath = callbacks.findPath(grid.col, grid.row, tGrid.col, tGrid.row);
            if (newPath && newPath.length > 0) {
              u.path = newPath;
              u.pathIndex = 0;
            }
          }
          u._defendTargetId = nearestEnemy.id;
        }
      } else {
        // No enemies near base — return to defend point and hold
        // Clear stale chase path so unit doesn't keep advancing toward dead enemy
        if (u._defendTargetId !== null) {
          u.path = null;
          u.pathIndex = 0;
          u._defendTargetId = null;
        }

        const defendRow = u.team === TEAM_PLAYER
          ? ownBaseRow - DEFEND_ROW_OFFSET
          : ownBaseRow + DEFEND_ROW_OFFSET;
        const defendPos = gridToWorld(ownBaseCol, defendRow, TILE_SIZE);
        const dToDefend = dist(u.x, u.z, defendPos.x, defendPos.z);

        if (dToDefend < DEFEND_HOLD_RADIUS) {
          continue; // Close enough, hold position
        }

        if ((!u.path || u.pathIndex >= u.path.length)
            && (u.id % 4) === (_frameCount % 4)) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          if (callbacks && callbacks.findPath) {
            const newPath = callbacks.findPath(grid.col, grid.row, ownBaseCol, defendRow);
            if (newPath && newPath.length > 0) {
              u.path = newPath;
              u.pathIndex = 0;
            }
          }
        }
      }

      // Move toward current waypoint
      if (u.path && u.pathIndex < u.path.length) {
        const wp = u.path[u.pathIndex];
        const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
        const dx = target.x - u.x;
        const dz = target.z - u.z;
        const d = Math.sqrt(dx * dx + dz * dz);

        if (d < TILE_SIZE / 2) {
          u.pathIndex++;
        } else {
          const moveSpeed = u.speed * dt;
          const step = Math.min(moveSpeed, d);
          u.x += (dx / d) * step;
          u.z += (dz / d) * step;
        }
      }
      continue;
    }

    // --- Stance: RALLY — move to squad rally point, fight enemies near it, hold when clear ---
    if (u.stance === STANCE_RALLY && u.squadRallyX != null) {
      const rallyX = u.squadRallyX;
      const rallyZ = u.squadRallyZ;
      const enemyTeam = u.team === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;

      // Find nearest enemy within engage radius of the rally point (spatial hash)
      let nearestEnemy = null;
      let nearestEnemyDist = Infinity;

      if (combatUnitHash) {
        const nearby = combatUnitHash.queryNear(rallyX, rallyZ);
        for (let j = 0; j < nearby.length; j++) {
          const other = nearby[j];
          if (!other.alive || other.team !== enemyTeam) continue;
          const dToRally = dist(other.x, other.z, rallyX, rallyZ);
          if (dToRally > SQUAD_RALLY_ENGAGE_RADIUS) continue;
          const dToSelf = dist(u.x, u.z, other.x, other.z);
          if (dToSelf < nearestEnemyDist) {
            nearestEnemyDist = dToSelf;
            nearestEnemy = other;
          }
        }
      }

      // Also check buildings near rally point
      if (!nearestEnemy && combatBuildingHash) {
        const nearby = combatBuildingHash.queryNear(rallyX, rallyZ);
        for (let j = 0; j < nearby.length; j++) {
          const b = nearby[j];
          if (!b.alive || b.team !== enemyTeam) continue;
          const dToRally = dist(b.x, b.z, rallyX, rallyZ);
          if (dToRally > SQUAD_RALLY_ENGAGE_RADIUS) continue;
          const dToSelf = dist(u.x, u.z, b.x, b.z);
          if (dToSelf < nearestEnemyDist) {
            nearestEnemyDist = dToSelf;
            nearestEnemy = b;
          }
        }
      }

      if (nearestEnemy) {
        // Path toward nearest enemy near rally point
        const targetChanged = u._defendTargetId !== nearestEnemy.id;
        if ((targetChanged || !u.path || u.pathIndex >= u.path.length)
            && (u.id % 4) === (_frameCount % 4)) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          const tGrid = worldToGrid(nearestEnemy.x, nearestEnemy.z, TILE_SIZE);
          if (callbacks && callbacks.findPath) {
            const newPath = callbacks.findPath(grid.col, grid.row, tGrid.col, tGrid.row);
            if (newPath && newPath.length > 0) {
              u.path = newPath;
              u.pathIndex = 0;
            }
          }
          u._defendTargetId = nearestEnemy.id;
        }
      } else {
        // No enemies near rally — move to rally point and hold
        const dToRally = dist(u.x, u.z, rallyX, rallyZ);
        if (dToRally < SQUAD_RALLY_HOLD_RADIUS) {
          u._defendTargetId = null;
          continue; // Close enough, hold position
        }

        if ((!u.path || u.pathIndex >= u.path.length)
            && (u.id % 4) === (_frameCount % 4)) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          const rGrid = worldToGrid(rallyX, rallyZ, TILE_SIZE);
          if (callbacks && callbacks.findPath) {
            const newPath = callbacks.findPath(grid.col, grid.row, rGrid.col, rGrid.row);
            if (newPath && newPath.length > 0) {
              u.path = newPath;
              u.pathIndex = 0;
            }
          }
          u._defendTargetId = null;
        }
      }

      // Move toward current waypoint
      if (u.path && u.pathIndex < u.path.length) {
        const wp = u.path[u.pathIndex];
        const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
        const dx = target.x - u.x;
        const dz = target.z - u.z;
        const d = Math.sqrt(dx * dx + dz * dz);

        if (d < TILE_SIZE / 2) {
          u.pathIndex++;
        } else {
          const moveSpeed = u.speed * dt;
          const step = Math.min(moveSpeed, d);
          u.x += (dx / d) * step;
          u.z += (dz / d) * step;
        }
      }
      continue;
    }

    // --- Stance: ADVANCE (default) — rallyHold works only with advance stance ---
    if (u.rallyHold) {
      const d = dist(u.x, u.z, u.rallyX, u.rallyZ);
      if (d < 50) continue; // close enough to rally point, hold position

      // Use pathfinding to reach rally point (avoids walking into obstacles)
      if ((!u.path || u.pathIndex >= u.path.length)
          && (u.id % 4) === (_frameCount % 4)) {
        const grid = worldToGrid(u.x, u.z, TILE_SIZE);
        const rGrid = worldToGrid(u.rallyX, u.rallyZ, TILE_SIZE);
        if (callbacks && callbacks.findPath) {
          const newPath = callbacks.findPath(grid.col, grid.row, rGrid.col, rGrid.row);
          if (newPath && newPath.length > 0) {
            u.path = newPath;
            u.pathIndex = 0;
          }
        }
      }

      // Move toward current waypoint
      if (u.path && u.pathIndex < u.path.length) {
        const wp = u.path[u.pathIndex];
        const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
        const dx = target.x - u.x;
        const dz = target.z - u.z;
        const dw = Math.sqrt(dx * dx + dz * dz);

        if (dw < TILE_SIZE / 2) {
          u.pathIndex++;
        } else {
          const moveSpeed = u.speed * dt;
          const step = Math.min(moveSpeed, dw);
          u.x += (dx / dw) * step;
          u.z += (dz / dw) * step;
        }
      }
      continue;
    }

    // Determine destination: enemy base
    const destCol = u.team === TEAM_PLAYER ? ENEMY_BASE_COL : PLAYER_BASE_COL;
    const destRow = u.team === TEAM_PLAYER ? ENEMY_BASE_ROW : PLAYER_BASE_ROW;

    // Clear dead wall target
    if (u._wallTarget && (!u._wallTarget.alive || u._wallTarget._wallDestroyed)) {
      u._wallTarget = null;
      u.path = null;
      u.pathIndex = 0;
    }

    // Always use wall-aware pathfinding; scan returned path for wall tiles to set target
    if ((!u.path || u.pathIndex >= u.path.length) && (u.id % 4) === (_frameCount % 4)) {
      const grid = worldToGrid(u.x, u.z, TILE_SIZE);
      if (callbacks && callbacks.findPathThroughWalls) {
        const wallPath = callbacks.findPathThroughWalls(grid.col, grid.row, destCol, destRow);
        if (wallPath && wallPath.length > 0) {
          // Scan path for wall tiles — set first enemy wall as target
          u._wallTarget = _findFirstWallInPath(wallPath, allBuildings, u.team);
          if (u._wallTarget) {
            // Path toward the wall, not the full path through it
            const wallGrid = worldToGrid(u._wallTarget.x, u._wallTarget.z, TILE_SIZE);
            const toWall = callbacks.findPath ? callbacks.findPath(grid.col, grid.row, wallGrid.col, wallGrid.row) : null;
            u.path = toWall && toWall.length > 0 ? toWall : wallPath;
          } else {
            u.path = wallPath;
          }
          u.pathIndex = 0;
        }
      } else if (callbacks && callbacks.findPath) {
        // Fallback if findPathThroughWalls not available
        const newPath = callbacks.findPath(grid.col, grid.row, destCol, destRow);
        if (newPath && newPath.length > 0) {
          u.path = newPath;
          u.pathIndex = 0;
        }
      }
    }

    // Move toward current waypoint
    if (u.path && u.pathIndex < u.path.length) {
      const wp = u.path[u.pathIndex];
      const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
      const dx = target.x - u.x;
      const dz = target.z - u.z;
      const d = Math.sqrt(dx * dx + dz * dz);

      if (d < TILE_SIZE / 2) {
        // Reached waypoint, advance to next
        u.pathIndex++;
      } else {
        // Move toward waypoint
        const moveSpeed = u.speed * dt;
        const step = Math.min(moveSpeed, d);
        u.x += (dx / d) * step;
        u.z += (dz / d) * step;
      }
    }
  }

  // --- Collision separation pass (spatial hash) ---
  _spatialHash.clear();
  for (let i = 0; i < units.length; i++) {
    if (units[i].alive && !units[i].isAir) _spatialHash.insert(units[i]);
  }

  for (let i = 0; i < units.length; i++) {
    const a = units[i];
    if (!a.alive || a.isAir) continue;
    const radiusA = a.size * UNIT_COLLISION_RADIUS_SCALE;
    const nearby = _spatialHash.queryNear(a.x, a.z);

    for (let j = 0; j < nearby.length; j++) {
      const b = nearby[j];
      if (b.id <= a.id) continue; // avoid double processing
      const radiusB = b.size * UNIT_COLLISION_RADIUS_SCALE;
      const minDist = radiusA + radiusB;

      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const d = Math.sqrt(dx * dx + dz * dz);

      if (d < minDist && d > 0.01) {
        const overlap = minDist - d;
        const pushStr = Math.min(overlap, UNIT_COLLISION_FORCE * dt);
        const nx = dx / d;
        const nz = dz / d;
        const half = pushStr * 0.5;

        a.x -= nx * half;
        a.z -= nz * half;
        b.x += nx * half;
        b.z += nz * half;
      } else if (d <= 0.01) {
        const angle = Math.random() * Math.PI * 2;
        const nudge = 2;
        a.x += Math.cos(angle) * nudge;
        a.z += Math.sin(angle) * nudge;
      }
    }
  }

  // --- Tile validity pass: prevent units from overlapping blocked tiles ---
  // After movement AND collision separation, revert any unit pushed onto
  // an obstacle, building, or wall tile back to its pre-frame position.
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.alive || u.isAir) continue;

    // Clamp to map bounds
    u.x = Math.max(1, Math.min(u.x, GRID_COLS * TILE_SIZE - 1));
    u.z = Math.max(1, Math.min(u.z, GRID_ROWS * TILE_SIZE - 1));

    const col = Math.floor(u.x / TILE_SIZE);
    const row = Math.floor(u.z / TILE_SIZE);
    const tile = getTile(col, row);

    if (tile !== TILE_EMPTY && tile !== TILE_PATH) {
      // Unit is on a blocked tile (obstacle, building, or wall)
      // Revert to pre-frame position if that position was valid
      const prevCol = Math.floor(u._prevX / TILE_SIZE);
      const prevRow = Math.floor(u._prevZ / TILE_SIZE);
      const prevTile = getTile(prevCol, prevRow);

      if (prevTile === TILE_EMPTY || prevTile === TILE_PATH) {
        u.x = u._prevX;
        u.z = u._prevZ;
      }
      // If prev was also blocked (unit just spawned inside its own building),
      // leave it alone — it will walk out via pathfinding next frame.
    }
  }

  _frameCount++;
}

/** Return all alive units. */
export function getUnits() {
  if (_dirty) {
    _aliveCache = units.filter(u => u.alive);
    _dirty = false;
    _getCalls = 0;
  }
  // Periodically compact the backing array to remove dead entries
  _getCalls++;
  if (_getCalls % 60 === 0) {
    units = units.filter(u => u.alive);
  }
  return _aliveCache;
}

/** Mark a unit as dead. */
export function removeUnit(u) {
  u.alive = false;
  _dirty = true;
}

// --- Support unit (Medic/Engineer) movement and healing ---

// Hysteresis: once healing, allow a larger range before breaking off
const HEAL_RANGE_OUTER_MULT = 1.35;
// Follow distance: medics stay this far behind friendlies when no one is injured
const SUPPORT_FOLLOW_DIST = 40;
// Minimum distance before re-pathing to avoid micro-path jitter
const SUPPORT_MIN_REPATH_DIST = 25;
// Smooth approach: slow down when nearing heal range to avoid overshoot jitter
const SUPPORT_APPROACH_SLOW_DIST = 30;
// Rescan interval: how many frames between target rescans (higher = less jitter)
const SUPPORT_RESCAN_INTERVAL = 8;

function updateSupportUnit(u, dt, allUnits, callbacks) {
  // Initialize support-specific tracking state
  if (u._supportLastPathX === undefined) {
    u._supportLastPathX = 0;
    u._supportLastPathZ = 0;
    u._supportFollowId = null;
  }

  const wasHealing = u._healing;
  u._healing = false;

  // Find best heal target: most injured friendly of correct type
  let bestTarget = null;
  let bestMissing = 0;

  const shouldRescan = (u.id % SUPPORT_RESCAN_INTERVAL) === (_frameCount % SUPPORT_RESCAN_INTERVAL);

  // Check if current target is still valid
  if (u._healTargetId != null) {
    let found = false;
    for (let i = 0; i < allUnits.length; i++) {
      const t = allUnits[i];
      if (t.id === u._healTargetId && t.alive && t.hp < t.maxHp) {
        found = true;
        bestTarget = t;
        bestMissing = t.maxHp - t.hp;
        break;
      }
    }
    if (!found) {
      u._healTargetId = null;
      // Clear path when target dies/is fully healed — prevents stale path jitter
      u.path = null;
      u.pathIndex = 0;
    }
  }

  // Rescan for a better target periodically
  if (shouldRescan) {
    let prevBest = bestTarget;
    for (let i = 0; i < allUnits.length; i++) {
      const t = allUnits[i];
      if (!t.alive || t.team !== u.team || t.isSupport) continue;
      if (t.hp >= t.maxHp) continue;
      if (!u.healTargets || !u.healTargets.includes(t.type)) continue;
      const missing = t.maxHp - t.hp;
      if (missing > bestMissing) {
        bestMissing = missing;
        bestTarget = t;
      }
    }
    if (bestTarget && bestTarget !== prevBest) {
      u._healTargetId = bestTarget.id;
      // Clear stale path when switching to a new target
      u.path = null;
      u.pathIndex = 0;
    }
  }

  if (bestTarget) {
    const d = dist(u.x, u.z, bestTarget.x, bestTarget.z);

    // Hysteresis: use a wider range if already healing to prevent start/stop jitter
    const effectiveRange = wasHealing ? (u.healRange * HEAL_RANGE_OUTER_MULT) : u.healRange;

    if (d <= effectiveRange) {
      // In range — heal (don't move, stay put)
      u._healing = true;
      u._healTargetX = bestTarget.x;
      u._healTargetZ = bestTarget.z;
      const healAmount = u.healRate * dt;
      bestTarget.hp = Math.min(bestTarget.maxHp, bestTarget.hp + healAmount);
      // Clear movement path while healing — prevents resume jitter
      u.path = null;
      u.pathIndex = 0;
    } else {
      // Out of range — path toward target, but only repath if target moved significantly
      if (shouldRescan && callbacks && callbacks.findPath) {
        const targetMoved = dist(u._supportLastPathX, u._supportLastPathZ, bestTarget.x, bestTarget.z);
        const needsRepath = !u.path || u.pathIndex >= u.path.length || targetMoved > SUPPORT_MIN_REPATH_DIST;
        if (needsRepath) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          const tGrid = worldToGrid(bestTarget.x, bestTarget.z, TILE_SIZE);
          const newPath = callbacks.findPath(grid.col, grid.row, tGrid.col, tGrid.row);
          if (newPath && newPath.length > 0) {
            u.path = newPath;
            u.pathIndex = 0;
            u._supportLastPathX = bestTarget.x;
            u._supportLastPathZ = bestTarget.z;
          }
        }
      }
    }
  } else {
    // No injured friendlies — follow friendly forces at a comfortable distance
    u._healTargetId = null;
    if (shouldRescan && callbacks && callbacks.findPath) {
      // Find the centroid of nearby heal-compatible friendlies (smoother than tracking one unit)
      let sumX = 0, sumZ = 0, count = 0;
      let closestDist = Infinity;
      for (let i = 0; i < allUnits.length; i++) {
        const t = allUnits[i];
        if (!t.alive || t.team !== u.team || t.isSupport || t.isAir) continue;
        if (!u.healTargets || !u.healTargets.includes(t.type)) continue;
        const d = dist(u.x, u.z, t.x, t.z);
        if (d < closestDist) closestDist = d;
        // Only average units within a reasonable radius
        if (d < 300) {
          sumX += t.x;
          sumZ += t.z;
          count++;
        }
      }
      if (count > 0 && closestDist > SUPPORT_FOLLOW_DIST) {
        const avgX = sumX / count;
        const avgZ = sumZ / count;
        // Path toward centroid but stay behind (offset toward own base)
        const baseRow = u.team === TEAM_PLAYER ? PLAYER_BASE_ROW : ENEMY_BASE_ROW;
        const baseZ = baseRow * TILE_SIZE;
        const toBaseX = 0;
        const toBaseZ = baseZ - avgZ;
        const toBaseLen = Math.abs(toBaseZ) || 1;
        const offsetX = avgX + (toBaseX / toBaseLen) * SUPPORT_FOLLOW_DIST * 0.5;
        const offsetZ = avgZ + (toBaseZ / toBaseLen) * SUPPORT_FOLLOW_DIST * 0.5;

        const targetMoved = dist(u._supportLastPathX, u._supportLastPathZ, offsetX, offsetZ);
        const needsRepath = !u.path || u.pathIndex >= u.path.length || targetMoved > SUPPORT_MIN_REPATH_DIST * 2;
        if (needsRepath) {
          const grid = worldToGrid(u.x, u.z, TILE_SIZE);
          const tGrid = worldToGrid(offsetX, offsetZ, TILE_SIZE);
          // Clamp to grid bounds
          tGrid.col = Math.max(0, Math.min(GRID_COLS - 1, tGrid.col));
          tGrid.row = Math.max(0, Math.min(GRID_ROWS - 1, tGrid.row));
          const newPath = callbacks.findPath(grid.col, grid.row, tGrid.col, tGrid.row);
          if (newPath && newPath.length > 0) {
            u.path = newPath;
            u.pathIndex = 0;
            u._supportLastPathX = offsetX;
            u._supportLastPathZ = offsetZ;
          }
        }
      }
    }
  }

  // Move toward current waypoint — with approach deceleration
  if (u.path && u.pathIndex < u.path.length && !u._healing) {
    const wp = u.path[u.pathIndex];
    const target = gridToWorld(wp.col, wp.row, TILE_SIZE);
    const dx = target.x - u.x;
    const dz = target.z - u.z;
    const d = Math.sqrt(dx * dx + dz * dz);

    if (d < TILE_SIZE / 2) {
      u.pathIndex++;
    } else {
      let moveSpeed = u.speed * dt;
      // Smooth deceleration when approaching a heal target to prevent overshoot
      if (bestTarget) {
        const distToTarget = dist(u.x, u.z, bestTarget.x, bestTarget.z);
        const approachFactor = distToTarget < SUPPORT_APPROACH_SLOW_DIST
          ? 0.4 + 0.6 * (distToTarget / SUPPORT_APPROACH_SLOW_DIST)
          : 1.0;
        moveSpeed *= approachFactor;
      }
      const step = Math.min(moveSpeed, d);
      u.x += (dx / d) * step;
      u.z += (dz / d) * step;
    }
  }
}

// --- Helicopter movement ---

function updateHelicopter(u, dt) {
  // Smoothly drift orbit center toward target rally point
  if (u.targetOrbitX !== undefined) {
    const tdx = u.targetOrbitX - u.orbitX;
    const tdz = u.targetOrbitZ - u.orbitZ;
    const td = Math.sqrt(tdx * tdx + tdz * tdz);
    if (td > 1) {
      const drift = HELI_ORBIT_DRIFT_SPEED * dt;
      if (drift >= td) {
        u.orbitX = u.targetOrbitX;
        u.orbitZ = u.targetOrbitZ;
      } else {
        u.orbitX += (tdx / td) * drift;
        u.orbitZ += (tdz / td) * drift;
      }
    }
  }

  const dx = u.orbitX - u.x;
  const dz = u.orbitZ - u.z;
  const d = Math.sqrt(dx * dx + dz * dz);

  if (d > u.orbitRadius + 20) {
    // Fly toward orbit center
    const step = HELI_APPROACH_SPEED * dt;
    const s = Math.min(step, d);
    u.x += (dx / d) * s;
    u.z += (dz / d) * s;
    u._orbiting = false;
  } else {
    // Entering orbit — seed angle and radius from current position
    if (!u._orbiting) {
      u._orbiting = true;
      u._curOrbitR = Math.max(d, 5); // start at actual distance from center
      u.orbitAngle = Math.atan2(u.z - u.orbitZ, u.x - u.orbitX);
    }
    // Smoothly expand radius toward full orbit radius
    u._curOrbitR += (u.orbitRadius - u._curOrbitR) * Math.min(1, 2 * dt);
    u.orbitAngle += HELI_ORBIT_SPEED * dt;
    u.x = u.orbitX + Math.cos(u.orbitAngle) * u._curOrbitR;
    u.z = u.orbitZ + Math.sin(u.orbitAngle) * u._curOrbitR;
  }
}

/** Set the orbit center (rally point) for a helicopter. */
export function setHelicopterRally(unitId, worldX, worldZ) {
  for (let i = 0; i < units.length; i++) {
    if (units[i].id === unitId && units[i].alive && units[i].isAir) {
      units[i].targetOrbitX = worldX;
      units[i].targetOrbitZ = worldZ;
      return true;
    }
  }
  return false;
}

/** Return all alive helicopter units. */
export function getHelicopters() {
  return units.filter(u => u.alive && u.isAir);
}

/** Find the first enemy wall building along a path. */
function _findFirstWallInPath(path, buildings, unitTeam) {
  const enemyTeam = unitTeam === TEAM_PLAYER ? TEAM_ENEMY : TEAM_PLAYER;
  for (let i = 0; i < path.length; i++) {
    const wp = path[i];
    for (let j = 0; j < buildings.length; j++) {
      const b = buildings[j];
      if (!b.alive || b.type !== BTYPE_WALL || b.team !== enemyTeam) continue;
      if (b.col === wp.col && b.row === wp.row) return b;
    }
  }
  return null;
}

/** Reset all units. */
export function resetUnits() {
  units = [];
  _dirty = true;
  _aliveCache = [];
  _getCalls = 0;
}
