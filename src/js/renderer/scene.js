// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E 3D — renderer/scene.js
//  Three.js scene, camera, renderer, bloom post-processing
// ═══════════════════════════════════════════════════════════════

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MAP_WIDTH, MAP_HEIGHT, DARK_BG } from '../config.js';

export let scene, camera, renderer, composer, css2dRenderer, controls;

// Convert config RGB array [r,g,b] to THREE.Color
export function toColor(rgb) {
    return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
}

// Material factory: dark metallic structural material (responds to lights)
export function makeStructuralMaterial(color) {
    var c = (color instanceof THREE.Color) ? color : toColor(color);
    return new THREE.MeshStandardMaterial({
        color: c.clone().multiplyScalar(0.25),
        metalness: 0.7,
        roughness: 0.35,
        emissive: c.clone().multiplyScalar(0.05),
        emissiveIntensity: 1.0,
    });
}

// Material factory: bright accent material (ignores lights, blooms)
export function makeAccentMaterial(color) {
    var c = (color instanceof THREE.Color) ? color : toColor(color);
    return new THREE.MeshBasicMaterial({ color: c.clone() });
}

// Material factory: transparent glow overlay material
export function makeGlowMaterial(color, opacity) {
    if (opacity === undefined) opacity = 1.0;
    var c = (color instanceof THREE.Color) ? color : toColor(color);
    return new THREE.MeshBasicMaterial({
        color: c.clone(),
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide,
    });
}

export function initScene(container) {
    // Scene
    scene = new THREE.Scene();
    var bgColor = toColor(DARK_BG);
    scene.background = bgColor;

    // Lights
    // Ambient light
    var ambient = new THREE.AmbientLight(0x1a1a2e, 0.6);
    scene.add(ambient);

    // Main directional light — from upper-right-front
    var dirLight = new THREE.DirectionalLight(0xc0c8ff, 0.9);
    dirLight.position.set(MAP_WIDTH * 0.7, 500, -MAP_HEIGHT * 0.3);
    dirLight.target.position.set(MAP_WIDTH / 2, 0, MAP_HEIGHT / 2);
    scene.add(dirLight);
    scene.add(dirLight.target);

    // Fill light — softer, opposite side
    var fillLight = new THREE.DirectionalLight(0x4040a0, 0.3);
    fillLight.position.set(-MAP_WIDTH * 0.3, 300, MAP_HEIGHT * 1.2);
    scene.add(fillLight);

    // Hemisphere light
    var hemiLight = new THREE.HemisphereLight(0x1a1a3e, 0x080810, 0.4);
    scene.add(hemiLight);

    // Perspective camera — angled view from the south at ~45° elevation
    // FOV 55°, looking down at the map from an angle (Bloons TD6 / Kingdom Rush style)
    var aspect = MAP_WIDTH / MAP_HEIGHT;
    camera = new THREE.PerspectiveCamera(55, aspect, 1, 5000);
    camera.position.set(MAP_WIDTH / 2, 600, MAP_HEIGHT + 320);
    camera.lookAt(MAP_WIDTH / 2, 0, MAP_HEIGHT / 2);

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(MAP_WIDTH, MAP_HEIGHT);
    renderer.setClearColor(bgColor, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // OrbitControls — left drag = orbit, right drag = pan, scroll = zoom
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(MAP_WIDTH / 2, 0, MAP_HEIGHT / 2);
    controls.minPolarAngle = 0.25;            // ~14° — don't go overhead
    controls.maxPolarAngle = Math.PI / 2.1;   // ~86° — don't go below horizon
    controls.minDistance = 200;
    controls.maxDistance = 1600;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.panSpeed = 1.2;
    controls.zoomSpeed = 1.0;
    // Right-mouse = pan, middle-mouse = pan, left-mouse = orbit
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.PAN,
    };
    controls.update();

    // CSS2D renderer for HP bars / overlays
    css2dRenderer = new CSS2DRenderer();
    css2dRenderer.setSize(MAP_WIDTH, MAP_HEIGHT);
    css2dRenderer.domElement.style.position = 'absolute';
    css2dRenderer.domElement.style.top = '0';
    css2dRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(css2dRenderer.domElement);

    // Post-processing: Bloom
    var renderPass = new RenderPass(scene, camera);
    var bloomPass = new UnrealBloomPass(
        new THREE.Vector2(MAP_WIDTH, MAP_HEIGHT),
        0.35,   // strength
        0.15,   // radius
        0.65    // threshold — raised so only bright accents glow
    );

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    return { scene, camera, renderer, composer, css2dRenderer, controls };
}

export function renderScene() {
    controls.update();   // must call each frame when damping is enabled
    composer.render();
    css2dRenderer.render(scene, camera);
}

export function onWindowResize() {
    var w = MAP_WIDTH, h = MAP_HEIGHT;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
    css2dRenderer.setSize(w, h);
}

// Convert 2D game coordinates (x=game x, y=game y) to 3D world position
// Game x → Three.js x, Game y → Three.js z, Y is up
export function gameToWorld(gx, gy, elevation) {
    if (elevation === undefined) elevation = 0;
    return new THREE.Vector3(gx, elevation, gy);
}
