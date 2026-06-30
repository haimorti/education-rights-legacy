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
- **הערת זכאות אחידה** (`elig_note`) — מסגרת "שים לב" דקה (סגנון האתר, **בלי משולש**) מתחת ל"בקצרה": הזכאות נקבעת אישית ע"י עובד השיקום לפי קריטריונים, ואישור התוכנית אינו מבטיח אותה. כולל קישור ל-`ps.btl.gov.il`. **בלי CTA תחתון.** (החליף את כרטיס ההקדמה הלבן הגדול שהיה בראש העמוד.)
- **שבירת עמודים (דסקטופ בלבד, מתוחם `html[data-variant="desktop"]`):** כרטיסיות לא נחתכות; כותרת נשארת עם התוכן; אוויר בראש עמוד; סקשן גדול מעמוד → מתפצל לכרטיסיות; בעמוד התהליך רקעי-חלקים נסגרים/נפתחים (`box-decoration-break:clone`). **למובייל אסור לכפות שבירה.**
- **מובייל לא נוגעים** בעיצוב שאושר (רקע בהיר, עמוד אחד ארוך).

## איך מוסיפים עמוד זכאות חדש (03–08)
1. `git show origin/main:shikum-accessibility-main/src/components/<benefit>/<benefit>-accordion.tsx` — קרא את המבנה.
2. העתק `pages/app04.py` (תבנית עדכנית — הכי הרבה רכיבים) ל-`pages/appNN.py`, עדכן hero (אייקון/כותרת/תת-כותרת),
   והרכב את הגוף: `summary()` → `elig_note()` → סקשנים. **כל סקשן ראשי נארז ב-`acc(icon,title,*parts)`**, ובתוכו העוזרים:
   `cond, callout(blue|amber|red), pill, twoup/minicard, tier, scenario, innerbox, linkin/linkout, iconrow/checkrow,
   dlabel, graybox, doccard, statgrid/statcard, exbox/extile, bigbtn, important, p, b`. (לא כל עזר קיים בכל קובץ — העתק מ-app04/app02 לפי הצורך.)
   - **כפתור "שליחת מסמכים"**: `bigbtn("שליחת מסמכים לעו״ס השיקום")` — רק אם בעמוד המקורי `<BenefitActionButtons showSendDocuments />`. מקשר ל-`DocumentsInfo.aspx`.
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
- ✅ 02 (דמי שיקום) — בנייה ייעודית. כל הסקשנים ב-`acc`.
- ✅ 03 (שכר לימוד) — בנייה ייעודית, כולל צ'קליסט קבלה וכפתור "שליחת מסמכים".
- ✅ 04 (שכר דירה) — בנייה ייעודית, כולל כרטיסי-סכום (statcard) ותיבת דוגמה (exbox) וכפתור.
- ⏳ 05–08 — ממתינים לבנייה ייעודית (תבנית: `pages/app04.py` — העדכנית ביותר).

## מוסכמות עיצוב שנלמדו (חשוב — לשמור אחידות!)
- **סדר ראש העמוד:** קודם `summary()` ("בקצרה"), אחר כך `elig_note()` (הערת זכאות על קביעה אישית), ואז הסקשנים.
  - **עיצוב ההערה שנבחר:** פס ענבר דק בצד, **בלי מסגרת** (מחלקת `.eligbar`). מיושם כרגע על **02 בלבד** (לאישור) — להחיל על 03/04 וכל החדשים. (היו וריאציות נוספות; `.notice` האדומה היא הגרסה הישנה שעדיין על 03/04 עד ההחלה.)
- **כל סקשן ראשי = `acc(icon,title,*parts)`** — כרטיסיית אקורדיון לבנה (`.acc` ב-base.css) עם `box-decoration-break:clone`:
  בדסקטופ הכרטיס נסגר בתחתית עמוד ונפתח מחדש בראש הבא; במובייל כרטיס רציף. סקשן גדול מתפצל בין עמודים בלי להיחתך.
- **מוסכמת callout (אחידה ל-02/03/04):**
  - מידע רך/נייטרלי (`bg-accent/10` במקור) → `callout("blue", txt, "info")` (תיבה לבנה, אייקון info כחול).
  - "שים לב" להדגשה (`border-2 accent` במקור) → `callout("amber", b("שים לב: ")+txt, "alert")`.
  - איסור/אזהרה חמורה (`destructive`) → `callout("red", ..., "alert")`.
- **כפתור "שליחת מסמכים"** (`bigbtn`) — רק אם בעמוד המקורי `<BenefitActionButtons showSendDocuments />`
  (יש ב-03 שכר לימוד, 04 שכר דירה; **אין** ב-02 דמי שיקום). מקשר ל-`DocumentsInfo.aspx`.
- **קישורים:** לשלב כל `href` שמופיע ב-component המקורי — inline באמצע משפט עם `linkin(url,text)` (קו תחתון + אייקון ext),
  או בתחתית תיבה עם `linkout`. תמיד לבדוק: `git show origin/main:.../<benefit>-accordion.tsx | grep href`.

## רכיבי base.css משותפים שנוספו השיחה
- `.acc`/`.acc-h` — כרטיסיית אקורדיון לבנה (ראו למעלה).
- `.checkrow` — שורת אייקון (✓/info) + טקסט (בלי תיבה). עוזר: `iconrow(icon,html)`.
- `.statcard`/`.statgrid` (+`.accent`) — כרטיס סכום עם מספר גדול (`.big`) ו"אותיות קטנות" (`.fine`).
- `.exbox`/`.extiles`/`.extile`(+`.hl`) — תיבת "דוגמה להמחשה" עם אריחי-סטטיסטיקה.
- `.linkin` — קישור inline מודגש עם אייקון ext.
- `.notice` — מסגרת "שים לב" דקה (גבול אדום עדין, רקע ורדרד), בלי אייקון. עוזר: `elig_note()`.
- **כל יחידה אטומית חדשה צריכה להופיע ברשימת `break-inside:avoid` שב-@media print**, אחרת תיחתך בין עמודים.

## מבנה תוצרים
- `pdf/desktop/<slug>.pdf` (A4) ו-`pdf/mobile/<slug>.pdf` (עמוד ארוך). render.js יוצר את תת-התיקיות אוטומטית.

## פתוח / TODO
- פוטר/"חשוב לזכור" לעיתים נדחפים לעמוד אחרון כמעט-ריק (מינורי).
- להמשיך 05–08 (הבא: 05 הוצאות נסיעה, אייקון Bus).
