#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for שיעורי עזר (07) — faithful to the original tutoring-accordion."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "bookopen":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "users":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "clip":'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  "building":'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  "card":'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
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
FORM_TUT="https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/divuhajMatanShiuureEzer.aspx"

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
def subcap(title): return f'<div class="subcap">{E(title)}</div>'
def minicard(title, desc): return f'<div class="minicard"><h5>{E(title)}</h5><p>{desc}</p></div>'
def twoup(*cards): return f'<div class="twoup">{"".join(cards)}</div>'
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
    B.append(summary("שיעורי עזר ניתנים למי שזקוק לתמיכה בלימודים ולהשלמת פערים, בהיקף של עד "+b("25% משעות הלימוד החודשיות")+", וניתנים דרך זכיין או מרכז התמיכה במוסד הלימודים."))
    B.append(elig_note())

    # ===== Section 1: eligibility =====
    B.append(acc("users","זכאות לשיעורי עזר",
        iconrow("check","שיעורי עזר נועדו לסייע בהשלמת פערים לימודיים ובחיזוק השליטה בחומר הנלמד."),
        iconrow("check","היקף הזכאות לסיוע עומד על עד "+pill("25% משעות הלימוד החודשיות")+", כפי שמופיעות במערכת השעות."),
        mutedbox("", p(b("לדוגמה: ")+"אם אתה לומד 100 שעות בחודש – תהיה זכאי ל-25 שעות שיעורי עזר.")),
        callout("red",b("שים לב: ")+"כדי לממש את הזכאות עליך לפנות לעובד השיקום ולעדכן שיש לך צורך בשיעורי עזר. בניגוד לזכאויות אחרות, שיעורי עזר "+b("לא יופיעו מראש")+" במכתב \"אישור לימודים לסמסטר\", ויאושרו רק לאחר פנייה לעובד השיקום.","alert")))

    # ===== Section 2: two tracks =====
    B.append(acc("clip","שני מסלולים למימוש הזכאות",
        p("לאחר אישור מכסת השעות על ידי עובד השיקום, ניתן לממש את הזכאות באחד משני מסלולים:","lead"),
        twoup(
            minicard("דרך זכיין חיצוני","במסלול זה, זכיין של הביטוח הלאומי יאתר עבורך מורים בהתאם לקורסים שבהם נדרשות התמיכות, התשלום לזכיין יועבר ישירות מהביטוח הלאומי."),
            minicard("דרך מרכז התמיכה במוסד הלימודים","במסלול זה, מרכז התמיכה במוסד הלימודים יאתר עבורך מורים בהתאם לקורסים שבהם נדרשות התמיכות. התשלום מבוצע על-ידך, ולאחר הצגת קבלות תקבל החזר מהביטוח הלאומי."))))

    # ===== Section 3: franchisee track =====
    B.append(acc("clip","מסלול שירות דרך זכיין",
        subcap("התהליך"),
        numline("1","פנה לעובד השיקום ועדכן על הצורך שלך בשיעורי עזר."),
        numline("2","עובד השיקום מעביר לזכיין התחייבות לתשלום."),
        numline("3","הזכיין יוצר איתך קשר ומתאם את המורים והשיעורים."),
        callout("blue",b("שיטת תשלום: ")+"הביטוח הלאומי משלם ישירות לזכיין – אין צורך בתשלום מצדך.","card")))

    # ===== Section 4: learning-center track =====
    B.append(acc("building","מסלול שירות דרך מרכז התמיכה במוסד הלימודים",
        subcap("התהליך"),
        numline("1","עובד השיקום מאשר את היקף השעות."),
        numline("2","אתה יוצר קשר עם מרכז הלמידה במוסד, מקבל מהם את השירות ומשלם להם ישירות."),
        numline("3","אחת לחודש אתה מגיש קבלה וכן "+linkin(FORM_TUT,"טופס דיווח שיעורי עזר")+", הכולל חתימת מרכז התמיכה וחתימתך."),
        numline("4","ההחזר משולם לחשבונך."),
        doccard("מה חייב להופיע על הקבלה עבור שיעורי העזר",
                ["שם מלא של הסטודנט","מספר תעודת זהות","תאריך הנפקה","מספר קבלה / חשבונית","פירוט השירות – שיעורי עזר"]),
        callout("red",b("שים לב: ")+"גובה ההחזר לשעה נקבע לפי ההשכלה האקדמית של המורה. לכן, כאשר שיעורי העזר ניתנים דרך מרכז הלמידה, יש להעביר לעו\"ס השיקום את "+b("אישור ההשכלה של המורה")+" לצורך קביעת תעריף ההחזר.","alert"),
        bigbtn("שליחת מסמכים לעו״ס השיקום")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>שיעורי עזר — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("bookopen",30,"#fff")}</div>
      <div><h1>שיעורי עזר</h1><p class="sub">תמיכה בלימודים והשלמת פערים</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'07-tutoring.html'),'w',encoding='utf-8').write(build())
    print("built 07-tutoring.html (bespoke)")
