#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the WHITE-style variant (option 2) of the docs whose look changes — 01a and 01b —
into delivery/white/, alongside the existing colored delivery/ set (which stays untouched).

Only 01a and 01b use spanning tinted phase-zones, so only they differ in the white style;
00 (map) and 02–08 have no such zones and are byte-identical to the colored set, so they are
NOT duplicated here — use them from delivery/ as-is.

01a-white also adds the new "קבלת ההחלטה / לאחר בחינת הבקשה" transition header (green, down
chevron) before the "how will I know if approved?" card.
"""
import os
import build_delivery as bd

bd.OUTDIR = os.path.join(bd.REPO, "delivery", "white")

PAGES = [
    ("pages/app01a_white.py", "01a-application"),
    ("pages/app01b_white.py", "01b-schedule-and-benefits"),
]

def main():
    os.makedirs(bd.OUTDIR, exist_ok=True)
    for path, slug in PAGES:
        mod = bd.load(path)
        bd.write_html(slug, mod.build())
        bd.render(slug)
        print("built (white)", slug)
    print("\nWhite-style PDFs -> delivery/white/desktop/  +  delivery/white/mobile/")

if __name__ == "__main__":
    main()
