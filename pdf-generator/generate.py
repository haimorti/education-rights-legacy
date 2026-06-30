#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convert each docs/*.md into a themed, site-faithful HTML page (desktop+mobile)."""
import os, re, html, sys

HERE = os.path.dirname(os.path.abspath(__file__))         # .../pdf-generator
DOCS = os.path.join(os.path.dirname(HERE), "docs")        # .../docs
HTMLDIR = os.path.join(HERE, "_html"); os.makedirs(HTMLDIR, exist_ok=True)
FONTS_CSS = "file://" + os.path.join(HERE, "fonts", "fonts.local.css")

# ---- lucide-style icons (inner svg) ----
IC = {
  "cap":'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 2 6 2s6-1 6-2v-5"/><path d="M22 10v6"/>',
  "wallet":'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  "home":'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  "bus":'<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.8-1.7 1-2.8c.1-.4.1-.8 0-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  "package":'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  "book":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  "access":'<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>',
  "clip":'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  "zap":'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  "alert":'<path d="m21.7 18-9-16a1 1 0 0 0-1.7 0l-9 16a1 1 0 0 0 .9 1.5h18a1 1 0 0 0 .8-1.5Z"/><path d="M12 9v4M12 17h.01"/>',
  "check":'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "file":'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M8 13h8M8 17h5"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  "arrow":'<path d="M5 12h14"/><path d="m12 5-7 7 7 7"/>',
  "dot":'<circle cx="12" cy="12" r="9"/>',
  "coins":'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  "clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  "mappin":'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  "send":'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  "userc":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  "calendar":'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
}

def section_icon(t):
    rules=[
      (('חשוב לזכור',),'alert'),
      (('בקצרה','הקדמה'),'zap'),
      (('מי ','זכאי','זכאות','תנאי'),'userc'),
      (('גובה','חישוב','סכום','תקרה','מענק','כמה'),'coins'),
      (('הכנס','מלג','ניכוי','הנחה','פטור','השפע'),'coins'),
      (('מרחק',),'mappin'),
      (('מתי','מועד','זמן','תוך כמה','חופש','קיץ'),'clock'),
      (('סמסטר','שנה'),'calendar'),
      (('הגש','הנחיות','מימוש','איך','תהליך','מסלול','שליחת','קבלה','מסמכ','חשבונית'),'send'),
    ]
    for keys,ic in rules:
        if any(k in t for k in keys): return ic
    return 'info'

# file -> (icon, subtitle_fallback, crumb)
META = {
  "01-application-process":   ("clip",  "מהצעד הראשון ועד מימוש הזכאויות", "הגשת בקשה"),
  "02-rehabilitation-allowance":("wallet","גמלה חודשית לתקופת הלימודים", "דמי שיקום"),
  "03-tuition":               ("cap",   "סיוע בתשלום שכר הלימוד", "שכר לימוד"),
  "04-rent-assistance":       ("home",  "סיוע בעלויות דיור במהלך הלימודים", "שכר דירה"),
  "05-travel-expenses":       ("bus",   "סיוע בעלויות הנסיעה למקום הלימודים", "הוצאות נסיעה"),
  "06-study-equipment":       ("package","מענק שנתי לספרים, ציוד ומחשב", "ציוד לימודי"),
  "07-tutoring":              ("book",  "תמיכה בלימודים והשלמת פערים", "שיעורי עזר"),
  "08-accessibility":         ("access","סיוע בהנגשת הלימודים והסביבה", "הנגשות"),
}

def svg(name, size, stroke="currentColor"):
    return f'<svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" stroke="{stroke}">{IC[name]}</svg>'

def esc(t): return html.escape(t, quote=False)

def inline(t):
    t = esc(t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', t)
    t = t.replace('‏','')
    return t

# ---------- block parser ----------
def split_sections(md):
    lines = md.split('\n')
    title = ""
    subtitle = ""
    i = 0
    # title
    while i < len(lines):
        l = lines[i].strip()
        if l.startswith('# '):
            title = l[2:].strip(); i += 1; break
        i += 1
    # optional subtitle blockquote right after
    while i < len(lines) and lines[i].strip() == '': i += 1
    if i < len(lines) and lines[i].strip().startswith('> '):
        subtitle = lines[i].strip()[2:].strip(); i += 1
    # sections by ##
    sections = []
    cur = None
    for l in lines[i:]:
        if l.startswith('## '):
            if cur: sections.append(cur)
            cur = [l[3:].strip(), []]
        else:
            if cur is None:
                if l.strip()=='' or l.strip()=='---': continue
                cur = ["", []]
            cur[1].append(l)
    if cur: sections.append(cur)
    return title, subtitle, sections

def parse_blocks(body_lines):
    """Yield blocks: ('h3',txt) ('h4',txt) ('p',txt) ('ul',[items]) ('ol',[items])
       ('quote',[lines]) ('table',[rows])"""
    blocks=[]; i=0; n=len(body_lines)
    while i<n:
        raw=body_lines[i]; l=raw.strip()
        if l=='' or l=='---': i+=1; continue
        if l.startswith('#### '): blocks.append(('h4',l[5:].strip())); i+=1; continue
        if l.startswith('### '): blocks.append(('h3',l[4:].strip())); i+=1; continue
        if l.startswith('> '):
            q=[];
            while i<n and body_lines[i].strip().startswith('>'):
                q.append(body_lines[i].strip().lstrip('>').strip()); i+=1
            blocks.append(('quote',[x for x in q if x!=''])); continue
        if l.startswith('|'):
            rows=[]
            while i<n and body_lines[i].strip().startswith('|'):
                rows.append(body_lines[i].strip()); i+=1
            blocks.append(('table',rows)); continue
        if re.match(r'^[-*]\s+', l):
            items=[]
            while i<n and re.match(r'^[-*]\s+', body_lines[i].strip()):
                items.append(re.sub(r'^[-*]\s+','',body_lines[i].strip())); i+=1
            blocks.append(('ul',items)); continue
        if re.match(r'^\d+\.\s+', l):
            items=[]
            while i<n and re.match(r'^\d+\.\s+', body_lines[i].strip()):
                items.append(re.sub(r'^\d+\.\s+','',body_lines[i].strip())); i+=1
            blocks.append(('ol',items)); continue
        # paragraph (single line; md uses blank-line separation)
        blocks.append(('p',l)); i+=1
    return blocks

def render_table(rows):
    cells=[ [c.strip() for c in r.strip().strip('|').split('|')] for r in rows ]
    # drop separator row (---)
    body=[r for r in cells if not all(set(c) <= set('-: ') for c in r)]
    if not body: return ""
    head=body[0]; rest=body[1:]
    th=''.join(f'<th>{inline(c)}</th>' for c in head)
    trs=''.join('<tr>'+''.join(f'<td>{inline(c)}</td>' for c in r)+'</tr>' for r in rest)
    return f'<table class="tbl"><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>'

def render_quote(qlines):
    txt=' '.join(qlines)
    warn = ('שים לב' in txt) or ('תידחה' in txt) or ('אין זכאות' in txt)
    icon = 'alert' if warn else 'info'
    cls = 'note warn' if warn else 'note'
    body=''.join(f'<p>{inline(x)}</p>' for x in qlines)
    return f'<div class="{cls}"><span class="nico">{svg(icon,16)}</span><div class="ntxt">{body}</div></div>'

def render_checklist(title, items, warn_text):
    lis=''.join(f'<li>{svg("check",16)}<span>{inline(x)}</span></li>' for x in items)
    warn = f'<div class="cl-warn">{svg("alert",15)}<span>{inline(warn_text)}</span></div>' if warn_text else ''
    return (f'<div class="checklist"><div class="cl-head">{svg("file",17)}<span>{inline(title)}</span></div>'
            f'<ul>{lis}</ul>{warn}</div>')

def is_checklist_head(t):
    return ('חייב להופיע' in t)

def render_section_body(blocks):
    out=[]; i=0; n=len(blocks)
    while i<n:
        kind,val=blocks[i]
        if kind=='h3' and is_checklist_head(val):
            # gather following ul as checklist; optional following quote w/ תידחה as warn
            if i+1<n and blocks[i+1][0]=='ul':
                items=blocks[i+1][1]; warn=None; j=i+2
                if j<n and blocks[j][0]=='quote':
                    qt=' '.join(blocks[j][1])
                    if 'תידחה' in qt: warn=qt; j+=1
                if warn is None: warn="קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה."
                out.append(render_checklist(val,items,warn)); i=j; continue
        if kind=='h4' and is_checklist_head(val):
            if i+1<n and blocks[i+1][0]=='ul':
                items=blocks[i+1][1]; warn=None; j=i+2
                if j<n and blocks[j][0]=='quote' and 'תידחה' in ' '.join(blocks[j][1]):
                    warn=' '.join(blocks[j][1]); j+=1
                if warn is None: warn="קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה."
                out.append(render_checklist(val,items,warn)); i=j; continue
        if kind=='h3': out.append(f'<h3 class="sub">{inline(val)}</h3>')
        elif kind=='h4': out.append(f'<h4 class="sub2">{inline(val)}</h4>')
        elif kind=='p': out.append(f'<p class="par">{inline(val)}</p>')
        elif kind=='ul':
            lis=''.join(f'<li><span class="bdot"></span><span>{inline(x)}</span></li>' for x in val)
            out.append(f'<ul class="blist">{lis}</ul>')
        elif kind=='ol':
            lis=''.join(f'<div class="step"><div class="n">{k+1}</div><div class="txt">{inline(x)}</div></div>' for k,x in enumerate(val))
            out.append(f'<div class="steps">{lis}</div>')
        elif kind=='quote': out.append(render_quote(val))
        elif kind=='table': out.append(render_table(val))
        i+=1
    return '\n'.join(out)

def build_section(name, blocks):
    body=render_section_body(blocks)
    if name in ('בקצרה','הקדמה'):
        return (f'<div class="summary"><div class="ico">{svg("zap",20,"hsl(199 89% 40%)")}</div>'
                f'<div class="sbody"><h2>{esc(name)}</h2>{body}</div></div>')
    if name=='חשוב לזכור':
        return (f'<div class="important"><div class="ico">{svg("alert",19,"hsl(38 92% 42%)")}</div>'
                f'<div><h3>{esc(name)}</h3>{body}</div></div>')
    head = f'<h3 class="sec-h"><span class="sec-ico">{svg(section_icon(name),18)}</span>{esc(name)}</h3>' if name else ''
    return f'<div class="card sec">{head}{body}</div>'

CSS = open(os.path.join(HERE,'base.css'),encoding='utf-8').read()

def intro_card():
    txt=('זכאות זו, כמו שאר התמיכות בתוכנית השיקום, נקבעת באופן אישי על-ידי עובד השיקום. '
         'לאחר שלימודיך אושרו כתוכנית השיקום והגשת מערכת שעות, עובד השיקום בוחן את נתוניך וקובע אילו זכאויות מאושרות לך לסמסטר. '
         'הזכאויות שאושרו לך מפורטות במכתב <strong>"אישור לימודים לסמסטר"</strong>, שתמצא/י ב'
         '<a href="https://ps.btl.gov.il/#/login">אזור האישי שלך באתר הביטוח הלאומי</a> — אם אכן אושרו לך זכאויות לסמסטר הקרוב. '
         'בעמוד זה מוסבר מי זכאי לזכאות זו, מה היקפה וכיצד לממש אותה.')
    return (f'<div class="card sec"><h3 class="sec-h"><span class="sec-ico">{svg("userc",18)}</span>'
            f'איך נקבעת הזכאות שלך?</h3><p class="par">{txt}</p></div>')

def build_page(slug, md):
    icon, sub_fb, crumb = META[slug]
    title, subtitle, sections = split_sections(md)
    subtitle = subtitle or sub_fb
    parts=[intro_card()]
    for name, raw in sections:
        blocks=parse_blocks(raw)
        parts.append(build_section(name, blocks))
    body_html='\n'.join(parts)
    return f"""<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>{esc(title)} — שיקום מקצועי לסטודנטים</title>
<style>@import url("{FONTS_CSS}");
{CSS}</style></head><body>
<div class="page">
  <div class="hero">
    <div class="circle c1"></div><div class="circle c2"></div>
    <div class="hero-row">
      <div class="hero-ico">{svg(icon,30,"#fff")}</div>
      <div><h1>{esc(title)}</h1><p class="sub">{esc(subtitle)}</p></div>
    </div>
  </div>
  <div class="body">
{body_html}
  </div>
  <div class="foot">המידע הוא מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני. לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד/ת השיקום המטפל/ת.
  <div class="brand">שיקום מקצועי לסטודנטים · שהוכרו כנכים כלליים / נפגעי עבודה</div></div>
</div></body></html>"""

if __name__=='__main__':
    only = sys.argv[1] if len(sys.argv)>1 else None   # optional single slug
    for fn in sorted(os.listdir(DOCS)):
        if not fn.endswith('.md'): continue
        slug=fn[:-3]
        if slug=='01-application-process': continue   # bespoke (app01.py)
        if only and slug!=only: continue
        md=open(os.path.join(DOCS,fn),encoding='utf-8').read()
        out=build_page(slug, md)
        open(os.path.join(HTMLDIR,slug+'.html'),'w',encoding='utf-8').write(out)
        print("built", slug+'.html')
