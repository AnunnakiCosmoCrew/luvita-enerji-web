#!/usr/bin/env python3
"""Kartvizit QR'larını derleme öncesi üretir → src/data/qr.json

Çalıştırma:  pip3 install segno && python3 scripts/gen-qr.py
Çıktı, inline SVG path verisi olarak sayfaya gömülür; çalışma zamanında
QR kütüphanesi ya da harici servis kullanılmaz (bkz. CLAUDE.md "minimal
external requests"). İletişim bilgileri değişince yeniden çalıştırın.
"""
import json, pathlib
import segno

SITE = "https://luvitaenerji.com"
PHONE = "+905059868076"
EMAIL = "mertugrul@luvita.tr"

vcard = "\r\n".join([
    "BEGIN:VCARD", "VERSION:3.0",
    "N:Ertuğrul;Mert;;;",
    "FN:Mert Ertuğrul",
    "ORG:Luvita Enerji",
    f"TEL;TYPE=CELL:{PHONE}",
    f"EMAIL:{EMAIL}",
    f"URL:{SITE}/",
    f"X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/{PHONE[1:]}",
    "ADR;TYPE=WORK:;;;Bodrum;Muğla;;Türkiye",
    "END:VCARD", "",
])

payloads = {
    "vcard": vcard,
    "wa": f"https://wa.me/{PHONE[1:]}",
    "site": f"{SITE}/",
    "card_tr": f"{SITE}/kartvizit/",
    "card_en": f"{SITE}/en/card/",
}

QUIET = 4
out = {}
for key, text in payloads.items():
    q = segno.make(text, error="m", encoding="utf-8" if key == "vcard" else None)
    m = [list(r) for r in q.matrix]
    n = len(m)
    parts = []
    for y, row in enumerate(m):
        x = 0
        while x < n:
            if row[x]:
                w = 1
                while x + w < n and row[x + w]:
                    w += 1
                parts.append(f"M{x+QUIET} {y+QUIET}h{w}v1h-{w}z")
                x += w
            else:
                x += 1
    out[key] = {"n": n + 2 * QUIET, "d": "".join(parts)}
    print(f"{key:8s} v{q.version:<3} {n}x{n}  {len(text.encode())} B")

dest = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "qr.json"
dest.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")) + "\n")
print("→", dest)
