// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — config.js
//  ALL constants, tower data, enemy data, research, colors
// ═══════════════════════════════════════════════════════════════

// ─── Map Constants ───────────────────────────────────────────
export const TILE_SIZE = 40;
export const MAP_COLS = 32;
export const MAP_ROWS = 24;
export const MAP_WIDTH = MAP_COLS * TILE_SIZE;   // 1280
export const MAP_HEIGHT = MAP_ROWS * TILE_SIZE;  // 960
export const SIDEBAR_WIDTH = 280;
export const SCREEN_WIDTH = MAP_WIDTH + SIDEBAR_WIDTH;
export const SCREEN_HEIGHT = MAP_HEIGHT;
export const FPS = 60;

// ─── Color Palette ───────────────────────────────────────────
export const BLACK        = [0, 0, 0];
export const DARK_BG      = [4, 4, 16];
export const GRID_DIM     = [15, 15, 35];
export const GRID_BRIGHT  = [25, 25, 55];
export const WHITE        = [255, 255, 255];
export const SOFT_WHITE   = [200, 200, 220];
export const CYAN         = [0, 255, 255];
export const MAGENTA      = [255, 0, 255];
export const ELECTRIC_BLUE= [80, 120, 255];
export const NEON_BLUE    = ELECTRIC_BLUE;
export const HOT_PINK     = [255, 50, 150];
export const NEON_GREEN   = [50, 255, 100];
export const NEON_ORANGE  = [255, 160, 40];
export const ICE_BLUE     = [150, 220, 255];
export const YELLOW       = [255, 255, 60];
export const RED          = [255, 50, 50];
export const PATH_COLOR   = [20, 60, 80];
export const PATH_GLOW    = [0, 180, 200];
export const VALID_TILE   = [0, 80, 0, 80];
export const INVALID_TILE = [80, 0, 0, 80];
export const SIDEBAR_BG   = [8, 8, 24];
export const PANEL_BG     = [8, 8, 24];
export const NEON_PINK    = [255, 50, 150];
export const PANEL_BORDER = [0, 180, 200];
export const GOLD_COLOR   = [255, 215, 0];
export const ARMOR_GRAY   = [180, 180, 200];
export const HEAL_GREEN   = [100, 255, 150];
export const SPRINT_TEAL  = [0, 200, 180];
export const BOSS_PURPLE  = [200, 50, 255];
export const ULTRA_RED    = [255, 30, 80];
export const SAPPER_RED   = [255, 80, 40];
export const DAMAGE_RED   = [255, 40, 40];

// Path color palette — each path gets a slightly different hue
export const PATH_COLORS = [
    [[20, 60, 80],  [0, 180, 200]],   // cyan
    [[60, 20, 70],  [180, 50, 220]],   // purple
    [[20, 70, 30],  [50, 220, 80]],    // green
];

// ─── Tower Types ─────────────────────────────────────────────
export const TowerType = {
    PULSE: 'PULSE',
    RAIL:  'RAIL',
    TESLA: 'TESLA',
    CRYO:  'CRYO',
    NOVA:  'NOVA',
};
export const TOWER_TYPES_ORDERED = [TowerType.PULSE, TowerType.RAIL, TowerType.TESLA, TowerType.CRYO, TowerType.NOVA];

// ─── Tower Data ──────────────────────────────────────────────
export const TOWER_DATA = {
    [TowerType.PULSE]: {
        name: "Pulse", description: "Rapid-fire energy bolts", color: CYAN, cost: 100,
        hp: 200,
        levels: [
            { damage: 12, fire_rate: 0.35, range: 120, upgrade_cost: 0 },
            { damage: 20, fire_rate: 0.28, range: 135, upgrade_cost: 75 },
            { damage: 32, fire_rate: 0.20, range: 155, upgrade_cost: 150 },
        ],
        branches: {
            A: { name: "Overclock", desc: "Insane fire rate",
                 cost: 450, damage: 28, fire_rate: 0.09, range: 160 },
            B: { name: "Heavy Bolts", desc: "Splash on hit",
                 cost: 500, damage: 55, fire_rate: 0.25, range: 165, splash_radius: 50, splash_damage: 25 },
        },
    },
    [TowerType.RAIL]: {
        name: "Rail", description: "Fixed-aim piercing beam", color: MAGENTA, cost: 150,
        hp: 250,
        levels: [
            { damage: 45, fire_rate: 1.4, range: 200, pierce: 3, upgrade_cost: 0 },
            { damage: 70, fire_rate: 1.2, range: 230, pierce: 4, upgrade_cost: 120 },
            { damage: 110, fire_rate: 0.95, range: 260, pierce: 6, upgrade_cost: 220 },
        ],
        branches: {
            A: { name: "Longline", desc: "Extreme range & pierce",
                 cost: 550, damage: 130, fire_rate: 0.9, range: 350, pierce: 10 },
            B: { name: "Capacitor", desc: "Massive single hit",
                 cost: 600, damage: 300, fire_rate: 1.8, range: 240, pierce: 1 },
        },
    },
    [TowerType.TESLA]: {
        name: "Tesla", description: "Chain lightning arcs", color: ELECTRIC_BLUE, cost: 180,
        hp: 220,
        levels: [
            { damage: 18, fire_rate: 0.7, range: 130, chains: 3, chain_range: 80, upgrade_cost: 0 },
            { damage: 32, fire_rate: 0.55, range: 150, chains: 4, chain_range: 95, upgrade_cost: 130 },
            { damage: 52, fire_rate: 0.40, range: 170, chains: 6, chain_range: 110, upgrade_cost: 240 },
        ],
        branches: {
            A: { name: "Arc Web", desc: "Many chains, wide spread",
                 cost: 600, damage: 48, fire_rate: 0.30, range: 185, chains: 10, chain_range: 140 },
            B: { name: "Burn", desc: "Chains apply DoT",
                 cost: 650, damage: 62, fire_rate: 0.42, range: 175, chains: 5, chain_range: 110,
                 dot_damage: 24, dot_duration: 3.5 },
        },
    },
    [TowerType.CRYO]: {
        name: "Cryo", description: "Slows enemies in area", color: ICE_BLUE, cost: 160,
        hp: 150,
        levels: [
            { damage: 3, fire_rate: 0.8, range: 100, slow_factor: 0.72, slow_duration: 1.2, upgrade_cost: 0 },
            { damage: 5, fire_rate: 0.65, range: 115, slow_factor: 0.62, slow_duration: 1.5, upgrade_cost: 120 },
            { damage: 9, fire_rate: 0.5, range: 130, slow_factor: 0.50, slow_duration: 1.8, upgrade_cost: 220 },
        ],
        branches: {
            A: { name: "Deep Freeze", desc: "Powerful slow, large area",
                 cost: 500, damage: 8, fire_rate: 0.45, range: 155, slow_factor: 0.30, slow_duration: 2.5 },
            B: { name: "Brittle", desc: "Slowed take +50% dmg",
                 cost: 550, damage: 12, fire_rate: 0.55, range: 135, slow_factor: 0.55, slow_duration: 1.6,
                 vulnerability: 1.5 },
        },
    },
    [TowerType.NOVA]: {
        name: "Nova", description: "Periodic radial burst", color: HOT_PINK, cost: 300,
        hp: 400,
        levels: [
            { damage: 45, fire_rate: 2.8, range: 140, upgrade_cost: 0 },
            { damage: 80, fire_rate: 2.1, range: 165, upgrade_cost: 180 },
            { damage: 135, fire_rate: 1.6, range: 195, upgrade_cost: 340 },
        ],
        branches: {
            A: { name: "Shockwave", desc: "Huge radius",
                 cost: 700, damage: 140, fire_rate: 1.5, range: 300 },
            B: { name: "Focused Core", desc: "Small but devastating",
                 cost: 750, damage: 380, fire_rate: 1.7, range: 145 },
        },
    },
};

// HP multipliers for tower upgrades
export const TOWER_HP_PER_LEVEL = 0.15;    // +15% per upgrade level
export const TOWER_HP_BRANCH_BONUS = 0.50; // +50% for branched towers

// Build / upgrade / repair timers (seconds)
export const BUILD_TIMES = {
    [TowerType.PULSE]: 5,
    [TowerType.RAIL]:  7,
    [TowerType.TESLA]: 8,
    [TowerType.CRYO]:  7,
    [TowerType.NOVA]: 10,
};
export const UPGRADE_TIME_BY_LEVEL = { 1: 5, 2: 8 };
export const BRANCH_TIME = 12;
export const REPAIR_TIME_BASE = 3;
export const REPAIR_TIME_MAX = 6;
export const RESEARCH_TIME_BY_LEVEL = { 1: 8, 2: 10, 3: 12, 4: 15, 5: 15, 6: 15 };

// Shield system (available after branching)
export const SHIELD_HP_MULT = 2.40;       // Shield HP = 240% of tower max HP
export const SHIELD_COST_MULT = 0.50;     // Cost = 50% of total invested gold
export const SHIELD_BUILD_TIME = 6;       // Seconds to deploy shield
export const SHIELD_COLOR = [100, 180, 255];

// Construction bar colors
export const BUILD_BAR_COLOR    = CYAN;
export const UPGRADE_BAR_COLOR  = NEON_GREEN;
export const BRANCH_BAR_COLOR   = GOLD_COLOR;
export const REPAIR_BAR_COLOR   = HEAL_GREEN;
export const RESEARCH_BAR_COLOR = ELECTRIC_BLUE;

// ─── Enemy Types ─────────────────────────────────────────────
export const EnemyType = {
    DRONE: 'DRONE',
    SWARM: 'SWARM',
    TANK: 'TANK',
    PHASE: 'PHASE',
    SPLITTER: 'SPLITTER',
    SPLITTER_CHILD: 'SPLITTER_CHILD',
    ARMORED: 'ARMORED',
    HEALER: 'HEALER',
    SPRINTER: 'SPRINTER',
    BOSS: 'BOSS',
    ULTRA_BOSS: 'ULTRA_BOSS',
    SAPPER: 'SAPPER',
};

// ─── Enemy Data ──────────────────────────────────────────────
export const ENEMY_DATA = {
    [EnemyType.DRONE]:    { name: "Drone",    health: 130, speed: 60,  reward: 14,  color: NEON_GREEN,       size: 8,  lives_cost: 1 },
    [EnemyType.SWARM]:    { name: "Swarm",    health: 55,  speed: 95,  reward: 5,   color: YELLOW,           size: 5,  lives_cost: 1 },
    [EnemyType.TANK]:     { name: "Tank",     health: 700, speed: 32,  reward: 35,  color: RED,              size: 13, lives_cost: 3 },
    [EnemyType.PHASE]:    { name: "Phase",    health: 220, speed: 55,  reward: 22,  color: [180, 100, 255],  size: 9,  lives_cost: 2,
                            phase_on: 1.5, phase_off: 2.5, phase_reduction: 0.2 },
    [EnemyType.SPLITTER]: { name: "Splitter", health: 180, speed: 48,  reward: 20,  color: NEON_ORANGE,      size: 11, lives_cost: 1, split_count: 3 },
    [EnemyType.SPLITTER_CHILD]: { name: "Shard", health: 60, speed: 80, reward: 5,  color: [255, 200, 80],  size: 5,  lives_cost: 1 },
    [EnemyType.ARMORED]:  { name: "Armored",  health: 450, speed: 38,  reward: 28,  color: ARMOR_GRAY,       size: 12, lives_cost: 2, armor: 8 },
    [EnemyType.HEALER]:   { name: "Healer",   health: 160, speed: 45,  reward: 30,  color: HEAL_GREEN,       size: 9,  lives_cost: 2,
                            heal_amount: 12, heal_range: 100, heal_rate: 0.8 },
    [EnemyType.SPRINTER]: { name: "Sprinter", health: 180, speed: 50,  reward: 18,  color: SPRINT_TEAL,      size: 8,  lives_cost: 1,
                            sprint_speed: 160, sprint_duration: 0.8, sprint_cooldown: 3.0 },
    [EnemyType.BOSS]:     { name: "BOSS",     health: 4000,speed: 24,  reward: 200, color: BOSS_PURPLE,      size: 18, lives_cost: 8, armor: 4 },
    [EnemyType.ULTRA_BOSS]: { name: "OVERLORD",health: 6500,speed: 18, reward: 600, color: ULTRA_RED,       size: 22, lives_cost: 15, armor: 6,
                            attack_damage: 0, attack_range: 0, attack_rate: 99, miss_chance: 1.0 },
    [EnemyType.SAPPER]:   { name: "Sapper",   health: 250, speed: 42,  reward: 28,  color: SAPPER_RED,       size: 10, lives_cost: 2,
                            attack_damage: 8, attack_range: 130, attack_rate: 2.2, miss_chance: 0.35 },
};

// ─── Research Tracks ─────────────────────────────────────────
export const RESEARCH_TRACKS = {
    Damage:  { max_level: 6, base_cost: 350, cost_mult: 1.65, per_level: 0.08 },  // +8% dmg
    Range:   { max_level: 6, base_cost: 320, cost_mult: 1.60, per_level: 0.06 },  // +6% range
    Control: { max_level: 6, base_cost: 380, cost_mult: 1.65, per_level: 0.10 },  // +10% slow/vuln/dot
    Fortify: { max_level: 6, base_cost: 300, cost_mult: 1.60, per_level: 0.12 },  // +12% tower HP
};

// ─── Economy Constants ───────────────────────────────────────
export const STARTING_GOLD = 1000;
export const STARTING_LIVES = 30;
export const REWARD_DECAY_PER_WAVE = 0.012;
export const REWARD_DECAY_STOP_WAVE = 25;    // Reward mult stops decaying after this wave
export const MIN_REWARD_MULT = 0.50;
export const WAVE_CLEAR_BASE_BONUS = 70;
export const WAVE_CLEAR_BONUS_PER_WAVE = 20;
export const WAVE_CLEAR_LATE_BONUS_PER_WAVE = 40; // Extra per wave after wave 25
export const COST_INFLATION_PER_WAVE = 0.020;
export const MAX_COST_MULT = 2.5;

// ─── Game States ─────────────────────────────────────────────
export const GameState = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
};
