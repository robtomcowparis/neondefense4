// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — towers.js
//  Tower class with targeting, firing, upgrades, branches, build timers (no rendering)
// ═══════════════════════════════════════════════════════════════

import { TowerType, TOWER_DATA, TOWER_HP_PER_LEVEL, TOWER_HP_BRANCH_BONUS,
         BUILD_TIMES, UPGRADE_TIME_BY_LEVEL, BRANCH_TIME, REPAIR_TIME_BASE, REPAIR_TIME_MAX,
         SHIELD_HP_MULT, SHIELD_COST_MULT, SHIELD_BUILD_TIME,
         OVERCHARGE_DURATION, OVERCHARGE_DAMAGE_MULT, OVERCHARGE_COST_BASE,
         TILE_SIZE, EnemyType,
         HOT_PINK, DAMAGE_RED } from './config.js';
import { dist, clamp } from './utils.js';
import { Projectile } from './projectiles.js';

// Tower ID counter for stable power assignment
let _nextTowerId = 1;
export function resetTowerIds() { _nextTowerId = 1; }

// Visual effect data class (no draw — rendering handled by effectRenderer.js)
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
}

export class Tower {
    constructor(towerType, col, row, paidCost = null) {
        this.id = _nextTowerId++;
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

        // Power Plant system
        this._isPowerPlant = towerType === TowerType.POWER_PLANT;
        this.isPowered = this._isPowerPlant; // plants are always "powered"
        this.poweredByPlantId = null;

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

        // Shield system (consumable)
        this.shieldHp = 0;
        this.shieldMaxHp = 0;
        this.shieldActive = false;

        // Overcharge system (temporary damage buff, available after branching)
        this.overchargeTimer = 0;
        this.overchargeActive = false;

        // Research-driven modifiers (updated by game loop)
        this._sapperReduction = 0;
        this._activeConstruction = 0;

        // Firing animation tracking
        this.lastFireTime = 0;
        this.lastFireAngle = 0;
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

    takeDamage(damage, isSapper = false) {
        if (isSapper && this._sapperReduction > 0) {
            damage *= (1.0 - this._sapperReduction);
        }
        if (this.shieldActive && this.shieldHp > 0) {
            if (damage < this.shieldHp) {
                this.shieldHp -= damage;
                this.damageFlashTimer = 0.08;
                return;
            }
            damage -= this.shieldHp;
            this.shieldHp = 0;
            this.shieldActive = false;
        }
        this.hp -= damage;
        this.damageFlashTimer = 0.15;
        if (this.hp < 0) this.hp = 0;
    }

    // ─── Shield System ──────────────────────────────────────────
    canBuyShield() {
        if (this.branch === null || this.isConstructing) return false;
        if (!this.shieldActive) return true;
        return this.shieldHp < this.shieldMaxHp;
    }

    _fullShieldCost(costMult = 1.0) {
        return Math.round(this.investedGold * SHIELD_COST_MULT * costMult);
    }

    shieldCost(costMult = 1.0) {
        const fullCost = this._fullShieldCost(costMult);
        if (this.shieldActive && this.shieldMaxHp > 0) {
            const missingRatio = 1.0 - (this.shieldHp / this.shieldMaxHp);
            return Math.max(1, Math.round(fullCost * missingRatio));
        }
        return fullCost;
    }

    get isShieldRecharge() {
        return this.shieldActive && this.shieldHp > 0 && this.shieldHp < this.shieldMaxHp;
    }

    shieldMaxHpCalc(fortifyMult = 1.0) {
        return Math.round(this.getMaxHp(fortifyMult) * SHIELD_HP_MULT);
    }

    startShield(paidCost = 0, fortifyMult = 1.0) {
        this.constructionState = 'shielding';
        if (this.shieldActive && this.shieldMaxHp > 0) {
            const missingRatio = 1.0 - (this.shieldHp / this.shieldMaxHp);
            this.constructionDuration = Math.max(1.5, SHIELD_BUILD_TIME * missingRatio);
        } else {
            this.constructionDuration = SHIELD_BUILD_TIME;
        }
        this.constructionTimer = 0;
        this._pendingPaidCost = paidCost;
        this._pendingFortifyMult = fortifyMult;
    }

    _applyShield(fortifyMult = 1.0) {
        const maxShield = this.shieldMaxHpCalc(fortifyMult);
        this.shieldMaxHp = maxShield;
        this.shieldHp = maxShield;
        this.shieldActive = true;
    }

    // ─── Overcharge System ──────────────────────────────────────
    canOvercharge() {
        return this.branch !== null && !this.overchargeActive && !this.isConstructing && !this._isPowerPlant;
    }

    get powerRadius() {
        if (!this._isPowerPlant) return 0;
        const s = this.stats;
        return s.powerRadius || 0;
    }

    get powerCapacity() {
        if (!this._isPowerPlant) return 0;
        const s = this.stats;
        return s.powerCapacity || 0;
    }

    get powerCost() {
        return this.data.powerCost || 0;
    }

    overchargeCost(costMult = 1.0) {
        return Math.round(this.investedGold * OVERCHARGE_COST_BASE * costMult);
    }

    startOvercharge() {
        this.overchargeTimer = OVERCHARGE_DURATION;
        this.overchargeActive = true;
    }

    updateOvercharge(dt) {
        if (!this.overchargeActive) return;
        this.overchargeTimer -= dt;
        if (this.overchargeTimer <= 0) {
            this.overchargeTimer = 0;
            this.overchargeActive = false;
        }
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
    effectiveDamage(mods, target = null) {
        let dmg = this.damageStat * (mods ? (mods.damage_mult || 1.0) : 1.0);
        if (this.overchargeActive) dmg *= (1.0 + OVERCHARGE_DAMAGE_MULT);
        return dmg;
    }
    get fireRate() { return this.stats.fire_rate; }
    effectiveFireRate(mods) {
        const m = mods ? (mods.firerate_mult || 1.0) : 1.0;
        return Math.max(0.03, this.fireRate * m);
    }
    get range() { return this.stats.range; }
    effectiveRange(mods) {
        let r = this.range * (mods ? (mods.range_mult || 1.0) : 1.0);
        if (mods) {
            if (mods.aoe_bonus && (this.type === TowerType.CRYO || this.type === TowerType.NOVA || this.type === TowerType.TESLA)) {
                r *= (1.0 + mods.aoe_bonus);
            }
        }
        return Math.round(r);
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

    sellValue(sellRefund = 0.60) {
        return Math.round(this.investedGold * sellRefund);
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
        } else if (state === 'shielding') {
            this._applyShield(this._pendingFortifyMult);
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
        if (this.type === TowerType.RAIL && this.fixedAngle !== null) {
            this.target = inRange[0];
            this.angle = this.fixedAngle;
            return this.target;
        }
        if (this.type === TowerType.PULSE) {
            const sappers = inRange.filter(e => e.type === EnemyType.SAPPER);
            if (sappers.length > 0) {
                const best = sappers.reduce((a, b) => a.totalDistance > b.totalDistance ? a : b);
                this.target = best;
                this.angle = Math.atan2(best.y - this.y, best.x - this.x) * 180 / Math.PI;
                return best;
            }
        }
        const best = inRange.reduce((a, b) => a.totalDistance > b.totalDistance ? a : b);
        this.target = best;
        this.angle = Math.atan2(best.y - this.y, best.x - this.x) * 180 / Math.PI;
        return best;
    }

    update(dt, enemies, projectiles, effects, particles, mods) {
        this.damageFlashTimer = Math.max(0, this.damageFlashTimer - dt);
        this.updateOvercharge(dt);

        this._sapperReduction = mods ? (mods.sapper_reduction || 0) : 0;
        this._activeConstruction = mods ? (mods.active_construction || 0) : 0;

        if (mods && mods.tower_regen > 0 && this.hp > 0 && !this.isConstructing) {
            const fortifyMult = mods ? (mods.fortify_mult || 1.0) : 1.0;
            const maxHp = this.getMaxHp(fortifyMult);
            if (this.hp < maxHp) {
                this.hp = Math.min(maxHp, this.hp + maxHp * mods.tower_regen * dt);
            }
        }

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

        const buildSpeedDt = mods && mods.build_speed > 0 ? dt * (1.0 + mods.build_speed) : dt;
        this.updateConstruction(buildSpeedDt);

        if (this._isPowerPlant) return;
        if (!this.isPowered) return;

        const activeConst = mods ? (mods.active_construction || this._activeConstruction || 0) : (this._activeConstruction || 0);
        if (this.constructionState === 'building' || this.constructionState === 'upgrading' || this.constructionState === 'branching') {
            if (activeConst > 0 && this.constructionState !== 'building' ||
                (activeConst > 0 && this.constructionState === 'building' && this.constructionProgress > 0.3)) {
                this.fireTimer -= dt * activeConst;
                this.findTarget(enemies, mods);
                if (this.target && this.fireTimer <= 0) {
                    this.fireTimer = this.effectiveFireRate(mods);
                    this._fireReduced(enemies, projectiles, effects, particles, mods, activeConst);
                }
            }
            return;
        }

        this.fireTimer -= dt;
        this.findTarget(enemies, mods);
        if (this.target && this.fireTimer <= 0) {
            this.fireTimer = this.effectiveFireRate(mods);
            this._fire(enemies, projectiles, effects, particles, mods);
        }
    }

    _fireReduced(enemies, projectiles, effects, particles, mods, mult) {
        const reducedMods = mods ? { ...mods, damage_mult: (mods.damage_mult || 1.0) * mult } : { damage_mult: mult };
        this._fire(enemies, projectiles, effects, particles, reducedMods);
    }

    _hitDamage(baseDmg, enemy, mods) {
        let dmg = baseDmg;
        if (!mods || !enemy) return dmg;
        if (mods.critical_chance > 0 && Math.random() < mods.critical_chance) {
            dmg *= 2.0;
        }
        if (mods.controlled_damage_bonus > 0 &&
            (enemy.slowTimer > 0 || enemy.vulnTimer > 0 || enemy.dotTimer > 0)) {
            dmg *= (1.0 + mods.controlled_damage_bonus);
        }
        if (mods.overwatch_bonus > 0) {
            const effectiveRng = this.effectiveRange(mods);
            if (dist(this.x, this.y, enemy.x, enemy.y) > effectiveRng * 0.75) {
                dmg *= (1.0 + mods.overwatch_bonus);
            }
        }
        if (mods.proximity_bonus > 0) {
            const halfRange = this.effectiveRange(mods) * 0.5;
            if (dist(this.x, this.y, enemy.x, enemy.y) <= halfRange) {
                dmg *= (1.0 + mods.proximity_bonus);
            }
        }
        if (mods.execute_threshold > 0 && mods.execute_bonus > 0) {
            if (enemy.health / enemy.maxHealth < mods.execute_threshold) {
                dmg *= (1.0 + mods.execute_bonus);
            }
        }
        return dmg;
    }

    _fire(enemies, projectiles, effects, particles, mods) {
        this.lastFireTime = performance.now();
        this.lastFireAngle = this.angle;
        const stats = this.stats;

        if (this.type === TowerType.PULSE) {
            const baseDmg = this._hitDamage(this.effectiveDamage(mods), this.target, mods);
            projectiles.push(new Projectile(
                this.x, this.y, this.target, baseDmg,
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
                    const dmg = this._hitDamage(this.effectiveDamage(mods), e, mods);
                    e.takeDamage(dmg, mods);
                    this.totalDamage += dmg;
                    if (!e.alive) this.kills++;
                    hit++;
                    particles.emitTrail(e.x, e.y, this.color, 3, 40, 0.2);
                    particles.emitRailImpact(e.x, e.y, this.color, this.level, this.branch, Math.atan2(ndy, ndx));
                }
            }
            let beamWidth = 1.2;
            if (this.branch === 'B') beamWidth = 4.5;
            else if (this.branch === 'A') beamWidth = 2.8;
            else if (this.level === 2) beamWidth = 2.2;
            else if (this.level === 1) beamWidth = 1.7;
            effects.push(new VisualEffect('beam', 0.15, { start: [this.x, this.y], end: beamEnd, color: this.color, width: beamWidth, branch: this.branch }));

        } else if (this.type === TowerType.TESLA) {
            const chains = stats.chains || 3;
            const chainRange = Math.round((stats.chain_range || 80) * (1.0 + (mods && mods.aoe_bonus ? mods.aoe_bonus : 0)));
            let dotD = stats.dot_damage || 0;
            const dotDur = stats.dot_duration || 0;
            dotD = dotD * (mods ? (mods.control_mult || 1.0) : 1.0);
            if (mods && mods.dot_damage_bonus > 0) dotD *= (1.0 + mods.dot_damage_bonus);
            const hitE = [this.target];
            const dmg0 = this._hitDamage(this.effectiveDamage(mods), this.target, mods);
            this.target.takeDamage(dmg0, mods);
            this.totalDamage += dmg0;
            if (dotD > 0) this.target.applyDot(dotD, dotDur, mods);
            if (!this.target.alive) this.kills++;
            particles.emitTeslaHitSpark(this.target.x, this.target.y, this.color);
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
                const cd = Math.round(this._hitDamage(this.effectiveDamage(mods), bn, mods) * 0.7);
                bn.takeDamage(cd, mods);
                this.totalDamage += cd;
                if (dotD > 0) bn.applyDot(dotD, dotDur, mods);
                if (!bn.alive) this.kills++;
                particles.emitTeslaHitSpark(bn.x, bn.y, this.color);
                hitE.push(bn);
                arcPts.push([bn.x, bn.y]);
                current = bn;
            }
            effects.push(new VisualEffect('arc', 0.2, { points: arcPts, color: this.color, branch: this.branch }));

        } else if (this.type === TowerType.CRYO) {
            let sf = stats.slow_factor || 0.5;
            let sd = stats.slow_duration || 2.0;
            const ctl = mods ? (mods.control_mult || 1.0) : 1.0;
            const slowAmt = (1.0 - sf) * ctl;
            sf = clamp(1.0 - slowAmt, 0.10, 0.95);
            let vuln = stats.vulnerability || 1.0;
            if (vuln > 1.0) vuln = 1.0 + (vuln - 1.0) * ctl;
            if (mods && mods.slow_duration_mult > 0) sd *= (1.0 + mods.slow_duration_mult);

            for (const e of enemies) {
                if (!e.alive) continue;
                if (dist(this.x, this.y, e.x, e.y) <= this.effectiveRange(mods)) {
                    const dmg = this._hitDamage(this.effectiveDamage(mods), e, mods);
                    e.takeDamage(dmg, mods);
                    e.applySlow(sf, sd);
                    if (vuln > 1.0) e.applyVulnerability(vuln, sd);
                    this.totalDamage += dmg;
                }
            }
            effects.push(new VisualEffect('cryo_field', 0.3, { center: [this.x, this.y], radius: this.range, color: this.color, branch: this.branch }));

        } else if (this.type === TowerType.NOVA) {
            for (const e of enemies) {
                if (!e.alive) continue;
                if (dist(this.x, this.y, e.x, e.y) <= this.effectiveRange(mods)) {
                    const dmg = this._hitDamage(this.effectiveDamage(mods), e, mods);
                    e.takeDamage(dmg, mods);
                    this.totalDamage += dmg;
                    if (!e.alive) this.kills++;
                    particles.emitTrail(e.x, e.y, HOT_PINK, 3, 50, 0.3);
                }
            }
            effects.push(new VisualEffect('nova_ring', 0.4, { center: [this.x, this.y], radius: this.range, color: this.color, branch: this.branch }));
            particles.emitNovaImpact(this.x, this.y, this.color, this.level, this.branch);
        }
    }
}
