#!/usr/bin/env python3
"""
Generate short, simple, contextual, LOOPABLE Fuzzy videos per scene (Sora-2).
Identity Lock (D3): each clip starts from the already-generated transparent
Fuzzy pose (composited on a tropical bg) used as input_reference, so it's the
SAME Fuzzy. Actions are grounded (NO jumping) per Alan's note.

Phase: submit (returns video ids) OR poll (download finished clips).
  python generate-fuzzy-videos.py submit   -> prints ids to /tmp/sora-ids.json
  python generate-fuzzy-videos.py poll      -> polls + downloads to public/fuzzy/video/
"""
import base64, json, os, sys, time, urllib.request
from pathlib import Path

OUT = Path.home() / "Dev/islacuriosa/public/fuzzy/video"
POSES = Path.home() / "Dev/islacuriosa/public/fuzzy"
CREDS = Path.home() / ".freejack-credentials.env"
IDS = Path("/tmp/sora-ids.json")
SIZE = "720x1280"
SECONDS = "4"
W, H = 720, 1280

SHOTS = {
    "wave":     ("fuzzy-wave.png",
                 "The orange solenodon cartoon character gently waves hello with one paw, "
                 "warm friendly smile, small natural sway, both feet planted on the sunny "
                 "Caribbean beach. Calm gentle looping idle motion. NO jumping. 2D cartoon."),
    "phone":    ("fuzzy-phone.png",
                 "The orange solenodon cartoon character happily holds a red toy phone to his "
                 "ear and chats, small head bobs and tail wiggle, both feet planted on the "
                 "ground. Calm gentle looping motion. NO jumping. 2D cartoon."),
    "celebrate":("fuzzy-celebrate.png",
                 "The orange solenodon cartoon character claps and cheers happily, big smile, "
                 "tiny sparkles, both feet stay planted on the ground, gentle celebration. "
                 "Calm looping motion. NO jumping, NO leaving the ground. 2D cartoon."),
}


def key():
    if os.environ.get("OPENAI_API_KEY"): return os.environ["OPENAI_API_KEY"]
    for l in CREDS.read_text().splitlines():
        if l.startswith("OPENAI_API_KEY="): return l.split("=",1)[1].strip().strip('"').strip("'")
    sys.exit("no OPENAI_API_KEY")


def make_ref(pose_png, dest):
    from PIL import Image
    bg = Image.new("RGB", (W, H), (139, 212, 239))  # sky
    # simple vertical tropical gradient sky->leaf->sand
    for y in range(H):
        t = y / H
        if t < .45:  c = (139,212,239)
        elif t < .72: c = (107,191,115)
        else:        c = (233,213,166)
        for _ in (0,): pass
        bg.paste(c, (0, y, W, y+1))
    ch = Image.open(POSES / pose_png).convert("RGBA")
    scale = int(W * 0.78)
    ch = ch.resize((scale, scale))
    bg.paste(ch, ((W-scale)//2, int(H*0.30)), ch)
    bg.save(dest)
    return dest


def post_multipart(url, token, fields, files):
    b = "----soraB7f3"; body = bytearray()
    for k,v in fields:
        body += f"--{b}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode()
    for k,path in files:
        data = Path(path).read_bytes()
        body += f"--{b}\r\nContent-Disposition: form-data; name=\"{k}\"; filename=\"{Path(path).name}\"\r\n".encode()
        body += b"Content-Type: image/png\r\n\r\n" + data + b"\r\n"
    body += f"--{b}--\r\n".encode()
    req = urllib.request.Request(url, data=bytes(body), method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", f"multipart/form-data; boundary={b}")
    with urllib.request.urlopen(req, timeout=120) as r: return json.loads(r.read())


def submit():
    token = key(); OUT.mkdir(parents=True, exist_ok=True)
    Path("/tmp/sora-refs").mkdir(exist_ok=True)
    ids = {}
    for name,(pose,prompt) in SHOTS.items():
        ref = make_ref(pose, f"/tmp/sora-refs/{name}.png")
        print(f"submit {name} ...")
        res = post_multipart("https://api.openai.com/v1/videos", token,
            [("model","sora-2"),("prompt",prompt),("size",SIZE),("seconds",SECONDS)],
            [("input_reference", ref)])
        ids[name] = res.get("id"); print(f"  id={res.get('id')} status={res.get('status')}")
        if res.get("error"): print("  ERR", res["error"])
        time.sleep(1)
    IDS.write_text(json.dumps(ids))
    print("ids ->", IDS, ids)


def poll():
    token = key(); ids = json.loads(IDS.read_text())
    pending = dict(ids)
    while pending:
        for name, vid in list(pending.items()):
            req = urllib.request.Request(f"https://api.openai.com/v1/videos/{vid}")
            req.add_header("Authorization", f"Bearer {token}")
            with urllib.request.urlopen(req, timeout=60) as r: st = json.loads(r.read())
            s = st.get("status"); print(f"{name}: {s} {st.get('progress','')}%")
            if s == "completed":
                creq = urllib.request.Request(f"https://api.openai.com/v1/videos/{vid}/content")
                creq.add_header("Authorization", f"Bearer {token}")
                with urllib.request.urlopen(creq, timeout=120) as r: data = r.read()
                dest = OUT / f"fuzzy-{name}.mp4"; dest.write_bytes(data)
                print(f"  saved -> {dest} ({len(data)} bytes)"); del pending[name]
            elif s in ("failed","cancelled"):
                print(f"  {name} {s}: {st.get('error')}"); del pending[name]
        if pending: time.sleep(12)
    print("done ->", OUT)


if __name__ == "__main__":
    {"submit": submit, "poll": poll}.get(sys.argv[1] if len(sys.argv)>1 else "", lambda: print("submit|poll"))()
