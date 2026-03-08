# CLAUDE.md — Neon Siege

This document is the operating manual for Claude Code working on **Neon Siege**, a 3D browser-based RTS-lite / siege game in the Neon Arcade universe.

Neon Siege is built with **JavaScript, HTML/CSS, Three.js, and Vite**. The goal is a polished, well-engineered game with strong readability, modular architecture, and visual consistency with the existing Neon Arcade games.

---

## 1. Project Summary

Neon Siege is a **base-vs-base 3D battlefield game**.

Two opposing bases sit on opposite sides of a 40×40 tile map. Both sides gain resources, build structures, produce combat units, and pressure the opposing base over time. Units move automatically, engage enemies in range, and continue advancing. The match ends when one base is destroyed.

This is **not** a full RTS. It is an **RTS-lite / siege game** with light macro control and minimal micromanagement.

### Core pillars
- Readable angled top-down 3D battlefield
- Constant battlefield motion and pressure
- Deep economy and production systems with multi-tier upgrades
- Controlled procedural map generation with themed obstacles
- Intelligent enemy AI with strategy profiles and difficulty scaling
- Squad command system for tactical control
- Air units (helicopters) with independent rally control
- Destructible wall system with wall-aware pathfinding
- Modular, well-engineered codebase

---

## 2. Design Rules

### Engineering philosophy
The core playable loop is established and deep. All major systems are implemented: economy, upgrades, squads, walls, helicopters, AI profiles, difficulty settings, and performance optimizations. New work should **polish, balance, expand, and fix** the game. Systems should be robust, well-tested, and thoughtfully designed.

### Gameplay priorities
1. Preserve readability and visual clarity.
2. Keep the architecture modular and well-structured.
3. Deepen systems with meaningful complexity (economy, AI, unit variety, map features).
4. Ensure all features are fully integrated and functional — no stubs or scaffolding.
5. Prefer "complete and polished" over "broad and shallow."

---

## 3. Visual Style Rules

Neon Siege must belong to the same visual universe as Neon Defense / Neon Tanks. The complete visual specification lives in `VISUAL_STYLE_GUIDE.md` — read it before building any visual elements.

### Core identity
- Retro-futuristic neon
- Dark near-black / deep indigo backgrounds (`#040410`)
- High contrast
- Electric industrial / cyberpunk energy
- Minimal chrome, strong geometric forms, controlled bloom

### Color hierarchy
- **Cyan** (`#00ffff`) = primary accent, active states, player team, UI borders
- **Magenta** (`#ff00ff`) = secondary accent, turret color, tech/advanced
- **Gold** (`#ffd700`) = economy, rewards, upgrades, factory color, target priority buttons
- **Green** (`#32ff64`) = success, healing, positive health state, helipad color
- **Red / orange** (`#ff3232` / `#ffa028`) = danger, denial, enemy team, critical damage

### Scene color baseline
- Background: `#040410`
- Panel background: `#08081A`
- Card background: `#0c0c22`
- Borders: `#00b4c8` (cyan)

### UI rules
- **Fonts:** Orbitron (titles, buttons, labels) + Share Tech Mono (data, values) — loaded from Google Fonts
- Monospace-forward HUD and data display
- Uppercase labels and buttons
- Wide letter spacing on headings and controls
- Dark translucent panels with cyan borders/glow
- Scanlines overlay (CRT effect via repeating-linear-gradient)
- Minimal border radius
- No loud gradients on buttons
- Hover feedback should intensify glow, border brightness, and slightly scale

### Three-tier material system (mandatory)
Every 3D object must follow this pattern using the factories from `scene.js`:

1. **`makeStructuralMaterial(color)`** — dark metallic body (MeshStandardMaterial, color x0.25, metalness 0.7, roughness 0.35, subtle emissive)
2. **`makeAccentMaterial(color)`** — bright self-luminous tips/cores (MeshBasicMaterial, blooms under bloom pass)
3. **`makeGlowMaterial(color, opacity)`** — transparent halo/overlay (MeshBasicMaterial, transparent, DoubleSide)

This creates visual depth: dark body → bright highlights → soft halo.

### Lighting and post-processing
- Ambient light: `0x1a1a2e` intensity `0.6`
- Main directional: `0xc0c8ff` intensity `0.9`, upper-right position
- Fill light: `0x4040a0` intensity `0.3`, lower-left
- Hemisphere: `0x1a1a3e` / `0x080810` intensity `0.4`
- Bloom: UnrealBloomPass — strength `0.35`, radius `0.15`, threshold `0.65`
- Tone mapping: `THREE.ACESFilmicToneMapping`, exposure `1.1`
- **Key insight:** threshold `0.65` means only MeshBasicMaterial (accent/glow) blooms. MeshStandardMaterial (structural) is too dark. This creates selective neon glow.

### Animation patterns
- All objects bob: `y = baseY + sin(now * 3 + idOffset) * 2` (idOffset randomized per object)
- Hit flash: lerp materials toward white for 0.15s on damage
- Accent opacity pulse: `opacity = A + B * sin(now * freq + idOffset)`
- Slow spin, counter-rotate, scale breathing as appropriate

### Camera character
- PerspectiveCamera, FOV `55`, OrbitControls with damping `0.06`
- Angled top-down / isometric-ish (~45 elevation)
- Favor readability over drama
- The player should always understand unit motion, base pressure, and structure placement
- Camera home key (H) snaps to player base
- Minimap click-to-pan for fast navigation

---

## 4. Gameplay Spec

### Match structure
- One player base (row 36), one enemy base (row 2)
- Three territory zones: Enemy (rows 1-13), Shared (rows 14-26), Player (rows 27-38)
- Generators + territory control (no passive income)
- Player builds structures in valid territory
- Buildings produce units automatically with upgrade bonuses
- Units path toward the enemy base via A* on a 40×40 tile grid
- Units stop to fight enemies in range, then continue advancing
- Enemy AI builds, upgrades, and escalates with strategy profiles
- Win by destroying enemy core; lose if player core is destroyed
- Three difficulty levels: Easy, Normal, Hard

### Buildings

#### Core / Base
- Starting structure only (3×3 tiles)
- 5000 HP — main loss condition
- Not upgradeable

#### Barracks
- 2×2 tiles, cost 75, build time 5s
- Produces Rifle infantry automatically (every 16s base)
- **Upgrade path:** L0 → L1 (100E, 13s prod, +20% HP, +15% dmg) → L2 (200E, 10s prod, +40% HP, +30% dmg)
- **Branch A — Assault Doctrine** (400E): Trains Assault units, 12s prod, 1.5x HP, 1.4x dmg
- **Branch B — Rapid Deployment** (450E): 7s prod, 1.3x HP, 1.2x dmg, 1.25x speed

#### Pulse Turret
- 1×1 tile, cost 120, build time 6s
- Static defense — homing projectiles
- **Upgrade path:** L0 (12 dmg, 0.35s fire rate, 120 range) → L1 (100E, 20 dmg, 0.28s, 135 range) → L2 (200E, 32 dmg, 0.20s, 155 range)
- **Branch A — Overclock** (550E): 28 dmg, insane fire rate (0.09s), 160 range
- **Branch B — Heavy Bolts** (600E): 55 dmg, 0.25s fire rate, 165 range, splash (radius 50, 25 splash dmg)

#### Factory
- 2×2 tiles, cost 225, build time 8s
- Produces Tank units automatically (every 32s base)
- **Upgrade path:** L0 → L1 (175E, 26s prod) → L2 (350E, 22s prod)
- **Branch A — Heavy Armor** (600E): 28s prod, 1.8x HP, 1.2x dmg, 0.85x speed
- **Branch B — Siege Cannons** (550E): 22s prod, 1.2x HP, 1.6x dmg, 1.3x range

#### Generator
- 1×1 tile, cost 60, build time 5s
- Increases energy income
- **Upgrade path:** L0 (+3/s) → L1 (+5/s, 100E) → L2 (+7/s, 200E)
- **Branch A — Overcharge** (500E): +10/s income
- **Branch B — Capacitor Network** (425E): +6/s income + 2× territory bonus multiplier

#### Helipad
- 2×2 tiles, cost 300, build time 10s
- Produces Helicopter air units (every 40s base)
- **Upgrade path:** L0 → L1 (200E, 34s prod, +15% heli stats) → L2 (400E, 28s prod, +30%)
- **Branch A — Gunship Bay** (600E): 30s prod, +60% damage
- **Branch B — Rapid Scramble** (550E): 20s prod, +15% speed

#### Wall
- 1×1 tile, cost 25, build time 3s
- Destructible barrier — blocks and funnels enemies
- **Upgrade path:** L0 (120 HP) → L1 (250 HP, 30E) → L2 (400 HP, 60E)
- **No branches** — walls only have level upgrades
- **Repairable:** damaged walls can be repaired (cost 10E, 2s)
- Wall HP uses absolute values from level table, not multipliers
- Uses `TILE_WALL` (4) — distinct tile type from `TILE_BUILDING`

### Units

#### Rifle Unit
- 80 HP, 35 speed, 8 damage, 120 range, 1.0 fire rate
- Cheap baseline infantry, general purpose

#### Assault Unit
- 160 HP, 28 speed, 14 damage, 100 range, 0.8 fire rate
- Tougher frontline role (produced by Branch A Barracks)

#### Tank
- 400 HP, 16 speed, 35 damage, 160 range, 0.5 fire rate
- Slower, more durable, stronger siege pressure

#### Helicopter
- 200 HP, 60 speed, 4 damage, 130 range, 5.0 fire rate
- **Air unit** (`isAir: true`) — flies at Y=60, orbits rally point at radius 120
- Skips ground pathfinding, collision, and rally hold
- Only targets enemy units (never buildings)
- Player can click to select, then click map/minimap to set rally point
- AI manages helicopter rally targeting densest player cluster

### Upgrade System
All buildings except Core support a **three-tier upgrade path**:
- **L0 → L1 → L2**: Progressive stat improvements (costs and stats defined per building type)
- **L2 → Branch A or Branch B**: Specialization choice (mutually exclusive)

Upgrading puts a building into `constructionState` for a duration. During construction:
- Production buildings pause unit production
- Turrets pause firing
- Building mesh is rebuilt on completion

Upgradeable types: Turret, Barracks, Factory, Generator, Helipad, Wall (Wall has no branches)

### Squad Command System
Each production building (Barracks, Factory, Helipad) gets a **squad** (`squads.js`).

- Units auto-assigned to parent building's squad at creation
- **Stances** control movement: `ADVANCE` (default), `DEFEND` (hold near own base), `HOLD` (stop moving)
- **Target priorities** control combat: `ANY` (default), `UNITS`, `BUILDINGS`
- Commands set per-squad and propagated to member units
- Global commands set stance/priority for all squads at once
- Helicopters are excluded from squads (they use individual rally)
- Rally system only manages advance-stance units; defend/hold skip rally

### Economy
Primary resource is **Energy**. No passive income — players must build generators.

- **Generators**: +3 to +10E/s depending on level/branch
- **Territory control**: +1E/s per friendly building in the shared zone (rows 14-26)
- **Territory multiplier**: Capacitor Network generators multiply territory income
- **No upkeep**: Units are free to maintain
- **No salvage**: No energy from kills
- **Starting energy**: Lump-sum start, varies by difficulty (Easy: 600/400 AI, Normal: 500/500, Hard: 400/600 AI)
- **AI income multiplier**: Applied to generator output (Easy: 0.5×, Normal: 1.0×, Hard: 1.5×)

### Obstacles and Battlefield Generation
**Controlled procedural generation** with 10 themed obstacle types:

- Tesla Coil, Power Cell, Circuit Monolith, Capacitor Bank
- Relay Tower, Data Obelisk, Plasma Conduit, Power Pylon
- Transformer Stack, Cable Rack

Each obstacle type has defined cell dimensions (2×2 to 6×2), height range, weight, and HP category. Obstacles use neon accent colors and dark structural base colors.

Generation rules:
- 18-30 obstacles per map, scattered rows 3-37
- 3-tile exclusion zone around each base center
- Always preserve at least one valid route between bases (A* validation after placement)
- Obstacles are static per match (cached at match start)

### Navigation
**A* pathfinding** on a 40×40 tile grid with performance optimizations:

- **Path cache**: Keyed on start/goal, expires after `PATH_CACHE_TTL` (2s)
- **Frame budget**: Max `PATH_BUDGET_PER_FRAME` (12) A* computations per frame (adaptive, scales with unit count up to 30)
- **`beginPathFrame()`** must be called at start of each game frame
- **`invalidatePathCache()`** called automatically from `setTile()` when grid topology changes
- **Congestion-aware repath**: `findPathWeighted()` adds cost per unit occupying a tile
- **Stuck detection**: Units that haven't moved `STUCK_PROGRESS_MIN` (3 units) in `STUCK_TIME_THRESHOLD` (1.2s) trigger congestion repath
- **Wall-aware pathfinding**: `findPathThroughWalls()` treats `TILE_WALL` as passable with cost `WALL_TRAVERSAL_COST` (25). Units periodically compare wall path vs detour; if savings > `WALL_ATTACK_THRESHOLD` (8 tiles), they target the first enemy wall.

### Combat
- **Priority-scored targeting**: Distance weight + low HP bonus + target priority modifiers
- Automatic targeting and firing with fire rate cooldowns
- Homing projectiles for turrets (with optional splash damage for Heavy Bolts branch)
- Straight-line projectiles for units
- **Target priority system**: Units with `TARGET_UNITS` get +50 bonus vs units / -30 vs buildings, and vice versa
- **Wall targeting**: Units with `_wallTarget` get +100 score bonus for that specific wall
- Helicopters only target enemy units, never buildings
- Salvage energy awarded to the killing team on unit death
- Hit particles, muzzle flash effects, wall-specific hit/break effects

### Rally System
Both teams have a rally/push coordination system:

- **Player rally**: Units stage at row 29 before pushing (configurable push size and max wait time)
- **AI rally**: Units stage at row 9, released in waves based on `AI_PUSH_SIZE` and `AI_MAX_RALLY_TIME`
- Player can force an early push via HUD button
- Only advance-stance units participate in rally; defend/hold skip it

### Enemy AI
The AI is a credible opponent with varied behavior:

- **Strategy profiles**: `rusher` (early aggression), `turtle` (defensive buildup), `balanced` (adaptive)
  - Each profile adjusts timing multipliers for barracks, factory, turret, generator builds and push sizes
- **Difficulty levels**: Easy (0.5× income, noisy scoring), Normal (1× baseline), Hard (1.5× income, precise scoring, faster upgrades)
- **Priority scoring**: Scores all possible actions (build, upgrade, repair) and picks the best
- **Multi-action per tick**: Up to 4 build/upgrade actions per AI tick (2s interval)
- **Scouting intel**: Periodically scans player composition to adapt strategy
- **Strategy adaptation**: Re-evaluates every 30s, shifting priorities based on army ratio
- **Wave composition**: Waits for diverse unit mix before pushing (power scoring per unit type)
- **Building decisions**: Barracks → Turrets → Factory → Generator → Helipad → Walls (timing-gated)
- **Upgrade decisions**: Scores and upgrades all building types with per-type timing gates
- **Wall management**: Builds defensive walls (rows 5-10), repairs at <50% HP, upgrades after 70s
- **Helicopter rally**: Targets densest player unit cluster
- **Economic planning**: Suppresses cheap buys if an expensive item is affordable within save horizon

---

## 5. Architecture — Match the Existing Pattern

The project follows a **flat-module architecture** proven in Neon Defense 4. Do not reorganize into deeply nested subdirectories.

### Core design principles

1. **Logic classes contain ZERO rendering code.** Unit, Building, Projectile, and Particle classes store state only. The `renderer/` folder reads that state and draws it. This separation is mandatory.

2. **One `config.js` owns ALL data.** Every constant, enum, stat table, color definition, and tuning parameter lives in `config.js`. Gameplay classes import from it. This makes balancing trivial — change one file to retune the whole game.

3. **DOM-based UI, not canvas.** The HUD/sidebar is built with HTML elements managed by `hud.js`. CSS handles styling. The only canvas in the HUD is the minimap. This keeps UI code separate from the Three.js render pipeline.

4. **Single HTML entry with overlay states.** Menu, pause, victory, and defeat screens are DOM overlays toggled via CSS classes (`.hidden`), not separate pages. Difficulty selector is in the menu overlay.

5. **`main.js` is the sole orchestrator.** It creates all systems, runs the game loop (`requestAnimationFrame`), and wires everything together via callbacks. No other file should run the game loop or manage global state transitions.

6. **Vite + ES modules.** Standard `import`/`export`, `"type": "module"` in package.json, Three.js imported via npm.

7. **Renderer uses the three-tier material pattern.** `scene.js` exports `makeStructuralMaterial`, `makeAccentMaterial`, `makeGlowMaterial`. Every mesh in the game uses these three factories.

8. **Procedural sound.** `sound.js` generates all audio via Web Audio API oscillators and noise buffers — no audio files needed.

9. **Callback-based wiring.** Systems communicate through callbacks passed by `main.js`, not direct imports between sibling modules. This preserves modularity and prevents circular dependencies.

10. **Performance patterns.** Dirty-flagged alive caches in units/buildings/projectiles, `SpatialHash` for O(n) collision detection, path cache with TTL + frame budget.

---

## 6. Folder Structure

```text
neon-siege/
  package.json
  vite.config.js (if present)
  src/
    game.html              <- single HTML entry with menu/pause/victory/defeat overlays + difficulty selector
    css/
      style.css            <- all CSS in one file
    js/
      config.js            <- ALL constants, enums, data tables, stat definitions, colors, AI params
      main.js              <- game loop, state management, orchestration, callback wiring
      units.js             <- Unit class (logic only, NO rendering) — movement, collision, wall evaluation
      buildings.js         <- Building class (logic only, NO rendering) — production, upgrades, wall repair
      projectiles.js       <- Projectile classes (logic only, NO rendering) — straight-line + homing
      particles.js         <- Particle system (data only, NO rendering)
      map.js               <- Grid/tile management, buildable checks, obstacle generation, territory zones
      path.js              <- A* pathfinding with cache, budget, congestion, wall-aware variants
      squads.js            <- Squad command system — stances, target priorities, membership tracking
      waves.js             <- Enemy AI controller + player rally coordination
      economy.js           <- Resource/income system — generators, territory, upkeep, salvage
      combat.js            <- Priority-scored targeting, damage resolution, splash damage
      hud.js               <- DOM-based sidebar UI with minimap, squad cards, upgrade panels
      input.js             <- Mouse/touch raycaster, helicopter selection, camera snap
      utils.js             <- Math helpers (clamp, dist, lerp, etc.), SpatialHash class, nextId()
      sound.js             <- Procedural audio via Web Audio API
      renderer/
        scene.js           <- Scene, camera, lights, bloom, material factories
        grid.js            <- Grid lines, terrain, placement preview, obstacle meshes
        unitMeshes.js      <- Unit 3D models (reads Unit state, renders) — level/branch visual variants
        buildingMeshes.js  <- Building 3D models (reads Building state, renders) — level/branch visual variants
        projectileRenderer.js <- Projectile rendering (straight + homing + trails)
        particleRenderer.js   <- Particle rendering
        effectRenderer.js     <- Visual effects (beams, arcs, explosions, etc.)
```

This structure is not negotiable. The flat layout keeps things simple and matches the proven Neon Defense pattern.

---

## 7. Agent Teams Rules

This project is designed to use **Claude Code Agent Teams**.

### Lead role
The Lead should coordinate, assign, integrate, validate, and fix interface mismatches. The Lead should avoid becoming the main implementer unless integration work requires it.

### Team structure
Create **one team per session**. Clean it up when done.

### Teammate model
- Use **Sonnet** for teammates
- Lead uses the stronger coordination model available

### Spawn prompt rule
Every teammate spawn prompt must include:
- their exact role
- the files they own (specific filenames, not directories)
- what they must build
- what they must not touch
- a direct instruction to **read CLAUDE.md and VISUAL_STYLE_GUIDE.md immediately**
- for renderer agents: use the three-tier material pattern (`makeStructuralMaterial`, `makeAccentMaterial`, `makeGlowMaterial`) from `scene.js`
- for logic agents: classes must contain ZERO rendering code
- for all agents: `config.js` is the single source of truth for all data/constants — import from it, don't duplicate

### Blank-context rule
Teammates do **not** inherit the Lead's conversation history. Treat every teammate as if they know nothing except what is in the spawn prompt and repository files.

### File ownership rule
**Two teammates must never edit the same file.**

This is the most important coordination rule.

### Shared file rule
The Lead owns shared integration files:
- `neon-siege/src/js/main.js`
- `neon-siege/src/js/config.js`
- `neon-siege/src/game.html`

### Task design rule
Use **dependency waves**:
- Wave 1: independent parallel subsystem tasks
- Wave 2: integration tasks depending on Wave 1
- Wave 3: polish / balancing / bugfix tasks depending on Wave 2

### Messaging rule
Use direct messages by default. Use broadcast only for critical project-wide blockers.

### Worktree rule
Strict file ownership is usually enough, but `isolation: "worktree"` is encouraged when there is any risk of overlap.

---

## 8. File Ownership Plan

### Lead owns
- `neon-siege/src/js/main.js`
- `neon-siege/src/js/config.js`
- `neon-siege/src/js/squads.js`
- `neon-siege/src/js/utils.js`
- `neon-siege/src/game.html`
- final integration across systems
- build fixes
- shared bootstrapping and runtime wiring

### world-agent owns
- `neon-siege/src/js/map.js`
- `neon-siege/src/js/path.js`
- `neon-siege/src/js/renderer/grid.js`

Responsible for: terrain grid, tile management (including `TILE_WALL`), buildable zones, pathfinding (standard, weighted, wall-aware), obstacle generation, grid rendering, path visualization, placement preview.

Must not edit any other `neon-siege/src/js/` files.

### entity-agent owns
- `neon-siege/src/js/units.js`
- `neon-siege/src/js/buildings.js`
- `neon-siege/src/js/projectiles.js`
- `neon-siege/src/js/combat.js`
- `neon-siege/src/js/renderer/unitMeshes.js`
- `neon-siege/src/js/renderer/buildingMeshes.js`
- `neon-siege/src/js/renderer/projectileRenderer.js`

Responsible for: Unit/Building/Projectile logic classes (NO rendering code in logic files), upgrade system, wall repair, turret/production stats, helicopter flight logic, priority-scored targeting and damage resolution, 3D mesh creation and updates (in renderer/ files using three-tier material pattern).

Must not edit: `main.js`, `config.js`, `map.js`, `path.js`, `hud.js`, `style.css`, `waves.js`, `squads.js`

### ai-agent owns
- `neon-siege/src/js/waves.js`
- `neon-siege/src/js/economy.js`

Responsible for: enemy AI decision loop (strategy profiles, priority scoring, multi-action ticks, adaptation), economy/resource system (generators, territory, upkeep, salvage), player rally coordination, match pacing, build priorities, upgrade decisions, wall management, helicopter rally.

Must not edit any other `neon-siege/src/js/` files.

### ui-agent owns
- `neon-siege/src/js/hud.js`
- `neon-siege/src/css/style.css`
- `neon-siege/src/js/input.js`
- `neon-siege/src/js/sound.js`

Responsible for: DOM sidebar UI (resource display, income breakdown, base health, build buttons, upgrade panels, squad cards, minimap, helicopter info, rally status, base alert), all CSS styling (following VISUAL_STYLE_GUIDE.md), mouse/touch input via raycaster (including helicopter selection, right-click deselect, camera snap), procedural audio.

Must not edit any other `neon-siege/src/js/` files.

### fx-agent owns
- `neon-siege/src/js/particles.js`
- `neon-siege/src/js/renderer/particleRenderer.js`
- `neon-siege/src/js/renderer/effectRenderer.js`
- `neon-siege/src/js/renderer/scene.js`

Responsible for: Three.js scene setup, camera, lights, bloom pipeline, material factories, particle system (data + renderer — explosion, bigExplosion, hit, muzzleFlash, wallBreak, wallHit, wallRepair), visual effects.

Must not edit any other `neon-siege/src/js/` files.

---

## 9. Key Integration Patterns

These patterns are established and must be followed when extending the game.

### Callback wiring
`main.js` wires all cross-system communication through callback objects. For example:
- `updateAI(dt, matchTime, { getEnergy, spendEnergy, createBuilding, ... })`
- `updateBuildings(dt, matchTime, { createUnit, findPath })`
- `updateUnits(dt, { findPath, findPathWeighted, findPathThroughWalls, buildCongestionMap, ... })`
- `updateCombat(dt, { getUnits, getBuildings, createProjectile, createHomingProjectile, removeUnit, removeBuilding, spawnParticle })`

### Adding a new building type
1. Add `BTYPE_*` constant and stats to `config.js` (BUILDING_STATS, upgrade timing, AI timing)
2. Add to `PLAYER_BUILDABLE` array in `config.js`
3. Implement logic in `buildings.js` (add to `UPGRADEABLE_TYPES` if upgradeable, add to `UPGRADE_PARAMS`)
4. Create 3D mesh in `renderer/buildingMeshes.js` with level/branch visual variants
5. Add AI build/upgrade logic in `waves.js`
6. Wire in `main.js`: squad creation, mesh creation, sound, particles
7. Add HUD support in `hud.js` (build button, upgrade panel)

### Adding a new unit type
1. Add `UTYPE_*` constant and stats to `config.js`
2. Logic handled automatically by `units.js` (movement) and `combat.js` (targeting) using stats
3. Set `produceUnit` on the parent building type in `config.js`
4. Create 3D mesh in `renderer/unitMeshes.js`
5. Add salvage value in `config.js` (`SALVAGE_VALUES`)
6. If air unit: add `isAir: true` to stats, add special movement logic in `units.js`

### Performance-sensitive areas
- `beginPathFrame()` must be called at start of each game frame
- Path cache invalidates automatically when `setTile()` modifies the grid
- `SpatialHash` in `utils.js` is used for O(n) broad-phase collision
- Dirty-flagged alive caches in units/buildings/projectiles avoid re-filtering every frame
- Obstacles are static per match — cache with `getObstacles()` in `initMatch()`

---

## 10. Task Wave Template

### Wave 1 — independent foundations
- **Lead**: scaffold `config.js` with all enums, data tables, constants; scaffold `game.html` with overlay structure; scaffold `main.js` entry point
- **fx-agent**: `scene.js` (scene, camera, lights, bloom, material factories)
- **world-agent**: `map.js` + `path.js` + `renderer/grid.js` (grid, tiles, pathfinding, terrain rendering)
- **entity-agent**: `units.js` + `buildings.js` + `projectiles.js` + `combat.js` (logic classes, no rendering yet)
- **ai-agent**: `economy.js` + `waves.js` (resource system, AI decision loop scaffolding)
- **ui-agent**: `hud.js` + `style.css` + `input.js` + `sound.js` (HUD shell, CSS, input pipeline, audio)

### Wave 2 — rendering + integration
- **entity-agent**: `renderer/unitMeshes.js` + `renderer/buildingMeshes.js` + `renderer/projectileRenderer.js` (3D models using material factories from scene.js)
- **fx-agent**: `particles.js` + `renderer/particleRenderer.js` + `renderer/effectRenderer.js`
- **Lead**: wire everything together in `main.js` — game loop, state transitions, connect all systems

### Wave 3 — playable loop and polish
- victory/defeat flow
- restart loop
- pacing and balance pass
- build placement feedback
- visual polish and consistency pass
- bug fixes

---

## 11. Recommended Startup Procedure

1. Read `CLAUDE.md`
2. Read `VISUAL_STYLE_GUIDE.md`
3. Inspect repository structure (especially `neon-siege/src/js/` and `neon-siege/src/js/renderer/`)
4. Create the team
5. Define file ownership clearly
6. Spawn teammates with explicit file boundaries
7. Create Wave 1 tasks
8. Let teammates implement in parallel
9. Integrate completed work in Lead-owned shared files
10. Run the game (`npx vite` from `neon-siege/` directory)
11. Fix runtime/build errors
12. Tune pacing and readability
13. Request shutdown from all teammates
14. Delete the team

---

## 12. Acceptance Standard

A task or milestone is only "done" when:
- it builds successfully (`npx vite build` from `neon-siege/`)
- it runs without obvious breakage
- it integrates cleanly with neighboring systems
- it respects file boundaries
- it improves the real playable experience

Do not claim completion if the result is only scaffolding, pseudo-logic, or disconnected files.

---

## 13. Current State Summary

The game is **fully playable** with deep systems. Here is what exists as of the last update:

### Implemented systems
- Full match loop: menu → difficulty select → play → victory/defeat → restart
- 7 building types: Core, Barracks, Turret, Factory, Generator, Helipad, Wall
- 4 unit types: Rifle, Assault, Tank, Helicopter
- Multi-tier upgrade system (L0 → L1 → L2 → Branch A/B) for all building types except Core
- Squad command system with stances and target priorities
- Economy with generators, territory control, upkeep, and salvage
- AI with strategy profiles, difficulty scaling, multi-action ticks, scouting, and adaptation
- Wall system with repair, upgrade, wall-aware pathfinding, and AI wall management
- Helicopter system with air units, rally points, orbital flight
- 10 themed obstacle types with procedural placement
- Minimap with viewport rectangle and click-to-pan
- Base-under-attack alerts
- Rally/push coordination for both teams
- Procedural audio for all game events
- Full neon visual style with three-tier materials and bloom

### Areas for future work
- Additional unit types or abilities
- More obstacle interaction (destructible obstacles, terrain effects)
- Multiplayer or additional game modes
- Advanced AI behaviors (flanking, feinting, combined arms tactics)
- Tutorial or onboarding flow
- Sound volume controls and music
- Mobile/touch input polish
- Balance tuning passes
- Visual effects polish (more particle variety, screen shake, etc.)

---

## 14. Final Principle

Neon Siege should feel like a **polished, deeply playable, visually stunning game**.

The target is a refined experience with depth, replayability, and consistent quality across every system.
