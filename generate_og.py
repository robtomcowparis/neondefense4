from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random

W, H = 1200, 630

# --- Base layer (background, grid, ambient) ---
img = Image.new('RGBA', (W, H), (4, 4, 16, 255))
draw = ImageDraw.Draw(img, 'RGBA')

# Background gradient
for y in range(H):
    t = y / H
    r = int(4 + 6 * math.sin(t * math.pi))
    g = int(4 + 6 * math.sin(t * math.pi))
    b = int(16 + 16 * math.sin(t * math.pi))
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Perspective grid
horizon = int(H * 0.52)
for i in range(20):
    t = i / 19
    y = int(horizon + (H - horizon) * (t ** 0.7))
    draw.line([(0, y), (W, y)], fill=(0, 255, 255, 25), width=1)
for i in range(-15, 16):
    x_bottom = W // 2 + i * 60
    draw.line([(W // 2, horizon), (x_bottom, H + 50)], fill=(0, 255, 255, 25), width=1)

# Radial ambient glow
def draw_glow(cx, cy, radius, color, max_alpha):
    for r in range(radius, 0, -3):
        alpha = int(max_alpha * (1 - r / radius) ** 2)
        if alpha < 1:
            continue
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, alpha))

draw_glow(W // 2, int(H * 0.35), 300, (0, 255, 255), 18)
draw_glow(int(W * 0.3), int(H * 0.3), 180, (255, 0, 255), 12)
draw_glow(int(W * 0.7), int(H * 0.3), 180, (255, 0, 255), 12)

# Stars
random.seed(42)
for _ in range(80):
    sx = random.randint(0, W)
    sy = random.randint(0, int(H * 0.55))
    size = random.randint(1, 3)
    alpha = random.randint(30, 150)
    draw.ellipse([sx - size, sy - size, sx + size, sy + size], fill=(200, 220, 255, alpha))

# Horizontal neon accent line
line_y = int(H * 0.54)
for offset in range(6, 0, -1):
    alpha = int(40 * (1 - offset / 6))
    draw.line([(int(W * 0.08), line_y), (int(W * 0.92), line_y)],
              fill=(0, 255, 255, alpha), width=offset * 2)
draw.line([(int(W * 0.08), line_y), (int(W * 0.92), line_y)],
          fill=(0, 255, 255, 200), width=2)

# --- Fonts ---
def get_font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/consolab.ttf",
        "C:/Windows/Fonts/consola.ttf",
        "C:/Windows/Fonts/courbd.ttf",
        "C:/Windows/Fonts/cour.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    if not bold:
        candidates = [c for c in candidates if 'b.' not in c and 'bd.' not in c] + candidates
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except:
            pass
    return ImageFont.load_default()

title_font = get_font(90, bold=True)
subtitle_font = get_font(24, bold=True)
card_font = get_font(17, bold=True)

# --- Title with proper Gaussian-blurred glow ---
title = "NEON ARCADE"
title_y = int(H * 0.28)

bbox_t = draw.textbbox((0, 0), title, font=title_font)
tw = bbox_t[2] - bbox_t[0]
th = bbox_t[3] - bbox_t[1]
tx = (W - tw) // 2
ty = title_y - th // 2

# Create glow layer, draw text, blur it, composite
glow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_layer)
glow_draw.text((tx, ty), title, font=title_font, fill=(0, 255, 255, 120))
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=25))
img = Image.alpha_composite(img, glow_layer)

# Second tighter glow
glow2 = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow2_draw = ImageDraw.Draw(glow2)
glow2_draw.text((tx, ty), title, font=title_font, fill=(0, 255, 255, 180))
glow2 = glow2.filter(ImageFilter.GaussianBlur(radius=8))
img = Image.alpha_composite(img, glow2)

# Crisp title text on top
text_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
text_draw = ImageDraw.Draw(text_layer)
text_draw.text((tx, ty), title, font=title_font, fill=(220, 255, 255, 255))
img = Image.alpha_composite(img, text_layer)

# --- Subtitle with glow ---
subtitle = "RETRO GAMES  \u2022  NEON VIBES  \u2022  FREE TO PLAY"
draw_tmp = ImageDraw.Draw(Image.new('RGBA', (1, 1)))
sub_bbox = draw_tmp.textbbox((0, 0), subtitle, font=subtitle_font)
sw = sub_bbox[2] - sub_bbox[0]
sub_x = (W - sw) // 2
sub_y = line_y - 38

sub_glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sub_glow_draw = ImageDraw.Draw(sub_glow)
sub_glow_draw.text((sub_x, sub_y), subtitle, font=subtitle_font, fill=(255, 0, 255, 100))
sub_glow = sub_glow.filter(ImageFilter.GaussianBlur(radius=10))
img = Image.alpha_composite(img, sub_glow)

sub_text = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sub_text_draw = ImageDraw.Draw(sub_text)
sub_text_draw.text((sub_x, sub_y), subtitle, font=subtitle_font, fill=(255, 120, 255, 255))
img = Image.alpha_composite(img, sub_text)

# --- Game cards ---
games = [
    ("NEON DEFENSE", (0, 255, 255)),
    ("NEON SIEGE", (255, 0, 255)),
    ("NEON TANKS", (0, 255, 136)),
    ("VISUALIZER", (255, 215, 0)),
]

card_w, card_h = 210, 75
gap = 30
total_w = len(games) * card_w + (len(games) - 1) * gap
start_x = (W - total_w) // 2
card_y_pos = int(H * 0.72)

cards_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
cards_draw = ImageDraw.Draw(cards_layer)

for i, (name, color) in enumerate(games):
    x = start_x + i * (card_w + gap)

    # Card background
    cards_draw.rounded_rectangle(
        [x, card_y_pos, x + card_w, card_y_pos + card_h],
        radius=8, fill=(10, 10, 30, 220)
    )
    # Card border
    cards_draw.rounded_rectangle(
        [x, card_y_pos, x + card_w, card_y_pos + card_h],
        radius=8, outline=(*color, 200), width=2
    )

    # Card label
    lbl_bbox = cards_draw.textbbox((0, 0), name, font=card_font)
    lw = lbl_bbox[2] - lbl_bbox[0]
    lh = lbl_bbox[3] - lbl_bbox[1]
    lx = x + (card_w - lw) // 2
    ly = card_y_pos + (card_h - lh) // 2

    cards_draw.text((lx, ly), name, font=card_font, fill=(*color, 255))

# Card glow (blur the whole card layer lightly and composite underneath)
card_glow = cards_layer.copy().filter(ImageFilter.GaussianBlur(radius=12))
img = Image.alpha_composite(img, card_glow)
img = Image.alpha_composite(img, cards_layer)

# --- Edge accents ---
edge_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
edge_draw = ImageDraw.Draw(edge_layer)
for i in range(10):
    alpha = int(100 * (1 - i / 10))
    edge_draw.line([(0, H - 1 - i), (W, H - 1 - i)], fill=(0, 255, 255, alpha))
for i in range(8):
    alpha = int(60 * (1 - i / 8))
    edge_draw.line([(0, i), (W, i)], fill=(255, 0, 255, alpha))
img = Image.alpha_composite(img, edge_layer)

# --- Save as RGB PNG ---
img = img.convert('RGB')
img.save("dist/og-image.png", "PNG")
print("Saved dist/og-image.png (1200x630)")
