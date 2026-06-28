# תוכנית עבודה מפורטת - סגירת פערי נגישות

**פרויקט:** שיקום מקצועי לסטודנטים
**תאריך:** 15 פברואר 2026
**זמן כולל משוער:** 23.5 שעות (3 ימי עבודה)

---

## 📋 סטטוס כללי

**פערים שנמצאו:** 12
- 🔴 קריטי: 3 (8 שעות)
- 🟠 גבוה: 3 (9 שעות)
- 🟡 בינוני: 6 (6.5 שעות)

**התקדמות:** ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0%

---

## 🚨 שבוע 1: פערים קריטיים (8 שעות)

### יום 1 - קישור "דלג לתוכן" (2 שעות)

**מטרה:** הוסף Skip Navigation Link
**קריטריון WCAG:** 2.4.1 (Level A)

#### שלב 1.1 - הוסף CSS Helper Classes (15 דקות)
```bash
# עדכן: styles/globals.css
```

```css
/* הוסף בסוף הקובץ */

/* Screen reader only - מוסתר מהמסך, נגיש לקוראי מסך */
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

/* מופיע כשמקבל focus */
.sr-only:focus,
.sr-only:active {
  position: fixed;
  width: auto;
  height: auto;
  padding: 0.75rem 1.5rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  z-index: 9999;
}
```

**✅ Checklist:**
- [ ] פתח `styles/globals.css`
- [ ] הוסף את ה-CSS למטה
- [ ] שמור

---

#### שלב 1.2 - עדכן Layout Component (30 דקות)
```bash
# עדכן: src/Layout.jsx
```

```jsx
import { SiteFooter } from "@/components/site-footer"
import { SiteTopBar } from "@/components/site-top-bar"
import { BackToTopButton } from "@/components/back-to-top-button"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== הוסף מכאן ===== */}
      <a
        href="#main-content"
        className="sr-only focus:top-4 focus:right-4 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        דלג לתוכן הראשי
      </a>
      {/* ===== עד כאן ===== */}

      <SiteTopBar />

      {/* ===== הוסף id ו-tabIndex ל-main ===== */}
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

**✅ Checklist:**
- [ ] פתח `src/Layout.jsx`
- [ ] הוסף קישור Skip Navigation **לפני** `<SiteTopBar />`
- [ ] הוסף `id="main-content"` ל-`<main>`
- [ ] הוסף `tabIndex={-1}` ל-`<main>`
- [ ] שמור

---

#### שלב 1.3 - בדיקת QA (15 דקות)
```bash
npm run dev
```

**✅ Checklist:**
- [ ] פתח דפדפן: http://localhost:5173
- [ ] לחץ `Tab` פעם אחת
- [ ] האם הקישור "דלג לתוכן הראשי" מופיע?
- [ ] לחץ `Enter` על הקישור
- [ ] האם הפוקוס קפץ לתוכן הראשי?
- [ ] בדוק בכל הדפים (Home, Benefits, Application, Contact)

---

#### שלב 1.4 - Commit (5 דקות)
```bash
git add src/Layout.jsx styles/globals.css
git commit -m "feat: add skip navigation link for accessibility (WCAG 2.4.1)"
```

**🎯 תוצאה:** קישור "דלג לתוכן ראשי" עובד בכל הדפים

---

### יום 2 - תיקון ניגודיות צבעים (4 שעות)

**מטרה:** וודא יחס ניגודיות מינימלי 4.5:1
**קריטריון WCAG:** 1.4.3 (Level AA)

#### שלב 2.1 - הרץ Lighthouse Audit (30 דקות)
```bash
npm run build
npx serve dist -p 3000
```

פתח Chrome DevTools:
1. `F12` → `Lighthouse` tab
2. בחר: ✅ Accessibility בלבד
3. Device: Desktop
4. לחץ `Analyze page load`

**✅ Checklist:**
- [ ] הרץ Lighthouse על דף הבית
- [ ] צור screenshot של התוצאות
- [ ] רשום את כל שגיאות הניגודיות
- [ ] הרץ גם על: Benefits, Application, Contact

---

#### שלב 2.2 - תיקון צבע muted-foreground (1 שעה)
```bash
# עדכן: styles/globals.css
```

**בעיה:** `--muted-foreground: 220 10% 46%` - יחס ניגודיות נמוך מדי

**פתרון:**
```css
/* ❌ לפני */
--muted-foreground: 220 10% 46%;

/* ✅ אחרי - כהה יותר לניגודיות טובה יותר */
--muted-foreground: 220 15% 37%;
```

**בדיקה:**
- צבע ישן: `hsl(220, 10%, 46%)` = `#6b7280`
- צבע חדש: `hsl(220, 15%, 37%)` = `#515968`
- יחס ניגודיות על רקע לבן: **7.2:1** ✅ (מעל 4.5:1)

**✅ Checklist:**
- [ ] פתח `styles/globals.css`
- [ ] מצא את `--muted-foreground`
- [ ] שנה ל-`220 15% 37%`
- [ ] שמור

---

#### שלב 2.3 - בדיקת צבעים נוספים (1.5 שעות)

בדוק ידנית עם https://webaim.org/resources/contrastchecker/

**צבעים לבדיקה:**
1. **Primary על רקע לבן:**
   - `--primary: 199 89% 48%` = `#0ea5e9`
   - רקע: `#FFFFFF`
   - יחס נדרש: 4.5:1 (טקסט רגיל) או 3:1 (טקסט גדול/כפתורים)

2. **Accent על רקע לבן:**
   - `--accent: 38 92% 50%` = `#f59e0b`
   - רקע: `#FFFFFF`

3. **טקסט על רקע Primary:**
   - `--primary-foreground: 0 0% 100%` = `#FFFFFF`
   - רקע: `hsl(199 89% 48%)`

**אם יחס < 4.5:1, כהה את הצבע:**
```css
/* דוגמה */
--problematic-color: 200 80% 55%; /* ❌ יחס 3.2:1 */
--fixed-color: 200 80% 45%;      /* ✅ יחס 4.8:1 */
```

**✅ Checklist:**
- [ ] בדוק כל צבע עם Contrast Checker
- [ ] רשום את היחסים
- [ ] תקן צבעים שנכשלו
- [ ] הרץ מחדש `npm run dev` ובדוק ויזואלית

---

#### שלב 2.4 - בדיקת QA מלאה (45 דקות)
```bash
npm run dev
```

**בדוק בכל דף:**
- [ ] טקסט ראשי (foreground) - קריא?
- [ ] טקסט משני (muted-foreground) - קריא?
- [ ] קישורים (primary) - בולטים?
- [ ] כפתורים (primary + primary-foreground) - קריאים?
- [ ] טקסט על כרטיסיות (cards) - קריא?

---

#### שלב 2.5 - Commit (15 דקות)
```bash
git add styles/globals.css
git commit -m "fix: improve color contrast ratios for WCAG AA compliance (1.4.3)"
```

**🎯 תוצאה:** כל הטקסטים עומדים ביחס ניגודיות 4.5:1

---

### יום 3-4 - הצהרת נגישות (3 שעות)

**מטרה:** צור עמוד הצהרת נגישות חוקי
**דרישה:** חוק שוויון זכויות לאנשים עם מוגבלות

#### שלב 3.1 - צור קובץ הצהרה (1 שעה)
```bash
# צור: src/pages/AccessibilityStatement.tsx
```

```tsx
import { Shield, Check, Mail, Phone, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AccessibilityStatementPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            הצהרת נגישות
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            מחויבותנו להנגיש את האתר לכלל האוכלוסייה
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-8">

          {/* מחויבות */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">מחויבות לנגישות</h2>
            <Card>
              <CardContent className="p-6">
                <p className="leading-relaxed text-muted-foreground">
                  אתר "שיקום מקצועי לסטודנטים" מחויב להנגיש את שירותיו לכלל האוכלוסייה,
                  לרבות אנשים עם מוגבלויות. האתר פועל על פי הנחיות התקן הישראלי (ת"י 5568)
                  המבוסס על הנחיות WCAG 2.0 ברמת AA, ומיישם את הוראות חוק שוויון זכויות
                  לאנשים עם מוגבלות, התשנ"ח-1998.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* התאמות */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">התאמות נגישות שבוצעו באתר</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "ניווט מלא באמצעות מקלדת",
                "תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)",
                "מבנה כותרות היררכי ומסודר",
                "ניגודיות צבעים מתאימה לתקן",
                "טקסט תיאורי בכל הקישורים",
                "קישור 'דלג לתוכן ראשי'",
                "תמיכה בהגדלת טקסט עד 200%",
                "אינדיקטור פוקוס ברור ונראה",
              ].map((item) => (
                <Card key={item}>
                  <CardContent className="flex items-start gap-3 p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* רכז/ת נגישות */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">רכז/ת נגישות</h2>
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">דוא"ל</p>
                      <a
                        href="mailto:accessibility@example.com"
                        className="text-lg font-bold text-primary hover:underline"
                      >
                        accessibility@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                      <a
                        href="tel:031234567"
                        className="text-lg font-bold text-foreground"
                        dir="ltr"
                      >
                        03-1234567
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* דיווח על בעיות */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-foreground">דיווח על בעיות נגישות</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  נתקלת בבעיית נגישות באתר? נשמח לקבל פניה ולטפל בה בהקדם האפשרי.
                  אנו מתחייבים לטפל בכל פניה תוך 7 ימי עבודה.
                </p>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="font-medium text-foreground">ניתן לפנות אלינו ב:</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>📧 דוא"ל: accessibility@example.com</li>
                    <li>📞 טלפון: 03-1234567</li>
                    <li>⏰ ימים א'-ה', 09:00-17:00</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* עדכון אחרון */}
          <section>
            <Card className="border-primary/30">
              <CardContent className="flex items-center gap-4 p-6">
                <Calendar className="h-8 w-8 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">עדכון אחרון</h3>
                  <p className="text-lg font-bold text-foreground">
                    {new Date().toLocaleDateString('he-IL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>
    </div>
  )
}
```

**✅ Checklist:**
- [ ] צור קובץ `src/pages/AccessibilityStatement.tsx`
- [ ] העתק את הקוד למעלה
- [ ] **עדכן** את כתובת המייל והטלפון לפרטים אמיתיים
- [ ] שמור

---

#### שלב 3.2 - הוסף לראוטינג (15 דקות)
```bash
# עדכן: src/pages.config.js (או הקובץ המקביל)
```

בדוק איך מוסיפים דפים בפרויקט שלך ו הוסף:
```js
'accessibility-statement': () => import('@/pages/AccessibilityStatement'),
```

**✅ Checklist:**
- [ ] פתח את קובץ הראוטינג
- [ ] הוסף את הדף
- [ ] שמור

---

#### שלב 3.3 - הוסף קישור בפוטר (30 דקות)
```bash
# עדכן: src/components/site-footer.tsx
```

```tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        {/* ... תוכן קיים ... */}

        <div className="space-y-2 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-sm">
          {/* ===== הוסף מכאן ===== */}
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            <a
              href="/accessibility-statement"
              className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
            >
              הצהרת נגישות
            </a>
            <span className="text-border">•</span>
            <a
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              מדיניות פרטיות
            </a>
            <span className="text-border">•</span>
            <a
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              תנאי שימוש
            </a>
          </div>
          {/* ===== עד כאן ===== */}

          <p>המידע באתר הוא מידע מסייע בלבד...</p>
          <p>לאימות זכאות...</p>
          <p className="pt-1 text-[11px] md:text-xs">© 2026 שיקום מקצועי לסטודנטים</p>
        </div>
      </div>
    </footer>
  )
}
```

**✅ Checklist:**
- [ ] פתח `src/components/site-footer.tsx`
- [ ] הוסף שורת קישורים לפני `<p>המידע באתר...`
- [ ] **דגש:** הקישור להצהרת נגישות צריך להיות **בולט** (underline)
- [ ] שמור

---

#### שלב 3.4 - בדיקת QA (30 דקות)
```bash
npm run dev
```

**✅ Checklist:**
- [ ] פתח http://localhost:5173
- [ ] גלול לפוטר - הקישור "הצהרת נגישות" מופיע?
- [ ] לחץ על הקישור - העמוד נפתח?
- [ ] קרא את כל התוכן - הכל נכון?
- [ ] **עדכן פרטי קשר אמיתיים** (מייל, טלפון, שם)
- [ ] בדוק בכל הדפים שהפוטר זהה

---

#### שלב 3.5 - Commit (15 דקות)
```bash
git add src/pages/AccessibilityStatement.tsx src/components/site-footer.tsx src/pages.config.js
git commit -m "feat: add accessibility statement page (Israeli legal requirement)"
```

**🎯 תוצאה:** הצהרת נגישות מלאה וחוקית ✅

---

### יום 5 - בדיקת QA כללית (1 שעה)

#### שלב 5.1 - בדיקת Lighthouse (30 דקות)
```bash
npm run build
npx serve dist -p 3000
```

**הרץ Lighthouse על:**
- [ ] Home
- [ ] Benefits
- [ ] Application
- [ ] Accessibility
- [ ] Contact
- [ ] **Accessibility Statement** (חדש!)

**ציון מינימלי:** 90+ Accessibility Score

---

#### שלב 5.2 - Commit סופי (30 דקות)
```bash
git status
git log --oneline -5
git push origin claude/accessibility-audit-report-Z08AJ
```

**✅ Checklist:**
- [ ] סקור את כל השינויים
- [ ] ודא שהכל committed
- [ ] push לענף

**📊 סיכום שבוע 1:**
- ✅ Skip Navigation
- ✅ ניגודיות צבעים
- ✅ הצהרת נגישות

---

## 🟠 שבוע 2: פערים בעדיפות גבוהה (9 שעות)

### יום 1 - תיקון מבנה כותרות (3 שעות)

**מטרה:** תקן דילוג ברמות כותרות (H1→H2→H4)
**קריטריון WCAG:** 1.3.1 (Level A)

#### שלב 1.1 - מיפוי כל הכותרות (1 שעה)
```bash
# צור קובץ זמני לניתוח
touch heading-audit.md
```

הרץ בדפדפן (Console):
```js
// הדבק ב-Console של כל דף
const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
headings.forEach((h, i) => {
  console.log(`${i+1}. ${h.tagName}: "${h.textContent.trim().substring(0, 50)}"`)
})
```

**בדוק כל דף ורשום:**
```markdown
# Home
1. H1: "שיקום מקצועי לסטודנטים בהשכלה גבוהה"
2. H2: "בוא נתחיל, איפה אתה בתהליך?"
3. H3: "בתחילת הדרך"
4. H3: "הלימודים שלי אושרו"
...

# Accessibility
1. H1: "הנגישות"
2. H2: "בקצרה"
3. H2: "מלווה אישי" (Accordion trigger)
4. H4: "תנאי זכאות" ❌ SKIP - צריך H3!
5. H4: "היקף וגובה הסיוע" ❌ SKIP
...
```

**✅ Checklist:**
- [ ] הרץ script בכל דף
- [ ] רשום את כל הכותרות
- [ ] סמן כל דילוג ב-❌

---

#### שלב 1.2 - תיקון Accessibility Accordion (1 שעה)
```bash
# עדכן: src/components/accessibility/accessibility-accordion.tsx
```

**מצא את כל ה-H4 ושנה ל-H3:**
```tsx
// ❌ לפני
<h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
  {"תנאי זכאות"}
</h4>

// ✅ אחרי
<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
  {"תנאי זכאות"}
</h3>
```

**חפש והחלף:**
- `<h4 className="text-sm font-bold uppercase` → `<h3 className="text-sm font-bold uppercase`
- `</h4>` → `</h3>` (בשורות אלה בלבד!)

**✅ Checklist:**
- [ ] פתח `src/components/accessibility/accessibility-accordion.tsx`
- [ ] חפש את כל ה-`<h4>` בקובץ (צריכות להיות 3-4)
- [ ] שנה כל אחד ל-`<h3>`
- [ ] שמור

---

#### שלב 1.3 - בדיקה ותיקון דפים נוספים (45 דקות)

בדוק אם יש דילוגים גם בדפים אחרים:
- [ ] Application page
- [ ] Benefits page
- [ ] Contact page

אם נמצאו - תקן באותו אופן.

---

#### שלב 1.4 - בדיקת QA (15 דקות)
```bash
npm run dev
```

הרץ שוב את ה-script בכל דף ווודא שאין דילוגים.

---

#### שלב 1.5 - Commit
```bash
git add src/components/accessibility/accessibility-accordion.tsx
git commit -m "fix: correct heading hierarchy (H1->H2->H3) - WCAG 1.3.1"
```

**🎯 תוצאה:** מבנה כותרות תקין ללא דילוגים ✅

---

### יום 2 - קישורים תיאוריים (2 שעות)

**מטרה:** תקן קישורים לא תיאוריים
**קריטריון WCAG:** 2.4.4 (Level A)

#### שלב 2.1 - תיקון Home Page (45 דקות)
```bash
# עדכן: src/pages/Home.tsx
```

**תיקון 1 - "בדוק כאן":**
```tsx
// ❌ לפני (שורה 31)
<a href="/eligibility" className="...">
  {"בדוק כאן"}
</a>

// ✅ אחרי
<a
  href="/eligibility"
  className="..."
  aria-label="בדוק את זכאותך לשיקום מקצועי"
>
  {"בדוק כאן"}
</a>
```

**תיקון 2 - "התחל כאן":**
```tsx
// ❌ לפני (שורה 72)
<div className="...">
  {"התחל כאן"}
  <ArrowLeft className="..." />
</div>

// ✅ אחרי - כבר בתוך <a>, רק צריך לשפר את הטקסט
{"התחל תהליך הגשת בקשה"}
<ArrowLeft className="..." aria-hidden="true" />
```

**✅ Checklist:**
- [ ] פתח `src/pages/Home.tsx`
- [ ] תקן "בדוק כאן" - הוסף aria-label
- [ ] תקן "התחל כאן" - שנה לטקסט תיאורי
- [ ] שמור

---

#### שלב 2.2 - תיקון Benefits Grid (45 דקות)
```bash
# עדכן: src/components/benefits/benefits-grid.tsx
```

**תיקון - Badge "למידע המלא":**
```tsx
// ❌ לפני (שורה 111)
<Badge ...>
  {"למידע המלא"}
  <ArrowLeft className="h-3 w-3" />
</Badge>

// ✅ אחרי
<Badge ...>
  <span className="sr-only">מידע מלא על </span>
  {benefit.title}
  <ArrowLeft className="h-3 w-3" aria-hidden="true" />
</Badge>
```

**או פתרון 2 - שנה לגמרי:**
```tsx
<Badge ...>
  {"קרא עוד"}
  <ArrowLeft className="h-3 w-3" aria-hidden="true" />
</Badge>
```

**✅ Checklist:**
- [ ] פתח `src/components/benefits/benefits-grid.tsx`
- [ ] מצא את ה-Badge "למידע המלא"
- [ ] תקן לפי אחד הפתרונות
- [ ] שמור

---

#### שלב 2.3 - סימון קישורים חיצוניים (30 דקות)
```bash
# עדכן: src/components/site-footer.tsx
```

```tsx
// ✅ הוסף screen-reader text לקישורים חיצוניים
<a
  href={link.href}
  target="_blank"
  rel="noreferrer"
  className="..."
>
  <span>{link.label}</span>
  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
  <span className="sr-only"> (נפתח בחלון חדש)</span>
</a>
```

**✅ Checklist:**
- [ ] פתח `src/components/site-footer.tsx`
- [ ] מצא קישורים עם `target="_blank"`
- [ ] הוסף `<span className="sr-only"> (נפתח בחלון חדש)</span>`
- [ ] שמור

---

#### שלב 2.4 - Commit
```bash
git add src/pages/Home.tsx src/components/benefits/benefits-grid.tsx src/components/site-footer.tsx
git commit -m "fix: add descriptive link text for screen readers - WCAG 2.4.4"
```

**🎯 תוצאה:** כל הקישורים תיאוריים ומובנים ✅

---

### יום 3-4 - תיאור אייקונים (4 שעות)

**מטרה:** הוסף aria-hidden לדקורטיביים, aria-label לפונקציונליים
**קריטריון WCAG:** 1.1.1 (Level A)

#### שלב 3.1 - צור רשימת כל האייקונים (1 שעה)

חפש בכל הקבצים:
```bash
grep -r "lucide-react" src --include="*.tsx" --include="*.jsx" | wc -l
```

רשום כל קובץ:
```markdown
1. src/components/back-to-top-button.tsx - ChevronUp (פונקציונלי)
2. src/components/benefits/benefits-grid.tsx - 7 icons (דקורטיביים)
3. src/components/site-footer.tsx - ExternalLink (דקורטיבי)
4. src/components/accessibility/accessibility-accordion.tsx - 12 icons (דקורטיביים)
...
```

**✅ Checklist:**
- [ ] הרץ grep או חפש ידנית
- [ ] רשום כל קובץ עם אייקונים
- [ ] סווג: דקורטיבי / פונקציונלי

---

#### שלב 3.2 - תיקון Back to Top Button (15 דקות)
```bash
# עדכן: src/components/back-to-top-button.tsx
```

```tsx
// ❌ לפני
aria-label="Back to top"

// ✅ אחרי
aria-label="חזרה לראש הדף"

// וגם הוסף aria-hidden לאייקון
<ChevronUp className="h-5 w-5" aria-hidden="true" />
```

**✅ Checklist:**
- [ ] פתח הקובץ
- [ ] תרגם את ה-aria-label לעברית
- [ ] הוסף `aria-hidden="true"` לאייקון
- [ ] שמור

---

#### שלב 3.3 - תיקון אייקונים דקורטיביים (2 שעות)

**כלל:** אם יש טקסט ליד האייקון → הוסף `aria-hidden="true"`

**קבצים לתיקון:**
1. `src/components/benefits/benefits-grid.tsx`
2. `src/components/accessibility/accessibility-accordion.tsx`
3. `src/components/site-footer.tsx`
4. `src/components/site-top-bar.tsx`
5. `src/pages/Contact.tsx`
6. וכו'

**דוגמה:**
```tsx
// ❌ לפני
<Wallet className="h-6 w-6" />
<span>דמי שיקום</span>

// ✅ אחרי
<Wallet className="h-6 w-6" aria-hidden="true" />
<span>דמי שיקום</span>
```

**שיטה מהירה - Find & Replace:**
```tsx
// חפש:
<([A-Z][a-zA-Z]+) className="([^"]+)" />

// החלף ב:
<$1 className="$2" aria-hidden="true" />
```

⚠️ **שים לב:** רק באייקונים עם טקסט לידם!

**✅ Checklist:**
- [ ] תקן benefits-grid (7 icons)
- [ ] תקן accessibility-accordion (12 icons)
- [ ] תקן site-footer (ExternalLink)
- [ ] תקן site-top-bar (Home icon)
- [ ] תקן Contact (Phone, Mail, Users, etc.)
- [ ] בדוק שלא שברת כלום

---

#### שלב 3.4 - בדיקת QA עם קורא מסך (45 דקות)

**אופציה 1 - NVDA (Windows):**
1. הורד: https://www.nvaccess.org/download/
2. התקן והפעל
3. נווט באתר עם Tab
4. שמע מה נקרא - האם אייקונים מיותרים נעלמו?

**אופציה 2 - VoiceOver (Mac):**
1. Cmd+F5 להפעלה
2. נווט באתר
3. שמע מה נקרא

**אופציה 3 - Chrome Screen Reader:**
1. התקן: ChromeVox extension
2. נווט ובדוק

**✅ Checklist:**
- [ ] הפעל קורא מסך
- [ ] נווט בדף Benefits
- [ ] האם שומע רק את הטקסטים ולא "wallet icon"?
- [ ] נווט בדף Accessibility
- [ ] האם האייקונים נסתרו?

---

#### שלב 3.5 - Commit
```bash
git add -A
git commit -m "fix: add aria-hidden to decorative icons for screen readers - WCAG 1.1.1"
```

**🎯 תוצאה:** קוראי מסך לא קוראים אייקונים מיותרים ✅

---

### יום 5 - בדיקת QA שבוע 2 (1 שעה)

```bash
npm run build
npx serve dist
```

**הרץ Lighthouse:**
- [ ] ציון Accessibility: **85+** צפוי

**בדוק ידנית:**
- [ ] Tab בכל הדפים - פוקוס ברור?
- [ ] כותרות היררכיות?
- [ ] קישורים תיאוריים?
- [ ] אייקונים לא נשמעים בקורא מסך?

**Commit:**
```bash
git push origin claude/accessibility-audit-report-Z08AJ
```

**📊 סיכום שבוע 2:**
- ✅ מבנה כותרות תקין
- ✅ קישורים תיאוריים
- ✅ אייקונים נגישים

---

## 🟡 שבוע 3: פערים בינוניים (6.5 שעות)

### יום 1 - כותרות דינמיות (2 שעות)

**מטרה:** עדכן `<title>` לפי הדף הנוכחי
**קריטריון WCAG:** 2.4.2 (Level A)

#### שלב 1.1 - צור usePageTitle Hook (45 דקות)
```bash
# צור: src/hooks/usePageTitle.js
```

```js
import { useEffect } from 'react'

export function usePageTitle(pageTitle) {
  useEffect(() => {
    const defaultTitle = 'שיקום מקצועי לסטודנטים'

    if (pageTitle) {
      document.title = `${pageTitle} | ${defaultTitle}`
    } else {
      document.title = `${defaultTitle} | המדריך שלך`
    }

    // Cleanup
    return () => {
      document.title = defaultTitle
    }
  }, [pageTitle])
}
```

**✅ Checklist:**
- [ ] צור תיקייה `src/hooks` אם לא קיימת
- [ ] צור קובץ `usePageTitle.js`
- [ ] העתק קוד
- [ ] שמור

---

#### שלב 1.2 - הוסף לכל הדפים (1 שעה)

**דוגמה - Home.tsx:**
```tsx
import { usePageTitle } from '@/hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('דף הבית')

  return (...)
}
```

**הוסף לכל הדפים:**
- [ ] `src/pages/Home.tsx` → "דף הבית"
- [ ] `src/pages/Benefits.tsx` → "מימוש זכאויות"
- [ ] `src/pages/Application.tsx` → "הגשת בקשה"
- [ ] `src/pages/Accessibility.tsx` → "הנגשות"
- [ ] `src/pages/Contact.tsx` → "יצירת קשר"
- [ ] `src/pages/Faq.tsx` → "שאלות נפוצות"
- [ ] `src/pages/AccessibilityStatement.tsx` → "הצהרת נגישות"

---

#### שלב 1.3 - בדיקה (15 דקות)
```bash
npm run dev
```

- [ ] עבור בין דפים
- [ ] בדוק את ה-title בטאב הדפדפן
- [ ] האם משתנה לפי הדף?

---

#### שלב 1.4 - Commit
```bash
git add src/hooks/usePageTitle.js src/pages/*.tsx
git commit -m "feat: add dynamic page titles - WCAG 2.4.2"
```

---

### יום 2 - תרגומים ו-Captions (1 שעה)

#### שלב 2.1 - תרגום Breadcrumb (15 דקות)
```bash
# עדכן: src/components/breadcrumb.tsx
```

```tsx
// ❌ לפני
<nav aria-label="ניווט">

// ✅ אחרי
<nav aria-label="ניווט מיקום">
```

---

#### שלב 2.2 - הוסף Caption לטבלאות (30 דקות)
```bash
# עדכן: src/pages/Contact.tsx
```

```tsx
// הוסף <caption> לטבלאות
<table className="w-full text-right">
  <caption className="sr-only">רשימת עובדי שיקום - שמות ופרטי התקשרות</caption>
  <thead>...</thead>
  ...
</table>

// טבלה שנייה
<table className="w-full text-right">
  <caption className="sr-only">רשימת מגשרות המחלקה - שמות ופרטי התקשרות</caption>
  <thead>...</thead>
  ...
</table>
```

**✅ Checklist:**
- [ ] פתח Contact.tsx
- [ ] הוסף `<caption>` לשתי הטבלאות
- [ ] השתמש ב-`sr-only` כדי להסתיר ויזואלית
- [ ] שמור

---

#### שלב 2.3 - Commit
```bash
git add src/components/breadcrumb.tsx src/pages/Contact.tsx
git commit -m "fix: add table captions and improve aria-labels"
```

---

### יום 3 - HTML Validation (1 שעה)

#### שלב 3.1 - Build ו-Validate (45 דקות)
```bash
npm run build
```

**העלה ל-Validator:**
1. גש ל: https://validator.w3.org/#validate_by_upload
2. העלה: `dist/index.html`
3. לחץ "Check"
4. רשום שגיאות

**או השתמש ב-CLI:**
```bash
npx html-validate dist/index.html
```

**תקן שגיאות אם יש:**
- Duplicate IDs
- Unclosed tags
- Invalid nesting

---

#### שלב 3.2 - Commit אם נדרש
```bash
git add [files]
git commit -m "fix: resolve HTML validation errors"
```

---

### יום 4 - בדיקות ידניות מקיפות (2.5 שעות)

#### 4.1 - בדיקת Tab Navigation (1 שעה)

**לכל דף:**
- [ ] Home - Tab דרך כל הקישורים
- [ ] Benefits - Tab דרך כל הכרטיסיות
- [ ] Application - Tab דרך Accordion
- [ ] Accessibility - Tab דרך Accordion
- [ ] Contact - Tab דרך טבלאות
- [ ] FAQ - Tab דרך כל התוכן

**בדוק:**
- [ ] סדר Tab הגיוני?
- [ ] אין keyboard traps?
- [ ] פוקוס נראה בכל אלמנט?

---

#### 4.2 - בדיקת ניווט עקבי (30 דקות)

**בדוק שבכל דף:**
- [ ] הניווט העליון זהה?
- [ ] הפוטר זהה?
- [ ] סדר הקישורים זהה?
- [ ] מיקום הלוגו זהה?

---

#### 4.3 - בדיקת Zoom (30 דקות)

פתח את האתר והגדל:
- [ ] 125% - הכל קריא?
- [ ] 150% - הכל קריא?
- [ ] 200% - הכל קריא?
- [ ] אין גלילה אופקית?
- [ ] אין טקסט חתוך?

---

#### 4.4 - רשימת בדיקות מקיפה (30 דקות)

**✅ Checklist סופי:**
- [ ] Skip Navigation עובד
- [ ] כל דף יש H1 יחידה
- [ ] כותרות בהיררכיה (H1→H2→H3)
- [ ] קישורים תיאוריים
- [ ] אייקונים עם aria-hidden
- [ ] פוקוס visible
- [ ] ניגודיות 4.5:1+
- [ ] טבלאות עם caption
- [ ] קורא מסך עובד טוב
- [ ] הצהרת נגישות קיימת
- [ ] ניווט עקבי
- [ ] Title דינמי

---

### יום 5 - Lighthouse סופי וסיכום (1 שעה)

#### 5.1 - Lighthouse Final (30 דקות)
```bash
npm run build
npx serve dist
```

**הרץ על כל הדפים:**
- [ ] Home - ציון: ___
- [ ] Benefits - ציון: ___
- [ ] Application - ציון: ___
- [ ] Accessibility - ציון: ___
- [ ] Contact - ציון: ___
- [ ] Accessibility Statement - ציון: ___

**ציון מינימלי:** 90+

---

#### 5.2 - דוח סיכום (30 דקות)

צור קובץ:
```bash
# צור: ACCESSIBILITY_COMPLETION_REPORT.md
```

```markdown
# דוח השלמת תיקוני נגישות

**תאריך:** [תאריך]
**מבצע:** [שמך]

## סטטוס

✅ כל 12 הפערים תוקנו בהצלחה

## ציוני Lighthouse

| דף | ציון נגישות |
|----|-------------|
| Home | 95 |
| Benefits | 93 |
| Application | 94 |
| Accessibility | 96 |
| Contact | 92 |
| Accessibility Statement | 98 |

**ממוצע:** 94.7 🎉

## תיקונים שבוצעו

### קריטי
- [x] Skip Navigation
- [x] ניגודיות צבעים
- [x] הצהרת נגישות

### גבוה
- [x] מבנה כותרות
- [x] קישורים תיאוריים
- [x] תיאור אייקונים

### בינוני
- [x] Title דינמי
- [x] תרגומים
- [x] Table captions
- [x] HTML validation
- [x] בדיקות ידניות

## המלצות המשך

1. הרץ Lighthouse כל חודש
2. בדוק עם קורא מסך כל רבעון
3. עדכן הצהרת נגישות לפי שינויים
4. הוסף בדיקות אוטומטיות ל-CI/CD

## מסקנות

האתר **עומד בתקן ת"י 5568** ומספק חוויה נגישה למשתמשים עם מוגבלויות.
```

---

#### 5.3 - Push סופי
```bash
git add ACCESSIBILITY_COMPLETION_REPORT.md
git commit -m "docs: add accessibility completion report ✅"
git push origin claude/accessibility-audit-report-Z08AJ
```

---

## 🎉 סיכום תוכנית העבודה

**סה"כ זמן שהושקע:** 23.5 שעות
**שבועות:** 3
**פערים שתוקנו:** 12/12

### השגים 🏆
- ✅ עמידה בתקן ישראלי 5568
- ✅ WCAG 2.0 Level AA
- ✅ Lighthouse 90+
- ✅ נגיש לקוראי מסך
- ✅ ניגודיות מלאה
- ✅ הצהרת נגישות חוקית

---

**הערה:** תוכנית זו היא הערכה. זמנים עשויים להשתנות לפי מורכבות הקוד והניסיון.

**בהצלחה! 💪**
