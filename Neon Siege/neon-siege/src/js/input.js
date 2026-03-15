// ============================================================
// input.js — Mouse/touch raycaster input
// ============================================================

import * as THREE from 'three';
import { TILE_SIZE, HELI_FLY_HEIGHT, BTYPE_WALL, BOX_SELECT_MIN_DRAG } from './config.js';
import { worldToGrid, dist } from './utils.js';

let renderer = null;
let camera = null;
let raycaster = null;
let mouse = null;
let hoveredTile = null;
let placementMode = null;
let clickCallback = null;
let selectCallback = null;
let cameraSnapCallback = null;
let minimapClickCallback = null;
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const heliPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -HELI_FLY_HEIGHT);
const intersection = new THREE.Vector3();
const heliIntersection = new THREE.Vector3();

// --- Helicopter selection state ---
let selectedHelicopterId = null;
let helicopterRallyCallback = null;
let getHelicoptersCallback = null;

// --- Squad rally placement state ---
let _squadRallyPending = null;  // squad ID (number), 'all', or null
let squadRallyCallback = null;

// --- Air strike targeting state ---
let _airStrikePending = null;   // building ID or null
let airStrikeCallback = null;

// --- Wall drag-to-place state ---
let _isDragging = false;
let dragStartTile = null;       // {col, row}
let dragCurrentTiles = [];      // array of {col, row}
let dragPlaceCallback = null;

// --- Box-drag selection state ---
let boxSelectCallback = null;
let _boxDragStartScreen = null;  // {x, y} screen pixels
let _boxDragEndScreen = null;    // {x, y} screen pixels
let _isBoxDragging = false;

let orbitControls = null;

export function initInput(rendererInstance, cameraInstance, controlsInstance) {
  renderer = rendererInstance;
  camera = cameraInstance;
  orbitControls = controlsInstance || null;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const canvas = renderer.domElement;
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('contextmenu', onRightClick);

  // Camera home key listener
  document.addEventListener('keydown', onKeyDown);
}

function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.ray.intersectPlane(groundPlane, intersection);

  if (hit) {
    hoveredTile = worldToGrid(intersection.x, intersection.z, TILE_SIZE);
  } else {
    hoveredTile = null;
  }

  // Update drag tiles while dragging walls
  if (_isDragging && dragStartTile && hoveredTile) {
    dragCurrentTiles = computeDragLine(dragStartTile, hoveredTile);
  }

  // Track box-drag selection
  if (_boxDragStartScreen) {
    _boxDragEndScreen = { x: event.clientX, y: event.clientY };
    const dx = event.clientX - _boxDragStartScreen.x;
    const dy = event.clientY - _boxDragStartScreen.y;
    if (!_isBoxDragging && Math.sqrt(dx * dx + dy * dy) > BOX_SELECT_MIN_DRAG) {
      _isBoxDragging = true;
    }
  }
}

function onMouseDown(event) {
  // Only handle left mouse button
  if (event.button !== 0) return;

  // If in wall placement mode, start drag and freeze camera
  if (placementMode === BTYPE_WALL && hoveredTile) {
    _isDragging = true;
    dragStartTile = { col: hoveredTile.col, row: hoveredTile.row };
    dragCurrentTiles = [{ col: hoveredTile.col, row: hoveredTile.row }];
    if (orbitControls) orbitControls.enabled = false;
    return;
  }

  // Start tracking potential box-drag if Shift is held and NOT in build mode, wall-drag, squad rally, air strike, or helicopter mode
  if (event.shiftKey && !placementMode && !_isDragging && _squadRallyPending == null && _airStrikePending == null && selectedHelicopterId == null) {
    _boxDragStartScreen = { x: event.clientX, y: event.clientY };
    _boxDragEndScreen = null;
    _isBoxDragging = false;
    // Disable orbit controls immediately so shift-drag doesn't also rotate
    if (orbitControls) orbitControls.enabled = false;
  }
}

function onMouseUp(event) {
  // Only handle left mouse button
  if (event.button !== 0) return;

  // If we were dragging walls, finalize placement
  if (_isDragging) {
    if (dragCurrentTiles.length > 0 && dragPlaceCallback) {
      dragPlaceCallback(dragCurrentTiles);
    }
    cancelDrag();
    return;
  }

  // If box-drag selection completed, raycast corners and call boxSelectCallback
  if (_isBoxDragging && _boxDragStartScreen && _boxDragEndScreen) {
    const rect = renderer.domElement.getBoundingClientRect();
    const startWorld = screenToGround(_boxDragStartScreen.x, _boxDragStartScreen.y, rect);
    const endWorld = screenToGround(_boxDragEndScreen.x, _boxDragEndScreen.y, rect);
    if (startWorld && endWorld && boxSelectCallback) {
      const x1 = Math.min(startWorld.x, endWorld.x);
      const z1 = Math.min(startWorld.z, endWorld.z);
      const x2 = Math.max(startWorld.x, endWorld.x);
      const z2 = Math.max(startWorld.z, endWorld.z);
      boxSelectCallback(x1, z1, x2, z2);
    }
    cancelBoxDrag();
    return;
  }

  // Clear box-drag tracking (was a click, not a drag)
  cancelBoxDrag();

  // --- Everything below is the original onClick behavior ---

  // If air strike targeting is pending, click sets the target
  if (_airStrikePending != null && hoveredTile) {
    const worldX = hoveredTile.col * TILE_SIZE + TILE_SIZE / 2;
    const worldZ = hoveredTile.row * TILE_SIZE + TILE_SIZE / 2;
    if (airStrikeCallback) {
      airStrikeCallback(_airStrikePending, worldX, worldZ);
    }
    _airStrikePending = null;
    return;
  }

  // If squad rally placement is pending, click sets the rally point
  if (_squadRallyPending != null && hoveredTile) {
    const worldX = hoveredTile.col * TILE_SIZE + TILE_SIZE / 2;
    const worldZ = hoveredTile.row * TILE_SIZE + TILE_SIZE / 2;
    if (squadRallyCallback) {
      squadRallyCallback(_squadRallyPending, worldX, worldZ);
    }
    _squadRallyPending = null;
    return;
  }

  // If a helicopter is selected, click sets rally point
  if (selectedHelicopterId != null && hoveredTile) {
    const worldX = hoveredTile.col * TILE_SIZE + TILE_SIZE / 2;
    const worldZ = hoveredTile.row * TILE_SIZE + TILE_SIZE / 2;
    if (helicopterRallyCallback) {
      helicopterRallyCallback(selectedHelicopterId, worldX, worldZ);
    }
    selectedHelicopterId = null;
    return;
  }

  // If not in placement mode, check if click is near a helicopter
  // Intersect at helicopter flight altitude so screen position matches
  if (!placementMode && getHelicoptersCallback) {
    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.ray.intersectPlane(heliPlane, heliIntersection);
    if (hit) {
      const helis = getHelicoptersCallback();
      for (const heli of helis) {
        if (dist(heliIntersection.x, heliIntersection.z, heli.x, heli.z) < 35) {
          selectedHelicopterId = heli.id;
          // Signal helicopter selection to main via selectCallback with special coords
          if (selectCallback) selectCallback(-2, -2, 0, 0);
          return;
        }
      }
    }
  }

  // Normal build placement or building selection
  if (placementMode && hoveredTile && clickCallback) {
    clickCallback(hoveredTile.col, hoveredTile.row, placementMode);
  } else if (!placementMode && hoveredTile && selectCallback) {
    // Click on a tile while not in build mode — try to select building or unit
    const worldX = hoveredTile.col * TILE_SIZE + TILE_SIZE / 2;
    const worldZ = hoveredTile.row * TILE_SIZE + TILE_SIZE / 2;
    selectCallback(hoveredTile.col, hoveredTile.row, worldX, worldZ);
  }
}

// Compute axis-aligned line of tiles from start to current
function computeDragLine(start, current) {
  const tiles = [];
  const deltaCol = current.col - start.col;
  const deltaRow = current.row - start.row;

  if (Math.abs(deltaCol) >= Math.abs(deltaRow)) {
    // Horizontal line — same row as start
    const minC = Math.min(start.col, current.col);
    const maxC = Math.max(start.col, current.col);
    for (let c = minC; c <= maxC; c++) {
      tiles.push({ col: c, row: start.row });
    }
  } else {
    // Vertical line — same col as start
    const minR = Math.min(start.row, current.row);
    const maxR = Math.max(start.row, current.row);
    for (let r = minR; r <= maxR; r++) {
      tiles.push({ col: start.col, row: r });
    }
  }
  return tiles;
}

function cancelDrag() {
  _isDragging = false;
  dragStartTile = null;
  dragCurrentTiles = [];
  if (orbitControls) orbitControls.enabled = true;
}

function cancelBoxDrag() {
  const wasTracking = _boxDragStartScreen != null;
  _boxDragStartScreen = null;
  _boxDragEndScreen = null;
  _isBoxDragging = false;
  if (wasTracking && orbitControls) orbitControls.enabled = true;
}

// Raycast a screen pixel position to the ground plane, return {x, z} or null
function screenToGround(screenX, screenY, rect) {
  const ndc = new THREE.Vector2(
    ((screenX - rect.left) / rect.width) * 2 - 1,
    -((screenY - rect.top) / rect.height) * 2 + 1
  );
  const rc = new THREE.Raycaster();
  rc.setFromCamera(ndc, camera);
  const hit = new THREE.Vector3();
  if (rc.ray.intersectPlane(groundPlane, hit)) {
    return { x: hit.x, z: hit.z };
  }
  return null;
}

function onKeyDown(event) {
  if (event.key === 'h' || event.key === 'H' || event.key === 'Home') {
    if (cameraSnapCallback) cameraSnapCallback();
  }
  // Escape cancels drag, box-drag, squad rally, or deselects helicopter
  if (event.key === 'Escape') {
    if (_isBoxDragging || _boxDragStartScreen) {
      cancelBoxDrag();
      return;
    }
    if (_isDragging) {
      cancelDrag();
      return;
    }
    if (_airStrikePending != null) {
      _airStrikePending = null;
      return;
    }
    if (_squadRallyPending != null) {
      _squadRallyPending = null;
      return;
    }
    if (selectedHelicopterId != null) {
      selectedHelicopterId = null;
    }
  }
}

function onRightClick(event) {
  event.preventDefault();

  // Right click cancels box-drag if active
  if (_isBoxDragging || _boxDragStartScreen) {
    cancelBoxDrag();
    return;
  }

  // Right click cancels wall drag if active
  if (_isDragging) {
    cancelDrag();
    return;
  }

  // Right click cancels air strike targeting
  if (_airStrikePending != null) {
    _airStrikePending = null;
    return;
  }

  // Right click cancels squad rally placement
  if (_squadRallyPending != null) {
    _squadRallyPending = null;
    return;
  }

  // Right click deselects helicopter if one is selected
  if (selectedHelicopterId != null) {
    selectedHelicopterId = null;
    return;
  }

  // Right click cancels placement mode or deselects
  if (placementMode) {
    placementMode = null;
    if (clickCallback) {
      clickCallback(-1, -1, null); // signal cancellation
    }
  } else if (selectCallback) {
    selectCallback(-1, -1); // deselect
  }
}

export function getHoveredTile() {
  return hoveredTile;
}

export function setPlacementMode(type) {
  placementMode = type;
}

export function getPlacementMode() {
  return placementMode;
}

export function setClickCallback(cb) {
  clickCallback = cb;
}

export function setSelectCallback(cb) {
  selectCallback = cb;
}

export function setCameraSnapCallback(fn) {
  cameraSnapCallback = fn;
}

export function setMinimapClickCallback(fn) {
  minimapClickCallback = fn;
}

// --- Helicopter input exports ---

export function setHelicopterRallyCallback(fn) {
  helicopterRallyCallback = fn;
}

export function setGetHelicoptersCallback(fn) {
  getHelicoptersCallback = fn;
}

export function setSelectedHelicopter(id) {
  selectedHelicopterId = id;
}

export function getSelectedHelicopter() {
  return selectedHelicopterId;
}

// --- Squad rally exports ---

export function setSquadRallyCallback(fn) {
  squadRallyCallback = fn;
}

export function setSquadRallyPending(squadIdOrAll) {
  _squadRallyPending = squadIdOrAll;
}

export function getSquadRallyPending() {
  return _squadRallyPending;
}

// --- Air strike targeting exports ---

export function setAirStrikeCallback(fn) {
  airStrikeCallback = fn;
}

export function setAirStrikePending(buildingId) {
  _airStrikePending = buildingId;
}

export function getAirStrikePending() {
  return _airStrikePending;
}

// --- Wall drag exports ---

export function setDragPlaceCallback(fn) {
  dragPlaceCallback = fn;
}

export function getDragTiles() {
  return dragCurrentTiles;
}

export function isDragActive() {
  return _isDragging;
}

// --- Box-drag selection exports ---

export function setBoxSelectCallback(fn) {
  boxSelectCallback = fn;
}

export function getSelectionBoxScreenCoords() {
  if (!_isBoxDragging || !_boxDragStartScreen || !_boxDragEndScreen) return null;
  return {
    x1: Math.min(_boxDragStartScreen.x, _boxDragEndScreen.x),
    y1: Math.min(_boxDragStartScreen.y, _boxDragEndScreen.y),
    x2: Math.max(_boxDragStartScreen.x, _boxDragEndScreen.x),
    y2: Math.max(_boxDragStartScreen.y, _boxDragEndScreen.y),
  };
}
