from pathlib import Path
import shutil

from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT.parent / "public" / "assets"
PUBLIC.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "hero": ROOT / "refs" / "roadster_1.jpg",
    "official-wide": ROOT / "refs" / "more" / "Roadster_99.jpg",
    "official-rear": ROOT / "refs" / "more" / "Roadster_94.webp",
    "official-tail": ROOT / "refs" / "more" / "Roadster_73.webp",
    "official-cabin": ROOT / "refs" / "more" / "Roadster_68.webp",
    "official-runway": ROOT / "refs" / "more" / "Roadster_95.webp",
    "official-detail": ROOT / "refs" / "more" / "Roadster_75.jpg",
    "official-profile": ROOT / "refs" / "more" / "Roadster_90.jpg",
}


def prepare(src: Path, dst: Path, size=(1080, 1920), crop=(0.5, 0.5)):
    image = Image.open(src).convert("RGB")
    target_ratio = size[0] / size[1]
    src_ratio = image.width / image.height
    if src_ratio > target_ratio:
        new_width = int(image.height * target_ratio)
        left = int((image.width - new_width) * crop[0])
        image = image.crop((left, 0, left + new_width, image.height))
    else:
        new_height = int(image.width / target_ratio)
        top = int((image.height - new_height) * crop[1])
        image = image.crop((0, top, image.width, top + new_height))
    image = image.resize(size, Image.Resampling.LANCZOS)
    image.save(dst, quality=92, optimize=True)
    print(dst)


for name, src in SOURCES.items():
    crop = (0.5, 0.5)
    if name == "official-cabin":
        crop = (0.5, 0.4)
    if name == "official-runway":
        crop = (0.55, 0.5)
    prepare(src, PUBLIC / f"{name}.jpg", crop=crop)

# A desaturated, heavily defocused version of the official hero image is used
# only as a text-safe atmospheric plate. It is not a claim of a new event.
image = Image.open(SOURCES["hero"]).convert("RGB")
image = image.resize((540, 960), Image.Resampling.LANCZOS)
image = image.filter(ImageFilter.GaussianBlur(22))
image = ImageEnhance.Brightness(image).enhance(0.33)
image = ImageEnhance.Color(image).enhance(0.35)
image.save(PUBLIC / "atmosphere.jpg", quality=86)

# Copy the narration into Remotion's static folder.
for mp3 in sorted((ROOT / "audio").glob("S*.mp3")):
    shutil.copy2(mp3, PUBLIC / mp3.name)
print(PUBLIC)
