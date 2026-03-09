// ============================================================
// particles.js — Particle data system (NO rendering code)
// ============================================================

const particles = [];
let nextId = 0;

export function initParticles() {
  particles.length = 0;
  nextId = 0;
}

export function resetParticles() {
  particles.length = 0;
}

export function getParticles() {
  return particles;
}

/**
 * Spawn a particle effect at the given world position.
 * Types: 'explosion', 'bigExplosion', 'hit', 'muzzleFlash',
 *        'wallBreak', 'wallHit', 'wallRepair'
 */
export function spawnParticle(x, z, color, type) {
  switch (type) {
    case 'explosion':
      spawnBurst(x, z, color, 8, 12, 60, 0.4, 0.7, 3);
      break;
    case 'bigExplosion':
      spawnBurst(x, z, color, 15, 20, 90, 0.5, 1.0, 5);
      break;
    case 'hit':
      spawnBurst(x, z, color, 3, 5, 40, 0.2, 0.4, 2);
      break;
    case 'muzzleFlash':
      spawnFlash(x, z, color, 1, 2, 0.08, 0.15, 4);
      break;
    case 'wallBreak':
      spawnWallBreak(x, z, color);
      break;
    case 'wallHit':
      spawnWallHit(x, z, color);
      break;
    case 'wallRepair':
      spawnWallRepair(x, z, color);
      break;
    case 'airStrike':
      spawnAirStrikeBurst(x, z, color);
      break;
    default:
      spawnBurst(x, z, color, 4, 6, 50, 0.3, 0.5, 2);
  }
}

function spawnBurst(x, z, color, minCount, maxCount, speed, minLife, maxLife, size) {
  const count = minCount + Math.floor(Math.random() * (maxCount - minCount + 1));
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const s = speed * (0.3 + Math.random() * 0.7);
    const life = minLife + Math.random() * (maxLife - minLife);
    particles.push({
      id: nextId++,
      x,
      y: 10 + Math.random() * 10,
      z,
      vx: Math.cos(angle) * s,
      vy: 20 + Math.random() * 40,
      vz: Math.sin(angle) * s,
      color,
      life,
      maxLife: life,
      size: size * (0.6 + Math.random() * 0.4),
      type: 'burst',
    });
  }
}

function spawnFlash(x, z, color, minCount, maxCount, minLife, maxLife, size) {
  const count = minCount + Math.floor(Math.random() * (maxCount - minCount + 1));
  for (let i = 0; i < count; i++) {
    const life = minLife + Math.random() * (maxLife - minLife);
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 4,
      y: 12 + Math.random() * 6,
      z: z + (Math.random() - 0.5) * 4,
      vx: 0,
      vy: 5,
      vz: 0,
      color,
      life,
      maxLife: life,
      size: size * (0.8 + Math.random() * 0.4),
      type: 'flash',
    });
  }
}

/**
 * Wall destruction — angular debris fragments scattering outward and falling.
 */
function spawnWallBreak(x, z, color) {
  const count = 8 + Math.floor(Math.random() * 5); // 8-12
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const s = 40 + Math.random() * 50; // outward speed
    const life = 0.5 + Math.random() * 0.3; // 0.5-0.8s
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 20,
      y: 8 + Math.random() * 16,
      z: z + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * s,
      vy: 30 + Math.random() * 50, // upward arc
      vz: Math.sin(angle) * s,
      color,
      life,
      maxLife: life,
      size: 3.5 + Math.random() * 2.5, // slightly larger than normal
      type: 'wallBreak',
      rotSpeed: (Math.random() - 0.5) * 10, // tumbling
    });
  }
}

/**
 * Wall hit — brief spark/debris at impact point.
 */
function spawnWallHit(x, z, color) {
  const count = 2 + Math.floor(Math.random() * 2); // 2-3
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const s = 25 + Math.random() * 30;
    const life = 0.15 + Math.random() * 0.1; // 0.15-0.25s
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 8,
      y: 10 + Math.random() * 10,
      z: z + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * s,
      vy: 15 + Math.random() * 25,
      vz: Math.sin(angle) * s,
      color,
      life,
      maxLife: life,
      size: 2 + Math.random() * 1.5,
      type: 'wallHit',
    });
  }
  // Central spark flash
  particles.push({
    id: nextId++,
    x,
    y: 14,
    z,
    vx: 0,
    vy: 3,
    vz: 0,
    color: 0xFFFFFF,
    life: 0.12,
    maxLife: 0.12,
    size: 5,
    type: 'flash',
  });
}

/**
 * Wall repair — upward-moving energy particles, restoration glow.
 */
function spawnWallRepair(x, z, color) {
  const count = 6 + Math.floor(Math.random() * 3); // 6-8
  for (let i = 0; i < count; i++) {
    const life = 0.3 + Math.random() * 0.2; // 0.3-0.5s
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 24,
      y: Math.random() * 8,
      z: z + (Math.random() - 0.5) * 24,
      vx: (Math.random() - 0.5) * 10,
      vy: 40 + Math.random() * 30, // rising upward
      vz: (Math.random() - 0.5) * 10,
      color,
      life,
      maxLife: life,
      size: 2.5 + Math.random() * 1.5,
      type: 'wallRepair',
    });
  }
}

/**
 * Air strike explosion — massive multi-layer burst.
 */
function spawnAirStrikeBurst(x, z, color) {
  // Inner core — intense bright burst
  const coreCount = 25 + Math.floor(Math.random() * 10); // 25-34
  for (let i = 0; i < coreCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const s = 60 + Math.random() * 100; // fast outward
    const life = 0.6 + Math.random() * 0.5; // 0.6-1.1s
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 30,
      y: 5 + Math.random() * 20,
      z: z + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * s,
      vy: 50 + Math.random() * 80,
      vz: Math.sin(angle) * s,
      color: 0xFFFFFF,
      life,
      maxLife: life,
      size: 5 + Math.random() * 4,
      type: 'burst',
    });
  }
  // Outer ring — team-colored debris
  const outerCount = 30 + Math.floor(Math.random() * 15); // 30-44
  for (let i = 0; i < outerCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const s = 80 + Math.random() * 140;
    const life = 0.8 + Math.random() * 0.7; // 0.8-1.5s
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 60,
      y: 10 + Math.random() * 30,
      z: z + (Math.random() - 0.5) * 60,
      vx: Math.cos(angle) * s,
      vy: 30 + Math.random() * 60,
      vz: Math.sin(angle) * s,
      color,
      life,
      maxLife: life,
      size: 4 + Math.random() * 3,
      type: 'wallBreak',
      rotSpeed: (Math.random() - 0.5) * 12,
    });
  }
  // Central flash column
  for (let i = 0; i < 5; i++) {
    particles.push({
      id: nextId++,
      x: x + (Math.random() - 0.5) * 10,
      y: 5 + i * 15,
      z: z + (Math.random() - 0.5) * 10,
      vx: 0,
      vy: 60 + Math.random() * 40,
      vz: 0,
      color: 0xFFDD44,
      life: 0.3 + Math.random() * 0.2,
      maxLife: 0.5,
      size: 8 + Math.random() * 4,
      type: 'flash',
    });
  }
}

export function updateParticles(dt) {
  let i = 0;
  while (i < particles.length) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      // Swap-remove: replace dead particle with last, pop
      particles[i] = particles[particles.length - 1];
      particles.pop();
      continue; // re-check same index (now holds swapped particle)
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;
    // Gravity on burst and wallBreak particles
    if (p.type === 'burst') {
      p.vy -= 60 * dt;
    } else if (p.type === 'wallBreak') {
      p.vy -= 120 * dt; // heavier debris falls faster
    } else if (p.type === 'wallHit') {
      p.vy -= 80 * dt;
    }
    // Clamp y to ground
    if (p.y < 0) {
      p.y = 0;
      p.vy = 0;
    }
    i++;
  }
}
