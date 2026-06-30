#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for ציוד לימודי (06) — faithful to the original equipment-accordion."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "package":'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  "coins":'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  "laptop":'<path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/>',
  "calday":'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "filet":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  "clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "receipt":'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  "ext":'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)
PORTAL="https://ps.btl.gov.il/#/login"
DOCS_URL="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
FORM267="https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/267%20%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%A1%D7%99%D7%95%D7%A2%20%D7%91%D7%9E%D7%A2%D7%A0%D7%A7%20%D7%9C%D7%9E%D7%9B%D7%A9%D7%99%D7%A8%D7%99%D7%9D%20%D7%91%D7%AA%D7%9B%D7%A0%D7%99%D7%AA%20%D7%94%D7%A9%D7%99%D7%A7%D7%95%D7%9D.aspx"

def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'
def pill(t): return f'<span class="pill">{t}</span>'
def acc(icon,title,*parts):
    head=f'<div class="acc-h"><span class="si">{svg(icon,20,"var(--primary-d)")}</span><h3>{E(title)}</h3></div>'
    return '<div class="acc">'+head+''.join(parts)+'</div>'
def summary(t): return (f'<div class="summary"><div class="ico">{svg("zap",20,"hsl(199 89% 40%)")}</div>'
                        f'<div class="sbody"><h2>בקצרה</h2><p>{t}</p></div></div>')
def important(t): return (f'<div class="important"><div class="ico">{svg("alert",19,"hsl(38 92% 42%)")}</div>'
                          f'<div><h3>חשוב לזכור</h3><p>{t}</p></div></div>')
def elig_note():
    txt=('זכאות זו, בדומה ליתר הזכאויות, נקבעת על־ידי עובד השיקום בהתאם לקריטריוני הזכאות המפורטים כאן. '
         'הזכאויות מאושרות עבור כל סמסטר בנפרד, ופירוט הזכאויות שאושרו לך עבור הסמסטר מופיע במכתב '
         +b('"אישור לימודים לסמסטר"')+', הזמין ב'
         f'<a href="{PORTAL}">אזור האישי שלך באתר הביטוח הלאומי</a>.')
    return f'<div class="eligbar"><p>{txt}</p></div>'
def callout(variant, html_text, icon=None):
    ic = icon or ("alert" if variant=="red" else "info")
    return f'<div class="callout {variant}"><span class="cico">{svg(ic,17)}</span><p>{html_text}</p></div>'
def iconrow(icon, html_text): return f'<div class="checkrow">{svg(icon,18)}<p>{html_text}</p></div>'
def numline(n, html_text): return f'<div class="numline"><span class="ncirc">{n}</span><p>{html_text}</p></div>'
def mutedbox(title, body):
    h = f'<div class="subcap">{E(title)}</div>' if title else ''
    return f'<div class="cond">{h}{body}</div>'
def subcap(icon, title): return f'<div class="subcap">{svg(icon,14) if icon else ""}{E(title)}</div>'
def tile(label, val, dim=False):
    cls = "extile dim" if dim else "extile"
    return f'<div class="{cls}"><div class="lbl">{E(label)}</div><div class="val">{E(val)}</div></div>'
def tiles3(*t): return f'<div class="tiles3">{"".join(t)}</div>'
def subbox(n, icon, title, body):
    head = f'<span class="ncirc" style="width:28px;height:28px;font-size:13px">{n}</span>' if n else (svg(icon,17) if icon else "")
    return f'<div class="subbox"><div class="sh">{head}<h5>{E(title)}</h5></div>{body}</div>'
def checkbullets(items):
    return '<ul class="checks">'+''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)+'</ul>'
def doccard(title, items):
    lis=''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)
    foot="קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה."
    return (f'<div class="checklist"><div class="cl-head">{svg("receipt",17)}<span>{E(title)}</span></div>'
            f'<ul>{lis}</ul><div class="cl-warn">{svg("alert",15)}<span>{E(foot)}</span></div></div>')
def linkin(url,text): return f'<a class="linkin" href="{url}">{E(text)}{svg("ext",13)}</a>'
def bigbtn(label,url=DOCS_URL):
    return f'<div class="bigbtn"><a href="{url}">{svg("send",19,"#fff")}<span>{E(label)}</span></a></div>'

def build():
    B=[]
    B.append(summary("סיוע שנתי של "+b("1,068 ₪")+" לרכישת ספרים וציוד לימודי מתכלה המועבר באופן אוטומטי, וכן אפשרות למענק חד־פעמי נוסף לרכישת מחשב, טאבלט או ציוד לימודי מתקדם, עד לסכום של "+b("3,204 ₪")+"."))
    B.append(elig_note())

    # ===== Section 1: annual grant =====
    B.append(acc("coins","מענק שנתי לציוד לימודי",
        iconrow("check","משתקם הלומד בתוכנית הכשרה זכאי למענק שנתי עבור מימון רכישת ציוד לימודי מתכלה."),
        mutedbox("גובה המענק", p("עד "+pill("1,068 ₪")+" לשנת לימודים (נכון לנובמבר 2025).")),
        subcap("calday","מועדי התשלום")
        + tiles3(tile("סמסטר א׳","534 ₪"), tile("סמסטר ב׳","534 ₪"), tile("סמסטר קיץ","אין זכאות נוספת",dim=True)),
        callout("blue","המענק משולם "+b("אוטומטית")+" לחשבון הבנק בתחילת כל סמסטר, ללא צורך בהגשת קבלות.","info")))

    # ===== Section 2: additional equipment =====
    B.append(acc("laptop","סיוע בציוד לימודי נוסף",
        p("במקרים בהם יש צורך מובהק בציוד לימודי נוסף שעלותו גבוהה מסכום המענק השנתי, ניתן לקבל סיוע נוסף.","lead"),
        subbox("1",None,"מחשב נייד / טאבלט",
            p("בתוכניות להשכלה גבוהה, מחשב או טאבלט נחשבים ציוד לימודי נדרש. ניתן לקבל סכום נוסף כהחזר חד-פעמי עבור רכישתם.")
            + callout("red",b("שימו לב: ")+"זהו סיוע "+b("חד-פעמי")+" לכל תקופת הלימודים.","alert")),
        subbox("2",None,"מכשירים / חומרים מרובים",
            p("ניתן להשתמש בסיוע לרכישת ציוד אחר, בתנאי שמתקיימים שלושת התנאים הבאים:")
            + checkbullets(["הציוד נדרש כחלק מדרישות הלימוד בתוכנית (לדוגמה: חומרים לבניית מודלים באדריכלות).",
                            "הציוד אינו מסופק ע\"י מוסד הלימודים במסגרת השירותים הרגילים לסטודנט.",
                            "לא קיימת אפשרות השאלה של הציוד ממסגרת הלימודים."])
            + callout("blue","מומלץ להתייעץ עם עובד השיקום לפני רכישת ציוד שאינו מחשב/טאבלט כדי לוודא זכאות.","info"))))

    # ===== Section 3: additional grant amount =====
    B.append(acc("coins","גובה הסיוע לציוד נוסף",
        iconrow("check","גובה הסיוע בציוד לימודי נוסף הוא עד פי 3 מהמענק השנתי, כלומר עד "+pill("3,204 ₪")+" (נכון לנובמבר 2025)."),
        mutedbox("", p("בשנה שבה נרכש ציוד נוסף, סכום ההחזר המרבי כולל המענק השנתי הקבוע יכול להגיע עד "+b("4,272 ₪")+" (1,068 ₪ + 3,204 ₪)."))))

    # ===== Section 4: request & receipt =====
    B.append(acc("filet","הגשת בקשה וקבלה להחזר",
        callout("blue","בניגוד למענק השנתי, הסיוע לציוד לימודי נוסף יועבר רק לאחר הגשת בקשה על גבי "+b("טופס בקשה לסיוע במענק למכשירים (טופס ב.ל. 267)")+".","info"),
        subcap(None,"התהליך"),
        numline("1","הגש "+linkin(FORM267,"טופס בקשה לסיוע במכשירים")+" (ב.ל. 267)."),
        numline("2","לאחר אישור הבקשה, רכוש את הציוד."),
        numline("3","הגש קבלה להחזר כספי."),
        doccard("מה חייב להופיע על הקבלה",
                ["שם מלא של הסטודנט","מספר תעודת זהות","תאריך הנפקה","מספר קבלה / חשבונית","פירוט מלא וברור של המוצר שנרכש"]),
        bigbtn("שליחת מסמכים לעו״ס השיקום")))

    # ===== Section 5: reimbursement timeline =====
    B.append(acc("clock","מתי אקבל את ההחזר?",
        iconrow("check","לרוב, ההחזר משולם לחשבונך תוך כ"+pill("עשרה ימי עבודה")+" לאחר הגשת הקבלה."),
        callout("blue","ייתכנו עיכובים בזמני עומס חריג או בתקופת חגים וחופשות.","info")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>ציוד לימודי — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("package",30,"#fff")}</div>
      <div><h1>ציוד לימודי</h1><p class="sub">מענק שנתי לספרים וציוד, וסיוע לרכישת מחשב או ציוד מתקדם</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'06-study-equipment.html'),'w',encoding='utf-8').write(build())
    print("built 06-study-equipment.html (bespoke)")
