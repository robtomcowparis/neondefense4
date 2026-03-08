// ============================================================
// path.js — A* pathfinding system
// ============================================================
import { getTile } from './map.js';
import {
  GRID_COLS, GRID_ROWS,
  TILE_EMPTY, TILE_PATH, TILE_WALL,
  PATH_CACHE_TTL, PATH_BUDGET_PER_FRAME,
  WALL_TRAVERSAL_COST,
} from './config.js';

const GRID_SIZE = GRID_COLS * GRID_ROWS; // 1600

// --- Pre-allocated typed arrays for A* internals ---
const _gScore = new Float32Array(GRID_SIZE);
const _cameFrom = new Int16Array(GRID_SIZE);
const _closed = new Uint8Array(GRID_SIZE);

// --- Path cache ---
const _pathCache = new Map();
let _realTime = 0;
let _frameBudget = 0;

// --- Simple dirty flag: set by markTileDirty, clears cache in beginPathFrame ---
let _dirty = false;

/** Clear the entire path cache (call when grid topology changes). */
export function invalidatePathCache() {
  _pathCache.clear();
}

/**
 * Mark a tile as dirty. Cache will be fully cleared next frame.
 */
export function markTileDirty(col, row) {
  _dirty = true;
}

/**
 * Call once per frame before any pathfinding. Resets budget, advances time.
 * @param {number} dt - frame delta time in seconds
 */
export function beginPathFrame(dt) {
  if (dt === undefined) dt = 1 / 60;
  _frameBudget = 0;
  _realTime += dt;

  // Clear entire cache if any tile changed
  if (_dirty) {
    _pathCache.clear();
    _dirty = false;
  }
}

/** Check cache for a path. Returns path directly or undefined. */
function _cacheGet(key) {
  const entry = _pathCache.get(key);
  if (!entry) return undefined;

  if (_realTime - entry.time > PATH_CACHE_TTL) {
    _pathCache.delete(key);
    return undefined;
  }

  return entry.path;
}

/** Store a computed path in cache. */
function _cacheSet(key, path) {
  if (path) {
    _pathCache.set(key, { path, time: _realTime });
  }
}

/** Returns true if frame budget is exhausted. */
function _budgetExhausted() {
  return _frameBudget >= PATH_BUDGET_PER_FRAME;
}

// --- Heuristic: octile distance for 8-directional movement ---
function heuristic(c1, r1, c2, r2) {
  const dx = Math.abs(c1 - c2);
  const dy = Math.abs(r1 - r2);
  return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy);
}

// --- 8-directional neighbor offsets ---
const DIRS = [
  { dc: 0, dr: -1, cost: 1 },          // 0: N
  { dc: 0, dr: 1, cost: 1 },           // 1: S
  { dc: -1, dr: 0, cost: 1 },          // 2: W
  { dc: 1, dr: 0, cost: 1 },           // 3: E
  { dc: -1, dr: -1, cost: Math.SQRT2 }, // 4: NW
  { dc: 1, dr: -1, cost: Math.SQRT2 },  // 5: NE
  { dc: -1, dr: 1, cost: Math.SQRT2 },  // 6: SW
  { dc: 1, dr: 1, cost: Math.SQRT2 },   // 7: SE
];

function getNeighbors(col, row) {
  return [
    { col: col, row: row - 1 },
    { col: col, row: row + 1 },
    { col: col - 1, row: row },
    { col: col + 1, row: row },
  ].filter(n => n.col >= 0 && n.col < GRID_COLS && n.row >= 0 && n.row < GRID_ROWS);
}

/** Reconstruct path from typed-array _cameFrom. Sentinel = -1. */
function reconstructPath(currentKey) {
  const path = [];
  let k = currentKey;
  while (k !== -1) {
    const col = k % GRID_COLS;
    const row = (k - col) / GRID_COLS;
    path.push({ col, row });
    k = _cameFrom[k];
  }
  path.reverse();
  return path;
}

// --- Path smoothing ---
function _lineWalkable(c0, r0, c1, r1, walkCheck) {
  let dc = Math.abs(c1 - c0);
  let dr = Math.abs(r1 - r0);
  const sc = c0 < c1 ? 1 : -1;
  const sr = r0 < r1 ? 1 : -1;
  let err = dc - dr;
  let c = c0;
  let r = r0;

  while (true) {
    if (!walkCheck(c, r)) return false;
    if (c === c1 && r === r1) break;
    const e2 = 2 * err;
    let movedC = false;
    let movedR = false;
    if (e2 > -dr) {
      err -= dr;
      c += sc;
      movedC = true;
    }
    if (e2 < dc) {
      err += dc;
      r += sr;
      movedR = true;
    }
    // Diagonal step: check both orthogonal intermediates to prevent corner-cutting
    // (matches the same check A* does for diagonal neighbors)
    if (movedC && movedR) {
      if (!walkCheck(c - sc, r) || !walkCheck(c, r - sr)) return false;
    }
  }
  return true;
}

function _isWalkable(c, r) {
  if (c < 0 || c >= GRID_COLS || r < 0 || r >= GRID_ROWS) return false;
  const tile = getTile(c, r);
  return tile === TILE_EMPTY || tile === TILE_PATH;
}

function smoothPath(path) {
  if (!path || path.length <= 2) return path;

  const result = [path[0]];
  let i = 0;

  while (i < path.length - 1) {
    let furthest = i + 1;
    for (let j = path.length - 1; j > i + 1; j--) {
      if (_lineWalkable(path[i].col, path[i].row, path[j].col, path[j].row, _isWalkable)) {
        furthest = j;
        break;
      }
    }
    result.push(path[furthest]);
    i = furthest;
  }

  return result;
}

// ================================================================
// findPath — standard A* (cached, smoothed)
// ================================================================

export function findPath(startCol, startRow, goalCol, goalRow) {
  if (startCol < 0 || startCol >= GRID_COLS || startRow < 0 || startRow >= GRID_ROWS) return null;
  if (goalCol < 0 || goalCol >= GRID_COLS || goalRow < 0 || goalRow >= GRID_ROWS) return null;

  const cacheKey = `${startCol},${startRow},${goalCol},${goalRow}`;
  const cached = _cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  if (_budgetExhausted()) return null;

  const goalTile = getTile(goalCol, goalRow);
  if (goalTile !== TILE_EMPTY && goalTile !== TILE_PATH) {
    const neighbors = getNeighbors(goalCol, goalRow);
    let bestPath = null;
    for (const n of neighbors) {
      const tile = getTile(n.col, n.row);
      if (tile === TILE_EMPTY || tile === TILE_PATH) {
        _frameBudget++;
        const p = astar(startCol, startRow, n.col, n.row);
        if (p && (!bestPath || p.length < bestPath.length)) {
          bestPath = p;
        }
      }
    }
    const smoothed = bestPath ? smoothPath(bestPath) : bestPath;
    _cacheSet(cacheKey, smoothed);
    return smoothed;
  }

  _frameBudget++;
  const result = astar(startCol, startRow, goalCol, goalRow);
  const smoothed = result ? smoothPath(result) : result;
  _cacheSet(cacheKey, smoothed);
  return smoothed;
}

function astar(startCol, startRow, goalCol, goalRow) {
  const startKey = startRow * GRID_COLS + startCol;
  const goalKey = goalRow * GRID_COLS + goalCol;

  if (startKey === goalKey) return [{ col: startCol, row: startRow }];

  // Reset typed arrays
  _gScore.fill(Infinity);
  _cameFrom.fill(-1);
  _closed.fill(0);

  _gScore[startKey] = 0;

  const open = _acquireHeap();
  open.push(startKey, heuristic(startCol, startRow, goalCol, goalRow));

  while (open.size() > 0) {
    const currentKey = open.pop();

    if (_closed[currentKey]) continue;

    if (currentKey === goalKey) {
      _releaseHeap(open);
      return reconstructPath(currentKey);
    }

    _closed[currentKey] = 1;

    const currentCol = currentKey % GRID_COLS;
    const currentRow = (currentKey - currentCol) / GRID_COLS;

    for (let di = 0; di < 8; di++) {
      const d = DIRS[di];
      const nc = currentCol + d.dc;
      const nr = currentRow + d.dr;

      if (nc < 0 || nc >= GRID_COLS || nr < 0 || nr >= GRID_ROWS) continue;

      const tile = getTile(nc, nr);
      if (tile !== TILE_EMPTY && tile !== TILE_PATH) continue;

      // Corner-cutting prevention for diagonals
      if (d.cost > 1) {
        const adj1 = getTile(currentCol + d.dc, currentRow);
        const adj2 = getTile(currentCol, currentRow + d.dr);
        if ((adj1 !== TILE_EMPTY && adj1 !== TILE_PATH) ||
            (adj2 !== TILE_EMPTY && adj2 !== TILE_PATH)) continue;
      }

      const nKey = nr * GRID_COLS + nc;
      if (_closed[nKey]) continue;

      const tentG = _gScore[currentKey] + d.cost;

      if (tentG < _gScore[nKey]) {
        _cameFrom[nKey] = currentKey;
        _gScore[nKey] = tentG;
        const f = tentG + heuristic(nc, nr, goalCol, goalRow);
        open.push(nKey, f);
      }
    }
  }

  _releaseHeap(open);
  return null;
}


// ================================================================
// findPathThroughWalls — wall-aware A* (cached, NOT smoothed)
// ================================================================

export function findPathThroughWalls(startCol, startRow, goalCol, goalRow, wallCostFn) {
  if (startCol < 0 || startCol >= GRID_COLS || startRow < 0 || startRow >= GRID_ROWS) return null;
  if (goalCol < 0 || goalCol >= GRID_COLS || goalRow < 0 || goalRow >= GRID_ROWS) return null;

  const cacheKey = `tw${startCol},${startRow},${goalCol},${goalRow}`;
  const cached = _cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  if (_budgetExhausted()) return null;

  const goalTile = getTile(goalCol, goalRow);
  const goalWalkable = goalTile === TILE_EMPTY || goalTile === TILE_PATH || goalTile === TILE_WALL;
  if (!goalWalkable) {
    const neighbors = getNeighbors(goalCol, goalRow);
    let bestPath = null;
    for (const n of neighbors) {
      const tile = getTile(n.col, n.row);
      if (tile === TILE_EMPTY || tile === TILE_PATH || tile === TILE_WALL) {
        _frameBudget++;
        const p = astarThroughWalls(startCol, startRow, n.col, n.row, wallCostFn);
        if (p && (!bestPath || p.length < bestPath.length)) {
          bestPath = p;
        }
      }
    }
    _cacheSet(cacheKey, bestPath);
    return bestPath;
  }

  _frameBudget++;
  const result = astarThroughWalls(startCol, startRow, goalCol, goalRow, wallCostFn);
  _cacheSet(cacheKey, result);
  return result;
}

function astarThroughWalls(startCol, startRow, goalCol, goalRow, wallCostFn) {
  const startKey = startRow * GRID_COLS + startCol;
  const goalKey = goalRow * GRID_COLS + goalCol;

  if (startKey === goalKey) return [{ col: startCol, row: startRow }];

  _gScore.fill(Infinity);
  _cameFrom.fill(-1);
  _closed.fill(0);

  _gScore[startKey] = 0;

  const open = _acquireHeap();
  open.push(startKey, heuristic(startCol, startRow, goalCol, goalRow));

  while (open.size() > 0) {
    const currentKey = open.pop();

    if (_closed[currentKey]) continue;

    if (currentKey === goalKey) {
      _releaseHeap(open);
      return reconstructPath(currentKey);
    }

    _closed[currentKey] = 1;

    const currentCol = currentKey % GRID_COLS;
    const currentRow = (currentKey - currentCol) / GRID_COLS;

    for (let di = 0; di < 8; di++) {
      const d = DIRS[di];
      const nc = currentCol + d.dc;
      const nr = currentRow + d.dr;

      if (nc < 0 || nc >= GRID_COLS || nr < 0 || nr >= GRID_ROWS) continue;

      const tile = getTile(nc, nr);
      if (tile !== TILE_EMPTY && tile !== TILE_PATH && tile !== TILE_WALL) continue;

      if (d.cost > 1) {
        const adj1Tile = getTile(currentCol + d.dc, currentRow);
        const adj2Tile = getTile(currentCol, currentRow + d.dr);
        const adj1Ok = adj1Tile === TILE_EMPTY || adj1Tile === TILE_PATH || adj1Tile === TILE_WALL;
        const adj2Ok = adj2Tile === TILE_EMPTY || adj2Tile === TILE_PATH || adj2Tile === TILE_WALL;
        if (!adj1Ok || !adj2Ok) continue;
      }

      const nKey = nr * GRID_COLS + nc;
      if (_closed[nKey]) continue;

      let stepCost = d.cost;
      if (tile === TILE_WALL) {
        stepCost += wallCostFn ? wallCostFn(nc, nr) : WALL_TRAVERSAL_COST;
      }

      const tentG = _gScore[currentKey] + stepCost;

      if (tentG < _gScore[nKey]) {
        _cameFrom[nKey] = currentKey;
        _gScore[nKey] = tentG;
        const f = tentG + heuristic(nc, nr, goalCol, goalRow);
        open.push(nKey, f);
      }
    }
  }

  _releaseHeap(open);
  return null;
}

// ================================================================
// MinHeap
// ================================================================

class MinHeap {
  constructor() {
    this._data = [];
  }

  size() { return this._data.length; }

  reset() {
    this._data.length = 0;
  }

  push(key, f) {
    this._data.push({ key, f });
    this._bubbleUp(this._data.length - 1);
  }

  pop() {
    const top = this._data[0];
    const last = this._data.pop();
    if (this._data.length > 0) {
      this._data[0] = last;
      this._sinkDown(0);
    }
    return top.key;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this._data[i].f < this._data[parent].f) {
        [this._data[i], this._data[parent]] = [this._data[parent], this._data[i]];
        i = parent;
      } else break;
    }
  }

  _sinkDown(i) {
    const n = this._data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this._data[left].f < this._data[smallest].f) smallest = left;
      if (right < n && this._data[right].f < this._data[smallest].f) smallest = right;
      if (smallest !== i) {
        [this._data[i], this._data[smallest]] = [this._data[smallest], this._data[i]];
        i = smallest;
      } else break;
    }
  }
}

// --- MinHeap pool ---
const _heapPool = [];

function _acquireHeap() {
  if (_heapPool.length > 0) return _heapPool.pop();
  return new MinHeap();
}

function _releaseHeap(h) {
  h.reset();
  _heapPool.push(h);
}
