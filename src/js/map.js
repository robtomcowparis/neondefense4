// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — map.js
//  Grid, tile management, buildable checks (no rendering)
// ═══════════════════════════════════════════════════════════════

import { TILE_SIZE, MAP_COLS, MAP_ROWS } from './config.js';
import { ALL_PATHS } from './path.js';

export class GameMap {
    constructor() {
        this.cols = MAP_COLS;
        this.rows = MAP_ROWS;
        this.pathTiles = new Set();       // "col,row" strings
        this.occupiedTiles = new Set();   // "col,row" strings
        this.pathTileOwners = {};         // "col,row" -> path_index
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
}
