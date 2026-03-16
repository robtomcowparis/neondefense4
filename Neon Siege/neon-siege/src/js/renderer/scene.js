// ============================================================
// scene.js — Three.js scene, camera, lights, bloom, materials
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import {
  MAP_W, MAP_H,
  COLORS,
  CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR,
  CAMERA_START_Y, CAMERA_START_Z_OFFSET,
  ORBIT_MIN_POLAR, ORBIT_MAX_POLAR,
  ORBIT_MIN_DIST, ORBIT_MAX_DIST, ORBIT_DAMPING,
  LIGHT_AMBIENT_COLOR, LIGHT_AMBIENT_INTENSITY,
  LIGHT_MAIN_COLOR, LIGHT_MAIN_INTENSITY,
  LIGHT_FILL_COLOR, LIGHT_FILL_INTENSITY,
  LIGHT_HEMI_SKY, LIGHT_HEMI_GROUND, LIGHT_HEMI_INTENSITY,
  LIGHT_RIM_COLOR, LIGHT_RIM_INTENSITY,
  BLOOM_STRENGTH, BLOOM_RADIUS, BLOOM_THRESHOLD,
  STRUCTURAL_COLOR_MULT, STRUCTURAL_EMISSIVE_MULT,
} from '../config.js';

let scene, camera, renderer, composer, controls;

// ---- Material Factories ----

export function makeStructuralMaterial(color) {
  const c = new THREE.Color(color);
  const emissiveColor = c.clone().multiplyScalar(STRUCTURAL_EMISSIVE_MULT);
  const mat = new THREE.MeshStandardMaterial({
    color: c.clone().multiplyScalar(STRUCTURAL_COLOR_MULT),
    metalness: 0.7,
    roughness: 0.35,
    emissive: emissiveColor,
    emissiveIntensity: 1.0,
  });
  mat.userData._origEmissive = emissiveColor.clone();
  return mat;
}

export function makeAccentMaterial(color) {
  return new THREE.MeshBasicMaterial({ color });
}

export function makeGlowMaterial(color, opacity = 1.0) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
  });
}

// ---- Init ----

export function initScene(container) {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.BG);
  scene.fog = new THREE.FogExp2(COLORS.BG, 0.00018);

  // Camera
  camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    MAP_W / MAP_H,
    CAMERA_NEAR,
    CAMERA_FAR
  );
  camera.position.set(MAP_W / 2, CAMERA_START_Y, MAP_H + CAMERA_START_Z_OFFSET);
  camera.lookAt(MAP_W / 2, 0, MAP_H / 2);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(new THREE.Color(COLORS.BG));
  container.appendChild(renderer.domElement);

  // Size renderer to container
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(MAP_W / 2, 0, MAP_H / 2);
  controls.minPolarAngle = ORBIT_MIN_POLAR;
  controls.maxPolarAngle = ORBIT_MAX_POLAR;
  controls.minDistance = ORBIT_MIN_DIST;
  controls.maxDistance = ORBIT_MAX_DIST;
  controls.enableDamping = true;
  controls.dampingFactor = ORBIT_DAMPING;
  controls.panSpeed = 1.2;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.PAN,
  };

  // ---- Lighting ----

  // Ambient
  const ambient = new THREE.AmbientLight(LIGHT_AMBIENT_COLOR, LIGHT_AMBIENT_INTENSITY);
  scene.add(ambient);

  // Main directional — upper right
  const sun = new THREE.DirectionalLight(LIGHT_MAIN_COLOR, LIGHT_MAIN_INTENSITY);
  sun.position.set(MAP_W * 0.7, 500, -MAP_H * 0.3);
  sun.target.position.set(MAP_W / 2, 0, MAP_H / 2);
  scene.add(sun);
  scene.add(sun.target);

  // Fill — lower left
  const fill = new THREE.DirectionalLight(LIGHT_FILL_COLOR, LIGHT_FILL_INTENSITY);
  fill.position.set(-MAP_W * 0.3, 300, MAP_H * 1.2);
  scene.add(fill);

  // Hemisphere
  const hemi = new THREE.HemisphereLight(LIGHT_HEMI_SKY, LIGHT_HEMI_GROUND, LIGHT_HEMI_INTENSITY);
  scene.add(hemi);

  // Rim light — behind/below camera for edge highlights on silhouettes
  const rim = new THREE.DirectionalLight(LIGHT_RIM_COLOR, LIGHT_RIM_INTENSITY);
  rim.position.set(-MAP_W * 0.5, 400, MAP_H * 1.5);
  rim.target.position.set(MAP_W / 2, 0, MAP_H / 2);
  scene.add(rim);
  scene.add(rim.target);

  // ---- Post-processing ----

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    BLOOM_STRENGTH,
    BLOOM_RADIUS,
    BLOOM_THRESHOLD
  );
  composer.addPass(bloom);

  // ---- Resize handler ----

  window.addEventListener('resize', onResize);

  return { scene, camera, renderer, composer, controls };
}

function onResize() {
  const container = renderer.domElement.parentElement;
  if (!container) return;
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}

// ---- Accessors ----

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getComposer() { return composer; }
export function getControls() { return controls; }
export function getRenderer() { return renderer; }
