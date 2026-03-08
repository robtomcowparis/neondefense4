// ============================================================
// economy.js — Energy resource system with generators and territory
// ============================================================

import {
  TEAM_PLAYER,
  TEAM_ENEMY,
  STARTING_ENERGY,
  BTYPE_GENERATOR,
  BUILDING_STATS,
  TERRITORY_INCOME_PER_BUILDING,
  DIFFICULTY,
} from './config.js';
import { getSharedZoneControl } from './map.js';
import { getGeneratorStats } from './buildings.js';

let energy = { 0: 0, 1: 0 };
let incomeAccum = { 0: 0, 1: 0 };
let difficulty = 'normal';

// Last computed income breakdown per team
let breakdown = {
  [TEAM_PLAYER]: { generators: 0, territory: 0, net: 0 },
  [TEAM_ENEMY]:  { generators: 0, territory: 0, net: 0 },
};

export function createEconomy(diff) {
  difficulty = diff || 'normal';
  const diffSettings = DIFFICULTY[difficulty] || DIFFICULTY.normal;
  energy[TEAM_PLAYER] = diffSettings.playerStartEnergy || STARTING_ENERGY;
  energy[TEAM_ENEMY] = diffSettings.aiStartEnergy || STARTING_ENERGY;
  incomeAccum[TEAM_PLAYER] = 0;
  incomeAccum[TEAM_ENEMY] = 0;
  breakdown = {
    [TEAM_PLAYER]: { generators: 0, territory: 0, net: 0 },
    [TEAM_ENEMY]:  { generators: 0, territory: 0, net: 0 },
  };
}

export function updateEconomy(dt, callbacks) {
  const buildings = callbacks ? callbacks.getBuildings() : [];

  // Territory control from shared zone
  const zoneControl = getSharedZoneControl(buildings);

  const diffSettings = DIFFICULTY[difficulty] || DIFFICULTY.normal;

  for (const team of [TEAM_PLAYER, TEAM_ENEMY]) {
    // 1. Generator income (per-building level/branch aware)
    let generatorIncome = 0;
    let bestTerritoryMult = 1.0;
    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];
      if (b.alive && b.team === team && b.type === BTYPE_GENERATOR) {
        const gStats = getGeneratorStats(b);
        if (gStats) {
          generatorIncome += gStats.incomeBonus;
          if (gStats.territoryMult > bestTerritoryMult) {
            bestTerritoryMult = gStats.territoryMult;
          }
        } else {
          // Fallback for generators without level data
          generatorIncome += BUILDING_STATS[BTYPE_GENERATOR].incomeBonus;
        }
      }
    }

    // AI income multiplier applies to generator output
    if (team === TEAM_ENEMY) {
      generatorIncome *= diffSettings.aiIncomeMult;
    }

    // 2. Territory income (buildings in shared zone), scaled by best generator territory multiplier
    const territoryCount = team === TEAM_PLAYER ? zoneControl.player : zoneControl.enemy;
    const territoryIncome = TERRITORY_INCOME_PER_BUILDING * territoryCount * bestTerritoryMult;

    // 3. Net income
    const netIncome = generatorIncome + territoryIncome;

    // Store breakdown
    breakdown[team] = {
      generators: generatorIncome,
      territory: territoryIncome,
      net: netIncome,
    };

    // Accumulate and apply
    incomeAccum[team] += netIncome * dt;
    if (incomeAccum[team] >= 1) {
      const whole = Math.floor(incomeAccum[team]);
      energy[team] += whole;
      incomeAccum[team] -= whole;
    }
  }
}

export function getEnergy(team) {
  return energy[team];
}

export function spendEnergy(team, amount) {
  if (energy[team] < amount) return false;
  energy[team] -= amount;
  return true;
}

export function addEnergy(team, amount) {
  energy[team] += amount;
}

export function getIncomeBreakdown(team) {
  return breakdown[team];
}

export function resetEconomy() {
  energy = { 0: 0, 1: 0 };
  incomeAccum = { 0: 0, 1: 0 };
  difficulty = 'normal';
  breakdown = {
    [TEAM_PLAYER]: { generators: 0, territory: 0, net: 0 },
    [TEAM_ENEMY]:  { generators: 0, territory: 0, net: 0 },
  };
}
