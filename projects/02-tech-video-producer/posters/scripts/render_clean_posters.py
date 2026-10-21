import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = Path("outputs/posters").resolve()
OUT_DIR.mkdir(parents=True, exist_ok=True)

def render_and_build_package(html_name, slug, title_label):
    html_file = (OUT_DIR / html_name).resolve()
    p_9_16 = OUT_DIR / f"{slug}_poster_9_16_4k.png"
    
    print(f"Rendering 4K Vertical Poster for {slug}...")
    cmd = [
        CHROME, "--headless=new", "--disable-gpu",
        "--force-device-scale-factor=1", "--window-size=2160,3840",
        f"--screenshot={p_9_16}", html_file.as_uri()
    ]
    subprocess.run(cmd, check=True)
    
    img_9_16 = Image.open(p_9_16)
    W, H = img_9_16.size # 2160 x 3840
    
    # 1. Precise 3:4 Crop (2160 x 2880) - Perfectly centered in the Y=480 to Y=3360 region
    target_h_3_4 = 2880
    top_3_4 = (H - target_h_3_4) // 2 # 480
    crop_3_4 = img_9_16.crop((0, top_3_4, W, top_3_4 + target_h_3_4))
    p_3_4 = OUT_DIR / f"{slug}_poster_3_4_feed.png"
    crop_3_4.save(p_3_4, quality=95)
    print(f"[OK] Saved 3:4 Feed Card: {p_3_4}")
    
    # 2. Precise 1:1 Crop (2160 x 2160) - Perfectly centered in the Y=840 to Y=3000 region
    target_h_1_1 = 2160
    top_1_1 = (H - target_h_1_1) // 2 # 840
    crop_1_1 = img_9_16.crop((0, top_1_1, W, top_1_1 + target_h_1_1))
    p_1_1 = OUT_DIR / f"{slug}_poster_1_1_square.png"
    crop_1_1.save(p_1_1, quality=95)
    print(f"[OK] Saved 1:1 Square Profile: {p_1_1}")
    
    # 3. Master Combo Exhibition Board (Side-by-Side 3-Panel Exhibition Sheet)
    # Width: 3 panels of 1080 scaled down + margins = 3840 wide x 2160 high!
    # Left: 9:16 (scaled to 1080x1920, centered vertically)
    # Middle: 3:4 (scaled to 1200x1600 or 1080x1440, centered vertically)
    # Right: 1:1 (scaled to 1080x1080, centered vertically)
    
    board_w = 3840
    board_h = 2160
    board = Image.new("RGB", (board_w, board_h), "#02040a")
    draw = ImageDraw.Draw(board)
    
    try:
        font_label = ImageFont.truetype("C:/Windows/Fonts/bahnschrift.ttf", 36)
        font_header = ImageFont.truetype("C:/Windows/Fonts/bahnschrift.ttf", 52)
    except:
        font_label = ImageFont.load_default()
        font_header = font_label
        
    draw.text((120, 50), f"MASTER POSTER EXHIBITION // {title_label}", fill="#ffffff", font=font_header)
    draw.text((120, 115), "THREE COMPLIANT RESOLUTIONS GENERATED · CROP-FREE READY FOR PUBLICATION", fill="#38bdf8", font=font_label)
    
    # Panel 1: 9:16 Fullscreen (Width 960, Height 1707)
    thumb_9_16 = img_9_16.resize((960, 1707), Image.Resampling.LANCZOS)
    x1, y1 = 120, 200
    board.paste(thumb_9_16, (x1, y1))
    draw.rectangle([x1, y1, x1 + 960, y1 + 1707], outline="#334155", width=2)
    draw.text((x1 + 20, y1 + 1725), "PANEL A: 9:16 (2160x3840 4K FULLSCREEN)", fill="#94a3b8", font=font_label)
    
    # Panel 2: 3:4 Feed Card (Width 1080, Height 1440)
    thumb_3_4 = crop_3_4.resize((1080, 1440), Image.Resampling.LANCZOS)
    x2, y2 = 1200, 333
    board.paste(thumb_3_4, (x2, y2))
    draw.rectangle([x2, y2, x2 + 1080, y2 + 1440], outline="#334155", width=2)
    draw.text((x2 + 20, y2 + 1460), "PANEL B: 3:4 (2160x2880 CHANNELS FEED CARD)", fill="#38bdf8", font=font_label)
    
    # Panel 3: 1:1 Square (Width 1080, Height 1080)
    thumb_1_1 = crop_1_1.resize((1080, 1080), Image.Resampling.LANCZOS)
    x3, y3 = 2400, 513
    board.paste(thumb_1_1, (x3, y3))
    draw.rectangle([x3, y3, x3 + 1080, y3 + 1080], outline="#334155", width=2)
    draw.text((x3 + 20, y3 + 1100), "PANEL C: 1:1 (2160x2160 SQUARE PROFILE THUMB)", fill="#10b981", font=font_label)
    
    combo_path = OUT_DIR / f"{slug}_poster_combo_sheet.png"
    board.save(combo_path, quality=94)
    print(f"[OK] Saved Master Side-by-Side Board: {combo_path}\n")

print("Executing Clean Non-overlapping Poster Builds for OpenCode & Anthropic...")
render_and_build_package("opencode_poster.html", "opencode", "OPENCODE 24H AI ATTACK // RESIDENT AGENT")
render_and_build_package("anthropic_poster.html", "anthropic", "ANTHROPIC REPORT // JUNIOR SWE CRASH 27% -> 9%")
print("All Clean Posters Generated Successfully!")
