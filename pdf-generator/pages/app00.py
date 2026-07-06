#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for the benefits index — "מימוש זכאויות" (/benefits).
   A catalog page: hero + intro + a 7-card grid (one per entitlement) + closing note.
   Each card is a link placeholder — real hrefs will be added later."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "sparkles":'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  "wallet":'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "cap":'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/><path d="M22 10v6"/>',
  "home":'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  "bus":'<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  "package":'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  "bookopen":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "accessibility":'<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
  "arrowleft":'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)

# (title, description, icon, color-class, href)  — href=None for now (links added later)
BENEFITS = [
  ("דמי שיקום",     "קצבה חודשית המשולמת במהלך הלימודים לצורך מחייה",                 "wallet",        "c-amber",   None),
  ("שכר לימוד",     "החזר מלא או חלקי של שכר הלימוד השנתי למוסד האקדמי.",              "cap",           "c-blue",    None),
  ("שכר דירה",      "סיוע בשכר דירה לסטודנטים שלומדים רחוק ממקום מגוריהם.",           "home",          "c-emerald", None),
  ("הוצאות נסיעה",  "החזר עלויות הנסיעה בתחבורה ציבורית או הסעה מיוחדת.",             "bus",           "c-sky",     None),
  ("ציוד לימודי",   "מענק שנתי לציוד לימודי וסיוע ברכישת מחשב וציוד נוסף.",           "package",       "c-violet",  None),
  ("שיעורי עזר",    "מימון שיעורים פרטיים להשלמת פערים וחיזוק השליטה בחומר הנלמד",    "bookopen",      "c-rose",    None),
  ("הנגשות",        "התאמות והנגשת תנאי הלימוד עבור סטודנטים עם מוגבלות.",           "accessibility", "c-teal",    None),
]

def bcard(title, desc, icon, color, href=None):
    inner = (f'<div class="bcard {color}">'
             f'<div class="bcard-top"><span class="bico">{svg(icon,24)}</span>'
             f'<span class="more">למידע המלא {svg("arrowleft",12,"var(--primary-d)")}</span></div>'
             f'<h3>{E(title)}</h3><p>{E(desc)}</p></div>')
    # each card is a link placeholder — drop in an href later to make it clickable
    return f'<a href="{href}">{inner}</a>' if href else inner

def build():
    cards = ''.join(bcard(*b) for b in BENEFITS)
    intro = ('בדף זה מוצגים כלל סוגי הסיוע האפשריים במסגרת תוכנית השיקום; הזכאויות האישיות שאושרו לך '
             'על־ידי עובד השיקום מפורטות במכתב <span class="hl-pill">אישור לימודים לסמסטר</span>, המופיע באזור האישי שלך.')
    body = (
      '<div class="bintro"><h2>סל התמיכות והזכאויות</h2>'
      f'<p>{intro}</p></div>'
      f'<div class="bgrid">{cards}</div>'
      '<div class="bnote"><p>לא כל הזכאויות רלוונטיות לכל סטודנט. הזכאויות תלויות בסוג המוגבלות, סוג הלימודים, ותנאים נוספים.</p>'
      '<p class="st">לבירור מלא של הזכאויות שלך, פנה/י לפקיד/ת השיקום.</p></div>'
    )
    # scoped tightening so the whole catalog fits on ONE desktop A4 page
    OVERRIDE = """
html[data-variant="desktop"] .hero{padding:38px 60px 26px;}
html[data-variant="desktop"] .hero-badge{margin-top:8px;}
html[data-variant="desktop"] .body{padding-top:11px;}
html[data-variant="desktop"] .body>*{margin-bottom:11px;}
html[data-variant="desktop"] .bgrid{gap:12px;}
html[data-variant="desktop"] .bcard{padding:15px;gap:8px;}
html[data-variant="desktop"] .bnote{padding:14px 20px;}
html[data-variant="desktop"] .foot{margin-top:12px;}
"""
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>מימוש זכאויות — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}
{OVERRIDE}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("sparkles",30,"#fff")}</div>
      <div><h1>מימוש זכאויות</h1><p class="sub">עובד השיקום כבר קבע את הזכאויות האישיות שלך? כאן תמצא/י את כל הפרטים על הזכאויות וכיצד לממש כל אחת מהן</p></div>
    </div>
    <div style="position:relative"><span class="hero-badge">{svg("arrowleft",13,"#fff")} בחר/י זכאות כדי להתחיל</span></div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'00-benefits.html'),'w',encoding='utf-8').write(build())
    print("built 00-benefits.html (bespoke)")
