#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for דמי שיקום (02) — faithful to the original site's rehab-accordion."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__))          # .../pdf-generator/pages
ROOT = os.path.dirname(HERE)                               # .../pdf-generator
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "wallet":'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "shield":'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
  "clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "calc":'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  "cap":'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/><path d="M22 10v6"/>',
  "bank":'<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  "calcheck":'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  "users":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "ext":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)

PORTAL="https://ps.btl.gov.il/#/login"

def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'
def pill(t): return f'<span class="pill">{t}</span>'

def sechead(icon,title):
    return f'<div class="sechead"><span class="si">{svg(icon,20,"var(--primary-d)")}</span><h3>{E(title)}</h3></div>'

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

def twoup(items):
    out=''
    for ic,title,desc in items:
        mh = f'<div class="mh">{svg(ic,17)}<h5>{E(title)}</h5></div>' if ic else f'<h5>{E(title)}</h5>'
        out+=f'<div class="minicard">{mh}<p>{desc}</p></div>'
    return f'<div class="twoup">{out}</div>'

def tier(variant, html_text):
    return f'<div class="tier {variant}"><span class="tdot"></span><span>{html_text}</span></div>'

def scenario(variant,label,desc):
    return f'<div class="scenario {variant}"><div class="slabel">{E(label)}</div><p>{desc}</p></div>'

def innerbox(title, inner):
    h=f'<h5>{title}</h5>' if title else ''
    return f'<div class="innerbox">{h}{inner}</div>'

def linkout(url,text):
    return f'<a class="linkout" href="{url}">{svg("ext",14)}<span>{E(text)}</span></a>'

def checkbullets(items):
    lis=''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)
    return f'<ul class="checks">{lis}</ul>'

def dlabel(text):
    return f'<div class="dlabel">{svg("users",17,"#fff")}{E(text)}</div>'

def card(inner): return f'<div class="card sec">{inner}</div>'

URL_100="https://www.btl.gov.il/benefits/Disability/Pages/100per.aspx"
URL_RATES="https://www.btl.gov.il/benefits/Disability/Pages/%D7%A9%D7%99%D7%A2%D7%95%D7%A8%D7%99%20%D7%94%D7%A7%D7%A6%D7%91%D7%94.aspx"

def build():
    B=[]
    B.append(summary("דמי שיקום משולמים למשתקם בתקופת לימודיו לצורך מחיה חודשית וכדי שתהיה פנוי ללימודיך."))
    B.append(elig_note())

    # ===== Section 1: eligibility (white accordion card) =====
    B.append(acc("shield","תנאי הזכאות לדמי שיקום",
        p("קבלת דמי השיקום מותנית בעמידה בשלושה תנאים עיקריים שנקבעו באגף השיקום.","lead"),
        cond("1","שיעור הקצבה לה הנך זכאי",
            p("דמי השיקום משלימים ל-100% את הקצבה המשולמת לך.")
            + callout("amber","אתה זכאי לקצבת נכות מלאה ולכן לא ישולמו לך דמי שיקום.","info")),
        cond("2","עומס לימודי",
            p("דמי השיקום נועדו לתמוך כלכלית במי שלומד בהיקף שעות שפוגע ביכולתו להשתכר. לכן תנאי סף לקבלת הזכאות הוא לימודים בהיקף של לפחות "+pill("16 שעות שבועיות")+".")
            + p("ההיקף הזה יכול להיקבע באחת משתי הדרכים:","lead")
            + twoup([(None,"שעות לימוד בפועל","מערכת שעות הכוללת לפחות 16 שעות לימוד בפועל בשבוע."),
                     (None,"שילוב שעות מעטפת","מערכת לימודים הכוללת לפחות 12 שעות שבועיות, ובנוסף שעות מעטפת (כגון שיעורי עזר) המשלימות יחד ל-16 שעות שבועיות.")])
            + callout("amber",b("שים לב: ")+"במקרה שבו הגעה ל-16 שעות מתבססת על שעות מעטפת, יהיה עליך להגיש הצהרה מפורטת וחתומה על שעות אלה.","alert")),
        cond("3","הכנסות",
            p("בבדיקת הזכאות לתשלום דמי שיקום נלקחות בחשבון קצבאות מחליפות שכר (אבטלה, מילואים, דמי לידה) והכנסות שלא מעבודה."))))

    # ===== Section 2: hours calculation (white accordion card) =====
    B.append(acc("clock","איך מחושב היקף שעות הלימוד שלך?",
        p("במסלולי לימודים אקדמיים, היקף שעות הלימוד שלך מחושב לפי "+b("הערך הגבוה")+" מבין השניים:","lead"),
        twoup([("calc","סך השעות השבועיות","סך השעות השבועיות המופיעות במערכת השעות שלך."),
               ("cap","סך נקודות הזכות","סך נקודות הזכות של הקורסים הרשומים במערכת.")]),
        f'<div class="cond"><div class="cond-h"><span class="sec-ico">{svg("info",17)}</span><h4>אוניברסיטה פתוחה</h4></div>'
        + p("אם אתה לומד באוניברסיטה הפתוחה, החישוב נעשה לפי סך נקודות הזכות הרשומות לסמסטר. לכן עליך להציג מסמך רשמי מהאוניברסיטה הכולל:")
        + checkbullets(["רשימת הקורסים שאליהם נרשמת באותו סמסטר","סך נקודות הזכות של הקורסים"]) + '</div>'))

    # ===== Section 3: amount calculation (white accordion card) =====
    B.append(acc("calc","חישוב גובה דמי השיקום",
        p("חישוב גובה דמי השיקום שונה בין נכה כללי לנפגע עבודה:","lead"),
        # --- נכה כללי ---
        dlabel("נכה כללי"),
        p("גובה דמי השיקום נקבע לפי שלושה פרמטרים מרכזיים:"),
        cond("1","דרגת אובדן הכושר שנקבעה לך",
            p("דמי השיקום נועדו להשלים את הכנסתך כך שתגיע לגובה קצבת נכות מלאה.")
            + scenario("muted","איבדת 100% מכושרך","אתה זכאי לקצבת נכות מלאה ולכן לא ישולמו לך דמי שיקום.")
            + scenario("blue","לא איבדת כלל מכושרך להשתכר","אינך זכאי לקצבת נכות, לכן ישולמו לך דמי שיקום בגובה קצבת נכות מלאה בכפוף למבחן הכנסות.")
            + scenario("amber","איבדת את כושרך להשתכר באופן חלקי","אתה זכאי לקצבת נכות חלקית; דמי השיקום ישלימו את ההפרש עד לגובה קצבת נכות מלאה בכפוף למבחן הכנסות.")),
        cond("2","הכנסותיך",
            p("השפעת ההכנסות על גובה דמי השיקום משתנה בהתאם לסטטוס הזכאות.")
            + innerbox("א. אם אינך זכאי לקצבת נכות כללית",
                p("הסכומים נכונים ל-12/2025:")
                + tier("p","והכנסתך נמוכה מ-"+b("6,689 ₪")+" – תהיה זכאי לדמי שיקום בגובה קצבת נכות מלאה")
                + tier("a","והכנסתך בין "+b("6,689 ₪")+" ל-"+b("7,790 ₪")+" – דמי השיקום יופחתו בהדרגה בהתאם לגובה ההכנסה")
                + tier("d","והכנסתך גבוהה מ-"+b("7,790 ₪")+" – לא תהיה זכאי לדמי שיקום"))
            + innerbox("ב. אם אתה זכאי לקצבת נכות חלקית",
                p("ההפחתה מדמי השיקום עקב הכנסותיך תיעשה לפי טבלה ייעודית.")+linkout(URL_100,"צפה בטבלת ההפחתות"))),
        cond("3","מצבך המשפחתי",
            p("גובה קצבת נכות מלאה משתנה לפי מצבך המשפחתי.")
            + innerbox("", p("עבור רווק ללא ילדים, גובה הקצבה המלאה (נכון לינואר 2026) הוא <span class=\"bignum\">4,711 ₪</span>")
                           + linkout(URL_RATES,"בדוק את הסכום המתאים למצבך המשפחתי"))),
        # --- נפגע עבודה ---
        dlabel("נפגע עבודה"),
        f'<div class="scenario blue"><div class="slabel">הכלל המנחה: השלמה ל-100% נכות</div>'
        + p("דמי השיקום הם ההפרש בין הקצבה שאתה מקבל כיום לבין הקצבה שהיית מקבל אילו נקבעו לך 100% נכות. כיוון שקצבת נכות מעבודה מחושבת לפי השכר האישי שלך לפני הפגיעה, גובה דמי השיקום משתנה מאדם לאדם.")
        + '</div>',
        p(b("הכנסה מעבודה והשפעתה על דמי השיקום"),"lead"),
        p("מדמי השיקום שאתה מקבל כנפגע עבודה מנכים את כל ההכנסות שלך מעבודה ומקצבאות מחליפות שכר (כגון אבטלה, מילואים או לידה)."),
        callout("blue",b("העיקרון: ")+"דמי השיקום נועדו להשלים את הכנסתך עד לרמת קצבה של 100% ולא מעבר לכך. לכן, אם כבר הגעת לסכום הזה באמצעות עבודה או קצבאות אחרות – דמי השיקום יופחתו בהתאם.","info")))

    # ===== Section 4: payment schedule (white accordion card) =====
    B.append(acc("wallet","מתי משולמים דמי השיקום?",
        p("אם אתה עומד בתנאי הזכאות לדמי שיקום, עובד השיקום יוודא שהתשלום יועבר אליך באופן אוטומטי.","lead"),
        f'<div class="cond"><div class="cond-h"><span class="sec-ico">{svg("calcheck",18)}</span><h4>אחת לחודש</h4></div>'
        + p("על פי רוב עד לעשירי לחודש, עבור החודש הקודם.")+'</div>',
        callout("blue","לעיתים תשלום דמי השיקום מתעכב בשל עדכון גובה הכנסותיך מעבודה.","info"),
        callout("red",b("שים לב: ")+"הזכאות לדמי שיקום ניתנת רק בתקופות לימודים פעילות. לכן אין זכאות לתשלום דמי שיקום בחופשת הקיץ.","alert")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>דמי שיקום — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("wallet",30,"#fff")}</div>
      <div><h1>דמי שיקום</h1><p class="sub">גמלה חודשית לתקופת הלימודים</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'02-rehabilitation-allowance.html'),'w',encoding='utf-8').write(build())
    print("built 02-rehabilitation-allowance.html (bespoke)")
