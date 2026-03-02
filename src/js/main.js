// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — main.js
//  Game loop, state management, input, rendering orchestration
// ═══════════════════════════════════════════════════════════════

import { TILE_SIZE, MAP_COLS, MAP_ROWS, MAP_WIDTH, MAP_HEIGHT,
         CYAN, MAGENTA, SAPPER_RED, ELECTRIC_BLUE,
         DAMAGE_RED, SHIELD_COLOR,
         GameState, TowerType, EnemyType, TOWER_DATA, ENEMY_DATA,
         TOWER_TYPES_ORDERED, RESEARCH_TREE,
         getTrackNodes, getAvailableNodes,
         STARTING_GOLD, STARTING_LIVES,
         COST_INFLATION_PER_WAVE, MAX_COST_MULT,
         BUILD_TIMES, PATH_COLORS } from './config.js';
import { clamp, dist, randomUniform } from './utils.js';
import { generatePath, ALL_PATHS } from './path.js';
import { GameMap } from './map.js';
import { Enemy } from './enemies.js';
import { Tower, VisualEffect, resetTowerIds } from './towers.js';
import { Projectile, EnemyProjectile } from './projectiles.js';
import { ParticleSystem } from './particles.js';
import { WaveManager } from './waves.js';
import { SoundManager } from './sound.js';
import { HUD, showHUDMessage } from './hud.js';
import { initLeaderboard, submitScore, getLeaderboard, getLastPlayerName, onLeaderboardUpdate } from './leaderboard.js';

// ─── 3D Renderer Imports ─────────────────────────────────────
import * as THREE from 'three';
import { initScene, renderScene, scene, css2dRenderer, onWindowResize } from './renderer/scene.js';
import { initGrid, updateGrid, showTilePlacementPreview, hideTilePlacementPreview } from './renderer/grid.js';
import { initInput, mouseEventToGrid, touchEventToGrid } from './input.js';
import { createEnemyMesh, updateEnemyMesh, removeEnemyMesh } from './renderer/enemyMeshes.js';
import { createTowerMesh, updateTowerMesh, removeTowerMesh,
         showRailAimLine, hideRailAimLine, rebuildTowerMesh } from './renderer/towerMeshes.js';
import { createProjectileMesh, updateProjectileMesh, removeProjectileMesh,
         createEnemyProjectileMesh, updateEnemyProjectileMesh,
         removeEnemyProjectileMesh } from './renderer/projectileRenderer.js';
import { createEffectMesh, updateEffectMesh, removeEffectMesh } from './renderer/effectRenderer.js';
import { initParticleRenderer, updateParticleRenderer } from './renderer/particleRenderer.js';

// ─── Global Game State ───────────────────────────────────────
export const game = {
    state: GameState.MENU,
    gold: STARTING_GOLD,
    lives: STARTING_LIVES,
    speedMult: 1.5,
    gameTime: 0,
    startTime: 0,
    enemiesKilled: 0,
    towersBuilt: 0,
    towersLost: 0,
    gameMap: null,
    towers: [],
    enemies: [],
    projectiles: [],
    effects: [],
    particles: null,
    enemyProjectiles: [],
    waveMgr: null,
    research: {},
    researchInProgress: null,
    researchTrackKey: null,
    researchTimer: 0,
    researchDuration: 0,
    selectedTowerType: null,
    selectedTower: null,
    aimingTower: null,
    hoverCol: -1,
    hoverRow: -1,
    message: '',
    messageTimer: 0,
    highscores: [],
};

let lastTime = 0;
let mouseX = 0, mouseY = 0;  // Game-world coordinates (same as 2D space: x=0..MAP_WIDTH, y=0..MAP_HEIGHT)
let soundMgr;
let hud;
let _scoreSubmitted = false;
let _camera = null;

// Sapper laser lines (Three.js Line objects updated each frame)
let _sapperLineGroup = null;

// Click-vs-drag detection — lets OrbitControls handle drags, game handles clicks
let _mouseDownX = 0, _mouseDownY = 0, _mouseDidDrag = false;

// WeakSets for lazy mesh creation of short-lived entities
const _projMeshCreated = new WeakSet();
const _eprojMeshCreated = new WeakSet();
const _effectMeshCreated = new WeakSet();

// ─── Cost / Research Helpers ─────────────────────────────────
function costMultiplier() {
    if (!game.waveMgr) return 1;
    return clamp(1.0 + game.waveMgr.currentWave * COST_INFLATION_PER_WAVE, 1.0, MAX_COST_MULT);
}

function globalMods() {
    const mods = {
        damage_mult: 1.0,
        range_mult: 1.0,
        control_mult: 1.0,
        firerate_mult: 1.0,
        fortify_mult: 1.0,
        armor_pierce: 0,
        critical_chance: 0,
        controlled_damage_bonus: 0,
        phase_scanner: 0,
        overwatch_bonus: 0,
        aoe_bonus: 0,
        proximity_bonus: 0,
        slow_duration_mult: 0,
        execute_threshold: 0,
        execute_bonus: 0,
        dot_damage_bonus: 0,
        dot_tick_bonus: 0,
        cascade_spread: 0,
        suppression_field: 0,
        sapper_reduction: 0,
        tower_regen: 0,
        sell_refund: 0.60,
        build_speed: 0,
        destroy_refund: 0,
        rebuild_speed: 0,
        active_construction: 0,
    };

    for (const trackKey of Object.keys(RESEARCH_TREE)) {
        const allNodes = getTrackNodes(trackKey);
        for (const node of allNodes) {
            if (!game.research[node.id]) continue;
            const eff = node.effect;
            if (!eff) continue;
            if (eff.damage_mult) mods.damage_mult += eff.damage_mult;
            if (eff.range_mult) mods.range_mult += eff.range_mult;
            if (eff.control_mult) mods.control_mult += eff.control_mult;
            if (eff.firerate_bonus) mods.firerate_mult -= eff.firerate_bonus;
            if (eff.fortify_mult) mods.fortify_mult += eff.fortify_mult;
            if (eff.armor_pierce) mods.armor_pierce = Math.max(mods.armor_pierce, eff.armor_pierce);
            if (eff.critical_chance) mods.critical_chance = eff.critical_chance;
            if (eff.controlled_damage_bonus) mods.controlled_damage_bonus = eff.controlled_damage_bonus;
            if (eff.phase_scanner) mods.phase_scanner = eff.phase_scanner;
            if (eff.overwatch_bonus) mods.overwatch_bonus = eff.overwatch_bonus;
            if (eff.aoe_bonus) mods.aoe_bonus = eff.aoe_bonus;
            if (eff.proximity_bonus) mods.proximity_bonus = eff.proximity_bonus;
            if (eff.slow_duration_mult) mods.slow_duration_mult = eff.slow_duration_mult;
            if (eff.execute_threshold) { mods.execute_threshold = eff.execute_threshold; mods.execute_bonus = eff.execute_bonus; }
            if (eff.dot_damage_bonus) mods.dot_damage_bonus = eff.dot_damage_bonus;
            if (eff.dot_tick_bonus) mods.dot_tick_bonus = eff.dot_tick_bonus;
            if (eff.cascade_spread) mods.cascade_spread = eff.cascade_spread;
            if (eff.suppression_field) mods.suppression_field = eff.suppression_field;
            if (eff.sapper_reduction) mods.sapper_reduction = eff.sapper_reduction;
            if (eff.tower_regen) mods.tower_regen = eff.tower_regen;
            if (eff.sell_refund) mods.sell_refund = eff.sell_refund;
            if (eff.build_speed) mods.build_speed = eff.build_speed;
            if (eff.destroy_refund) mods.destroy_refund = eff.destroy_refund;
            if (eff.rebuild_speed) mods.rebuild_speed = eff.rebuild_speed;
            if (eff.active_construction) mods.active_construction = eff.active_construction;
        }
    }
    return mods;
}
game.globalMods = globalMods;
game.costMultiplier = costMultiplier;

// ─── Power Network ───────────────────────────────────────────
game.powerDirty = true;

function markPowerDirty() { game.powerDirty = true; }

function recomputePowerNetwork() {
    game.powerDirty = false;
    const towers = game.towers;

    const plants = [];
    const consumers = [];
    for (const t of towers) {
        if (t.hp <= 0) continue;
        if (t._isPowerPlant) {
            plants.push(t);
        } else {
            consumers.push(t);
        }
    }

    for (const c of consumers) {
        c.isPowered = false;
        c.poweredByPlantId = null;
    }

    if (plants.length === 0) return;

    const pairs = [];
    for (const c of consumers) {
        for (const p of plants) {
            const d = dist(c.x, c.y, p.x, p.y);
            if (d <= p.powerRadius) {
                pairs.push({ consumer: c, plant: p, dist: d });
            }
        }
    }

    pairs.sort((a, b) => {
        const dd = a.dist - b.dist;
        if (Math.abs(dd) > 0.01) return dd;
        return a.plant.id - b.plant.id;
    });

    const usedCap = new Map();
    for (const p of plants) usedCap.set(p.id, 0);

    for (const pair of pairs) {
        const { consumer, plant } = pair;
        if (consumer.isPowered) continue;
        const used = usedCap.get(plant.id);
        const cost = consumer.powerCost || 1;
        if (used + cost <= plant.powerCapacity) {
            consumer.isPowered = true;
            consumer.poweredByPlantId = plant.id;
            usedCap.set(plant.id, used + cost);
        }
    }
}

// ─── Research ────────────────────────────────────────────────
function findResearchNode(nodeId) {
    for (const trackKey of Object.keys(RESEARCH_TREE)) {
        const allNodes = getTrackNodes(trackKey);
        for (const node of allNodes) {
            if (node.id === nodeId) return { trackKey, node };
        }
    }
    return null;
}

function getResearchCost(nodeId) {
    const found = findResearchNode(nodeId);
    if (!found) return null;
    if (game.research[nodeId]) return null;
    return Math.round(found.node.cost * costMultiplier());
}
game.getResearchCost = getResearchCost;

function tryBuyResearch(nodeId) {
    if (game.researchInProgress) return [false, "Research in progress!"];
    const found = findResearchNode(nodeId);
    if (!found) return [false, "Unknown research"];
    if (game.research[nodeId]) return [false, "Already researched"];

    const available = getAvailableNodes(found.trackKey, game.research);
    if (!available.find(n => n.id === nodeId)) return [false, "Prerequisites not met"];

    const cost = Math.round(found.node.cost * costMultiplier());
    if (game.gold < cost) return [false, "Not enough gold!"];
    game.gold -= cost;
    game.researchInProgress = nodeId;
    game.researchTrackKey = found.trackKey;
    game.researchTimer = 0;
    game.researchDuration = found.node.time || 12;
    soundMgr.play('research');
    return [true, `${found.node.name} researching...`];
}

function finishResearch() {
    const nodeId = game.researchInProgress;
    if (!nodeId) return;
    const found = findResearchNode(nodeId);
    game.research[nodeId] = true;

    if (found && found.node.effect && found.node.effect.fortify_mult) {
        const oldMods = { ...globalMods() };
        oldMods.fortify_mult -= found.node.effect.fortify_mult;
        for (const t of game.towers) {
            const oldMax = t.getMaxHp(oldMods.fortify_mult);
            const newMax = t.getMaxHp(globalMods().fortify_mult);
            t.hp += (newMax - oldMax);
        }
    }

    const name = found ? found.node.name : nodeId;
    showMessage(`Research complete: ${name}`);
    soundMgr.play('upgrade');
    game.researchInProgress = null;
    game.researchTrackKey = null;
    game.researchTimer = 0;
    game.researchDuration = 0;
}

function showMessage(text, dur = 2.0) {
    game.message = text;
    game.messageTimer = dur;
    showHUDMessage(text);
}

// ─── Game Reset ──────────────────────────────────────────────
function reset() {
    // Remove all existing 3D meshes before resetting game state
    for (const e of game.enemies) removeEnemyMesh(e);
    for (const t of game.towers) removeTowerMesh(t);
    for (const p of game.projectiles) removeProjectileMesh(p);
    for (const ep of game.enemyProjectiles) removeEnemyProjectileMesh(ep);
    for (const eff of game.effects) removeEffectMesh(eff);
    if (_sapperLineGroup) {
        while (_sapperLineGroup.children.length > 0) {
            _sapperLineGroup.remove(_sapperLineGroup.children[0]);
        }
    }

    // Nuclear sweep: remove any orphaned CSS2D HP/build bar elements that
    // weren't caught by the per-mesh cleanup above (e.g. after game-over early return).
    if (css2dRenderer?.domElement) {
        css2dRenderer.domElement.querySelectorAll('.hp-bar-container, .build-bar-container')
            .forEach(el => el.remove());
    }

    generatePath();
    game.gameMap = new GameMap();
    game.towers = [];
    game.enemies = [];
    game.projectiles = [];
    game.effects = [];
    game.particles = new ParticleSystem();
    game.enemyProjectiles = [];
    game.waveMgr = new WaveManager();
    game.gold = STARTING_GOLD;
    game.lives = STARTING_LIVES;
    game.research = {};
    game.researchInProgress = null;
    game.researchTrackKey = null;
    game.researchTimer = 0;
    game.researchDuration = 0;
    game.enemiesKilled = 0;
    game.towersBuilt = 0;
    game.towersLost = 0;
    game.gameTime = 0;
    game.speedMult = 1.5;
    game.startTime = performance.now() / 1000;
    game.selectedTowerType = null;
    game.selectedTower = null;
    game.aimingTower = null;
    game.message = '';
    game.messageTimer = 0;
    game._waveStartPlayed = false;
    game._lastDestroyedType = null;
    game._lastDestroyedTime = 0;
    game.powerDirty = true;
    _scoreSubmitted = false;
    resetTowerIds();

    // Clear any stale placement/aim preview meshes left over from the previous session
    hideTilePlacementPreview();
    hideRailAimLine();

    // Rebuild 3D grid for new paths (initGrid supports re-call)
    if (scene) initGrid();

    // (Re)connect particle renderer to new particle system
    if (scene) initParticleRenderer(game.particles);
}

// ─── State Transitions ───────────────────────────────────────
function setState(newState) {
    game.state = newState;
    const menuEl = document.getElementById('menuOverlay');
    const pauseEl = document.getElementById('pauseOverlay');
    const goEl = document.getElementById('gameOverOverlay');
    const gameEl = document.getElementById('gameContainer');
    const htpEl = document.getElementById('howToPlayOverlay');

    if (htpEl) htpEl.classList.add('hidden');
    if (menuEl) menuEl.classList.toggle('hidden', newState !== GameState.MENU);
    if (pauseEl) pauseEl.classList.toggle('hidden', newState !== GameState.PAUSED);
    if (goEl) goEl.classList.toggle('hidden', newState !== GameState.GAME_OVER);
    if (gameEl) gameEl.classList.toggle('hidden', newState === GameState.MENU);
}

function startGame() {
    soundMgr.init();
    soundMgr.resume();
    reset();
    setState(GameState.PLAYING);
    if (hud) hud.destroy();
    hud = new HUD(game, {
        onSelectTowerType: (tt) => {
            const cost = Math.round(TOWER_DATA[tt].cost * costMultiplier());
            if (game.gold >= cost) {
                game.selectedTowerType = tt;
                game.selectedTower = null;
                if (window.innerWidth <= 1024 && _drawerOpen) toggleDrawer();
            } else {
                showMessage("Not enough gold!");
            }
        },
        onSendEarly: () => {
            if (game.waveMgr.canSendEarly()) {
                const bonus = game.waveMgr.sendEarly();
                game.gold += bonus;
                showMessage(`+${bonus} bonus gold!`, 1.5);
                hud.showGoldDelta(bonus);
            }
        },
        onResearch: (nodeId) => {
            const [ok, msg] = tryBuyResearch(nodeId);
            showMessage(ok ? `Research: ${msg}` : msg);
        },
        onTowerAction: (action, key) => {
            handleTowerAction(action, key);
        },
        onToggleMute: () => {
            return soundMgr.toggleMute();
        }
    });
}

function handleTowerAction(action, key) {
    const t = game.selectedTower;
    if (!t) return;
    const mods = globalMods();
    const fortifyMult = mods.fortify_mult;
    const cm = costMultiplier();

    if (action === 'repair') {
        const cost = t.repairCost(fortifyMult);
        if (game.gold >= cost) {
            game.gold -= cost;
            t.startRepair(fortifyMult);
            showMessage("Repairing tower...");
            soundMgr.play('repair');
        } else showMessage("Not enough gold!");
    } else if (action === 'upgrade') {
        const cost = t.upgradeCost(cm);
        if (game.gold >= cost) {
            game.gold -= cost;
            t.startUpgrade(cost, fortifyMult);
            showMessage("Upgrading tower...");
            soundMgr.play('upgrade');
        } else showMessage("Not enough gold!");
    } else if (action === 'branch' && key) {
        const cost = t.branchCost(key, cm);
        if (game.gold >= cost) {
            game.gold -= cost;
            t.startBranch(key, cost, fortifyMult);
            showMessage("Specializing tower...");
            soundMgr.play('upgrade');
        } else showMessage("Not enough gold!");
    } else if (action === 'aim') {
        game.aimingTower = t;
        showMessage("Click on map to set Rail direction!", 5.0);
    } else if (action === 'shield') {
        const cost = t.shieldCost(cm);
        if (game.gold >= cost) {
            game.gold -= cost;
            t.startShield(cost, fortifyMult);
            const label = t.isShieldRecharge ? "Recharging shield..." : "Deploying shield...";
            showMessage(label);
            soundMgr.play('upgrade');
        } else showMessage("Not enough gold!");
    } else if (action === 'overcharge') {
        const cost = t.overchargeCost(cm);
        if (game.gold >= cost) {
            game.gold -= cost;
            t.startOvercharge();
            showMessage(`${t.name} overcharged! +25% damage for 60s`);
            soundMgr.play('upgrade');
            if (hud) hud.showGoldDelta(-cost);
        } else showMessage("Not enough gold!");
    } else if (action === 'sell') {
        const val = t.sellValue(mods.sell_refund);
        game.gold += val;
        game.gameMap.removeTower(t.col, t.row);
        game.towers = game.towers.filter(tw => tw !== t);
        removeTowerMesh(t);  // Remove 3D mesh
        game.selectedTower = null;
        showMessage(`Tower sold for ${val}g`);
        soundMgr.play('sell');
        if (hud) hud.showGoldDelta(val);
        markPowerDirty();
    }
}

function showGameOver() {
    setState(GameState.GAME_OVER);
    soundMgr.play('game_over');

    const elapsed = Math.round(performance.now() / 1000 - game.startTime);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    document.getElementById('goWaves').textContent = game.waveMgr.currentWave;
    document.getElementById('goKills').textContent = game.enemiesKilled;
    document.getElementById('goTowers').textContent = game.towersBuilt;
    document.getElementById('goLost').textContent = game.towersLost;
    document.getElementById('goTime').textContent = `${mins}:${String(secs).padStart(2, '0')}`;

    const nameInput = document.getElementById('goNameInput');
    if (nameInput) nameInput.value = getLastPlayerName() || '';
    document.getElementById('goSubmitStatus').textContent = '';
    document.getElementById('goSubmitStatus').className = 'go-submit-status';

    saveScoreLocal();
}

function saveScoreLocal() {
    const elapsed = Math.round(performance.now() / 1000 - game.startTime);
    const entry = {
        waves: game.waveMgr.currentWave,
        kills: game.enemiesKilled,
        towers: game.towersBuilt,
        lives: game.lives,
        time_s: elapsed,
        date: new Date().toISOString().split('T')[0],
    };
    try {
        const data = localStorage.getItem('neonDefenseHighscores');
        const scores = data ? JSON.parse(data) : [];
        scores.push(entry);
        scores.sort((a, b) => (b.waves - a.waves) || (b.kills - a.kills));
        const top = scores.slice(0, 25);
        localStorage.setItem('neonDefenseHighscores', JSON.stringify(top));
        game.highscores = top;
    } catch {}
}

// ─── Input Handling ──────────────────────────────────────────
function handleKeyDown(e) {
    const htpOverlay = document.getElementById('howToPlayOverlay');
    if (htpOverlay && !htpOverlay.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            htpOverlay.classList.add('hidden');
            document.getElementById('menuOverlay')?.classList.remove('hidden');
        }
        return;
    }

    if (game.state === GameState.MENU) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startGame();
        }
    } else if (game.state === GameState.PLAYING) {
        if (e.key === 'Escape') {
            setState(GameState.PAUSED);
        } else if (e.key === 'f' || e.key === 'F') {
            game.speedMult = game.speedMult === 3 ? 1.5 : 3;
            showMessage(game.speedMult === 3 ? 'Speed: ▶▶ 2×' : 'Speed: ▶ 1×', 1.0);
        } else if (e.key === ' ' && game.waveMgr.canSendEarly()) {
            e.preventDefault();
            const bonus = game.waveMgr.sendEarly();
            game.gold += bonus;
            showMessage(`+${bonus} bonus gold!`);
            if (hud) hud.showGoldDelta(bonus);
        }
        for (let i = 0; i < TOWER_TYPES_ORDERED.length; i++) {
            if (e.key === String(i + 1)) {
                const tt = TOWER_TYPES_ORDERED[i];
                if (game.gold >= Math.round(TOWER_DATA[tt].cost * costMultiplier())) {
                    game.selectedTowerType = tt;
                    game.selectedTower = null;
                }
            }
        }
    } else if (game.state === GameState.PAUSED) {
        if (e.key === 'Escape') setState(GameState.PLAYING);
        if (e.key === 'q' || e.key === 'Q') setState(GameState.MENU);
    }
}

function handleMouseMove(e) {
    // Track drag for click-vs-orbit detection
    if (Math.hypot(e.clientX - _mouseDownX, e.clientY - _mouseDownY) > 5) {
        _mouseDidDrag = true;
    }

    const result = mouseEventToGrid(e);
    if (result) {
        mouseX = result.x;
        mouseY = result.y;
        if (result.x >= 0 && result.x < MAP_WIDTH && result.y >= 0 && result.y < MAP_HEIGHT) {
            game.hoverCol = result.col;
            game.hoverRow = result.row;
        } else {
            game.hoverCol = -1;
            game.hoverRow = -1;
        }
    } else {
        game.hoverCol = -1;
        game.hoverRow = -1;
    }
}

function _handleMapClick(mx, my) {
    // Rail aiming mode
    if (game.aimingTower) {
        if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
            const t = game.aimingTower;
            const dx = mx - t.x, dy = my - t.y;
            if (Math.hypot(dx, dy) > 5) {
                t.fixedAngle = Math.atan2(dy, dx) * 180 / Math.PI;
                t.angle = t.fixedAngle;
                game.aimingTower = null;
                game.selectedTower = t;
                showMessage("Rail direction set!");
                return true;
            }
        }
        return true;
    }

    // Map clicks within bounds
    if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
        const col = Math.floor(mx / TILE_SIZE);
        const row = Math.floor(my / TILE_SIZE);

        // Tower placement
        if (game.selectedTowerType) {
            if (game.gameMap.isBuildable(col, row)) {
                const cost = Math.round(TOWER_DATA[game.selectedTowerType].cost * costMultiplier());
                if (game.gold >= cost) {
                    game.gold -= cost;
                    const t = new Tower(game.selectedTowerType, col, row, cost);
                    const placeMods = globalMods();
                    t.hp = t.getMaxHp(placeMods.fortify_mult);
                    if (placeMods.rebuild_speed > 0 && game._lastDestroyedType === game.selectedTowerType
                        && game.gameTime - game._lastDestroyedTime < 30) {
                        t.constructionDuration *= (1.0 - placeMods.rebuild_speed);
                    }
                    t._activeConstruction = placeMods.active_construction || 0;
                    game.towers.push(t);
                    createTowerMesh(t);  // Create 3D mesh
                    game.gameMap.placeTower(col, row);
                    game.towersBuilt++;
                    soundMgr.play('place_tower');
                    markPowerDirty();
                    if (game.selectedTowerType === TowerType.RAIL) {
                        game.aimingTower = t;
                        showMessage("Click to set Rail firing direction!", 5.0);
                    }
                    game.selectedTowerType = null;
                } else {
                    showMessage("Not enough gold!");
                }
            } else {
                showMessage("Can't build here!");
            }
            return true;
        }

        // Select existing tower
        for (const t of game.towers) {
            if (t.col === col && t.row === row) {
                game.selectedTower = t;
                game.selectedTowerType = null;
                return true;
            }
        }
        game.selectedTower = null;
        game.selectedTowerType = null;
    }
    return false;
}

function handleClick(e) {
    soundMgr.init();
    soundMgr.resume();
    // Ignore if mouse moved more than threshold — that was an OrbitControls drag
    if (_mouseDidDrag) return;
    if (game.state !== GameState.PLAYING) return;

    const result = mouseEventToGrid(e);
    if (!result) return;
    _handleMapClick(result.x, result.y);
}

function handleRightClick(e) {
    e.preventDefault();
    if (game.aimingTower) {
        game.aimingTower.fixedAngle = game.aimingTower.fixedAngle || 0;
        game.aimingTower.angle = game.aimingTower.fixedAngle;
        game.aimingTower = null;
    }
    game.selectedTowerType = null;
    game.selectedTower = null;
}

// ─── Touch Input Handling ────────────────────────────────────
let _touchStartTime = 0;
let _touchStartPos = null;
let _touchMoved = false;
let _isMobile = false;

function handleTouchStart(e) {
    e.preventDefault();
    _isMobile = true;
    if (e.touches.length !== 1) return;
    const result = touchEventToGrid(e.touches[0]);
    _touchStartTime = performance.now();
    _touchStartPos = result ? { x: result.x, y: result.y } : null;
    _touchMoved = false;

    if (result && result.x >= 0 && result.x < MAP_WIDTH && result.y >= 0 && result.y < MAP_HEIGHT) {
        game.hoverCol = result.col;
        game.hoverRow = result.row;
        mouseX = result.x;
        mouseY = result.y;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length !== 1) return;
    const result = touchEventToGrid(e.touches[0]);
    if (!result) return;

    if (_touchStartPos) {
        const dx = result.x - _touchStartPos.x;
        const dy = result.y - _touchStartPos.y;
        if (Math.hypot(dx, dy) > 15) _touchMoved = true;
    }

    if (result.x >= 0 && result.x < MAP_WIDTH && result.y >= 0 && result.y < MAP_HEIGHT) {
        game.hoverCol = result.col;
        game.hoverRow = result.row;
        mouseX = result.x;
        mouseY = result.y;
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (_touchMoved) {
        if (game.selectedTowerType && game.hoverCol >= 0) {
            _doTouchTap({ x: mouseX, y: mouseY });
        }
        _touchStartPos = null;
        game.hoverCol = -1;
        game.hoverRow = -1;
        return;
    }
    if (!_touchStartPos) return;

    const pos = _touchStartPos;
    const holdTime = performance.now() - _touchStartTime;

    if (holdTime > 500) {
        if (game.aimingTower) {
            game.aimingTower.fixedAngle = game.aimingTower.fixedAngle || 0;
            game.aimingTower.angle = game.aimingTower.fixedAngle;
            game.aimingTower = null;
        }
        game.selectedTowerType = null;
        game.selectedTower = null;
    } else {
        _doTouchTap(pos);
    }
    _touchStartPos = null;
    setTimeout(() => {
        if (!_touchStartPos) {
            game.hoverCol = -1;
            game.hoverRow = -1;
        }
    }, 50);
}

function _doTouchTap(pos) {
    soundMgr.init();
    soundMgr.resume();
    if (game.state !== GameState.PLAYING) return;

    const mx = pos.x, my = pos.y;

    // Rail aiming mode
    if (game.aimingTower) {
        if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
            const t = game.aimingTower;
            const dx = mx - t.x, dy = my - t.y;
            if (Math.hypot(dx, dy) > 5) {
                t.fixedAngle = Math.atan2(dy, dx) * 180 / Math.PI;
                t.angle = t.fixedAngle;
                game.aimingTower = null;
                game.selectedTower = t;
                showMessage("Rail direction set!");
                return;
            }
        }
        return;
    }

    if (mx >= 0 && mx < MAP_WIDTH && my >= 0 && my < MAP_HEIGHT) {
        const col = Math.floor(mx / TILE_SIZE);
        const row = Math.floor(my / TILE_SIZE);

        if (game.selectedTowerType) {
            if (game.gameMap.isBuildable(col, row)) {
                const cost = Math.round(TOWER_DATA[game.selectedTowerType].cost * costMultiplier());
                if (game.gold >= cost) {
                    game.gold -= cost;
                    const t = new Tower(game.selectedTowerType, col, row, cost);
                    const touchMods = globalMods();
                    t.hp = t.getMaxHp(touchMods.fortify_mult);
                    if (touchMods.rebuild_speed > 0 && game._lastDestroyedType === game.selectedTowerType
                        && game.gameTime - game._lastDestroyedTime < 30) {
                        t.constructionDuration *= (1.0 - touchMods.rebuild_speed);
                    }
                    t._activeConstruction = touchMods.active_construction || 0;
                    game.towers.push(t);
                    createTowerMesh(t);  // Create 3D mesh
                    game.gameMap.placeTower(col, row);
                    game.towersBuilt++;
                    soundMgr.play('place_tower');
                    markPowerDirty();
                    if (game.selectedTowerType === TowerType.RAIL) {
                        game.aimingTower = t;
                        showMessage("Tap to set Rail firing direction!", 5.0);
                    }
                    game.selectedTowerType = null;
                } else {
                    showMessage("Not enough gold!");
                }
            } else {
                showMessage("Can't build here!");
            }
            return;
        }

        for (const t of game.towers) {
            if (t.col === col && t.row === row) {
                game.selectedTower = t;
                game.selectedTowerType = null;
                _openDrawer();
                return;
            }
        }
        game.selectedTower = null;
        game.selectedTowerType = null;
    }
}

// ─── Drawer Toggle ───────────────────────────────────────────
let _drawerOpen = false;

function toggleDrawer() {
    _drawerOpen = !_drawerOpen;
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('drawerToggle');
    if (sidebar) sidebar.classList.toggle('drawer-open', _drawerOpen);
    if (toggle) toggle.classList.toggle('open', _drawerOpen);
}

function _openDrawer() {
    if (_drawerOpen) return;
    if (window.innerWidth > 1024) return;
    _drawerOpen = true;
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('drawerToggle');
    if (sidebar) sidebar.classList.add('drawer-open');
    if (toggle) toggle.classList.add('open');
}

// ─── Update Loop ─────────────────────────────────────────────
function update(dt) {
    if (game.state !== GameState.PLAYING) return;

    game.gameTime += dt;
    if (game.messageTimer > 0) game.messageTimer -= dt;

    if (game.powerDirty) recomputePowerNetwork();

    if (game.researchInProgress) {
        game.researchTimer += dt;
        if (game.researchTimer >= game.researchDuration) finishResearch();
    }

    const mods = globalMods();

    // Wave spawns
    const { newEnemies, waveCleared } = game.waveMgr.update(dt, game.enemies);

    for (const e of newEnemies) {
        if (e.type === EnemyType.BOSS || e.type === EnemyType.ULTRA_BOSS) {
            soundMgr.play('boss_spawn');
            showHUDMessage(`⚠ ${e.type === EnemyType.ULTRA_BOSS ? 'OVERLORD' : 'BOSS'} spawned!`, 'warn');
        }
        createEnemyMesh(e);  // Create 3D mesh immediately
    }
    game.enemies.push(...newEnemies);

    if (newEnemies.length > 0 && !game._waveStartPlayed) {
        soundMgr.play('wave_start');
        showHUDMessage(`Wave ${game.waveMgr.currentWave} incoming!`, 'info');
        game._waveStartPlayed = true;
    }
    if (game.waveMgr.countdownActive) {
        game._waveStartPlayed = false;
    }

    if (waveCleared) {
        const bonus = Math.round(game.waveMgr.waveClearBonus *
            (0.85 + 0.15 * game.waveMgr.getRewardMultiplier()));
        game.gold += bonus;
        showMessage(`Wave cleared! +${bonus}g`);
        soundMgr.play('wave_clear');
        showHUDMessage(`Wave cleared! +${bonus}g`, 'gold');
        if (hud) hud.showGoldDelta(bonus);
    }

    // Update enemies
    for (const e of game.enemies) {
        if (e.alive) e.update(dt, game.enemies, mods);
    }

    // Handle end-of-path leaks
    for (const e of game.enemies) {
        if (e.reachedEnd) {
            game.lives -= e.livesCost;
            if (game.lives <= 0) {
                game.lives = 0;
                // Remove ALL enemy meshes (alive and dead) before early return so
                // HP bar DOM elements don't persist on the game-over screen.
                for (const enemy of game.enemies) {
                    removeEnemyMesh(enemy);
                }
                game.enemies = [];
                showGameOver();
                return;
            }
        }
    }

    // Sapper attack logic
    for (const e of game.enemies) {
        if (!e.alive || e.type !== EnemyType.SAPPER) continue;
        e.sapperFireTimer -= dt;
        const towersInRange = [];
        for (const t of game.towers) {
            if (t.hp <= 0) continue;
            const d = dist(e.x, e.y, t.x, t.y);
            if (d <= e.attackRange) towersInRange.push([t, d]);
        }
        if (towersInRange.length > 0) {
            const weights = towersInRange.map(([, d]) => 1.0 / (d + 10));
            const total = weights.reduce((s, w) => s + w, 0);
            let r = Math.random() * total;
            let chosen = towersInRange[0][0];
            for (let i = 0; i < towersInRange.length; i++) {
                r -= weights[i];
                if (r <= 0) { chosen = towersInRange[i][0]; break; }
            }
            e.towerTarget = chosen;
        } else {
            e.towerTarget = null;
        }
        if (e.towerTarget && e.sapperFireTimer <= 0) {
            e.sapperFireTimer = e.attackRate + randomUniform(-0.2, 0.3);
            if (Math.random() >= e.missChance) {
                let sapperDmg = e.attackDamage;
                if (mods.suppression_field > 0 && (e.slowTimer > 0 || e.vulnTimer > 0 || e.dotTimer > 0)) {
                    sapperDmg *= (1.0 - mods.suppression_field);
                }
                const ep = new EnemyProjectile(e.x, e.y, e.towerTarget, sapperDmg, 200);
                ep.color = SAPPER_RED;
                createEnemyProjectileMesh(ep);  // Create 3D mesh immediately
                _eprojMeshCreated.add(ep);
                game.enemyProjectiles.push(ep);
                soundMgr.play('sapper_shoot');
            }
        }
    }

    // Update enemy projectiles
    const towerHpBefore = new Map();
    const towerShieldBefore = new Map();
    for (const t of game.towers) {
        towerHpBefore.set(t, t.hp);
        towerShieldBefore.set(t, t.shieldHp);
    }
    for (const ep of game.enemyProjectiles) ep.update(dt);
    // Remove dead enemy projectile meshes before filtering
    for (const ep of game.enemyProjectiles) {
        if (!ep.alive) updateEnemyProjectileMesh(ep);  // renderer removes mesh when !alive
    }
    game.enemyProjectiles = game.enemyProjectiles.filter(ep => ep.alive);

    // Detect tower hits
    for (const t of game.towers) {
        const hpHit = towerHpBefore.has(t) && t.hp < towerHpBefore.get(t);
        const shieldHit = towerShieldBefore.has(t) && t.shieldHp < towerShieldBefore.get(t);
        if (hpHit || shieldHit) {
            soundMgr.play('tower_hit');
        }
        // Shield broke this frame
        if (towerShieldBefore.get(t) > 0 && t.shieldHp <= 0) {
            showHUDMessage(`${t.name} shield destroyed!`, 'warn');
            const lvl = t.branch ? 3 : t.level;
            const bsz = 12 + lvl * 3;
            const shieldR = bsz + (t.branch ? 10 : 7);
            const shieldBreakEff = new VisualEffect('shield_break', 0.6,
                { center: [t.x, t.y], radius: shieldR });
            createEffectMesh(shieldBreakEff);  // Create 3D mesh immediately
            _effectMeshCreated.add(shieldBreakEff);
            game.effects.push(shieldBreakEff);
            game.particles.emitRing(t.x, t.y, SHIELD_COLOR, shieldR, 16, 0.5, 2);
            game.particles.emitExplosion(t.x, t.y, SHIELD_COLOR, 8, 100, 0.4, 2);
        }
    }

    // Handle tower destruction
    const destroyed = game.towers.filter(t => t.hp <= 0);
    for (const t of destroyed) {
        game.particles.emitExplosion(t.x, t.y, t.color, 30, 200, 0.8, 4);
        game.particles.emitRing(t.x, t.y, DAMAGE_RED, 30, 12, 0.5, 3);
        game.gameMap.removeTower(t.col, t.row);
        game.towersLost++;
        if (game.selectedTower === t) game.selectedTower = null;
        removeTowerMesh(t);  // Remove 3D mesh
        if (mods.destroy_refund > 0) {
            const refund = Math.round(t.investedGold * mods.destroy_refund);
            game.gold += refund;
            showMessage(`${t.name} destroyed! Refund: ${refund}g`, 3.0);
            if (hud) hud.showGoldDelta(refund);
            game._lastDestroyedType = t.type;
            game._lastDestroyedTime = game.gameTime;
        } else {
            showMessage(`${t.name} tower destroyed!`, 3.0);
        }
        soundMgr.play('tower_destroyed');
        showHUDMessage(`${t.name} tower destroyed!`, 'warn');
    }
    game.towers = game.towers.filter(t => t.hp > 0);
    if (destroyed.length > 0) markPowerDirty();

    // Towers act — track newly created projectiles and effects
    const prevProjLen = game.projectiles.length;
    const prevEffLen = game.effects.length;
    for (const t of game.towers) {
        const firedBefore = t.fireTimer;
        const constBefore = t.constructionState;
        t.update(dt, game.enemies, game.projectiles, game.effects, game.particles, mods);
        if (constBefore !== null && t.constructionState === null) {
            markPowerDirty();
            if (constBefore === 'upgrading' || constBefore === 'branching') {
                rebuildTowerMesh(t);
            }
        }
        if (t.fireTimer > firedBefore && t.constructionState !== 'building') {
            const soundMap = {
                [TowerType.PULSE]: 'shoot_pulse',
                [TowerType.RAIL]: 'shoot_rail',
                [TowerType.TESLA]: 'shoot_tesla',
                [TowerType.CRYO]: 'shoot_cryo',
                [TowerType.NOVA]: 'shoot_nova',
            };
            soundMgr.play(soundMap[t.type] || 'shoot_pulse');
        }
    }
    // Create 3D meshes for newly spawned projectiles and effects from tower._fire()
    for (let i = prevProjLen; i < game.projectiles.length; i++) {
        createProjectileMesh(game.projectiles[i]);
        _projMeshCreated.add(game.projectiles[i]);
    }
    for (let i = prevEffLen; i < game.effects.length; i++) {
        createEffectMesh(game.effects[i]);
        _effectMeshCreated.add(game.effects[i]);
    }

    // Projectiles move — only update projectiles that existed before this frame's
    // tower loop (prevProjLen). Newly spawned projectiles must survive at least one
    // full frame so drawGame() can render them before their first update runs.
    for (let i = 0; i < prevProjLen; i++) {
        game.projectiles[i].update(dt, game.enemies);
    }
    // Remove dead projectile meshes before filtering
    for (const p of game.projectiles) {
        if (!p.alive) {
            updateProjectileMesh(p);  // renderer removes mesh when !alive
            if (p.sourceTower) {
                const t = p.sourceTower;
                if (t.type === 'PULSE') {
                    game.particles.emitPulseImpact(p.targetX, p.targetY, t.color, t.level, t.branch);
                } else if (t.type === 'CRYO') {
                    game.particles.emitCryoImpact(p.targetX, p.targetY, t.color, t.level, t.branch);
                } else {
                    game.particles.emitExplosion(p.targetX, p.targetY, t.color, 15, 150, 0.5, 3, 10);
                }
            }
        }
    }
    game.projectiles = game.projectiles.filter(p => p.alive);

    // Handle deaths & rewards
    const rewardMult = game.waveMgr.getRewardMultiplier();
    const dead = game.enemies.filter(e => !e.alive && !e.reachedEnd);
    const splitterSpawns = [];

    for (const e of dead) {
        const reward = Math.max(1, Math.round(e.reward * rewardMult));
        game.gold += reward;
        game.enemiesKilled++;
        game.particles.emitExplosion(e.x, e.y, e.color, 15, 150, 0.5, 3);
        soundMgr.play('enemy_die');

        if (mods.cascade_spread > 0 && e.dotDamage > 0 && e.dotTimer > 0) {
            const spreadRadius = 80;
            for (const other of game.enemies) {
                if (!other.alive || other === e) continue;
                if (dist(e.x, e.y, other.x, other.y) <= spreadRadius) {
                    other.applyDot(e.dotDamage * 0.6, e.dotTimer * 0.5, mods);
                }
            }
            game.particles.emitRing(e.x, e.y, ELECTRIC_BLUE, 40, 10, 0.3, 2);
        }

        if (e.type === EnemyType.SPLITTER) {
            const splitCount = ENEMY_DATA[EnemyType.SPLITTER].split_count || 3;
            for (let i = 0; i < splitCount; i++) {
                const child = new Enemy(
                    EnemyType.SPLITTER_CHILD, 1.0,
                    e.pathProgress, e.waypointIndex, 0, e.pathIndex
                );
                child.totalDistance = e.totalDistance;
                child.pathProgress += randomUniform(-0.05, 0.05);
                child.pathProgress = clamp(child.pathProgress, 0, 0.99);
                child._updatePosition();
                createEnemyMesh(child);  // Create 3D mesh immediately
                splitterSpawns.push(child);
            }
        }
    }
    if (splitterSpawns.length > 0) game.enemies.push(...splitterSpawns);

    // Remove dead enemy meshes before filtering
    for (const e of game.enemies) {
        if (!e.alive) removeEnemyMesh(e);
    }
    game.enemies = game.enemies.filter(e => e.alive);

    // Update and clean up effects
    for (const eff of game.effects) eff.update(dt);
    // Remove dead effect meshes before filtering
    for (const eff of game.effects) {
        if (!eff.alive) updateEffectMesh(eff);  // renderer removes mesh when !alive
    }
    game.effects = game.effects.filter(e => e.alive);

    game.particles.update(dt);
}

// ─── Sapper Laser Lines (Three.js) ───────────────────────────
function updateSapperLines() {
    if (!_sapperLineGroup) return;
    // Remove all old lines
    while (_sapperLineGroup.children.length > 0) {
        const child = _sapperLineGroup.children[0];
        child.geometry.dispose();
        child.material.dispose();
        _sapperLineGroup.remove(child);
    }
    // Draw active sapper targeting lines
    for (const e of game.enemies) {
        if (!e.alive || e.type !== EnemyType.SAPPER || !e.towerTarget || e.towerTarget.hp <= 0) continue;
        const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
        const pts = [
            new THREE.Vector3(e.x, (e.size || 10) + 8, e.y),
            new THREE.Vector3(e.towerTarget.x, 22, e.towerTarget.y),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({
            color: new THREE.Color(1.0, 0.24, 0.12),
            transparent: true,
            opacity: 0.3 * pulse,
        });
        _sapperLineGroup.add(new THREE.Line(geo, mat));
    }
}

// ─── Render (Three.js) ───────────────────────────────────────
function draw(dt) {
    if (game.state === GameState.PLAYING || game.state === GameState.PAUSED || game.state === GameState.GAME_OVER) {
        drawGame(dt);
    }
    renderScene();
}

function drawGame(dt) {
    const fortifyMult = globalMods().fortify_mult;

    // Update grid pulse animation
    updateGrid(dt);

    // Update effect meshes (lazy create if new)
    for (const eff of game.effects) {
        if (!_effectMeshCreated.has(eff)) {
            createEffectMesh(eff);
            _effectMeshCreated.add(eff);
        }
        updateEffectMesh(eff);
    }

    // Update tower meshes
    for (const t of game.towers) {
        // While aiming a rail tower, preview the barrel direction toward the mouse cursor
        let aimAngle = null;
        if (t === game.aimingTower && t.type === TowerType.RAIL) {
            const dx = mouseX - t.x, dy = mouseY - t.y;
            if (Math.hypot(dx, dy) > 5) {
                aimAngle = Math.atan2(dy, dx) * 180 / Math.PI;
            }
        }
        updateTowerMesh(t, t === game.selectedTower, t === game.selectedTower, fortifyMult, dt, aimAngle);
    }

    // Update enemy meshes
    for (const e of game.enemies) {
        updateEnemyMesh(e, dt);
    }

    // Sapper laser lines
    updateSapperLines();

    // Update projectile meshes (lazy create if new)
    for (const p of game.projectiles) {
        if (!_projMeshCreated.has(p)) {
            createProjectileMesh(p);
            _projMeshCreated.add(p);
        }
        updateProjectileMesh(p);
    }

    // Update enemy projectile meshes
    for (const ep of game.enemyProjectiles) {
        if (!_eprojMeshCreated.has(ep)) {
            createEnemyProjectileMesh(ep);
            _eprojMeshCreated.add(ep);
        }
        updateEnemyProjectileMesh(ep);
    }

    // Particles
    updateParticleRenderer();

    // Tower placement preview
    if (game.selectedTowerType && game.hoverCol >= 0) {
        showTilePlacementPreview(game.hoverCol, game.hoverRow,
            game.gameMap.isBuildable(game.hoverCol, game.hoverRow));
    } else {
        hideTilePlacementPreview();
    }

    // Rail aim line
    if (game.aimingTower) {
        const dx = mouseX - game.aimingTower.x;
        const dy = mouseY - game.aimingTower.y;
        if (Math.hypot(dx, dy) > 5) {
            showRailAimLine(game.aimingTower, mouseX, mouseY);
        }
    } else {
        hideRailAimLine();
    }
}

// ─── Leaderboard Rendering ───────────────────────────────────
function renderLeaderboard(data) {
    const container = document.getElementById('menuLeaderboard');
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = '<div class="lb-empty">No scores yet — be the first!</div>';
        return;
    }

    let html = `
        <div class="lb-header">
            <span>#</span><span>NAME</span><span>WAVES</span><span>KILLS</span><span>TIME</span>
        </div>
    `;

    for (let i = 0; i < Math.min(data.length, 25); i++) {
        const s = data[i];
        const rankClass = i < 3 ? ` rank-${i + 1}` : '';
        const ts = s.time_s || 0;
        const timeStr = `${Math.floor(ts / 60)}:${String(ts % 60).padStart(2, '0')}`;
        html += `
            <div class="lb-row${rankClass}">
                <span class="lb-rank">${i + 1}</span>
                <span class="lb-name">${escapeHtml(s.name || 'Anonymous')}</span>
                <span class="lb-waves">${s.waves || 0}</span>
                <span class="lb-kills">${s.kills || 0}</span>
                <span class="lb-time">${timeStr}</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ─── Game Loop ───────────────────────────────────────────────
function gameLoop(timestamp) {
    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    dt = Math.min(dt, 0.05);
    dt *= game.speedMult;

    update(dt);
    draw(dt);

    if (hud && game.state === GameState.PLAYING) {
        hud.update();
        const drawerRes = document.getElementById('drawerRes');
        if (drawerRes && game.waveMgr) {
            drawerRes.textContent = `W${game.waveMgr.currentWave}  💰${game.gold}  ❤${game.lives}`;
        }
    }
    requestAnimationFrame(gameLoop);
}

// ─── Initialization ──────────────────────────────────────────
function init() {
    const renderTarget = document.getElementById('renderTarget');

    // Initialize Three.js scene, camera, renderer, bloom
    const sceneData = initScene(renderTarget);
    _camera = sceneData.camera;

    // Initialize raycasting input system
    initInput(_camera, renderTarget);

    // Initialize sapper laser line group (scene is live after initScene)
    _sapperLineGroup = new THREE.Group();
    scene.add(_sapperLineGroup);

    soundMgr = new SoundManager();

    initLeaderboard();
    onLeaderboardUpdate(renderLeaderboard);
    renderLeaderboard(getLeaderboard());

    reset();

    // Event listeners on renderTarget
    renderTarget.addEventListener('mousedown', e => {
        _mouseDownX = e.clientX;
        _mouseDownY = e.clientY;
        _mouseDidDrag = false;
    });
    renderTarget.addEventListener('mousemove', handleMouseMove);
    renderTarget.addEventListener('click', handleClick);
    renderTarget.addEventListener('contextmenu', handleRightClick);
    renderTarget.addEventListener('touchstart', handleTouchStart, { passive: false });
    renderTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
    renderTarget.addEventListener('touchend', handleTouchEnd, { passive: false });

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', onWindowResize);

    // Mobile drawer toggle
    const drawerToggle = document.getElementById('drawerToggle');
    if (drawerToggle) {
        drawerToggle.addEventListener('click', toggleDrawer);
        drawerToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleDrawer();
        });
    }

    // Mobile floating controls
    document.getElementById('btnMobileCancel')?.addEventListener('click', () => {
        if (game.state !== GameState.PLAYING) return;
        if (game.aimingTower) {
            game.aimingTower.fixedAngle = game.aimingTower.fixedAngle || 0;
            game.aimingTower.angle = game.aimingTower.fixedAngle;
            game.aimingTower = null;
        }
        game.selectedTowerType = null;
        game.selectedTower = null;
    });
    document.getElementById('btnMobileSpeed')?.addEventListener('click', () => {
        if (game.state !== GameState.PLAYING) return;
        game.speedMult = game.speedMult === 3 ? 1.5 : 3;
        showMessage(game.speedMult === 3 ? 'Speed: ▶▶ 2×' : 'Speed: ▶ 1×', 1.0);
        const btn = document.getElementById('btnMobileSpeed');
        if (btn) btn.classList.toggle('active', game.speedMult === 3);
    });
    document.getElementById('btnMobilePause')?.addEventListener('click', () => {
        if (game.state === GameState.PLAYING) setState(GameState.PAUSED);
    });

    // Menu buttons
    document.getElementById('btnStart')?.addEventListener('click', startGame);
    document.getElementById('btnHowToPlay')?.addEventListener('click', () => {
        document.getElementById('menuOverlay')?.classList.add('hidden');
        document.getElementById('howToPlayOverlay')?.classList.remove('hidden');
    });
    const closeHtp = () => {
        document.getElementById('howToPlayOverlay')?.classList.add('hidden');
        document.getElementById('menuOverlay')?.classList.remove('hidden');
    };
    document.getElementById('btnHtpClose')?.addEventListener('click', closeHtp);
    document.getElementById('btnHtpBack')?.addEventListener('click', closeHtp);
    document.getElementById('btnResume')?.addEventListener('click', () => {
        setState(GameState.PLAYING);
    });
    document.getElementById('btnQuit')?.addEventListener('click', () => {
        setState(GameState.MENU);
        renderLeaderboard(getLeaderboard());
    });
    document.getElementById('btnPlayAgain')?.addEventListener('click', startGame);

    // Score submission
    const submitScoreHandler = async () => {
        if (_scoreSubmitted) return;
        const nameInput = document.getElementById('goNameInput');
        const statusEl = document.getElementById('goSubmitStatus');
        const name = (nameInput?.value || '').trim();
        if (!name) {
            statusEl.textContent = 'Please enter a name';
            statusEl.className = 'go-submit-status error';
            return;
        }
        if (name.length > 20) {
            statusEl.textContent = 'Name too long (max 20 chars)';
            statusEl.className = 'go-submit-status error';
            return;
        }
        const elapsed = Math.round(performance.now() / 1000 - game.startTime);
        statusEl.textContent = 'Submitting...';
        statusEl.className = 'go-submit-status';
        await submitScore({
            name,
            waves: game.waveMgr.currentWave,
            kills: game.enemiesKilled,
            towers_built: game.towersBuilt,
            towers_lost: game.towersLost,
            time_s: elapsed,
        });
        _scoreSubmitted = true;
        statusEl.textContent = 'Score submitted!';
        statusEl.className = 'go-submit-status success';
    };
    document.getElementById('btnSubmitScore')?.addEventListener('click', submitScoreHandler);
    document.getElementById('goNameInput')?.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') submitScoreHandler();
    });

    setState(GameState.MENU);

    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
