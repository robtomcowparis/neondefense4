// ============================================================
// map.js — Grid/tile management, obstacle generation, buildable checks
// ============================================================
import {
  GRID_COLS, GRID_ROWS, TILE_SIZE,
  TILE_EMPTY, TILE_OBSTACLE, TILE_BUILDING, TILE_WALL,
  PLAYER_BUILD_ROW_MIN, PLAYER_BUILD_ROW_MAX,
  ENEMY_BUILD_ROW_MIN, ENEMY_BUILD_ROW_MAX,
  SHARED_BUILD_ROW_MIN, SHARED_BUILD_ROW_MAX,
  PLAYER_BASE_ROW, ENEMY_BASE_ROW,
  PLAYER_BASE_COL, ENEMY_BASE_COL,
  OBSTACLE_KINDS,
  OBSTACLE_COUNT_MIN, OBSTACLE_COUNT_MAX,
  OBSTACLE_PLACEMENT_RETRIES,
  OBSTACLE_BASE_COLORS,
  OBSTACLE_MIN_ROW, OBSTACLE_MAX_ROW,
  OBSTACLE_MIN_COL, OBSTACLE_MAX_COL,
  OBSTACLE_BASE_EXCLUSION,
  TEAM_PLAYER, TEAM_ENEMY,
  SHARED_ZONE_UNIT_RADIUS,
} from './config.js';
import { findPath, markTileDirty } from './path.js';

// Internal 2D grid: grid[row][col]
let grid = [];

// Shared zone unit proximity check — set by main.js at init
// Signature: (col, row, size, team) => boolean
let _sharedZoneUnitCheck = null;

/** Register a callback that checks whether a team has a ground unit near a shared-zone tile. */
export function setSharedZoneUnitCheck(fn) {
  _sharedZoneUnitCheck = fn;
}

// Typed obstacle data objects
let obstacleDataList = [];

/** Weighted random type selection. */
function pickKind() {
  const roll = Math.random();
  let cumulative = 0;
  for (const def of OBSTACLE_KINDS) {
    cumulative += def.weight;
    if (roll < cumulative) return def;
  }
  return OBSTACLE_KINDS[0];
}

/** Try to place a single typed obstacle. Returns obstacle data or null. */
function tryPlaceObstacle(id) {
  const def = pickKind();

  // Random orientation flip for multi-cell kinds
  let cellsW = def.cellsW;
  let cellsD = def.cellsD;
  if (cellsW !== cellsD && Math.random() < 0.5) {
    cellsW = def.cellsD;
    cellsD = def.cellsW;
  }

  for (let attempt = 0; attempt < OBSTACLE_PLACEMENT_RETRIES; attempt++) {
    const col = OBSTACLE_MIN_COL + Math.floor(Math.random() * (OBSTACLE_MAX_COL - OBSTACLE_MIN_COL - cellsW + 2));
    const row = OBSTACLE_MIN_ROW + Math.floor(Math.random() * (OBSTACLE_MAX_ROW - OBSTACLE_MIN_ROW - cellsD + 2));

    // Check all cells are empty, in bounds, and not within base exclusion zones
    let fits = true;
    for (let dc = 0; dc < cellsW && fits; dc++) {
      for (let dr = 0; dr < cellsD && fits; dr++) {
        const c = col + dc;
        const r = row + dr;
        if (c < OBSTACLE_MIN_COL || c > OBSTACLE_MAX_COL ||
            r < OBSTACLE_MIN_ROW || r > OBSTACLE_MAX_ROW) {
          fits = false;
        } else if (grid[r][c] !== TILE_EMPTY) {
          fits = false;
        } else if (
          Math.abs(c - PLAYER_BASE_COL) <= OBSTACLE_BASE_EXCLUSION &&
          Math.abs(r - PLAYER_BASE_ROW) <= OBSTACLE_BASE_EXCLUSION
        ) {
          fits = false;
        } else if (
          Math.abs(c - ENEMY_BASE_COL) <= OBSTACLE_BASE_EXCLUSION &&
          Math.abs(r - ENEMY_BASE_ROW) <= OBSTACLE_BASE_EXCLUSION
        ) {
          fits = false;
        }
      }
    }
    if (!fits) continue;

    // Mark cells
    for (let dc = 0; dc < cellsW; dc++) {
      for (let dr = 0; dr < cellsD; dr++) {
        grid[row + dr][col + dc] = TILE_OBSTACLE;
      }
    }

    const height = def.heightMin + Math.random() * (def.heightMax - def.heightMin);
    const color = OBSTACLE_BASE_COLORS[Math.floor(Math.random() * OBSTACLE_BASE_COLORS.length)];

    return {
      id: `obs-${id}`,
      kind: def.kind,
      col,
      row,
      cellsW,
      cellsD,
      height,
      color,
      aabb: {
        min: { x: col * TILE_SIZE, y: 0, z: row * TILE_SIZE },
        max: { x: (col + cellsW) * TILE_SIZE, y: height, z: (row + cellsD) * TILE_SIZE },
      },
    };
  }

  return null;
}

/** Undo obstacle placement — unmark its grid cells. */
function undoObstacle(obs) {
  for (let dc = 0; dc < obs.cellsW; dc++) {
    for (let dr = 0; dr < obs.cellsD; dr++) {
      grid[obs.row + dr][obs.col + dc] = TILE_EMPTY;
    }
  }
}

/** Reset and generate a new map with typed obstacles. */
export function createMap() {
  // Init empty grid
  grid = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    grid[r] = new Array(GRID_COLS).fill(TILE_EMPTY);
  }

  obstacleDataList = [];

  const count = OBSTACLE_COUNT_MIN + Math.floor(Math.random() * (OBSTACLE_COUNT_MAX - OBSTACLE_COUNT_MIN + 1));
  let nextId = 0;

  for (let i = 0; i < count; i++) {
    const obs = tryPlaceObstacle(nextId);
    if (!obs) continue;

    // Verify path still exists between bases
    const pathCheck = findPath(
      Math.floor(GRID_COLS / 2), PLAYER_BASE_ROW,
      Math.floor(GRID_COLS / 2), ENEMY_BASE_ROW
    );

    if (pathCheck) {
      obstacleDataList.push(obs);
      nextId++;
    } else {
      undoObstacle(obs);
    }
  }
}

/** Get tile value at (col, row). Returns TILE_OBSTACLE for out of bounds. */
export function getTile(col, row) {
  if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) {
    return TILE_OBSTACLE; // treat out-of-bounds as blocked
  }
  return grid[row][col];
}

/** Set tile value at (col, row). Marks tile dirty for zone-based cache invalidation. */
export function setTile(col, row, value) {
  if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return;
  if (grid[row][col] !== value) {
    grid[row][col] = value;
    markTileDirty(col, row);
  }
}

/**
 * Check if a size x size area at (col, row) is buildable for a given team.
 * All tiles must be TILE_EMPTY and within the team's build zone.
 */
export function isBuildable(col, row, size, team) {
  let anyShared = false;
  for (let r = row; r < row + size; r++) {
    for (let c = col; c < col + size; c++) {
      // Bounds check
      if (c < 0 || c >= GRID_COLS || r < 0 || r >= GRID_ROWS) return false;
      // Build zone check — team zone or neutral zones
      if (!isInBuildZone(r, team)) return false;
      // Tile must be empty (walls and buildings block placement)
      if (grid[r][c] !== TILE_EMPTY) return false;
      // Track if any tile falls in the shared zone
      if (r >= SHARED_BUILD_ROW_MIN && r <= SHARED_BUILD_ROW_MAX) anyShared = true;
    }
  }
  // Shared zone requires a nearby friendly ground unit
  if (anyShared && _sharedZoneUnitCheck) {
    if (!_sharedZoneUnitCheck(col, row, size, team)) return false;
  }
  return true;
}

function isInBuildZone(row, team) {
  // Team-specific zones
  if (team === TEAM_PLAYER && row >= PLAYER_BUILD_ROW_MIN && row <= PLAYER_BUILD_ROW_MAX) return true;
  if (team === TEAM_ENEMY && row >= ENEMY_BUILD_ROW_MIN && row <= ENEMY_BUILD_ROW_MAX) return true;
  // Shared zone — both teams can build
  if (row >= SHARED_BUILD_ROW_MIN && row <= SHARED_BUILD_ROW_MAX) return true;
  return false;
}

/** Return array of {col, row} for all obstacle tiles (backward compat). */
export function getObstacles() {
  const obstacles = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c] === TILE_OBSTACLE) {
        obstacles.push({ col: c, row: r });
      }
    }
  }
  return obstacles;
}

/** Return the array of typed obstacle data objects. */
export function getObstacleData() {
  return obstacleDataList;
}

/**
 * Count player vs enemy buildings in the shared build zone.
 * Used by economy for territory income bonuses.
 */
export function getSharedZoneControl(buildings) {
  let player = 0, enemy = 0;
  for (const b of buildings) {
    if (!b.alive) continue;
    if (b.row >= SHARED_BUILD_ROW_MIN && b.row <= SHARED_BUILD_ROW_MAX) {
      if (b.team === TEAM_PLAYER) player++;
      else if (b.team === TEAM_ENEMY) enemy++;
    }
  }
  return { player, enemy };
}
