// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — particles.js
//  Particle system: explosions, rings, trails (no rendering)
// ═══════════════════════════════════════════════════════════════

class Particle {
    constructor(x, y, vx, vy, color, life, size = 2, vy3d = 0, y3d = 0) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.vy3d = vy3d; // vertical velocity in 3D world Y
        this.y3d = y3d;   // current 3D world Y height
        this.color = color;
        this.life = life; this.maxLife = life;
        this.size = size;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy3d -= 220 * dt; // gravity
        this.y3d += this.vy3d * dt;
        if (this.y3d < 0) { this.y3d = 0; this.vy3d = 0; }
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.life -= dt;
        return this.life > 0;
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emitExplosion(x, y, color, count = 12, speed = 120, life = 0.5, size = 3, spawnY = 8) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const spd = speed * 0.3 + Math.random() * speed * 0.7;
            // Give each particle a random upward launch velocity so explosions are 3D
            const vy3d = speed * (0.2 + Math.random() * 0.6) * (Math.random() > 0.25 ? 1 : -0.3);
            this.particles.push(new Particle(
                x, y,
                Math.cos(a) * spd, Math.sin(a) * spd,
                color,
                life * 0.5 + Math.random() * life * 0.5,
                size * 0.5 + Math.random() * size * 0.5,
                vy3d,
                spawnY + Math.random() * 4
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

    emitPulseImpact(x, y, color, level, branch) {
        var count = 8 + level * 4;
        var speed = 100 + level * 30;
        var life = 0.3 + level * 0.1;
        this.emitExplosion(x, y, color, count, speed, life, 3, 10);
        // Bright white core flash
        for (var i = 0; i < 3; i++) {
            var a = Math.random() * Math.PI * 2;
            this.particles.push(new Particle(
                x, y, Math.cos(a) * 10, Math.sin(a) * 10,
                [255, 255, 255], 0.15, 6, 20, 10
            ));
        }
        if (branch === 'B') {
            this.emitRing(x, y, [255, 255, 255], 25, 16, 0.3, 2);
        }
    }

    emitCryoImpact(x, y, color, level, branch) {
        var count = 8 + level * 3;
        var speed = 50 + level * 15;
        var life = 0.6 + level * 0.15;
        this.emitExplosion(x, y, color, count, speed, life, 2, 6);
        // Upward-drifting ice motes
        var moteCount = 4 + level * 2;
        for (var i = 0; i < moteCount; i++) {
            var a = Math.random() * Math.PI * 2;
            var spd = 10 + Math.random() * 15;
            this.particles.push(new Particle(
                x, y, Math.cos(a) * spd, Math.sin(a) * spd,
                [150, 220, 255], 0.5 + Math.random() * 0.3, 2,
                30 + Math.random() * 40, 6
            ));
        }
        if (branch === 'A') {
            this.emitRing(x, y, [150, 220, 255], 30, 20, 0.4, 2);
        }
    }

    emitRailImpact(x, y, color, level, branch, beamAngle) {
        // Directional sparks perpendicular to beam
        var perpAngle = beamAngle + Math.PI / 2;
        for (var i = 0; i < 8; i++) {
            var side = (i % 2 === 0) ? 1 : -1;
            var spread = (Math.random() - 0.5) * 0.6;
            var a = perpAngle * side + spread;
            var spd = 80 + Math.random() * 40;
            this.particles.push(new Particle(
                x, y, Math.cos(a) * spd, Math.sin(a) * spd,
                color, 0.25 * (0.5 + Math.random() * 0.5), 2,
                40 + Math.random() * 60, 10
            ));
        }
        if (branch === 'B') {
            for (var j = 0; j < 8; j++) {
                var a2 = Math.random() * Math.PI * 2;
                var spd2 = 30 + Math.random() * 40;
                this.particles.push(new Particle(
                    x, y, Math.cos(a2) * spd2, Math.sin(a2) * spd2,
                    [255, 255, 255], 0.2, 6,
                    30 + Math.random() * 50, 10
                ));
            }
        }
    }

    emitTeslaHitSpark(x, y, color) {
        // Fast short-lived sparks
        for (var i = 0; i < 6; i++) {
            var a = Math.random() * Math.PI * 2;
            var spd = 50 + Math.random() * 30;
            this.particles.push(new Particle(
                x, y, Math.cos(a) * spd, Math.sin(a) * spd,
                color, 0.15, 2, 0, 12
            ));
        }
        // Upward fountain
        for (var j = 0; j < 3; j++) {
            var a2 = Math.random() * Math.PI * 2;
            this.particles.push(new Particle(
                x, y, Math.cos(a2) * 20, Math.sin(a2) * 20,
                color, 0.2, 2, 60 + Math.random() * 60, 12
            ));
        }
    }

    emitNovaImpact(x, y, color, level, branch) {
        var count = 10 + level * 3;
        var speed = 80 + level * 20;
        this.emitExplosion(x, y, color, count, speed, 0.4, 3, 10);
        // Expanding ground ring
        this.emitRing(x, y, color, 15 + level * 5, 20, 0.5, 2);
        // White core flash
        for (var i = 0; i < 5; i++) {
            var a = Math.random() * Math.PI * 2;
            this.particles.push(new Particle(
                x, y, Math.cos(a) * 10, Math.sin(a) * 10,
                [255, 255, 255], 0.12, 8, 15, 10
            ));
        }
    }

    update(dt) {
        this.particles = this.particles.filter(p => p.update(dt));
    }
}
