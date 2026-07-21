#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Package the delivery PDFs under clear Hebrew names for the insured, split mobile/desktop,
and zip them for upload to Google Drive.

Usage: python3 package.py [output_dir]   (default: ../package)
Produces <out>/מסמכי-שיקום-להעלאה/{מובייל…, דסקטופ…}/<friendly-name>.pdf  and  a .zip beside it.
The slug→name map is the single source of truth for the distributed file names."""
import os, sys, shutil, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.join(REPO, "delivery")

# slug (in delivery/) -> clear Hebrew name shown to the insured
NAMES = [
    ("01a-application",            "1. הגשת בקשה לאישור לימודים"),
    ("01b-schedule-and-benefits",  "2. הגשת מערכת שעות וקביעת הזכאויות"),
    ("benefits-hub",               "מימוש זכאויות"),
    ("02-rehabilitation-allowance","דמי שיקום"),
    ("03-tuition",                 "שכר לימוד"),
    ("04-rent-assistance",         "שכר דירה"),
    ("05-travel-expenses",         "החזר הוצאות נסיעה"),
    ("06-study-equipment",         "ציוד לימודי"),
    ("07-tutoring",                "שיעורי עזר"),
    ("08-accessibility",           "הנגשות"),
]
VARIANTS = [
    ("print",   "להדפסה - לעובדים (A4)"),
    ("desktop", "למבוטחים - מחשב (דסקטופ)"),
    ("mobile",  "למבוטחים - טלפון (מובייל)"),
]
ROOT_NAME = "מסמכי-שיקום-להעלאה"

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, "package")
    base = os.path.join(out, ROOT_NAME)
    if os.path.exists(base):
        shutil.rmtree(base)
    for v, vheb in VARIANTS:
        d = os.path.join(base, vheb)
        os.makedirs(d)
        for slug, name in NAMES:
            shutil.copy(os.path.join(SRC, v, slug + ".pdf"), os.path.join(d, name + ".pdf"))
    zpath = base + ".zip"
    if os.path.exists(zpath):
        os.remove(zpath)
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(base):
            for f in files:
                full = os.path.join(root, f)
                z.write(full, os.path.relpath(full, os.path.dirname(base)))
    print("package:", base)
    print("zip:", zpath)

if __name__ == "__main__":
    main()
