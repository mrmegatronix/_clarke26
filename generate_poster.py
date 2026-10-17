#!/usr/bin/env python3
"""
Generate A4 300DPI Printable Posters (JPG and PDF) for Clarke Family Reunion 2026
Target dimensions: 2480 x 3508 px (A4 @ 300 DPI)
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_poster():
    W, H = 2480, 3508
    BG_COLOR = (38, 56, 41)       # #263829 Heritage Hunter Green
    CREAM_LIGHT = (244, 238, 225) # #f4eee1 Bright Cream
    CREAM_GOLD = (223, 211, 184)  # #dfd3b8 Warm Parchment / Somerset Cream
    MUTED_GOLD = (158, 147, 123)  # #9e937b Muted Gold
    CARD_BG = (47, 66, 51)        # #2f4233 Elevated Green

    img = Image.new('RGB', (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Fonts
    f_serif_bold = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
    f_serif_reg = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
    f_serif_italic = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
    f_sans_bold = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
    f_sans_reg = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
    f_mono_bold = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"

    font_lineage = ImageFont.truetype(f_serif_bold, 50)
    font_motto = ImageFont.truetype(f_serif_italic, 42)
    font_title = ImageFont.truetype(f_serif_bold, 112)
    font_subtitle = ImageFont.truetype(f_sans_bold, 54)
    font_lead = ImageFont.truetype(f_sans_reg, 38)
    font_scan_badge = ImageFont.truetype(f_sans_bold, 44)
    font_url = ImageFont.truetype(f_mono_bold, 40)
    font_step_title = ImageFont.truetype(f_sans_bold, 36)
    font_step_body = ImageFont.truetype(f_sans_reg, 32)
    font_meta_lbl = ImageFont.truetype(f_sans_bold, 30)
    font_meta_val = ImageFont.truetype(f_sans_bold, 38)
    font_bilingual = ImageFont.truetype(f_serif_italic, 34)

    # 1. Borders
    # Outer Border
    b_out = 70
    draw.rectangle([b_out, b_out, W - b_out, H - b_out], outline=CREAM_GOLD, width=6)
    # Inner Border
    b_in = 95
    draw.rectangle([b_in, b_in, W - b_in, H - b_in], outline=CREAM_GOLD, width=2)

    # Corner Ornaments (L-brackets at corners)
    corn_len = 50
    corn_dist = b_out
    for (cx, cy, dx, dy) in [
        (corn_dist, corn_dist, 1, 1),
        (W - corn_dist, corn_dist, -1, 1),
        (corn_dist, H - corn_dist, 1, -1),
        (W - corn_dist, H - corn_dist, -1, -1)
    ]:
        draw.line([(cx, cy), (cx + dx * corn_len, cy)], fill=CREAM_LIGHT, width=8)
        draw.line([(cx, cy), (cx, cy + dy * corn_len)], fill=CREAM_LIGHT, width=8)

    # 2. Crest
    if os.path.exists('clarke_crest.jpg'):
        crest = Image.open('clarke_crest.jpg')
        target_crest_h = 240
        ratio = target_crest_h / crest.height
        target_crest_w = int(crest.width * ratio)
        crest_resized = crest.resize((target_crest_w, target_crest_h), Image.Resampling.LANCZOS)
        crest_x = (W - target_crest_w) // 2
        crest_y = 150
        img.paste(crest_resized, (crest_x, crest_y))
        cur_y = crest_y + target_crest_h + 30
    else:
        cur_y = 200

    def draw_centered_text(text, font, color, y):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        x = (W - w) // 2
        draw.text((x, y), text, font=font, fill=color)
        return y + (bbox[3] - bbox[0])

    # 3. Lineage & Motto
    draw_centered_text("CLARKES OF CHIPLEY, SOMERSETSHIRE", font_lineage, CREAM_GOLD, cur_y)
    cur_y += 65

    draw_centered_text("“Ye shall drink of the brook by the way”", font_motto, CREAM_GOLD, cur_y)
    cur_y += 65

    # Decorative Divider ── ◆ ──
    div_y = cur_y + 10
    draw.line([(W//2 - 350, div_y), (W//2 - 50, div_y)], fill=CREAM_GOLD, width=2)
    # Diamond
    d_size = 14
    draw.polygon([
        (W//2, div_y - d_size),
        (W//2 + d_size, div_y),
        (W//2, div_y + d_size),
        (W//2 - d_size, div_y)
    ], fill=CREAM_GOLD)
    draw.line([(W//2 + 50, div_y), (W//2 + 350, div_y)], fill=CREAM_GOLD, width=2)
    cur_y += 45

    # 4. Main Titles
    draw_centered_text("CLARKE FAMILY REUNION", font_title, CREAM_LIGHT, cur_y)
    cur_y += 130

    draw_centered_text("OFFICIAL SHARED GOOGLE PHOTOS ALBUM", font_subtitle, CREAM_GOLD, cur_y)
    cur_y += 75

    lead_p1 = "Capture and celebrate our family memories together."
    lead_p2 = "Scan the QR code below with your smartphone camera to view, upload, and save photos!"
    draw_centered_text(lead_p1, font_lead, CREAM_GOLD, cur_y)
    cur_y += 48
    draw_centered_text(lead_p2, font_lead, CREAM_GOLD, cur_y)
    cur_y += 75

    # 5. Centered QR Card
    qr_card_size = 1100
    qr_card_x = (W - qr_card_size) // 2
    qr_card_y = cur_y
    draw.rounded_rectangle(
        [qr_card_x, qr_card_y, qr_card_x + qr_card_size, qr_card_y + qr_card_size],
        radius=36,
        fill=(255, 255, 255),
        outline=CREAM_GOLD,
        width=8
    )

    if os.path.exists('clarke_qr.png'):
        qr_img = Image.open('clarke_qr.png')
        target_qr_size = 1010
        qr_resized = qr_img.resize((target_qr_size, target_qr_size), Image.Resampling.LANCZOS)
        # Handle alpha channel if present
        qr_pos = (qr_card_x + (qr_card_size - target_qr_size) // 2, qr_card_y + (qr_card_size - target_qr_size) // 2)
        if qr_resized.mode == 'RGBA':
            img.paste(qr_resized, qr_pos, qr_resized)
        else:
            img.paste(qr_resized, qr_pos)

    cur_y += qr_card_size + 45

    # 6. QR Badges and URL
    draw_centered_text("SCAN WITH ANY PHONE CAMERA TO JOIN", font_scan_badge, CREAM_LIGHT, cur_y)
    cur_y += 65

    # URL Pill
    url_text = "photos.app.goo.gl/6fGko2NUqKfQp7866"
    bbox_url = draw.textbbox((0, 0), url_text, font=font_url)
    url_w = bbox_url[2] - bbox_url[0]
    pill_pad_x = 40
    pill_pad_y = 16
    pill_x1 = (W - url_w) // 2 - pill_pad_x
    pill_y1 = cur_y
    pill_x2 = (W + url_w) // 2 + pill_pad_x
    pill_y2 = cur_y + (bbox_url[3] - bbox_url[1]) + (pill_pad_y * 2)
    draw.rounded_rectangle([pill_x1, pill_y1, pill_x2, pill_y2], radius=28, fill=CARD_BG, outline=CREAM_GOLD, width=3)
    draw.text(((W - url_w) // 2, pill_y1 + pill_pad_y - 2), url_text, font=font_url, fill=CREAM_LIGHT)
    cur_y = pill_y2 + 55

    # 7. Three Steps Horizontal
    step_w = 680
    step_h = 160
    step_gap = 50
    steps_total_w = 3 * step_w + 2 * step_gap
    start_step_x = (W - steps_total_w) // 2

    steps_data = [
        ("1. Open Camera", "Open standard Camera app", "on iPhone or Android"),
        ("2. Scan Code", "Hold camera steady over", "the QR code above"),
        ("3. View & Upload", "Tap Google Photos banner", "to open album & add photos")
    ]

    for i, (title, line1, line2) in enumerate(steps_data):
        sx = start_step_x + i * (step_w + step_gap)
        sy = cur_y
        draw.rounded_rectangle([sx, sy, sx + step_w, sy + step_h], radius=16, fill=CARD_BG, outline=CREAM_GOLD, width=2)
        
        # Title
        tb = draw.textbbox((0, 0), title, font=font_step_title)
        draw.text((sx + (step_w - (tb[2]-tb[0]))//2, sy + 20), title, font=font_step_title, fill=CREAM_LIGHT)
        # Line 1
        l1b = draw.textbbox((0, 0), line1, font=font_step_body)
        draw.text((sx + (step_w - (l1b[2]-l1b[0]))//2, sy + 72), line1, font=font_step_body, fill=CREAM_GOLD)
        # Line 2
        l2b = draw.textbbox((0, 0), line2, font=font_step_body)
        draw.text((sx + (step_w - (l2b[2]-l2b[0]))//2, sy + 112), line2, font=font_step_body, fill=CREAM_GOLD)

    cur_y += step_h + 60

    # 8. Event Metadata & Venue Section
    draw.line([(b_in + 40, cur_y), (W - b_in - 40, cur_y)], fill=CREAM_GOLD, width=2)
    cur_y += 35

    col_w = (W - 2 * b_in) // 3
    meta_cols = [
        ("GATHERING DATE", "Oct 17, 2026 • From 7:30 PM"),
        ("ALBUM TITLE", "2026 -CLARKE FAMILY REUNION"),
        ("CELEBRATION VENUE", "Papanui Club, Christchurch")
    ]

    for i, (lbl, val) in enumerate(meta_cols):
        cx = b_in + i * col_w + col_w // 2
        # Label
        lb = draw.textbbox((0, 0), lbl, font=font_meta_lbl)
        draw.text((cx - (lb[2]-lb[0])//2, cur_y), lbl, font=font_meta_lbl, fill=CREAM_GOLD)
        # Value
        vb = draw.textbbox((0, 0), val, font=font_meta_val)
        draw.text((cx - (vb[2]-vb[0])//2, cur_y + 44), val, font=font_meta_val, fill=CREAM_LIGHT)

    cur_y += 120

    # 9. Bilingual Bottom Greeting
    div_y2 = cur_y
    draw.line([(W//2 - 250, div_y2), (W//2 - 30, div_y2)], fill=CREAM_GOLD, width=1)
    draw.polygon([
        (W//2, div_y2 - 8),
        (W//2 + 8, div_y2),
        (W//2, div_y2 + 8),
        (W//2 - 8, div_y2)
    ], fill=CREAM_GOLD)
    draw.line([(W//2 + 30, div_y2), (W//2 + 250, div_y2)], fill=CREAM_GOLD, width=1)
    cur_y += 25

    bilingual_text = "Please RSVP by 31 July  •  ashleycroons@yahoo.com  •  027 584 4663"
    draw_centered_text(bilingual_text, font_bilingual, CREAM_GOLD, cur_y)

    # 10. Save Output Files
    jpg_path = "clarke_photos_qr_printable.jpg"
    pdf_path = "clarke_photos_qr_printable.pdf"

    print("Saving", jpg_path, "...")
    img.save(jpg_path, quality=95, dpi=(300, 300))
    print("JPG saved successfully ({} bytes)".format(os.path.getsize(jpg_path)))

    print("Saving", pdf_path, "...")
    img.save(pdf_path, "PDF", resolution=300.0)
    print("PDF saved successfully ({} bytes)".format(os.path.getsize(pdf_path)))

if __name__ == '__main__':
    create_poster()
