# -*- coding: utf-8 -*-
"""
Scarica le miniature degli NPC piano 0 dagli URL in script.js (defaultNPCs),
le converte in PNG e le salva come Nome_Cognome.png in questa cartella.

Esecuzione:
  python download_piano0.py
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

HERE = Path(__file__).resolve().parent

NPCS_PIANO0 = {
    "Goro Domon": "https://upload.forumfree.net/i/fc9375543/goro.jpg",
    "Suki Hazuki": "https://upload.forumfree.net/i/fc9375543/Suki.jpg",
    "Billy Crane": "https://upload.forumfree.net/i/fc9375543/billy.jpg",
    "Rhino Vercetti": "https://upload.forumfree.net/i/fc9375543/rhino.jpg",
}


def nome_to_filename(nome: str) -> str:
    # deve combaciare con nomeNPCToFileName() in script.js
    s = nome.strip().replace(" ", "_")
    s = (
        s.replace("ü", "u")
        .replace("ö", "o")
        .replace("ä", "a")
        .replace("ß", "ss")
    )
    return f"{s}.png"


def download_bytes(url: str) -> bytes:
    req = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "image/*,*/*;q=0.8",
        },
    )
    with urlopen(req, timeout=30) as resp:
        return resp.read()


def main() -> None:
    for nome, url in NPCS_PIANO0.items():
        out_name = nome_to_filename(nome)
        out_path = HERE / out_name
        print(f"Scarico {nome} -> {out_name}")

        data = download_bytes(url)
        img = Image.open(BytesIO(data))
        # normalizza e salva png
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA")
        img.save(out_path, format="PNG", optimize=True)
        print(f"  salvato: {out_path}")


if __name__ == "__main__":
    main()

