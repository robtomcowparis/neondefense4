// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — towers.js
//  Tower class with targeting, firing, upgrades, branches, build timers
// ═══════════════════════════════════════════════════════════════

import { TowerType, TOWER_DATA, TOWER_HP_PER_LEVEL, TOWER_HP_BRANCH_BONUS,
         BUILD_TIMES, UPGRADE_TIME_BY_LEVEL, BRANCH_TIME, REPAIR_TIME_BASE, REPAIR_TIME_MAX,
         TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, EnemyType,
         BUILD_BAR_COLOR, UPGRADE_BAR_COLOR, BRANCH_BAR_COLOR, REPAIR_BAR_COLOR,
         CYAN, MAGENTA, WHITE, GOLD_COLOR, NEON_GREEN, YELLOW, RED, NEON_ORANGE,
         HOT_PINK, DAMAGE_RED, SCREEN_WIDTH, SCREEN_HEIGHT } from './config.js';
import { dist, rgba, rgb, clamp, drawText, drawGlowCircle } from './utils.js';
import { Projectile } from './projectiles.js';

// Visual effect helper class
export class VisualEffect {
    constructor(type, duration, kw) {
        this.type = type;
        this.duration = duration;
        this.maxDuration = duration;
        this.alive = true;
        this.kw = kw;
    }

    update(dt) {
        this.duration -= dt;
        if (this.duration <= 0) this.alive = false;
    }

    draw(ctx) {
        const t = 1.0 - (this.duration / this.maxDuration);
        const ar = Math.max(0, 1.0 - t);

        if (this.type === 'beam') {
            const a = ar * 0.78;
            const w = Math.max(1, Math.round(4 * ar));
            const c = this.kw.color;
            const sx = this.kw.start[0], sy = this.kw.start[1];
            const ex = this.kw.end[0], ey = this.kw.end[1];
            // Outer glow
            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
            ctx.strokeStyle = rgba(c, a * 0.5); ctx.lineWidth = w + 4; ctx.stroke();
            // Inner bright
            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
            ctx.strokeStyle = rgba([Math.min(255, c[0] + 80), Math.min(255, c[1] + 80), Math.min(255, c[2] + 80)], Math.min(1, a + 0.2));
            ctx.lineWidth = Math.max(1, w); ctx.stroke();

        } else if (this.type === 'arc') {
            const pts = this.kw.points;
            const c = this.kw.color;
            const a = ar * 0.86;
            for (let i = 0; i < pts.length - 1; i++) {
                const p1 = pts[i], p2 = pts[i + 1];
                const mx = (p1[0] + p2[0]) / 2 + (Math.random() - 0.5) * 16;
                const my = (p1[1] + p2[1]) / 2 + (Math.random() - 0.5) * 16;
                // Color line
                ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(mx, my);
                ctx.strokeStyle = rgba(c, a); ctx.lineWidth = 2; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p2[0], p2[1]);
                ctx.strokeStyle = rgba(c, a); ctx.lineWidth = 2; ctx.stroke();
                // White core
                ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(mx, my);
                ctx.strokeStyle = rgba(WHITE, a); ctx.lineWidth = 1; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p2[0], p2[1]);
                ctx.strokeStyle = rgba(WHITE, a); ctx.lineWidth = 1; ctx.stroke();
            }

        } else if (this.type === 'nova_ring') {
            const ctr = this.kw.center;
            const mr = this.kw.radius;
            const c = this.kw.color;
            const radius = Math.round(mr * t);
            const a = ar * 0.7;
            const w = Math.max(1, Math.round(3 * ar));
            if (radius > 0) {
                ctx.beginPath(); ctx.arc(ctr[0], ctr[1], radius, 0, Math.PI * 2);
                ctx.strokeStyle = rgba(c, a); ctx.lineWidth = w + 2; ctx.stroke();
                ctx.beginPath(); ctx.arc(ctr[0], ctr[1], radius, 0, Math.PI * 2);
                ctx.strokeStyle = rgba(WHITE, a * 0.5); ctx.lineWidth = Math.max(1, w); ctx.stroke();
            }

        } else if (this.type === 'cryo_field') {
            const ctr = this.kw.center;
            const r = this.kw.radius;
            const c = this.kw.color;
            const p = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
            const a = ar * 0.16 * p;
            ctx.beginPath(); ctx.arc(ctr[0], ctr[1], r, 0, Math.PI * 2);
            ctx.fillStyle = rgba(c, a); ctx.fill();
        }
    }
}

export class Tower {
    constructor(towerType, col, row, paidCost = null) {
        this.type = towerType;
        this.col = col;
        this.row = row;
        this.x = col * TILE_SIZE + TILE_SIZE / 2;
        this.y = row * TILE_SIZE + TILE_SIZE / 2;
        this.level = 0;
        this.branch = null;
        this.data = TOWER_DATA[towerType];
        this.color = this.data.color;
        this.investedGold = paidCost != null ? Math.round(paidCost) : this.data.cost;
        this.fireTimer = 0;
        this.target = null;
        this.angle = 0;
        this.totalDamage = 0;
        this.kills = 0;

        // Rail fixed direction
        this.fixedAngle = null;

        // HP system
        this.baseMaxHp = this.data.hp;
        this.hp = this.baseMaxHp;
        this.damageFlashTimer = 0;
        this.sparkTimer = 0;

        // Construction state machine
        this.constructionState = 'building';
        this.constructionTimer = 0;
        this.constructionDuration = BUILD_TIMES[towerType] || 8;
        this._pendingBranchKey = null;
        this._pendingPaidCost = 0;
        this._pendingFortifyMult = 1.0;
    }

    _computeBaseMaxHp() {
        const base = this.data.hp;
        if (this.branch) {
            return Math.round(base * (1.0 + TOWER_HP_PER_LEVEL * 2 + TOWER_HP_BRANCH_BONUS));
        }
        return Math.round(base * (1.0 + TOWER_HP_PER_LEVEL * this.level));
    }

    getMaxHp(fortifyMult = 1.0) {
        return Math.round(this.baseMaxHp * fortifyMult);
    }

    hpRatio(fortifyMult = 1.0) {
        const maxHp = this.getMaxHp(fortifyMult);
        return maxHp > 0 ? Math.max(0, this.hp / maxHp) : 0;
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.damageFlashTimer = 0.15;
        if (this.hp < 0) this.hp = 0;
    }

    repairCost(fortifyMult = 1.0) {
        const maxHp = this.getMaxHp(fortifyMult);
        if (this.hp >= maxHp) return 0;
        const damageRatio = 1.0 - (this.hp / maxHp);
        return Math.max(1, Math.round(damageRatio * this.investedGold * 0.4));
    }

    repair(fortifyMult = 1.0) {
        this.hp = this.getMaxHp(fortifyMult);
    }

    get stats() {
        if (this.branch) return this.data.branches[this.branch];
        return this.data.levels[this.level];
    }

    get damageStat() { return this.stats.damage; }
    effectiveDamage(mods) { return this.damageStat * (mods ? (mods.damage_mult || 1.0) : 1.0); }
    get fireRate() { return this.stats.fire_rate; }
    effectiveFireRate(mods) {
        const m = mods ? (mods.firerate_mult || 1.0) : 1.0;
        return Math.max(0.03, this.fireRate * m);
    }
    get range() { return this.stats.range; }
    effectiveRange(mods) {
        return Math.round(this.range * (mods ? (mods.range_mult || 1.0) : 1.0));
    }
    get name() {
        if (this.branch) return this.data.branches[this.branch].name;
        return this.data.name;
    }

    upgradeCost(costMult = 1.0) {
        if (this.branch || this.level >= 2) return null;
        return Math.round(this.data.levels[this.level + 1].upgrade_cost * costMult);
    }
    canUpgrade() { return this.level < 2 && this.branch === null; }
    canBranch() { return this.level >= 2 && this.branch === null; }
    branchCost(key, costMult = 1.0) {
        if (!this.canBranch()) return null;
        const b = this.data.branches[key];
        if (!b) return null;
        return Math.round(b.cost * costMult);
    }

    upgrade(paidCost = 0, fortifyMult = 1.0) {
        if (this.canUpgrade()) {
            const oldMax = this.getMaxHp(fortifyMult);
            this.level++;
            this.investedGold += Math.round(paidCost);
            this.baseMaxHp = this._computeBaseMaxHp();
            const newMax = this.getMaxHp(fortifyMult);
            this.hp += (newMax - oldMax);
        }
    }

    applyBranch(key, paidCost = 0, fortifyMult = 1.0) {
        if (this.canBranch() && this.data.branches[key]) {
            const oldMax = this.getMaxHp(fortifyMult);
            this.branch = key;
            this.investedGold += Math.round(paidCost);
            this.baseMaxHp = this._computeBaseMaxHp();
            const newMax = this.getMaxHp(fortifyMult);
            this.hp += (newMax - oldMax);
        }
    }

    sellValue() {
        return Math.round(this.investedGold * 0.6);
    }

    get isConstructing() { return this.constructionState !== null; }

    get constructionProgress() {
        if (!this.isConstructing || this.constructionDuration <= 0) return 1.0;
        return clamp(this.constructionTimer / this.constructionDuration, 0, 1);
    }

    startUpgrade(paidCost = 0, fortifyMult = 1.0) {
        this.constructionState = 'upgrading';
        const targetLevel = this.level + 1;
        this.constructionDuration = UPGRADE_TIME_BY_LEVEL[targetLevel] || 8;
        this.constructionTimer = 0;
        this._pendingPaidCost = paidCost;
        this._pendingFortifyMult = fortifyMult;
    }

    startBranch(key, paidCost = 0, fortifyMult = 1.0) {
        this.constructionState = 'branching';
        this.constructionDuration = BRANCH_TIME;
        this.constructionTimer = 0;
        this._pendingBranchKey = key;
        this._pendingPaidCost = paidCost;
        this._pendingFortifyMult = fortifyMult;
    }

    startRepair(fortifyMult = 1.0) {
        this.constructionState = 'repairing';
        const maxHp = this.getMaxHp(fortifyMult);
        const damageRatio = maxHp > 0 ? (1.0 - this.hp / maxHp) : 1.0;
        this.constructionDuration = REPAIR_TIME_BASE + (REPAIR_TIME_MAX - REPAIR_TIME_BASE) * damageRatio;
        this.constructionTimer = 0;
        this._pendingFortifyMult = fortifyMult;
    }

    _finishConstruction() {
        const state = this.constructionState;
        if (state === 'building') {
            // Tower now active
        } else if (state === 'upgrading') {
            this.upgrade(this._pendingPaidCost, this._pendingFortifyMult);
        } else if (state === 'branching') {
            this.applyBranch(this._pendingBranchKey, this._pendingPaidCost, this._pendingFortifyMult);
        } else if (state === 'repairing') {
            this.repair(this._pendingFortifyMult);
        }
        this.constructionState = null;
        this._pendingBranchKey = null;
        this._pendingPaidCost = 0;
    }

    updateConstruction(dt) {
        if (!this.isConstructing) return false;
        this.constructionTimer += dt;
        if (this.constructionTimer >= this.constructionDuration) {
            this._finishConstruction();
            return true;
        }
        return false;
    }

    findTarget(enemies, mods) {
        const rng = this.effectiveRange(mods);
        const inRange = enemies.filter(e =>
            e.alive && dist(this.x, this.y, e.x, e.y) <= rng
        );
        if (inRange.length === 0) {
            this.target = null;
            return null;
        }
        // Rail: fixed direction, just detect
        if (this.type === TowerType.RAIL && this.fixedAngle !== null) {
            this.target = inRange[0];
            this.angle = this.fixedAngle;
            return this.target;
        }
        // Pulse: prioritize sappers
        if (this.type === TowerType.PULSE) {
            const sappers = inRange.filter(e => e.type === EnemyType.SAPPER);
            if (sappers.length > 0) {
                const best = sappers.reduce((a, b) => a.totalDistance > b.totalDistance ? a : b);
                this.target = best;
                this.angle = Math.atan2(best.y - this.y, best.x - this.x) * 180 / Math.PI;
                return best;
            }
        }
        // Default: furthest along path
        const best = inRange.reduce((a, b) => a.totalDistance > b.totalDistance ? a : b);
        this.target = best;
        this.angle = Math.atan2(best.y - this.y, best.x - this.x) * 180 / Math.PI;
        return best;
    }

    update(dt, enemies, projectiles, effects, particles, mods) {
        this.damageFlashTimer = Math.max(0, this.damageFlashTimer - dt);

        // Sparks when low HP
        const fortifyMult = mods ? (mods.fortify_mult || 1.0) : 1.0;
        if (this.hpRatio(fortifyMult) < 0.25 && this.hp > 0) {
            this.sparkTimer -= dt;
            if (this.sparkTimer <= 0) {
                this.sparkTimer = 0.15 + Math.random() * 0.25;
                particles.emitTrail(
                    this.x + (Math.random() - 0.5) * 16,
                    this.y + (Math.random() - 0.5) * 16,
                    DAMAGE_RED, 2, 40, 0.3, 2
                );
            }
        }

        this.updateConstruction(dt);
        if (this.constructionState === 'building') return;

        this.fireTimer -= dt;
        this.findTarget(enemies, mods);
        if (this.target && this.fireTimer <= 0) {
            this.fireTimer = this.effectiveFireRate(mods);
            this._fire(enemies, projectiles, effects, particles, mods);
        }
    }

    _fire(enemies, projectiles, effects, particles, mods) {
        const stats = this.stats;

        if (this.type === TowerType.PULSE) {
            projectiles.push(new Projectile(
                this.x, this.y, this.target, this.effectiveDamage(mods),
                350, this.color, 3, this,
                stats.splash_radius || 0, stats.splash_damage || 0
            ));
        } else if (this.type === TowerType.RAIL) {
            let ndx, ndy;
            if (this.fixedAngle !== null) {
                const rad = this.fixedAngle * Math.PI / 180;
                ndx = Math.cos(rad); ndy = Math.sin(rad);
            } else {
                const dx = this.target.x - this.x;
                const dy = this.target.y - this.y;
                const d = Math.hypot(dx, dy);
                if (d < 1) return;
                ndx = dx / d; ndy = dy / d;
            }
            const beamEnd = [this.x + ndx * this.effectiveRange(mods), this.y + ndy * this.effectiveRange(mods)];
            const pierce = stats.pierce || 3;
            let hit = 0;
            const sorted = [...enemies].sort((a, b) =>
                dist(this.x, this.y, a.x, a.y) - dist(this.x, this.y, b.x, b.y)
            );
            for (const e of sorted) {
                if (!e.alive || hit >= pierce) break;
                const ex = e.x - this.x;
                const ey = e.y - this.y;
                const proj = ex * ndx + ey * ndy;
                if (proj < 0 || proj > this.effectiveRange(mods)) continue;
                if (Math.abs(ex * ndy - ey * ndx) < e.size + 8) {
                    e.takeDamage(this.effectiveDamage(mods));
                    this.totalDamage += this.effectiveDamage(mods);
                    if (!e.alive) this.kills++;
                    hit++;
                    particles.emitTrail(e.x, e.y, this.color, 3, 40, 0.2);
                }
            }
            effects.push(new VisualEffect('beam', 0.15, { start: [this.x, this.y], end: beamEnd, color: this.color }));

        } else if (this.type === TowerType.TESLA) {
            const chains = stats.chains || 3;
            const chainRange = stats.chain_range || 80;
            let dotD = stats.dot_damage || 0;
            const dotDur = stats.dot_duration || 0;
            dotD = dotD * (mods ? (mods.control_mult || 1.0) : 1.0);
            const hitE = [this.target];
            this.target.takeDamage(this.effectiveDamage(mods));
            this.totalDamage += this.effectiveDamage(mods);
            if (dotD > 0) this.target.applyDot(dotD, dotDur);
            if (!this.target.alive) this.kills++;
            const arcPts = [[this.x, this.y], [this.target.x, this.target.y]];
            let current = this.target;

            for (let c = 0; c < chains - 1; c++) {
                let bn = null, bd = chainRange + 1;
                for (const e of enemies) {
                    if (!e.alive || hitE.includes(e)) continue;
                    const dd = dist(current.x, current.y, e.x, e.y);
                    if (dd < bd) { bd = dd; bn = e; }
                }
                if (!bn) break;
                const cd = Math.round(this.effectiveDamage(mods) * 0.7);
                bn.takeDamage(cd);
                this.totalDamage += cd;
                if (dotD > 0) bn.applyDot(dotD, dotDur);
                if (!bn.alive) this.kills++;
                hitE.push(bn);
                arcPts.push([bn.x, bn.y]);
                current = bn;
            }
            effects.push(new VisualEffect('arc', 0.2, { points: arcPts, color: this.color }));

        } else if (this.type === TowerType.CRYO) {
            let sf = stats.slow_factor || 0.5;
            const sd = stats.slow_duration || 2.0;
            const ctl = mods ? (mods.control_mult || 1.0) : 1.0;
            const slowAmt = (1.0 - sf) * ctl;
            sf = clamp(1.0 - slowAmt, 0.10, 0.95);
            let vuln = stats.vulnerability || 1.0;
            if (vuln > 1.0) vuln = 1.0 + (vuln - 1.0) * ctl;

            for (const e of enemies) {
                if (!e.alive) continue;
                if (dist(this.x, this.y, e.x, e.y) <= this.effectiveRange(mods)) {
                    e.takeDamage(this.effectiveDamage(mods));
                    e.applySlow(sf, sd);
                    if (vuln > 1.0) e.applyVulnerability(vuln, sd);
                    this.totalDamage += this.effectiveDamage(mods);
                }
            }
            effects.push(new VisualEffect('cryo_field', 0.3, { center: [this.x, this.y], radius: this.range, color: this.color }));

        } else if (this.type === TowerType.NOVA) {
            for (const e of enemies) {
                if (!e.alive) continue;
                if (dist(this.x, this.y, e.x, e.y) <= this.effectiveRange(mods)) {
                    e.takeDamage(this.effectiveDamage(mods));
                    this.totalDamage += this.effectiveDamage(mods);
                    if (!e.alive) this.kills++;
                    particles.emitTrail(e.x, e.y, HOT_PINK, 3, 50, 0.3);
                }
            }
            effects.push(new VisualEffect('nova_ring', 0.4, { center: [this.x, this.y], radius: this.range, color: this.color }));
        }
    }

    draw(ctx, selected = false, showRange = false, fortifyMult = 1.0) {
        const ix = this.x, iy = this.y;
        const lvl = this.branch ? 3 : this.level;
        const baseSize = 12 + lvl * 3;
        let color = this.color;

        // Flicker when low HP
        const hpR = this.hpRatio(fortifyMult);
        let visible = true;
        if (hpR < 0.25 && this.hp > 0) {
            if (Math.floor(performance.now() / 80) % 3 === 0) visible = false;
        }
        if (this.damageFlashTimer > 0) color = DAMAGE_RED;

        // Range circle
        if (showRange || selected) {
            ctx.beginPath();
            ctx.arc(ix, iy, this.range, 0, Math.PI * 2);
            ctx.fillStyle = rgba(color, 0.1);
            ctx.fill();
            ctx.strokeStyle = rgba(color, 0.24);
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Rail firing lane
        if (this.type === TowerType.RAIL && this.fixedAngle !== null) {
            const rad = this.fixedAngle * Math.PI / 180;
            const laneLen = this.range;
            const ex = ix + Math.cos(rad) * laneLen;
            const ey = iy + Math.sin(rad) * laneLen;
            const alpha = (showRange || selected) ? 0.35 : 0.2;
            ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(ex, ey);
            ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = 2; ctx.stroke();
            if (showRange || selected) {
                const perpX = -Math.sin(rad) * 10;
                const perpY = Math.cos(rad) * 10;
                ctx.beginPath();
                ctx.moveTo(ix + perpX, iy + perpY); ctx.lineTo(ex + perpX, ey + perpY);
                ctx.strokeStyle = rgba(color, 0.14); ctx.lineWidth = 1; ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(ix - perpX, iy - perpY); ctx.lineTo(ex - perpX, ey - perpY);
                ctx.strokeStyle = rgba(color, 0.14); ctx.lineWidth = 1; ctx.stroke();
            }
        }

        // Selection highlight
        if (selected) {
            ctx.strokeStyle = rgb(GOLD_COLOR);
            ctx.lineWidth = 2;
            ctx.strokeRect(this.col * TILE_SIZE, this.row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }

        if (visible) {
            // Base circle
            ctx.beginPath(); ctx.arc(ix, iy, baseSize + 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgb(20,20,40)'; ctx.fill();
            ctx.beginPath(); ctx.arc(ix, iy, baseSize, 0, Math.PI * 2);
            ctx.strokeStyle = rgb(color); ctx.lineWidth = 2; ctx.stroke();
            if (this.branch) {
                ctx.beginPath(); ctx.arc(ix, iy, baseSize + 4, 0, Math.PI * 2);
                ctx.strokeStyle = rgb(GOLD_COLOR); ctx.lineWidth = 1; ctx.stroke();
            }

            // Type-specific detail
            const rad = this.angle * Math.PI / 180;
            const tx = ix + Math.cos(rad) * baseSize * 0.8;
            const ty = iy + Math.sin(rad) * baseSize * 0.8;

            if (this.type === TowerType.PULSE) {
                ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(tx, ty);
                ctx.strokeStyle = rgb(color); ctx.lineWidth = 3; ctx.stroke();
                ctx.beginPath(); ctx.arc(tx, ty, 2, 0, Math.PI * 2);
                ctx.fillStyle = rgb(WHITE); ctx.fill();
            } else if (this.type === TowerType.RAIL) {
                ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(tx, ty);
                ctx.strokeStyle = rgb(color); ctx.lineWidth = 4; ctx.stroke();
                const px = -Math.sin(rad) * 4, py = Math.cos(rad) * 4;
                ctx.beginPath(); ctx.moveTo(ix + px, iy + py); ctx.lineTo(tx + px, ty + py);
                ctx.strokeStyle = rgb(color); ctx.lineWidth = 2; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(ix - px, iy - py); ctx.lineTo(tx - px, ty - py);
                ctx.strokeStyle = rgb(color); ctx.lineWidth = 2; ctx.stroke();
            } else if (this.type === TowerType.TESLA) {
                for (let i = 0; i < 3 + lvl; i++) {
                    const a = rad + i * 0.7;
                    ctx.beginPath();
                    ctx.arc(ix + Math.cos(a) * baseSize * 0.5, iy + Math.sin(a) * baseSize * 0.5, 2 + lvl, 0, Math.PI * 2);
                    ctx.fillStyle = rgb(color); ctx.fill();
                }
                ctx.beginPath(); ctx.arc(ix, iy, 3 + lvl, 0, Math.PI * 2);
                ctx.fillStyle = rgb(WHITE); ctx.fill();
            } else if (this.type === TowerType.CRYO) {
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI / 180) * (60 * i + this.angle);
                    ctx.beginPath(); ctx.moveTo(ix, iy);
                    ctx.lineTo(ix + Math.cos(a) * baseSize * 0.7, iy + Math.sin(a) * baseSize * 0.7);
                    ctx.strokeStyle = rgb(color); ctx.lineWidth = 1 + lvl; ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(ix, iy, 2 + lvl, 0, Math.PI * 2);
                ctx.fillStyle = rgb(WHITE); ctx.fill();
            } else if (this.type === TowerType.NOVA) {
                const p = 0.5 + 0.5 * Math.sin(performance.now() * 0.005);
                const cr = Math.round(baseSize * 0.4 * (0.8 + 0.2 * p));
                ctx.beginPath(); ctx.arc(ix, iy, cr + 2, 0, Math.PI * 2);
                ctx.fillStyle = rgb(NEON_ORANGE); ctx.fill();
                ctx.beginPath(); ctx.arc(ix, iy, cr, 0, Math.PI * 2);
                ctx.fillStyle = rgb(HOT_PINK); ctx.fill();
                ctx.beginPath(); ctx.arc(ix, iy, Math.max(1, cr - 2), 0, Math.PI * 2);
                ctx.fillStyle = rgb(WHITE); ctx.fill();
            }

            // Level dots
            for (let i = 0; i < Math.min(lvl + 1, 3); i++) {
                ctx.beginPath();
                ctx.arc(ix - Math.min(lvl, 2) * 3 + i * 6, iy + baseSize + 5, 2, 0, Math.PI * 2);
                ctx.fillStyle = rgb(GOLD_COLOR); ctx.fill();
            }
            // Branch label
            if (this.branch) {
                drawText(ctx, this.branch, ix + baseSize + 2, iy - 6, GOLD_COLOR, 10);
            }
        }

        // HP bar when damaged
        const maxHp = this.getMaxHp(fortifyMult);
        if (this.hp < maxHp) {
            const barW = 28, barH = 3;
            const bx = ix - barW / 2, by = iy + (visible ? baseSize : 12) + 10;
            ctx.fillStyle = 'rgb(30,30,30)';
            ctx.fillRect(bx, by, barW, barH);
            const ratio = Math.max(0, this.hp / maxHp);
            const fc = ratio > 0.5 ? NEON_GREEN : ratio > 0.25 ? YELLOW : RED;
            ctx.fillStyle = rgb(fc);
            ctx.fillRect(bx, by, Math.round(barW * ratio), barH);
            ctx.strokeStyle = 'rgb(80,80,80)';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, barW, barH);
        }

        // Construction progress bar
        if (this.isConstructing) {
            const prog = this.constructionProgress;
            const barW = 32, barH = 5;
            const bx = ix - barW / 2;
            const by = iy - (visible ? baseSize : 12) - 14;
            const barColor = {
                building: BUILD_BAR_COLOR,
                upgrading: UPGRADE_BAR_COLOR,
                branching: BRANCH_BAR_COLOR,
                repairing: REPAIR_BAR_COLOR,
            }[this.constructionState] || CYAN;

            ctx.fillStyle = 'rgb(15,15,25)';
            ctx.fillRect(bx - 1, by - 1, barW + 2, barH + 2);
            ctx.fillStyle = 'rgb(30,30,40)';
            ctx.fillRect(bx, by, barW, barH);
            const fillW = Math.round(barW * prog);
            if (fillW > 0) {
                ctx.fillStyle = rgb(barColor);
                ctx.fillRect(bx, by, fillW, barH);
            }
            ctx.strokeStyle = rgb(barColor);
            ctx.lineWidth = 1;
            ctx.strokeRect(bx - 1, by - 1, barW + 2, barH + 2);

            // Pulsing ring during building
            if (this.constructionState === 'building') {
                const pulse = 0.4 + 0.4 * Math.sin(performance.now() * 0.006);
                ctx.beginPath(); ctx.arc(ix, iy, baseSize + 6, 0, Math.PI * 2);
                ctx.strokeStyle = rgba(barColor, 0.16 * pulse); ctx.lineWidth = 2; ctx.stroke();
            }
            // Label
            const labels = { building: 'BUILD', upgrading: 'UPG', branching: 'SPEC', repairing: 'FIX' };
            const label = labels[this.constructionState] || '...';
            const timeLeft = Math.max(0, this.constructionDuration - this.constructionTimer);
            drawText(ctx, `${label} ${Math.round(timeLeft)}s`, bx, by - 12, barColor, 9);
        }
    }
}
