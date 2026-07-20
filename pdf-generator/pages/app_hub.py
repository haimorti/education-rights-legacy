#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for the benefits HUB (מימוש זכאויות) — faithful to the site's /benefits page.
A navigation page: a grid of the 7 benefit cards, each a CLICKABLE link to that benefit's file.

LINKS: fill in each benefit's Google Drive share URL (the uploaded benefit PDF). Until then the
cards point to TEST_URL so the link mechanic can be verified in Drive's mobile preview."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()
PORTAL = "https://ps.btl.gov.il/#/login"

# ── LINK TARGETS ─────────────────────────────────────────────────────────────
# Replace each with the Google Drive share URL of that benefit's PDF.
# Default (TEST_URL) lets you verify that PDF links fire in Drive's mobile preview.
TEST_URL = "https://www.btl.gov.il/"
LINKS = {
  "02-rehabilitation-allowance": TEST_URL,
  "03-tuition":                  TEST_URL,
  "04-rent-assistance":          TEST_URL,
  "05-travel-expenses":          TEST_URL,
  "06-study-equipment":          TEST_URL,
  "07-tutoring":                 TEST_URL,
  "08-accessibility":            TEST_URL,
}

IC = {
  "sparkle":'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>',
  "chevL":'<path d="m15 18-6-6 6-6"/>',
  "ext":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "wallet":'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "cap":'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/><path d="M22 10v6"/>',
  "home":'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  "bus":'<path d="M8 6v6M15 6v6M2 12h19.6"/><path d="M18 18h3s.8-1.7 1-2.8c.1-.4.1-.8 0-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  "package":'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  "book":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "access":'<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)

# (slug, icon, hsl, title, description) — order matches the site's /benefits grid.
CARDS = [
  ("02-rehabilitation-allowance","wallet","38 92% 50%","דמי שיקום","קצבה חודשית המשולמת במהלך הלימודים לצורך מחיה."),
  ("03-tuition","cap","199 89% 48%","שכר לימוד","החזר מלא או חלקי של שכר הלימוד השנתי למוסד האקדמי."),
  ("04-rent-assistance","home","160 84% 39%","שכר דירה","סיוע בשכר דירה לסטודנטים שלומדים רחוק ממקום מגוריהם."),
  ("05-travel-expenses","bus","201 90% 48%","הוצאות נסיעה","החזר עלויות הנסיעה בתחבורה ציבורית או הסעה מיוחדת."),
  ("06-study-equipment","package","262 83% 58%","ציוד לימודי","מענק שנתי לציוד לימודי וסיוע ברכישת מחשב או ציוד נוסף."),
  ("07-tutoring","book","347 77% 50%","שיעורי עזר","מימון שיעורים פרטניים להשלמת פערים וחיזוק השליטה בחומר הנלמד."),
  ("08-accessibility","access","173 80% 36%","הנגשות","התאמות והנגשות תנאי הלימוד עבור סטודנטים עם מוגבלות."),
]

HUB_CSS = """
.hubbtn{display:inline-flex;align-items:center;gap:8px;margin-top:16px;background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.5);color:#fff;font-weight:700;font-size:15px;padding:11px 20px;border-radius:999px;}
.hubsec{font-size:22px;font-weight:800;margin:2px 0 8px;}
.hubintro{font-size:14px;color:var(--muted);line-height:1.7;margin-bottom:18px;}
.hubgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
html[data-variant="mobile"] .hubgrid{grid-template-columns:1fr;gap:12px;}
.hubcard{display:flex;flex-direction:column;background:#fff;border:1px solid var(--card-bd);
  border-radius:16px;padding:16px 16px 18px;box-shadow:0 4px 14px rgba(16,40,70,.06);
  border-bottom:3px solid var(--hubc);break-inside:avoid;}
.hubcard .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;}
.hubcard .more{display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;color:var(--primary-d);}
.hubcard .ci{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  background:hsl(var(--hubh) / .12);color:hsl(var(--hubh));}
.hubcard h3{font-size:17px;font-weight:800;margin-bottom:6px;color:var(--fg);}
.hubcard p{font-size:12.5px;color:var(--muted);line-height:1.55;}
"""

def hubcard(slug, icon, hsl, title, desc):
    url = LINKS.get(slug, TEST_URL)
    style = f'--hubc:hsl({hsl});--hubh:{hsl}'
    more = f'<span class="more">למידע המלא {svg("chevL",14)}</span>'
    ci = f'<span class="ci">{svg(icon,22,f"hsl({hsl})")}</span>'
    return (f'<a class="hubcard" href="{url}" style="{style}">'
            f'<div class="top">{more}{ci}</div>'
            f'<h3>{E(title)}</h3><p>{E(desc)}</p></a>')

def build():
    cards = ''.join(hubcard(*c) for c in CARDS)
    intro = ('בדף זה מוצגים כלל סוגי הסיוע האפשריים במסגרת תוכנית השיקום. לחצו על כל כרטיסייה לפרטים '
             'נוספים על תנאי הזכאות ואופן המימוש. הזכאויות האישיות שאושרו לך על-ידי עובד השיקום מפורטות '
             f'במכתב <strong>"אישור לימודים לסמסטר"</strong>, המופיע ב<a href="{PORTAL}">אזור האישי שלך</a>.')
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>מימוש זכאויות — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}
{HUB_CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("sparkle",30,"#fff")}</div>
      <div><h1>מימוש זכאויות</h1><p class="sub">עובד השיקום כבר קבע את הזכאויות האישיות שלך? כאן תמצא את כל הפרטים על הזכאויות וכיצד לממש כל אחת מהן.</p></div>
    </div>
    <div class="hubbtn">בחר/י זכאות כדי להתחיל {svg("chevL",18,"#fff")}</div>
  </div>
  <div class="body">
    <h2 class="hubsec">סל התמיכות והזכאויות</h2>
    <p class="hubintro">{intro}</p>
    <div class="hubgrid">{cards}</div>
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'benefits-hub.html'),'w',encoding='utf-8').write(build())
    print("built benefits-hub.html (hub)")
