// ═══════════════════════════════════════════════════════════════
//  PULSE Tower Mesh Builders (Cyan [0,255,255])
//  L0 → L1 → L2 → Branch A (Overclock) / Branch B (Heavy Bolts)
// ═══════════════════════════════════════════════════════════════

// ── L0: ~20 units tall ──────────────────────────────────────────
// Short squat cylinder base with stubby barrel
export function buildPulseL0(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Squat base cylinder
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 8;
    group.add(base);

    // Top cap / platform
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 3, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    cap.position.y = 17.5;
    group.add(cap);

    // Stubby barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 10, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(9, 18, 0);
    group.add(barrel);

    group.userData.disc = null;
    group.userData.barrel = barrel;
}

// ── L1: ~28 units tall ──────────────────────────────────────────
// Taller base with collar ring and longer barrel
export function buildPulseL1(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Taller base cylinder
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 13, 22, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 11;
    group.add(base);

    // Collar ring at mid-section
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1.5, 6, 18),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    collar.position.y = 16;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Top cap
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 11, 3, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    cap.position.y = 24;
    group.add(cap);

    // Longer barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 25, 0);
    group.add(barrel);

    group.userData.disc = null;
    group.userData.barrel = barrel;
}

// ── L2: ~36 units tall ──────────────────────────────────────────
// Full height with glowing collar, rotating disc, proper barrel
export function buildPulseL2(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Full height base cylinder
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 14, 25, 14),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 12.5;
    group.add(base);

    // Glowing collar ring at mid-height
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(13, 2, 6, 20),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    collar.position.y = 18;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Rotating disc platform on top
    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 3, 16),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    disc.position.y = 27;
    group.add(disc);

    // Barrel from disc level
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 27, 0);
    group.add(barrel);

    // Small muzzle tip
    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 1.5, 3, 6),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.set(19, 27, 0);
    group.add(tip);

    group.userData.disc = disc;
    group.userData.barrel = barrel;
}

// ── Branch A "Overclock": ~50 units tall ────────────────────────
// Sleek tall spire with speed fins, dual spinning discs, gatling cluster
export function buildPulseBranchA(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Slim tall base column
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 11, 35, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 17.5;
    group.add(base);

    // Speed fins — 4 thin fins arranged radially around the column
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 18, 6),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        fin.position.set(
            Math.cos(angle) * 9,
            22,
            Math.sin(angle) * 9
        );
        fin.rotation.y = -angle;
        group.add(fin);
    }

    // Glowing ring at transition to disc section
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(9, 1.2, 6, 18),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    ring.position.y = 32;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Secondary smaller disc below main disc
    const discSmall = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 2, 14),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    discSmall.position.y = 34;
    group.add(discSmall);

    // Main large spinning disc platform
    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 11, 3, 16),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    disc.position.y = 38;
    group.add(disc);

    // Gatling cluster: 3 thin barrels
    const barrelOffsets = [
        { x: 0, z: -1.8 },
        { x: 0, z: 1.8 },
        { x: 0, z: 0 }
    ];
    const centerBarrel = barrelOffsets[2]; // center one is the tracked barrel
    let trackedBarrel = null;

    for (let i = 0; i < barrelOffsets.length; i++) {
        const b = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 16, 6),
            new THREE.MeshBasicMaterial({ color: bright })
        );
        b.rotation.z = Math.PI / 2;
        b.position.set(12, 38 + barrelOffsets[i].z, barrelOffsets[i].x);
        group.add(b);
        if (i === 2) trackedBarrel = b;
    }

    // Muzzle flash ring at barrel tips
    const muzzleRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.5, 4, 10),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    muzzleRing.position.set(20, 38, 0);
    muzzleRing.rotation.y = Math.PI / 2;
    muzzleRing._ignoreColor = true;
    group.add(muzzleRing);

    group.userData.disc = disc;
    group.userData.barrel = trackedBarrel;
}

// ── Branch B "Heavy Bolts": ~48 units tall ──────────────────────
// Thick chunky military look with massive barrel and splash ring
export function buildPulseBranchB(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Wide reinforced base cylinder
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(13, 14, 28, 14),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    base.position.y = 14;
    group.add(base);

    // 4 reinforcement plates at corners
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(4, 22, 2),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        plate.position.set(
            Math.cos(angle) * 12,
            13,
            Math.sin(angle) * 12
        );
        plate.rotation.y = -angle;
        group.add(plate);
    }

    // Heavy collar ring
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(14, 2.5, 6, 18),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    collar.position.y = 26;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Top turret housing
    const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 8, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    turret.position.y = 32;
    group.add(turret);

    // Shoulder plates on turret
    for (let i = 0; i < 2; i++) {
        const side = i === 0 ? -1 : 1;
        const shoulder = new THREE.Mesh(
            new THREE.BoxGeometry(3, 6, 10),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        shoulder.position.set(side * 10, 33, 0);
        group.add(shoulder);
    }

    // Massive barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 4, 22, 8),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(16, 34, 0);
    group.add(barrel);

    // Flared muzzle at barrel tip (cone flared outward)
    const muzzle = new THREE.Mesh(
        new THREE.ConeGeometry(6, 6, 8),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    muzzle.rotation.z = -Math.PI / 2;
    muzzle.position.set(28, 34, 0);
    group.add(muzzle);

    // Splash ring near barrel tip
    const splashRing = new THREE.Mesh(
        new THREE.TorusGeometry(5, 0.8, 6, 14),
        new THREE.MeshBasicMaterial({ color: bright, transparent: true, opacity: 0.7 })
    );
    splashRing.position.set(24, 34, 0);
    splashRing.rotation.y = Math.PI / 2;
    splashRing.material._ignoreColor = true;
    group.add(splashRing);

    group.userData.disc = null;
    group.userData.barrel = barrel;
}
