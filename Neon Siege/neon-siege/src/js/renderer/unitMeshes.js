// ============================================================
// unitMeshes.js — Unit 3D models (reads Unit state, renders)
// Rich multi-part mechanical designs with per-type animations
// ============================================================
import * as THREE from 'three';
import { makeStructuralMaterial, makeAccentMaterial, makeGlowMaterial } from './scene.js';
import {
  UTYPE_RIFLE, UTYPE_ASSAULT, UTYPE_TANK, UTYPE_HELICOPTER,
  UTYPE_MEDIC, UTYPE_ENGINEER,
  COLORS, HELI_FLY_HEIGHT, AIRSTRIKE_BOMBER_HEIGHT,
  TEAM_PLAYER, TEAM_ENEMY, HIT_FLASH_DURATION,
  SELECTION_RING_COLOR, SQUAD_HIGHLIGHT_COLOR,
  MEDIC_COLOR, ENGINEER_COLOR,
} from '../config.js';

// ================================================================
// PUBLIC API
// ================================================================

/**
 * Create a 3D mesh group for a unit and add it to the scene.
 */
export function createUnitMesh(unit, scene) {
  const teamColor = unit.team === TEAM_PLAYER ? COLORS.UNIT_PLAYER : COLORS.UNIT_ENEMY;
  const isEnemy = unit.team === TEAM_ENEMY;
  const group = new THREE.Group();

  switch (unit.type) {
    case UTYPE_RIFLE:      buildRifleMesh(group, teamColor, isEnemy); break;
    case UTYPE_ASSAULT:    buildAssaultMesh(group, teamColor, isEnemy); break;
    case UTYPE_TANK:       buildTankMesh(group, teamColor, isEnemy); break;
    case UTYPE_HELICOPTER: buildHelicopterMesh(group, teamColor, isEnemy); group.scale.setScalar(1.8); break;
    case UTYPE_MEDIC:      buildMedicMesh(group, isEnemy); break;
    case UTYPE_ENGINEER:   buildEngineerMesh(group, isEnemy); break;
  }

  // Upgrade indicator — glowing ring for upgraded units
  if (unit.upgradeLevel > 0 || unit.upgradeBranch) {
    const ringCount = unit.upgradeBranch ? 3 : unit.upgradeLevel;
    const unitRadius = { [UTYPE_RIFLE]: 8, [UTYPE_ASSAULT]: 10, [UTYPE_TANK]: 16 }[unit.type] || 8;
    for (let r = 0; r < ringCount; r++) {
      const upgradeRing = new THREE.Mesh(
        new THREE.TorusGeometry(unitRadius + r * 1.5, 0.25, 4, 16),
        makeGlowMaterial(teamColor, 0.2)
      );
      upgradeRing.rotation.x = Math.PI / 2;
      upgradeRing.position.y = -1 + r * 1.2;
      group.add(upgradeRing);
      if (!group.userData.glowParts) group.userData.glowParts = [];
      group.userData.glowParts.push(upgradeRing);
    }
  }

  // --- Selection ring (bright white, blooms) ---
  const selRadius = { [UTYPE_RIFLE]: 12, [UTYPE_ASSAULT]: 15, [UTYPE_TANK]: 22, [UTYPE_HELICOPTER]: 16, [UTYPE_MEDIC]: 10, [UTYPE_ENGINEER]: 14 }[unit.type] || 12;
  const selRingGeo = new THREE.RingGeometry(selRadius - 1.5, selRadius, 32);
  const selRingMat = new THREE.MeshBasicMaterial({
    color: SELECTION_RING_COLOR,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const selRingMesh = new THREE.Mesh(selRingGeo, selRingMat);
  selRingMesh.rotation.x = -Math.PI / 2;
  selRingMesh.visible = false;
  group.add(selRingMesh);
  group.userData._selectionRing = selRingMesh;

  // --- Squad highlight ring (dimmer cyan, slightly larger) ---
  const sqRadius = selRadius + 3;
  const sqRingGeo = new THREE.RingGeometry(sqRadius - 1.2, sqRadius, 32);
  const sqRingMat = new THREE.MeshBasicMaterial({
    color: SQUAD_HIGHLIGHT_COLOR,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const sqRingMesh = new THREE.Mesh(sqRingGeo, sqRingMat);
  sqRingMesh.rotation.x = -Math.PI / 2;
  sqRingMesh.visible = false;
  group.add(sqRingMesh);
  group.userData._squadHighlightRing = sqRingMesh;

  const baseY = { [UTYPE_RIFLE]: 3, [UTYPE_ASSAULT]: 3, [UTYPE_TANK]: 2, [UTYPE_HELICOPTER]: HELI_FLY_HEIGHT, [UTYPE_MEDIC]: 3, [UTYPE_ENGINEER]: 2 }[unit.type] || 10;
  group.position.set(unit.x, baseY, unit.z);
  group.userData.baseY = baseY;
  group.userData.idOffset = unit.idOffset;
  group.userData.lastX = unit.x;
  group.userData.lastZ = unit.z;
  group.userData.smoothAngle = 0;

  scene.add(group);
  unit.mesh = group;
}

/**
 * Update all unit meshes each frame.
 * @param {number} now - current time in seconds
 * @param {Array} units - alive units
 * @param {number|null} selectedHeliId - ID of the selected helicopter (for selection ring), or null
 */
export function updateUnitMeshes(now, units, selectedHeliId) {
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u.mesh) continue;

    const group = u.mesh;
    const offset = group.userData.idOffset || 0;
    const utype = group.userData.unitType;

    // --- Sync position ---
    group.position.x = u.x;
    group.position.z = u.z;

    group.position.y = group.userData.baseY;

    // --- Facing + movement lean ---
    const dx = u.x - group.userData.lastX;
    const dz = u.z - group.userData.lastZ;
    const moved = dx * dx + dz * dz;

    if (moved > 0.01) {
      const angle = Math.atan2(dx, dz);
      const cur = group.userData.smoothAngle || 0;
      let diff = angle - cur;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const smooth = cur + diff * 0.12;
      group.rotation.y = smooth;
      group.userData.smoothAngle = smooth;

      if (utype === 'rifle') {
        // Subtle forward lean when moving
        group.rotation.x += (-0.06 - group.rotation.x) * 0.1;
      }
    } else if (u.targetX !== undefined && u.targetZ !== undefined && u.inCombat && utype !== 'helicopter') {
      // Face toward combat target when stopped
      const tdx = u.targetX - u.x;
      const tdz = u.targetZ - u.z;
      const targetAngle = Math.atan2(tdx, tdz);
      const cur = group.userData.smoothAngle || 0;
      let diff = targetAngle - cur;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const smooth = cur + diff * 0.15;
      group.rotation.y = smooth;
      group.userData.smoothAngle = smooth;
      group.rotation.z *= 0.92;
      group.rotation.x *= 0.92;
    } else {
      group.rotation.z *= 0.92;
      group.rotation.x *= 0.92;
    }
    group.userData.lastX = u.x;
    group.userData.lastZ = u.z;

    // --- Type-specific animation ---
    if (utype === 'rifle') animRifle(group, u, now, offset, moved);
    else if (utype === 'assault') animAssault(group, u, now, offset, moved);
    else if (utype === 'tank') animTank(group, u, now, offset, moved);
    else if (utype === 'medic' || utype === 'engineer') animSupportUnit(group, u, now, offset);
    else if (utype === 'helicopter') {
      animHelicopter(group, u, now, offset, moved);
      // Selection ring visibility
      const selRing = group.userData.selectRing;
      if (selRing) {
        const isSelected = selectedHeliId != null && u.id === selectedHeliId;
        selRing.visible = isSelected;
        if (isSelected) {
          selRing.material.opacity = 0.4 + 0.2 * Math.sin(now * 5);
          selRing.rotation.z += 0.02;
        }
      }
    }

    // --- Glow pulse (faster in combat) ---
    const glows = group.userData.glowParts;
    if (glows) {
      const speed = u.inCombat ? 6 : 3;
      const amp = u.inCombat ? 0.14 : 0.07;
      for (let j = 0; j < glows.length; j++) {
        const m = glows[j].material;
        if (m.transparent) {
          if (!m.userData) m.userData = {};
          if (m.userData.baseOp == null) m.userData.baseOp = m.opacity;
          m.opacity = m.userData.baseOp + amp * Math.sin(now * speed + offset);
        }
      }
    }

    // --- Enemy threat ring spin ---
    if (group.userData.threatRing) {
      group.userData.threatRing.rotation.y += 0.025;
      group.userData.threatRing.rotation.z = 0.25 * Math.sin(now * 1.5 + offset);
    }

    // --- HP-reactive damage glow ---
    const hpR = u.hp / u.maxHp;
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
      if (hpR < 0.25 && glows) {
        const flick = Math.random() > 0.82 ? 0.35 : 0;
        for (const g of glows) {
          const base = g.material.userData?.baseOp ?? g.material.opacity;
          g.material.opacity = base + flick;
        }
      }
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

    // --- Selection / squad highlight rings ---
    const selRing = group.userData._selectionRing;
    const sqRing = group.userData._squadHighlightRing;
    if (selRing) {
      selRing.visible = !!u.selected;
      // Keep ring flat at ground level beneath the unit (don't bob with unit)
      selRing.position.y = -group.userData.baseY + 0.5;
      if (selRing.visible) {
        selRing.material.opacity = 0.7 + 0.2 * Math.sin(now * 5 + offset);
      }
    }
    if (sqRing) {
      sqRing.visible = !!u.squadHighlight;
      sqRing.position.y = -group.userData.baseY + 0.3;
      if (sqRing.visible) {
        sqRing.material.opacity = 0.35 + 0.15 * Math.sin(now * 3 + offset);
      }
    }

    // --- Hit flash ---
    if (u.hitFlashTimer > 0) {
      setGroupEmissive(group, u.hitFlashTimer / HIT_FLASH_DURATION);
      u.hitFlashTimer -= 1 / 60;
      if (u.hitFlashTimer < 0) u.hitFlashTimer = 0;
    } else {
      setGroupEmissive(group, 0);
    }
  }
}

/**
 * Remove a unit mesh from the scene.
 */
export function removeUnitMesh(unit, scene) {
  if (!unit.mesh) return;
  scene.remove(unit.mesh);
  disposeGroup(unit.mesh);
  unit.mesh = null;
}

// ================================================================
// RIFLE — "Neon Trooper"
// Light bipedal infantry with armored torso, visor helmet,
// rifle weapon, shoulder guards, backpack power cell, boot thrusters
// ================================================================

function buildRifleMesh(group, color, isEnemy) {
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  // --- LEFT LEG GROUP (animated as one piece) ---
  const lLegGrp = new THREE.Group();
  group.add(lLegGrp);

  // Upper leg
  _m(lLegGrp, new THREE.CylinderGeometry(1.0, 1.4, 5, 6), S, -2.2, 3.5, 0);
  // Knee joint
  _m(lLegGrp, new THREE.SphereGeometry(1.2, 6, 4), A, -2.2, 1.2, 0.3);
  // Lower leg
  _m(lLegGrp, new THREE.CylinderGeometry(1.3, 0.9, 4.5, 6), S, -2.2, -1.2, 0.5);
  // Shin guard
  _m(lLegGrp, new THREE.BoxGeometry(1.4, 3.5, 0.8), S, -2.2, -0.8, 1.4);
  // Boot
  _m(lLegGrp, new THREE.BoxGeometry(2.2, 1.2, 3.5), S, -2.2, -3.2, 0.8);
  // Boot accent
  _m(lLegGrp, new THREE.BoxGeometry(1.8, 0.25, 3), A, -2.2, -2.6, 0.8);
  // Boot thruster glow
  const lBootGlow = _m(lLegGrp, new THREE.TorusGeometry(1.4, 0.25, 4, 8),
    makeGlowMaterial(color, 0.15), -2.2, -3.0, 0.8);
  lBootGlow.rotation.x = Math.PI / 2;

  // --- RIGHT LEG GROUP ---
  const rLegGrp = new THREE.Group();
  group.add(rLegGrp);

  _m(rLegGrp, new THREE.CylinderGeometry(1.0, 1.4, 5, 6), S, 2.2, 3.5, 0);
  _m(rLegGrp, new THREE.SphereGeometry(1.2, 6, 4), A, 2.2, 1.2, 0.3);
  _m(rLegGrp, new THREE.CylinderGeometry(1.3, 0.9, 4.5, 6), S, 2.2, -1.2, 0.5);
  _m(rLegGrp, new THREE.BoxGeometry(1.4, 3.5, 0.8), S, 2.2, -0.8, 1.4);
  _m(rLegGrp, new THREE.BoxGeometry(2.2, 1.2, 3.5), S, 2.2, -3.2, 0.8);
  _m(rLegGrp, new THREE.BoxGeometry(1.8, 0.25, 3), A, 2.2, -2.6, 0.8);
  const rBootGlow = _m(rLegGrp, new THREE.TorusGeometry(1.4, 0.25, 4, 8),
    makeGlowMaterial(color, 0.15), 2.2, -3.0, 0.8);
  rBootGlow.rotation.x = Math.PI / 2;

  // --- WAIST ---
  _m(group, new THREE.CylinderGeometry(2.8, 2.4, 2, 6), S, 0, 7, 0);
  const beltRing = _m(group, new THREE.TorusGeometry(2.9, 0.3, 4, 12), A, 0, 6.2, 0);
  beltRing.rotation.x = Math.PI / 2;

  // --- TORSO ---
  _m(group, new THREE.BoxGeometry(7, 6.5, 5), S, 0, 11.5, 0);

  // Front chest plate — angled
  const chest = _m(group, new THREE.BoxGeometry(6, 4, 1.2), S, 0, 12, 3);
  chest.rotation.x = -0.1;

  // Chest accent vent slits
  for (let i = 0; i < 2; i++) {
    _m(group, new THREE.BoxGeometry(4, 0.2, 0.15), A, 0, 10.5 + i * 1.4, 3.4);
  }

  // Side torso panels
  _m(group, new THREE.BoxGeometry(0.8, 4.5, 4), S, -4, 11.5, 0);
  _m(group, new THREE.BoxGeometry(0.8, 4.5, 4), S, 4, 11.5, 0);

  // --- SHOULDER GUARDS ---
  const lShGrp = new THREE.Group();
  lShGrp.position.set(-5.5, 14, 0);
  group.add(lShGrp);
  _m(lShGrp, new THREE.BoxGeometry(3.5, 2.5, 4), S, 0, 0, 0);
  _m(lShGrp, new THREE.BoxGeometry(3, 0.3, 3.5), A, 0, 1.5, 0);

  const rShGrp = new THREE.Group();
  rShGrp.position.set(5.5, 14, 0);
  group.add(rShGrp);
  _m(rShGrp, new THREE.BoxGeometry(3.5, 2.5, 4), S, 0, 0, 0);
  _m(rShGrp, new THREE.BoxGeometry(3, 0.3, 3.5), A, 0, 1.5, 0);

  // --- ARMS ---
  // Left arm (holds rifle)
  _m(group, new THREE.SphereGeometry(1.1, 6, 4), A, -5.5, 12.5, 0.5);
  _m(group, new THREE.CylinderGeometry(0.8, 1, 4.5, 6), S, -5.5, 10, 1).rotation.x = -0.2;
  _m(group, new THREE.SphereGeometry(0.8, 6, 4), S, -5.5, 8, 1.5); // elbow

  // Right arm
  _m(group, new THREE.SphereGeometry(1.1, 6, 4), A, 5.5, 12.5, 0.5);
  _m(group, new THREE.CylinderGeometry(0.8, 1, 4.5, 6), S, 5.5, 10, 1).rotation.x = -0.2;
  _m(group, new THREE.SphereGeometry(0.8, 6, 4), S, 5.5, 8, 1.5);

  // --- RIFLE WEAPON (held forward-right) ---
  // Stock
  _m(group, new THREE.BoxGeometry(1, 1, 3), S, 2, 9, -1);
  // Receiver body
  _m(group, new THREE.BoxGeometry(1.2, 1.4, 5), S, 2, 9, 3);
  // Barrel
  const barrel = _m(group, new THREE.CylinderGeometry(0.25, 0.3, 8, 4), S, 2, 9, 9.5);
  barrel.rotation.x = -Math.PI / 2;
  // Barrel shroud
  _m(group, new THREE.CylinderGeometry(0.5, 0.5, 4, 6), S, 2, 9, 7).rotation.x = -Math.PI / 2;
  // Muzzle tip
  const muzzle = _m(group, new THREE.SphereGeometry(0.5, 6, 4), A, 2, 9, 13.5);
  // Muzzle glow
  const muzzleG = _m(group, new THREE.SphereGeometry(1.2, 6, 4),
    makeGlowMaterial(color, 0.15), 2, 9, 13.5);
  // Magazine accent
  _m(group, new THREE.BoxGeometry(0.6, 2.2, 1), A, 2, 7.8, 2.5);

  // --- HEAD ---
  // Neck
  _m(group, new THREE.CylinderGeometry(1.0, 1.4, 1.5, 6), S, 0, 15.5, 0.3);
  // Helmet
  const head = _m(group, new THREE.BoxGeometry(3.5, 3, 3.8), S, 0, 17.5, 0.3);
  // Helmet top ridge
  _m(group, new THREE.BoxGeometry(0.8, 1.2, 3.5), S, 0, 19.3, 0.3);
  // Visor — bright scanning slit
  const visor = _m(group, new THREE.BoxGeometry(3.6, 1.1, 0.6), A, 0, 17.5, 2.3);
  // Visor glow
  _m(group, new THREE.BoxGeometry(4, 1.4, 0.3), makeGlowMaterial(color, 0.25), 0, 17.5, 2.5);
  // Antenna nub
  _m(group, new THREE.CylinderGeometry(0.15, 0.15, 2.5, 4), S, 1.5, 19.8, 0.3);
  const antTip = _m(group, new THREE.SphereGeometry(0.35, 6, 4), A, 1.5, 21.2, 0.3);

  // --- BACKPACK POWER CELL ---
  _m(group, new THREE.BoxGeometry(4.5, 4, 2.5), S, 0, 12, -3.5);
  // Power cell accent lines
  _m(group, new THREE.BoxGeometry(3, 0.25, 0.2), A, 0, 13.5, -2.3);
  _m(group, new THREE.BoxGeometry(3, 0.25, 0.2), A, 0, 11.5, -2.3);
  // Power cell core
  const cellCore = _m(group, new THREE.SphereGeometry(1, 6, 4), A, 0, 12, -2.5);
  const cellGlow = _m(group, new THREE.SphereGeometry(1.8, 6, 4),
    makeGlowMaterial(color, 0.14), 0, 12, -2.5);

  // --- GROUND INDICATOR RING (visibility aid) ---
  const groundRing = _m(group, new THREE.TorusGeometry(5, 0.5, 4, 14), A, 0, 0.5, 0);
  groundRing.rotation.x = Math.PI / 2;

  // --- ENEMY THREAT RING ---
  if (isEnemy) {
    const threat = _m(group, new THREE.TorusGeometry(9, 0.35, 6, 18), A, 0, 10, 0);
    threat.rotation.x = Math.PI / 4;
    group.userData.threatRing = threat;
  }

  group.userData.accentParts = [visor, beltRing, antTip, cellCore, muzzle, groundRing];
  group.userData.glowParts = [lBootGlow, rBootGlow, cellGlow, muzzleG];
  group.userData.muzzleFlash = muzzle;
  group.userData.muzzleGlow = muzzleG;
  group.userData.head = head;
  group.userData.lLegGrp = lLegGrp;
  group.userData.rLegGrp = rLegGrp;
  group.userData.lShoulder = lShGrp;
  group.userData.rShoulder = rShGrp;
  group.userData.unitType = 'rifle';
}

// ================================================================
// ASSAULT — "Heavy Walker"
// Bipedal combat mech with armored torso, shoulder pauldrons,
// dual weapon arms, scanning head, chest reactor, back power pack
// ================================================================

function buildAssaultMesh(group, color, isEnemy) {
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  // --- LEFT LEG GROUP (animated as one piece) ---
  const lLegGrp = new THREE.Group();
  group.add(lLegGrp);

  // Upper leg
  const ulGeo = new THREE.CylinderGeometry(1.6, 2.2, 8, 6);
  _m(lLegGrp, ulGeo, S, -4, 6, 0).rotation.z = 0.1;

  // Knee joint — accent sphere
  _m(lLegGrp, new THREE.SphereGeometry(1.8, 6, 4), A, -4.5, 3, 0.5);

  // Lower leg — reverse-joint style
  _m(lLegGrp, new THREE.CylinderGeometry(2, 1.4, 7, 6), S, -4.5, -0.5, 1);

  // Shin armor plate
  _m(lLegGrp, new THREE.BoxGeometry(2.2, 5, 1.2), S, -4.5, 0, 2.2);

  // Foot — angular pad
  _m(lLegGrp, new THREE.BoxGeometry(3.5, 1.5, 5.5), S, -4.5, -3.8, 1.5);

  // Foot accent
  _m(lLegGrp, new THREE.BoxGeometry(3, 0.3, 4.5), A, -4.5, -3, 1.5);

  // Ankle joint
  _m(lLegGrp, new THREE.SphereGeometry(1.2, 6, 4), A, -4.5, -2.8, 1);

  // --- RIGHT LEG GROUP ---
  const rLegGrp = new THREE.Group();
  group.add(rLegGrp);

  _m(rLegGrp, ulGeo, S, 4, 6, 0).rotation.z = -0.1;
  _m(rLegGrp, new THREE.SphereGeometry(1.8, 6, 4), A, 4.5, 3, 0.5);
  _m(rLegGrp, new THREE.CylinderGeometry(2, 1.4, 7, 6), S, 4.5, -0.5, 1);
  _m(rLegGrp, new THREE.BoxGeometry(2.2, 5, 1.2), S, 4.5, 0, 2.2);
  _m(rLegGrp, new THREE.BoxGeometry(3.5, 1.5, 5.5), S, 4.5, -3.8, 1.5);
  _m(rLegGrp, new THREE.BoxGeometry(3, 0.3, 4.5), A, 4.5, -3, 1.5);
  _m(rLegGrp, new THREE.SphereGeometry(1.2, 6, 4), A, 4.5, -2.8, 1);

  // --- WAIST / HIP JOINT ---
  _m(group, new THREE.CylinderGeometry(4, 3.5, 3, 8), S, 0, 11, 0);
  const waistRing = _m(group, new THREE.TorusGeometry(4.2, 0.5, 6, 14), A, 0, 10, 0);
  waistRing.rotation.x = Math.PI / 2;

  // Hip armor plates
  _m(group, new THREE.BoxGeometry(3, 2.5, 4), S, -5, 10.5, 0);
  _m(group, new THREE.BoxGeometry(3, 2.5, 4), S, 5, 10.5, 0);

  // --- TORSO ---
  // Main torso block — wide, armored
  _m(group, new THREE.BoxGeometry(11, 10, 7.5), S, 0, 18, 0);

  // Front chest plate — angled armor
  const chest = _m(group, new THREE.BoxGeometry(9, 6, 1.8), S, 0, 18.5, 4.8);
  chest.rotation.x = -0.12;

  // Side torso armor panels
  _m(group, new THREE.BoxGeometry(1.2, 7, 6), S, -6.5, 18, 0);
  _m(group, new THREE.BoxGeometry(1.2, 7, 6), S, 6.5, 18, 0);

  // Chest reactor core — bright accent visible through armor
  const reactor = _m(group, new THREE.SphereGeometry(2.2, 8, 6), A, 0, 18, 5);

  // Reactor glow shell
  const reactorGlow = _m(group, new THREE.SphereGeometry(3.5, 8, 6),
    makeGlowMaterial(color, 0.18), 0, 18, 5);

  // Chest vent slits — accent lines across chest
  for (let i = 0; i < 3; i++) {
    _m(group, new THREE.BoxGeometry(6, 0.25, 0.2), A, 0, 15.5 + i * 1.5, 5.2);
  }

  // --- SHOULDER PAULDRONS ---
  // Left shoulder — chunky angled armor
  const lShGrp = new THREE.Group();
  lShGrp.position.set(-9, 21, 0);
  lShGrp.rotation.z = -0.15;
  group.add(lShGrp);

  _m(lShGrp, new THREE.BoxGeometry(5.5, 4.5, 6.5), S, 0, 0, 0);
  // Top accent plate
  _m(lShGrp, new THREE.BoxGeometry(4.5, 0.5, 5.5), A, 0, 2.5, 0);
  // Hardpoint node
  _m(lShGrp, new THREE.OctahedronGeometry(1.2), A, 0, 3.5, 0);
  // Front edge
  _m(lShGrp, new THREE.BoxGeometry(5, 0.3, 0.4), A, 0, 0, 3.5);

  // Right shoulder
  const rShGrp = new THREE.Group();
  rShGrp.position.set(9, 21, 0);
  rShGrp.rotation.z = 0.15;
  group.add(rShGrp);

  _m(rShGrp, new THREE.BoxGeometry(5.5, 4.5, 6.5), S, 0, 0, 0);
  _m(rShGrp, new THREE.BoxGeometry(4.5, 0.5, 5.5), A, 0, 2.5, 0);
  _m(rShGrp, new THREE.OctahedronGeometry(1.2), A, 0, 3.5, 0);
  _m(rShGrp, new THREE.BoxGeometry(5, 0.3, 0.4), A, 0, 0, 3.5);

  // --- ARMS ---
  // Left arm assembly
  _m(group, new THREE.SphereGeometry(1.8, 6, 4), A, -9, 17, 1); // shoulder ball
  _m(group, new THREE.CylinderGeometry(1.3, 1.6, 7, 6), S, -9, 14, 2).rotation.x = -0.25;
  _m(group, new THREE.SphereGeometry(1.3, 6, 4), S, -9, 11, 3.5); // elbow

  // Left weapon — heavy barrel
  _m(group, new THREE.CylinderGeometry(0.8, 1, 7, 4), S, -9, 10, 7.5).rotation.x = -Math.PI / 2;
  const lMuzzle = _m(group, new THREE.ConeGeometry(1.2, 2.5, 4), A, -9, 10, 11.5);
  lMuzzle.rotation.x = -Math.PI / 2;

  // Right arm assembly
  _m(group, new THREE.SphereGeometry(1.8, 6, 4), A, 9, 17, 1);
  _m(group, new THREE.CylinderGeometry(1.3, 1.6, 7, 6), S, 9, 14, 2).rotation.x = -0.25;
  _m(group, new THREE.SphereGeometry(1.3, 6, 4), S, 9, 11, 3.5);

  _m(group, new THREE.CylinderGeometry(0.8, 1, 7, 4), S, 9, 10, 7.5).rotation.x = -Math.PI / 2;
  const rMuzzle = _m(group, new THREE.ConeGeometry(1.2, 2.5, 4), A, 9, 10, 11.5);
  rMuzzle.rotation.x = -Math.PI / 2;

  // --- HEAD ---
  // Neck
  _m(group, new THREE.CylinderGeometry(1.5, 2, 2, 6), S, 0, 24, 0.5);

  // Head block
  const head = _m(group, new THREE.BoxGeometry(4.5, 3.5, 4.5), S, 0, 26.5, 1);

  // Visor — bright scanning eye
  const visor = _m(group, new THREE.BoxGeometry(4, 1.2, 0.8), A, 0, 27, 3.5);

  // Visor glow
  _m(group, new THREE.BoxGeometry(4.5, 1.6, 0.4), makeGlowMaterial(color, 0.2), 0, 27, 3.8);

  // Head crest
  _m(group, new THREE.BoxGeometry(1, 2.5, 3), S, 0, 29.5, 1);

  // Antenna
  _m(group, new THREE.CylinderGeometry(0.2, 0.2, 4.5, 4), S, 2.5, 29.5, 1);
  const antTip = _m(group, new THREE.SphereGeometry(0.5, 6, 4), A, 2.5, 32, 1);

  // --- BACK POWER PACK ---
  _m(group, new THREE.BoxGeometry(7, 7, 4), S, 0, 18, -5.5);

  // Power pack accent lines
  _m(group, new THREE.BoxGeometry(5, 0.3, 0.3), A, 0, 21, -3.5);
  _m(group, new THREE.BoxGeometry(5, 0.3, 0.3), A, 0, 19, -3.5);

  // Power pack top vent
  _m(group, new THREE.BoxGeometry(4, 1, 2.5), S, 0, 22.5, -5.5);

  // Exhaust vents
  _m(group, new THREE.CylinderGeometry(1.2, 1.2, 2.5, 6), S, -2.2, 20.5, -8);
  _m(group, new THREE.CylinderGeometry(1.2, 1.2, 2.5, 6), S, 2.2, 20.5, -8);

  // Exhaust glow
  const lVentGlow = _m(group, new THREE.SphereGeometry(1.4, 6, 4), A, -2.2, 20.5, -9.5);
  const rVentGlow = _m(group, new THREE.SphereGeometry(1.4, 6, 4), A, 2.2, 20.5, -9.5);

  // --- GLOW ELEMENTS ---
  // Foot glow rings
  const lfGlow = _m(group, new THREE.TorusGeometry(2.8, 0.35, 4, 10),
    makeGlowMaterial(color, 0.18), -4.5, -3.5, 1.5);
  lfGlow.rotation.x = Math.PI / 2;

  const rfGlow = _m(group, new THREE.TorusGeometry(2.8, 0.35, 4, 10),
    makeGlowMaterial(color, 0.18), 4.5, -3.5, 1.5);
  rfGlow.rotation.x = Math.PI / 2;

  // --- ENEMY THREAT RING ---
  if (isEnemy) {
    const threat = _m(group, new THREE.TorusGeometry(14, 0.4, 6, 22), A, 0, 16, 0);
    threat.rotation.x = Math.PI / 4;
    group.userData.threatRing = threat;
  }

  group.userData.accentParts = [reactor, waistRing, visor, antTip, lVentGlow, rVentGlow, lMuzzle, rMuzzle];
  group.userData.glowParts = [reactorGlow, lfGlow, rfGlow];
  group.userData.reactor = reactor;
  group.userData.reactorGlow = reactorGlow;
  group.userData.head = head;
  group.userData.lLegGrp = lLegGrp;
  group.userData.rLegGrp = rLegGrp;
  group.userData.lShoulder = lShGrp;
  group.userData.rShoulder = rShGrp;
  group.userData.unitType = 'assault';
}

// ================================================================
// TANK — "Siege Platform"
// Massive hovering siege vehicle with rotating turret, heavy cannon,
// quad hover engines, armored hull, energy conduit ring
// ================================================================

function buildTankMesh(group, color, isEnemy) {
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  // --- HULL ---
  // Main hull body — wide flat armored box
  _m(group, new THREE.BoxGeometry(22, 5, 28), S, 0, 5, 0);

  // Front glacis — sloped armor plate
  const glacis = _m(group, new THREE.BoxGeometry(20, 4.5, 6), S, 0, 6.5, 15);
  glacis.rotation.x = -0.35;

  // Front lower lip
  _m(group, new THREE.BoxGeometry(18, 1.5, 2), S, 0, 3.5, 16);

  // Rear armor plate
  _m(group, new THREE.BoxGeometry(18, 4, 2.5), S, 0, 6, -15);

  // Rear angled plate
  const rearSlope = _m(group, new THREE.BoxGeometry(16, 3, 3), S, 0, 5, -16);
  rearSlope.rotation.x = 0.25;

  // Side armor skirts
  _m(group, new THREE.BoxGeometry(1.8, 4, 24), S, -12, 4, 0);
  _m(group, new THREE.BoxGeometry(1.8, 4, 24), S, 12, 4, 0);

  // Side armor ridges (raised panels)
  _m(group, new THREE.BoxGeometry(0.6, 2, 10), S, -12.5, 5.5, 3);
  _m(group, new THREE.BoxGeometry(0.6, 2, 10), S, 12.5, 5.5, 3);
  _m(group, new THREE.BoxGeometry(0.6, 2, 8), S, -12.5, 5.5, -6);
  _m(group, new THREE.BoxGeometry(0.6, 2, 8), S, 12.5, 5.5, -6);

  // Side accent strips — neon lines along hull
  _m(group, new THREE.BoxGeometry(0.3, 0.6, 22), A, -13, 5, 0);
  _m(group, new THREE.BoxGeometry(0.3, 0.6, 22), A, 13, 5, 0);

  // Hull top detail plates
  _m(group, new THREE.BoxGeometry(8, 0.8, 6), S, -5, 8, -6);
  _m(group, new THREE.BoxGeometry(8, 0.8, 6), S, 5, 8, -6);

  // Hull accent lines on top
  _m(group, new THREE.BoxGeometry(18, 0.2, 0.4), A, 0, 7.7, 5);
  _m(group, new THREE.BoxGeometry(18, 0.2, 0.4), A, 0, 7.7, -3);

  // --- HOVER ENGINES (4 corners) ---
  const engGeo = new THREE.CylinderGeometry(2.8, 3.2, 3.5, 6);
  const hoverPos = [[-9, 1.5, 11], [9, 1.5, 11], [-9, 1.5, -11], [9, 1.5, -11]];
  const hoverGlows = [];

  for (const [x, y, z] of hoverPos) {
    _m(group, engGeo, S, x, y, z);

    // Engine housing ring
    const ring = _m(group, new THREE.TorusGeometry(3, 0.4, 4, 10), A, x, y - 0.5, z);
    ring.rotation.x = Math.PI / 2;

    // Engine core
    _m(group, new THREE.SphereGeometry(1.8, 6, 4), A, x, 0.5, z);

    // Hover glow field
    const glow = _m(group, new THREE.TorusGeometry(3.5, 0.6, 4, 12),
      makeGlowMaterial(color, 0.2), x, 0, z);
    glow.rotation.x = Math.PI / 2;
    hoverGlows.push(glow);

    // Outer hover ring
    const outerGlow = _m(group, new THREE.TorusGeometry(4.5, 0.3, 4, 12),
      makeGlowMaterial(color, 0.08), x, -0.3, z);
    outerGlow.rotation.x = Math.PI / 2;
    hoverGlows.push(outerGlow);
  }

  // --- TURRET ASSEMBLY ---
  // Turret ring — accent torus marking rotation point
  const tRing = _m(group, new THREE.TorusGeometry(8, 1, 6, 18), A, 0, 8.5, 0);
  tRing.rotation.x = Math.PI / 2;

  // Turret base platform
  _m(group, new THREE.CylinderGeometry(7, 8, 3, 12), S, 0, 10, 0);

  // Turret pivot group (rotates to face movement)
  const turretPivot = new THREE.Group();
  turretPivot.position.y = 11;
  group.add(turretPivot);

  // Turret housing — main armored box
  _m(turretPivot, new THREE.BoxGeometry(12, 5.5, 14), S, 0, 3, 0);

  // Turret front slope
  const tFront = _m(turretPivot, new THREE.BoxGeometry(10, 4, 3.5), S, 0, 3.5, 9);
  tFront.rotation.x = -0.25;

  // Turret side armor — extra plating
  _m(turretPivot, new THREE.BoxGeometry(1.8, 4.5, 12), S, -7, 3, 0);
  _m(turretPivot, new THREE.BoxGeometry(1.8, 4.5, 12), S, 7, 3, 0);

  // Turret top hatch
  _m(turretPivot, new THREE.CylinderGeometry(2, 2, 0.8, 8), S, -3, 6, -2);

  // Turret accent lines
  _m(turretPivot, new THREE.BoxGeometry(10, 0.2, 0.3), A, 0, 5.8, 3);
  _m(turretPivot, new THREE.BoxGeometry(0.3, 0.2, 12), A, -5, 5.8, 0);
  _m(turretPivot, new THREE.BoxGeometry(0.3, 0.2, 12), A, 5, 5.8, 0);

  // --- MAIN CANNON ---
  // Barrel — long heavy cylinder
  const cannon = _m(turretPivot, new THREE.CylinderGeometry(2, 2.5, 22, 8), S, 0, 3.5, 18);
  cannon.rotation.x = -Math.PI / 2;

  // Barrel shroud — wider section near turret
  const shroud = _m(turretPivot, new THREE.CylinderGeometry(3.2, 3.2, 5, 8), S, 0, 3.5, 9);
  shroud.rotation.x = -Math.PI / 2;

  // Barrel reinforcement rings
  const bRingGeo = new THREE.TorusGeometry(2.6, 0.3, 4, 8);
  const bR1 = _m(turretPivot, bRingGeo, A, 0, 3.5, 15);
  bR1.rotation.x = Math.PI / 2;
  const bR2 = _m(turretPivot, bRingGeo, A, 0, 3.5, 20);
  bR2.rotation.x = Math.PI / 2;
  const bR3 = _m(turretPivot, bRingGeo, A, 0, 3.5, 25);
  bR3.rotation.x = Math.PI / 2;

  // Muzzle brake — flared end
  const brake = _m(turretPivot, new THREE.CylinderGeometry(3, 2.2, 3, 8), A, 0, 3.5, 30);
  brake.rotation.x = -Math.PI / 2;

  // Muzzle flash sphere
  const muzzle = _m(turretPivot, new THREE.SphereGeometry(2, 6, 4), A, 0, 3.5, 32);

  // Muzzle glow
  const muzzleGlow = _m(turretPivot, new THREE.SphereGeometry(4, 6, 4),
    makeGlowMaterial(color, 0.12), 0, 3.5, 32);

  // --- COAXIAL GUN (secondary weapon) ---
  _m(turretPivot, new THREE.CylinderGeometry(0.5, 0.5, 10, 4), S, 3, 2, 13).rotation.x = -Math.PI / 2;
  _m(turretPivot, new THREE.SphereGeometry(0.7, 4, 4), A, 3, 2, 18);

  // --- REACTOR DOME ---
  const dome = _m(turretPivot, new THREE.SphereGeometry(2.2, 8, 6), A, 0, 7, -3);
  const domeGlow = _m(turretPivot, new THREE.SphereGeometry(3.5, 8, 6),
    makeGlowMaterial(color, 0.15), 0, 7, -3);

  // --- REAR EXHAUST ---
  _m(group, new THREE.BoxGeometry(3.5, 2.5, 2.5), S, -6, 6, -16.5);
  _m(group, new THREE.BoxGeometry(3.5, 2.5, 2.5), S, 6, 6, -16.5);

  // Exhaust glow
  const lExGlow = _m(group, new THREE.SphereGeometry(1.8, 6, 4), A, -6, 6, -18);
  const rExGlow = _m(group, new THREE.SphereGeometry(1.8, 6, 4), A, 6, 6, -18);

  // Exhaust halos
  _m(group, new THREE.SphereGeometry(2.8, 6, 4), makeGlowMaterial(color, 0.12), -6, 6, -18);
  _m(group, new THREE.SphereGeometry(2.8, 6, 4), makeGlowMaterial(color, 0.12), 6, 6, -18);

  // --- HULL UNDERSIDE GLOW ---
  const underGlow = _m(group, new THREE.TorusGeometry(13, 1, 6, 22),
    makeGlowMaterial(color, 0.07), 0, 0.5, 0);
  underGlow.rotation.x = Math.PI / 2;

  // Inner hull glow
  const innerGlow = _m(group, new THREE.TorusGeometry(7, 0.6, 4, 14),
    makeGlowMaterial(color, 0.1), 0, 1, 0);
  innerGlow.rotation.x = Math.PI / 2;

  // --- ENERGY CONDUIT RING (spins around turret base) ---
  const conduit = _m(group, new THREE.TorusGeometry(9, 0.6, 6, 18), A, 0, 9, 0);
  conduit.rotation.x = Math.PI / 2;

  // --- ENEMY THREAT RING ---
  if (isEnemy) {
    const threat = _m(group, new THREE.TorusGeometry(17, 0.5, 6, 24), A, 0, 8, 0);
    threat.rotation.x = Math.PI / 4;
    group.userData.threatRing = threat;
  }

  group.userData.accentParts = [tRing, brake, muzzle, dome, conduit, lExGlow, rExGlow];
  group.userData.glowParts = [...hoverGlows, domeGlow, muzzleGlow, underGlow, innerGlow];
  group.userData.turretPivot = turretPivot;
  group.userData.cannon = cannon;
  group.userData.cannonBaseZ = 18;
  group.userData.muzzleFlash = muzzle;
  group.userData.muzzleGlow = muzzleGlow;
  group.userData.dome = dome;
  group.userData.domeGlow = domeGlow;
  group.userData.conduit = conduit;
  group.userData.hoverGlows = hoverGlows;
  group.userData.unitType = 'tank';
}

// ================================================================
// PER-TYPE ANIMATION
// ================================================================

function animRifle(group, u, now, offset, moved) {
  // Leg stride — groups slide forward/back alternately
  const lLeg = group.userData.lLegGrp;
  const rLeg = group.userData.rLegGrp;
  if (lLeg && rLeg) {
    if (moved > 0.05) {
      const stride = Math.sin(now * 6 + offset) * 1.8;
      lLeg.position.z = stride;
      rLeg.position.z = -stride;
      lLeg.position.y = Math.max(0, Math.sin(now * 6 + offset)) * 0.5;
      rLeg.position.y = Math.max(0, -Math.sin(now * 6 + offset)) * 0.5;
    } else {
      lLeg.position.z *= 0.9;
      rLeg.position.z *= 0.9;
      lLeg.position.y *= 0.9;
      rLeg.position.y *= 0.9;
    }
  }

  // Shoulder sway opposite to legs
  const lSh = group.userData.lShoulder;
  const rSh = group.userData.rShoulder;
  if (lSh && rSh && moved > 0.05) {
    const sway = Math.sin(now * 6 + offset + 1) * 0.04;
    lSh.rotation.x = sway;
    rSh.rotation.x = -sway;
  }

  // Head slight look side to side
  const head = group.userData.head;
  if (head) {
    head.rotation.y = Math.sin(now * 0.5 + offset) * 0.2;
  }

  // Muzzle flash on fire
  const muz = group.userData.muzzleFlash;
  const muzG = group.userData.muzzleGlow;
  if (muz) {
    const justFired = u.fireCooldown > (1 / u.fireRate) - 0.08;
    muz.scale.setScalar(justFired ? 3 : 0.5 + 0.15 * Math.sin(now * 4 + offset));
    if (muzG) muzG.material.opacity = justFired ? 0.5 : 0.08;
  }
}

function animAssault(group, u, now, offset, moved) {
  // Leg stride — groups slide forward/back alternately
  const lLeg = group.userData.lLegGrp;
  const rLeg = group.userData.rLegGrp;
  if (lLeg && rLeg) {
    if (moved > 0.05) {
      const stride = Math.sin(now * 5 + offset) * 2.5;
      lLeg.position.z = stride;
      rLeg.position.z = -stride;
      // Slight up/down on the forward leg
      lLeg.position.y = Math.max(0, Math.sin(now * 5 + offset)) * 0.8;
      rLeg.position.y = Math.max(0, -Math.sin(now * 5 + offset)) * 0.8;
    } else {
      lLeg.position.z *= 0.9;
      rLeg.position.z *= 0.9;
      lLeg.position.y *= 0.9;
      rLeg.position.y *= 0.9;
    }
  }

  // Shoulder sway opposite to legs
  const lSh = group.userData.lShoulder;
  const rSh = group.userData.rShoulder;
  if (lSh && rSh && moved > 0.05) {
    const sway = Math.sin(now * 5 + offset + 1) * 0.06;
    lSh.rotation.x = sway;
    rSh.rotation.x = -sway;
  }

  // Head scanning — slow look side to side
  const head = group.userData.head;
  if (head) {
    head.rotation.y = Math.sin(now * 0.7 + offset) * 0.35;
  }

  // Reactor pulse
  const reactor = group.userData.reactor;
  if (reactor) {
    reactor.scale.setScalar(0.85 + 0.15 * Math.sin(now * 4 + offset));
  }
  const rGlow = group.userData.reactorGlow;
  if (rGlow) {
    rGlow.material.opacity = 0.12 + 0.08 * Math.sin(now * 4 + offset);
  }
}

function animTank(group, u, now, offset, moved) {
  // Tank turret aiming — rotate turretPivot to face target independently of hull
  const turretPivot = group.userData.turretPivot;
  if (turretPivot && u.targetX !== undefined && u.targetZ !== undefined) {
    // Cannon points along +Z in turretPivot local space
    // turretPivot is child of group, so subtract group rotation
    const worldAngle = Math.atan2(u.targetX - u.x, u.targetZ - u.z);
    const localAngle = worldAngle - (group.userData.smoothAngle || 0);
    // Smooth rotation
    let current = group.userData._turretAngle || 0;
    let diff = localAngle - current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    current += diff * 0.1;
    // Normalize
    while (current > Math.PI) current -= Math.PI * 2;
    while (current < -Math.PI) current += Math.PI * 2;
    group.userData._turretAngle = current;
    turretPivot.rotation.y = current;
  }

  // Energy conduit spin
  const conduit = group.userData.conduit;
  if (conduit) conduit.rotation.z += 0.012;

  // Hover glow alternating pulse (front pair vs rear pair)
  const hGlows = group.userData.hoverGlows;
  if (hGlows) {
    for (let i = 0; i < hGlows.length; i++) {
      const phase = (i % 4 < 2) ? 0 : Math.PI;
      const m = hGlows[i].material;
      if (!m.userData) m.userData = {};
      if (m.userData.baseOp == null) m.userData.baseOp = m.opacity;
      m.opacity = m.userData.baseOp + 0.08 * Math.sin(now * 3 + offset + phase);
    }
  }

  // Cannon recoil on fire
  const cannon = group.userData.cannon;
  const baseZ = group.userData.cannonBaseZ || 18;
  if (cannon) {
    const justFired = u.fireCooldown > (1 / u.fireRate) - 0.12;
    if (justFired) {
      cannon.position.z = baseZ - 3;
    } else {
      cannon.position.z += (baseZ - cannon.position.z) * 0.08;
    }
  }

  // Muzzle flash
  const muz = group.userData.muzzleFlash;
  const muzG = group.userData.muzzleGlow;
  if (muz) {
    const justFired = u.fireCooldown > (1 / u.fireRate) - 0.1;
    muz.scale.setScalar(justFired ? 4 : 0.4);
    if (muzG) muzG.material.opacity = justFired ? 0.5 : 0.05;
  }

  // Reactor dome — brighter as HP drops
  const dome = group.userData.dome;
  if (dome) {
    const hpR = u.hp / u.maxHp;
    dome.scale.setScalar(1.0 + (1 - hpR) * 0.6);
  }
  const dGlow = group.userData.domeGlow;
  if (dGlow) {
    const hpR = u.hp / u.maxHp;
    dGlow.material.opacity = 0.1 + (1 - hpR) * 0.25;
  }
}

// ================================================================
// HELICOPTER — "Neon Strafehawk"
// Cyberpunk attack helicopter with spinning rotor, twin engines,
// nose gun, tail boom, stabilizer fins, accent glow
// ================================================================

function buildHelicopterMesh(group, color, isEnemy) {
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  // --- FUSELAGE (main body) ---
  // Central body — elongated armored hull
  _m(group, new THREE.BoxGeometry(5, 4, 16), S, 0, 0, 0);

  // Top spine ridge
  _m(group, new THREE.BoxGeometry(2, 1.5, 12), S, 0, 2.5, -1);

  // Bottom belly plate
  _m(group, new THREE.BoxGeometry(6, 1, 14), S, 0, -2.2, 0);

  // --- COCKPIT (front, angled canopy) ---
  const cockpit = _m(group, new THREE.BoxGeometry(4.5, 3, 5), S, 0, 0.5, 9);
  cockpit.rotation.x = -0.2;

  // Canopy visor — bright scanning slit
  const visor = _m(group, new THREE.BoxGeometry(3.8, 1.2, 0.6), A, 0, 1.5, 11.2);

  // Canopy glow
  _m(group, new THREE.BoxGeometry(4.2, 1.6, 0.4), makeGlowMaterial(color, 0.2), 0, 1.5, 11.5);

  // Cockpit chin — lower front armor
  _m(group, new THREE.BoxGeometry(3.5, 1.5, 3), S, 0, -1.5, 9.5);

  // --- NOSE GUN (on rotating pivot) ---
  const gunPivot = new THREE.Group();
  gunPivot.position.set(0, -2.5, 10);
  group.add(gunPivot);

  // Gun mount (at pivot center)
  _m(gunPivot, new THREE.BoxGeometry(2, 1, 2), S, 0, 0, 0);

  // Twin barrels (offset forward from mount)
  const lBarrel = _m(gunPivot, new THREE.CylinderGeometry(0.3, 0.3, 6, 4), S, -0.6, 0, 3);
  lBarrel.rotation.x = -Math.PI / 2;
  const rBarrel = _m(gunPivot, new THREE.CylinderGeometry(0.3, 0.3, 6, 4), S, 0.6, 0, 3);
  rBarrel.rotation.x = -Math.PI / 2;

  // Muzzle flash tips (at barrel ends)
  const muzzleL = _m(gunPivot, new THREE.SphereGeometry(0.5, 6, 4), A, -0.6, 0, 6);
  const muzzleR = _m(gunPivot, new THREE.SphereGeometry(0.5, 6, 4), A, 0.6, 0, 6);

  // Muzzle glow
  const muzzleGlow = _m(gunPivot, new THREE.SphereGeometry(1.5, 6, 4),
    makeGlowMaterial(color, 0.12), 0, 0, 6);

  // --- ENGINE PODS (two side-mounted) ---
  // Left engine
  _m(group, new THREE.BoxGeometry(3, 3, 7), S, -5, 0, -1);
  _m(group, new THREE.BoxGeometry(2.5, 0.3, 6), A, -5, 1.8, -1);
  const lEngCore = _m(group, new THREE.SphereGeometry(1, 6, 4), A, -5, 0, -5);
  const lEngGlow = _m(group, new THREE.SphereGeometry(1.8, 6, 4),
    makeGlowMaterial(color, 0.18), -5, 0, -5);

  // Right engine
  _m(group, new THREE.BoxGeometry(3, 3, 7), S, 5, 0, -1);
  _m(group, new THREE.BoxGeometry(2.5, 0.3, 6), A, 5, 1.8, -1);
  const rEngCore = _m(group, new THREE.SphereGeometry(1, 6, 4), A, 5, 0, -5);
  const rEngGlow = _m(group, new THREE.SphereGeometry(1.8, 6, 4),
    makeGlowMaterial(color, 0.18), 5, 0, -5);

  // Engine intake accent strips
  _m(group, new THREE.BoxGeometry(0.3, 2, 5), A, -6.7, 0, -1);
  _m(group, new THREE.BoxGeometry(0.3, 2, 5), A, 6.7, 0, -1);

  // --- TAIL BOOM ---
  // Tail extending backward
  _m(group, new THREE.BoxGeometry(2.5, 2, 10), S, 0, 0.5, -13);

  // Tail narrows further
  _m(group, new THREE.BoxGeometry(1.5, 1.5, 5), S, 0, 0.5, -19.5);

  // Tail accent line
  _m(group, new THREE.BoxGeometry(0.3, 0.3, 12), A, 0, 1.8, -14);

  // --- TAIL FIN (vertical stabilizer) ---
  _m(group, new THREE.BoxGeometry(0.5, 5, 3.5), S, 0, 4, -20.5);
  _m(group, new THREE.BoxGeometry(0.3, 4, 0.3), A, 0, 4, -19);

  // Tail fin tip
  const tailTip = _m(group, new THREE.SphereGeometry(0.4, 6, 4), A, 0, 6.8, -20.5);

  // --- HORIZONTAL STABILIZERS ---
  _m(group, new THREE.BoxGeometry(6, 0.5, 2.5), S, 0, 1.5, -21);
  _m(group, new THREE.BoxGeometry(5, 0.2, 2), A, 0, 2, -21);

  // --- TAIL ROTOR ---
  // Small rotor disc on tail fin side
  const tailRotor = _m(group, new THREE.CylinderGeometry(2.5, 2.5, 0.3, 12),
    makeGlowMaterial(color, 0.15), 0.5, 4, -22);
  tailRotor.rotation.z = Math.PI / 2;

  // Tail rotor hub
  _m(group, new THREE.SphereGeometry(0.5, 6, 4), A, 0.5, 4, -22);

  // --- MAIN ROTOR ---
  // Rotor mast
  _m(group, new THREE.CylinderGeometry(0.8, 1, 3, 6), S, 0, 4.5, 0);

  // Rotor hub
  _m(group, new THREE.SphereGeometry(1.2, 6, 4), A, 0, 6, 0);

  // Rotor disc — transparent spinning disc
  const rotorDisc = _m(group, new THREE.CylinderGeometry(12, 12, 0.3, 24),
    makeGlowMaterial(color, 0.1), 0, 6.5, 0);

  // Rotor blades (cross shape — visible when spinning slow, blurs into disc)
  const blade1 = _m(group, new THREE.BoxGeometry(24, 0.15, 1.2), A, 0, 6.5, 0);
  const blade2 = _m(group, new THREE.BoxGeometry(1.2, 0.15, 24), A, 0, 6.5, 0);

  // Rotor group to spin together
  const rotorGroup = new THREE.Group();
  rotorGroup.position.y = 0;
  group.add(rotorGroup);
  // Re-parent rotor parts into the group
  group.remove(rotorDisc);
  group.remove(blade1);
  group.remove(blade2);
  rotorDisc.position.set(0, 6.5, 0);
  blade1.position.set(0, 6.5, 0);
  blade2.position.set(0, 6.5, 0);
  rotorGroup.add(rotorDisc);
  rotorGroup.add(blade1);
  rotorGroup.add(blade2);

  // --- SKIDS / LANDING GEAR ---
  // Left skid
  _m(group, new THREE.CylinderGeometry(0.2, 0.2, 1.5, 4), S, -3, -3.5, 4); // strut
  _m(group, new THREE.CylinderGeometry(0.2, 0.2, 1.5, 4), S, -3, -3.5, -2); // strut
  const lSkid = _m(group, new THREE.BoxGeometry(0.4, 0.4, 10), S, -3, -4.2, 1);

  // Right skid
  _m(group, new THREE.CylinderGeometry(0.2, 0.2, 1.5, 4), S, 3, -3.5, 4);
  _m(group, new THREE.CylinderGeometry(0.2, 0.2, 1.5, 4), S, 3, -3.5, -2);
  const rSkid = _m(group, new THREE.BoxGeometry(0.4, 0.4, 10), S, 3, -4.2, 1);

  // --- DOWNWASH GLOW (under helicopter) ---
  const downwash = _m(group, new THREE.TorusGeometry(8, 0.5, 4, 14),
    makeGlowMaterial(color, 0.08), 0, -4, 0);
  downwash.rotation.x = Math.PI / 2;

  // --- ENEMY THREAT RING ---
  if (isEnemy) {
    const threat = _m(group, new THREE.TorusGeometry(12, 0.4, 6, 20), A, 0, 0, 0);
    threat.rotation.x = Math.PI / 4;
    group.userData.threatRing = threat;
  }

  // --- SELECTION INDICATOR RING (player only, hidden by default) ---
  if (!isEnemy) {
    const selRing = _m(group, new THREE.TorusGeometry(14, 0.6, 6, 24),
      makeGlowMaterial(new THREE.Color(0.2, 0.6, 1.0), 0.5), 0, -3, 0);
    selRing.rotation.x = Math.PI / 2;
    selRing.visible = false;
    group.userData.selectRing = selRing;
  }

  group.userData.accentParts = [visor, muzzleL, muzzleR, lEngCore, rEngCore, tailTip];
  group.userData.glowParts = [muzzleGlow, lEngGlow, rEngGlow, downwash, rotorDisc];
  group.userData.rotorGroup = rotorGroup;
  group.userData.tailRotor = tailRotor;
  group.userData.gunPivot = gunPivot;
  group.userData.muzzleFlash = muzzleL;
  group.userData.muzzleFlash2 = muzzleR;
  group.userData.muzzleGlow = muzzleGlow;
  group.userData.unitType = 'helicopter';
}

// ================================================================
// HELICOPTER ANIMATION
// ================================================================

function animHelicopter(group, u, now, offset, moved) {
  // Main rotor spin
  const rotorGrp = group.userData.rotorGroup;
  if (rotorGrp) {
    rotorGrp.rotation.y += 0.4;
  }

  // Tail rotor spin
  const tailRotor = group.userData.tailRotor;
  if (tailRotor) {
    tailRotor.rotation.x += 0.5;
  }

  // Altitude bob
  group.position.y = group.userData.baseY + Math.sin(now * 2 + offset) * 2;

  // Banking — tilt into movement direction
  const dx = u.x - group.userData.lastX;
  const dz = u.z - group.userData.lastZ;
  if (moved > 0.5) {
    // Bank sideways based on lateral movement relative to facing
    const bankTarget = -dx * 0.008;
    group.rotation.z += (bankTarget - group.rotation.z) * 0.08;

    // Pitch forward slightly when moving
    const pitchTarget = -0.08;
    group.rotation.x += (pitchTarget - group.rotation.x) * 0.06;
  } else {
    group.rotation.z *= 0.92;
    group.rotation.x *= 0.92;
  }

  // Gun pivot rotation — track target independently of helicopter facing
  const gunPivot = group.userData.gunPivot;
  if (gunPivot && u.targetX !== undefined && u.targetZ !== undefined) {
    const wx = u.targetX - u.x;
    const wz = u.targetZ - u.z;
    // Convert world direction to local space (undo group rotation)
    const theta = group.userData.smoothAngle || 0;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const localX = wx * cosT - wz * sinT;
    const localZ = wx * sinT + wz * cosT;
    const targetAngle = Math.atan2(localX, localZ);
    // Smooth rotation
    let current = group.userData._gunAngle || 0;
    let diff = targetAngle - current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    current += diff * 0.15;
    while (current > Math.PI) current -= Math.PI * 2;
    while (current < -Math.PI) current += Math.PI * 2;
    group.userData._gunAngle = current;
    gunPivot.rotation.y = current;
  }

  // Muzzle flash on fire
  const muz1 = group.userData.muzzleFlash;
  const muz2 = group.userData.muzzleFlash2;
  const muzG = group.userData.muzzleGlow;
  if (muz1) {
    const justFired = u.fireCooldown > (1 / u.fireRate) - 0.06;
    // Alternate muzzles
    const useLeft = Math.floor(now * 10) % 2 === 0;
    muz1.scale.setScalar(justFired && useLeft ? 3 : 0.5);
    if (muz2) muz2.scale.setScalar(justFired && !useLeft ? 3 : 0.5);
    if (muzG) muzG.material.opacity = justFired ? 0.4 : 0.06;
  }
}

// ================================================================
// HELPERS
// ================================================================

// ================================================================
// BOMBER — temporary air strike visual unit
// ================================================================

/**
 * Create a bomber mesh group and add it to the scene.
 * Returns the group (caller manages position/removal).
 */
export function createBomberMesh(team, scene) {
  const teamColor = team === TEAM_PLAYER ? COLORS.UNIT_PLAYER : COLORS.UNIT_ENEMY;
  const group = new THREE.Group();
  buildBomberMesh(group, teamColor, team === TEAM_ENEMY);
  group.scale.setScalar(2.5);
  group.position.y = AIRSTRIKE_BOMBER_HEIGHT;
  scene.add(group);
  return group;
}

/**
 * Remove a bomber mesh from the scene and dispose resources.
 */
export function removeBomberMesh(mesh, scene) {
  if (!mesh) return;
  scene.remove(mesh);
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.geometry.dispose();
      if (child.material.dispose) child.material.dispose();
    }
  });
}

function buildBomberMesh(group, color, isEnemy) {
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  // --- FUSELAGE (long bomber body) ---
  _m(group, new THREE.BoxGeometry(6, 4, 28), S, 0, 0, 0);

  // Top ridge
  _m(group, new THREE.BoxGeometry(3, 2, 22), S, 0, 3, -2);

  // Bottom bomb bay
  _m(group, new THREE.BoxGeometry(7, 1.5, 16), S, 0, -2.5, 0);

  // --- COCKPIT ---
  const cockpit = _m(group, new THREE.BoxGeometry(5, 3.5, 6), S, 0, 1, 15);
  cockpit.rotation.x = -0.15;
  // Canopy visor
  _m(group, new THREE.BoxGeometry(4, 1.5, 0.6), A, 0, 2.5, 17.5);
  _m(group, new THREE.BoxGeometry(4.5, 1.8, 0.4), makeGlowMaterial(color, 0.25), 0, 2.5, 17.8);

  // Nose cone
  _m(group, new THREE.BoxGeometry(3.5, 2.5, 4), S, 0, 0, 18);

  // --- WINGS (wide swept) ---
  // Left wing
  _m(group, new THREE.BoxGeometry(18, 0.8, 8), S, -12, 0, -2);
  _m(group, new THREE.BoxGeometry(16, 0.3, 6), A, -12, 0.6, -2);
  // Wing tip accent
  const lWingTip = _m(group, new THREE.SphereGeometry(0.6, 6, 4), A, -21, 0, -2);

  // Right wing
  _m(group, new THREE.BoxGeometry(18, 0.8, 8), S, 12, 0, -2);
  _m(group, new THREE.BoxGeometry(16, 0.3, 6), A, 12, 0.6, -2);
  const rWingTip = _m(group, new THREE.SphereGeometry(0.6, 6, 4), A, 21, 0, -2);

  // --- ENGINES (under wings) ---
  // Left engine nacelle
  _m(group, new THREE.BoxGeometry(3, 3, 8), S, -8, -2, -1);
  const lExhaust = _m(group, new THREE.SphereGeometry(1.2, 6, 4), A, -8, -2, -5.5);
  _m(group, new THREE.SphereGeometry(2, 6, 4), makeGlowMaterial(color, 0.2), -8, -2, -5.5);

  // Right engine nacelle
  _m(group, new THREE.BoxGeometry(3, 3, 8), S, 8, -2, -1);
  const rExhaust = _m(group, new THREE.SphereGeometry(1.2, 6, 4), A, 8, -2, -5.5);
  _m(group, new THREE.SphereGeometry(2, 6, 4), makeGlowMaterial(color, 0.2), 8, -2, -5.5);

  // --- TAIL ---
  _m(group, new THREE.BoxGeometry(2, 2, 8), S, 0, 1, -18);
  // Vertical stabilizer
  _m(group, new THREE.BoxGeometry(0.6, 6, 4), S, 0, 5, -20);
  _m(group, new THREE.BoxGeometry(0.3, 5, 0.4), A, 0, 5, -18.5);
  // Tail tip
  _m(group, new THREE.SphereGeometry(0.5, 6, 4), A, 0, 8.5, -20);

  // Horizontal stabilizers
  _m(group, new THREE.BoxGeometry(8, 0.5, 3), S, 0, 2, -20);
  _m(group, new THREE.BoxGeometry(7, 0.3, 2.5), A, 0, 2.5, -20);

  // --- BOMB BAY GLOW (menacing under-belly glow) ---
  _m(group, new THREE.BoxGeometry(5, 0.3, 10), makeGlowMaterial(0xFFDD44, 0.15), 0, -3.5, 0);

  // --- CONTRAIL GLOW (behind engines) ---
  _m(group, new THREE.CylinderGeometry(0.8, 0.3, 12, 6), makeGlowMaterial(color, 0.1), -8, -2, -12);
  _m(group, new THREE.CylinderGeometry(0.8, 0.3, 12, 6), makeGlowMaterial(color, 0.1), 8, -2, -12);

  group.userData.unitType = 'bomber';
}

/** Shorthand: create mesh, position it, add to parent, return it. */
function _m(parent, geo, mat, x, y, z) {
  const mesh = new THREE.Mesh(geo, mat);
  if (x !== undefined) mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

const _white = new THREE.Color(1, 1, 1);
function setGroupEmissive(group, intensity) {
  group.traverse(ch => {
    if (ch.isMesh && ch.material.emissive) {
      const orig = ch.material.userData?._origEmissive;
      if (orig) {
        ch.material.emissive.copy(orig).lerp(_white, intensity);
      }
    }
  });
}

// ================================================================
// MEDIC MESH — "Neon Paramedic"
// Lean bipedal support unit with prominent glowing cross emblem,
// medical satchel, injector arm, visor, and hovering cross drone
// ================================================================

function buildMedicMesh(group, isEnemy) {
  const color = MEDIC_COLOR;
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  group.userData.unitType = 'medic';
  group.userData.baseY = 3;
  group.userData.glowParts = [];

  // --- LEGS ---
  // Left leg
  const lLeg = new THREE.Group();
  group.add(lLeg);
  _m(lLeg, new THREE.CylinderGeometry(0.9, 1.2, 4.5, 6), S, -1.8, 3, 0);
  _m(lLeg, new THREE.SphereGeometry(1.0, 6, 4), A, -1.8, 1, 0.2);        // knee
  _m(lLeg, new THREE.CylinderGeometry(1.1, 0.8, 4, 6), S, -1.8, -1, 0.3);
  _m(lLeg, new THREE.BoxGeometry(2, 1, 3), S, -1.8, -3, 0.5);             // boot
  _m(lLeg, new THREE.BoxGeometry(1.6, 0.2, 2.5), A, -1.8, -2.5, 0.5);    // boot accent
  group.userData._lLeg = lLeg;

  // Right leg
  const rLeg = new THREE.Group();
  group.add(rLeg);
  _m(rLeg, new THREE.CylinderGeometry(0.9, 1.2, 4.5, 6), S, 1.8, 3, 0);
  _m(rLeg, new THREE.SphereGeometry(1.0, 6, 4), A, 1.8, 1, 0.2);
  _m(rLeg, new THREE.CylinderGeometry(1.1, 0.8, 4, 6), S, 1.8, -1, 0.3);
  _m(rLeg, new THREE.BoxGeometry(2, 1, 3), S, 1.8, -3, 0.5);
  _m(rLeg, new THREE.BoxGeometry(1.6, 0.2, 2.5), A, 1.8, -2.5, 0.5);
  group.userData._rLeg = rLeg;

  // --- WAIST ---
  _m(group, new THREE.CylinderGeometry(2.5, 2.2, 1.8, 6), S, 0, 6, 0);
  const belt = _m(group, new THREE.TorusGeometry(2.6, 0.25, 4, 12), A, 0, 5.3, 0);
  belt.rotation.x = Math.PI / 2;

  // --- TORSO — lighter, medic-style chest armor ---
  _m(group, new THREE.BoxGeometry(6, 5.5, 4.5), S, 0, 10, 0);
  // Front chest plate
  const chest = _m(group, new THREE.BoxGeometry(5.5, 3.5, 1), S, 0, 10.5, 2.8);
  chest.rotation.x = -0.08;

  // --- PROMINENT CHEST CROSS (the medic's signature) ---
  _m(group, new THREE.BoxGeometry(4.5, 1.2, 0.4), A, 0, 10.5, 3.5);   // horizontal
  _m(group, new THREE.BoxGeometry(1.2, 4.5, 0.4), A, 0, 10.5, 3.5);   // vertical
  // Cross glow halo behind it
  const crossGlow = _m(group, new THREE.BoxGeometry(5.5, 5.5, 0.15),
    makeGlowMaterial(color, 0.18), 0, 10.5, 3.3);
  group.userData.glowParts.push(crossGlow);

  // Side torso panels
  _m(group, new THREE.BoxGeometry(0.7, 4, 3.5), S, -3.5, 10, 0);
  _m(group, new THREE.BoxGeometry(0.7, 4, 3.5), S, 3.5, 10, 0);

  // --- SHOULDER GUARDS (slim, medic-style) ---
  _m(group, new THREE.BoxGeometry(3, 2, 3.5), S, -5, 12.5, 0);
  _m(group, new THREE.BoxGeometry(2.5, 0.25, 3), A, -5, 13.7, 0);
  // Right shoulder — small cross marking
  _m(group, new THREE.BoxGeometry(3, 2, 3.5), S, 5, 12.5, 0);
  _m(group, new THREE.BoxGeometry(1.8, 0.3, 0.3), A, 5, 13.2, 1.8);  // mini cross H
  _m(group, new THREE.BoxGeometry(0.3, 1.8, 0.3), A, 5, 13.2, 1.8);  // mini cross V

  // --- LEFT ARM (injector tool) ---
  _m(group, new THREE.SphereGeometry(1.0, 6, 4), A, -5, 11, 0.5);
  _m(group, new THREE.CylinderGeometry(0.7, 0.9, 4, 6), S, -5, 8.8, 1).rotation.x = -0.15;
  _m(group, new THREE.SphereGeometry(0.7, 6, 4), S, -5, 7, 1.2);     // elbow
  // Injector device
  const injector = _m(group, new THREE.CylinderGeometry(0.3, 0.3, 5, 4), S, -4.5, 7, 4.5);
  injector.rotation.x = -Math.PI / 2;
  const injTip = _m(group, new THREE.SphereGeometry(0.6, 6, 4), A, -4.5, 7, 7);
  const injGlow = _m(group, new THREE.SphereGeometry(1.2, 6, 4),
    makeGlowMaterial(color, 0.2), -4.5, 7, 7);
  group.userData.glowParts.push(injGlow);
  group.userData._injectorTip = injTip;

  // --- RIGHT ARM (holds medical satchel strap) ---
  _m(group, new THREE.SphereGeometry(1.0, 6, 4), A, 5, 11, 0.5);
  _m(group, new THREE.CylinderGeometry(0.7, 0.9, 4, 6), S, 5, 8.8, 1).rotation.x = -0.15;
  _m(group, new THREE.SphereGeometry(0.7, 6, 4), S, 5, 7, 1.2);

  // --- HEAD — sleek helmet with visor ---
  _m(group, new THREE.CylinderGeometry(0.9, 1.2, 1.2, 6), S, 0, 13.5, 0.2); // neck
  _m(group, new THREE.BoxGeometry(3.2, 2.8, 3.5), S, 0, 16, 0.2);           // helmet
  _m(group, new THREE.BoxGeometry(0.7, 1, 3.2), S, 0, 17.6, 0.2);           // top ridge
  // Visor — bright scan line
  const visor = _m(group, new THREE.BoxGeometry(3.3, 0.9, 0.5), A, 0, 16, 2.2);
  const visorGlow = _m(group, new THREE.BoxGeometry(3.6, 1.2, 0.25),
    makeGlowMaterial(color, 0.22), 0, 16, 2.4);
  group.userData.glowParts.push(visorGlow);
  // Antenna
  _m(group, new THREE.CylinderGeometry(0.12, 0.12, 2.2, 4), S, 1.3, 18.2, 0.2);
  _m(group, new THREE.SphereGeometry(0.3, 6, 4), A, 1.3, 19.5, 0.2);

  // --- MEDICAL SATCHEL (back) ---
  _m(group, new THREE.BoxGeometry(4.5, 3.5, 2.5), S, 0, 10.5, -3.5);
  // Satchel cross
  _m(group, new THREE.BoxGeometry(2.5, 0.5, 0.2), A, 0, 10.5, -2.3);
  _m(group, new THREE.BoxGeometry(0.5, 2.5, 0.2), A, 0, 10.5, -2.3);
  // Satchel detail lines
  _m(group, new THREE.BoxGeometry(3.5, 0.15, 0.15), A, 0, 12, -2.3);
  _m(group, new THREE.BoxGeometry(3.5, 0.15, 0.15), A, 0, 9, -2.3);
  // Vial accent
  _m(group, new THREE.CylinderGeometry(0.3, 0.3, 2, 4), A, -1.5, 10.5, -2.5);
  _m(group, new THREE.CylinderGeometry(0.3, 0.3, 2, 4), A, 1.5, 10.5, -2.5);

  // --- HOVERING CROSS DRONE (orbits above medic) ---
  const droneGrp = new THREE.Group();
  droneGrp.position.set(0, 22, 0);
  group.add(droneGrp);
  // Cross shape
  _m(droneGrp, new THREE.BoxGeometry(3.5, 0.8, 0.8), A, 0, 0, 0);
  _m(droneGrp, new THREE.BoxGeometry(0.8, 3.5, 0.8), A, 0, 0, 0);
  // Drone glow
  const droneGlow = _m(droneGrp, new THREE.SphereGeometry(2.5, 8, 6),
    makeGlowMaterial(color, 0.15), 0, 0, 0);
  group.userData.glowParts.push(droneGlow);
  group.userData._drone = droneGrp;

  // --- GROUND INDICATOR RING ---
  const groundRing = _m(group, new THREE.TorusGeometry(5.5, 0.5, 4, 14), A, 0, 0.5, 0);
  groundRing.rotation.x = Math.PI / 2;

  // --- HEAL RANGE CIRCLE (subtle, visible when healing) ---
  const rangeCircle = new THREE.Mesh(
    new THREE.RingGeometry(0, 1, 32),
    makeGlowMaterial(color, 0.06)
  );
  rangeCircle.rotation.x = -Math.PI / 2;
  rangeCircle.position.y = 0.3;
  rangeCircle.visible = false;
  group.add(rangeCircle);
  group.userData._rangeCircle = rangeCircle;

  // Enemy threat indicator
  if (isEnemy) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(8, 0.5, 4, 16),
      makeAccentMaterial(COLORS.RED)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1;
    group.add(ring);
    group.userData.threatRing = ring;
  }
}

// ================================================================
// ENGINEER MESH — "Neon Machinist"
// Stocky bipedal repair unit with rotating gear emblem,
// heavy tool arm, welding visor, and armored plating
// ================================================================

function buildEngineerMesh(group, isEnemy) {
  const color = ENGINEER_COLOR;
  const S = makeStructuralMaterial(color);
  const A = makeAccentMaterial(color);

  group.userData.unitType = 'engineer';
  group.userData.baseY = 2;
  group.userData.glowParts = [];

  // --- LEGS (stocky, heavy) ---
  const lLeg = new THREE.Group();
  group.add(lLeg);
  _m(lLeg, new THREE.CylinderGeometry(1.5, 1.8, 4.5, 6), S, -3, 3, 0);
  _m(lLeg, new THREE.SphereGeometry(1.3, 6, 4), A, -3, 1, 0.2);
  _m(lLeg, new THREE.CylinderGeometry(1.6, 1.2, 4, 6), S, -3, -1, 0.3);
  _m(lLeg, new THREE.BoxGeometry(3, 1.5, 4), S, -3, -3, 0.5);
  _m(lLeg, new THREE.BoxGeometry(2.5, 0.25, 3.5), A, -3, -2.3, 0.5);
  group.userData._lLeg = lLeg;

  const rLeg = new THREE.Group();
  group.add(rLeg);
  _m(rLeg, new THREE.CylinderGeometry(1.5, 1.8, 4.5, 6), S, 3, 3, 0);
  _m(rLeg, new THREE.SphereGeometry(1.3, 6, 4), A, 3, 1, 0.2);
  _m(rLeg, new THREE.CylinderGeometry(1.6, 1.2, 4, 6), S, 3, -1, 0.3);
  _m(rLeg, new THREE.BoxGeometry(3, 1.5, 4), S, 3, -3, 0.5);
  _m(rLeg, new THREE.BoxGeometry(2.5, 0.25, 3.5), A, 3, -2.3, 0.5);
  group.userData._rLeg = rLeg;

  // --- WAIST (heavy belt) ---
  _m(group, new THREE.CylinderGeometry(3.5, 3, 2, 6), S, 0, 6, 0);
  const belt = _m(group, new THREE.TorusGeometry(3.6, 0.35, 4, 12), A, 0, 5.2, 0);
  belt.rotation.x = Math.PI / 2;

  // --- TORSO (wide, armored) ---
  _m(group, new THREE.BoxGeometry(9, 6, 6), S, 0, 10.5, 0);
  // Front armor plate
  _m(group, new THREE.BoxGeometry(8, 4.5, 1.2), S, 0, 11, 3.5);

  // --- GEAR EMBLEM (front chest — rotates) ---
  const gear = new THREE.Mesh(
    new THREE.TorusGeometry(3, 0.8, 3, 8),
    A
  );
  gear.rotation.x = Math.PI / 2;
  gear.position.set(0, 11, 4.3);
  group.add(gear);
  group.userData.gearMesh = gear;
  // Gear center dot
  _m(group, new THREE.SphereGeometry(1.2, 6, 4), A, 0, 11, 4.5);
  // Gear glow
  const gearGlow = _m(group, new THREE.SphereGeometry(3.5, 8, 6),
    makeGlowMaterial(color, 0.12), 0, 11, 4.2);
  group.userData.glowParts.push(gearGlow);

  // Side torso armor
  _m(group, new THREE.BoxGeometry(1, 5, 5), S, -5, 10.5, 0);
  _m(group, new THREE.BoxGeometry(1, 5, 5), S, 5, 10.5, 0);
  // Side accent stripes
  _m(group, new THREE.BoxGeometry(0.2, 4, 0.3), A, -5.5, 10.5, 2);
  _m(group, new THREE.BoxGeometry(0.2, 4, 0.3), A, 5.5, 10.5, 2);

  // --- SHOULDER PADS (heavy) ---
  _m(group, new THREE.BoxGeometry(4.5, 2.5, 4.5), S, -7, 13, 0);
  _m(group, new THREE.BoxGeometry(4, 0.3, 4), A, -7, 14.5, 0);
  _m(group, new THREE.BoxGeometry(4.5, 2.5, 4.5), S, 7, 13, 0);
  _m(group, new THREE.BoxGeometry(4, 0.3, 4), A, 7, 14.5, 0);

  // --- LEFT ARM (heavy tool / welding arm) ---
  _m(group, new THREE.SphereGeometry(1.3, 6, 4), A, -7, 11.5, 0.5);
  _m(group, new THREE.CylinderGeometry(1, 1.2, 4.5, 6), S, -7, 9, 1).rotation.x = -0.15;
  _m(group, new THREE.SphereGeometry(0.9, 6, 4), S, -7, 7, 1.2);
  // Welding tool
  _m(group, new THREE.BoxGeometry(1.5, 1.5, 4), S, -6.5, 7, 4);
  const weldTip = _m(group, new THREE.SphereGeometry(0.8, 6, 4), A, -6.5, 7, 6.5);
  const weldGlow = _m(group, new THREE.SphereGeometry(1.5, 6, 4),
    makeGlowMaterial(color, 0.2), -6.5, 7, 6.5);
  group.userData.glowParts.push(weldGlow);
  group.userData._weldTip = weldTip;

  // --- RIGHT ARM ---
  _m(group, new THREE.SphereGeometry(1.3, 6, 4), A, 7, 11.5, 0.5);
  _m(group, new THREE.CylinderGeometry(1, 1.2, 4.5, 6), S, 7, 9, 1).rotation.x = -0.15;
  _m(group, new THREE.SphereGeometry(0.9, 6, 4), S, 7, 7, 1.2);

  // --- HEAD (welding visor style) ---
  _m(group, new THREE.CylinderGeometry(1.2, 1.5, 1.5, 6), S, 0, 14.5, 0.2);
  _m(group, new THREE.BoxGeometry(4.5, 3.5, 4.5), S, 0, 17, 0.2);
  // Welding visor — wide bright strip
  _m(group, new THREE.BoxGeometry(4.6, 1.5, 0.5), A, 0, 17, 2.6);
  const visorGlow = _m(group, new THREE.BoxGeometry(5, 1.8, 0.25),
    makeGlowMaterial(color, 0.2), 0, 17, 2.8);
  group.userData.glowParts.push(visorGlow);
  // Antenna
  _m(group, new THREE.CylinderGeometry(0.15, 0.15, 2.5, 4), S, -1.8, 19.5, 0.2);
  _m(group, new THREE.SphereGeometry(0.35, 6, 4), A, -1.8, 21, 0.2);

  // --- BACKPACK (tool box / power unit) ---
  _m(group, new THREE.BoxGeometry(6, 4.5, 3), S, 0, 11, -4);
  // Exhaust vents
  _m(group, new THREE.BoxGeometry(1.5, 0.3, 0.3), A, -1.5, 13, -2.6);
  _m(group, new THREE.BoxGeometry(1.5, 0.3, 0.3), A, 1.5, 13, -2.6);
  _m(group, new THREE.BoxGeometry(1.5, 0.3, 0.3), A, -1.5, 11.5, -2.6);
  _m(group, new THREE.BoxGeometry(1.5, 0.3, 0.3), A, 1.5, 11.5, -2.6);
  // Power core
  const core = _m(group, new THREE.SphereGeometry(1.2, 6, 4), A, 0, 11, -2.8);
  const coreGlow = _m(group, new THREE.SphereGeometry(2, 6, 4),
    makeGlowMaterial(color, 0.14), 0, 11, -2.8);
  group.userData.glowParts.push(coreGlow);

  // --- GROUND INDICATOR RING ---
  const groundRing = _m(group, new THREE.TorusGeometry(8, 0.6, 4, 14), A, 0, 0.5, 0);
  groundRing.rotation.x = Math.PI / 2;

  // --- HEAL RANGE CIRCLE ---
  const rangeCircle = new THREE.Mesh(
    new THREE.RingGeometry(0, 1, 32),
    makeGlowMaterial(color, 0.06)
  );
  rangeCircle.rotation.x = -Math.PI / 2;
  rangeCircle.position.y = 0.3;
  rangeCircle.visible = false;
  group.add(rangeCircle);
  group.userData._rangeCircle = rangeCircle;

  // Enemy threat indicator
  if (isEnemy) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(12, 0.5, 4, 16),
      makeAccentMaterial(COLORS.RED)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1;
    group.add(ring);
    group.userData.threatRing = ring;
  }
}

// ================================================================
// SUPPORT UNIT ANIMATION — walk cycle, drone orbit, heal beam
// ================================================================

// Number of particles along the heal beam
const HEAL_BEAM_PARTICLE_COUNT = 8;

function animSupportUnit(group, u, now, offset) {
  const isMedic = group.userData.unitType === 'medic';

  // --- Bob ---
  group.position.y = group.userData.baseY + Math.sin(now * 3 + offset) * 1.2;

  // --- Walk cycle for legs ---
  const dx = u.x - (group.userData.lastX || u.x);
  const dz = u.z - (group.userData.lastZ || u.z);
  const moving = (dx * dx + dz * dz) > 0.01;

  if (group.userData._lLeg && group.userData._rLeg) {
    if (moving) {
      const walkPhase = now * 6 + offset;
      group.userData._lLeg.rotation.x = Math.sin(walkPhase) * 0.25;
      group.userData._rLeg.rotation.x = Math.sin(walkPhase + Math.PI) * 0.25;
    } else {
      group.userData._lLeg.rotation.x *= 0.85;
      group.userData._rLeg.rotation.x *= 0.85;
    }
  }

  // --- Gear spin for engineer ---
  if (group.userData.gearMesh) {
    const spinSpeed = u._healing ? 0.08 : 0.02;
    group.userData.gearMesh.rotation.z += spinSpeed;
  }

  // --- Drone orbit for medic ---
  if (group.userData._drone) {
    const drone = group.userData._drone;
    const orbitSpeed = u._healing ? 4 : 2;
    const orbitRadius = u._healing ? 3 : 5;
    const droneAngle = now * orbitSpeed + offset;
    drone.position.x = Math.cos(droneAngle) * orbitRadius;
    drone.position.z = Math.sin(droneAngle) * orbitRadius;
    drone.position.y = 22 + Math.sin(now * 2 + offset) * 1;
    drone.rotation.y = droneAngle;
  }

  // --- Heal range circle visibility ---
  if (group.userData._rangeCircle) {
    const rc = group.userData._rangeCircle;
    rc.visible = u._healing;
    if (rc.visible) {
      const healRange = u.healRange || 80;
      rc.scale.set(healRange, healRange, 1);
      rc.material.opacity = 0.03 + 0.02 * Math.sin(now * 2 + offset);
    }
  }

  // --- Heal beam (particle chain from unit to target) ---
  _updateHealBeam(group, u, now, offset, isMedic);
}

function _updateHealBeam(group, u, now, offset, isMedic) {
  const beamColor = isMedic ? MEDIC_COLOR : ENGINEER_COLOR;

  // Lazy-create particle chain
  if (!group.userData._healParticles) {
    const particles = [];
    for (let i = 0; i < HEAL_BEAM_PARTICLE_COUNT; i++) {
      // Alternating sizes: core particle + glow particle
      const size = (i % 2 === 0) ? 0.8 : 1.4;
      const mat = (i % 2 === 0)
        ? makeAccentMaterial(beamColor)
        : makeGlowMaterial(beamColor, 0.35);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 6, 4),
        mat
      );
      mesh.visible = false;
      group.add(mesh);
      particles.push(mesh);
    }
    group.userData._healParticles = particles;

    // Impact ring at the target end
    const impactRing = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.4, 4, 12),
      makeGlowMaterial(beamColor, 0.3)
    );
    impactRing.rotation.x = Math.PI / 2;
    impactRing.visible = false;
    group.add(impactRing);
    group.userData._healImpactRing = impactRing;
  }

  const particles = group.userData._healParticles;
  const impactRing = group.userData._healImpactRing;

  if (u._healing && u._healTargetX !== undefined) {
    // Delta from unit position to target (in local space since group.position = unit pos)
    const tdx = u._healTargetX - u.x;
    const tdz = u._healTargetZ - u.z;
    const d = Math.sqrt(tdx * tdx + tdz * tdz);

    if (d > 1) {
      // Origin height (injector tip for medic, weld tip for engineer)
      const originY = isMedic ? 7 : 7;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.visible = true;
        // Distribute along beam with flowing motion
        const baseT = (i + 1) / (particles.length + 1);
        // Add a flowing wave so particles stream toward target
        const flow = ((now * 3 + offset + i * 0.3) % 1);
        const t = baseT;

        p.position.set(
          tdx * t,
          originY + Math.sin(now * 6 + i * 1.2 + offset) * 1.5 - originY * t + 4 * t,
          tdz * t
        );

        // Pulsing scale
        const pulse = 0.7 + 0.5 * Math.sin(now * 8 + i * 0.8 + offset);
        p.scale.setScalar(pulse);

        // Update opacity for glow particles
        if (p.material.transparent) {
          p.material.opacity = 0.2 + 0.2 * Math.sin(now * 6 + i * 1.0);
        }
      }

      // Impact ring at target
      impactRing.visible = true;
      impactRing.position.set(tdx, 4, tdz);
      impactRing.material.opacity = 0.2 + 0.15 * Math.sin(now * 5 + offset);
      impactRing.rotation.z = now * 2;
      const ringPulse = 0.8 + 0.3 * Math.sin(now * 4);
      impactRing.scale.setScalar(ringPulse);
    }
  } else {
    // Hide all beam particles when not healing
    for (let i = 0; i < particles.length; i++) {
      particles[i].visible = false;
    }
    if (impactRing) impactRing.visible = false;
  }
}

function disposeGroup(group) {
  group.traverse(ch => {
    if (ch.isMesh) {
      if (ch.geometry) ch.geometry.dispose();
      if (ch.material) ch.material.dispose();
    }
  });
}
