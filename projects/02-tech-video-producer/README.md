# Tech Video Producer (4K 科技短片与大字报制作管线)

> **极速生成专业、高信息密度、拒绝 AI 模板味的 4K 科技新闻视频与爆款大字报封面。**
> 支持 16:9 横屏技术专栏与 9:16 移动竖屏短视频（微信视频号、抖音、TikTok、B站、小红书、YouTube Shorts）。

---

## 🌟 核心特色与工程哲学

1. **强制原生 4K 防压缩法则（Anti-Platform-Compression Standard）**
   - 微信视频号、抖音等平台对 1080p 上传执行极其激进的重采样压缩（砍至 1~2 Mbps，细线与文字边缘发虚严重）。
   - 本管线强制输出 **`2160 × 3840` 原生 4K 竖屏** 与 **`3840 × 2160` 原生 4K 横屏**，触发平台最高权重转码白名单，细节保留度是普通 1080p 的 3~5 倍！
2. **拒绝低清拉伸的“科技监视框”（Cyber Inspector Viewport）**
   - 官方 Demo 往往受限于网络录屏只有 720p/1080p，强行全屏拉伸必然产生严重马赛克。
   - 本管线采用**高精度视窗监视台**：原画在中央专属纳米发光框内以**原生像素密度**回放，外围环绕高清矢量数据、坐标尺与大字标题，画质通透紧致。
3. **9:16 短视频平台安全区避让（Platform Safe-Zone Compliant）**
   - **顶部安全区 (0 - 220px)**：彻底清空，防止被关注/推荐/搜索栏遮挡；
   - **底部安全区 (1360 - 1920px，预留 560px 纯净空白)**：彻底清空，避开点赞、评论、作者信息、转盘音乐；
   - **黄金视区中上部 (220px - 1360px)**：大标题、视窗、42px 解说文字与 56px 核心指标方块全量居中。
4. **小红书实景大字报与无损三联裁切画板（Master Triple-Cutter Board）**
   - **实拍图片满铺背景**：真实机房走廊与服务器景深，告别单调纯背景色；
   - **纯实心色块胶带垫字**：核心大字垫高饱和荧光明黄（#ffe500）与烈焰红（#ff1e46），杜绝 `border-left`、`border-top` 等 AI 线框套路；
   - **四大文字层级**：消灭一切小于 44px 的死角小字，手机双列流中字字清晰；
   - **顶部对齐 6480×3840 无损三联画板**：左 9:16、中 3:4、右 1:1 全部物理原尺寸从 Y=0 顶格排列，用户存一张图即可无损裁切所有平台尺寸！
5. **广播级声学母带工程**
   - 权威专业科技播音男中音（`zh-CN-YunyangNeural`，`rate="+14%", pitch="-1Hz"`）；
   - 六级母带处理链（80Hz 切杂音 -> 220Hz 胸腔共鸣 -> 3.3kHz 咬字清晰度 -> 8.5kHz 空气感 -> 压缩器 -> EBU R128 标准响度标准化，平均音量 `-21.5 dB`，峰值 `-2.8 dB`）；
   - 搭配原创 126 BPM 脉冲电子合成器配乐，转场伴随 Whoosh 与低音重击。
6. **极速性能工程（生成时间从 7 分钟降至 1 分半）**
   - `asyncio.gather` 7 段音频并发请求（5秒内全量出片）；
   - 纯前端 CSS/Canvas 动效替代磁盘碎图录屏（零 I/O 碎片）；
   - 开启 `-w 4` 多进程并发截帧，渲染提速 400%。

---

## 📂 仓库目录结构

```text
tech-video-producer/
├── README.md                          # 本项目说明
├── LICENSE                            # MIT License
├── .gitignore                         # 忽略大体积渲染输出与临时缓存
├── docs/                              # 方法论与规范全书
│   ├── TECH_VIDEO_METHODOLOGY.md      # 4K、安全区、性能提速、声学母带总方法论
│   ├── HUMAN_DESIGNER_POSTER_STANDARD.md # 顶流实景大字报设计铁律
│   └── XHS_POSTER_GUIDE.md            # 小红书实心高亮胶带排版指南
├── skills/                            # 开箱即用的 Codex Skill 技能
│   └── tech-video-producer/           # 可直接复制到 ~/.codex/skills/ 复用
├── projects/                          # 各主题完整的 OpenDesign / HyperFrames 4K 工程源码
│   ├── opencode_security_agent/       # OpenCode 24h AI 攻防工程
│   ├── anthropic_employment_report/   # Anthropic 27%->9% 报告工程
│   ├── gemini_argon_vertical/         # Gemini 4 Argon 9:16 竖屏大字工程
│   └── gemini_argon/                  # Gemini 4 Argon 16:9 横屏专栏工程
├── posters/                           # 4K 实景大字报模板与生成流水线
│   ├── templates/                     # 3:4 与 9:16 HTML 模板
│   ├── scripts/                       # 6480x3840 顶部对齐无损三联画板合成脚本
│   └── outputs/                       # 最终生成的全系列超清海报 PNG
└── scripts/                           # 核心自动化生产脚本
    ├── gen_narration_parallel.py      # 并发异步 TTS + 六级广播母带处理
    └── gen_synth_music.py             # 原创脉冲合成器配乐生成
```

---

## 🚀 快速上手指南

### 1. 环境准备
确保机器已安装 Node.js、Chrome 与 FFmpeg：
```powershell
$env:HYPERFRAMES_BROWSER_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:PRODUCER_HEADLESS_SHELL_PATH = $env:HYPERFRAMES_BROWSER_PATH
$NODE = 'D:\Program Files\nvm\nodejs\node.exe'
$HYPERFRAMES = 'C:\Users\jl7134\AppData\Local\Programs\Open Design\resources\app\node_modules\hyperframes\bin\hyperframes.mjs'
```

### 2. 极速 4K 视频渲染导出指令

- **渲染 9:16 原生 4K 竖屏短片（2160 × 3840）**：
  ```powershell
  & $NODE $HYPERFRAMES render projects/opencode_security_agent -o outputs/final_vertical_4k.mp4 --resolution portrait-4k -f 30 -q high -w 4 --no-browser-gpu --browser-timeout 180
  ```
- **渲染 16:9 原生 4K 横屏专栏（3840 × 2160）**：
  ```powershell
  & $NODE $HYPERFRAMES render projects/gemini_argon -o outputs/final_horizontal_4k.mp4 --resolution landscape-4k -f 30 -q high -w 4 --no-browser-gpu --browser-timeout 180
  ```

### 3. 一键生成全系列大字报封面与 6480×3840 无损三联画板
```powershell
python posters/scripts/render_all_series_masters.py
```
运行后将自动生成：
- `*_photo_poster_3_4.png`（2160×2880，小红书/视频号大卡）
- `*_photo_poster_9_16.png`（2160×3840，抖音/视频号全屏）
- `*_photo_poster_1_1.png`（2160×2160，主页九宫格缩略图）
- `*_triple_cutter_board_4k.png`（6480×3840，顶部平齐无边框三合一裁切画板）

---

## 🛠️ Codex Skill 技能安装方法

把本仓库中的 `skills/tech-video-producer/` 文件夹直接拷贝到你的 Codex 技能目录：
```powershell
Copy-Item -Recurse skills\tech-video-producer "$HOME\.codex\skills\"
```
在 Codex 中输入 `$tech-video-producer`，即可针对任何科技新闻一键复用本套顶流生产管线！

---

## 📜 许可证

本项目采用 [MIT License](LICENSE) 开源协议。
素材中引用的 Google Material Design Icons 采用 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)，100% 免费可商用。
