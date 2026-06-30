#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for שכר דירה (04) — faithful to the original site's housing-accordion.
   Same design system as 02/03: white accordion-card sections (.acc), intro card, summary,
   stat cards, worked-example box, callouts, and the submit-documents button."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "home":'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "pin":'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  "clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "wallet":'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "trend":'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  "building":'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  "sun":'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  "filet":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  "ext":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)

PORTAL="https://ps.btl.gov.il/#/login"
DOCS_URL="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
URL_DIST="https://www.btl.gov.il/Simulators/GeneralCalc/Pages/Merchakim.aspx"

def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'
def pill(t): return f'<span class="pill">{t}</span>'

def acc(icon, title, *parts):
    head = f'<div class="acc-h"><span class="si">{svg(icon,20,"var(--primary-d)")}</span><h3>{E(title)}</h3></div>'
    return '<div class="acc">' + head + ''.join(parts) + '</div>'

def summary(text):
    return (f'<div class="summary"><div class="ico">{svg("zap",20,"hsl(199 89% 40%)")}</div>'
            f'<div class="sbody"><h2>בקצרה</h2><p>{text}</p></div></div>')

def important(text):
    return (f'<div class="important"><div class="ico">{svg("alert",19,"hsl(38 92% 42%)")}</div>'
            f'<div><h3>חשוב לזכור</h3><p>{text}</p></div></div>')

def intro_card():
    txt=('זכאות זו, כמו שאר התמיכות בתוכנית השיקום, נקבעת באופן אישי על-ידי עובד השיקום. '
         'לאחר שלימודיך אושרו כתוכנית השיקום והגשת מערכת שעות, עובד השיקום בוחן את נתוניך וקובע אילו זכאויות מאושרות לך לסמסטר. '
         'הזכאויות שאושרו לך מפורטות במכתב '+b('"אישור לימודים לסמסטר"')+', שתמצא/י ב'
         f'<a href="{PORTAL}">אזור האישי שלך באתר הביטוח הלאומי</a> — אם אכן אושרו לך זכאויות לסמסטר הקרוב.')
    return (f'<div class="card sec"><h3 class="sec-h"><span class="sec-ico">{svg("userc",18)}</span>'
            f'איך נקבעת הזכאות שלך?</h3><p class="par">{txt}</p></div>')

def callout(variant, html_text, icon=None):
    ic = icon or ("alert" if variant in ("red",) else "info")
    return f'<div class="callout {variant}"><span class="cico">{svg(ic,17)}</span><p>{html_text}</p></div>'

def iconrow(icon, html_text):
    return f'<div class="checkrow">{svg(icon,18)}<p>{html_text}</p></div>'

def linkin(url,text):
    return f'<a class="linkin" href="{url}">{E(text)}{svg("ext",13)}</a>'

def minicard(icon, title, body_html):
    mh = f'<div class="mh">{svg(icon,17)}<h5>{E(title)}</h5></div>'
    return f'<div class="minicard">{mh}{body_html}</div>'

def twoup_raw(*cards):
    return f'<div class="twoup">{"".join(cards)}</div>'

def statcard(variant, icon, title, big, desc, fine=None):
    cls = "statcard accent" if variant=="accent" else "statcard"
    f = f'<p class="fine">{E(fine)}</p>' if fine else ''
    return (f'<div class="{cls}"><div class="mh">{svg(icon,18)}<h5>{E(title)}</h5></div>'
            f'<p class="big">{E(big)}</p><p>{desc}</p>{f}</div>')

def statgrid(*cards):
    return f'<div class="statgrid">{"".join(cards)}</div>'

def extile(label, val, sub=None, hl=False):
    cls="extile hl" if hl else "extile"
    s=f'<div class="sub">{E(sub)}</div>' if sub else ''
    return f'<div class="{cls}"><div class="lbl">{E(label)}</div><div class="val">{E(val)}</div>{s}</div>'

def exbox(header, tiles, note):
    return (f'<div class="exbox"><div class="exh">{E(header)}</div>'
            f'<div class="extiles">{"".join(tiles)}</div><p class="exnote">{note}</p></div>')

def bigbtn(label, url=DOCS_URL):
    return (f'<div class="bigbtn"><a href="{url}">{svg("send",19,"#fff")}'
            f'<span>{E(label)}</span></a></div>')

def build():
    B=[]
    B.append(summary("סיוע בתשלום שכר דירה למשתקמים שמקום לימודיהם מרוחק ממקום מגוריהם הקבוע."))
    B.append(intro_card())

    # ===== Section 1: basic eligibility =====
    B.append(acc("check","תנאי זכאות בסיסיים",
        p("כדי להיות זכאי לסיוע בשכר דירה נדרשת עמידה בשני התנאים הבאים:","lead"),
        twoup_raw(
            minicard("pin","מרחק גאוגרפי",
                p("מקום ההכשרה נמצא במרחק של לפחות "+pill('40 ק"מ')+" מתחום הרשות המקומית שבה אתה מתגורר דרך קבע.")
                + p("המרחק נקבע על פי "+linkin(URL_DIST,"מחשבון מרחק")+" בין יישובים של הביטוח הלאומי.")),
            minicard("clock","היקף הלימודים",
                p("לימודים פרונטליים בהיקף של לפחות "+pill("16 שעות שבועיות")+" ולפחות "+pill("3 ימי לימוד")+" בשבוע.")))))

    # ===== Section 2: maximum aid amount =====
    B.append(acc("wallet","גובה הסיוע המקסימלי",
        statgrid(
            statcard("reg","wallet","סיוע רגיל","1,200 ₪","לחודש (נכון לנובמבר 2025)"),
            statcard("accent","trend","סיוע מוגדל","עד 2,000 ₪",
                     "לסטודנטים עם נכות בשיעור של 65% ומעלה המתמודדים עם מגבלה תפקודית משמעותית.",
                     fine="לבדיקת זכאות לסיוע מוגדל, יש לפנות אל עובד השיקום."))))

    # ===== Section 3: ministry of housing top-up =====
    B.append(acc("building","סיוע נוסף ממשרד השיכון",
        p("במקרה של זכאות לקצבת נכות מלאה, ייתכן שקיימת גם זכאות לסיוע בשכר דירה ממשרד השיכון. לצורך חישוב ההשלמה ומימוש הזכאות, יש להציג מסמך ממשרד השיכון הכולל את סכומי הסיוע שאושרו לך.","lead"),
        callout("amber",b("שים לב: ")+"הסיוע הכולל ממשרד השיכון ומהביטוח הלאומי לא יעלה על סכום שכר הדירה שאתה משלם בפועל.","alert"),
        exbox("דוגמה להמחשה",
              [extile("שכר דירה בפועל","1,600 ₪"),
               extile("סיוע ממשרד השיכון","700 ₪"),
               extile("סיוע מביטוח לאומי","900 ₪","במקום 1,200 ₪",hl=True)],
              "במקרה זה, בו שכר הדירה עומד על 1,600 ₪ ומשרד השיכון מסייע בסכום של 700 ₪, הסיוע מהביטוח הלאומי יעמוד על 900 ₪ בלבד – משום שסך הסיוע הכולל אינו יכול לעלות על שכר הדירה בפועל.")))

    # ===== Section 4: property ownership =====
    B.append(acc("home","בעלות על דירה",
        iconrow("info","אם ברשותך דירה בבעלותך, יופחת מסכום הסיוע הסכום שאתה מקבל בגין השכרת דירתך, אף אם אינה מושכרת בפועל.")))

    # ===== Section 5: summer break =====
    B.append(acc("sun","שכר דירה בחופשת הקיץ",
        iconrow("check","הסיוע ימשיך גם בחופשת הקיץ, לסטודנטים העוברים משנה לשנה, כדי לאפשר רצף מגורים באותה הדירה בין שנות הלימוד."),
        callout("blue","המשך מימון שכר הדירה בחופשת הקיץ מותנה בכך שקיימת היתכנות לזכאות לשנת הלימודים הבאה (תלמיד מן המניין, לפחות 3 ימי לימוד בשבוע ו-16 שעות לימוד שבועיות).","info")))

    # ===== Section 6: how to claim =====
    B.append(acc("filet","איך לממש את הזכאות?",
        p("כדי לקבל את הסיוע, יש לשלוח חוזה שכירות עדכני וכן אסמכתא על התשלום הראשון.","lead"),
        callout("blue","עובד השיקום עשוי לבקש מעת לעת אסמכתאות נוספות, כחלק מבדיקות מדגמיות הנערכות מעת לעת.","info"),
        bigbtn("שליחת מסמכים לעו״ס השיקום")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>שכר דירה — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("home",30,"#fff")}</div>
      <div><h1>שכר דירה</h1><p class="sub">סיוע בעלויות דיור במהלך הלימודים</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'04-rent-assistance.html'),'w',encoding='utf-8').write(build())
    print("built 04-rent-assistance.html (bespoke)")
