// ============================================================
// buildingMeshes.js — Building 3D models (reads Building state, renders)
// ============================================================
import * as THREE from 'three';
import { makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial } from './scene.js';
import {
  BTYPE_CORE, BTYPE_BARRACKS, BTYPE_TURRET, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL,
  COLORS, TILE_SIZE,
  TEAM_PLAYER, HIT_FLASH_DURATION,
  WALL_HORIZONTAL, WALL_VERTICAL, WALL_CORNER_NE, WALL_CORNER_NW, WALL_CORNER_SE, WALL_CORNER_SW,
} from '../config.js';

// ---- Color helpers ----

function _brighter(c) {
  return new THREE.Color(
    Math.min(1, c.r + 0.3),
    Math.min(1, c.g + 0.3),
    Math.min(1, c.b + 0.3)
  );
}

function toColor(rgb) {
  if (rgb instanceof THREE.Color) return rgb;
  if (Array.isArray(rgb)) return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
  return new THREE.Color(rgb);
}

// ---- Public API ----

/**
 * Create a 3D mesh group for a building and add it to the scene.
 */
export function createBuildingMesh(building, scene) {
  const teamColor = building.team === TEAM_PLAYER ? COLORS.PLAYER : COLORS.ENEMY;
  const group = new THREE.Group();

  switch (building.type) {
    case BTYPE_CORE:
      buildCoreMesh(group, teamColor);
      break;
    case BTYPE_BARRACKS:
      buildBarracksMesh(group, building);
      break;
    case BTYPE_TURRET:
      buildTurretMesh(group, building);
      break;
    case BTYPE_FACTORY:
      buildFactoryMesh(group, building);
      break;
    case BTYPE_GENERATOR:
      buildGeneratorMesh(group, building);
      break;
    case BTYPE_HELIPAD:
      buildHelipadMesh(group, building);
      break;
    case BTYPE_WALL:
      buildWallMesh(group, building);
      break;
  }

  group.position.set(building.x, 0, building.z);
  group.userData.baseY = 0;
  group.userData.idOffset = building.idOffset;

  scene.add(group);
  building.mesh = group;
}

/**
 * Rebuild a building mesh (called after upgrade/branch finishes).
 */
export function rebuildBuildingMesh(building, scene) {
  removeBuildingMesh(building, scene);
  createBuildingMesh(building, scene);
}

/**
 * Get the 3D fire point for a turret (muzzle flash world position).
 */
export function getFirePoint(building) {
  if (!building.mesh) return { x: building.x, y: 20, z: building.z };
  const model = building.mesh.userData.model || building.mesh;
  if (model.userData.muzzleFlash) {
    const wp = new THREE.Vector3();
    model.userData.muzzleFlash.getWorldPosition(wp);
    return { x: wp.x, y: wp.y, z: wp.z };
  }
  return { x: building.x, y: 20, z: building.z };
}

// ---- Shared geometries for buildings ----
const _bBox = new THREE.BoxGeometry(1, 1, 1);
const _bCyl = new THREE.CylinderGeometry(0.5, 0.5, 1, 16);
const _bCylTaper = new THREE.CylinderGeometry(0.35, 0.5, 1, 12);
const _bSphere = new THREE.SphereGeometry(0.5, 14, 10);
const _bRing = new THREE.TorusGeometry(0.5, 0.06, 8, 28);
const _bOcta = new THREE.OctahedronGeometry(0.5, 0);
const _bIcosa = new THREE.IcosahedronGeometry(0.5, 0);
const _bCone = new THREE.ConeGeometry(0.5, 1, 8);
const _bPlane = new THREE.PlaneGeometry(1, 1);
const _bHex = new THREE.CylinderGeometry(0.5, 0.5, 1, 6);

// ---- Core (3x3) — Armored Fortress Command Center ----
function buildCoreMesh(group, color) {
  const c = toColor(color);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = [];
  const glowParts = [];

  // --- Tier 1: Wide armored base platform ---
  const base = new THREE.Mesh(_bBox.clone(), strMat);
  base.scale.set(110, 8, 110);
  base.position.y = 4;
  group.add(base);

  // Beveled edge trim on base
  const baseTrim = new THREE.Mesh(_bBox.clone(), accMat);
  baseTrim.scale.set(112, 1.5, 112);
  baseTrim.position.y = 8.5;
  group.add(baseTrim);
  accentParts.push(baseTrim);

  // --- Tier 2: Stepped mid-section ---
  const mid = new THREE.Mesh(_bBox.clone(), strMat);
  mid.scale.set(85, 16, 85);
  mid.position.y = 17;
  group.add(mid);

  // Accent trim band on mid
  const midTrim = new THREE.Mesh(_bBox.clone(), accMat);
  midTrim.scale.set(87, 1.2, 87);
  midTrim.position.y = 25.5;
  group.add(midTrim);
  accentParts.push(midTrim);

  // --- Tier 3: Upper command deck ---
  const upper = new THREE.Mesh(_bBox.clone(), strMat);
  upper.scale.set(60, 12, 60);
  upper.position.y = 32;
  group.add(upper);

  // --- Corner buttress pylons (4) ---
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 4) + (Math.PI / 2) * i;
    const cx = Math.cos(angle) * 46;
    const cz = Math.sin(angle) * 46;

    // Armored pylon
    const pylon = new THREE.Mesh(_bCylTaper.clone(), strMat);
    pylon.scale.set(10, 36, 10);
    pylon.position.set(cx, 18, cz);
    group.add(pylon);

    // Pylon accent ring
    const pylonRing = new THREE.Mesh(_bRing.clone(), accMat);
    pylonRing.scale.set(12, 12, 12);
    pylonRing.rotation.x = Math.PI / 2;
    pylonRing.position.set(cx, 30, cz);
    group.add(pylonRing);
    accentParts.push(pylonRing);

    // Pylon tip spire
    const spire = new THREE.Mesh(_bCone.clone(), accMat);
    spire.scale.set(5, 14, 5);
    spire.position.set(cx, 44, cz);
    group.add(spire);
    accentParts.push(spire);
  }

  // --- Reactor cage structure (center) ---
  // Vertical cage bars
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i;
    const bar = new THREE.Mesh(_bBox.clone(), strMat);
    bar.scale.set(2, 28, 2);
    bar.position.set(Math.cos(angle) * 18, 27, Math.sin(angle) * 18);
    group.add(bar);
  }

  // Cage horizontal rings
  for (const ry of [18, 30, 42]) {
    const cageRing = new THREE.Mesh(_bRing.clone(), strMat);
    cageRing.scale.set(38, 38, 38);
    cageRing.rotation.x = Math.PI / 2;
    cageRing.position.y = ry;
    group.add(cageRing);
  }

  // --- Central reactor core (bright glowing orb) ---
  const reactorCore = new THREE.Mesh(_bSphere.clone(), accMat);
  reactorCore.scale.set(20, 20, 20);
  reactorCore.position.y = 32;
  group.add(reactorCore);
  accentParts.push(reactorCore);

  // Reactor inner glow halo
  const reactorGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  reactorGlow.scale.set(30, 30, 30);
  reactorGlow.position.y = 32;
  group.add(reactorGlow);
  glowParts.push(reactorGlow);

  // --- Orbiting energy rings (two, tilted) ---
  const orbitRing1 = new THREE.Mesh(_bRing.clone(), accMat);
  orbitRing1.scale.set(50, 50, 50);
  orbitRing1.rotation.x = Math.PI / 3;
  orbitRing1.rotation.z = Math.PI / 6;
  orbitRing1.position.y = 38;
  group.add(orbitRing1);
  accentParts.push(orbitRing1);

  const orbitRing2 = new THREE.Mesh(_bRing.clone(), accMat);
  orbitRing2.scale.set(50, 50, 50);
  orbitRing2.rotation.x = -Math.PI / 4;
  orbitRing2.rotation.z = -Math.PI / 5;
  orbitRing2.position.y = 38;
  group.add(orbitRing2);
  accentParts.push(orbitRing2);

  // --- Side armor panel details (8 panels) ---
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    const px = Math.cos(angle) * 44;
    const pz = Math.sin(angle) * 44;
    const panel = new THREE.Mesh(_bBox.clone(), strMat);
    panel.scale.set(6, 14, 2.5);
    panel.position.set(px, 17, pz);
    panel.rotation.y = -angle;
    group.add(panel);
  }

  // --- Energy conduit lines on upper deck ---
  for (let side = -1; side <= 1; side += 2) {
    const conduit = new THREE.Mesh(_bBox.clone(), accMat);
    conduit.scale.set(58, 1, 1.2);
    conduit.position.set(0, 38.5, side * 22);
    group.add(conduit);
    accentParts.push(conduit);

    const conduit2 = new THREE.Mesh(_bBox.clone(), accMat);
    conduit2.scale.set(1.2, 1, 44);
    conduit2.position.set(side * 22, 38.5, 0);
    group.add(conduit2);
    accentParts.push(conduit2);
  }

  // --- Antenna mast at center top ---
  const mast = new THREE.Mesh(_bCyl.clone(), strMat);
  mast.scale.set(3, 16, 3);
  mast.position.y = 50;
  group.add(mast);

  const mastTip = new THREE.Mesh(_bOcta.clone(), accMat);
  mastTip.scale.set(6, 6, 6);
  mastTip.position.y = 60;
  group.add(mastTip);
  accentParts.push(mastTip);

  const mastGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  mastGlow.scale.set(12, 12, 12);
  mastGlow.position.y = 60;
  group.add(mastGlow);
  glowParts.push(mastGlow);

  // --- Ground glow plane ---
  const groundGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(c, 0.1));
  groundGlow.scale.set(130, 130, 1);
  groundGlow.rotation.x = -Math.PI / 2;
  groundGlow.position.y = 0.2;
  group.add(groundGlow);
  glowParts.push(groundGlow);

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
  group.userData.orbitRings = [orbitRing1, orbitRing2];
}

// ---- Barracks (2x2) — dispatches to level-based builder ----
function buildBarracksMesh(group, building) {
  const teamColor = building.team === TEAM_PLAYER ? COLORS.PLAYER : COLORS.ENEMY;
  const c = toColor(teamColor);

  if (building.branch === 'A')       _buildBarracksBranchA(group, c);
  else if (building.branch === 'B')  _buildBarracksBranchB(group, c);
  else if (building.level >= 2)      _buildBarracksL2(group, c);
  else if (building.level >= 1)      _buildBarracksL1(group, c);
  else                               _buildBarracksL0(group, c);

  group.userData.isBarracks = true;
}

// ---- Barracks L0: Base hangar ----
function _buildBarracksL0(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = [];
  const glowParts = [];

  // Foundation
  const foundation = new THREE.Mesh(_bBox.clone(), strMat);
  foundation.scale.set(68, 4, 68);
  foundation.position.y = 2;
  group.add(foundation);

  const foundTrim = new THREE.Mesh(_bBox.clone(), accMat);
  foundTrim.scale.set(70, 1, 70);
  foundTrim.position.y = 4.5;
  group.add(foundTrim);
  accentParts.push(foundTrim);

  // Main hangar body
  const body = new THREE.Mesh(_bBox.clone(), strMat);
  body.scale.set(62, 22, 58);
  body.position.y = 15;
  group.add(body);

  // Angled roof
  for (let side = -1; side <= 1; side += 2) {
    const roofPanel = new THREE.Mesh(_bBox.clone(), strMat);
    roofPanel.scale.set(64, 2.5, 34);
    roofPanel.position.set(0, 29, side * 8);
    roofPanel.rotation.x = side * 0.22;
    group.add(roofPanel);
  }

  const ridgeCap = new THREE.Mesh(_bBox.clone(), accMat);
  ridgeCap.scale.set(66, 1.5, 3);
  ridgeCap.position.y = 30.5;
  group.add(ridgeCap);
  accentParts.push(ridgeCap);

  // Armored wall panels
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 3; i++) {
      const xOff = -20 + i * 20;
      const plate = new THREE.Mesh(_bBox.clone(), strMat);
      plate.scale.set(4, 18, 2.5);
      plate.position.set(xOff, 15, side * 30);
      group.add(plate);
    }
    const lightStrip = new THREE.Mesh(_bBox.clone(), accMat);
    lightStrip.scale.set(50, 1.2, 0.8);
    lightStrip.position.set(0, 22, side * 30.5);
    group.add(lightStrip);
    accentParts.push(lightStrip);
  }

  // Deployment bay door
  const doorFrameL = new THREE.Mesh(_bBox.clone(), strMat);
  doorFrameL.scale.set(3, 18, 4);
  doorFrameL.position.set(-18, 13, -30);
  group.add(doorFrameL);

  const doorFrameR = new THREE.Mesh(_bBox.clone(), strMat);
  doorFrameR.scale.set(3, 18, 4);
  doorFrameR.position.set(18, 13, -30);
  group.add(doorFrameR);

  const doorLintel = new THREE.Mesh(_bBox.clone(), accMat);
  doorLintel.scale.set(40, 2, 3);
  doorLintel.position.set(0, 23, -30);
  group.add(doorLintel);
  accentParts.push(doorLintel);

  const bayGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(_brighter(c), 0.2));
  bayGlow.scale.set(32, 16, 1);
  bayGlow.position.set(0, 13, -30.5);
  group.add(bayGlow);
  glowParts.push(bayGlow);

  // Corner struts
  for (let cx = -1; cx <= 1; cx += 2) {
    for (let cz = -1; cz <= 1; cz += 2) {
      const strut = new THREE.Mesh(_bBox.clone(), strMat);
      strut.scale.set(4, 26, 4);
      strut.position.set(cx * 30, 15, cz * 28);
      group.add(strut);
    }
  }

  // Status beacon
  const beacon = new THREE.Mesh(_bCyl.clone(), strMat);
  beacon.scale.set(3, 10, 3);
  beacon.position.set(-20, 36, -14);
  group.add(beacon);

  const beaconLight = new THREE.Mesh(_bSphere.clone(), accMat);
  beaconLight.scale.set(5, 5, 5);
  beaconLight.position.set(-20, 42, -14);
  group.add(beaconLight);
  accentParts.push(beaconLight);

  const beaconGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  beaconGlow.scale.set(10, 10, 10);
  beaconGlow.position.set(-20, 42, -14);
  group.add(beaconGlow);
  glowParts.push(beaconGlow);

  // Ground glow
  const groundGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(c, 0.08));
  groundGlow.scale.set(80, 80, 1);
  groundGlow.rotation.x = -Math.PI / 2;
  groundGlow.position.y = 0.15;
  group.add(groundGlow);
  glowParts.push(groundGlow);

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Barracks L1: Reinforced hangar + comm dish + extra vents ----
function _buildBarracksL1(group, c) {
  _buildBarracksL0(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Comm dish on roof
  const dishBase = new THREE.Mesh(_bCyl.clone(), strMat);
  dishBase.scale.set(5, 6, 5);
  dishBase.position.set(18, 34, 12);
  group.add(dishBase);

  const dish = new THREE.Mesh(_bSphere.clone(), strMat);
  dish.scale.set(12, 4, 12);
  dish.position.set(18, 38, 12);
  group.add(dish);

  const dishTip = new THREE.Mesh(_bSphere.clone(), accMat);
  dishTip.scale.set(3, 3, 3);
  dishTip.position.set(18, 42, 12);
  group.add(dishTip);
  accentParts.push(dishTip);

  // Exhaust vents on back
  for (let i = 0; i < 3; i++) {
    const vx = -14 + i * 14;
    const vent = new THREE.Mesh(_bBox.clone(), strMat);
    vent.scale.set(6, 6, 2);
    vent.position.set(vx, 10, 30);
    group.add(vent);

    const ventGrill = new THREE.Mesh(_bBox.clone(), accMat);
    ventGrill.scale.set(4, 4, 0.6);
    ventGrill.position.set(vx, 10, 31.2);
    group.add(ventGrill);
    accentParts.push(ventGrill);
  }

  // Accent ring around mid-section
  const midRing = new THREE.Mesh(_bRing.clone(), accMat);
  midRing.scale.set(42, 42, 42);
  midRing.rotation.x = Math.PI / 2;
  midRing.position.y = 26;
  group.add(midRing);
  accentParts.push(midRing);
}

// ---- Barracks L2: Fortified + armor plating + dual beacons ----
function _buildBarracksL2(group, c) {
  _buildBarracksL1(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Extra armor plating on sides
  for (let side = -1; side <= 1; side += 2) {
    const armorPlate = new THREE.Mesh(_bBox.clone(), strMat);
    armorPlate.scale.set(3, 20, 40);
    armorPlate.position.set(side * 34, 14, 0);
    group.add(armorPlate);
  }

  // Second beacon on opposite corner
  const beacon2 = new THREE.Mesh(_bCyl.clone(), strMat);
  beacon2.scale.set(3, 10, 3);
  beacon2.position.set(22, 36, -14);
  group.add(beacon2);

  const beacon2Light = new THREE.Mesh(_bSphere.clone(), accMat);
  beacon2Light.scale.set(5, 5, 5);
  beacon2Light.position.set(22, 42, -14);
  group.add(beacon2Light);
  accentParts.push(beacon2Light);

  const beacon2Glow = new THREE.Mesh(_bSphere.clone(), glwMat);
  beacon2Glow.scale.set(10, 10, 10);
  beacon2Glow.position.set(22, 42, -14);
  group.add(beacon2Glow);
  glowParts.push(beacon2Glow);

  // Glowing energy conduits on roof
  for (let side = -1; side <= 1; side += 2) {
    const conduit = new THREE.Mesh(_bBox.clone(), accMat);
    conduit.scale.set(60, 0.8, 1);
    conduit.position.set(0, 31, side * 4);
    group.add(conduit);
    accentParts.push(conduit);
  }
}

// ---- Barracks Branch A "Assault Doctrine": heavy military look, red-shifted accents ----
function _buildBarracksBranchA(group, c) {
  _buildBarracksL2(group, c);

  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Heavy blast doors (wider door frame)
  const blastDoorL = new THREE.Mesh(_bBox.clone(), makeStructuralMaterial(c));
  blastDoorL.scale.set(5, 20, 5);
  blastDoorL.position.set(-22, 14, -30);
  group.add(blastDoorL);

  const blastDoorR = new THREE.Mesh(_bBox.clone(), makeStructuralMaterial(c));
  blastDoorR.scale.set(5, 20, 5);
  blastDoorR.position.set(22, 14, -30);
  group.add(blastDoorR);

  // Large overhead glow (assault bay)
  const assaultGlow = new THREE.Mesh(_bPlane.clone(), glwMat);
  assaultGlow.scale.set(44, 20, 1);
  assaultGlow.position.set(0, 14, -31);
  group.add(assaultGlow);
  glowParts.push(assaultGlow);

  // Roof-mounted antenna array
  for (let i = 0; i < 3; i++) {
    const antenna = new THREE.Mesh(_bCyl.clone(), accMat);
    antenna.scale.set(1, 12, 1);
    antenna.position.set(-16 + i * 16, 38, 0);
    group.add(antenna);
    accentParts.push(antenna);
  }
}

// ---- Barracks Branch B "Rapid Deployment": sleek, speed lines, multiple bay doors ----
function _buildBarracksBranchB(group, c) {
  _buildBarracksL2(group, c);

  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Speed lines (accent strips along the sides)
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 3; i++) {
      const speedLine = new THREE.Mesh(_bBox.clone(), accMat);
      speedLine.scale.set(58, 0.6, 0.6);
      speedLine.position.set(0, 10 + i * 5, side * 31);
      group.add(speedLine);
      accentParts.push(speedLine);
    }
  }

  // Second deployment bay on back
  const backBayGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(_brighter(c), 0.2));
  backBayGlow.scale.set(28, 14, 1);
  backBayGlow.position.set(0, 12, 30.5);
  group.add(backBayGlow);
  glowParts.push(backBayGlow);

  // Speed indicator ring on roof
  const speedRing = new THREE.Mesh(_bRing.clone(), accMat);
  speedRing.scale.set(24, 24, 24);
  speedRing.rotation.x = Math.PI / 2;
  speedRing.position.y = 32;
  group.add(speedRing);
  accentParts.push(speedRing);
}

// ---- Turret: dispatches to correct Pulse builder ----
function buildTurretMesh(group, building) {
  const teamColor = building.team === TEAM_PLAYER ? COLORS.PLAYER : COLORS.ENEMY;
  const c = toColor(teamColor);
  const model = new THREE.Group();

  if (building.branch === 'A')       _buildPulseBranchA(model, c);
  else if (building.branch === 'B')  _buildPulseBranchB(model, c);
  else if (building.level >= 2)      _buildPulseL2(model, c);
  else if (building.level >= 1)      _buildPulseL1(model, c);
  else                               _buildPulseL0(model, c);

  group.add(model);
  group.userData.model = model;
  // Copy userData from model to group for easy access
  group.userData.disc = model.userData.disc;
  group.userData.turretPivot = model.userData.turretPivot;
  group.userData.barrel = model.userData.barrel;
  group.userData.barrelY = model.userData.barrelY;
  group.userData.barrelDist = model.userData.barrelDist;
  group.userData.muzzleFlash = model.userData.muzzleFlash;
  group.userData.isPulseTurret = true;
}

// ---- Pulse L0: ~20 units tall (short squat, stubby barrel) ----
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

  const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
  const muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 6), flashMat);
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

// ---- Pulse L1: ~28 units tall (collar ring, longer barrel) ----
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

  const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
  const muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 6), flashMat);
  muzzleFlash.position.set(18, 0, 0);
  muzzleFlash.visible = false;
  turretPivot.add(muzzleFlash);

  group.userData.disc = null;
  group.userData.turretPivot = turretPivot;
  group.userData.barrel = barrel;
  group.userData.barrelY = 25;
  group.userData.barrelDist = 11;
  group.userData.muzzleFlash = muzzleFlash;
}

// ---- Pulse L2: ~36 units tall (glowing collar, spinning disc, barrel + tip) ----
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
    new THREE.CylinderGeometry(10, 10, 3, 16),
    makeStructuralMaterial(c)
  );
  disc.position.y = 27;
  group.add(disc);

  const turretPivot = new THREE.Group();
  turretPivot.position.y = 28;

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

  const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
  const muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMat);
  muzzleFlash.position.set(21, 0, 0);
  muzzleFlash.visible = false;
  turretPivot.add(muzzleFlash);

  group.userData.disc = disc;
  group.userData.turretPivot = turretPivot;
  group.userData.barrel = barrel;
  group.userData.barrelY = 28;
  group.userData.barrelDist = 11;
  group.userData.muzzleFlash = muzzleFlash;
}

// ---- Branch A "Overclock": ~50 units tall (sleek spire, speed fins, gatling cluster) ----
function _buildPulseBranchA(group, c) {
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 11, 35, 12),
    makeStructuralMaterial(c)
  );
  base.position.y = 17.5;
  group.add(base);

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

  const discSmall = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7, 2, 14),
    makeStructuralMaterial(c)
  );
  discSmall.position.y = 34;
  group.add(discSmall);

  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(11, 11, 3, 16),
    makeStructuralMaterial(c)
  );
  disc.position.y = 38;
  group.add(disc);

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
  muzzleRing.position.set(20, 0, 0);
  muzzleRing.rotation.y = Math.PI / 2;
  turretPivot.add(muzzleRing);

  group.add(turretPivot);

  const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
  const muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMat);
  muzzleFlash.position.set(22, 0, 0);
  muzzleFlash.visible = false;
  turretPivot.add(muzzleFlash);

  group.userData.disc = disc;
  group.userData.turretPivot = turretPivot;
  group.userData.barrel = trackedBarrel;
  group.userData.barrelY = 38;
  group.userData.barrelDist = 12;
  group.userData.muzzleFlash = muzzleFlash;
}

// ---- Branch B "Heavy Bolts": ~48 units tall (chunky military, massive barrel, splash ring) ----
function _buildPulseBranchB(group, c) {
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(13, 14, 28, 14),
    makeStructuralMaterial(c)
  );
  base.position.y = 14;
  group.add(base);

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

  const turretPivot = new THREE.Group();
  turretPivot.position.y = 28;

  const turretBody = new THREE.Mesh(
    new THREE.CylinderGeometry(10, 12, 8, 12),
    makeStructuralMaterial(c)
  );
  turretBody.position.y = 4;
  turretPivot.add(turretBody);

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
    new THREE.MeshBasicMaterial({
      color: _brighter(c), transparent: true, opacity: 0.7
    })
  );
  splashRing.position.set(24, 6, 0);
  splashRing.rotation.y = Math.PI / 2;
  turretPivot.add(splashRing);

  group.add(turretPivot);

  const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
  const muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(3.5, 8, 6), flashMat);
  muzzleFlash.position.set(30, 6, 0);
  muzzleFlash.visible = false;
  turretPivot.add(muzzleFlash);

  group.userData.disc = null;
  group.userData.turretPivot = turretPivot;
  group.userData.barrel = barrel;
  group.userData.barrelY = 34;
  group.userData.barrelDist = 16;
  group.userData.muzzleFlash = muzzleFlash;
}

// ---- Factory (2x2) — dispatches to level-based builder ----
function buildFactoryMesh(group, building) {
  const factoryColor = COLORS.FACTORY;
  const c = toColor(factoryColor);

  if (building.branch === 'A')       _buildFactoryBranchA(group, c);
  else if (building.branch === 'B')  _buildFactoryBranchB(group, c);
  else if (building.level >= 2)      _buildFactoryL2(group, c);
  else if (building.level >= 1)      _buildFactoryL1(group, c);
  else                               _buildFactoryL0(group, c);

  group.userData.isFactory = true;
}

// ---- Factory L0: Base industrial plant ----
function _buildFactoryL0(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = [];
  const glowParts = [];

  // Heavy foundation
  const foundation = new THREE.Mesh(_bBox.clone(), strMat);
  foundation.scale.set(76, 5, 76);
  foundation.position.y = 2.5;
  group.add(foundation);

  const foundEdge = new THREE.Mesh(_bBox.clone(), accMat);
  foundEdge.scale.set(78, 1.2, 78);
  foundEdge.position.y = 5.5;
  group.add(foundEdge);
  accentParts.push(foundEdge);

  // Main body
  const lowerBody = new THREE.Mesh(_bBox.clone(), strMat);
  lowerBody.scale.set(70, 18, 68);
  lowerBody.position.y = 14;
  group.add(lowerBody);

  const upperBody = new THREE.Mesh(_bBox.clone(), strMat);
  upperBody.scale.set(56, 14, 54);
  upperBody.position.y = 30;
  group.add(upperBody);

  const midBand = new THREE.Mesh(_bBox.clone(), accMat);
  midBand.scale.set(72, 1.5, 70);
  midBand.position.y = 23.5;
  group.add(midBand);
  accentParts.push(midBand);

  const upperBand = new THREE.Mesh(_bBox.clone(), accMat);
  upperBand.scale.set(58, 1.2, 56);
  upperBand.position.y = 37.5;
  group.add(upperBand);
  accentParts.push(upperBand);

  // Twin exhaust stacks
  for (let side = -1; side <= 1; side += 2) {
    const stack = new THREE.Mesh(_bCyl.clone(), strMat);
    stack.scale.set(8, 32, 8);
    stack.position.set(side * 22, 38, 24);
    group.add(stack);

    for (const ry of [28, 38, 48]) {
      const collar = new THREE.Mesh(_bRing.clone(), strMat);
      collar.scale.set(12, 12, 12);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(side * 22, ry, 24);
      group.add(collar);
    }

    const ventCap = new THREE.Mesh(_bCyl.clone(), strMat);
    ventCap.scale.set(11, 3, 11);
    ventCap.position.set(side * 22, 55, 24);
    group.add(ventCap);

    const exhaustGlow = new THREE.Mesh(_bSphere.clone(), makeGlowMaterial(0xffa028, 0.2));
    exhaustGlow.scale.set(10, 6, 10);
    exhaustGlow.position.set(side * 22, 57, 24);
    group.add(exhaustGlow);
    glowParts.push(exhaustGlow);
  }

  // Assembly platform with rails
  const platform = new THREE.Mesh(_bBox.clone(), strMat);
  platform.scale.set(40, 2, 30);
  platform.position.set(0, 6, -28);
  group.add(platform);

  for (let side = -1; side <= 1; side += 2) {
    const rail = new THREE.Mesh(_bBox.clone(), accMat);
    rail.scale.set(1.5, 1, 28);
    rail.position.set(side * 10, 7.5, -28);
    group.add(rail);
    accentParts.push(rail);
  }

  // Furnace glow
  const furnaceGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(_brighter(c), 0.25));
  furnaceGlow.scale.set(24, 10, 1);
  furnaceGlow.position.set(0, 16, -35);
  group.add(furnaceGlow);
  glowParts.push(furnaceGlow);

  // Warning lights
  for (let cx = -1; cx <= 1; cx += 2) {
    for (let cz = -1; cz <= 1; cz += 2) {
      const light = new THREE.Mesh(_bSphere.clone(), accMat);
      light.scale.set(3, 3, 3);
      light.position.set(cx * 26, 38, cz * 25);
      group.add(light);
      accentParts.push(light);
    }
  }

  // Ground glow
  const groundGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(c, 0.08));
  groundGlow.scale.set(90, 90, 1);
  groundGlow.rotation.x = -Math.PI / 2;
  groundGlow.position.y = 0.15;
  group.add(groundGlow);
  glowParts.push(groundGlow);

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Factory L1: + gantry crane + side machinery ----
function _buildFactoryL1(group, c) {
  _buildFactoryL0(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const accentParts = group.userData.accentParts;

  // Gantry crane
  for (let cx = -1; cx <= 1; cx += 2) {
    const pillar = new THREE.Mesh(_bBox.clone(), strMat);
    pillar.scale.set(4, 36, 4);
    pillar.position.set(cx * 24, 24, -28);
    group.add(pillar);
  }

  const craneBridge = new THREE.Mesh(_bBox.clone(), strMat);
  craneBridge.scale.set(52, 4, 5);
  craneBridge.position.set(0, 44, -28);
  group.add(craneBridge);

  const craneAccent = new THREE.Mesh(_bBox.clone(), accMat);
  craneAccent.scale.set(54, 1, 1.5);
  craneAccent.position.set(0, 46.5, -28);
  group.add(craneAccent);
  accentParts.push(craneAccent);

  const trolley = new THREE.Mesh(_bBox.clone(), strMat);
  trolley.scale.set(10, 5, 6);
  trolley.position.set(0, 41, -28);
  group.add(trolley);

  const hookArm = new THREE.Mesh(_bCyl.clone(), accMat);
  hookArm.scale.set(1.5, 14, 1.5);
  hookArm.position.set(0, 32, -28);
  group.add(hookArm);
  accentParts.push(hookArm);

  const hookTip = new THREE.Mesh(_bOcta.clone(), accMat);
  hookTip.scale.set(5, 5, 5);
  hookTip.position.set(0, 24, -28);
  group.add(hookTip);
  accentParts.push(hookTip);

  // Side machinery
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 2; i++) {
      const zOff = -10 + i * 20;
      const housing = new THREE.Mesh(_bBox.clone(), strMat);
      housing.scale.set(3, 12, 14);
      housing.position.set(side * 36, 14, zOff);
      group.add(housing);

      const port = new THREE.Mesh(_bCyl.clone(), accMat);
      port.scale.set(3, 1.5, 3);
      port.rotation.z = Math.PI / 2;
      port.position.set(side * 37.5, 16, zOff);
      group.add(port);
      accentParts.push(port);
    }
  }
}

// ---- Factory L2: + conduit pipes + fan housing + full industrial ----
function _buildFactoryL2(group, c) {
  _buildFactoryL1(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Energy conduit pipes
  for (let side = -1; side <= 1; side += 2) {
    const pipe = new THREE.Mesh(_bCyl.clone(), strMat);
    pipe.scale.set(3, 18, 3);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(side * 22, 20, 12);
    group.add(pipe);

    const joint = new THREE.Mesh(_bRing.clone(), accMat);
    joint.scale.set(5, 5, 5);
    joint.position.set(side * 22, 20, 8);
    group.add(joint);
    accentParts.push(joint);
  }

  // Top exhaust fan housing
  const fanHousing = new THREE.Mesh(_bCyl.clone(), strMat);
  fanHousing.scale.set(14, 4, 14);
  fanHousing.position.y = 39;
  group.add(fanHousing);

  const fanRing = new THREE.Mesh(_bRing.clone(), accMat);
  fanRing.scale.set(16, 16, 16);
  fanRing.rotation.x = Math.PI / 2;
  fanRing.position.y = 41.5;
  group.add(fanRing);
  accentParts.push(fanRing);

  const fanGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  fanGlow.scale.set(12, 4, 12);
  fanGlow.position.y = 41.5;
  group.add(fanGlow);
  glowParts.push(fanGlow);
}

// ---- Factory Branch A "Heavy Armor": reinforced walls, extra plating, heavy look ----
function _buildFactoryBranchA(group, c) {
  _buildFactoryL2(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Heavy armor plates on all sides
  for (let side = -1; side <= 1; side += 2) {
    const armorWall = new THREE.Mesh(_bBox.clone(), strMat);
    armorWall.scale.set(4, 30, 60);
    armorWall.position.set(side * 38, 18, 0);
    group.add(armorWall);

    const armorFront = new THREE.Mesh(_bBox.clone(), strMat);
    armorFront.scale.set(60, 30, 4);
    armorFront.position.set(0, 18, side * 38);
    group.add(armorFront);
  }

  // Reinforcement X-braces on roof
  for (let angle = 0; angle < 2; angle++) {
    const brace = new THREE.Mesh(_bBox.clone(), accMat);
    brace.scale.set(70, 1.5, 1.5);
    brace.rotation.y = Math.PI / 4 + angle * Math.PI / 2;
    brace.position.y = 38;
    group.add(brace);
    accentParts.push(brace);
  }

  // Thick glowing forge window
  const forgeGlow = new THREE.Mesh(_bPlane.clone(), glwMat);
  forgeGlow.scale.set(30, 14, 1);
  forgeGlow.position.set(0, 18, -36);
  group.add(forgeGlow);
  glowParts.push(forgeGlow);
}

// ---- Factory Branch B "Siege Cannons": tall antenna, cannon test racks, aggressive look ----
function _buildFactoryBranchB(group, c) {
  _buildFactoryL2(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Tall targeting antenna
  const mast = new THREE.Mesh(_bCyl.clone(), strMat);
  mast.scale.set(2.5, 22, 2.5);
  mast.position.set(0, 52, 0);
  group.add(mast);

  const mastTip = new THREE.Mesh(_bOcta.clone(), accMat);
  mastTip.scale.set(5, 5, 5);
  mastTip.position.set(0, 64, 0);
  group.add(mastTip);
  accentParts.push(mastTip);

  const mastGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  mastGlow.scale.set(10, 10, 10);
  mastGlow.position.set(0, 64, 0);
  group.add(mastGlow);
  glowParts.push(mastGlow);

  // Cannon test barrels on sides
  for (let side = -1; side <= 1; side += 2) {
    const barrel = new THREE.Mesh(_bCyl.clone(), strMat);
    barrel.scale.set(4, 20, 4);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(side * 20, 30, -32);
    group.add(barrel);

    const muzzle = new THREE.Mesh(_bCone.clone(), accMat);
    muzzle.scale.set(5, 5, 5);
    muzzle.rotation.z = side * -Math.PI / 2;
    muzzle.position.set(side * 32, 30, -32);
    group.add(muzzle);
    accentParts.push(muzzle);
  }
}

// ---- Update all building meshes ----

export function updateBuildingMeshes(now, buildings) {
  const dt = 1 / 60; // approximate frame dt for animations

  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    if (!b.mesh) continue;

    const group = b.mesh;
    const offset = group.userData.idOffset || 0;

    group.position.y = group.userData.baseY;

    // --- Pulse turret animations ---
    if (group.userData.isPulseTurret) {
      updatePulseTurretAnim(group, b, now, dt);
    }

    // --- Production building animations ---
    if (group.userData.isBarracks || group.userData.isFactory || group.userData.isHelipad) {
      updateProductionBuildingAnim(group, b, now);
    }

    // --- Generator animations ---
    if (group.userData.isGenerator) {
      // Core scale pulse (breathing)
      const core = group.userData.energyCore;
      if (core) {
        const pulse = 1.0 + 0.12 * Math.sin(now * 3.0 + offset);
        core.scale.setScalar(8 * pulse);
      }
      // Ring spin
      const ring1 = group.userData.energyRing;
      if (ring1) {
        ring1.rotation.y = now * 1.2 + offset;
        ring1.rotation.x = Math.sin(now * 0.5 + offset) * 0.3;
      }
      // Counter-rotating ring
      const ring2 = group.userData.energyRing2;
      if (ring2) {
        ring2.rotation.y = -now * 0.9 + offset + 2.0;
      }
    }

    // --- Wall animations ---
    if (group.userData.isWall) {
      // Repair pulse: glow brighter during repair
      if (b.constructionState === 'repairing') {
        const pulse = 0.3 + 0.4 * Math.sin(now * 6);
        const wGlows = group.userData.glowParts;
        if (wGlows) {
          for (let j = 0; j < wGlows.length; j++) {
            wGlows[j].material.opacity = pulse;
          }
        }
      }
      // Damage glow: intensify accent at low HP
      if (b.hp < b.maxHp * 0.5) {
        const dmgFlicker = Math.random() > 0.85 ? 0.3 : 0;
        const wGlows = group.userData.glowParts;
        if (wGlows && !b.constructionState) {
          for (let j = 0; j < wGlows.length; j++) {
            const m = wGlows[j].material;
            if (!m.userData) m.userData = {};
            if (m.userData.baseOpacity == null) m.userData.baseOpacity = m.opacity;
            m.opacity = m.userData.baseOpacity + dmgFlicker;
          }
        }
      }
    }

    // Core orbital ring spin animation
    if (group.userData.orbitRings) {
      const rings = group.userData.orbitRings;
      if (rings[0]) rings[0].rotation.y = now * 0.6 + offset;
      if (rings[1]) rings[1].rotation.y = -now * 0.45 + offset + 1.5;
    }

    // Glow parts opacity pulse (non-turret buildings)
    const glowParts = group.userData.glowParts;
    if (glowParts) {
      for (let j = 0; j < glowParts.length; j++) {
        const mat = glowParts[j].material;
        if (mat.transparent) {
          const baseOpacity = mat.userData?.baseOpacity ?? mat.opacity;
          if (!mat.userData) mat.userData = {};
          mat.userData.baseOpacity = baseOpacity;
          mat.opacity = baseOpacity + 0.1 * Math.sin(now * 2.5 + offset);
        }
      }
    }

    // Build progress visual: scale up during construction
    const isUpgradeable = b.type === BTYPE_TURRET || b.type === BTYPE_BARRACKS || b.type === BTYPE_FACTORY || b.type === BTYPE_GENERATOR || b.type === BTYPE_HELIPAD || b.type === BTYPE_WALL;
    if (isUpgradeable) {
      if (b.constructionState === 'building') {
        const progress = b.constructionTimer / b.constructionDuration;
        group.scale.setScalar(0.3 + 0.7 * progress);
      } else {
        group.scale.setScalar(1);
      }
    } else if (b.buildProgress < b.buildTime) {
      const progress = b.buildProgress / b.buildTime;
      group.scale.setScalar(0.3 + 0.7 * progress);
    } else {
      group.scale.setScalar(1);
    }

    // HP-reactive damage emissive (buildings shift toward red/orange when below 50% HP)
    const hpR = b.hp / b.maxHp;
    if (hpR < 0.5) {
      const t = 1 - hpR * 2; // 0 at 50% HP, 1 at 0% HP
      const damageColor = new THREE.Color(0.8, 0.2, 0.0);
      group.traverse(ch => {
        if (ch.isMesh && ch.material.emissive) {
          const orig = ch.material.userData?._origEmissive;
          if (orig) {
            ch.material.emissive.copy(orig).lerp(damageColor, t * 0.5);
            ch.material.emissiveIntensity = 1.0 + t * 0.5;
          }
        }
      });
    } else {
      group.traverse(ch => {
        if (ch.isMesh && ch.material.emissive) {
          const orig = ch.material.userData?._origEmissive;
          if (orig) {
            ch.material.emissive.copy(orig);
          }
          ch.material.emissiveIntensity = 1.0;
        }
      });
    }

    // Hit flash (overrides damage emissive temporarily)
    if (b.hitFlashTimer && b.hitFlashTimer > 0) {
      const t = b.hitFlashTimer / HIT_FLASH_DURATION;
      setGroupEmissive(group, t);
      b.hitFlashTimer -= dt;
      if (b.hitFlashTimer < 0) b.hitFlashTimer = 0;
    }
  }
}

function updatePulseTurretAnim(group, b, now, dt) {
  // Turret aiming — rotate turretPivot Y to aim at target
  // Barrel is built along +X in turretPivot local space, so:
  // rotation.y = atan2(-(targetZ - buildingZ), targetX - buildingX)
  if (group.userData.turretPivot) {
    if (b.targetX !== undefined && b.targetZ !== undefined) {
      const dx = b.targetX - b.x;
      const dz = b.targetZ - b.z;
      const targetAngle = Math.atan2(-dz, dx);
      // Smooth rotation toward target
      let current = group.userData.turretPivot.rotation.y;
      let diff = targetAngle - current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      group.userData.turretPivot.rotation.y = current + diff * 0.15;
    }
  }

  // Disc spin
  if (group.userData.disc && dt) {
    group.userData.disc.rotation.y += dt * 1.5;
  }

  // Muzzle flash + barrel recoil
  const fireAge = performance.now() - (b.lastFireTime || 0);

  if (fireAge < 250) {
    // Muzzle flash
    const mf = group.userData.muzzleFlash;
    if (mf) {
      mf.visible = fireAge < 120;
      const flashScale = 4 * Math.max(0, 1 - fireAge / 120);
      mf.scale.setScalar(flashScale);
    }

    // Barrel recoil
    const barrel = group.userData.barrel;
    if (barrel) {
      const maxRecoil = (b.branch === 'A') ? 2 : 3.5;
      const decayMs = (b.branch === 'A') ? 100 : 200;
      const recoil = maxRecoil * Math.exp(-fireAge * 4 / decayMs);
      const baseDist = group.userData.barrelDist || 9;
      barrel.position.x = baseDist - recoil;
    }
  } else {
    // Reset
    const mf = group.userData.muzzleFlash;
    if (mf) mf.visible = false;

    const barrel = group.userData.barrel;
    if (barrel) {
      barrel.position.x = group.userData.barrelDist || 9;
    }
  }

  // Construction state visual: dim during upgrading/branching
  if (b.constructionState === 'upgrading' || b.constructionState === 'branching') {
    const pulse = 0.5 + 0.3 * Math.sin(now * 4);
    group.traverse(child => {
      if (child.isMesh && child.material && child.material.opacity !== undefined && child.material.transparent) {
        child.material.opacity = pulse * 0.5;
      }
    });
  }
}

function updateProductionBuildingAnim(group, b, now) {
  // Production buildings don't have turret-specific anims,
  // but we can add a subtle pulse when upgrading/branching
  if (b.constructionState === 'upgrading' || b.constructionState === 'branching') {
    const pulse = 0.5 + 0.3 * Math.sin(now * 4);
    group.traverse(child => {
      if (child.isMesh && child.material && child.material.opacity !== undefined && child.material.transparent) {
        child.material.opacity = pulse * 0.5;
      }
    });
  }
}

/**
 * Remove a building mesh from the scene and dispose geometry/materials.
 */
export function removeBuildingMesh(building, scene) {
  if (!building.mesh) return;
  scene.remove(building.mesh);
  disposeGroup(building.mesh);
  building.mesh = null;
}

// ---- Generator (1x1) — dispatches to level-based builder ----
function buildGeneratorMesh(group, building) {
  const c = toColor(COLORS.GOLD);

  if (building.branch === 'A')       _buildGeneratorBranchA(group, c);
  else if (building.branch === 'B')  _buildGeneratorBranchB(group, c);
  else if (building.level >= 2)      _buildGeneratorL2(group, c);
  else if (building.level >= 1)      _buildGeneratorL1(group, c);
  else                               _buildGeneratorL0(group, c);

  group.userData.isGenerator = true;
}

// ---- Generator L0: Base energy structure ----
function _buildGeneratorL0(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(c);
  const glwMat = makeGlowMaterial(c, 0.18);
  const accentParts = [];
  const glowParts = [];

  // Hexagonal pedestal base
  const pedestal = new THREE.Mesh(_bHex.clone(), strMat);
  pedestal.scale.set(16, 6, 16);
  pedestal.position.y = 3;
  group.add(pedestal);

  // Accent ring on top of pedestal
  const baseRing = new THREE.Mesh(_bRing.clone(), accMat);
  baseRing.scale.set(20, 20, 20);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 6.5;
  group.add(baseRing);
  accentParts.push(baseRing);

  // Support pillars (3 small columns around core)
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i;
    const px = Math.cos(angle) * 9;
    const pz = Math.sin(angle) * 9;
    const pillar = new THREE.Mesh(_bCyl.clone(), strMat);
    pillar.scale.set(2, 12, 2);
    pillar.position.set(px, 12, pz);
    group.add(pillar);

    const tip = new THREE.Mesh(_bSphere.clone(), accMat);
    tip.scale.set(3, 3, 3);
    tip.position.set(px, 19, pz);
    group.add(tip);
    accentParts.push(tip);
  }

  // Energy core (bright gold icosahedron floating above pedestal)
  const energyCore = new THREE.Mesh(_bIcosa.clone(), accMat);
  energyCore.scale.set(8, 8, 8);
  energyCore.position.y = 22;
  group.add(energyCore);
  accentParts.push(energyCore);

  // Glow halo around core
  const coreGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  coreGlow.scale.set(13, 13, 13);
  coreGlow.position.y = 22;
  group.add(coreGlow);
  glowParts.push(coreGlow);

  // Spinning energy ring around core
  const energyRing = new THREE.Mesh(_bRing.clone(), accMat);
  energyRing.scale.set(18, 18, 18);
  energyRing.position.y = 22;
  group.add(energyRing);
  accentParts.push(energyRing);

  // Second ring (counter-rotating, tilted)
  const energyRing2 = new THREE.Mesh(_bRing.clone(), glwMat);
  energyRing2.scale.set(15, 15, 15);
  energyRing2.position.y = 22;
  energyRing2.rotation.x = Math.PI / 3;
  group.add(energyRing2);
  glowParts.push(energyRing2);

  // Store references for animation
  group.userData.energyCore = energyCore;
  group.userData.energyRing = energyRing;
  group.userData.energyRing2 = energyRing2;
  group.userData.coreGlow = coreGlow;
  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Generator L1: + 3 extra pillars (6 total), accent ring at mid-section ----
function _buildGeneratorL1(group, c) {
  _buildGeneratorL0(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(c);
  const accentParts = group.userData.accentParts;

  // 3 extra support pillars (interleaved with existing 3)
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 / 3) * i + Math.PI / 3;
    const px = Math.cos(angle) * 11;
    const pz = Math.sin(angle) * 11;
    const pillar = new THREE.Mesh(_bCyl.clone(), strMat);
    pillar.scale.set(1.8, 14, 1.8);
    pillar.position.set(px, 13, pz);
    group.add(pillar);

    const tip = new THREE.Mesh(_bSphere.clone(), accMat);
    tip.scale.set(2.5, 2.5, 2.5);
    tip.position.set(px, 21, pz);
    group.add(tip);
    accentParts.push(tip);
  }

  // Accent ring at mid-section
  const midRing = new THREE.Mesh(_bRing.clone(), accMat);
  midRing.scale.set(14, 14, 14);
  midRing.rotation.x = Math.PI / 2;
  midRing.position.y = 14;
  group.add(midRing);
  accentParts.push(midRing);
}

// ---- Generator L2: + taller antenna mast, third energy ring, larger core glow ----
function _buildGeneratorL2(group, c) {
  _buildGeneratorL1(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(c);
  const glwMat = makeGlowMaterial(c, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Antenna mast on top
  const mast = new THREE.Mesh(_bCyl.clone(), strMat);
  mast.scale.set(1.5, 14, 1.5);
  mast.position.y = 33;
  group.add(mast);

  const mastTip = new THREE.Mesh(_bOcta.clone(), accMat);
  mastTip.scale.set(4, 4, 4);
  mastTip.position.y = 41;
  group.add(mastTip);
  accentParts.push(mastTip);

  // Third energy ring (horizontal, above core)
  const ring3 = new THREE.Mesh(_bRing.clone(), accMat);
  ring3.scale.set(12, 12, 12);
  ring3.rotation.x = Math.PI / 2;
  ring3.position.y = 28;
  group.add(ring3);
  accentParts.push(ring3);

  // Larger core glow sphere
  const bigGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  bigGlow.scale.set(18, 18, 18);
  bigGlow.position.y = 22;
  group.add(bigGlow);
  glowParts.push(bigGlow);
}

// ---- Generator Branch A "Overcharge": extra-large pulsing core, electric arcs, intense glow ----
function _buildGeneratorBranchA(group, c) {
  _buildGeneratorL2(group, c);

  const accMat = makeAccentMaterial(c);
  const glwMat = makeGlowMaterial(c, 0.3);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // Replace energy core with extra-large pulsing core
  const overCore = new THREE.Mesh(_bIcosa.clone(), accMat);
  overCore.scale.set(12, 12, 12);
  overCore.position.y = 22;
  group.add(overCore);
  accentParts.push(overCore);
  group.userData.energyCore = overCore;

  // Electric arc meshes (thin accent cylinders connecting pillar tips to core)
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 / 6) * i;
    const px = Math.cos(angle) * 10;
    const pz = Math.sin(angle) * 10;
    const arc = new THREE.Mesh(_bCyl.clone(), accMat);
    arc.scale.set(0.5, 14, 0.5);
    // Tilt arc to connect pillar tip area to core center
    const arcAngle = Math.atan2(10, 3); // roughly from y=19 to y=22
    arc.rotation.z = Math.PI / 2;
    arc.rotation.y = -angle;
    arc.position.set(px * 0.5, 20, pz * 0.5);
    group.add(arc);
    accentParts.push(arc);
  }

  // Intense glow sphere
  const intenseGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  intenseGlow.scale.set(24, 24, 24);
  intenseGlow.position.y = 22;
  group.add(intenseGlow);
  glowParts.push(intenseGlow);
}

// ---- Generator Branch B "Capacitor Network": capacitor boxes, conduit lines, territory glow ring ----
function _buildGeneratorBranchB(group, c) {
  _buildGeneratorL2(group, c);

  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(c);
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  // 4 capacitor boxes around base
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 4) + (Math.PI / 2) * i;
    const bx = Math.cos(angle) * 16;
    const bz = Math.sin(angle) * 16;

    // Capacitor box body
    const cap = new THREE.Mesh(_bBox.clone(), strMat);
    cap.scale.set(5, 8, 5);
    cap.position.set(bx, 4, bz);
    group.add(cap);

    // Accent top on capacitor
    const capTop = new THREE.Mesh(_bBox.clone(), accMat);
    capTop.scale.set(5.5, 1, 5.5);
    capTop.position.set(bx, 8.5, bz);
    group.add(capTop);
    accentParts.push(capTop);

    // Conduit line from capacitor to core base
    const conduit = new THREE.Mesh(_bCyl.clone(), accMat);
    conduit.scale.set(0.4, 16, 0.4);
    conduit.rotation.z = Math.PI / 2;
    conduit.rotation.y = -angle;
    conduit.position.set(bx * 0.5, 6, bz * 0.5);
    group.add(conduit);
    accentParts.push(conduit);
  }

  // Wide territory glow ring on ground
  const territoryRing = new THREE.Mesh(_bRing.clone(), glwMat);
  territoryRing.scale.set(30, 30, 30);
  territoryRing.rotation.x = Math.PI / 2;
  territoryRing.position.y = 0.3;
  group.add(territoryRing);
  glowParts.push(territoryRing);
}

// ---- Helipad (2x2) — dispatches to level-based builder ----
function buildHelipadMesh(group, building) {
  const teamColor = building.team === TEAM_PLAYER ? COLORS.PLAYER : COLORS.ENEMY;
  const c = toColor(teamColor);

  if (building.branch === 'A')       _buildHelipadBranchA(group, c);
  else if (building.branch === 'B')  _buildHelipadBranchB(group, c);
  else if (building.level >= 2)      _buildHelipadL2(group, c);
  else if (building.level >= 1)      _buildHelipadL1(group, c);
  else                               _buildHelipadL0(group, c);

  group.userData.isHelipad = true;
}

// ---- Helipad L0: Base landing pad ----
function _buildHelipadL0(group, c) {
  const heliColor = toColor(COLORS.HELIPAD);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(heliColor);
  const glwMat = makeGlowMaterial(heliColor, 0.12);
  const accentParts = [];
  const glowParts = [];

  const padSize = TILE_SIZE * 2; // 80 world units

  // Base platform
  const base = new THREE.Mesh(_bBox.clone(), strMat);
  base.scale.set(padSize, 3, padSize);
  base.position.y = 1.5;
  group.add(base);

  // Platform edge trim
  const trim = new THREE.Mesh(_bBox.clone(), accMat);
  trim.scale.set(padSize + 2, 0.8, padSize + 2);
  trim.position.y = 3.2;
  group.add(trim);
  accentParts.push(trim);

  // Raised inner landing surface
  const inner = new THREE.Mesh(_bBox.clone(), strMat);
  inner.scale.set(padSize * 0.75, 1.5, padSize * 0.75);
  inner.position.y = 3.8;
  group.add(inner);

  // "H" marking
  const hY = 4.8;
  const barW = 3;
  const barH = 0.4;
  const hHeight = padSize * 0.35;
  const hWidth = padSize * 0.25;

  const hL = new THREE.Mesh(_bBox.clone(), accMat);
  hL.scale.set(barW, barH, hHeight);
  hL.position.set(-hWidth / 2, hY, 0);
  group.add(hL);
  accentParts.push(hL);

  const hR = new THREE.Mesh(_bBox.clone(), accMat);
  hR.scale.set(barW, barH, hHeight);
  hR.position.set(hWidth / 2, hY, 0);
  group.add(hR);
  accentParts.push(hR);

  const hC = new THREE.Mesh(_bBox.clone(), accMat);
  hC.scale.set(hWidth + barW, barH, barW);
  hC.position.set(0, hY, 0);
  group.add(hC);
  accentParts.push(hC);

  const hGlow = new THREE.Mesh(_bPlane.clone(), makeGlowMaterial(heliColor, 0.08));
  hGlow.scale.set(hWidth + barW + 6, hHeight + 6, 1);
  hGlow.rotation.x = -Math.PI / 2;
  hGlow.position.y = 4.6;
  group.add(hGlow);
  glowParts.push(hGlow);

  // Corner lights (4)
  const halfPad = padSize * 0.42;
  const cornerPositions = [
    [-halfPad, 5, -halfPad],
    [halfPad, 5, -halfPad],
    [-halfPad, 5, halfPad],
    [halfPad, 5, halfPad],
  ];

  for (const [cx, cy, cz] of cornerPositions) {
    const post = new THREE.Mesh(_bCyl.clone(), strMat);
    post.scale.set(1.5, 6, 1.5);
    post.position.set(cx, 3, cz);
    group.add(post);

    const light = new THREE.Mesh(_bSphere.clone(), accMat);
    light.scale.setScalar(3);
    light.position.set(cx, cy + 2, cz);
    group.add(light);
    accentParts.push(light);

    const halo = new THREE.Mesh(_bSphere.clone(), glwMat);
    halo.scale.setScalar(5);
    halo.position.set(cx, cy + 2, cz);
    group.add(halo);
    glowParts.push(halo);
  }

  // Perimeter ring
  const perimRing = new THREE.Mesh(_bRing.clone(), glwMat);
  perimRing.scale.set(padSize * 0.9, padSize * 0.9, padSize * 0.9);
  perimRing.rotation.x = Math.PI / 2;
  perimRing.position.y = 4;
  group.add(perimRing);
  glowParts.push(perimRing);

  // Side accent strips
  const stripMat = makeAccentMaterial(heliColor);
  for (let side = -1; side <= 1; side += 2) {
    const strip = new THREE.Mesh(_bBox.clone(), stripMat);
    strip.scale.set(padSize * 0.8, 0.5, 0.8);
    strip.position.set(0, 3, side * (padSize * 0.48));
    group.add(strip);
    accentParts.push(strip);

    const strip2 = new THREE.Mesh(_bBox.clone(), stripMat);
    strip2.scale.set(0.8, 0.5, padSize * 0.8);
    strip2.position.set(side * (padSize * 0.48), 3, 0);
    group.add(strip2);
    accentParts.push(strip2);
  }

  // Control tower / antenna (one corner)
  const towerX = halfPad - 5;
  const towerZ = -halfPad + 5;

  const tBase = new THREE.Mesh(_bBox.clone(), strMat);
  tBase.scale.set(5, 10, 5);
  tBase.position.set(towerX, 5, towerZ);
  group.add(tBase);

  const tBand = new THREE.Mesh(_bBox.clone(), accMat);
  tBand.scale.set(5.5, 1, 5.5);
  tBand.position.set(towerX, 10.5, towerZ);
  group.add(tBand);
  accentParts.push(tBand);

  const mast = new THREE.Mesh(_bCyl.clone(), strMat);
  mast.scale.set(0.8, 12, 0.8);
  mast.position.set(towerX, 17, towerZ);
  group.add(mast);

  const antTip = new THREE.Mesh(_bSphere.clone(), accMat);
  antTip.scale.setScalar(2);
  antTip.position.set(towerX, 23.5, towerZ);
  group.add(antTip);
  accentParts.push(antTip);

  const antGlow = new THREE.Mesh(_bSphere.clone(), makeGlowMaterial(heliColor, 0.2));
  antGlow.scale.setScalar(3.5);
  antGlow.position.set(towerX, 23.5, towerZ);
  group.add(antGlow);
  glowParts.push(antGlow);

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Helipad L1: + fuel tanks, extra accent strips, taller corner posts ----
function _buildHelipadL1(group, c) {
  _buildHelipadL0(group, c);

  const heliColor = toColor(COLORS.HELIPAD);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(heliColor);
  const accentParts = group.userData.accentParts;

  const padSize = TILE_SIZE * 2;
  const halfPad = padSize * 0.42;

  // Fuel tanks (2 cylinders on one side)
  for (let i = -1; i <= 1; i += 2) {
    const tank = new THREE.Mesh(_bCyl.clone(), strMat);
    tank.scale.set(4, 6, 4);
    tank.rotation.z = Math.PI / 2;
    tank.position.set(i * 14, 5, halfPad - 2);
    group.add(tank);

    const tankCap = new THREE.Mesh(_bSphere.clone(), accMat);
    tankCap.scale.set(4, 4, 4);
    tankCap.position.set(i * 14 + (i * 3), 5, halfPad - 2);
    group.add(tankCap);
    accentParts.push(tankCap);
  }

  // Extra accent strips on inner pad
  const stripMat = makeAccentMaterial(heliColor);
  for (let side = -1; side <= 1; side += 2) {
    const innerStrip = new THREE.Mesh(_bBox.clone(), stripMat);
    innerStrip.scale.set(padSize * 0.5, 0.3, 0.6);
    innerStrip.position.set(0, 4.9, side * (padSize * 0.2));
    group.add(innerStrip);
    accentParts.push(innerStrip);
  }

  // Taller corner posts (extend existing corner lights upward)
  const corners = [
    [-halfPad, -halfPad],
    [halfPad, -halfPad],
    [-halfPad, halfPad],
    [halfPad, halfPad],
  ];
  for (const [cx, cz] of corners) {
    const extPost = new THREE.Mesh(_bCyl.clone(), strMat);
    extPost.scale.set(1.2, 4, 1.2);
    extPost.position.set(cx, 10, cz);
    group.add(extPost);

    const extLight = new THREE.Mesh(_bSphere.clone(), accMat);
    extLight.scale.setScalar(2);
    extLight.position.set(cx, 12.5, cz);
    group.add(extLight);
    accentParts.push(extLight);
  }
}

// ---- Helipad L2: + radar dish, landing guide lights, perimeter fence posts ----
function _buildHelipadL2(group, c) {
  _buildHelipadL1(group, c);

  const heliColor = toColor(COLORS.HELIPAD);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(heliColor);
  const glwMat = makeGlowMaterial(heliColor, 0.15);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  const padSize = TILE_SIZE * 2;
  const halfPad = padSize * 0.42;
  const towerX = halfPad - 5;
  const towerZ = -halfPad + 5;

  // Radar dish on tower
  const dishPole = new THREE.Mesh(_bCyl.clone(), strMat);
  dishPole.scale.set(1, 6, 1);
  dishPole.position.set(towerX, 27, towerZ);
  group.add(dishPole);

  const dish = new THREE.Mesh(_bSphere.clone(), strMat);
  dish.scale.set(8, 3, 8);
  dish.position.set(towerX, 31, towerZ);
  group.add(dish);

  const dishTip = new THREE.Mesh(_bSphere.clone(), accMat);
  dishTip.scale.set(2, 2, 2);
  dishTip.position.set(towerX, 33, towerZ);
  group.add(dishTip);
  accentParts.push(dishTip);

  // Landing guide lights on inner pad (4 pairs along pad edges)
  for (let i = -1; i <= 1; i += 2) {
    for (let j = -1; j <= 1; j += 2) {
      const guideLight = new THREE.Mesh(_bSphere.clone(), accMat);
      guideLight.scale.setScalar(1.5);
      guideLight.position.set(i * 18, 5, j * 18);
      group.add(guideLight);
      accentParts.push(guideLight);

      const guideGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
      guideGlow.scale.setScalar(3);
      guideGlow.position.set(i * 18, 5, j * 18);
      group.add(guideGlow);
      glowParts.push(guideGlow);
    }
  }

  // Perimeter fence posts (8 posts around edge)
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i;
    const fx = Math.cos(angle) * (halfPad + 2);
    const fz = Math.sin(angle) * (halfPad + 2);
    const fencePost = new THREE.Mesh(_bBox.clone(), strMat);
    fencePost.scale.set(1, 8, 1);
    fencePost.position.set(fx, 4, fz);
    group.add(fencePost);

    const fenceTop = new THREE.Mesh(_bSphere.clone(), accMat);
    fenceTop.scale.setScalar(1.2);
    fenceTop.position.set(fx, 8.5, fz);
    group.add(fenceTop);
    accentParts.push(fenceTop);
  }
}

// ---- Helipad Branch A "Gunship Bay": weapon racks, heavy gantry, ammo crates ----
function _buildHelipadBranchA(group, c) {
  _buildHelipadL2(group, c);

  const heliColor = toColor(COLORS.HELIPAD);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(heliColor);
  const glwMat = makeGlowMaterial(heliColor, 0.2);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  const padSize = TILE_SIZE * 2;
  const halfPad = padSize * 0.42;

  // Weapon rack boxes (2 on each side)
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 2; i++) {
      const rackZ = -12 + i * 24;
      const rack = new THREE.Mesh(_bBox.clone(), strMat);
      rack.scale.set(6, 5, 10);
      rack.position.set(side * (halfPad - 8), 2.5, rackZ);
      group.add(rack);

      const rackAccent = new THREE.Mesh(_bBox.clone(), accMat);
      rackAccent.scale.set(6.5, 0.8, 10.5);
      rackAccent.position.set(side * (halfPad - 8), 5.5, rackZ);
      group.add(rackAccent);
      accentParts.push(rackAccent);
    }
  }

  // Heavy gantry crane over pad
  for (let cx = -1; cx <= 1; cx += 2) {
    const gantryLeg = new THREE.Mesh(_bBox.clone(), strMat);
    gantryLeg.scale.set(3, 28, 3);
    gantryLeg.position.set(cx * 28, 14, 0);
    group.add(gantryLeg);
  }

  const gantryBeam = new THREE.Mesh(_bBox.clone(), strMat);
  gantryBeam.scale.set(60, 3, 4);
  gantryBeam.position.set(0, 29, 0);
  group.add(gantryBeam);

  const gantryAccent = new THREE.Mesh(_bBox.clone(), accMat);
  gantryAccent.scale.set(62, 0.8, 1);
  gantryAccent.position.set(0, 31, 0);
  group.add(gantryAccent);
  accentParts.push(gantryAccent);

  // Ammo crate meshes (small boxes near weapon racks)
  for (let i = 0; i < 3; i++) {
    const crateX = -16 + i * 16;
    const crate = new THREE.Mesh(_bBox.clone(), strMat);
    crate.scale.set(4, 3, 4);
    crate.position.set(crateX, 1.5, halfPad - 10);
    group.add(crate);

    const crateMark = new THREE.Mesh(_bBox.clone(), accMat);
    crateMark.scale.set(2, 0.3, 2);
    crateMark.position.set(crateX, 3.2, halfPad - 10);
    group.add(crateMark);
    accentParts.push(crateMark);
  }

  // Gunship bay glow (intense floor glow)
  const bayGlow = new THREE.Mesh(_bPlane.clone(), glwMat);
  bayGlow.scale.set(50, 50, 1);
  bayGlow.rotation.x = -Math.PI / 2;
  bayGlow.position.y = 4.7;
  group.add(bayGlow);
  glowParts.push(bayGlow);
}

// ---- Helipad Branch B "Rapid Scramble": speed lines, dual launch rails, extra beacons ----
function _buildHelipadBranchB(group, c) {
  _buildHelipadL2(group, c);

  const heliColor = toColor(COLORS.HELIPAD);
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(heliColor);
  const glwMat = makeGlowMaterial(heliColor, 0.18);
  const accentParts = group.userData.accentParts;
  const glowParts = group.userData.glowParts;

  const padSize = TILE_SIZE * 2;
  const halfPad = padSize * 0.42;

  // Speed-line strips along pad
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 3; i++) {
      const speedLine = new THREE.Mesh(_bBox.clone(), accMat);
      speedLine.scale.set(padSize * 0.7, 0.3, 0.5);
      speedLine.position.set(0, 4.9, side * (8 + i * 6));
      group.add(speedLine);
      accentParts.push(speedLine);
    }
  }

  // Dual launch rail tracks
  for (let side = -1; side <= 1; side += 2) {
    const rail = new THREE.Mesh(_bBox.clone(), strMat);
    rail.scale.set(padSize * 0.85, 2, 3);
    rail.position.set(0, 3.5, side * 22);
    group.add(rail);

    const railAccent = new THREE.Mesh(_bBox.clone(), accMat);
    railAccent.scale.set(padSize * 0.85, 0.5, 1);
    railAccent.position.set(0, 4.8, side * 22);
    group.add(railAccent);
    accentParts.push(railAccent);
  }

  // Extra beacon lights (4 tall beacons at mid-edges)
  const beaconPositions = [
    [0, -halfPad],
    [0, halfPad],
    [-halfPad, 0],
    [halfPad, 0],
  ];
  for (const [bx, bz] of beaconPositions) {
    const beaconPole = new THREE.Mesh(_bCyl.clone(), strMat);
    beaconPole.scale.set(1.5, 14, 1.5);
    beaconPole.position.set(bx, 7, bz);
    group.add(beaconPole);

    const beaconLight = new THREE.Mesh(_bSphere.clone(), accMat);
    beaconLight.scale.setScalar(3);
    beaconLight.position.set(bx, 15, bz);
    group.add(beaconLight);
    accentParts.push(beaconLight);

    const beaconGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
    beaconGlow.scale.setScalar(5);
    beaconGlow.position.set(bx, 15, bz);
    group.add(beaconGlow);
    glowParts.push(beaconGlow);
  }
}

// ---- Wall (1x1) — dispatches to level-based builder ----
function buildWallMesh(group, building) {
  const teamColor = building.team === TEAM_PLAYER ? COLORS.PLAYER : COLORS.ENEMY;
  const c = toColor(teamColor);
  const orientation = building.orientation || WALL_HORIZONTAL;
  const level = building.level;

  if (orientation === WALL_HORIZONTAL || orientation === WALL_VERTICAL) {
    // Build standard flat wall
    if (level >= 2)      _buildWallL2(group, c);
    else if (level >= 1) _buildWallL1(group, c);
    else                 _buildWallL0(group, c);
    // Rotate for vertical orientation
    if (orientation === WALL_VERTICAL) {
      group.rotation.y = Math.PI / 2;
    }
  } else {
    // Corner variants
    _buildWallCorner(group, c, level, orientation);
  }

  group.userData.isWall = true;
}

// ---- Wall L0: Simple barrier panel ----
function _buildWallL0(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.12);
  const accentParts = [];
  const glowParts = [];

  // Main barrier body — flat-ish panel
  const body = new THREE.Mesh(_bBox.clone(), strMat);
  body.scale.set(35, 25, 8);
  body.position.y = 12.5;
  group.add(body);

  // Top accent strip
  const topStrip = new THREE.Mesh(_bBox.clone(), accMat);
  topStrip.scale.set(36, 1.5, 9);
  topStrip.position.y = 25.5;
  group.add(topStrip);
  accentParts.push(topStrip);

  // Bottom accent strip
  const bottomStrip = new THREE.Mesh(_bBox.clone(), accMat);
  bottomStrip.scale.set(36, 1, 9);
  bottomStrip.position.y = 0.5;
  group.add(bottomStrip);
  accentParts.push(bottomStrip);

  // Subtle top glow
  const topGlow = new THREE.Mesh(_bBox.clone(), glwMat);
  topGlow.scale.set(37, 2, 10);
  topGlow.position.y = 26;
  group.add(topGlow);
  glowParts.push(topGlow);

  // Side accent posts
  for (let side = -1; side <= 1; side += 2) {
    const post = new THREE.Mesh(_bBox.clone(), strMat);
    post.scale.set(3, 27, 9);
    post.position.set(side * 17, 13.5, 0);
    group.add(post);

    const postCap = new THREE.Mesh(_bSphere.clone(), accMat);
    postCap.scale.set(3.5, 3.5, 3.5);
    postCap.position.set(side * 17, 27.5, 0);
    group.add(postCap);
    accentParts.push(postCap);
  }

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Wall L1: Taller and sturdier ----
function _buildWallL1(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.15);
  const accentParts = [];
  const glowParts = [];

  // Main body — taller
  const body = new THREE.Mesh(_bBox.clone(), strMat);
  body.scale.set(35, 35, 10);
  body.position.y = 17.5;
  group.add(body);

  // Reinforcement ridge down center
  const ridge = new THREE.Mesh(_bBox.clone(), strMat);
  ridge.scale.set(4, 33, 12);
  ridge.position.y = 17;
  group.add(ridge);

  // Top accent strip
  const topStrip = new THREE.Mesh(_bBox.clone(), accMat);
  topStrip.scale.set(36, 1.5, 11);
  topStrip.position.y = 35.5;
  group.add(topStrip);
  accentParts.push(topStrip);

  // Mid accent strip
  const midStrip = new THREE.Mesh(_bBox.clone(), accMat);
  midStrip.scale.set(34, 0.8, 10.5);
  midStrip.position.y = 22;
  group.add(midStrip);
  accentParts.push(midStrip);

  // Bottom accent strip
  const bottomStrip = new THREE.Mesh(_bBox.clone(), accMat);
  bottomStrip.scale.set(36, 1, 11);
  bottomStrip.position.y = 0.5;
  group.add(bottomStrip);
  accentParts.push(bottomStrip);

  // Top glow
  const topGlow = new THREE.Mesh(_bBox.clone(), glwMat);
  topGlow.scale.set(37, 2.5, 12);
  topGlow.position.y = 36;
  group.add(topGlow);
  glowParts.push(topGlow);

  // Side accent posts — taller with glow
  for (let side = -1; side <= 1; side += 2) {
    const post = new THREE.Mesh(_bBox.clone(), strMat);
    post.scale.set(3.5, 37, 11);
    post.position.set(side * 17, 18.5, 0);
    group.add(post);

    const postCap = new THREE.Mesh(_bOcta.clone(), accMat);
    postCap.scale.set(4, 4, 4);
    postCap.position.set(side * 17, 38, 0);
    group.add(postCap);
    accentParts.push(postCap);

    const postGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
    postGlow.scale.set(6, 6, 6);
    postGlow.position.set(side * 17, 38, 0);
    group.add(postGlow);
    glowParts.push(postGlow);
  }

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Wall L2: Tallest and most fortified ----
function _buildWallL2(group, c) {
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, 0.18);
  const accentParts = [];
  const glowParts = [];

  // Main body — tallest, thicker
  const body = new THREE.Mesh(_bBox.clone(), strMat);
  body.scale.set(35, 45, 12);
  body.position.y = 22.5;
  group.add(body);

  // Reinforcement ridges — two vertical struts
  for (let off = -1; off <= 1; off += 2) {
    const ridge = new THREE.Mesh(_bBox.clone(), strMat);
    ridge.scale.set(3, 43, 13);
    ridge.position.set(off * 10, 22, 0);
    group.add(ridge);
  }

  // Hexagonal panel detail on front
  const hexPanel = new THREE.Mesh(_bHex.clone(), strMat);
  hexPanel.scale.set(8, 1.5, 8);
  hexPanel.rotation.x = Math.PI / 2;
  hexPanel.position.set(0, 28, 7);
  group.add(hexPanel);

  const hexAccent = new THREE.Mesh(_bRing.clone(), accMat);
  hexAccent.scale.set(10, 10, 10);
  hexAccent.rotation.x = Math.PI / 2;
  hexAccent.position.set(0, 28, 7.5);
  group.add(hexAccent);
  accentParts.push(hexAccent);

  // Top accent strip — double
  const topStrip1 = new THREE.Mesh(_bBox.clone(), accMat);
  topStrip1.scale.set(36, 1.5, 13);
  topStrip1.position.y = 45.5;
  group.add(topStrip1);
  accentParts.push(topStrip1);

  const topStrip2 = new THREE.Mesh(_bBox.clone(), accMat);
  topStrip2.scale.set(34, 0.8, 12.5);
  topStrip2.position.y = 43;
  group.add(topStrip2);
  accentParts.push(topStrip2);

  // Mid accent strip
  const midStrip = new THREE.Mesh(_bBox.clone(), accMat);
  midStrip.scale.set(34, 0.8, 12.5);
  midStrip.position.y = 28;
  group.add(midStrip);
  accentParts.push(midStrip);

  // Bottom accent strip
  const bottomStrip = new THREE.Mesh(_bBox.clone(), accMat);
  bottomStrip.scale.set(36, 1.2, 13);
  bottomStrip.position.y = 0.6;
  group.add(bottomStrip);
  accentParts.push(bottomStrip);

  // Top glow — strongest
  const topGlow = new THREE.Mesh(_bBox.clone(), glwMat);
  topGlow.scale.set(37, 3, 14);
  topGlow.position.y = 46;
  group.add(topGlow);
  glowParts.push(topGlow);

  // Side accent posts — tallest with glow orbs
  for (let side = -1; side <= 1; side += 2) {
    const post = new THREE.Mesh(_bBox.clone(), strMat);
    post.scale.set(4, 47, 13);
    post.position.set(side * 17, 23.5, 0);
    group.add(post);

    const postCap = new THREE.Mesh(_bIcosa.clone(), accMat);
    postCap.scale.set(5, 5, 5);
    postCap.position.set(side * 17, 48, 0);
    group.add(postCap);
    accentParts.push(postCap);

    const postGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
    postGlow.scale.set(8, 8, 8);
    postGlow.position.set(side * 17, 48, 0);
    group.add(postGlow);
    glowParts.push(postGlow);

    // Vertical accent line on post
    const vLine = new THREE.Mesh(_bBox.clone(), accMat);
    vLine.scale.set(0.5, 40, 0.5);
    vLine.position.set(side * 17, 22, 7);
    group.add(vLine);
    accentParts.push(vLine);
  }

  // Hex panel glow
  const hexGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
  hexGlow.scale.set(10, 10, 4);
  hexGlow.position.set(0, 28, 8);
  group.add(hexGlow);
  glowParts.push(hexGlow);

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Wall Corner (L-shaped piece for all levels) ----
function _buildWallCorner(group, c, level, cornerType) {
  const glowOpacity = [0.12, 0.15, 0.18][level] || 0.12;
  const strMat = makeStructuralMaterial(c);
  const accMat = makeAccentMaterial(_brighter(c));
  const glwMat = makeGlowMaterial(c, glowOpacity);
  const accentParts = [];
  const glowParts = [];

  // Height and thickness scale with level
  const height = [25, 35, 45][level] || 25;
  const thickness = [8, 10, 12][level] || 8;
  const armLength = 18; // each arm is half the full wall width
  const halfH = height / 2;

  // Determine arm directions based on corner type
  // X arm direction and Z arm direction
  let xDir, zDir;
  switch (cornerType) {
    case WALL_CORNER_NE: xDir =  1; zDir = -1; break;
    case WALL_CORNER_NW: xDir = -1; zDir = -1; break;
    case WALL_CORNER_SE: xDir =  1; zDir =  1; break;
    case WALL_CORNER_SW: xDir = -1; zDir =  1; break;
    default:             xDir =  1; zDir = -1; break;
  }

  // --- X-axis arm ---
  const xArm = new THREE.Mesh(_bBox.clone(), strMat);
  xArm.scale.set(armLength, height, thickness);
  xArm.position.set(xDir * (armLength / 2), halfH, 0);
  group.add(xArm);

  // --- Z-axis arm ---
  const zArm = new THREE.Mesh(_bBox.clone(), strMat);
  zArm.scale.set(thickness, height, armLength);
  zArm.position.set(0, halfH, zDir * (armLength / 2));
  group.add(zArm);

  // --- Corner junction block (fills the corner gap) ---
  const junction = new THREE.Mesh(_bBox.clone(), strMat);
  junction.scale.set(thickness, height, thickness);
  junction.position.set(0, halfH, 0);
  group.add(junction);

  // --- Top accent strips on both arms ---
  const topStripX = new THREE.Mesh(_bBox.clone(), accMat);
  topStripX.scale.set(armLength + 1, 1.5, thickness + 1);
  topStripX.position.set(xDir * (armLength / 2), height + 0.5, 0);
  group.add(topStripX);
  accentParts.push(topStripX);

  const topStripZ = new THREE.Mesh(_bBox.clone(), accMat);
  topStripZ.scale.set(thickness + 1, 1.5, armLength + 1);
  topStripZ.position.set(0, height + 0.5, zDir * (armLength / 2));
  group.add(topStripZ);
  accentParts.push(topStripZ);

  // --- Top accent on junction ---
  const topJunction = new THREE.Mesh(_bBox.clone(), accMat);
  topJunction.scale.set(thickness + 1, 1.5, thickness + 1);
  topJunction.position.set(0, height + 0.5, 0);
  group.add(topJunction);
  accentParts.push(topJunction);

  // --- Bottom accent strips ---
  const bottomStripX = new THREE.Mesh(_bBox.clone(), accMat);
  bottomStripX.scale.set(armLength + 1, 1, thickness + 1);
  bottomStripX.position.set(xDir * (armLength / 2), 0.5, 0);
  group.add(bottomStripX);
  accentParts.push(bottomStripX);

  const bottomStripZ = new THREE.Mesh(_bBox.clone(), accMat);
  bottomStripZ.scale.set(thickness + 1, 1, armLength + 1);
  bottomStripZ.position.set(0, 0.5, zDir * (armLength / 2));
  group.add(bottomStripZ);
  accentParts.push(bottomStripZ);

  // --- Top glow on both arms ---
  const glowX = new THREE.Mesh(_bBox.clone(), glwMat);
  glowX.scale.set(armLength + 2, 2, thickness + 2);
  glowX.position.set(xDir * (armLength / 2), height + 1, 0);
  group.add(glowX);
  glowParts.push(glowX);

  const glowZ = new THREE.Mesh(_bBox.clone(), glwMat);
  glowZ.scale.set(thickness + 2, 2, armLength + 2);
  glowZ.position.set(0, height + 1, zDir * (armLength / 2));
  group.add(glowZ);
  glowParts.push(glowZ);

  // --- Corner post at the junction ---
  const cornerPost = new THREE.Mesh(_bBox.clone(), strMat);
  const postWidth = [3, 3.5, 4][level] || 3;
  cornerPost.scale.set(postWidth, height + 2, postWidth);
  cornerPost.position.set(0, halfH + 1, 0);
  group.add(cornerPost);

  // Corner post cap (grows with level)
  const capGeo = [_bSphere, _bOcta, _bIcosa][level] || _bSphere;
  const capSize = [3.5, 4, 5][level] || 3.5;
  const postCap = new THREE.Mesh(capGeo.clone(), accMat);
  postCap.scale.set(capSize, capSize, capSize);
  postCap.position.set(0, height + 3, 0);
  group.add(postCap);
  accentParts.push(postCap);

  // Corner post glow (L1 and L2 only)
  if (level >= 1) {
    const capGlowSize = [0, 6, 8][level] || 6;
    const postGlow = new THREE.Mesh(_bSphere.clone(), glwMat);
    postGlow.scale.set(capGlowSize, capGlowSize, capGlowSize);
    postGlow.position.set(0, height + 3, 0);
    group.add(postGlow);
    glowParts.push(postGlow);
  }

  // --- End-of-arm posts ---
  const endXPos = xDir * armLength;
  const endZPos = zDir * armLength;

  const endPostX = new THREE.Mesh(_bBox.clone(), strMat);
  endPostX.scale.set(postWidth, height + 2, thickness + 1);
  endPostX.position.set(endXPos, halfH + 1, 0);
  group.add(endPostX);

  const endCapX = new THREE.Mesh(capGeo.clone(), accMat);
  endCapX.scale.set(capSize, capSize, capSize);
  endCapX.position.set(endXPos, height + 3, 0);
  group.add(endCapX);
  accentParts.push(endCapX);

  const endPostZ = new THREE.Mesh(_bBox.clone(), strMat);
  endPostZ.scale.set(thickness + 1, height + 2, postWidth);
  endPostZ.position.set(0, halfH + 1, endZPos);
  group.add(endPostZ);

  const endCapZ = new THREE.Mesh(capGeo.clone(), accMat);
  endCapZ.scale.set(capSize, capSize, capSize);
  endCapZ.position.set(0, height + 3, endZPos);
  group.add(endCapZ);
  accentParts.push(endCapZ);

  // End post glow (L1 and L2 only)
  if (level >= 1) {
    const egSize = [0, 6, 8][level] || 6;
    const endGlowX = new THREE.Mesh(_bSphere.clone(), glwMat);
    endGlowX.scale.set(egSize, egSize, egSize);
    endGlowX.position.set(endXPos, height + 3, 0);
    group.add(endGlowX);
    glowParts.push(endGlowX);

    const endGlowZ = new THREE.Mesh(_bSphere.clone(), glwMat);
    endGlowZ.scale.set(egSize, egSize, egSize);
    endGlowZ.position.set(0, height + 3, endZPos);
    group.add(endGlowZ);
    glowParts.push(endGlowZ);
  }

  // --- L2 extra detail: reinforcement ridges and hex panel ---
  if (level >= 2) {
    // Mid accent strip on X arm
    const midStripX = new THREE.Mesh(_bBox.clone(), accMat);
    midStripX.scale.set(armLength - 2, 0.8, thickness + 0.5);
    midStripX.position.set(xDir * (armLength / 2), height * 0.6, 0);
    group.add(midStripX);
    accentParts.push(midStripX);

    // Mid accent strip on Z arm
    const midStripZ = new THREE.Mesh(_bBox.clone(), accMat);
    midStripZ.scale.set(thickness + 0.5, 0.8, armLength - 2);
    midStripZ.position.set(0, height * 0.6, zDir * (armLength / 2));
    group.add(midStripZ);
    accentParts.push(midStripZ);

    // Reinforcement ridges on X arm
    const ridgeX = new THREE.Mesh(_bBox.clone(), strMat);
    ridgeX.scale.set(3, height - 2, thickness + 1);
    ridgeX.position.set(xDir * (armLength / 2), halfH, 0);
    group.add(ridgeX);

    // Reinforcement ridges on Z arm
    const ridgeZ = new THREE.Mesh(_bBox.clone(), strMat);
    ridgeZ.scale.set(thickness + 1, height - 2, 3);
    ridgeZ.position.set(0, halfH, zDir * (armLength / 2));
    group.add(ridgeZ);
  }

  // L1 extra: mid accent strip
  if (level === 1) {
    const midStripX = new THREE.Mesh(_bBox.clone(), accMat);
    midStripX.scale.set(armLength - 2, 0.8, thickness + 0.5);
    midStripX.position.set(xDir * (armLength / 2), height * 0.6, 0);
    group.add(midStripX);
    accentParts.push(midStripX);

    const midStripZ = new THREE.Mesh(_bBox.clone(), accMat);
    midStripZ.scale.set(thickness + 0.5, 0.8, armLength - 2);
    midStripZ.position.set(0, height * 0.6, zDir * (armLength / 2));
    group.add(midStripZ);
    accentParts.push(midStripZ);
  }

  group.userData.accentParts = accentParts;
  group.userData.glowParts = glowParts;
}

// ---- Helpers ----

const _white = new THREE.Color(1, 1, 1);
function setGroupEmissive(group, intensity) {
  group.traverse(child => {
    if (child.isMesh && child.material.emissive) {
      const orig = child.material.userData?._origEmissive;
      if (orig) {
        child.material.emissive.copy(orig).lerp(_white, intensity);
      }
    }
  });
}

function disposeGroup(group) {
  group.traverse(child => {
    if (child.isMesh) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    }
  });
}
