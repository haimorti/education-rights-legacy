#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for מפת הזכאויות (00) — the cover/index map of all benefits.
Delivered up front (with 01a) so the applicant sees the full picture before applying,
with each benefit shown together with its eligibility gate (conditional framing —
never a promise), to prevent false expectations."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "map":'<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 21.381V8.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
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
def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'

def summary(text):
    return (f'<div class="summary"><div class="ico">{svg("zap",20,"hsl(199 89% 40%)")}</div>'
            f'<div class="sbody"><h2>בקצרה</h2><p>{text}</p></div></div>')

def callout(variant, html_text, icon=None):
    ic = icon or ("alert" if variant in ("red","amber") else "info")
    return f'<div class="callout {variant}"><span class="cico">{svg(ic,17)}</span><p>{html_text}</p></div>'

# Each benefit: (icon, hsl color, name, "בקצרה", "למי זה מתאים" gate — framed conditionally).
BENEFITS = [
  ("wallet","38 92% 50%","דמי שיקום",
   "גמלה חודשית למחיה במהלך הלימודים.",
   "לומד לפחות 16 שעות שבועיות ואינך מקבל קצבת נכות מלאה; בכפוף למבחן הכנסות."),
  ("cap","199 89% 48%","שכר לימוד",
   "החזר שכר לימוד עד 13,079 ₪ לשנה, כנגד קבלות.",
   "על פי רוב לכל מי שלימודיו אושרו כתוכנית השיקום."),
  ("home","160 84% 39%","שכר דירה",
   "סיוע בשכר דירה — עד 1,200 ₪ לחודש (עד 2,000 ₪ במקרים מסוימים).",
   "מקום הלימודים במרחק של לפחות 40 ק\"מ ממגוריך, ולומד לפחות 16 שעות ו-3 ימים בשבוע."),
  ("bus","201 90% 48%","החזר הוצאות נסיעה",
   "השתתפות בהוצאות הנסיעה למקום הלימודים.",
   "משולם אוטומטית לכל הזכאים לפי תעריף תחבורה ציבורית; סיוע ברכב פרטי או בהסעה מיוחדת — למי שיש לו מגבלת ניידות מוכרת."),
  ("package","262 83% 58%","ציוד לימודי",
   "מענק שנתי של 1,068 ₪, ועד 3,204 ₪ נוספים חד-פעמית למחשב או ציוד מתקדם.",
   "המענק השנתי אוטומטי לכל הזכאים; ציוד נוסף — בתנאים ובאישור מראש."),
  ("book","347 77% 50%","שיעורי עזר",
   "תמיכה לימודית בהיקף של עד 25% משעות הלימוד החודשיות.",
   "אם אתה זקוק לתמיכה לימודית — ביוזמתך, בפנייה לעו\"ס השיקום (לא נקבע אוטומטית)."),
  ("access","173 80% 36%","הנגשות",
   "מלווה אישי, חונכות, ציוד טכנולוגי מותאם, תמלול, תרגום ועוד.",
   "לפי צורך הנובע מנכות או ממגבלה תפקודית; נקבע אישית ובפנייה לעו\"ס."),
]

def mapcard(ic, hsl, name, brief, gate):
    head = f'<div class="acc-h"><span class="si">{svg(ic,20,f"hsl({hsl})")}</span><h3>{E(name)}</h3></div>'
    gatebox = callout("blue", b("למי זה מתאים: ")+E(gate), "info")
    return (f'<div class="acc" style="border-inline-start:4px solid hsl({hsl})">'
            f'{head}{p(E(brief))}{gatebox}</div>')

def build():
    B=[]
    B.append(summary("לפניך מפה של כל הזכאויות האפשריות בתקופת הלימודים — כדי שתכיר את התמונה המלאה "
                     "ותדע מה עשוי להיות רלוונטי עבורך, כעת או בהמשך."))
    B.append(callout("amber", b("לא כל סטודנט זכאי לכל הזכאויות. ")+
                     "כל זכאות כפופה לקריטריונים ולהחלטת עובד השיקום, ונקבעת באופן אישי לפי מצבך. "
                     "השורה “למי זה מתאים” שלצד כל זכאות מסמנת את תנאי-הסף — כדי שתוכל לזהות בעצמך מה רלוונטי עבורך.",
                     "alert"))
    for ic,hsl,name,brief,gate in BENEFITS:
        B.append(mapcard(ic,hsl,name,brief,gate))
    B.append(callout("blue",
                     b("מצבך עשוי להשתנות במהלך הלימודים")+" (מעבר דירה, שינוי בהיקף העבודה או ההכנסה, החמרה רפואית). "
                     "שינוי כזה עשוי לפתוח זכאות חדשה או לשנות זכאות קיימת — במקרה כזה פנה לעובד השיקום.",
                     "info"))
    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>מפת הזכאויות — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("map",30,"#fff")}</div>
      <div><h1>מפת הזכאויות</h1><p class="sub">כל התמיכות האפשריות בתקופת הלימודים — במבט אחד</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'00-benefits-map.html'),'w',encoding='utf-8').write(build())
    print("built 00-benefits-map.html (bespoke)")
