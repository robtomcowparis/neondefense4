// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/grid.js
//  3D grid lines, path tile meshes, conduit center-lines
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { TILE_SIZE, MAP_COLS, MAP_ROWS, MAP_WIDTH, MAP_HEIGHT,
         GRID_DIM, PATH_COLORS } from '../config.js';
import { ALL_PATHS } from '../path.js';
import { scene, toColor } from './scene.js';

var gridGroup = null;
var pathTileMeshes = [];   // { mesh, pathIndex } per path tile
var conduitLines = [];     // Line objects per path
var pulseTime = 0;

export function initGrid() {
    if (gridGroup) {
        gridGroup.traverse(function(obj) {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(function(m) { m.dispose(); });
                else obj.material.dispose();
            }
        });
        scene.remove(gridGroup);
    }
    gridGroup = new THREE.Group();
    pathTileMeshes = [];
    conduitLines = [];

    _buildGridLines();
    _buildPathTiles();
    _buildConduitLines();

    // Dark ground plane — gives empty tiles a visible dark surface
    var groundGeo = new THREE.PlaneGeometry(MAP_WIDTH, MAP_HEIGHT);
    var groundMat = new THREE.MeshStandardMaterial({
        color: 0x060610,
        metalness: 0.1,
        roughness: 0.9,
    });
    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(MAP_WIDTH / 2, -0.1, MAP_HEIGHT / 2);
    gridGroup.add(ground);

    scene.add(gridGroup);
}

function _buildGridLines() {
    var gridColor = toColor(GRID_DIM);
    var material = new THREE.LineBasicMaterial({ color: gridColor });

    var points = [];
    // Vertical lines (along Z axis)
    for (var c = 0; c <= MAP_COLS; c++) {
        var x = c * TILE_SIZE;
        points.push(new THREE.Vector3(x, 0, 0));
        points.push(new THREE.Vector3(x, 0, MAP_HEIGHT));
    }
    // Horizontal lines (along X axis)
    for (var r = 0; r <= MAP_ROWS; r++) {
        var z = r * TILE_SIZE;
        points.push(new THREE.Vector3(0, 0, z));
        points.push(new THREE.Vector3(MAP_WIDTH, 0, z));
    }

    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    // Use LineSegments (pairs of points)
    var lineSegs = new THREE.LineSegments(geometry, material);
    lineSegs.position.y = 0.1; // slightly above ground
    gridGroup.add(lineSegs);
}

function _buildPathTiles() {
    if (ALL_PATHS.length === 0) return;

    for (var pi = 0; pi < ALL_PATHS.length; pi++) {
        var wpt = ALL_PATHS[pi].waypoints_tiles;
        var tilesToRender = new Set();

        for (var i = 0; i < wpt.length - 1; i++) {
            var ax = wpt[i][0], ay = wpt[i][1];
            var bx = wpt[i + 1][0], by = wpt[i + 1][1];
            if (ax === bx) {
                for (var y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
                    if (ax >= 0 && ax < MAP_COLS && y >= 0 && y < MAP_ROWS) {
                        tilesToRender.add(ax + ',' + y);
                    }
                }
            } else {
                for (var x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
                    if (x >= 0 && x < MAP_COLS && ay >= 0 && ay < MAP_ROWS) {
                        tilesToRender.add(x + ',' + ay);
                    }
                }
            }
        }

        var pColor = PATH_COLORS[pi % PATH_COLORS.length][0];
        var color = toColor(pColor);

        tilesToRender.forEach(function(key) {
            var parts = key.split(',');
            var c = Number(parts[0]), r = Number(parts[1]);
            var cx = c * TILE_SIZE + TILE_SIZE / 2;
            var cz = r * TILE_SIZE + TILE_SIZE / 2;

            var geo = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
            var mat = new THREE.MeshStandardMaterial({
                color: color.clone().multiplyScalar(0.15),
                metalness: 0.3,
                roughness: 0.8,
                emissive: color.clone().multiplyScalar(0.08),
                emissiveIntensity: 1.0,
                side: THREE.DoubleSide,
            });
            var mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.set(cx, 0.05, cz);
            gridGroup.add(mesh);
            pathTileMeshes.push({ mesh: mesh, pathIndex: pi, baseColor: pColor });
        });
    }
}

function _buildConduitLines() {
    for (var pi = 0; pi < ALL_PATHS.length; pi++) {
        var waypoints = ALL_PATHS[pi].waypoints;
        var pGlow = PATH_COLORS[pi % PATH_COLORS.length][1];

        var pts = waypoints.map(function(wp) { return new THREE.Vector3(wp[0], 0.5, wp[1]); });
        var geo = new THREE.BufferGeometry().setFromPoints(pts);
        var mat = new THREE.LineBasicMaterial({ color: toColor(pGlow) });
        var line = new THREE.Line(geo, mat);
        gridGroup.add(line);
        conduitLines.push({ line: line, pathIndex: pi, glowColor: pGlow });
    }
}

export function updateGrid(dt) {
    pulseTime += dt;
    var pulse = 0.5 + 0.5 * Math.sin(pulseTime * 2.5);

    // Update path tile emissive colors
    for (var i = 0; i < pathTileMeshes.length; i++) {
        var entry = pathTileMeshes[i];
        var mesh = entry.mesh;
        var pathIndex = entry.pathIndex;
        var colors = PATH_COLORS[pathIndex % PATH_COLORS.length];
        var pColor = colors[0], pGlow = colors[1];
        var emR = (pColor[0] + (pGlow[0] - pColor[0]) * pulse * 0.3) / 255 * 0.12;
        var emG = (pColor[1] + (pGlow[1] - pColor[1]) * pulse * 0.3) / 255 * 0.12;
        var emB = (pColor[2] + (pGlow[2] - pColor[2]) * pulse * 0.3) / 255 * 0.12;
        mesh.material.emissive.setRGB(emR, emG, emB);
    }

    // Update conduit line brightness
    for (var j = 0; j < conduitLines.length; j++) {
        var cEntry = conduitLines[j];
        var line = cEntry.line;
        var cPathIndex = cEntry.pathIndex;
        var cPGlow = PATH_COLORS[cPathIndex % PATH_COLORS.length][1];
        var factor = 0.3 + 0.4 * pulse;
        line.material.color.setRGB(
            (cPGlow[0] * factor) / 255,
            (cPGlow[1] * factor) / 255,
            (cPGlow[2] * factor) / 255
        );
    }
}

// Show tile highlight for tower placement preview — reuse a single mesh to avoid per-frame allocations
var _previewMesh = null;
var _previewMat = null;
export function showTilePlacementPreview(col, row, valid) {
    if (col < 0 || row < 0) { hideTilePlacementPreview(); return; }
    if (!_previewMesh) {
        var geo = new THREE.PlaneGeometry(TILE_SIZE - 2, TILE_SIZE - 2);
        _previewMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false });
        _previewMesh = new THREE.Mesh(geo, _previewMat);
        _previewMesh.rotation.x = -Math.PI / 2;
        scene.add(_previewMesh);
    }
    _previewMat.color.set(valid ? 0x008000 : 0x800000);
    _previewMesh.position.set(col * TILE_SIZE + TILE_SIZE / 2, 1.0, row * TILE_SIZE + TILE_SIZE / 2);
}

export function hideTilePlacementPreview() {
    if (_previewMesh) {
        scene.remove(_previewMesh);
        _previewMesh.geometry.dispose();
        _previewMat.dispose();
        _previewMesh = null;
        _previewMat = null;
    }
}
