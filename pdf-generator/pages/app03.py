#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for שכר לימוד (03) — faithful to the original site's tuition-accordion.
   Same design system as דמי שיקום (02): white accordion-card sections (.acc), intro card,
   summary, callouts, two-up cards, invoice checklist, and the submit-documents button."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))          # .../pdf-generator/pages
ROOT = os.path.dirname(HERE)                               # .../pdf-generator
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "cap":'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/><path d="M22 10v6"/>',
  "calc":'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  "clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "receipt":'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  "award":'<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  "file":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)

PORTAL="https://ps.btl.gov.il/#/login"
DOCS_URL="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"

def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'
def pill(t): return f'<span class="pill">{t}</span>'

def acc(icon, title, *parts):
    """A top-level section wrapped in a white accordion-style card (icon+title header + body),
    faithful to the original site's AccordionItem. Splits across desktop pages via CSS clone."""
    head = f'<div class="acc-h"><span class="si">{svg(icon,20,"var(--primary-d)")}</span><h3>{E(title)}</h3></div>'
    return '<div class="acc">' + head + ''.join(parts) + '</div>'

def summary(text):
    return (f'<div class="summary"><div class="ico">{svg("zap",20,"hsl(199 89% 40%)")}</div>'
            f'<div class="sbody"><h2>בקצרה</h2><p>{text}</p></div></div>')

def important(text):
    return (f'<div class="important"><div class="ico">{svg("alert",19,"hsl(38 92% 42%)")}</div>'
            f'<div><h3>חשוב לזכור</h3><p>{text}</p></div></div>')

def elig_note():
    # thin "שים לב" heads-up under "בקצרה": eligibility is set individually by the rehab worker,
    # so program approval doesn't guarantee this specific benefit.
    txt=('זכאות זו, בדומה ליתר הזכאויות, נקבעת על־ידי עובד השיקום בהתאם לקריטריוני זכאות שנקבעו ומפורטים כאן. '
         'הזכאויות שאושרו לך עבור הסמסטר מופיעות במכתב '+b('"אישור לימודים לסמסטר"')+' ב'
         f'<a href="{PORTAL}">אזור האישי שלך בביטוח הלאומי</a>.')
    return f'<div class="notice"><span class="nt">שים לב</span><p>{txt}</p></div>'

def cond(n,title,inner):
    return (f'<div class="cond"><div class="cond-h"><span class="ncirc">{n}</span><h4>{E(title)}</h4></div>{inner}</div>')

def callout(variant, html_text, icon=None):
    ic = icon or ("alert" if variant in ("red",) else "info")
    return f'<div class="callout {variant}"><span class="cico">{svg(ic,17)}</span><p>{html_text}</p></div>'

def graybox(inner, icon=None, title=None):
    """muted box (bg-muted/50 in the original) with an optional icon+title header."""
    h=''
    if title:
        ico = f'<span class="sec-ico">{svg(icon,17)}</span>' if icon else ''
        h=f'<div class="cond-h">{ico}<h4>{E(title)}</h4></div>'
    return f'<div class="cond">{h}{inner}</div>'

def checkrow(html_text):
    return f'<div class="checkrow">{svg("check",18)}<p>{html_text}</p></div>'

def doccard(title, items, footer):
    lis=''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)
    return (f'<div class="checklist"><div class="cl-head">{svg("receipt",17)}<span>{E(title)}</span></div>'
            f'<ul>{lis}</ul><div class="cl-warn">{svg("alert",15)}<span>{E(footer)}</span></div></div>')

def bigbtn(label, url=DOCS_URL):
    return (f'<div class="bigbtn"><a href="{url}">{svg("send",19,"#fff")}'
            f'<span>{E(label)}</span></a></div>')

def build():
    B=[]
    B.append(summary('אתה זכאי להחזר שכר לימוד עד '+b('13,079 ₪')+' לשנת לימודים. ההחזר משולם לחשבונך כנגד קבלות על תשלום שבוצע בפועל. '
                     'אם שכר הלימוד גבוה מהתקרה, יהיה עליך לשאת בהפרש באופן עצמאי. ההחזר משולם בשתי פעימות — בסמסטר א׳ ובסמסטר ב׳.'))
    B.append(elig_note())

    # ===== Section 1: refund ceiling (white accordion card) =====
    B.append(acc("calc","תקרת ההחזר",
        p("תקרת ההחזר המקסימלית לשנת לימודים היא "+pill("13,079 ₪")+" (נכון לשנת 2025)."),
        p("ההחזר אינו מועבר ישירות למוסד הלימודים. הוא משולם כזיכוי לחשבון הבנק שלך, לאחר הצגת קבלה על תשלום שבוצע בפועל."),
        graybox(
            p("אם שכר הלימוד בפועל גבוה מתקרת ההחזר, יהיה עליך לשאת בתשלום ההפרש באופן עצמאי.")
            + p("במצב כזה, ההחזר עבור כל קבלה יחושב באופן יחסי, עד להגעה לתקרה השנתית.")
            + f'<div class="cond-h" style="margin-top:11px;margin-bottom:6px"><span class="sec-ico">{svg("info",16)}</span><h4>לדוגמא</h4></div>'
            + p("אם שכר הלימוד שלך כפול מהתקרה, תקבל החזר בגובה 50% מכל קבלה שתגיש, וזאת עד לניצול מלא של סכום המקסימום ("+pill("13,079 ₪")+")."),
            title="במקרה של שכר לימוד מעל לתקרה")))

    # ===== Section 2: payment timing (white accordion card) =====
    B.append(acc("clock","מתי אקבל את ההחזר?",
        p("מאחר שאישור הזכאות לכל סמסטר מתבצע בנפרד ובכפוף לבחינת התקדמותך בלימודים, ההחזר משולם בשני חלקים:","lead"),
        cond("1","פעימה ראשונה", p("מחצית מסכום הזכאות תשולם בתחילת סמסטר א׳.")),
        cond("2","פעימה שנייה", p("המחצית השנייה תשולם לאחר אישור סמסטר ב׳.")),
        callout("blue","במקרה בו שולמה מקדמה, במקרים מסוימים ניתן יהיה לשלמה לפני מועד תחילת הלימודים.","info")))

    # ===== Section 3: scholarships & discounts (white accordion card) =====
    B.append(acc("award","השפעת מלגות, הנחות ופטורים",
        checkrow("מלגות ייעודיות שניתנו עבור שכר לימוד (למשל מלגת "+b('"ממדים ללימודים"')+" או מלגה של משרד הביטחון ללימודים בפריפריה) "+b("ינוכו")+" מסכום ההחזר."),
        checkrow("מלגות שאינן מועברות ישירות לחשבון שכר הלימוד ויכולות לשמש למטרות אחרות "+b("אינן נלקחות בחשבון")+".")))

    # ===== Section 4: receipt instructions (white accordion card) =====
    B.append(acc("receipt","הנחיות להגשת הקבלה",
        p("לאחר התשלום למוסד הלימודים יש להעביר קבלה עבור התשלום לעו״ס השיקום דרך אתר הביטוח הלאומי.","lead"),
        doccard("מה חייב להופיע על הקבלה",
                ["שם מלא","מספר תעודת זהות","שם המוסד האקדמי","תאריך הנפקת הקבלה","מספר קבלה / חשבונית","מהות התשלום – שכר לימוד"],
                "קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה."),
        bigbtn("שליחת מסמכים לעו״ס השיקום")))

    # ===== Section 5: processing time (white accordion card) =====
    B.append(acc("clock","תוך כמה זמן מתקבל ההחזר?",
        checkrow("לרוב, ההחזר משולם לחשבונך תוך "+b("כעשרה ימי עבודה")+" לאחר הגשת הקבלה."),
        callout("blue","ייתכנו עיכובים בזמני עומס חריג או בתקופת חגים וחופשות.","info")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>שכר לימוד — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("cap",30,"#fff")}</div>
      <div><h1>שכר לימוד</h1><p class="sub">סיוע בתשלום שכר הלימוד</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'03-tuition.html'),'w',encoding='utf-8').write(build())
    print("built 03-tuition.html (bespoke)")
