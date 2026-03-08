# Neon Tanks — Visual Style Guide

Reference for recreating the game's UI aesthetic in a standalone website or main menu.

---

## Core Identity

**Theme:** Neon cyberpunk / electric industrial
**Mood:** Dark, high-contrast, glowing edges against deep space-black backgrounds
**Approach:** Minimal chrome, generous negative space, text-driven UI with neon glow accents. No gradients on interactive elements — flat color with bloom/glow effects.

---

## Color Palette

### Backgrounds

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| Deep Black | `#040410` | 4, 4, 16 | Page background, canvas fill |
| Panel BG | `rgba(8, 8, 26, 0.94)` | 8, 8, 26 | Sidebars, cards, overlays |
| Card BG | `#0c0c22` | 12, 12, 34 | Individual card/tile backgrounds |
| Input BG | `#10102a` | 16, 16, 42 | Buttons, form fields |
| Subtle BG | `#1a2233` | 26, 34, 51 | Slider tracks, inset wells |
| Overlay BG | `rgba(0, 0, 10, 0.92)` | — | Full-screen modal backdrops |
| Menu Overlay | `radial-gradient(ellipse at center, rgba(4,4,16,0.75) 0%, rgba(4,4,16,0.92) 70%)` | — | Main menu background (radial vignette) |

### Primary Neon Colors

| Name | Hex | Role |
|------|-----|------|
| Cyan | `#00ffff` | Primary accent, titles, active states, borders, CTA buttons |
| Magenta | `#ff00ff` | Secondary accent, subtitle text, heavy weapon theme |
| Gold | `#ffd700` | Currency/scrap, achievements, best-round stats, branch upgrades |
| Orange | `#ffaa00` | Warnings, mines, tertiary accent |
| Green | `#00ff88` | Health (high), success states, "complete" badges |
| Red | `#ff3333` | Danger, low HP, elimination, denied actions |
| Kill Red | `#ff4466` | Kill counter, combat stats |

### Muted / Secondary Text Colors

| Name | Hex | Role |
|------|-----|------|
| Light Text | `#e8e8f0` | Primary readable text on dark BG |
| Blue-Gray | `#aaccff` | Body text, stat descriptions |
| Mid Gray | `#88aacc` | Labels, secondary info, slider labels |
| Dim Gray | `#667788` | Subtle labels, section headers |
| Dark Gray | `#445566` | Divider lines, inactive borders |
| Ghost Gray | `#334455` | Version text, barely-visible elements |
| Muted Purple | `#606080` | Disabled states, locked items, counters |

### Upgrade Track Colors

| Track | Hex |
|-------|-----|
| Firepower | `#ff00ff` |
| Armor | `#00ffff` |
| Mobility | `#32ff64` |
| Systems | `#ffd700` |

---

## Typography

### Font Stack

```css
font-family: 'Segoe UI', 'Consolas', monospace;  /* Main menu */
font-family: 'Consolas', 'Courier New', monospace; /* HUD, panels, all in-game UI */
```

Monospace is the dominant typeface throughout the entire game. Consolas is the primary choice — it gives the UI a terminal/hacker aesthetic. Use a monospace font everywhere for consistency.

### Type Scale

| Element | Size | Weight | Letter-Spacing | Transform |
|---------|------|--------|----------------|-----------|
| Main title ("NEON TANKS") | 72px | 900 (Black) | 8px | — |
| Subtitle ("BATTLE ROYALE") | 22px | 600 | 12px | — |
| Section titles (SETTINGS, CONTROLS) | 24px | 700 | 4px | — |
| Primary CTA button | 22px | 700 | 3px | uppercase |
| Secondary button | 15–18px | 700 | 3px | uppercase |
| Panel header | 16px | 700 | 4px | — |
| HUD stats (alive, kills, scrap) | 15px | 700 | 2px | — |
| Body / labels | 13–14px | 400–600 | 1–2px | — |
| Small labels / hints | 10–11px | 400 | 1–2px | uppercase |
| Pill badges | 8–9px | 700 | 0.5px | — |

**Key pattern:** Generous `letter-spacing` on all uppercase text (2–12px). This is critical to the aesthetic.

---

## Glow & Shadow Effects

### Text Glow (the signature look)

Every colored text element has a matching `text-shadow` with 2–3 layers of increasing blur:

```css
/* Cyan text glow — primary pattern */
color: #00ffff;
text-shadow:
  0 0 10px rgba(0, 255, 255, 0.8),
  0 0 30px rgba(0, 255, 255, 0.5),
  0 0 60px rgba(0, 255, 255, 0.3);

/* Magenta text glow */
color: #ff00ff;
text-shadow:
  0 0 10px rgba(255, 0, 255, 0.6),
  0 0 30px rgba(255, 0, 255, 0.3);

/* Gold text glow */
color: #ffd700;
text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);

/* Subtle glow for smaller text */
text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
```

### Box Glow (borders & containers)

```css
/* Active/hovered element */
box-shadow: 0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 15px rgba(0, 255, 255, 0.1);

/* Default subtle glow */
box-shadow: 0 0 8px rgba(0, 255, 255, 0.15),
            inset 0 0 8px rgba(0, 255, 255, 0.05);

/* Panel shadow */
box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
```

---

## Buttons

### Primary CTA

```css
.btn-primary {
  width: 260px;
  padding: 16px 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  border: 2px solid #00ffff;
  background: rgba(0, 255, 255, 0.06);
  color: #00ffff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.15),
              inset 0 0 8px rgba(0, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: rgba(0, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3),
              inset 0 0 15px rgba(0, 255, 255, 0.1);
  transform: scale(1.03);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

### Secondary Button

```css
.btn-secondary {
  border: 2px solid #445566;
  color: #88aacc;
  background: rgba(68, 85, 102, 0.06);
  text-shadow: none;
  box-shadow: 0 0 6px rgba(68, 85, 102, 0.1);
  font-size: 15px;
  padding: 12px 0;
}

.btn-secondary:hover {
  border-color: #88aacc;
  color: #bbddee;
  background: rgba(68, 85, 102, 0.15);
  box-shadow: 0 0 12px rgba(136, 170, 204, 0.2);
}
```

### Confirmation / Positive Action

```css
background: rgba(0, 80, 40, 0.5);
border: 1px solid rgba(0, 255, 100, 0.4);
color: #00ff66;
```

### Cancel / Negative Action

```css
background: rgba(80, 20, 20, 0.5);
border: 1px solid rgba(255, 100, 100, 0.3);
color: #ff6666;
```

---

## Animations

### Title Pulse (breathing glow)

```css
@keyframes title-pulse {
  0%, 100% {
    text-shadow:
      0 0 10px rgba(0, 255, 255, 0.8),
      0 0 30px rgba(0, 255, 255, 0.5),
      0 0 60px rgba(0, 255, 255, 0.3);
  }
  50% {
    text-shadow:
      0 0 15px rgba(0, 255, 255, 1),
      0 0 40px rgba(0, 255, 255, 0.7),
      0 0 80px rgba(0, 255, 255, 0.4),
      0 0 120px rgba(0, 255, 255, 0.2);
  }
}
/* Apply: animation: title-pulse 3s ease-in-out infinite; */
```

### Ready Button Pulse (border breathe)

```css
@keyframes ready-pulse {
  0%   { border-color: rgba(0, 255, 255, 0.35); }
  100% { border-color: rgba(0, 255, 255, 0.8);
         box-shadow: 0 0 12px rgba(0, 255, 255, 0.2); }
}
/* Apply: animation: ready-pulse 1.5s ease-in-out infinite alternate; */
```

### Storm Warning Pulse

```css
@keyframes storm-pulse {
  0%   { opacity: 0.8; }
  100% { opacity: 1.0; }
}
/* Apply: animation: storm-pulse 0.5s ease-in-out infinite alternate; */
```

### Damage Number Float-Up

```css
@keyframes damage-float {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  30%  { opacity: 1; transform: translateY(-20px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
}
```

### Combo Pop

```css
@keyframes combo-scale {
  0%   { transform: scale(1.6); opacity: 0.7; }
  50%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1.0); opacity: 1; }
}
```

### Denied Flash (can't afford)

```css
@keyframes denied-flash {
  0%   { border-color: #ff3333; box-shadow: 0 0 10px rgba(255, 50, 50, 0.4); }
  100% { border-color: rgba(100, 120, 180, 0.15); box-shadow: none; }
}
```

### Transitions

Standard transitions used across all interactive elements:

```css
transition: all 0.2s ease;          /* Buttons */
transition: transform 0.25s ease;   /* Panel slide-in/out */
transition: opacity 0.4s ease;      /* Overlay fade */
transition: width 0.15s ease;       /* Health bar fill */
```

---

## Borders & Dividers

| Context | Style |
|---------|-------|
| Primary border | `2px solid #00ffff` |
| Subtle border | `1px solid rgba(0, 180, 200, 0.2)` |
| Card border | `1px solid rgba(100, 120, 180, 0.1)` |
| Input/inactive | `1px solid #334455` |
| Divider line | `1px solid #1a2233` |
| Gradient divider | `linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.25), transparent)` |
| Border radius | `2–4px` (subtle), `6–8px` (containers), `12px` (pills/badges) |

---

## Cards & Panels

### Sidebar Panel

```css
background: rgba(8, 8, 26, 0.94);
border-left: 1px solid rgba(0, 180, 200, 0.2);
box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
```

### Track Card (with color bar)

A 4px tall-left color bar (matching the track color) sits on the left edge of each card. The card itself is `#0c0c22` with `1px solid rgba(100, 120, 180, 0.1)` border.

### HUD Stat Badge

```css
background: rgba(4, 4, 16, 0.6);
padding: 4px 10px;
border: 1px solid rgba(0, 255, 255, 0.2);
border-radius: 3px;
```

### Pill Badge (purchased upgrades)

```css
font-size: 8px;
font-weight: bold;
padding: 1px 6px;
border-radius: 8px;
border: 1px solid;
/* Color set dynamically per track */
```

---

## Form Controls

### Slider / Range Input

```css
/* Track */
height: 6px;
background: #1a2233;
border-radius: 3px;

/* Thumb */
width: 16px;
height: 16px;
border-radius: 50%;
background: #00ffff;
box-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
```

### Toggle Button Group

```css
/* Container */
border: 1px solid #334455;
border-radius: 4px;
overflow: hidden;

/* Option (inactive) */
color: #667788;
background: rgba(20, 30, 40, 0.6);

/* Option (active) */
color: #00ffff;
background: rgba(0, 255, 255, 0.1);
text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);

/* Option (hover) */
color: #99bbcc;
background: rgba(40, 60, 80, 0.4);
```

---

## 3D Scene Visual Reference (for background/hero sections)

If recreating the game's visual feel for a website hero or background:

| Element | Color | Notes |
|---------|-------|-------|
| Sky / void | `#040410` | Near-black with blue undertone |
| Ground plane | `#0c0c28` (emissive `#060618`) | Dark indigo metallic |
| Grid lines | `#2a5588` at 55% opacity | Thin lines, bloom via post-processing |
| Grid intersection dots | `#4488bb` at 70% opacity | Brighter accent at crossings |
| Ambient light | `#2a2a4e` | Cool purple-blue ambience |
| Directional light | `#d0d8ff` | Cool white from above-right |
| Fill light | `#8888cc` | Soft purple from below-left |
| Bloom | strength 0.55, radius 0.25, threshold 0.45 | Unreal Bloom Pass |
| Tone mapping | ACES Filmic, exposure 1.4 | Slight overexposure for glow punch |

### Tank Colors

| Tank Part | Color |
|-----------|-------|
| Hull (structural) | `#141438` (emissive `#1a1a44`) |
| Upper plate | `#181848` |
| Player accent | `#00ffff` (cyan) |
| Enemy accents | Per-skill: regular `#ff8800`, veteran `#ff00ff`, elite `#ffdd00` |

---

## Layout Patterns

- **Centered column**: Main menu uses `flex-direction: column; align-items: center; justify-content: center` on a full-viewport overlay
- **Fixed sidebar**: Upgrade panel is 280px fixed-right, full-height
- **Bottom-center bar**: Ammo selector bar with `left: 50%; transform: translateX(-60%)`
- **Top-center stats**: `position: absolute; top: 16px; left: 50%; transform: translateX(-50%)`
- **Minimap**: Fixed top-right corner, 280x280px canvas with `border: 2px solid #00ffff`
- **Button stack**: Vertically centered column, 260px wide, 14px gap

---

## Key Design Rules

1. **Everything glows.** Every colored element gets a matching `text-shadow` or `box-shadow` glow. The glow color always matches the text/border color at reduced opacity.
2. **Monospace everywhere.** No sans-serif. The terminal aesthetic is non-negotiable.
3. **Wide letter-spacing** on all uppercase text. Minimum 2px, titles go up to 12px.
4. **Near-black backgrounds** with barely-visible blue/purple undertones. Never pure `#000`.
5. **Transparency layers.** Panels and overlays use `rgba()` backgrounds so the game world bleeds through subtly.
6. **Minimal border-radius.** 2–4px max for most elements. Only pills/badges get rounded (8–12px).
7. **No solid fills on buttons.** Buttons are outlined with a barely-tinted interior (`rgba(color, 0.06)`). Hover raises the tint to ~0.15.
8. **Color hierarchy:** Cyan is primary, magenta is secondary, gold is for currency/rewards, green is for success/health, red is for danger/denial.
9. **Uppercase text transforms** on all buttons, labels, section headers, and stat names.
10. **Hover = glow intensifies.** The only hover feedback is border brightening, box-shadow expansion, and a subtle `scale(1.03)`.
