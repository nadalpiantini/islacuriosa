#!/usr/bin/env python3
"""
Generate original Fuzzy images for the Isla Curiosa entry experience.

Identity Lock (D3): every image is generated from the Alan-confirmed master
reference `fuzzy_hero.png` via OpenAI gpt-image-1 /images/edits (same engine
lineage as the ChatGPT keyframe workflow in HANDOFF.md). Fuzzy stays the SAME
character across scenes. No new character invented.

Output -> ~/Dev/islacuriosa/public/fuzzy/*.png  (transparent background)
"""
import base64
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

REF = Path.home() / "Downloads/fuzzy_tabla_del_6_render/fuzzy_hero.png"
OUT = Path.home() / "Dev/islacuriosa/public/fuzzy"
CREDS = Path.home() / ".freejack-credentials.env"
ENDPOINT = "https://api.openai.com/v1/images/edits"

STYLE = (
    " Keep the EXACT same character design: bright orange pear-shaped solenodon, "
    "very long horizontal black pointy snout, two big round white eyes close together, "
    "dark tuft on the head, big toothy white grin, thin zigzag line on the belly, "
    "thick black outlines with soft 3D shading. Cheerful 2D children's cartoon style. "
    "Full body, centered, friendly, on a fully transparent background. One character only."
)

SHOTS = {
    "fuzzy-wave": "Redraw this exact orange cartoon character waving hello with one hand "
                  "raised high and a warm welcoming smile, the other arm open inviting." + STYLE,
    "fuzzy-phone": "Redraw this exact orange cartoon character joyfully holding a colorful round "
                   "toy telephone to the side of his head, eyes wide with happy excitement, as if "
                   "he just answered a fun call." + STYLE,
    "fuzzy-celebrate": "Redraw this exact orange cartoon character jumping with both arms raised "
                       "in celebration, huge happy grin, a few little sparkles around him." + STYLE,
    "fuzzy-peek": "Redraw this exact orange cartoon character peeking out curiously with a gentle "
                  "warm smile, one little hand near his cheek, inviting and friendly." + STYLE,
}


def load_key():
    if os.environ.get("OPENAI_API_KEY"):
        return os.environ["OPENAI_API_KEY"]
    for line in CREDS.read_text().splitlines():
        if line.startswith("OPENAI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("OPENAI_API_KEY not found")


def post_multipart(url, token, fields, file_field, file_path):
    """Minimal multipart/form-data POST (stdlib only)."""
    boundary = "----fuzzyboundary7e3b9d"
    body = bytearray()
    for k, v in fields:
        body += f"--{boundary}\r\n".encode()
        body += f'Content-Disposition: form-data; name="{k}"\r\n\r\n'.encode()
        body += f"{v}\r\n".encode()
    data = Path(file_path).read_bytes()
    body += f"--{boundary}\r\n".encode()
    body += f'Content-Disposition: form-data; name="{file_field}"; filename="{Path(file_path).name}"\r\n'.encode()
    body += b"Content-Type: image/png\r\n\r\n"
    body += data + b"\r\n"
    body += f"--{boundary}--\r\n".encode()
    req = urllib.request.Request(url, data=bytes(body), method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.loads(r.read())


def main():
    token = load_key()
    OUT.mkdir(parents=True, exist_ok=True)
    if not REF.exists():
        sys.exit(f"Reference not found: {REF}")
    print(f"Reference: {REF}\nEngine: gpt-image-1 /images/edits\n")

    for name, prompt in SHOTS.items():
        print(f"Generating {name} ...")
        try:
            res = post_multipart(
                ENDPOINT, token,
                fields=[
                    ("model", "gpt-image-1"),
                    ("prompt", prompt),
                    ("size", "1024x1024"),
                    ("background", "transparent"),
                    ("quality", "high"),
                    ("n", "1"),
                ],
                file_field="image[]",
                file_path=str(REF),
            )
            b64 = (res.get("data") or [{}])[0].get("b64_json")
            if not b64:
                print(f"  !! no image: {json.dumps(res)[:300]}")
                continue
            dest = OUT / f"{name}.png"
            dest.write_bytes(base64.b64decode(b64))
            print(f"  saved -> {dest} ({dest.stat().st_size} bytes)")
        except Exception as e:
            print(f"  !! {name} failed: {e}")
        time.sleep(1)

    print("\nDone ->", OUT)


if __name__ == "__main__":
    main()
