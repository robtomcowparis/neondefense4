# Prompt.md — Neon Siege Agent-Team Build Prompt

Build a new game for my website called **Neon Siege** using **JavaScript, HTML/CSS, Three.js, and Vite**.

This is a **3D base-vs-base RTS-lite / siege game** for my Neon Arcade. Two opposing bases sit on opposite sides of a battlefield. The map includes **controlled procedural obstacle clusters** that create partial chokepoints and route variation without breaking pathing. The enemy base spawns attackers that march toward my base and fire on it. I build structures and produce my own defenders, support units, and later tanks. The enemy does the same as the match progresses. The objective is to destroy the opposing base.

---

## Important: Use Agent Teams

You have Agent Teams enabled. I want you to use them intentionally and correctly.

Follow these principles:
- **You are the Lead / coordinator**, not the main implementer.
- Create **one team for this session** and use teammates for subsystem work.
- Teammates start with **blank context**, so their spawn prompts must include all relevant role context and tell them to **read CLAUDE.md immediately**.
- Use a **task graph with dependency waves**.
- **Never let two teammates edit the same file.**
- Prefer **strict file ownership** over messy overlap.
- Use **Sonnet teammates** and keep the Lead focused on planning, assigning, integrating, reviewing, and fixing interface mismatches.
- Use direct messages, not broadcast, unless there is a critical blocking issue.
- When work is complete, request teammate shutdown and clean up the team.
- Prefer worktree isolation if there is any risk of overlap.

---

## Read First

Before doing anything else:
1. Read `CLAUDE.md`
2. Read `VISUAL_STYLE_GUIDE.md` — this is the authoritative reference for the Neon Arcade visual style
3. Inspect the repository structure (especially `src/js/` and `src/js/renderer/`)
4. Create a team for Neon Siege
5. Switch into Lead / coordination mode
6. Enforce the file ownership rules defined in `CLAUDE.md`

---

## Style Requirements

This game must belong in the same "Neon Arcade" universe as my existing projects.

The complete visual specification lives in `VISUAL_STYLE_GUIDE.md`. The key rules are:

- **Near-black / deep indigo background** (`#040410`) rather than pure black
- **Primary accents** should be neon cyan, with magenta as secondary and gold / green / orange / red used functionally
- Visual identity should be **retro-futuristic neon / cyberpunk / electric industrial**, but still clean and readable
- Use the **three-tier material system** from `scene.js`:
  - `makeStructuralMaterial(color)` — dark metallic body (MeshStandardMaterial, color x0.25, metalness 0.7, roughness 0.35)
  - `makeAccentMaterial(color)` — bright self-luminous tips/cores (MeshBasicMaterial, blooms under bloom pass)
  - `makeGlowMaterial(color, opacity)` — transparent halo/overlay (MeshBasicMaterial, transparent, DoubleSide)
- Use **cool-toned lighting** (ambient 0x1a1a2e, directional 0xc0c8ff, fill 0x4040a0, hemisphere)
- Use **selective bloom** via UnrealBloomPass (strength 0.35, radius 0.15, threshold 0.65) — only MeshBasicMaterial blooms
- Use a **readable angled top-down 3D camera** (PerspectiveCamera FOV 55, OrbitControls with damping)
- Use **simple geometric silhouettes** for units and structures — every mesh follows the three-tier pattern: structural body + accent tip + glow halo
- All objects **bob**: `y = baseY + sin(now * 3 + idOffset) * 2`
- **Fonts:** Orbitron (titles/buttons) + Share Tech Mono (data/values)
- UI should feel consistent with the existing arcade:
  - dark translucent panels (`#08081A`, cyan borders `#00b4c8`)
  - uppercase headings
  - monospace-heavy HUD text
  - scanlines overlay
  - compact, readable controls
- Maintain strong clarity for:
  - player vs enemy ownership
  - building types
  - unit roles
  - health states
  - placement validity
  - selected object info

---

## Core MVP Design

Build the MVP first. Do not overengineer.

### Match Structure
- One player base and one enemy base on opposite sides of the battlefield
- Passive resource income over time
- Player can build structures in a valid build zone on their side
- Buildings produce units automatically or semi-automatically
- Units path toward the enemy, stop to fire at enemies in range, then continue advancing
- Enemy AI follows similar rules and escalates over time
- Win by destroying the enemy base
- Lose if your base is destroyed

### MVP Buildings
1. **Core / Base**
   - starting structure for each side
   - large health pool
   - main loss condition

2. **Barracks**
   - produces basic infantry automatically
   - early battlefield presence

3. **Turret**
   - static defense
   - protects territory and supports pushes

4. **Factory**
   - produces tank-class units
   - slower, more expensive midgame escalation

### MVP Units
Keep the roster small and distinct:
- **Rifle Unit**: cheap general infantry
- **Assault Unit**: tougher infantry / stronger frontline
- **Tank**: slow, durable, strong siege unit

### Economy
Use one simple resource, such as **Energy**.
- passive income
- readable costs
- no complex economy chains in MVP

### Map / Obstacles
Use **controlled procedural generation** from modular obstacle clusters, not chaotic random placement.
Examples:
- broken wall clusters
- rock ridges with gaps
- neon crystal formations
- barrier fields
- small central ruins

Rules:
- always preserve at least one valid route between bases
- avoid unfair full blockages
- avoid tiny impassable chokepoints
- keep enough open space for tank movement

### Pathing
This is a technical risk, so simplify it deliberately.
Use one of:
- coarse nav grid + A*
- waypoint graph
- broad lanes with local avoidance

Do **not** attempt a huge overcomplicated RTS navigation system for v1.

### Combat
Automatic combat only.
- units acquire nearby enemies
- if no unit is available, they can target enemy structures
- use readable projectile effects
- keep the damage model simple and hitpoint-based
- avoid advanced cover simulation, armor penetration complexity, or excessive status systems in MVP

### Enemy AI
Rule-based AI is enough for v1.
Expected behavior:
- build Barracks early
- maintain unit pressure
- add Turrets when threatened
- add Factory later
- keep spending instead of stockpiling too much
- escalate from infantry pressure into heavier attacks

### Camera / UX
- readable angled top-down perspective (PerspectiveCamera + OrbitControls)
- pan and zoom controls
- compact HUD
- clear build menu
- selected unit/building info panel
- visible base health for both sides
- obvious victory / defeat state
- restart loop

---

## Architecture Requirements — Match the Existing Pattern

The project must follow the same flat-module architecture that works in Neon Defense 4. This is a proven structure — do not reorganize it into deeply nested subdirectories.

### File Layout
```
src/
  game.html              ← single HTML entry with menu/pause/gameover overlays
  css/
    style.css            ← all CSS in one file
  js/
    config.js            ← ALL constants, enums, data tables, stat definitions
    main.js              ← game loop, state management, orchestration
    units.js             ← Unit class (logic only, NO rendering)
    buildings.js         ← Building class (logic only, NO rendering)
    projectiles.js       ← Projectile classes (logic only, NO rendering)
    particles.js         ← Particle system (data only, NO rendering)
    map.js               ← Grid/tile management, buildable checks
    path.js              ← Pathfinding / navigation
    waves.js             ← (or ai.js) Enemy AI controller, build logic, escalation
    economy.js           ← Resource/income system
    combat.js            ← Targeting, damage resolution
    hud.js               ← DOM-based sidebar UI (HTML, not canvas)
    input.js             ← Mouse/touch -> raycaster -> grid coordinates
    utils.js             ← Math helpers (clamp, dist, lerp, etc.)
    sound.js             ← Procedural audio via Web Audio API
    renderer/
      scene.js           ← Scene, camera, lights, bloom, material factories
      grid.js            ← Grid lines, terrain, placement preview
      unitMeshes.js      ← Unit 3D models (reads Unit state, renders)
      buildingMeshes.js  ← Building 3D models (reads Building state, renders)
      projectileRenderer.js ← Projectile rendering
      particleRenderer.js   ← Particle rendering
      effectRenderer.js     ← Visual effects (beams, arcs, nova rings, etc.)
```

### Core Design Principles

1. **Logic classes contain ZERO rendering code.** Unit, Building, Projectile, and Particle classes store state only. The `renderer/` folder reads that state and draws it. This separation is mandatory.

2. **One config.js owns ALL data.** Every constant, enum, stat table, color definition, and tuning parameter lives in `config.js`. Gameplay classes import from it. This makes balancing trivial — change one file to retune the whole game.

3. **DOM-based UI, not canvas.** The HUD/sidebar is built with HTML elements managed by `hud.js`. CSS handles styling. This keeps UI code separate from the Three.js render pipeline.

4. **Single HTML entry with overlay states.** Menu, pause, and game-over screens are DOM overlays toggled via CSS classes (`.hidden`), not separate pages.

5. **main.js is the orchestrator.** It creates all systems, runs the game loop (`requestAnimationFrame`), and wires everything together. No other file should run the game loop or manage global state transitions.

6. **Vite + ES modules.** Standard `import`/`export`, `"type": "module"` in package.json, Three.js imported via npm.

7. **Renderer uses the three-tier material pattern.** `scene.js` exports `makeStructuralMaterial`, `makeAccentMaterial`, `makeGlowMaterial`. Every mesh in the game uses these three factories. This is what creates the consistent neon visual style.

8. **Procedural sound.** `sound.js` generates all audio via Web Audio API oscillators and noise buffers — no audio files needed.

---

## Agent Team Execution Plan

I want you to do this using an actual coordinated team, not just mention Agent Teams.

### Lead ownership
The Lead owns:
- `src/js/main.js`
- `src/js/config.js`
- `src/game.html`
- shared bootstrapping and integration
- final runtime fixes

### Team roles and file ownership

#### world-agent
Owns:
- `src/js/map.js`
- `src/js/path.js`
- `src/js/renderer/grid.js`

Responsible for:
- terrain grid, tile management, buildable zone checks
- pathfinding / navigation solution
- obstacle generation
- grid rendering, path visualization, placement preview

Must not edit any other `src/js/` files.

#### entity-agent
Owns:
- `src/js/units.js`
- `src/js/buildings.js`
- `src/js/projectiles.js`
- `src/js/combat.js`
- `src/js/renderer/unitMeshes.js`
- `src/js/renderer/buildingMeshes.js`
- `src/js/renderer/projectileRenderer.js`

Responsible for:
- Unit/Building/Projectile classes (logic only in the .js files)
- Targeting and damage resolution
- 3D mesh creation and update for all entities (in renderer/ files)
- Must follow the three-tier material pattern from `scene.js`

Must not edit: `main.js`, `config.js`, `map.js`, `path.js`, `hud.js`, `style.css`, `ai.js`

#### ai-agent
Owns:
- `src/js/waves.js` (or `src/js/ai.js`)
- `src/js/economy.js`

Responsible for:
- enemy AI decision loop (build priorities, spend logic, escalation)
- economy/resource system for both player and enemy
- match pacing

Must not edit any other `src/js/` files.

#### ui-agent
Owns:
- `src/js/hud.js`
- `src/css/style.css`
- `src/js/input.js`
- `src/js/sound.js`

Responsible for:
- DOM sidebar UI (build menu, selection panel, resource display, base health)
- All CSS styling (must follow VISUAL_STYLE_GUIDE.md)
- Mouse/touch input → raycaster → grid coordinates
- Procedural audio

Must not edit any other `src/js/` files.

#### fx-agent
Owns:
- `src/js/particles.js`
- `src/js/renderer/particleRenderer.js`
- `src/js/renderer/effectRenderer.js`
- `src/js/renderer/scene.js`

Responsible for:
- Three.js scene setup, camera, lights, bloom pipeline, material factories
- Particle system (data class + renderer)
- Visual effects (beams, explosions, nova rings, shield breaks, etc.)

Must not edit any other `src/js/` files.

---

## Dependency Waves

### Wave 1 — parallel foundations
- **Lead**: scaffold `config.js` with all enums, data tables, and constants; scaffold `game.html` with overlay structure; scaffold `main.js` entry point
- **fx-agent**: `scene.js` (scene, camera, lights, bloom, material factories)
- **world-agent**: `map.js` + `path.js` + `renderer/grid.js` (grid, tiles, pathfinding, terrain rendering)
- **entity-agent**: `units.js` + `buildings.js` + `projectiles.js` + `combat.js` (logic classes, no rendering yet)
- **ai-agent**: `economy.js` + `waves.js` (resource system, AI decision loop scaffolding)
- **ui-agent**: `hud.js` + `style.css` + `input.js` + `sound.js` (HUD shell, CSS, input pipeline, audio)

### Wave 2 — rendering + integration
- **entity-agent**: `renderer/unitMeshes.js` + `renderer/buildingMeshes.js` + `renderer/projectileRenderer.js` (3D models using material factories from scene.js)
- **fx-agent**: `particles.js` + `renderer/particleRenderer.js` + `renderer/effectRenderer.js`
- **Lead**: wire everything together in `main.js` — game loop, state transitions, connect all systems

### Wave 3 — playable loop
- win/loss conditions
- pacing pass
- balance tuning
- visual polish
- restart loop
- build/runtime bug fixing

---

## Spawn Prompt Rules

When spawning teammates:
- explicitly tell each teammate what files they own
- tell them what files they must not modify
- tell them to read `CLAUDE.md` and `VISUAL_STYLE_GUIDE.md`
- give them concrete acceptance criteria
- tell renderer agents to use the three-tier material pattern (`makeStructuralMaterial`, `makeAccentMaterial`, `makeGlowMaterial`)
- tell logic agents that their classes must contain ZERO rendering code
- tell them `config.js` is the single source of truth for all data/constants — import from it, don't duplicate
- keep them on implementation tasks, not broad architecture debates
- prefer Sonnet for teammates

Your spawn prompts should be specific enough that each teammate can work from a blank context without needing the Lead's chat history.

---

## Required Deliverables

I want you to produce:
1. The implemented Neon Siege project files
2. Any needed update to `CLAUDE.md` for project-specific clarity
3. A concise implementation summary describing:
   - team members
   - file ownership
   - task graph
   - current architecture
4. A concise note describing controls and MVP gameplay loop

---

## Quality Bar

The game should feel like a real playable prototype, not a pile of disconnected systems.

Prioritize:
- complete gameplay loop
- readable battlefield
- stable performance
- clean architecture matching the existing Neon Defense pattern
- visual coherence with the Neon Arcade style (follow VISUAL_STYLE_GUIDE.md)
- minimal bugs
- no fake completion claims

Start by reading `CLAUDE.md` and `VISUAL_STYLE_GUIDE.md`, then create the team, define file ownership, create the first task wave, and begin coordinated implementation.
