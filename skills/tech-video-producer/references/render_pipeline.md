# HyperFrames 4K 极速渲染与交付指南

## 一、为什么短视频平台必须交付 4K（2160 × 3840）？

国内主流短视频平台（微信视频号、抖音、小红书、B站）会对用户上传的 1080p 视频执行非常激进的二次压缩（通常压至 1.5 - 2.5 Mbps 码率），导致：
- 细小的科技线条、HUD 坐标、字体边缘模糊糊掉；
- 暗部背景出现大面积色阶断层和马赛克方块。

**上传 4K 规格的视频能够直接触发平台最高档位的高清转码通道**，即使在手机端小屏播放，平台也会分配更高的解码码率与更优的抗锯齿采样，呈现真正“针尖般锐利”的专业品质。

---

## 二、4K 竖屏导出标准命令

在 HyperFrames 项目根目录下运行：

```powershell
# 导出 4K 竖屏 MP4 视频（分辨率 2160 × 3840，帧率 30fps，交付级画质）
npx hyperframes render . -o outputs/roadster-4k.mp4 --resolution=portrait-4k --quality=delivery
```

### 关键参数解析：
- `--resolution=portrait-4k`：HyperFrames 会自动将 Chrome 渲染 DPR 设为 2x，直接捕获 `2160 × 3840` 像素超高清无损帧；
- `--quality=delivery`：启用高质量 CRF 编码与最佳色彩采样；
- `-o <path>`：指定最终视频成片的输出路径。

---

## 三、渲染前必经的两步门禁

```powershell
# 1. 静态代码与媒体标签合规检查（<2秒）
npx hyperframes lint

# 2. 运行时无头浏览器完整门禁（包含布局溢出、遮挡、对比度与音频检测）
npx hyperframes check
```
只有在 check 完全通过的前提下，才执行 4K 正式渲染，确保 100% 成功。
