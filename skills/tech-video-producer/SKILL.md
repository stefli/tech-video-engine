---
name: tech-video-producer
description: Produce professional technology blog and news videos (16:9 widescreen or 9:16 vertical shorts in 4K resolution) using OpenDesign/HyperFrames, official artifact demos, cyber inspector viewports, platform-safe-zone compliance, and broadcast-grade mastered narration.
metadata:
  short-description: Professional 4K tech news & blog video production
---

# Tech Video Producer

Produce high-density, authoritative technology news and breakdown videos for frontier models, hardware, and engineering breakthroughs. Generates studio-grade 4K artifacts without generic AI slop, irrelevant stock imagery, or fuzzy full-screen stretches.

## High-Velocity Production & Performance Pipeline

To prevent slow turnaround times while maintaining true 4K quality, strictly adhere to these performance invariants:

1. **Parallel Async TTS Generation (5x Speedup)**
   - Never invoke TTS sequentially in a blocking `for` loop.
   - Use `asyncio.gather(*[gen_one(...)])` to request all 7 narration chunks concurrently, reducing audio generation from ~30s down to **5-8s**.

2. **Zero-Disk In-Engine Code Animation**
   - Do not write hundreds of PNG frames to disk to encode terminal videos.
   - Animate code streams directly in the HTML composition using CSS `@keyframes` or GSAP timeline tweens. This eliminates disk I/O, prevents asset extraction delays in HyperFrames, and produces infinitely sharp vector text.

3. **Multi-Worker 4K Parallel Rendering (-w 4 on >=16GB RAM)**
   - Do NOT pass `--low-memory-mode -w 1` on modern workstations (>=16GB RAM). That flag is reserved for constrained <=8GB machines and cripples throughput.
   - Set `-w 4` (or `-w auto`) with `--no-browser-gpu`. HyperFrames will spawn 4 parallel Chrome worker instances to supersample 4K chunks concurrently, cutting render time from **~5 minutes down to ~1 minute**.

4. **Two-Stage Verification Loop**
   - Stage 1 (Verification): Run `hyperframes lint` (<3s) and `hyperframes snapshot` (<10s) across 7 beat timestamps to verify typography and safe zones.
   - Stage 2 (Final Delivery): Trigger 4K render once verified.

## Core Production Principles

1. **Mandatory 4K Output for Short-Video Platforms (Anti-Compression Rule)**
   - **Video Channels (WeChat), Douyin/TikTok, Xiaohongshu, and Bilibili aggressively re-encode 1080p uploads down to ~1-2 Mbps, completely destroying fine text, HUD lines, and dark gradients.**
   - **Always export in native 4K**:
     - **Vertical (9:16)**: `--resolution portrait-4k` (`2160 × 3840`)
     - **Widescreen (16:9)**: `--resolution landscape-4k` (`3840 × 2160`)
   - 4K uploads trigger the platforms' highest-tier transcoding profiles, preserving needle-sharp text and micro-contrast even after platform downsampling.

2. **Strictly Verified Artifacts (No Irrelevant B-Roll)**
   - Use only authentic demonstration captures, official blog key art, and verified benchmark charts directly from the primary creator (e.g. Google DeepMind, Tesla, OpenAI).
   - Never use unrelated sci-fi stock footage, generic neural network animations, or mascot illustrations.

3. **Cyber Inspector Viewport (Zero Pixel Blur)**
   - Never stretch 720p or 1080p source captures to full screen.
   - Place demonstration recordings inside a dedicated 16:9 frosted-glass **Cyber Inspector Viewport** with hardware frame accents, glowing borders, and 60fps telemetry badges.
   - Surround the viewport with razor-sharp vector typography, coordinate grids, and telemetry matrices to elevate perceived resolution to studio grade.

4. **Complete 7-Beat Narrative Arc (35s - 48s)**
   - **Beat 01 · Intro / The Hook (0 - 6.8s)**: State the paradigm shift; frame the central thesis; reveal the official hero model viewport.
   - **Beat 02 · Beyond Chat (6.8 - 13.6s)**: Detail target engineering domains (Coding, Finance, Legal, Cybersecurity, Science).
   - **Beat 03 · Artifact 01 / Playable Game (13.6 - 20.6s)**: Single photo input directly compiling into real-time rigid body physics and playable WebGL/JS game.
   - **Beat 04 · Artifact 02 / 3D Architecture (20.6 - 27.6s)**: Volumetric ray-marching from wooden bracket pagodas to Gothic cathedral lighting.
   - **Beat 05 · Artifact 03 / Procedural Motion (27.6 - 34.0s)**: Vanilla Python + NumPy 5,500+ LOC continuous 3D animation without third-party game engines.
   - **Beat 06 · Workbench Benchmarks (34.0 - 40.8s)**: 1,048,576 Token long-horizon context engine + official Vals Index / DeepSWE charts.
   - **Beat 07 · Outro / Verdict & CTA (40.8 - 48.0s)**: High-conviction summary, availability access channels, and channel subscription call-to-action.

5. **Broadcast-Grade Acoustics (No Casual AI Voice)**
   - Select an authoritative, deep male broadcast voice (`zh-CN-YunyangNeural` at `rate=+14%, pitch=-1Hz`).
   - Process voiceover through a studio mastering chain: highpass 80Hz -> 220Hz warmth -> 3.3kHz intelligibility -> 8.5kHz air -> compression -> EBU R128 loudness normalization (`-21.6 dB` mean, `-2.5 dB` peak).
   - Pair with an original 48-second pulse synthesizer score featuring sub-bass drops, metallic clock ticks, and cut-point whooshes.

6. **Xiaohongshu & Short-Video Viral Big Poster Principles (Human-Designer Standard)**
   - **Real Photo Background, Not Flat Colors**: Never use flat dark gradients or code dots. Full-bleed real cinematic photography (e.g. server mainframe corridors, optical conduits, hardware lighting) provides depth and visceral reality.
   - **Solid Color Plates Behind Text (Taped Blocks)**: Underlay key words with high-saturation solid blocks (e.g. bright fluorescent yellow `#ffe500` with pure black text; flame red `#ff2442` with white text).
   - **Dynamic Irregular Geometry**: Add slight asymmetric rotation (`-2°` to `+1.5°`) and polygon skewing (`skewX`) to color ribbons to eliminate rigid grid stiffness.
   - **Four-Tier Typography (No Text Under 44px)**:
     - Tier 1 (Hero Title): `130px - 190px` (Weight 900)
     - Tier 2 (Giant Metrics): `110px - 120px` (e.g. `72h ➔ 3.2s`, `99.4%`)
     - Tier 3 (Statement & Labels): `46px - 56px` (Enlarged from old 28px, 100% legible on phones)
     - Tier 4 (Badges & Banners): `44px - 52px` (Action gold strips)
   - **Strict Zero-Occlusion Guarantee**: Never use absolute-positioned floating stamps that overlap text. Use vertical flex flow with 28px-36px clear breathing room between all layers.
   - **No AI Border Slop**: Ban decorative `border-left` quotes, `border-top` stripes, and grey outline boxes.
   - **No Cheap Phone Emoji**: Ban standard phone emojis. Use official **Google Material Design Icons** (Apache License 2.0, free commercial use) embedded as crisp vector SVGs.

7. **9:16 Vertical Safe-Zone & Large Typography Compliance**
   - **Top 0 - 220px**: Completely empty to avoid platform search/follow navigation overlays.
   - **Bottom 1360 - 1920px (560px Clearance)**: Completely empty to avoid caption, creator profile, action bar, and audio disc overlays.
   - **Golden Center (220px - 1360px)**: Concentrates all visual hierarchy.
   - **Mobile Legibility**: Headline `104px`, Narrative `42px`, Metadata Labels `26px` (2x+ enlarged), Telemetry Numbers `56px` (2x enlarged). Remove repetitive `Chapter XXX` clutter.

## Reference Guides

- For vertical 9:16 layout coordinates and safe zones, read [references/vertical_safe_zones.md](references/vertical_safe_zones.md).
- For viral Xiaohongshu-style big poster design rules and 3:4/9:16/1:1 templates, read [references/cover_design.md](references/cover_design.md).
- For the broadcast audio mastering chain and synthesizer script, read [references/audio_mastering.md](references/audio_mastering.md).
- For the HyperFrames 4K render commands and flags, read [references/render_pipeline.md](references/render_pipeline.md).
