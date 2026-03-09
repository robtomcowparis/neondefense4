// ============================================================
// config.js — Single source of truth for ALL game data
// ============================================================

// --- Map ---
export const MAP_W = 1600;
export const MAP_H = 1600;
export const TILE_SIZE = 40;
export const GRID_COLS = MAP_W / TILE_SIZE;   // 40
export const GRID_ROWS = MAP_H / TILE_SIZE;   // 40

// --- Teams ---
export const TEAM_PLAYER = 0;
export const TEAM_ENEMY = 1;

// --- Game States ---
export const STATE_MENU = 'menu';
export const STATE_PLAYING = 'playing';
export const STATE_PAUSED = 'paused';
export const STATE_VICTORY = 'victory';
export const STATE_DEFEAT = 'defeat';

// --- Build Zones ---
// Enemy territory (rows 1-13)
// Shared territory (rows 14-26) — both teams can build
// Player territory (rows 27-38)
export const ENEMY_BUILD_ROW_MIN = 1;
export const ENEMY_BUILD_ROW_MAX = 13;
export const SHARED_BUILD_ROW_MIN = 14;
export const SHARED_BUILD_ROW_MAX = 26;
export const PLAYER_BUILD_ROW_MIN = 27;
export const PLAYER_BUILD_ROW_MAX = 38;

// Base positions (grid coords)
export const PLAYER_BASE_COL = 19;
export const PLAYER_BASE_ROW = 36;
export const ENEMY_BASE_COL = 19;
export const ENEMY_BASE_ROW = 2;

// --- Building Types ---
export const BTYPE_CORE = 'core';
export const BTYPE_BARRACKS = 'barracks';
export const BTYPE_TURRET = 'turret';
export const BTYPE_FACTORY = 'factory';
export const BTYPE_GENERATOR = 'generator';
export const BTYPE_HELIPAD = 'helipad';
export const BTYPE_WALL = 'wall';

// Building stat table
// size = tiles occupied (size x size)
//
// Stat structure varies by building type:
//   Production (Barracks/Factory/Helipad): levels use multipliers (hpMult, damageMult, speedMult)
//     applied to base unit stats, plus produceTime. Branches override produceUnit and multipliers.
//   Turret: levels use absolute values (damage, fireRate, range). Branches also absolute.
//   Generator: levels use income-specific fields (incomeBonus, territoryMult).
//   Wall: levels use absolute HP values. No branches.
//
// All level entries include upgradeCost. Branch entries include cost.
// Accessor functions in buildings.js (getTurretStats, getProductionStats, getGeneratorStats)
// return the correct level/branch data for each type.
export const BUILDING_STATS = {
  [BTYPE_CORE]: {
    hp: 5000,
    cost: 0,
    size: 3,
    buildTime: 0,
    label: 'Core',
    description: 'Main base. Destroy the enemy core to win.',
  },
  [BTYPE_BARRACKS]: {
    hp: 400,
    cost: 75,
    size: 2,
    buildTime: 5,
    produceUnit: 'rifle',
    produceTime: 16,
    label: 'Barracks',
    description: 'Produces Rifle infantry. Upgradeable.',
    levels: [
      // Level 0 (base) — slow trickle, upgrades are essential
      { produceTime: 16, hpMult: 1.0, damageMult: 1.0, speedMult: 1.0, upgradeCost: 0 },
      // Level 1
      { produceTime: 13, hpMult: 1.2, damageMult: 1.15, speedMult: 1.0, upgradeCost: 100 },
      // Level 2
      { produceTime: 10, hpMult: 1.4, damageMult: 1.3, speedMult: 1.0, upgradeCost: 200 },
    ],
    branches: {
      A: { name: 'Assault Doctrine', desc: 'Trains Assault units',
           cost: 400, produceUnit: 'assault', produceTime: 12,
           hpMult: 1.5, damageMult: 1.4, speedMult: 1.0 },
      B: { name: 'Rapid Deployment', desc: 'Fast production + speed',
           cost: 450, produceUnit: 'rifle', produceTime: 7,
           hpMult: 1.3, damageMult: 1.2, speedMult: 1.25 },
    },
  },
  [BTYPE_TURRET]: {
    hp: 200,
    cost: 120,
    size: 1,
    buildTime: 6,
    color: [0, 255, 255],
    label: 'Pulse Turret',
    description: 'Rapid-fire energy bolts. Upgradeable.',
    levels: [
      // Level 0 (base)
      { damage: 12, fireRate: 0.35, range: 120, upgradeCost: 0 },
      // Level 1
      { damage: 20, fireRate: 0.28, range: 135, upgradeCost: 100 },
      // Level 2
      { damage: 32, fireRate: 0.20, range: 155, upgradeCost: 200 },
    ],
    branches: {
      A: { name: 'Overclock', desc: 'Insane fire rate',
           cost: 550, damage: 28, fireRate: 0.09, range: 160 },
      B: { name: 'Heavy Bolts', desc: 'Splash on hit',
           cost: 600, damage: 55, fireRate: 0.25, range: 165,
           splashRadius: 50, splashDamage: 25 },
    },
  },
  [BTYPE_FACTORY]: {
    hp: 600,
    cost: 225,
    size: 2,
    buildTime: 8,
    produceUnit: 'tank',
    produceTime: 32,
    label: 'Factory',
    description: 'Produces Tank units. Upgradeable.',
    levels: [
      // Level 0 (base) — very slow, upgrades essential for tank pressure
      { produceTime: 32, hpMult: 1.0, damageMult: 1.0, speedMult: 1.0, upgradeCost: 0 },
      // Level 1
      { produceTime: 26, hpMult: 1.15, damageMult: 1.1, speedMult: 1.0, upgradeCost: 175 },
      // Level 2
      { produceTime: 22, hpMult: 1.3, damageMult: 1.25, speedMult: 1.0, upgradeCost: 350 },
    ],
    branches: {
      A: { name: 'Heavy Armor', desc: 'Massive HP, slower build',
           cost: 600, produceUnit: 'tank', produceTime: 28,
           hpMult: 1.8, damageMult: 1.2, speedMult: 0.85 },
      B: { name: 'Siege Cannons', desc: 'High damage + range',
           cost: 550, produceUnit: 'tank', produceTime: 22,
           hpMult: 1.2, damageMult: 1.6, speedMult: 1.0, rangeMult: 1.3 },
    },
  },
};

// Generator building stats
BUILDING_STATS[BTYPE_GENERATOR] = {
  hp: 150,
  cost: 60,
  size: 1,
  buildTime: 5,
  label: 'Generator',
  description: 'Increases energy income. Upgradeable.',
  incomeBonus: 3,
  levels: [
    // Level 0 (base)
    { incomeBonus: 3, territoryMult: 1.0, upgradeCost: 0 },
    // Level 1
    { incomeBonus: 5, territoryMult: 1.0, upgradeCost: 100 },
    // Level 2
    { incomeBonus: 7, territoryMult: 1.0, upgradeCost: 200 },
  ],
  branches: {
    A: { name: 'Overcharge', desc: 'Maximum energy output',
         cost: 500, incomeBonus: 10, territoryMult: 1.0 },
    B: { name: 'Capacitor Network', desc: 'Income + 2x territory bonus',
         cost: 425, incomeBonus: 6, territoryMult: 2.0 },
  },
};

// Helipad building stats
BUILDING_STATS[BTYPE_HELIPAD] = {
  hp: 500,
  cost: 300,
  size: 2,
  buildTime: 10,
  produceUnit: 'helicopter',
  produceTime: 40,
  label: 'Helipad',
  description: 'Produces Helicopters. Upgradeable.',
  levels: [
    // Level 0 (base) — helicopters are premium, upgrades unlock real output
    { produceTime: 40, hpMult: 1.0, damageMult: 1.0, speedMult: 1.0, upgradeCost: 0 },
    // Level 1
    { produceTime: 34, hpMult: 1.15, damageMult: 1.15, speedMult: 1.0, upgradeCost: 200 },
    // Level 2
    { produceTime: 28, hpMult: 1.3, damageMult: 1.3, speedMult: 1.0, upgradeCost: 400 },
  ],
  branches: {
    A: { name: 'Gunship Bay', desc: 'Heavy firepower helicopters',
         cost: 600, produceUnit: 'helicopter', produceTime: 30,
         hpMult: 1.2, damageMult: 1.6, speedMult: 1.0 },
    B: { name: 'Rapid Scramble', desc: 'Fast production + speed',
         cost: 550, produceUnit: 'helicopter', produceTime: 20,
         hpMult: 1.1, damageMult: 1.1, speedMult: 1.15 },
  },
};

// Wall building stats
BUILDING_STATS[BTYPE_WALL] = {
  hp: 120,
  cost: 25,
  size: 1,
  buildTime: 3,
  label: 'Wall',
  description: 'Destructible barrier. Block and funnel enemies.',
  repairCost: 10,
  repairTime: 2,
  levels: [
    // Level 0 (base)
    { hp: 120, upgradeCost: 0 },
    // Level 1
    { hp: 250, upgradeCost: 30 },
    // Level 2
    { hp: 400, upgradeCost: 60 },
  ],
};

// Buildable types for player (core is placed automatically)
export const PLAYER_BUILDABLE = [BTYPE_BARRACKS, BTYPE_TURRET, BTYPE_FACTORY, BTYPE_GENERATOR, BTYPE_HELIPAD, BTYPE_WALL];

// --- Unit Types ---
export const UTYPE_RIFLE = 'rifle';
export const UTYPE_ASSAULT = 'assault';
export const UTYPE_TANK = 'tank';
export const UTYPE_HELICOPTER = 'helicopter';

// Unit stat table
// speed = world units per second
// range = attack range in world units
// fireRate = shots per second
export const UNIT_STATS = {
  [UTYPE_RIFLE]: {
    hp: 50,
    speed: 35,
    damage: 8,
    range: 120,
    fireRate: 1.0,
    size: 6,
    label: 'Rifle',
  },
  [UTYPE_ASSAULT]: {
    hp: 160,
    speed: 28,
    damage: 14,
    range: 100,
    fireRate: 0.8,
    size: 8,
    label: 'Assault',
  },
  [UTYPE_TANK]: {
    hp: 400,
    speed: 16,
    damage: 35,
    range: 160,
    fireRate: 0.5,
    size: 14,
    label: 'Tank',
  },
  [UTYPE_HELICOPTER]: {
    hp: 700,
    speed: 60,
    damage: 4,
    range: 130,
    fireRate: 8.0,
    size: 10,
    label: 'Helicopter',
    isAir: true,
  },
};

// --- Helicopter Flight ---
export const HELI_FLY_HEIGHT = 60;        // world units above ground
export const HELI_ORBIT_RADIUS = 120;     // world units — circle radius around rally point
export const HELI_ORBIT_SPEED = 0.6;      // radians per second orbital speed
export const HELI_APPROACH_SPEED = 80;    // world units/sec when flying to new rally point

// --- Projectile Config ---
export const PROJECTILE_SPEED = 400;   // world units per second
export const PROJECTILE_SIZE = 3;
export const PROJECTILE_LIFETIME = 2.0; // seconds max

// --- Economy ---
export const STARTING_ENERGY = 500;     // lump-sum start — build generators for income

// --- Enemy AI Config ---
export const AI_TICK_INTERVAL = 1.5;    // seconds between AI decisions
export const AI_ENERGY_RESERVE = 10;    // keep at least this much (spend aggressively)

// --- AI Building Limits ---
export const AI_LIMITS = { barracks: 4, turrets: 4, factories: 3, generators: 6, helipads: 2, walls: 12 };

// --- AI Timing Gates (seconds) ---
export const AI_TIMING = {
  build: { barracks: 4, turret: 25, factory: 45, generator: 3, helipad: 80, wall: 35 },
  shared: { turret: 80, generator: 70, wall: 50 },
  upgrade: { turret: 40, barracks: 30, factory: 65, generator: 35, helipad: 100, wall: 55 },
};

// --- AI Threat Assessment ---
export const AI_THREAT_RADIUS = 600;          // world units from AI base — full threat weight
export const AI_THREAT_OUTER_RADIUS = 1000;   // world units — partial threat weight (advancing forces)
export const AI_THREAT_HIGH_THRESHOLD = 0.5;  // threat score above this = defensive mode
export const AI_THREAT_LOW_THRESHOLD = 0.15;  // threat score below this = aggressive mode

// --- AI Push Config ---
export const AI_PUSH = {
  rallyRow: 9, minSize: 3, maxRallyTime: 35, rallyRadius: 60,
  minWaveStrength: 500, turretPower: 250, wallPower: 80,
  cooldownAfterFailure: 10, failureStrengthMult: 0.3,
  sizeGrow: 2, sizeShrink: 1, maxSize: 10,
};

// --- Player Rally (auto-grouping so units push together) ---
export const PLAYER_RALLY_ROW = 29;           // grid row where player units stage before pushing
export const PLAYER_PUSH_SIZE = 4;            // release wave when this many units are gathered
export const PLAYER_MAX_RALLY_TIME = 20;      // seconds max before forcing a push
export const PLAYER_RALLY_RADIUS = 60;        // world units


// --- Unit Collision ---
export const UNIT_COLLISION_FORCE = 150;       // separation push strength (world units/sec)
export const UNIT_COLLISION_RADIUS_SCALE = 1.8; // multiplier on unit size for collision radius

// --- Stuck Detection ---
export const STUCK_TIME_THRESHOLD = 1.2;       // seconds without progress before rerouting
export const STUCK_PROGRESS_MIN = 3;           // world units — must move at least this much to count as progress

// --- Combat Tuning ---
export const COMBAT_STOP_TO_FIGHT = true;     // units stop moving when enemies in range
export const COMBAT_LOW_HP_BONUS = 0.3;       // priority bonus for finishing low-HP targets
export const COMBAT_DISTANCE_WEIGHT = 0.5;    // priority weight for distance (closer = higher)

// --- Base Defense ---
export const BASE_DEFENSE_RADIUS = 350;       // enemies within this range of base trigger defense
export const BASE_DEFENSE_RECALL_RADIUS = 500; // units within this range of their base get recalled to defend

// --- Colors ---
export const COLORS = {
  BG:          0x040410,
  GRID_DIM:    0x0F0F23,
  GRID_BRIGHT: 0x191937,
  PATH_COLOR:  0x143C50,

  CYAN:        0x00FFFF,
  MAGENTA:     0xFF00FF,
  GOLD:        0xFFD700,
  GREEN:       0x32FF64,
  RED:         0xFF3232,
  ORANGE:      0xFFA028,
  ICE_BLUE:    0x96DCFF,
  WHITE:       0xFFFFFF,

  // Team colors
  PLAYER:      0x00FFFF,
  ENEMY:       0xFF3232,

  // Building colors
  CORE_PLAYER: 0x00FFFF,
  CORE_ENEMY:  0xFF3232,
  BARRACKS:    0x00FFFF,
  TURRET:      0xFF00FF,
  FACTORY:     0xFFD700,
  HELIPAD:     0x32FF64,
  WALL:        0x00b4c8,

  // Unit colors by team
  UNIT_PLAYER: 0x00FFFF,
  UNIT_ENEMY:  0xFF3232,

  // Projectile
  PROJECTILE_PLAYER: 0x00FFFF,
  PROJECTILE_ENEMY:  0xFF3232,

  // Obstacle
  OBSTACLE:    0x505064,

  // UI
  PANEL_BG:    0x08081A,
  CARD_BG:     0x0c0c22,
  BORDER_CYAN: 0x00b4c8,
  TEXT:         0xc8c8dc,
  TEXT_DIM:     0x606080,

  // Health bar thresholds
  HP_HIGH:     0x32FF64,
  HP_MID:      0xFFDD44,
  HP_LOW:      0xFF3232,

  // Build zone
  BUILD_VALID:   0x00FFFF,
  BUILD_INVALID: 0xFF3232,
};

// --- Camera ---
export const CAMERA_FOV = 55;
export const CAMERA_NEAR = 1;
export const CAMERA_FAR = 5000;
export const CAMERA_START_Y = 900;
export const CAMERA_START_Z_OFFSET = 500;

// OrbitControls
export const ORBIT_MIN_POLAR = 0.25;
export const ORBIT_MAX_POLAR = Math.PI / 2.1;
export const ORBIT_MIN_DIST = 200;
export const ORBIT_MAX_DIST = 2400;
export const ORBIT_DAMPING = 0.06;

// --- Lighting ---
export const LIGHT_AMBIENT_COLOR = 0x1a1a2e;
export const LIGHT_AMBIENT_INTENSITY = 0.6;
export const LIGHT_MAIN_COLOR = 0xc0c8ff;
export const LIGHT_MAIN_INTENSITY = 0.9;
export const LIGHT_FILL_COLOR = 0x4040a0;
export const LIGHT_FILL_INTENSITY = 0.3;
export const LIGHT_HEMI_SKY = 0x1a1a3e;
export const LIGHT_HEMI_GROUND = 0x080810;
export const LIGHT_HEMI_INTENSITY = 0.4;

// --- Bloom ---
export const BLOOM_STRENGTH = 0.22;
export const BLOOM_RADIUS = 0.12;
export const BLOOM_THRESHOLD = 0.7;

// --- Animation ---
export const BOB_SPEED = 3.0;
export const BOB_AMPLITUDE = 2.0;
export const HIT_FLASH_DURATION = 0.15;

// --- Obstacle Generation ---
export const OBSTACLE_MIN_ROW = 3;          // obstacles scattered across entire map
export const OBSTACLE_MAX_ROW = 37;
export const OBSTACLE_MIN_COL = 2;
export const OBSTACLE_MAX_COL = 37;
export const OBSTACLE_BASE_EXCLUSION = 3;   // tiles clear around each base center (no obstacles)

// --- Obstacle Types ---
export const OBSTACLE_KINDS = [
  {
    kind: 'tesla_coil',
    cellsW: 2, cellsD: 2,
    heightMin: 30, heightMax: 55,
    weight: 0.12,
    hpCategory: 'large',
  },
  {
    kind: 'power_cell',
    cellsW: 2, cellsD: 2,
    heightMin: 16, heightMax: 32,
    weight: 0.12,
    hpCategory: 'small',
  },
  {
    kind: 'circuit_monolith',
    cellsW: 2, cellsD: 2,
    heightMin: 14, heightMax: 30,
    weight: 0.15,
    hpCategory: 'small',
  },
  {
    kind: 'capacitor_bank',
    cellsW: 4, cellsD: 2,
    heightMin: 14, heightMax: 28,
    weight: 0.10,
    hpCategory: 'medium',
  },
  {
    kind: 'relay_tower',
    cellsW: 2, cellsD: 2,
    heightMin: 50, heightMax: 85,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'data_obelisk',
    cellsW: 2, cellsD: 2,
    heightMin: 22, heightMax: 42,
    weight: 0.10,
    hpCategory: 'large',
  },
  {
    kind: 'plasma_conduit',
    cellsW: 4, cellsD: 2,
    heightMin: 10, heightMax: 20,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'power_pylon',
    cellsW: 2, cellsD: 2,
    heightMin: 60, heightMax: 100,
    weight: 0.08,
    hpCategory: 'large',
  },
  {
    kind: 'transformer_stack',
    cellsW: 2, cellsD: 2,
    heightMin: 20, heightMax: 38,
    weight: 0.08,
    hpCategory: 'medium',
  },
  {
    kind: 'cable_rack',
    cellsW: 6, cellsD: 2,
    heightMin: 15, heightMax: 25,
    weight: 0.07,
    hpCategory: 'medium',
  },
];

// Neon accent colors cycled across obstacles
export const OBSTACLE_NEON_COLORS = ['#00ccff', '#00ffaa', '#ff00cc', '#aa44ff', '#00aaff'];

// Structural base colors for obstacles (dark)
export const OBSTACLE_BASE_COLORS = ['#0a1628', '#0c1a30', '#0e1e38', '#101828'];

// HP values by obstacle category (for future destructibility)
export const OBSTACLE_HP = {
  small: 60,
  medium: 100,
  large: 150,
};

// Generation tuning — scattered across full map, lower density
export const OBSTACLE_COUNT_MIN = 18;
export const OBSTACLE_COUNT_MAX = 30;
export const OBSTACLE_PLACEMENT_RETRIES = 20;

// --- Turret Upgrade Timing ---
export const TURRET_UPGRADE_TIME = { 1: 8, 2: 14 };  // seconds to upgrade to L1 or L2
export const TURRET_BRANCH_TIME = 20;                  // seconds to apply a branch
export const TURRET_HP_PER_LEVEL = 0.15;              // +15% max HP per level
export const TURRET_HP_BRANCH_BONUS = 0.50;           // +50% max HP for branched turrets
export const TURRET_PROJECTILE_SPEED = 350;           // world units per second

// --- Barracks Upgrade Timing ---
export const BARRACKS_UPGRADE_TIME = { 1: 8, 2: 12 };
export const BARRACKS_BRANCH_TIME = 18;
export const BARRACKS_HP_PER_LEVEL = 0.12;
export const BARRACKS_HP_BRANCH_BONUS = 0.40;

// --- Factory Upgrade Timing ---
export const FACTORY_UPGRADE_TIME = { 1: 10, 2: 16 };
export const FACTORY_BRANCH_TIME = 22;
export const FACTORY_HP_PER_LEVEL = 0.12;
export const FACTORY_HP_BRANCH_BONUS = 0.45;

// --- Generator Upgrade Timing ---
export const GENERATOR_UPGRADE_TIME = { 1: 8, 2: 12 };
export const GENERATOR_BRANCH_TIME = 16;
export const GENERATOR_HP_PER_LEVEL = 0.15;
export const GENERATOR_HP_BRANCH_BONUS = 0.40;

// --- Helipad Upgrade Timing ---
export const HELIPAD_UPGRADE_TIME = { 1: 10, 2: 16 };
export const HELIPAD_BRANCH_TIME = 22;
export const HELIPAD_HP_PER_LEVEL = 0.12;
export const HELIPAD_HP_BRANCH_BONUS = 0.45;

// --- Wall Upgrade Timing ---
export const WALL_UPGRADE_TIME = { 1: 4, 2: 6 };
export const WALL_HP_PER_LEVEL = 0;              // wall HP comes from level table directly, not multiplier
export const WALL_HP_BRANCH_BONUS = 0;            // no branches for walls

// --- Tile Types ---
export const TILE_EMPTY = 0;
export const TILE_OBSTACLE = 1;
export const TILE_BUILDING = 2;
export const TILE_PATH = 3;
export const TILE_WALL = 4;

// --- Performance ---
export const PATH_CACHE_TTL = 2.0;           // seconds before cached paths expire
export const PATH_BUDGET_PER_FRAME = 20;     // max A* computations per frame
export const SPATIAL_HASH_CELL_SIZE = 80;    // world units per spatial hash cell (collision)
export const COMBAT_SPATIAL_CELL_SIZE = 160; // world units per combat spatial hash cell (targeting)

// --- Shared Zone Building ---
export const SHARED_ZONE_UNIT_RADIUS = 200;  // world units — ground unit must be within this distance to build in shared zone

// --- Economy: Territory ---
export const TERRITORY_INCOME_PER_BUILDING = 1.0;  // energy/sec per friendly building in shared zone

// --- AI Strategy Profiles ---
export const AI_PROFILES = {
  rusher:   { pushRatio: 0.7,  upgradePriority: 'damage' },
  turtle:   { pushRatio: 1.2,  upgradePriority: 'defense' },
  balanced: { pushRatio: 0.9,  upgradePriority: 'adaptive' },
};

// --- AI Build Orders (per profile) ---
export const AI_BUILD_ORDER = {
  rusher: [
    'generator', 'barracks', 'barracks', 'generator', 'turret', 'barracks',
    'factory', 'generator', 'turret', 'barracks', 'helipad', 'generator',
    'turret', 'factory', 'turret', 'generator', 'helipad', 'generator',
  ],
  turtle: [
    'generator', 'barracks', 'turret', 'generator', 'turret', 'barracks',
    'generator', 'factory', 'turret', 'wall', 'wall', 'wall',
    'turret', 'generator', 'factory', 'barracks', 'helipad', 'generator',
  ],
  balanced: [
    'generator', 'barracks', 'generator', 'turret', 'barracks', 'factory',
    'generator', 'turret', 'barracks', 'generator', 'turret', 'factory',
    'helipad', 'turret', 'generator', 'barracks', 'helipad', 'generator',
  ],
};

// --- AI Tempo (per difficulty) ---
export const AI_TEMPO = {
  easy:   { buildInterval: 12, upgradeDelay: 90,  upgradeInterval: 25, incomeMult: 0.8,  startEnergy: 500 },
  normal: { buildInterval: 8,  upgradeDelay: 50,  upgradeInterval: 15, incomeMult: 1.2,  startEnergy: 600 },
  hard:   { buildInterval: 5,  upgradeDelay: 30,  upgradeInterval: 10, incomeMult: 1.8,  startEnergy: 750 },
};

// --- Difficulty Settings ---
export const DIFFICULTY = {
  easy:   { aiIncomeMult: 0.8,  playerStartEnergy: 600, aiStartEnergy: 500,  label: 'EASY' },
  normal: { aiIncomeMult: 1.2,  playerStartEnergy: 500, aiStartEnergy: 600, label: 'NORMAL' },
  hard:   { aiIncomeMult: 1.8,  playerStartEnergy: 400,  aiStartEnergy: 750, label: 'HARD' },
};

// --- AI Multi-Action ---
export const AI_MAX_ACTIONS_PER_TICK = 6;        // max build/upgrade actions per AI tick

// --- AI Heli Power Weight ---
export const AI_HELI_POWER_WEIGHT = 1.5;         // helicopter weight in army power calculation

// --- AI Scouting ---
export const AI_INTEL_UPDATE_INTERVAL = 5.0;     // seconds between intel updates (Hard uses 4.0)

// --- AI Helicopter Targeting ---
export const AI_HELICOPTER_CLUSTER_RADIUS = 150; // world units — cluster scan radius for helicopter rally
export const AI_HELI_RALLY_COMMIT_TIME = 6.0;    // seconds AI commits to a rally area before re-evaluating
export const AI_HELI_RALLY_REVAL_DISTANCE = 250;  // world units — cluster must shift this far to force early re-eval

// --- Helicopter Rally Smoothing ---
export const HELI_ORBIT_DRIFT_SPEED = 40;        // world units/sec — how fast orbit center slides toward new target

// --- AI Wall Placement Zones ---
export const AI_WALL_ZONE_MIN_ROW = 4;           // min row for ideal wall placement
export const AI_WALL_ZONE_MAX_ROW = 12;          // max row for ideal wall placement

// --- AI Turret Placement ---
export const AI_TURRET_IDEAL_DISTANCE = 3;       // tiles from nearest production building (ideal turret distance)

// --- AI Wall Repair ---
export const AI_MAX_WALL_REPAIRS_PER_TICK = 3;   // max wall repairs AI can queue per AI tick

// --- AI Wave Power ---
export const AI_WAVE_POWER = { rifle: 1.0, assault: 2.5, tank: 5.0, helicopter: 0 };

// --- Squad / Command System ---
// Stances control movement behavior
export const STANCE_ADVANCE = 'advance';   // move toward enemy base (default)
export const STANCE_DEFEND = 'defend';     // hold near own base area
export const STANCE_HOLD = 'hold';         // stop moving, fight in place
export const STANCE_RALLY = 'rally';       // move to rally point, fight nearby, hold when clear

// Target priorities control combat targeting
export const TARGET_ANY = 'any';           // default priority scoring
export const TARGET_UNITS = 'units';       // prioritize enemy units
export const TARGET_BUILDINGS = 'buildings'; // prioritize enemy structures

// Spawn stance: default orders for newly produced units (decoupled from field orders)
export const SPAWN_STANCE_DEFAULT = STANCE_DEFEND;
export const SPAWN_TARGET_DEFAULT = TARGET_ANY;

// --- Unit Selection ---
// Click detection radius for selecting ground units on the map
export const UNIT_CLICK_RADIUS = 30;           // world units — click must be within this of a unit center
// Minimum drag distance (screen pixels) to distinguish box-drag from click
export const BOX_SELECT_MIN_DRAG = 8;
// Selection highlight colors (used by unitMeshes.js)
export const SELECTION_RING_COLOR = 0xFFFFFF;   // bright white ring on selected units (blooms)
export const SQUAD_HIGHLIGHT_COLOR = 0x00FFFF;  // dimmer cyan ring on squadmates of selected unit

// Defend stance: units return to base area and actively intercept enemies
export const DEFEND_ROW_OFFSET = 6;        // rows forward from own base row (idle position)
export const DEFEND_HOLD_RADIUS = 60;      // world units — hold within this radius of defend point when idle
export const DEFEND_ZONE_RADIUS = 750;     // world units from base center — defenders chase enemies within this zone

// --- Squad Rally ---
export const SQUAD_RALLY_ENGAGE_RADIUS = 400;  // world units from rally point — units chase enemies within this
export const SQUAD_RALLY_HOLD_RADIUS = 60;     // world units — hold within this radius of rally point when idle

// --- Combat Priority Table ---
// Per-priority per-target-type scoring bonuses for unified targeting
export const COMBAT_PRIORITY_TABLE = {
  any:       { rifle: 0, assault: 0, tank: 0, helicopter: 0, turret: 0, barracks: 0, factory: 0, generator: 0, helipad: 0, wall: 0, core: 0 },
  units:     { rifle: 50, assault: 50, tank: 50, helicopter: 50, turret: -30, barracks: -30, factory: -30, generator: -30, helipad: -30, wall: -30, core: -30 },
  buildings: { rifle: -30, assault: -30, tank: -30, helicopter: -30, turret: 50, barracks: 50, factory: 50, generator: 50, helipad: 50, wall: 50, core: 50 },
  rally:     { rifle: 60, assault: 60, tank: 80, helicopter: 40, turret: 100, barracks: 20, factory: 20, generator: 20, helipad: 20, wall: 20, core: 20 },
};
export const COMBAT_WALL_BONUS = 100;
export const COMBAT_SELF_DEFENSE_BONUS = 150;
export const COMBAT_SELF_DEFENSE_RANGE = 0.5; // multiplier on attacker.range

// --- Wall Pathfinding ---
// Cost added per wall tile when using wall-aware pathfinding
// Higher = units prefer longer detours over breaking through walls
// A value of 25 means a wall is "worth" 25 tiles of detour
export const WALL_TRAVERSAL_COST = 25;

// --- AI Wall Building ---
export const AI_WALL_REPAIR_THRESHOLD = 0.5; // repair walls below this HP ratio

// --- Wall Orientations ---
export const WALL_HORIZONTAL = 'horizontal';    // wide on X, thin on Z (default)
export const WALL_VERTICAL = 'vertical';         // thin on X, wide on Z
export const WALL_CORNER_NE = 'corner_ne';       // connects north + east
export const WALL_CORNER_NW = 'corner_nw';       // connects north + west
export const WALL_CORNER_SE = 'corner_se';       // connects south + east
export const WALL_CORNER_SW = 'corner_sw';       // connects south + west

// --- Wall Demolish ---
export const WALL_DEMOLISH_REFUND_RATIO = 0.5;  // refund 50% of invested cost on voluntary demolish

// --- Air Strike ---
export const AIRSTRIKE_COST = 20000;             // energy cost to call an air strike
export const AIRSTRIKE_COOLDOWN = 120;            // seconds between air strikes per helipad
export const AIRSTRIKE_DELAY = 3.0;               // seconds from click to bomber spawn
export const AIRSTRIKE_BOMBER_SPEED = 250;        // world units per second
export const AIRSTRIKE_BOMBER_HEIGHT = 120;       // Y position of bomber
export const AIRSTRIKE_BLAST_RADIUS = 140;        // world units — full blast area
export const AIRSTRIKE_CORE_RADIUS = 40;          // world units — inner core (full damage)
export const AIRSTRIKE_MAX_DAMAGE = 2000;         // damage at center
export const AIRSTRIKE_MIN_DAMAGE = 80;           // damage at edge
export const AIRSTRIKE_MAP_MARGIN = 400;          // world units off-map where bomber spawns/despawns
// AI air strike timing
export const AI_AIRSTRIKE_MIN_TIME = 180;         // seconds — AI won't consider air strike before this
export const AI_AIRSTRIKE_ENERGY_THRESHOLD = 25000; // AI needs this much energy to consider air strike
