import asyncio
from edge_tts import VoicesManager


async def main():
    manager = await VoicesManager.create()
    voices = sorted(
        {
            voice["ShortName"]
            for voice in manager.voices
            if voice["Locale"].startswith("zh-CN")
        }
    )
    print("\n".join(voices))


asyncio.run(main())
