// Test dark neon palettes
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8765;
const DIR = path.join(__dirname, 'test-captures', 'dark-palettes');

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
    await new Promise(r => setTimeout(r, 1000));

    // Start beat_pattern sim
    await page.evaluate(() => {
        const sels = document.querySelectorAll('select.control-select');
        for (const s of sels) {
            if (Array.from(s.options).some(o => o.value === 'bass_hit')) {
                s.value = 'beat_pattern'; s.dispatchEvent(new Event('change')); break;
            }
        }
    });
    await new Promise(r => setTimeout(r, 1500));

    const darkPalettes = [
        'Neon Void', 'Neon Pulse', 'Midnight Laser', 'Dark Synth',
        'Abyss Glow', 'Blacklight', 'Neon Grid', 'Blood Moon'
    ];

    for (const name of darkPalettes) {
        // Switch palette via the select
        await page.evaluate((n) => {
            const sels = document.querySelectorAll('select.control-select');
            for (const s of sels) {
                const opts = Array.from(s.options).map(o => o.value);
                if (opts.includes('Electric Neon')) {
                    s.value = n; s.dispatchEvent(new Event('change')); break;
                }
            }
        }, name);
        await new Promise(r => setTimeout(r, 1500));
        const fp = path.join(DIR, `${name.replace(/ /g, '_').toLowerCase()}.png`);
        await page.screenshot({ path: fp, type: 'png' });
        const sz = fs.statSync(fp).size;
        console.log(`${name}: ${(sz/1024).toFixed(1)}KB`);
    }

    // Also test a couple on different fractals
    // KIFS with Neon Void
    await page.evaluate(() => {
        const sels = document.querySelectorAll('select.control-select');
        for (const s of sels) {
            if (Array.from(s.options).some(o => o.value === 'Electric Neon')) {
                s.value = 'Neon Void'; s.dispatchEvent(new Event('change')); break;
            }
        }
    });
    await page.keyboard.press('F2'); // KIFS
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(DIR, 'kifs_neon_void.png') });
    console.log('KIFS + Neon Void captured');

    // Nova with Dark Synth
    await page.evaluate(() => {
        const sels = document.querySelectorAll('select.control-select');
        for (const s of sels) {
            if (Array.from(s.options).some(o => o.value === 'Electric Neon')) {
                s.value = 'Dark Synth'; s.dispatchEvent(new Event('change')); break;
            }
        }
    });
    await page.keyboard.press('F5'); // Nova
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(DIR, 'nova_dark_synth.png') });
    console.log('Nova + Dark Synth captured');

    await browser.close();
    server.close();
}

run().catch(e => { console.error(e); process.exit(1); });
