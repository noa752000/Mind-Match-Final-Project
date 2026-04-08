import { ChatSidebar } from "../components/ChatSidebar";
import { TutorHeader } from "../components/TutorHeader";
import { AIMessage } from "../components/AIMessage";
import { StudentMessage } from "../components/StudentMessage";
import { TypingIndicator } from "../components/TypingIndicator";
import { QuickQuestions } from "../components/QuickQuestions";
import { LearningMethodSuggestion } from "../components/LearningMethodSuggestion";
import { UnderstandingProgress } from "../components/UnderstandingProgress";
import { ChatInput } from "../components/ChatInput";
import { ScrollArea } from "../components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { coursesData } from "../data/coursesData";

// תוכן צ'אט ספציפי לכל קורס
const courseChats: Record<string, { question: string; answer: string; code?: string; expandTitle?: string; expandContent?: string }[]> = {
  'sql': [
    {
      question: 'מה ההבדל בין INNER JOIN ל-LEFT JOIN?',
      answer: 'שאלה מעולה! בואי נבין את ההבדל בצורה מובנית!\n\nINNER JOIN - מחזיר רק שורות שיש להן התאמה בשתי הטבלאות. אם אין התאמה, השורה לא תופיע בתוצאה.\n\nLEFT JOIN (או LEFT OUTER JOIN) - מחזיר את כל השורות מהטבלה השמאלית (הראשונה), גם אם אין התאמה בטבלה הימנית.\n\nהבדל מרכזי:\nLEFT JOIN שומרת את כל השורות מהטבלה הראשונה, לעומת INNER JOIN שמחזירה רק שורות עם התאמה בשתי הטבלאות.',
      code: `-- INNER JOIN Example
SELECT students.name, courses.course_name
FROM students
INNER JOIN enrollments ON students.id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.id;

-- LEFT JOIN Example
SELECT students.name, courses.course_name
FROM students
LEFT JOIN enrollments ON students.id = enrollments.student_id
LEFT JOIN courses ON enrollments.course_id = courses.id;

-- התוצאה: LEFT JOIN יציג גם סטודנטים ללא קורסים (עם NULL)`,
      expandTitle: 'הסבר מעמיק: מתי להשתמש בכל אחד?',
      expandContent: 'השתמשי ב-INNER JOIN כאשר את רוצה רק רשומות עם התאמה מלאה (למשל, רק סטודנטים שנרשמו לקורסים). השתמשי ב-LEFT JOIN כאשר את רוצה לראות את כל הרשומות מהטבלה הראשונה, גם אם אין להן התאמה (למשל, כל הסטודנטים כולל אלו שלא נרשמו לשום קורס).',
    },
  ],
  'calculus1': [
    {
      question: 'מה זה גבול של פונקציה?',
      answer: 'שאלה מצוינת! גבול הוא מושג יסודי בחדו\"א.\n\nגבול של פונקציה f(x) כאשר x שואף ל-a הוא הערך שאליו מתקרבת הפונקציה כאשר x מתקרב ל-a.\n\nמתמטית: lim(x→a) f(x) = L\n\nזה אומר שכאשר x מתקרב מספיק ל-a, הערך f(x) מתקרב ל-L.',
      code: `// דוגמה: חישוב גבול פשוט
lim(x→2) (x² - 4)/(x - 2)

// פתרון:
= lim(x→2) (x-2)(x+2)/(x-2)
= lim(x→2) (x+2)
= 2+2 = 4`,
      expandTitle: 'למה גבולות חשובים?',
      expandContent: 'גבולות הם הבסיס להגדרת נגזרות ואינטגרלים. הם מאפשרים לנו להבין התנהגות של פונקציות בנקודות בעייתיות ולפתור בעיות שלא ניתן לפתור בצורה ישירה.',
    },
  ],
  'information-security': [
    {
      question: 'מה זה הצפנה סימטרית?',
      answer: 'שאלה חשובה! הצפנה סימטרית היא שיטת הצפנה שבה משתמשים באותו מפתח גם להצפנה וגם לפענוח.\n\nיתרונות:\n• מהירה מאוד\n• יעילה למידע רב\n• פשוטה יחסית\n\nחסרונות:\n• בעיית חלוקת המפתח\n• צריך מפתח ייחודי לכל זוג משתמשים',
      code: `# דוגמה ב-Python עם AES
from cryptography.fernet import Fernet

# יצירת מפתח
key = Fernet.generate_key()
cipher = Fernet(key)

# הצפנה
plaintext = b"הודעה סודית"
ciphertext = cipher.encrypt(plaintext)

# פענוח (עם אותו מפתח!)
decrypted = cipher.decrypt(ciphertext)`,
      expandTitle: 'אלגוריתמי הצפנה סימטרית נפוצים',
      expandContent: 'AES (Advanced Encryption Standard) - הסטנדרט המודרני, DES (Data Encryption Standard) - ישן ולא מאובטח, 3DES - גרסה משופרת של DES, ChaCha20 - מהיר במיוחד למובייל.',
    },
  ],
  'oop': [
    {
      question: 'מה זה פולימורפיזם?',
      answer: 'פולימורפיזם (Polymorphism) הוא אחד מעקרונות היסוד ב-OOP!\n\nמשמעות: היכולת של אובייקטים שונים להגיב באופן שונה לאותו מסר.\n\nשני סוגים עיקריים:\n1. פולימורפיזם בזמן קומפילציה (Compile-time) - Overloading\n2. פולימורפיזם בזמן ריצה (Runtime) - Overriding',
      code: `// דוגמה ל-Polymorphism ב-Java
class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }
}

// שימוש:
Animal myDog = new Dog();
Animal myCat = new Cat();
myDog.makeSound(); // "Woof!"
myCat.makeSound(); // "Meow!"`,
      expandTitle: 'למה פולימורפיזם חשוב?',
      expandContent: 'פולימורפיזם מאפשר לנו לכתוב קוד גנרי יותר וגמיש יותר. אנחנו יכולים לכתוב פונקציה שעובדת עם Animal ולהעביר לה Dog או Cat, והקוד יעבוד נכון בלי שנצטרך לשנות אותו.',
    },
  ],
  'html': [
    {
      question: 'מה ההבדל בין div ל-section?',
      answer: 'שאלה מצוינת על סמנטיקה ב-HTML5!\n\n<div> - אלמנט generic ללא משמעות סמנטית. משמש רק לסגנון ופריסה.\n\n<section> - אלמנט סמנטי שמייצג קטע עצמאי של תוכן עם נושא ספציפי. בדרך כלל כולל כותרת.\n\nמתי להשתמש ב-section:\n• כאשר התוכן הוא קטע עצמאי עם נושא ברור\n• כאשר יש כותרת (h1-h6)\n• כאשר זה הגיוני להציג את הקטע בתוכן עניינים',
      code: `<!-- שימוש נכון ב-section -->
<section>
    <h2>אודות</h2>
    <p>מידע על החברה...</p>
</section>

<section>
    <h2>שירותים</h2>
    <p>השירותים שאנחנו מציעים...</p>
</section>

<!-- שימוש ב-div לסגנון בלבד -->
<div class="wrapper">
    <div class="flex-container">
        <div class="item">תוכן</div>
    </div>
</div>`,
      expandTitle: 'למה סמנטיקה חשובה?',
      expandContent: 'HTML סמנטי משפר נגישות (screen readers), SEO (מנועי חיפוש מבינים טוב יותר את המבנה), תחזוקה (קל יותר להבין את המבנה), ועתידיות (דפדפנים יכולים להוסיף תכונות חדשות).',
    },
  ],
  'linear-algebra': [
    {
      question: 'מה זה מרחב וקטורי?',
      answer: 'שאלה מעולה! מרחב וקטורי הוא מושג מרכזי באלגברה לינארית.\n\nמרחב וקטורי הוא קבוצה של וקטורים שסגורה תחת שתי פעולות:\n1. חיבור וקטורים\n2. כפל בסקלר\n\nדוגמה פשוטה: R² - המישור הדו-ממדי\nכל וקטור הוא זוג מספרים (x, y)\n\nתכונות חשובות:\n• קיים וקטור אפס\n• לכל וקטור יש וקטור נגדי\n• הפעולות קומוטטיביות ואסוציאטיביות',
      code: `// דוגמה למרחב וקטורי R²
v₁ = (3, 2)
v₂ = (1, 4)

// חיבור וקטורים
v₁ + v₂ = (3+1, 2+4) = (4, 6)

// כפל בסקלר
2 · v₁ = (2·3, 2·2) = (6, 4)

// וקטור האפס
0 = (0, 0)`,
      expandTitle: 'למה מרחבים וקטוריים חשובים?',
      expandContent: 'מרחבים וקטוריים הם הבסיס לאלגברה לינארית ומופיעים בכל מקום - גרפיקה ממוחשבת, למידת מכונה, פיזיקה, כלכלה ועוד. הם מאפשרים לנו לתאר ולפתור בעיות מורכבות בצורה מתמטית אלגנטית.',
    },
  ],
  'requirements-design': [
    {
      question: 'מה זה Use Case Diagram?',
      answer: 'שאלה מצוינת! Use Case Diagram הוא כלי מרכזי ב-UML לתיאור דרישות המערכת.\n\nמטרה: להציג את האינטראקציות בין משתמשים (Actors) למערכת.\n\nרכיבים עיקריים:\n• Actor - משתמש או מערכת חיצונית\n• Use Case - פעולה או שירות שהמערכת מספקת\n• קשרים - יחסים בין Use Cases (include, extend)\n\nמתי להשתמש:\n• בשלבי ניתוח הדרישות\n• לתקשורת עם הלקוח\n• להגדרת היקף המערכת',
      code: `// דוגמה ל-Use Case Diagram (תיאור טקסטואלי)

Actors:
- Student (סטודנט)
- Instructor (מרצה)
- Admin (מנהל)

Use Cases:
1. "רשמה לקורס" (Student)
   - Include: "בדיקת קדם-דרישות"
   - Extend: "תשלום"

2. "עדכון ציונים" (Instructor)
   - Include: "התחברות למערכת"

3. "ניהול משתמשים" (Admin)`,
      expandTitle: 'ההבדל בין Include ל-Extend',
      expandContent: 'Include - תמיד קורה, חובה. Use Case A תמיד כולל את B. דוגמה: "הרשמה לקורס" תמיד כולל "בדיקת קדם-דרישות". Extend - לפעמים קורה, אופציונלי. Use Case A יכול להתרחב ל-B בתנאים מסוימים. דוגמה: "הרשמה לקורס" יכול להתרחב ל-"תשלום" רק אם הקורס בתשלום.',
    },
  ],
  'mis-economics': [
    {
      question: 'מה זה ROI ואיך מחשבים אותו?',
      answer: 'שאלה מעולה! ROI (Return On Investment) הוא מדד מרכזי להערכת השקעות במערכות מידע.\n\nהגדרה: ROI מודד את התשואה על ההשקעה באחוזים.\n\nנוסחה: ROI = ((תועלות - עלויות) / עלויות) × 100%\n\nדוגמה:\nעלות מערכת CRM חדשה: 100,000 ₪\nתועלות שנתיות (חיסכון + הכנסות): 130,000 ₪\n\nROI = ((130,000 - 100,000) / 100,000) × 100% = 30%\n\nמשמעות: לכל שקל שהשקענו, הרווחנו 30 אגורות נוספות.',
      code: `// חישוב ROI למערכת מידע

# נתונים:
initial_cost = 100000  # עלות התקנה ראשונית
annual_benefit = 130000  # תועלות שנתיות
annual_operating_cost = 20000  # עלות תפעול שנתית

# חישוב ROI שנתי:
net_benefit = annual_benefit - annual_operating_cost
roi_percentage = ((net_benefit - initial_cost) / initial_cost) * 100

print(f"ROI: {roi_percentage}%")

# חישוב תקופת החזר:
payback_period = initial_cost / net_benefit
print(f"תקופת החזר: {payback_period:.2f} שנים")`,
      expandTitle: 'מה ההבדל בין ROI ל-NPV?',
      expandContent: 'ROI מודד תשואה באחוזים ופשוט לחישוב, אבל לא מתחשב בערך הזמן של הכסף. NPV (Net Present Value) מתחשב בערך הזמן - שקל היום שווה יותר משקל בעתיד. NPV מתאים יותר להשוואת פרויקטים ארוכי טווח, בעוד ROI טוב להערכה מהירה של רווחיות.',
    },
  ],
};

interface AITutorPageProps {
  courseId?: string;
  onBack?: () => void;
}

export function AITutorPage({ courseId, onBack }: AITutorPageProps) {
  const course = courseId && coursesData[courseId] ? coursesData[courseId] : null;
  const chat = courseId && courseChats[courseId] ? courseChats[courseId] : courseChats['sql'];

  return (
    <div className="min-h-screen bg-gray-50 pt-16" dir="rtl">
      <ChatSidebar courseId={courseId} />
      <div className="mr-[544px]">{/* 256px (Sidebar) + 320px (ChatSidebar) = 576px, but using 544px for better spacing */}
        <TutorHeader courseTitle={course?.title} courseColor={course?.color} />

        {/* כפתור חזרה אם יש courseId */}
        {course && onBack && (
          <div className="px-8 pt-24 pb-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:bg-gray-100"
              onClick={onBack}
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              חזרה לעמוד הקורס
            </Button>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex flex-col h-screen pt-20">
          <ScrollArea className="flex-1 px-8 py-6">
            <div className="max-w-4xl mx-auto">
              {/* Welcome Message */}
              <div className="mb-6 flex items-center justify-center">
                <div className="inline-block p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    היי הדס, אני המורה <span dir="ltr">AI</span>{" "}
                    {course ? `שלך ל${course.title}` : 'שלך'}
                  </h2>
                  <p className="text-gray-600">
                    {course 
                      ? `אני כאן כדי לעזור לך ללמוד ${course.title} בצורה מותאמת אישית.`
                      : 'אני כאן כדי לעזור לך למד מערכות מידע בצורה מותאמת אישית.'}
                  </p>
                </div>
              </div>

              {/* Understanding Progress */}
              <UnderstandingProgress />

              {/* Quick Questions */}
              <QuickQuestions courseId={courseId} />

              {/* Conversation */}
              <div className="space-y-6 mt-8">
                <StudentMessage content={chat[0].question} />

                <AIMessage
                  content={chat[0].answer}
                  hasCode={!!chat[0].code}
                  codeLanguage={courseId === 'sql' ? 'sql' : courseId === 'information-security' ? 'python' : courseId === 'oop' ? 'java' : 'html'}
                  dir="rtl"
                  codeExample={chat[0].code}
                  hasExpandable={!!chat[0].expandTitle}
                  expandableTitle={chat[0].expandTitle}
                  expandableContent={chat[0].expandContent}
                />

                <LearningMethodSuggestion />

                {courseId === 'sql' && (
                  <>
                    <StudentMessage content="יש עוד סוגי JOIN?" />

                    <AIMessage
                      content="בהחלט! יש עוד כמה סוגי JOIN חשובים:

• RIGHT JOIN - הפוך מ-LEFT JOIN, שומר את כל השורות מהטבלה הימנית
• FULL OUTER JOIN - מחזיר את כל השורות משתי הטבלאות, עם NULL במקומות ללא התאמה
• CROSS JOIN - יוצר מכפלה קרטזית, כל שורה מטבלה אחת עם כל שורה מהשנייה

ברוב המקרים, תשתמשי ב-INNER JOIN או LEFT JOIN. RIGHT JOIN פחות נפוץ כי תמיד אפשר להחליף את סדר הטבלאות ולהשתמש ב-LEFT JOIN במקום."
                      hasExpandable={true}
                      expandableTitle="טבלת השוואה מלאה של כל סוגי ה-JOINs"
                      expandableContent="INNER JOIN = רק התאמות | LEFT JOIN = כל שמאל + התאמות | RIGHT JOIN = כל ימין + התאמות | FULL OUTER JOIN = הכל | CROSS JOIN = מכפלה קרטזית של כל השורות"
                      dir="rtl"
                    />
                  </>
                )}

                {courseId === 'calculus1' && (
                  <>
                    <StudentMessage content="איך מחשבים נגזרת של פונקציה מורכבת?" />

                    <AIMessage
                      content="שאלה מצוינת! לחישוב נגזרת של פונקציה מורכבת נשתמש בכלל השרשרת (Chain Rule).

כלל השרשרת אומר:
אם יש לנו פונקציה מורכבת f(g(x)), אז הנגזרת שלה היא:
[f(g(x))]' = f'(g(x)) · g'(x)

במילים פשוטות:
• גזור את הפונקציה החיצונית (ושאיר את הפנימית כמו שהיא)
• כפול בנגזרת של הפונקציה הפנימית

דוגמה:
נגזרת של (3x² + 5)⁴

הפונקציה החיצונית: x⁴
הפונקציה הפנימית: 3x² + 5

נגזרת הפונקציה החיצונית: 4x³
נגזרת הפונקציה הפנימית: 6x

לפי כלל השרשרת:
[f(g(x))]' = 4(3x² + 5)³ · 6x = 24x(3x² + 5)³"
                      hasExpandable={true}
                      expandableTitle="דוגמאות נוספות לכלל השרשרת"
                      expandableContent="sin(x²) → cos(x²)·2x | e^(3x) → e^(3x)·3 | ln(x² + 1) → [1/(x² + 1)]·2x = 2x/(x² + 1) | √(x³ + 2x) → [1/(2√(x³ + 2x))]·(3x² + 2)"
                      dir="rtl"
                      hasCode={true}
                      codeLanguage="text"
                      codeExample={`// דוגמה מפורטת נוספת
y = (2x³ - 4x + 1)⁵

חיצונית: u⁵ → 5u⁴
פנימית: u = 2x³ - 4x + 1 → 6x² - 4

נגזרת:
y' = 5(2x³ - 4x + 1)⁴ · (6x² - 4)
y' = (6x² - 4) · 5(2x³ - 4x + 1)⁴`}
                    />
                  </>
                )}

                <TypingIndicator />
              </div>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="px-8 pb-6">
            <div className="max-w-4xl mx-auto">
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}