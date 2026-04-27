// מאגר שאלות - HTML
// תתי נושא: נגישות, טפסים, סמנטיקה, HTML5 APIs
//
// הערה לתצוגת עברית + קוד:
// במסך התרגול מומלץ להציג question / options באמצעות dangerouslySetInnerHTML,
// משום שחלק מהשאלות כוללות <span dir='ltr'>...</span> עבור תגיות, מאפיינים או מונחים באנגלית.

export const htmlQuestions = [
  // =========================
  // נגישות
  // =========================
  {
    id: "html_accessibility_1",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי המטרה המרכזית של נגישות באתרים?",
    options: [
      "להפוך את האתר למהיר יותר בלבד",
      "לאפשר שימוש נוח וברור באתר עבור מגוון רחב של משתמשים, כולל אנשים עם מוגבלויות",
      "להחליף את הצורך בעיצוב רספונסיבי",
      "למנוע שימוש בתמונות באתר"
    ],
    correctAnswer: "לאפשר שימוש נוח וברור באתר עבור מגוון רחב של משתמשים, כולל אנשים עם מוגבלויות"
  },
  {
    id: "html_accessibility_2",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "למה חשוב להוסיף מאפיין <span dir='ltr'>alt</span> לתמונות?",
    options: [
      "כדי להגדיל את גודל התמונה",
      "כדי להציג תיאור חלופי כאשר התמונה לא נטענת או עבור קוראי מסך",
      "כדי לשנות את צבע התמונה",
      "כדי להפוך את התמונה לקישור"
    ],
    correctAnswer: "כדי להציג תיאור חלופי כאשר התמונה לא נטענת או עבור קוראי מסך"
  },
  {
    id: "html_accessibility_3",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "כותרות מסודרות כמו <span dir='ltr'>&lt;h1&gt;</span>, <span dir='ltr'>&lt;h2&gt;</span> ו-<span dir='ltr'>&lt;h3&gt;</span> תורמות לנגישות של עמוד.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "html_accessibility_4",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו מהאפשרויות הבאות היא הדוגמה הטובה ביותר לטקסט קישור נגיש?",
    options: [
      "לחץ כאן",
      "עוד",
      "לצפייה בלוח הזמנים של הקורס",
      "קישור"
    ],
    correctAnswer: "לצפייה בלוח הזמנים של הקורס"
  },
  {
    id: "html_accessibility_5",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "למה חשוב לשייך <span dir='ltr'>&lt;label&gt;</span> לשדה קלט בטופס?",
    options: [
      "כדי לשנות את צבע השדה",
      "כדי לאפשר לקוראי מסך ולמשתמשים להבין מה מטרת השדה",
      "כדי למנוע שליחה של הטופס",
      "כדי להפוך את השדה לחובה תמיד"
    ],
    correctAnswer: "כדי לאפשר לקוראי מסך ולמשתמשים להבין מה מטרת השדה"
  },
  {
    id: "html_accessibility_6",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מה הבעיה המרכזית בהסתמכות על צבע בלבד להעברת מידע, למשל הודעת שגיאה באדום בלבד?",
    options: [
      "העמוד נטען לאט יותר",
      "משתמשים מסוימים עלולים לא להבחין במשמעות הצבע",
      "ה-<span dir='ltr'>HTML</span> נהיה לא תקין",
      "אי אפשר להשתמש ב-<span dir='ltr'>CSS</span>"
    ],
    correctAnswer: "משתמשים מסוימים עלולים לא להבחין במשמעות הצבע"
  },
  {
    id: "html_accessibility_7",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור מוצג כפתור עם אייקון בלבד ללא טקסט או תיאור. מהי הבעיה העיקרית?",
    imageUrl: "",
    options: [
      "הכפתור גדול מדי",
      "ייתכן שמשתמשים לא יבינו את מטרת הכפתור, במיוחד עם קורא מסך",
      "אי אפשר לעצב אייקונים ב-<span dir='ltr'>HTML</span>",
      "הכפתור תמיד לא לחיץ"
    ],
    correctAnswer: "ייתכן שמשתמשים לא יבינו את מטרת הכפתור, במיוחד עם קורא מסך"
  },
  {
    id: "html_accessibility_8",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים אחד מוצג ניגודיות נמוכה בין הטקסט לרקע, ובתרשים שני ניגודיות גבוהה. מה עדיף מבחינת נגישות?",
    imageUrl: "",
    options: [
      "ניגודיות נמוכה",
      "ניגודיות גבוהה",
      "אין משמעות לניגודיות",
      "רק צבעים כהים מותרים"
    ],
    correctAnswer: "ניגודיות גבוהה"
  },
  {
    id: "html_accessibility_9",
    courseId: "html_fundamentals",
    subTopic: "accessibility",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם כפתור נראה ברור ויזואלית אך אי אפשר להגיע אליו עם מקלדת, קיימת בעיית נגישות.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // טפסים
  // =========================
  {
    id: "html_forms_1",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "איזו תגית משמשת ליצירת טופס ב-<span dir='ltr'>HTML</span>?",
    options: [
      "<span dir='ltr'>&lt;table&gt;</span>",
      "<span dir='ltr'>&lt;form&gt;</span>",
      "<span dir='ltr'>&lt;section&gt;</span>",
      "<span dir='ltr'>&lt;fieldset&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;form&gt;</span>"
  },
  {
    id: "html_forms_2",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה תפקידו של המאפיין <span dir='ltr'>required</span> בשדה קלט?",
    options: [
      "להפוך את השדה לנסתר",
      "לחייב את המשתמש למלא את השדה לפני שליחת הטופס",
      "להוסיף לו צבע רקע",
      "למנוע ממנו לקבל טקסט"
    ],
    correctAnswer: "לחייב את המשתמש למלא את השדה לפני שליחת הטופס"
  },
  {
    id: "html_forms_3",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "התגית <span dir='ltr'>&lt;textarea&gt;</span> מתאימה לקלט טקסט רב-שורות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "html_forms_4",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "באיזה מצב עדיף להשתמש ב-<span dir='ltr'>type='email'</span> במקום <span dir='ltr'>type='text'</span>?",
    options: [
      "כאשר רוצים שדה לתאריך",
      "כאשר מצפים שהמשתמש יזין כתובת דוא״ל ולקבל ולידציה בסיסית",
      "כאשר השדה מיועד לסיסמה",
      "כאשר רוצים למנוע כל קלט מהמשתמש"
    ],
    correctAnswer: "כאשר מצפים שהמשתמש יזין כתובת דוא״ל ולקבל ולידציה בסיסית"
  },
  {
    id: "html_forms_5",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה ההבדל העיקרי בין <span dir='ltr'>checkbox</span> ל-<span dir='ltr'>radio</span>?",
    options: [
      "אין הבדל",
      "<span dir='ltr'>checkbox</span> מאפשר בחירה מרובה, ואילו <span dir='ltr'>radio</span> בדרך כלל מאפשר בחירה אחת מתוך קבוצה",
      "<span dir='ltr'>radio</span> משמש רק לסיסמאות",
      "<span dir='ltr'>checkbox</span> לא שולח ערך בטופס"
    ],
    correctAnswer: "<span dir='ltr'>checkbox</span> מאפשר בחירה מרובה, ואילו <span dir='ltr'>radio</span> בדרך כלל מאפשר בחירה אחת מתוך קבוצה"
  },
  {
    id: "html_forms_6",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה חשוב להגדיר מאפיין <span dir='ltr'>name</span> לשדות בטופס?",
    options: [
      "כדי לשנות את הגודל של השדה",
      "כדי שהשרת יוכל לזהות את הנתונים שנשלחו מכל שדה",
      "כדי להסתיר את הטופס",
      "כדי למנוע ולידציה"
    ],
    correctAnswer: "כדי שהשרת יוכל לזהות את הנתונים שנשלחו מכל שדה"
  },
  {
    id: "html_forms_7",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור מוצג טופס עם שדה חיפוש, שדה אימייל וכפתור שליחה. איזו תגית מתאימה לקיבוץ כל הרכיבים יחד?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>&lt;header&gt;</span>",
      "<span dir='ltr'>&lt;form&gt;</span>",
      "<span dir='ltr'>&lt;article&gt;</span>",
      "<span dir='ltr'>&lt;nav&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;form&gt;</span>"
  },
  {
    id: "html_forms_8",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט מוצגת קבוצת אפשרויות שבה רק אפשרות אחת יכולה להיות מסומנת בכל פעם. איזה סוג קלט מתאים?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>checkbox</span>",
      "<span dir='ltr'>radio</span>",
      "<span dir='ltr'>textarea</span>",
      "<span dir='ltr'>password</span>"
    ],
    correctAnswer: "<span dir='ltr'>radio</span>"
  },
  {
    id: "html_forms_9",
    courseId: "html_fundamentals",
    subTopic: "forms",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם שדה מוצג כבחירה מרובה בתרשים, בדרך כלל <span dir='ltr'>checkbox</span> יתאים יותר מ-<span dir='ltr'>radio</span>.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // סמנטיקה
  // =========================
  {
    id: "html_semantics_1",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה היתרון העיקרי של תגיות סמנטיות ב-<span dir='ltr'>HTML</span>?",
    options: [
      "הן מקטינות תמיד את משקל התמונות",
      "הן מתארות את משמעות התוכן ומשפרות קריאות, נגישות ו-<span dir='ltr'>SEO</span>",
      "הן מחליפות לחלוטין את <span dir='ltr'>CSS</span>",
      "הן משמשות רק לטפסים"
    ],
    correctAnswer: "הן מתארות את משמעות התוכן ומשפרות קריאות, נגישות ו-<span dir='ltr'>SEO</span>"
  },
  {
    id: "html_semantics_2",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "איזו תגית מתאימה ביותר לאזור הניווט הראשי באתר?",
    options: [
      "<span dir='ltr'>&lt;footer&gt;</span>",
      "<span dir='ltr'>&lt;nav&gt;</span>",
      "<span dir='ltr'>&lt;aside&gt;</span>",
      "<span dir='ltr'>&lt;figure&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;nav&gt;</span>"
  },
  {
    id: "html_semantics_3",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "התגית <span dir='ltr'>&lt;article&gt;</span> מתאימה לתוכן עצמאי שיכול לעמוד בפני עצמו.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "html_semantics_4",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מתי עדיף להשתמש ב-<span dir='ltr'>&lt;section&gt;</span> ולא ב-<span dir='ltr'>&lt;div&gt;</span>?",
    options: [
      "כאשר אין שום משמעות לתוכן",
      "כאשר מדובר בקבוצה נושאית של תוכן עם כותרת או משמעות מבנית",
      "כאשר רוצים להוסיף צבע רקע",
      "תמיד עדיף <span dir='ltr'>&lt;div&gt;</span>"
    ],
    correctAnswer: "כאשר מדובר בקבוצה נושאית של תוכן עם כותרת או משמעות מבנית"
  },
  {
    id: "html_semantics_5",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזה שימוש הוא הסמנטי ביותר לאזור צדדי עם קישורים קשורים או מידע משלים?",
    options: [
      "<span dir='ltr'>&lt;main&gt;</span>",
      "<span dir='ltr'>&lt;aside&gt;</span>",
      "<span dir='ltr'>&lt;header&gt;</span>",
      "<span dir='ltr'>&lt;mark&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;aside&gt;</span>"
  },
  {
    id: "html_semantics_6",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה שימוש מוגזם ב-<span dir='ltr'>&lt;div&gt;</span> במקום תגיות סמנטיות עלול להיות בעייתי?",
    options: [
      "כי <span dir='ltr'>&lt;div&gt;</span> לא נתמכת בדפדפנים",
      "כי הקוד מאבד משמעות מבנית וקשה יותר להבנה עבור כלים ומשתמשים",
      "כי אי אפשר לעצב <span dir='ltr'>&lt;div&gt;</span> עם <span dir='ltr'>CSS</span>",
      "כי <span dir='ltr'>&lt;div&gt;</span> אסורה ב-<span dir='ltr'>HTML5</span>"
    ],
    correctAnswer: "כי הקוד מאבד משמעות מבנית וקשה יותר להבנה עבור כלים ומשתמשים"
  },
  {
    id: "html_semantics_7",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים מופיעים אזור עליון עם לוגו וכותרת, אזור ניווט, תוכן מרכזי ותחתית עמוד. איזו תגית מתאימה לאזור העליון?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>&lt;footer&gt;</span>",
      "<span dir='ltr'>&lt;header&gt;</span>",
      "<span dir='ltr'>&lt;aside&gt;</span>",
      "<span dir='ltr'>&lt;figure&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;header&gt;</span>"
  },
  {
    id: "html_semantics_8",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור נראה תוכן ראשי של הדף, שהוא המרכזי והייחודי לעמוד. איזו תגית הכי מתאימה?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>&lt;main&gt;</span>",
      "<span dir='ltr'>&lt;nav&gt;</span>",
      "<span dir='ltr'>&lt;aside&gt;</span>",
      "<span dir='ltr'>&lt;small&gt;</span>"
    ],
    correctAnswer: "<span dir='ltr'>&lt;main&gt;</span>"
  },
  {
    id: "html_semantics_9",
    courseId: "html_fundamentals",
    subTopic: "semantics",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם מבנה העמוד בתרשים ברור יותר בזכות תגיות כמו <span dir='ltr'>&lt;header&gt;</span>, <span dir='ltr'>&lt;nav&gt;</span> ו-<span dir='ltr'>&lt;main&gt;</span>, יש לכך ערך סמנטי אמיתי.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // HTML5 APIs
  // =========================
  {
    id: "html_apis_1",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה הכוונה ב-<span dir='ltr'>HTML5 APIs</span>?",
    options: [
      "רק תגיות חדשות של כותרות",
      "יכולות מובנות בדפדפן שמאפשרות אינטראקציות ופונקציונליות נוספות בדפי אינטרנט",
      "רק קבצי עיצוב",
      "שפה חלופית ל-<span dir='ltr'>JavaScript</span>"
    ],
    correctAnswer: "יכולות מובנות בדפדפן שמאפשרות אינטראקציות ופונקציונליות נוספות בדפי אינטרנט"
  },
  {
    id: "html_apis_2",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "איזו מהאפשרויות הבאות קשורה ל-<span dir='ltr'>Web Storage</span>?",
    options: [
      "<span dir='ltr'>localStorage</span> ו-<span dir='ltr'>sessionStorage</span>",
      "רק <span dir='ltr'>&lt;video&gt;</span>",
      "רק <span dir='ltr'>&lt;canvas&gt;</span>",
      "רק <span dir='ltr'>form</span>"
    ],
    correctAnswer: "<span dir='ltr'>localStorage</span> ו-<span dir='ltr'>sessionStorage</span>"
  },
  {
    id: "html_apis_3",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "<span dir='ltr'>Geolocation API</span> יכולה לאפשר לאתר לבקש את מיקום המשתמש, בכפוף לאישורו.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "html_apis_4",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מתי עדיף להשתמש ב-<span dir='ltr'>sessionStorage</span> במקום <span dir='ltr'>localStorage</span>?",
    options: [
      "כאשר רוצים שהמידע יישמר גם אחרי סגירת הדפדפן לאורך זמן",
      "כאשר רוצים שהמידע יישמר רק למשך הסשן של הלשונית הנוכחית",
      "כאשר רוצים לשמור קבצי וידאו כבדים",
      "כאשר רוצים לגשת למסד נתונים חיצוני"
    ],
    correctAnswer: "כאשר רוצים שהמידע יישמר רק למשך הסשן של הלשונית הנוכחית"
  },
  {
    id: "html_apis_5",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה היתרון המרכזי של שימוש ב-<span dir='ltr'>&lt;canvas&gt;</span>?",
    options: [
      "הוא מחליף לחלוטין את הצורך ב-<span dir='ltr'>HTML</span>",
      "הוא מאפשר ציור גרפי דינמי דרך קוד",
      "הוא משמש רק להצגת טפסים",
      "הוא יוצר מסד נתונים בדפדפן"
    ],
    correctAnswer: "הוא מאפשר ציור גרפי דינמי דרך קוד"
  },
  {
    id: "html_apis_6",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מהו שיקול חשוב במיוחד בעת שימוש ב-<span dir='ltr'>Geolocation API</span>?",
    options: [
      "אין צורך באישור משתמש",
      "יש להתחשב בפרטיות ולבקש הרשאה ברורה מהמשתמש",
      "ה-<span dir='ltr'>API</span> עובד רק בלי אינטרנט",
      "ה-<span dir='ltr'>API</span> מתאים רק לאתרי משחקים"
    ],
    correctAnswer: "יש להתחשב בפרטיות ולבקש הרשאה ברורה מהמשתמש"
  },
  {
    id: "html_apis_7",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור נראה אתר ששומר את העדפת המשתמש למצב כהה גם לאחר סגירת הדפדפן. איזו טכנולוגיה מתאימה לכך?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>sessionStorage</span>",
      "<span dir='ltr'>localStorage</span>",
      "<span dir='ltr'>&lt;fieldset&gt;</span>",
      "<span dir='ltr'>alt</span>"
    ],
    correctAnswer: "<span dir='ltr'>localStorage</span>"
  },
  {
    id: "html_apis_8",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים מוצג יישום מפה שמבקש גישה למיקום הנוכחי של המשתמש. לאיזה <span dir='ltr'>API</span> זה שייך?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>Geolocation API</span>",
      "<span dir='ltr'>Canvas API</span>",
      "<span dir='ltr'>History API</span>",
      "<span dir='ltr'>Web Audio API</span>"
    ],
    correctAnswer: "<span dir='ltr'>Geolocation API</span>"
  },
  {
    id: "html_apis_9",
    courseId: "html_fundamentals",
    subTopic: "html5_apis",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם ביישום מוצג ציור אינטראקטיבי שמתעדכן בעזרת קוד, ייתכן שהוא משתמש ב-<span dir='ltr'>Canvas API</span>.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];
