// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — towers.js
//  Tower class with targeting, firing, upgrades, branches, build timers
// ═══════════════════════════════════════════════════════════════

import { TowerType, TOWER_DATA, TOWER_HP_PER_LEVEL, TOWER_HP_BRANCH_BONUS,
         BUILD_TIMES, UPGRADE_TIME_BY_LEVEL, BRANCH_TIME, REPAIR_TIME_BASE, REPAIR_TIME_MAX,
         SHIELD_HP_MULT, SHIELD_COST_MULT, SHIELD_BUILD_TIME, SHIELD_COLOR,
         OVERCHARGE_DURATION, OVERCHARGE_DAMAGE_MULT, OVERCHARGE_COST_BASE, OVERCHARGE_COLOR,
         TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, EnemyType,
         BUILD_BAR_COLOR, UPGRADE_BAR_COLOR, BRANCH_BAR_COLOR, REPAIR_BAR_COLOR,
         CYAN, MAGENTA, WHITE, GOLD_COLOR, NEON_GREEN, YELLOW, RED, NEON_ORANGE,
         HOT_PINK, DAMAGE_RED, SCREEN_WIDTH, SCREEN_HEIGHT,
         POWER_AMBER, UNPOWERED_GRAY, POWER_CIRCLE_ALPHA } from './config.js';
import { dist, rgba, rgb, clamp, drawText, drawGlowCircle } from './utils.js';
import { Projectile } from './projectiles.js';

// Tower ID counter for stable power assignment
let _nextTowerId = 1;
export function resetTowerIds() { _nextTowerId = 1; }

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

        } else if (this.type === 'shield_break') {
            const ctr = this.kw.center;
            const r = this.kw.radius;
            const sc = SHIELD_COLOR;

            // Quick white flash on the tower (fades fast)
            if (t < 0.25) {
                const flashA = (1.0 - t / 0.25) * 0.45;
                ctx.beginPath();
                ctx.arc(ctr[0], ctr[1], r * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = rgba([220, 240, 255], flashA);
                ctx.fill();
            }

            // Expanding shatter ring
            const expandR = r + r * 1.8 * t;
            ctx.beginPath();
            ctx.arc(ctr[0], ctr[1], expandR, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(sc, ar * 0.85);
            ctx.lineWidth = Math.max(1, 4 * ar);
            ctx.stroke();

            // Second thinner ring (slightly delayed)
            if (t > 0.1) {
                const t2 = t - 0.1;
                const expandR2 = r + r * 1.4 * t2;
                ctx.beginPath();
                ctx.arc(ctr[0], ctr[1], expandR2, 0, Math.PI * 2);
                ctx.strokeStyle = rgba([200, 230, 255], ar * 0.4);
                ctx.lineWidth = Math.max(1, 2 * ar);
                ctx.stroke();
            }

            // Fragment lines radiating outward
            const numFrags = 10;
            for (let i = 0; i < numFrags; i++) {
                const angle = (Math.PI * 2 * i) / numFrags + 0.37;
                const innerDist = r * 0.6 + r * 1.0 * t;
                const outerDist = r * 1.0 + r * 2.4 * t;
                const sx = ctr[0] + Math.cos(angle) * innerDist;
                const sy = ctr[1] + Math.sin(angle) * innerDist;
                const ex = ctr[0] + Math.cos(angle) * outerDist;
                const ey = ctr[1] + Math.sin(angle) * outerDist;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = rgba(sc, ar * 0.55);
                ctx.lineWidth = Math.max(1, 2.5 * ar);
                ctx.stroke();
            }
        }
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
        // Apply sapper damage reduction from research
        if (isSapper && this._sapperReduction > 0) {
            damage *= (1.0 - this._sapperReduction);
        }
        // Shield absorbs damage first
        if (this.shieldActive && this.shieldHp > 0) {
            if (damage < this.shieldHp) {
                this.shieldHp -= damage;
                this.damageFlashTimer = 0.08; // shorter flash for shield hits
                return;
            }
            // Shield breaks, remainder goes to HP
            damage -= this.shieldHp;
            this.shieldHp = 0;
            this.shieldActive = false;
        }
        this.hp -= damage;
        this.damageFlashTimer = 0.15;
        if (this.hp < 0) this.hp = 0;
    }

    // ─── Shield System (consumable — buy, recharge, buy again) ─────
    canBuyShield() {
        // Available after branching; can buy fresh or recharge partial shield
        if (this.branch === null || this.isConstructing) return false;
        // Can buy if no shield, or shield is damaged
        if (!this.shieldActive) return true;
        return this.shieldHp < this.shieldMaxHp;
    }

    /** Full shield cost (used as base for fresh deploy) */
    _fullShieldCost(costMult = 1.0) {
        return Math.round(this.investedGold * SHIELD_COST_MULT * costMult);
    }

    /** Actual shield cost — prorated if recharging a partial shield */
    shieldCost(costMult = 1.0) {
        const fullCost = this._fullShieldCost(costMult);
        if (this.shieldActive && this.shieldMaxHp > 0) {
            // Prorated: pay only for the missing portion
            const missingRatio = 1.0 - (this.shieldHp / this.shieldMaxHp);
            return Math.max(1, Math.round(fullCost * missingRatio));
        }
        return fullCost;
    }

    /** Whether this is a recharge (partial) vs fresh deploy */
    get isShieldRecharge() {
        return this.shieldActive && this.shieldHp > 0 && this.shieldHp < this.shieldMaxHp;
    }

    shieldMaxHpCalc(fortifyMult = 1.0) {
        return Math.round(this.getMaxHp(fortifyMult) * SHIELD_HP_MULT);
    }

    startShield(paidCost = 0, fortifyMult = 1.0) {
        this.constructionState = 'shielding';
        // Recharge is faster proportional to how much shield remains
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
        this.shieldHp = maxShield; // Always restores to full (cost was prorated)
        this.shieldActive = true;
    }

    // ─── Overcharge System (temporary buff, available after branching) ─────
    canOvercharge() {
        return this.branch !== null && !this.overchargeActive && !this.isConstructing && !this._isPowerPlant;
    }

    /** Power Plant radius based on current level/branch */
    get powerRadius() {
        if (!this._isPowerPlant) return 0;
        const s = this.stats;
        return s.powerRadius || 0;
    }

    /** Power Plant capacity based on current level/branch */
    get powerCapacity() {
        if (!this._isPowerPlant) return 0;
        const s = this.stats;
        return s.powerCapacity || 0;
    }

    /** How much power capacity this tower consumes */
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

        // Overcharge countdown
        this.updateOvercharge(dt);

        // Sync research-driven modifiers
        this._sapperReduction = mods ? (mods.sapper_reduction || 0) : 0;
        this._activeConstruction = mods ? (mods.active_construction || 0) : 0;

        // Tower auto-regeneration from research
        if (mods && mods.tower_regen > 0 && this.hp > 0 && !this.isConstructing) {
            const fortifyMult = mods ? (mods.fortify_mult || 1.0) : 1.0;
            const maxHp = this.getMaxHp(fortifyMult);
            if (this.hp < maxHp) {
                this.hp = Math.min(maxHp, this.hp + maxHp * mods.tower_regen * dt);
            }
        }

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

        // Construction speed bonus from research
        const buildSpeedDt = mods && mods.build_speed > 0 ? dt * (1.0 + mods.build_speed) : dt;
        this.updateConstruction(buildSpeedDt);

        // ── Power Plant towers never fire ──
        if (this._isPowerPlant) return;

        // ── Unpowered towers: no targeting, no firing, no effects ──
        if (!this.isPowered) return;

        // Active Construction: towers can fire at reduced effectiveness while building/upgrading
        const activeConst = mods ? (mods.active_construction || this._activeConstruction || 0) : (this._activeConstruction || 0);
        if (this.constructionState === 'building' || this.constructionState === 'upgrading' || this.constructionState === 'branching') {
            if (activeConst > 0 && this.constructionState !== 'building' || 
                (activeConst > 0 && this.constructionState === 'building' && this.constructionProgress > 0.3)) {
                // Fire at reduced rate
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

    /** Fire with reduced damage for Active Construction */
    _fireReduced(enemies, projectiles, effects, particles, mods, mult) {
        // Create a modified mods with reduced damage
        const reducedMods = mods ? { ...mods, damage_mult: (mods.damage_mult || 1.0) * mult } : { damage_mult: mult };
        this._fire(enemies, projectiles, effects, particles, reducedMods);
    }

    /** Compute damage dealt to a specific enemy, factoring research bonuses */
    _hitDamage(baseDmg, enemy, mods) {
        let dmg = baseDmg;
        if (!mods || !enemy) return dmg;

        // Critical Systems: 10% chance for double damage
        if (mods.critical_chance > 0 && Math.random() < mods.critical_chance) {
            dmg *= 2.0;
        }
        // Controlled Damage: +25% vs enemies under any control effect
        if (mods.controlled_damage_bonus > 0 &&
            (enemy.slowTimer > 0 || enemy.vulnTimer > 0 || enemy.dotTimer > 0)) {
            dmg *= (1.0 + mods.controlled_damage_bonus);
        }
        // Overwatch: +20% damage to enemies beyond 75% of tower range
        if (mods.overwatch_bonus > 0) {
            const effectiveRng = this.effectiveRange(mods);
            if (dist(this.x, this.y, enemy.x, enemy.y) > effectiveRng * 0.75) {
                dmg *= (1.0 + mods.overwatch_bonus);
            }
        }
        // Proximity bonus (close range)
        if (mods.proximity_bonus > 0) {
            const halfRange = this.effectiveRange(mods) * 0.5;
            if (dist(this.x, this.y, enemy.x, enemy.y) <= halfRange) {
                dmg *= (1.0 + mods.proximity_bonus);
            }
        }
        // Execute bonus (low HP)
        if (mods.execute_threshold > 0 && mods.execute_bonus > 0) {
            if (enemy.health / enemy.maxHealth < mods.execute_threshold) {
                dmg *= (1.0 + mods.execute_bonus);
            }
        }
        return dmg;
    }

    _fire(enemies, projectiles, effects, particles, mods) {
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
                }
            }
            effects.push(new VisualEffect('beam', 0.15, { start: [this.x, this.y], end: beamEnd, color: this.color }));

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
                hitE.push(bn);
                arcPts.push([bn.x, bn.y]);
                current = bn;
            }
            effects.push(new VisualEffect('arc', 0.2, { points: arcPts, color: this.color }));

        } else if (this.type === TowerType.CRYO) {
            let sf = stats.slow_factor || 0.5;
            let sd = stats.slow_duration || 2.0;
            const ctl = mods ? (mods.control_mult || 1.0) : 1.0;
            const slowAmt = (1.0 - sf) * ctl;
            sf = clamp(1.0 - slowAmt, 0.10, 0.95);
            let vuln = stats.vulnerability || 1.0;
            if (vuln > 1.0) vuln = 1.0 + (vuln - 1.0) * ctl;
            // Deep Freeze: slow duration bonus
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
            effects.push(new VisualEffect('cryo_field', 0.3, { center: [this.x, this.y], radius: this.range, color: this.color }));

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
            effects.push(new VisualEffect('nova_ring', 0.4, { center: [this.x, this.y], radius: this.range, color: this.color }));
        }
    }

    draw(ctx, selected = false, showRange = false, fortifyMult = 1.0) {
        const ix = this.x, iy = this.y;
        const lvl = this.branch ? 3 : this.level;
        const baseSize = 12 + lvl * 3;
        let color = this.color;

        // ── Power Plant: range circle (only when selected, like other towers) ──
        if (this._isPowerPlant && selected) {
            const pRadius = this.powerRadius;
            if (pRadius > 0) {
                const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.003);
                const alpha = POWER_CIRCLE_ALPHA * (0.7 + 0.3 * pulse);
                ctx.beginPath();
                ctx.arc(ix, iy, pRadius, 0, Math.PI * 2);
                ctx.fillStyle = rgba(POWER_AMBER, alpha * 0.4);
                ctx.fill();
                ctx.strokeStyle = rgba(POWER_AMBER, alpha + 0.1);
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }

        // ── Unpowered overlay: grey out non-plant towers ──
        const unpowered = !this._isPowerPlant && !this.isPowered;
        if (unpowered) {
            color = UNPOWERED_GRAY;
        }

        // Flicker when low HP
        const hpR = this.hpRatio(fortifyMult);
        let visible = true;
        if (hpR < 0.25 && this.hp > 0) {
            if (Math.floor(performance.now() / 80) % 3 === 0) visible = false;
        }
        if (this.damageFlashTimer > 0) color = DAMAGE_RED;

        // Range circle
        if ((showRange || selected) && !this._isPowerPlant) {
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
            } else if (this.type === TowerType.POWER_PLANT) {
                // Glowing amber core with radiating power lines
                const rotSpeed = performance.now() * 0.001;
                const pp = 0.5 + 0.5 * Math.sin(performance.now() * 0.004);
                const coreR = baseSize * 0.35;
                // Radiating lines (6 spokes, rotating)
                for (let i = 0; i < 6; i++) {
                    const a = rotSpeed + (Math.PI * 2 * i) / 6;
                    const innerR = coreR + 2;
                    const outerR = baseSize * 0.85;
                    ctx.beginPath();
                    ctx.moveTo(ix + Math.cos(a) * innerR, iy + Math.sin(a) * innerR);
                    ctx.lineTo(ix + Math.cos(a) * outerR, iy + Math.sin(a) * outerR);
                    ctx.strokeStyle = rgba(color, 0.5 + 0.3 * pp);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                // Outer glow
                ctx.beginPath(); ctx.arc(ix, iy, coreR + 4, 0, Math.PI * 2);
                ctx.fillStyle = rgba(color, 0.15 + 0.1 * pp); ctx.fill();
                // Core circle
                ctx.beginPath(); ctx.arc(ix, iy, coreR, 0, Math.PI * 2);
                ctx.fillStyle = rgb(color); ctx.fill();
                // White center
                ctx.beginPath(); ctx.arc(ix, iy, Math.max(1, coreR - 3), 0, Math.PI * 2);
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

        // ── Unpowered indicator: small red X near tower ──
        if (unpowered && visible) {
            const ux = ix + baseSize + 3, uy = iy - baseSize - 1;
            ctx.lineWidth = 2;
            ctx.strokeStyle = rgba(RED, 0.8);
            ctx.beginPath(); ctx.moveTo(ux - 4, uy - 4); ctx.lineTo(ux + 4, uy + 4); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(ux + 4, uy - 4); ctx.lineTo(ux - 4, uy + 4); ctx.stroke();
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

        // Shield: bright outer glow + HP bar
        if (this.shieldActive && this.shieldHp > 0) {
            const shieldPulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.005);
            const sRatio = Math.max(0, this.shieldHp / this.shieldMaxHp);
            const glowR = baseSize + (this.branch ? 10 : 7);

            // ── Prominent outer glow (always visible, scales with shield HP) ──
            // Outermost soft bloom
            ctx.beginPath();
            ctx.arc(ix, iy, glowR + 10, 0, Math.PI * 2);
            ctx.fillStyle = rgba(SHIELD_COLOR, (0.04 + 0.04 * shieldPulse) * sRatio);
            ctx.fill();

            // Wide glow ring
            ctx.beginPath();
            ctx.arc(ix, iy, glowR + 8, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(SHIELD_COLOR, (0.18 + 0.14 * shieldPulse) * sRatio);
            ctx.lineWidth = 5;
            ctx.stroke();

            // Mid glow ring
            ctx.beginPath();
            ctx.arc(ix, iy, glowR + 4, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(SHIELD_COLOR, (0.30 + 0.22 * shieldPulse) * sRatio);
            ctx.lineWidth = 3;
            ctx.stroke();

            // Bright inner glow ring (tight to tower)
            ctx.beginPath();
            ctx.arc(ix, iy, glowR, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(SHIELD_COLOR, (0.50 + 0.35 * shieldPulse) * sRatio);
            ctx.lineWidth = 2;
            ctx.stroke();

            // ── Shield HP bar (below the HP bar or below tower) ──
            const shieldBarW = 28, shieldBarH = 2;
            const hpBarOffset = this.hp < maxHp ? 15 : 10;
            const sby = iy + (visible ? baseSize : 12) + hpBarOffset;
            const sbx = ix - shieldBarW / 2;
            ctx.fillStyle = 'rgb(20,30,50)';
            ctx.fillRect(sbx, sby, shieldBarW, shieldBarH);
            ctx.fillStyle = rgba(SHIELD_COLOR, 0.9);
            ctx.fillRect(sbx, sby, Math.round(shieldBarW * sRatio), shieldBarH);
            ctx.strokeStyle = rgba(SHIELD_COLOR, 0.4);
            ctx.lineWidth = 1;
            ctx.strokeRect(sbx, sby, shieldBarW, shieldBarH);
        }

        // Overcharge: warm golden glow when active
        if (this.overchargeActive) {
            const ocPulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.008);
            const ocR = baseSize + (this.branch ? 10 : 7);
            const timeRatio = Math.min(1, this.overchargeTimer / OVERCHARGE_DURATION);

            // Warm outer bloom
            ctx.beginPath();
            ctx.arc(ix, iy, ocR + 6, 0, Math.PI * 2);
            ctx.fillStyle = rgba(OVERCHARGE_COLOR, (0.06 + 0.05 * ocPulse) * timeRatio);
            ctx.fill();

            // Bright inner ring
            ctx.beginPath();
            ctx.arc(ix, iy, ocR + 2, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(OVERCHARGE_COLOR, (0.45 + 0.30 * ocPulse) * timeRatio);
            ctx.lineWidth = 2;
            ctx.stroke();

            // Timer arc (shows remaining time as a sweep)
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + Math.PI * 2 * timeRatio;
            ctx.beginPath();
            ctx.arc(ix, iy, ocR + 4, startAngle, endAngle);
            ctx.strokeStyle = rgba(OVERCHARGE_COLOR, 0.7 * timeRatio);
            ctx.lineWidth = 1.5;
            ctx.stroke();
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
                shielding: SHIELD_COLOR,
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
            const labels = { building: 'BUILD', upgrading: 'UPG', branching: 'SPEC', repairing: 'FIX', shielding: 'SHLD' };
            const label = labels[this.constructionState] || '...';
            const timeLeft = Math.max(0, this.constructionDuration - this.constructionTimer);
            drawText(ctx, `${label} ${Math.round(timeLeft)}s`, bx, by - 12, barColor, 9);
        }
    }
}
