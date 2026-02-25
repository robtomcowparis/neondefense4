// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — utils.js
//  Math helpers, clamp, distance, drawing utilities
// ═══════════════════════════════════════════════════════════════

export function clamp(val, lo, hi) {
    return Math.max(lo, Math.min(hi, val));
}

export function dist(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function lerpColor(c1, c2, t) {
    return [
        Math.round(lerp(c1[0], c2[0], t)),
        Math.round(lerp(c1[1], c2[1], t)),
        Math.round(lerp(c1[2], c2[2], t)),
    ];
}

export function rgba(color, alpha = 1.0) {
    if (color.length === 4) return `rgba(${color[0]},${color[1]},${color[2]},${color[3] / 255})`;
    return `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
}

export function rgb(color) {
    return `rgb(${color[0]},${color[1]},${color[2]})`;
}

export function drawGlowCircle(ctx, color, cx, cy, radius, intensity = 3) {
    for (let i = intensity; i > 0; i--) {
        const alpha = Math.max(0.04, 0.24 / i);
        const r = radius + i * 4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, alpha);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = rgb(color);
    ctx.fill();
}

export function drawGlowRect(ctx, color, x, y, w, h, lineWidth = 1, intensity = 2) {
    for (let i = intensity; i > 0; i--) {
        const alpha = Math.max(0.04, 0.2 / i);
        const ex = i * 2;
        ctx.strokeStyle = rgba(color, alpha);
        ctx.lineWidth = lineWidth + i;
        ctx.strokeRect(x - ex, y - ex, w + ex * 2, h + ex * 2);
    }
    ctx.strokeStyle = rgb(color);
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, w, h);
}

export function drawText(ctx, text, x, y, color, size = 18, center = false) {
    ctx.font = `${size}px Consolas, "Courier New", monospace`;
    ctx.fillStyle = rgb(color);
    if (center) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    } else {
        ctx.textBaseline = 'top';
        ctx.fillText(text, x, y);
        ctx.textBaseline = 'alphabetic';
    }
}

export function randomUniform(a, b) {
    return a + Math.random() * (b - a);
}

export function randomInt(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

export function weightedRandomChoice(items, weights) {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
        r -= weights[i];
        if (r <= 0) return { item: items[i], index: i };
    }
    return { item: items[items.length - 1], index: items.length - 1 };
}

// Get current time in seconds (high-precision)
export function now() {
    return performance.now() / 1000;
}
