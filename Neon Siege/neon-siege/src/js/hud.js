// ============================================================
// hud.js — DOM-based sidebar HUD management
// ============================================================

import {
  BUILDING_STATS, PLAYER_BUILDABLE,
  BTYPE_CORE, BTYPE_TURRET, BTYPE_BARRACKS, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL,
  TEAM_PLAYER, TEAM_ENEMY,
  GRID_COLS, GRID_ROWS, TILE_SIZE, MAP_W, MAP_H,
  PLAYER_BUILD_ROW_MIN, ENEMY_BUILD_ROW_MAX,
  UNIT_STATS,
  STANCE_ADVANCE, STANCE_DEFEND, STANCE_HOLD, STANCE_RALLY,
  TARGET_ANY, TARGET_UNITS, TARGET_BUILDINGS,
  WALL_HORIZONTAL, WALL_VERTICAL, WALL_CORNER_NE, WALL_CORNER_NW, WALL_CORNER_SE, WALL_CORNER_SW,
  WALL_DEMOLISH_REFUND_RATIO,
  SPAWN_STANCE_DEFAULT, SPAWN_TARGET_DEFAULT,
} from './config.js';
import {
  getTurretStats, getProductionStats, getGeneratorStats,
  canUpgradeBuilding, canBranchBuilding,
  getUpgradeCost, getBranchCost,
} from './buildings.js';

let container = null;
let callbacks = null;
let elements = {};
let selectedBuildType = null;
let selectedBuilding = null;
let _lastBuildingActionsKey = '';

// Base alert state
let _lastBaseUnderAttack = false;
let _alertCooldown = 0;
let _alertVisible = false;
let _alertShowTime = 0;

// Minimap constants
const MINIMAP_SIZE = 200;
const MINIMAP_SCALE = MINIMAP_SIZE / MAP_W;

// Helicopter selection state
let _selectedHeli = null;

// Squad rally placement state
let _squadRallyPendingId = null;  // squad ID, 'all', or null

export function initHUD(sidebarContainer, cbs) {
  container = sidebarContainer;
  callbacks = cbs;

  container.innerHTML = '';

  // --- Resource Section ---
  const resourceSection = makeSection('ENERGY');
  const resourceDisplay = document.createElement('div');
  resourceDisplay.className = 'resource-display';
  resourceDisplay.innerHTML = '<span>&#9889;</span> <span class="energy-value">100</span>';
  resourceSection.appendChild(resourceDisplay);

  const incomeDisplay = document.createElement('div');
  incomeDisplay.className = 'income-display';
  incomeDisplay.innerHTML = '<span class="income-net">+0/s</span>';
  resourceSection.appendChild(incomeDisplay);

  const incomeDetails = document.createElement('div');
  incomeDetails.className = 'income-details';
  incomeDetails.innerHTML = `
    <div class="income-row"><span>Generators</span><span class="income-val income-gen" id="inc-gen">+0</span></div>
    <div class="income-row"><span>Territory</span><span class="income-val" id="inc-terr">+0</span></div>
  `;
  resourceSection.appendChild(incomeDetails);

  container.appendChild(resourceSection);
  elements.energyValue = resourceDisplay.querySelector('.energy-value');
  elements.incomeNet = incomeDisplay.querySelector('.income-net');
  elements.incGen = incomeDetails.querySelector('#inc-gen');
  elements.incTerr = incomeDetails.querySelector('#inc-terr');

  // --- Base Health Section ---
  const healthSection = makeSection('BASE STATUS');

  const playerHpLabel = makeHpLabel('YOUR BASE', '2000 / 2000');
  const playerHpTrack = makeHpBar();
  healthSection.appendChild(playerHpLabel.container);
  healthSection.appendChild(playerHpTrack.track);
  elements.playerHpLabel = playerHpLabel.valueEl;
  elements.playerHpFill = playerHpTrack.fill;

  const enemyHpLabel = makeHpLabel('ENEMY BASE', '2000 / 2000');
  const enemyHpTrack = makeHpBar();
  enemyHpLabel.container.style.marginTop = '8px';
  healthSection.appendChild(enemyHpLabel.container);
  healthSection.appendChild(enemyHpTrack.track);
  elements.enemyHpLabel = enemyHpLabel.valueEl;
  elements.enemyHpFill = enemyHpTrack.fill;

  container.appendChild(healthSection);

  // --- Build Menu Section ---
  const buildSection = makeSection('BUILD');
  elements.buildButtons = {};

  for (const type of PLAYER_BUILDABLE) {
    const stats = BUILDING_STATS[type];
    const btn = document.createElement('button');
    btn.className = 'build-btn';
    btn.innerHTML = `<span>${stats.label}</span><span class="cost">${stats.cost} E</span>`;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      deselectBuilding();
      hideHelicopterInfo();
      if (selectedBuildType === type) {
        selectedBuildType = null;
        btn.classList.remove('selected');
      } else {
        if (selectedBuildType && elements.buildButtons[selectedBuildType]) {
          elements.buildButtons[selectedBuildType].classList.remove('selected');
        }
        selectedBuildType = type;
        btn.classList.add('selected');
      }
      if (callbacks && callbacks.onBuildSelect) {
        callbacks.onBuildSelect(selectedBuildType);
      }
    });
    buildSection.appendChild(btn);
    elements.buildButtons[type] = btn;
  }

  container.appendChild(buildSection);

  // --- Building Info Section (hidden by default, used for any upgradeable building) ---
  const buildingSection = document.createElement('div');
  buildingSection.className = 'sidebar-section building-section hidden';
  buildingSection.innerHTML = `
    <div class="sidebar-title building-title">BUILDING</div>
    <div class="building-level"></div>
    <div class="building-stats"></div>
    <div class="building-tracker"></div>
    <div class="building-construction hidden">
      <div class="construction-label"></div>
      <div class="hp-bar-track"><div class="hp-bar-fill construction-fill" style="width:0%"></div></div>
    </div>
    <div class="building-actions"></div>
  `;
  container.appendChild(buildingSection);
  elements.buildingSection = buildingSection;
  elements.buildingTitle = buildingSection.querySelector('.building-title');
  elements.buildingLevel = buildingSection.querySelector('.building-level');
  elements.buildingStats = buildingSection.querySelector('.building-stats');
  elements.buildingTracker = buildingSection.querySelector('.building-tracker');
  elements.buildingConstruction = buildingSection.querySelector('.building-construction');
  elements.constructionLabel = buildingSection.querySelector('.construction-label');
  elements.constructionFill = buildingSection.querySelector('.construction-fill');
  elements.buildingActions = buildingSection.querySelector('.building-actions');

  // --- Helicopter Info Section (hidden by default) ---
  const heliSection = document.createElement('div');
  heliSection.className = 'sidebar-section helicopter-section hidden';
  heliSection.innerHTML = `
    <div class="sidebar-title heli-title">HELICOPTER</div>
    <div class="heli-hp-row">
      <span class="heli-hp-label">HP</span>
      <span class="heli-hp-value"></span>
    </div>
    <div class="hp-bar-track"><div class="hp-bar-fill heli-hp-fill hp-high" style="width:100%"></div></div>
    <div class="heli-rally-hint">CLICK MAP TO SET RALLY POINT</div>
    <button class="build-btn heli-deselect-btn">DESELECT</button>
  `;
  container.appendChild(heliSection);
  elements.heliSection = heliSection;
  elements.heliHpValue = heliSection.querySelector('.heli-hp-value');
  elements.heliHpFill = heliSection.querySelector('.heli-hp-fill');
  const heliDeselectBtn = heliSection.querySelector('.heli-deselect-btn');
  heliDeselectBtn.addEventListener('click', () => {
    hideHelicopterInfo();
    if (callbacks && callbacks.onHeliDeselect) callbacks.onHeliDeselect();
  });

  // --- Base Alert Element (above player HP bar) ---
  const baseAlert = document.createElement('div');
  baseAlert.className = 'base-alert hidden';
  baseAlert.textContent = 'BASE UNDER ATTACK';
  healthSection.insertBefore(baseAlert, playerHpLabel.container);
  elements.baseAlert = baseAlert;
  elements.playerHpTrack = playerHpTrack.track;

  // --- Unit Count Section ---
  const unitSection = makeSection('UNITS');
  const unitCountContainer = document.createElement('div');
  unitCountContainer.innerHTML = `
    <div class="unit-count"><span class="unit-count-label">Player Units</span><span class="unit-count-value" id="player-unit-count">0</span></div>
    <div class="unit-count"><span class="unit-count-label">Enemy Units</span><span class="unit-count-value" id="enemy-unit-count">0</span></div>
  `;
  unitSection.appendChild(unitCountContainer);
  container.appendChild(unitSection);
  elements.playerUnitCount = unitCountContainer.querySelector('#player-unit-count');
  elements.enemyUnitCount = unitCountContainer.querySelector('#enemy-unit-count');

  // --- Selection Command Bar (hidden by default, shows when units are selected) ---
  const selCmdSection = document.createElement('div');
  selCmdSection.className = 'sidebar-section selection-command-bar hidden';
  selCmdSection.innerHTML = `
    <div class="sidebar-title sel-cmd-title">0 UNITS SELECTED</div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">CMD</span>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${STANCE_ADVANCE}">ADV</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${STANCE_DEFEND}">DEF</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${STANCE_HOLD}">HOLD</button>
      <button class="sel-cmd-btn sel-cmd-btn--rally" data-sel="rally">RALLY</button>
    </div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">TGT</span>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${TARGET_ANY}">ANY</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${TARGET_UNITS}">UNIT</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${TARGET_BUILDINGS}">BLDG</button>
    </div>
    <button class="build-btn sel-deselect-btn">DESELECT</button>
  `;
  container.appendChild(selCmdSection);
  elements.selCmdSection = selCmdSection;
  elements.selCmdTitle = selCmdSection.querySelector('.sel-cmd-title');

  // Wire selection command bar buttons
  selCmdSection.querySelectorAll('[data-sel="stance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onSelectionStance) callbacks.onSelectionStance(btn.dataset.val);
    });
  });
  selCmdSection.querySelectorAll('[data-sel="rally"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onSelectionRallyClick) callbacks.onSelectionRallyClick();
    });
  });
  selCmdSection.querySelectorAll('[data-sel="target"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onSelectionTarget) callbacks.onSelectionTarget(btn.dataset.val);
    });
  });
  selCmdSection.querySelector('.sel-deselect-btn').addEventListener('click', () => {
    if (callbacks && callbacks.onSelectionDeselect) callbacks.onSelectionDeselect();
  });

  // --- Squad Command Section (hidden by default) ---
  const squadSection = document.createElement('div');
  squadSection.className = 'sidebar-section squad-section hidden';
  squadSection.innerHTML = `
    <div class="sidebar-title squad-title">SQUADS</div>
    <div class="squad-global-row">
      <div class="squad-global-group">
        <span class="squad-global-label">ALL</span>
        <button class="squad-global-btn" data-global="stance" data-val="${STANCE_ADVANCE}">ADV</button>
        <button class="squad-global-btn" data-global="stance" data-val="${STANCE_DEFEND}">DEF</button>
        <button class="squad-global-btn" data-global="stance" data-val="${STANCE_HOLD}">HOLD</button>
        <button class="squad-global-btn squad-global-btn--rally" data-global="rally" data-val="all">RALLY</button>
      </div>
      <div class="squad-global-group">
        <span class="squad-global-label">TGT</span>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${TARGET_ANY}">ANY</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${TARGET_UNITS}">UNIT</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${TARGET_BUILDINGS}">BLDG</button>
      </div>
    </div>
    <div class="squad-cards"></div>
  `;
  container.appendChild(squadSection);
  elements.squadSection = squadSection;
  elements.squadCards = squadSection.querySelector('.squad-cards');

  // Wire global squad buttons
  squadSection.querySelectorAll('[data-global="stance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onGlobalStance) callbacks.onGlobalStance(btn.dataset.val);
    });
  });
  squadSection.querySelectorAll('[data-global="target"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onGlobalTarget) callbacks.onGlobalTarget(btn.dataset.val);
    });
  });
  squadSection.querySelectorAll('[data-global="rally"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onGlobalRallyClick) callbacks.onGlobalRallyClick();
    });
  });

  // --- Selection Box Overlay (for box-drag selection visual) ---
  const selBoxOverlay = document.createElement('div');
  selBoxOverlay.className = 'selection-box hidden';
  document.body.appendChild(selBoxOverlay);
  elements.selBoxOverlay = selBoxOverlay;

  // --- Rally Section (hidden by default) ---
  const rallySection = document.createElement('div');
  rallySection.className = 'sidebar-section rally-section hidden';
  rallySection.innerHTML = `
    <div class="sidebar-title">RALLY</div>
    <div class="rally-count">0 / 3</div>
    <div class="hp-bar-track"><div class="hp-bar-fill rally-fill" style="width:0%"></div></div>
    <div class="rally-timer">Push in 0.0s</div>
    <button class="build-btn rally-push-btn">PUSH NOW</button>
  `;
  container.appendChild(rallySection);
  elements.rallySection = rallySection;
  elements.rallyCount = rallySection.querySelector('.rally-count');
  elements.rallyFill = rallySection.querySelector('.rally-fill');
  elements.rallyTimer = rallySection.querySelector('.rally-timer');
  const pushBtn = rallySection.querySelector('.rally-push-btn');
  pushBtn.addEventListener('click', () => {
    if (callbacks && callbacks.onPushNow) callbacks.onPushNow();
  });

  // --- Minimap Section ---
  const minimapSection = makeSection('MAP');
  const minimapCanvas = document.createElement('canvas');
  minimapCanvas.className = 'minimap-canvas';
  minimapCanvas.width = MINIMAP_SIZE;
  minimapCanvas.height = MINIMAP_SIZE;
  minimapSection.appendChild(minimapCanvas);
  container.appendChild(minimapSection);
  elements.minimapCanvas = minimapCanvas;
  elements.minimapCtx = minimapCanvas.getContext('2d');

  // Minimap click handler
  minimapCanvas.addEventListener('click', (e) => {
    const rect = minimapCanvas.getBoundingClientRect();
    const scaleX = MINIMAP_SIZE / rect.width;
    const scaleY = MINIMAP_SIZE / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    const worldX = clickX / MINIMAP_SCALE;
    const worldZ = clickY / MINIMAP_SCALE;

    // If squad rally placement is pending, minimap click sets the rally point
    if (_squadRallyPendingId != null && callbacks && callbacks.onRallySet) {
      callbacks.onRallySet(_squadRallyPendingId, worldX, worldZ);
      _squadRallyPendingId = null;
      return;
    }

    // If a helicopter is selected, minimap click sets rally point
    if (_selectedHeli && callbacks && callbacks.onHelicopterRally) {
      callbacks.onHelicopterRally(_selectedHeli.id, worldX, worldZ);
      hideHelicopterInfo();
      if (callbacks.onHeliDeselect) callbacks.onHeliDeselect();
      return;
    }

    if (callbacks && callbacks.onMinimapClick) {
      callbacks.onMinimapClick(worldX, worldZ);
    }
  });

  // --- Info Section ---
  const infoSection = makeSection('INFO');
  const infoPanel = document.createElement('div');
  infoPanel.className = 'info-panel';
  infoPanel.textContent = 'Click a building type to place it.';
  infoSection.appendChild(infoPanel);
  container.appendChild(infoSection);
  elements.infoPanel = infoPanel;

  // --- Match Timer ---
  const timer = document.createElement('div');
  timer.className = 'match-timer';
  timer.textContent = '00:00';
  container.appendChild(timer);
  elements.matchTimer = timer;
}

export function updateHUD(state) {
  if (!elements.energyValue) return;

  // Energy
  elements.energyValue.textContent = Math.floor(state.energy);

  // Income breakdown
  if (state.incomeBreakdown && elements.incomeNet) {
    const bd = state.incomeBreakdown;
    const sign = bd.net >= 0 ? '+' : '';
    elements.incomeNet.textContent = `${sign}${bd.net.toFixed(1)}/s`;
    elements.incomeNet.className = 'income-net' + (bd.net <= 0 ? ' income-low' : '');
    elements.incGen.textContent = bd.generators > 0 ? `+${bd.generators.toFixed(1)}` : '+0';
    elements.incTerr.textContent = bd.territory > 0 ? `+${bd.territory.toFixed(1)}` : '+0';
  }

  // Find cores
  let playerCore = null;
  let enemyCore = null;
  if (state.buildings) {
    for (const b of state.buildings) {
      if (b.type === BTYPE_CORE && b.team === TEAM_PLAYER) playerCore = b;
      if (b.type === BTYPE_CORE && b.team === TEAM_ENEMY) enemyCore = b;
    }
  }

  // Player base HP
  if (playerCore) {
    const stats = BUILDING_STATS[BTYPE_CORE];
    const pct = Math.max(0, playerCore.hp / stats.hp);
    elements.playerHpFill.style.width = (pct * 100) + '%';
    elements.playerHpFill.className = 'hp-bar-fill ' + hpColorClass(pct);
    elements.playerHpLabel.textContent = `${Math.ceil(playerCore.hp)} / ${stats.hp}`;
  }

  // Enemy base HP
  if (enemyCore) {
    const stats = BUILDING_STATS[BTYPE_CORE];
    const pct = Math.max(0, enemyCore.hp / stats.hp);
    elements.enemyHpFill.style.width = (pct * 100) + '%';
    elements.enemyHpFill.className = 'hp-bar-fill ' + hpColorClass(pct);
    elements.enemyHpLabel.textContent = `${Math.ceil(enemyCore.hp)} / ${stats.hp}`;
  }

  // Match timer
  if (state.matchTime != null) {
    const totalSec = Math.floor(state.matchTime);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    elements.matchTimer.textContent =
      String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }

  // Build button disabled states
  for (const type of PLAYER_BUILDABLE) {
    const stats = BUILDING_STATS[type];
    const btn = elements.buildButtons[type];
    if (!btn) continue;
    if (state.energy < stats.cost) {
      btn.classList.add('disabled');
    } else {
      btn.classList.remove('disabled');
    }
  }

  // Unit counts
  if (state.units) {
    let playerCount = 0;
    let enemyCount = 0;
    for (const u of state.units) {
      if (u.team === TEAM_PLAYER) playerCount++;
      else enemyCount++;
    }
    elements.playerUnitCount.textContent = playerCount;
    elements.enemyUnitCount.textContent = enemyCount;
  }

  // --- Selection Command Bar ---
  updateSelectionCommandBar(state);

  // --- Squad Commands ---
  updateSquadSection(state);

  // --- Selection Box Overlay ---
  updateSelectionBox(state);

  // --- Base Alert (Task 10) ---
  updateBaseAlert(state.baseUnderAttack, state.dt || 0);

  // --- Rally Indicator (Task 11) ---
  updateRallySection(state);

  // --- Minimap (Task 9) ---
  drawMinimap(state);

  // Update building selection panel
  if (selectedBuilding) {
    updateBuildingPanel(selectedBuilding, state.energy, state.squads);
  }

  // Update helicopter selection panel HP if visible
  if (_selectedHeli && _selectedHeli.alive) {
    updateHelicopterPanel(_selectedHeli);
  } else if (_selectedHeli && !_selectedHeli.alive) {
    hideHelicopterInfo();
    if (callbacks && callbacks.onHeliDeselect) callbacks.onHeliDeselect();
  }
}

// ---- Helicopter selection ----

export function showHelicopterInfo(heli) {
  if (!heli) return;
  _selectedHeli = heli;
  deselectBuilding();
  clearBuildSelection();
  elements.heliSection.classList.remove('hidden');
  updateHelicopterPanel(heli);
}

export function hideHelicopterInfo() {
  _selectedHeli = null;
  if (elements.heliSection) {
    elements.heliSection.classList.add('hidden');
  }
}

function updateHelicopterPanel(heli) {
  const stats = UNIT_STATS[heli.type];
  if (!stats) return;
  const maxHp = heli.maxHp || stats.hp;
  const pct = Math.max(0, heli.hp / maxHp);
  elements.heliHpValue.textContent = `${Math.ceil(heli.hp)} / ${maxHp}`;
  elements.heliHpFill.style.width = (pct * 100) + '%';
  elements.heliHpFill.className = 'hp-bar-fill ' + hpColorClass(pct);
}

// ---- Building selection ----

export function selectBuilding(building) {
  if (!building || building.team !== TEAM_PLAYER) {
    deselectBuilding();
    return;
  }
  const data = BUILDING_STATS[building.type];
  if (!data) {
    deselectBuilding();
    return;
  }
  selectedBuilding = building;
  clearBuildSelection();
  hideHelicopterInfo();
  elements.buildingSection.classList.remove('hidden');
  updateBuildingPanel(building, 0);
}

export function deselectBuilding() {
  selectedBuilding = null;
  _lastBuildingActionsKey = '';
  if (elements.buildingSection) {
    elements.buildingSection.classList.add('hidden');
  }
}

export function getSelectedBuilding() {
  return selectedBuilding;
}

function updateBuildingPanel(b, currentEnergy, squads) {
  if (!b || !b.alive) {
    deselectBuilding();
    return;
  }

  const data = BUILDING_STATS[b.type];

  // Title — use squad label for production buildings, generic label otherwise
  if (b.type === BTYPE_WALL) {
    elements.buildingTitle.textContent = `WALL L${b.level}`;
  } else {
    let title = data.label.toUpperCase();
    if (squads && (b.type === BTYPE_BARRACKS || b.type === BTYPE_FACTORY || b.type === BTYPE_HELIPAD)) {
      const sq = squads.find(s => s.buildingId === b.id);
      if (sq) title = sq.label.toUpperCase();
    }
    elements.buildingTitle.textContent = title;
  }

  // Level display
  if (data.levels) {
    let levelText = `Level ${b.level}`;
    if (b.type === BTYPE_WALL) {
      levelText = data.description || 'Destructible barrier';
    } else if (b.branch) {
      const branchData = data.branches[b.branch];
      levelText = `[${b.branch}] ${branchData.name}`;
    }
    elements.buildingLevel.textContent = levelText;
    elements.buildingLevel.className = 'building-level' + (b.branch ? ' building-branched' : '');
  } else {
    elements.buildingLevel.textContent = data.description || '';
    elements.buildingLevel.className = 'building-level';
  }

  // Stats — different display by building type
  let statsHtml = '';
  if (b.type === BTYPE_TURRET) {
    const tStats = getTurretStats(b);
    if (tStats) {
      statsHtml += `<div class="info-stat"><span>DMG</span><span class="info-stat-value">${tStats.damage}</span></div>`;
      statsHtml += `<div class="info-stat"><span>RATE</span><span class="info-stat-value">${tStats.fireRate.toFixed(2)}s</span></div>`;
      statsHtml += `<div class="info-stat"><span>RANGE</span><span class="info-stat-value">${tStats.range}</span></div>`;
      if (tStats.splashRadius) {
        statsHtml += `<div class="info-stat"><span>SPLASH</span><span class="info-stat-value">${tStats.splashRadius}px</span></div>`;
      }
    }
  } else if (b.type === BTYPE_GENERATOR) {
    const gStats = getGeneratorStats(b);
    if (gStats) {
      statsHtml += `<div class="info-stat"><span>INCOME</span><span class="info-stat-value income-gen">+${gStats.incomeBonus}/s</span></div>`;
      if (gStats.territoryMult > 1) {
        statsHtml += `<div class="info-stat"><span>TERRITORY MULT</span><span class="info-stat-value income-gen">x${gStats.territoryMult}</span></div>`;
      }
    }
  } else if (b.type === BTYPE_WALL) {
    // Wall: show description, no production stats
    statsHtml += `<div class="info-stat"><span>TYPE</span><span class="info-stat-value">BARRIER</span></div>`;
  } else {
    const pStats = getProductionStats(b);
    if (pStats) {
      const unitType = pStats.produceUnit || data.produceUnit;
      statsHtml += `<div class="info-stat"><span>UNIT</span><span class="info-stat-value">${unitType.toUpperCase()}</span></div>`;
      statsHtml += `<div class="info-stat"><span>RATE</span><span class="info-stat-value">${pStats.produceTime.toFixed(1)}s</span></div>`;
      if (pStats.hpMult && pStats.hpMult !== 1) {
        statsHtml += `<div class="info-stat"><span>UNIT HP</span><span class="info-stat-value">+${Math.round((pStats.hpMult - 1) * 100)}%</span></div>`;
      }
      if (pStats.damageMult && pStats.damageMult !== 1) {
        statsHtml += `<div class="info-stat"><span>UNIT DMG</span><span class="info-stat-value">+${Math.round((pStats.damageMult - 1) * 100)}%</span></div>`;
      }
      if (pStats.speedMult && pStats.speedMult !== 1) {
        statsHtml += `<div class="info-stat"><span>UNIT SPD</span><span class="info-stat-value">+${Math.round((pStats.speedMult - 1) * 100)}%</span></div>`;
      }
      if (pStats.rangeMult && pStats.rangeMult !== 1) {
        statsHtml += `<div class="info-stat"><span>UNIT RNG</span><span class="info-stat-value">+${Math.round((pStats.rangeMult - 1) * 100)}%</span></div>`;
      }
    }
  }
  statsHtml += `<div class="info-stat"><span>HP</span><span class="info-stat-value">${Math.ceil(b.hp)} / ${b.maxHp}</span></div>`;
  elements.buildingStats.innerHTML = statsHtml;

  // Tracker (turrets show damage/kills, production buildings can be blank or show production count)
  if (b.type === BTYPE_TURRET) {
    elements.buildingTracker.innerHTML = `<div class="info-stat"><span>Dmg dealt</span><span class="info-stat-value">${b.totalDamage}</span></div><div class="info-stat"><span>Kills</span><span class="info-stat-value">${b.kills}</span></div>`;
  } else {
    elements.buildingTracker.innerHTML = '';
  }

  // Construction progress and actions (only for upgradeable buildings)
  if (data.levels) {
    if (b.constructionState && b.constructionState !== 'building') {
      elements.buildingConstruction.classList.remove('hidden');
      const pct = Math.min(1, b.constructionTimer / b.constructionDuration);
      const timeLeft = Math.max(0, b.constructionDuration - b.constructionTimer).toFixed(1);
      let label = 'UPGRADING';
      let fillClass = 'construction-upgrade';
      if (b.constructionState === 'branching') {
        label = 'BRANCHING';
        fillClass = 'construction-branch';
      } else if (b.constructionState === 'repairing') {
        label = 'REPAIRING';
        fillClass = 'construction-repair';
      }
      elements.constructionLabel.textContent = `${label}... ${timeLeft}s`;
      elements.constructionFill.style.width = (pct * 100) + '%';
      elements.constructionFill.className = 'hp-bar-fill ' + fillClass;
      elements.buildingActions.innerHTML = '';
      _lastBuildingActionsKey = '';
    } else {
      elements.buildingConstruction.classList.add('hidden');
      buildBuildingActions(b, currentEnergy);
    }
  } else {
    elements.buildingConstruction.classList.add('hidden');
    elements.buildingActions.innerHTML = '';
    _lastBuildingActionsKey = '';
  }
}

function buildBuildingActions(b, currentEnergy) {
  const doUpgrade = canUpgradeBuilding(b);
  const doBranch = b.type !== BTYPE_WALL && canBranchBuilding(b);
  const upgCost = doUpgrade ? getUpgradeCost(b) : 0;
  const affordUpg = doUpgrade && currentEnergy >= upgCost;
  let affordBrA = false, affordBrB = false;
  if (doBranch) {
    affordBrA = currentEnergy >= getBranchCost(b, 'A');
    affordBrB = currentEnergy >= getBranchCost(b, 'B');
  }

  // Wall repair
  const isWall = b.type === BTYPE_WALL;
  const wallDamaged = isWall && b.hp < b.maxHp && !b.constructionState;
  const repairCost = isWall ? (BUILDING_STATS[BTYPE_WALL].repairCost || 10) : 0;
  const affordRepair = wallDamaged && currentEnergy >= repairCost;

  const key = `${b.id}:${b.level}:${b.branch}:${doUpgrade}:${doBranch}:${affordUpg}:${affordBrA}:${affordBrB}:${wallDamaged}:${affordRepair}:${Math.ceil(b.hp)}:${b.orientation || ''}`;
  if (key === _lastBuildingActionsKey) return;
  _lastBuildingActionsKey = key;

  let html = '';

  // Wall orientation buttons
  if (isWall) {
    const orientations = [
      { key: WALL_HORIZONTAL, label: 'H' },
      { key: WALL_VERTICAL, label: 'V' },
      { key: WALL_CORNER_NE, label: 'NE' },
      { key: WALL_CORNER_NW, label: 'NW' },
      { key: WALL_CORNER_SE, label: 'SE' },
      { key: WALL_CORNER_SW, label: 'SW' },
    ];
    const curOrient = b.orientation || WALL_HORIZONTAL;
    html += '<div class="wall-orient-row">';
    for (const o of orientations) {
      const active = curOrient === o.key ? ' active' : '';
      html += `<button class="wall-orient-btn${active}" data-action="orient" data-orient="${o.key}">${o.label}</button>`;
    }
    html += '</div>';
  }

  // Wall repair button
  if (wallDamaged) {
    html += `<button class="build-btn turret-action-btn repair-btn ${affordRepair ? '' : 'disabled'}" data-action="repair">
      <span>REPAIR</span><span class="cost">${repairCost} E</span>
    </button>`;
  }

  if (doUpgrade) {
    html += `<button class="build-btn turret-action-btn ${affordUpg ? '' : 'disabled'}" data-action="upgrade">
      <span>UPGRADE TO L${b.level + 1}</span><span class="cost">${upgCost} E</span>
    </button>`;
  }

  if (doBranch) {
    const branches = BUILDING_STATS[b.type].branches;
    for (const bKey of ['A', 'B']) {
      const bd = branches[bKey];
      const cost = getBranchCost(b, bKey);
      const canAfford = currentEnergy >= cost;
      html += `<button class="build-btn turret-action-btn branch-btn ${canAfford ? '' : 'disabled'}" data-action="branch" data-key="${bKey}">
        <span class="br-key">[${bKey}]</span> <span>${bd.name}</span>
        <span class="br-desc">${bd.desc}</span>
        <span class="cost">${cost} E</span>
      </button>`;
    }
  }

  // Wall demolish button
  if (isWall) {
    const refund = Math.floor((b.investedCost || 0) * WALL_DEMOLISH_REFUND_RATIO);
    html += `<button class="build-btn turret-action-btn demolish-btn" data-action="demolish">
      <span>DESTROY</span><span class="cost">REFUND ${refund}E</span>
    </button>`;
  }

  elements.buildingActions.innerHTML = html;

  // Wire up button events
  elements.buildingActions.querySelectorAll('[data-action="orient"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const orient = btn.getAttribute('data-orient');
      if (callbacks && callbacks.onWallOrient) {
        callbacks.onWallOrient(selectedBuilding, orient);
      }
    });
  });

  elements.buildingActions.querySelectorAll('[data-action="demolish"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onWallDemolish) {
        callbacks.onWallDemolish(selectedBuilding);
      }
      deselectBuilding();
    });
  });

  elements.buildingActions.querySelectorAll('[data-action="repair"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      if (callbacks && callbacks.onWallRepair) {
        callbacks.onWallRepair(selectedBuilding);
      }
    });
  });

  elements.buildingActions.querySelectorAll('[data-action="upgrade"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      if (callbacks && callbacks.onBuildingUpgrade) {
        callbacks.onBuildingUpgrade(selectedBuilding);
      }
    });
  });

  elements.buildingActions.querySelectorAll('[data-action="branch"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const bKey = btn.getAttribute('data-key');
      if (callbacks && callbacks.onBuildingBranch) {
        callbacks.onBuildingBranch(selectedBuilding, bKey);
      }
    });
  });
}

export function getSelectedBuildType() {
  return selectedBuildType;
}

export function setSquadRallyPending(id) {
  _squadRallyPendingId = id;
  _lastSquadKey = ''; // force rebuild to show pending state
}

export function getSquadRallyPending() {
  return _squadRallyPendingId;
}

export function clearBuildSelection() {
  if (selectedBuildType && elements.buildButtons[selectedBuildType]) {
    elements.buildButtons[selectedBuildType].classList.remove('selected');
  }
  selectedBuildType = null;
}

// ---- Helpers ----

function makeSection(title) {
  const section = document.createElement('div');
  section.className = 'sidebar-section';
  const titleEl = document.createElement('div');
  titleEl.className = 'sidebar-title';
  titleEl.textContent = title;
  section.appendChild(titleEl);
  return section;
}

function makeHpLabel(name, initialValue) {
  const container = document.createElement('div');
  container.className = 'hp-label';
  const nameEl = document.createElement('span');
  nameEl.className = 'hp-label-name';
  nameEl.textContent = name;
  const valueEl = document.createElement('span');
  valueEl.className = 'hp-label-value';
  valueEl.textContent = initialValue;
  container.appendChild(nameEl);
  container.appendChild(valueEl);
  return { container, valueEl };
}

function makeHpBar() {
  const track = document.createElement('div');
  track.className = 'hp-bar-track';
  const fill = document.createElement('div');
  fill.className = 'hp-bar-fill hp-high';
  fill.style.width = '100%';
  track.appendChild(fill);
  return { track, fill };
}

function hpColorClass(pct) {
  if (pct > 0.5) return 'hp-high';
  if (pct > 0.25) return 'hp-mid';
  return 'hp-low';
}

// ---- Squad Commands ----

let _lastSquadKey = '';

function updateSquadSection(state) {
  const squads = state.squads;
  if (!squads || squads.length === 0) {
    if (elements.squadSection && !elements.squadSection.classList.contains('hidden')) {
      elements.squadSection.classList.add('hidden');
    }
    _lastSquadKey = '';
    return;
  }

  elements.squadSection.classList.remove('hidden');

  // Build a key to detect changes and avoid unnecessary DOM rebuilds
  const key = squads.map(s =>
    `${s.id}:${s.spawnStance || SPAWN_STANCE_DEFAULT}:${s.spawnTargetPriority || SPAWN_TARGET_DEFAULT}:${s.unitCount}:${s.buildingAlive}`
  ).join('|') + `|rp:${_squadRallyPendingId || ''}`;
  if (key === _lastSquadKey) return;
  _lastSquadKey = key;

  // Update global buttons — reflect if all squads share the same spawn stance/target
  const allSpawnStance = squads.every(s => (s.spawnStance || SPAWN_STANCE_DEFAULT) === (squads[0].spawnStance || SPAWN_STANCE_DEFAULT))
    ? (squads[0].spawnStance || SPAWN_STANCE_DEFAULT) : null;
  const allSpawnTarget = squads.every(s => (s.spawnTargetPriority || SPAWN_TARGET_DEFAULT) === (squads[0].spawnTargetPriority || SPAWN_TARGET_DEFAULT))
    ? (squads[0].spawnTargetPriority || SPAWN_TARGET_DEFAULT) : null;

  elements.squadSection.querySelectorAll('[data-global="stance"]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === allSpawnStance);
  });
  elements.squadSection.querySelectorAll('[data-global="rally"]').forEach(btn => {
    const isPending = _squadRallyPendingId === 'all';
    btn.classList.toggle('active', isPending);
    btn.classList.toggle('pending', isPending);
  });
  elements.squadSection.querySelectorAll('[data-global="target"]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === allSpawnTarget);
  });

  // Rebuild squad cards — informational with spawn stance/target controls
  let html = '';
  for (const sq of squads) {
    const dimClass = sq.buildingAlive ? '' : ' squad-card--dead';
    const spawnStance = sq.spawnStance || SPAWN_STANCE_DEFAULT;
    const spawnTarget = sq.spawnTargetPriority || SPAWN_TARGET_DEFAULT;
    html += `<div class="squad-card${dimClass}" data-squad="${sq.id}">
      <div class="squad-card-header" data-squad-click="${sq.id}">
        <span class="squad-label">${sq.label}</span>
        <span class="squad-count">${sq.unitCount}</span>
      </div>
      <div class="squad-spawn-row">
        <span class="squad-spawn-label">SPAWN</span>
        <button class="squad-spawn-btn${spawnStance === STANCE_ADVANCE ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="stance" data-val="${STANCE_ADVANCE}">ADV</button>
        <button class="squad-spawn-btn${spawnStance === STANCE_DEFEND ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="stance" data-val="${STANCE_DEFEND}">DEF</button>
        <button class="squad-spawn-btn${spawnStance === STANCE_HOLD ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="stance" data-val="${STANCE_HOLD}">HOLD</button>
        <span class="squad-cmd-sep"></span>
        <button class="squad-spawn-btn squad-spawn-btn--target${spawnTarget === TARGET_ANY ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="target" data-val="${TARGET_ANY}">ANY</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${spawnTarget === TARGET_UNITS ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="target" data-val="${TARGET_UNITS}">UNIT</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${spawnTarget === TARGET_BUILDINGS ? ' active' : ''}" data-squad-id="${sq.id}" data-spawn="target" data-val="${TARGET_BUILDINGS}">BLDG</button>
      </div>
    </div>`;
  }
  elements.squadCards.innerHTML = html;

  // Wire squad card header clicks — select all units in that squad
  elements.squadCards.querySelectorAll('[data-squad-click]').forEach(header => {
    header.addEventListener('click', () => {
      const squadId = Number(header.dataset.squadClick);
      if (callbacks && callbacks.onSquadCardClick) callbacks.onSquadCardClick(squadId);
    });
  });

  // Wire spawn stance buttons
  elements.squadCards.querySelectorAll('[data-spawn="stance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onSpawnStanceChange) {
        callbacks.onSpawnStanceChange(Number(btn.dataset.squadId), btn.dataset.val);
      }
    });
  });

  // Wire spawn target buttons
  elements.squadCards.querySelectorAll('[data-spawn="target"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (callbacks && callbacks.onSpawnTargetChange) {
        callbacks.onSpawnTargetChange(Number(btn.dataset.squadId), btn.dataset.val);
      }
    });
  });
}

// ---- Selection Command Bar ----

let _lastSelCmdKey = '';

function updateSelectionCommandBar(state) {
  const count = state.selectedUnitCount || 0;
  if (count === 0) {
    if (elements.selCmdSection && !elements.selCmdSection.classList.contains('hidden')) {
      elements.selCmdSection.classList.add('hidden');
    }
    _lastSelCmdKey = '';
    return;
  }

  elements.selCmdSection.classList.remove('hidden');

  const key = `${count}`;
  if (key !== _lastSelCmdKey) {
    _lastSelCmdKey = key;
    elements.selCmdTitle.textContent = `${count} UNIT${count !== 1 ? 'S' : ''} SELECTED`;
  }
}

// ---- Selection Box Overlay ----

function updateSelectionBox(state) {
  const box = state.selectionBoxScreen;
  if (!box) {
    if (elements.selBoxOverlay && !elements.selBoxOverlay.classList.contains('hidden')) {
      elements.selBoxOverlay.classList.add('hidden');
    }
    return;
  }
  elements.selBoxOverlay.classList.remove('hidden');
  elements.selBoxOverlay.style.left = box.x1 + 'px';
  elements.selBoxOverlay.style.top = box.y1 + 'px';
  elements.selBoxOverlay.style.width = (box.x2 - box.x1) + 'px';
  elements.selBoxOverlay.style.height = (box.y2 - box.y1) + 'px';
}

// ---- Base Alert (Task 10) ----

function updateBaseAlert(baseUnderAttack, dt) {
  if (_alertCooldown > 0) _alertCooldown -= dt;

  // Rising edge: was false, now true, and cooldown expired
  if (baseUnderAttack && !_lastBaseUnderAttack && _alertCooldown <= 0) {
    _alertVisible = true;
    _alertShowTime = 3.0;
    _alertCooldown = 5.0;
    elements.baseAlert.classList.remove('hidden');
    elements.playerHpTrack.classList.add('hp-bar-alert');
  }

  // Count down alert display time
  if (_alertVisible) {
    _alertShowTime -= dt;
    if (_alertShowTime <= 0 || !baseUnderAttack) {
      _alertVisible = false;
      elements.baseAlert.classList.add('hidden');
      elements.playerHpTrack.classList.remove('hp-bar-alert');
    }
  }

  _lastBaseUnderAttack = !!baseUnderAttack;
}

// ---- Rally Section (Task 11) ----

function updateRallySection(state) {
  const active = state.rallyActive && state.rallyHoldingCount > 0;
  if (!active) {
    if (elements.rallySection && !elements.rallySection.classList.contains('hidden')) {
      elements.rallySection.classList.add('hidden');
    }
    return;
  }
  elements.rallySection.classList.remove('hidden');

  const count = state.rallyHoldingCount || 0;
  const size = state.rallyPushSize || 1;
  const timeRemaining = state.rallyTimeRemaining || 0;

  elements.rallyCount.textContent = `${count} / ${size}`;
  elements.rallyFill.style.width = (count / size * 100) + '%';
  elements.rallyTimer.textContent = `Push in ${timeRemaining.toFixed(1)}s`;
}

// ---- Minimap Drawing (Task 9) ----

function drawMinimap(state) {
  const ctx = elements.minimapCtx;
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#08081A';
  ctx.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);

  // Obstacles
  if (state.obstacles) {
    ctx.fillStyle = '#505064';
    const ts = TILE_SIZE * MINIMAP_SCALE;
    for (const obs of state.obstacles) {
      ctx.fillRect(obs.col * ts, obs.row * ts, ts, ts);
    }
  }

  // Build zone boundary lines
  const playerLineY = PLAYER_BUILD_ROW_MIN * TILE_SIZE * MINIMAP_SCALE;
  const enemyLineY = (ENEMY_BUILD_ROW_MAX + 1) * TILE_SIZE * MINIMAP_SCALE;

  ctx.strokeStyle = 'rgba(0,255,255,0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, playerLineY);
  ctx.lineTo(MINIMAP_SIZE, playerLineY);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,50,50,0.25)';
  ctx.beginPath();
  ctx.moveTo(0, enemyLineY);
  ctx.lineTo(MINIMAP_SIZE, enemyLineY);
  ctx.stroke();

  // Buildings
  if (state.buildings) {
    for (const b of state.buildings) {
      if (!b.alive) continue;
      const bData = BUILDING_STATS[b.type];
      const bSize = (bData ? bData.size : 1) * TILE_SIZE * MINIMAP_SCALE;
      ctx.fillStyle = b.team === TEAM_PLAYER ? '#00ffff' : '#ff3232';
      ctx.fillRect(b.col * TILE_SIZE * MINIMAP_SCALE, b.row * TILE_SIZE * MINIMAP_SCALE, bSize, bSize);
    }
  }

  // Units
  if (state.units) {
    for (const u of state.units) {
      if (!u.alive) continue;
      const color = u.team === TEAM_PLAYER ? '#00ffff' : '#ff3232';
      const mx = u.x * MINIMAP_SCALE;
      const mz = u.z * MINIMAP_SCALE;

      if (u.isAir) {
        // Draw air units (helicopters) as small triangles
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(mx, mz - 3);
        ctx.lineTo(mx - 2.5, mz + 2);
        ctx.lineTo(mx + 2.5, mz + 2);
        ctx.closePath();
        ctx.fill();
      } else {
        // Ground units as circles
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(mx, mz, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Squad rally point markers
  if (state.squads) {
    for (const sq of state.squads) {
      if (sq.stance !== STANCE_RALLY || sq.rallyX == null) continue;
      const rx = sq.rallyX * MINIMAP_SCALE;
      const rz = sq.rallyZ * MINIMAP_SCALE;
      // Draw a green diamond marker
      ctx.strokeStyle = '#32ff64';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx, rz - 4);
      ctx.lineTo(rx + 4, rz);
      ctx.lineTo(rx, rz + 4);
      ctx.lineTo(rx - 4, rz);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Camera viewport rectangle
  if (state.cameraInfo) {
    const ci = state.cameraInfo;
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    const vx = (ci.x - ci.viewWidth / 2) * MINIMAP_SCALE;
    const vy = (ci.z - ci.viewHeight / 2) * MINIMAP_SCALE;
    const vw = ci.viewWidth * MINIMAP_SCALE;
    const vh = ci.viewHeight * MINIMAP_SCALE;
    ctx.strokeRect(vx, vy, vw, vh);
  }
}
