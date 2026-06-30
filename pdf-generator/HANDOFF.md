# HANDOFF — המשך עבודה על מחולל מדריכי ה-PDF

מסמך העברה להמשכיות בשיחה חדשה. קרא גם את [`README.md`](./README.md) ו-[`SPEC.md`](./SPEC.md).

## מה הפרויקט
הפקת מדריכי **PDF נאמנים לאתר** "שיקום מקצועי לסטודנטים" מתוך תוכן הזכאויות, להעברה למבוטחים ב**אימייל ובפגישה** (אי אפשר להטמיע אתר חיצוני בארגון). לכל מדריך **2 קבצים**: **דסקטופ** (A4 מרובה-עמודים, רקע לבן) ו**מובייל** (עמוד אחד ארוך, רקע בהיר).

## איפה הכול
- **ריפו:** `haimorti/education-rights-legacy`, ענף עבודה: **`claude/file-organization-mi6zvd`** (קיים PR #1 פתוח — push לענף מעדכן אותו).
- **תוכן מקור:** `docs/01..08-*.md`.
- **המנגנון:** `pdf-generator/` (base.css, generate.py, pages/app01.py, pages/app02.py, render.js, fonts/, build.sh).
- **תוצרים:** `pdf/<slug>.{desktop,mobile}.pdf`.
- **קוד האתר המקורי** (להעתקת עיצוב!): נמצא ב-**`origin/main`** תחת `shikum-accessibility-main/`. לקרוא רכיב:
  `git show origin/main:shikum-accessibility-main/src/components/<benefit>/<benefit>-accordion.tsx`
  (וכן `-hero.tsx`, `-summary.tsx`, `-toc.tsx`). הענף שלנו לא מכיל את התיקייה — רק origin/main.
  הערה: האתר החי (`shikum-accessibility.vercel.app`) **חסום ב-egress** — אי אפשר לגלוש אליו; משתמשים בקוד המקור בלבד.

## איך בונים
```bash
cd pdf-generator && npm install                      # פעם אחת (playwright-core)
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome ./build.sh 02
# או: ./build.sh 01 02   /   ./build.sh all
```
(אם הסביבה זהה — Chromium כבר שם. אחרת הצבע על דפדפן ב-CHROME_PATH.)

## כללי המוצר (תמצית — הפירוט ב-SPEC.md)
- **נאמנות לאתר:** צבעים primary `hsl(199 89% 48%)`, accent `hsl(38 92% 50%)`, green `hsl(160 84% 36%)`; פונטים **Rubik/Heebo**; RTL. רכיבים: Hero כחול (אייקון+תת-כותרת לבנה, ללא breadcrumb), "בקצרה", כרטיסי סקשן עם **אייקון בכותרת**, צ'קליסט קבלה (כותרת כחולה+פוטר אדום), "חשוב לזכור" (ענבר), "שים לב", טבלאות, פוטר.
- **עמודי זכאות = בנייה ייעודית** (לא רינדור שטוח): משחזרים את ה-component המקורי — כרטיסים ממוספרים (`cond`), תת-כרטיסים זה-לצד-זה (`twoup`), הדגשות (`pill`), תרחישים צבעוניים (`scenario`), מדרגות (`tier`), נכה כללי/נפגע עבודה כתוויות כחולות (`dlabel`).
- **כרטיס הקדמה אחיד** בראש כל עמוד זכאות ("איך נקבעת הזכאות שלך?") + קישור כחול ל-`https://ps.btl.gov.il/#/login`. **בלי CTA תחתון.**
- **שבירת עמודים (דסקטופ בלבד, מתוחם `html[data-variant="desktop"]`):** כרטיסיות לא נחתכות; כותרת נשארת עם התוכן; אוויר בראש עמוד; סקשן גדול מעמוד → מתפצל לכרטיסיות; בעמוד התהליך רקעי-חלקים נסגרים/נפתחים (`box-decoration-break:clone`). **למובייל אסור לכפות שבירה.**
- **מובייל לא נוגעים** בעיצוב שאושר (רקע בהיר, עמוד אחד ארוך).

## איך מוסיפים עמוד זכאות חדש (03–08)
1. `git show origin/main:shikum-accessibility-main/src/components/<benefit>/<benefit>-accordion.tsx` — קרא את המבנה.
2. העתק `pages/app02.py` ל-`pages/app03.py`, עדכן hero (אייקון/כותרת/תת-כותרת) ושחזר את התוכן עם העוזרים:
   `sechead, cond, callout(amber|red|blue), pill, twoup, tier(p|a|d), scenario(muted|blue|amber), innerbox, linkout, checkbullets, dlabel, card, summary, important, intro_card, p, b`.
3. רשום ב-`build.sh` במערך `BESPOKE`.
4. `./build.sh 03` ובדוק דסקטופ+מובייל.

מיפוי slugs ואייקונים/צבעים לכל זכאות (מ-benefits-grid המקורי):
| id | slug | אייקון | צבע |
|----|------|--------|-----|
| 03 | 03-tuition | GraduationCap (cap) | primary |
| 04 | 04-rent-assistance | Home | emerald |
| 05 | 05-travel-expenses | Bus | sky |
| 06 | 06-study-equipment | Package | violet |
| 07 | 07-tutoring | BookOpen | rose |
| 08 | 08-accessibility | Accessibility | teal |
(ההירו עצמו תמיד כחול כמו באתר; הצבע משמש להבחנה ויזואלית עדינה אם בכלל.)

## סטטוס
- ✅ 01 (תהליך) — בנייה ייעודית, ב-pdf/.
- ✅ 02 (דמי שיקום) — בנייה ייעודית, ב-pdf/.
- ⏳ 03–08 — ממתינים לבנייה ייעודית.

## פתוח / TODO
- **תיקון ממתין בדמי שיקום (02)** — המשתמש יפרט בשיחה הבאה. לתקן ב-`pages/app02.py` ו/או `base.css`, ואז `./build.sh 02`.
- פוטר עמוד 01 יושב בעמוד אחרון משלו (מינורי).
- להמשיך 03–08.
