# דוח ביקורת נגישות - אתר שיקום מקצועי לסטודנטים

**תאריך הביקורת:** 15 פברואר 2026
**תקן:** תקן ישראלי 5568 (WCAG 2.0 Level AA)
**כתובת האתר:** שיקום מקצועי לסטודנטים
**סוג האתר:** אתר תוכן מידעי (ללא טפסים, מדיה, תוכן מהבהב)

---

## תקציר מנהלים

### סטטוס כללי: **דורש שיפור** ⚠️

האתר עומד ברמת נגישות בסיסית אך **אינו עומד בדרישות התקן הישראלי 5568 במלואן**.
נמצאו **12 פערי נגישות קריטיים ובינוניים** הדורשים תיקון.

### ציון התאמה: 7/12 (58%)

**פערים קריטיים שנמצאו:** 3
**פערים בעדיפות גבוהה:** 3
**פערים בעדיפות בינונית:** 6

### נקודות חוזק 💪
- ✅ הגדרת שפה תקינה (`lang="he"`, `dir="rtl"`)
- ✅ כותרת עמוד (`<title>`) תיאורית ומשמעותית
- ✅ שימוש ב-Radix UI (ספריית UI נגישה מטבעה)
- ✅ תמיכה בניווט מקלדת בסיסי
- ✅ שימוש ב-ARIA labels במקומות רבים (74 שימושים)
- ✅ focus-visible styles באלמנטים אינטראקטיביים

### פערים קריטיים שדורשים תיקון מיידי 🔴
1. **חסר קישור "דלג לתוכן ראשי"** (Skip Navigation) - דרישה קריטית
2. **חסרה הצהרת נגישות** - דרישה חוקית בישראל
3. **קישורים לא תיאוריים** - מזיקים למשתמשי קוראי מסך
4. **אייקונים דקורטיביים ללא הסתרה** - רעש למשתמשי קוראי מסך
5. **טבלאות ללא כיתוב** (`<caption>`) - קשיי ניווט
6. **דילוג ברמות כותרות** - פוגע בהיררכיה

---

## ממצאים מפורטים - 12 דרישות קריטיות

---

### 1. ניווט מקלדת (Keyboard Navigation) 🔴

**קריטריון WCAG:** 2.1.1, 2.1.2 (Level A)
**סטטוס:** ⚠️ **עובר חלקית**
**חומרה:** בינונית

#### ממצאים:
✅ **עובר:**
- כל הקישורים והכפתורים נגישים במקלדת
- כפתור התפריט הנייד עם `aria-label`
- רכיבי Accordion מבוססי Radix UI (נגישים מטבעם)
- אין keyboard traps

⚠️ **דורש שיפור:**
- אייקונים אינטראקטיביים (Lucide icons) ללא תיאור מפורש:
  - `src/components/site-top-bar.tsx:22` - אייקון Home ללא aria-label עצמאי
  - `src/components/benefits/benefits-grid.tsx:104` - אייקונים בכרטיסיות ללא תיאור

#### המלצות לתיקון:
1. ודא שכל האלמנטים האינטראקטיביים עם `onClick` יש להם גם `onKeyDown`/`onKeyPress`
2. בדוק ידנית עם Tab key את כל הדפים

**עדיפות:** בינונית
**זמן משוער:** 2 שעות

---

### 2. מבנה כותרות (Heading Structure) 🔴

**קריטריון WCAG:** 1.3.1 (Level A)
**סטטוס:** ❌ **נכשל חלקית**
**חומרה:** גבוהה

#### ממצאים:
✅ **עובר:**
- כל דף כולל H1 יחידה ותיאורית:
  - `src/pages/Home.tsx:17` - "שיקום מקצועי לסטודנטים בהשכלה גבוהה"
  - `src/pages/Benefits.tsx` - "מימוש זכאויות"
  - `src/components/application/application-hero.tsx:16` - "הגשת בקשה לאישור לימודים"
  - `src/pages/Contact.tsx:37` - "פרטי קשר"

❌ **נכשל:**
- **דילוג ברמות כותרות** - `src/components/accessibility/accessibility-accordion.tsx:48`:
  ```tsx
  H1 → H2 → H4 (חסר H3)
  ```
  - קפיצה מ-H2 ישירות ל-H4 ב: "תנאי זכאות", "היקף וגובה הסיוע"

- **שימוש לא עקבי בכותרות:**
  - `src/pages/Contact.tsx` - שימוש ב-H2 לכותרות במבנה שטוח (ללא היררכיה ברורה)

#### המלצות לתיקון:
```tsx
// ❌ לפני
<h4 className="text-sm font-bold uppercase">תנאי זכאות</h4>

// ✅ אחרי
<h3 className="text-sm font-bold uppercase">תנאי זכאות</h3>
```

**קבצים לתיקון:**
1. `src/components/accessibility/accessibility-accordion.tsx` - שנה H4 ל-H3
2. בדוק כל הקבצים עם `<h[1-6]>` tags

**עדיפות:** גבוהה
**זמן משוער:** 3 שעות

---

### 3. ניגודיות צבעים (Color Contrast) 🔴

**קריטריון WCAG:** 1.4.3 (Level AA)
**סטטוס:** ⚠️ **דורש בדיקה ידנית**
**חומרה:** קריטית

#### ממצאים:
⚠️ **דורש בדיקה:**
- לא בוצעה בדיקת ניגודיות אוטומטית מלאה
- צבעים בשימוש (מתוך `styles/globals.css`):
  ```css
  --foreground: 220 20% 14%        (טקסט ראשי)
  --background: 210 20% 98%        (רקע ראשי)
  --muted-foreground: 220 10% 46%  (טקסט משני) ⚠️
  --primary: 199 89% 48%           (כחול ראשי)
  ```

❌ **חשד לבעיות:**
- **טקסט משני** (`muted-foreground: 220 10% 46%`) על רקע לבן:
  - יחס ניגודיות משוער: **~4.2:1** - **גבולי** (דרוש 4.5:1)
  - נמצא ב:
    - `src/components/site-top-bar.tsx:28-29` - "שהוכרו כנכים כלליים/נפגעי עבודה"
    - `src/components/benefits/benefits-grid.tsx:134` - תיאורי הזכאויות
    - `src/pages/Home.tsx:22-24` - טקסט מבוא

- **קישורים בפוטר** (`text-muted-foreground`) - יתכן ניגודיות נמוכה

#### המלצות לתיקון:
1. **הרץ בדיקת ניגודיות אוטומטית:**
   - Chrome DevTools > Lighthouse > Accessibility
   - WAVE Browser Extension
   - axe DevTools

2. **תקן צבעי `muted-foreground`:**
   ```css
   /* ❌ לפני */
   --muted-foreground: 220 10% 46%;

   /* ✅ אחרי - כהה יותר */
   --muted-foreground: 220 15% 40%;
   ```

3. **וודא יחס ניגודיות מינימלי:**
   - טקסט רגיל: **4.5:1**
   - טקסט גדול (18pt+): **3:1**

**עדיפות:** קריטית
**זמן משוער:** 4 שעות (כולל בדיקה ותיקון)

---

### 4. קישורים תיאוריים (Descriptive Links) 🔴

**קריטריון WCAG:** 2.4.4 (Level A)
**סטטוס:** ❌ **נכשל**
**חומרה:** גבוהה

#### ממצאים:
❌ **קישורים לא תיאוריים שנמצאו:**

1. **"בדוק כאן"** - `src/pages/Home.tsx:31-32`
   ```tsx
   <a href="/eligibility">בדוק כאן</a>
   ```
   - ❌ לא מתאר את היעד
   - משתמש קורא מסך שומע רק "בדוק כאן" ללא הקשר

2. **"התחל כאן"** - `src/pages/Home.tsx:72`
   ```tsx
   {"התחל כאן"}
   ```
   - ❌ לא ברור לאן הקישור מוביל

3. **"למידע המלא"** - `src/components/benefits/benefits-grid.tsx:111`
   ```tsx
   {"למידע המלא"}
   ```
   - ❌ לא ברור מידע על מה

4. **קישורים חיצוניים ללא סימון:**
   - `src/components/site-footer.tsx:57-60` - קישורים לטפסים ללא ציון "פתיחה בחלון חדש"

#### המלצות לתיקון:

**דוגמה 1 - הוסף הקשר לטקסט הקישור:**
```tsx
// ❌ לפני
<a href="/eligibility">בדוק כאן</a>

// ✅ אחרי
<a href="/eligibility">בדוק את זכאותך לשיקום</a>
```

**דוגמה 2 - השתמש ב-aria-label:**
```tsx
// ❌ לפני
<a href="/application">התחל כאן</a>

// ✅ אחרי
<a href="/application" aria-label="התחל הגשת בקשה לאישור לימודים">
  התחל כאן
</a>
```

**דוגמה 3 - סמן קישורים חיצוניים:**
```tsx
// ✅ טוב
<a href="..." target="_blank" rel="noreferrer">
  טופס בקשה לסיוע במכשירים
  <span className="sr-only"> (נפתח בחלון חדש)</span>
</a>
```

**קבצים לתיקון:**
- `src/pages/Home.tsx`
- `src/components/benefits/benefits-grid.tsx`
- `src/components/site-footer.tsx`

**עדיפות:** גבוהה
**זמן משוער:** 2 שעות

---

### 5. אינדיקטור פוקוס נראה (Focus Visible) 🟡

**קריטריון WCAG:** 2.4.7 (Level AA)
**סטטוס:** ✅ **עובר**
**חומרה:** נמוכה

#### ממצאים:
✅ **עובר:**
- כל הכפתורים כוללים `focus-visible:ring`:
  ```tsx
  // src/components/ui/button.jsx:8
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
  ```
- צבע ה-ring מוגדר ב-CSS: `--ring: 199 89% 48%` (כחול בהיר)

⚠️ **דורש בדיקה ידנית:**
- יש לבדוק ידנית עם Tab key שהאינדיקטור נראה בכל הדפים
- לוודא ניגודיות של 3:1 מול הרקע

#### המלצות:
- **בדוק ידנית:** לחץ Tab ברחבי האתר ווודא אינדיקטור ברור

**עדיפות:** נמוכה (כבר מיושם)
**זמן משוער:** 1 שעה (בדיקה ידנית)

---

### 6. דלג לתוכן ראשי (Skip Navigation) 🔴

**קריטריון WCAG:** 2.4.1 (Level A)
**סטטוס:** ❌ **נכשל**
**חומרה:** קריטית

#### ממצאים:
❌ **חסר לחלוטין:**
- אין קישור "דלג לתוכן ראשי" בתחילת הדף
- חיפוש בקוד אחר "Skip", "skip", "דלג" - לא נמצא

#### השפעה:
- משתמשי מקלדת וקוראי מסך נאלצים לעבור על כל הניווט בכל דף
- פוגע ב-UX של משתמשים עם מוגבלויות

#### המלצות לתיקון:

**שלב 1 - הוסף את הקישור:**
```tsx
// src/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* קישור דלג לתוכן */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        דלג לתוכן הראשי
      </a>

      <SiteTopBar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <BackToTopButton />
      <Toaster />
    </div>
  )
}
```

**שלב 2 - הוסף CSS עזר:**
```css
/* styles/globals.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**קבצים לתיקון:**
- `src/Layout.jsx`
- `styles/globals.css`

**עדיפות:** קריטית
**זמן משוער:** 1 שעה

---

### 7. כותרות עמודים (Page Titles) 🟡

**קריטריון WCAG:** 2.4.2 (Level A)
**סטטוס:** ✅ **עובר**
**חומרה:** נמוכה

#### ממצאים:
✅ **עובר:**
- קיימת כותרת תיאורית: `index.html:8`
  ```html
  <title>שיקום מקצועי לסטודנטים | המדריך שלך</title>
  ```

⚠️ **דורש שיפור:**
- **אותה כותרת בכל הדפים** (SPA ללא עדכון דינמי)
- כותרת צריכה להשתנות לפי הדף הנוכחי

#### המלצות לתיקון:
```tsx
// צור hook לעדכון title
// src/hooks/usePageTitle.js
import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${title} | שיקום מקצועי לסטודנטים`
    return () => {
      document.title = prevTitle
    }
  }, [title])
}

// שימוש בדפים:
// src/pages/Benefits.tsx
export default function BenefitsPage() {
  usePageTitle('מימוש זכאויות')
  // ...
}
```

**עדיפות:** בינונית
**זמן משוער:** 2 שעות

---

### 8. הצהרת שפה (Language Declaration) 🟢

**קריטריון WCAG:** 3.1.1, 3.1.2 (Level A, AA)
**סטטוס:** ✅ **עובר**
**חומרה:** נמוכה

#### ממצאים:
✅ **עובר במלואו:**
```html
<!-- index.html:2 -->
<html lang="he" dir="rtl">
```

- ✅ `lang="he"` - מזהה את השפה כעברית
- ✅ `dir="rtl"` - כיוון כתיבה מימין לשמאל

⚠️ **לשיקול:**
- מספרי טלפון בכיוון LTR: `src/pages/Contact.tsx:98`
  ```tsx
  <td dir="ltr">{worker.phone}</td>
  ```
  ✅ זה נכון ומומלץ

**עדיפות:** ללא
**זמן משוער:** 0 שעות (כבר מיושם)

---

### 9. תיאור אייקונים (Icon Descriptions) 🔴

**קריטריון WCAG:** 1.1.1 (Level A)
**סטטוס:** ❌ **נכשל חלקית**
**חומרה:** גבוהה

#### ממצאים:

✅ **עובר:**
- כפתורים עם אייקונים וטקסט - תקינים
- כפתור Back to Top: `src/components/back-to-top-button.tsx:27`
  ```tsx
  <button aria-label="Back to top">
    <ChevronUp className="h-5 w-5" />
  </button>
  ```
  (⚠️ אבל ב-**אנגלית** - צריך תרגום)

❌ **נכשל:**

1. **אייקונים דקורטיביים ללא `aria-hidden`:**
   - כל האייקונים מ-Lucide נקראים על ידי קוראי מסך מיותר:
     ```tsx
     // ❌ src/components/benefits/benefits-grid.tsx:104
     <Icon className={`h-6 w-6`} />
     // קורא מסך יקריא: "wallet icon" או "bus icon"
     ```

2. **אייקונים פונקציונליים ללא תיאור:**
   - `src/components/site-top-bar.tsx:22` - אייקון Home בלוגו
   - `src/components/benefits/benefits-grid.tsx:64` - ExternalLink icon

#### המלצות לתיקון:

**כלל אצבע:**
- אייקון **דקורטיבי** (יש טקסט לידו) → `aria-hidden="true"`
- אייקון **פונקציונלי** (ללא טקסט) → `aria-label`

**דוגמאות:**

```tsx
// ✅ אייקון דקורטיבי - הוסף aria-hidden
<Bus className="h-5 w-5" aria-hidden="true" />
<span>הוצאות נסיעה</span>

// ✅ אייקון פונקציונלי - הוסף aria-label
<ExternalLink className="h-3.5 w-3.5" aria-label="קישור חיצוני" />

// ✅ כפתור עם אייקון בלבד
<button aria-label="חזרה לראש הדף">
  <ChevronUp className="h-5 w-5" aria-hidden="true" />
</button>
```

**תיקון גלובלי - צור wrapper:**
```tsx
// src/components/ui/icon.tsx
export function DecorativeIcon({ icon: Icon, ...props }) {
  return <Icon aria-hidden="true" {...props} />
}

export function FunctionalIcon({ icon: Icon, label, ...props }) {
  return <Icon aria-label={label} role="img" {...props} />
}
```

**קבצים לתיקון:**
- `src/components/benefits/benefits-grid.tsx` - כל האייקונים
- `src/components/accessibility/accessibility-accordion.tsx` - כל האייקונים
- `src/components/back-to-top-button.tsx` - תרגום לעברית
- `src/components/site-footer.tsx` - ExternalLink icons

**עדיפות:** גבוהה
**זמן משוער:** 4 שעות

---

### 10. HTML תקין (Valid HTML) 🟢

**קריטריון WCAG:** 4.1.1, 4.1.2 (Level A)
**סטטוס:** ✅ **עובר ככל הנראה**
**חומרה:** נמוכה

#### ממצאים:
✅ **טוב:**
- לא נמצאו duplicate IDs בקוד שנבדק
- שימוש נכון בתגיות סמנטיות: `<header>`, `<nav>`, `<main>`, `<footer>`
- ARIA attributes נראים תקינים

⚠️ **דורש וולידציה:**
- לא הורצה W3C HTML Validator
- מומלץ להריץ: https://validator.w3.org/

#### המלצות:
1. הרץ build: `npm run build`
2. הרץ validator על ה-HTML המתקבל
3. תקן שגיאות אם יימצאו

**עדיפות:** נמוכה
**זמן משוער:** 1 שעה

---

### 11. הצהרת נגישות (Israeli Requirement) 🔴

**דרישה:** חוק שוויון זכויות לאנשים עם מוגבלות (תקנות התאמת נגישות לשירות)
**סטטוס:** ❌ **נכשל**
**חומרה:** קריטית (דרישה חוקית)

#### ממצאים:
❌ **חסר לחלוטין:**
- אין קישור להצהרת נגישות בפוטר
- אין עמוד הצהרת נגישות
- חיפוש אחר "נגישות", "accessibility statement", "הצהרת" - לא נמצא

#### השפעה:
- **אי עמידה בדרישה חוקית בישראל**
- חוסר שקיפות כלפי משתמשים עם מוגבלויות

#### המלצות לתיקון:

**שלב 1 - הוסף קישור בפוטר:**
```tsx
// src/components/site-footer.tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      {/* ... תוכן קיים ... */}

      <div className="border-t border-border pt-6">
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="/accessibility-statement"
            className="text-foreground underline hover:text-primary"
          >
            הצהרת נגישות
          </a>
          <a
            href="/privacy"
            className="text-muted-foreground hover:text-foreground"
          >
            מדיניות פרטיות
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**שלב 2 - צור עמוד הצהרת נגישות:**
```tsx
// src/pages/AccessibilityStatement.tsx
export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">הצהרת נגישות</h1>

        <section className="space-y-6">
          <div>
            <h2 className="mb-3 text-2xl font-bold">מחויבות לנגישות</h2>
            <p className="leading-relaxed text-muted-foreground">
              אתר "שיקום מקצועי לסטודנטים" מחויב להנגיש את שירותיו לכלל
              האוכלוסייה, לרבות אנשים עם מוגבלויות. האתר פועל על פי הנחיות
              התקן הישראלי (ת"י 5568) ברמת AA, המבוסס על WCAG 2.0.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold">התאמות נגישות שבוצעו</h2>
            <ul className="list-disc space-y-2 pr-6">
              <li>ניווט מלא באמצעות מקלדת</li>
              <li>תמיכה בקוראי מסך</li>
              <li>מבנה כותרות היררכי</li>
              <li>ניגודיות צבעים מתאימה</li>
              <li>טקסט תיאורי בקישורים</li>
              <li>תמיכה בהגדלת גופנים</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold">רכז/ת נגישות</h2>
            <p className="leading-relaxed text-muted-foreground">
              שם: [השלם]<br />
              טלפון: [השלם]<br />
              דוא"ל: <a href="mailto:accessibility@example.com" className="text-primary underline">
                accessibility@example.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold">דיווח על בעיות נגישות</h2>
            <p className="leading-relaxed text-muted-foreground">
              נתקלת בבעיית נגישות באתר? נשמח לקבל פניה ולטפל בה בהקדם.
              ניתן לפנות אלינו ב:
            </p>
            <ul className="mt-3 space-y-2">
              <li>📧 דוא"ל: accessibility@example.com</li>
              <li>📞 טלפון: 03-1234567</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-bold">עדכון אחרון</h2>
            <p className="text-muted-foreground">
              הצהרה זו עודכנה לאחרונה בתאריך: {new Date().toLocaleDateString('he-IL')}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
```

**שלב 3 - הוסף לראוטינג:**
```tsx
// src/pages.config.js
export const pagesConfig = {
  Pages: {
    // ... דפים קיימים
    'accessibility-statement': () => import('@/pages/AccessibilityStatement'),
  }
}
```

**עדיפות:** קריטית (חובה חוקית)
**זמן משוער:** 3 שעות

---

### 12. ניווט עקבי (Consistent Navigation) 🟡

**קריטריון WCAG:** 3.2.3, 3.2.4 (Level AA)
**סטטוס:** ✅ **עובר**
**חומרה:** נמוכה

#### ממצאים:
✅ **עובר:**
- הניווט העליון זהה בכל הדפים (`SiteTopBar`)
- הפוטר זהה בכל הדפים (`SiteFooter`)
- סדר הקישורים בניווט עקבי

⚠️ **דורש בדיקה ידנית:**
- יש לבדוק שהניווט זהה בכל הדפים
- לוודא שאין שינויים במיקום או סדר

**עדיפות:** נמוכה
**זמן משוער:** 30 דקות (בדיקה ידנית)

---

## סיכום פערים לפי חומרה

### 🔴 קריטי - תקן מיידית

| # | פער | קריטריון | קובץ | זמן |
|---|-----|----------|------|-----|
| 1 | חסר קישור "דלג לתוכן" | 2.4.1 | `Layout.jsx` | 1 שעה |
| 2 | חסרה הצהרת נגישות | חוק ישראלי | צור דף חדש | 3 שעות |
| 3 | ניגודיות צבעים | 1.4.3 | `globals.css` | 4 שעות |

**סה"כ זמן משוער:** 8 שעות

---

### 🟠 גבוה - תקן השבוע

| # | פער | קריטריון | קובץ | זמן |
|---|-----|----------|------|-----|
| 4 | דילוג ברמות כותרות | 1.3.1 | `accessibility-accordion.tsx` | 3 שעות |
| 5 | קישורים לא תיאוריים | 2.4.4 | מספר קבצים | 2 שעות |
| 6 | אייקונים ללא תיאור | 1.1.1 | כל הקבצים | 4 שעות |

**סה"כ זמן משוער:** 9 שעות

---

### 🟡 בינוני - תקן החודש

| # | פער | קריטריון | קובץ | זמן |
|---|-----|----------|------|-----|
| 7 | כותרות דינמיות | 2.4.2 | צור hook | 2 שעות |
| 8 | תרגום aria-labels לעברית | - | `back-to-top-button.tsx` | 1 שעה |
| 9 | הוסף `<caption>` לטבלאות | 1.3.1 | `Contact.tsx` | 1 שעה |
| 10 | בדיקת HTML validity | 4.1.1 | כל האתר | 1 שעה |
| 11 | בדיקת פוקוס ידנית | 2.4.7 | כל האתר | 1 שעה |
| 12 | בדיקת ניווט עקבי | 3.2.3 | כל האתר | 30 דק' |

**סה"כ זמן משוער:** 6.5 שעות

---

## תוכנית עבודה מומלצת

### שבוע 1 - פערים קריטיים (8 שעות)
**יום 1-2:**
- [ ] הוסף קישור "דלג לתוכן ראשי" + CSS
- [ ] תקן ניגודיות צבעים (`muted-foreground`)
- [ ] הרץ בדיקת ניגודיות אוטומטית (Lighthouse)

**יום 3-4:**
- [ ] צור עמוד הצהרת נגישות
- [ ] הוסף קישור בפוטר
- [ ] מלא פרטי רכז/ת נגישות

**יום 5:**
- [ ] בדיקת QA לשינויים
- [ ] commit + push

---

### שבוע 2 - פערים בעדיפות גבוהה (9 שעות)

**יום 1:**
- [ ] תקן מבנה כותרות - שנה H4→H3 ב-`accessibility-accordion.tsx`
- [ ] בדוק מבנה כותרות בכל הדפים

**יום 2:**
- [ ] תקן קישורים לא תיאוריים:
  - [ ] "בדוק כאן" → "בדוק את זכאותך לשיקום"
  - [ ] "התחל כאן" → הוסף aria-label
  - [ ] "למידע המלא" → הוסף הקשר

**יום 3-4:**
- [ ] הוסף `aria-hidden="true"` לכל האייקונים הדקורטיביים
- [ ] הוסף `aria-label` לאייקונים פונקציונליים
- [ ] צור component עזר `DecorativeIcon` / `FunctionalIcon`

**יום 5:**
- [ ] בדיקת QA
- [ ] commit + push

---

### שבוע 3 - פערים בינוניים (6.5 שעות)

**יום 1:**
- [ ] צור `usePageTitle` hook
- [ ] הוסף לכל הדפים

**יום 2:**
- [ ] תרגם כל ה-aria-labels לעברית
- [ ] הוסף `<caption>` לטבלאות ב-Contact

**יום 3:**
- [ ] הרץ W3C HTML Validator
- [ ] תקן שגיאות שנמצאו

**יום 4:**
- [ ] בדיקה ידנית מקיפה:
  - [ ] Tab בכל הדפים
  - [ ] בדוק פוקוס
  - [ ] בדוק ניווט עקבי

**יום 5:**
- [ ] בדיקת QA סופית
- [ ] הרץ מחדש Lighthouse
- [ ] commit + push
- [ ] **דוח סיום** ✅

---

## כלים מומלצים לבדיקה

### בדיקות אוטומטיות
1. **Chrome Lighthouse** (מובנה)
   ```bash
   npm run build
   npx serve dist
   # פתח DevTools > Lighthouse > Accessibility
   ```

2. **axe DevTools** (תוסף Chrome)
   - התקן: https://www.deque.com/axe/devtools/
   - הרץ בכל דף

3. **WAVE** (תוסף Chrome)
   - התקן: https://wave.webaim.org/extension/

### בדיקות ידניות
1. **ניווט מקלדת:**
   - השתמש רק ב-Tab, Enter, Space, Arrows
   - ללא עכבר למשך 10 דקות

2. **קורא מסך:**
   - NVDA (Windows, חינמי): https://www.nvaccess.org/
   - VoiceOver (Mac, מובנה): Cmd+F5

3. **בדיקת ניגודיות:**
   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
   - Colour Contrast Analyser: https://www.tpgi.com/color-contrast-checker/

---

## נספח - קבצים שדורשים תיקון

### עדיפות קריטית 🔴
1. `src/Layout.jsx` - הוסף Skip Navigation
2. `styles/globals.css` - תקן ניגודיות `--muted-foreground`
3. `src/pages/AccessibilityStatement.tsx` - **צור קובץ חדש**
4. `src/components/site-footer.tsx` - הוסף קישור להצהרה

### עדיפות גבוהה 🟠
5. `src/components/accessibility/accessibility-accordion.tsx` - תקן H4→H3
6. `src/pages/Home.tsx` - תקן קישורים לא תיאוריים
7. `src/components/benefits/benefits-grid.tsx` - אייקונים + קישורים
8. `src/components/application/application-hero.tsx` - בדוק כותרות
9. `src/pages/Contact.tsx` - הוסף `<caption>` לטבלאות

### עדיפות בינונית 🟡
10. `src/hooks/usePageTitle.js` - **צור קובץ חדש**
11. `src/components/back-to-top-button.tsx` - תרגום לעברית
12. כל הקבצים - הוסף `aria-hidden` לאייקונים

---

## המלצות נוספות (מעבר לדרישות התקן)

### שיפורים מומלצים
1. **Landmarks ברורים:**
   ```tsx
   <nav aria-label="ניווט ראשי">
   <aside aria-label="תוכן עניינים">
   <section aria-labelledby="benefits-title">
   ```

2. **Live regions להודעות:**
   ```tsx
   <div role="status" aria-live="polite">
     הטופס נשלח בהצלחה
   </div>
   ```

3. **הגדלת גופנים:**
   - ודא שהאתר עובד עד 200% zoom
   - השתמש ב-rem במקום px

4. **מצב ניגודיות גבוהה:**
   - הוסף CSS למצב Windows High Contrast
   ```css
   @media (prefers-contrast: high) {
     /* סגנונות מותאמים */
   }
   ```

5. **Reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## סיכום

האתר "שיקום מקצועי לסטודנטים" נמצא ברמת נגישות **בסיסית-בינונית** אך **אינו עומד בתקן הישראלי 5568 במלואו**.

### נקודות חיוביות:
- ✅ תשתית טובה (React + Radix UI)
- ✅ מודעות לנגישות (74 ARIA attributes)
- ✅ הצהרת שפה תקינה

### פערים קריטיים:
- ❌ חסר Skip Navigation (חובה)
- ❌ חסרה הצהרת נגישות (חובה חוקית)
- ❌ בעיות ניגודיות פוטנציאליות
- ❌ אייקונים ללא הסתרה/תיאור
- ❌ קישורים לא תיאוריים

### זמן מוערך לתיקון מלא:
**23.5 שעות** (כ-3 ימי עבודה)

### המלצה:
**התחל בפערים הקריטיים השבוע, והמשך בפערים הנוספים בהדרגה.**
תוך 3 שבועות האתר יכול להיות **fully compliant** עם ת"י 5568.

---

**סוף הדוח**

*נוצר בתאריך: 15 פברואר 2026*
*על ידי: Claude (AI Accessibility Auditor)*
*גרסת תקן: ת"י 5568 (WCAG 2.0 Level AA)*
