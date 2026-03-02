// ═══════════════════════════════════════════════════════════════
//  NOVA Tower Mesh Builders (Hot Pink [255,50,150])
//  L0 → L1 → L2 → Branch A (Shockwave) / Branch B (Focused Core)
// ═══════════════════════════════════════════════════════════════

// ── L0: ~16 units tall ──────────────────────────────────────────
// Simple pedestal with floating sphere core
export function buildNovaL0(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Pedestal base
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 10, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    pedestal.position.y = 5;
    group.add(pedestal);

    // Floating sphere core
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(6, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 14;
    group.add(core);

    group.userData.ring = null;
    group.userData.ring2 = null;
    group.userData.core = core;
}

// ── L1: ~24 units tall ──────────────────────────────────────────
// Taller pedestal, 4 support struts, larger sphere with horizontal torus
export function buildNovaL1(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Taller pedestal
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 14, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    pedestal.position.y = 7;
    group.add(pedestal);

    // 4 support struts
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 10, 6),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        strut.position.set(
            Math.cos(angle) * 6,
            15,
            Math.sin(angle) * 6
        );
        group.add(strut);
    }

    // Larger floating sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(7, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 22;
    group.add(core);

    // Horizontal torus ring
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(12, 2, 8, 24),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    ring.position.y = 22;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.ring = ring;
    group.userData.ring2 = null;
    group.userData.core = core;
}

// ── L2: ~32 units tall ──────────────────────────────────────────
// Full pedestal, struts, large core, horizontal + vertical rings
export function buildNovaL2(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Proper pedestal
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 16, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    pedestal.position.y = 8;
    group.add(pedestal);

    // 4 struts rising to core level
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 14, 6),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        strut.position.set(
            Math.cos(angle) * 7,
            21,
            Math.sin(angle) * 7
        );
        group.add(strut);
    }

    // Large core sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(8, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 28;
    group.add(core);

    // Horizontal ring
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(14, 2.5, 8, 24),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    ring.position.y = 28;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Vertical accent ring
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1, 8, 24),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    ring2.position.y = 28;
    group.add(ring2);

    group.userData.ring = ring;
    group.userData.ring2 = ring2;
    group.userData.core = core;
}

// ── Branch A "Shockwave": ~55 units tall ────────────────────────
// Enormous outer ring system, elevated core, 3 concentric tilted torus rings
export function buildNovaBranchA(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);

    // Thin central pillar
    const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 40, 8),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    pillar.position.y = 20;
    group.add(pillar);

    // Elevated core sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(9, 16, 12),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    core.position.y = 42;
    group.add(core);

    // Ring 1: large horizontal ring at y=35
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(18, 2.5, 8, 24),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    ring1.position.y = 35;
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    // Ring 2: tilted ring at y=42
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(20, 2, 8, 24),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    ring2.position.y = 42;
    ring2.rotation.x = Math.PI / 4;
    group.add(ring2);

    // Ring 3: differently tilted ring at y=48
    const ring3 = new THREE.Mesh(
        new THREE.TorusGeometry(22, 1.5, 8, 24),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    ring3.position.y = 48;
    ring3.rotation.z = Math.PI / 3;
    group.add(ring3);

    group.userData.ring = ring1;
    group.userData.ring2 = ring2;
    group.userData.core = core;
}

// ── Branch B "Focused Core": ~42 units tall ─────────────────────
// Compact cage of inward-tilting struts, massive bright core, tight inner ring
export function buildNovaBranchB(THREE, group, c) {
    const dark = c.clone().multiplyScalar(0.6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.4),
        Math.min(1, c.g + 0.4),
        Math.min(1, c.b + 0.4)
    );

    // Pedestal base
    const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 20, 12),
        new THREE.MeshBasicMaterial({ color: dark })
    );
    pedestal.position.y = 10;
    group.add(pedestal);

    // 6 curving struts tilting inward in a cage pattern
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1.5, 18, 6),
            new THREE.MeshBasicMaterial({ color: dark })
        );
        strut.position.set(
            Math.cos(angle) * 9,
            26,
            Math.sin(angle) * 9
        );
        // Tilt inward toward center
        strut.rotation.z = Math.cos(angle) * (Math.PI / 8);
        strut.rotation.x = -Math.sin(angle) * (Math.PI / 8);
        group.add(strut);
    }

    // Massive bright core sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(13, 20, 14),
        new THREE.MeshBasicMaterial({ color: bright })
    );
    core.position.y = 34;
    group.add(core);

    // Tight inner ring
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(14, 1.5, 8, 24),
        new THREE.MeshBasicMaterial({ color: c.clone() })
    );
    ring.position.y = 34;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData.ring = ring;
    group.userData.ring2 = null;
    group.userData.core = core;
}
