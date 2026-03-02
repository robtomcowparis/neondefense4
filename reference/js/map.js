// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — map.js
//  Grid, tile management, buildable checks, path rendering
// ═══════════════════════════════════════════════════════════════

import { TILE_SIZE, MAP_COLS, MAP_ROWS, MAP_WIDTH, MAP_HEIGHT,
         GRID_DIM, GRID_BRIGHT, PATH_COLORS } from './config.js';
import { rgba, clamp } from './utils.js';
import { ALL_PATHS } from './path.js';

export class GameMap {
    constructor() {
        this.cols = MAP_COLS;
        this.rows = MAP_ROWS;
        this.pathTiles = new Set();       // "col,row" strings
        this.occupiedTiles = new Set();   // "col,row" strings
        this.pathTileOwners = {};         // "col,row" -> path_index
        this.pathPulseTime = 0;
        this._computePathTiles();
    }

    _computePathTiles() {
        this.pathTiles.clear();
        this.pathTileOwners = {};
        for (let pi = 0; pi < ALL_PATHS.length; pi++) {
            const wpt = ALL_PATHS[pi].waypoints_tiles;
            for (let i = 0; i < wpt.length - 1; i++) {
                const [ax, ay] = wpt[i];
                const [bx, by] = wpt[i + 1];
                if (ax === bx) {
                    for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
                        if (ax >= 0 && ax < this.cols && y >= 0 && y < this.rows) {
                            const key = `${ax},${y}`;
                            this.pathTiles.add(key);
                            if (!(key in this.pathTileOwners)) this.pathTileOwners[key] = pi;
                        }
                    }
                } else {
                    for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
                        if (x >= 0 && x < this.cols && ay >= 0 && ay < this.rows) {
                            const key = `${x},${ay}`;
                            this.pathTiles.add(key);
                            if (!(key in this.pathTileOwners)) this.pathTileOwners[key] = pi;
                        }
                    }
                }
            }
        }
    }

    isBuildable(col, row) {
        if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return false;
        const key = `${col},${row}`;
        return !this.pathTiles.has(key) && !this.occupiedTiles.has(key);
    }

    placeTower(col, row) {
        this.occupiedTiles.add(`${col},${row}`);
    }

    removeTower(col, row) {
        this.occupiedTiles.delete(`${col},${row}`);
    }

    tileCenter(col, row) {
        return [col * TILE_SIZE + TILE_SIZE / 2, row * TILE_SIZE + TILE_SIZE / 2];
    }

    draw(ctx, dt) {
        this.pathPulseTime += dt;
        const pulse = 0.5 + 0.5 * Math.sin(this.pathPulseTime * 2.5);

        // Grid lines
        ctx.strokeStyle = rgba(GRID_DIM, 1);
        ctx.lineWidth = 1;
        for (let c = 0; c <= this.cols; c++) {
            ctx.beginPath();
            ctx.moveTo(c * TILE_SIZE, 0);
            ctx.lineTo(c * TILE_SIZE, MAP_HEIGHT);
            ctx.stroke();
        }
        for (let r = 0; r <= this.rows; r++) {
            ctx.beginPath();
            ctx.moveTo(0, r * TILE_SIZE);
            ctx.lineTo(MAP_WIDTH, r * TILE_SIZE);
            ctx.stroke();
        }

        // Path tiles with per-path coloring
        for (const key of this.pathTiles) {
            const [c, r] = key.split(',').map(Number);
            const pi = this.pathTileOwners[key] || 0;
            const [pColor, pGlow] = PATH_COLORS[pi % PATH_COLORS.length];
            const rx = c * TILE_SIZE;
            const ry = r * TILE_SIZE;

            const glow = [
                Math.round(pColor[0] + (pGlow[0] - pColor[0]) * pulse * 0.4),
                Math.round(pColor[1] + (pGlow[1] - pColor[1]) * pulse * 0.4),
                Math.round(pColor[2] + (pGlow[2] - pColor[2]) * pulse * 0.4),
            ];
            ctx.fillStyle = rgba(glow, 1);
            ctx.fillRect(rx, ry, TILE_SIZE, TILE_SIZE);

            const bright = [
                Math.round(GRID_BRIGHT[0] + (pGlow[0] - GRID_BRIGHT[0]) * pulse * 0.3),
                Math.round(GRID_BRIGHT[1] + (pGlow[1] - GRID_BRIGHT[1]) * pulse * 0.3),
                Math.round(GRID_BRIGHT[2] + (pGlow[2] - GRID_BRIGHT[2]) * pulse * 0.3),
            ];
            ctx.strokeStyle = rgba(bright, 1);
            ctx.lineWidth = 1;
            ctx.strokeRect(rx, ry, TILE_SIZE, TILE_SIZE);
        }

        // Conduit lines for each path
        for (let pi = 0; pi < ALL_PATHS.length; pi++) {
            const waypoints = ALL_PATHS[pi].waypoints;
            const [, pGlow] = PATH_COLORS[pi % PATH_COLORS.length];
            const conduitColor = [
                Math.round(pGlow[0] * (0.3 + 0.4 * pulse)),
                Math.round(pGlow[1] * (0.3 + 0.4 * pulse)),
                Math.round(pGlow[2] * (0.3 + 0.4 * pulse)),
            ];
            ctx.strokeStyle = rgba(conduitColor, 1);
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < waypoints.length; i++) {
                const x = clamp(waypoints[i][0], 0, MAP_WIDTH);
                const y = clamp(waypoints[i][1], 0, MAP_HEIGHT);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
}
