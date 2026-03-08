# Neon Tanks -- Obstacle System Extraction Guide

This document extracts and explains the complete obstacle system from Neon Tanks so it can be ported to another Three.js game. The obstacle system consists of 6 subsystems:

1. **Grid system** -- spatial grid that obstacles occupy
2. **Obstacle generation** -- procedural placement with weighted random types
3. **Material system** -- 3-tier neon material factories + 10 mesh builders
4. **Collision detection** -- tank-obstacle and projectile-obstacle physics
5. **Destructible obstacles** -- HP, damage, destruction, grid freeing
6. **Render lifecycle** -- spawning/removing Three.js meshes

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [1. Grid System (grid.js)](#1-grid-system-gridjs)
- [2. Obstacle Generation (obstacles.js)](#2-obstacle-generation-obstaclesjs)
- [3. Material System & Mesh Builders (materials.js)](#3-material-system--mesh-builders-materialsjs)
- [4. Collision System (collisionSystem.js & projectileSystem.js)](#4-collision-system)
- [5. Destructible Obstacles (environmentEvents.js)](#5-destructible-obstacles-environmenteventsjs)
- [6. Render Lifecycle (scene.js)](#6-render-lifecycle-scenejs)
- [7. Integration Guide](#7-integration-guide)

---

## Architecture Overview

Obstacles are data-first entities. A plain JS object describes each obstacle (type, position, AABB, HP, collision shapes). The render mesh is created separately and tracked by ID. This separation means you can run obstacle logic without Three.js for server/headless use.

**Data flow:**
```
roundManager.js calls generateObstacles()
  -> obstacles.js picks types, places on grid, returns obstacle data objects
  -> main.js iterates obstacles, calls spawnObstacleRender() for each
  -> scene.js creates Three.js mesh via createObstacleMesh() from materials.js
  -> collisionSystem.js resolves tank physics against obstacle AABBs/hitShapes
  -> projectileSystem.js tests projectile hits against obstacle hitShapes
  -> environmentEvents.js handles damage/destruction, frees grid cells
  -> scene.js removes mesh on destruction
```

---

## 1. Grid System (grid.js)

The grid is a 2D boolean array that tracks which cells are passable. Obstacles mark cells as blocked. Used for pathfinding (A*) and spawn placement.

```js
// grid.js -- Grid system for world navigation and obstacle placement

export const MAP_W = 1920;
export const MAP_H = 1440;
export const GRID_CELL = 40;
export const GRID_COLS = MAP_W / GRID_CELL;  // 48
export const GRID_ROWS = MAP_H / GRID_CELL;  // 36

/**
 * Convert world-space (x, z) to grid column and row.
 * Clamps to valid grid range.
 */
export function worldToGrid(x, z) {
  const c = Math.floor(x / GRID_CELL);
  const r = Math.floor(z / GRID_CELL);
  return {
    c: Math.max(0, Math.min(GRID_COLS - 1, c)),
    r: Math.max(0, Math.min(GRID_ROWS - 1, r)),
  };
}

/**
 * Convert grid (col, row) to world-space center of that cell.
 * Returns { x, y, z } where y = 0 (ground plane).
 */
export function gridToWorld(c, r) {
  return {
    x: c * GRID_CELL + GRID_CELL / 2,
    y: 0,
    z: r * GRID_CELL + GRID_CELL / 2,
  };
}

/**
 * Check if a grid cell is blocked (impassable).
 */
export function isBlocked(grid, c, r) {
  if (c < 0 || c >= GRID_COLS || r < 0 || r >= GRID_ROWS) return true;
  return grid.blocked[r][c];
}

/**
 * Set a grid cell's blocked state.
 */
export function setBlocked(grid, c, r, val) {
  if (c < 0 || c >= GRID_COLS || r < 0 || r >= GRID_ROWS) return;
  grid.blocked[r][c] = val;
}

/**
 * Create a fresh grid object with all cells unblocked.
 */
export function createGrid() {
  const blocked = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    blocked.push(new Array(GRID_COLS).fill(false));
  }
  return {
    cell: GRID_CELL,
    cols: GRID_COLS,
    rows: GRID_ROWS,
    blocked,
  };
}
```

**How it fits:** The grid is created once per match. `generateObstacles()` calls `setBlocked()` for each cell an obstacle occupies. When a destructible obstacle is destroyed, those cells are unblocked. AI pathfinding reads `grid.blocked` for A* navigation.

**To port:** Adjust `MAP_W`, `MAP_H`, and `GRID_CELL` to match your map size. Everything else adapts automatically since `GRID_COLS` and `GRID_ROWS` are derived.

---

## 2. Obstacle Generation (obstacles.js)

This is the core obstacle logic. It defines 10 obstacle types with weighted random selection, handles multi-cell obstacles, random orientation, and computes per-type collision shapes.

```js
// obstacles.js -- Procedural obstacle generation

import { GRID_CELL, GRID_COLS, GRID_ROWS, gridToWorld, setBlocked } from './grid.js';

// Obstacle count ranges per tier (difficulty scaling)
const OBSTACLE_COUNTS = {
  1: { min: 140, max: 175 },
  2: { min: 175, max: 225 },
  3: { min: 215, max: 280 },
};

// Kind definitions with sizing
const KINDS = [
  {
    kind: 'tesla_coil',
    cellsW: 1, cellsD: 1,         // Grid footprint in cells
    heightMin: 30, heightMax: 55,  // Random height range (world units)
    weight: 0.12,                  // Spawn probability weight (all weights sum to 1.0)
    hpCategory: 'large',           // HP tier when destructible
  },
  {
    kind: 'power_cell',
    cellsW: 1, cellsD: 1,
    heightMin: 16, heightMax: 32,
    weight: 0.12,
    hpCategory: 'small',
  },
  {
    kind: 'circuit_monolith',
    cellsW: 1, cellsD: 1,
    heightMin: 14, heightMax: 30,
    weight: 0.15,
    hpCategory: 'small',
  },
  {
    kind: 'capacitor_bank',
    cellsW: 2, cellsD: 1,          // 2x1 multi-cell obstacle
    heightMin: 14, heightMax: 28,
    weight: 0.10,
    hpCategory: 'medium',
  },
  {
    kind: 'relay_tower',
    cellsW: 1, cellsD: 1,
    heightMin: 50, heightMax: 85,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'data_obelisk',
    cellsW: 1, cellsD: 1,
    heightMin: 22, heightMax: 42,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'plasma_conduit',
    cellsW: 2, cellsD: 1,
    heightMin: 10, heightMax: 20,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'power_pylon',
    cellsW: 1, cellsD: 1,
    heightMin: 60, heightMax: 100,  // Tallest structure
    weight: 0.08,
    hpCategory: 'large',
  },
  {
    kind: 'transformer_stack',
    cellsW: 1, cellsD: 1,
    heightMin: 20, heightMax: 38,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'cable_rack',
    cellsW: 3, cellsD: 1,          // 3x1 multi-cell obstacle
    heightMin: 15, heightMax: 25,
    weight: 0.07,
    hpCategory: 'medium',
  },
];

// Neon obstacle color palette (dark structural base colors)
const OBSTACLE_COLORS = [
  '#0a1628', '#0c1a30', '#0e1e38', '#101828',
];

// Warmer/brighter colors for destructible obstacles (slightly lighter)
const DESTRUCTIBLE_COLORS = [
  '#1a2840', '#1c2a44', '#1e2c48', '#202e4c',
];

// HP values by obstacle category
const DESTRUCTIBLE_HP = {
  small: 60,    // power_cell, circuit_monolith
  medium: 100,  // capacitor_bank, plasma_conduit, transformer_stack, cable_rack
  large: 150,   // tesla_coil, relay_tower, data_obelisk, power_pylon
};
```

### Hit Shapes

Each obstacle type has custom collision shapes that approximate its actual geometry (cylinders for round things, boxes for rectangular). This gives much better collision feel than using the full grid-cell AABB.

```js
/**
 * Compute tight projectile collision shapes per obstacle kind.
 * Returns array of { type: 'box'|'cylinder', ...params }.
 *
 * Box shape:     { type: 'box', min: {x,y,z}, max: {x,y,z} }
 * Cylinder shape: { type: 'cylinder', cx, cz, radius, yMin, yMax }
 */
function computeHitShapes(kind, height, aabb) {
  const cx = (aabb.min.x + aabb.max.x) / 2;
  const cz = (aabb.min.z + aabb.max.z) / 2;
  const fpX = aabb.max.x - aabb.min.x;
  const fpZ = aabb.max.z - aabb.min.z;
  const minFp = Math.min(fpX, fpZ);

  switch (kind) {
    case 'tesla_coil': {
      // Tapered cylinder shaft with wider base platform
      const r = minFp * 0.35;
      return [
        { type: 'cylinder', cx, cz, radius: r * 1.4, yMin: 0, yMax: 3 },
        { type: 'cylinder', cx, cz, radius: r, yMin: 3, yMax: height + 3 },
      ];
    }
    case 'power_cell': {
      const r = minFp * 0.4 * 1.15;
      return [
        { type: 'cylinder', cx, cz, radius: r, yMin: 0, yMax: height + 2 },
      ];
    }
    case 'circuit_monolith': {
      const hx = (fpX - 2) / 2;
      const hz = (fpZ - 2) / 2;
      return [
        { type: 'box', min: { x: cx - hx, y: 0, z: cz - hz },
                        max: { x: cx + hx, y: height + 2, z: cz + hz } },
      ];
    }
    case 'capacitor_bank': {
      // Two parallel cylinders on a base plate
      const longAxis = Math.max(fpX, fpZ);
      const shortAxis = Math.min(fpX, fpZ);
      const capR = shortAxis * 0.35;
      const capQw = longAxis * 0.25;
      const isXLong = fpX >= fpZ;
      const bpHx = (longAxis - 2) / 2;
      const bpHz = (shortAxis - 2) / 2;
      const shapes = [
        { type: 'box', min: { x: cx - bpHx, y: 0, z: cz - bpHz },
                        max: { x: cx + bpHx, y: 1.5, z: cz + bpHz } },
      ];
      for (const side of [-1, 1]) {
        const ccx = cx + (isXLong ? side * capQw : 0);
        const ccz = cz + (isXLong ? 0 : side * capQw);
        shapes.push({ type: 'cylinder', cx: ccx, cz: ccz,
                       radius: capR, yMin: 1.5, yMax: height + 1.5 });
      }
      return shapes;
    }
    case 'relay_tower': {
      const r = minFp * 0.18;
      return [
        { type: 'cylinder', cx, cz, radius: r * 3, yMin: 0, yMax: 2.5 },
        { type: 'cylinder', cx, cz, radius: r, yMin: 2.5, yMax: height + 3 },
      ];
    }
    case 'data_obelisk': {
      const hx = (fpX - 4) / 2;
      const hz = (fpZ - 4) / 2;
      return [
        { type: 'box', min: { x: cx - hx, y: 0, z: cz - hz },
                        max: { x: cx + hx, y: height + 4, z: cz + hz } },
      ];
    }
    case 'plasma_conduit': {
      const pcLong = Math.max(fpX, fpZ);
      const pcShort = Math.min(fpX, fpZ);
      const pcIsXLong = fpX >= fpZ;
      const pipeR = Math.min(height * 0.4, pcShort * 0.3);
      const pipeLen = pcLong - 4;
      const strutOff = pipeLen * 0.3;
      const shapes = [];
      // Two support struts
      for (const side of [-1, 1]) {
        const sx = pcIsXLong ? cx + side * strutOff : cx;
        const sz = pcIsXLong ? cz : cz + side * strutOff;
        shapes.push({
          type: 'box',
          min: { x: sx - 1, y: 0, z: sz - 1 },
          max: { x: sx + 1, y: height * 0.55, z: sz + 1 },
        });
      }
      // Horizontal pipe (approximated as box)
      if (pcIsXLong) {
        shapes.push({
          type: 'box',
          min: { x: cx - pipeLen / 2, y: height * 0.55 - pipeR, z: cz - pipeR },
          max: { x: cx + pipeLen / 2, y: height * 0.55 + pipeR, z: cz + pipeR },
        });
      } else {
        shapes.push({
          type: 'box',
          min: { x: cx - pipeR, y: height * 0.55 - pipeR, z: cz - pipeLen / 2 },
          max: { x: cx + pipeR, y: height * 0.55 + pipeR, z: cz + pipeLen / 2 },
        });
      }
      return shapes;
    }
    case 'power_pylon': {
      const pylonBase = minFp * 0.4;
      const postSpacing = minFp * 0.35;
      return [
        { type: 'cylinder', cx, cz, radius: pylonBase, yMin: 0, yMax: 3 },
        { type: 'cylinder', cx, cz, radius: postSpacing * 0.5 + 1, yMin: 3, yMax: height },
      ];
    }
    case 'transformer_stack': {
      const r = minFp * 0.38;
      return [
        { type: 'cylinder', cx, cz, radius: r * 1.2, yMin: 0, yMax: 3 },
        { type: 'cylinder', cx, cz, radius: r, yMin: 3, yMax: height + 2 },
      ];
    }
    case 'cable_rack': {
      // 4 support pillars -- tanks can pass between them
      const crLong = Math.max(fpX, fpZ);
      const crShort = Math.min(fpX, fpZ);
      const crIsXLong = fpX >= fpZ;
      const crLongOff = crLong * 0.4;
      const crShortOff = crShort * 0.2;
      const shapes = [];
      for (const lSide of [-1, 1]) {
        for (const sSide of [-1, 1]) {
          const px = cx + (crIsXLong ? lSide * crLongOff : sSide * crShortOff);
          const pz = cz + (crIsXLong ? sSide * crShortOff : lSide * crLongOff);
          shapes.push({
            type: 'box',
            min: { x: px - 1.2, y: 0, z: pz - 1.2 },
            max: { x: px + 1.2, y: height, z: pz + 1.2 },
          });
        }
      }
      return shapes;
    }
    default:
      return [
        { type: 'box', min: { ...aabb.min }, max: { ...aabb.max } },
      ];
  }
}
```

### Placement Logic

```js
/**
 * Pick a kind based on weighted random selection.
 */
function pickKind(rng) {
  const roll = rng();
  let cumulative = 0;
  for (const def of KINDS) {
    cumulative += def.weight;
    if (roll < cumulative) return def;
  }
  return KINDS[0];
}

/**
 * Generate obstacles for a round.
 * @param {object} grid - Grid object from createGrid()
 * @param {number} tier - Difficulty tier (1, 2, or 3) -- controls count
 * @param {function} rng - Seeded RNG function returning 0..1
 * @param {number} destructibleRatio - Fraction that are destructible (0..1)
 * @returns {object[]} Array of Obstacle data objects
 */
export function generateObstacles(grid, tier, rng, destructibleRatio = 0) {
  const range = OBSTACLE_COUNTS[tier] || OBSTACLE_COUNTS[1];
  const count = Math.floor(rng() * (range.max - range.min + 1)) + range.min;

  const obstacles = [];
  let id = 0;
  const occupied = new Set();  // Track occupied cells

  for (let i = 0; i < count; i++) {
    const attempt = tryPlaceObstacle(grid, rng, occupied, id, destructibleRatio);
    if (attempt) {
      obstacles.push(attempt);
      id++;
    }
  }

  return obstacles;
}

function tryPlaceObstacle(grid, rng, occupied, id, destructibleRatio) {
  const def = pickKind(rng);

  // Randomly flip orientation for multi-cell obstacles
  let cellsW = def.cellsW;
  let cellsD = def.cellsD;
  if ((def.kind === 'capacitor_bank' || def.kind === 'plasma_conduit'
       || def.kind === 'cable_rack') && rng() < 0.5) {
    cellsW = def.cellsD;
    cellsD = def.cellsW;
  }

  // Try up to 15 times to find an unoccupied spot
  for (let attempt = 0; attempt < 15; attempt++) {
    const c = Math.floor(rng() * (GRID_COLS - cellsW));
    const r = Math.floor(rng() * (GRID_ROWS - cellsD));

    let fits = true;
    const cells = [];
    for (let dc = 0; dc < cellsW && fits; dc++) {
      for (let dr = 0; dr < cellsD && fits; dr++) {
        const key = `${c + dc},${r + dr}`;
        if (occupied.has(key) || grid.blocked[r + dr][c + dc]) {
          fits = false;
        }
        cells.push({ c: c + dc, r: r + dr, key });
      }
    }

    if (!fits) continue;

    // Mark cells as occupied
    for (const cell of cells) {
      occupied.add(cell.key);
      setBlocked(grid, cell.c, cell.r, true);
    }

    const height = def.heightMin + rng() * (def.heightMax - def.heightMin);
    const isDestructible = rng() < destructibleRatio;
    const colorPalette = isDestructible ? DESTRUCTIBLE_COLORS : OBSTACLE_COLORS;
    const color = colorPalette[Math.floor(rng() * colorPalette.length)];

    // Compute world-space AABB from grid cell position
    const worldMin = { x: c * GRID_CELL, y: 0, z: r * GRID_CELL };
    const worldMax = { x: (c + cellsW) * GRID_CELL, y: height,
                       z: (r + cellsD) * GRID_CELL };

    const maxHP = isDestructible ? DESTRUCTIBLE_HP[def.hpCategory] : 0;
    const aabb = { min: worldMin, max: worldMax };

    return {
      id: `obs-${id}`,
      kind: def.kind,
      cell: { c, r },          // Grid origin cell
      cellsW,                   // Grid width in cells
      cellsD,                   // Grid depth in cells
      destructible: isDestructible,
      hp: maxHP,
      hpMax: maxHP,
      aabb,                     // World-space bounding box
      hitShapes: computeHitShapes(def.kind, height, aabb),
      render: { color, height },
    };
  }

  return null; // Could not place after retries
}
```

### Obstacle Data Object Shape

Every obstacle is a plain object with this structure:

```js
{
  id: 'obs-42',                    // Unique string ID
  kind: 'tesla_coil',             // One of the 10 KINDS
  cell: { c: 12, r: 8 },          // Grid origin (top-left cell)
  cellsW: 1,                      // Width in grid cells
  cellsD: 1,                      // Depth in grid cells
  destructible: true,              // Can be damaged?
  hp: 150,                         // Current HP (0 = indestructible uses 0)
  hpMax: 150,                      // Max HP
  aabb: {                          // World-space axis-aligned bounding box
    min: { x: 480, y: 0, z: 320 },
    max: { x: 520, y: 42, z: 360 },
  },
  hitShapes: [                     // Per-type collision primitives
    { type: 'cylinder', cx: 500, cz: 340, radius: 5.6, yMin: 0, yMax: 3 },
    { type: 'cylinder', cx: 500, cz: 340, radius: 4, yMin: 3, yMax: 45 },
  ],
  render: {
    color: '#0a1628',              // Base structural color
    height: 42,                    // Random height within kind's range
  },
}
```

---

## 3. Material System & Mesh Builders (materials.js)

### 3-Tier Material System

Every obstacle uses three material tiers for the neon cyberpunk look. These are factory functions that create Three.js materials:

```js
import * as THREE from 'three';

function hexColor(hex) {
  return new THREE.Color(hex);
}

// Tier 1: Structural -- dark, metallic, subtle self-illumination
export function structural(color = '#0a0a1a', opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: hexColor(color),
    metalness: opts.metalness ?? 0.7,
    roughness: opts.roughness ?? 0.55,
    emissive: hexColor(opts.emissive ?? color),
    emissiveIntensity: opts.emissiveIntensity ?? 0.08,
    ...opts.extra,
  });
}

// Tier 2: Accent -- full-bright, blooms with post-processing
export function accent(color = '#00ffff', opts = {}) {
  return new THREE.MeshBasicMaterial({
    color: hexColor(color),
    ...opts.extra,
  });
}

// Tier 3: Glow -- transparent halo overlay, adds soft bloom aura
export function glow(color = '#00ffff', opts = {}) {
  return new THREE.MeshBasicMaterial({
    color: hexColor(color),
    transparent: true,
    opacity: opts.opacity ?? 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
    ...opts.extra,
  });
}
```

**How these work together:** The structural material forms the dark body. Accent materials are placed on edges, rings, and detail lines -- they appear to glow when post-processing bloom is enabled (UnrealBloomPass). Glow materials create soft transparent halos around bright features.

### Shared Geometries

Meshes reuse cached geometry instances (cloned per-obstacle) to reduce GPU memory:

```js
const _box = new THREE.BoxGeometry(1, 1, 1);
const _sphere = new THREE.SphereGeometry(0.5, 12, 8);
const _cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
const _ring = new THREE.TorusGeometry(0.5, 0.06, 8, 24);
const _octa = new THREE.OctahedronGeometry(0.5, 0);
const _icosa = new THREE.IcosahedronGeometry(0.5, 0);
const _plane = new THREE.PlaneGeometry(1, 1);
```

All mesh builders use `.clone()` on these and then `.scale.set()` to size them. This pattern means ~200 obstacles share 7 geometry instances.

### createObstacleMesh() -- Entry Point

This is the main function that creates a Three.js Group for any obstacle type:

```js
// Bright neon colors for obstacle accent edges (cycle through for variety)
const NEON_EDGE_COLORS = ['#00ccff', '#00ffaa', '#ff00cc', '#aa44ff', '#00aaff'];
let _neonIdx = 0;

export function createObstacleMesh(
  kind = 'tesla_coil',
  height = 12,
  color = '#0a1628',
  footprintX = 38,  // World-space width (not grid cells)
  footprintZ = 38   // World-space depth
) {
  const group = new THREE.Group();
  group.name = 'obstacle';

  // Cycle through neon accent colors for visual variety
  const neonColor = NEON_EDGE_COLORS[_neonIdx % NEON_EDGE_COLORS.length];
  _neonIdx++;

  // Create the three material tiers
  const strMat = structural(color, { emissive: color, emissiveIntensity: 0.15 });
  const accMat = accent(neonColor);
  const glwMat = glow(neonColor, { opacity: 0.12 });

  // Dispatch to per-type builder
  switch (kind) {
    case 'tesla_coil':       _buildTeslaCoil(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'power_cell':       _buildPowerCell(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'circuit_monolith': _buildCircuitMonolith(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'capacitor_bank':   _buildCapacitorBank(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'relay_tower':      _buildRelayTower(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'data_obelisk':     _buildDataObelisk(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'plasma_conduit':   _buildPlasmaConduit(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'power_pylon':      _buildPowerPylon(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'transformer_stack':_buildTransformerStack(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'cable_rack':       _buildCableRack(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    default:                 _buildCircuitMonolith(group, height, footprintX, footprintZ, strMat, accMat, glwMat);
  }

  // Ground glow plane beneath every obstacle
  const baseGlow = new THREE.Mesh(_plane.clone(), glow(neonColor, { opacity: 0.1 }));
  baseGlow.scale.set(footprintX * 1.15, footprintZ * 1.15, 1);
  baseGlow.rotation.x = -Math.PI / 2;
  baseGlow.position.y = 0.15;
  group.add(baseGlow);

  return group;
}
```

### Builder Functions (all 10)

Each builder receives `(group, height, footprintX, footprintZ, strMat, accMat, glwMat)` and adds child meshes to the group. Here is a summary of what each builds:

| Builder | Description | Key Geometry |
|---------|-------------|--------------|
| `_buildTeslaCoil` | Tapered coil with base platform, insulator rings, top orb with arc tendrils, mid-height platform | Cylinders (shaft), torus rings (insulators), sphere (top orb + glow halo), boxes (arc tendrils, cabinet panels) |
| `_buildPowerCell` | Cylindrical cell with disc caps, glow bands, cooling vents, pressure gauge, terminal | Cylinder (body + caps), torus rings (bands), box (vents), sphere (gauge + glow) |
| `_buildCircuitMonolith` | Rectangular slab with circuit trace patterns, panel insets, data ports, top octahedron | Box (body + plinth), boxes (circuit traces -- horizontal, vertical, diagonal), cylinder (data ports), octahedron (top node) |
| `_buildCapacitorBank` | Two parallel cylinders on a base plate with bus bars, cooling fins, warning indicators | Box (base plate + bus bars), cylinders (two main bodies), torus rings, boxes (cooling fins), spheres (warning indicators) |
| `_buildRelayTower` | Tall thin spire with cross-arms at multiple heights, guy wires, antenna array, large beacon | Cylinder (foundation + narrow shaft), boxes (cross-arms at 3 levels, guy wires, antennas), octahedron (top diamond), sphere (beacon glow -- extra large) |
| `_buildDataObelisk` | Tapered column built from 3-4 stacked sections, data bands, holographic ring, floating icosahedron | Boxes (tapered body sections + data bands + corner edges), torus (holographic ring), icosahedron (floating top element) |
| `_buildPlasmaConduit` | Horizontal pipe on support struts with joints, valve wheel, pressure vents, end flanges | Cylinder (main pipe -- rotated horizontal, support struts, flanges), torus rings (joints, valve), boxes (struts, diagonal braces), spheres (vent caps) |
| `_buildPowerPylon` | Lattice tower with 4 corner posts, cross-bracing at every level, cross-arms with hanging insulators, top beacon | Boxes (posts, horizontal bars, diagonal braces), cylinder (foundation pad, insulators), sphere (beacon -- extra large glow) |
| `_buildTransformerStack` | Stacked cylindrical transformer units with cooling fins, insulator gaps between units, top terminal | Cylinders (transformer units, terminal), boxes (base plate, cooling fins -- 6 per unit radiating), torus rings (unit boundaries, insulator gaps), sphere (terminal top) |
| `_buildCableRack` | Elevated pipe rack on 4 pillars with overhead beam, cable conduits, junction boxes, drooping cables | Boxes (pillars, beam, cables, junction boxes, X-bracing), torus rings (pillar accents) |

The full code for all 10 builders is ~1200 lines. They are purely procedural (no textures, no external assets). Each builder follows the same pattern: create scaled clones of shared geometries, position them relative to the group origin, add structural pieces first, then accent details, then glow effects.

**To port:** Copy the material factories, shared geometries, `createObstacleMesh()`, and all 10 `_build*` functions. The only dependency is Three.js. If you don't need all 10 types, you can include only the builders you want -- the switch statement in `createObstacleMesh` makes this easy.

---

## 4. Collision System

### Tank-Obstacle Collision (collisionSystem.js)

Tanks use circle-based collision (radius 7 world units). Obstacles are tested using their `hitShapes` array for per-type accuracy, falling back to the full AABB.

```js
const TANK_COLLISION_RADIUS = 7;

/**
 * Circle-AABB collision. Returns push vector {x, z} or null.
 */
function resolveCircleAABB(circlePos, radius, aabb) {
  const closestX = Math.max(aabb.min.x, Math.min(circlePos.x, aabb.max.x));
  const closestZ = Math.max(aabb.min.z, Math.min(circlePos.z, aabb.max.z));

  const dx = circlePos.x - closestX;
  const dz = circlePos.z - closestZ;
  const distSq = dx * dx + dz * dz;

  if (distSq >= radius * radius) return null;

  const dist = Math.sqrt(distSq);
  if (dist < 0.001) {
    // Center inside AABB -- push along shortest axis
    const toLeft = circlePos.x - aabb.min.x;
    const toRight = aabb.max.x - circlePos.x;
    const toFront = circlePos.z - aabb.min.z;
    const toBack = aabb.max.z - circlePos.z;
    const minDist = Math.min(toLeft, toRight, toFront, toBack);
    if (minDist === toLeft) return { x: -(toLeft + radius), z: 0 };
    if (minDist === toRight) return { x: toRight + radius, z: 0 };
    if (minDist === toFront) return { x: 0, z: -(toFront + radius) };
    return { x: 0, z: toBack + radius };
  }

  const overlap = radius - dist;
  return { x: (dx / dist) * overlap, z: (dz / dist) * overlap };
}

/**
 * Circle-Cylinder collision (XZ plane). Returns push vector or null.
 */
function resolveCircleCylinder(circlePos, radius, shape) {
  const dx = circlePos.x - shape.cx;
  const dz = circlePos.z - shape.cz;
  const distSq = dx * dx + dz * dz;
  const combinedR = radius + shape.radius;

  if (distSq >= combinedR * combinedR) return null;

  const dist = Math.sqrt(distSq);
  if (dist < 0.001) return { x: combinedR, z: 0 };

  const overlap = combinedR - dist;
  return { x: (dx / dist) * overlap, z: (dz / dist) * overlap };
}

/**
 * Resolve one entity against all obstacles. Uses hitShapes for accuracy.
 */
function resolveTankObstacles(entity, obstacles) {
  if (!obstacles || obstacles.length === 0) return;
  const pos = entity.transform.pos;

  for (const obs of obstacles) {
    // Broad phase: skip if far from AABB
    const cx = (obs.aabb.min.x + obs.aabb.max.x) * 0.5;
    const cz = (obs.aabb.min.z + obs.aabb.max.z) * 0.5;
    const halfW = (obs.aabb.max.x - obs.aabb.min.x) * 0.5 + TANK_COLLISION_RADIUS;
    const halfH = (obs.aabb.max.z - obs.aabb.min.z) * 0.5 + TANK_COLLISION_RADIUS;
    if (Math.abs(pos.x - cx) > halfW || Math.abs(pos.z - cz) > halfH) continue;

    let push = null;

    if (obs.hitShapes && obs.hitShapes.length > 0) {
      let bestPush = null;
      let bestOverlapSq = 0;

      for (const shape of obs.hitShapes) {
        let p;
        if (shape.type === 'cylinder') {
          p = resolveCircleCylinder(pos, TANK_COLLISION_RADIUS, shape);
        } else {
          p = resolveCircleAABB(pos, TANK_COLLISION_RADIUS, shape);
        }
        if (p) {
          const oSq = p.x * p.x + p.z * p.z;
          if (oSq > bestOverlapSq) {
            bestOverlapSq = oSq;
            bestPush = p;
          }
        }
      }
      push = bestPush;
    } else {
      push = resolveCircleAABB(pos, TANK_COLLISION_RADIUS, obs.aabb);
    }

    if (!push) continue;

    pos.x += push.x;
    pos.z += push.z;

    // Zero velocity along push direction
    if (push.x !== 0) entity.physics.vel.x = 0;
    if (push.z !== 0) entity.physics.vel.z = 0;
  }
}
```

### Projectile-Obstacle Collision (projectileSystem.js)

Projectiles test against hitShapes using simpler point-in-volume tests:

```js
function pointInAABB(pos, aabb, radius) {
  return (
    pos.x + radius >= aabb.min.x && pos.x - radius <= aabb.max.x &&
    pos.y + radius >= aabb.min.y && pos.y - radius <= aabb.max.y &&
    pos.z + radius >= aabb.min.z && pos.z - radius <= aabb.max.z
  );
}

function pointInCylinder(pos, shape, margin) {
  if (pos.y + margin < shape.yMin || pos.y - margin > shape.yMax) return false;
  const dx = pos.x - shape.cx;
  const dz = pos.z - shape.cz;
  const r = shape.radius + margin;
  return dx * dx + dz * dz <= r * r;
}

/**
 * Test projectile against obstacle's per-kind hit shapes.
 */
function testObstacleHit(pos, radius, obs) {
  if (obs.hitShapes) {
    for (const shape of obs.hitShapes) {
      if (shape.type === 'cylinder') {
        if (pointInCylinder(pos, shape, radius)) return true;
      } else if (pointInAABB(pos, shape, radius)) {
        return true;
      }
    }
    return false;
  }
  return pointInAABB(pos, obs.aabb, radius);
}
```

The projectile update loop iterates obstacles and calls `testObstacleHit()`. On hit, it either ricochets (for sabot rounds at shallow angles) or explodes.

### Ricochet Off Obstacles

When a ricochet-capable projectile hits an obstacle at a shallow angle (>45 degrees from surface normal), it bounces:

```js
function tryRicochet(p, obs) {
  let normal = null;
  let minPen = Infinity;

  if (obs.hitShapes) {
    for (const shape of obs.hitShapes) {
      if (shape.type === 'cylinder') {
        if (pointInCylinder(p.pos, shape, p.radius)) {
          // Radial XZ normal from cylinder center
          const dx = p.pos.x - shape.cx;
          const dz = p.pos.z - shape.cz;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist > 0.001) {
            normal = { x: dx / dist, y: 0, z: dz / dist };
            minPen = (shape.radius + p.radius) - dist;
          }
          break;
        }
      } else {
        if (pointInAABB(p.pos, shape, p.radius)) {
          const result = computeAABBNormal(p, shape);
          normal = result.normal;
          minPen = result.minPen;
          break;
        }
      }
    }
  } else if (obs.aabb) {
    const result = computeAABBNormal(p, obs.aabb);
    normal = result.normal;
    minPen = result.minPen;
  }

  if (!normal) return false;

  // Check angle of incidence
  const speed = Math.sqrt(p.vel.x**2 + p.vel.y**2 + p.vel.z**2);
  if (speed < 0.001) return false;

  const dot = (p.vel.x * normal.x + p.vel.y * normal.y + p.vel.z * normal.z) / speed;
  const incidenceAngle = Math.acos(Math.min(1, Math.abs(dot)));

  // > 45 deg from normal = shallow = ricochet
  if (incidenceAngle <= Math.PI / 4) return false;

  // Reflect: v' = v - 2*(v.n)*n
  const dotFull = p.vel.x * normal.x + p.vel.y * normal.y + p.vel.z * normal.z;
  p.vel.x -= 2 * dotFull * normal.x;
  p.vel.y -= 2 * dotFull * normal.y;
  p.vel.z -= 2 * dotFull * normal.z;

  // 40% velocity loss
  p.vel.x *= 0.6;
  p.vel.y *= 0.6;
  p.vel.z *= 0.6;

  // Push out of obstacle
  p.pos.x += normal.x * (minPen + 1);
  p.pos.y += normal.y * (minPen + 1);
  p.pos.z += normal.z * (minPen + 1);

  p.bounceCount++;
  p._ricochetEvent = { x: p.pos.x, y: p.pos.y, z: p.pos.z };
  return true;
}

/**
 * Compute AABB face normal from penetration depths.
 */
function computeAABBNormal(p, aabb) {
  const pens = [
    { pen: (p.pos.x + p.radius) - aabb.min.x, normal: { x: -1, y: 0, z: 0 } },
    { pen: aabb.max.x - (p.pos.x - p.radius), normal: { x: 1, y: 0, z: 0 } },
    { pen: (p.pos.z + p.radius) - aabb.min.z, normal: { x: 0, y: 0, z: -1 } },
    { pen: aabb.max.z - (p.pos.z - p.radius), normal: { x: 0, y: 0, z: 1 } },
    { pen: aabb.max.y - (p.pos.y - p.radius), normal: { x: 0, y: 1, z: 0 } },
    { pen: (p.pos.y + p.radius) - aabb.min.y, normal: { x: 0, y: -1, z: 0 } },
  ];

  let minPen = Infinity;
  let normal = { x: 0, y: 1, z: 0 };
  for (const entry of pens) {
    if (entry.pen > 0 && entry.pen < minPen) {
      minPen = entry.pen;
      normal = entry.normal;
    }
  }
  return { normal, minPen };
}
```

---

## 5. Destructible Obstacles (environmentEvents.js)

Handles damage application, destruction, grid cell freeing, and nav mesh invalidation:

```js
import { setBlocked } from './grid.js';

let destroyedThisFrame = [];

/**
 * Apply damage to an obstacle. If HP reaches 0:
 * - Remove from world obstacles array
 * - Free grid cells (unblock)
 * - Bump pathfinding nav version
 * - Track destruction event for VFX/audio
 */
export function damageObstacle(obstacle, damage, game) {
  if (!obstacle.destructible || obstacle.hp <= 0) {
    return { destroyed: false, obstacle };
  }

  obstacle.hp -= damage;

  if (obstacle.hp <= 0) {
    obstacle.hp = 0;

    // Remove from obstacles array
    const idx = game.world.obstacles.indexOf(obstacle);
    if (idx !== -1) {
      game.world.obstacles.splice(idx, 1);
    }

    // Free grid cells
    for (let dc = 0; dc < obstacle.cellsW; dc++) {
      for (let dr = 0; dr < obstacle.cellsD; dr++) {
        setBlocked(game.world.grid, obstacle.cell.c + dc, obstacle.cell.r + dr, false);
      }
    }

    // Bump nav version so pathfinding recalculates
    if (game.world.nav) {
      game.world.nav.version++;
    }

    destroyedThisFrame.push(obstacle);
    return { destroyed: true, obstacle };
  }

  return { destroyed: false, obstacle };
}

export function getDestroyedThisFrame() {
  return destroyedThisFrame;
}

export function clearDestroyedThisFrame() {
  destroyedThisFrame = [];
}
```

**How it's called (from main.js):**
```js
// Each frame, check explosions against destructible obstacles
function processObstacleDamage(game) {
  for (const fx of game.entities.effects) {
    if (fx.type !== 'explosion' || fx._obstacleProcessed) continue;
    fx._obstacleProcessed = true;

    const splashRadius = fx.render?.splashRadius || 18;
    const baseDamage = 34;

    for (let i = game.world.obstacles.length - 1; i >= 0; i--) {
      const obs = game.world.obstacles[i];
      if (!obs.destructible || obs.hp <= 0) continue;

      const cx = (obs.aabb.min.x + obs.aabb.max.x) / 2;
      const cz = (obs.aabb.min.z + obs.aabb.max.z) / 2;
      const dx = fx.pos.x - cx;
      const dz = fx.pos.z - cz;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const range = splashRadius + 10;

      if (dist < range) {
        const falloff = Math.max(0, 1 - dist / range);
        const damage = Math.round(baseDamage * falloff);
        if (damage > 0) {
          damageObstacle(obs, damage, game);
        }
      }
    }
  }
}

// Then process destruction events (particles, scrap reward, render removal)
function processDestructionEvents(game) {
  const destroyed = getDestroyedThisFrame();
  for (const obs of destroyed) {
    const cx = (obs.aabb.min.x + obs.aabb.max.x) / 2;
    const cz = (obs.aabb.min.z + obs.aabb.max.z) / 2;
    // Emit particles, play sound, remove render mesh...
    removeRenderObject(obs.id);
  }
}
```

---

## 6. Render Lifecycle (scene.js)

Obstacle meshes are managed through a registry pattern (Map of id -> Three.js Object3D):

```js
const _registry = new Map();

export function addRenderObject(id, obj) {
  if (_registry.has(id)) {
    removeRenderObject(id);
  }
  _registry.set(id, obj);
  scene.add(obj);
}

export function removeRenderObject(id) {
  const obj = _registry.get(id);
  if (obj) {
    scene.remove(obj);
    _registry.delete(id);
    // Optionally dispose geometry/materials here
  }
}

/**
 * Create and position an obstacle's render mesh.
 * Called once per obstacle at match start.
 */
export function spawnObstacleRender(obstacle) {
  const aabb = obstacle.aabb;
  const widthX = aabb.max.x - aabb.min.x;
  const widthZ = aabb.max.z - aabb.min.z;

  const mesh = createObstacleMesh(
    obstacle.kind,
    obstacle.render?.height || 12,
    obstacle.render?.color || '#ff00aa',
    widthX,
    widthZ,
  );

  // Position at AABB center
  const cx = (aabb.min.x + aabb.max.x) / 2;
  const cz = (aabb.min.z + aabb.max.z) / 2;
  mesh.position.set(cx, 0, cz);

  addRenderObject(obstacle.id, mesh);
  return mesh;
}
```

**Match init (main.js):**
```js
for (const obs of game.world.obstacles) {
  spawnObstacleRender(obs);
}
```

---

## 7. Integration Guide

### Minimal Port (obstacles as static scenery)

If you just want the visual obstacles without destruction or collision:

1. Copy: `grid.js`, `obstacles.js`, material factories + mesh builders from `materials.js`
2. Call `createGrid()`, then `generateObstacles(grid, 2, Math.random, 0)`
3. For each obstacle, call `createObstacleMesh(obs.kind, obs.render.height, obs.render.color, widthX, widthZ)`
4. Position mesh at AABB center, add to scene

### Full Port (with collision + destruction)

1. Copy all files listed above plus `collisionSystem.js` (tank-obstacle), `environmentEvents.js`
2. Extract projectile-obstacle collision from `projectileSystem.js` (the `testObstacleHit`, `tryRicochet`, `computeAABBNormal` functions)
3. Adapt to your entity structure:
   - Tank collision expects `entity.transform.pos` (x, z) and `entity.physics.vel` (x, z)
   - Projectile collision expects `p.pos` (x, y, z), `p.vel` (x, y, z), `p.radius`
4. Store obstacles in `game.world.obstacles` (array)
5. Each frame: resolve tank-obstacle, test projectile-obstacle, process explosion damage, process destruction events

### Adapting to Your Game

**Different map size:** Change `MAP_W`, `MAP_H` in grid.js. Everything scales.

**Different grid cell size:** Change `GRID_CELL`. Obstacle footprints scale proportionally.

**Different obstacle counts:** Edit `OBSTACLE_COUNTS` tiers.

**Custom obstacle types:** Add entries to `KINDS`, add a `computeHitShapes` case, add a `_build*` function, add to the switch in `createObstacleMesh`.

**No bloom post-processing:** The accent materials will just appear as flat bright colors. Glow materials will still work as transparent overlays. The look is designed around bloom, but works without it.

**Different art style:** Replace the material factories. The builders use `strMat`, `accMat`, `glwMat` -- swap these for any Three.js material.

### Dependencies

- **Three.js** (r150+ recommended) -- the only external dependency
- **No textures or external assets** -- everything is procedural geometry
- **No animation** -- obstacles are static meshes (though the game adds particle effects on destruction separately)

### Key Constants to Tune

| Constant | File | Default | Purpose |
|----------|------|---------|---------|
| `GRID_CELL` | grid.js | 40 | Grid cell size in world units |
| `MAP_W`, `MAP_H` | grid.js | 1920, 1440 | World bounds |
| `OBSTACLE_COUNTS` | obstacles.js | 140-280 | Obstacles per tier |
| `DESTRUCTIBLE_HP` | obstacles.js | 60/100/150 | HP per category |
| `TANK_COLLISION_RADIUS` | collisionSystem.js | 7 | Player/entity collision circle |
| `NEON_EDGE_COLORS` | materials.js | 5 colors | Accent color cycle |
| `KINDS[].weight` | obstacles.js | 0.07-0.15 | Spawn probability per type |
