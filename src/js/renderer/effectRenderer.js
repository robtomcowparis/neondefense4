// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/effectRenderer.js
//  Visual effects: beam, arc, nova_ring, cryo_field, shield_break
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { SHIELD_COLOR } from '../config.js';
import { scene, toColor } from './scene.js';

const effectMeshMap = new WeakMap();

export function createEffectMesh(effect) {
    const group = new THREE.Group();

    switch (effect.type) {
        case 'beam':   _buildBeam(group, effect); break;
        case 'arc':    _buildArc(group, effect); break;
        case 'nova_ring': _buildNovaRing(group, effect); break;
        case 'cryo_field': _buildCryoField(group, effect); break;
        case 'shield_break': _buildShieldBreak(group, effect); break;
    }

    scene.add(group);
    effectMeshMap.set(effect, group);
    return group;
}

function _buildBeam(group, effect) {
    var start = effect.kw.start;
    var end = effect.kw.end;
    var color = effect.kw.color;
    var c = toColor(color);
    var startY = effect.kw.startY || 24;
    var endY = effect.kw.endY || 8;
    var baseRadius = (effect.kw.width || 1.2) * 1.1;
    var branch = effect.kw.branch || null;

    // Branch B (Capacitor): 1.5x beam radius
    var radius = (branch === 'B') ? baseRadius * 1.5 : baseRadius;

    var startVec = new THREE.Vector3(start[0], startY, start[1]);
    var endVec = new THREE.Vector3(end[0], endY, end[1]);
    var dir = new THREE.Vector3().subVectors(endVec, startVec);
    var length = dir.length();
    var mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    var dirNorm = dir.normalize();

    // Volumetric cylinder core — starts at 2x radius, narrows over 50ms
    var cyGeo = new THREE.CylinderGeometry(radius, radius, length, 8, 1);
    var bright = new THREE.Color(Math.min(1, c.r + 0.25), Math.min(1, c.g + 0.25), Math.min(1, c.b + 0.25));
    var cyMat = new THREE.MeshBasicMaterial({ color: bright, transparent: true, opacity: 0.75 });
    var cyMesh = new THREE.Mesh(cyGeo, cyMat);
    cyMesh.position.copy(mid);
    cyMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirNorm);
    group.add(cyMesh);

    // Secondary halo cylinder at 2x radius
    var haloRadius = radius * 2;
    var haloGeo = new THREE.CylinderGeometry(haloRadius, haloRadius, length, 8, 1);
    var haloMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.1 });
    var haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.copy(mid);
    haloMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirNorm);
    group.add(haloMesh);

    // Outer glow halo line
    var pts = [startVec.clone(), endVec.clone()];
    var outerGeo = new THREE.BufferGeometry().setFromPoints(pts);
    var outerMat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.45 });
    group.add(new THREE.Line(outerGeo, outerMat));

    group.userData.cyMat = cyMat;
    group.userData.cyMesh = cyMesh;
    group.userData.outerMat = outerMat;
    group.userData.haloMat = haloMat;
    group.userData.haloMesh = haloMesh;
    group.userData.baseRadius = radius;
    group.userData.birthTime = performance.now();
    group.userData.branch = branch;
}

function _buildArc(group, effect) {
    var points = effect.kw.points;
    var color = effect.kw.color;
    var branch = effect.kw.branch || null;
    var c = toColor(color);

    // Branch B (Burn): shift color toward orange
    if (branch === 'B') {
        c = new THREE.Color(
            Math.min(1, c.r * 1.2),
            c.g * 0.8,
            c.b * 0.3
        );
    }

    group.userData.color = c;
    group.userData.arcPoints = points;
    group.userData.branch = branch;
    // Arc lines will be rebuilt each frame for animated jitter
    _rebuildArcLines(group, points, c, 1.0, branch);
}

function _rebuildArcLines(group, points, c, alpha, branch) {
    // Remove old arc lines and flash spheres
    var toRemove = group.children.filter(function(ch) { return ch.userData.isArcLine || ch.userData.isFlashSphere; });
    for (var r = 0; r < toRemove.length; r++) {
        group.remove(toRemove[r]);
    }

    // Line opacity: Branch A thinner
    var lineAlpha = alpha * 0.86;
    if (branch === 'A') lineAlpha = alpha * 0.6;

    for (var i = 0; i < points.length - 1; i++) {
        var p1 = points[i], p2 = points[i + 1];
        var baseArcY = 18 + (Math.random() - 0.5) * 12;
        var endArcY = 12 + (Math.random() - 0.5) * 8;

        // Build 3-4 interpolated + jittered points between each pair
        var numMidPts = 3 + Math.floor(Math.random() * 2); // 3 or 4
        var allPts = [new THREE.Vector3(p1[0], baseArcY, p1[1])];
        for (var m = 1; m <= numMidPts; m++) {
            var frac = m / (numMidPts + 1);
            var mx = p1[0] + (p2[0] - p1[0]) * frac + (Math.random() - 0.5) * 20;
            var my = p1[1] + (p2[1] - p1[1]) * frac + (Math.random() - 0.5) * 20;
            var midY = baseArcY + (endArcY - baseArcY) * frac + (Math.random() - 0.5) * 10;
            allPts.push(new THREE.Vector3(mx, midY, my));
        }
        allPts.push(new THREE.Vector3(p2[0], endArcY, p2[1]));

        // Draw line segments between consecutive interpolated points
        for (var s = 0; s < allPts.length - 1; s++) {
            var segPts = [allPts[s], allPts[s + 1]];
            var colorGeo = new THREE.BufferGeometry().setFromPoints(segPts);
            var colorMat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: lineAlpha });
            var colorLine = new THREE.Line(colorGeo, colorMat);
            colorLine.userData.isArcLine = true;
            group.add(colorLine);
        }
    }

    // Flash spheres at each chain target point (not the tower origin)
    for (var j = 1; j < points.length; j++) {
        var pt = points[j];
        var flashGeo = new THREE.SphereGeometry(5, 6, 5);
        var flashMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: alpha * 0.6 });
        var flashMesh = new THREE.Mesh(flashGeo, flashMat);
        flashMesh.position.set(pt[0], 12, pt[1]);
        flashMesh.userData.isFlashSphere = true;
        group.add(flashMesh);
    }
}

function _buildNovaRing(group, effect) {
    var center = effect.kw.center;
    var color = effect.kw.color;
    var branch = effect.kw.branch || null;
    var startY = 22;
    var c = toColor(color);

    // Expanding wireframe sphere (original)
    var sphereGeo = new THREE.SphereGeometry(1, 14, 9);
    var sphereMat = new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.32,
        wireframe: true,
    });
    var sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(center[0], startY, center[1]);
    group.add(sphere);

    // Flat torus ring at ground level — expands outward
    var tubeRadius = (branch === 'A') ? 6 : 4;
    var torusGeo = new THREE.TorusGeometry(1, tubeRadius, 6, 32);
    var torusMat = new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.4,
    });
    var torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    torus.position.set(center[0], 1, center[1]);
    group.add(torus);

    // Vertical light column at center
    var colGeo = new THREE.CylinderGeometry(1.5, 1.5, 60, 6, 1);
    var colMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.min(1, c.r + 0.3), Math.min(1, c.g + 0.3), Math.min(1, c.b + 0.3)),
        transparent: true,
        opacity: 0.5,
    });
    var column = new THREE.Mesh(colGeo, colMat);
    column.position.set(center[0], 30, center[1]);
    group.add(column);

    group.userData.sphere = sphere;
    group.userData.sphereMat = sphereMat;
    group.userData.torus = torus;
    group.userData.torusMat = torusMat;
    group.userData.torusTubeRadius = tubeRadius;
    group.userData.column = column;
    group.userData.colMat = colMat;
    group.userData.maxRadius = effect.kw.radius;
    group.userData.center = center;
    group.userData.startY = startY;
    group.userData.branch = branch;
}

function _buildCryoField(group, effect) {
    var center = effect.kw.center;
    var radius = effect.kw.radius;
    var color = effect.kw.color;
    var branch = effect.kw.branch || null;
    var c = toColor(color);
    var NUM_RINGS = 3;
    var rings = [];

    for (var i = 0; i < NUM_RINGS; i++) {
        // Flat ring lying horizontal
        var geo = new THREE.RingGeometry(0.88, 1.0, 56);
        var mat = new THREE.MeshBasicMaterial({
            color: c,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        });
        var mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(center[0], 2, center[1]);
        group.add(mesh);

        // Snowflake radial lines for each ring — 6 line segments
        var snowVerts = [];
        for (var s = 0; s < 6; s++) {
            var a = (Math.PI * 2 * s) / 6;
            snowVerts.push(new THREE.Vector3(0, 0, 0));
            snowVerts.push(new THREE.Vector3(Math.cos(a) * 1, 0, Math.sin(a) * 1));
        }
        var snowGeo = new THREE.BufferGeometry().setFromPoints(snowVerts);
        var snowMat = new THREE.LineBasicMaterial({
            color: c,
            transparent: true,
            opacity: 0,
        });
        var snowLines = new THREE.LineSegments(snowGeo, snowMat);
        snowLines.position.set(center[0], 2.5, center[1]);
        group.add(snowLines);

        rings.push({ mesh: mesh, mat: mat, phase: i / NUM_RINGS, snowLines: snowLines, snowMat: snowMat });
    }

    group.userData.rings = rings;
    group.userData.radius = radius;
    group.userData.branch = branch;
    group.userData.cryoColor = c;
}

function _buildShieldBreak(group, effect) {
    var center = effect.kw.center;
    var radius = effect.kw.radius;
    var sc = toColor(SHIELD_COLOR);

    // Expanding ring
    var ringGeo = new THREE.TorusGeometry(1, 2, 6, 32);
    var ringMat = new THREE.MeshBasicMaterial({ color: sc, transparent: true, opacity: 0.85 });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(center[0], 3, center[1]);
    group.add(ring);
    group.userData.ring = ring;
    group.userData.ringMat = ringMat;
    group.userData.center = center;
    group.userData.baseRadius = radius;

    // Fragment lines — fly outward with 3D Y offsets
    var numFrags = 12;
    var fragLines = [];
    for (var i = 0; i < numFrags; i++) {
        var geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 3, 0), new THREE.Vector3(1, 3, 0)
        ]);
        var mat = new THREE.LineBasicMaterial({ color: sc, transparent: true, opacity: 0.55 });
        var line = new THREE.Line(geo, mat);
        group.add(line);
        var yOffset = (Math.random() - 0.4) * 20;
        fragLines.push({ line: line, angle: (Math.PI * 2 * i) / numFrags + 0.37, yOffset: yOffset });
    }
    group.userData.fragLines = fragLines;
    group.userData.shieldColor = sc;
}

export function updateEffectMesh(effect) {
    var group = effectMeshMap.get(effect);
    if (!group) return;

    if (!effect.alive) {
        group.traverse(function(obj) {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        effectMeshMap.delete(effect);
        return;
    }

    var t = 1.0 - (effect.duration / effect.maxDuration);
    var ar = Math.max(0, 1.0 - t);

    switch (effect.type) {
        case 'beam': {
            var cyMat = group.userData.cyMat;
            var outerMat = group.userData.outerMat;
            var haloMat = group.userData.haloMat;
            var cyMesh = group.userData.cyMesh;
            var haloMesh = group.userData.haloMesh;
            var baseRadius = group.userData.baseRadius;

            // Narrowing animation: first 50ms, beam starts at 2x radius and narrows to 1x
            var age = performance.now() - group.userData.birthTime;
            var narrowT = Math.min(1, age / 50); // 0..1 over 50ms
            var scaleFactor = 2.0 - narrowT; // 2x -> 1x
            if (cyMesh) {
                cyMesh.scale.x = scaleFactor;
                cyMesh.scale.z = scaleFactor;
            }

            if (cyMat) cyMat.opacity = ar * 0.75;
            if (outerMat) outerMat.opacity = ar * 0.45;
            // Halo fades at 2x rate
            if (haloMat) haloMat.opacity = Math.max(0, ar * 0.1 * (1.0 - t * 2));
            if (haloMesh) {
                haloMesh.scale.x = scaleFactor;
                haloMesh.scale.z = scaleFactor;
            }
            break;
        }
        case 'arc': {
            // Rebuild with jitter each frame
            _rebuildArcLines(group, group.userData.arcPoints, group.userData.color, ar, group.userData.branch);
            break;
        }
        case 'nova_ring': {
            var sphere = group.userData.sphere;
            var sphereMat = group.userData.sphereMat;
            var maxRadius = group.userData.maxRadius;
            var torus = group.userData.torus;
            var torusMat = group.userData.torusMat;
            var column = group.userData.column;
            var colMat = group.userData.colMat;
            var branch = group.userData.branch;

            if (sphere) {
                var r = Math.max(0.1, maxRadius * t);
                sphere.scale.setScalar(r);
                sphereMat.opacity = ar * 0.32;
            }

            // Torus expansion
            if (torus) {
                var torusScaleMult = (branch === 'A') ? 1.3 : 1.0;
                var maxTorusR;
                if (branch === 'B') {
                    // Focused Core: stops at radius * 0.6, pulses in place
                    var targetR = maxRadius * 0.6;
                    var expandT = Math.min(1, t * 3); // reach target in first third
                    maxTorusR = targetR * expandT;
                    // Pulse in place once reached
                    if (expandT >= 1) {
                        maxTorusR = targetR * (1.0 + 0.1 * Math.sin(t * 20));
                    }
                } else {
                    maxTorusR = maxRadius * 1.2 * t * torusScaleMult;
                }
                var tr = Math.max(0.01, maxTorusR);
                torus.scale.set(tr, tr, tr);
                // Tube thins as it expands
                torusMat.opacity = ar * 0.4;
            }

            // Light column fades
            if (colMat) {
                colMat.opacity = ar * 0.5;
            }
            break;
        }
        case 'cryo_field': {
            var rings = group.userData.rings;
            var radius = group.userData.radius;
            var cryoBranch = group.userData.branch;
            if (rings) {
                var now = performance.now() * 0.001;
                var period = 2.2;
                for (var ri = 0; ri < rings.length; ri++) {
                    var ring = rings[ri];
                    var pt = (now / period + ring.phase) % 1.0;
                    var rr = Math.max(0.01, pt * radius);
                    ring.mesh.scale.set(rr, rr, rr);
                    // Fade in quickly, then ease out toward perimeter
                    var baseOpacity = ar * 0.55 * Math.pow(1.0 - pt, 1.4) * Math.min(1, pt * 8);
                    // Branch A: opacity * 1.4
                    if (cryoBranch === 'A') baseOpacity *= 1.4;
                    ring.mat.opacity = baseOpacity;

                    // Snowflake lines rotate slowly and scale with ring
                    if (ring.snowLines) {
                        ring.snowLines.scale.set(rr * 0.5, 1, rr * 0.5);
                        ring.snowLines.rotation.y = now * 0.4 + ring.phase * Math.PI;
                        ring.snowMat.opacity = baseOpacity * 0.6;

                        // Branch B: shift outer ring color toward red
                        if (cryoBranch === 'B' && ri === rings.length - 1) {
                            var cc = group.userData.cryoColor;
                            ring.snowMat.color.setRGB(
                                Math.min(1, cc.r + 0.3 * pt),
                                cc.g * (1.0 - 0.3 * pt),
                                cc.b * (1.0 - 0.4 * pt)
                            );
                            ring.mat.color.setRGB(
                                Math.min(1, cc.r + 0.2 * pt),
                                cc.g * (1.0 - 0.2 * pt),
                                cc.b * (1.0 - 0.3 * pt)
                            );
                        }
                    }
                }
            }
            break;
        }
        case 'shield_break': {
            var sbRing = group.userData.ring;
            var sbCenter = group.userData.center;
            var sbBaseRadius = group.userData.baseRadius;
            var sbFragLines = group.userData.fragLines;
            if (sbRing) {
                var expandR = sbBaseRadius + sbBaseRadius * 1.8 * t;
                sbRing.scale.set(expandR, 1, expandR);
                sbRing.material.opacity = ar * 0.85;
            }
            if (sbFragLines) {
                for (var fi = 0; fi < sbFragLines.length; fi++) {
                    var frag = sbFragLines[fi];
                    var innerD = sbBaseRadius * 0.6 + sbBaseRadius * 1.0 * t;
                    var outerD = sbBaseRadius * 1.0 + sbBaseRadius * 2.4 * t;
                    var baseFragY = 12 + frag.yOffset * t;
                    var fp1 = new THREE.Vector3(
                        sbCenter[0] + Math.cos(frag.angle) * innerD, baseFragY,
                        sbCenter[1] + Math.sin(frag.angle) * innerD
                    );
                    var fp2 = new THREE.Vector3(
                        sbCenter[0] + Math.cos(frag.angle) * outerD, baseFragY + frag.yOffset * t,
                        sbCenter[1] + Math.sin(frag.angle) * outerD
                    );
                    frag.line.geometry.setFromPoints([fp1, fp2]);
                    frag.line.material.opacity = ar * 0.55;
                }
            }
            break;
        }
    }
}

export function removeEffectMesh(effect) {
    var group = effectMeshMap.get(effect);
    if (group) {
        group.traverse(function(obj) {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(group);
        effectMeshMap.delete(effect);
    }
}
