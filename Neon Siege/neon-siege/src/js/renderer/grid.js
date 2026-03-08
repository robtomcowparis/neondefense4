// ============================================================
// renderer/grid.js — Grid lines, terrain, obstacle meshes, placement preview
// ============================================================
import * as THREE from 'three';
import { makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial } from './scene.js';
import {
  GRID_COLS, GRID_ROWS, TILE_SIZE, MAP_W, MAP_H,
  COLORS,
  TILE_EMPTY, TILE_WALL, TEAM_PLAYER,
  OBSTACLE_NEON_COLORS,
} from '../config.js';
import { getObstacleData, getObstacles, isBuildable } from '../map.js';

let gridGroup = null;
let highlightMesh = null;
let highlightMaterial = null;
let obstacleGroup = null;
let dragHighlightPool = [];
let _scene = null; // cached for adding drag pool meshes

// --- Shared geometries (cloned per use, never modified) ---
const _box = new THREE.BoxGeometry(1, 1, 1);
const _sphere = new THREE.SphereGeometry(0.5, 12, 8);
const _cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
const _ring = new THREE.TorusGeometry(0.5, 0.06, 8, 24);
const _octa = new THREE.OctahedronGeometry(0.5, 0);
const _icosa = new THREE.IcosahedronGeometry(0.5, 0);
const _plane = new THREE.PlaneGeometry(1, 1);

// Neon color cycle counter
let _neonIdx = 0;

// ================================================================
// 10 MESH BUILDERS
// Each: (group, height, fpX, fpZ, strMat, accMat, glwMat)
// ================================================================

function _buildTeslaCoil(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const r = Math.min(fpX, fpZ) * 0.22;

  // Base platform — wide, short cylinder
  const base = new THREE.Mesh(_cylinder.clone(), strMat);
  base.scale.set(r * 2.8, 3, r * 2.8);
  base.position.y = 1.5;
  group.add(base);

  // Mid platform ring
  const midY = height * 0.45;
  const midPlat = new THREE.Mesh(_cylinder.clone(), strMat);
  midPlat.scale.set(r * 2.0, 1.5, r * 2.0);
  midPlat.position.y = midY;
  group.add(midPlat);

  // Tapered shaft (narrower cylinder)
  const shaft = new THREE.Mesh(_cylinder.clone(), strMat);
  shaft.scale.set(r * 1.2, height * 0.85, r * 1.2);
  shaft.position.y = height * 0.45;
  group.add(shaft);

  // Insulator torus rings at intervals
  const ringCount = 4;
  for (let i = 1; i <= ringCount; i++) {
    const ry = (height * 0.1) + (height * 0.75) * (i / (ringCount + 1));
    const ring = new THREE.Mesh(_ring.clone(), accMat);
    ring.scale.set(r * 1.6, r * 1.6, r * 1.6);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = ry;
    group.add(ring);
  }

  // Top orb
  const orb = new THREE.Mesh(_sphere.clone(), accMat);
  orb.scale.set(r * 2.2, r * 2.2, r * 2.2);
  orb.position.y = height;
  group.add(orb);

  // Glow halo around orb
  const halo = new THREE.Mesh(_sphere.clone(), glwMat);
  halo.scale.set(r * 3.5, r * 3.5, r * 3.5);
  halo.position.y = height;
  group.add(halo);

  // Arc tendrils radiating from top
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI * 2 / 4) * i;
    const tendril = new THREE.Mesh(_box.clone(), accMat);
    tendril.scale.set(r * 0.3, r * 0.2, r * 2.5);
    tendril.position.set(Math.cos(angle) * r * 1.8, height + r * 0.5, Math.sin(angle) * r * 1.8);
    tendril.rotation.y = angle;
    group.add(tendril);
  }
}

function _buildPowerCell(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const r = Math.min(fpX, fpZ) * 0.3;

  // Main cylinder body
  const body = new THREE.Mesh(_cylinder.clone(), strMat);
  body.scale.set(r * 2, height, r * 2);
  body.position.y = height / 2;
  group.add(body);

  // Disc caps top/bottom
  const topCap = new THREE.Mesh(_cylinder.clone(), strMat);
  topCap.scale.set(r * 2.3, 1.5, r * 2.3);
  topCap.position.y = height + 0.75;
  group.add(topCap);

  const botCap = new THREE.Mesh(_cylinder.clone(), strMat);
  botCap.scale.set(r * 2.3, 1.5, r * 2.3);
  botCap.position.y = 0.75;
  group.add(botCap);

  // Glow bands along body
  const bandCount = 3;
  for (let i = 0; i < bandCount; i++) {
    const by = height * 0.2 + height * 0.6 * (i / (bandCount - 1));
    const band = new THREE.Mesh(_ring.clone(), accMat);
    band.scale.set(r * 2.4, r * 2.4, r * 2.4);
    band.rotation.x = Math.PI / 2;
    band.position.y = by;
    group.add(band);
  }

  // Cooling vents (small boxes around the body)
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI * 2 / 4) * i + Math.PI / 4;
    const vent = new THREE.Mesh(_box.clone(), strMat);
    vent.scale.set(r * 0.4, height * 0.3, 2);
    vent.position.set(Math.cos(angle) * r * 1.1, height * 0.5, Math.sin(angle) * r * 1.1);
    vent.rotation.y = angle;
    group.add(vent);
  }

  // Pressure gauge
  const gauge = new THREE.Mesh(_sphere.clone(), accMat);
  gauge.scale.set(r * 0.7, r * 0.7, r * 0.7);
  gauge.position.set(r * 1.1, height * 0.7, 0);
  group.add(gauge);

  // Gauge glow
  const gaugeGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  gaugeGlow.scale.set(r * 1.2, r * 1.2, r * 1.2);
  gaugeGlow.position.set(r * 1.1, height * 0.7, 0);
  group.add(gaugeGlow);
}

function _buildCircuitMonolith(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const w = fpX * 0.55;
  const d = fpZ * 0.55;

  // Low plinth
  const plinth = new THREE.Mesh(_box.clone(), strMat);
  plinth.scale.set(w * 1.15, 2.5, d * 1.15);
  plinth.position.y = 1.25;
  group.add(plinth);

  // Main slab body
  const slab = new THREE.Mesh(_box.clone(), strMat);
  slab.scale.set(w, height, d);
  slab.position.y = 2.5 + height / 2;
  group.add(slab);

  // Circuit traces on the face — horizontal lines
  for (let i = 0; i < 5; i++) {
    const ty = 4 + (height - 4) * (i / 5);
    const trace = new THREE.Mesh(_box.clone(), accMat);
    trace.scale.set(w * 0.85, 0.4, 0.4);
    trace.position.set(0, ty, d / 2 + 0.3);
    group.add(trace);
  }

  // Vertical trace lines
  for (let i = 0; i < 3; i++) {
    const tx = -w * 0.3 + w * 0.3 * i;
    const vt = new THREE.Mesh(_box.clone(), accMat);
    vt.scale.set(0.4, height * 0.5, 0.4);
    vt.position.set(tx, height * 0.5 + 2.5, d / 2 + 0.3);
    group.add(vt);
  }

  // Diagonal trace
  const diag = new THREE.Mesh(_box.clone(), accMat);
  diag.scale.set(w * 0.6, 0.4, 0.4);
  diag.rotation.z = Math.PI / 5;
  diag.position.set(w * 0.15, height * 0.65 + 2.5, -d / 2 - 0.3);
  group.add(diag);

  // Data ports on sides
  for (let side = -1; side <= 1; side += 2) {
    const port = new THREE.Mesh(_cylinder.clone(), accMat);
    port.scale.set(2, 1.5, 2);
    port.rotation.z = Math.PI / 2;
    port.position.set(side * (w / 2 + 0.8), height * 0.4 + 2.5, 0);
    group.add(port);
  }

  // Octahedron top node
  const topNode = new THREE.Mesh(_octa.clone(), accMat);
  const nodeSize = Math.min(w, d) * 0.35;
  topNode.scale.set(nodeSize, nodeSize, nodeSize);
  topNode.position.y = height + 3.5 + nodeSize / 2;
  group.add(topNode);

  // Top glow
  const topGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  topGlow.scale.set(nodeSize * 2, nodeSize * 2, nodeSize * 2);
  topGlow.position.y = height + 3.5 + nodeSize / 2;
  group.add(topGlow);
}

function _buildCapacitorBank(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const longAxis = Math.max(fpX, fpZ);
  const shortAxis = Math.min(fpX, fpZ);
  const isXLong = fpX >= fpZ;

  // Base plate
  const plate = new THREE.Mesh(_box.clone(), strMat);
  plate.scale.set(fpX * 0.9, 2, fpZ * 0.9);
  plate.position.y = 1;
  group.add(plate);

  // Two parallel cylinders
  const capR = shortAxis * 0.25;
  const capOffset = longAxis * 0.25;
  for (const side of [-1, 1]) {
    const cx = isXLong ? side * capOffset : 0;
    const cz = isXLong ? 0 : side * capOffset;

    const cyl = new THREE.Mesh(_cylinder.clone(), strMat);
    cyl.scale.set(capR * 2, height, capR * 2);
    cyl.position.set(cx, 2 + height / 2, cz);
    group.add(cyl);

    // Torus ring around each cylinder
    const ring = new THREE.Mesh(_ring.clone(), glwMat);
    ring.scale.set(capR * 2.5, capR * 2.5, capR * 2.5);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(cx, 2 + height * 0.6, cz);
    group.add(ring);
  }

  // Bus bars connecting them
  const busBar = new THREE.Mesh(_box.clone(), accMat);
  if (isXLong) {
    busBar.scale.set(capOffset * 2, 1.5, 2);
  } else {
    busBar.scale.set(2, 1.5, capOffset * 2);
  }
  busBar.position.y = 2 + height * 0.75;
  group.add(busBar);

  const busBar2 = new THREE.Mesh(_box.clone(), accMat);
  if (isXLong) {
    busBar2.scale.set(capOffset * 2, 1.5, 2);
  } else {
    busBar2.scale.set(2, 1.5, capOffset * 2);
  }
  busBar2.position.y = 2 + height * 0.35;
  group.add(busBar2);

  // Cooling fins along the sides
  const finCount = 4;
  for (let i = 0; i < finCount; i++) {
    const t = -0.5 + (i + 0.5) / finCount;
    const fin = new THREE.Mesh(_box.clone(), strMat);
    if (isXLong) {
      fin.scale.set(2, height * 0.5, shortAxis * 0.05);
      fin.position.set(t * longAxis * 0.8, 2 + height * 0.3, shortAxis * 0.45);
    } else {
      fin.scale.set(shortAxis * 0.05, height * 0.5, 2);
      fin.position.set(shortAxis * 0.45, 2 + height * 0.3, t * longAxis * 0.8);
    }
    group.add(fin);
  }

  // Warning indicator spheres
  for (const side of [-1, 1]) {
    const ind = new THREE.Mesh(_sphere.clone(), accMat);
    ind.scale.set(3, 3, 3);
    const ix = isXLong ? side * capOffset : 0;
    const iz = isXLong ? 0 : side * capOffset;
    ind.position.set(ix, 2 + height + 2, iz);
    group.add(ind);
  }
}

function _buildRelayTower(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const r = Math.min(fpX, fpZ) * 0.15;

  // Foundation pad
  const foundation = new THREE.Mesh(_cylinder.clone(), strMat);
  foundation.scale.set(r * 6, 3, r * 6);
  foundation.position.y = 1.5;
  group.add(foundation);

  // Narrow shaft
  const shaft = new THREE.Mesh(_cylinder.clone(), strMat);
  shaft.scale.set(r * 1.5, height, r * 1.5);
  shaft.position.y = 3 + height / 2;
  group.add(shaft);

  // Cross-arms at 3 height levels
  const armLevels = [0.3, 0.55, 0.8];
  for (const frac of armLevels) {
    const y = 3 + height * frac;
    const armLen = r * (5 - frac * 2);

    const armX = new THREE.Mesh(_box.clone(), accMat);
    armX.scale.set(armLen * 2, 1.2, 1.2);
    armX.position.y = y;
    group.add(armX);

    const armZ = new THREE.Mesh(_box.clone(), accMat);
    armZ.scale.set(1.2, 1.2, armLen * 2);
    armZ.position.y = y;
    group.add(armZ);
  }

  // Guy wires from top to base
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI * 2 / 4) * i + Math.PI / 4;
    const wire = new THREE.Mesh(_box.clone(), strMat);
    const wireLen = Math.sqrt(height * height + (r * 4) * (r * 4));
    wire.scale.set(0.3, wireLen, 0.3);
    wire.position.set(
      Math.cos(angle) * r * 2,
      3 + height / 2,
      Math.sin(angle) * r * 2
    );
    wire.rotation.z = Math.atan2(r * 4, height) * (i < 2 ? 1 : -1);
    wire.rotation.y = angle;
    group.add(wire);
  }

  // Antennas at top
  for (let i = 0; i < 2; i++) {
    const ant = new THREE.Mesh(_box.clone(), strMat);
    ant.scale.set(0.5, height * 0.12, 0.5);
    ant.position.set((i - 0.5) * r * 2, 3 + height + height * 0.06, 0);
    group.add(ant);
  }

  // Octahedron diamond near top
  const diamond = new THREE.Mesh(_octa.clone(), accMat);
  diamond.scale.set(r * 2, r * 2, r * 2);
  diamond.position.y = 3 + height * 0.9;
  group.add(diamond);

  // Large beacon sphere at summit
  const beacon = new THREE.Mesh(_sphere.clone(), accMat);
  beacon.scale.set(r * 3.5, r * 3.5, r * 3.5);
  beacon.position.y = 3 + height + height * 0.05;
  group.add(beacon);

  // Oversized glow
  const beaconGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  beaconGlow.scale.set(r * 6, r * 6, r * 6);
  beaconGlow.position.y = 3 + height + height * 0.05;
  group.add(beaconGlow);
}

function _buildDataObelisk(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const baseW = fpX * 0.55;
  const baseD = fpZ * 0.55;
  const sections = 4;
  const sectionH = height / sections;

  let accumulatedY = 0;
  for (let i = 0; i < sections; i++) {
    const taper = 1 - i * 0.15;
    const w = baseW * taper;
    const d = baseD * taper;

    const section = new THREE.Mesh(_box.clone(), strMat);
    section.scale.set(w, sectionH * 0.85, d);
    section.position.y = accumulatedY + sectionH * 0.425;
    group.add(section);

    // Data band between sections
    if (i > 0) {
      const band = new THREE.Mesh(_box.clone(), accMat);
      band.scale.set(w * 1.05, 0.6, d * 1.05);
      band.position.y = accumulatedY;
      group.add(band);
    }

    // Corner edges/trim
    if (i < sections - 1) {
      for (let cx = -1; cx <= 1; cx += 2) {
        for (let cz = -1; cz <= 1; cz += 2) {
          const edge = new THREE.Mesh(_box.clone(), accMat);
          edge.scale.set(0.6, sectionH * 0.7, 0.6);
          edge.position.set(cx * w * 0.5, accumulatedY + sectionH * 0.4, cz * d * 0.5);
          group.add(edge);
        }
      }
    }

    accumulatedY += sectionH;
  }

  // Holographic ring floating around upper section
  const holoRing = new THREE.Mesh(_ring.clone(), glwMat);
  const ringSize = Math.min(baseW, baseD) * 0.8;
  holoRing.scale.set(ringSize, ringSize, ringSize);
  holoRing.rotation.x = Math.PI / 2;
  holoRing.position.y = height * 0.82;
  group.add(holoRing);

  // Floating icosahedron above the top
  const icoSize = Math.min(baseW, baseD) * 0.28;
  const ico = new THREE.Mesh(_icosa.clone(), accMat);
  ico.scale.set(icoSize, icoSize, icoSize);
  ico.position.y = height + icoSize + 2;
  group.add(ico);

  // Ico glow
  const icoGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  icoGlow.scale.set(icoSize * 2, icoSize * 2, icoSize * 2);
  icoGlow.position.y = height + icoSize + 2;
  group.add(icoGlow);
}

function _buildPlasmaConduit(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const longAxis = Math.max(fpX, fpZ);
  const shortAxis = Math.min(fpX, fpZ);
  const isXLong = fpX >= fpZ;

  const pipeR = Math.min(height * 0.4, shortAxis * 0.2);
  const strutOff = longAxis * 0.35;
  const pipeY = height * 0.55;

  // Support struts at each end
  for (const side of [-1, 1]) {
    const sx = isXLong ? side * strutOff : 0;
    const sz = isXLong ? 0 : side * strutOff;

    const strut = new THREE.Mesh(_box.clone(), strMat);
    strut.scale.set(shortAxis * 0.2, pipeY, shortAxis * 0.2);
    strut.position.set(sx, pipeY / 2, sz);
    group.add(strut);

    // Diagonal braces
    const brace = new THREE.Mesh(_box.clone(), accMat);
    brace.scale.set(0.8, pipeY * 0.8, 0.8);
    brace.rotation.z = side * 0.4;
    brace.position.set(sx * 0.5, pipeY * 0.4, sz * 0.5);
    group.add(brace);
  }

  // Horizontal pipe
  const pipe = new THREE.Mesh(_cylinder.clone(), strMat);
  const pipeLen = strutOff * 2;
  if (isXLong) {
    pipe.scale.set(pipeR * 2, pipeLen, pipeR * 2);
    pipe.rotation.z = Math.PI / 2;
  } else {
    pipe.scale.set(pipeR * 2, pipeLen, pipeR * 2);
    pipe.rotation.x = Math.PI / 2;
  }
  pipe.position.y = pipeY;
  group.add(pipe);

  // Torus rings at pipe joints
  for (const side of [-1, 1]) {
    const jx = isXLong ? side * strutOff * 0.8 : 0;
    const jz = isXLong ? 0 : side * strutOff * 0.8;

    const joint = new THREE.Mesh(_ring.clone(), accMat);
    joint.scale.set(pipeR * 3, pipeR * 3, pipeR * 3);
    if (isXLong) {
      joint.rotation.y = Math.PI / 2;
    }
    joint.position.set(jx, pipeY, jz);
    group.add(joint);
  }

  // Valve wheel at center
  const valve = new THREE.Mesh(_ring.clone(), accMat);
  valve.scale.set(pipeR * 2.5, pipeR * 2.5, pipeR * 2.5);
  valve.position.y = pipeY;
  group.add(valve);

  // Vent caps at pipe ends
  for (const side of [-1, 1]) {
    const vx = isXLong ? side * strutOff : 0;
    const vz = isXLong ? 0 : side * strutOff;

    const vent = new THREE.Mesh(_sphere.clone(), glwMat);
    vent.scale.set(pipeR * 2.5, pipeR * 2.5, pipeR * 2.5);
    vent.position.set(vx, pipeY, vz);
    group.add(vent);
  }

  // Flanges at pipe ends
  for (const side of [-1, 1]) {
    const fx = isXLong ? side * strutOff * 0.95 : 0;
    const fz = isXLong ? 0 : side * strutOff * 0.95;

    const flange = new THREE.Mesh(_cylinder.clone(), strMat);
    flange.scale.set(pipeR * 2.8, 1.5, pipeR * 2.8);
    flange.position.set(fx, pipeY, fz);
    group.add(flange);
  }
}

function _buildPowerPylon(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const minFp = Math.min(fpX, fpZ);
  const postSpacing = minFp * 0.32;
  const postW = minFp * 0.05;

  // Foundation pad
  const foundation = new THREE.Mesh(_cylinder.clone(), strMat);
  foundation.scale.set(minFp * 0.7, 3, minFp * 0.7);
  foundation.position.y = 1.5;
  group.add(foundation);

  // 4 tall corner posts
  for (let cx = -1; cx <= 1; cx += 2) {
    for (let cz = -1; cz <= 1; cz += 2) {
      const post = new THREE.Mesh(_box.clone(), strMat);
      post.scale.set(postW * 2, height, postW * 2);
      post.position.set(cx * postSpacing, 3 + height / 2, cz * postSpacing);
      group.add(post);
    }
  }

  // Horizontal bars at multiple levels
  const levels = 5;
  for (let i = 0; i < levels; i++) {
    const y = 3 + height * (i + 1) / (levels + 1);

    // X-direction bars
    for (const cz of [-1, 1]) {
      const bar = new THREE.Mesh(_box.clone(), strMat);
      bar.scale.set(postSpacing * 2, 1, 1);
      bar.position.set(0, y, cz * postSpacing);
      group.add(bar);
    }

    // Z-direction bars
    for (const cx of [-1, 1]) {
      const bar = new THREE.Mesh(_box.clone(), strMat);
      bar.scale.set(1, 1, postSpacing * 2);
      bar.position.set(cx * postSpacing, y, 0);
      group.add(bar);
    }

    // Diagonal cross-bracing
    if (i % 2 === 0) {
      const diag = new THREE.Mesh(_box.clone(), accMat);
      diag.scale.set(0.6, height / (levels + 1) * 1.3, 0.6);
      diag.rotation.z = 0.4;
      diag.position.set(0, y, postSpacing);
      group.add(diag);

      const diag2 = new THREE.Mesh(_box.clone(), accMat);
      diag2.scale.set(0.6, height / (levels + 1) * 1.3, 0.6);
      diag2.rotation.z = -0.4;
      diag2.position.set(0, y, -postSpacing);
      group.add(diag2);
    }
  }

  // Cross-arms near top with hanging insulators
  const armY = 3 + height * 0.85;
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI * 2 / 4) * i + Math.PI / 4;
    const armLen = minFp * 0.35;

    const arm = new THREE.Mesh(_box.clone(), accMat);
    arm.scale.set(armLen, 1.2, 1.2);
    arm.position.set(Math.cos(angle) * armLen * 0.5, armY, Math.sin(angle) * armLen * 0.5);
    arm.rotation.y = angle;
    group.add(arm);

    // Hanging insulator
    const insulator = new THREE.Mesh(_cylinder.clone(), strMat);
    insulator.scale.set(1.5, 4, 1.5);
    insulator.position.set(Math.cos(angle) * armLen * 0.8, armY - 3, Math.sin(angle) * armLen * 0.8);
    group.add(insulator);
  }

  // Large beacon at top
  const beaconR = minFp * 0.12;
  const beacon = new THREE.Mesh(_sphere.clone(), accMat);
  beacon.scale.set(beaconR * 2, beaconR * 2, beaconR * 2);
  beacon.position.y = 3 + height + beaconR;
  group.add(beacon);

  // Oversized glow
  const beaconGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  beaconGlow.scale.set(beaconR * 4, beaconR * 4, beaconR * 4);
  beaconGlow.position.y = 3 + height + beaconR;
  group.add(beaconGlow);
}

function _buildTransformerStack(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const r = Math.min(fpX, fpZ) * 0.28;
  const unitCount = 3;
  const unitH = height / unitCount;

  // Base plate
  const basePlate = new THREE.Mesh(_cylinder.clone(), strMat);
  basePlate.scale.set(r * 2.8, 2, r * 2.8);
  basePlate.position.y = 1;
  group.add(basePlate);

  for (let i = 0; i < unitCount; i++) {
    const unitY = 2 + i * unitH;

    // Transformer unit cylinder
    const unit = new THREE.Mesh(_cylinder.clone(), strMat);
    unit.scale.set(r * 2, unitH * 0.75, r * 2);
    unit.position.y = unitY + unitH * 0.375;
    group.add(unit);

    // Cooling fins radiating outward (6 per unit)
    for (let f = 0; f < 6; f++) {
      const angle = (Math.PI * 2 / 6) * f;
      const fin = new THREE.Mesh(_box.clone(), accMat);
      fin.scale.set(r * 0.8, unitH * 0.5, 1);
      fin.position.set(
        Math.cos(angle) * r * 1.3,
        unitY + unitH * 0.4,
        Math.sin(angle) * r * 1.3
      );
      fin.rotation.y = angle;
      group.add(fin);
    }

    // Insulator ring between units
    if (i < unitCount - 1) {
      const ring = new THREE.Mesh(_ring.clone(), glwMat);
      ring.scale.set(r * 2.6, r * 2.6, r * 2.6);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = unitY + unitH;
      group.add(ring);
    }
  }

  // Top terminal
  const terminal = new THREE.Mesh(_cylinder.clone(), accMat);
  terminal.scale.set(r * 0.6, 4, r * 0.6);
  terminal.position.y = 2 + height + 2;
  group.add(terminal);

  // Terminal tip sphere
  const tip = new THREE.Mesh(_sphere.clone(), accMat);
  tip.scale.set(r * 0.8, r * 0.8, r * 0.8);
  tip.position.y = 2 + height + 4.5;
  group.add(tip);

  // Tip glow
  const tipGlow = new THREE.Mesh(_sphere.clone(), glwMat);
  tipGlow.scale.set(r * 1.5, r * 1.5, r * 1.5);
  tipGlow.position.y = 2 + height + 4.5;
  group.add(tipGlow);
}

function _buildCableRack(group, height, fpX, fpZ, strMat, accMat, glwMat) {
  const longAxis = Math.max(fpX, fpZ);
  const shortAxis = Math.min(fpX, fpZ);
  const isXLong = fpX >= fpZ;

  const pillarW = 2;
  const lOff = longAxis * 0.4;
  const sOff = shortAxis * 0.3;

  // 4 pillars at corners
  for (const lSide of [-1, 1]) {
    for (const sSide of [-1, 1]) {
      const px = isXLong ? lSide * lOff : sSide * sOff;
      const pz = isXLong ? sSide * sOff : lSide * lOff;

      const pillar = new THREE.Mesh(_box.clone(), strMat);
      pillar.scale.set(pillarW, height, pillarW);
      pillar.position.set(px, height / 2, pz);
      group.add(pillar);

      // Ring accent at pillar top
      const ring = new THREE.Mesh(_ring.clone(), glwMat);
      ring.scale.set(pillarW * 2, pillarW * 2, pillarW * 2);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(px, height, pz);
      group.add(ring);
    }
  }

  // Overhead beam connecting tops along long axis
  const beam = new THREE.Mesh(_box.clone(), strMat);
  if (isXLong) {
    beam.scale.set(lOff * 2 + pillarW, 2, shortAxis * 0.15);
  } else {
    beam.scale.set(shortAxis * 0.15, 2, lOff * 2 + pillarW);
  }
  beam.position.y = height + 1;
  group.add(beam);

  // Second beam on the other side
  const beam2 = new THREE.Mesh(_box.clone(), strMat);
  if (isXLong) {
    beam2.scale.set(lOff * 2 + pillarW, 2, shortAxis * 0.15);
    beam2.position.set(0, height + 1, sOff * 0.6);
    beam.position.set(0, height + 1, -sOff * 0.6);
  } else {
    beam2.scale.set(shortAxis * 0.15, 2, lOff * 2 + pillarW);
    beam2.position.set(sOff * 0.6, height + 1, 0);
    beam.position.set(-sOff * 0.6, height + 1, 0);
  }
  group.add(beam2);

  // Cable conduits running along the beam
  const conduitCount = 3;
  for (let i = 0; i < conduitCount; i++) {
    const t = (-1 + (2 * i) / (conduitCount - 1));
    const conduit = new THREE.Mesh(_box.clone(), accMat);
    if (isXLong) {
      conduit.scale.set(lOff * 1.8, 1.2, 1.2);
      conduit.position.set(0, height - 1, t * sOff * 0.5);
    } else {
      conduit.scale.set(1.2, 1.2, lOff * 1.8);
      conduit.position.set(t * sOff * 0.5, height - 1, 0);
    }
    group.add(conduit);
  }

  // Junction boxes at intervals
  for (const side of [-1, 0, 1]) {
    const jbox = new THREE.Mesh(_box.clone(), accMat);
    jbox.scale.set(2.5, 2.5, 2.5);
    if (isXLong) {
      jbox.position.set(side * lOff * 0.6, height - 2, 0);
    } else {
      jbox.position.set(0, height - 2, side * lOff * 0.6);
    }
    group.add(jbox);
  }

  // X-bracing between pillars
  for (const sSide of [-1, 1]) {
    const brace = new THREE.Mesh(_box.clone(), strMat);
    brace.scale.set(isXLong ? lOff * 1.6 : 0.6, 0.6, isXLong ? 0.6 : lOff * 1.6);
    brace.rotation.z = sSide * 0.35;
    brace.position.set(0, height * 0.5, isXLong ? sSide * sOff : 0);
    if (!isXLong) brace.position.x = sSide * sOff;
    group.add(brace);
  }

  // Drooping cables between pillars
  for (let i = 0; i < 2; i++) {
    const cable = new THREE.Mesh(_box.clone(), accMat);
    cable.scale.set(isXLong ? lOff * 1.5 : 0.4, 0.4, isXLong ? 0.4 : lOff * 1.5);
    const cableY = height * 0.7 + i * 2;
    if (isXLong) {
      cable.position.set(0, cableY, (i - 0.5) * sOff * 0.8);
    } else {
      cable.position.set((i - 0.5) * sOff * 0.8, cableY, 0);
    }
    group.add(cable);
  }
}

// ================================================================
// ENTRY POINT — createObstacleMesh
// ================================================================

function createObstacleMesh(kind, height, color, footprintX, footprintZ) {
  const group = new THREE.Group();
  group.name = 'obstacle';

  // Cycle through neon accent colors
  const neonColor = OBSTACLE_NEON_COLORS[_neonIdx % OBSTACLE_NEON_COLORS.length];
  _neonIdx++;

  // Three-tier materials
  const strMat = makeStructuralMaterial(color);
  // Override emissive for obstacles
  strMat.emissive = new THREE.Color(color).multiplyScalar(0.15);
  strMat.emissiveIntensity = 1.0;

  const accMat = makeAccentMaterial(neonColor);
  const glwMat = makeGlowMaterial(neonColor, 0.12);

  // Dispatch to builder
  switch (kind) {
    case 'tesla_coil':        _buildTeslaCoil(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'power_cell':        _buildPowerCell(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'circuit_monolith':  _buildCircuitMonolith(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'capacitor_bank':    _buildCapacitorBank(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'relay_tower':       _buildRelayTower(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'data_obelisk':      _buildDataObelisk(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'plasma_conduit':    _buildPlasmaConduit(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'power_pylon':       _buildPowerPylon(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'transformer_stack': _buildTransformerStack(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    case 'cable_rack':        _buildCableRack(group, height, footprintX, footprintZ, strMat, accMat, glwMat); break;
    default:                  _buildCircuitMonolith(group, height, footprintX, footprintZ, strMat, accMat, glwMat);
  }

  return group;
}

// ================================================================
// initGrid / updateGrid
// ================================================================

/** Create and add all grid visuals to the scene. */
export function initGrid(scene) {
  _scene = scene;

  // Clean up drag highlights from previous match
  resetDragHighlights();

  // Remove previous grid if reinitializing
  if (gridGroup) {
    scene.remove(gridGroup);
  }
  if (obstacleGroup) {
    scene.remove(obstacleGroup);
  }

  gridGroup = new THREE.Group();
  gridGroup.name = 'grid';

  // --- Ground plane — dark matte void, no specular glare ---
  const groundGeo = new THREE.PlaneGeometry(MAP_W + 200, MAP_H + 200);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a2a,
    metalness: 0.0,
    roughness: 0.95,
    emissive: 0x0c0c28,
    emissiveIntensity: 0.7,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(MAP_W / 2, -0.5, MAP_H / 2);
  gridGroup.add(ground);

  // --- Grid lines ---
  const gridLinePoints = [];

  // Vertical lines
  for (let c = 0; c <= GRID_COLS; c++) {
    const x = c * TILE_SIZE;
    gridLinePoints.push(x, 0.1, 0);
    gridLinePoints.push(x, 0.1, MAP_H);
  }
  // Horizontal lines
  for (let r = 0; r <= GRID_ROWS; r++) {
    const z = r * TILE_SIZE;
    gridLinePoints.push(0, 0.1, z);
    gridLinePoints.push(MAP_W, 0.1, z);
  }

  const gridLineGeo = new THREE.BufferGeometry();
  gridLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridLinePoints, 3));
  const gridLineMat = new THREE.LineBasicMaterial({ color: 0x2a2a70, transparent: true, opacity: 0.8 });
  const gridLines = new THREE.LineSegments(gridLineGeo, gridLineMat);
  gridGroup.add(gridLines);

  scene.add(gridGroup);

  // --- Obstacle meshes (new typed system) ---
  obstacleGroup = new THREE.Group();
  obstacleGroup.name = 'obstacles';

  _neonIdx = 0; // reset color cycle per map

  const obstacleData = getObstacleData();
  for (const obs of obstacleData) {
    const footprintX = obs.cellsW * TILE_SIZE;
    const footprintZ = obs.cellsD * TILE_SIZE;
    const mesh = createObstacleMesh(obs.kind, obs.height, obs.color, footprintX, footprintZ);

    // Position at AABB center
    const cx = (obs.aabb.min.x + obs.aabb.max.x) / 2;
    const cz = (obs.aabb.min.z + obs.aabb.max.z) / 2;
    mesh.position.set(cx, 0, cz);

    mesh.userData.idOffset = Math.random() * Math.PI * 2;
    obstacleGroup.add(mesh);
  }

  scene.add(obstacleGroup);

  // --- Placement highlight ---
  highlightMaterial = makeGlowMaterial(COLORS.BUILD_VALID, 0.3);
  const highlightGeo = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
  highlightMesh = new THREE.Mesh(highlightGeo, highlightMaterial);
  highlightMesh.rotation.x = -Math.PI / 2;
  highlightMesh.position.y = 0.5;
  highlightMesh.visible = false;
  scene.add(highlightMesh);
}

/**
 * Update grid each frame.
 * @param {number} now - elapsed time in seconds
 * @param {object|null} hoveredTile - {col, row, buildingType, size} or null
 * @param {Array|null} dragTiles - optional array of {col, row} for multi-tile drag preview
 */
export function updateGrid(now, hoveredTile, dragTiles) {
  if (!highlightMesh) return;

  const hasDrag = dragTiles && dragTiles.length > 0;

  // --- Multi-tile drag preview ---
  if (hasDrag) {
    // Hide single-tile highlight during drag
    highlightMesh.visible = false;

    const pulseOpacity = 0.2 + 0.15 * Math.sin(now * 4.0);

    // Grow pool if needed
    while (dragHighlightPool.length < dragTiles.length) {
      const geo = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      if (_scene) _scene.add(mesh);
      dragHighlightPool.push(mesh);
    }

    // Position and color each tile
    for (let i = 0; i < dragTiles.length; i++) {
      const tile = dragTiles[i];
      const mesh = dragHighlightPool[i];
      const valid = isBuildable(tile.col, tile.row, 1, TEAM_PLAYER);

      mesh.position.set(
        tile.col * TILE_SIZE + TILE_SIZE / 2,
        0.5,
        tile.row * TILE_SIZE + TILE_SIZE / 2
      );
      mesh.material.color.setHex(valid ? COLORS.BUILD_VALID : COLORS.BUILD_INVALID);
      mesh.material.opacity = pulseOpacity;
      mesh.visible = true;
    }

    // Hide excess pool meshes
    for (let i = dragTiles.length; i < dragHighlightPool.length; i++) {
      dragHighlightPool[i].visible = false;
    }

    return;
  }

  // --- No drag: hide all pool meshes ---
  for (let i = 0; i < dragHighlightPool.length; i++) {
    dragHighlightPool[i].visible = false;
  }

  // --- Normal single-tile highlight ---
  if (hoveredTile && hoveredTile.col !== undefined && hoveredTile.row !== undefined) {
    const size = hoveredTile.size || 1;
    const valid = isBuildable(hoveredTile.col, hoveredTile.row, size, TEAM_PLAYER);

    // Update highlight size to match building
    highlightMesh.geometry.dispose();
    highlightMesh.geometry = new THREE.PlaneGeometry(TILE_SIZE * size, TILE_SIZE * size);

    // Position at center of the size x size area
    highlightMesh.position.set(
      hoveredTile.col * TILE_SIZE + (TILE_SIZE * size) / 2,
      0.5,
      hoveredTile.row * TILE_SIZE + (TILE_SIZE * size) / 2
    );

    // Color based on validity
    const color = valid ? COLORS.BUILD_VALID : COLORS.BUILD_INVALID;
    highlightMaterial.color.setHex(color);

    // Pulse opacity
    highlightMaterial.opacity = 0.2 + 0.15 * Math.sin(now * 4.0);

    highlightMesh.visible = true;
  } else {
    highlightMesh.visible = false;
  }
}

/**
 * Dispose and clear all drag highlight pool meshes.
 * Call on match reset / cleanup.
 */
export function resetDragHighlights() {
  for (const mesh of dragHighlightPool) {
    mesh.geometry.dispose();
    mesh.material.dispose();
    if (_scene) _scene.remove(mesh);
  }
  dragHighlightPool = [];
}
