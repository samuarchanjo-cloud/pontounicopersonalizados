"""Prepare the real catalog photos for the site's square product cards.

Original files in assets/categorias are read-only. Optimized WebP derivatives are
written to public/assets/categorias so Vite can serve them directly.
"""

from pathlib import Path
from PIL import Image, ImageChops, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "assets" / "categorias"
OUTPUT_ROOT = ROOT / "public" / "assets" / "categorias"
OUTPUT_SIZE = 960

# (left, top, size), measured in the original image. These crops remove visible
# social-media controls or place the physical product at the center of the card.
SPECIAL_CROPS = {
    "blusas/camisa.jpeg": (0, 85, 720),
    "blusas/camisa-2.jpeg": (0, 85, 720),
    "blusas/camisa-3.jpeg": (0, 85, 720),
    "infantil/bobbiegoods.jpeg": (20, 145, 780),
    "infantil/caderno-de-colorir.jpeg": (49, 0, 730),
    "infantil/mochila_astronauta.jpg": (0, 34, 827),
    "infantil/mochila_mario.jpg": (8, 20, 800),
    "infantil/mochila_ursinho_azul.jpg": (0, 70, 817),
    "infantil/mochila_ursinho_rosa.jpg": (0, 78, 828),
    "papelaria/caderneta-de-vacinacao.jpeg": (14, 54, 828),
    "papelaria/caderneta-de-vacinacao-2.jpeg": (0, 80, 720),
    "papelaria/caderneta-de-vacinacao-3.jpeg": (0, 50, 720),
    "papelaria/caderneta-de-vacinacao-roblox.jpeg": (20, 60, 720),
    "presentes/camisa-2.jpeg": (0, 85, 720),
}

WHITE_TRIM_FILES = {
    "bolsas/shouderbag.png",
    "bolsas/shouderbag-2.png",
    "bolsas/shouderbag-3.png",
    "bolsas/shouderbag-4.png",
    "presentes/shouderbag-2.png",
}


def normalized_key(path: Path) -> str:
    return path.relative_to(SOURCE_ROOT).as_posix().lower()


def square_center_crop(image: Image.Image) -> Image.Image:
    side = min(image.size)
    left = (image.width - side) // 2
    top = (image.height - side) // 2
    return image.crop((left, top, left + side, top + side))


def trim_white_and_square(image: Image.Image) -> Image.Image:
    """Trim oversized near-white margins, then add balanced white padding."""
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, (255, 255, 255))
    difference = ImageChops.difference(rgb, background).convert("L")
    mask = difference.point(lambda value: 255 if value > 18 else 0)
    bbox = mask.getbbox() or (0, 0, rgb.width, rgb.height)
    padding = 28
    left = max(0, bbox[0] - padding)
    top = max(0, bbox[1] - padding)
    right = min(rgb.width, bbox[2] + padding)
    bottom = min(rgb.height, bbox[3] + padding)
    subject = rgb.crop((left, top, right, bottom))

    side = max(subject.size)
    canvas = Image.new("RGB", (side, side), (255, 255, 255))
    canvas.paste(subject, ((side - subject.width) // 2, (side - subject.height) // 2))
    return canvas


def process(source: Path) -> Path:
    key = normalized_key(source)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if key in WHITE_TRIM_FILES:
            cropped = trim_white_and_square(image)
        elif key in SPECIAL_CROPS:
            left, top, size = SPECIAL_CROPS[key]
            cropped = image.crop((left, top, left + size, top + size))
        else:
            cropped = square_center_crop(image)

        result = cropped.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.Resampling.LANCZOS)
        relative = source.relative_to(SOURCE_ROOT)
        category = relative.parts[0].lower()
        destination = OUTPUT_ROOT / category / f"{source.stem}.webp"
        destination.parent.mkdir(parents=True, exist_ok=True)
        result.save(destination, "WEBP", quality=88, method=6)
        return destination


def main() -> None:
    sources = sorted(
        path for path in SOURCE_ROOT.rglob("*")
        if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    outputs = [process(source) for source in sources]
    print(f"Processed {len(outputs)} catalog images at {OUTPUT_SIZE}x{OUTPUT_SIZE}px.")


if __name__ == "__main__":
    main()
