// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — main.js
//  Game loop, state management, input, rendering orchestration
//  Part 2: HTML UI, procedural sound, global leaderboard
// ═══════════════════════════════════════════════════════════════

import { TILE_SIZE, MAP_COLS, MAP_ROWS, MAP_WIDTH, MAP_HEIGHT,
         FPS, DARK_BG, WHITE, CYAN, MAGENTA, SOFT_WHITE, NEON_PINK, NEON_BLUE,
         NEON_GREEN, NEON_ORANGE, GOLD_COLOR, RED, HOT_PINK, SAPPER_RED, ULTRA_RED,
         DAMAGE_RED, PANEL_BG, PANEL_BORDER, ICE_BLUE, ELECTRIC_BLUE,
         GameState, TowerType, EnemyType, TOWER_DATA, ENEMY_DATA,
         TOWER_TYPES_ORDERED, RESEARCH_TRACKS,
         STARTING_GOLD, STARTING_LIVES,
         COST_INFLATION_PER_WAVE, MAX_COST_MULT,
         BUILD_BAR_COLOR, UPGRADE_BAR_COLOR, BRANCH_BAR_COLOR, REPAIR_BAR_COLOR,
         RESEARCH_BAR_COLOR, RESEARCH_TIME_BY_LEVEL, HEAL_GREEN,
         BUILD_TIMES, PATH_COLORS } from './config.js';
import { clamp, dist, rgba, rgb, drawText, drawGlowRect, drawGlowCircle, randomUniform } from './utils.js';
import { generatePath, ALL_PATHS } from './path.js';
import { GameMap } from './map.js';
import { Enemy } from './enemies.js';
import { Tower, VisualEffect } from './towers.js';
import { Projectile, EnemyProjectile } from './projectiles.js';
import { ParticleSystem } from './particles.js';
import { WaveManager } from './waves.js';
import { SoundManager } from './sound.js';
import { HUD, showHUDMessage } from './hud.js';
import { initLeaderboard, submitScore, getLeaderboard, getLastPlayerName, onLeaderboardUpdate } from './leaderboard.js';

// ─── Global Game State ───────────────────────────────────────
export const game = {
    state: GameState.MENU,
    gold: STARTING_GOLD,
    lives: STARTING_LIVES,
    speedMult: 1,
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

let canvas, ctx;
let lastTime = 0;
let mouseX = 0, mouseY = 0;
let soundMgr;
let hud;
let _scoreSubmitted = false;

// ─── Cost / Research Helpers ─────────────────────────────────
function costMultiplier() {
    if (!game.waveMgr) return 1;
    return clamp(1.0 + game.waveMgr.currentWave * COST_INFLATION_PER_WAVE, 1.0, MAX_COST_MULT);
}

function globalMods() {
    const dmg = 1.0 + (game.research.Damage || 0) * RESEARCH_TRACKS.Damage.per_level;
    const rng = 1.0 + (game.research.Range || 0) * RESEARCH_TRACKS.Range.per_level;
    const ctl = 1.0 + (game.research.Control || 0) * RESEARCH_TRACKS.Control.per_level;
    const fort = 1.0 + (game.research.Fortify || 0) * RESEARCH_TRACKS.Fortify.per_level;
    return { damage_mult: dmg, range_mult: rng, control_mult: ctl, firerate_mult: 1.0, fortify_mult: fort };
}
game.globalMods = globalMods;
game.costMultiplier = costMultiplier;

function getResearchCost(track) {
    const info = RESEARCH_TRACKS[track];
    const lvl = game.research[track] || 0;
    if (lvl >= info.max_level) return null;
    return Math.round(info.base_cost * Math.pow(info.cost_mult, lvl) * costMultiplier());
}
game.getResearchCost = getResearchCost;

function tryBuyResearch(track) {
    if (game.researchInProgress) return [false, "Research in progress!"];
    const cost = getResearchCost(track);
    if (cost === null) return [false, "MAX"];
    if (game.gold < cost) return [false, "Not enough gold!"];
    game.gold -= cost;
    const targetLevel = (game.research[track] || 0) + 1;
    game.researchInProgress = track;
    game.researchTimer = 0;
    game.researchDuration = RESEARCH_TIME_BY_LEVEL[targetLevel] || 15;
    soundMgr.play('research');
    return [true, `${track} Lv.${targetLevel} researching...`];
}

function finishResearch() {
    const track = game.researchInProgress;
    if (!track) return;
    game.research[track] = (game.research[track] || 0) + 1;
    if (track === 'Fortify') {
        const oldMult = 1.0 + (game.research[track] - 1) * RESEARCH_TRACKS.Fortify.per_level;
        const newMult = 1.0 + game.research[track] * RESEARCH_TRACKS.Fortify.per_level;
        for (const t of game.towers) {
            const oldMax = t.getMaxHp(oldMult);
            const newMax = t.getMaxHp(newMult);
            t.hp += (newMax - oldMax);
        }
    }
    showMessage(`Research complete: ${track} Lv.${game.research[track]}`);
    soundMgr.play('upgrade');
    game.researchInProgress = null;
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
    for (const k of Object.keys(RESEARCH_TRACKS)) game.research[k] = 0;
    game.enemiesKilled = 0;
    game.towersBuilt = 0;
    game.towersLost = 0;
    game.gameTime = 0;
    game.speedMult = 1;
    game.startTime = performance.now() / 1000;
    game.researchInProgress = null;
    game.researchTimer = 0;
    game.researchDuration = 0;
    game.selectedTowerType = null;
    game.selectedTower = null;
    game.aimingTower = null;
    game.message = '';
    game.messageTimer = 0;
    game._waveStartPlayed = false;
    _scoreSubmitted = false;
}

// ─── State Transitions ──────────────────────────────────────
function setState(newState) {
    game.state = newState;
    const menuEl = document.getElementById('menuOverlay');
    const pauseEl = document.getElementById('pauseOverlay');
    const goEl = document.getElementById('gameOverOverlay');
    const gameEl = document.getElementById('gameContainer');

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
    // Rebuild HUD if needed
    if (hud) hud.destroy();
    hud = new HUD(game, {
        onSelectTowerType: (tt) => {
            const cost = Math.round(TOWER_DATA[tt].cost * costMultiplier());
            if (game.gold >= cost) {
                game.selectedTowerType = tt;
                game.selectedTower = null;
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
        onResearch: (track) => {
            const [ok, msg] = tryBuyResearch(track);
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
    } else if (action === 'sell') {
        const val = t.sellValue();
        game.gold += val;
        game.gameMap.removeTower(t.col, t.row);
        game.towers = game.towers.filter(tw => tw !== t);
        game.selectedTower = null;
        showMessage(`Tower sold for ${val}g`);
        soundMgr.play('sell');
        hud.showGoldDelta(val);
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

    // Also save local score
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
    if (game.state === GameState.MENU) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startGame();
        }
    } else if (game.state === GameState.PLAYING) {
        if (e.key === 'Escape') {
            setState(GameState.PAUSED);
        } else if (e.key === 'f' || e.key === 'F') {
            game.speedMult = game.speedMult === 2 ? 1 : 2;
            showMessage(game.speedMult === 2 ? 'Speed: ▶▶ 2×' : 'Speed: ▶ 1×', 1.0);
        } else if (e.key === ' ' && game.waveMgr.canSendEarly()) {
            e.preventDefault();
            const bonus = game.waveMgr.sendEarly();
            game.gold += bonus;
            showMessage(`+${bonus} bonus gold!`);
            if (hud) hud.showGoldDelta(bonus);
        }
        // Tower hotkeys 1-5
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
    } else if (game.state === GameState.GAME_OVER) {
        // Don't auto-transition; user must click buttons
    }
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouseX = (e.clientX - rect.left) * scaleX;
    mouseY = (e.clientY - rect.top) * scaleY;
    if (mouseX >= 0 && mouseX < MAP_WIDTH && mouseY >= 0 && mouseY < MAP_HEIGHT) {
        game.hoverCol = Math.floor(mouseX / TILE_SIZE);
        game.hoverRow = Math.floor(mouseY / TILE_SIZE);
    } else {
        game.hoverCol = -1;
        game.hoverRow = -1;
    }
}

function handleClick(e) {
    soundMgr.init();
    soundMgr.resume();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    if (game.state !== GameState.PLAYING) return;

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

    // Map clicks
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
                    const fortifyM = globalMods().fortify_mult;
                    t.hp = t.getMaxHp(fortifyM);
                    game.towers.push(t);
                    game.gameMap.placeTower(col, row);
                    game.towersBuilt++;
                    soundMgr.play('place_tower');
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
            return;
        }

        // Select existing tower
        for (const t of game.towers) {
            if (t.col === col && t.row === row) {
                game.selectedTower = t;
                game.selectedTowerType = null;
                return;
            }
        }
        game.selectedTower = null;
        game.selectedTowerType = null;
    }
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

// ─── Update Loop ─────────────────────────────────────────────
function update(dt) {
    if (game.state !== GameState.PLAYING) return;

    game.gameTime += dt;
    if (game.messageTimer > 0) game.messageTimer -= dt;

    // Research timer
    if (game.researchInProgress) {
        game.researchTimer += dt;
        if (game.researchTimer >= game.researchDuration) finishResearch();
    }

    const mods = globalMods();
    const fortifyMult = mods.fortify_mult;

    // Wave spawns
    const { newEnemies, waveCleared } = game.waveMgr.update(dt, game.enemies);

    // Sound for new enemies (boss spawn)
    for (const e of newEnemies) {
        if (e.type === EnemyType.BOSS || e.type === EnemyType.ULTRA_BOSS) {
            soundMgr.play('boss_spawn');
            showHUDMessage(`⚠ ${e.type === EnemyType.ULTRA_BOSS ? 'OVERLORD' : 'BOSS'} spawned!`, 'warn');
        }
    }
    game.enemies.push(...newEnemies);

    // Wave start sound
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
        if (e.alive) e.update(dt, game.enemies);
    }

    // Handle end-of-path leaks
    for (const e of game.enemies) {
        if (e.reachedEnd) {
            game.lives -= e.livesCost;
            if (game.lives <= 0) {
                game.lives = 0;
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
                const ep = new EnemyProjectile(e.x, e.y, e.towerTarget, e.attackDamage, 200);
                ep.color = SAPPER_RED;
                game.enemyProjectiles.push(ep);
                soundMgr.play('sapper_shoot');
            }
        }
    }

    // Update enemy projectiles
    const towerHpBefore = new Map();
    for (const t of game.towers) towerHpBefore.set(t, t.hp);
    for (const ep of game.enemyProjectiles) ep.update(dt);
    game.enemyProjectiles = game.enemyProjectiles.filter(ep => ep.alive);
    // Detect tower hits
    for (const t of game.towers) {
        if (towerHpBefore.has(t) && t.hp < towerHpBefore.get(t)) {
            soundMgr.play('tower_hit');
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
        showMessage(`${t.name} tower destroyed!`, 3.0);
        soundMgr.play('tower_destroyed');
        showHUDMessage(`${t.name} tower destroyed!`, 'warn');
    }
    game.towers = game.towers.filter(t => t.hp > 0);

    // Towers act — with sound hooks
    for (const t of game.towers) {
        const firedBefore = t.fireTimer;
        t.update(dt, game.enemies, game.projectiles, game.effects, game.particles, mods);
        // Detect if tower just fired (timer reset)
        if (firedBefore <= 0 && t.fireTimer > 0 && t.constructionState !== 'building') {
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

    // Projectiles move
    for (const p of game.projectiles) p.update(dt, game.enemies);
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
                splitterSpawns.push(child);
            }
        }
    }
    if (splitterSpawns.length > 0) game.enemies.push(...splitterSpawns);

    // Clean up
    game.enemies = game.enemies.filter(e => e.alive);
    for (const eff of game.effects) eff.update(dt);
    game.effects = game.effects.filter(e => e.alive);
    game.particles.update(dt);
}

// ─── Render ──────────────────────────────────────────────────
function draw() {
    if (!canvas || !ctx) return;
    ctx.fillStyle = rgb(DARK_BG);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (game.state === GameState.PLAYING || game.state === GameState.PAUSED || game.state === GameState.GAME_OVER) {
        drawGame();
    }
}

function drawGame() {
    // Map
    game.gameMap.draw(ctx, 1 / FPS);

    // Effects (under towers)
    for (const eff of game.effects) eff.draw(ctx);

    // Towers
    const fortifyMult = globalMods().fortify_mult;
    for (const t of game.towers) {
        t.draw(ctx, t === game.selectedTower, t === game.selectedTower, fortifyMult);
    }

    // Enemies
    for (const e of game.enemies) e.draw(ctx);

    // Sapper laser lines
    for (const e of game.enemies) {
        if (e.alive && e.type === EnemyType.SAPPER && e.towerTarget && e.towerTarget.hp > 0) {
            const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
            const a = 0.2 * pulse;
            ctx.beginPath();
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(e.towerTarget.x, e.towerTarget.y);
            ctx.strokeStyle = rgba([255, 60, 30], a);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Tower projectiles
    for (const p of game.projectiles) p.draw(ctx);

    // Enemy projectiles
    for (const ep of game.enemyProjectiles) ep.draw(ctx);

    // Particles
    game.particles.draw(ctx);

    // Tower placement preview
    if (game.selectedTowerType && game.hoverCol >= 0) {
        if (game.gameMap.isBuildable(game.hoverCol, game.hoverRow)) {
            const [cx, cy] = game.gameMap.tileCenter(game.hoverCol, game.hoverRow);
            const c = TOWER_DATA[game.selectedTowerType].color;
            const rng = TOWER_DATA[game.selectedTowerType].levels[0].range;
            // Range preview
            ctx.beginPath();
            ctx.arc(cx, cy, rng, 0, Math.PI * 2);
            ctx.fillStyle = rgba(c, 0.06);
            ctx.fill();
            ctx.strokeStyle = rgba(c, 0.2);
            ctx.lineWidth = 1;
            ctx.stroke();
            // Tower preview
            ctx.beginPath();
            ctx.arc(cx, cy, 12, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(c, 0.47);
            ctx.lineWidth = 2;
            ctx.stroke();
            // Valid tile highlight
            ctx.fillStyle = rgba([0, 80, 0], 0.3);
            ctx.fillRect(game.hoverCol * TILE_SIZE, game.hoverRow * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        } else {
            // Invalid tile
            ctx.fillStyle = rgba([80, 0, 0], 0.3);
            ctx.fillRect(game.hoverCol * TILE_SIZE, game.hoverRow * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    // Rail aiming preview
    if (game.aimingTower) {
        const t = game.aimingTower;
        if (mouseX >= 0 && mouseX < MAP_WIDTH && mouseY >= 0 && mouseY < MAP_HEIGHT) {
            const dx = mouseX - t.x, dy = mouseY - t.y;
            const d = Math.hypot(dx, dy);
            if (d > 5) {
                const ndx = dx / d, ndy = dy / d;
                const ex = t.x + ndx * t.range, ey = t.y + ndy * t.range;
                const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
                const alpha = 0.47 + 0.24 * pulse;
                ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(ex, ey);
                ctx.strokeStyle = rgba(MAGENTA, alpha); ctx.lineWidth = 3; ctx.stroke();
                // Corridor width
                const perpX = -ndy * 10, perpY = ndx * 10;
                ctx.beginPath(); ctx.moveTo(t.x + perpX, t.y + perpY); ctx.lineTo(ex + perpX, ey + perpY);
                ctx.strokeStyle = rgba(MAGENTA, alpha * 0.3); ctx.lineWidth = 1; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(t.x - perpX, t.y - perpY); ctx.lineTo(ex - perpX, ey - perpY);
                ctx.strokeStyle = rgba(MAGENTA, alpha * 0.3); ctx.lineWidth = 1; ctx.stroke();
                ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2);
                ctx.fillStyle = rgba(WHITE, alpha); ctx.fill();
            }
        }
        drawText(ctx, "CLICK TO SET RAIL DIRECTION", MAP_WIDTH / 2, 20, MAGENTA, 16, true);
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
    draw();
    if (hud && game.state === GameState.PLAYING) hud.update();
    requestAnimationFrame(gameLoop);
}

// ─── Initialization ──────────────────────────────────────────
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    // Canvas is just the map area (no sidebar — sidebar is HTML)
    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    soundMgr = new SoundManager();

    // Initialize leaderboard
    initLeaderboard();
    onLeaderboardUpdate(renderLeaderboard);
    // Initial render with local data
    renderLeaderboard(getLeaderboard());

    reset();

    // Event listeners — canvas
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('contextmenu', handleRightClick);

    // Global keys
    window.addEventListener('keydown', handleKeyDown);

    // Menu buttons
    document.getElementById('btnStart')?.addEventListener('click', () => {
        startGame();
    });
    document.getElementById('btnResume')?.addEventListener('click', () => {
        setState(GameState.PLAYING);
    });
    document.getElementById('btnQuit')?.addEventListener('click', () => {
        setState(GameState.MENU);
        renderLeaderboard(getLeaderboard());
    });
    document.getElementById('btnPlayAgain')?.addEventListener('click', () => {
        startGame();
    });

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
        e.stopPropagation(); // Don't trigger game hotkeys
        if (e.key === 'Enter') submitScoreHandler();
    });

    // Start in menu state
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
