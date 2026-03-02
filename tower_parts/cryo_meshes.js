// CRYO tower meshes — Ice Blue [150,220,255]
// L0 ~14, L1 ~20, L2 ~26, BranchA ~40, BranchB ~38

export function buildCryoL0(THREE, group, c) {
    // Short flat base
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 6, 16), baseMat);
    base.position.y = 3;
    group.add(base);

    // Small hemisphere dome
    const domeGeo = new THREE.SphereGeometry(9, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshBasicMaterial({ color: c });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 6;
    group.add(dome);

    group.userData.ring = null;
    group.userData.emitter = null;
}

export function buildCryoL1(THREE, group, c) {
    // Taller base
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 10, 16), baseMat);
    base.position.y = 5;
    group.add(base);

    // Larger dome (upper half)
    const domeGeo = new THREE.SphereGeometry(11, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshBasicMaterial({ color: c });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 10;
    group.add(dome);

    // Outer ring
    const ringMat = new THREE.MeshBasicMaterial({ color: c });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(12, 1.2, 8, 32), ringMat);
    ring.position.y = 10;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Inner emitter sphere
    const emitterMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.min(1, c.r + 0.3), Math.min(1, c.g + 0.3), Math.min(1, c.b + 0.3))
    });
    const emitter = new THREE.Mesh(new THREE.SphereGeometry(4, 12, 8), emitterMat);
    emitter.position.y = 12;
    group.add(emitter);

    group.userData.ring = ring;
    group.userData.emitter = emitter;
}

export function buildCryoL2(THREE, group, c) {
    // Base column
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 14, 16), baseMat);
    base.position.y = 7;
    group.add(base);

    // Large translucent dome
    const domeGeo = new THREE.SphereGeometry(14, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(150 / 255, 220 / 255, 255 / 255),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    domeMat._ignoreColor = true;
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 14;
    group.add(dome);

    // Spinning ring
    const ringMat = new THREE.MeshBasicMaterial({ color: c });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(13, 1.5, 8, 32), ringMat);
    ring.position.y = 14;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Emitter sphere
    const emitterMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.min(1, c.r + 0.3), Math.min(1, c.g + 0.3), Math.min(1, c.b + 0.3))
    });
    const emitter = new THREE.Mesh(new THREE.SphereGeometry(5, 12, 8), emitterMat);
    emitter.position.y = 16;
    group.add(emitter);

    group.userData.ring = ring;
    group.userData.emitter = emitter;
}

export function buildCryoBranchA(THREE, group, c) {
    // Base platform
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 10, 16), baseMat);
    base.position.y = 5;
    group.add(base);

    // 4 cryo pillars arranged in a ring at radius 10
    const pillarMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.7) });
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 26, 8), pillarMat);
        pillar.position.set(Math.cos(angle) * 10, 10 + 13, Math.sin(angle) * 10);
        group.add(pillar);
    }

    // Large translucent dome
    const domeGeo = new THREE.SphereGeometry(18, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(150 / 255, 220 / 255, 255 / 255),
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
    });
    domeMat._ignoreColor = true;
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 10;
    group.add(dome);

    // 3 concentric rings at different heights
    const ringMat = new THREE.MeshBasicMaterial({ color: c });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(16, 1.2, 8, 32), ringMat);
    ring1.position.y = 12;
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2Mat = new THREE.MeshBasicMaterial({ color: c });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(13, 1.0, 8, 32), ring2Mat);
    ring2.position.y = 16;
    ring2.rotation.x = Math.PI / 2;
    group.add(ring2);

    const ring3Mat = new THREE.MeshBasicMaterial({ color: c });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(10, 0.8, 8, 32), ring3Mat);
    ring3.position.y = 20;
    ring3.rotation.x = Math.PI / 2;
    group.add(ring3);

    // Inner emitter sphere
    const emitterMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.min(1, c.r + 0.3), Math.min(1, c.g + 0.3), Math.min(1, c.b + 0.3))
    });
    const emitter = new THREE.Mesh(new THREE.SphereGeometry(6, 14, 10), emitterMat);
    emitter.position.y = 18;
    group.add(emitter);

    group.userData.ring = ring1;
    group.userData.emitter = emitter;
}

export function buildCryoBranchB(THREE, group, c) {
    // Hexagonal angular base (6 segments for hex look)
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.5) });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(12, 13, 14, 6), baseMat);
    base.position.y = 7;
    group.add(base);

    // 8 crystal spikes arranged in a ring
    const spikeMat = new THREE.MeshBasicMaterial({ color: c });
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.ConeGeometry(2, 16, 4), spikeMat);
        spike.position.set(
            Math.cos(angle) * 8,
            14 + Math.sin(i * 1.7) * 3,
            Math.sin(angle) * 8
        );
        // Slight tilt outward
        spike.rotation.x = Math.cos(angle) * 0.2;
        spike.rotation.z = -Math.sin(angle) * 0.2;
        group.add(spike);
    }

    // Central exposed emitter sphere (bright)
    const brightColor = new THREE.Color(Math.min(1, c.r + 0.3), Math.min(1, c.g + 0.3), Math.min(1, c.b + 0.3));
    const emitterMat = new THREE.MeshBasicMaterial({ color: brightColor });
    const emitter = new THREE.Mesh(new THREE.SphereGeometry(5, 12, 8), emitterMat);
    emitter.position.y = 18;
    group.add(emitter);

    // Sharp top spike above emitter
    const topSpikeMat = new THREE.MeshBasicMaterial({ color: c });
    const topSpike = new THREE.Mesh(new THREE.ConeGeometry(1.5, 10, 4), topSpikeMat);
    topSpike.position.y = 28;
    group.add(topSpike);

    group.userData.ring = null;
    group.userData.emitter = emitter;
}
