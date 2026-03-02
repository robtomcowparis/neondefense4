// TESLA tower mesh builders — Electric Blue [80,120,255]
// All 5 levels: L0, L1, L2, BranchA (Arc Web), BranchB (Burn)

function makeAntenna(THREE, group, c, angle, y, height, radius) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 6);
    const mat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const spike = new THREE.Mesh(geo, mat);
    spike.position.set(Math.cos(angle) * 8, y, Math.sin(angle) * 8);
    spike.rotation.z = Math.cos(angle) * 0.4;
    spike.rotation.x = -Math.sin(angle) * 0.4;
    group.add(spike);
    return spike;
}

// L0 — ~22 units tall
export function buildTeslaL0(THREE, group, c) {
    // Base cylinder
    const baseGeo = new THREE.CylinderGeometry(10, 10, 18, 12);
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 9;
    group.add(base);

    // Top sphere (orb)
    const orbGeo = new THREE.SphereGeometry(6, 16, 12);
    const orbMat = new THREE.MeshBasicMaterial({ color: c });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 22;
    group.add(orb);

    // 3 antenna spikes radiating from the sphere
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        makeAntenna(THREE, group, c, angle, 22, 8, 0.6);
    }

    group.userData.orb = orb;
}

// L1 — ~30 units tall
export function buildTeslaL1(THREE, group, c) {
    // Taller base
    const baseGeo = new THREE.CylinderGeometry(10, 10, 22, 12);
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 11;
    group.add(base);

    // Neck section (tapered)
    const neckGeo = new THREE.CylinderGeometry(10, 6, 5, 12);
    const neckMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.5) });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = 24.5;
    group.add(neck);

    // Larger orb
    const orbGeo = new THREE.SphereGeometry(8, 16, 12);
    const orbMat = new THREE.MeshBasicMaterial({ color: c });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 30;
    group.add(orb);

    // 4 antenna spikes
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        makeAntenna(THREE, group, c, angle, 30, 8, 0.6);
    }

    group.userData.orb = orb;
}

// L2 — ~40 units tall (full Tesla coil)
export function buildTeslaL2(THREE, group, c) {
    // Tapered base
    const baseGeo = new THREE.CylinderGeometry(8, 12, 24, 12);
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 12;
    group.add(base);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(8, 5, 6, 12);
    const neckMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.5) });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = 27;
    group.add(neck);

    // Large orb
    const orbGeo = new THREE.SphereGeometry(10, 20, 14);
    const orbMat = new THREE.MeshBasicMaterial({ color: c });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 36;
    group.add(orb);

    // 6 antenna spikes at orb level
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const spikeGeo = new THREE.CylinderGeometry(0.6, 0.6, 8, 6);
        const spikeMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
        const spike = new THREE.Mesh(spikeGeo, spikeMat);
        const dist = 12;
        spike.position.set(Math.cos(angle) * dist, 36, Math.sin(angle) * dist);
        spike.rotation.z = Math.cos(angle) * 0.5;
        spike.rotation.x = -Math.sin(angle) * 0.5;
        group.add(spike);
    }

    // Tall central spike above the orb
    const spikeGeo = new THREE.CylinderGeometry(0.8, 0.8, 14, 6);
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );
    const spikeMat = new THREE.MeshBasicMaterial({ color: bright });
    const centralSpike = new THREE.Mesh(spikeGeo, spikeMat);
    centralSpike.position.y = 47;
    group.add(centralSpike);

    group.userData.orb = orb;
}

// Branch A "Arc Web" — ~52 units tall
export function buildTeslaBranchA(THREE, group, c) {
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Base column
    const baseGeo = new THREE.CylinderGeometry(9, 9, 28, 12);
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 14;
    group.add(base);

    // Crown of 5 smaller orbs arranged in a ring
    let firstOrb = null;
    const crownRadius = 11;
    const crownY = 40;
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const orbGeo = new THREE.SphereGeometry(4, 14, 10);
        const orbMat = new THREE.MeshBasicMaterial({ color: c });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(
            Math.cos(angle) * crownRadius,
            crownY,
            Math.sin(angle) * crownRadius
        );
        group.add(orb);
        if (i === 0) firstOrb = orb;
    }

    // Central spike rising from center
    const spikeGeo = new THREE.CylinderGeometry(1, 1, 18, 8);
    const spikeMat = new THREE.MeshBasicMaterial({ color: bright });
    const centralSpike = new THREE.Mesh(spikeGeo, spikeMat);
    centralSpike.position.y = 44;
    group.add(centralSpike);

    // 8 short antennas radiating outward at orb height
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const antGeo = new THREE.CylinderGeometry(0.5, 0.5, 6, 6);
        const antMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
        const ant = new THREE.Mesh(antGeo, antMat);
        const dist = 14;
        ant.position.set(Math.cos(angle) * dist, crownY, Math.sin(angle) * dist);
        ant.rotation.z = Math.cos(angle) * 0.6;
        ant.rotation.x = -Math.sin(angle) * 0.6;
        group.add(ant);
    }

    group.userData.orb = firstOrb;
}

// Branch B "Burn" — ~50 units tall
export function buildTeslaBranchB(THREE, group, c) {
    const bright = new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );

    // Base column
    const baseGeo = new THREE.CylinderGeometry(11, 11, 26, 12);
    const baseMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 13;
    group.add(base);

    // Single MASSIVE orb
    const orbGeo = new THREE.SphereGeometry(14, 24, 16);
    const orbMat = new THREE.MeshBasicMaterial({ color: c });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.y = 38;
    group.add(orb);

    // 3 orbital torus rings at different angles
    const torusConfigs = [
        { rx: Math.PI / 2, rz: 0, ry: 0 },
        { rx: Math.PI / 3, rz: Math.PI / 4, ry: 0 },
        { rx: -Math.PI / 4, rz: -Math.PI / 3, ry: Math.PI / 6 }
    ];
    for (const cfg of torusConfigs) {
        const torusGeo = new THREE.TorusGeometry(17, 0.7, 8, 32);
        const torusMat = new THREE.MeshBasicMaterial({
            color: bright,
            transparent: true,
            opacity: 0.5
        });
        torusMat._ignoreColor = true;
        const torus = new THREE.Mesh(torusGeo, torusMat);
        torus.position.y = 38;
        torus.rotation.x = cfg.rx;
        torus.rotation.z = cfg.rz;
        torus.rotation.y = cfg.ry;
        group.add(torus);
    }

    // 3 large antennas
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const antGeo = new THREE.CylinderGeometry(1.2, 1.2, 12, 6);
        const antMat = new THREE.MeshBasicMaterial({ color: c.clone().multiplyScalar(0.6) });
        const ant = new THREE.Mesh(antGeo, antMat);
        const dist = 10;
        ant.position.set(Math.cos(angle) * dist, 44, Math.sin(angle) * dist);
        ant.rotation.z = Math.cos(angle) * 0.4;
        ant.rotation.x = -Math.sin(angle) * 0.4;
        group.add(ant);
    }

    group.userData.orb = orb;
}
