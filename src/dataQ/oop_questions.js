// מאגר שאלות - תכנות מונחה עצמים
// תתי נושא: מחלקות ואובייקטים, ירושה, פולימורפיזם, דפוסי עיצוב
//
// הערה לתצוגת עברית + קוד:
// במסך התרגול מומלץ להציג question / options באמצעות dangerouslySetInnerHTML,
// משום שחלק מהשאלות כוללות <span dir='ltr'>...</span> עבור קוד או מונחים באנגלית.

export const oopQuestions = [
  // =========================
  // מחלקות ואובייקטים
  // =========================
  {
    id: "oop_classes_objects_1",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו התפקיד המרכזי של מחלקה בתכנות מונחה עצמים?",
    options: [
      "לשמור נתונים באופן זמני בלבד",
      "להגדיר תבנית שממנה ניתן ליצור אובייקטים",
      "לייצג רק פונקציה אחת",
      "להחליף את הצורך במשתנים"
    ],
    correctAnswer: "להגדיר תבנית שממנה ניתן ליצור אובייקטים"
  },
  {
    id: "oop_classes_objects_2",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה ההבדל הנכון בין מחלקה לאובייקט?",
    options: [
      "מחלקה היא מופע שנוצר בזמן ריצה, ואובייקט הוא תבנית",
      "מחלקה מתארת מבנה והתנהגות, ואובייקט הוא מופע קונקרטי של אותה מחלקה",
      "אין הבדל מהותי ביניהם",
      "אובייקט יכול להכיל מתודות, ומחלקה לא"
    ],
    correctAnswer: "מחלקה מתארת מבנה והתנהגות, ואובייקט הוא מופע קונקרטי של אותה מחלקה"
  },
  {
    id: "oop_classes_objects_3",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "מה ניתן להסיק ממחלקה אחת בתכנות מונחה עצמים?",
    options: [
      "ניתן ליצור ממנה מספר אובייקטים שונים",
      "ניתן ליצור ממנה אובייקט אחד בלבד",
      "היא אינה יכולה להכיל שדות",
      "היא אינה יכולה להכיל מתודות"
    ],
    correctAnswer: "ניתן ליצור ממנה מספר אובייקטים שונים"
  },
  {
    id: "oop_classes_objects_4",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "אם למחלקה <span dir='ltr'>Car</span> יש שדות <span dir='ltr'>brand</span> ו-<span dir='ltr'>year</span>, מה מתאר האובייקט <span dir='ltr'>myCar</span>?",
    options: [
      "שם של מחלקה חדשה",
      "מופע מסוים של המחלקה <span dir='ltr'>Car</span>",
      "רק את ערך השדה <span dir='ltr'>brand</span>",
      "רשימת כל המכוניות במערכת"
    ],
    correctAnswer: "מופע מסוים של המחלקה <span dir='ltr'>Car</span>"
  },
  {
    id: "oop_classes_objects_5",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו תפקידו העיקרי של בנאי <span dir='ltr'>(constructor)</span>?",
    options: [
      "למחוק אובייקטים מהזיכרון",
      "לאתחל את האובייקט בעת יצירתו",
      "למנוע יצירת אובייקטים חדשים",
      "להחליף את כל המתודות במחלקה"
    ],
    correctAnswer: "לאתחל את האובייקט בעת יצירתו"
  },
  {
    id: "oop_classes_objects_6",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה נהוג להגדיר שדות כ-<span dir='ltr'>private</span> ולספק גישה דרך מתודות?",
    options: [
      "כדי לחסוך בזיכרון בלבד",
      "כדי לשמור על עקרון הכמסה ולשלוט בגישה לנתונים",
      "כדי שכל מחלקה אחרת תוכל לגשת חופשי לשדות",
      "כדי למנוע יצירת אובייקטים"
    ],
    correctAnswer: "כדי לשמור על עקרון הכמסה ולשלוט בגישה לנתונים"
  },
  {
    id: "oop_classes_objects_7",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים <span dir='ltr'>UML</span> מופיעה מחלקה עם שלושה אזורים: שם המחלקה, שדות ומתודות. מה מייצג האזור האמצעי?",
    imageUrl: "/question-images/oop_classes_objects_7.png",
    options: [
      "רשימת האובייקטים שנוצרו מהמחלקה",
      "רשימת התכונות <span dir='ltr'>(attributes)</span> של המחלקה",
      "רשימת הממשקים שהמחלקה מממשת",
      "רק את הבנאים של המחלקה"
    ],
    correctAnswer: "רשימת התכונות <span dir='ltr'>(attributes)</span> של המחלקה"
  },
  {
    id: "oop_classes_objects_8",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בקטע קוד מוצג יצירת אובייקט באמצעות <span dir='ltr'>new Student()</span>. מה הפעולה הזו מבצעת?",
    imageUrl: "/question-images/oop_classes_objects_8.png",
    options: [
      "מכריזה על מחלקה חדשה בשם <span dir='ltr'>Student</span>",
      "יוצרת מופע חדש של המחלקה <span dir='ltr'>Student</span>",
      "מוחקת מופע קיים של <span dir='ltr'>Student</span>",
      "משנה את סוג המשתנה ל-<span dir='ltr'>String</span>"
    ],
    correctAnswer: "יוצרת מופע חדש של המחלקה <span dir='ltr'>Student</span>"
  },
  {
    id: "oop_classes_objects_9",
    courseId: "oop",
    subTopic: "classes_objects",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם בתרשים נראים שני אובייקטים מאותה מחלקה עם ערכי שדות שונים, עדיין שניהם יכולים להיות מאותו טיפוס.",
    imageUrl: "/question-images/oop_classes_objects_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // ירושה
  // =========================
  {
    id: "oop_inheritance_1",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו היתרון המרכזי של ירושה?",
    options: [
      "היא מונעת שימוש במתודות",
      "היא מאפשרת למחלקה לגזור תכונות והתנהגויות ממחלקה אחרת",
      "היא מחייבת שכל המחלקות יהיו זהות",
      "היא משמשת רק להצגת ממשקי משתמש"
    ],
    correctAnswer: "היא מאפשרת למחלקה לגזור תכונות והתנהגויות ממחלקה אחרת"
  },
  {
    id: "oop_inheritance_2",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "אם המחלקה Dog יורשת מהמחלקה Animal, מה המשמעות הנכונה של הקשר ביניהן?",
    options: [
      "Dog יכולה לרשת שדות ומתודות מ-Animal",
      "Animal יורשת את כל ההתנהגות של Dog",
      "Dog אינה יכולה להוסיף מתודות חדשות",
      "אין קשר בין המחלקות"
    ],
    correctAnswer: "Dog יכולה לרשת שדות ומתודות מ-Animal"
  },
  {
    id: "oop_inheritance_3",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי מחלקת בן בירושה?",
    options: [
      "מחלקת בן יכולה להוסיף שדות ומתודות מעבר למה שירשה ממחלקת האב",
      "מחלקת בן חייבת להיות זהה לחלוטין למחלקת האב",
      "מחלקת בן אינה יכולה להשתמש במתודות של מחלקת האב",
      "מחלקת בן אינה יכולה להכיל בנאי"
    ],
    correctAnswer: "מחלקת בן יכולה להוסיף שדות ומתודות מעבר למה שירשה ממחלקת האב"
  },
  {
    id: "oop_inheritance_4",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה תפקיד הקריאה ל-<span dir='ltr'>super()</span> בבנאי של מחלקת בן?",
    options: [
      "לקרוא לבנאי של מחלקת האב",
      "ליצור אובייקט חדש ממחלקת הבן",
      "למחוק את תכונות מחלקת האב",
      "למנוע ירושה"
    ],
    correctAnswer: "לקרוא לבנאי של מחלקת האב"
  },
  {
    id: "oop_inheritance_5",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזה קשר מתאים לירושה?",
    options: [
      "<span dir='ltr'>Car is-a Vehicle</span>",
      "<span dir='ltr'>Car has-a Wheel</span>",
      "<span dir='ltr'>Student uses-a Course</span>",
      "<span dir='ltr'>Teacher contains-a School</span>"
    ],
    correctAnswer: "<span dir='ltr'>Car is-a Vehicle</span>"
  },
  {
    id: "oop_inheritance_6",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מתי ירושה עלולה להיות בחירה פחות טובה מהרכבה <span dir='ltr'>(composition)</span>?",
    options: [
      "כאשר אין קשר של <span dir='ltr'>is-a</span> בין המחלקות",
      "כאשר רוצים לכתוב קוד מסודר יותר",
      "כאשר יש יותר ממחלקה אחת במערכת",
      "כאשר יש שימוש בבנאים"
    ],
    correctAnswer: "כאשר אין קשר של <span dir='ltr'>is-a</span> בין המחלקות"
  },
  {
    id: "oop_inheritance_7",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים <span dir='ltr'>UML</span> חץ עם משולש חלול ממחלקת <span dir='ltr'>Dog</span> אל <span dir='ltr'>Animal</span> מייצג:",
    imageUrl: "/question-images/oop_inheritance_7.png",
    options: [
      "אסוציאציה",
      "הרכבה",
      "ירושה",
      "מימוש ממשק בלבד"
    ],
    correctAnswer: "ירושה"
  },
  {
    id: "oop_inheritance_8",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור מוצג עץ מחלקות שבו <span dir='ltr'>Manager</span> ו-<span dir='ltr'>Developer</span> יורשות מ-<span dir='ltr'>Employee</span>. מהו <span dir='ltr'>Employee</span>?",
    imageUrl: "/question-images/oop_inheritance_8.png",
    options: [
      "מחלקת בן",
      "מחלקת אב",
      "אובייקט",
      "מתודה"
    ],
    correctAnswer: "מחלקת אב"
  },
  {
    id: "oop_inheritance_9",
    courseId: "oop",
    subTopic: "inheritance",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם מחלקת בן דורסת מתודה של האב, עדיין ייתכן שתהיה לה גישה לגרסה של האב דרך <span dir='ltr'>super</span>.",
    imageUrl: "/question-images/oop_inheritance_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // פולימורפיזם
  // =========================
  {
    id: "oop_polymorphism_1",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו פולימורפיזם בתכנות מונחה עצמים?",
    options: [
      "שימוש במחלקה אחת בלבד בכל המערכת",
      "היכולת של אובייקטים מסוגים שונים להגיב לאותה פעולה בצורה שונה",
      "איסור על ירושה",
      "הפיכת כל השדות לציבוריים"
    ],
    correctAnswer: "היכולת של אובייקטים מסוגים שונים להגיב לאותה פעולה בצורה שונה"
  },
  {
    id: "oop_polymorphism_2",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה מאפשר פולימורפיזם כאשר משתמשים במשתנה מטיפוס מחלקת אב?",
    options: [
      "להפנות למופעים של מחלקות בן ולהפעיל התנהגות מתאימה בזמן ריצה",
      "למנוע יצירת אובייקטים חדשים",
      "להפוך את כל השדות לציבוריים",
      "לבטל את הצורך בירושה"
    ],
    correctAnswer: "להפנות למופעים של מחלקות בן ולהפעיל התנהגות מתאימה בזמן ריצה"
  },
  {
    id: "oop_polymorphism_3",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "בפולימורפיזם, לפי מה נקבעת גרסת המתודה שתופעל בזמן ריצה?",
    options: [
      "לפי הטיפוס האמיתי של האובייקט שנוצר",
      "לפי שם המשתנה בלבד",
      "לפי מספר השדות במחלקה",
      "לפי סדר המחלקות בקובץ"
    ],
    correctAnswer: "לפי הטיפוס האמיתי של האובייקט שנוצר"
  },
  {
    id: "oop_polymorphism_4",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>Animal a = new Dog()</span> ו-<span dir='ltr'>Dog</span> דרסה את המתודה <span dir='ltr'>makeSound()</span>, איזו גרסה תופעל?",
    options: [
      "של <span dir='ltr'>Animal</span> תמיד",
      "של <span dir='ltr'>Dog</span>",
      "לא ניתן לקרוא למתודה",
      "של המחלקה שנוצרה אחרונה במערכת"
    ],
    correctAnswer: "של <span dir='ltr'>Dog</span>"
  },
  {
    id: "oop_polymorphism_5",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהי המטרה המרכזית של שימוש בממשק <span dir='ltr'>(interface)</span> בהקשר של פולימורפיזם?",
    options: [
      "למנוע כתיבת מחלקות",
      "לאפשר עבודה מול חוזה משותף בלי תלות במימוש ספציפי",
      "להפוך כל מתודה לפרטית",
      "להחליף ירושה בכל מקרה"
    ],
    correctAnswer: "לאפשר עבודה מול חוזה משותף בלי תלות במימוש ספציפי"
  },
  {
    id: "oop_polymorphism_6",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "איזה יתרון מרכזי נותן פולימורפיזם בקוד גדול?",
    options: [
      "צמצום הצורך בבדיקות תנאי לפי סוגים קונקרטיים",
      "ביטול מוחלט של שימוש במתודות",
      "הקטנת מספר המחלקות בהכרח",
      "מניעת שימוש בממשקים"
    ],
    correctAnswer: "צמצום הצורך בבדיקות תנאי לפי סוגים קונקרטיים"
  },
  {
    id: "oop_polymorphism_7",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים מופיעות כמה מחלקות שמממשות את אותו ממשק <span dir='ltr'>Shape</span>. מה ניתן לעשות בעזרת זה?",
    imageUrl: "/question-images/oop_polymorphism_7.png",
    options: [
      "להחזיק את כולן במבנה אחד ולקרא ל-<span dir='ltr'>draw()</span> בלי לדעת את הסוג המדויק",
      "למנוע יצירת אובייקטים מהמחלקות",
      "למחוק את המתודה <span dir='ltr'>draw()</span> מהמחלקות",
      "להשתמש רק במחלקה אחת מתוך כולן"
    ],
    correctAnswer: "להחזיק את כולן במבנה אחד ולקרא ל-<span dir='ltr'>draw()</span> בלי לדעת את הסוג המדויק"
  },
  {
    id: "oop_polymorphism_8",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בקטע קוד מוצגת לולאה שעוברת על רשימת <span dir='ltr'>Animal</span> וקוראת לכל איבר <span dir='ltr'>makeSound()</span>. מה בא לידי ביטוי?",
    imageUrl: "/question-images/oop_polymorphism_8.png",
    options: [
      "כמסה",
      "פולימורפיזם בזמן ריצה",
      "בנאי העתקה",
      "אסוציאציה חד-כיוונית"
    ],
    correctAnswer: "פולימורפיזם בזמן ריצה"
  },
  {
    id: "oop_polymorphism_9",
    courseId: "oop",
    subTopic: "polymorphism",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "ייתכן שמופע של מחלקת בן יישמר במשתנה מטיפוס האב, אך עדיין יופעלו מתודות שדרס הבן.",
    imageUrl: "/question-images/oop_polymorphism_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // דפוסי עיצוב
  // =========================
  {
    id: "oop_design_patterns_1",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו דפוס עיצוב <span dir='ltr'>(Design Pattern)</span>?",
    options: [
      "קוד מוכן להעתקה לכל מצב",
      "פתרון כללי ומקובל לבעיה תכנונית חוזרת",
      "ספרייה חיצונית שחייבים להשתמש בה",
      "רק שם אחר לירושה"
    ],
    correctAnswer: "פתרון כללי ומקובל לבעיה תכנונית חוזרת"
  },
  {
    id: "oop_design_patterns_2",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "באיזה מצב דפוס Singleton מתאים במיוחד?",
    options: [
      "כאשר רוצים להבטיח שקיים מופע יחיד של מחלקה ולספק אליו גישה מבוקרת",
      "כאשר רוצים ליצור מופע חדש בכל קריאה",
      "כאשר רוצים למנוע שימוש במחלקות",
      "כאשר רוצים להחליף כל ממשק בירושה"
    ],
    correctAnswer: "כאשר רוצים להבטיח שקיים מופע יחיד של מחלקה ולספק אליו גישה מבוקרת"
  },
  {
    id: "oop_design_patterns_3",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "מהו תפקידם של דפוסי עיצוב בתכנון תוכנה?",
    options: [
      "לספק פתרונות כלליים לבעיות תכנוניות חוזרות",
      "להחליף את הצורך בהבנת הבעיה",
      "למנוע שימוש במחלקות ואובייקטים",
      "לשמש רק כקוד מוכן להעתקה"
    ],
    correctAnswer: "לספק פתרונות כלליים לבעיות תכנוניות חוזרות"
  },
  {
    id: "oop_design_patterns_4",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "באיזה מצב דפוס <span dir='ltr'>Factory</span> מתאים במיוחד?",
    options: [
      "כאשר רוצים לחשוף ללקוח את כל פרטי יצירת האובייקט",
      "כאשר רוצים להפריד בין הקוד שמשתמש באובייקט לבין הקוד שיוצר אותו",
      "כאשר אין כלל צורך באובייקטים",
      "כאשר משתמשים רק במחלקות סטטיות"
    ],
    correctAnswer: "כאשר רוצים להפריד בין הקוד שמשתמש באובייקט לבין הקוד שיוצר אותו"
  },
  {
    id: "oop_design_patterns_5",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו היתרון המרכזי של דפוס <span dir='ltr'>Observer</span>?",
    options: [
      "הוא מבטל את הצורך באירועים",
      "הוא מאפשר לכמה מאזינים להתעדכן אוטומטית כאשר אובייקט מסוים משתנה",
      "הוא יוצר תמיד מופע יחיד",
      "הוא מחייב שימוש בירושה בלבד"
    ],
    correctAnswer: "הוא מאפשר לכמה מאזינים להתעדכן אוטומטית כאשר אובייקט מסוים משתנה"
  },
  {
    id: "oop_design_patterns_6",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה שימוש לא נכון בדפוסי עיצוב עלול להזיק?",
    options: [
      "כי כל דפוס עיצוב אסור בפרויקטים קטנים",
      "כי דפוסים מוסיפים מורכבות מיותרת אם אין להם צורך אמיתי",
      "כי דפוסים לא עובדים עם מחלקות",
      "כי דפוסים מונעים כתיבת בדיקות"
    ],
    correctAnswer: "כי דפוסים מוסיפים מורכבות מיותרת אם אין להם צורך אמיתי"
  },
  {
    id: "oop_design_patterns_7",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים נראה אובייקט מרכזי שאליו נרשמים כמה מאזינים, וכאשר מצבו משתנה כולם מתעדכנים. איזה דפוס מוצג?",
    imageUrl: "/question-images/oop_design_patterns_7.png",
    options: [
      "<span dir='ltr'>Singleton</span>",
      "<span dir='ltr'>Factory</span>",
      "<span dir='ltr'>Observer</span>",
      "<span dir='ltr'>Builder</span>"
    ],
    correctAnswer: "<span dir='ltr'>Observer</span>"
  },
  {
    id: "oop_design_patterns_8",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור נראה מחלקה עם בנאי פרטי ומתודה סטטית שמחזירה את אותו מופע בכל פעם. איזה דפוס זה?",
    imageUrl: "/question-images/oop_design_patterns_8.png",
    options: [
      "<span dir='ltr'>Factory</span>",
      "<span dir='ltr'>Singleton</span>",
      "<span dir='ltr'>Strategy</span>",
      "<span dir='ltr'>Decorator</span>"
    ],
    correctAnswer: "<span dir='ltr'>Singleton</span>"
  },
  {
    id: "oop_design_patterns_9",
    courseId: "oop",
    subTopic: "design_patterns",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "בתרשים <span dir='ltr'>Factory</span> הלקוח בדרך כלל מבקש אובייקט דרך שכבת יצירה, ולא יוצר אותו ישירות עם <span dir='ltr'>new</span>.",
    imageUrl: "/question-images/oop_design_patterns_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];
