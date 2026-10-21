import asyncio
import json
import subprocess
import sys
from pathlib import Path
import edge_tts

out_dir = Path("outputs/opencode_security_agent/assets")
out_dir.mkdir(parents=True, exist_ok=True)

LINES = [
    ("01", "开源代码库 OpenCode 遭遇 24 小时 AI 攻防。网络安全，正式进入机器对抗机器的时代。"),
    ("02", "攻击方早已全面 Agent 化，高频渗透全天候狂轰滥炸。人类值班修漏洞的传统机制彻底失效。"),
    ("03", "以机器速度对抗机器速度。防守方也必须拥有 24 小时常驻的代码防御 Agent。"),
    ("04", "看自动化防御现场。常驻 Agent 毫秒级捕获攻击载荷，在隔离沙盒中自主复现并阻断渗透链。"),
    ("05", "更关键的是代码自愈。智能体直接生成针对性安全热补丁，通过测试并自动合并，受击中实时进化。"),
    ("06", "攻防响应从过去平均七十二小时，直接压缩到三点二秒。恶意漏洞阻断率达到百分之九十九。"),
    ("07", "未来的软件底座，没有常驻 Agent 的代码库都是在裸奔。以 AI 制 AI，安全新范式到来。"),
]

FFMPEG = r"C:\Users\jl7134\projects\tools\ffmpeg\bin\ffmpeg.exe"
FFPROBE = r"C:\Users\jl7134\projects\tools\ffmpeg\bin\ffprobe.exe"

async def gen_raw(text, raw_mp3):
    for attempt in range(4):
        try:
            c = edge_tts.Communicate(text, "zh-CN-YunyangNeural", rate="+14%", pitch="-1Hz")
            await c.save(str(raw_mp3))
            return
        except Exception as e:
            await asyncio.sleep(1.0)
    raise RuntimeError(f"Failed to fetch audio for: {text}")

async def main():
    sys.stdout.reconfigure(encoding="utf-8")
    print("Concurrently generating 7 broadcast voiceovers via asyncio.gather...")
    tasks = [gen_raw(text, out_dir / f"raw_{idx}.mp3") for idx, text in LINES]
    await asyncio.gather(*tasks)
    print("TTS generation complete! Now applying studio mastering filterchain...")
    
    manifest = []
    filter_str = (
        "highpass=f=80,"
        "equalizer=f=220:t=q:w=1.2:g=1.8,"
        "equalizer=f=3300:t=q:w=1.2:g=2.2,"
        "equalizer=f=8500:t=q:w=1.0:g=1.5,"
        "acompressor=threshold=-18dB:ratio=3:attack=10:release=100,"
        "loudnorm=I=-16:TP=-1.5:LRA=7"
    )
    
    for idx, text in LINES:
        raw_mp3 = out_dir / f"raw_{idx}.mp3"
        mastered_wav = out_dir / f"voice_{idx}.wav"
        cmd = [
            FFMPEG, "-y", "-i", str(raw_mp3),
            "-af", filter_str,
            "-ar", "48000", "-ac", "2",
            str(mastered_wav)
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        probe_cmd = [
            FFPROBE, "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", str(mastered_wav)
        ]
        res = subprocess.run(probe_cmd, capture_output=True, text=True, check=True)
        dur = float(res.stdout.strip())
        print(f"[{idx}] {dur:.3f}s: {text}")
        manifest.append({"index": idx, "text": text, "file": f"voice_{idx}.wav", "duration": round(dur, 3)})
        
    (out_dir / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("All broadcast audio generated and mastered in parallel!")

if __name__ == "__main__":
    asyncio.run(main())
