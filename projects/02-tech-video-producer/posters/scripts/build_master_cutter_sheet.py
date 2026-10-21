import sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
OUT_DIR = Path("outputs/posters").resolve()

def assemble_top_aligned_board(p_9_16_path, p_3_4_path, p_1_1_path, output_filename):
    img_9_16 = Image.open(p_9_16_path) # 2160 x 3840
    img_3_4 = Image.open(p_3_4_path)   # 2160 x 2880
    img_1_1 = Image.open(p_1_1_path)   # 2160 x 2160
    
    # 3 Panels Side-by-Side:
    # Width = 2160 * 3 = 6480
    # Height = 3840 (the max height)
    # Top-aligned at Y = 0, Left to Right: 9:16 -> 3:4 -> 1:1, NO BORDERS!
    board = Image.new("RGB", (6480, 3840), "#020409")
    
    # 1. Left (Panel 1): 9:16 Fullscreen (2160 x 3840) at (0, 0)
    board.paste(img_9_16, (0, 0))
    
    # 2. Middle (Panel 2): 3:4 Feed Card (2160 x 2880) at (2160, 0) -> Top Aligned!
    board.paste(img_3_4, (2160, 0))
    
    # 3. Right (Panel 3): 1:1 Square (2160 x 2160) at (4320, 0) -> Top Aligned!
    board.paste(img_1_1, (4320, 0))
    
    out_path = OUT_DIR / output_filename
    board.save(out_path, quality=95)
    print(f"[OK] Generated Top-Aligned Seamless Board (6480x3840, No Borders): {out_path}")

if __name__ == "__main__":
    # OpenCode
    assemble_top_aligned_board(
        OUT_DIR / "opencode_photo_poster_9_16.png",
        OUT_DIR / "opencode_photo_poster_3_4.png",
        OUT_DIR / "opencode_photo_poster_1_1.png",
        "opencode_triple_cutter_board_4k.png"
    )
    # Anthropic
    assemble_top_aligned_board(
        OUT_DIR / "anthropic_photo_poster_9_16.png",
        OUT_DIR / "anthropic_photo_poster_3_4.png",
        OUT_DIR / "anthropic_photo_poster_1_1.png",
        "anthropic_triple_cutter_board_4k.png"
    )
    # Gemini
    assemble_top_aligned_board(
        OUT_DIR / "gemini_photo_poster_9_16.png",
        OUT_DIR / "gemini_photo_poster_3_4.png",
        OUT_DIR / "gemini_photo_poster_1_1.png",
        "gemini_triple_cutter_board_4k.png"
    )
    print("All 3 Suites Top-Aligned Master Boards Generated Successfully!")
