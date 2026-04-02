// Zoom depth diagnostic — captures frames at progressive zoom levels
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8765;
const CAPTURE_DIR = path.join(__dirname, 'test-captures', 'zoom-study');

function startServer() {
    const MIME = {
        '.html': 'text/html', '.js': 'application/javascript',
        '.css': 'text/css', '.json': 'application/json',
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
    if (!fs.existsSync(CAPTURE_DIR)) fs.mkdirSync(CAPTURE_DIR, { recursive: true });

    const server = await startServer();
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--use-gl=angle', '--enable-webgl', '--no-sandbox', '--window-size=960,540'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 960, height: 540 });
    page.on('console', msg => { if (msg.type() === 'error') console.log('ERR:', msg.text()); });

    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('fractal-canvas')?.width > 0, { timeout: 10000 });
    await sleep(1000);

    // Start beat_pattern simulation to drive zoom
    await page.evaluate(() => {
        const selects = document.querySelectorAll('select.control-select');
        for (const sel of selects) {
            if (Array.from(sel.options).some(o => o.value === 'bass_hit')) {
                sel.value = 'beat_pattern';
                sel.dispatchEvent(new Event('change'));
                break;
            }
        }
    });

    console.log('Capturing zoom progression over 30 seconds...');

    // Capture a frame every 2 seconds for 30 seconds to see the full zoom cycle
    for (let t = 0; t <= 30; t += 2) {
        // Read the current zoom state from the page
        const state = await page.evaluate(() => {
            // Access the exposed FRACTAL_TYPES to peek at state
            const fps = document.getElementById('fps-counter')?.textContent || 'N/A';
            return { fps };
        });

        const filePath = path.join(CAPTURE_DIR, `zoom_t${String(t).padStart(2, '0')}s.png`);
        await page.screenshot({ path: filePath, type: 'png' });
        const size = fs.statSync(filePath).size;
        console.log(`  t=${t}s: ${(size/1024).toFixed(1)}KB ${state.fps}`);

        if (t < 30) await sleep(2000);
    }

    console.log('\nDone. Check test-captures/zoom-study/');
    await browser.close();
    server.close();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
run().catch(e => { console.error(e); process.exit(1); });
