// ═══════════════════════════════════════════════════════════════
//  RAIL tower mesh builders — Magenta [255,0,255]
//  L0≈22, L1≈30, L2≈36, BranchA(Longline)≈55, BranchB(Capacitor)≈45
// ═══════════════════════════════════════════════════════════════

// --- helpers ---
function _darker(c)   { return c.clone().multiplyScalar(0.6); }
function _brighter(c) {
    return new c.constructor(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );
}

function _cornerPosts(THREE, group, c, halfSpread, height) {
    for (let i = 0; i < 4; i++) {
        const px = (i % 2 === 0) ? -halfSpread : halfSpread;
        const pz = (i < 2) ? -halfSpread : halfSpread;
        const pillar = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, height, 6),
            new THREE.MeshBasicMaterial({ color: c.clone() })
        );
        pillar.position.set(px, height / 2, pz);
        group.add(pillar);
    }
}

// ═══════════════════════════════════════════════════════════════
//  L0 — Simple rail platform, ~22 units tall
// ═══════════════════════════════════════════════════════════════
export function buildRailL0(THREE, group, c) {
    // Box base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(16, 18, 16),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 9;
    group.add(base);

    // 4 corner posts
    _cornerPosts(THREE, group, _darker(c), 7, 20);

    // Barrel group at top
    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 18;

    // Short barrel cylinder (length 16)
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 16, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 8;
    barrelGroup.add(barrel);

    // Simple tip
    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 2.5, 3, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.x = 17;
    barrelGroup.add(tip);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
}

// ═══════════════════════════════════════════════════════════════
//  L1 — Taller with stabilizer fins, ~30 units tall
// ═══════════════════════════════════════════════════════════════
export function buildRailL1(THREE, group, c) {
    // Taller box base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(16, 24, 16),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 12;
    group.add(base);

    // Taller corner pillars
    _cornerPosts(THREE, group, _darker(c), 7, 26);

    // Barrel group
    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 24;

    // Longer barrel (length 22)
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 22, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 11;
    barrelGroup.add(barrel);

    // Tip
    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 2.5, 3, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.x = 23;
    barrelGroup.add(tip);

    // 2 stabilizer fins (thin boxes on barrel)
    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(8, 4, 1),
            new THREE.MeshBasicMaterial({ color: _darker(c) })
        );
        fin.position.set(6, 0, sign * 3.5);
        barrelGroup.add(fin);
    }

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
}

// ═══════════════════════════════════════════════════════════════
//  L2 — Full fortress with charging coil, ~36 units tall
// ═══════════════════════════════════════════════════════════════
export function buildRailL2(THREE, group, c) {
    // Full fortress base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(18, 26, 18),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 13;
    group.add(base);

    // Corner pillars
    _cornerPosts(THREE, group, _darker(c), 8, 28);

    // Collar ring around base top
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(10, 1.2, 6, 16),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    collar.position.y = 26;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Barrel group
    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 26;

    // Long barrel (length 26)
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 26, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 13;
    barrelGroup.add(barrel);

    // Flash suppressor tip — flared cone
    const suppressor = new THREE.Mesh(
        new THREE.ConeGeometry(5, 5, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    suppressor.rotation.z = -Math.PI / 2;
    suppressor.position.x = 28;
    barrelGroup.add(suppressor);

    // Charging coil ring around barrel midpoint
    const coil = new THREE.Mesh(
        new THREE.TorusGeometry(4.5, 0.8, 6, 14),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    coil.position.x = 13;
    coil.rotation.y = Math.PI / 2;
    barrelGroup.add(coil);

    // Stabilizer fins
    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(10, 5, 1),
            new THREE.MeshBasicMaterial({ color: _darker(c) })
        );
        fin.position.set(8, 0, sign * 4);
        barrelGroup.add(fin);
    }

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
}

// ═══════════════════════════════════════════════════════════════
//  Branch A "Longline" — Sniper aesthetic, ~55 units tall
// ═══════════════════════════════════════════════════════════════
export function buildRailBranchA(THREE, group, c) {
    // Tall narrow base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(14, 36, 14),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 18;
    group.add(base);

    // Very tall corner pillars
    _cornerPosts(THREE, group, _darker(c), 6, 38);

    // Reinforcement collar at base top
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(8, 1, 6, 14),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    collar.position.y = 36;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Scope / antenna on top of base
    const scope = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 16, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    scope.position.set(0, 44, 0);
    group.add(scope);

    // Scope tip sphere
    const scopeTip = new THREE.Mesh(
        new THREE.SphereGeometry(2, 8, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    scopeTip.position.set(0, 53, 0);
    group.add(scopeTip);

    // Barrel group — very long sniper barrel
    const barrelGroup = new THREE.Group();
    barrelGroup.position.y = 36;

    // Sleek narrow frame around barrel base
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6),
        new THREE.MeshBasicMaterial({ color: _darker(c) })
    );
    frame.position.x = 2;
    barrelGroup.add(frame);

    // VERY long barrel (length 40)
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2, 40, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 20;
    barrelGroup.add(barrel);

    // Thin barrel shroud
    const shroud = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 2.5, 12, 6),
        new THREE.MeshBasicMaterial({ color: _darker(c) })
    );
    shroud.rotation.z = Math.PI / 2;
    shroud.position.x = 6;
    barrelGroup.add(shroud);

    // Precision tip
    const tip = new THREE.Mesh(
        new THREE.ConeGeometry(2.5, 4, 6),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    tip.rotation.z = -Math.PI / 2;
    tip.position.x = 42;
    barrelGroup.add(tip);

    // Stabilizer fins (sniper style — thin and long)
    for (let sign = -1; sign <= 1; sign += 2) {
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(14, 3, 0.8),
            new THREE.MeshBasicMaterial({ color: _darker(c) })
        );
        fin.position.set(10, 0, sign * 3);
        barrelGroup.add(fin);
    }

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
}

// ═══════════════════════════════════════════════════════════════
//  Branch B "Capacitor" — Heavy cannon aesthetic, ~45 units tall
// ═══════════════════════════════════════════════════════════════
export function buildRailBranchB(THREE, group, c) {
    // Wide reinforced base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(20, 28, 20),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 14;
    group.add(base);

    // Corner pillars (sturdy)
    _cornerPosts(THREE, group, _darker(c), 9, 30);

    // 4 capacitor banks on sides
    var capPositions = [
        { x:  12, z:  0 },
        { x: -12, z:  0 },
        { x:  0,  z:  12 },
        { x:  0,  z: -12 }
    ];
    for (var i = 0; i < capPositions.length; i++) {
        var cp = capPositions[i];
        var cap = new THREE.Mesh(
            new THREE.BoxGeometry(4, 12, 4),
            new THREE.MeshBasicMaterial({ color: _brighter(c) })
        );
        cap.position.set(cp.x, 18, cp.z);
        group.add(cap);
    }

    // Top plate
    var topPlate = new THREE.Mesh(
        new THREE.BoxGeometry(22, 2, 22),
        new THREE.MeshBasicMaterial({ color: _darker(c) })
    );
    topPlate.position.y = 29;
    group.add(topPlate);

    // Barrel group — short but massively thick
    var barrelGroup = new THREE.Group();
    barrelGroup.position.y = 28;

    // Thick barrel (radius 5, length 14)
    var barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 14, 8),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.x = 7;
    barrelGroup.add(barrel);

    // Barrel jacket (slightly wider at base)
    var jacket = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 7, 6, 8),
        new THREE.MeshBasicMaterial({ color: _darker(c) })
    );
    jacket.rotation.z = Math.PI / 2;
    jacket.position.x = 2;
    barrelGroup.add(jacket);

    // 3 charging rings along barrel
    for (var ri = 0; ri < 3; ri++) {
        var ring = new THREE.Mesh(
            new THREE.TorusGeometry(7, 0.8, 6, 14),
            new THREE.MeshBasicMaterial({ color: _brighter(c) })
        );
        ring.position.x = 3 + ri * 5;
        ring.rotation.y = Math.PI / 2;
        barrelGroup.add(ring);
    }

    // Muzzle brake
    var muzzle = new THREE.Mesh(
        new THREE.CylinderGeometry(6.5, 5, 3, 8),
        new THREE.MeshBasicMaterial({ color: _brighter(c) })
    );
    muzzle.rotation.z = Math.PI / 2;
    muzzle.position.x = 15;
    barrelGroup.add(muzzle);

    group.add(barrelGroup);
    group.userData.barrelGroup = barrelGroup;
}
