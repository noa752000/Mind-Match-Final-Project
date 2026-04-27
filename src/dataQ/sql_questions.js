export const sqlQuestions = [
  // =========================
  // SELECT + WHERE
  // =========================
  {
    id: "sql_select_where_1",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה עושה הפקודה SELECT?",
    options: ["מוחקת נתונים", "מחזירה נתונים", "מעדכנת נתונים", "יוצרת טבלה"],
    correctAnswer: "מחזירה נתונים"
  },
  {
    id: "sql_select_where_2",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה תפקידה של WHERE?",
    options: ["מיון", "סינון", "חיבור טבלאות", "יצירת טבלה"],
    correctAnswer: "סינון"
  },
  {
    id: "sql_select_where_3",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "WHERE משמש לסינון נתונים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_select_where_4",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו שאילתה נכונה?",
    options: [
      "<span dir='ltr'>SELECT * FROM users WHERE age > 18</span>",
      "<span dir='ltr'>SELECT users age > 18</span>",
      "<span dir='ltr'>WHERE age > 18</span>",
      "<span dir='ltr'>SELECT age users</span>"
    ],
    correctAnswer: "<span dir='ltr'>SELECT * FROM users WHERE age > 18</span>"
  },
  {
    id: "sql_select_where_5",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מה תחזיר SELECT name FROM users WHERE age = 20?",
    options: ["כל המשתמשים", "רק שמות בני 20", "רק גילאים", "שום דבר"],
    correctAnswer: "רק שמות בני 20"
  },
  {
    id: "sql_select_where_6",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "SELECT * תמיד מסנן נתונים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  },
  {
    id: "sql_select_where_7",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שאילתה תחזיר רק שמות?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>SELECT name FROM users</span>",
      "<span dir='ltr'>SELECT * FROM users</span>",
      "<span dir='ltr'>SELECT age FROM users</span>",
      "<span dir='ltr'>FROM users</span>"
    ],
    correctAnswer: "<span dir='ltr'>SELECT name FROM users</span>"
  },
  {
    id: "sql_select_where_8",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שאילתה משתמשת ב-WHERE?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>SELECT * FROM users WHERE age > 30</span>",
      "<span dir='ltr'>SELECT users</span>",
      "<span dir='ltr'>FROM users</span>",
      "<span dir='ltr'>ORDER BY age</span>"
    ],
    correctAnswer: "<span dir='ltr'>SELECT * FROM users WHERE age > 30</span>"
  },
  {
    id: "sql_select_where_9",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "ניתן לבחור חלק מהשורות עם WHERE.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // JOINS
  // =========================
  {
    id: "sql_joins_1",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה עושה JOIN?",
    options: ["מוחק", "מחבר טבלאות", "יוצר טבלה", "ממיין"],
    correctAnswer: "מחבר טבלאות"
  },
  {
    id: "sql_joins_2",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה עושה INNER JOIN?",
    options: ["הכל", "רק התאמות", "רק טבלה אחת", "מוחק"],
    correctAnswer: "רק התאמות"
  },
  {
    id: "sql_joins_3",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "JOIN מחבר טבלאות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_joins_4",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה ההבדל בין LEFT JOIN ל-INNER JOIN?",
    options: [
      "אין הבדל",
      "LEFT כולל גם ללא התאמה",
      "INNER כולל הכל",
      "LEFT מוחק נתונים"
    ],
    correctAnswer: "LEFT כולל גם ללא התאמה"
  },
  {
    id: "sql_joins_5",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "איזו שאילתה מחברת בין טבלאות?",
    options: [
      "<span dir='ltr'>SELECT * FROM A JOIN B ON A.id=B.id</span>",
      "<span dir='ltr'>SELECT A B</span>",
      "<span dir='ltr'>WHERE JOIN</span>",
      "<span dir='ltr'>FROM A,B</span>"
    ],
    correctAnswer: "<span dir='ltr'>SELECT * FROM A JOIN B ON A.id=B.id</span>"
  },
  {
    id: "sql_joins_6",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "INNER JOIN מחזיר רק התאמות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_joins_7",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שאילתה מחברת טבלאות?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>JOIN</span>",
      "<span dir='ltr'>SELECT</span>",
      "<span dir='ltr'>WHERE</span>",
      "<span dir='ltr'>ORDER</span>"
    ],
    correctAnswer: "<span dir='ltr'>JOIN</span>"
  },
  {
    id: "sql_joins_8",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה דרוש ל-JOIN?",
    imageUrl: "",
    options: ["תנאי ON", "DELETE", "DROP", "INDEX"],
    correctAnswer: "תנאי ON"
  },
  {
    id: "sql_joins_9",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "JOIN דורש תנאי חיבור.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // NORMALIZATION
  // =========================
  {
    id: "sql_norm_1",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה מטרת נרמול?",
    options: ["כפילויות", "מניעת כפילויות", "מיון", "מחיקה"],
    correctAnswer: "מניעת כפילויות"
  },
  {
    id: "sql_norm_2",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "נרמול משפר מבנה נתונים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_norm_3",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה בעיה בטבלה לא מנורמלת?",
    options: ["כפילויות", "מהירה", "קלה", "אין בעיה"],
    correctAnswer: "כפילויות"
  },
  {
    id: "sql_norm_4",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "נרמול מפחית כפילויות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_norm_5",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה נרמול חשוב?",
    options: ["אחידות", "כפילויות", "שגיאות", "כולם"],
    correctAnswer: "כולם"
  },
  {
    id: "sql_norm_6",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "נרמול פוגע בביצועים תמיד.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  },
  {
    id: "sql_norm_7",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו טבלה מנורמלת?",
    imageUrl: "",
    options: ["מפוצלת", "כפולה", "לא מסודרת", "ריקה"],
    correctAnswer: "מפוצלת"
  },
  {
    id: "sql_norm_8",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה נראה בטבלה לא מנורמלת?",
    imageUrl: "",
    options: ["כפילויות", "סדר", "דיוק", "חיבור"],
    correctAnswer: "כפילויות"
  },
  {
    id: "sql_norm_9",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "טבלה מנורמלת מפחיתה כפילויות.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // OPTIMIZATION
  // =========================
  {
    id: "sql_opt_1",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה משפר ביצועים?",
    options: ["Index", "DELETE", "DROP", "NULL"],
    correctAnswer: "Index"
  },
  {
    id: "sql_opt_2",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "Index משפר ביצועים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_opt_3",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה לא טוב לביצועים?",
    options: ["SELECT *", "Index", "WHERE", "JOIN"],
    correctAnswer: "SELECT *"
  },
  {
    id: "sql_opt_4",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "SELECT * תמיד יעיל.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  },
  {
    id: "sql_opt_5",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "למה להשתמש ב-index?",
    options: ["מהירות", "מחיקה", "טבלה", "קוד"],
    correctAnswer: "מהירות"
  },
  {
    id: "sql_opt_6",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Index עוזר בחיפוש.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sql_opt_7",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה מאיץ שאילתה?",
    imageUrl: "",
    options: ["Index", "DELETE", "DROP", "NULL"],
    correctAnswer: "Index"
  },
  {
    id: "sql_opt_8",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה גורם לאיטיות?",
    imageUrl: "",
    options: ["SELECT *", "Index", "WHERE", "JOIN"],
    correctAnswer: "SELECT *"
  },
  {
    id: "sql_opt_9",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Index משפר ביצועים.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];