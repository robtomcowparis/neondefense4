// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — particles.js
//  Particle system: explosions, rings, trails, ambient
// ═══════════════════════════════════════════════════════════════

import { rgba } from './utils.js';

class Particle {
    constructor(x, y, vx, vy, color, life, size = 2) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.color = color;
        this.life = life; this.maxLife = life;
        this.size = size;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.life -= dt;
        return this.life > 0;
    }

    draw(ctx) {
        const r = Math.max(0, this.life / this.maxLife);
        const alpha = r;
        const sz = Math.max(1, Math.round(this.size * r));
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), sz, 0, Math.PI * 2);
        ctx.fillStyle = rgba(this.color, alpha);
        ctx.fill();
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emitExplosion(x, y, color, count = 12, speed = 120, life = 0.5, size = 3) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const spd = speed * 0.3 + Math.random() * speed * 0.7;
            this.particles.push(new Particle(
                x, y,
                Math.cos(a) * spd, Math.sin(a) * spd,
                color,
                life * 0.5 + Math.random() * life * 0.5,
                size * 0.5 + Math.random() * size * 0.5
            ));
        }
    }

    emitTrail(x, y, color, count = 2, speed = 30, life = 0.2, size = 2) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const spd = Math.random() * speed;
            this.particles.push(new Particle(x, y, Math.cos(a) * spd, Math.sin(a) * spd, color, life, size));
        }
    }

    emitRing(x, y, color, radius, count = 20, life = 0.4, size = 2) {
        for (let i = 0; i < count; i++) {
            const a = (2 * Math.PI * i) / count;
            this.particles.push(new Particle(
                x + Math.cos(a) * radius, y + Math.sin(a) * radius,
                Math.cos(a) * 40, Math.sin(a) * 40,
                color, life, size
            ));
        }
    }

    update(dt) {
        this.particles = this.particles.filter(p => p.update(dt));
    }

    draw(ctx) {
        for (const p of this.particles) {
            p.draw(ctx);
        }
    }
}
