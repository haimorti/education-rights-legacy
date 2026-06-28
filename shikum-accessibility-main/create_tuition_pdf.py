"""
Generate a PDF version of the tuition presentation using reportlab.
9 pages matching the PPTX content, Hebrew RTL, professional design.
"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
import os, sys

# ── Page setup ────────────────────────────────────────────────────────────────
W, H = landscape(A4)   # 841.9 x 595.3 pt

# ── Palette ───────────────────────────────────────────────────────────────────
C_PRIMARY      = HexColor('#1A56DB')
C_PRIMARY_DARK = HexColor('#103A9E')
C_PRIMARY_LIGHT= HexColor('#EBF0FF')
C_ACCENT       = HexColor('#F5A623')
C_SUCCESS      = HexColor('#059669')
C_WARNING      = HexColor('#DC2626')
C_WHITE        = HexColor('#FFFFFF')
C_DARK         = HexColor('#111827')
C_GRAY         = HexColor('#64748B')
C_LIGHT_GRAY   = HexColor('#F1F5F9')
C_WARN_BG      = HexColor('#FFF0EB')
C_SUCCESS_BG   = HexColor('#F0FDF4')
C_AMBER_BG     = HexColor('#FFFBEB')
C_CARD         = HexColor('#FFFFFF')
C_BORDER       = HexColor('#CBD5E1')

# ── Font setup ────────────────────────────────────────────────────────────────
# Try to find an Arabic/Hebrew-capable font; fall back to built-ins
FONT_PATHS = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf',
    '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
]

def try_register(name, path):
    try:
        pdfmetrics.registerFont(TTFont(name, path))
        return True
    except Exception:
        return False

# Register fonts – prefer DejaVu (decent Unicode coverage incl. Hebrew)
FONT_REG  = 'Helvetica'
FONT_BOLD = 'Helvetica-Bold'

for path in FONT_PATHS:
    if 'DejaVuSans.ttf' in path and os.path.exists(path):
        if try_register('DejaVu', path):
            FONT_REG = 'DejaVu'
    if 'DejaVuSans-Bold.ttf' in path and os.path.exists(path):
        if try_register('DejaVuBold', path):
            FONT_BOLD = 'DejaVuBold'

def reg(c): c.setFont(FONT_REG, 12)
def bld(c): c.setFont(FONT_BOLD, 12)


# ── Drawing helpers ───────────────────────────────────────────────────────────

def rect(c, x, y, w, h, fill, stroke=None, lw=0.5, radius=3):
    c.saveState()
    c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(lw)
    else:
        c.setStrokeColor(fill)
        c.setLineWidth(0)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1 if stroke else 0)
    c.restoreState()


def hbar(c, x, y, w, h, fill):
    """Flat rectangle (no rounded corners) used for header bars."""
    c.saveState()
    c.setFillColor(fill)
    c.setStrokeColor(fill)
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.restoreState()


def circle(c, cx, cy, r, fill):
    c.saveState()
    c.setFillColor(fill)
    c.setStrokeColor(fill)
    c.circle(cx, cy, r, fill=1, stroke=0)
    c.restoreState()


def rtl_text(c, text, x, y, font=None, size=12, color=C_DARK,
             align='right', max_width=None):
    """Draw a single-line RTL text string."""
    c.saveState()
    c.setFont(font or FONT_REG, size)
    c.setFillColor(color)
    if align == 'right':
        c.drawRightString(x, y, text)
    elif align == 'center':
        c.drawCentredString(x, y, text)
    else:
        c.drawString(x, y, text)
    c.restoreState()


def wrap_rtl(c, text, x, y, width, font=None, size=11, color=C_DARK,
             line_height=None, align='right'):
    """Very simple word-wrap for RTL text. Returns final y after drawing."""
    if line_height is None:
        line_height = size * 1.4
    words = text.split()
    lines = []
    current = []
    c.saveState()
    c.setFont(font or FONT_REG, size)
    for word in words:
        test = ' '.join(current + [word])
        if c.stringWidth(test, font or FONT_REG, size) <= width:
            current.append(word)
        else:
            if current:
                lines.append(' '.join(current))
            current = [word]
    if current:
        lines.append(' '.join(current))
    c.setFillColor(color)
    cur_y = y
    for line in lines:
        if align == 'right':
            c.drawRightString(x, cur_y, line)
        elif align == 'center':
            c.drawCentredString(x, cur_y, line)
        else:
            c.drawString(x, cur_y, line)
        cur_y -= line_height
    c.restoreState()
    return cur_y


def slide_header(c, title, subtitle=None):
    """Draw the standard top header bar. Returns bottom y of the bar."""
    bar_h = 80 if subtitle else 62
    bar_y = H - bar_h
    hbar(c, 0, bar_y, W, bar_h, C_PRIMARY_DARK)
    # right accent stripe
    hbar(c, W - 12, bar_y, 12, bar_h, C_ACCENT)
    # title
    c.saveState()
    c.setFont(FONT_BOLD, 22)
    c.setFillColor(C_WHITE)
    c.drawRightString(W - 22, H - 42, title)
    if subtitle:
        c.setFont(FONT_REG, 12)
        c.setFillColor(HexColor('#BFDBFF'))
        c.drawRightString(W - 22, H - 66, subtitle)
    c.restoreState()
    return bar_y


def page_bg(c, color=C_LIGHT_GRAY):
    hbar(c, 0, 0, W, H, color)


def page_num(c, n, total=9):
    c.saveState()
    c.setFont(FONT_REG, 9)
    c.setFillColor(C_GRAY)
    c.drawCentredString(W / 2, 10, f"{n} / {total}")
    c.restoreState()


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 1 – Title
# ══════════════════════════════════════════════════════════════════════════════
def slide_title(c):
    page_bg(c, C_PRIMARY_DARK)

    # decorative circles
    circle(c, W - 100, H + 30, 140, HexColor('#1E65F0'))
    circle(c, -60, -40, 100, HexColor('#1E65F0'))

    # bottom accent strip
    hbar(c, 0, 0, W, 14, C_ACCENT)

    # main title
    c.saveState()
    c.setFont(FONT_BOLD, 48)
    c.setFillColor(C_WHITE)
    c.drawCentredString(W / 2, H / 2 + 40, "שכר לימוד")
    c.restoreState()

    # subtitle
    c.saveState()
    c.setFont(FONT_REG, 18)
    c.setFillColor(HexColor('#BFDBFF'))
    c.drawCentredString(W / 2, H / 2 - 5, "כל מה שצריך לדעת על ההחזר שמגיע לך")
    c.restoreState()

    # divider
    hbar(c, W / 2 - 90, H / 2 - 30, 180, 2, C_ACCENT)

    # audience note
    c.saveState()
    c.setFont(FONT_REG, 12)
    c.setFillColor(HexColor('#94A3B8'))
    c.drawCentredString(W / 2, H / 2 - 60, "מיועד לסטודנטים המקבלים תמיכה בשיקום מקצועי")
    c.restoreState()

    page_num(c, 1)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 2 – Overview
# ══════════════════════════════════════════════════════════════════════════════
def slide_overview(c):
    page_bg(c)
    bar_y = slide_header(c, "בקצרה – מה שחשוב לדעת")

    cards = [
        ("💰", "תקרת ההחזר", "עד 13,079 ₪\nלשנת לימודים (2025)"),
        ("🏦", "אופן התשלום", "זיכוי לחשבון הבנק\nכנגד קבלות בלבד"),
        ("📅", "שתי פעימות", "פעימה א' – סמסטר א'\nפעימה ב' – אחרי אישור סמסטר ב'"),
        ("⚖️", "הפרש מעל התקרה", "שכר לימוד גבוה מהתקרה?\nתישאו בהפרש באופן עצמאי"),
    ]

    n = len(cards)
    margin = 24
    gap = 10
    card_w = (W - 2 * margin - (n - 1) * gap) / n
    card_h = 160
    top_y = bar_y - card_h - 30

    for i, (icon, title, body) in enumerate(cards):
        cx = margin + i * (card_w + gap)
        cy = top_y
        rect(c, cx, cy, card_w, card_h, C_CARD, C_BORDER, lw=0.8)
        # top accent
        hbar(c, cx, cy + card_h - 5, card_w, 5, C_PRIMARY)
        # icon
        c.saveState()
        c.setFont(FONT_REG, 26)
        c.setFillColor(C_DARK)
        c.drawCentredString(cx + card_w / 2, cy + card_h - 42, icon)
        c.restoreState()
        # title
        c.saveState()
        c.setFont(FONT_BOLD, 11)
        c.setFillColor(C_PRIMARY_DARK)
        c.drawCentredString(cx + card_w / 2, cy + card_h - 64, title)
        c.restoreState()
        # body lines
        c.saveState()
        c.setFont(FONT_REG, 10)
        c.setFillColor(C_GRAY)
        for j, line in enumerate(body.split('\n')):
            c.drawCentredString(cx + card_w / 2, cy + card_h - 88 - j * 16, line)
        c.restoreState()

    # bottom note
    note_y = top_y - 36
    rect(c, margin, note_y, W - 2 * margin, 28, C_PRIMARY_LIGHT, C_PRIMARY, lw=1)
    c.saveState()
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_PRIMARY)
    c.drawCentredString(W / 2, note_y + 9,
                        "ההחזר אינו מועבר ישירות למוסד הלימודים – יש לשלם בעצמך ולאחר מכן להגיש קבלה.")
    c.restoreState()

    page_num(c, 2)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 3 – תקרת ההחזר
# ══════════════════════════════════════════════════════════════════════════════
def slide_ceiling(c):
    page_bg(c)
    bar_y = slide_header(c, "תקרת ההחזר",
                          "כמה כסף מגיע לך ואיך מחשבים את זה")

    rules = [
        (True,  "✅  תקרה שנתית: 13,079 ₪  (נכון לשנת 2025)"),
        (True,  "✅  ההחזר מועבר ישירות לחשבון הבנק שלך"),
        (True,  "✅  נדרשת קבלה על תשלום שבוצע בפועל"),
        (False, "⚠️  שכר הלימוד לא מגיע ישירות למוסד – אתה משלם קודם"),
        (False, "⚠️  שכר לימוד מעל התקרה? ההפרש על חשבונך"),
    ]

    left_margin = 24
    right_col_start = W / 2 + 10
    col_w = W / 2 - 34

    row_h = 34
    top_y = bar_y - 18

    for i, (ok, text) in enumerate(rules):
        ry = top_y - i * (row_h + 4)
        bg = C_SUCCESS_BG if ok else HexColor('#FFF5F5')
        border = C_SUCCESS if ok else C_WARNING
        rect(c, left_margin, ry - row_h, col_w, row_h, bg, border, lw=0.8)
        c.saveState()
        c.setFont(FONT_BOLD if not ok else FONT_REG, 11)
        c.setFillColor(C_SUCCESS if ok else C_WARNING)
        c.drawRightString(left_margin + col_w - 8, ry - row_h + 10, text)
        c.restoreState()

    # ── Example box ──────────────────────────────────────────────────────────
    ex_l = right_col_start
    ex_top = bar_y - 18
    ex_w = col_w
    ex_h = 155

    rect(c, ex_l, ex_top - ex_h, ex_w, ex_h, C_CARD, C_PRIMARY, lw=1.5)
    hbar(c, ex_l, ex_top - 30, ex_w, 30, C_PRIMARY)
    c.saveState()
    c.setFont(FONT_BOLD, 12)
    c.setFillColor(C_WHITE)
    c.drawCentredString(ex_l + ex_w / 2, ex_top - 20, "דוגמה להחזר יחסי")
    c.restoreState()

    wrap_rtl(c, "נניח ששכר הלימוד השנתי שלך הוא 26,158 ₪ – כפול מהתקרה.",
             ex_l + ex_w - 10, ex_top - 50, ex_w - 16, size=11, color=C_DARK)
    wrap_rtl(c, "במצב כזה תקבל החזר של 50% מכל קבלה, עד לניצול מלא של 13,079 ₪.",
             ex_l + ex_w - 10, ex_top - 80, ex_w - 16, size=11,
             font=FONT_BOLD, color=C_PRIMARY_DARK)
    wrap_rtl(c, "כלומר – ההחזר מחושב יחסית לפי היחס בין התקרה לשכר הלימוד בפועל.",
             ex_l + ex_w - 10, ex_top - 114, ex_w - 16, size=10,
             color=C_GRAY)

    # formula box
    form_y = ex_top - ex_h - 12
    form_h = 68
    rect(c, ex_l, form_y - form_h, ex_w, form_h, C_PRIMARY_LIGHT, C_PRIMARY, lw=1)
    c.saveState()
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_PRIMARY_DARK)
    c.drawRightString(ex_l + ex_w - 10, form_y - 20, "📐  נוסחת החזר יחסי")
    c.setFont(FONT_REG, 10)
    c.drawRightString(ex_l + ex_w - 10, form_y - 38,
                      "אחוז ההחזר = (תקרה ÷ שכר לימוד בפועל) × 100")
    c.drawRightString(ex_l + ex_w - 10, form_y - 54,
                      "סכום שתקבל = אחוז ההחזר × סכום הקבלה")
    c.restoreState()

    page_num(c, 3)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 4 – מתי מקבלים את ההחזר
# ══════════════════════════════════════════════════════════════════════════════
def slide_timing(c):
    page_bg(c)
    bar_y = slide_header(c, "מתי מקבלים את ההחזר?",
                          "אישור הזכאות לכל סמסטר נבדק בנפרד – ולכן ההחזר משולם בשתי פעימות")

    card_w = (W - 48 - 14) / 2
    card_h = 165
    top_y = bar_y - 20

    def payment_card(left, num, title, body, color):
        rect(c, left, top_y - card_h, card_w, card_h, C_CARD, color, lw=2)
        hbar(c, left, top_y - 35, card_w, 35, color)
        # number badge
        circle(c, left + 22, top_y - 18, 12, C_WHITE)
        c.saveState()
        c.setFont(FONT_BOLD, 12)
        c.setFillColor(color)
        c.drawCentredString(left + 22, top_y - 22, str(num))
        c.restoreState()
        # card title
        c.saveState()
        c.setFont(FONT_BOLD, 13)
        c.setFillColor(C_WHITE)
        c.drawRightString(left + card_w - 10, top_y - 24, title)
        c.restoreState()
        # body
        wrap_rtl(c, body, left + card_w - 10, top_y - 55,
                 card_w - 20, size=11, color=C_DARK)

    payment_card(24, 1, "פעימה ראשונה – סמסטר א'",
                 "מחצית מסכום הזכאות השנתית תשולם לחשבונך בתחילת סמסטר א'. התשלום מותנה באישור הזכאות לסמסטר זה.",
                 C_PRIMARY)
    payment_card(24 + card_w + 14, 2, "פעימה שנייה – סמסטר ב'",
                 "המחצית השנייה תשולם לאחר אישור סמסטר ב'. האישור ניתן רק לאחר בחינת התקדמותך בלימודים.",
                 C_SUCCESS)

    # info box
    info_y = top_y - card_h - 16
    info_h = 56
    rect(c, 24, info_y - info_h, W - 48, info_h, C_PRIMARY_LIGHT, C_PRIMARY, lw=1)
    c.saveState()
    c.setFont(FONT_BOLD, 12)
    c.setFillColor(C_PRIMARY_DARK)
    c.drawRightString(W - 36, info_y - 18, "💡  מקדמה לפני תחילת הלימודים")
    c.setFont(FONT_REG, 11)
    c.setFillColor(C_DARK)
    c.drawRightString(W - 36, info_y - 36,
                      "במקרים מסוימים, כאשר שולמה מקדמה, ניתן לקבל אותה לפני מועד תחילת הלימודים הרשמי.")
    c.restoreState()

    page_num(c, 4)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 5 – מלגות, הנחות ופטורים
# ══════════════════════════════════════════════════════════════════════════════
def slide_scholarships(c):
    page_bg(c)
    bar_y = slide_header(c, "מלגות, הנחות ופטורים",
                          "לא כל מלגה משפיעה על ההחזר – הנה מה שחשוב לדעת")

    card_w = (W - 48 - 14) / 2
    card_h = 180
    top_y = bar_y - 20

    # Card A – מנוכות
    la = 24
    rect(c, la, top_y - card_h, card_w, card_h, C_CARD, C_WARNING, lw=2)
    hbar(c, la, top_y - 34, card_w, 34, C_WARNING)
    c.saveState()
    c.setFont(FONT_BOLD, 13)
    c.setFillColor(C_WHITE)
    c.drawRightString(la + card_w - 10, top_y - 22, "❌  מלגות שמנוכות מההחזר")
    c.restoreState()

    c.saveState()
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_DARK)
    c.drawRightString(la + card_w - 10, top_y - 54,
                      "מלגות ייעודיות שניתנו עבור שכר לימוד –")
    c.setFont(FONT_REG, 11)
    c.drawRightString(la + card_w - 10, top_y - 70, "ינוכו מסכום ההחזר שתקבל.")
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_WARNING)
    c.drawRightString(la + card_w - 10, top_y - 96, "דוגמאות:")
    c.setFont(FONT_REG, 11)
    c.setFillColor(C_DARK)
    c.drawRightString(la + card_w - 10, top_y - 114, '•  מלגת "ממדים ללימודים"')
    c.drawRightString(la + card_w - 10, top_y - 130,
                      "•  מלגת משרד הביטחון ללימודים בפריפריה")
    c.restoreState()

    # Card B – אינן מנוכות
    lb = la + card_w + 14
    rect(c, lb, top_y - card_h, card_w, card_h, C_CARD, C_SUCCESS, lw=2)
    hbar(c, lb, top_y - 34, card_w, 34, C_SUCCESS)
    c.saveState()
    c.setFont(FONT_BOLD, 13)
    c.setFillColor(C_WHITE)
    c.drawRightString(lb + card_w - 10, top_y - 22, "✅  מלגות שאינן מנוכות")
    c.restoreState()

    c.saveState()
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_DARK)
    c.drawRightString(lb + card_w - 10, top_y - 54,
                      "מלגות שאינן מועברות ישירות לחשבון שכר הלימוד")
    c.setFont(FONT_REG, 11)
    c.drawRightString(lb + card_w - 10, top_y - 70,
                      "ויכולות לשמש למטרות אחרות –")
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(C_SUCCESS)
    c.drawRightString(lb + card_w - 10, top_y - 96,
                      "אינן נלקחות בחשבון בחישוב ההחזר.")
    c.setFont(FONT_REG, 10)
    c.setFillColor(C_GRAY)
    c.drawRightString(lb + card_w - 10, top_y - 118,
                      "כלומר: מלגות כאלה לא יפגעו בסכום שתקבל.")
    c.restoreState()

    # tip box
    tip_y = top_y - card_h - 14
    tip_h = 46
    rect(c, 24, tip_y - tip_h, W - 48, tip_h, C_AMBER_BG, C_ACCENT, lw=1.5)
    c.saveState()
    c.setFont(FONT_BOLD, 11)
    c.setFillColor(HexColor('#92400E'))
    c.drawRightString(W - 36, tip_y - 20,
                      '💡  טיפ: אם קיבלת מלגה – בדוק עם עו"ס השיקום שלך האם היא משפיעה על גובה ההחזר.')
    c.restoreState()

    page_num(c, 5)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 6 – הנחיות להגשת קבלה
# ══════════════════════════════════════════════════════════════════════════════
def slide_receipt(c):
    page_bg(c)
    bar_y = slide_header(c, "כיצד מגישים קבלה?",
                          'לאחר התשלום למוסד הלימודים – שלחו קבלה לעו"ס השיקום דרך אתר הביטוח הלאומי')

    # ── Step flow ────────────────────────────────────────────────────────────
    steps = [
        ("1", "שלמו שכר לימוד", "למוסד האקדמי"),
        ("2", "קבלו קבלה", "מהמוסד האקדמי"),
        ("3", 'שלחו לעו"ס השיקום', "דרך אתר ביטוח לאומי"),
    ]
    step_w = 200
    step_h = 55
    gap = 24
    steps_total_w = len(steps) * step_w + (len(steps) - 1) * gap
    step_start = (W - steps_total_w) / 2
    step_y = bar_y - 22

    for i, (num, t1, t2) in enumerate(steps):
        sx = step_start + i * (step_w + gap)
        rect(c, sx, step_y - step_h, step_w, step_h, C_CARD, C_PRIMARY, lw=1.5)
        hbar(c, sx, step_y - step_h, 36, step_h, C_PRIMARY)
        c.saveState()
        c.setFont(FONT_BOLD, 16)
        c.setFillColor(C_WHITE)
        c.drawCentredString(sx + 18, step_y - step_h + 18, num)
        c.setFont(FONT_BOLD, 11)
        c.setFillColor(C_DARK)
        c.drawRightString(sx + step_w - 8, step_y - 20, t1)
        c.setFont(FONT_REG, 10)
        c.setFillColor(C_GRAY)
        c.drawRightString(sx + step_w - 8, step_y - 36, t2)
        c.restoreState()
        if i < len(steps) - 1:
            c.saveState()
            c.setFont(FONT_BOLD, 14)
            c.setFillColor(C_PRIMARY)
            c.drawCentredString(sx + step_w + gap / 2, step_y - step_h / 2 - 6, "◄")
            c.restoreState()

    # ── Checklist ─────────────────────────────────────────────────────────────
    cl_y = step_y - step_h - 14
    cl_x = 24
    cl_w = W - 48
    cl_hdr_h = 30

    hbar(c, cl_x, cl_y - cl_hdr_h, cl_w, cl_hdr_h, C_PRIMARY)
    c.saveState()
    c.setFont(FONT_BOLD, 13)
    c.setFillColor(C_WHITE)
    c.drawRightString(cl_x + cl_w - 12, cl_y - 19, "🧾  מה חייב להופיע על הקבלה")
    c.restoreState()

    items = [
        "שם מלא",
        "מספר תעודת זהות",
        "שם המוסד האקדמי",
        "תאריך הנפקת הקבלה",
        "מספר קבלה / חשבונית",
        "מהות התשלום – שכר לימוד",
    ]
    per_row = 3
    item_h = 28
    col_w_item = cl_w / per_row

    for idx, item in enumerate(items):
        row = idx // per_row
        col = idx % per_row
        ix = cl_x + col * col_w_item
        iy = cl_y - cl_hdr_h - (row + 1) * item_h
        bg = C_CARD if (row + col) % 2 == 0 else HexColor('#F8FAFF')
        hbar(c, ix, iy, col_w_item, item_h, bg)
        # border
        c.saveState()
        c.setStrokeColor(C_BORDER)
        c.setLineWidth(0.4)
        c.rect(ix, iy, col_w_item, item_h, fill=0, stroke=1)
        c.restoreState()
        c.saveState()
        c.setFont(FONT_REG, 11)
        c.setFillColor(C_SUCCESS)
        c.drawRightString(ix + col_w_item - 10, iy + 9, "✓  " + item)
        c.restoreState()

    # warning bar
    rows_used = (len(items) + per_row - 1) // per_row
    warn_y = cl_y - cl_hdr_h - rows_used * item_h
    warn_h = 26
    hbar(c, cl_x, warn_y - warn_h, cl_w, warn_h, HexColor('#FFF0F0'))
    c.saveState()
    c.setStrokeColor(C_WARNING)
    c.setLineWidth(0.8)
    c.rect(cl_x, warn_y - warn_h, cl_w, warn_h, fill=0, stroke=1)
    c.setFont(FONT_BOLD, 10)
    c.setFillColor(C_WARNING)
    c.drawRightString(cl_x + cl_w - 12, warn_y - 17,
                      "⚠️  קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה – אנא וודאו שהכל מלא לפני ההגשה.")
    c.restoreState()

    page_num(c, 6)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 7 – תוך כמה זמן מתקבל ההחזר
# ══════════════════════════════════════════════════════════════════════════════
def slide_processing(c):
    page_bg(c)
    bar_y = slide_header(c, "תוך כמה זמן מגיע הכסף?")

    # central time display
    box_w = 280
    box_h = 120
    box_x = (W - box_w) / 2
    box_y = bar_y - box_h - 22
    rect(c, box_x, box_y, box_w, box_h, C_CARD, C_PRIMARY, lw=2)
    hbar(c, box_x, box_y + box_h - 6, box_w, 6, C_PRIMARY)

    c.saveState()
    c.setFont(FONT_REG, 32)
    c.setFillColor(C_DARK)
    c.drawCentredString(box_x + box_w / 2, box_y + box_h - 52, "⏱️")
    c.setFont(FONT_BOLD, 22)
    c.setFillColor(C_PRIMARY_DARK)
    c.drawCentredString(box_x + box_w / 2, box_y + 44, "~10 ימי עבודה")
    c.setFont(FONT_REG, 11)
    c.setFillColor(C_GRAY)
    c.drawCentredString(box_x + box_w / 2, box_y + 24,
                        "מרגע הגשת הקבלה ועד קבלת הזיכוי לחשבון")
    c.restoreState()

    # notes
    notes = [
        (True,  C_SUCCESS, "✅  ברוב המקרים ההחזר מתקבל תוך כ-10 ימי עבודה."),
        (False, C_WARNING, "⚠️  ייתכנו עיכובים בזמני עומס חריג."),
        (False, C_WARNING, "⚠️  ייתכנו עיכובים בתקופת חגים וחופשות."),
        (False, C_ACCENT,  "💡  מומלץ לשמור עותק של הקבלה לאחר ההגשה."),
    ]

    note_w = W - 100
    note_x = (W - note_w) / 2
    note_h = 30
    note_gap = 6
    note_start_y = box_y - 16

    for i, (_, col, text) in enumerate(notes):
        ny = note_start_y - (i + 1) * (note_h + note_gap)
        bg = C_SUCCESS_BG if col == C_SUCCESS else \
             HexColor('#FFF5F5') if col == C_WARNING else C_AMBER_BG
        rect(c, note_x, ny, note_w, note_h, bg, col, lw=0.8)
        c.saveState()
        c.setFont(FONT_REG, 11)
        c.setFillColor(C_DARK)
        c.drawRightString(note_x + note_w - 12, ny + 9, text)
        c.restoreState()

    page_num(c, 7)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 8 – תנאים להמשך קבלת התמיכה
# ══════════════════════════════════════════════════════════════════════════════
def slide_conditions(c):
    page_bg(c)
    bar_y = slide_header(c, "תנאים להמשך קבלת התמיכה",
                          "המשך הזכאות מותנה בהתקדמות בלימודים ובהגשת מסמכים בזמן")

    # warning banner
    warn_y = bar_y - 18
    warn_h = 42
    rect(c, 24, warn_y - warn_h, W - 48, warn_h, C_WARN_BG, C_WARNING, lw=2)
    c.saveState()
    c.setFont(FONT_BOLD, 13)
    c.setFillColor(C_WARNING)
    c.drawRightString(W - 36, warn_y - 26,
                      "⚠️  בסיום כל סמסטר עליך להגיש מסמכים – אחרת התמיכה עלולה להיפסק.")
    c.restoreState()

    # Two document cards
    card_w = (W - 48 - 14) / 2
    card_h = 160
    card_y = warn_y - warn_h - 16

    def doc_card(left, icon, title, desc, border):
        rect(c, left, card_y - card_h, card_w, card_h, C_CARD, border, lw=2)
        c.saveState()
        c.setFont(FONT_REG, 34)
        c.setFillColor(C_DARK)
        c.drawCentredString(left + card_w / 2, card_y - 54, icon)
        c.setFont(FONT_BOLD, 14)
        c.setFillColor(border)
        c.drawCentredString(left + card_w / 2, card_y - 84, title)
        c.setFont(FONT_REG, 11)
        c.setFillColor(C_DARK)
        for j, line in enumerate(desc.split('\n')):
            c.drawCentredString(left + card_w / 2, card_y - 108 - j * 16, line)
        c.restoreState()

    doc_card(24, "📋", "גיליון ציונים",
             "ציוני הסמסטר המסתיים –\nהוכחה להתקדמות בלימודים.", C_PRIMARY)
    doc_card(24 + card_w + 14, "📅", "מערכת שעות מעודכנת",
             "לסמסטר הבא –\nהוכחה לרישום לקורסים.", C_SUCCESS)

    # condition note
    cond_y = card_y - card_h - 14
    cond_h = 50
    rect(c, 24, cond_y - cond_h, W - 48, cond_h, C_PRIMARY_LIGHT, C_PRIMARY, lw=1)
    wrap_rtl(c,
             "המשך קבלת כל התמיכות (שכר לימוד, הסעות, ציוד וכו') מותנה "
             "בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם.",
             W - 36, cond_y - 16, W - 72,
             font=FONT_BOLD, size=11, color=C_PRIMARY_DARK)

    page_num(c, 8)


# ══════════════════════════════════════════════════════════════════════════════
#  SLIDE 9 – Summary
# ══════════════════════════════════════════════════════════════════════════════
def slide_summary(c):
    page_bg(c, C_PRIMARY_DARK)
    hbar(c, 0, 0, W, 14, C_ACCENT)
    circle(c, W - 80, H + 20, 120, HexColor('#1E65F0'))

    c.saveState()
    c.setFont(FONT_BOLD, 26)
    c.setFillColor(C_WHITE)
    c.drawCentredString(W / 2, H - 48, "סיכום – נקודות מפתח")
    c.restoreState()

    points = [
        ("💰", "תקרה: 13,079 ₪ לשנה (2025)"),
        ("🏦", "זיכוי לחשבון הבנק – לא ישירות למוסד"),
        ("📅", "2 פעימות: סמסטר א' + סמסטר ב'"),
        ("🧾", "חובה להגיש קבלה עם כל הפרטים"),
        ("⏱️", "~10 ימי עבודה לקבלת ההחזר"),
        ("📋", "בסיום כל סמסטר – ציונים ומערכת שעות"),
    ]

    pt_w = (W - 60) / 2
    pt_h = 42
    pt_gap_v = 8
    pt_gap_h = 12
    pt_l1 = 24
    pt_l2 = pt_l1 + pt_w + pt_gap_h
    start_y = H - 90

    for i, (icon, text) in enumerate(points):
        col = i % 2
        row = i // 2
        px = pt_l1 if col == 0 else pt_l2
        py = start_y - row * (pt_h + pt_gap_v)
        rect(c, px, py - pt_h, pt_w, pt_h,
             HexColor('#1C3FAA'), HexColor('#2D5CE0'), lw=0.8)
        c.saveState()
        c.setFont(FONT_REG, 18)
        c.setFillColor(C_WHITE)
        c.drawRightString(px + pt_w - 10, py - pt_h + 12, icon)
        c.setFont(FONT_BOLD, 12)
        c.drawRightString(px + pt_w - 38, py - pt_h + 14, text)
        c.restoreState()

    # closing
    rows = (len(points) + 1) // 2
    close_y = start_y - rows * (pt_h + pt_gap_v) - 16
    c.saveState()
    c.setFont(FONT_REG, 12)
    c.setFillColor(HexColor('#BFDBFF'))
    c.drawCentredString(W / 2, close_y, 'לשאלות נוספות – פנו לעו"ס השיקום שלכם')
    c.restoreState()

    page_num(c, 9)


# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════
def main():
    out = "/home/user/shikum-accessibility/tuition_presentation.pdf"
    c = canvas.Canvas(out, pagesize=landscape(A4))
    c.setTitle("שכר לימוד – מצגת לסטודנטים")
    c.setAuthor("שיקום מקצועי")
    c.setSubject("זכויות שכר לימוד")

    builders = [
        slide_title,
        slide_overview,
        slide_ceiling,
        slide_timing,
        slide_scholarships,
        slide_receipt,
        slide_processing,
        slide_conditions,
        slide_summary,
    ]

    for fn in builders:
        fn(c)
        c.showPage()

    c.save()
    size_kb = os.path.getsize(out) // 1024
    print(f"Saved: {out}  ({len(builders)} pages, ~{size_kb} KB)")


if __name__ == "__main__":
    main()
