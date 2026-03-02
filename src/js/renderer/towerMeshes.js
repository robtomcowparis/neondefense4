// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/towerMeshes.js
//  Tower 3D models — unique evolving mesh per level & branch
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { TowerType, TILE_SIZE, POWER_AMBER, SHIELD_COLOR,
         OVERCHARGE_COLOR, GOLD_COLOR, NEON_GREEN, YELLOW, RED,
         UNPOWERED_GRAY, DAMAGE_RED, ICE_BLUE } from '../config.js';
import { scene, toColor, makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial } from './scene.js';

const towerMeshMap = new WeakMap();

// ── Shared color helpers ─────────────────────────────────────────
function _darker(c)  { return c.clone().multiplyScalar(0.6); }
function _brighter(c) {
    return new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );
}

// ── Height lookup — returns top Y for current tower state ────────
export function getTowerTopY(tower) {
    const heights = {
        [TowerType.PULSE]:       { 0: 20, 1: 28, 2: 36, A: 50, B: 48 },
        [TowerType.RAIL]:        { 0: 22, 1: 30, 2: 36, A: 55, B: 45 },
        [TowerType.TESLA]:       { 0: 22, 1: 30, 2: 40, A: 52, B: 50 },
        [TowerType.CRYO]:        { 0: 14, 1: 20, 2: 26, A: 40, B: 38 },
        [TowerType.NOVA]:        { 0: 16, 1: 24, 2: 32, A: 55, B: 42 },
        [TowerType.POWER_PLANT]: { 0: 18, 1: 24, 2: 32, A: 42, B: 55 },
    };
    const h = heights[tower.type];
    if (!h) return 25;
    if (tower.branch) return h[tower.branch] || 45;
    return h[tower.level] || h[0];
}

// Backward-compat static map (base heights)
export const TOWER_TOP_Y = {
    [TowerType.PULSE]:       28,
    [TowerType.RAIL]:        22,
    [TowerType.TESLA]:       30,
    [TowerType.CRYO]:        18,
    [TowerType.NOVA]:        20,
    [TowerType.POWER_PLANT]: 24,
};

// ═══════════════════════════════════════════════════════════════
//  PULSE TOWER BUILDERS (Cyan)
// ═══════════════════════════════════════════════════════════════

// L0 — ~20 units tall: short squat cylinder, stubby barrel
function _buildPulseL0(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 16, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 8;
    group.add(base);

    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 3, 12),
        makeStructuralMaterial(c)
    );
    cap.position.y = 17.5;
    group.add(cap);

    const turretPivot = new THREE.Group();
    turretPivot.position.y = 18;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 10, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(9, 0, 0);
    turretPivot.add(barrel);
    group.add(turretPivot);

    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    flashMat._ignoreColor = true;
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 6), flashMat);
    muzzleFlash.position.set(14, 0, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 18;
    group.userData.barrelDist = 9;
    group.userData.muzzleFlash = muzzleFlash;
}

// L1 — ~28 units tall: taller base, collar ring, longer barrel
function _buildPulseL1(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 13, 22, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 11;
    group.add(base);

    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1.5, 6, 18),
        makeStructuralMaterial(c)
    );
    collar.position.y = 16;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 11, 3, 12),
        makeStructuralMaterial(c)
    );
    cap.position.y = 24;
    group.add(cap);

    const turretPivot = new THREE.Group();
    turretPivot.position.y = 25;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 0, 0);
    turretPivot.add(barrel);
    group.add(turretPivot);

    var flashMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    flashMat1._ignoreColor = true;
    var muzzleFlash1 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMat1);
    muzzleFlash1.position.set(18, 0, 0);
    muzzleFlash1.visible = false;
    turretPivot.add(muzzleFlash1);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 25;
    group.userData.barrelDist = 11;
    group.userData.muzzleFlash = muzzleFlash1;
}

// L2 — ~36 units tall: glowing collar, rotating disc, proper barrel
function _buildPulseL2(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 14, 25, 14),
        makeStructuralMaterial(c)
    );
    base.position.y = 12.5;
    group.add(base);

    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(13, 2, 6, 20),
        makeAccentMaterial(_brighter(c))
    );
    collar.position.y = 18;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 3, 16),
        makeStructuralMaterial(c)
    );
    disc.position.y = 27;
    group.add(disc);

    const turretPivot = new THREE.Group();
    turretPivot.position.y = 27;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 0, 0);
    turretPivot.add(barrel);

    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 1.5, 3, 6),
        makeAccentMaterial(_brighter(c))
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.set(19, 0, 0);
    turretPivot.add(tip);

    group.add(turretPivot);

    var flashMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    flashMat2._ignoreColor = true;
    var muzzleFlash2 = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6), flashMat2);
    muzzleFlash2.position.set(21, 0, 0);
    muzzleFlash2.visible = false;
    turretPivot.add(muzzleFlash2);

    group.userData.disc = disc;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 27;
    group.userData.barrelDist = 11;
    group.userData.muzzleFlash = muzzleFlash2;
}

// Branch A "Overclock" — ~50 units: sleek spire, gatling cluster, dual discs
function _buildPulseBranchA(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 11, 35, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 17.5;
    group.add(base);

    // Speed fins
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 18, 6),
            makeStructuralMaterial(c)
        );
        fin.position.set(Math.cos(angle) * 9, 22, Math.sin(angle) * 9);
        fin.rotation.y = -angle;
        group.add(fin);
    }

    const glowRing = new THREE.Mesh(
        new THREE.TorusGeometry(9, 1.2, 6, 18),
        makeAccentMaterial(_brighter(c))
    );
    glowRing.position.y = 32;
    glowRing.rotation.x = Math.PI / 2;
    group.add(glowRing);

    // Lower smaller disc
    const discSmall = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 2, 14),
        makeStructuralMaterial(c)
    );
    discSmall.position.y = 34;
    group.add(discSmall);

    // Main large spinning disc
    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 11, 3, 16),
        makeStructuralMaterial(c)
    );
    disc.position.y = 38;
    group.add(disc);

    // Gatling cluster: 3 thin barrels in aiming pivot
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 38;

    const barrelOffsets = [-1.8, 1.8, 0];
    let trackedBarrel = null;
    for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 16, 6),
            makeAccentMaterial(_brighter(c))
        );
        b.rotation.z = Math.PI / 2;
        b.position.set(12, barrelOffsets[i], 0);
        turretPivot.add(b);
        if (i === 2) trackedBarrel = b;
    }

    const muzzleRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.5, 4, 10),
        makeAccentMaterial(_brighter(c))
    );
    muzzleRing.material._ignoreColor = true;
    muzzleRing.position.set(20, 0, 0);
    muzzleRing.rotation.y = Math.PI / 2;
    turretPivot.add(muzzleRing);

    group.add(turretPivot);

    var flashMatA = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    flashMatA._ignoreColor = true;
    var muzzleFlashA = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMatA);
    muzzleFlashA.position.set(22, 0, 0);
    muzzleFlashA.visible = false;
    turretPivot.add(muzzleFlashA);

    group.userData.disc = disc;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = trackedBarrel;
    group.userData.barrelY = 38;
    group.userData.barrelDist = 12;
    group.userData.muzzleFlash = muzzleFlashA;
}

// Branch B "Heavy Bolts" — ~48 units: chunky military, massive barrel, splash ring
function _buildPulseBranchB(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(13, 14, 28, 14),
        makeStructuralMaterial(c)
    );
    base.position.y = 14;
    group.add(base);

    // Reinforcement plates
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(4, 22, 2),
            makeStructuralMaterial(c)
        );
        plate.position.set(Math.cos(angle) * 12, 13, Math.sin(angle) * 12);
        plate.rotation.y = -angle;
        group.add(plate);
    }

    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(14, 2.5, 6, 18),
        makeStructuralMaterial(c)
    );
    collar.position.y = 26;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Upper turret assembly — rotates as one unit to aim
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 28;

    const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 8, 12),
        makeStructuralMaterial(c)
    );
    turret.position.y = 4;
    turretPivot.add(turret);

    // Shoulder plates
    for (let i = 0; i < 2; i++) {
        const side = i === 0 ? -1 : 1;
        const shoulder = new THREE.Mesh(
            new THREE.BoxGeometry(3, 6, 10),
            makeStructuralMaterial(c)
        );
        shoulder.position.set(side * 10, 5, 0);
        turretPivot.add(shoulder);
    }

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 4, 22, 8),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(16, 6, 0);
    turretPivot.add(barrel);

    const muzzle = new THREE.Mesh(
        new THREE.ConeGeometry(6, 6, 8),
        makeAccentMaterial(_brighter(c))
    );
    muzzle.rotation.z = -Math.PI / 2;
    muzzle.position.set(28, 6, 0);
    turretPivot.add(muzzle);

    const splashRing = new THREE.Mesh(
        new THREE.TorusGeometry(5, 0.8, 6, 14),
        makeGlowMaterial(_brighter(c), 0.7)
    );
    splashRing.material._ignoreColor = true;
    splashRing.position.set(24, 6, 0);
    splashRing.rotation.y = Math.PI / 2;
    turretPivot.add(splashRing);

    group.add(turretPivot);

    var flashMatB = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    flashMatB._ignoreColor = true;
    var muzzleFlashB = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 6), flashMatB);
    muzzleFlashB.position.set(30, 6, 0);
    muzzleFlashB.visible = false;
    turretPivot.add(muzzleFlashB);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 34;
    group.userData.barrelDist = 16;
    group.userData.muzzleFlash = muzzleFlashB;
}

// ═══════════════════════════════════════════════════════════════
//  RAIL TOWER BUILDERS (Magenta)
// ═══════════════════════════════════════════════════════════════

function _railCornerPosts(group, c, halfSpread, height) {
    for (let i = 0; i < 4; i++) {
        const px = (i % 2 === 0) ? -halfSpread : halfSpread;
        const pz = (i < 2) ? -halfSpread : halfSpread;
        const pillar = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, height, 6),
            makeStructuralMaterial(c)
        );
        pillar.position.set(px, height / 2, pz);
        group.add(pillar);
    }
}

// L0 — ~22 units tall: simple box base, short barrel
function _buildRailL0(group, c) {
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(16, 18, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 9;
    group.add(base);

    _railCornerPosts(group, c, 7, 20);

    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 18;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 16, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 8;
    barrelGroup.add(barrel);

    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 2.5, 3, 6),
        makeAccentMaterial(_brighter(c))
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.x = 17;
    barrelGroup.add(tip);

    var glowPts0 = [new THREE.Vector3(0,0,0), new THREE.Vector3(17, 0, 0)];
    var glowGeo0 = new THREE.BufferGeometry().setFromPoints(glowPts0);
    var glowMat0 = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0});
    glowMat0._ignoreColor = true;
    var barrelGlow0 = new THREE.Line(glowGeo0, glowMat0);
    barrelGroup.add(barrelGlow0);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
    group.userData.barrelGlow = barrelGlow0;
}

// L1 — ~30 units tall: taller, stabilizer fins
function _buildRailL1(group, c) {
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(16, 24, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 12;
    group.add(base);

    _railCornerPosts(group, c, 7, 26);

    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 24;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 22, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 11;
    barrelGroup.add(barrel);

    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 2.5, 3, 6),
        makeAccentMaterial(_brighter(c))
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.x = 23;
    barrelGroup.add(tip);

    // Stabilizer fins
    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(8, 4, 1),
            makeStructuralMaterial(c)
        );
        fin.position.set(6, 0, sign * 3.5);
        barrelGroup.add(fin);
    }

    var glowPts1 = [new THREE.Vector3(0,0,0), new THREE.Vector3(22, 0, 0)];
    var glowGeo1 = new THREE.BufferGeometry().setFromPoints(glowPts1);
    var glowMat1 = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0});
    glowMat1._ignoreColor = true;
    var barrelGlow1 = new THREE.Line(glowGeo1, glowMat1);
    barrelGroup.add(barrelGlow1);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
    group.userData.barrelGlow = barrelGlow1;
}

// L2 — ~36 units tall: fortress base, flash suppressor, charging coil
function _buildRailL2(group, c) {
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(18, 26, 18),
        makeStructuralMaterial(c)
    );
    base.position.y = 13;
    group.add(base);

    _railCornerPosts(group, c, 8, 28);

    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(10, 1.2, 6, 16),
        makeAccentMaterial(_brighter(c))
    );
    collar.position.y = 26;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 26;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 26, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 13;
    barrelGroup.add(barrel);

    const suppressor = new THREE.Mesh(
        new THREE.ConeGeometry(5, 5, 6),
        makeAccentMaterial(_brighter(c))
    );
    suppressor.rotation.z = -Math.PI / 2;
    suppressor.position.x = 28;
    barrelGroup.add(suppressor);

    const coil = new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 0.8, 6, 14),
        makeAccentMaterial(_brighter(c))
    );
    coil.position.x = 13;
    coil.rotation.y = Math.PI / 2;
    barrelGroup.add(coil);

    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(10, 5, 1),
            makeStructuralMaterial(c)
        );
        fin.position.set(8, 0, sign * 4);
        barrelGroup.add(fin);
    }

    var glowPts2 = [new THREE.Vector3(0,0,0), new THREE.Vector3(25, 0, 0)];
    var glowGeo2 = new THREE.BufferGeometry().setFromPoints(glowPts2);
    var glowMat2r = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0});
    glowMat2r._ignoreColor = true;
    var barrelGlow2 = new THREE.Line(glowGeo2, glowMat2r);
    barrelGroup.add(barrelGlow2);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
    group.userData.barrelGlow = barrelGlow2;
}

// Branch A "Longline" — ~55 units: extreme sniper barrel, scope antenna
function _buildRailBranchA(group, c) {
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(14, 36, 14),
        makeStructuralMaterial(c)
    );
    base.position.y = 18;
    group.add(base);

    _railCornerPosts(group, c, 6, 38);

    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(8, 1, 6, 14),
        makeAccentMaterial(_brighter(c))
    );
    collar.position.y = 36;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    const scope = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 16, 6),
        makeAccentMaterial(_brighter(c))
    );
    scope.position.set(0, 44, 0);
    group.add(scope);

    const scopeTip = new THREE.Mesh(
        new THREE.SphereGeometry(2, 8, 6),
        makeAccentMaterial(_brighter(c))
    );
    scopeTip.position.set(0, 53, 0);
    group.add(scopeTip);

    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 36;

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6),
        makeStructuralMaterial(c)
    );
    frame.position.x = 2;
    barrelGroup.add(frame);

    // Very long sniper barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 40, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 20;
    barrelGroup.add(barrel);

    const shroud = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 2.5, 12, 6),
        makeStructuralMaterial(c)
    );
    shroud.rotation.z = Math.PI / 2;
    shroud.position.x = 6;
    barrelGroup.add(shroud);

    const precisionTip = new THREE.Mesh(
        new THREE.ConeGeometry(2.5, 4, 6),
        makeAccentMaterial(_brighter(c))
    );
    precisionTip.rotation.z = -Math.PI / 2;
    precisionTip.position.x = 42;
    barrelGroup.add(precisionTip);

    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(14, 3, 0.8),
            makeStructuralMaterial(c)
        );
        fin.position.set(10, 0, sign * 3);
        barrelGroup.add(fin);
    }

    var glowPtsA = [new THREE.Vector3(0,0,0), new THREE.Vector3(40, 0, 0)];
    var glowGeoA = new THREE.BufferGeometry().setFromPoints(glowPtsA);
    var glowMatA = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0});
    glowMatA._ignoreColor = true;
    var barrelGlowA = new THREE.Line(glowGeoA, glowMatA);
    barrelGroup.add(barrelGlowA);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
    group.userData.barrelGlow = barrelGlowA;
}

// Branch B "Capacitor" — ~45 units: massive thick barrel, capacitor banks, charging rings
function _buildRailBranchB(group, c) {
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(20, 28, 20),
        makeStructuralMaterial(c)
    );
    base.position.y = 14;
    group.add(base);

    _railCornerPosts(group, c, 9, 30);

    // Capacitor banks on sides
    const capPositions = [
        { x:  12, z:  0 },
        { x: -12, z:  0 },
        { x:   0, z:  12 },
        { x:   0, z: -12 },
    ];
    for (const cp of capPositions) {
        const cap = new THREE.Mesh(
            new THREE.BoxGeometry(4, 12, 4),
            makeAccentMaterial(_brighter(c))
        );
        cap.position.set(cp.x, 18, cp.z);
        group.add(cap);
    }

    const topPlate = new THREE.Mesh(
        new THREE.BoxGeometry(22, 2, 22),
        makeStructuralMaterial(c)
    );
    topPlate.position.y = 29;
    group.add(topPlate);

    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 28;

    // Short massive barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 14, 8),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 7;
    barrelGroup.add(barrel);

    const jacket = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 7, 6, 8),
        makeStructuralMaterial(c)
    );
    jacket.rotation.z = Math.PI / 2;
    jacket.position.x = 2;
    barrelGroup.add(jacket);

    // Charging rings along barrel
    for (let ri = 0; ri < 3; ri++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(7, 0.8, 6, 14),
            makeAccentMaterial(_brighter(c))
        );
        ring.position.x = 3 + ri * 5;
        ring.rotation.y = Math.PI / 2;
        barrelGroup.add(ring);
    }

    const muzzle = new THREE.Mesh(
        new THREE.CylinderGeometry(6.5, 5, 3, 8),
        makeAccentMaterial(_brighter(c))
    );
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.x = 15;
    barrelGroup.add(muzzle);

    var glowPtsB = [new THREE.Vector3(0,0,0), new THREE.Vector3(20, 0, 0)];
    var glowGeoB = new THREE.BufferGeometry().setFromPoints(glowPtsB);
    var glowMatB = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0});
    glowMatB._ignoreColor = true;
    var barrelGlowB = new THREE.Line(glowGeoB, glowMatB);
    barrelGroup.add(barrelGlowB);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
    group.userData.barrelGlow = barrelGlowB;
}

// ═══════════════════════════════════════════════════════════════
//  TESLA TOWER BUILDERS (Electric Blue)
// ═══════════════════════════════════════════════════════════════

function _teslaAntenna(group, c, angle, y, height, radius) {
    const spike = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, height, 6),
        makeStructuralMaterial(c)
    );
    spike.position.set(Math.cos(angle) * 8, y, Math.sin(angle) * 8);
    spike.rotation.z = Math.cos(angle) * 0.4;
    spike.rotation.x = -Math.sin(angle) * 0.4;
    group.add(spike);
}

// L0 — ~22 units: cylinder base, sphere, 3 antennas
function _buildTeslaL0(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 18, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 9;
    group.add(base);

    const orb = new THREE.Mesh(
        new THREE.SphereGeometry(6, 16, 12),
        makeAccentMaterial(c)
    );
    orb.position.y = 22;
    group.add(orb);

    for (let i = 0; i < 3; i++) {
        _teslaAntenna(group, c, (i / 3) * Math.PI * 2, 22, 8, 0.6);
    }

    var sparkGroup0 = new THREE.Group();
    var sparkMat0 = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    sparkMat0._ignoreColor = true;
    var sparkGeo0 = new THREE.SphereGeometry(1, 5, 4);
    var sparkOff0 = [[4,0,0],[-4,0,0],[0,0,4],[0,0,-4]];
    for (var si0 = 0; si0 < 4; si0++) {
        var sm0 = new THREE.Mesh(sparkGeo0, sparkMat0);
        sm0.position.set(sparkOff0[si0][0], 22, sparkOff0[si0][2]);
        sparkGroup0.add(sm0);
    }
    sparkGroup0.visible = false;
    group.add(sparkGroup0);

    group.userData.orb = orb;
    group.userData.sparkRing = sparkGroup0;
}

// L1 — ~30 units: taller base, neck, larger orb, 4 antennas
function _buildTeslaL1(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 22, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 11;
    group.add(base);

    const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 6, 5, 12),
        makeStructuralMaterial(c)
    );
    neck.position.y = 24.5;
    group.add(neck);

    const orb = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 12),
        makeAccentMaterial(c)
    );
    orb.position.y = 30;
    group.add(orb);

    for (let i = 0; i < 4; i++) {
        _teslaAntenna(group, c, (i / 4) * Math.PI * 2, 30, 8, 0.6);
    }

    var sparkGroup1 = new THREE.Group();
    var sparkMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    sparkMat1._ignoreColor = true;
    var sparkGeo1 = new THREE.SphereGeometry(1, 5, 4);
    var sparkOff1 = [[4,0,0],[-4,0,0],[0,0,4],[0,0,-4]];
    for (var si1 = 0; si1 < 4; si1++) {
        var sm1 = new THREE.Mesh(sparkGeo1, sparkMat1);
        sm1.position.set(sparkOff1[si1][0], 30, sparkOff1[si1][2]);
        sparkGroup1.add(sm1);
    }
    sparkGroup1.visible = false;
    group.add(sparkGroup1);

    group.userData.orb = orb;
    group.userData.sparkRing = sparkGroup1;
}

// L2 — ~47 units: full Tesla coil, 6 antennas, tall central spike
function _buildTeslaL2(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 12, 24, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 12;
    group.add(base);

    const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 5, 6, 12),
        makeStructuralMaterial(c)
    );
    neck.position.y = 27;
    group.add(neck);

    const orb = new THREE.Mesh(
        new THREE.SphereGeometry(10, 20, 14),
        makeAccentMaterial(c)
    );
    orb.position.y = 36;
    group.add(orb);

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const spike = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 8, 6),
            makeStructuralMaterial(c)
        );
        spike.position.set(Math.cos(angle) * 12, 36, Math.sin(angle) * 12);
        spike.rotation.z = Math.cos(angle) * 0.5;
        spike.rotation.x = -Math.sin(angle) * 0.5;
        group.add(spike);
    }

    const centralSpike = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 14, 6),
        makeAccentMaterial(_brighter(c))
    );
    centralSpike.position.y = 47;
    group.add(centralSpike);

    var sparkGroup2 = new THREE.Group();
    var sparkMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    sparkMat2._ignoreColor = true;
    var sparkGeo2 = new THREE.SphereGeometry(1, 5, 4);
    var sparkOff2 = [[4,0,0],[-4,0,0],[0,0,4],[0,0,-4]];
    for (var si2 = 0; si2 < 4; si2++) {
        var sm2 = new THREE.Mesh(sparkGeo2, sparkMat2);
        sm2.position.set(sparkOff2[si2][0], 36, sparkOff2[si2][2]);
        sparkGroup2.add(sm2);
    }
    sparkGroup2.visible = false;
    group.add(sparkGroup2);

    group.userData.orb = orb;
    group.userData.sparkRing = sparkGroup2;
}

// Branch A "Arc Web" — ~52 units: crown of 5 orbs, wide broadcast
function _buildTeslaBranchA(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 28, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 14;
    group.add(base);

    // Crown of 5 smaller orbs
    let firstOrb = null;
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(4, 14, 10),
            makeAccentMaterial(c)
        );
        orb.position.set(Math.cos(angle) * 11, 40, Math.sin(angle) * 11);
        group.add(orb);
        if (i === 0) firstOrb = orb;
    }

    const centralSpike = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 18, 8),
        makeAccentMaterial(_brighter(c))
    );
    centralSpike.position.y = 44;
    group.add(centralSpike);

    // 8 short antennas radiating at crown level
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const ant = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 6, 6),
            makeStructuralMaterial(c)
        );
        ant.position.set(Math.cos(angle) * 14, 40, Math.sin(angle) * 14);
        ant.rotation.z = Math.cos(angle) * 0.6;
        ant.rotation.x = -Math.sin(angle) * 0.6;
        group.add(ant);
    }

    var sparkGroupA = new THREE.Group();
    var sparkMatA = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    sparkMatA._ignoreColor = true;
    var sparkGeoA = new THREE.SphereGeometry(1, 5, 4);
    var sparkOffA = [[4,0,0],[-4,0,0],[0,0,4],[0,0,-4]];
    for (var siA = 0; siA < 4; siA++) {
        var smA = new THREE.Mesh(sparkGeoA, sparkMatA);
        smA.position.set(sparkOffA[siA][0], 48, sparkOffA[siA][2]);
        sparkGroupA.add(smA);
    }
    sparkGroupA.visible = false;
    group.add(sparkGroupA);

    group.userData.orb = firstOrb;
    group.userData.sparkRing = sparkGroupA;
}

// Branch B "Burn" — ~52 units: single massive orb, 3 orbital torus rings, 3 large antennas
function _buildTeslaBranchB(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 11, 26, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 13;
    group.add(base);

    const orb = new THREE.Mesh(
        new THREE.SphereGeometry(14, 24, 16),
        makeAccentMaterial(c)
    );
    orb.position.y = 38;
    group.add(orb);

    // 3 orbital torus rings at different angles
    const torusConfigs = [
        { rx: Math.PI / 2, rz: 0,           ry: 0 },
        { rx: Math.PI / 3, rz: Math.PI / 4,  ry: 0 },
        { rx: -Math.PI / 4, rz: -Math.PI / 3, ry: Math.PI / 6 },
    ];
    for (const cfg of torusConfigs) {
        const torusMat = makeGlowMaterial(_brighter(c), 0.5);
        torusMat._ignoreColor = true;
        const torus = new THREE.Mesh(new THREE.TorusGeometry(17, 0.7, 8, 32), torusMat);
        torus.position.y = 38;
        torus.rotation.x = cfg.rx;
        torus.rotation.z = cfg.rz;
        torus.rotation.y = cfg.ry;
        group.add(torus);
    }

    // 3 large antennas
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const ant = new THREE.Mesh(
            new THREE.CylinderGeometry(1.2, 1.2, 12, 6),
            makeStructuralMaterial(c)
        );
        ant.position.set(Math.cos(angle) * 10, 44, Math.sin(angle) * 10);
        ant.rotation.z = Math.cos(angle) * 0.4;
        ant.rotation.x = -Math.sin(angle) * 0.4;
        group.add(ant);
    }

    var sparkGroupB = new THREE.Group();
    var sparkMatB = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    sparkMatB._ignoreColor = true;
    var sparkGeoB = new THREE.SphereGeometry(1, 5, 4);
    var sparkOffB = [[4,0,0],[-4,0,0],[0,0,4],[0,0,-4]];
    for (var siB = 0; siB < 4; siB++) {
        var smB = new THREE.Mesh(sparkGeoB, sparkMatB);
        smB.position.set(sparkOffB[siB][0], 44, sparkOffB[siB][2]);
        sparkGroupB.add(smB);
    }
    sparkGroupB.visible = false;
    group.add(sparkGroupB);

    group.userData.orb = orb;
    group.userData.sparkRing = sparkGroupB;
}

// ═══════════════════════════════════════════════════════════════
//  CRYO TOWER BUILDERS (Ice Blue)
// ═══════════════════════════════════════════════════════════════

// L0 — ~14 units: short base, small hemisphere dome
function _buildCryoL0(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 6, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 3;
    group.add(base);

    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(9, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        makeAccentMaterial(c)
    );
    dome.position.y = 6;
    group.add(dome);

    group.userData.ring = null;
    group.userData.emitter = null;
}

// L1 — ~20 units: taller base, larger dome, outer ring, inner emitter
function _buildCryoL1(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 10, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 5;
    group.add(base);

    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(11, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        makeAccentMaterial(c)
    );
    dome.position.y = 10;
    group.add(dome);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1.2, 8, 32),
        makeAccentMaterial(c)
    );
    ring.position.y = 10;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const emitter = new THREE.Mesh(
        new THREE.SphereGeometry(4, 12, 8),
        makeAccentMaterial(_brighter(c))
    );
    emitter.position.y = 12;
    group.add(emitter);

    var mistGeoL1 = new THREE.SphereGeometry(4, 8, 6);
    var mistMatL1 = makeGlowMaterial(toColor(ICE_BLUE), 0.15);
    mistMatL1._ignoreColor = true;
    var frostMistL1 = new THREE.Mesh(mistGeoL1, mistMatL1);
    frostMistL1.position.y = 14;
    frostMistL1.visible = false;
    group.add(frostMistL1);

    group.userData.ring = ring;
    group.userData.emitter = emitter;
    group.userData.frostMist = frostMistL1;
}

// L2 — ~26 units: base column, large translucent dome, spinning ring, emitter
function _buildCryoL2(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 11, 14, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 7;
    group.add(base);

    const domeMat = makeGlowMaterial(new THREE.Color(150 / 255, 220 / 255, 255 / 255), 0.5);
    domeMat._ignoreColor = true;
    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(14, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2),
        domeMat
    );
    dome.material.side = THREE.DoubleSide;
    dome.position.y = 14;
    group.add(dome);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(13, 1.5, 8, 32),
        makeAccentMaterial(c)
    );
    ring.position.y = 14;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const emitter = new THREE.Mesh(
        new THREE.SphereGeometry(5, 12, 8),
        makeAccentMaterial(_brighter(c))
    );
    emitter.position.y = 16;
    group.add(emitter);

    var mistGeoL2 = new THREE.SphereGeometry(4, 8, 6);
    var mistMatL2 = makeGlowMaterial(toColor(ICE_BLUE), 0.15);
    mistMatL2._ignoreColor = true;
    var frostMistL2 = new THREE.Mesh(mistGeoL2, mistMatL2);
    frostMistL2.position.y = 20;
    frostMistL2.visible = false;
    group.add(frostMistL2);

    group.userData.ring = ring;
    group.userData.emitter = emitter;
    group.userData.frostMist = frostMistL2;
}

// Branch A "Deep Freeze" — ~40 units: massive dome, cryo pillars, 3 concentric rings
function _buildCryoBranchA(group, c) {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 10, 16),
        makeStructuralMaterial(c)
    );
    base.position.y = 5;
    group.add(base);

    // 4 cryo pillars
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const pillar = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, 26, 8),
            makeStructuralMaterial(c)
        );
        pillar.position.set(Math.cos(angle) * 10, 23, Math.sin(angle) * 10);
        group.add(pillar);
    }

    const domeMat = makeGlowMaterial(new THREE.Color(150 / 255, 220 / 255, 255 / 255), 0.45);
    domeMat._ignoreColor = true;
    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(18, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        domeMat
    );
    dome.material.side = THREE.DoubleSide;
    dome.position.y = 10;
    group.add(dome);

    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(16, 1.2, 8, 32),
        makeAccentMaterial(c)
    );
    ring1.position.y = 12;
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(13, 1.0, 8, 32),
        makeAccentMaterial(c)
    );
    ring2.position.y = 16;
    ring2.rotation.x = Math.PI / 2;
    group.add(ring2);

    const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(10, 0.8, 8, 32),
        makeAccentMaterial(c)
    );
    ring3.position.y = 20;
    ring3.rotation.x = Math.PI / 2;
    group.add(ring3);

    const emitter = new THREE.Mesh(
        new THREE.SphereGeometry(6, 14, 10),
        makeAccentMaterial(_brighter(c))
    );
    emitter.position.y = 18;
    group.add(emitter);

    var mistGeoBA = new THREE.SphereGeometry(4, 8, 6);
    var mistMatBA = makeGlowMaterial(toColor(ICE_BLUE), 0.15);
    mistMatBA._ignoreColor = true;
    var frostMistBA = new THREE.Mesh(mistGeoBA, mistMatBA);
    frostMistBA.position.y = 30;
    frostMistBA.visible = false;
    group.add(frostMistBA);

    group.userData.ring = ring1;
    group.userData.emitter = emitter;
    group.userData.frostMist = frostMistBA;
}

// Branch B "Brittle" — ~38 units: angular crystal spikes, NO dome, bright exposed emitter
function _buildCryoBranchB(group, c) {
    // Hexagonal base (6 segments)
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 13, 14, 6),
        makeStructuralMaterial(c)
    );
    base.position.y = 7;
    group.add(base);

    // 8 crystal spikes in a ring
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const spike = new THREE.Mesh(
            new THREE.ConeGeometry(2, 16, 4),
            makeAccentMaterial(c)
        );
        spike.position.set(
            Math.cos(angle) * 8,
            14 + Math.sin(i * 1.7) * 3,
            Math.sin(angle) * 8
        );
        spike.rotation.x = Math.cos(angle) * 0.2;
        spike.rotation.z = -Math.sin(angle) * 0.2;
        group.add(spike);
    }

    const emitter = new THREE.Mesh(
        new THREE.SphereGeometry(5, 12, 8),
        makeAccentMaterial(_brighter(c))
    );
    emitter.position.y = 18;
    group.add(emitter);

    const topSpike = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 10, 4),
        makeAccentMaterial(c)
    );
    topSpike.position.y = 28;
    group.add(topSpike);

    group.userData.ring = null;
    group.userData.emitter = emitter;
}

// ═══════════════════════════════════════════════════════════════
//  NOVA TOWER BUILDERS (Hot Pink)
// ═══════════════════════════════════════════════════════════════

// L0 — ~16 units: simple pedestal, floating sphere
function _buildNovaL0(group, c) {
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 10, 12),
        makeStructuralMaterial(c)
    );
    pedestal.position.y = 5;
    group.add(pedestal);

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(6, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 14;
    group.add(core);

    var grGeo0 = new THREE.RingGeometry(1, 2, 32);
    var grMat0 = makeGlowMaterial(toColor([255, 50, 150]), 0.3);
    grMat0._ignoreColor = true;
    var groundRing0 = new THREE.Mesh(grGeo0, grMat0);
    groundRing0.rotation.x = -Math.PI / 2;
    groundRing0.position.y = 1;
    groundRing0.visible = false;
    group.add(groundRing0);

    group.userData.ring = null;
    group.userData.ring2 = null;
    group.userData.core = core;
    group.userData.groundRing = groundRing0;
}

// L1 — ~24 units: taller pedestal, 4 struts, larger sphere, horizontal torus
function _buildNovaL1(group, c) {
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 14, 12),
        makeStructuralMaterial(c)
    );
    pedestal.position.y = 7;
    group.add(pedestal);

    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 10, 6),
            makeStructuralMaterial(c)
        );
        strut.position.set(Math.cos(angle) * 6, 15, Math.sin(angle) * 6);
        group.add(strut);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(7, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 22;
    group.add(core);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(12, 2, 8, 24),
        makeAccentMaterial(c)
    );
    ring.position.y = 22;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    var grGeo1 = new THREE.RingGeometry(1, 2, 32);
    var grMat1 = makeGlowMaterial(toColor([255, 50, 150]), 0.3);
    grMat1._ignoreColor = true;
    var groundRing1 = new THREE.Mesh(grGeo1, grMat1);
    groundRing1.rotation.x = -Math.PI / 2;
    groundRing1.position.y = 1;
    groundRing1.visible = false;
    group.add(groundRing1);

    group.userData.ring = ring;
    group.userData.ring2 = null;
    group.userData.core = core;
    group.userData.groundRing = groundRing1;
}

// L2 — ~32 units: proper pedestal, 4 struts, large core, horizontal + vertical rings
function _buildNovaL2(group, c) {
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 16, 12),
        makeStructuralMaterial(c)
    );
    pedestal.position.y = 8;
    group.add(pedestal);

    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 14, 6),
            makeStructuralMaterial(c)
        );
        strut.position.set(Math.cos(angle) * 7, 21, Math.sin(angle) * 7);
        group.add(strut);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 28;
    group.add(core);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(14, 2.5, 8, 24),
        makeAccentMaterial(c)
    );
    ring.position.y = 28;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1, 8, 24),
        makeStructuralMaterial(c)
    );
    ring2.position.y = 28;
    group.add(ring2);

    var grGeo2 = new THREE.RingGeometry(1, 2, 32);
    var grMat2 = makeGlowMaterial(toColor([255, 50, 150]), 0.3);
    grMat2._ignoreColor = true;
    var groundRing2 = new THREE.Mesh(grGeo2, grMat2);
    groundRing2.rotation.x = -Math.PI / 2;
    groundRing2.position.y = 1;
    groundRing2.visible = false;
    group.add(groundRing2);

    group.userData.ring = ring;
    group.userData.ring2 = ring2;
    group.userData.core = core;
    group.userData.groundRing = groundRing2;
}

// Branch A "Shockwave" — ~55 units: thin pillar, elevated core, 3 massive tilted rings
function _buildNovaBranchA(group, c) {
    const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 40, 8),
        makeStructuralMaterial(c)
    );
    pillar.position.y = 20;
    group.add(pillar);

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(9, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 42;
    group.add(core);

    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(18, 2.5, 8, 24),
        makeAccentMaterial(c)
    );
    ring1.position.y = 35;
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(20, 2, 8, 24),
        makeStructuralMaterial(c)
    );
    ring2.position.y = 42;
    ring2.rotation.x = Math.PI / 4;
    group.add(ring2);

    const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(22, 1.5, 8, 24),
        makeStructuralMaterial(c)
    );
    ring3.position.y = 48;
    ring3.rotation.z = Math.PI / 3;
    group.add(ring3);

    var grGeoA = new THREE.RingGeometry(1, 2, 32);
    var grMatA = makeGlowMaterial(toColor([255, 50, 150]), 0.3);
    grMatA._ignoreColor = true;
    var groundRingA = new THREE.Mesh(grGeoA, grMatA);
    groundRingA.rotation.x = -Math.PI / 2;
    groundRingA.position.y = 1;
    groundRingA.visible = false;
    group.add(groundRingA);

    group.userData.ring = ring1;
    group.userData.ring2 = ring2;
    group.userData.core = core;
    group.userData.groundRing = groundRingA;
}

// Branch B "Focused Core" — ~42 units: compact cage, massive bright core, tight ring
function _buildNovaBranchB(group, c) {
    const brightCore = new THREE.Color(
        Math.min(1, c.r + 0.4),
        Math.min(1, c.g + 0.4),
        Math.min(1, c.b + 0.4)
    );

    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 20, 12),
        makeStructuralMaterial(c)
    );
    pedestal.position.y = 10;
    group.add(pedestal);

    // 6 inward-tilting cage struts
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1.5, 18, 6),
            makeStructuralMaterial(c)
        );
        strut.position.set(Math.cos(angle) * 9, 26, Math.sin(angle) * 9);
        strut.rotation.z = Math.cos(angle) * (Math.PI / 8);
        strut.rotation.x = -Math.sin(angle) * (Math.PI / 8);
        group.add(strut);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(13, 20, 14),
        makeAccentMaterial(brightCore)
    );
    core.position.y = 34;
    group.add(core);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(14, 1.5, 8, 24),
        makeAccentMaterial(c)
    );
    ring.position.y = 34;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    var grGeoB2 = new THREE.RingGeometry(1, 2, 32);
    var grMatB2 = makeGlowMaterial(toColor([255, 50, 150]), 0.3);
    grMatB2._ignoreColor = true;
    var groundRingB2 = new THREE.Mesh(grGeoB2, grMatB2);
    groundRingB2.rotation.x = -Math.PI / 2;
    groundRingB2.position.y = 1;
    groundRingB2.visible = false;
    group.add(groundRingB2);

    group.userData.ring = ring;
    group.userData.ring2 = null;
    group.userData.core = core;
    group.userData.groundRing = groundRingB2;
}

// ═══════════════════════════════════════════════════════════════
//  POWER_PLANT TOWER BUILDERS (Amber)
// ═══════════════════════════════════════════════════════════════

function _powerSpokes(group, c, y, count, armLength) {
    const spokes = new THREE.Group();
    spokes.position.y = y;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1.2, 1.2, armLength, 6),
            makeStructuralMaterial(c)
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(Math.cos(angle) * (armLength / 2), 0, Math.sin(angle) * (armLength / 2));
        arm.rotation.y = -angle + Math.PI / 2;
        spokes.add(arm);
    }
    return spokes;
}

// L0 — ~18 units: simple column, small sphere, 3 spokes
function _buildPowerL0(group, c) {
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 14, 10),
        makeStructuralMaterial(c)
    );
    column.position.y = 7;
    group.add(column);

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(5, 14, 10),
        makeAccentMaterial(c)
    );
    core.position.y = 16;
    group.add(core);

    const spokes = _powerSpokes(group, c, 16, 3, 14);
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// L1 — ~24 units: taller column, 2 ring decorations, larger sphere, 4 spokes
function _buildPowerL1(group, c) {
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 18, 10),
        makeStructuralMaterial(c)
    );
    column.position.y = 9;
    group.add(column);

    for (const ry of [6, 12]) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(10, 1, 6, 18),
            makeAccentMaterial(_brighter(c))
        );
        ring.position.y = ry;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(7, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 22;
    group.add(core);

    const spokes = _powerSpokes(group, c, 22, 4, 14);
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// L2 — ~32 units: tall column with 3 tier rings, large sphere, 6 spokes
function _buildPowerL2(group, c) {
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 24, 12),
        makeStructuralMaterial(c)
    );
    column.position.y = 12;
    group.add(column);

    for (const ry of [5, 10, 15]) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(11, 1.2, 6, 20),
            makeAccentMaterial(_brighter(c))
        );
        ring.position.y = ry;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(10, 18, 14),
        makeAccentMaterial(c)
    );
    core.position.y = 28;
    group.add(core);

    const spokes = _powerSpokes(group, c, 28, 6, 16);
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// Branch A "Grid Hub" — ~42 units: massive sphere, octahedron cage, 8 spokes
function _buildPowerBranchA(group, c) {
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 16, 12),
        makeStructuralMaterial(c)
    );
    column.position.y = 8;
    group.add(column);

    const transRing = new THREE.Mesh(
        new THREE.TorusGeometry(10, 1.5, 6, 20),
        makeAccentMaterial(_brighter(c))
    );
    transRing.position.y = 16;
    transRing.rotation.x = Math.PI / 2;
    group.add(transRing);

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(14, 20, 16),
        makeAccentMaterial(c)
    );
    core.position.y = 24;
    group.add(core);

    // Wireframe octahedron cage
    const cageMat = new THREE.MeshBasicMaterial({
        color: c.clone(),
        wireframe: true,
        transparent: true,
        opacity: 0.6,
    });
    cageMat._ignoreColor = true;
    const cage = new THREE.Mesh(new THREE.OctahedronGeometry(17, 1), cageMat);
    cage.position.y = 24;
    group.add(cage);

    const spokes = _powerSpokes(group, c, 24, 8, 18);
    group.add(spokes);

    const bottomRing = new THREE.Mesh(
        new THREE.TorusGeometry(13, 1, 6, 18),
        makeAccentMaterial(_brighter(c))
    );
    bottomRing.position.y = 12;
    bottomRing.rotation.x = Math.PI / 2;
    group.add(bottomRing);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// Branch B "Relay Core" — ~55 units: tall column, ascending spheres, top spokes
function _buildPowerBranchB(group, c) {
    const basePlat = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 14, 4, 10),
        makeStructuralMaterial(c)
    );
    basePlat.position.y = 2;
    group.add(basePlat);

    // Tall thin column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 44, 8),
        makeStructuralMaterial(c)
    );
    column.position.y = 22;
    group.add(column);

    // 3 diagonal struts for support
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(0.8, 0.8, 22, 6),
            makeStructuralMaterial(c)
        );
        strut.position.set(Math.cos(angle) * 6, 12, Math.sin(angle) * 6);
        const tiltAxis = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        strut.rotateOnAxis(tiltAxis, Math.PI / 6);
        group.add(strut);
    }

    // 5 ascending spheres along column
    const sphereYs = [10, 18, 26, 34, 42];
    const sphereRs = [3, 2.8, 2.5, 2.2, 2];
    for (let i = 0; i < sphereYs.length; i++) {
        const s = new THREE.Mesh(
            new THREE.SphereGeometry(sphereRs[i], 10, 8),
            makeAccentMaterial(_brighter(c))
        );
        s.position.y = sphereYs[i];
        group.add(s);
    }

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 12),
        makeAccentMaterial(c)
    );
    core.position.y = 48;
    group.add(core);

    const topRing = new THREE.Mesh(
        new THREE.TorusGeometry(9, 1, 6, 18),
        makeAccentMaterial(_brighter(c))
    );
    topRing.position.y = 48;
    topRing.rotation.x = Math.PI / 2;
    group.add(topRing);

    const spokes = _powerSpokes(group, c, 48, 6, 14);
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// ═══════════════════════════════════════════════════════════════
//  DISPATCHER — selects correct builder for tower state
// ═══════════════════════════════════════════════════════════════

function _createTowerModel(tower) {
    const group = new THREE.Group();
    const c = toColor(tower.color);
    const level = tower.level;
    const branch = tower.branch;

    switch (tower.type) {
        case TowerType.PULSE:
            if (branch === 'A')    _buildPulseBranchA(group, c);
            else if (branch === 'B') _buildPulseBranchB(group, c);
            else if (level >= 2)   _buildPulseL2(group, c);
            else if (level >= 1)   _buildPulseL1(group, c);
            else                   _buildPulseL0(group, c);
            break;

        case TowerType.RAIL:
            if (branch === 'A')    _buildRailBranchA(group, c);
            else if (branch === 'B') _buildRailBranchB(group, c);
            else if (level >= 2)   _buildRailL2(group, c);
            else if (level >= 1)   _buildRailL1(group, c);
            else                   _buildRailL0(group, c);
            break;

        case TowerType.TESLA:
            if (branch === 'A')    _buildTeslaBranchA(group, c);
            else if (branch === 'B') _buildTeslaBranchB(group, c);
            else if (level >= 2)   _buildTeslaL2(group, c);
            else if (level >= 1)   _buildTeslaL1(group, c);
            else                   _buildTeslaL0(group, c);
            break;

        case TowerType.CRYO:
            if (branch === 'A')    _buildCryoBranchA(group, c);
            else if (branch === 'B') _buildCryoBranchB(group, c);
            else if (level >= 2)   _buildCryoL2(group, c);
            else if (level >= 1)   _buildCryoL1(group, c);
            else                   _buildCryoL0(group, c);
            break;

        case TowerType.NOVA:
            if (branch === 'A')    _buildNovaBranchA(group, c);
            else if (branch === 'B') _buildNovaBranchB(group, c);
            else if (level >= 2)   _buildNovaL2(group, c);
            else if (level >= 1)   _buildNovaL1(group, c);
            else                   _buildNovaL0(group, c);
            break;

        case TowerType.POWER_PLANT:
            if (branch === 'A')    _buildPowerBranchA(group, c);
            else if (branch === 'B') _buildPowerBranchB(group, c);
            else if (level >= 2)   _buildPowerL2(group, c);
            else if (level >= 1)   _buildPowerL1(group, c);
            else                   _buildPowerL0(group, c);
            break;
    }

    return group;
}

// ═══════════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════════

export function createTowerMesh(tower) {
    const group = new THREE.Group();

    const model = _createTowerModel(tower);
    group.add(model);
    group.userData.model = model;
    group.userData.type = tower.type;

    const towerH = getTowerTopY(tower);

    // Construction wireframe overlay
    const wireGeo = new THREE.BoxGeometry(TILE_SIZE - 4, towerH + 5, TILE_SIZE - 4);
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
    });
    const wireframe = new THREE.Mesh(wireGeo, wireMat);
    wireframe.position.y = (towerH + 5) / 2;
    wireframe.visible = tower.isConstructing;
    group.add(wireframe);
    group.userData.wireframe = wireframe;

    // Construction progress bar (CSS2D)
    const barDiv = document.createElement('div');
    barDiv.className = 'build-bar-container';
    barDiv.style.pointerEvents = 'none';
    barDiv.innerHTML = `<div class="build-bar-bg"><div class="build-bar-fill" style="width:0%"></div></div>`;
    const barLabel = new CSS2DObject(barDiv);
    barLabel.position.set(0, towerH + 12, 0);
    barLabel.visible = false;
    group.userData.buildBarDiv = barDiv;
    group.userData.buildBarLabel = barLabel;
    group.add(barLabel);

    // HP bar (CSS2D)
    const hpDiv = document.createElement('div');
    hpDiv.className = 'hp-bar-container';
    hpDiv.style.pointerEvents = 'none';
    hpDiv.innerHTML = `<div class="hp-bar-bg"><div class="hp-bar-fill" style="width:100%;background:#32ff64"></div></div>`;
    const hpLabel = new CSS2DObject(hpDiv);
    hpLabel.position.set(0, towerH + 17, 0);
    hpLabel.visible = false;
    group.userData.hpBarDiv = hpDiv;
    group.userData.hpBarLabel = hpLabel;
    group.add(hpLabel);

    // Shield sphere
    const shieldGeo = new THREE.SphereGeometry(towerH * 0.65, 12, 8);
    const shieldMat = new THREE.MeshBasicMaterial({
        color: toColor(SHIELD_COLOR),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        wireframe: true,
    });
    const shieldSphere = new THREE.Mesh(shieldGeo, shieldMat);
    shieldSphere.position.y = towerH * 0.5;
    group.add(shieldSphere);
    group.userData.shieldRing = shieldSphere;

    // Overcharge glow ring at base
    const ocRingGeo = new THREE.TorusGeometry(20, 1.5, 8, 28);
    const ocRingMat = new THREE.MeshBasicMaterial({
        color: toColor(OVERCHARGE_COLOR),
        transparent: true,
        opacity: 0,
    });
    const ocRing = new THREE.Mesh(ocRingGeo, ocRingMat);
    ocRing.position.y = 1;
    ocRing.rotation.x = Math.PI / 2;
    group.add(ocRing);
    group.userData.ocRing = ocRing;

    // Range preview circle (perimeter ring, shown when selected)
    const rangePoints = [];
    for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        rangePoints.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
    }
    const rangeGeo = new THREE.BufferGeometry().setFromPoints(rangePoints);
    const rangeMat = new THREE.LineBasicMaterial({
        color: toColor(tower.color),
        transparent: true,
        opacity: 0,
        depthWrite: false,
    });
    const rangeDisc = new THREE.LineLoop(rangeGeo, rangeMat);
    rangeDisc.position.y = 0.5;
    group.add(rangeDisc);
    group.userData.rangeDisc = rangeDisc;

    // Selection highlight
    const selGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(TILE_SIZE - 1, 1, TILE_SIZE - 1));
    const selMat = new THREE.LineBasicMaterial({ color: toColor(GOLD_COLOR), transparent: true, opacity: 0 });
    const selBox = new THREE.LineSegments(selGeo, selMat);
    selBox.position.y = 0.5;
    group.add(selBox);
    group.userData.selBox = selBox;

    // Unpowered red indicator sphere above tower
    const unpowGeo = new THREE.SphereGeometry(4, 6, 5);
    const unpowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 0.1, 0.1),
        transparent: true,
        opacity: 0,
    });
    const unpowMesh = new THREE.Mesh(unpowGeo, unpowMat);
    unpowMesh.position.y = towerH + 8;
    group.add(unpowMesh);
    group.userData.unpoweredMesh = unpowMesh;

    // Position at tower center
    group.position.set(tower.x, 0, tower.y);

    scene.add(group);
    towerMeshMap.set(tower, group);
    return group;
}

export function updateTowerMesh(tower, selected, showRange, fortifyMult, dt, aimAngle = null) {
    const group = towerMeshMap.get(tower);
    if (!group) return;

    const model = group.userData.model;
    const type = tower.type;
    const now = performance.now();

    // ── Type-specific animations ──────────────────────────────
    if (type === TowerType.PULSE) {
        // Rotate the turret pivot to aim at current target angle
        if (model.userData.turretPivot) {
            const rad = (tower.angle || 0) * Math.PI / 180;
            model.userData.turretPivot.rotation.y = -rad;
        }
        // Disc spins independently (decorative)
        if (model.userData.disc && dt) {
            model.userData.disc.rotation.y += dt * 1.5;
        }
    }

    if (type === TowerType.RAIL && model.userData.barrelGroup) {
        const angle = aimAngle !== null ? aimAngle
            : (tower.fixedAngle !== null ? tower.fixedAngle : tower.angle);
        model.userData.barrelGroup.rotation.y = -((angle || 0) * Math.PI / 180);
    }

    if (type === TowerType.TESLA && model.userData.orb && dt) {
        model.userData.orb.rotation.y += dt * 1.2;
    }

    if (type === TowerType.CRYO) {
        if (model.userData.ring && dt) {
            var cryoBoost = group.userData._cryoFireBoost || 0;
            model.userData.ring.rotation.z += dt * (0.8 + cryoBoost * 2);
        }
        if (model.userData.emitter && dt) {
            const pulse = 0.8 + 0.2 * Math.sin(now * 0.003);
            model.userData.emitter.scale.setScalar(pulse);
        }
    }

    if (type === TowerType.NOVA) {
        if (model.userData.ring && dt) {
            model.userData.ring.rotation.z += dt * 1.0;
        }
        if (model.userData.ring2 && dt) {
            model.userData.ring2.rotation.y += dt * 0.6;
        }
        if (model.userData.core && dt) {
            const pulse = 0.9 + 0.1 * Math.sin(now * 0.004);
            model.userData.core.scale.setScalar(pulse);
        }
    }

    if (type === TowerType.POWER_PLANT) {
        if (model.userData.spokes && dt) {
            model.userData.spokes.rotation.y += dt * 1.0;
        }
        if (model.userData.core && dt) {
            const pulse = 0.92 + 0.08 * Math.sin(now * 0.005);
            model.userData.core.scale.setScalar(pulse);
        }
    }

    // ── Firing animations ──────────────────────────────────────
    var fireAge = now - tower.lastFireTime;

    if (tower.type === TowerType.PULSE) {
        var mf = model.userData.muzzleFlash;
        var barrel = model.userData.barrel;
        if (fireAge < 250) {
            if (mf) {
                mf.visible = fireAge < 120;
                var flashScale = 4 * Math.max(0, 1 - fireAge / 120);
                mf.scale.setScalar(flashScale);
            }
            if (barrel) {
                var maxRecoil = (tower.branch === 'A') ? 2 : 3.5;
                var decayMs = (tower.branch === 'A') ? 100 : 200;
                var recoil = maxRecoil * Math.exp(-fireAge * 4 / decayMs);
                var baseDist = group.userData.barrelDist || 9;
                barrel.position.x = baseDist - recoil;
            }
        } else {
            if (mf) mf.visible = false;
            if (barrel && group.userData.barrelDist) {
                barrel.position.x = group.userData.barrelDist;
            }
        }
    }

    if (tower.type === TowerType.RAIL) {
        var bg = model.userData.barrelGroup;
        var glow = model.userData.barrelGlow;
        if (fireAge < 350) {
            if (bg) {
                var maxRC = (tower.branch === 'B') ? 6 : (tower.branch === 'A' ? 3 : 4);
                var decayRC = 300;
                var rcAmt = maxRC * Math.exp(-fireAge * 4 / decayRC);
                var rad = (tower.angle || 0) * Math.PI / 180;
                bg.position.x = -Math.cos(rad) * rcAmt;
                bg.position.z = Math.sin(rad) * rcAmt;
            }
            if (glow) {
                glow.visible = fireAge < 200;
                glow.material.opacity = Math.max(0, 1 - fireAge / 200);
            }
        } else {
            if (bg) { bg.position.x = 0; bg.position.z = 0; }
            if (glow) glow.visible = false;
        }
    }

    if (tower.type === TowerType.TESLA) {
        var orb = model.userData.orb;
        var sr = model.userData.sparkRing;
        if (fireAge < 300) {
            if (orb) {
                var surge = 1 + 0.3 * Math.exp(-fireAge * 4 / 250);
                orb.scale.setScalar(surge);
            }
            if (sr) {
                sr.visible = fireAge < 150;
                sr.rotation.y = now * 0.008;
            }
        } else {
            if (orb) orb.scale.setScalar(1);
            if (sr) sr.visible = false;
        }
    }

    if (tower.type === TowerType.CRYO) {
        var emitter = model.userData.emitter;
        var mist = model.userData.frostMist;
        if (fireAge < 400) {
            if (emitter) {
                var epulse = 1 + 0.4 * Math.exp(-fireAge * 4 / 300);
                emitter.scale.setScalar(epulse);
            }
            group.userData._cryoFireBoost = Math.max(0, 1 - fireAge / 200) * 2;
            if (mist) {
                mist.visible = fireAge < 400;
                var mistT = fireAge / 400;
                mist.scale.setScalar(1 + mistT * 2);
                mist.material.opacity = 0.15 * Math.max(0, 1 - mistT);
            }
        } else {
            if (emitter) emitter.scale.setScalar(1);
            group.userData._cryoFireBoost = 0;
            if (mist) mist.visible = false;
        }
    }

    if (tower.type === TowerType.NOVA) {
        var ncore = model.userData.core;
        var nring1 = model.userData.ring;
        var nring2 = model.userData.ring2;
        var gr = model.userData.groundRing;
        if (fireAge < 500) {
            if (ncore) {
                var cflash = 1 + 0.5 * Math.exp(-fireAge * 3 / 400);
                ncore.scale.setScalar(cflash);
            }
            var rburst = 1 + 0.2 * Math.exp(-fireAge * 5 / 300);
            if (nring1) nring1.scale.setScalar(rburst);
            if (nring2) nring2.scale.setScalar(rburst);
            if (gr) {
                gr.visible = true;
                var grT = fireAge / 500;
                var grScale = grT * (tower.range || 80);
                gr.scale.setScalar(Math.max(0.1, grScale));
                gr.material.opacity = 0.3 * Math.max(0, 1 - grT);
            }
        } else {
            if (ncore) ncore.scale.setScalar(1);
            if (nring1) nring1.scale.setScalar(1);
            if (nring2) nring2.scale.setScalar(1);
            if (gr) gr.visible = false;
        }
    }

    // ── Construction wireframe ────────────────────────────────
    const wf = group.userData.wireframe;
    if (wf) {
        wf.visible = tower.isConstructing;
        if (tower.isConstructing) {
            wf.material.opacity = 0.2 + 0.3 * Math.sin(now * 0.005);
        }
    }

    // ── Construction progress bar ─────────────────────────────
    const barLabel = group.userData.buildBarLabel;
    const barDiv = group.userData.buildBarDiv;
    if (barLabel) {
        if (tower.isConstructing) {
            barLabel.visible = true;
            const fill = barDiv.querySelector('.build-bar-fill');
            if (fill) {
                fill.style.width = `${tower.constructionProgress * 100}%`;
                const stateColors = {
                    building:  'var(--cyan)',
                    upgrading: 'var(--green)',
                    branching: 'var(--gold)',
                    repairing: '#64ff96',
                    shielding: 'var(--ice)',
                };
                fill.style.background = stateColors[tower.constructionState] || 'var(--cyan)';
            }
        } else {
            barLabel.visible = false;
        }
    }

    // ── HP bar ────────────────────────────────────────────────
    const hpLabel = group.userData.hpBarLabel;
    const hpDiv = group.userData.hpBarDiv;
    if (hpLabel) {
        const maxHp = tower.getMaxHp(fortifyMult);
        const ratio = maxHp > 0 ? Math.max(0, tower.hp / maxHp) : 0;
        if (ratio < 1.0 && tower.hp > 0) {
            hpLabel.visible = true;
            const fill = hpDiv.querySelector('.hp-bar-fill');
            if (fill) {
                fill.style.width = `${ratio * 100}%`;
                const col = ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? YELLOW : RED;
                fill.style.background = `rgb(${col[0]},${col[1]},${col[2]})`;
            }
        } else {
            hpLabel.visible = false;
        }
    }

    // ── Shield sphere ─────────────────────────────────────────
    const shieldRing = group.userData.shieldRing;
    if (shieldRing) {
        if (tower.shieldActive && tower.shieldHp > 0) {
            const pulse = Math.pow(Math.max(0, Math.sin(now * 0.014)), 2);
            shieldRing.material.opacity = 0.04 + 0.11 * pulse;
            shieldRing.rotation.y += dt ? dt * 0.4 : 0;
        } else {
            shieldRing.material.opacity = 0;
        }
    }

    // ── Overcharge ring ───────────────────────────────────────
    const ocRing = group.userData.ocRing;
    if (ocRing) {
        if (tower.overchargeActive) {
            ocRing.material.opacity = 0.7 + 0.25 * Math.sin(now * 0.006);
            ocRing.rotation.z += dt ? dt * 1.5 : 0;
        } else {
            ocRing.material.opacity = 0;
        }
    }

    // ── Range preview circle ──────────────────────────────────
    const rangeDisc = group.userData.rangeDisc;
    if (rangeDisc) {
        if (selected) {
            const r = tower._isPowerPlant ? tower.powerRadius : tower.range;
            rangeDisc.scale.set(r, 1, r);
            rangeDisc.material.opacity = 0.7;
        } else {
            rangeDisc.material.opacity = 0;
        }
    }

    // ── Selection highlight ───────────────────────────────────
    const selBox = group.userData.selBox;
    if (selBox) {
        selBox.material.opacity = selected ? 0.9 : 0;
    }

    // ── Unpowered indicator ───────────────────────────────────
    const unpowMesh = group.userData.unpoweredMesh;
    if (unpowMesh) {
        if (!tower._isPowerPlant && !tower.isPowered) {
            unpowMesh.material.opacity = 0.8 + 0.2 * Math.sin(now * 0.003);
        } else {
            unpowMesh.material.opacity = 0;
        }
    }

    // ── Color tint (damage flash / unpowered / normal) ────────
    if (tower.damageFlashTimer > 0) {
        _tintModel(model, new THREE.Color(1, 0.2, 0.2));
    } else if (!tower._isPowerPlant && !tower.isPowered) {
        _tintModel(model, toColor(UNPOWERED_GRAY));
    } else {
        _tintModel(model, toColor(tower.color));
    }
}

function _tintModel(model, color) {
    model.traverse(obj => {
        if (!obj.isMesh || !obj.material || obj.material._ignoreColor) return;

        if (obj.material.isMeshStandardMaterial) {
            obj.material.color.copy(color.clone().multiplyScalar(0.25));
            obj.material.emissive.copy(color.clone().multiplyScalar(0.05));
        } else if (obj.material.isMeshBasicMaterial) {
            obj.material.color.copy(color);
        }
    });
}

export function removeTowerMesh(tower) {
    const group = towerMeshMap.get(tower);
    if (group) {
        // Clean up DOM elements (CSS2DRenderer doesn't auto-remove them)
        if (group.userData.hpBarDiv && group.userData.hpBarDiv.parentNode) {
            group.userData.hpBarDiv.parentNode.removeChild(group.userData.hpBarDiv);
        }
        if (group.userData.buildBarDiv && group.userData.buildBarDiv.parentNode) {
            group.userData.buildBarDiv.parentNode.removeChild(group.userData.buildBarDiv);
        }
        group.traverse(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        towerMeshMap.delete(tower);
    }
}

// Rebuild the mesh for a tower that just upgraded or branched
export function rebuildTowerMesh(tower) {
    removeTowerMesh(tower);
    createTowerMesh(tower);
}

// ── Power radius preview ──────────────────────────────────────
let _powerRadiusDisc = null;
export function showPowerRadiusPreview(tower, show) {
    if (_powerRadiusDisc) {
        _powerRadiusDisc.geometry.dispose();
        _powerRadiusDisc.material.dispose();
        scene.remove(_powerRadiusDisc);
        _powerRadiusDisc = null;
    }
    if (!show || !tower || !tower._isPowerPlant) return;
    const r = tower.powerRadius;
    if (r <= 0) return;
    const geo = new THREE.CircleGeometry(r, 40);
    const mat = new THREE.MeshBasicMaterial({
        color: toColor(POWER_AMBER),
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
    });
    _powerRadiusDisc = new THREE.Mesh(geo, mat);
    _powerRadiusDisc.rotation.x = -Math.PI / 2;
    _powerRadiusDisc.position.set(tower.x, 0.3, tower.y);
    scene.add(_powerRadiusDisc);
}

// ── Rail aiming preview line ──────────────────────────────────
let _railAimLine = null;
let _railAimGeo  = null;
let _railAimMat  = null;

export function showRailAimLine(tower, targetX, targetY) {
    if (!tower) return;
    const dx = targetX - tower.x;
    const dy = targetY - tower.y;
    const d = Math.hypot(dx, dy);
    if (d < 1) return;
    const ndx = dx / d, ndy = dy / d;
    const r = tower.range;
    const launchY = getTowerTopY(tower);
    const pts = [
        new THREE.Vector3(tower.x, launchY, tower.y),
        new THREE.Vector3(tower.x + ndx * r, 2, tower.y + ndy * r),
    ];

    if (!_railAimLine) {
        _railAimGeo = new THREE.BufferGeometry().setFromPoints(pts);
        _railAimMat = new THREE.LineBasicMaterial({ color: toColor(tower.color), transparent: true, opacity: 0.6 });
        _railAimLine = new THREE.Line(_railAimGeo, _railAimMat);
        scene.add(_railAimLine);
    } else {
        _railAimGeo.setFromPoints(pts);
    }
}

export function hideRailAimLine() {
    if (_railAimLine) {
        scene.remove(_railAimLine);
        _railAimGeo.dispose();
        _railAimMat.dispose();
        _railAimLine = null;
        _railAimGeo  = null;
        _railAimMat  = null;
    }
}

// ── Fire point lookup (world-space position of muzzle/emitter) ──
export function getFirePoint(tower) {
    var group = towerMeshMap.get(tower);
    if (!group) {
        return { x: tower.x, y: getTowerTopY(tower), z: tower.y };
    }
    var model = group.userData.model;
    if (!model) {
        return { x: tower.x, y: getTowerTopY(tower), z: tower.y };
    }
    var wp = new THREE.Vector3();

    if (tower.type === TowerType.PULSE) {
        if (model.userData.muzzleFlash) {
            model.userData.muzzleFlash.getWorldPosition(wp);
            return { x: wp.x, y: wp.y, z: wp.z };
        }
        if (model.userData.barrel) {
            model.userData.barrel.getWorldPosition(wp);
            return { x: wp.x, y: wp.y, z: wp.z };
        }
    }

    if (tower.type === TowerType.RAIL) {
        if (model.userData.barrelGroup) {
            model.userData.barrelGroup.getWorldPosition(wp);
            var bLen = 17;
            if (tower.branch === 'A') bLen = 40;
            else if (tower.branch === 'B') bLen = 20;
            else if (tower.level >= 2) bLen = 25;
            else if (tower.level >= 1) bLen = 22;
            var rad = (tower.angle || 0) * Math.PI / 180;
            return {
                x: wp.x + Math.cos(rad) * bLen,
                y: wp.y,
                z: wp.z - Math.sin(rad) * bLen
            };
        }
    }

    if (tower.type === TowerType.TESLA) {
        if (model.userData.orb) {
            model.userData.orb.getWorldPosition(wp);
            return { x: wp.x, y: wp.y, z: wp.z };
        }
    }

    if (tower.type === TowerType.CRYO) {
        if (model.userData.emitter) {
            model.userData.emitter.getWorldPosition(wp);
            return { x: wp.x, y: wp.y, z: wp.z };
        }
    }

    if (tower.type === TowerType.NOVA) {
        if (model.userData.core) {
            model.userData.core.getWorldPosition(wp);
            return { x: wp.x, y: wp.y, z: wp.z };
        }
    }

    return { x: tower.x, y: getTowerTopY(tower), z: tower.y };
}
