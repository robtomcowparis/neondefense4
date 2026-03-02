// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — path.js
//  3-path generation algorithm
// ═══════════════════════════════════════════════════════════════

import { TILE_SIZE, MAP_COLS, MAP_ROWS } from './config.js';
import { clamp, randomInt, randomUniform } from './utils.js';

// Global path storage
export let ALL_PATHS = [];

function computePathTilesFrom(waypointsTiles) {
    const tiles = new Set();
    for (let i = 0; i < waypointsTiles.length - 1; i++) {
        const [ax, ay] = waypointsTiles[i];
        const [bx, by] = waypointsTiles[i + 1];
        if (ax === bx) {
            for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
                if (ax >= 0 && ax < MAP_COLS && y >= 0 && y < MAP_ROWS)
                    tiles.add(`${ax},${y}`);
            }
        } else {
            for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
                if (x >= 0 && x < MAP_COLS && ay >= 0 && ay < MAP_ROWS)
                    tiles.add(`${x},${ay}`);
            }
        }
    }
    return tiles;
}

function validatePath(waypointsTiles) {
    const segments = [];
    for (let i = 0; i < waypointsTiles.length - 1; i++) {
        const [ax, ay] = waypointsTiles[i];
        const [bx, by] = waypointsTiles[i + 1];
        const segTiles = new Set();
        if (ax === bx) {
            for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
                if (ax >= 0 && ax < MAP_COLS && y >= 0 && y < MAP_ROWS)
                    segTiles.add(`${ax},${y}`);
            }
        } else {
            for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
                if (x >= 0 && x < MAP_COLS && ay >= 0 && ay < MAP_ROWS)
                    segTiles.add(`${x},${ay}`);
            }
        }
        segments.push(segTiles);
    }
    // Check non-adjacent segments for shared tiles
    for (let i = 0; i < segments.length; i++) {
        for (let j = i + 2; j < segments.length; j++) {
            for (const tile of segments[i]) {
                if (segments[j].has(tile)) return false;
            }
        }
    }
    // Count total tiles
    const allTiles = new Set();
    for (const s of segments) for (const t of s) allTiles.add(t);
    if (allTiles.size > MAP_COLS * MAP_ROWS * 0.4) return false;
    return true;
}

function genConvergingPath(entryRow, exitRow) {
    const styles = ["direct_bend", "wide_sweep", "double_bend", "hook"];
    const style = styles[Math.floor(Math.random() * styles.length)];
    let wp;

    if (style === "direct_bend") {
        const bendX = randomInt(Math.floor(MAP_COLS / 4), Math.floor(MAP_COLS * 3 / 4));
        wp = [[-1, entryRow], [bendX, entryRow], [bendX, exitRow], [MAP_COLS, exitRow]];
    } else if (style === "wide_sweep") {
        const midX1 = randomInt(Math.floor(MAP_COLS / 5), Math.floor(MAP_COLS / 2) - 2);
        const midX2 = randomInt(Math.floor(MAP_COLS / 2) + 2, Math.floor(MAP_COLS * 4 / 5));
        let overshoot;
        if (entryRow < exitRow) {
            overshoot = randomInt(Math.max(1, entryRow - 5), Math.max(1, entryRow - 1));
        } else {
            overshoot = randomInt(Math.min(MAP_ROWS - 2, entryRow + 1), Math.min(MAP_ROWS - 2, entryRow + 5));
        }
        overshoot = clamp(overshoot, 1, MAP_ROWS - 2);
        wp = [[-1, entryRow], [midX1, entryRow], [midX1, overshoot],
              [midX2, overshoot], [midX2, exitRow], [MAP_COLS, exitRow]];
    } else if (style === "double_bend") {
        const bend1X = randomInt(Math.floor(MAP_COLS / 5), Math.floor(MAP_COLS * 2 / 5));
        const bend2X = randomInt(Math.floor(MAP_COLS * 3 / 5), Math.floor(MAP_COLS * 4 / 5));
        let midRow = randomInt(
            Math.min(entryRow, exitRow) - 2,
            Math.max(entryRow, exitRow) + 2
        );
        midRow = clamp(midRow, 1, MAP_ROWS - 2);
        wp = [[-1, entryRow], [bend1X, entryRow], [bend1X, midRow],
              [bend2X, midRow], [bend2X, exitRow], [MAP_COLS, exitRow]];
    } else if (style === "hook") {
        const hookX = randomInt(Math.floor(MAP_COLS / 2), MAP_COLS - 4);
        let hookRow;
        if (Math.random() < 0.5) {
            const offsets = [-4, -3, 3, 4];
            hookRow = clamp(entryRow + offsets[Math.floor(Math.random() * offsets.length)], 1, MAP_ROWS - 2);
        } else {
            const offsets = [-3, -2, 2, 3];
            hookRow = clamp(exitRow + offsets[Math.floor(Math.random() * offsets.length)], 1, MAP_ROWS - 2);
        }
        const convergeX = randomInt(Math.floor(MAP_COLS * 2 / 3), MAP_COLS - 3);
        wp = [[-1, entryRow], [hookX, entryRow], [hookX, hookRow],
              [convergeX, hookRow], [convergeX, exitRow], [MAP_COLS, exitRow]];
    } else {
        return null;
    }

    // Bounds check
    for (const [x, y] of wp) {
        if (y < 0 || y >= MAP_ROWS || x < -1 || x > MAP_COLS) return null;
    }
    if (wp[0][0] !== -1) return null;
    // Minimum segment lengths
    for (let j = 0; j < wp.length - 1; j++) {
        const [ax, ay] = wp[j];
        const [bx, by] = wp[j + 1];
        if (ax === bx && Math.abs(ay - by) < 2) return null;
        if (ay === by && Math.abs(ax - bx) < 2) return null;
    }
    return wp;
}

function generateThreePaths() {
    const exitCenter = randomInt(5, MAP_ROWS - 6);
    let exitRows = [exitCenter - 1, exitCenter, exitCenter + 1];
    // Shuffle exit rows
    for (let i = exitRows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [exitRows[i], exitRows[j]] = [exitRows[j], exitRows[i]];
    }

    const margin = 2;
    const zoneH = Math.floor((MAP_ROWS - 2 * margin) / 3);
    const entryRows = [];
    for (let i = 0; i < 3; i++) {
        const lo = margin + i * zoneH;
        const hi = margin + (i + 1) * zoneH - 1;
        entryRows.push(randomInt(lo, hi));
    }

    const paths = [];
    const allTilesSet = new Set();

    for (let i = 0; i < 3; i++) {
        let found = false;
        for (let attempt = 0; attempt < 80; attempt++) {
            const wp = genConvergingPath(entryRows[i], exitRows[i]);
            if (!wp || !validatePath(wp)) continue;
            const tiles = computePathTilesFrom(wp);
            let overlap = false;
            for (const t of tiles) {
                if (allTilesSet.has(t)) { overlap = true; break; }
            }
            if (overlap) continue;
            paths.push(wp);
            for (const t of tiles) allTilesSet.add(t);
            found = true;
            break;
        }
        if (!found) return null;
    }
    return paths;
}

export function generatePath() {
    ALL_PATHS = [];

    for (let attempt = 0; attempt < 150; attempt++) {
        const paths = generateThreePaths();
        if (paths && paths.length === 3) {
            ALL_PATHS = [];
            for (const wp of paths) {
                const wpPixels = wp.map(([tx, ty]) => [
                    tx * TILE_SIZE + TILE_SIZE / 2,
                    ty * TILE_SIZE + TILE_SIZE / 2,
                ]);
                ALL_PATHS.push({ waypoints_tiles: wp, waypoints: wpPixels });
            }
            return;
        }
    }

    // Fallback
    const exitR = Math.floor(MAP_ROWS / 2);
    const fallbacks = [
        [[-1, 3], [18, 3], [18, exitR - 1], [MAP_COLS, exitR - 1]],
        [[-1, exitR], [10, exitR], [22, exitR], [MAP_COLS, exitR]],
        [[-1, MAP_ROWS - 4], [15, MAP_ROWS - 4], [15, exitR + 1], [MAP_COLS, exitR + 1]],
    ];
    ALL_PATHS = [];
    for (const wp of fallbacks) {
        const wpPixels = wp.map(([tx, ty]) => [
            tx * TILE_SIZE + TILE_SIZE / 2,
            ty * TILE_SIZE + TILE_SIZE / 2,
        ]);
        ALL_PATHS.push({ waypoints_tiles: wp, waypoints: wpPixels });
    }
}

// Helper to get tiles as a Set of "col,row" strings for a given path
export function getPathTileSet(pathData) {
    return computePathTilesFrom(pathData.waypoints_tiles);
}
