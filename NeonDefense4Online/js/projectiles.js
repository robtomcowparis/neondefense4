// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — projectiles.js
//  Tower projectiles and enemy (sapper) projectiles
// ═══════════════════════════════════════════════════════════════

import { SAPPER_RED, WHITE } from './config.js';
import { dist, rgba, rgb } from './utils.js';

// ─── Tower Projectile ────────────────────────────────────────
export class Projectile {
    constructor(x, y, target, damage, speed, color, size = 3, sourceTower = null, splashRadius = 0, splashDamage = 0) {
        this.x = x; this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = speed;
        this.color = color;
        this.size = size;
        this.alive = true;
        this.trail = [];
        this.sourceTower = sourceTower;
        this.splashRadius = splashRadius;
        this.splashDamage = splashDamage;
        this.targetX = target ? target.x : x;
        this.targetY = target ? target.y : y;
    }

    update(dt, allEnemies) {
        if (!this.alive) return;
        if (!this.target || !this.target.alive) {
            if (this.splashRadius > 0 && allEnemies) this._doSplash(allEnemies);
            this.alive = false;
            return;
        }
        this.targetX = this.target.x;
        this.targetY = this.target.y;
        this.trail.push([this.x, this.y]);
        if (this.trail.length > 6) this.trail.shift();
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const d = Math.hypot(dx, dy);
        if (d < this.speed * dt + 5) {
            this.target.takeDamage(this.damage);
            if (this.sourceTower) {
                this.sourceTower.totalDamage += this.damage;
                if (!this.target.alive) this.sourceTower.kills += 1;
            }
            if (this.splashRadius > 0 && allEnemies) this._doSplash(allEnemies);
            this.alive = false;
            return;
        }
        this.x += (dx / d) * this.speed * dt;
        this.y += (dy / d) * this.speed * dt;
    }

    _doSplash(allEnemies) {
        for (const e of allEnemies) {
            if (e === this.target || !e.alive) continue;
            if (dist(this.targetX, this.targetY, e.x, e.y) <= this.splashRadius) {
                e.takeDamage(this.splashDamage);
                if (this.sourceTower) this.sourceTower.totalDamage += this.splashDamage;
            }
        }
    }

    draw(ctx) {
        if (!this.alive) return;
        // Trail
        for (let i = 0; i < this.trail.length; i++) {
            const r = (i + 1) / (this.trail.length + 1);
            const sz = Math.max(1, Math.round(this.size * r * 0.7));
            ctx.beginPath();
            ctx.arc(Math.round(this.trail[i][0]), Math.round(this.trail[i][1]), sz, 0, Math.PI * 2);
            ctx.fillStyle = rgba(this.color, r * 0.4);
            ctx.fill();
        }
        // Main dot
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.size, 0, Math.PI * 2);
        ctx.fillStyle = rgb(this.color);
        ctx.fill();
        // Inner white dot
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), Math.max(1, this.size - 1), 0, Math.PI * 2);
        ctx.fillStyle = rgb(WHITE);
        ctx.fill();
    }
}

// ─── Enemy Projectile (fired by Sappers at towers) ──────────
export class EnemyProjectile {
    constructor(x, y, targetTower, damage, speed = 200) {
        this.x = x; this.y = y;
        this.target = targetTower;
        this.damage = damage;
        this.speed = speed;
        this.color = SAPPER_RED;
        this.alive = true;
        this.trail = [];
    }

    update(dt) {
        if (!this.alive) return;
        if (!this.target || this.target.hp <= 0) {
            this.alive = false;
            return;
        }
        this.trail.push([this.x, this.y]);
        if (this.trail.length > 5) this.trail.shift();
        const tx = this.target.x;
        const ty = this.target.y;
        const dx = tx - this.x;
        const dy = ty - this.y;
        const d = Math.hypot(dx, dy);
        if (d < this.speed * dt + 8) {
            this.target.takeDamage(this.damage);
            this.alive = false;
            return;
        }
        this.x += (dx / d) * this.speed * dt;
        this.y += (dy / d) * this.speed * dt;
    }

    draw(ctx) {
        if (!this.alive) return;
        // Trail
        for (let i = 0; i < this.trail.length; i++) {
            const r = (i + 1) / (this.trail.length + 1);
            const sz = Math.max(1, Math.round(2 * r));
            ctx.beginPath();
            ctx.arc(Math.round(this.trail[i][0]), Math.round(this.trail[i][1]), sz, 0, Math.PI * 2);
            ctx.fillStyle = rgba(this.color, 0.3 * r);
            ctx.fill();
        }
        // Main dot
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), 3, 0, Math.PI * 2);
        ctx.fillStyle = rgb(this.color);
        ctx.fill();
        // Inner bright dot
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), 1, 0, Math.PI * 2);
        ctx.fillStyle = rgba([255, 200, 150], 1);
        ctx.fill();
    }
}
