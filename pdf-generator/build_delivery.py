#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Delivery-set orchestrator — builds the applicant handout set into ../delivery/{print,desktop,mobile}/.

Benefit pages (02–08) reuse the EXISTING app0X.py builders unchanged; at runtime we override
elig_note()/important() (module globals resolved at build() call time) — source files untouched.

Navigation links differ per variant (each variant must link to files of the SAME variant), so the
three linked pages (01a→01b, 01b→hub, hub→benefits) are built twice: once with the mobile Drive
URLs (rendered to the mobile variant) and once with the desktop Drive URLs (rendered to the
desktop + print variants). URLs are injected into the module globals before build().
"""
import os, subprocess, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
HTMLDIR = os.path.join(HERE, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
OUTDIR = os.path.join(REPO, "delivery")
RENDER = os.path.join(HERE, "render.js")

def gd(fid):  # Google Drive share URL from a file id
    return f"https://drive.google.com/file/d/{fid}/view?usp=sharing"

# Per-variant link targets. Keys: '01b' (01a→01b), 'hub' (01b→hub), and the 7 benefit slugs (hub cards).
LINKS_MOBILE = {
    "01b": gd("1JtGkStCNt5bISPdPRIaZ2nXi7s7VaagH"),
    "hub": gd("1k9N60BZa_ep7qoEAxrH_NxGP-wlhusXc"),
    "02-rehabilitation-allowance": gd("1M-gFZYUQeS2I9JaYQVizpDBmgGb4XT5L"),
    "03-tuition":                  gd("1p-PYQ5yk1FECWlEwIwlzM5P2AXs1-PoP"),
    "04-rent-assistance":          gd("1SC75B_evOOsVV0FmODtuD_na_uMkIOol"),
    "05-travel-expenses":          gd("1PQ9ekhVVN6yvEcXqrB5Zd1vEda4NJ3Kf"),
    "06-study-equipment":          gd("19SA8EHLvn0gnpeO1E_5pAjXprDl9Q36Q"),
    "07-tutoring":                 gd("1Mld-U4nU2ZxIoregBGXkQM1h1szQbC8w"),
    "08-accessibility":            gd("1ghG6gR9-jsUMubbOM0QfzRyuXIAkV6mQ"),
}
LINKS_DESKTOP = {
    "01b": gd("1l6rZvwerG_zJUuteI-GlSn2dSX41z8kL"),
    "hub": gd("1PsdEKnuOXDly_Cc14pRjVzVGPPfCEmU4"),
    "02-rehabilitation-allowance": gd("17bcooZ5wnlfmE6VtHUa2zfwYsfn1U1QA"),
    "03-tuition":                  gd("17FeTC0EZkFGai1_5giZEqb60JTrcpb4C"),
    "04-rent-assistance":          gd("18FLklfCoD7Dd31Z36lUS6Wegy1JLJzJ3"),
    "05-travel-expenses":          gd("1ghORUcXbvLgm_SYE-mt7F5gB4RawKnzS"),
    "06-study-equipment":          gd("1anSS4IZrLYFtLpXq5hbmD9cZH8AeeAaD"),
    "07-tutoring":                 gd("1A6R5H2pSwX_JtoEKNIiF4kjmgZ5_ovwF"),
    "08-accessibility":            gd("1Oq18IY7BMfSxIUoOk3BL1ORE-FBDNVEk"),
}
LINKSETS = {"mobile": LINKS_MOBILE, "desktop": LINKS_DESKTOP}

NEW_PAGES = [
    ("pages/app01a.py", "01a-application"),
    ("pages/app01b.py", "01b-schedule-and-benefits"),
    ("pages/app_hub.py", "benefits-hub"),
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

def inject(mod, slug, linkset):
    """Point this page's outgoing navigation links at the given variant's Drive URLs."""
    d = LINKSETS[linkset]
    if slug == "01a-application":
        mod.NEXT_URL = d["01b"]
    elif slug == "01b-schedule-and-benefits":
        mod.HUB_URL = d["hub"]
    elif slug == "benefits-hub":
        mod.LINKS = {k: v for k, v in d.items() if k not in ("01b", "hub")}

def expectation_box(mod):
    txt = ('זכאות זו, בדומה ליתר הזכאויות, נקבעת על־ידי עובד השיקום בהתאם לקריטריוני הזכאות '
           'המפורטים כאן, ומאושרת עבור כל סמסטר בנפרד. פירוט הזכאויות שאושרו לך מופיע במכתב '
           + mod.b('"אישור לימודים לסמסטר"') + ', הזמין ב'
           + f'<a href="{mod.PORTAL}">אזור האישי שלך באתר הביטוח הלאומי</a>.')
    return mod.important(txt)

def write_html(slug, html):
    open(os.path.join(HTMLDIR, slug + ".html"), "w", encoding="utf-8").write(html)

def render(slug, variants="print,desktop,mobile"):
    subprocess.run(["node", RENDER, os.path.join(HTMLDIR, slug + ".html"),
                    os.path.join(OUTDIR, slug), variants], check=True, cwd=HERE)

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    # linked pages — two passes so each variant links within its own set
    for path, slug in NEW_PAGES:
        mod = load(path)
        inject(mod, slug, "mobile");  write_html(slug, mod.build()); render(slug, "mobile")
        inject(mod, slug, "desktop"); write_html(slug, mod.build()); render(slug, "desktop,print")
        print("built", slug, "(per-variant links)")
    # benefit pages — no outgoing links; content is variant-independent
    for path, slug in BENEFITS:
        mod = load(path)
        box = expectation_box(mod)
        mod.elig_note = lambda: ""
        mod.important = lambda *a, **k: box
        write_html(slug, mod.build()); render(slug)
        print("built", slug)
    print("\nAll delivery PDFs -> delivery/{print,desktop,mobile}/")

if __name__ == "__main__":
    main()
