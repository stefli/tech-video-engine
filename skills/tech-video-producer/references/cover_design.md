# Xiaohongshu & Short-Video Viral Big Poster Architecture (4K Multi-Format Standard)

## 1. Visual Hierarchy & The Four-Tier Typography Rule

To guarantee 100% legibility on mobile dual-column recommendation feeds, **strictly ban any text smaller than 44px on a 2160×2880 canvas**:

| Tier | Role | Size Range | Styling & Contrast |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Hero Impact Titles** | **130px - 190px** | Weight 900. Lead noun in white on black block (`130px`); core conflict on **fluorescent yellow plate (#ffe500)** in black text (`180px`); core conclusion on **flame red plate (#ff2442)** in white text (`160px`). |
| **Tier 2** | **Giant Shock Metrics** | **110px - 120px** | Unbordered solid contrast blocks (e.g. `72h ➔ 3.2s` in flame red, `99.4%` in cyber blue). |
| **Tier 3** | **Statements & Metric Labels** | **46px - 56px** | Core statement (`56px`, 1.35 line-height). Telemetry labels (`48px`). Metric descriptions (`46px`). |
| **Tier 4** | **Badges & Action Banners** | **44px - 52px** | Top kicker tape (`48px`, with 52px Material Icon SVG). Top right topic tag (`44px`). Bottom full-width banner (`52px` black on yellow). |

---

## 2. Core Anti-AI-Slop Rules

1. **Full-Bleed Real Photo Background, Not Flat Colors**
   - Use high-resolution real photography (server hardware, mainframe corridors, lens flare, optical conduits).
   - Apply subtle vignette gradients (`rgba(4,7,17, 0.7)` to `#040711`) so the photo is 100% clearly visible while text pops with high contrast.
2. **Dedicated Solid Color Plates (Taped Text Blocks)**
   - Underlay key headlines with high-saturation solid blocks to mimic physical highlighter tape.
3. **Irregular Geometry & Dynamic Skew**
   - Skew and rotate blocks by `-2°` to `+1.5°` (`transform: rotate(-2deg) skewX(-3deg)`) to break digital grid rigidity.
   - Use trapezoid tape ends via `clip-path: polygon(0% 0%, 96% 0%, 100% 100%, 4% 100%)`.
4. **Strict Zero-Occlusion Guarantee**
   - Banned: Floating stamps/badges with `position: absolute` that risk covering text.
   - Mandatory: Vertical document flex flow with 28px - 36px clean margins between every line.
5. **No AI Borders**
   - Zero `border-left` quote stripes. Zero `border-top` accents. Zero grey-line rounded boxes.
6. **Official Google Material Icons Only (Apache License 2.0)**
   - Ban cheap phone emojis (⚠️, ⚡, 🛡️).
   - Embed official vector SVGs (`warning`, `bolt`, `shield`). Free for commercial use, royalty-free.

---

## 3. Master Triple-Cutter Board Architecture (6480 × 3840 Top-Aligned, No Borders)

To allow users to maintain **a single master image file** that can be directly cropped for any platform without downscaling or resampling blur:

```text
0px               2160px             4320px             6480px
0px ┌──────────────────┬──────────────────┬──────────────────┐
    │                  │                  │                  │
    │                  │                  │  PANEL C (1:1)   │
    │                  │                  │  2160 × 2160     │
    │                  │  PANEL B (3:4)   │  Square Thumb    │
    │                  │  2160 × 2880     ├──────────────────┤
    │                  │  Channels Card   │                  │
    │  PANEL A (9:16)  ├──────────────────┤                  │
    │  2160 × 3840     │                  │  (Bottom Space)  │
    │  TikTok/Shorts   │  (Bottom Space)  │                  │
    │  100% Native 4K  │                  │                  │
    │                  │                  │                  │
3840└──────────────────┴──────────────────┴──────────────────┘
```

- **Top-Aligned (Y=0)**: All panels start flush at the top line `Y=0`.
- **Sequential Left-to-Right**: `9:16` -> `3:4` -> `1:1`.
- **Zero Border Lines**: Completely seamless display without overlay borders.
- **Effortless One-Cut Cropping Coordinates**:
  - **Slice A (9:16 Fullscreen)**: `X: 0, Y: 0, W: 2160, H: 3840`
  - **Slice B (3:4 Channels Card)**: `X: 2160, Y: 0, W: 2160, H: 2880`
  - **Slice C (1:1 Square Grid)**: `X: 4320, Y: 0, W: 2160, H: 2160`

Always generate three synchronized assets:

1. **3:4 Feed Master (`2160 × 2880`)**:
   - The primary click-driver for Xiaohongshu and WeChat Channels feed cards.
2. **9:16 Fullscreen Adaptive (`2160 × 3840`)**:
   - Pads the 3:4 master centered on a 9:16 canvas with matching ambient photo gradient (480px top/bottom safe margin for TikTok/Shorts).
3. **1:1 Square Profile Thumbnail (`2160 × 2160`)**:
   - Crops the central Y=340px to Y=2500px region for profile grid previews without cutting text.
