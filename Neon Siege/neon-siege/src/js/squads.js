// ============================================================
// squads.js — Squad command system
// ============================================================
// Each production building (Barracks/Factory) has a squad.
// Units produced by that building join its squad.
// Commands are set per-squad and propagated to member units.
// Helicopters are excluded — they use their own rally system.
// ============================================================

import {
  STANCE_ADVANCE, STANCE_DEFEND, STANCE_HOLD, STANCE_RALLY,
  TARGET_ANY, TARGET_UNITS, TARGET_BUILDINGS,
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
    stance: STANCE_ADVANCE,
    targetPriority: TARGET_ANY,
    unitIds: new Set(),
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

  const squad = squads[idx];

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
 * Sets the unit's stance, targetPriority, and squadId fields.
 * Skips helicopters.
 */
export function assignUnitToSquad(unit, buildingId) {
  if (!unit || unit.type === UTYPE_HELICOPTER) return;

  const squad = getSquadByBuilding(buildingId);
  if (!squad) return;

  unit.squadId = squad.id;
  unit.stance = squad.stance;
  unit.targetPriority = squad.targetPriority;
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
// Commands
// ============================================================

/**
 * Set the stance for a squad. Propagates to all living member units.
 */
export function setSquadStance(squadId, stance, getUnitsCallback) {
  const squad = getSquadById(squadId);
  if (!squad) return;
  squad.stance = stance;
  propagateToMembers(squad, getUnitsCallback);
}

/**
 * Set the target priority for a squad. Propagates to all living member units.
 */
export function setSquadTargetPriority(squadId, priority, getUnitsCallback) {
  const squad = getSquadById(squadId);
  if (!squad) return;
  squad.targetPriority = priority;
  propagateToMembers(squad, getUnitsCallback);
}

/**
 * Global stance command: set stance for ALL squads of a given building type
 * (or all squads if buildingType is null) for a team.
 */
export function setGlobalStance(team, stance, getUnitsCallback, buildingType) {
  for (let i = 0; i < squads.length; i++) {
    const s = squads[i];
    if (s.team !== team) continue;
    if (buildingType && s.buildingType !== buildingType) continue;
    s.stance = stance;
    propagateToMembers(s, getUnitsCallback);
  }
}

/**
 * Set a squad to RALLY stance with a specific rally point.
 * If the squad is already in RALLY stance, just updates the rally coordinates.
 */
export function setSquadRally(squadId, worldX, worldZ, getUnitsCallback) {
  const squad = getSquadById(squadId);
  if (!squad) return;
  squad.rallyX = worldX;
  squad.rallyZ = worldZ;
  squad.stance = STANCE_RALLY;
  propagateToMembers(squad, getUnitsCallback);
}

/**
 * Set ALL squads for a team to RALLY stance with a specific rally point.
 */
export function setGlobalRally(team, worldX, worldZ, getUnitsCallback) {
  for (let i = 0; i < squads.length; i++) {
    const s = squads[i];
    if (s.team !== team) continue;
    s.rallyX = worldX;
    s.rallyZ = worldZ;
    s.stance = STANCE_RALLY;
    propagateToMembers(s, getUnitsCallback);
  }
}

/**
 * Global target priority command: set priority for ALL squads of a given
 * building type (or all squads if buildingType is null) for a team.
 */
export function setGlobalTargetPriority(team, priority, getUnitsCallback, buildingType) {
  for (let i = 0; i < squads.length; i++) {
    const s = squads[i];
    if (s.team !== team) continue;
    if (buildingType && s.buildingType !== buildingType) continue;
    s.targetPriority = priority;
    propagateToMembers(s, getUnitsCallback);
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

// ============================================================
// Internal helpers
// ============================================================

function propagateToMembers(squad, getUnitsCallback) {
  if (!getUnitsCallback) return;
  const allUnits = getUnitsCallback();
  for (let i = 0; i < allUnits.length; i++) {
    const u = allUnits[i];
    if (u.alive && u.squadId === squad.id) {
      const stanceChanged = u.stance !== squad.stance;
      u.stance = squad.stance;
      u.targetPriority = squad.targetPriority;

      // Propagate rally coordinates for RALLY stance
      if (squad.stance === STANCE_RALLY && squad.rallyX != null) {
        const coordsChanged = u.squadRallyX !== squad.rallyX || u.squadRallyZ !== squad.rallyZ;
        u.squadRallyX = squad.rallyX;
        u.squadRallyZ = squad.rallyZ;
        // When rally point moves, clear movement state so units repath immediately
        if (coordsChanged) {
          u.path = null;
          u.pathIndex = 0;
          u._defendTargetId = null;
          u._wallTarget = null;
        }
      }

      if (stanceChanged) {
        // Clear movement state so units react immediately to new stance
        u.path = null;
        u.pathIndex = 0;
        u._defendTargetId = null;
        u._wallTarget = null;
        // Release rally hold when switching away from advance
        if (squad.stance !== STANCE_ADVANCE) {
          u.rallyHold = false;
          u._rallyAssigned = false;
        }
      }
    }
  }
}
