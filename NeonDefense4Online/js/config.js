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
export const RESEARCH_TIME_BY_LEVEL = { 1: 12, 2: 18, 3: 25, 4: 35, 5: 35, 6: 35 };

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

// ─── Research Tree (branching) ───────────────────────────────
// Structure per track: tier1 → tier2 → [branch A or B] → [sub A1/A2 or B1/B2]
// Each node has: id, name, desc, cost, time, effect (additive mods)
// "effect" keys match globalMods() output fields

export const RESEARCH_TREE = {
    Damage: {
        name: "Damage",
        icon: "⚡",
        color: MAGENTA,
        tiers: [
            { id: "dmg_1", name: "Weapons I",  desc: "+8% tower damage",  cost: 600,  time: 12,
              effect: { damage_mult: 0.08 } },
            { id: "dmg_2", name: "Weapons II", desc: "+8% tower damage",  cost: 1100,  time: 18,
              effect: { damage_mult: 0.08 } },
        ],
        branches: {
            A: {
                id: "dmg_A", name: "Precision", desc: "+10% damage → Armor Pierce / Crits",
                cost: 2200, time: 25,
                effect: { damage_mult: 0.10 },
                children: {
                    1: { id: "dmg_A1", name: "Armor Piercing", desc: "Ignore 50% enemy armor",
                         cost: 3800, time: 35, effect: { armor_pierce: 0.50 } },
                    2: { id: "dmg_A2", name: "Critical Systems", desc: "10% chance to deal double damage",
                         cost: 3800, time: 35, effect: { critical_chance: 0.10 } },
                }
            },
            B: {
                id: "dmg_B", name: "Overload", desc: "+10% damage → Control Synergy / Fire Rate",
                cost: 2200, time: 25,
                effect: { damage_mult: 0.10 },
                children: {
                    1: { id: "dmg_B1", name: "Controlled Damage", desc: "+25% damage vs controlled enemies",
                         cost: 3800, time: 35, effect: { controlled_damage_bonus: 0.25 } },
                    2: { id: "dmg_B2", name: "Overdrive", desc: "+15% fire rate",
                         cost: 3800, time: 35, effect: { firerate_bonus: 0.15 } },
                }
            }
        }
    },
    Range: {
        name: "Range",
        icon: "◎",
        color: NEON_GREEN,
        tiers: [
            { id: "rng_1", name: "Sensors I",  desc: "+6% tower range",  cost: 550,  time: 12,
              effect: { range_mult: 0.06 } },
            { id: "rng_2", name: "Sensors II", desc: "+6% tower range",  cost: 1000,  time: 18,
              effect: { range_mult: 0.06 } },
        ],
        branches: {
            A: {
                id: "rng_A", name: "Long Optics", desc: "+8% range → Phase Counter / Long-range Dmg",
                cost: 2100, time: 25,
                effect: { range_mult: 0.08 },
                children: {
                    1: { id: "rng_A1", name: "Phase Scanner", desc: "Phased enemies take normal damage",
                         cost: 3500, time: 35, effect: { phase_scanner: 1 } },
                    2: { id: "rng_A2", name: "Overwatch", desc: "+20% damage beyond 75% range",
                         cost: 3500, time: 35, effect: { overwatch_bonus: 0.20 } },
                }
            },
            B: {
                id: "rng_B", name: "Wide Spectrum", desc: "+8% range → AoE Boost / Close-range Dmg",
                cost: 2100, time: 25,
                effect: { range_mult: 0.08 },
                children: {
                    1: { id: "rng_B1", name: "Field Amplifier", desc: "Cryo/Nova/Tesla AoE +25%",
                         cost: 3500, time: 35, effect: { aoe_bonus: 0.25 } },
                    2: { id: "rng_B2", name: "Proximity Boost", desc: "+25% damage to enemies within half range",
                         cost: 3500, time: 35, effect: { proximity_bonus: 0.25 } },
                }
            }
        }
    },
    Control: {
        name: "Control",
        icon: "❄",
        color: ICE_BLUE,
        tiers: [
            { id: "ctl_1", name: "Disruption I",  desc: "+10% slow/vuln/dot", cost: 650,  time: 12,
              effect: { control_mult: 0.10 } },
            { id: "ctl_2", name: "Disruption II", desc: "+10% slow/vuln/dot", cost: 1200,  time: 18,
              effect: { control_mult: 0.10 } },
        ],
        branches: {
            A: {
                id: "ctl_A", name: "Permafrost", desc: "+12% control → Longer Slows / Execute Dmg",
                cost: 2400, time: 25,
                effect: { control_mult: 0.12 },
                children: {
                    1: { id: "ctl_A1", name: "Deep Freeze", desc: "Slow effects last 50% longer",
                         cost: 4000, time: 35, effect: { slow_duration_mult: 0.50 } },
                    2: { id: "ctl_A2", name: "Shatter", desc: "Enemies below 30% HP take +40% damage",
                         cost: 4000, time: 35, effect: { execute_threshold: 0.30, execute_bonus: 0.40 } },
                }
            },
            B: {
                id: "ctl_B", name: "Corruption", desc: "+12% control → DoT Spread / Sapper Defense",
                cost: 2400, time: 25,
                effect: { control_mult: 0.12 },
                children: {
                    1: { id: "ctl_B1", name: "Cascade", desc: "DoT +60%, tick +30%, spreads on kill",
                         cost: 4000, time: 35, effect: { dot_damage_bonus: 0.60, dot_tick_bonus: 0.30, cascade_spread: 1 } },
                    2: { id: "ctl_B2", name: "Suppression Field", desc: "Controlled enemies deal 30% less to towers",
                         cost: 4000, time: 35, effect: { suppression_field: 0.30 } },
                }
            }
        }
    },
    Fortify: {
        name: "Fortify",
        icon: "🛡",
        color: CYAN,
        tiers: [
            { id: "frt_1", name: "Reinforce I",  desc: "+12% tower HP",  cost: 500,  time: 12,
              effect: { fortify_mult: 0.12 } },
            { id: "frt_2", name: "Reinforce II", desc: "+12% tower HP",  cost: 950,  time: 18,
              effect: { fortify_mult: 0.12 } },
        ],
        branches: {
            A: {
                id: "frt_A", name: "Hardened", desc: "+15% tower HP → Sapper Resist / Auto-Heal",
                cost: 2000, time: 25,
                effect: { fortify_mult: 0.15 },
                children: {
                    1: { id: "frt_A1", name: "Reactive Armor", desc: "Towers take 40% less sapper damage",
                         cost: 3200, time: 35, effect: { sapper_reduction: 0.40 } },
                    2: { id: "frt_A2", name: "Auto-Repair", desc: "Towers regen 1.5% max HP/sec",
                         cost: 3200, time: 35, effect: { tower_regen: 0.015 } },
                }
            },
            B: {
                id: "frt_B", name: "Efficiency", desc: "+15% tower HP → Rebuild Refund / Build & Fight",
                cost: 2000, time: 25,
                effect: { fortify_mult: 0.15 },
                children: {
                    1: { id: "frt_B1", name: "Emergency Overhaul", desc: "Destroyed towers refund 75%, rebuild same type 50% faster",
                         cost: 3200, time: 35, effect: { destroy_refund: 0.75, rebuild_speed: 0.50 } },
                    2: { id: "frt_B2", name: "Active Construction", desc: "Towers operate at 50% while building/upgrading",
                         cost: 3200, time: 35, effect: { active_construction: 0.50 } },
                }
            }
        }
    },
};

// Helper: iterate all nodes in a track (flat list)
export function getTrackNodes(trackKey) {
    const track = RESEARCH_TREE[trackKey];
    if (!track) return [];
    const nodes = [];
    for (const t of track.tiers) nodes.push({ ...t, depth: 'tier' });
    for (const bKey of ['A', 'B']) {
        const b = track.branches[bKey];
        nodes.push({ ...b, depth: 'branch', branchKey: bKey });
        for (const cKey of ['1', '2']) {
            const c = b.children[cKey];
            nodes.push({ ...c, depth: 'child', branchKey: bKey, childKey: cKey });
        }
    }
    return nodes;
}

// Helper: get the next purchasable node(s) for a track given current research state
export function getAvailableNodes(trackKey, researchState) {
    const track = RESEARCH_TREE[trackKey];
    if (!track) return [];
    const has = (id) => !!researchState[id];

    // Tier 1 not done?
    if (!has(track.tiers[0].id)) return [track.tiers[0]];
    // Tier 2 not done?
    if (!has(track.tiers[1].id)) return [track.tiers[1]];

    // Both tiers done — check branches
    const hasA = has(track.branches.A.id);
    const hasB = has(track.branches.B.id);

    if (!hasA && !hasB) {
        // Offer both branches as choice
        return [track.branches.A, track.branches.B];
    }

    // One branch chosen — offer its children
    const chosen = hasA ? track.branches.A : track.branches.B;
    const c1 = chosen.children['1'];
    const c2 = chosen.children['2'];
    const hasC1 = has(c1.id);
    const hasC2 = has(c2.id);

    if (!hasC1 && !hasC2) return [c1, c2];

    // Track complete
    return [];
}

// Helper: is a track fully complete?
export function isTrackComplete(trackKey, researchState) {
    return getAvailableNodes(trackKey, researchState).length === 0
        && !!researchState[RESEARCH_TREE[trackKey].tiers[0].id];
}

// Helper: count completed nodes in a track
export function getTrackProgress(trackKey, researchState) {
    const track = RESEARCH_TREE[trackKey];
    if (!track) return { done: 0, max: 4 };
    let done = 0;
    for (const t of track.tiers) if (researchState[t.id]) done++;
    for (const bKey of ['A', 'B']) {
        if (researchState[track.branches[bKey].id]) done++;
        for (const cKey of ['1', '2']) {
            if (researchState[track.branches[bKey].children[cKey].id]) done++;
        }
    }
    return { done, max: 4 }; // max reachable is 4 (tier1, tier2, branch, child)
}

// Backward compat: old RESEARCH_TRACKS (for any code that references it)
export const RESEARCH_TRACKS = {
    Damage:  { max_level: 4 },
    Range:   { max_level: 4 },
    Control: { max_level: 4 },
    Fortify: { max_level: 4 },
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
