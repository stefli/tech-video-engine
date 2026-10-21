# Tech Video Engine (科技视频生成引擎)

> **面向前沿科技传播的程序化视频生产套件与实战代码库。**  
> 探索通过代码（HTML5 + GSAP + WebGL + React）生成专业、高信息密度、拒绝 AI 模板味的 **4K 极清视频** 与 **多平台安全区合规设计**。

---

## 🌟 仓库特色：两大核心流派与技术范式

本仓库收录了两种不同设计哲学与技术架构的视频生成工程：

| 维度 | 流派 1：特斯拉极简平面纪录片风格 | 流派 2：赛博视窗与实景大字报风格 |
|---|---|---|
| **对应目录** | `projects/01-tesla-roadster-minimal/` | `projects/02-tech-video-producer/` |
| **技术底座** | HyperFrames (HTML/GSAP/WebGL) + Remotion (React) | HyperFrames + 异步并发 TTS + 六级广播母带链 |
| **设计语言** | **纯粹平面化（Flat Design）**、无阴影、大字号宽间隙卡片 | **赛博监视视窗（Cyber Inspector Viewport）**、高饱和色块胶带 |
| **视听对齐** | 官方实况动作视频精准切片（升空与空中 360° 翻转着陆紧密扣题） | 视窗原生像素回放 + 纯前端代码流动画（零像素拉伸模糊） |
| **音频引擎** | 16 分音符推进贝斯 + 科技底鼓（彻底消除高频啸叫），平滑人声避让 | 权威科技男中音 + 126 BPM 脉冲合成器配乐 + 电影级 Whoosh/Impact |
| **平台规范** | 严格遵循抖音 / 微信视频号中上部黄金区间（Top 160px，Bottom 350px 净空） | 顶部对齐 6480×3840 无损三联画板（适配小红书 3:4 / 竖屏 9:16 / 方图 1:1） |

---

## 📂 仓库目录架构

```text
tech-video-engine/
├── README.md                          # 引擎总览与使用指南
├── LICENSE                            # MIT License
├── .gitignore                         # 忽略依赖与大文件
│
├── skills/                            # 开箱即用的 Codex / Claude 技能
│   └── tech-video-producer/           # 沉淀的通用 4K 科技短视频制作 Skill
│
└── projects/                          # 具体工程案例
    │
    ├── 01-tesla-roadster-minimal/     # 【流派一】特斯拉 Roadster 极简平面风短视频
    │   ├── hyperframes-roadster/      # HyperFrames 模块化子合成工程源码 (推荐)
    │   ├── src/                       # Remotion (React) 源码
    │   ├── work/                      # 纯净动感电子 BGM 合成脚本与逐句旁白时间轴
    │   └── outputs/                   # 4K 抽帧、拼图与完整分镜制作方案
    │
    └── 02-tech-video-producer/         # 【流派二】OpenCode / Gemini / Anthropic 赛博视窗
        ├── projects/                  # 多主题 4K 竖屏与 16:9 横屏专栏工程源码
        ├── posters/                   # 4K 实景大字报生成脚本与模板
        ├── scripts/                   # 并发异步语音合成与六级广播级母带处理
        └── docs/                      # 顶流大字报设计铁律与生产全书
```

---

## 🚀 快速上手与渲染指南

### 1. 运行流派一（特斯拉 Roadster 4K 极简短片）

```powershell
cd projects/01-tesla-roadster-minimal/hyperframes-roadster

# 本地 Studio 实时预览与时间轴交互
npx hyperframes preview

# 一键导出 4K (2160 × 3840 @ 30fps) 超清视频成片
npx hyperframes render . -o ../outputs/roadster-4k.mp4 --resolution=portrait-4k --quality=delivery
```

### 2. 运行流派二（赛博视窗与实景大字报）

```powershell
cd projects/02-tech-video-producer

# 生成 4K 实景大字报与 6480x3840 无损三联封面
python posters/scripts/render_all_series_masters.py
```

---

## 🛠️ Codex Skill 技能复用

将本仓库的 `skills/tech-video-producer` 目录复制到本地技能库：
```powershell
Copy-Item -Recurse skills	ech-video-producer "$HOME\.codex\skills"
```
在 Codex 对话框中输入 `$tech-video-producer`，即可针对任何科技热点一键复用本套生产管线。

---

## 📜 许可证

本项目采用 [MIT License](LICENSE) 开源协议。
素材取材自特斯拉公开演示活动与公开新闻报道，仅供个人技术研究；正式商业发布请取得版权方正式授权。