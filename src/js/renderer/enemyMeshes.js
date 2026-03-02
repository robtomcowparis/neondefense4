// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/enemyMeshes.js
//  Multi-part 3D enemy models — each type is a distinct creature
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { EnemyType, NEON_GREEN, YELLOW, RED } from '../config.js';
import { scene, toColor } from './scene.js';

// Map: enemy instance → Three.js group
const enemyMeshMap = new WeakMap();

// ─── Helper: make a MeshBasicMaterial ────────────────────────
function mat(color, opts = {}) {
    return new THREE.MeshBasicMaterial({ color, ...opts });
}

// ─── Enemy model factories ────────────────────────────────────

function _makeDrone(s, c) {
    // Hovering diamond with orbiting ring
    const g = new THREE.Group();
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(s * 1.0), mat(c));
    g.add(core);
    g.userData.core = core;

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.4, s * 0.18, 6, 20),
        mat(c, { transparent: true, opacity: 0.85 })
    );
    ring.rotation.x = Math.PI / 3;
    g.add(ring);
    g.userData.ring = ring;
    return g;
}

function _makeSwarm(s, c) {
    // Fast-spinning tetrahedrons
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.TetrahedronGeometry(s * 1.0), mat(c));
    g.add(body);
    g.userData.body = body;

    const inner = new THREE.Mesh(new THREE.TetrahedronGeometry(s * 0.5), mat(c));
    g.add(inner);
    g.userData.inner = inner;
    return g;
}

function _makeTank(s, c) {
    // Heavy hexagonal platform with turret — minimal bob, no spin
    const g = new THREE.Group();

    // Flat hexagonal hull
    const hull = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 1.1, s * 1.2, s * 0.55, 6),
        mat(c)
    );
    g.add(hull);
    g.userData.hull = hull;

    // Turret on top
    const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.5, s * 0.55, s * 0.4, 6),
        mat(c)
    );
    turret.position.y = s * 0.5;
    g.add(turret);
    g.userData.turret = turret;

    // Barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.12, s * 0.12, s * 0.9, 5),
        mat(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(s * 0.7, s * 0.5, 0);
    g.add(barrel);
    g.userData.barrel = barrel;

    // Accent ring around hull
    const accent = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.15, s * 0.1, 4, 12),
        mat(c, { transparent: true, opacity: 0.7 })
    );
    accent.position.y = s * 0.2;
    accent.rotation.x = Math.PI / 2;
    g.add(accent);
    return g;
}

function _makePhase(s, c) {
    // Outer shell (transparent) + inner bright core + wireframe torus
    const g = new THREE.Group();

    const shell = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.9, s * 0.9, s * 0.65, 8),
        mat(c, { transparent: true, opacity: 0.6 })
    );
    g.add(shell);
    g.userData.shell = shell;

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.45, 10, 8),
        mat(new THREE.Color().copy(new THREE.Color(c)).multiplyScalar(2))
    );
    g.add(core);
    g.userData.phaseCore = core;

    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(s * 0.85, s * 0.1, 5, 14),
        mat(c, { wireframe: true })
    );
    torus.rotation.x = Math.PI / 2;
    g.add(torus);
    g.userData.phaseTorus = torus;
    return g;
}

function _makeSplitter(s, c) {
    // Center sphere + 3 orbiting pentagonal chunks
    const g = new THREE.Group();

    const center = new THREE.Mesh(new THREE.SphereGeometry(s * 0.4, 8, 6), mat(c));
    g.add(center);

    const orbit = new THREE.Group();
    g.add(orbit);
    g.userData.orbit = orbit;

    const pts = [];
    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const chunk = new THREE.Mesh(
            new THREE.CylinderGeometry(s * 0.4, s * 0.4, s * 0.35, 5),
            mat(c)
        );
        chunk.position.set(Math.cos(a) * s * 1.1, (i - 1) * s * 0.25, Math.sin(a) * s * 1.1);
        orbit.add(chunk);

        // Thin line from center to chunk
        pts.push(new THREE.Vector3(0, 0, 0));
        pts.push(new THREE.Vector3(Math.cos(a) * s * 1.1, (i - 1) * s * 0.25, Math.sin(a) * s * 1.1));
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.5 }));
    orbit.add(lines);
    return g;
}

function _makeArmored(s, c) {
    // Box core + floating armor plates + wireframe edges
    const g = new THREE.Group();

    const core = new THREE.Mesh(new THREE.BoxGeometry(s * 1.2, s * 1.2, s * 1.2), mat(c));
    g.add(core);
    g.userData.armorCore = core;

    // Wireframe edges
    const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(s * 1.2, s * 1.2, s * 1.2)),
        new THREE.LineBasicMaterial({ color: 0xaaaacc })
    );
    g.add(edges);

    // 4 floating armor plates (slightly offset from core faces)
    const plateOffsets = [
        [s * 0.8, 0, 0], [-s * 0.8, 0, 0],
        [0, 0, s * 0.8], [0, 0, -s * 0.8],
    ];
    for (const [px, py, pz] of plateOffsets) {
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(s * 0.85, s * 0.85, s * 0.15),
            mat(new THREE.Color().copy(new THREE.Color(c)).multiplyScalar(1.3))
        );
        plate.position.set(px, py, pz);
        plate.lookAt(new THREE.Vector3(0, 0, 0));
        g.add(plate);
    }
    return g;
}

function _makeHealer(s, c) {
    // Medical cross (two intersecting boxes) + halo ring
    const g = new THREE.Group();

    const crossV = new THREE.Mesh(new THREE.BoxGeometry(s * 0.35, s * 1.8, s * 0.35), mat(c));
    g.add(crossV);
    g.userData.crossV = crossV;

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(s * 1.8, s * 0.35, s * 0.35), mat(c));
    g.add(crossH);

    // Halo torus above cross, tilted 30°
    const halo = new THREE.Mesh(
        new THREE.TorusGeometry(s * 0.9, s * 0.08, 6, 18),
        mat(c, { transparent: true, opacity: 0.8 })
    );
    halo.position.y = s * 1.2;
    halo.rotation.x = Math.PI / 6;
    g.add(halo);
    g.userData.halo = halo;

    // Emissive center glow sphere
    const glow = new THREE.Mesh(new THREE.SphereGeometry(s * 0.2, 6, 5), mat(c));
    g.add(glow);
    g.userData.healGlow = glow;
    return g;
}

function _makeSprinter(s, c) {
    // Sleek cone pointing forward + 3 fins
    const g = new THREE.Group();

    // Body cone (will be oriented along movement)
    const body = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.55, s * 2.2, 7),
        mat(c)
    );
    // Cone points up by default — rotate so it points forward (along +X)
    body.rotation.z = -Math.PI / 2;
    g.add(body);
    g.userData.body = body;

    // Fins at the back
    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(s * 0.55, s * 0.08, s * 0.35),
            mat(c, { transparent: true, opacity: 0.8 })
        );
        fin.position.set(-s * 0.85, Math.sin(a) * s * 0.35, Math.cos(a) * s * 0.35);
        g.add(fin);
    }
    return g;
}

function _makeSapper(s, c) {
    // Inverted cone hull + aiming barrel + muzzle glow
    const g = new THREE.Group();

    // Inverted cone (point down)
    const hull = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.95, s * 1.4, 7),
        mat(c)
    );
    hull.rotation.x = Math.PI; // flip point down
    g.add(hull);
    g.userData.hull = hull;

    // Barrel (thin cylinder pointing out)
    const barrelPivot = new THREE.Group();
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(s * 0.12, s * 0.12, s * 1.4, 5),
        mat(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = s * 0.7;
    barrelPivot.add(barrel);

    // Muzzle glow at barrel tip
    const muzzle = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.22, 6, 5),
        mat(new THREE.Color(1.0, 0.15, 0.05))
    );
    muzzle.position.x = s * 1.4;
    barrelPivot.add(muzzle);
    g.add(barrelPivot);
    g.userData.barrelPivot = barrelPivot;
    g.userData.muzzle = muzzle;

    // Pulsing core
    const core = new THREE.Mesh(new THREE.SphereGeometry(s * 0.3, 6, 5), mat(c));
    g.add(core);
    g.userData.sapperCore = core;
    return g;
}

function _makeBoss(s, c) {
    // Large dodecahedron + inner sphere + two gyroscope torus rings + crown
    const g = new THREE.Group();

    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(s * 1.0), mat(c));
    g.add(body);
    g.userData.body = body;

    // Inner glow sphere
    const inner = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.55, 10, 8),
        mat(new THREE.Color().copy(new THREE.Color(c)).multiplyScalar(1.8))
    );
    g.add(inner);
    g.userData.inner = inner;

    // Gyroscope torus rings
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.35, s * 0.12, 6, 22),
        mat(c)
    );
    g.add(ring1);
    g.userData.ring1 = ring1;

    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(s * 1.25, s * 0.1, 6, 20),
        mat(c)
    );
    ring2.rotation.y = Math.PI / 2;
    g.add(ring2);
    g.userData.ring2 = ring2;

    // Crown — 5 octahedra orbiting above
    const crown = new THREE.Group();
    crown.position.y = s * 1.4;
    for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const sat = new THREE.Mesh(
            new THREE.OctahedronGeometry(s * 0.25),
            mat(c)
        );
        sat.position.set(Math.cos(a) * s * 1.2, 0, Math.sin(a) * s * 1.2);
        crown.add(sat);
    }
    g.add(crown);
    g.userData.crown = crown;
    return g;
}

function _makeUltraBoss(s, c) {
    // Massive icosahedron core + counter-rotating inner + 3 orbital rings + crown spheres
    const g = new THREE.Group();

    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(s * 1.0), mat(c));
    g.add(body);
    g.userData.body = body;

    const inner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s * 0.6),
        mat(new THREE.Color().copy(new THREE.Color(c)).multiplyScalar(2.0))
    );
    g.add(inner);
    g.userData.inner = inner;

    // 3 orbital rings at different tilts
    const ringTilts = [0, Math.PI / 3, Math.PI * 2 / 3];
    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(s * 1.5 + i * s * 0.2, s * 0.1, 6, 24),
            mat(c)
        );
        ring.rotation.set(ringTilts[i], 0, ringTilts[(i + 1) % 3]);
        g.add(ring);
        rings.push(ring);
    }
    g.userData.rings = rings;

    // Crown of 6 spheres + connecting LineSegments hex
    const crown = new THREE.Group();
    crown.position.y = s * 1.7;
    const crownPts = [];
    for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const sat = new THREE.Mesh(
            new THREE.SphereGeometry(s * 0.22, 7, 6),
            mat(new THREE.Color().copy(new THREE.Color(c)).multiplyScalar(1.5))
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

    // Pulsing center core
    const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(s * 0.25, 7, 6),
        mat(new THREE.Color(1, 1, 0.8))
    );
    g.add(pulse);
    g.userData.pulseCore = pulse;

    return g;
}

// ─── Main factory ─────────────────────────────────────────────
function _buildEnemyModel(enemy) {
    const s = enemy.size * 0.9;
    const c = toColor(enemy.color);

    switch (enemy.type) {
        case EnemyType.DRONE:          return _makeDrone(s, c);
        case EnemyType.SWARM:          return _makeSwarm(s, c);
        case EnemyType.TANK:           return _makeTank(s, c);
        case EnemyType.PHASE:          return _makePhase(s, c);
        case EnemyType.SPLITTER:
        case EnemyType.SPLITTER_CHILD: return _makeSplitter(s * (enemy.type === EnemyType.SPLITTER_CHILD ? 0.7 : 1), c);
        case EnemyType.ARMORED:        return _makeArmored(s, c);
        case EnemyType.HEALER:         return _makeHealer(s, c);
        case EnemyType.SPRINTER:       return _makeSprinter(s, c);
        case EnemyType.SAPPER:         return _makeSapper(s, c);
        case EnemyType.BOSS:           return _makeBoss(s, c);
        case EnemyType.ULTRA_BOSS:     return _makeUltraBoss(s, c);
        default:                       return _makeDrone(s, c);
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

    // Elite glow edges
    if (enemy.eliteLevel > 0) {
        const s = enemy.size * 0.9;
        const edgesGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(s * 1.1));
        const edgesMat = new THREE.LineBasicMaterial({ color: new THREE.Color(1, 1, 1), transparent: true, opacity: 0.6 });
        group.add(new THREE.LineSegments(edgesGeo, edgesMat));
    }

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
            if (model.userData.core) model.userData.core.rotation.y += (dt || 0) * 1.5;
            if (model.userData.ring) {
                model.userData.ring.rotation.y += (dt || 0) * 0.8;
                model.userData.ring.rotation.z += (dt || 0) * 0.4;
            }
            break;

        case EnemyType.SWARM:
            if (model.userData.body) model.userData.body.rotation.y += (dt || 0) * 4;
            if (model.userData.inner) model.userData.inner.rotation.y -= (dt || 0) * 5;
            break;

        case EnemyType.TANK:
            // Heavy — minimal animation; turret slowly rotates
            if (model.userData.turret) model.userData.turret.rotation.y += (dt || 0) * 0.3;
            // Barrel tracks toward front
            if (model.userData.barrel) {
                model.userData.barrel.position.set(s * 0.7, s * 0.5, 0);
            }
            break;

        case EnemyType.PHASE: {
            const phased = enemy.phased;
            if (model.userData.shell) {
                model.userData.shell.material.opacity = phased
                    ? 0.12 + 0.08 * Math.sin(now * 8)
                    : 0.65;
                model.userData.shell.rotation.y += (dt || 0) * (phased ? 2 : 0.5);
            }
            if (model.userData.phaseCore) {
                const brightness = phased ? 2.5 : 1.2;
                const ec = enemy.color;
                model.userData.phaseCore.material.color.setRGB(
                    Math.min(1, ec[0] / 255 * brightness),
                    Math.min(1, ec[1] / 255 * brightness),
                    Math.min(1, ec[2] / 255 * brightness)
                );
            }
            if (model.userData.phaseTorus) {
                model.userData.phaseTorus.material.opacity = phased ? 0.85 : 0.15;
                model.userData.phaseTorus.rotation.y += (dt || 0) * (phased ? 2 : 0.5);
            }
            break;
        }

        case EnemyType.SPLITTER:
        case EnemyType.SPLITTER_CHILD:
            if (model.userData.orbit) {
                model.userData.orbit.rotation.y += (dt || 0) * 1.2;
            }
            break;

        case EnemyType.ARMORED:
            if (model.userData.armorCore) {
                model.userData.armorCore.rotation.y += (dt || 0) * 0.4;
            }
            break;

        case EnemyType.HEALER: {
            if (model) model.rotation.y += (dt || 0) * 0.5;
            if (model.userData.halo) model.userData.halo.rotation.z += (dt || 0) * 1.2;
            if (model.userData.healGlow) {
                const p = 0.8 + 0.2 * Math.sin(now * 4);
                model.userData.healGlow.scale.setScalar(p);
            }
            break;
        }

        case EnemyType.SPRINTER:
            // Lean forward when sprinting
            if (enemy.sprinting) {
                model.rotation.x = -0.25;
            } else {
                model.rotation.x *= 0.9;
            }
            break;

        case EnemyType.SAPPER: {
            if (model.userData.hull) model.userData.hull.rotation.y += (dt || 0) * 0.6;
            // Aim barrel toward tower target
            if (model.userData.barrelPivot && enemy.towerTarget) {
                const tx = enemy.towerTarget.x - enemy.x;
                const tz = enemy.towerTarget.y - enemy.y;
                model.userData.barrelPivot.rotation.y = Math.atan2(tx, tz);
            }
            // Pulsing muzzle
            if (model.userData.muzzle) {
                const p = 0.7 + 0.3 * Math.sin(now * 6);
                model.userData.muzzle.material.color.setRGB(1.0, 0.15 * p, 0.05 * p);
            }
            if (model.userData.sapperCore) {
                const p = 0.8 + 0.2 * Math.sin(now * 5);
                model.userData.sapperCore.scale.setScalar(p);
            }
            break;
        }

        case EnemyType.BOSS:
            if (model.userData.body) model.userData.body.rotation.y += (dt || 0) * 0.4;
            if (model.userData.inner) {
                const p = 0.85 + 0.15 * Math.sin(now * 2.5);
                model.userData.inner.scale.setScalar(p);
            }
            if (model.userData.ring1) model.userData.ring1.rotation.x += (dt || 0) * 0.7;
            if (model.userData.ring2) model.userData.ring2.rotation.y += (dt || 0) * 0.9;
            if (model.userData.crown) model.userData.crown.rotation.y += (dt || 0) * 0.5;
            break;

        case EnemyType.ULTRA_BOSS:
            if (model.userData.body) model.userData.body.rotation.y += (dt || 0) * 0.25;
            if (model.userData.inner) {
                model.userData.inner.rotation.y -= (dt || 0) * 0.35;
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
                const p = 0.7 + 0.3 * Math.sin(now * 4);
                model.userData.pulseCore.scale.setScalar(p);
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
                    } else {
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
