#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Delivery-set orchestrator — builds the up-to-date applicant handout set into ../delivery/,
WITHOUT touching any existing builder, doc, or the frozen pdf/ outputs.

New documents (bespoke builders): 00 map, 01a application, 01b schedule+benefits.
Benefit pages (02–08): reuse the EXISTING app0X.py builders unchanged, but at runtime
override two module functions before calling build():
  * elig_note()  -> '' (drop the top amber side-bar note)
  * important()  -> the expectation-framing "חשוב לזכור" box (moved from the top note),
                    replacing the old per-semester submission reminder (which now lives in 01b).
Because build() resolves elig_note/important as module globals at call time, reassigning the
module attributes cleanly changes the output — the source files stay byte-for-byte untouched.
"""
import os, sys, subprocess, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))          # .../pdf-generator
REPO = os.path.dirname(HERE)
HTMLDIR = os.path.join(HERE, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
OUTDIR = os.path.join(REPO, "delivery")
RENDER = os.path.join(HERE, "render.js")

# (module file, output slug). Order = delivery order.
NEW_PAGES = [
    ("pages/app00.py",  "00-benefits-map"),
    ("pages/app01a.py", "01a-application"),
    ("pages/app01b.py", "01b-schedule-and-benefits"),
]
BENEFITS = [
    ("pages/app02.py", "02-rehabilitation-allowance"),
    ("pages/app03.py", "03-tuition"),
    ("pages/app04.py", "04-rent-assistance"),
    ("pages/app05.py", "05-travel-expenses"),
    ("pages/app06.py", "06-study-equipment"),
    ("pages/app07.py", "07-tutoring"),
    ("pages/app08.py", "08-accessibility"),
]

def load(path):
    name = "dlv_" + os.path.splitext(os.path.basename(path))[0]
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, path))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

def expectation_box(mod):
    """Build the moved 'חשוב לזכור' box (eligibility framing) using the module's OWN
    important()/b()/PORTAL, so styling stays identical to the source design."""
    txt = ('זכאות זו, בדומה ליתר הזכאויות, נקבעת על־ידי עובד השיקום בהתאם לקריטריוני הזכאות '
           'המפורטים כאן, ומאושרת עבור כל סמסטר בנפרד. פירוט הזכאויות שאושרו לך מופיע במכתב '
           + mod.b('"אישור לימודים לסמסטר"') + ', הזמין ב'
           + f'<a href="{mod.PORTAL}">אזור האישי שלך באתר הביטוח הלאומי</a>.')
    return mod.important(txt)

def write_html(slug, html):
    path = os.path.join(HTMLDIR, slug + ".html")
    open(path, "w", encoding="utf-8").write(html)
    return path

def render(slug):
    subprocess.run(["node", RENDER, os.path.join(HTMLDIR, slug + ".html"),
                    os.path.join(OUTDIR, slug)], check=True, cwd=HERE)

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    # new bespoke pages
    for path, slug in NEW_PAGES:
        mod = load(path)
        write_html(slug, mod.build())
        render(slug); print("built", slug)
    # benefit pages — reuse existing builders, override two functions at runtime
    for path, slug in BENEFITS:
        mod = load(path)
        box = expectation_box(mod)          # build BEFORE overriding important()
        mod.elig_note = lambda: ""          # drop top note
        mod.important = lambda *a, **k: box  # bottom "חשוב לזכור" = eligibility framing
        write_html(slug, mod.build())
        render(slug); print("built", slug, "(elig-note moved to bottom חשוב לזכור)")
    print("\nAll delivery PDFs -> delivery/desktop/  +  delivery/mobile/")

if __name__ == "__main__":
    main()
