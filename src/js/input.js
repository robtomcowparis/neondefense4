// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — input.js
//  Mouse/touch → Raycaster → grid coordinates
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from './config.js';

// Ground plane at y=0 in XZ
const _groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _raycaster = new THREE.Raycaster();
const _mouseNDC = new THREE.Vector2();
const _hitPoint = new THREE.Vector3();

let _camera = null;
let _domElement = null;

export function initInput(camera, domElement) {
    _camera = camera;
    _domElement = domElement;
}

/** Convert DOM event position to NDC [-1,1] relative to the renderer canvas */
function _eventToNDC(event) {
    const rect = _domElement.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    _mouseNDC.x = (px / rect.width) * 2 - 1;
    _mouseNDC.y = -(py / rect.height) * 2 + 1;
}

/** Convert touch event position to NDC */
function _touchToNDC(touch) {
    const rect = _domElement.getBoundingClientRect();
    const px = touch.clientX - rect.left;
    const py = touch.clientY - rect.top;
    _mouseNDC.x = (px / rect.width) * 2 - 1;
    _mouseNDC.y = -(py / rect.height) * 2 + 1;
}

/**
 * Get grid {col, row} and world {x, y} (2D game coords) from mouse event.
 * Returns null if the ray doesn't intersect the ground plane.
 */
export function mouseEventToGrid(event) {
    if (!_camera) return null;
    _eventToNDC(event);
    return _ndcToGrid();
}

export function touchEventToGrid(touch) {
    if (!_camera) return null;
    _touchToNDC(touch);
    return _ndcToGrid();
}

function _ndcToGrid() {
    _raycaster.setFromCamera(_mouseNDC, _camera);
    const hit = _raycaster.ray.intersectPlane(_groundPlane, _hitPoint);
    if (!hit) return null;

    // _hitPoint is in world XZ — these map directly to game x/y
    const gx = _hitPoint.x;
    const gy = _hitPoint.z;

    // Clamp to map bounds for display, but don't filter (caller decides)
    const col = Math.floor(gx / TILE_SIZE);
    const row = Math.floor(gy / TILE_SIZE);

    return {
        col, row,
        x: gx,   // game-space X (same as world X)
        y: gy,   // game-space Y (same as world Z)
        worldX: _hitPoint.x,
        worldZ: _hitPoint.z,
    };
}

/** Get current mouse NDC position as {x, y} */
export function getMouseNDC() {
    return { x: _mouseNDC.x, y: _mouseNDC.y };
}
