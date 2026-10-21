# 9:16 Vertical Safe Zones & Layout Architecture

Designed for mobile short-video feeds (TikTok, Douyin, WeChat Channels, YouTube Shorts, Xiaohongshu).

## Spatial Coordinate Map (1080 × 1920)

```text
0px    ┌──────────────────────────────────┐
       │   TOP SAFE ZONE (0 - 220px)      │ <-- Leave completely empty
       │   [Platform Follow / Search]     │
220px  ├──────────────────────────────────┤
       │   HEADLINE ZONE (220 - 440px)    │ <-- 104px Bold Titanium Titles
       │   [Visual Focus Entry]           │
440px  ├──────────────────────────────────┤
       │   CENTRAL VIEWPORT (450 - 1020px)│ <-- 16:9 Frosted Monitor Card
       │   [Native 60FPS Video Capture]   │
1020px ├──────────────────────────────────┤
       │   TELEMETRY & INFO (1030-1360px) │ <-- 42px Narrative + 26/56px Specs
       │   [Dual Spec Cells & Matrix]     │
1360px ├──────────────────────────────────┤
       │   BOTTOM SAFE ZONE (1360-1920px) │ <-- Leave completely empty
       │   [Creator Handle & Caption]     │     (560px Clearance)
       │   [Like / Comment / Share Icons] │
       │   [Rotating Music Disc / Bar]    │
1920px └──────────────────────────────────┘
```

## CSS Core Rules

```css
/* Golden Zone Bounds */
.upper-section {
  position: absolute;
  top: 220px;
  left: 64px;
  right: 64px;
}
.headline {
  font-family: var(--display);
  font-size: 104px;
  font-weight: 700;
  line-height: 0.94;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

/* Native Pixel Viewport Card */
.central-viewport {
  position: absolute;
  top: 450px;
  left: 64px;
  right: 64px;
  height: 556px; /* 16:9 aspect for 952px width */
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(56, 189, 248, 0.12);
  overflow: hidden;
}

/* Lower Section Clamped at Y=1360px */
.lower-section {
  position: absolute;
  top: 1036px;
  left: 64px;
  right: 64px;
}
.narrative {
  font-size: 42px;
  line-height: 1.45;
  font-weight: 350;
  color: #cbd5e1;
  margin-bottom: 24px;
}
.spec-item .label {
  font-size: 26px; /* 2x+ Enlargement for Mobile */
  color: #64748b;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.spec-item .val {
  font-size: 56px; /* 2x Enlargement */
  font-weight: 700;
  color: #f6f8fa;
  line-height: 1;
}
```
