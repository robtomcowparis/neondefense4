// Automated visual test harness — captures screenshots from each simulation mode
// Run: node test-capture.mjs

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8765;
const CAPTURE_DIR = path.join(__dirname, 'test-captures');

// Simple static file server
function startServer() {
    const MIME = {
        '.html': 'text/html', '.js': 'application/javascript',
        '.css': 'text/css', '.json': 'application/json',
        '.png': 'image/png', '.jpg': 'image/jpeg',
    };
    const server = http.createServer((req, res) => {
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        const ext = path.extname(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) { res.writeHead(404); res.end('Not found'); return; }
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(data);
        });
    });
    return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function run() {
    // Create output directory
    if (!fs.existsSync(CAPTURE_DIR)) fs.mkdirSync(CAPTURE_DIR);

    console.log('Starting local server...');
    const server = await startServer();
    console.log(`Server running at http://localhost:${PORT}`);

    console.log('Launching headless Chrome...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--use-gl=angle',          // Use ANGLE for WebGL
            '--enable-webgl',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=960,540',    // Half-HD for faster captures
        ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 960, height: 540 });

    // Capture console messages for debugging
    page.on('console', msg => {
        if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
    });

    console.log('Loading visualizer...');
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'domcontentloaded' });

    // Wait for WebGL to initialize (give the render loop a few frames)
    await page.waitForFunction(() => {
        const c = document.getElementById('fractal-canvas');
        return c && c.width > 0;
    }, { timeout: 10000 });
    await sleep(1000); // Let a few frames render

    // Check if WebGL is working
    const webglOk = await page.evaluate(() => {
        const c = document.getElementById('fractal-canvas');
        const gl = c?.getContext('webgl2');
        return !!gl;
    });
    console.log('WebGL2 available:', webglOk);

    // ---- Test 1: Baseline (no audio) ----
    console.log('\n--- Test 1: Baseline (no audio) ---');
    await sleep(500);
    await captureScreenshot(page, 'baseline_no_audio');

    // ---- Test 2: Each simulation mode ----
    const simModes = ['silence', 'bass_hit', 'steady_tone', 'frequency_sweep', 'full_spectrum', 'beat_pattern'];

    for (const mode of simModes) {
        console.log(`\n--- Test: ${mode} simulation ---`);

        // Start simulation
        await page.evaluate((m) => {
            // Access the audio engine through the global scope
            // The audioEngine is not directly exposed, but we can trigger it via the control panel actions
            // Let's find it through the module exports or use the keyboard/UI
            // Actually, the simulation select in the control panel can be used
            const selects = document.querySelectorAll('select.control-select');
            for (const sel of selects) {
                const opts = Array.from(sel.options).map(o => o.value);
                if (opts.includes('bass_hit')) {
                    sel.value = m;
                    sel.dispatchEvent(new Event('change'));
                    break;
                }
            }
        }, mode);

        // Wait for the simulation to affect visuals
        const waitTime = mode === 'frequency_sweep' ? 3000 :
                         mode === 'beat_pattern' ? 2000 :
                         mode === 'bass_hit' ? 500 : 1000;
        await sleep(waitTime);

        // Capture screenshot
        await captureScreenshot(page, `sim_${mode}`);

        // For bass_hit, also capture after decay
        if (mode === 'bass_hit') {
            await sleep(1500);
            await captureScreenshot(page, `sim_${mode}_decayed`);
        }

        // For beat_pattern, capture a sequence of 4 frames
        if (mode === 'beat_pattern') {
            for (let i = 1; i <= 3; i++) {
                await sleep(250);
                await captureScreenshot(page, `sim_${mode}_frame${i}`);
            }
        }
    }

    // ---- Test 3: Each fractal type with full_spectrum ----
    console.log('\n--- Test: Fractal types with full_spectrum ---');

    // Start full_spectrum simulation
    await page.evaluate(() => {
        const selects = document.querySelectorAll('select.control-select');
        for (const sel of selects) {
            const opts = Array.from(sel.options).map(o => o.value);
            if (opts.includes('bass_hit')) {
                sel.value = 'full_spectrum';
                sel.dispatchEvent(new Event('change'));
                break;
            }
        }
    });
    await sleep(500);

    // Switch through fractal types using F1-F5
    const fractalKeys = ['F1', 'F2', 'F3', 'F4', 'F5'];
    const fractalNames = ['domainJulia', 'kifs', 'audioPower', 'fractalNoise', 'nova'];

    for (let i = 0; i < fractalKeys.length; i++) {
        await page.keyboard.press(fractalKeys[i]);
        await sleep(1500); // Wait for transition + render
        await captureScreenshot(page, `fractal_${fractalNames[i]}_fullspectrum`);
    }

    // ---- Test 4: Palette showcase ----
    console.log('\n--- Test: Palette showcase on domainJulia ---');
    await page.keyboard.press('F1'); // Back to domainJulia
    await sleep(500);

    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('p'); // Cycle palette
        await sleep(800);
        await captureScreenshot(page, `palette_${i}`);
    }

    // ---- Test 5: Try the diagnostics capture system ----
    console.log('\n--- Test: Diagnostics system ---');
    // Press 'd' to trigger a diagnostic capture
    await page.keyboard.press('d');
    await sleep(500);

    // Check if capture was created
    const captureCount = await page.evaluate(() => {
        // Try to access diagnostics through the global window
        return 'Diagnostics capture triggered via keyboard';
    });
    console.log(captureCount);

    // Done
    console.log('\n=== All captures complete ===');
    console.log(`Screenshots saved to: ${CAPTURE_DIR}`);

    const files = fs.readdirSync(CAPTURE_DIR).filter(f => f.endsWith('.png'));
    console.log(`Total screenshots: ${files.length}`);

    await browser.close();
    server.close();
}

async function captureScreenshot(page, name) {
    const filePath = path.join(CAPTURE_DIR, `${name}.png`);
    await page.screenshot({ path: filePath, type: 'png' });
    const stats = fs.statSync(filePath);
    console.log(`  Captured: ${name}.png (${(stats.size / 1024).toFixed(1)} KB)`);

    // Also capture the audio state via page evaluation
    const audioState = await page.evaluate(() => {
        try {
            const selects = document.querySelectorAll('select.control-select');
            const fpsEl = document.getElementById('fps-counter');
            const meters = document.querySelectorAll('.meter-bar');
            const meterWidths = Array.from(meters).map(m => m.style.width);
            return {
                fps: fpsEl?.textContent || 'N/A',
                meterWidths,
            };
        } catch (e) {
            return { error: e.message };
        }
    });

    const jsonPath = path.join(CAPTURE_DIR, `${name}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(audioState, null, 2));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

run().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
