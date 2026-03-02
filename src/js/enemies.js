// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — enemies.js
//  Enemy class with ALL type behaviors (no rendering)
// ═══════════════════════════════════════════════════════════════

import { EnemyType, ENEMY_DATA } from './config.js';
import { dist, lerp, clamp, randomUniform } from './utils.js';
import { ALL_PATHS } from './path.js';

export class Enemy {
    constructor(enemyType, waveScale = 1.0, pathProgress = 0, waypointIndex = 0, eliteLevel = 0, pathIndex = 0) {
        const data = ENEMY_DATA[enemyType];
        this.type = enemyType;
        this.pathIndex = pathIndex;
        this.maxHealth = Math.round(data.health * waveScale);
        this.health = this.maxHealth;
        this.baseSpeed = data.speed;
        this.speed = this.baseSpeed;
        this.reward = Math.round(data.reward * Math.pow(waveScale, 0.35));
        this.color = [...data.color];
        this.size = data.size;
        this.livesCost = data.lives_cost;
        this.armor = data.armor || 0;
        this.eliteLevel = eliteLevel;

        if (eliteLevel > 0) {
            this.maxHealth = Math.round(this.maxHealth * (1.0 + 0.35 * eliteLevel));
            this.health = this.maxHealth;
            this.baseSpeed = Math.round(this.baseSpeed * (1.0 + 0.04 * eliteLevel));
            this.armor = this.armor + 2 * eliteLevel;
            this.reward = Math.round(this.reward * (1.0 + 0.25 * eliteLevel));
            this.color = this.color.map(c => Math.min(255, Math.round(c + 25 * eliteLevel)));
        }

        this.waypointIndex = waypointIndex;
        this.pathProgress = pathProgress;
        this.x = 0; this.y = 0;
        this.totalDistance = 0;
        this._updatePosition();

        this.slowTimer = 0; this.slowFactor = 1.0;
        this.vulnerability = 1.0; this.vulnTimer = 0;
        this.dotDamage = 0; this.dotTimer = 0;
        this.alive = true; this.reachedEnd = false;
        this.phaseTimer = 0; this.phased = false;

        if (enemyType === EnemyType.PHASE) {
            this.phaseOn = data.phase_on || 1.5;
            this.phaseOff = data.phase_off || 2.5;
            this.phaseReduction = data.phase_reduction || 0.2;
            this.phaseTimer = randomUniform(0, this.phaseOff);
        }

        this.healTimer = 0;
        if (enemyType === EnemyType.HEALER) {
            this.healAmount = data.heal_amount || 12;
            this.healRange = data.heal_range || 100;
            this.healRate = data.heal_rate || 0.8;
        }

        this.sprintTimer = 0; this.sprinting = false;
        if (enemyType === EnemyType.SPRINTER) {
            this.sprintSpeed = data.sprint_speed || 160;
            this.sprintDuration = data.sprint_duration || 0.8;
            this.sprintCooldown = data.sprint_cooldown || 3.0;
            this.sprintTimer = randomUniform(1.0, this.sprintCooldown);
        }

        // Sapper attack
        this.towerTarget = null;
        this.missChance = 0.0;
        if (enemyType === EnemyType.SAPPER) {
            this.attackDamage = Math.min(65, Math.round((data.attack_damage || 8) * (1.0 + (waveScale - 1.0) * 0.22)));
            this.attackRange = data.attack_range || 130;
            this.attackRate = Math.max(1.4, (data.attack_rate || 2.2) - Math.min(0.5, (waveScale - 1.0) * 0.012));
            this.missChance = data.miss_chance || 0.35;
            this.sapperFireTimer = randomUniform(1.0, this.attackRate + 1.0);
            if (eliteLevel > 0) {
                this.attackDamage = Math.round(this.attackDamage * (1.0 + 0.25 * eliteLevel));
                this.attackRate = Math.max(1.0, this.attackRate - 0.18 * eliteLevel);
                this.missChance = Math.max(0.10, this.missChance - 0.08 * eliteLevel);
            }
        }

        this.flashTimer = 0;
        this.rotation = randomUniform(0, 360);
    }

    _getWaypoints() {
        if (this.pathIndex < ALL_PATHS.length) {
            return ALL_PATHS[this.pathIndex].waypoints;
        }
        return ALL_PATHS.length > 0 ? ALL_PATHS[0].waypoints : [];
    }

    _updatePosition() {
        const waypoints = this._getWaypoints();
        if (waypoints.length === 0) return;
        if (this.waypointIndex >= waypoints.length - 1) {
            this.x = waypoints[waypoints.length - 1][0];
            this.y = waypoints[waypoints.length - 1][1];
            return;
        }
        const a = waypoints[this.waypointIndex];
        const b = waypoints[this.waypointIndex + 1];
        this.x = lerp(a[0], b[0], this.pathProgress);
        this.y = lerp(a[1], b[1], this.pathProgress);
    }

    takeDamage(damage, mods = null) {
        if (this.type === EnemyType.PHASE && this.phased) {
            if (mods && mods.phase_scanner) {
                // No reduction
            } else {
                damage *= this.phaseReduction;
            }
        }
        if (this.armor > 0) {
            let effectiveArmor = this.armor;
            if (mods && mods.armor_pierce > 0) {
                effectiveArmor = Math.round(this.armor * (1.0 - mods.armor_pierce));
            }
            damage = Math.max(1, damage - effectiveArmor);
        }
        if (this.vulnerability > 1.0 && this.vulnTimer > 0) {
            damage *= this.vulnerability;
        }
        this.health -= damage;
        this.flashTimer = 0.08;
        if (this.health <= 0) this.alive = false;
    }

    applySlow(factor, duration) {
        if (factor < this.slowFactor || this.slowTimer <= 0) {
            this.slowFactor = factor;
        }
        this.slowTimer = Math.max(this.slowTimer, duration);
    }

    applyVulnerability(mult, duration) {
        this.vulnerability = Math.max(this.vulnerability, mult);
        this.vulnTimer = Math.max(this.vulnTimer, duration);
    }

    applyDot(dps, duration, mods = null) {
        let effectiveDps = dps;
        if (mods && mods.dot_tick_bonus > 0) {
            effectiveDps *= (1.0 + mods.dot_tick_bonus);
        }
        this.dotDamage = Math.max(this.dotDamage, effectiveDps);
        this.dotTimer = Math.max(this.dotTimer, duration);
    }

    update(dt, allEnemies, mods = null) {
        if (!this.alive) return;

        // Phase cycling
        if (this.type === EnemyType.PHASE) {
            this.phaseTimer -= dt;
            if (this.phased) {
                if (this.phaseTimer <= 0) { this.phased = false; this.phaseTimer = this.phaseOff; }
            } else {
                if (this.phaseTimer <= 0) { this.phased = true; this.phaseTimer = this.phaseOn; }
            }
        }

        // Sprinter
        if (this.type === EnemyType.SPRINTER) {
            this.sprintTimer -= dt;
            if (this.sprinting) {
                if (this.sprintTimer <= 0) { this.sprinting = false; this.sprintTimer = this.sprintCooldown; }
            } else {
                if (this.sprintTimer <= 0) { this.sprinting = true; this.sprintTimer = this.sprintDuration; }
            }
        }

        // Healer
        if (this.type === EnemyType.HEALER && allEnemies) {
            this.healTimer -= dt;
            if (this.healTimer <= 0) {
                this.healTimer = this.healRate;
                let healAmt = this.healAmount;
                if (mods && mods.healer_reduction > 0) {
                    healAmt *= (1.0 - mods.healer_reduction);
                }
                for (const e of allEnemies) {
                    if (e !== this && e.alive && e.health < e.maxHealth &&
                        dist(this.x, this.y, e.x, e.y) <= this.healRange) {
                        e.health = Math.min(e.maxHealth, e.health + healAmt);
                    }
                }
            }
        }

        // DoT
        if (this.dotTimer > 0) {
            this.health -= this.dotDamage * dt;
            this.dotTimer -= dt;
            if (this.dotTimer <= 0) this.dotDamage = 0;
            if (this.health <= 0) { this.alive = false; return; }
        }

        // Speed calculation
        let effectiveSpeed = this.baseSpeed;
        if (this.slowTimer > 0) {
            effectiveSpeed *= this.slowFactor;
            this.slowTimer -= dt;
        }
        if (this.type === EnemyType.SPRINTER && this.sprinting) {
            let sprintSpd = this.sprintSpeed;
            if (mods && mods.sprinter_reduction > 0) {
                sprintSpd *= (1.0 - mods.sprinter_reduction);
            }
            effectiveSpeed = sprintSpd;
        }
        this.speed = effectiveSpeed;

        // Vulnerability decay
        if (this.vulnTimer > 0) {
            this.vulnTimer -= dt;
            if (this.vulnTimer <= 0) this.vulnerability = 1.0;
        }

        // Movement along path
        const waypoints = this._getWaypoints();
        if (this.waypointIndex >= waypoints.length - 1) {
            this.reachedEnd = true; this.alive = false; return;
        }
        let a = waypoints[this.waypointIndex];
        let b = waypoints[this.waypointIndex + 1];
        let segLen = dist(a[0], a[1], b[0], b[1]);
        if (segLen < 1) {
            this.waypointIndex++;
            this.pathProgress = 0;
            this._updatePosition();
            return;
        }
        const move = effectiveSpeed * dt;
        this.pathProgress += move / segLen;
        this.totalDistance += move;

        while (this.pathProgress >= 1.0 && this.waypointIndex < waypoints.length - 1) {
            const overflow = (this.pathProgress - 1.0) * segLen;
            this.waypointIndex++;
            this.pathProgress = 0;
            if (this.waypointIndex < waypoints.length - 1) {
                a = waypoints[this.waypointIndex];
                b = waypoints[this.waypointIndex + 1];
                segLen = dist(a[0], a[1], b[0], b[1]);
                if (segLen > 0) this.pathProgress = overflow / segLen;
            }
        }
        if (this.waypointIndex >= waypoints.length - 1) {
            this.reachedEnd = true; this.alive = false; return;
        }
        this._updatePosition();
        this.flashTimer = Math.max(0, this.flashTimer - dt);
        this.rotation += 90 * dt;
    }
}
