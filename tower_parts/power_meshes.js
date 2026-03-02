// ═══════════════════════════════════════════════════════════════
//  POWER_PLANT Tower Mesh Builders (Amber [255,200,50])
//  L0 → L1 → L2 → Branch A (Grid Hub) / Branch B (Relay Core)
// ═══════════════════════════════════════════════════════════════

// ── L0: ~18 units tall ──────────────────────────────────────────
// Simple column with glowing sphere and 3 rotating spokes
export function buildPowerL0(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Base column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 14, 10),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    column.position.y = 7;
    group.add(column);

    // Glowing core sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(5, 14, 10),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 16;
    group.add(core);

    // 3 rotating spokes
    const spokes = new THREE.Group();
    spokes.position.y = 16;
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 14, 6),
            new THREE.MeshBasicMaterial({ color: c.clone() })
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 7,
            0,
            Math.sin(angle) * 7
        );
        arm.rotation.y = -angle;
        // Orient arm to radiate outward from center
        arm.lookAt(Math.cos(angle) * 20, spokes.position.y, Math.sin(angle) * 20);
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 7,
            0,
            Math.sin(angle) * 7
        );
        spokes.add(arm);
    }
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// ── L1: ~24 units tall ──────────────────────────────────────────
// Taller column with ring decorations, larger sphere, 4 spokes
export function buildPowerL1(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Taller column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 18, 10),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    column.position.y = 9;
    group.add(column);

    // Ring decorations on column
    for (const ry of [6, 12]) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(10, 1, 6, 18),
            new THREE.MeshBasicMaterial({ color: bright })
        );
        ring.position.y = ry;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
    }

    // Larger glowing sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(7, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 22;
    group.add(core);

    // 4 rotating spokes
    const spokes = new THREE.Group();
    spokes.position.y = 22;
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 14, 6),
            new THREE.MeshBasicMaterial({ color: c.clone() })
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 7,
            0,
            Math.sin(angle) * 7
        );
        arm.rotation.y = -angle + Math.PI / 2;
        spokes.add(arm);
    }
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// ── L2: ~32 units tall ──────────────────────────────────────────
// Tall base with 3 tier rings, large sphere, 6 rotating spokes
export function buildPowerL2(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Tall base column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 24, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    column.position.y = 12;
    group.add(column);

    // 3 tier rings on the column
    for (const ry of [5, 10, 15]) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(11, 1.2, 6, 20),
            new THREE.MeshBasicMaterial({ color: bright })
        );
        ring.position.y = ry;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
    }

    // Large glowing sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(10, 18, 14),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 28;
    group.add(core);

    // 6 rotating spokes
    const spokes = new THREE.Group();
    spokes.position.y = 28;
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1.2, 1.2, 16, 6),
            new THREE.MeshBasicMaterial({ color: c.clone() })
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 8,
            0,
            Math.sin(angle) * 8
        );
        arm.rotation.y = -angle + Math.PI / 2;
        spokes.add(arm);
    }
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// ── Branch A "Grid Hub": ~42 units tall ─────────────────────────
// Massive sphere with wireframe cage, dense cluster, 8 short spokes
export function buildPowerBranchA(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Short dense column base
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 16, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    column.position.y = 8;
    group.add(column);

    // Transition ring at column top
    const transRing = new THREE.Mesh(
        new THREE.TorusGeometry(10, 1.5, 6, 20),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    transRing.position.y = 16;
    transRing.rotation.x = Math.PI / 2;
    group.add(transRing);

    // Massive central sphere (the main feature)
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(14, 20, 16),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 24;
    group.add(core);

    // Wireframe cage wrapping the sphere
    const cageMat = new THREE.MeshBasicMaterial({
        color: c.clone(),
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    cageMat._ignoreColor = true;
    const cage = new THREE.Mesh(
        new THREE.OctahedronGeometry(17, 1),
        cageMat
    );
    cage.position.y = 24;
    group.add(cage);

    // 8 short spokes radiating outward
    const spokes = new THREE.Group();
    spokes.position.y = 24;
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 18, 6),
            new THREE.MeshBasicMaterial({ color: bright })
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 9,
            0,
            Math.sin(angle) * 9
        );
        arm.rotation.y = -angle + Math.PI / 2;
        spokes.add(arm);
    }
    group.add(spokes);

    // Bottom ring accent
    const bottomRing = new THREE.Mesh(
        new THREE.TorusGeometry(13, 1, 6, 18),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    bottomRing.position.y = 12;
    bottomRing.rotation.x = Math.PI / 2;
    group.add(bottomRing);

    group.userData.spokes = spokes;
    group.userData.core = core;
}

// ── Branch B "Relay Core": ~55 units tall ───────────────────────
// Tall transmission tower with ascending spheres and top spokes
export function buildPowerBranchB(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Wide base platform
    const basePlat = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 14, 4, 10),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    basePlat.position.y = 2;
    group.add(basePlat);

    // Tall thin column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 44, 8),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    column.position.y = 22;
    group.add(column);

    // 3 diagonal struts from base to support the column
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(0.8, 0.8, 22, 6),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        // Position strut midway between base edge and column
        strut.position.set(
            Math.cos(angle) * 6,
            12,
            Math.sin(angle) * 6
        );
        // Tilt strut inward
        const tiltAxis = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        strut.rotateOnAxis(tiltAxis, Math.PI / 6);
        group.add(strut);
    }

    // 6 ascending spheres along the column (progressively smaller going up)
    const spherePositions = [10, 18, 26, 34, 42];
    const sphereRadii = [3, 2.8, 2.5, 2.2, 2];
    for (let i = 0; i < spherePositions.length; i++) {
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(sphereRadii[i], 10, 8),
            new THREE.MeshBasicMaterial({ color: bright })
        );
        sphere.position.y = spherePositions[i];
        group.add(sphere);
    }

    // Medium sphere at top (the core)
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 48;
    group.add(core);

    // Top ring accent
    const topRing = new THREE.Mesh(
        new THREE.TorusGeometry(9, 1, 6, 18),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    topRing.position.y = 48;
    topRing.rotation.x = Math.PI / 2;
    group.add(topRing);

    // 6 spokes at the top
    const spokes = new THREE.Group();
    spokes.position.y = 48;
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 14, 6),
            new THREE.MeshBasicMaterial({ color: c.clone() })
        );
        arm.rotation.z = Math.PI / 2;
        arm.position.set(
            Math.cos(angle) * 7,
            0,
            Math.sin(angle) * 7
        );
        arm.rotation.y = -angle + Math.PI / 2;
        spokes.add(arm);
    }
    group.add(spokes);

    group.userData.spokes = spokes;
    group.userData.core = core;
}
