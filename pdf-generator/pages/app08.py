#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for הנגשות (08) — faithful to the original accessibility-accordion."""
import os, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "accessibility":'<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  "heart":'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>',
  "laptop":'<path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/>',
  "bookcheck":'<path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/>',
  "brain":'<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>',
  "headph":'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  "filet":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  "lang":'<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  "bookopen":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "coins":'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
}
def svg(n,s,stroke="currentColor"): return f'<svg class="icon" width="{s}" height="{s}" viewBox="0 0 24 24" stroke="{stroke}">{IC[n]}</svg>'
def E(t): return html.escape(t, quote=False)
PORTAL="https://ps.btl.gov.il/#/login"
DOCS_URL="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"

def p(t,cls="par"): return f'<p class="{cls}">{t}</p>'
def b(t): return f'<strong>{t}</strong>'
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
def subcap(title): return f'<div class="subcap">{E(title)}</div>'
def checkbullets(items):
    return '<ul class="checks">'+''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)+'</ul>'
def minicard(title, desc): return f'<div class="minicard"><h5>{E(title)}</h5><p>{desc}</p></div>'
def twoup(*cards): return f'<div class="twoup">{"".join(cards)}</div>'
def checktiles(items):
    return '<div class="checktiles">'+''.join(f'<div class="ct">{svg("check",15)}<span>{E(x)}</span></div>' for x in items)+'</div>'
def softbox(icon, html_text): return f'<div class="softbox">{svg(icon,18)}<p>{html_text}</p></div>'
def ctabox(html_text): return f'<div class="softbox"><p>{html_text}</p></div>'
def svcbox(icon, title, body_html, who):
    return (f'<div class="subbox"><div class="sh">{svg(icon,16)}<h5>{E(title)}</h5></div>'
            f'{body_html}<p class="who">{E(who)}</p></div>')
def bigbtn(label,url=DOCS_URL):
    return f'<div class="bigbtn"><a href="{url}">{svg("send",19,"#fff")}<span>{E(label)}</span></a></div>'

def build():
    B=[]
    B.append(summary("במסגרת השיקום המקצועי, ניתן לקבל מגוון שירותי תמיכה והנגשה שמטרתם לאפשר השתתפות מלאה בלימודים והשלמתם בהצלחה. היקף וסוג ההנגשות נקבעים בהתאם לצרכים האישיים, לאופי הלימודים ולהחלטת עובד השיקום."))
    B.append(elig_note())

    # ===== Section 1: personal companion =====
    B.append(acc("userc","מלווה אישי",
        p("המלווה נועד לסייע לסטודנט בתפקוד היומיומי במהלך הלימודים, לרבות בפעולות כגון ניידות, אכילה, שימוש בשירותים, ניקיון אישי או כל סיוע אחר הנדרש כדי לאפשר השתתפות מלאה בלימודים.","lead"),
        subcap("תנאי זכאות"),
        checkbullets(["נכים קשים עם לפחות 65% נכות רפואית",
                      "זכאות לקצבת שירותים מיוחדים (שר\"מ) בשיעור של 112% ומעלה",
                      "מבוטח המעסיק עובד זר – רק אם קיימות נסיבות מיוחדות שבהן העובד הזר אינו יכול לשמש מלווה בשעות הלימודים",
                      "חוות דעת רפואית המעידה על הצורך בליווי אישי במהלך הלימודים"]),
        callout("red",b("שים לב")+" – אלו תנאים מצטברים, נדרשים כולם יחד.","alert"),
        subcap("היקף וגובה הסיוע"),
        iconrow("info","היקף שעות הליווי נקבע בהתאם לשעות הלימוד בפועל, ויכול לכלול גם ליווי בזמן הנסיעה למוסד הלימודים וממנו."),
        iconrow("coins","התעריף לחישוב הסיוע נקבע לפי שכר מינימום לשעה."),
        subcap("אופן התשלום"),
        iconrow("check","סכום הסיוע מועבר ישירות לחשבונך."),
        iconrow("info","נפגע עבודה הזכאי לקצבה מיוחדת – הסיוע יינתן באמצעות הגדלת הקצבה המיוחדת לתקופת השיקום.")))

    # ===== Section 2: mentoring =====
    B.append(acc("heart","חונכות",
        p("שירות זה נועד להעניק מעטפת תמיכה אישית המגשרת בין הסטודנט לבין הדרישות האקדמיות והמנהליות של המוסד, תוך חיזוק המיומנויות הנדרשות להצלחה בתהליך השיקום.","lead"),
        subcap("מה כולל הסיוע?"),
        twoup(
            minicard("תיווך מול המוסד","תיאום הצרכים הייחודיים של הסטודנט מול גורמים רלוונטיים (מזכירויות, מרכזי תמיכה, מרצים)."),
            minicard("פתרון בעיות בזמן אמת","מענה מהיר לקשיים תפקודיים או מנהליים במהלך הלימודים."),
            minicard("ניהול מטלות אקדמיות","סיוע בהתארגנות מול דרישות הלימודים ועמידה בלוחות זמנים."),
            minicard("חיזוק מיומנויות אישיות","הקניית כלים תפקודיים ללימודים ולהשתלבות עתידית בעולם העבודה.")),
        softbox("info",b("מי עשוי להיות זכאי?")+" כלל מקבלי השירות בתכניות הכשרה והשכלה גבוהה.")))

    # ===== Section 3: tech equipment =====
    B.append(acc("laptop","מכשירים ואמצעים טכנולוגיים",
        p("סיוע זה נועד לאפשר למקבל השירות השתתפות מיטבית בלימודים, באמצעות רכישת מכשירים ואמצעים טכנולוגיים הנחוצים לצורך הלמידה.","lead"),
        subcap("דוגמאות לציוד שעשוי להיות מאושר"),
        checktiles(["ציוד טכנולוגי מותאם ללקויי ראייה או לעיוורון",
                    "מכשירי FM ואמצעי שמיעה מסייעים",
                    "מחשבים וציוד היקפי בתצורה מותאמת אישית",
                    "מסך מגע או מסך מתקפל",
                    "עכבר ומקלדת ארגונומיים",
                    "מכשירי הקלטה וציוד לימודי ייעודי נוסף"])))

    # ===== Section 4: learning material accessibility =====
    B.append(acc("bookcheck","הנגשת חומרי לימוד והרצאות",
        p("שירותים אלה נועדים לאפשר השתתפות מלאה ונגישה בלימודים, באמצעות התאמה של מידע לימודי כתוב או מדובר לצרכים הנובעים מנכות או ממגבלה תפקודית.","lead"),
        svcbox("headph","שירותי קריאה",
               p("הקראת חומרי לימוד כתובים לסטודנטים המתקשים מאוד בקריאה או שאינם יכולים לקרוא כלל."),
               "מי עשוי להיות זכאי: סטודנטים עם לקות ראייה או לקות למידה מאובחנת."),
        svcbox("filet","תמלול ושקלוט",
               p(b("תמלול: ")+"תמלול סימולטני של הרצאות.")+p(b("שקלוט: ")+"המרת שיעורים מוקלטים לטקסט מודפס."),
               "מי עשוי להיות זכאי: סטודנטים עם לקויות שמיעה או לקות למידה חמורה מאובחנת."),
        svcbox("lang","תרגום לשפת הסימנים",
               p("תרגום סימולטני לשפת הסימנים."),
               "מי עשוי להיות זכאי: סטודנטים עם לקויות שמיעה."),
        svcbox("bookopen","הנגשת חומרי לימוד כתובים",
               p(b("הקלטה: ")+"המרת חומר כתוב לקובצי שמע.")+p(b("ברייל: ")+"הדפסת חומרי לימוד בכתב ברייל.")+p(b("הגדלה: ")+"התאמת חומרי לימוד לדפוס מוגדל."),
               "מי עשוי להיות זכאי: סטודנטים עם לקויות ראייה.")))

    # ===== Section 5: learning strategies =====
    B.append(acc("brain","אסטרטגיות למידה",
        p("סיוע פרטני או קבוצתי בהקניית מיומנויות למידה, ארגון זמן וניהול מטלות.","lead"),
        softbox("info",b("מי עשוי להיות זכאי?")+" כלל מקבלי השירות בתכניות הכשרה והשכלה גבוהה.")))

    # ===== Section 6: how to claim =====
    B.append(acc("check","איך מממשים את הזכאות?",
        p("היקף וסוג ההנגשות נקבעים בהתאם לנהלים קבועים, לצרכים האישיים, לאופי הלימודים ולהחלטת עובד השיקום.","lead"),
        ctabox("לצורך בדיקת הזכאות ומימוש שירותי התמיכה וההנגשה, יש לפנות "+b("לעובד השיקום")+"."),
        bigbtn("שליחת מסמכים לעו״ס השיקום")))

    B.append(important("בסיום כל סמסטר עליך להגיש "+b("גיליון ציונים")+" ו"+b("מערכת שעות מעודכנת")+" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."))

    body='\n'.join(B)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>הנגשות — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("accessibility",30,"#fff")}</div>
      <div><h1>הנגשות</h1><p class="sub">סיוע בהנגשת הלימודים והסביבה</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'08-accessibility.html'),'w',encoding='utf-8').write(build())
    print("built 08-accessibility.html (bespoke)")
