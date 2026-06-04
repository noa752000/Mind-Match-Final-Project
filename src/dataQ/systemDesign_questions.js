export const systemDesignQuestions = [
  // =========================
  // ARCHITECTURE
  // =========================
  {
    id: "arch_1",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהי המטרה המרכזית של ארכיטקטורת תוכנה?",
    options: [
      "להגדיר את המבנה והרכיבים של המערכת",
      "לכתוב קוד בצורה מהירה יותר",
      "ליצור מסד נתונים",
      "לבדוק ביצועים בלבד"
    ],
    correctAnswer: "להגדיר את המבנה והרכיבים של המערכת"
  },
  {
    id: "arch_2",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו היתרון המרכזי של ארכיטקטורת שכבות (Layered Architecture)?",
    options: [
      "הפרדת אחריות בין רכיבי המערכת",
      "ביצועים גבוהים יותר תמיד",
      "ביטול הצורך במסד נתונים",
      "הקטנת מספר המשתמשים"
    ],
    correctAnswer: "הפרדת אחריות בין רכיבי המערכת"
  },
  {
    id: "arch_3",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי ארכיטקטורת תוכנה?",
    options: [
      "היא מגדירה את מבנה המערכת ואת הקשרים בין רכיביה",
      "היא מחליפה את שלב האפיון",
      "היא עוסקת רק בעיצוב ממשק משתמש",
      "היא רלוונטית רק למערכות גדולות"
    ],
    correctAnswer: "היא מגדירה את מבנה המערכת ואת הקשרים בין רכיביה"
  },
  {
    id: "arch_4",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "חברה מפתחת מערכת גדולה המורכבת ממספר שירותים עצמאיים. כל צוות אחראי על שירות אחר ורוצה לפרוס עדכונים בנפרד. איזו ארכיטקטורה תתאים ביותר?",
    options: [
      "Microservices",
      "Monolith",
      "Client-Server בסיסית",
      "Single Layer"
    ],
    correctAnswer: "Microservices"
  },
  {
    id: "arch_5",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "סטארטאפ קטן מפתח מערכת ראשונית עם צוות פיתוח מצומצם ודרישות פשוטות יחסית. איזו ארכיטקטורה תהיה הבחירה המתאימה ביותר בשלב זה?",
    options: [
      "Monolith",
      "Microservices",
      "Event Driven",
      "Serverless"
    ],
    correctAnswer: "Monolith"
  },
  {
    id: "arch_6",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו היתרון המרכזי של Microservices לעומת Monolith?",
    options: [
      "ניתן לפתח, לבדוק ולפרוס כל שירות בנפרד",
      "אין צורך בתקשורת בין רכיבים",
      "המערכת תמיד מהירה יותר",
      "אין צורך בתחזוקה"
    ],
    correctAnswer: "ניתן לפתח, לבדוק ולפרוס כל שירות בנפרד"
  },
  {
    id: "arch_7",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו ארכיטקטורה מחלקת לשכבות?",
    imageUrl: "/question-images/SA-layered-architecture.png",
    options: ["Layered", "Microservices", "MVC", "Monolithic"],
    correctAnswer: "Layered"
  },
  {
    id: "arch_8",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה סוג מתאים למערכת מבוזרת?",
    imageUrl: "/question-images/SA-microservices-architecture.png",
    options: ["Microservices", "Monolithic", "Layered", "MVC"],
    correctAnswer: "Microservices"
  },
  {
    id: "arch_9",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "ב-Layered Architecture כל שכבה יכולה לגשת ישירות לכל שכבה אחרת.",
    imageUrl: "/question-images/SA-layered-architecture.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  },

  // =========================
  // UML
  // =========================
  {
    id: "uml_1",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהי המטרה המרכזית של UML?",
    options: [
      "לתאר ולתכנן מערכות באמצעות דיאגרמות",
      "לכתוב קוד באופן אוטומטי",
      "לנהל מסדי נתונים",
      "לבצע בדיקות תוכנה"
    ],
    correctAnswer: "לתאר ולתכנן מערכות באמצעות דיאגרמות"
  },
  {
    id: "uml_2",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מידע ניתן למצוא ב-Class Diagram?",
    options: [
      "מחלקות, מאפיינים, פעולות וקשרים ביניהן",
      "סדר הפעולות במערכת",
      "מסכי המערכת",
      "בדיקות המערכת"
    ],
    correctAnswer: "מחלקות, מאפיינים, פעולות וקשרים ביניהן"
  },
  {
    id: "uml_3",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי UML?",
    options: [
      "UML הוא תקן מקובל לתיאור מערכות תוכנה",
      "UML משמש רק לפיתוח אתרים",
      "UML מחליף את שלב האפיון",
      "UML מיועד רק למסדי נתונים"
    ],
    correctAnswer: "UML הוא תקן מקובל לתיאור מערכות תוכנה"
  },
  {
    id: "uml_4",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מנהל הפרויקט רוצה להבין אילו משתמשים מתקשרים עם המערכת ואילו פעולות הם מבצעים. איזו דיאגרמה תהיה המתאימה ביותר?",
    options: [
      "Use Case Diagram",
      "Class Diagram",
      "Sequence Diagram",
      "Activity Diagram"
    ],
    correctAnswer: "Use Case Diagram"
  },
  {
    id: "uml_5",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "צוות הפיתוח מעוניין לתאר את סדר ההודעות בין אובייקטים במהלך תהליך התחברות למערכת. איזו דיאגרמה תתאים ביותר?",
    options: [
      "Sequence Diagram",
      "Class Diagram",
      "Use Case Diagram",
      "Component Diagram"
    ],
    correctAnswer: "Sequence Diagram"
  },
  {
    id: "uml_6",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "הארכיטקט רוצה להבין את מבנה המחלקות והקשרים ביניהן, אך אינו מעוניין להציג את רצף הפעולות במערכת. איזו דיאגרמה תספק את המידע המתאים ביותר?",
    options: [
      "Class Diagram",
      "Sequence Diagram",
      "Use Case Diagram",
      "Activity Diagram"
    ],
    correctAnswer: "Class Diagram"
  },
  {
    id: "uml_7",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים מציג מחלקות?",
    imageUrl: "/question-images/SA-class-diagram.png",
    options: ["Class Diagram", "Use Case Diagram", "Sequence Diagram", "Activity Diagram"],
    correctAnswer: "Class Diagram"
  },
  {
    id: "uml_8",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים מציג אינטראקציה?",
    imageUrl: "/question-images/SA-use-case-diagram.png",
    options: ["Use Case Diagram", "Class Diagram", "Activity Diagram", "Component Diagram"],
    correctAnswer: "Use Case Diagram"
  },
  {
    id: "uml_9",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Class diagram יכול להציג גם קשרים בין מחלקות.",
    imageUrl: "/question-images/SA-class-diagram.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // REQUIREMENTS
  // =========================
  {
    id: "req_1",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהי המטרה המרכזית של שלב ניתוח הדרישות?",
    options: [
      "להבין ולתעד את צרכי המשתמשים והמערכת",
      "לכתוב את קוד המערכת",
      "לבצע בדיקות תוכנה",
      "להקים את מסד הנתונים"
    ],
    correctAnswer: "להבין ולתעד את צרכי המשתמשים והמערכת"
  },
  {
    id: "req_2",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזו מהאפשרויות הבאות היא דוגמה לדרישה פונקציונלית?",
    options: [
      "המשתמש יוכל להתחבר למערכת באמצעות שם משתמש וסיסמה",
      "זמן התגובה של המערכת יהיה עד 2 שניות",
      "המערכת תהיה זמינה 99% מהזמן",
      "המידע יוצפן בזמן העברה"
    ],
    correctAnswer: "המשתמש יוכל להתחבר למערכת באמצעות שם משתמש וסיסמה"
  },
  {
    id: "req_3",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי דרישות מערכת?",
    options: [
      "דרישות מגדירות מה המערכת צריכה לעשות",
      "דרישות נכתבות רק לאחר הפיתוח",
      "דרישות מיועדות רק למתכנתים",
      "דרישות מחליפות את שלב הבדיקות"
    ],
    correctAnswer: "דרישות מגדירות מה המערכת צריכה לעשות"
  },
  {
    id: "req_4",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "לקוח מבקש שהמערכת תגיב תוך פחות משתי שניות לכל פעולה. לאיזה סוג דרישה שייך הבקשה?",
    options: [
      "דרישה לא פונקציונלית",
      "דרישה פונקציונלית",
      "Use Case",
      "תרחיש משתמש"
    ],
    correctAnswer: "דרישה לא פונקציונלית"
  },
  {
    id: "req_5",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "במסמך הדרישות נכתב: 'המערכת תהיה ידידותית למשתמש'. מה הבעיה המרכזית בדרישה זו?",
    options: [
      "הדרישה אינה מדידה וברורה",
      "הדרישה מפורטת מדי",
      "הדרישה טכנית מדי",
      "אין שום בעיה בדרישה"
    ],
    correctAnswer: "הדרישה אינה מדידה וברורה"
  },
  {
    id: "req_6",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "במהלך הפיתוח התברר שכל חבר צוות פירש את אותה דרישה בצורה שונה. מה הסיבה הסבירה ביותר לכך?",
    options: [
      "הדרישה נוסחה באופן לא ברור",
      "מסד הנתונים לא תוכנן נכון",
      "נבחרה ארכיטקטורה לא מתאימה",
      "לא נוצרו דיאגרמות UML"
    ],
    correctAnswer: "הדרישה נוסחה באופן לא ברור"
  },
  {
    id: "req_7",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים עוזר בדרישות?",
    imageUrl: "/question-images/SA-use-case-diagram.png",
    options: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "ERD"],
    correctAnswer: "Use Case Diagram"
  },
  {
    id: "req_8",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה מתאר משתמש?",
    imageUrl: "/question-images/SA-use-case-diagram.png",
    options: ["Actor", "Use Case", "Class", "Component"],
    correctAnswer: "Actor"
  },
  {
    id: "req_9",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Actor בתרשים Use Case יכול לייצג גם מערכת חיצונית ולא רק אדם.",
    imageUrl: "/question-images/SA-use-case-diagram.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // METHODOLOGIES
  // =========================
  {
    id: "meth_1",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהי מתודולוגיית פיתוח תוכנה?",
    options: [
      "גישה מסודרת לניהול וביצוע תהליך הפיתוח",
      "שפת תכנות",
      "סוג של מסד נתונים",
      "כלי לבדיקות תוכנה"
    ],
    correctAnswer: "גישה מסודרת לניהול וביצוע תהליך הפיתוח"
  },
  {
    id: "meth_2",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו אחד העקרונות המרכזיים של Agile?",
    options: [
      "יכולת להסתגל לשינויים במהלך הפרויקט",
      "תכנון מלא של כל המערכת מראש בלבד",
      "מניעת תקשורת עם הלקוח",
      "פיתוח כל המערכת בגרסה אחת"
    ],
    correctAnswer: "יכולת להסתגל לשינויים במהלך הפרויקט"
  },
  {
    id: "meth_3",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי Agile?",
    options: [
      "הפיתוח מתבצע באיטרציות קצרות",
      "הלקוח מעורב רק בסוף הפרויקט",
      "לא מתבצע תכנון כלל",
      "אין צורך בבדיקות"
    ],
    correctAnswer: "הפיתוח מתבצע באיטרציות קצרות"
  },
  {
    id: "meth_4",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "פרויקט כולל דרישות יציבות ומוגדרות היטב מראש, עם מעט מאוד שינויים צפויים. איזו מתודולוגיה עשויה להתאים יותר?",
    options: [
      "Waterfall",
      "Agile",
      "Scrum בלבד",
      "Kanban בלבד"
    ],
    correctAnswer: "Waterfall"
  },
  {
    id: "meth_5",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "לקוח משנה דרישות לעיתים קרובות במהלך הפרויקט. איזו גישה תהיה המתאימה ביותר?",
    options: [
      "Agile",
      "Waterfall",
      "Big Bang",
      "Code and Fix"
    ],
    correctAnswer: "Agile"
  },
  {
    id: "meth_6",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "צוות פיתוח מעוניין לקבל משוב מהלקוח לאורך כל הפרויקט ולשחרר גרסאות בתדירות גבוהה. איזו מתודולוגיה תתמוך בצורה הטובה ביותר בדרישה זו?",
    options: [
      "Agile",
      "Waterfall",
      "V-Model",
      "Spiral בלבד"
    ],
    correctAnswer: "Agile"
  },
  {
    id: "meth_7",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שיטה איטרטיבית?",
    imageUrl: "/question-images/SA-methodologies-comparison.png",
    options: ["Agile", "Waterfall", "Spiral", "V-Model"],
    correctAnswer: "Agile"
  },
  {
    id: "meth_8",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שיטה לינארית?",
    imageUrl: "/question-images/SA-methodologies-comparison.png",
    options: ["Waterfall", "Agile", "Spiral", "Kanban"],
    correctAnswer: "Waterfall"
  },
  {
    id: "meth_9",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "ב-Agile כל דרישות המערכת חייבות להיות מוגדרות ומאושרות לפני תחילת הפיתוח.",
    imageUrl: "/question-images/SA-methodologies-comparison.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  }
];