// ============================================================
// squads.js — Squad membership and spawn stance system
// ============================================================
// Each production building (Barracks/Factory/Helipad) has a squad.
// Units produced by that building join its squad (membership tracking).
//
// KEY CHANGE: Squads no longer dictate live unit stances.
// Instead, squads have a "spawnStance" and "spawnTargetPriority"
// that are copied to units ONE TIME at creation. After that,
// each unit owns its own stance/targetPriority independently.
//
// Commands are now issued to SELECTED UNITS (via input.js box/click
// selection), not to squads. Squad membership is used for:
//   - Highlighting squadmates when a unit is clicked
//   - Squad card click-to-select-all
//   - Informational display (unit count per building)
//   - Spawn stance configuration per building
//
// Helicopters are excluded — they use their own rally system.
// ============================================================

import {
  STANCE_ADVANCE, STANCE_DEFEND, STANCE_HOLD, STANCE_RALLY,
  TARGET_ANY, TARGET_UNITS, TARGET_BUILDINGS,
  SPAWN_STANCE_DEFAULT, SPAWN_TARGET_DEFAULT,
  TEAM_PLAYER, TEAM_ENEMY,
  BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_HELIPAD,
  UTYPE_HELICOPTER,
} from './config.js';
import { nextId } from './utils.js';

let squads = [];
// Per-team, per-type counters for squad labels
let _nextSquadLabel = {
  [TEAM_PLAYER]: { barracks: 0, factory: 0, helipad: 0 },
  [TEAM_ENEMY]:  { barracks: 0, factory: 0, helipad: 0 },
};

// ============================================================
// Squad creation / destruction
// ============================================================

function _typeKey(buildingType) {
  if (buildingType === BTYPE_FACTORY) return 'factory';
  if (buildingType === BTYPE_HELIPAD) return 'helipad';
  return 'barracks';
}

function _typeLabel(typeKey) {
  if (typeKey === 'factory') return 'Factory';
  if (typeKey === 'helipad') return 'Helipad';
  return 'Barracks';
}

/**
 * Create a squad linked to a production building.
 * Returns the squad object.
 */
export function createSquad(buildingId, team, buildingType) {
  const typeKey = _typeKey(buildingType);
  _nextSquadLabel[team][typeKey]++;
  const label = `${_typeLabel(typeKey)} ${_nextSquadLabel[team][typeKey]}`;

  const squad = {
    id: nextId(),
    buildingId,
    team,
    buildingType,
    label,
    // Spawn stance: copied to new units at creation time (one-time copy)
    spawnStance: SPAWN_STANCE_DEFAULT,
    spawnTargetPriority: SPAWN_TARGET_DEFAULT,
    unitIds: new Set(),
    // Rally point (used when units are commanded to rally via selection)
    rallyX: null,
    rallyZ: null,
  };

  squads.push(squad);
  return squad;
}

/**
 * Remove a squad (e.g. when its building is destroyed).
 * Orphaned units keep their last stance/priority but lose squadId.
 */
export function removeSquad(squadId, getUnitsCallback) {
  const idx = squads.findIndex(s => s.id === squadId);
  if (idx === -1) return;

  // Clear squadId on member units
  if (getUnitsCallback) {
    const allUnits = getUnitsCallback();
    for (let i = 0; i < allUnits.length; i++) {
      const u = allUnits[i];
      if (u.squadId === squadId) {
        u.squadId = null;
      }
    }
  }

  squads.splice(idx, 1);
}

/**
 * Find the squad linked to a building.
 */
export function getSquadByBuilding(buildingId) {
  for (let i = 0; i < squads.length; i++) {
    if (squads[i].buildingId === buildingId) return squads[i];
  }
  return null;
}

// ============================================================
// Unit membership
// ============================================================

/**
 * Add a unit to its parent building's squad.
 * Sets the unit's stance and targetPriority from the squad's SPAWN defaults.
 * This is a one-time copy — the unit independently owns its stance after this.
 * Skips helicopters.
 */
export function assignUnitToSquad(unit, buildingId) {
  if (!unit || unit.type === UTYPE_HELICOPTER) return;

  const squad = getSquadByBuilding(buildingId);
  if (!squad) return;

  unit.squadId = squad.id;
  // One-time copy of spawn stance to unit
  unit.stance = squad.spawnStance;
  unit.targetPriority = squad.spawnTargetPriority;
  squad.unitIds.add(unit.id);
}

/**
 * Remove a dead unit from its squad's membership set.
 */
export function removeUnitFromSquad(unit) {
  if (!unit || unit.squadId == null) return;
  const squad = getSquadById(unit.squadId);
  if (squad) squad.unitIds.delete(unit.id);
}

// ============================================================
// Spawn stance commands (affect FUTURE units only)
// ============================================================

/**
 * Set the spawn stance for a squad. Only affects units produced AFTER this call.
 */
export function setSquadSpawnStance(squadId, stance) {
  const squad = getSquadById(squadId);
  if (!squad) return;
  squad.spawnStance = stance;
}

/**
 * Set the spawn target priority for a squad. Only affects future units.
 */
export function setSquadSpawnTargetPriority(squadId, priority) {
  const squad = getSquadById(squadId);
  if (!squad) return;
  squad.spawnTargetPriority = priority;
}

// ============================================================
// Direct unit commands (for selections — replaces old propagation)
// ============================================================

/**
 * Set stance on a single unit and clear its movement state so it reacts immediately.
 */
export function setUnitStance(unit, stance) {
  if (!unit || !unit.alive) return;
  const changed = unit.stance !== stance;
  unit.stance = stance;
  if (changed) {
    unit.path = null;
    unit.pathIndex = 0;
    unit._defendTargetId = null;
    unit._wallTarget = null;
    if (stance !== STANCE_ADVANCE) {
      unit.rallyHold = false;
      unit._rallyAssigned = false;
    }
  }
}

/**
 * Set target priority on a single unit.
 */
export function setUnitTargetPriority(unit, priority) {
  if (!unit || !unit.alive) return;
  unit.targetPriority = priority;
}

/**
 * Set stance on an array of units (batch — for box/click selections).
 */
export function setUnitsStance(units, stance) {
  for (let i = 0; i < units.length; i++) {
    setUnitStance(units[i], stance);
  }
}

/**
 * Set target priority on an array of units (batch).
 */
export function setUnitsTargetPriority(units, priority) {
  for (let i = 0; i < units.length; i++) {
    setUnitTargetPriority(units[i], priority);
  }
}

/**
 * Set rally point on an array of units. Sets stance to RALLY and
 * stores the rally coordinates on each unit.
 */
export function setUnitsRally(units, worldX, worldZ) {
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (!u || !u.alive) continue;
    u.squadRallyX = worldX;
    u.squadRallyZ = worldZ;
    setUnitStance(u, STANCE_RALLY);
  }
}

/**
 * Set ALL player units to a given stance (global command).
 */
export function setAllUnitsStance(team, stance, getUnitsCallback) {
  if (!getUnitsCallback) return;
  const allUnits = getUnitsCallback();
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (u.alive && u.team === team && u.type !== UTYPE_HELICOPTER) {
      setUnitStance(u, stance);
    }
  }
}

/**
 * Set ALL player units to a given target priority (global command).
 */
export function setAllUnitsTargetPriority(team, priority, getUnitsCallback) {
  if (!getUnitsCallback) return;
  const allUnits = getUnitsCallback();
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (u.alive && u.team === team && u.type !== UTYPE_HELICOPTER) {
      setUnitTargetPriority(u, priority);
    }
  }
}

/**
 * Set ALL player units to RALLY at a given world position (global rally).
 */
export function setAllUnitsRally(team, worldX, worldZ, getUnitsCallback) {
  if (!getUnitsCallback) return;
  const allUnits = getUnitsCallback();
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (u.alive && u.team === team && u.type !== UTYPE_HELICOPTER) {
      u.squadRallyX = worldX;
      u.squadRallyZ = worldZ;
      setUnitStance(u, STANCE_RALLY);
    }
  }
}

// ============================================================
// Queries
// ============================================================

/** Get a squad by ID. */
export function getSquadById(squadId) {
  for (let i = 0; i < squads.length; i++) {
    if (squads[i].id === squadId) return squads[i];
  }
  return null;
}

/** Get all squads for a team. */
export function getSquads(team) {
  return squads.filter(s => s.team === team);
}

/** Get alive unit count for a squad. */
export function getSquadUnitCount(squad, getUnitsCallback) {
  if (!squad || !getUnitsCallback) return 0;
  let count = 0;
  const units = getUnitsCallback();
  for (let i = 0; i < units.length; i++) {
    if (units[i].alive && units[i].squadId === squad.id) count++;
  }
  return count;
}

/** Get all alive units belonging to a squad. */
export function getUnitsBySquad(squadId, getUnitsCallback) {
  if (!getUnitsCallback) return [];
  const result = [];
  const units = getUnitsCallback();
  for (let i = 0; i < units.length; i++) {
    if (units[i].alive && units[i].squadId === squadId) {
      result.push(units[i]);
    }
  }
  return result;
}

/** Clean up dead unit IDs from all squad membership sets. */
export function cleanSquadMembership(getUnitsCallback) {
  const alive = getUnitsCallback();
  const aliveIds = new Set();
  for (let i = 0; i < alive.length; i++) {
    if (alive[i].alive) aliveIds.add(alive[i].id);
  }
  for (let i = 0; i < squads.length; i++) {
    const s = squads[i];
    for (const uid of s.unitIds) {
      if (!aliveIds.has(uid)) s.unitIds.delete(uid);
    }
  }
}

// ============================================================
// Reset
// ============================================================

export function resetSquads() {
  squads = [];
  _nextSquadLabel = {
    [TEAM_PLAYER]: { barracks: 0, factory: 0, helipad: 0 },
    [TEAM_ENEMY]:  { barracks: 0, factory: 0, helipad: 0 },
  };
}
