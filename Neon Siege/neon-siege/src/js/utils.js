// ============================================================
// utils.js — Shared math helpers
// ============================================================

export function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function dist(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dz * dz);
}

export function dist2(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  return dx * dx + dz * dz;
}

export function angle(x1, z1, x2, z2) {
  return Math.atan2(z2 - z1, x2 - x1);
}

export function gridToWorld(col, row, tileSize) {
  return {
    x: col * tileSize + tileSize / 2,
    z: row * tileSize + tileSize / 2,
  };
}

export function worldToGrid(x, z, tileSize) {
  return {
    col: Math.floor(x / tileSize),
    row: Math.floor(z / tileSize),
  };
}

let _nextId = 1;
export function nextId() {
  return _nextId++;
}

export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
  return Math.floor(randomRange(min, max + 1));
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Lightweight spatial hash for O(n) broad-phase collision detection.
 * Insert entities with {x, z} positions, then query nearby entities.
 */
export class SpatialHash {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cells = new Map();
    this._queryBuf = [];
  }

  _key(cx, cz) {
    return cx * 73856093 ^ cz * 19349663; // fast hash combine
  }

  clear() {
    this.cells.clear();
  }

  insert(entity) {
    const cx = Math.floor(entity.x / this.cellSize);
    const cz = Math.floor(entity.z / this.cellSize);
    const k = this._key(cx, cz);
    let bucket = this.cells.get(k);
    if (!bucket) {
      bucket = [];
      this.cells.set(k, bucket);
    }
    bucket.push(entity);
  }

  /** Query all entities in the cell of (x,z) and its 8 neighbors.
   *  Returns a reused internal buffer — caller must consume before next queryNear call. */
  queryNear(x, z) {
    const cx = Math.floor(x / this.cellSize);
    const cz = Math.floor(z / this.cellSize);
    this._queryBuf.length = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const bucket = this.cells.get(this._key(cx + dx, cz + dz));
        if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
            this._queryBuf.push(bucket[i]);
          }
        }
      }
    }
    return this._queryBuf;
  }

  /** Iterate all entities near (x,z) via callback — zero allocation. */
  forEachNear(x, z, fn) {
    const cx = Math.floor(x / this.cellSize);
    const cz = Math.floor(z / this.cellSize);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const bucket = this.cells.get(this._key(cx + dx, cz + dz));
        if (bucket) {
          for (let i = 0; i < bucket.length; i++) {
            fn(bucket[i]);
          }
        }
      }
    }
  }
}
