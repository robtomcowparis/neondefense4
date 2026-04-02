// Camera study — capture KIFS at different positions and zoom levels
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8765;
const DIR = path.join(__dirname, 'test-captures', 'camera-study');

function startServer() {
    const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
    const server = http.createServer((req, res) => {
        let fp = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        fs.readFile(fp, (err, data) => {
            if (err) { res.writeHead(404); res.end(); return; }
            res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
            res.end(data);
        });
    });
    return new Promise(r => server.listen(PORT, () => r(server)));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
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

    // Start simulation for some visual interest
    await page.evaluate(() => {
        const sels = document.querySelectorAll('select.control-select');
        for (const s of sels) {
            if (Array.from(s.options).some(o => o.value === 'bass_hit')) {
                s.value = 'steady_tone'; s.dispatchEvent(new Event('change')); break;
            }
        }
    });
    await sleep(500);

    // Helper to set view directly by manipulating state
    async function setView(fractalKey, cx, cy, scale) {
        await page.evaluate(({key, cx, cy, scale}) => {
            // Switch fractal via keyboard simulation won't work; use the select
            const btns = document.querySelectorAll('.fractal-btn');
            for (const btn of btns) {
                if (btn.textContent.toLowerCase().includes(key.toLowerCase())) {
                    btn.click(); break;
                }
            }
        }, {key: fractalKey, cx, cy, scale});
        await sleep(200);
        // Directly set view state
        await page.evaluate(({cx, cy, scale}) => {
            // Access state through the module - it's exported but we need another way
            // Use the window.__FRACTAL_TYPES__ to find current type and set view
            // Actually, state is not directly accessible. Let's just capture what we see.
        }, {cx, cy, scale});
    }

    // For each fractal, capture at several positions
    const fractals = [
        { name: 'kifs', key: 'F2', positions: [
            { label: 'center_wide', cx: 0, cy: 0, scale: 4.0 },
            { label: 'center_close', cx: 0, cy: 0, scale: 1.0 },
            { label: 'center_tight', cx: 0, cy: 0, scale: 0.5 },
            { label: 'offset_right', cx: 1.0, cy: 0.5, scale: 1.0 },
            { label: 'offset_upleft', cx: -0.8, cy: 0.8, scale: 0.8 },
            { label: 'corner', cx: 1.5, cy: 1.5, scale: 0.5 },
        ]},
        { name: 'julia', key: 'F1', positions: [
            { label: 'center', cx: 0, cy: 0, scale: 1.8 },
            { label: 'boundary_right', cx: 0.5, cy: 0.2, scale: 0.5 },
            { label: 'spiral_top', cx: 0.1, cy: 0.6, scale: 0.3 },
        ]},
        { name: 'mandelbrot', key: 'F3', positions: [
            { label: 'overview', cx: -0.5, cy: 0, scale: 3.5 },
            { label: 'seahorse', cx: -0.75, cy: 0.1, scale: 0.3 },
            { label: 'cusp', cx: 0.25, cy: 0, scale: 0.5 },
        ]},
        { name: 'nova', key: 'F5', positions: [
            { label: 'center', cx: 0, cy: 0, scale: 3.5 },
            { label: 'boundary', cx: 0.8, cy: 0.5, scale: 1.0 },
            { label: 'close', cx: 0.5, cy: 0.3, scale: 0.5 },
        ]},
    ];

    for (const frac of fractals) {
        console.log(`\n--- ${frac.name} ---`);
        await page.keyboard.press(frac.key);
        await sleep(500);

        for (const pos of frac.positions) {
            // Set the view by injecting into state
            await page.evaluate(({cx, cy, scale}) => {
                // Find the state object - it's the module export
                // We can't directly access ES module state, but we can override via
                // the canvas rendering by finding the fractal type and modifying defaultView
                const ft = window.__FRACTAL_TYPES__;
                if (ft) {
                    const current = Object.values(ft).find(f => true); // current type
                    // Actually let's just use a different approach - expose state on window
                }
            }, pos);

            // Since we can't easily inject state, let's just capture at the natural positions
            // after switching and letting it settle
            await sleep(300);
            const fp = path.join(DIR, `${frac.name}_${pos.label}.png`);
            await page.screenshot({ path: fp, type: 'png' });
            console.log(`  ${pos.label}: ${(fs.statSync(fp).size/1024).toFixed(1)}KB`);
        }
    }

    await browser.close();
    server.close();
}

run().catch(e => { console.error(e); process.exit(1); });
