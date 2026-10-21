from pathlib import Path
import json
import subprocess
import wave
import numpy as np

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT.parent / "public" / "assets"
RATE = 48_000
DURATION = 68.0
COUNT = int(RATE * DURATION)
segments = json.loads((ROOT / "narration-60.json").read_text(encoding="utf-8"))

def read_mp3(path: Path) -> np.ndarray:
    proc = subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-i",
            str(path),
            "-f",
            "s16le",
            "-acodec",
            "pcm_s16le",
            "-ac",
            "1",
            "-ar",
            str(RATE),
            "-",
        ],
        check=True,
        capture_output=True,
    )
    return np.frombuffer(proc.stdout, dtype="<i2").astype(np.float32) / 32768.0

def write_wav(path: Path, audio: np.ndarray) -> None:
    clipped = np.clip(audio, -1, 1)
    pcm = (clipped * 32767).astype("<i2")
    with wave.open(str(path), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(RATE)
        out.writeframes(pcm.tobytes())

def smooth_step(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)

def generate_dynamic_bgm() -> np.ndarray:
    """
    纯净、现代、富有前沿科技动感的 Synthwave / Tech-House 律动音乐：
    - 坚决杜绝任何高频啸叫（去除了高频白噪气流声与高频 sweeps）
    - 充满弹性、浑厚有力的 16 分音符推进贝斯 (Driving Bassline)
    - 清晰、沉稳且富有节奏弹性的电音底鼓与拍点 (Crisp Punch Kick & Claps)
    - 温暖圆润的中频科技和弦 (Warm Analog Tech Chords)
    - 人声自动动态避让 (Vocal Ducking)，保证解说词字字清晰饱满
    """
    t = np.arange(COUNT) / RATE
    bgm = np.zeros(COUNT, dtype=np.float64)

    bpm = 124.0
    beat_dur = 60.0 / bpm # ~0.4838s
    sixteenth = beat_dur / 4.0 # ~0.121s

    # 1. 动感低音推进贝斯 (Driving Rolling Bass - D minor: D2, F2, C2, G2)
    # 使用温暖圆润的低通滤波模拟锯齿波
    bass_freqs = [73.42, 73.42, 87.31, 73.42, 65.41, 65.41, 98.00, 73.42]
    bass_track = np.zeros(COUNT, dtype=np.float64)
    for i, beat_t in enumerate(np.arange(0.2, 66.2, sixteenth)):
        note_idx = int((beat_t / (beat_dur * 2)) * 4) % len(bass_freqs)
        freq = bass_freqs[note_idx]
        start = int(beat_t * RATE)
        length = int(sixteenth * 0.82 * RATE)
        if start + length >= COUNT:
            continue
        tt = np.arange(length) / RATE
        # 短促有力的贝斯包络
        env = np.exp(-tt * 18.0)
        # 饱满、温暖且无刺耳高频的波形
        tone = 0.75 * np.sin(2 * np.pi * freq * tt) + 0.25 * np.sin(4 * np.pi * freq * tt)
        bass_track[start : start + length] += tone * env * 0.095
    bgm += bass_track

    # 2. 动感沉稳的科技底鼓 (Deep Punch Kick Drum)
    kick_track = np.zeros(COUNT, dtype=np.float64)
    for beat_t in np.arange(4.5, 64.5, beat_dur):
        start = int(beat_t * RATE)
        length = int(0.22 * RATE)
        if start + length >= COUNT:
            continue
        tt = np.arange(length) / RATE
        pitch_drop = 48.0 + 85.0 * np.exp(-tt * 42.0) # 饱满的低频下潜
        kick = np.sin(2 * np.pi * pitch_drop * tt) * np.exp(-tt * 16.0)
        kick_track[start : start + length] += kick * 0.095
    bgm += kick_track

    # 3. 科技军鼓/轻拍点 (Clean Tech Snare/Clap on beats 2 and 4)
    clap_track = np.zeros(COUNT, dtype=np.float64)
    for i, beat_t in enumerate(np.arange(4.5 + beat_dur, 64.0, beat_dur * 2)):
        start = int(beat_t * RATE)
        length = int(0.15 * RATE)
        if start + length >= COUNT:
            continue
        tt = np.arange(length) / RATE
        # 中频圆润的打击质感，不刺耳
        snare = np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 25.0)
        clap_track[start : start + length] += snare * 0.060
    bgm += clap_track

    # 4. 温暖的模拟合成器中频和弦 (Warm Analog Chords - 增强科技电影质感)
    pad = np.zeros(COUNT, dtype=np.float64)
    # Dm7 (D3, F3, A3, C4)
    for freq, amp in [(146.83, 0.022), (174.61, 0.020), (220.0, 0.018), (261.63, 0.015)]:
        pad += amp * np.sin(2 * np.pi * freq * t + 0.2)
    pad *= 0.7 + 0.3 * np.sin(2 * np.pi * t / 12.0)
    bgm += pad

    # 5. 人声避让处理 (Sidechain / Vocal Ducking)
    fade = smooth_step(t / 1.5) * (1 - smooth_step((t - 66.8) / 1.2))
    voice_env = np.zeros(COUNT)
    for seg in segments:
        a = int(seg["start"] * RATE)
        b = min(COUNT, int((seg["end"] - 0.05) * RATE))
        if b > a:
            voice_env[a:b] = 1.0
    kernel_len = int(0.18 * RATE)
    kernel = np.ones(kernel_len) / kernel_len
    smoothed_voice = np.convolve(voice_env, kernel, mode="same")
    # 人声出现时压低 42%，无人声时动感凸显
    bgm *= fade * (1.0 - 0.28 * np.clip(smoothed_voice, 0, 1))
    return bgm

def add_transition_sfx(audio: np.ndarray) -> np.ndarray:
    """
    纯低频转场重音，已彻底剔除所有喷气白噪与啸叫高频 (air_jet / sweeps 全部删除)
    """
    t = np.arange(COUNT) / RATE
    def impact(at: float, amp: float, length: float = 0.45) -> None:
        start = int(at * RATE)
        n = min(COUNT - start, int(length * RATE))
        if n <= 0:
            return
        tt = np.arange(n) / RATE
        env = np.exp(-tt * 14.0)
        # 饱满的低频下潜电影级 Impact，纯净温暖
        low = np.sin(2 * np.pi * (50 + 25 * np.exp(-tt * 10)) * tt)
        audio[start : start + n] += amp * env * low * 0.8

    # 在各段关键转场点加上沉稳的冲击低频
    for at, amp in [
        (0.0, 0.07), (4.5, 0.08), (13.1, 0.07), (20.3, 0.075),
        (27.7, 0.085), (36.1, 0.075), (45.1, 0.08), (52.7, 0.08),
        (58.3, 0.08), (64.2, 0.09)
    ]:
        impact(at, amp)

    return audio

def main() -> None:
    voice = np.zeros(COUNT, dtype=np.float64)
    for seg in segments:
        data = read_mp3(ROOT / "audio60" / f"{seg['id']}.mp3")
        start = int(seg["start"] * RATE)
        end = min(COUNT, start + len(data))
        slot_end = int(seg["end"] * RATE)
        fade_in = min(int(0.025 * RATE), end - start)
        fade_out = min(int(0.12 * RATE), end - start)
        data = data[: end - start].copy()
        if fade_in > 0:
            data[:fade_in] *= np.linspace(0, 1, fade_in)
        if fade_out > 0:
            data[-fade_out:] *= np.linspace(1, 0, fade_out)
        if end > slot_end:
            raise ValueError(
                f"{seg['id']} exceeds timing slot: "
                f"{len(data) / RATE:.3f}s > {(slot_end - start) / RATE:.3f}s"
            )
        voice[start:end] += data

    bgm = generate_dynamic_bgm()
    mix = voice + bgm
    mix = add_transition_sfx(mix)

    peak = float(np.max(np.abs(mix)))
    if peak > 0:
        mix *= 0.88 / peak
    write_wav(ROOT / "mix.wav", mix)
    print(f"mix.wav generated: peak={peak:.4f}, rms={np.sqrt(np.mean(mix**2)):.4f}")

if __name__ == "__main__":
    main()
