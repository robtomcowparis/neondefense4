// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — enemies.js
//  Enemy class with ALL type behaviors
// ═══════════════════════════════════════════════════════════════

import { EnemyType, ENEMY_DATA, WHITE, SAPPER_RED, ULTRA_RED, SPRINT_TEAL,
         HEAL_GREEN, ELECTRIC_BLUE, ICE_BLUE, NEON_GREEN, YELLOW, RED, ARMOR_GRAY } from './config.js';
import { dist, lerp, rgba, rgb, clamp, drawGlowCircle, randomUniform } from './utils.js';
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
        this.reward = data.reward;
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
            this.attackDamage = Math.round((data.attack_damage || 8) * (1.0 + (waveScale - 1.0) * 0.15));
            this.attackRange = data.attack_range || 130;
            this.attackRate = data.attack_rate || 2.2;
            this.missChance = data.miss_chance || 0.35;
            this.sapperFireTimer = randomUniform(1.0, this.attackRate + 1.0);
            if (eliteLevel > 0) {
                this.attackDamage = Math.round(this.attackDamage * (1.0 + 0.15 * eliteLevel));
                this.attackRate = Math.max(1.2, this.attackRate - 0.12 * eliteLevel);
                this.missChance = Math.max(0.15, this.missChance - 0.05 * eliteLevel);
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

    takeDamage(damage) {
        if (this.type === EnemyType.PHASE && this.phased) {
            damage *= this.phaseReduction;
        }
        if (this.armor > 0) {
            damage = Math.max(1, damage - this.armor);
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

    applyDot(dps, duration) {
        this.dotDamage = Math.max(this.dotDamage, dps);
        this.dotTimer = Math.max(this.dotTimer, duration);
    }

    update(dt, allEnemies) {
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
                for (const e of allEnemies) {
                    if (e !== this && e.alive && e.health < e.maxHealth &&
                        dist(this.x, this.y, e.x, e.y) <= this.healRange) {
                        e.health = Math.min(e.maxHealth, e.health + this.healAmount);
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
            effectiveSpeed = this.sprintSpeed;
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

    draw(ctx) {
        if (!this.alive) return;
        const ix = Math.round(this.x);
        const iy = Math.round(this.y);
        let alpha = 1.0;
        if (this.type === EnemyType.PHASE && this.phased) {
            alpha = 0.23 + 0.16 * Math.sin(performance.now() * 0.02);
        }
        const color = this.flashTimer > 0 ? WHITE : this.color;

        // Status effect glows
        if (this.slowTimer > 0) drawGlowCircle(ctx, [100, 180, 255], ix, iy, this.size + 4, 1);
        if (this.dotTimer > 0) drawGlowCircle(ctx, ELECTRIC_BLUE, ix, iy, this.size + 3, 1);
        if (this.vulnTimer > 0 && this.vulnerability > 1.0) drawGlowCircle(ctx, ICE_BLUE, ix, iy, this.size + 5, 1);
        if (this.type === EnemyType.SPRINTER && this.sprinting) drawGlowCircle(ctx, SPRINT_TEAL, ix, iy, this.size + 6, 2);

        // Healer aura
        if (this.type === EnemyType.HEALER) {
            const hr = this.healRange || 100;
            const p2 = 0.3 + 0.3 * Math.sin(performance.now() * 0.004);
            ctx.beginPath();
            ctx.arc(ix, iy, hr, 0, Math.PI * 2);
            ctx.fillStyle = rgba([100, 255, 150], 0.06 * p2);
            ctx.fill();
        }

        // Draw shape
        ctx.save();
        ctx.globalAlpha = alpha;
        this._drawShape(ctx, color, ix, iy, this.size);
        ctx.restore();

        // Health bar
        if (this.health < this.maxHealth) {
            let barW = this.size * 2 + 6;
            let barH = 3;
            if (this.type === EnemyType.BOSS) { barW = 40; barH = 5; }
            if (this.type === EnemyType.ULTRA_BOSS) { barW = 50; barH = 6; }
            const bx = ix - barW / 2;
            const by = iy - this.size - 8;
            ctx.fillStyle = 'rgb(30,30,30)';
            ctx.fillRect(bx, by, barW, barH);
            const ratio = Math.max(0, this.health / this.maxHealth);
            const fc = ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? YELLOW : RED;
            ctx.fillStyle = rgb(fc);
            ctx.fillRect(bx, by, Math.round(barW * ratio), barH);
            if (this.armor > 0) {
                ctx.strokeStyle = rgb(ARMOR_GRAY);
                ctx.lineWidth = 1;
                ctx.strokeRect(bx, by, barW, barH);
            }
        }
    }

    _drawShape(ctx, color, cx, cy, sz) {
        const colorStr = rgb(color);

        if (this.type === EnemyType.DRONE) {
            // Diamond
            ctx.beginPath();
            ctx.moveTo(cx, cy - sz); ctx.lineTo(cx + sz, cy);
            ctx.lineTo(cx, cy + sz); ctx.lineTo(cx - sz, cy);
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 1; ctx.stroke();
        } else if (this.type === EnemyType.SWARM) {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(cx, cy - sz); ctx.lineTo(cx + sz, cy + sz); ctx.lineTo(cx - sz, cy + sz);
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
        } else if (this.type === EnemyType.TANK) {
            // Hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 180) * (60 * i + this.rotation);
                const px = cx + sz * Math.cos(a);
                const py = cy + sz * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2; ctx.stroke();
        } else if (this.type === EnemyType.PHASE) {
            // Octagon
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI / 180) * (45 * i + this.rotation * 0.5);
                const px = cx + sz * Math.cos(a);
                const py = cy + sz * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 1; ctx.stroke();
        } else if (this.type === EnemyType.SPLITTER || this.type === EnemyType.SPLITTER_CHILD) {
            // Pentagon
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const a = (Math.PI / 180) * (72 * i - 90 + this.rotation);
                const px = cx + sz * Math.cos(a);
                const py = cy + sz * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 1; ctx.stroke();
        } else if (this.type === EnemyType.ARMORED) {
            // Square
            ctx.fillStyle = colorStr;
            ctx.fillRect(cx - sz, cy - sz, sz * 2, sz * 2);
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2;
            ctx.strokeRect(cx - sz, cy - sz, sz * 2, sz * 2);
        } else if (this.type === EnemyType.HEALER) {
            // Plus/cross
            const w = Math.max(2, Math.floor(sz / 3));
            ctx.fillStyle = colorStr;
            ctx.fillRect(cx - w, cy - sz, w * 2, sz * 2);
            ctx.fillRect(cx - sz, cy - w, sz * 2, w * 2);
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 1;
            ctx.strokeRect(cx - w, cy - sz, w * 2, sz * 2);
            ctx.strokeRect(cx - sz, cy - w, sz * 2, w * 2);
        } else if (this.type === EnemyType.SPRINTER) {
            // Arrow shape
            ctx.beginPath();
            ctx.moveTo(cx + sz, cy);
            ctx.lineTo(cx - sz, cy - sz);
            ctx.lineTo(cx - Math.floor(sz / 2), cy);
            ctx.lineTo(cx - sz, cy + sz);
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 1; ctx.stroke();
        } else if (this.type === EnemyType.SAPPER) {
            // Inverted triangle + barrel
            ctx.beginPath();
            ctx.moveTo(cx, cy + sz); ctx.lineTo(cx + sz, cy - sz); ctx.lineTo(cx - sz, cy - sz);
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2; ctx.stroke();
            // Barrel toward tower target
            if (this.towerTarget && this.towerTarget.hp > 0) {
                const tx = this.towerTarget.x;
                const ty = this.towerTarget.y;
                const dx = tx - cx, dy = ty - cy;
                const d = Math.hypot(dx, dy);
                if (d > 1) {
                    const bx = cx + (dx / d) * sz * 1.4;
                    const by = cy + (dy / d) * sz * 1.4;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by);
                    ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2; ctx.stroke();
                    ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI * 2);
                    ctx.fillStyle = rgb(SAPPER_RED); ctx.fill();
                }
            }
            // Pulsing core
            const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.006);
            ctx.beginPath();
            ctx.arc(cx, cy, Math.max(2, sz * 0.3), 0, Math.PI * 2);
            ctx.fillStyle = rgb([255, Math.round(120 * pulse), 0]);
            ctx.fill();
        } else if (this.type === EnemyType.BOSS) {
            // 8-pointed star
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI / 180) * (45 * i + this.rotation * 0.3);
                const r = (i % 2 === 0) ? sz : sz * 0.6;
                const px = cx + r * Math.cos(a);
                const py = cy + r * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2; ctx.stroke();
            const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.006);
            ctx.beginPath();
            ctx.arc(cx, cy, sz * 0.35 * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
            ctx.fillStyle = rgb(WHITE); ctx.fill();
        } else if (this.type === EnemyType.ULTRA_BOSS) {
            // 12-pointed star with inner star
            ctx.beginPath();
            for (let i = 0; i < 12; i++) {
                const a = (Math.PI / 180) * (30 * i + this.rotation * 0.2);
                const r = (i % 2 === 0) ? sz : sz * 0.55;
                const px = cx + r * Math.cos(a);
                const py = cy + r * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = colorStr; ctx.fill();
            ctx.strokeStyle = rgb(WHITE); ctx.lineWidth = 2; ctx.stroke();
            // Inner star
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 180) * (60 * i + this.rotation * 0.4 + 15);
                const r = sz * 0.45;
                const px = cx + r * Math.cos(a);
                const py = cy + r * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.strokeStyle = rgb([255, 200, 100]); ctx.lineWidth = 2; ctx.stroke();
            const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
            ctx.beginPath();
            ctx.arc(cx, cy, sz * 0.3 * (0.7 + 0.3 * pulse), 0, Math.PI * 2);
            ctx.fillStyle = rgba([255, 255, 200], 1); ctx.fill();
            ctx.beginPath();
            ctx.arc(cx, cy, sz * 0.2, 0, Math.PI * 2);
            ctx.strokeStyle = colorStr; ctx.lineWidth = 2; ctx.stroke();
        }
    }
}
