import asyncio
import json
import subprocess
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parent
VOICE = "zh-CN-YunyangNeural"
RATE = "+6%"
PITCH = "-2Hz"


async def synthesize(segment):
    out = ROOT / "audio60" / f"{segment['id']}.mp3"
    communicate = edge_tts.Communicate(
        segment["text"],
        VOICE,
        rate=RATE,
        pitch=PITCH,
        boundary="WordBoundary",
    )
    await communicate.save(str(out))
    return out


def duration(path):
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


async def main():
    (ROOT / "audio60").mkdir(exist_ok=True)
    segments = json.loads((ROOT / "narration-60.json").read_text(encoding="utf-8"))
    for segment in segments:
        path = await synthesize(segment)
        print(f"{segment['id']} {duration(path):.3f}s {path}")


asyncio.run(main())
