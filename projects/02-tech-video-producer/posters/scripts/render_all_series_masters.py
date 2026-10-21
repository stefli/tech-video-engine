import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding="utf-8")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = Path("outputs/posters").resolve()
OUT_DIR.mkdir(parents=True, exist_ok=True)

def render_and_build_board(slug, title_label, h_3_4_name, h_9_16_name, theme_border_2, theme_border_3):
    h_3_4 = (OUT_DIR / h_3_4_name).resolve()
    p_3_4 = OUT_DIR / f"{slug}_photo_poster_3_4.png"
    
    h_9_16 = (OUT_DIR / h_9_16_name).resolve()
    p_9_16 = OUT_DIR / f"{slug}_photo_poster_9_16.png"
    
    p_1_1 = OUT_DIR / f"{slug}_photo_poster_1_1.png"
    combo_board = OUT_DIR / f"{slug}_triple_cutter_board_4k.png"
    
    print(f"\n==========================================")
    print(f"Processing Suite: {title_label} ({slug})")
    print(f"==========================================")
    
    # 1. Render 3:4 (2160 x 2880)
    print("1. Rendering 3:4...")
    cmd1 = [
        CHROME, "--headless=new", "--disable-gpu",
        "--force-device-scale-factor=1", "--window-size=2160,2880",
        f"--screenshot={p_3_4}", h_3_4.as_uri()
    ]
    subprocess.run(cmd1, check=True)
    print(f"   -> Saved: {p_3_4}")
    
    # 2. Render 9:16 (2160 x 3840)
    print("2. Rendering 9:16...")
    cmd2 = [
        CHROME, "--headless=new", "--disable-gpu",
        "--force-device-scale-factor=1", "--window-size=2160,3840",
        f"--screenshot={p_9_16}", h_9_16.as_uri()
    ]
    subprocess.run(cmd2, check=True)
    print(f"   -> Saved: {p_9_16}")
    
    # 3. Crop 1:1 (2160 x 2160) from 3:4
    img_3_4 = Image.open(p_3_4)
    W, H = img_3_4.size # 2160 x 2880
    top_sq = 320
    crop_sq = img_3_4.crop((0, top_sq, W, top_sq + W))
    crop_sq.save(p_1_1, quality=95)
    print(f"   -> Saved 1:1: {p_1_1}")
    
    # 4. Assemble Seamless Top-Aligned Master Triple Board (6480 x 3840, No Borders)
    print("3. Assembling 6480x3840 Top-Aligned Board (No Borders)...")
    img_9_16 = Image.open(p_9_16)
    
    # Exact 6480 x 3840 Canvas: Top-Aligned, Left-to-Right, No Borders
    board = Image.new("RGB", (6480, 3840), "#020409")
    
    # Panel 1: 9:16 Fullscreen (2160 x 3840) placed at (0, 0)
    board.paste(img_9_16, (0, 0))
    
    # Panel 2: 3:4 Feed Card (2160 x 2880) placed at (2160, 0) - Top Aligned!
    board.paste(img_3_4, (2160, 0))
    
    # Panel 3: 1:1 Square Thumbnail (2160 x 2160) placed at (4320, 0) - Top Aligned!
    board.paste(crop_sq, (4320, 0))
    
    board.save(combo_board, quality=94)
    print(f"   -> [SUCCESS] Built Top-Aligned Seamless Board (6480x3840, No Borders): {combo_board}")

if __name__ == "__main__":
    # Suite 1: OpenCode
    render_and_build_board(
        "opencode",
        "OPENCODE 24H AI 攻防",
        "photo_cover_3_4.html",
        "photo_cover_9_16.html",
        "#ffe600",
        "#38bdf8"
    )
    
    # Suite 2: Anthropic
    render_and_build_board(
        "anthropic",
        "ANTHROPIC 27%->9% 用工报告",
        "anthropic_photo_3_4.html",
        "anthropic_photo_9_16.html",
        "#f59e0b",
        "#f43f5e"
    )
    
    # Suite 3: Gemini
    render_and_build_board(
        "gemini",
        "GEMINI 4 ARGON 交付时代",
        "gemini_photo_3_4.html",
        "gemini_photo_9_16.html",
        "#10b981",
        "#38bdf8"
    )
    print("\nALL 3 TOPICAL SUITES FULLY RENDERED & ASSEMBLED!")
