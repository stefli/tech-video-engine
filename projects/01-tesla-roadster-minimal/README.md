# 科技快播：特斯拉 Roadster 飞行汽车 4K 短视频制作工程

> **Tech QuickCast: Tesla Roadster Flying Car 4K Short Video Production**  
> 一套基于 **HyperFrames (HTML+GSAP+WebGL)** 与 **Remotion (React)** 的全流程专业科技短视频制作工程，包含 4K 竖屏视频源码、模块化子合成、声音设计引擎以及完整的生产级技术文档。

---

## 目录与项目结构

```text
.
├── hyperframes-roadster/          # 【推荐】HyperFrames 4K 竖屏工程（HTML + GSAP + WebGL）
│   ├── index.html                 # 主合成入口（加载音频、10 个场景子合成与全局 UI）
│   ├── hyperframes.json           # 项目元配置与媒体解析设置
│   ├── assets/                    # 本地化媒体资源（官方实况视频切片、超清素材、BGM音频与字体）
│   └── compositions/              # 10 个独立场景子合成与 Chrome 浮层
│       ├── scene-01.html          # 第一画面：起飞离地升空实录视频（0.0s - 4.5s）
│       ├── scene-02.html          # 第二画面：空中 360° 翻转着地实录视频（4.5s - 13.1s）
│       ├── scene-03.html          # 原理示意：实车超音速推进喷口背景（13.1s - 20.3s）
│       ├── scene-04.html          # 厂商数据：卡片化版本对比与 600L 口径标注（20.3s - 27.7s）
│       ├── scene-05.html          # 事实边界：公共道路限制与 FAA 非飞机定义（27.7s - 36.1s）
│       ├── scene-06.html          # 商业现实：计划 2028 量产三大未知项卡片（36.1s - 45.1s）
│       ├── scene-07.html          # 核心命题：每次喷射可靠与落地安全原则（45.1s - 52.7s）
│       ├── scene-08.html          # 快播判断：航天姿态进汽车与制度空白（52.7s - 58.3s）
│       ├── scene-09.html          # 产品化起点：安全合规重复运行（58.3s - 64.2s）
│       ├── scene-10.html          # 片尾主张：看见炫技，更要追问代价（64.2s - 68.0s）
│       └── chrome.html            # 全局信息层、左上角“科技快播”常驻标识
│
├── src/                           # Remotion React 工程源码
│   ├── RoadsterFilm.tsx           # 根组件
│   ├── data.ts                    # 节拍时间码与旁白元数据
│   └── scenes/                    # 各场景 React 组件
│
├── work/                          # 脚本与媒体生成工具链
│   ├── make_audio.py              # 纯净动感电子 BGM 合成与旁白混音脚本（带人声侧链避让）
│   ├── tts.py                     # Edge TTS 高表现力语音合成
│   └── narration-60.json          # 逐句旁白台词与毫秒级时间窗定义
│
├── outputs/                       # 技术文档、核验拼图与封面
│   ├── 科技短视频制作经验与技术文档.md # 4K 短视频设计与平台安全区实战经验复盘
│   ├── 制作方案-v2.md             # 完整导演分镜表、事实核查与视觉设计方案
│   ├── 事实核查与来源.md           # 厂商声明、独立观察与监管边界对比表
│   ├── HyperFrames制作说明.md      # HyperFrames 架构说明与运行指南
│   └── *.png / *.jpg              # 4K 抽帧、封面图与全片节点总览拼图
│
└── package.json                   # 依赖与构建配置
```

---

## 核心技术特性

1. **4K 竖屏输出（2160 × 3840 @ 30fps）**
   - 彻底解决短视频平台对 1080p 视频的严重二次压缩损耗，触发最高清晰度转码通道。
2. **抖音 / 微信视频号平台安全区规范**
   - **顶部避让（Top 160px）**：彻底避开平台顶部的搜索栏、返回键与菜单；
   - **底部净空（Bottom 350px）**：画面中下部完全留白，绝不遮挡长标题、昵称与互动输入框；
   - **右侧避让（Right 140px）**：留出右侧侧边栏转评赞按钮通道。
3. **视听紧密扣题与切除电视跑马灯**
   - 开场双视频实录：第一画面对应“跑道加速升空”，第二画面对应“空中 360° 翻转与平稳着陆”；
   - 使用 FFmpeg 精准截切剥离电视台底部滚动新闻框，100% 聚焦车辆本身。
4. **纯粹平面化设计（Flat Design）**
   - 全片剥离所有发虚拟物阴影，标题与卡片保持 110–200px 呼吸间距，视觉通透干净。
5. **无啸叫纯净动感 BGM**
   - 纯净电子推进贝斯 + 科技底鼓，配合 28% 平滑人声避让（Vocal Ducking）。

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地 Studio 实时预览

```bash
cd hyperframes-roadster
npx hyperframes preview
```

### 3. 一键渲染 4K 终版成片

```bash
cd hyperframes-roadster
npx hyperframes render . -o ../outputs/roadster-4k.mp4 --resolution=portrait-4k --quality=delivery
```

### 4. 重新合成音频与 BGM（可选）

```bash
python work/make_audio.py
ffmpeg -y -v error -i work/mix.wav -c:a aac -b:a 192k public/assets/mix.m4a
ffmpeg -y -v error -i work/mix.wav -c:a libmp3lame -b:a 192k hyperframes-roadster/assets/mix.mp3
```

---

## 许可与声明

- 本项目图片与发布会视频切片取材于特斯拉 2026 年 10 月 15 日得州 Waco 发布活动及媒体公开报道，仅供个人技术研究与内部审片；正式商业发布前请取得版权方正式授权。
