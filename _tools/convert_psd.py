"""Convert heroo.psd into a transparent monty-mascot.png and copy/convert other assets."""
import sys
from pathlib import Path

assets = Path(r"C:\Monty-Aaron\assets")

# ---- 1) Convert PSD ----
psd_path = assets / "heroo.psd"
out_path = assets / "monty-mascot.png"

try:
    from psd_tools import PSDImage
    psd = PSDImage.open(psd_path)
    img = psd.composite()
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    img.save(out_path, "PNG", optimize=True)
    print(f"[OK] PSD composited -> {out_path}  size={img.size}  mode={img.mode}")
except Exception as e:
    print(f"[FAIL psd_tools] {e}", file=sys.stderr)
    # Fallback to Pillow
    try:
        from PIL import Image
        im = Image.open(psd_path)
        if im.mode != "RGBA":
            im = im.convert("RGBA")
        im.save(out_path, "PNG", optimize=True)
        print(f"[OK Pillow fallback] -> {out_path}  size={im.size}  mode={im.mode}")
    except Exception as e2:
        print(f"[FAIL Pillow] {e2}", file=sys.stderr)
        sys.exit(1)

# ---- 2) Convert monty-13.jfif -> monty-13.jpg (JFIF is just JPEG, but rename for browser clarity)
from PIL import Image
src = assets / "monty-13.jfif"
dst = assets / "monty-13.jpg"
if src.exists():
    Image.open(src).convert("RGB").save(dst, "JPEG", quality=88, optimize=True)
    print(f"[OK] {src.name} -> {dst.name}")

print("\nAll done.")
