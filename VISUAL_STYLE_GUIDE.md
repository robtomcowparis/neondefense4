# Neon Defense 4 — Visual Style Guide
> A complete reference for recreating the visual style of this game in a new project.

---

## Overview

The aesthetic is **retro-futuristic neon** — deep near-black backgrounds with bright neon accent colors, a three-tier material system, cool-toned lighting, heavy bloom post-processing, and geometric/CRT-inspired UI. The style draws from cyberpunk sci-fi visuals: think glowing circuit boards, holographic displays, and dark space with neon highlights.

**Stack:** Three.js, UnrealBloomPass, OrbitControls, CSS2DRenderer, Vite, plain ES modules.
**Map dimensions:** 1280 × 960 world units.

---

## 1. Color Palette

### Background / Structural
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| `DARK_BG` | `#040410` | 4, 4, 16 | Scene clear color, canvas bg |
| `GRID_DIM` | `#0F0F23` | 15, 15, 35 | Grid line fill |
| `GRID_BRIGHT` | `#191937` | 25, 25, 55 | Grid line highlight |
| `PATH_COLOR` | `#143C50` | 20, 60, 80 | Path surface |
| `UNPOWERED_GRAY` | `#505064` | 80, 80, 100 | Unpowered towers |

### Primary Neon Accents
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| `CYAN` | `#00FFFF` | 0, 255, 255 | Primary UI, Pulse tower |
| `MAGENTA` | `#FF00FF` | 255, 0, 255 | Rail tower, UI secondary |
| `NEON_GREEN` | `#32FF64` | 50, 255, 100 | HP bars, success states |
| `NEON_ORANGE` | `#FFA028` | 255, 160, 40 | Sapper, fire effects |
| `ELECTRIC_BLUE` | `#5078FF` | 80, 120, 255 | Tesla tower |
| `HOT_PINK` | `#FF3296` | 255, 50, 150 | Nova tower |
| `YELLOW` | `#FFFF3C` | 255, 255, 60 | Warnings |
| `ICE_BLUE` | `#96DCFF` | 150, 220, 255 | Cryo tower, shields |
| `POWER_AMBER` | `#FFC832` | 255, 200, 50 | Power plant, overcharge |
| `GOLD` | `#FFD700` | 255, 215, 0 | Branch upgrades, UI gold |

### Enemy Colors
| Name | Hex | RGB | Enemy |
|------|-----|-----|-------|
| `RED` | `#FF3232` | 255, 50, 50 | Drone |
| `SWARM_COLOR` | varies | ~magenta | Swarm |
| `ARMOR_GRAY` | `#B4B4C8` | 180, 180, 200 | Armored |
| `HEAL_GREEN` | `#64FF96` | 100, 255, 150 | Healer |
| `SPRINT_TEAL` | `#00C8B4` | 0, 200, 180 | Sprinter |
| `BOSS_PURPLE` | `#C832FF` | 200, 50, 255 | Boss |
| `ULTRA_RED` | `#FF1E50` | 255, 30, 80 | Ultra Boss |
| `SAPPER_RED` | `#FF5028` | 255, 80, 40 | Sapper |

### CSS Custom Properties
```css
:root {
  --bg-deep:    #020210;
  --bg-panel:   #08081A;
  --bg-card:    #0c0c22;
  --bg-btn:     #10102a;
  --border-cyan:#00b4c8;
  --border-dim: #1a1a40;
  --cyan:       #00ffff;
  --magenta:    #ff00ff;
  --pink:       #ff3296;
  --green:      #32ff64;
  --gold:       #ffd700;
  --orange:     #ffa028;
  --ice:        #96dcff;
  --blue:       #5078ff;
  --red:        #ff3232;
  --text:       #c8c8dc;
  --text-dim:   #606080;
  --text-bright:#e8e8f0;
}
```

---

## 2. Material System

Three factories, exported from `scene.js`:

### A) Structural Material — `makeStructuralMaterial(color)`
Dark metallic base. Responds to scene lighting. Provides depth/form to objects.

```js
new THREE.MeshStandardMaterial({
  color:             color.clone().multiplyScalar(0.25),  // very dark
  metalness:         0.7,
  roughness:         0.35,
  emissive:          color.clone().multiplyScalar(0.05),  // subtle inner glow
  emissiveIntensity: 1.0,
})
```

### B) Accent Material — `makeAccentMaterial(color)`
Full-brightness self-luminous. Blooms under UnrealBloomPass. Use on tips, rings, glow points.

```js
new THREE.MeshBasicMaterial({ color })
```

### C) Glow Material — `makeGlowMaterial(color, opacity)`
Transparent overlay/halo. Double-sided so it's visible from all angles.

```js
new THREE.MeshBasicMaterial({
  color,
  transparent: true,
  opacity,
  side: THREE.DoubleSide,
})
```

### Design Rule
Every 3D object mixes all three tiers:
- **Structural** → outer shell / body (dark, metallic, shaded)
- **Accent** → tips / rings / cores (bright, blooms)
- **Glow** → halos / shells / overlays (transparent, double-sided)

This creates visual depth: dark body → bright highlights → soft halo.

---

## 3. Post-Processing Pipeline

```js
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.setClearColor(new THREE.Color(4/255, 4/255, 16/255));

// Effect Composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(1280, 960),
  0.35,   // strength  — moderate bloom
  0.15,   // radius    — tight falloff
  0.65    // threshold — only MeshBasicMaterial at full brightness blooms
));
```

**Key insight:** The bloom threshold of `0.65` means only `MeshBasicMaterial` (accent/glow materials) exceeds the threshold. `MeshStandardMaterial` (structural) is too dark. This creates the selective neon glow without everything blooming.

---

## 4. Lighting Setup

```js
// Ambient — cool dark base
const ambient = new THREE.AmbientLight(0x1a1a2e, 0.6);

// Main directional — cool blue-white, upper right
const sun = new THREE.DirectionalLight(0xc0c8ff, 0.9);
sun.position.set(MAP_W * 0.7, 500, -MAP_H * 0.3);
sun.target.position.set(MAP_W / 2, 0, MAP_H / 2);

// Fill — opposite side, softer blue
const fill = new THREE.DirectionalLight(0x4040a0, 0.3);
fill.position.set(-MAP_W * 0.3, 300, MAP_H * 1.2);

// Hemisphere — sky/ground gradient
const hemi = new THREE.HemisphereLight(0x1a1a3e, 0x080810, 0.4);

scene.add(ambient, sun, sun.target, fill, hemi);
```

**Lighting character:** Cool-toned (blue-white), high contrast. Primary from upper-right. Fill from lower-left to soften shadows. Result: shapes read clearly against the dark background.

---

## 5. Camera Setup

```js
const camera = new THREE.PerspectiveCamera(55, MAP_W / MAP_H, 1, 5000);
camera.position.set(MAP_W / 2, 600, MAP_H + 320);
camera.lookAt(MAP_W / 2, 0, MAP_H / 2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(MAP_W / 2, 0, MAP_H / 2);
controls.minPolarAngle  = 0.25;      // prevent top-down
controls.maxPolarAngle  = Math.PI / 2.1;  // prevent below horizon
controls.minDistance    = 200;
controls.maxDistance    = 1600;
controls.enableDamping  = true;
controls.dampingFactor  = 0.06;
controls.panSpeed       = 1.2;
controls.mouseButtons   = { LEFT: ROTATE, MIDDLE: PAN, RIGHT: PAN };
```

**Camera character:** ~45° elevated isometric-ish view (similar to Bloons TD / Kingdom Rush). Wide enough to see the board, close enough to appreciate mesh details.

---

## 6. Background / Environment

- Scene background: solid `#040410` (no skybox, no fog)
- No fog
- Ground plane at Y = 0
- Grid: separate 2D rendering layer, not a Three.js mesh
- All objects float/exist against pure near-black space

```css
#renderTarget {
  background: #040410;
}
```

---

## 7. UI Styling

### Fonts
```css
/* Load from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

--font-display: 'Orbitron', sans-serif;   /* titles, buttons, labels */
--font-mono: 'Share Tech Mono', 'Consolas', monospace;  /* data, values */
```

### Layout
```
┌─────────────────────────────────┬──────────────┐
│         canvas (1280×960)       │  sidebar 280 │
└─────────────────────────────────┴──────────────┘
```

### Panel / Card
```css
.panel {
  background: #08081A;
  border: 1px solid #00b4c8;
  border-radius: 8px;
}
.card {
  background: #0c0c22;
  border: 1px solid #1a1a40;
  border-radius: 4px;
}
```

### Title / Hero Text
```css
.title {
  font-family: 'Orbitron', sans-serif;
  font-size: 56px;
  color: #00ffff;
  text-shadow:
    0 0 40px rgba(0,255,255,0.5),
    0 0 80px rgba(0,255,255,0.2);
  animation: title-glow 3s ease-in-out infinite;
}

.subtitle {
  font-size: 18px;
  color: #ff00ff;
  letter-spacing: 8px;
}

@keyframes title-glow {
  0%, 100% { text-shadow: 0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(0,255,255,0.15); }
  50%       { text-shadow: 0 0 50px rgba(0,255,255,0.7), 0 0 100px rgba(0,255,255,0.3); }
}
```

### Buttons
```css
.btn {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #00b4c8;
  background: rgba(0,180,200,0.08);
  color: #c8c8dc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn:hover {
  background: rgba(0,255,255,0.15);
  box-shadow: 0 0 12px rgba(0,255,255,0.3);
}
```

### Scanlines Overlay (CRT effect)
```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px, transparent 2px,
    rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px
  );
  pointer-events: none;
}
```

### HP Bars
```css
.hp-bar-track { background: #1a1a2e; height: 8px; border: 1px solid #333; }
.hp-bar-fill  { height: 100%; transition: width 0.1s; }
/* fill color by threshold: >50% → #32FF64, >25% → #FFDD44, else → #FF3232 */
```

### Progress Bars (action states)
```css
/* height: 28px, border-radius: 3px */
/* color by action type: */
building:  rgba(0,255,255,0.2)   /* cyan */
upgrading: rgba(50,255,100,0.2)  /* green */
branching: rgba(255,215,0,0.2)   /* gold */
repairing: rgba(100,255,150,0.2) /* heal green */
shielding: rgba(100,180,255,0.2) /* ice blue */
```

### Key Animations
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 4px currentColor; }
  50%       { box-shadow: 0 0 16px currentColor, 0 0 32px currentColor; }
}

@keyframes overcharge-pulse {
  0%, 100% { border-color: rgba(255,200,50,0.3); }
  50%       { border-color: rgba(255,200,50,0.7); box-shadow: 0 0 8px rgba(255,200,50,0.2); }
}

@keyframes power-pulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1.0; }
}
```

---

## 8. Animation Patterns

All objects use a universal bob:
```js
// In the render loop (dt = delta seconds, now = elapsed seconds)
group.position.y = baseY + Math.sin(now * 3.0 + idOffset) * 2;
// idOffset = Math.random() * Math.PI * 2  (assigned at spawn)
```

This desynchronizes objects so they don't all bob together.

### Common Patterns
```js
// Slow spin
mesh.rotation.y += dt * 0.3;

// Counter-rotate (makes inner/outer look independent)
inner.rotation.y -= dt * 0.4;

// Opacity pulse
material.opacity = 0.55 + 0.3 * Math.sin(now * 2.5 + idOffset);

// Scale pulse (breathing)
mesh.scale.setScalar(0.88 + 0.12 * Math.sin(now * 2.0));

// Fast spin (small objects)
mesh.rotation.y += dt * 4.0;
mesh.rotation.x += dt * 2.5;

// Leaning (motion illusion)
mesh.rotation.z = 0.15 * Math.sin(now * 3.0 + idOffset);
```

### Hit Flash
On damage: store `hitFlashTimer = 0.15`. Each frame, interpolate all materials toward `0xFFFFFF` by `hitFlashTimer / 0.15`, then decrement timer. Creates a white-flash-on-hit feedback.

---

## 9. Object Design Formula

### Enemies — Three-Tier Structure
```
Body (Structural)        ← dark, metallic, shaded
  └── Core/tip (Accent)  ← bright, blooms, glows
  └── Halo/ring (Glow)   ← transparent, double-sided, pulsing opacity
```

**Primitive shapes used:**
- Octahedron, Icosahedron, Dodecahedron — for faceted "crystal/robot" forms
- Tetrahedron — small sharp shapes
- Torus — orbital rings, halos
- Cylinder/Cone — barrels, hulls, exhausts
- Box — armor plates, structural frames
- Sphere — core glow points, muzzle flashes, pulse centers

**Size range:** 5–22 world units diameter.

### Elite Enemies
Add a secondary glow ring/shell beyond the base design:
```js
const eliteGlow = makeGlowMaterial(typeColor, 0.4 + 0.3 * sin(now * 3));
// second torus, or outer shell icosahedron, at 1.5× base radius
```

### Towers — Vertical Progression
```
Base (Structural)    ← armor housing
  └── Body (Structural) ← mid section
  └── Tip/Emitter (Accent) ← blooms, points where fire comes from
  └── Energy ring (Accent/Glow) ← orbiting or static ring
```

Level progression: L0 → L1 → L2 increases height and adds complexity. Branches (A/B) diverge shape identity (fast/precision vs heavy/area).

---

## 10. Particle Effects

All effects use standard Three.js geometry with animated opacity/scale.

### Beam / Shot
```
- Inner cylinder:  radius r, 8 segments, opacity 0.75, bright color, narrows over lifetime
- Outer halo:      radius 2r, opacity 0.10 (subtle glow wrapper)
- Line:            from source to target, opacity 0.45
```

### Arc / Chain Lightning
```
- Line segments with jittered midpoints (±20 X/Z, ±10 Y, re-jittered each frame)
- Flash spheres at chain targets, radius 5, opacity 0.6
- Opacity: 0.86 normally, fades with (1 - t) over lifetime
```

### Radial Nova Ring
```
- White core sphere at tower top (radius scales with level)
- Color halo at 2.2× radius, opacity 0.4
- No expansion — pure opacity fade (1 - t)²
```

### Cryo / Slow Field
```
- 3 concentric rings, each expands outward over 2.2s, offset in phase
- Snowflake: 6 radial lines that rotate as ring expands
- Opacity: 0.55 × (1-t)^1.4 × min(1, t×8)  ← quick ramp-in, slow fade-out
```

### Shield Break
```
- Expanding torus: small → large over lifetime
- 12 radial fragment lines that drift outward with random Y offset
```

---

## 11. Recreating This Style: Checklist

### Setup
- [ ] Three.js + EffectComposer + UnrealBloomPass
- [ ] `ACESFilmicToneMapping`, exposure `1.1`
- [ ] Clear color `#040410`
- [ ] Bloom: strength `0.35`, radius `0.15`, threshold `0.65`

### Scene
- [ ] Ambient light `0x1a1a2e` intensity `0.6`
- [ ] Directional light `0xc0c8ff` intensity `0.9`, upper-right position
- [ ] Fill light `0x4040a0` intensity `0.3`, lower-left
- [ ] Hemisphere `0x1a1a3e` / `0x080810` intensity `0.4`

### Camera
- [ ] PerspectiveCamera, FOV `55°`
- [ ] Position elevated and back (Y~600, Z~map depth + 300)
- [ ] Looking down at map center
- [ ] OrbitControls with damping `0.06`

### Materials
- [ ] `makeStructuralMaterial`: MeshStandardMaterial, color×0.25, metalness 0.7, roughness 0.35
- [ ] `makeAccentMaterial`: MeshBasicMaterial, full color
- [ ] `makeGlowMaterial`: MeshBasicMaterial, transparent, DoubleSide

### UI
- [ ] Google Fonts: Orbitron + Share Tech Mono
- [ ] CSS custom properties from section 1
- [ ] Scanlines overlay (repeating-linear-gradient pseudo-element)
- [ ] Title with animated text-shadow glow
- [ ] Dark panels `#08081A`, cyan borders `#00b4c8`

### Objects
- [ ] Every mesh: structural body + accent tip + glow halo
- [ ] All objects bob: `y = baseY + sin(now×3 + idOffset) × 2`
- [ ] Accents pulse via `material.opacity = A + B*sin(now*freq + idOffset)`
- [ ] Hit flash: lerp material color toward white on damage

---

## 12. Quick-Start Scaffold

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const W = 1280, H = 960;
const scene = new THREE.Scene();
scene.background = new THREE.Color(4/255, 4/255, 16/255);

const camera = new THREE.PerspectiveCamera(55, W/H, 1, 5000);
camera.position.set(W/2, 600, H + 320);
camera.lookAt(W/2, 0, H/2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0x1a1a2e, 0.6));
const sun = new THREE.DirectionalLight(0xc0c8ff, 0.9);
sun.position.set(W * 0.7, 500, -H * 0.3);
sun.target.position.set(W/2, 0, H/2);
scene.add(sun, sun.target);
const fill = new THREE.DirectionalLight(0x4040a0, 0.3);
fill.position.set(-W * 0.3, 300, H * 1.2);
scene.add(fill);
scene.add(new THREE.HemisphereLight(0x1a1a3e, 0x080810, 0.4));

// Post-processing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.35, 0.15, 0.65));

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(W/2, 0, H/2);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 200;
controls.maxDistance = 1600;

// Material factories
function makeStructuralMaterial(color) {
  const c = new THREE.Color(color);
  return new THREE.MeshStandardMaterial({
    color: c.clone().multiplyScalar(0.25),
    metalness: 0.7, roughness: 0.35,
    emissive: c.clone().multiplyScalar(0.05),
    emissiveIntensity: 1.0,
  });
}
function makeAccentMaterial(color) {
  return new THREE.MeshBasicMaterial({ color });
}
function makeGlowMaterial(color, opacity = 1.0) {
  return new THREE.MeshBasicMaterial({
    color, transparent: true, opacity, side: THREE.DoubleSide,
  });
}

// Render loop
let last = 0;
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  controls.update();
  composer.render();
}
requestAnimationFrame(animate);
```
