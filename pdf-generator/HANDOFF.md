# HANDOFF — המשך עבודה על מחולל מדריכי ה-PDF

מסמך העברה להמשכיות בשיחה חדשה. קרא גם את [`README.md`](./README.md) ו-[`SPEC.md`](./SPEC.md).

## מה הפרויקט
הפקת מדריכי **PDF נאמנים לאתר** "שיקום מקצועי לסטודנטים" מתוך תוכן הזכאויות, להעברה למבוטחים ב**אימייל ובפגישה** (אי אפשר להטמיע אתר חיצוני בארגון). לכל מדריך **2 קבצים**: **דסקטופ** (A4 מרובה-עמודים, רקע לבן) ו**מובייל** (עמוד אחד ארוך, רקע בהיר).

## איפה הכול
- **ריפו:** `haimorti/education-rights-legacy`, ענף עבודה: **`claude/great-bell-27vifj`**.
- **תוכן מקור:** `docs/01..08-*.md`.
- **המנגנון:** `pdf-generator/` (base.css, generate.py, pages/app01.py, app02.py, app03.py, render.js, fonts/, build.sh).
- **תוצרים:** `pdf/desktop/<slug>.pdf` ו-`pdf/mobile/<slug>.pdf` (מאורגנים בתת-תיקיות לפי גרסה).
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
2. העתק `pages/app03.py` (תבנית עדכנית) ל-`pages/appNN.py`, עדכן hero (אייקון/כותרת/תת-כותרת) ושחזר את התוכן עם העוזרים:
   `acc(icon,title,*parts)` — **כל סקשן ראשי נארז ב-acc** (כרטיסיית אקורדיון לבנה כמו במקור); ובתוכו
   `cond, callout(amber|red|blue), pill, twoup, tier(p|a|d), scenario(muted|blue|amber), innerbox, linkout, checkrow, checkbullets, dlabel, graybox, doccard, bigbtn, summary, important, intro_card, p, b`.
   - **כפתור "שליחת מסמכים"**: `bigbtn("שליחת מסמכים לעו״ס השיקום")` — רק אם בעמוד המקורי `<BenefitActionButtons showSendDocuments />` (כמו בשכר לימוד). מקשר ל-`DocumentsInfo.aspx`.
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
- ✅ 01 (תהליך) — בנייה ייעודית.
- ✅ 02 (דמי שיקום) — בנייה ייעודית. כל הסקשנים ארוזים ב-`acc` (כרטיסיית אקורדיון לבנה נאמנה למקור).
- ✅ 03 (שכר לימוד) — בנייה ייעודית, כולל צ'קליסט קבלה וכפתור "שליחת מסמכים".
- ⏳ 04–08 — ממתינים לבנייה ייעודית (תבנית: `pages/app03.py`).

## עדכון מבנה (אחרון)
- **`.acc`** ב-`base.css` — כרטיסיית אקורדיון לבנה שעוטפת כל סקשן ראשי, עם `box-decoration-break:clone`
  (בדסקטופ הכרטיס נסגר בתחתית עמוד ונפתח מחדש בראש הבא; במובייל כרטיס רציף). זה הסטנדרט החדש לכל עמודי הזכאות.
- **תוצרים מאורגנים בתת-תיקיות:** `pdf/desktop/` ו-`pdf/mobile/` (לא יותר סיומת `.desktop`/`.mobile` בשם הקובץ).

## פתוח / TODO
- פוטר עמוד 01 יושב בעמוד אחרון משלו (מינורי; קיים גם דפוס דומה אם עמוד מסתיים בדיוק בגבול).
- להמשיך 04–08.
