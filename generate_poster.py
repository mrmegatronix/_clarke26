#!/usr/bin/env python3
"""
Generate Simple, Clean A4 300DPI Printable Posters (JPG and PDF) for Clarke Family Reunion
Target dimensions: 2480 x 3508 px (A4 @ 300 DPI)
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_poster():
    W, H = 2480, 3508
    BG_COLOR = (38, 56, 41)       # #263829 Heritage Hunter Green
    CREAM_LIGHT = (244, 238, 225) # #f4eee1 Bright Cream
    CREAM_GOLD = (223, 211, 184)  # #dfd3b8 Warm Parchment

    img = Image.new('RGB', (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)

    f_serif_bold = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
    f_sans_bold = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
    f_mono_bold = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"

    font_title = ImageFont.truetype(f_serif_bold, 124)
    font_subtitle = ImageFont.truetype(f_sans_bold, 68)
    font_scan = ImageFont.truetype(f_sans_bold, 58)
    font_url = ImageFont.truetype(f_mono_bold, 46)

    # Simple single clean border
    b_margin = 110
    draw.rectangle([b_margin, b_margin, W - b_margin, H - b_margin], outline=CREAM_GOLD, width=6)

    def draw_centered_text(text, font, color, y):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        x = (W - w) // 2
        draw.text((x, y), text, font=font, fill=color)
        return y + (bbox[3] - bbox[1])

    cur_y = 280

    # 1. Crest
    if os.path.exists('clarke_crest.jpg'):
        crest = Image.open('clarke_crest.jpg')
        target_crest_h = 300
        ratio = target_crest_h / crest.height
        target_crest_w = int(crest.width * ratio)
        crest_resized = crest.resize((target_crest_w, target_crest_h), Image.Resampling.LANCZOS)
        crest_x = (W - target_crest_w) // 2
        img.paste(crest_resized, (crest_x, cur_y))
        cur_y += target_crest_h + 90

    # 2. Title & Subtitle
    draw_centered_text("CLARKE FAMILY REUNION", font_title, CREAM_LIGHT, cur_y)
    cur_y += 155
    draw_centered_text("Shared Photo Album", font_subtitle, CREAM_GOLD, cur_y)
    cur_y += 140

    # 3. Large Centered QR Code
    qr_card_size = 1520
    qr_card_x = (W - qr_card_size) // 2
    qr_card_y = cur_y
    draw.rounded_rectangle(
        [qr_card_x, qr_card_y, qr_card_x + qr_card_size, qr_card_y + qr_card_size],
        radius=40,
        fill=(255, 255, 255),
        outline=CREAM_GOLD,
        width=10
    )

    if os.path.exists('clarke_qr.png'):
        qr_img = Image.open('clarke_qr.png')
        target_qr_size = 1400
        qr_resized = qr_img.resize((target_qr_size, target_qr_size), Image.Resampling.LANCZOS)
        qr_pos = (qr_card_x + (qr_card_size - target_qr_size) // 2, qr_card_y + (qr_card_size - target_qr_size) // 2)
        if qr_resized.mode == 'RGBA':
            img.paste(qr_resized, qr_pos, qr_resized)
        else:
            img.paste(qr_resized, qr_pos)

    cur_y += qr_card_size + 110

    # 4. Simple Scan Prompt & URL
    draw_centered_text("Scan with your phone camera to view & upload photos", font_scan, CREAM_LIGHT, cur_y)
    cur_y += 95
    draw_centered_text("photos.app.goo.gl/6fGko2NUqKfQp7866", font_url, CREAM_GOLD, cur_y)

    jpg_path = "clarke_photos_qr_printable.jpg"
    pdf_path = "clarke_photos_qr_printable.pdf"

    img.save(jpg_path, quality=95, dpi=(300, 300))
    img.save(pdf_path, "PDF", resolution=300.0)
    print("Saved simple poster:", jpg_path, pdf_path)

if __name__ == '__main__':
    create_poster()
