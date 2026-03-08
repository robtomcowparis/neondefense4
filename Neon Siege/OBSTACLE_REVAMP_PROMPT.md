# Obstacle System Revamp — Agent Teams Prompt

## Goal

Rebuild the Neon Siege obstacle system from the ground up, replacing the current simple box-and-octahedron obstacles with the full 10-type procedural obstacle system from Neon Tanks (as documented in `OBSTACLE_EXTRACTION.md`). Each obstacle type now occupies **double** the grid footprint compared to the extraction doc (all `cellsW` / `cellsD` values x2), producing larger, more visually impactful structures and a less cluttered map with fewer total obstacles.

**Before you do anything:** Read `CLAUDE.md`, `VISUAL_STYLE_GUIDE.md`, and `OBSTACLE_EXTRACTION.md` in full.

---

## What Changes

### Current system (being replaced)
- `map.js` generates connected blob clusters of single-tile `TILE_OBSTACLE` cells
- `renderer/grid.js` renders every obstacle tile as an identical box + octahedron tip
- No obstacle types, no variety, no per-type collision shapes, no destructibility
- Obstacles are visually identical gray blocks

### New system (being built)
- 10 distinct obstacle types (tesla_coil, power_cell, circuit_monolith, capacitor_bank, relay_tower, data_obelisk, plasma_conduit, power_pylon, transformer_stack, cable_rack) — each with unique procedural Three.js meshes
- Weighted random type selection for natural variety
- Multi-cell obstacles with random orientation
- Per-type three-tier materials (structural + accent + glow) using the existing factories from `scene.js`
- Cycled neon accent colors for visual variety
- Ground glow plane beneath each obstacle
- **All grid footprints doubled** — a 1x1 type becomes 2x2, a 2x1 becomes 4x2, a 3x1 becomes 6x2
- Reduced total obstacle count to compensate for larger footprints (fewer but bigger)
- Path validation still guaranteed between bases
- Per-obstacle data objects with AABB, hitShapes, and render metadata (destructibility is optional / future-ready)

---

## Team Structure

Create team: `obstacle-revamp`

### Agents

| Agent | Model | Owned Files |
|-------|-------|-------------|
| **Lead** | opus | `src/js/config.js`, `src/js/main.js`, `src/game.html` |
| **world-agent** | sonnet | `src/js/map.js`, `src/js/path.js` |
| **render-agent** | sonnet | `src/js/renderer/grid.js` |

Only 2 teammates needed. The obstacle system touches map generation (logic) and grid rendering (visuals). The Lead handles config constants and main.js integration.

---

## File Ownership Rules

- **world-agent** owns `src/js/map.js` and `src/js/path.js`. Must NOT edit any other files.
- **render-agent** owns `src/js/renderer/grid.js`. Must NOT edit any other files.
- **Lead** owns `src/js/config.js` and `src/js/main.js`. Handles all integration and constant changes.
- No other files should be modified by this task.

---

## Wave 1 — Lead: Config Constants

The Lead adds all new obstacle constants to `config.js` before spawning teammates. This is the shared data contract.

### Add to `config.js`:

```js
// --- Obstacle Types ---
export const OBSTACLE_KINDS = [
  {
    kind: 'tesla_coil',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 30, heightMax: 55,
    weight: 0.12,
    hpCategory: 'large',
  },
  {
    kind: 'power_cell',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 16, heightMax: 32,
    weight: 0.12,
    hpCategory: 'small',
  },
  {
    kind: 'circuit_monolith',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 14, heightMax: 30,
    weight: 0.15,
    hpCategory: 'small',
  },
  {
    kind: 'capacitor_bank',
    cellsW: 4, cellsD: 2,          // doubled from 2x1
    heightMin: 14, heightMax: 28,
    weight: 0.10,
    hpCategory: 'medium',
  },
  {
    kind: 'relay_tower',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 50, heightMax: 85,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'data_obelisk',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 22, heightMax: 42,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'plasma_conduit',
    cellsW: 4, cellsD: 2,          // doubled from 2x1
    heightMin: 10, heightMax: 20,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'power_pylon',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 60, heightMax: 100,
    weight: 0.08,
    hpCategory: 'large',
  },
  {
    kind: 'transformer_stack',
    cellsW: 2, cellsD: 2,          // doubled from 1x1
    heightMin: 20, heightMax: 38,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'cable_rack',
    cellsW: 6, cellsD: 2,          // doubled from 3x1
    heightMin: 15, heightMax: 25,
    weight: 0.07,
    hpCategory: 'medium',
  },
];

// Neon accent colors cycled across obstacles
export const OBSTACLE_NEON_COLORS = ['#00ccff', '#00ffaa', '#ff00cc', '#aa44ff', '#00aaff'];

// Structural base colors for obstacles (dark)
export const OBSTACLE_BASE_COLORS = ['#0a1628', '#0c1a30', '#0e1e38', '#101828'];

// HP values by obstacle category (for future destructibility)
export const OBSTACLE_HP = {
  small: 60,
  medium: 100,
  large: 150,
};

// Generation tuning — reduced count since obstacles are now larger
export const OBSTACLE_COUNT_MIN = 25;
export const OBSTACLE_COUNT_MAX = 40;
export const OBSTACLE_PLACEMENT_RETRIES = 20;
```

Also update the existing obstacle constants — remove or deprecate:
- `OBSTACLE_CLUSTER_COUNT`
- `OBSTACLE_CLUSTER_SIZE_MIN`
- `OBSTACLE_CLUSTER_SIZE_MAX`

Keep `OBSTACLE_MIN_ROW`, `OBSTACLE_MAX_ROW`, `OBSTACLE_MIN_COL`, `OBSTACLE_MAX_COL` — these define the placement band and are still needed.

---

## Wave 2 — Parallel Teammate Work

### world-agent Spawn Prompt

```
You are world-agent for the Neon Siege obstacle system revamp. You own src/js/map.js and src/js/path.js. Do NOT edit any other files.

Read CLAUDE.md, VISUAL_STYLE_GUIDE.md, and OBSTACLE_EXTRACTION.md immediately for full context.

YOUR TASK: Rewrite the obstacle generation in map.js to produce individual typed obstacles instead of connected blob clusters.

CURRENT STATE: map.js generates obstacle clusters as connected blobs of TILE_OBSTACLE tiles using growCluster(). Each obstacle is a single grid tile. This is being replaced.

NEW DESIGN — map.js must:

1. Import OBSTACLE_KINDS, OBSTACLE_COUNT_MIN, OBSTACLE_COUNT_MAX, OBSTACLE_PLACEMENT_RETRIES, OBSTACLE_BASE_COLORS, OBSTACLE_HP, OBSTACLE_MIN_ROW, OBSTACLE_MAX_ROW, OBSTACLE_MIN_COL, OBSTACLE_MAX_COL, TILE_SIZE, GRID_COLS, GRID_ROWS, TILE_EMPTY, TILE_OBSTACLE from config.js.

2. Remove the growCluster() function and the old cluster-based placement loop entirely.

3. Implement weighted random type selection: pickKind() rolls a random number and walks OBSTACLE_KINDS weights to pick a type.

4. Implement tryPlaceObstacle() that:
   - Picks a kind via pickKind()
   - For multi-cell kinds (capacitor_bank, plasma_conduit, cable_rack), randomly flips orientation (swap cellsW and cellsD) with 50% chance
   - Tries up to OBSTACLE_PLACEMENT_RETRIES times to find a grid position where all cells are TILE_EMPTY and within the obstacle placement bounds
   - Marks all occupied cells as TILE_OBSTACLE in the grid
   - Creates and returns an obstacle data object (see below)

5. Rewrite createMap() to:
   - Initialize the empty grid as before
   - Pick a random count between OBSTACLE_COUNT_MIN and OBSTACLE_COUNT_MAX
   - Loop count times, calling tryPlaceObstacle()
   - After placing each obstacle, verify a path still exists between bases (using findPath from path.js) — if not, undo that obstacle (unmark its cells)
   - Store all successfully placed obstacles in a module-level array

6. Export a new function getObstacleData() that returns the array of obstacle data objects (not just tile positions). Keep getObstacles() for backward compatibility but it can just scan the grid as before.

OBSTACLE DATA OBJECT SHAPE (each obstacle):
{
  id: 'obs-0',               // unique string ID
  kind: 'tesla_coil',        // string from OBSTACLE_KINDS
  col: 5,                    // grid origin column
  row: 12,                   // grid origin row
  cellsW: 2,                 // width in grid cells
  cellsD: 2,                 // depth in grid cells
  height: 42.3,              // random float in [heightMin, heightMax]
  color: '#0a1628',          // random pick from OBSTACLE_BASE_COLORS
  aabb: {                    // world-space bounding box
    min: { x: 200, y: 0, z: 480 },
    max: { x: 280, y: 42.3, z: 560 },
  },
}

World-space conversion: x = col * TILE_SIZE, z = row * TILE_SIZE, width = cellsW * TILE_SIZE, depth = cellsD * TILE_SIZE.

DO NOT add any rendering code. DO NOT edit path.js unless you find a bug. DO NOT edit config.js — the Lead handles that.
```

### render-agent Spawn Prompt

```
You are render-agent for the Neon Siege obstacle system revamp. You own src/js/renderer/grid.js. Do NOT edit any other files.

Read CLAUDE.md, VISUAL_STYLE_GUIDE.md, and OBSTACLE_EXTRACTION.md immediately for full context. Pay special attention to Section 3 (Material System & Mesh Builders) — you are implementing all 10 mesh builders.

YOUR TASK: Rewrite the obstacle rendering in renderer/grid.js to create unique 3D meshes for each of the 10 obstacle types, matching the visual descriptions in OBSTACLE_EXTRACTION.md.

CURRENT STATE: renderer/grid.js creates an identical box + octahedron for every obstacle tile. This is being replaced with per-type procedural meshes.

IMPORTS AVAILABLE:
- makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial from './scene.js' — the three-tier material factories
- OBSTACLE_NEON_COLORS from '../config.js' — array of neon accent colors to cycle through
- getObstacleData from '../map.js' — returns array of obstacle data objects (each has: id, kind, col, row, cellsW, cellsD, height, color, aabb)
- Also still import getObstacles for fallback, TILE_SIZE, MAP_W, MAP_H, COLORS, GRID_COLS, GRID_ROWS from config

SHARED GEOMETRIES — Define these once at module level and clone them in builders:
const _box = new THREE.BoxGeometry(1, 1, 1);
const _sphere = new THREE.SphereGeometry(0.5, 12, 8);
const _cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
const _ring = new THREE.TorusGeometry(0.5, 0.06, 8, 24);
const _octa = new THREE.OctahedronGeometry(0.5, 0);
const _icosa = new THREE.IcosahedronGeometry(0.5, 0);
const _plane = new THREE.PlaneGeometry(1, 1);

THE 10 MESH BUILDERS — Implement each as a function that receives (group, height, footprintX, footprintZ, strMat, accMat, glwMat) and adds child meshes to the group. Match OBSTACLE_EXTRACTION.md Section 3 closely:

1. _buildTeslaCoil: Tapered cylinder shaft with wide base platform, insulator torus rings at intervals up the shaft, top sphere orb with glow halo, small box arc tendrils radiating from the top, mid-height platform ring. Use structural for shaft/base, accent for rings/orb, glow for halo.

2. _buildPowerCell: Main cylinder body, disc caps top and bottom (flattened cylinders), 2-3 torus glow bands spaced along the body, small box cooling vents, sphere pressure gauge with glow. Structural body, accent bands/gauge, glow halo.

3. _buildCircuitMonolith: Rectangular box slab body on a low plinth box, circuit trace pattern (multiple thin boxes — horizontal, vertical, diagonal lines on the face), small cylinder data ports on sides, octahedron top node. Structural body/plinth, accent traces/ports/node.

4. _buildCapacitorBank: Box base plate, two parallel cylinders standing on it (one at each end along the long axis), torus rings around each cylinder, box bus bars connecting them, small box cooling fins along the sides, sphere warning indicators. Structural base/cylinders, accent bus bars/indicators, glow rings.

5. _buildRelayTower: Cylinder foundation pad (wide, short), narrow cylinder shaft extending full height, box cross-arms at 3 height levels, thin box guy wires from top to base, box antennas at top, octahedron diamond near top, large sphere beacon with glow at summit. Structural foundation/shaft, accent cross-arms/diamond, glow beacon (extra large).

6. _buildDataObelisk: 3-4 stacked box sections tapering inward as they go up (each section slightly narrower), thin box data bands between sections, small box corner edges/trim, torus holographic ring floating around upper section, icosahedron floating above the top. Structural body sections, accent data bands/edges, glow ring/icosahedron.

7. _buildPlasmaConduit: Two box support struts at each end, cylinder main pipe rotated horizontal between them (use rotation.z = Math.PI/2 for horizontal), torus rings at pipe joints, small torus valve wheel at center, box diagonal braces between struts and pipe, sphere vent caps at pipe ends, cylinder flanges. Structural struts/pipe, accent joints/valve, glow vent caps.

8. _buildPowerPylon: 4 tall box corner posts arranged in a square, box horizontal bars connecting posts at multiple height levels, box diagonal cross-bracing between levels, box cross-arms extending outward near top with small hanging cylinder insulators, cylinder foundation pad, large sphere beacon at top with oversized glow. Structural posts/bars, accent bracing/cross-arms, glow beacon (extra large).

9. _buildTransformerStack: Cylinder base plate, 2-3 stacked cylinder transformer units, box cooling fins radiating outward from each unit (6 fins per unit, evenly spaced), torus rings between units (insulator gaps), small cylinder terminal on top with sphere tip. Structural units/base, accent fins/terminal, glow rings/tip.

10. _buildCableRack: 4 box pillars at corners, box overhead beam connecting tops, 2-3 box cable conduits running along the beam, small box junction boxes at intervals, thin box drooping cables between pillars, box X-bracing between pillars, torus ring accents at pillar tops. Structural pillars/beam, accent conduits/junction boxes, glow ring accents.

ENTRY POINT — createObstacleMesh(kind, height, color, footprintX, footprintZ):
- Creates a THREE.Group
- Cycles through OBSTACLE_NEON_COLORS for the accent color (use a module-level counter, increment per call)
- Creates strMat via makeStructuralMaterial with the obstacle's base color (with emissiveIntensity 0.15)
- Creates accMat via makeAccentMaterial with the neon color
- Creates glwMat via makeGlowMaterial with the neon color and opacity 0.12
- Switches on kind to call the correct builder
- Adds a ground glow plane (PlaneGeometry scaled to footprint x 1.15, rotated -PI/2, positioned at y=0.15, using glow material at opacity 0.1)
- Returns the group

UPDATE initGrid():
- After creating grid lines, get obstacle data via getObstacleData() (imported from map.js)
- For each obstacle, call createObstacleMesh(obs.kind, obs.height, obs.color, obs.cellsW * TILE_SIZE, obs.cellsD * TILE_SIZE)
- Position the mesh at the AABB center: x = (aabb.min.x + aabb.max.x) / 2, z = (aabb.min.z + aabb.max.z) / 2
- Set userData.idOffset = Math.random() * Math.PI * 2 for bob animation
- Add to obstacleGroup

UPDATE updateGrid():
- Keep the existing bob animation for obstacles (already works via obstacleGroup.children)

The builders are the bulk of the work (~100-150 lines each). Each builder should create visually distinct, recognizable structures. Use .clone() on shared geometries and .scale.set() to size. Position all parts relative to the group center (0, 0, 0). Heights grow upward from y=0.

IMPORTANT RULES:
- Use ONLY the three-tier material factories from scene.js (makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial)
- Clone shared geometries, never modify the originals
- Every obstacle must have structural body parts + accent detail parts + at least one glow element
- Keep performance in mind: ~25-40 obstacles on the map, each with 8-20 child meshes is fine
- DO NOT edit config.js, map.js, main.js, scene.js, or any file other than renderer/grid.js
```

---

## Wave 3 — Lead Integration

After both teammates complete their work:

1. **Verify config.js** has all required exports and no broken imports.

2. **Update main.js** if needed — currently `initGrid(getScene())` is called in `initMatch()` after `createMap()`. The new `getObstacleData()` function in `map.js` should be called by `renderer/grid.js` directly (already wired via the import), so main.js should need minimal changes. Verify `resetAll()` properly clears the map state.

3. **Run the game** (`npm run dev` in the `neon-siege/` directory). Check:
   - Obstacles render with 10 distinct visual types
   - Obstacles occupy larger footprints (2x2 minimum)
   - Map is less cluttered than before (fewer, bigger obstacles)
   - At least one valid path exists between bases
   - Building placement still works correctly around obstacles
   - Units path around obstacles properly
   - Neon accent colors cycle across obstacles (visual variety)
   - Three-tier materials are visible: dark structural bodies, bright accent details, soft glow halos
   - Bloom makes accent parts glow

4. **Tune** obstacle count in config.js if the map feels too sparse or too crowded. Target: 25-40 obstacles on a 40x40 grid with doubled footprints.

5. **Fix** any runtime errors, import mismatches, or visual issues.

---

## Key Constraints

- **File ownership is absolute.** world-agent touches only map.js and path.js. render-agent touches only renderer/grid.js. Lead touches only config.js and main.js.
- **No new files.** Everything fits into existing files.
- **The three-tier material pattern is mandatory.** Every obstacle mesh must use structural + accent + glow materials from scene.js factories.
- **All obstacle data lives in config.js.** Kind definitions, colors, counts — all imported from config, never hardcoded in map.js or grid.js.
- **Pathfinding must still work.** Every generated map must have at least one valid path between the player base and enemy base.
- **The extraction doc is the visual reference.** The meshes should match the descriptions in OBSTACLE_EXTRACTION.md Section 3 as closely as possible.
- **Grid footprints are doubled.** A "1x1" obstacle in the extraction doc becomes 2x2 in Neon Siege. A "2x1" becomes 4x2. A "3x1" becomes 6x2. The 3D meshes scale to fill these larger footprints.

---

## Shutdown

After Wave 3 integration and verification:
1. Send shutdown_request to world-agent
2. Send shutdown_request to render-agent
3. TeamDelete()
