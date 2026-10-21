# HyperFrames 视频工程交付说明

**项目名称：** `hyperframes-roadster`  
**画幅格式：** 9:16 竖屏（1080 × 1920），30 fps，总时长 68.0 秒。  
**技术架构：** 基于 HyperFrames HTML + GSAP Timeline + WebGL + 音频同步的时间轴视频架构。  
**规范校验：** 通过 `npx hyperframes lint` 与 `npx hyperframes check` 0 错误门禁校验。

---

## 1. 工程文件结构

```text
hyperframes-roadster/
├── index.html                   # 主合成入口（加载音频、10 个场景子合成与全局 UI）
├── hyperframes.json             # 项目元配置与媒体解析设置
├── assets/                      # 本地化媒体资源
│   ├── hero-wide.jpg            # 现场发布画面
│   ├── hero-event.jpg           # 越障腾空实景
│   ├── atmosphere.jpg          # 科技氛围底图
│   ├── rear-detail.jpg          # 尾部推进系统细节
│   ├── road-rear.jpg            # 道路场景
│   ├── cockpit.jpg              # 驾驶舱内饰
│   ├── nozzle-macro.jpg         # 喷口微距
│   ├── wheel-macro.jpg          # 轮毂微距
│   ├── dawn-side.jpg            # 侧后产品全景
│   ├── mix.mp3 / mix.m4a        # 定制科技感 BGM 与纯净旁白混音
│   └── NotoSansSC-VF.ttf        # 独立打包的中文字体
└── compositions/                # 模块化场景子合成（Sub-Compositions）
    ├── scene-01.html            # 镜头 1：悬念开场（0.0s - 4.5s）
    ├── scene-02.html            # 镜头 2：发布事件与演示动作（4.5s - 13.1s）
    ├── scene-03.html            # 镜头 3：冷气推进反作用力原理（13.1s - 20.3s）
    ├── scene-04.html            # 镜头 4：版本差异与性能数据（20.3s - 27.7s）
    ├── scene-05.html            # 镜头 5：演示与独立实测边界/监管（27.7s - 36.1s）
    ├── scene-06.html            # 镜头 6：计划量产与未确定项（36.1s - 45.1s）
    ├── scene-07.html            # 镜头 7：核心命题与可靠性（45.1s - 52.7s）
    ├── scene-08.html            # 镜头 8：科技快播深度判断（52.7s - 58.3s）
    ├── scene-09.html            # 镜头 9：产品化的真正起点（58.3s - 64.2s）
    ├── scene-10.html            # 镜头 10：品牌收束与主张（64.2s - 68.0s）
    └── chrome.html              # 全片常驻信息层、进度条、动态标签与字幕
```

---

## 2. 核心特性与优化落实

1. **大字号与清晰说明层**
   - 底部字幕升级至 32px，搭配加黑轮廓投影与多重文字阴影，拒绝小屏发虚；
   - 底部引用源（Source）、右侧演示标签、技术说明文字统一放大至 20–26px，告别字体过小看不清；
   - 厂商宣称数据（600L 压缩空气、小于1秒加速）均带清晰醒目的口径标注。

2. **片尾重复问题已消除**
   - 顶部导航栏动态切换为 TECH QUICKCAST / 完；
   - 画面主体专一呈现「看见炫技，更要追问代价！」，彻底消除科技快播字样重复。

3. **旁白断句与情绪升级**
   - 开头文案强化断句：「车……真的飞起来了！但最难的一步，绝不是起飞。」通过标点留出约 350ms 呼吸停顿，杜绝连读；
   - 全片采用更有激情的科技播报语调（+15% 紧凑速率），节奏明快。

4. **量身定制科技感 BGM**
   - 搭载高频科技流动琶音 + 律动低音 + 推进鼓点与转场冲击音效，并带有人声自动避让。

---

## 3. 运行与预览方法

进入项目目录后，可直接通过本地 Studio 实时预览与交互：

```powershell
cd hyperframes-roadster

# 启动 Studio 实时预览（支持实时时间轴拖拽与热重载）
npx hyperframes preview

# 检查代码与时间轴合规性
npx hyperframes check

# 停止后台预览服务
npx hyperframes preview --stop
```
