#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bespoke builder for the Application (01) page — faithful to the original site."""
import os, html

HERE = os.path.dirname(os.path.abspath(__file__))          # .../pdf-generator/pages
ROOT = os.path.dirname(HERE)                               # .../pdf-generator
HTMLDIR = os.path.join(ROOT, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(ROOT, "fonts", "fonts.local.css")
CSS = open(os.path.join(ROOT, "base.css"), encoding="utf-8").read()

IC = {
  "clip":'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  "users":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "help":'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  "foot":'<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>',
  "search":'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "calendar":'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "mail":'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  "shield":'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "file":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M8 13h8M8 17h5"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  "chevL":'<path d="m15 18-6-6 6-6"/>',
  "chevD":'<path d="m6 9 6 6 6-6"/>',
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

# ---------- component helpers ----------
def sec(icon, title, inner, frame="gray", amberico=False):
    cls = "card sec " + frame
    return f'<div class="{cls}"><h3 class="sec-h"><span class="sec-ico">{svg(icon,18)}</span>{E(title)}</h3>{inner}</div>'

def phase(variant, marker, title, subtitle):
    if marker=="chevL": mk=svg("chevL",24,"#fff")
    elif marker=="chevD": mk=svg("chevD",24,"#fff")
    else: mk=marker
    return (f'<div class="phase {variant}"><div class="line"><span class="hr"></span>'
            f'<span class="circ">{mk}</span><span class="hr"></span></div>'
            f'<div class="ttl">{E(title)}</div><div class="st">{E(subtitle)}</div></div>')

def p(t): return f'<p class="par">{t}</p>'
def sub(t): return f'<h4 class="sub">{E(t)}</h4>'
def sub2(t): return f'<h4 class="sub2">{E(t)}</h4>'

def numgrid(cards):
    out=''.join(f'<div class="numcard"><div class="nc">{n}</div><h4>{E(t)}</h4><p>{d}</p></div>' for n,t,d in cards)
    return f'<div class="numgrid">{out}</div>'

def stack(cards):
    out=''.join(f'<div class="numcard"><div class="nc">{n}</div><div class="ncbody"><h4>{E(t)}</h4><p>{d}</p></div></div>' for n,t,d in cards)
    return f'<div class="stack">{out}</div>'

def doccard(title, items, footer):
    lis=''.join(f'<li>{svg("check",16)}<span>{E(x)}</span></li>' for x in items)
    return (f'<div class="checklist"><div class="cl-head">{svg("file",17)}<span>{E(title)}</span></div>'
            f'<ul>{lis}</ul><div class="cl-warn">{svg("alert",15)}<span>{E(footer)}</span></div></div>')

def bullets(items):
    return '<ul class="blist">'+''.join(f'<li><span class="bdot"></span><span>{x}</span></li>' for x in items)+'</ul>'

def planbox(kind, title, intro, items, note):
    body = p(E(intro))
    if items: body += bullets([E(i) for i in items])
    body += f'<div class="inner">{note}</div>'
    return f'<div class="planbox {kind}"><div class="ph"><span class="pd"></span>{E(title)}</div>{body}</div>'

def note(t, warn=False):
    cls="note warn" if warn else "note"
    ic="alert" if warn else "info"
    return f'<div class="{cls}"><span class="nico">{svg(ic,16)}</span><div class="ntxt"><p>{t}</p></div></div>'

def resultbox(kind, title, paras, nextline=None):
    ic = "check" if kind=="ok" else "info"
    body=''.join(f'<p>{x}</p>' for x in paras)
    nl = f'<div class="nextline">{nextline}</div>' if nextline else ''
    return f'<div class="resultbox {kind}"><h4>{svg(ic,18)}{E(title)}</h4>{body}{nl}</div>'

def redbox(title, text):
    return (f'<div class="redbox"><span class="rico">{svg("alert",18)}</span>'
            f'<div><h4>{E(title)}</h4><p>{text}</p></div></div>')

def part(cls, items):
    return f'<div class="part {cls}">' + '\n'.join(items) + '</div>'

DOCS_URL="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
PORTAL_URL="https://ps.btl.gov.il/#/login"
def bigbtn(label, url=DOCS_URL):
    return (f'<div class="bigbtn"><a href="{url}">{svg("send",19,"#fff")}'
            f'<span>{E(label)}</span></a></div>')
def card(frame, inner):
    return f'<div class="card sec {frame}">{inner}</div>'

def b(t): return f'<strong>{E(t)}</strong>'

# ---------- benefit chips ----------
BCHIPS=[("דמי שיקום","wallet","38 92% 50%"),("שכר לימוד","cap","199 89% 48%"),
 ("שכר דירה","home","160 84% 39%"),("הוצאות נסיעה","bus","201 90% 48%"),
 ("ציוד לימודי","package","262 83% 58%"),("שיעורי עזר","book","347 77% 50%"),
 ("הנגשות","access","173 80% 36%")]
def bchips():
    out=''
    for t,ic,hsl in BCHIPS:
        out+=(f'<div class="bchip"><span class="ci" style="background:hsl({hsl} / .12);color:hsl({hsl})">{svg(ic,18)}</span>'
              f'<span class="t">{E(t)}</span><span class="bar"></span></div>')
    return f'<div class="bchips">{out}</div>'

# ============================================================
def build():
    P_intro=[]; P_step1=[]; P_dec=[]; P_step2=[]; P_ful=[]

    # ---- PHASE GROUP: pre (gray) ----
    # 1. building plan
    inner = (p("לאחר שנמצאת זכאי לשיקום מקצועי, הגיע הזמן לגבש את תוכנית השיקום האישית שלך. תוכנית השיקום יכולה לכלול מגוון מסלולים – סיוע בהשמה, אבחון והכוונה תעסוקתית, סדנאות, הכשרות מקצועיות ועוד.")
           + p("אם קיבלת מסמך זה, ייתכן שאתה מעוניין בלימודי השכלה גבוהה ומבקש שאלה יוכרו כתוכנית השיקום שלך.")
           + sub("למה חשוב שהלימודים יאושרו כתוכנית השיקום?")
           + p("האישור עשוי להקנות זכאות לתמיכות שונות במהלך תקופת הלימודים, בהתאם לקריטריונים שנקבעו לכל תמיכה:")
           + bchips())
    P_intro.append(sec("clip","בניית תוכנית השיקום האישית שלך", inner, "gray"))

    # 2. who can apply
    inner = (p("תוכל להגיש בקשה אם מתקיימים שני התנאים הבאים:")
           + numgrid([
               ("1","אושרה לך זכאות לשיקום מקצועי","הגשת תביעה לשיקום מקצועי וזכאותך אושרה ע\"י עו\"ס שיקום."),
               ("2","התקבלת ללימודים אקדמיים","התקבלת ללימודי השכלה גבוהה, או שאתה כבר לומד בפועל, ואתה מבקש שהלימודים יוכרו כחלק מתוכנית השיקום."),
           ]))
    P_intro.append(sec("users","מי יכול להגיש בקשה לאישור לימודיו?", inner, "gray"))

    # 3. still deciding
    inner = (p("אם טרם החלטת מה ללמוד, יש כמה צעדים שיכולים לעזור לך לבחור מסלול מתאים.")
           + stack([
               ("1","התייעצות עם עו\"ס השיקום","אם אתה שוקל לימודים אקדמאיים אך עדיין מתלבט לגבי תחום הלימודים, מומלץ לפנות לעו\"ס השיקום להתייעצות. תוכלו לבחון יחד את האפשרויות ולקבל הכוונה ראשונית."),
               ("2","אבחון והכוונה מקצועית","במידת הצורך, עו\"ס השיקום יפנה אותך לאבחון ולהכוונה מקצועית במכון אבחון. תהליך זה יסייע לך לבחור מסלול לימודים מדויק התואם את כישוריך, שאיפותיך ומצבך הרפואי."),
               ("3","לימודי קדם-אקדמיה","במקרים מסוימים אתה עשוי להיות זכאי לסיוע בלימודים הנדרשים לצורך עמידה בתנאי הקבלה להשכלה גבוהה. סיוע זה עשוי לכלול, בין היתר, מכינה קדם-אקדמית, השלמת בגרויות והכנה למבחן פסיכומטרי."),
           ]))
    P_intro.append(sec("help","אני מתעניין בלימודים אקדמיים אך טרם החלטתי מה ללמוד", inner, "gray"))

    # ---- PHASE: step 1 ----
    P_step1.append(phase("blue","1","צעד ראשון","הגשת אישור קבלה ללימודים"))
    inner = (p("אם הנך עומד בשני התנאים – זכאותך אושרה והתקבלת ללימודים אקדמיים – זהו השלב להגיש לעו\"ס השיקום את אישור הקבלה ללימודים.")
           + p("את האישור ניתן להעביר גם אם שנת הלימודים טרם החלה, וגם אם טרם ברשותך מערכת שעות, שתידרש בהמשך.")
           + p("מטרת ההגשה המוקדמת היא לאפשר אישור התוכנית בסמוך למועד הקבלה ללימודים, ולהעניק לך " + b("ודאות ושקט נפשי") + " לקראת תחילת הלימודים.")
           + doccard("מה חייב להופיע על אישור הקבלה ללימודים",
                     ["שמך המלא ומספר תעודת הזהות שלך","שם המוסד הלימודי","שם מסלול הלימודים","תאריך תחילת שנת הלימודים"],
                     "כדי לאפשר טיפול רציף וללא עיכוב, חשוב להקפיד שהאישור יהיה קריא ויכלול את כל הפרטים הנדרשים לפני שליחתו."))
    P_step1.append(sec("foot","הגשת אישור קבלה ללימודים", inner, "blue"))
    P_step1.append(bigbtn("שליחת אישור קבלה ללימודים"))

    # ---- PHASE: decision ----
    P_dec.append(phase("amber","chevL","החלטת עו\"ס השיקום","בחינת הבקשה וקבלת החלטה"))
    # what is checked
    inner = (p("לאחר קליטת אישור הלימודים במערכת, עו\"ס השיקום יבחן את הבקשה לפי שלושה שיקולים מרכזיים:")
           + stack([
               ("1","בחינת החלטת הוועדה הרפואית","לרבות אחוזי הנכות שנקבעו לך, מאחר שאלה משפיעים על היקף הסיוע שניתן לאשר."),
               ("2","התאמה למצבך התפקודי והבריאותי","נבדקת מידת ההתאמה של תחום הלימודים ליכולותיך הפיזיות, הקוגניטיביות או הנפשיות."),
               ("3","היתכנות תעסוקתית","האם המקצוע המבוקש עשוי לאפשר לך תעסוקה יציבה בתום הלימודים."),
           ])
           + p("במקרים מסוימים ייתכן שעו\"ס השיקום יבקש ממך מסמכים נוספים או יזמן אותך לשיחה לצורך בחינה של התוכנית המבוקשת."))
    P_dec.append(sec("search","מה בודקים? כך מתקבלת ההחלטה", inner, "amber"))

    # eligibility period (BEFORE approval-result)
    full_note = "תוכנית מלאה מאפשרת קבלת סיוע " + b("לכל תקופת הלימודים") + " המקובלת במסלול הלימודים הנבחר."
    part_note = "בתוכנית חלקית הסיוע מוגבל ל" + b("שנת לימודים אחת בלבד") + ". שנה זו תהיה שנת הלימודים האחרונה."
    zman = "כאשר הנכות שנקבעה היא זמנית, התוכנית תאושר עד לתום תקופת הזמניות בלבד. בתום התקופה, המשך הסיוע מותנה בהחלטת ועדה רפואית שתבחן מחדש את אחוזי הנכות."
    # card A — how the eligibility period is determined
    inner_a = (p("היקף הסיוע שתקבל במהלך הלימודים נקבע על-פי שיעור הנכות הרפואית שנקבע לך.")
             + p("בעת בחינת בקשתך לאישור הלימודים, עו\"ס השיקום בודק את קביעת הוועדה הרפואית האחרונה בעניינך:")
             + bullets(["האם אתה נכה כללי או נפגע עבודה","כמה אחוזי נכות נקבעו לך","האם הנכות היא זמנית או צמיתה"]))
    P_dec.append(sec("calendar","קביעת תקופת הזכאות", inner_a, "amber"))
    # card B — נכה כללי (own card so it never gets cut)
    inner_b = (f'<div class="dlabel">{svg("users",17,"#fff")}נכה כללי</div>'
             + planbox("full","תוכנית שיקום מלאה","מתאימה למי שנקבעו לו:",
                       ["נכות רפואית של 60% ומעלה","נכות רפואית של 40% ומעלה, כאשר יש לפחות ליקוי בודד אחד בשיעור 25% ומעלה"], full_note)
             + planbox("partial","תוכנית שיקום חלקית – שנת לימודים אחת","מתאימה למי שנקבעו לו:",
                       ["נכות רפואית נמוכה מ-40%","נכות רפואית בין 40% ל-59%, אך ללא ליקוי בודד בשיעור 25% לפחות"], part_note)
             + note("<strong>נכות זמנית:</strong> "+zman))
    P_dec.append(card("amber", inner_b))
    # card C — נפגע עבודה (own card)
    inner_c = (f'<div class="dlabel">{svg("users",17,"#fff")}נפגע עבודה</div>'
             + planbox("full","תוכנית שיקום מלאה","מתאימה למי שנקבעו לו מעל 20% נכות.", [], full_note)
             + planbox("partial","תוכנית שיקום חלקית – שנת לימודים אחת","מתאימה למי שנקבעו לו בין 10% ל-19% נכות.", [], part_note)
             + note("<strong>נכות זמנית:</strong> "+zman))
    P_dec.append(card("amber", inner_c))

    # approval result
    inner = (resultbox("ok","הבקשה אושרה",
                ["יישלח אליך לאזור האישי באתר הביטוח הלאומי מכתב החלטה תחת הכותרת: <strong class=\"ul\">אישור לימודים להשכלה גבוהה</strong>. מכתב זה מהווה אישור רשמי לכך שהמסלול האקדמי שבחרת אושר כתוכנית השיקום."],
                nextline="<b>אושר? זה הצעד הבא שלך:</b> כדי שנוכל לאשר את הזכאויות, עליך להגיש את מערכת השעות מיד עם קבלתה מהמוסד הלימודי.")
           + resultbox("no","כאשר התוכנית אינה עומדת בקריטריונים",
                ["במקרה שבו עולים שיקולים שעשויים להוביל לדחיית התוכנית, עו\"ס השיקום ישוחח איתך על נימוקי הדחייה ותיבדקנה יחד אפשרויות נוספות שיכולות להתאים לך."]))
    P_dec.append(sec("mail","איך אדע אם הבקשה שלי אושרה?", inner, "amber"))

    # ---- PHASE: step 2 ----
    P_step2.append(phase("blue","2","צעד שני","הגשת מערכת שעות"))
    inner = (p("לאחר קבלת אישור הלימודים הגיע הזמן להעביר את מערכת השעות.")
           + p("אישור הלימודים אינו מקנה זכאויות בפועל, אלא מהווה הכרה בכך שתוכנית הלימודים אושרה כתוכנית השיקום המקצועית שלך. רק לאחר הגשת מערכת השעות ייקבעו הזכאויות שיאושרו לך עבור הסמסטר הקרוב.")
           + p("שלב זה מתבצע לקראת תחילת כל סמסטר, כאשר יש בידך מערכת שעות רשמית. לאחר שליחת מערכת השעות עו\"ס השיקום יאשר את הזכאויות הספציפיות להן תהיה זכאי במהלך הסמסטר הקרוב.")
           + doccard("מה חייב להופיע במערכת השעות",
                     ["שמך המלא ומספר תעודת הזהות שלך","שנת הלימודים והסמסטר","שמות הקורסים","ימי הלימוד ושעותיהם עבור כל קורס","סך שעות הלימוד הסמסטריאליות ונקודות הזכות"],
                     "כדי לאפשר טיפול רציף וללא עיכוב, חשוב להקפיד שהמסמך יהיה קריא ויכלול את כל הפרטים הנדרשים לפני שליחתו.")
           + note("אם כבר יש בידך גם אישור קבלה וגם מערכת שעות, ניתן כמובן להגיש את שני המסמכים יחד. התהליך בנוי כך כי על פי רוב אישור הקבלה ללימודים מתקבל לפני מערכת השעות."))
    P_step2.append(sec("clip","הגשת מערכת שעות", inner, "blue"))
    P_step2.append(bigbtn("שליחת מערכת שעות"))

    # ---- PHASE: fulfillment ----
    P_ful.append(phase("green","chevD","מימוש הזכאויות","קביעת הזכאויות האישיות שלך"))
    # card A — how entitlements are determined
    inner = p("הזכאויות אינן נקבעות באופן אוטומטי ואינן אחידות לכל הסטודנטים. לאחר הגשת מערכת השעות, עו\"ס השיקום בוחן את נתוניך האישיים וקובע אילו זכאויות ניתן לאשר עבורך לסמסטר הקרוב. הבדיקה מתבצעת לפי קריטריונים שנקבעו לכל סוג סיוע.")
    P_ful.append(sec("shield","קביעת הזכאויות האישיות שלך", inner, "green"))

    # card B — how I know which were determined (the letter)
    inner = (p("לאחר בדיקת מערכת השעות, יישלח אליך לאזור האישי מכתב: <strong class=\"ul\">אישור לימודים לסמסטר</strong> – בו יפורטו הזכאויות שאושרו עבורך.")
           + sub2("מה מופיע במכתב?")
           + bullets([b("פרטי הסמסטר")+" – שם הסמסטר, תאריך התחלה ותאריך סיום.",
                      b("היקף הלימודים")+" – פירוט ימי הלימוד ומכסת השעות השבועית שלך.",
                      b("פירוט הזכאויות")+" – התמיכות שאושרו לך מתוך סל הזכאויות האפשרי. כגון: שכר לימוד, דמי שיקום, נסיעות, וכו'."])
           + note("לתשומת לבך – לא כל סטודנט זכאי לכל סוגי הסיוע הקיימים. הזכאות נקבעת באופן אישי, בהתאם לנהלים וקריטריונים שנקבעו לכל זכאות.")
           + redbox("שים לב","החל מסמסטר ב׳, לקראת תחילתו של כל סמסטר, עליך להגיש בנוסף למערכת השעות גם " + b("גיליון ציונים") + ". המשך מתן התמיכות מותנה בעמידה בדרישות הלימודים."))
    P_ful.append(sec("mail","איך אדע מהן הזכאויות שנקבעו לי?", inner, "green"))

    # card C — where to find the letters
    inner = p("מכתבים ישלחו לאזור האישי שלך באתר הביטוח הלאומי. היכנס לאזור האישי ובדוק את תיבת המכתבים שלך באופן שוטף.")
    P_ful.append(sec("mail","איפה אני מוצא את המכתבים שנשלחו אלי?", inner, "green"))
    P_ful.append(bigbtn("איזור אישי ביטוח לאומי", PORTAL_URL))

    parts=[ part("part-intro", P_intro),
            part("part-step", P_step1),
            part("part-decision", P_dec),
            part("part-step", P_step2),
            part("part-fulfill", P_ful) ]
    body='\n'.join(parts)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>הגשת בקשה לאישור לימודים — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg("clip",30,"#fff")}</div>
      <div><h1>הגשת בקשה לאישור לימודים</h1><p class="sub">מהצעד הראשון ועד מימוש הזכאויות</p></div>
    </div>
  </div>
  <div class="body">
{body}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    open(os.path.join(HTMLDIR,'01-application-process.html'),'w',encoding='utf-8').write(build())
    print("built 01-application-process.html (bespoke)")
