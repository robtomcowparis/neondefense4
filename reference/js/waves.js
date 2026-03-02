// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — waves.js
//  Wave manager, composition logic, scaling, spawn queue
// ═══════════════════════════════════════════════════════════════

import { EnemyType, MIN_REWARD_MULT, REWARD_DECAY_PER_WAVE, REWARD_DECAY_STOP_WAVE,
         WAVE_CLEAR_BASE_BONUS, WAVE_CLEAR_BONUS_PER_WAVE, WAVE_CLEAR_LATE_BONUS_PER_WAVE } from './config.js';
import { clamp, randomUniform } from './utils.js';
import { Enemy } from './enemies.js';
import { ALL_PATHS } from './path.js';

export class WaveManager {
    constructor() {
        this.ENEMY_UNLOCKS = [
            [1,  EnemyType.DRONE],
            [3,  EnemyType.SWARM],
            [5,  EnemyType.TANK],
            [7,  EnemyType.SPRINTER],
            [8,  EnemyType.ARMORED],
            [6,  EnemyType.SAPPER],
            [11, EnemyType.HEALER],
            [12, EnemyType.PHASE],
            [14, EnemyType.SPLITTER],
        ];
        this.currentWave = 0;
        this.spawning = false;
        this.waveActive = false;
        this.spawnQueue = [];
        this.spawnTimer = 0;
        this.waveCountdown = 18.0;
        this.countdownActive = true;
        this.allWavesDone = false;
        this.enemiesAlive = 0;
        this.waveClearBonus = 0;
        this.waveCountdownBase = 3.0;
    }

    getRewardMultiplier() {
        const effectiveWave = Math.min(this.currentWave, REWARD_DECAY_STOP_WAVE);
        return Math.max(MIN_REWARD_MULT, 1.0 - effectiveWave * REWARD_DECAY_PER_WAVE);
    }

    getWaveClearBonus() {
        let bonus = WAVE_CLEAR_BASE_BONUS + this.currentWave * WAVE_CLEAR_BONUS_PER_WAVE;
        if (this.currentWave > 25) {
            bonus += (this.currentWave - 25) * WAVE_CLEAR_LATE_BONUS_PER_WAVE;
        }
        return bonus;
    }

    _getAvailableEnemies(waveNum) {
        return this.ENEMY_UNLOCKS
            .filter(([threshold]) => waveNum >= threshold)
            .map(([, etype]) => etype);
    }

    _getHealthScale(waveNum) {
        if (waveNum <= 20) {
            return 1.0 + waveNum * 0.16;
        } else {
            const base = 1.0 + 20 * 0.16; // 4.2 at wave 20
            const excess = waveNum - 20;
            return base * Math.pow(1.09, excess);
        }
    }

    _getCountScale(waveNum) {
        if (waveNum <= 20) {
            return 1.0 + waveNum * 0.10;
        } else {
            const base = 1.0 + 20 * 0.10;
            const excess = waveNum - 20;
            return base + excess * 0.18;
        }
    }

    _generateWave(waveNum) {
        let available = this._getAvailableEnemies(waveNum);
        if (available.length === 0) available = [EnemyType.DRONE];

        const countScale = this._getCountScale(waveNum);
        const waveDef = [];
        const numTypes = Math.min(available.length, 2 + Math.floor(waveNum / 5));
        const weights = available.map((_, i) => 1.0 + i * 0.5);
        const chosen = [];
        const pool = available.map((e, i) => [e, weights[i]]);

        for (let t = 0; t < Math.min(numTypes, pool.length); t++) {
            const total = pool.reduce((s, [, w]) => s + w, 0);
            let r = Math.random() * total;
            let cumulative = 0;
            for (let idx = 0; idx < pool.length; idx++) {
                cumulative += pool[idx][1];
                if (r <= cumulative) {
                    chosen.push(pool[idx][0]);
                    pool.splice(idx, 1);
                    break;
                }
            }
        }

        for (const etype of chosen) {
            let baseCount, spacing;
            if (etype === EnemyType.SWARM) {
                baseCount = Math.round(14 * countScale);
                spacing = Math.max(0.04, 0.18 - waveNum * 0.003);
            } else if (etype === EnemyType.DRONE) {
                baseCount = Math.round(10 * countScale);
                spacing = Math.max(0.08, 0.35 - waveNum * 0.006);
            } else if (etype === EnemyType.TANK) {
                baseCount = Math.round(3 * countScale);
                spacing = Math.max(0.3, 1.2 - waveNum * 0.02);
            } else if (etype === EnemyType.ARMORED) {
                baseCount = Math.round(3 * countScale);
                spacing = Math.max(0.25, 0.9 - waveNum * 0.015);
            } else if (etype === EnemyType.PHASE) {
                baseCount = Math.round(5 * countScale);
                spacing = Math.max(0.10, 0.55 - waveNum * 0.009);
            } else if (etype === EnemyType.SPLITTER) {
                baseCount = Math.round(4 * countScale);
                spacing = Math.max(0.18, 0.65 - waveNum * 0.009);
            } else if (etype === EnemyType.HEALER) {
                baseCount = Math.round(2 * countScale);
                spacing = Math.max(0.3, 1.0 - waveNum * 0.02);
            } else if (etype === EnemyType.SPRINTER) {
                baseCount = Math.round(4 * countScale);
                spacing = Math.max(0.10, 0.50 - waveNum * 0.009);
            } else if (etype === EnemyType.SAPPER) {
                baseCount = Math.round(3 * countScale);
                spacing = Math.max(0.4, 1.2 - waveNum * 0.012);
            } else {
                baseCount = Math.round(7 * countScale);
                spacing = Math.max(0.08, 0.30 - waveNum * 0.006);
            }
            baseCount = Math.max(1, baseCount);
            waveDef.push([etype, baseCount, spacing]);
        }
        return waveDef;
    }

    startNextWave() {
        const waveNum = this.currentWave + 1;
        const waveDef = this._generateWave(waveNum);
        this.spawnQueue = [];
        const scale = this._getHealthScale(waveNum);

        for (const [etype, baseCount, spacing] of waveDef) {
            for (let i = 0; i < baseCount; i++) {
                this.spawnQueue.push({ etype, spacing, scale, eliteLevel: 0 });
            }
        }

        // Boss scheduling
        if (waveNum % 5 === 0) {
            const bossCount = Math.max(1, Math.floor(waveNum / 12));
            for (let i = 0; i < bossCount; i++) {
                this.spawnQueue.push({
                    etype: EnemyType.BOSS,
                    spacing: 1.5,
                    scale,
                    eliteLevel: waveNum >= 15 ? 1 : 0
                });
            }
        }

        // Ultra boss — staggered to NOT overlap with regular boss waves
        if (waveNum >= 25 && waveNum % 10 === 8) {
            const ultraCount = Math.max(1, Math.floor((waveNum - 18) / 15));
            for (let i = 0; i < ultraCount; i++) {
                this.spawnQueue.push({
                    etype: EnemyType.ULTRA_BOSS,
                    spacing: 2.5,
                    scale,
                    eliteLevel: 1
                });
            }
        }

        // Separate and shuffle non-bosses, bosses go last
        const nonBosses = this.spawnQueue.filter(s =>
            s.etype !== EnemyType.BOSS && s.etype !== EnemyType.ULTRA_BOSS
        );
        const bosses = this.spawnQueue.filter(s =>
            s.etype === EnemyType.BOSS || s.etype === EnemyType.ULTRA_BOSS
        );
        // Fisher-Yates shuffle
        for (let i = nonBosses.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nonBosses[i], nonBosses[j]] = [nonBosses[j], nonBosses[i]];
        }
        this.spawnQueue = [...nonBosses, ...bosses];

        this.spawning = true;
        this.waveActive = true;
        this.spawnTimer = 0.3;
        this.currentWave++;
        this.countdownActive = false;
    }

    canSendEarly() {
        return this.countdownActive && this.waveCountdown > 0 && !this.spawning;
    }

    sendEarly() {
        const bonus = Math.round(this.waveCountdown * 3);
        this.waveCountdown = 0;
        this.countdownActive = false;
        this.startNextWave();
        return bonus;
    }

    update(dt, enemies) {
        this.enemiesAlive = enemies.filter(e => e.alive).length;

        if (this.countdownActive) {
            this.waveCountdown -= dt;
            if (this.waveCountdown <= 0) this.startNextWave();
            return { newEnemies: [], waveCleared: false };
        }

        const newEnemies = [];
        if (this.spawning && this.spawnQueue.length > 0) {
            this.spawnTimer -= dt;
            while (this.spawnTimer <= 0 && this.spawnQueue.length > 0) {
                const spawn = this.spawnQueue.shift();
                let el = spawn.eliteLevel;

                // Elite chance for non-boss enemies after wave 12
                if (el === 0 && this.currentWave >= 12 &&
                    spawn.etype !== EnemyType.BOSS && spawn.etype !== EnemyType.ULTRA_BOSS) {
                    const eliteChance = clamp((this.currentWave - 12) * 0.02, 0, 0.25);
                    if (Math.random() < eliteChance) {
                        el = 1;
                    } else if (this.currentWave >= 25 && Math.random() < 0.05) {
                        el = 2;
                    }
                }

                const pathIndex = Math.floor(Math.random() * ALL_PATHS.length);
                newEnemies.push(new Enemy(
                    spawn.etype,
                    spawn.scale,
                    0, 0, el, pathIndex
                ));

                if (this.spawnQueue.length > 0) {
                    this.spawnTimer += this.spawnQueue[0].spacing;
                } else {
                    this.spawning = false;
                }
            }
        }

        let waveCleared = false;
        if (!this.spawning && this.enemiesAlive === 0 && this.waveActive) {
            this.waveActive = false;
            waveCleared = true;
            this.waveClearBonus = this.getWaveClearBonus();
            if (this.currentWave <= 1) {
                this.waveCountdown = 15.0;
            } else if (this.currentWave <= 2) {
                this.waveCountdown = 10.0;
            } else {
                this.waveCountdown = 3.0;
            }
            this.countdownActive = true;
        }

        return { newEnemies, waveCleared };
    }
}
