# Pulse Tower - Complete System Reference

Extracted from **Neon Defense 4** for porting the full Pulse tower + upgrade system into another game.
This covers everything: data model, config, upgrade progression, combat logic, 3D meshes for every level, projectile visuals, animations, sound, and HUD.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tower Data Model](#2-tower-data-model)
3. [Config / Stats](#3-config--stats)
4. [Placement](#4-placement)
5. [Upgrade System](#5-upgrade-system)
6. [Combat: Targeting, Firing, Damage](#6-combat-targeting-firing-damage)
7. [Projectile Class](#7-projectile-class)
8. [3D Meshes (All Levels)](#8-3d-meshes-all-levels)
9. [Mesh Lifecycle & Rebuild](#9-mesh-lifecycle--rebuild)
10. [Animations: Turret Aim, Disc Spin, Muzzle Flash, Recoil](#10-animations)
11. [Projectile Visuals (All Levels)](#11-projectile-visuals-all-levels)
12. [Sound](#12-sound)
13. [HUD / UI](#13-hud--ui)
14. [Shared Helpers](#14-shared-helpers)
15. [Implementation Checklist](#15-implementation-checklist)

---

## 1. Architecture Overview

The Pulse tower system is split across these layers:

| Layer | File | Responsibility |
|-------|------|----------------|
| Config | `config.js` | Static stats per level/branch, costs, timings, color |
| Data Model | `towers.js` | `Tower` class — state, upgrades, targeting, firing |
| Projectile | `projectiles.js` | `Projectile` class — homing movement, hit detection, splash |
| 3D Meshes | `renderer/towerMeshes.js` | Build/rebuild tower models, animate turret/disc/flash |
| 3D Projectiles | `renderer/projectileRenderer.js` | Level-specific projectile shapes and trail effects |
| Materials | `renderer/scene.js` | Material factories shared by all towers |
| Sound | `sound.js` | WebAudio procedural sound on fire |
| HUD | `hud.js` | Upgrade/branch buttons, stat display |
| Game Loop | `main.js` | Orchestrates placement, update tick, sound triggers, mesh rebuilds |

**Key design principle:** The `Tower` object knows nothing about rendering. It stores `level`, `branch`, `angle`, `fireTimer`, `target`, etc. The renderer reads these each frame to update visuals. When upgrading, the game loop calls `rebuildTowerMesh(tower)` to destroy and recreate the 3D model.

---

## 2. Tower Data Model

A Tower instance holds all the state. Here are the Pulse-relevant fields:

```js
// towers.js — constructor (simplified to Pulse-relevant fields)
class Tower {
    constructor(towerType, col, row, paidCost) {
        this.id = _nextTowerId++;
        this.type = towerType;               // 'PULSE'
        this.col = col;
        this.row = row;
        this.x = col * TILE_SIZE + TILE_SIZE / 2;  // pixel center
        this.y = row * TILE_SIZE + TILE_SIZE / 2;
        this.level = 0;                      // 0, 1, 2
        this.branch = null;                  // null, 'A', or 'B'
        this.data = TOWER_DATA[towerType];   // pointer to config entry
        this.color = this.data.color;        // [0, 255, 255] for Pulse

        this.fireTimer = 0;                  // counts down to 0, then fires
        this.target = null;                  // current Enemy reference
        this.angle = 0;                      // degrees, for turret aiming

        this.hp = this.data.hp;              // 200 base for Pulse
        this.baseMaxHp = this.data.hp;
        this.investedGold = paidCost;
        this.totalDamage = 0;
        this.kills = 0;

        // Construction system
        this.constructionState = 'building'; // 'building'|'upgrading'|'branching'|null
        this.constructionTimer = 0;
        this.constructionDuration = BUILD_TIMES[towerType]; // 5s for Pulse

        this.lastFireTime = 0;               // performance.now() — used by renderer for flash/recoil

        // ... also: isPowered, shieldHp, overchargeActive, etc.
    }

    get stats() {
        if (this.branch) return this.data.branches[this.branch];
        return this.data.levels[this.level];
    }
}
```

The `stats` getter is the key pattern: it always returns the correct stat block for the tower's current state.

---

## 3. Config / Stats

```js
// config.js lines 74-88
const TOWER_DATA = {
    PULSE: {
        name: "Pulse",
        description: "Rapid-fire energy bolts",
        color: [0, 255, 255],  // Cyan
        cost: 100,
        powerCost: 1,
        hp: 200,
        levels: [
            // Level 0 (base)
            { damage: 12, fire_rate: 0.35, range: 120, upgrade_cost: 0 },
            // Level 1
            { damage: 20, fire_rate: 0.28, range: 135, upgrade_cost: 75 },
            // Level 2
            { damage: 32, fire_rate: 0.20, range: 155, upgrade_cost: 150 },
        ],
        branches: {
            A: { name: "Overclock", desc: "Insane fire rate",
                 cost: 450, damage: 28, fire_rate: 0.09, range: 160 },
            B: { name: "Heavy Bolts", desc: "Splash on hit",
                 cost: 500, damage: 55, fire_rate: 0.25, range: 165,
                 splash_radius: 50, splash_damage: 25 },
        },
    },
};
```

### Timing Constants

```js
BUILD_TIMES = { PULSE: 5 };           // seconds to build from scratch
UPGRADE_TIME_BY_LEVEL = { 1: 5, 2: 8 }; // seconds to upgrade to level 1 or 2
BRANCH_TIME = 12;                      // seconds to apply a branch
```

### HP Scaling

```js
TOWER_HP_PER_LEVEL = 0.15;    // +15% max HP per level
TOWER_HP_BRANCH_BONUS = 0.50; // +50% max HP for branched towers

// Computed as:
_computeBaseMaxHp() {
    const base = this.data.hp;  // 200
    if (this.branch) {
        return Math.round(base * (1.0 + 0.15 * 2 + 0.50));  // 200 * 1.80 = 360
    }
    return Math.round(base * (1.0 + 0.15 * this.level));
    // L0: 200, L1: 230, L2: 260, Branch: 360
}
```

### Upgrade Cost Summary

| State | Cost | Build Time |
|-------|------|------------|
| Place (L0) | 100g | 5s |
| Upgrade to L1 | 75g | 5s |
| Upgrade to L2 | 150g | 8s |
| Branch A "Overclock" | 450g | 12s |
| Branch B "Heavy Bolts" | 500g | 12s |

---

## 4. Placement

When the player clicks to place a tower:

```js
// main.js:827-836 (simplified)
const t = new Tower('PULSE', col, row, cost);
game.towers.push(t);
createTowerMesh(t);                    // creates 3D model (in 'building' state)
game.gameMap.placeTower(col, row);     // marks tile as occupied
game.gold -= cost;
```

The tower starts in `constructionState = 'building'` and can't fire until construction finishes (5 seconds). Rendering shows a wireframe/progress bar during construction.

---

## 5. Upgrade System

The upgrade flow is: **L0 -> L1 -> L2 -> Branch A or B**

### Level Upgrades (L0 -> L1 -> L2)

```js
// Check
canUpgrade() { return this.level < 2 && this.branch === null; }

// Start (puts tower into construction state)
startUpgrade(paidCost, fortifyMult) {
    this.constructionState = 'upgrading';
    this.constructionDuration = UPGRADE_TIME_BY_LEVEL[this.level + 1]; // 5s or 8s
    this.constructionTimer = 0;
    this._pendingPaidCost = paidCost;
}

// Applied when construction finishes:
upgrade(paidCost, fortifyMult) {
    this.level++;
    this.investedGold += Math.round(paidCost);
    this.baseMaxHp = this._computeBaseMaxHp();
    // HP increases by the difference (heals the upgrade amount)
}
```

### Branch Selection (L2 -> A or B)

```js
// Check
canBranch() { return this.level >= 2 && this.branch === null; }

// Start
startBranch(key, paidCost, fortifyMult) {
    this.constructionState = 'branching';
    this.constructionDuration = BRANCH_TIME;  // 12s
    this._pendingBranchKey = key;             // 'A' or 'B'
}

// Applied when construction finishes:
applyBranch(key, paidCost, fortifyMult) {
    this.branch = key;  // 'A' or 'B'
    this.investedGold += Math.round(paidCost);
    this.baseMaxHp = this._computeBaseMaxHp();
}
```

### Construction Timer (shared by all construction types)

```js
updateConstruction(dt) {
    if (!this.isConstructing) return false;
    this.constructionTimer += dt;
    if (this.constructionTimer >= this.constructionDuration) {
        this._finishConstruction();  // calls upgrade() or applyBranch() as needed
        return true;
    }
    return false;
}

_finishConstruction() {
    if (state === 'upgrading')  this.upgrade(pendingCost, pendingFortify);
    if (state === 'branching')  this.applyBranch(pendingKey, pendingCost, pendingFortify);
    this.constructionState = null;
}
```

**After construction finishes**, the game loop calls `rebuildTowerMesh(tower)` to replace the old 3D model with the new level's model.

---

## 6. Combat: Targeting, Firing, Damage

### Targeting

The Pulse tower **prioritizes Sapper enemies** (they attack towers), then falls back to the enemy furthest along the path:

```js
findTarget(enemies, mods) {
    const rng = this.effectiveRange(mods);
    const inRange = enemies.filter(e => e.alive && dist(this, e) <= rng);

    if (inRange.length === 0) { this.target = null; return null; }

    // PULSE-SPECIFIC: prioritize Sappers
    if (this.type === 'PULSE') {
        const sappers = inRange.filter(e => e.type === 'SAPPER');
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
```

### Update Loop

```js
update(dt, enemies, projectiles, effects, particles, mods) {
    this.updateConstruction(dt);

    if (!this.isPowered) return;            // needs power plant
    if (this.isConstructing) return;        // can't fire while building (unless active_construction mod)

    this.fireTimer -= dt;
    this.findTarget(enemies, mods);
    if (this.target && this.fireTimer <= 0) {
        this.fireTimer = this.effectiveFireRate(mods);  // reset cooldown
        this._fire(enemies, projectiles, effects, particles, mods);
    }
}
```

### Firing (Pulse-specific)

```js
_fire(enemies, projectiles, effects, particles, mods) {
    const stats = this.stats;
    this.lastFireTime = performance.now();  // used by renderer for flash timing

    // PULSE: create a homing projectile
    const baseDmg = this._hitDamage(this.effectiveDamage(mods), this.target, mods);
    projectiles.push(new Projectile(
        this.x, this.y,         // origin (2D game coordinates)
        this.target,            // homing target
        baseDmg,                // damage
        350,                    // speed (pixels/sec)
        this.color,             // [0,255,255]
        3,                      // size
        this,                   // sourceTower (for kill tracking)
        stats.splash_radius || 0,   // Branch B: 50, else 0
        stats.splash_damage || 0    // Branch B: 25, else 0
    ));
    soundMgr.play('shoot_pulse');
}
```

### Effective Stats (with global modifiers)

The game has a research/mod system that can buff towers globally. These are the calculations:

```js
effectiveDamage(mods) {
    let dmg = this.stats.damage * (mods.damage_mult || 1.0);
    if (this.overchargeActive) dmg *= 1.5;  // OVERCHARGE_DAMAGE_MULT = 0.5
    return dmg;
}

effectiveFireRate(mods) {
    return Math.max(0.03, this.stats.fire_rate * (mods.firerate_mult || 1.0));
}

effectiveRange(mods) {
    return Math.round(this.stats.range * (mods.range_mult || 1.0));
}
```

### Damage Modifiers (_hitDamage)

Applied per-hit, after base damage is calculated:

```js
_hitDamage(baseDmg, enemy, mods) {
    let dmg = baseDmg;
    // Critical hits (research upgrade): 2x damage
    if (mods.critical_chance > 0 && Math.random() < mods.critical_chance) dmg *= 2.0;
    // Controlled damage bonus: +X% vs slowed/dotted/vulnerable enemies
    if (mods.controlled_damage_bonus > 0 && (enemy.slowTimer > 0 || enemy.vulnTimer > 0 || enemy.dotTimer > 0))
        dmg *= (1.0 + mods.controlled_damage_bonus);
    // Overwatch: +X% beyond 75% range
    if (mods.overwatch_bonus > 0 && dist(this, enemy) > this.effectiveRange(mods) * 0.75)
        dmg *= (1.0 + mods.overwatch_bonus);
    // Proximity: +X% within 50% range
    if (mods.proximity_bonus > 0 && dist(this, enemy) <= this.effectiveRange(mods) * 0.5)
        dmg *= (1.0 + mods.proximity_bonus);
    // Execute: +X% when enemy below Y% health
    if (mods.execute_threshold > 0 && enemy.health / enemy.maxHealth < mods.execute_threshold)
        dmg *= (1.0 + mods.execute_bonus);
    return dmg;
}
```

**If you're porting without the research system**, you can skip _hitDamage entirely and just use `effectiveDamage` directly.

---

## 7. Projectile Class

```js
// projectiles.js
class Projectile {
    constructor(x, y, target, damage, speed, color, size, sourceTower,
                splashRadius, splashDamage) {
        this.x = x; this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = speed;          // 350 for Pulse
        this.color = color;
        this.size = size;
        this.alive = true;
        this.trail = [];             // array of [x,y] for trail rendering
        this.sourceTower = sourceTower;
        this.splashRadius = splashRadius;  // 0 for normal, 50 for Branch B
        this.splashDamage = splashDamage;  // 0 for normal, 25 for Branch B
    }

    update(dt, allEnemies) {
        if (!this.alive) return;

        // Target died mid-flight — splash if able, then die
        if (!this.target || !this.target.alive) {
            if (this.splashRadius > 0) this._doSplash(allEnemies);
            this.alive = false;
            return;
        }

        // Move toward target
        this.trail.push([this.x, this.y]);
        if (this.trail.length > 6) this.trail.shift();

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const d = Math.hypot(dx, dy);

        if (d < this.speed * dt + 5) {
            // HIT
            this.target.takeDamage(this.damage);
            if (this.sourceTower) {
                this.sourceTower.totalDamage += this.damage;
                if (!this.target.alive) this.sourceTower.kills += 1;
            }
            if (this.splashRadius > 0) this._doSplash(allEnemies);
            this.alive = false;
            return;
        }

        this.x += (dx / d) * this.speed * dt;
        this.y += (dy / d) * this.speed * dt;
    }

    // Branch B splash: damages all enemies within splashRadius of impact
    _doSplash(allEnemies) {
        for (const e of allEnemies) {
            if (e === this.target || !e.alive) continue;
            if (dist(this.targetX, this.targetY, e.x, e.y) <= this.splashRadius) {
                e.takeDamage(this.splashDamage);
                if (this.sourceTower) this.sourceTower.totalDamage += this.splashDamage;
            }
        }
    }
}
```

---

## 8. 3D Meshes (All Levels)

All meshes are built as `THREE.Group` with children. Y is up. The tower sits at ground level (y=0).
Color `c` is a `THREE.Color` derived from the config color `[0,255,255]`.

### Heights per Level

```js
{ 0: 20, 1: 28, 2: 36, A: 50, B: 48 }
```

### Shared userData Pattern

Every Pulse mesh builder sets these on the group for the animation system:

```js
group.userData.disc = disc;              // spinning disc mesh (null for L0)
group.userData.turretPivot = turretPivot; // Group that rotates Y to aim
group.userData.barrel = barrel;          // barrel mesh (for recoil animation)
group.userData.barrelY = <number>;       // Y position of turret pivot
group.userData.barrelDist = <number>;    // rest X position of barrel
group.userData.muzzleFlash = muzzleFlash; // sphere mesh toggled on fire
```

### L0 — ~20 units tall (short squat, stubby barrel)

```js
function _buildPulseL0(group, c) {
    // Squat base cylinder
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 16, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 8;
    group.add(base);

    // Top cap
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 3, 12),
        makeStructuralMaterial(c)
    );
    cap.position.y = 17.5;
    group.add(cap);

    // Turret pivot at top
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 18;

    // Single stubby barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 10, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(9, 0, 0);
    turretPivot.add(barrel);
    group.add(turretPivot);

    // Muzzle flash (hidden)
    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 6), flashMat);
    muzzleFlash.position.set(14, 0, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 18;
    group.userData.barrelDist = 9;
    group.userData.muzzleFlash = muzzleFlash;
}
```

### L1 — ~28 units tall (taller base, collar ring, longer barrel)

```js
function _buildPulseL1(group, c) {
    // Taller base
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 13, 22, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 11;
    group.add(base);

    // Collar ring at mid-section
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(12, 1.5, 6, 18),
        makeStructuralMaterial(c)
    );
    collar.position.y = 16;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Top cap
    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 11, 3, 12),
        makeStructuralMaterial(c)
    );
    cap.position.y = 24;
    group.add(cap);

    // Turret pivot
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 25;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 0, 0);
    turretPivot.add(barrel);
    group.add(turretPivot);

    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 6), flashMat);
    muzzleFlash.position.set(18, 0, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 25;
    group.userData.barrelDist = 11;
    group.userData.muzzleFlash = muzzleFlash;
}
```

### L2 — ~36 units tall (glowing collar, rotating disc, barrel + tip)

```js
function _buildPulseL2(group, c) {
    // Full height base
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 14, 25, 14),
        makeStructuralMaterial(c)
    );
    base.position.y = 12.5;
    group.add(base);

    // Glowing collar (accent material)
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(13, 2, 6, 20),
        makeAccentMaterial(_brighter(c))
    );
    collar.position.y = 18;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Disc platform (spins)
    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 3, 16),
        makeStructuralMaterial(c)
    );
    disc.position.y = 27;
    group.add(disc);

    // Turret pivot + barrel + muzzle tip
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 28;

    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 14, 6),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(11, 0, 0);
    turretPivot.add(barrel);

    const tip = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 1.5, 3, 6),
        makeAccentMaterial(_brighter(c))
    );
    tip.rotation.z = Math.PI / 2;
    tip.position.set(19, 0, 0);
    turretPivot.add(tip);

    group.add(turretPivot);

    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMat);
    muzzleFlash.position.set(21, 0, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = disc;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 28;
    group.userData.barrelDist = 11;
    group.userData.muzzleFlash = muzzleFlash;
}
```

### Branch A "Overclock" — ~50 units tall (sleek spire, speed fins, gatling cluster)

```js
function _buildPulseBranchA(group, c) {
    // Slim tapered base column
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 11, 35, 12),
        makeStructuralMaterial(c)
    );
    base.position.y = 17.5;
    group.add(base);

    // 4 speed fins arranged radially
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const fin = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 18, 6),
            makeStructuralMaterial(c)
        );
        fin.position.set(Math.cos(angle) * 9, 22, Math.sin(angle) * 9);
        fin.rotation.y = -angle;
        group.add(fin);
    }

    // Glowing ring at column-to-disc transition
    const glowRing = new THREE.Mesh(
        new THREE.TorusGeometry(9, 1.2, 6, 18),
        makeAccentMaterial(_brighter(c))
    );
    glowRing.position.y = 32;
    glowRing.rotation.x = Math.PI / 2;
    group.add(glowRing);

    // Lower smaller disc
    const discSmall = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 2, 14),
        makeStructuralMaterial(c)
    );
    discSmall.position.y = 34;
    group.add(discSmall);

    // Main large spinning disc
    const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(11, 11, 3, 16),
        makeStructuralMaterial(c)
    );
    disc.position.y = 38;
    group.add(disc);

    // Gatling cluster: 3 thin barrels in aiming pivot
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 38;

    const barrelOffsets = [-1.8, 1.8, 0];
    let trackedBarrel = null;
    for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 16, 6),
            makeAccentMaterial(_brighter(c))
        );
        b.rotation.z = Math.PI / 2;
        b.position.set(12, barrelOffsets[i], 0);
        turretPivot.add(b);
        if (i === 2) trackedBarrel = b;
    }

    // Muzzle ring at barrel tips
    const muzzleRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.5, 0.5, 4, 10),
        makeAccentMaterial(_brighter(c))
    );
    muzzleRing.position.set(20, 0, 0);
    muzzleRing.rotation.y = Math.PI / 2;
    turretPivot.add(muzzleRing);

    group.add(turretPivot);

    // Muzzle flash (hidden)
    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 6), flashMat);
    muzzleFlash.position.set(22, 0, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = disc;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = trackedBarrel;
    group.userData.barrelY = 38;
    group.userData.barrelDist = 12;
    group.userData.muzzleFlash = muzzleFlash;
}
```

### Branch B "Heavy Bolts" — ~48 units tall (chunky military, massive barrel, splash ring)

```js
function _buildPulseBranchB(group, c) {
    // Wide reinforced base
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(13, 14, 28, 14),
        makeStructuralMaterial(c)
    );
    base.position.y = 14;
    group.add(base);

    // 4 reinforcement plates
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const plate = new THREE.Mesh(
            new THREE.BoxGeometry(4, 22, 2),
            makeStructuralMaterial(c)
        );
        plate.position.set(Math.cos(angle) * 12, 13, Math.sin(angle) * 12);
        plate.rotation.y = -angle;
        group.add(plate);
    }

    // Heavy collar ring
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(14, 2.5, 6, 18),
        makeStructuralMaterial(c)
    );
    collar.position.y = 26;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Upper turret assembly (turretPivot rotates to aim)
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 28;

    // Turret housing
    const turretBody = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 12, 8, 12),
        makeStructuralMaterial(c)
    );
    turretBody.position.y = 4;
    turretPivot.add(turretBody);

    // Shoulder plates
    for (let i = 0; i < 2; i++) {
        const side = i === 0 ? -1 : 1;
        const shoulder = new THREE.Mesh(
            new THREE.BoxGeometry(3, 6, 10),
            makeStructuralMaterial(c)
        );
        shoulder.position.set(side * 10, 5, 0);
        turretPivot.add(shoulder);
    }

    // Massive barrel
    const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(3.5, 4, 22, 8),
        makeStructuralMaterial(c)
    );
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(16, 6, 0);
    turretPivot.add(barrel);

    // Flared muzzle cone
    const muzzle = new THREE.Mesh(
        new THREE.ConeGeometry(6, 6, 8),
        makeAccentMaterial(_brighter(c))
    );
    muzzle.rotation.z = -Math.PI / 2;
    muzzle.position.set(28, 6, 0);
    turretPivot.add(muzzle);

    // Splash ring (semi-transparent)
    const splashRing = new THREE.Mesh(
        new THREE.TorusGeometry(5, 0.8, 6, 14),
        new THREE.MeshBasicMaterial({
            color: _brighter(c), transparent: true, opacity: 0.7
        })
    );
    splashRing.position.set(24, 6, 0);
    splashRing.rotation.y = Math.PI / 2;
    turretPivot.add(splashRing);

    group.add(turretPivot);

    // Muzzle flash
    var flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1) });
    var muzzleFlash = new THREE.Mesh(new THREE.SphereGeometry(3.5, 8, 6), flashMat);
    muzzleFlash.position.set(30, 6, 0);
    muzzleFlash.visible = false;
    turretPivot.add(muzzleFlash);

    group.userData.disc = null;
    group.userData.turretPivot = turretPivot;
    group.userData.barrel = barrel;
    group.userData.barrelY = 34;
    group.userData.barrelDist = 16;
    group.userData.muzzleFlash = muzzleFlash;
}
```

---

## 9. Mesh Lifecycle & Rebuild

```js
// towerMeshes.js — Public API

// Create: called on placement, adds group to THREE scene
export function createTowerMesh(tower) {
    const group = new THREE.Group();
    const model = _createTowerModel(tower);   // dispatches to correct builder
    group.add(model);
    group.userData.model = model;
    group.position.set(tower.x, 0, tower.y);  // x/z in 3D = x/y in 2D game
    scene.add(group);
    towerMeshMap.set(tower, group);            // WeakMap: tower -> mesh group
}

// Rebuild: called after upgrade/branch finishes
export function rebuildTowerMesh(tower) {
    removeTowerMesh(tower);   // removes from scene + WeakMap
    createTowerMesh(tower);   // creates new model for current level/branch
}

// Dispatcher: picks the right builder based on tower state
function _createTowerModel(tower) {
    const group = new THREE.Group();
    const c = toColor(tower.color);

    if (tower.type === 'PULSE') {
        if (tower.branch === 'A')     _buildPulseBranchA(group, c);
        else if (tower.branch === 'B') _buildPulseBranchB(group, c);
        else if (tower.level >= 2)    _buildPulseL2(group, c);
        else if (tower.level >= 1)    _buildPulseL1(group, c);
        else                          _buildPulseL0(group, c);
    }
    return group;
}
```

**In the game loop** (main.js), after a tower finishes construction:
```js
if (constBefore !== null && t.constructionState === null) {
    if (constBefore === 'upgrading' || constBefore === 'branching') {
        rebuildTowerMesh(t);
    }
}
```

---

## 10. Animations

All animations happen in the per-frame mesh update function. The renderer reads `tower.angle`, `tower.lastFireTime`, etc.

### Turret Aiming

The `turretPivot` group rotates on Y to point at the current target:

```js
if (model.userData.turretPivot) {
    const rad = (tower.angle || 0) * Math.PI / 180;
    model.userData.turretPivot.rotation.y = -rad;
}
```

`tower.angle` is in degrees, set by `findTarget()` via `Math.atan2(dy, dx) * 180 / Math.PI`.

### Disc Spin

Decorative spin applied to L2, Branch A, and Branch B (if they have a disc):

```js
if (model.userData.disc && dt) {
    model.userData.disc.rotation.y += dt * 1.5;  // 1.5 rad/s constant spin
}
```

### Muzzle Flash

Triggered by comparing current time to `tower.lastFireTime`:

```js
var fireAge = performance.now() - tower.lastFireTime;

if (tower.type === 'PULSE') {
    var mf = model.userData.muzzleFlash;
    if (fireAge < 250) {
        if (mf) {
            mf.visible = fireAge < 120;              // visible for 120ms
            var flashScale = 4 * Math.max(0, 1 - fireAge / 120);
            mf.scale.setScalar(flashScale);           // shrinks from 4x to 0
        }
    } else {
        if (mf) mf.visible = false;
    }
}
```

### Barrel Recoil

```js
if (fireAge < 250) {
    var barrel = model.userData.barrel;
    if (barrel) {
        // Branch A: faster, lighter recoil (rapid fire)
        var maxRecoil = (tower.branch === 'A') ? 2 : 3.5;
        var decayMs   = (tower.branch === 'A') ? 100 : 200;
        var recoil = maxRecoil * Math.exp(-fireAge * 4 / decayMs);
        var baseDist = group.userData.barrelDist || 9;
        barrel.position.x = baseDist - recoil;     // pulls barrel back
    }
} else {
    // Reset to rest position
    barrel.position.x = group.userData.barrelDist;
}
```

---

## 11. Projectile Visuals (All Levels)

Each Pulse level/branch gets a distinct projectile shape. All fly in a straight line (`isStraight = true`) at barrel height.

| Level | Shape | Trail Count | Notes |
|-------|-------|-------------|-------|
| L0 | Small sphere (scale 1.5) | 4 | Basic round bolt |
| L1 | Elongated sphere (1.5, 1.5, 3.8) | 5 | Oriented along travel direction |
| L2 | Sphere + spinning torus ring | 6 | Ring rotates via `ring.rotation.z = now * 0.005` |
| Branch A | Cylinder (scale 1, 6, 1) rotated to travel | 3 | Thin fast needle shape |
| Branch B | Large sphere (scale 3) + 2 orbiting spheres | 8 | Orbiters circle at radius 4, `now * 0.006` |

```js
// Branch A projectile
var mesh = new THREE.Mesh(cylinderGeo, mat);
mesh.scale.set(1, 6, 1);
mesh.rotation.x = Math.PI / 2;  // point along travel

// Branch B projectile — orbiter animation per frame:
var oAngle = now * 0.006;
orbiters[0].position.x = Math.cos(oAngle) * 4;
orbiters[0].position.z = Math.sin(oAngle) * 4;
orbiters[1].position.x = Math.cos(oAngle + Math.PI) * 4;
orbiters[1].position.z = Math.sin(oAngle + Math.PI) * 4;
```

Trail spheres are small semi-transparent spheres placed at previous positions, fading with age.

### Fire Point (projectile origin in 3D)

```js
// towerMeshes.js — getFirePoint
// For Pulse: returns the world position of the muzzle flash mesh
if (tower.type === 'PULSE') {
    if (model.userData.muzzleFlash) {
        model.userData.muzzleFlash.getWorldPosition(wp);
        return { x: wp.x, y: wp.y, z: wp.z };
    }
}
```

---

## 12. Sound

Pulse fires a procedural **880 Hz sine tone for 60ms**:

```js
// sound.js
play(name) {
    switch (name) {
        case 'shoot_pulse': this._tone(880, 0.06, 0.6); break;
        // 880 Hz frequency, 0.06s duration, 0.6 volume
    }
}
```

Sound is triggered in the game loop when `fireTimer` resets (indicating a shot was fired):

```js
// main.js:1074-1082
if (t.fireTimer > firedBefore) {  // fireTimer jumped up = just fired
    soundMgr.play('shoot_pulse');
}
```

---

## 13. HUD / UI

### Upgrade Button (levels 0-1)

When a Pulse tower is selected and can upgrade:

```js
if (t.canUpgrade()) {
    const cost = t.upgradeCost(costMult);
    // Shows: "UPGRADE (75g)" or "UPGRADE (150g)"
    actionsHtml += `<button class="tp-btn tp-btn-upgrade" data-action="upgrade">
        UPGRADE (${cost}g)
    </button>`;
}
```

### Branch Selection (at level 2)

```js
if (t.canBranch()) {
    for (const key of ['A', 'B']) {
        const bd = t.data.branches[key];
        const cost = t.branchCost(key, costMult);
        actionsHtml += `
            <button class="tp-btn tp-btn-branch" data-action="branch" data-key="${key}">
                <span class="br-key">[${key}]</span> ${bd.name}
                <span class="br-desc">${bd.desc}</span>
                <span class="br-cost">${cost}g</span>
            </button>
        `;
    }
}
// Displays:
//   [A] Overclock — Insane fire rate — 450g
//   [B] Heavy Bolts — Splash on hit — 500g
```

### Stats Display

```js
const dmg = Math.round(t.effectiveDamage(mods));
const rng = t.effectiveRange(mods);
statsHtml = `Dmg: ${dmg}  Rate: ${t.fireRate.toFixed(2)}s  Rng: ${rng}`;
trackerHtml = `Dmg dealt: ${t.totalDamage}  Kills: ${t.kills}`;
// Branch B also shows: "Splash: 50px"
```

### Construction Progress

During building/upgrading/branching, a progress bar is shown:

```js
const prog = t.constructionProgress;  // 0.0 to 1.0
const timeLeft = t.constructionDuration - t.constructionTimer;
// Shows: "UPGRADING... 3.2s — 60%"
```

---

## 14. Shared Helpers

### Material Factories (from `renderer/scene.js`)

```js
function toColor(rgb) {
    return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
}

// Dark metallic (responds to lights)
function makeStructuralMaterial(color) {
    const c = (color instanceof THREE.Color) ? color : toColor(color);
    return new THREE.MeshStandardMaterial({
        color: c.clone().multiplyScalar(0.25),
        metalness: 0.7,
        roughness: 0.35,
        emissive: c.clone().multiplyScalar(0.05),
        emissiveIntensity: 1.0,
    });
}

// Bright flat-color (unlit)
function makeAccentMaterial(color) {
    const c = (color instanceof THREE.Color) ? color : toColor(color);
    return new THREE.MeshBasicMaterial({ color: c.clone() });
}
```

### Color Helpers

```js
function _darker(c)  { return c.clone().multiplyScalar(0.6); }

function _brighter(c) {
    return new THREE.Color(
        Math.min(1, c.r + 0.3),
        Math.min(1, c.g + 0.3),
        Math.min(1, c.b + 0.3)
    );
}
```

---

## 15. Implementation Checklist

When porting the Pulse tower to a new game, implement in this order:

### Phase 1: Data & Config
- [ ] Define tower type constant and config entry (stats, costs, color)
- [ ] Define timing constants (build time, upgrade times, branch time)
- [ ] Define HP scaling constants

### Phase 2: Tower Class
- [ ] Tower constructor with: type, col, row, level, branch, hp, fireTimer, target, angle
- [ ] `stats` getter that returns correct block for current level/branch
- [ ] `effectiveDamage()`, `effectiveFireRate()`, `effectiveRange()` (can skip mods if no research system)
- [ ] `canUpgrade()`, `canBranch()` checks
- [ ] `startUpgrade()`, `startBranch()` with construction state
- [ ] `updateConstruction()` with timer and `_finishConstruction()`
- [ ] `upgrade()` and `applyBranch()` that change level/branch and scale HP

### Phase 3: Targeting & Firing
- [ ] `findTarget()` — filter enemies in range, pick furthest along path
- [ ] `update()` — count down fireTimer, find target, fire when ready
- [ ] `_fire()` — create Projectile with correct damage and splash params
- [ ] Record `lastFireTime = performance.now()` on fire

### Phase 4: Projectile
- [ ] Projectile class with homing movement toward target
- [ ] Hit detection (distance threshold)
- [ ] Damage application + kill tracking on sourceTower
- [ ] Splash damage for Branch B (damage nearby enemies on impact)

### Phase 5: 3D Meshes
- [ ] Material helpers (structural + accent)
- [ ] Build functions for L0, L1, L2, Branch A, Branch B
- [ ] Set `userData` on each (turretPivot, barrel, disc, muzzleFlash, barrelDist)
- [ ] `createTowerMesh()` / `removeTowerMesh()` / `rebuildTowerMesh()`
- [ ] Dispatcher that picks builder based on tower.level + tower.branch

### Phase 6: Animations (per-frame)
- [ ] Turret pivot rotation from tower.angle
- [ ] Disc spin (1.5 rad/s)
- [ ] Muzzle flash: visible for 120ms, scale 4x -> 0
- [ ] Barrel recoil: exponential decay, 2 units for Branch A, 3.5 for others

### Phase 7: Projectile Visuals
- [ ] Per-level projectile shapes (sphere, elongated, ring, needle, orbiters)
- [ ] Trail spheres with fade
- [ ] Fire point from muzzle flash world position

### Phase 8: Sound & UI
- [ ] Fire sound (880 Hz, 60ms sine tone — or substitute)
- [ ] Upgrade/branch buttons
- [ ] Stats display (damage, fire rate, range, splash)
- [ ] Construction progress bar

---

## Source Files in Neon Defense 4

| File | What's There |
|------|-------------|
| `src/js/config.js:24,62-88,173-182` | Color, TowerType, PULSE stats, timing constants |
| `src/js/towers.js:36-606` | Tower class (constructor, upgrades, combat, firing) |
| `src/js/projectiles.js:10-64` | Projectile class (movement, hit, splash) |
| `src/js/renderer/scene.js:17-48` | toColor, material factories |
| `src/js/renderer/towerMeshes.js:56-388` | All 5 Pulse mesh builders (L0/L1/L2/A/B) |
| `src/js/renderer/towerMeshes.js:1690-1703` | Dispatcher |
| `src/js/renderer/towerMeshes.js:1753-1872` | createTowerMesh (public API) |
| `src/js/renderer/towerMeshes.js:1883-1964` | Turret aim, disc spin, muzzle flash, recoil |
| `src/js/renderer/towerMeshes.js:2194-2198` | rebuildTowerMesh |
| `src/js/renderer/towerMeshes.js:2267-2282` | getFirePoint |
| `src/js/renderer/projectileRenderer.js:28-171` | Pulse projectile builders + dispatcher |
| `src/js/renderer/projectileRenderer.js:393-413` | Pulse projectile animations |
| `src/js/sound.js:49-56` | shoot_pulse sound |
| `src/js/hud.js:620-675` | Upgrade/branch buttons, stats display |
| `src/js/main.js:818-836` | Placement |
| `src/js/main.js:1066-1083` | Post-upgrade rebuild + sound trigger |
| `tower_parts/pulse_meshes.js` | Standalone mesh copies (simpler materials) |
