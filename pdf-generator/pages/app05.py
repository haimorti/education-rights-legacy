#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for החזר הוצאות נסיעה (05) — faithful to the original transport-accordion."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "bus":'<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  "train":'<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>',
  "car":'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.6 3.2C1.4 11.5 1 12.2 1 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)
PORTAL="https://ps.btl.gov.il/#/login"

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
def contactbox(icon, html_text): return f'<div class="numline">{svg(icon,18,"var(--primary-d)")}<p>{html_text}</p></div>'

def build():
    B=[]
    B.append(summary("ניתן לקבל השתתפות אוטומטית בהוצאות נסיעה למקום הלימודים לפי תעריפי תחבורה ציבורית. מי שמוכר עם מוגבלות בניידות עשוי להיות זכאי לסיוע בהחזר הוצאות נסיעה או בהסעה מיוחדת."))
    B.append(elig_note())

    # ===== Section 1: public transport =====
    B.append(acc("train","החזר הוצאות נסיעה בתחבורה ציבורית",
        iconrow("check","במהלך תקופת הלימודים, תשולם השתתפות בהוצאות נסיעה ממקום המגורים הקבוע למקום הלימודים על פי תעריף תחבורה ציבורית."),
        iconrow("check","ההחזר ישולם לפי האפשרות הזולה יותר: עלות חופשי-חודשי או על פי עלות ההוצאה בפועל, בהתאם למספר ימי הלימוד בחודש ולמערכת השעות שלך."),
        callout("blue","ההחזר ישולם אוטומטית לחשבונך ללא צורך להציג אישור על הוצאות הנסיעה.","info")))

    # ===== Section 2: special transport =====
    B.append(acc("car","סיוע לסטודנטים שאינם יכולים להשתמש בתחבורה ציבורית",
        p("אם אחד מהתנאים הבאים מתקיים לגביך, אתה עשוי להיות זכאי לסיוע בהחזר הוצאות נסיעה ברכב פרטי או במימון הסעה מיוחדת:","lead"),
        numline("1","ועדה של משרד הבריאות קבעה לך אחוזי מוגבלות בניידות, המקנים זכאות לסיוע ברכישת רכב."),
        numline("2","לא נקבעו לך אחוזי מוגבלות בניידות, אך בשל מגבלה רפואית ייתכן שאינך יכול לעשות שימוש בתחבורה ציבורית, בכפוף לבדיקה ולקביעת רופא המוסד לביטוח לאומי."),
        contactbox("userc","לצורך בירור הזכאות ומימושה, יש לפנות "+b("לעובד השיקום")+".")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>החזר הוצאות נסיעה — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("bus",30,"#fff")}</div>
      <div><h1>החזר הוצאות נסיעה</h1><p class="sub">סיוע בעלויות הנסיעה למקום הלימודים</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'05-travel-expenses.html'),'w',encoding='utf-8').write(build())
    print("built 05-travel-expenses.html (bespoke)")
