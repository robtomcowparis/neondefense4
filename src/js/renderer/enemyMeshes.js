// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/enemyMeshes.js
//  Multi-part 3D enemy models — each type is a distinct creature
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { EnemyType, NEON_GREEN, YELLOW, RED } from '../config.js';
import { scene, toColor, makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial } from './scene.js';

// Map: enemy instance → Three.js group
const enemyMeshMap = new WeakMap();

// ─── Helper: make a MeshBasicMaterial ────────────────────────
function mat(color, opts = {}) {
    return new THREE.MeshBasicMaterial({ color, ...opts });
}

// ─── Enemy model factories ────────────────────────────────────

function _makeDrone(s, c, eliteLevel = 0) {
    // Hovering diamond with orbiting ring — multi-material
    const g = new THREE.Group();

    // Dark metallic octahedron body
    const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(s * 1.0),
        makeStructuralMaterial(c)
    );
    g.add(core);
    g.userData.core = core;

    // Bright neon center sphere (visible through octahedron edges)
    const centerGlow = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.35, 8, 6),
        makeAccentMaterial(c)
    );
    g.add(centerGlow);
    g.userData.centerGlow = centerGlow;

    // Neon accent ring — blooms with post-processing
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.4, s * 0.18, 6, 20),
        makeGlowMaterial(c, 0.85)
    );
    ring.rotation.x = Math.PI / 3;
    g.add(ring);
    g.userData.ring = ring;

    // Elite: second closer orbit ring
    if (eliteLevel > 0) {
        const eliteRing = new THREE.Mesh(
            new THREE.TorusGeometry(s * 0.9, s * 0.12, 6, 18),
            makeGlowMaterial(c, 0.7)
        );
        eliteRing.rotation.x = -Math.PI / 4;
        g.add(eliteRing);
        g.userData.eliteGlow = eliteRing;
    }

    return g;
}

function _makeSwarm(s, c, eliteLevel = 0) {
    // Tiny jagged tetrahedrons with spiky accent details
    const g = new THREE.Group();

    // Dark metallic outer tetrahedron body
    const body = new THREE.Mesh(
        new THREE.TetrahedronGeometry(s * 1.0),
        makeStructuralMaterial(c)
    );
    g.add(body);
    g.userData.body = body;

    // Bright neon inner tetrahedron — glows through edges
    const inner = new THREE.Mesh(
        new THREE.TetrahedronGeometry(s * 0.5),
        makeAccentMaterial(c)
    );
    g.add(inner);
    g.userData.inner = inner;

    // 3 small accent spike cones arranged around the body
    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const spike = new THREE.Mesh(
            new THREE.ConeGeometry(s * 0.15, s * 0.5, 3),
            makeAccentMaterial(c)
        );
        spike.position.set(
            Math.cos(a) * s * 0.7,
            0,
            Math.sin(a) * s * 0.7
        );
        spike.lookAt(new THREE.Vector3(
            Math.cos(a) * s * 2,
            0,
            Math.sin(a) * s * 2
        ));
        g.add(spike);
    }

    // Elite: small pulsing accent tetrahedron at center
    if (eliteLevel > 0) {
        const eliteGlow = new THREE.Mesh(
            new THREE.TetrahedronGeometry(s * 0.3),
            makeAccentMaterial(c)
        );
        g.add(eliteGlow);
        g.userData.eliteGlow = eliteGlow;
    }

    return g;
}

function _makeTank(s, c, eliteLevel = 0) {
    // Heavy hexagonal platform with turret — squat armored body
    const g = new THREE.Group();

    // Flat hexagonal hull — dark metallic armor
    const hull = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 1.1, s * 1.2, s * 0.55, 6),
        makeStructuralMaterial(c)
    );
    g.add(hull);
    g.userData.hull = hull;

    // Turret on top — also structural armor
    const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.5, s * 0.55, s * 0.4, 6),
        makeStructuralMaterial(c)
    );
    turret.position.y = s * 0.5;
    g.add(turret);
    g.userData.turret = turret;

    // Barrel — dark structural
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.12, s * 0.12, s * 0.9, 5),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(s * 0.7, s * 0.5, 0);
    g.add(barrel);
    g.userData.barrel = barrel;

    // Barrel tip — glowing neon muzzle
    const barrelTip = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.15, 5, 4),
        makeAccentMaterial(c)
    );
    barrelTip.position.set(s * 1.15, s * 0.5, 0);
    g.add(barrelTip);

    // Accent ring around hull — bright neon bloom
    const accent = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.15, s * 0.1, 4, 12),
        makeAccentMaterial(c)
    );
    accent.position.y = s * 0.2;
    accent.rotation.x = Math.PI / 2;
    g.add(accent);

    // Elite: second thicker hex ring slightly above base
    if (eliteLevel > 0) {
        const eliteRing = new THREE.Mesh(
            new THREE.TorusGeometry(s * 1.25, s * 0.14, 6, 12),
            makeGlowMaterial(c, 0.8)
        );
        eliteRing.position.y = s * 0.4;
        eliteRing.rotation.x = Math.PI / 2;
        g.add(eliteRing);
        g.userData.eliteGlow = eliteRing;
    }

    return g;
}

function _makePhase(s, c, eliteLevel = 0) {
    // Ethereal phase enemy — transparent shell + neon core + crisp torus ring
    const g = new THREE.Group();

    // Outer shell — transparent glow overlay that phases in/out
    const shell = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.9, s * 0.9, s * 0.65, 8),
        makeGlowMaterial(c, 0.55)
    );
    g.add(shell);
    g.userData.shell = shell;

    // Inner core sphere — bright neon, the true form
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.45, 10, 8),
        makeAccentMaterial(c)
    );
    g.add(core);
    g.userData.phaseCore = core;

    // Crisp neon torus ring — solid accent, not wireframe
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(s * 0.85, s * 0.07, 5, 14),
        makeAccentMaterial(c)
    );
    torus.rotation.x = Math.PI / 2;
    g.add(torus);
    g.userData.phaseTorus = torus;

    // Elite: pulsing inner sphere that beats out-of-sync with core
    if (eliteLevel > 0) {
        const eliteGlow = new THREE.Mesh(
            new THREE.SphereGeometry(s * 0.25, 8, 6),
            makeAccentMaterial(c)
        );
        g.add(eliteGlow);
        g.userData.eliteGlow = eliteGlow;
    }

    return g;
}

function _makeSplitter(s, c, eliteLevel = 0) {
    // Center sphere + 3 orbiting pentagonal chunks with connectors
    const g = new THREE.Group();

    // Glowing accent core — this is the part that "splits"
    const center = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.4, 8, 6),
        makeAccentMaterial(c)
    );
    g.add(center);

    const orbit = new THREE.Group();
    g.add(orbit);
    g.userData.orbit = orbit;

    const pts = [];
    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        // Dark metallic orbiting chunks
        const chunk = new THREE.Mesh(
            new THREE.CylinderGeometry(s * 0.4, s * 0.4, s * 0.35, 5),
            makeStructuralMaterial(c)
        );
        chunk.position.set(Math.cos(a) * s * 1.1, (i - 1) * s * 0.25, Math.sin(a) * s * 1.1);
        orbit.add(chunk);

        pts.push(new THREE.Vector3(0, 0, 0));
        pts.push(new THREE.Vector3(Math.cos(a) * s * 1.1, (i - 1) * s * 0.25, Math.sin(a) * s * 1.1));
    }

    // Connecting lines from center to each chunk
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.6 }));
    orbit.add(lines);

    // Elite: brighter accent connecting lines, slightly scaled up
    if (eliteLevel > 0) {
        const eliteLineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const eliteLines = new THREE.LineSegments(eliteLineGeo, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.9 }));
        eliteLines.scale.setScalar(1.08);
        orbit.add(eliteLines);
        g.userData.eliteGlow = eliteLines;
    }

    return g;
}

function _makeArmored(s, c, eliteLevel = 0) {
    // Box core + floating armor plates + wireframe edges — multi-material
    const g = new THREE.Group();

    // Dark metallic box core
    const core = new THREE.Mesh(
        new THREE.BoxGeometry(s * 1.2, s * 1.2, s * 1.2),
        makeStructuralMaterial(c)
    );
    g.add(core);
    g.userData.armorCore = core;

    // Wireframe structural seam edges
    const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(s * 1.2, s * 1.2, s * 1.2)),
        new THREE.LineBasicMaterial({ color: 0xaaaacc })
    );
    g.add(edges);

    // Small glowing accent heart at center
    const heart = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.25, 6, 5),
        makeAccentMaterial(c)
    );
    g.add(heart);

    // 4 floating armor plates
    const plateOffsets = [
        [s * 0.8, 0, 0], [-s * 0.8, 0, 0],
        [0, 0, s * 0.8], [0, 0, -s * 0.8],
    ];
    const plateMat = eliteLevel > 0 ? makeAccentMaterial(c) : makeStructuralMaterial(c);
    const plates = [];
    for (const [px, py, pz] of plateOffsets) {
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(s * 0.85, s * 0.85, s * 0.15),
            plateMat
        );
        plate.position.set(px, py, pz);
        plate.lookAt(new THREE.Vector3(0, 0, 0));
        g.add(plate);
        plates.push(plate);
    }
    g.userData.armorPlates = plates;

    // Elite: transparent glow shell
    if (eliteLevel > 0) {
        const eliteGlow = new THREE.Mesh(
            new THREE.SphereGeometry(s * 1.3, 8, 6),
            makeGlowMaterial(c, 0.25)
        );
        g.add(eliteGlow);
        g.userData.eliteGlow = eliteGlow;
    }

    return g;
}

function _makeHealer(s, c, eliteLevel = 0) {
    // Medical cross (two intersecting boxes) + halo ring — multi-material
    const g = new THREE.Group();

    // Vertical bar of the cross — dark metallic body
    const crossV = new THREE.Mesh(
        new THREE.BoxGeometry(s * 0.35, s * 1.8, s * 0.35),
        makeStructuralMaterial(c)
    );
    g.add(crossV);
    g.userData.crossV = crossV;

    // Horizontal bar of the cross — dark metallic body
    const crossH = new THREE.Mesh(
        new THREE.BoxGeometry(s * 1.8, s * 0.35, s * 0.35),
        makeStructuralMaterial(c)
    );
    g.add(crossH);

    // Halo torus above cross — bright neon bloom (healing energy), pulsing opacity
    const halo = new THREE.Mesh(
        new THREE.TorusGeometry(s * 0.9, s * 0.08, 6, 18),
        makeGlowMaterial(c, 0.85)
    );
    halo.position.y = s * 1.2;
    halo.rotation.x = Math.PI / 6;
    g.add(halo);
    g.userData.halo = halo;

    // Center glow sphere — bright neon bloom (glowing heart)
    const glow = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.2, 6, 5),
        makeAccentMaterial(c)
    );
    g.add(glow);
    g.userData.healGlow = glow;

    // Outer glow shell — soft transparent aura around the cross
    const shell = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.8, 7, 6),
        makeGlowMaterial(c, 0.3)
    );
    g.add(shell);

    // Elite: second orbiting torus tilted 90° from the first halo
    if (eliteLevel > 0) {
        const eliteRing = new THREE.Mesh(
            new THREE.TorusGeometry(s * 1.2, s * 0.06, 5, 16),
            makeGlowMaterial(c, 0.8)
        );
        eliteRing.position.y = s * 1.2;
        eliteRing.rotation.z = Math.PI / 2;
        g.add(eliteRing);
        g.userData.eliteGlow = eliteRing;
    }

    return g;
}

function _makeSprinter(s, c, eliteLevel = 0) {
    // Sleek cone pointing forward + 3 fins with glowing tips + engine exhaust
    const g = new THREE.Group();

    // Body cone — dark metallic streamlined hull
    const body = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.55, s * 2.2, 7),
        makeStructuralMaterial(c)
    );
    body.rotation.z = -Math.PI / 2;
    g.add(body);
    g.userData.body = body;

    // 3 fins at the back with glowing accent tips
    const finTips = [];
    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        // Structural fin body
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(s * 0.55, s * 0.08, s * 0.35),
            makeStructuralMaterial(c)
        );
        fin.position.set(-s * 0.85, Math.sin(a) * s * 0.35, Math.cos(a) * s * 0.35);
        g.add(fin);

        // Glowing accent tip at back edge of each fin
        const tip = new THREE.Mesh(
            new THREE.BoxGeometry(s * 0.12, s * 0.1, s * 0.35),
            makeAccentMaterial(c)
        );
        tip.position.set(-s * 1.15, Math.sin(a) * s * 0.35, Math.cos(a) * s * 0.35);
        g.add(tip);
        finTips.push(tip);
    }
    g.userData.finTips = finTips;

    // Engine exhaust glow — small sphere behind the cone base
    const exhaust = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.2, 5, 4),
        makeGlowMaterial(c, 0.7)
    );
    exhaust.position.set(-s * 1.1, 0, 0);
    g.add(exhaust);
    g.userData.exhaust = exhaust;

    // Elite: accent ring around cone mid-section
    if (eliteLevel > 0) {
        const eliteRing = new THREE.Mesh(
            new THREE.TorusGeometry(s * 0.6, s * 0.08, 6, 14),
            makeAccentMaterial(c)
        );
        eliteRing.rotation.z = Math.PI / 2;
        g.add(eliteRing);
        g.userData.eliteGlow = eliteRing;
    }

    return g;
}

function _makeSapper(s, c, eliteLevel = 0) {
    // Inverted cone hull + aiming barrel + muzzle glow — multi-material
    const g = new THREE.Group();

    // Inverted cone (point down) — dark metallic armored body
    const hull = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.95, s * 1.4, 7),
        makeStructuralMaterial(c)
    );
    hull.rotation.x = Math.PI; // flip point down
    g.add(hull);
    g.userData.hull = hull;

    // Barrel (thin cylinder pointing out) — dark structural weapon
    const barrelPivot = new THREE.Group();
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.12, s * 0.12, s * 1.4, 5),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = s * 0.7;
    barrelPivot.add(barrel);

    // Muzzle glow at barrel tip — hot orange/red neon bloom
    const muzzleSize = eliteLevel > 0 ? s * 0.35 : s * 0.22;
    const muzzle = new THREE.Mesh(
        new THREE.SphereGeometry(muzzleSize, 6, 5),
        makeAccentMaterial(new THREE.Color(1.0, 0.3, 0.05))
    );
    muzzle.position.x = s * 1.4;
    barrelPivot.add(muzzle);
    g.add(barrelPivot);
    g.userData.barrelPivot = barrelPivot;
    g.userData.muzzle = muzzle;

    // Type-colored core glow
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.3, 6, 5),
        makeAccentMaterial(c)
    );
    g.add(core);
    g.userData.sapperCore = core;

    // Elite: secondary glow sphere behind the muzzle
    if (eliteLevel > 0) {
        const eliteGlow = new THREE.Mesh(
            new THREE.SphereGeometry(s * 0.2, 6, 5),
            makeGlowMaterial(new THREE.Color(1.0, 0.3, 0.05), 0.5)
        );
        eliteGlow.position.x = s * 1.1;
        barrelPivot.add(eliteGlow);
        g.userData.eliteGlow = eliteGlow;
    }

    return g;
}

function _makeBoss(s, c, eliteLevel = 0) {
    // Large dodecahedron + inner sphere + two gyroscope torus rings + crown
    const g = new THREE.Group();

    // Massive dark metallic body
    const body = new THREE.Mesh(
        new THREE.DodecahedronGeometry(s * 1.0),
        makeStructuralMaterial(c)
    );
    g.add(body);
    g.userData.body = body;

    // Bright pulsing inner core — the boss's power source
    const inner = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.55, 10, 8),
        makeAccentMaterial(c)
    );
    g.add(inner);
    g.userData.inner = inner;

    // Gyroscope torus rings — bright neon bloom
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.35, s * 0.12, 6, 22),
        makeAccentMaterial(c)
    );
    g.add(ring1);
    g.userData.ring1 = ring1;

    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.25, s * 0.1, 6, 20),
        makeAccentMaterial(c)
    );
    ring2.rotation.y = Math.PI / 2;
    g.add(ring2);
    g.userData.ring2 = ring2;

    // Crown — 5 octahedra orbiting above (elite: neon bloom, normal: dark metallic)
    const crown = new THREE.Group();
    crown.position.y = s * 1.4;
    const crownMat = eliteLevel > 0 ? makeAccentMaterial(c) : makeStructuralMaterial(c);
    for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const sat = new THREE.Mesh(
            new THREE.OctahedronGeometry(s * 0.25),
            crownMat
        );
        sat.position.set(Math.cos(a) * s * 1.2, 0, Math.sin(a) * s * 1.2);
        crown.add(sat);
    }
    g.add(crown);
    g.userData.crown = crown;

    // Faint outer aura shell
    const glowShell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s * 1.15),
        makeGlowMaterial(c, 0.15)
    );
    g.add(glowShell);

    // Elite: pulsing outer accent ring
    if (eliteLevel > 0) {
        const eliteRing = new THREE.Mesh(
            new THREE.TorusGeometry(s * 1.5, s * 0.08, 6, 24),
            makeAccentMaterial(c)
        );
        g.add(eliteRing);
        g.userData.eliteGlow = eliteRing;
    }

    return g;
}

function _makeUltraBoss(s, c, eliteLevel = 0) {
    // Massive icosahedron core + counter-rotating inner + 3 orbital rings + crown spheres
    const g = new THREE.Group();

    // Dark metallic outer icosahedron shell
    const body = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s * 1.0),
        makeStructuralMaterial(c)
    );
    g.add(body);
    g.userData.body = body;

    // Bright neon counter-rotating inner icosahedron
    const inner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s * 0.6),
        makeAccentMaterial(c)
    );
    g.add(inner);
    g.userData.inner = inner;

    // 3 orbital rings — all bright neon, radiating energy
    const ringTilts = [0, Math.PI / 3, Math.PI * 2 / 3];
    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(s * 1.5 + i * s * 0.2, s * 0.1, 6, 24),
            makeAccentMaterial(c)
        );
        ring.rotation.set(ringTilts[i], 0, ringTilts[(i + 1) % 3]);
        g.add(ring);
        rings.push(ring);
    }
    g.userData.rings = rings;

    // Crown of 6 spheres + connecting hex line
    const crown = new THREE.Group();
    crown.position.y = s * 1.7;
    const crownPts = [];
    const crownMat = eliteLevel > 0 ? makeAccentMaterial(c) : makeStructuralMaterial(c);
    for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const sat = new THREE.Mesh(
            new THREE.SphereGeometry(s * 0.22, 7, 6),
            crownMat
        );
        sat.position.set(Math.cos(a) * s * 1.3, 0, Math.sin(a) * s * 1.3);
        crown.add(sat);
        crownPts.push(new THREE.Vector3(Math.cos(a) * s * 1.3, 0, Math.sin(a) * s * 1.3));
    }
    // Close the hex ring
    crownPts.push(crownPts[0].clone());
    const hexGeo = new THREE.BufferGeometry().setFromPoints(crownPts);
    crown.add(new THREE.Line(hexGeo, new THREE.LineBasicMaterial({ color: c })));
    g.add(crown);
    g.userData.crown = crown;

    // White-hot pulse core at center
    const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.25, 7, 6),
        makeAccentMaterial(new THREE.Color(1, 1, 0.9))
    );
    g.add(pulse);
    g.userData.pulseCore = pulse;

    // Massive outer glow shell — vast energy field
    const outerGlow = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s * 1.3),
        makeGlowMaterial(c, 0.12)
    );
    g.add(outerGlow);
    g.userData.eliteGlow = eliteLevel > 0 ? outerGlow : null;

    return g;
}

// ─── Main factory ─────────────────────────────────────────────
function _buildEnemyModel(enemy) {
    const s = enemy.size * 0.9;
    const c = toColor(enemy.color);

    const el = enemy.eliteLevel || 0;
    switch (enemy.type) {
        case EnemyType.DRONE:          return _makeDrone(s, c, el);
        case EnemyType.SWARM:          return _makeSwarm(s, c, el);
        case EnemyType.TANK:           return _makeTank(s, c, el);
        case EnemyType.PHASE:          return _makePhase(s, c, el);
        case EnemyType.SPLITTER:
        case EnemyType.SPLITTER_CHILD: return _makeSplitter(s * (enemy.type === EnemyType.SPLITTER_CHILD ? 0.7 : 1), c, el);
        case EnemyType.ARMORED:        return _makeArmored(s, c, el);
        case EnemyType.HEALER:         return _makeHealer(s, c, el);
        case EnemyType.SPRINTER:       return _makeSprinter(s, c, el);
        case EnemyType.SAPPER:         return _makeSapper(s, c, el);
        case EnemyType.BOSS:           return _makeBoss(s, c, el);
        case EnemyType.ULTRA_BOSS:     return _makeUltraBoss(s, c, el);
        default:                       return _makeDrone(s, c, 0);
    }
}

export function createEnemyMesh(enemy) {
    const group = new THREE.Group();

    // Per-enemy random offsets so they don't bob in sync
    group.userData.idOffset = Math.random() * Math.PI * 2;
    group.userData.s = enemy.size;

    const model = _buildEnemyModel(enemy);
    group.add(model);
    group.userData.model = model;

    // HP bar (CSS2D label)
    const hpDiv = document.createElement('div');
    hpDiv.className = 'hp-bar-container';
    hpDiv.innerHTML = `<div class="hp-bar-bg"><div class="hp-bar-fill" style="width:100%;background:#32ff64"></div></div>`;
    hpDiv.style.pointerEvents = 'none';
    const hpLabel = new CSS2DObject(hpDiv);
    const hoverHeight = enemy.size + 8;
    hpLabel.position.set(0, hoverHeight + 4, 0);
    group.userData.hpLabel = hpLabel;
    group.userData.hpDiv = hpDiv;
    group.add(hpLabel);

    // Initial position — hover above ground
    const baseY = enemy.size + 5;
    group.position.set(enemy.x, baseY, enemy.y);
    group.userData.baseY = baseY;

    scene.add(group);
    enemyMeshMap.set(enemy, group);
    return group;
}

export function updateEnemyMesh(enemy, dt) {
    const group = enemyMeshMap.get(enemy);
    if (!group) return;

    if (!enemy.alive) {
        removeEnemyMesh(enemy);
        return;
    }

    const now = performance.now() / 1000;
    const idOff = group.userData.idOffset;
    const baseY = group.userData.baseY;
    const model = group.userData.model;
    const s = enemy.size * 0.9;

    // Hover + bob above ground
    group.position.set(
        enemy.x,
        baseY + Math.sin(now * 3.0 + idOff) * 2,
        enemy.y
    );

    // Orient toward movement direction + slow Y spin
    if (dt) {
        const rotRad = (enemy.rotation % 360) * Math.PI / 180;
        // Sprinter points its cone forward — model.rotation.y tracks direction
        group.rotation.y = rotRad;
    }

    // ── Per-type animations ───────────────────────────────────
    switch (enemy.type) {
        case EnemyType.DRONE:
            if (model.userData.core) {
                model.userData.core.rotation.y += (dt || 0) * 1.5;
                model.userData.core.rotation.x += (dt || 0) * 0.6;
            }
            if (model.userData.ring) {
                model.userData.ring.rotation.y += (dt || 0) * 0.8;
                model.userData.ring.rotation.z += (dt || 0) * 0.4;
                model.userData.ring.material.opacity = 0.55 + 0.3 * Math.sin(now * 2.5 + idOff);
            }
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.rotation.y -= (dt || 0) * 1.2;
                model.userData.eliteGlow.rotation.z -= (dt || 0) * 0.6;
                model.userData.eliteGlow.material.opacity = 0.4 + 0.3 * Math.sin(now * 3.5 + idOff);
            }
            break;

        case EnemyType.SWARM:
            if (model.userData.body) {
                model.userData.body.rotation.y += (dt || 0) * 4;
                model.userData.body.rotation.x += (dt || 0) * 2.5;
            }
            if (model.userData.inner) {
                model.userData.inner.rotation.y -= (dt || 0) * 5;
                model.userData.inner.rotation.z += (dt || 0) * 3;
            }
            if (model.userData.eliteGlow) {
                const p = 0.6 + 0.4 * Math.sin(now * 6 * Math.PI * 2 + idOff);
                model.userData.eliteGlow.scale.setScalar(p);
            }
            break;

        case EnemyType.TANK:
            // Heavy — slow turret rotation, subtle hull rotation
            if (model.userData.turret) model.userData.turret.rotation.y += (dt || 0) * 0.3;
            if (model.userData.hull) model.userData.hull.rotation.y += (dt || 0) * 0.1;
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.material.opacity = 0.5 + 0.5 * Math.sin(now * 2.0 + idOff);
            }
            break;

        case EnemyType.PHASE: {
            const phased = enemy.phased;
            if (model.userData.shell) {
                // Dramatic opacity shift when phased — pulses between nearly invisible
                model.userData.shell.material.opacity = phased
                    ? 0.05 + 0.25 * Math.sin(now * 8)
                    : 0.55;
                model.userData.shell.rotation.y += (dt || 0) * (phased ? 2 : 0.5);
            }
            if (model.userData.phaseTorus) {
                model.userData.phaseTorus.rotation.y += (dt || 0) * (phased ? 3.5 : 0.5);
            }
            if (model.userData.eliteGlow) {
                // Elite inner sphere pulses scale out-of-sync with shell
                const p = 0.6 + 0.8 * Math.sin(now * 4.5 + Math.PI);
                model.userData.eliteGlow.scale.setScalar(p);
            }
            break;
        }

        case EnemyType.SPLITTER:
        case EnemyType.SPLITTER_CHILD:
            if (model.userData.orbit) {
                model.userData.orbit.rotation.y += (dt || 0) * 1.2;
                model.userData.orbit.rotation.x += (dt || 0) * 0.7;
                model.userData.orbit.rotation.z += (dt || 0) * 0.4;
            }
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.material.opacity = 0.5 + 0.4 * Math.sin(now * 3.0 + idOff);
            }
            break;

        case EnemyType.ARMORED:
            if (model.userData.armorCore) {
                model.userData.armorCore.rotation.y += (dt || 0) * 0.4;
                model.userData.armorCore.rotation.x += (dt || 0) * 0.2;
            }
            if (model.userData.armorPlates) {
                for (let i = 0; i < model.userData.armorPlates.length; i++) {
                    const plate = model.userData.armorPlates[i];
                    const dir = plate.position.clone().normalize();
                    const offset = Math.sin(now * 1.5 + i * Math.PI * 0.5 + idOff) * s * 0.08;
                    const base = 0.8;
                    plate.position.copy(dir.multiplyScalar(s * base + offset));
                }
            }
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.rotation.y += (dt || 0) * 0.3;
                model.userData.eliteGlow.rotation.x += (dt || 0) * 0.15;
                model.userData.eliteGlow.material.opacity = 0.15 + 0.15 * Math.sin(now * 2.0 + idOff);
            }
            break;

        case EnemyType.HEALER: {
            if (model) model.rotation.y += (dt || 0) * 0.5;
            if (model.userData.halo) {
                model.userData.halo.rotation.z += (dt || 0) * 1.2;
                model.userData.halo.material.opacity = 0.6 + 0.4 * Math.sin(now * 3.0 * Math.PI * 2 + idOff);
            }
            if (model.userData.healGlow) {
                const p = 0.7 + 0.3 * Math.sin(now * 6.0 * Math.PI * 2 + idOff);
                model.userData.healGlow.scale.setScalar(p);
            }
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.rotation.z -= (dt || 0) * 1.2;
                model.userData.eliteGlow.material.opacity = 0.5 + 0.5 * Math.sin(now * 4.0 + idOff);
            }
            break;
        }

        case EnemyType.SPRINTER: {
            // Lean forward + bank when sprinting
            if (enemy.sprinting) {
                model.rotation.x = -0.25;
                model.rotation.z = 0.15 * Math.sin(now * 3.0 + idOff);
            } else {
                model.rotation.x *= 0.9;
                model.rotation.z *= 0.9;
            }
            // Engine exhaust pulse — faster when sprinting
            if (model.userData.exhaust) {
                const exhaustRate = enemy.sprinting ? 12 : 3;
                const exhaustScale = enemy.sprinting
                    ? 1.0 + 0.5 * Math.sin(now * exhaustRate + idOff)
                    : 0.8 + 0.2 * Math.sin(now * exhaustRate + idOff);
                model.userData.exhaust.scale.setScalar(exhaustScale);
                model.userData.exhaust.material.opacity = enemy.sprinting
                    ? 0.7 + 0.3 * Math.sin(now * exhaustRate + idOff)
                    : 0.5 + 0.2 * Math.sin(now * exhaustRate + idOff);
            }
            // Elite ring pulse
            if (model.userData.eliteGlow) {
                const eliteRate = enemy.sprinting ? 8 : 2;
                const eliteScale = enemy.sprinting
                    ? 0.8 + 0.4 * Math.sin(now * eliteRate + idOff)
                    : 0.9 + 0.1 * Math.sin(now * eliteRate + idOff);
                model.userData.eliteGlow.scale.setScalar(eliteScale);
            }
            break;
        }

        case EnemyType.SAPPER: {
            if (model.userData.hull) model.userData.hull.rotation.y += (dt || 0) * 0.6;
            // Aim barrel toward tower target
            if (model.userData.barrelPivot && enemy.towerTarget) {
                const tx = enemy.towerTarget.x - enemy.x;
                const tz = enemy.towerTarget.y - enemy.y;
                model.userData.barrelPivot.rotation.y = Math.atan2(tx, tz);
            }
            // Pulsing muzzle scale (accent material, no color change needed)
            if (model.userData.muzzle) {
                const p = 0.7 + 0.3 * Math.sin(now * 6);
                model.userData.muzzle.scale.setScalar(p);
            }
            if (model.userData.sapperCore) {
                const p = 0.8 + 0.2 * Math.sin(now * 5);
                model.userData.sapperCore.scale.setScalar(p);
            }
            // Elite glow: faster pulse, larger when targeting a tower
            if (model.userData.eliteGlow) {
                const hasTarget = !!enemy.towerTarget;
                const amp = hasTarget ? 0.5 : 0.3;
                const base = hasTarget ? 1.0 : 0.7;
                const p = base + amp * Math.sin(now * 8);
                model.userData.eliteGlow.scale.setScalar(p);
                model.userData.eliteGlow.material.opacity = 0.3 + 0.4 * Math.sin(now * 8 + 1.0);
            }
            break;
        }

        case EnemyType.BOSS:
            if (model.userData.body) {
                model.userData.body.rotation.y += (dt || 0) * 0.4;
                model.userData.body.rotation.x += (dt || 0) * 0.15;
            }
            if (model.userData.inner) {
                const p = 0.85 + 0.15 * Math.sin(now * 2.5);
                model.userData.inner.scale.setScalar(p);
                model.userData.inner.rotation.z += (dt || 0) * 0.3;
            }
            if (model.userData.ring1) model.userData.ring1.rotation.x += (dt || 0) * 0.7;
            if (model.userData.ring2) model.userData.ring2.rotation.y += (dt || 0) * 0.9;
            if (model.userData.crown) model.userData.crown.rotation.y += (dt || 0) * 0.5;
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.rotation.x += (dt || 0) * 0.6;
                model.userData.eliteGlow.rotation.z += (dt || 0) * 0.35;
                const ep = 0.9 + 0.1 * Math.sin(now * 3.0 + idOff);
                model.userData.eliteGlow.scale.setScalar(ep);
            }
            break;

        case EnemyType.ULTRA_BOSS:
            if (model.userData.body) {
                model.userData.body.rotation.y += (dt || 0) * 0.25;
                model.userData.body.rotation.x += (dt || 0) * 0.1;
            }
            if (model.userData.inner) {
                model.userData.inner.rotation.y -= (dt || 0) * 0.35;
                model.userData.inner.rotation.x -= (dt || 0) * 0.25;
                const p = 0.88 + 0.12 * Math.sin(now * 2);
                model.userData.inner.scale.setScalar(p);
            }
            if (model.userData.rings) {
                model.userData.rings[0].rotation.x += (dt || 0) * 0.5;
                model.userData.rings[1].rotation.y += (dt || 0) * 0.65;
                model.userData.rings[2].rotation.z += (dt || 0) * 0.4;
            }
            if (model.userData.crown) model.userData.crown.rotation.y += (dt || 0) * 0.3;
            if (model.userData.pulseCore) {
                const p = 0.5 + 1.0 * Math.sin(now * 4);
                model.userData.pulseCore.scale.setScalar(Math.max(0.5, Math.min(1.5, p)));
            }
            if (model.userData.eliteGlow) {
                model.userData.eliteGlow.material.opacity = 0.08 + 0.37 * (0.5 + 0.5 * Math.sin(now * Math.PI * 3));
            }
            break;
    }

    // ── Hit flash: all child meshes → white (except Phase which has custom color logic) ──
    if (enemy.type !== EnemyType.PHASE) {
        const ec = enemy.color;
        const prevFlash = group.userData._prevFlash;
        const curFlash = enemy.flashTimer > 0;
        // Only traverse when flash state changes or is active (avoids cost when steady state)
        if (curFlash !== prevFlash || curFlash) {
            model.traverse(obj => {
                if (obj.isMesh && obj.material && obj.material.color) {
                    if (curFlash) {
                        obj.material.color.setRGB(1, 1, 1);
                    } else if (obj.material.isMeshStandardMaterial) {
                        // Structural materials store color at 25% brightness — restore correctly
                        obj.material.color.setRGB(ec[0] / 255 * 0.25, ec[1] / 255 * 0.25, ec[2] / 255 * 0.25);
                    } else {
                        // Accent/glow materials (MeshBasicMaterial) use full brightness
                        obj.material.color.setRGB(ec[0] / 255, ec[1] / 255, ec[2] / 255);
                    }
                }
            });
        }
        group.userData._prevFlash = curFlash;
    }

    // ── HP bar ────────────────────────────────────────────────
    const hpDiv = group.userData.hpDiv;
    if (hpDiv) {
        if (enemy.health < enemy.maxHealth) {
            const ratio = Math.max(0, enemy.health / enemy.maxHealth);
            const fill = hpDiv.querySelector('.hp-bar-fill');
            if (fill) {
                fill.style.width = `${ratio * 100}%`;
                const r = ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? YELLOW : RED;
                fill.style.background = `rgb(${r[0]},${r[1]},${r[2]})`;
            }
            hpDiv.style.display = '';
        } else {
            hpDiv.style.display = 'none';
        }
    }
}

export function removeEnemyMesh(enemy) {
    const group = enemyMeshMap.get(enemy);
    if (group) {
        // Explicitly remove the HP bar DOM element — CSS2DRenderer doesn't auto-clean
        // when a parent group is removed from the scene, leaving stale divs visible.
        const hpDiv = group.userData.hpDiv;
        if (hpDiv && hpDiv.parentNode) hpDiv.parentNode.removeChild(hpDiv);

        group.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        enemyMeshMap.delete(enemy);
    }
}

export function removeAllEnemyMeshes() {
    // Per-enemy removal handled by removeEnemyMesh / updateEnemyMesh
}
