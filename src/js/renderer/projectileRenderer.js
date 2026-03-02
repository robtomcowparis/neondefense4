// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/projectileRenderer.js
//  Projectiles fly through the air with parabolic Y arcs
//  Type-specific visuals for PULSE and CRYO projectiles
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { SAPPER_RED } from '../config.js';
import { scene, toColor, makeGlowMaterial } from './scene.js';
import { getFirePoint, getTowerTopY } from './towerMeshes.js';

const projMeshMap = new WeakMap();

// Shared geometries
const _sphereGeo = new THREE.SphereGeometry(1, 7, 6);
const _octaGeo   = new THREE.OctahedronGeometry(1, 0);
const _icoGeo    = new THREE.IcosahedronGeometry(1, 0);
const _torusGeo  = new THREE.TorusGeometry(1, 0.15, 8, 24);
const _cylGeo    = new THREE.CylinderGeometry(0.4, 0.4, 1, 8);

// Arc parameters
const ARC_HEIGHT = 35;      // peak height above lerped Y
const LAUNCH_Y = 26;        // default tower launch height
const ENEMY_Y = 10;         // default enemy hover height
const ARC_DURATION = 0.55;  // seconds for a "typical" flight (arc timing only)

// ─── Dispatcher ──────────────────────────────────────────────
export function createProjectileMesh(proj) {
    var tower = proj.sourceTower;
    if (!tower) { _createGenericProjectile(proj); return; }
    if (tower.type === 'PULSE') { _createPulseProjectile(proj, tower); return; }
    if (tower.type === 'CRYO')  { _createCryoProjectile(proj, tower);  return; }
    _createGenericProjectile(proj);
}

// ─── Generic (fallback) ─────────────────────────────────────
function _createGenericProjectile(proj) {
    var group = new THREE.Group();
    var color = toColor(proj.color);
    var size = proj.size || 3;

    // Main projectile sphere
    var mat = new THREE.MeshBasicMaterial({ color: color.clone() });
    var mesh = new THREE.Mesh(_sphereGeo, mat);
    mesh.scale.setScalar(size * 0.5);
    group.add(mesh);
    group.userData.mainMesh = mesh;

    // Trail spheres
    var trailMeshes = [];
    for (var i = 0; i < 6; i++) {
        var tMat = new THREE.MeshBasicMaterial({ color: color.clone(), transparent: true, opacity: 0 });
        var tMesh = new THREE.Mesh(_sphereGeo, tMat);
        tMesh.scale.setScalar(size * 0.28);
        group.add(tMesh);
        trailMeshes.push(tMesh);
    }
    group.userData.trailMeshes = trailMeshes;
    group.userData.size = size;

    // Store arc parameters
    var fp = (proj.sourceTower) ? getFirePoint(proj.sourceTower) : null;
    var launchY = fp ? fp.y : LAUNCH_Y;
    var launchX = fp ? fp.x : proj.x;
    var launchZ = fp ? fp.z : proj.y;

    group.userData.birthTime = performance.now();
    group.userData.launchX = launchX;
    group.userData.launchZ = launchZ;
    group.userData.launchY = launchY;
    group.userData.isStraight = (proj.sourceTower && proj.sourceTower.type === 'PULSE');

    scene.add(group);
    projMeshMap.set(proj, group);
    return group;
}

// ─── PULSE projectile builder ────────────────────────────────
function _createPulseProjectile(proj, tower) {
    var animType;
    if (tower.branch === 'A')      animType = 'pulse_brA';
    else if (tower.branch === 'B') animType = 'pulse_brB';
    else if (tower.level === 2)    animType = 'pulse_l2';
    else if (tower.level === 1)    animType = 'pulse_l1';
    else                           animType = 'pulse_l0';

    var fp = getFirePoint(tower);
    var launchX = fp.x;
    var launchY = fp.y;
    var launchZ = fp.z;

    var group = new THREE.Group();
    var color = toColor(proj.color);
    var mat = new THREE.MeshBasicMaterial({ color: color.clone() });

    var trailCount;

    if (animType === 'pulse_l0') {
        var mesh = new THREE.Mesh(_sphereGeo, mat);
        mesh.scale.setScalar(1.5);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        trailCount = 4;

    } else if (animType === 'pulse_l1') {
        var mesh = new THREE.Mesh(_sphereGeo, mat);
        mesh.scale.set(1.5, 1.5, 3.8);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        trailCount = 5;

    } else if (animType === 'pulse_l2') {
        var mesh = new THREE.Mesh(_sphereGeo, mat);
        mesh.scale.setScalar(1.5);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        var ring = new THREE.Mesh(_torusGeo, mat.clone());
        ring.scale.setScalar(2.5);
        group.add(ring);
        group.userData.ring = ring;
        trailCount = 6;

    } else if (animType === 'pulse_brA') {
        var mesh = new THREE.Mesh(_cylGeo, mat);
        mesh.scale.set(1, 6, 1);
        mesh.rotation.x = Math.PI / 2;
        group.add(mesh);
        group.userData.mainMesh = mesh;
        trailCount = 3;

    } else if (animType === 'pulse_brB') {
        var mesh = new THREE.Mesh(_sphereGeo, mat);
        mesh.scale.setScalar(3);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        var orbMat = new THREE.MeshBasicMaterial({ color: color.clone() });
        var s1 = new THREE.Mesh(_sphereGeo, orbMat);
        s1.scale.setScalar(0.8);
        group.add(s1);
        var s2 = new THREE.Mesh(_sphereGeo, orbMat.clone());
        s2.scale.setScalar(0.8);
        group.add(s2);
        group.userData.orbiters = [s1, s2];
        trailCount = 8;
    }

    group.userData.trailCount = trailCount;
    group.userData.animType = animType;
    group.userData.isStraight = true;

    // Trail spheres
    var maxTrail = Math.max(trailCount, 8);
    var trail = [];
    for (var i = 0; i < maxTrail; i++) {
        var tMat = new THREE.MeshBasicMaterial({ color: color.clone(), transparent: true, opacity: 0 });
        var tMesh = new THREE.Mesh(_sphereGeo, tMat);
        tMesh.scale.setScalar(0.5);
        tMesh.visible = false;
        group.add(tMesh);
        trail.push(tMesh);
    }
    group.userData.trail = trail;

    group.userData.launchX = launchX;
    group.userData.launchY = launchY;
    group.userData.launchZ = launchZ;
    group.userData.birthTime = performance.now();

    scene.add(group);
    projMeshMap.set(proj, group);
    return group;
}

// ─── CRYO projectile builder ─────────────────────────────────
function _createCryoProjectile(proj, tower) {
    var animType;
    if (tower.branch === 'A')      animType = 'cryo_brA';
    else if (tower.branch === 'B') animType = 'cryo_brB';
    else if (tower.level === 2)    animType = 'cryo_l2';
    else if (tower.level === 1)    animType = 'cryo_l1';
    else                           animType = 'cryo_l0';

    var fp = getFirePoint(tower);
    var launchX = fp.x;
    var launchY = fp.y;
    var launchZ = fp.z;

    var group = new THREE.Group();
    var color = toColor(proj.color);
    var mat = new THREE.MeshBasicMaterial({ color: color.clone() });

    var trailCount;

    if (animType === 'cryo_l0') {
        var mesh = new THREE.Mesh(_octaGeo, mat);
        mesh.scale.setScalar(1.2);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        trailCount = 3;

    } else if (animType === 'cryo_l1') {
        var mesh = new THREE.Mesh(_octaGeo, mat);
        mesh.scale.setScalar(1.8);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        var glowMat = makeGlowMaterial(color, 0.25);
        var glow = new THREE.Mesh(_sphereGeo, glowMat);
        glow.scale.setScalar(2.5);
        group.add(glow);
        trailCount = 4;

    } else if (animType === 'cryo_l2') {
        var m1 = new THREE.Mesh(_octaGeo, mat);
        m1.scale.setScalar(0.9);
        m1.position.set(1.5, 0, 0);
        group.add(m1);
        var m2 = new THREE.Mesh(_octaGeo, mat.clone());
        m2.scale.setScalar(0.9);
        m2.position.set(-0.75, 0, 1.3);
        group.add(m2);
        var m3 = new THREE.Mesh(_octaGeo, mat.clone());
        m3.scale.setScalar(0.9);
        m3.position.set(-0.75, 0, -1.3);
        group.add(m3);
        group.userData.mainMesh = m1;
        group.userData.cluster = [m1, m2, m3];
        trailCount = 5;

    } else if (animType === 'cryo_brA') {
        var mesh = new THREE.Mesh(_octaGeo, mat);
        mesh.scale.setScalar(2);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        var domeMat = makeGlowMaterial(color, 0.3);
        var dome = new THREE.Mesh(_sphereGeo, domeMat);
        dome.scale.set(2, 1, 2);
        group.add(dome);
        group.userData.dome = dome;
        trailCount = 6;

    } else if (animType === 'cryo_brB') {
        var mesh = new THREE.Mesh(_icoGeo, mat);
        mesh.scale.setScalar(1.5);
        group.add(mesh);
        group.userData.mainMesh = mesh;
        var wireMat = new THREE.MeshBasicMaterial({ color: color.clone(), wireframe: true, transparent: true, opacity: 0.7 });
        var wf = new THREE.Mesh(_icoGeo, wireMat);
        wf.scale.setScalar(1.5);
        group.add(wf);
        group.userData.wireframe = wf;
        trailCount = 4;
    }

    group.userData.trailCount = trailCount;
    group.userData.animType = animType;
    group.userData.isStraight = false;
    group.userData.arcHeight = 25;
    group.userData.arcDuration = ARC_DURATION;

    // Trail spheres
    var maxTrail = Math.max(trailCount, 8);
    var trail = [];
    for (var i = 0; i < maxTrail; i++) {
        var tMat = new THREE.MeshBasicMaterial({ color: color.clone(), transparent: true, opacity: 0 });
        var tMesh = new THREE.Mesh(_sphereGeo, tMat);
        tMesh.scale.setScalar(0.5);
        tMesh.visible = false;
        group.add(tMesh);
        trail.push(tMesh);
    }
    group.userData.trail = trail;

    group.userData.launchX = launchX;
    group.userData.launchY = launchY;
    group.userData.launchZ = launchZ;
    group.userData.birthTime = performance.now();

    scene.add(group);
    projMeshMap.set(proj, group);
    return group;
}

// ─── Orient elongated mesh toward travel direction ───────────
function _orientToTravel(group, proj) {
    if (!proj.trail || proj.trail.length < 1) return;
    var dx = proj.x - proj.trail[0][0];
    var dz = proj.y - proj.trail[0][1];
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.01) return;
    group.rotation.y = Math.atan2(dx, dz);
}

// ─── Arc Y computation ──────────────────────────────────────
function _computeArcY(group, proj) {
    var elapsed = (performance.now() - group.userData.birthTime) / 1000;
    var progress = Math.min(elapsed / ARC_DURATION, 1.0);

    var launchY = group.userData.launchY;
    var arcH = group.userData.arcHeight || ARC_HEIGHT;
    var baseY = launchY + (ENEMY_Y - launchY) * progress;
    var arcBonus = arcH * Math.sin(progress * Math.PI);
    return baseY + arcBonus;
}

// ─── Update ─────────────────────────────────────────────────
export function updateProjectileMesh(proj) {
    var group = projMeshMap.get(proj);
    if (!group) return;

    if (!proj.alive) {
        group.traverse(function(obj) {
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        projMeshMap.delete(proj);
        return;
    }

    var isStraight = group.userData.isStraight !== undefined
        ? group.userData.isStraight
        : (proj.sourceTower && proj.sourceTower.type === 'PULSE');

    var y = isStraight ? (group.userData.launchY || LAUNCH_Y) : _computeArcY(group, proj);
    var arcH = group.userData.arcHeight || ARC_HEIGHT;

    // Position main mesh or group depending on builder type
    var animType = group.userData.animType;
    var now = performance.now();

    if (animType) {
        // Type-specific builders position the group itself
        group.position.set(proj.x, y, proj.y);
    } else {
        // Generic builder positions mainMesh within group
        var mesh = group.userData.mainMesh;
        if (mesh) mesh.position.set(proj.x, y, proj.y);
    }

    // ── Type-specific trail rendering ──
    var trail = group.userData.trail;
    var trailCount = group.userData.trailCount || 4;
    if (trail && proj.trail) {
        for (var ti = 0; ti < trail.length; ti++) {
            if (ti < proj.trail.length && ti < trailCount) {
                trail[ti].visible = true;
                if (animType) {
                    // relative to group position
                    trail[ti].position.x = proj.trail[ti][0] - proj.x;
                    trail[ti].position.z = proj.trail[ti][1] - proj.y;
                } else {
                    trail[ti].position.x = proj.trail[ti][0];
                    trail[ti].position.z = proj.trail[ti][1];
                }
                trail[ti].material.opacity = (1 - ti / trailCount) * 0.8;
            } else {
                trail[ti].visible = false;
            }
        }
    }

    // ── Generic trail (old trailMeshes) ──
    var trailMeshes = group.userData.trailMeshes;
    if (trailMeshes) {
        var gTrail = proj.trail;
        var size = group.userData.size;
        var launchY2 = group.userData.launchY || LAUNCH_Y;

        for (var i = 0; i < trailMeshes.length; i++) {
            var tm = trailMeshes[i];
            if (i < gTrail.length) {
                var r = (trailMeshes.length - i) / (trailMeshes.length + 1);
                var trailY;
                if (isStraight) {
                    trailY = launchY2;
                } else {
                    var trailProgress = Math.max(0, (performance.now() - group.userData.birthTime) / 1000 / ARC_DURATION - (i + 1) * 0.08);
                    var trailBase = launchY2 + (ENEMY_Y - launchY2) * trailProgress;
                    trailY = trailBase + arcH * Math.sin(trailProgress * Math.PI);
                }
                tm.position.set(gTrail[i][0], Math.max(1, trailY), gTrail[i][1]);
                tm.scale.setScalar(size * 0.5 * r * 0.7);
                tm.material.opacity = r * 0.45;
            } else {
                tm.material.opacity = 0;
            }
        }
    }

    // ── Orient elongated meshes toward travel direction ──
    if (animType === 'pulse_l1' || animType === 'pulse_brA' || animType === 'pulse_l2') {
        _orientToTravel(group, proj);
    }

    // ── Pulse L2: spin the torus ring ──
    if (animType === 'pulse_l2') {
        var ring = group.userData.ring;
        if (ring) ring.rotation.z = now * 0.005;
    }

    // ── Pulse BrB: rotate orbiting spheres ──
    if (animType === 'pulse_brB') {
        var orbiters = group.userData.orbiters;
        if (orbiters) {
            var oAngle = now * 0.006;
            orbiters[0].position.x = Math.cos(oAngle) * 4;
            orbiters[0].position.z = Math.sin(oAngle) * 4;
            orbiters[1].position.x = Math.cos(oAngle + Math.PI) * 4;
            orbiters[1].position.z = Math.sin(oAngle + Math.PI) * 4;
        }
    }

    // ── Cryo L2: cluster tightens near target ──
    if (animType === 'cryo_l2') {
        var cluster = group.userData.cluster;
        if (cluster) {
            var elapsed2 = (now - group.userData.birthTime) / 1000;
            var arcDur = group.userData.arcDuration || ARC_DURATION;
            var prog = Math.min(elapsed2 / arcDur, 1.0);
            var cRadius = 3 * (1 - prog * 0.7);
            for (var ci = 0; ci < cluster.length; ci++) {
                var ca = now * 0.004 + ci * (Math.PI * 2 / 3);
                cluster[ci].position.x = Math.cos(ca) * cRadius;
                cluster[ci].position.z = Math.sin(ca) * cRadius;
            }
        }
    }

    // ── Cryo BrA: dome pulses opacity ──
    if (animType === 'cryo_brA') {
        var dome = group.userData.dome;
        if (dome) dome.material.opacity = 0.2 + 0.15 * Math.sin(now * 0.008);
    }

    // ── Cryo BrB: wireframe flickers ──
    if (animType === 'cryo_brB') {
        var wf = group.userData.wireframe;
        if (wf) wf.material.opacity = 0.3 + 0.4 * Math.abs(Math.sin(now * 0.01));
    }
}

export function removeProjectileMesh(proj) {
    var group = projMeshMap.get(proj);
    if (group) {
        group.traverse(function(obj) {
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        projMeshMap.delete(proj);
    }
}

// ─── Enemy Projectile (sapper → tower arc) ────────────────────
var enemyProjMeshMap = new WeakMap();

var SAPPER_ARC_HEIGHT = 28;
var SAPPER_ARC_DURATION = 0.5;

export function createEnemyProjectileMesh(proj) {
    var group = new THREE.Group();
    var color = toColor(proj.color || SAPPER_RED);

    var mat = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(_sphereGeo, mat);
    mesh.scale.setScalar(2.2);
    group.add(mesh);
    group.userData.mainMesh = mesh;

    var trailMeshes = [];
    for (var i = 0; i < 5; i++) {
        var tMat = new THREE.MeshBasicMaterial({ color: color.clone(), transparent: true, opacity: 0 });
        var tMesh = new THREE.Mesh(_sphereGeo, tMat);
        tMesh.scale.setScalar(1.2);
        group.add(tMesh);
        trailMeshes.push(tMesh);
    }
    group.userData.trailMeshes = trailMeshes;
    group.userData.birthTime = performance.now();
    group.userData.launchX = proj.x;
    group.userData.launchZ = proj.y;

    scene.add(group);
    enemyProjMeshMap.set(proj, group);
    return group;
}

export function updateEnemyProjectileMesh(proj) {
    var group = enemyProjMeshMap.get(proj);
    if (!group) return;

    if (!proj.alive) {
        group.traverse(function(obj) {
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        enemyProjMeshMap.delete(proj);
        return;
    }

    // Sapper projectile arcs from enemy height up to tower height
    var elapsed = (performance.now() - group.userData.birthTime) / 1000;
    var progress = Math.min(elapsed / SAPPER_ARC_DURATION, 1.0);
    var baseY = ENEMY_Y + (LAUNCH_Y - ENEMY_Y) * progress;
    var arcY = baseY + SAPPER_ARC_HEIGHT * Math.sin(progress * Math.PI);

    var mesh = group.userData.mainMesh;
    mesh.position.set(proj.x, Math.max(1, arcY), proj.y);

    var trailMeshes = group.userData.trailMeshes;
    var trail = proj.trail;
    for (var i = 0; i < trailMeshes.length; i++) {
        var tm = trailMeshes[i];
        if (i < trail.length) {
            var r = (trailMeshes.length - i) / (trailMeshes.length + 1);
            var tp = Math.max(0, progress - (i + 1) * 0.08);
            var tBase = ENEMY_Y + (LAUNCH_Y - ENEMY_Y) * tp;
            var tArc = tBase + SAPPER_ARC_HEIGHT * Math.sin(tp * Math.PI);
            tm.position.set(trail[i][0], Math.max(1, tArc), trail[i][1]);
            tm.material.opacity = r * 0.35;
        } else {
            tm.material.opacity = 0;
        }
    }
}

export function removeEnemyProjectileMesh(proj) {
    var group = enemyProjMeshMap.get(proj);
    if (group) {
        group.traverse(function(obj) {
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        enemyProjMeshMap.delete(proj);
    }
}
