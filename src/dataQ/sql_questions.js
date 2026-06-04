export const sqlQuestions = [
  // =========================
  // SELECT / WHERE
  // =========================
  {
    id: "sql_select_where_1",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מה עושה הפקודה SELECT ב-SQL?",
    options: [
      "מחזירה נתונים מתוך טבלה",
      "מוחקת נתונים מטבלה",
      "מעדכנת נתונים קיימים",
      "יוצרת טבלה חדשה"
    ],
    correctAnswer: "מחזירה נתונים מתוך טבלה"
  },
  {
    id: "sql_select_where_2",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה תפקידה של פקודת WHERE בשאילתת SQL?",
    options: [
      "סינון רשומות לפי תנאי",
      "מיון תוצאות השאילתה",
      "חיבור בין טבלאות",
      "יצירת עמודה חדשה"
    ],
    correctAnswer: "סינון רשומות לפי תנאי"
  },
  {
    id: "sql_select_where_3",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי SELECT ו-WHERE?",
    options: [
      "SELECT בוחר אילו עמודות להחזיר, ו-WHERE מסנן אילו רשומות יוחזרו",
      "SELECT מסנן רשומות, ו-WHERE יוצר טבלה חדשה",
      "WHERE מחייב תמיד שימוש ב-JOIN",
      "SELECT משמש רק למחיקת נתונים"
    ],
    correctAnswer: "SELECT בוחר אילו עמודות להחזיר, ו-WHERE מסנן אילו רשומות יוחזרו"
  },
  {
    id: "sql_select_where_4",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו שאילתה תחזיר את כל המשתמשים שגילם גדול מ-18?",
    options: [
      "SELECT * FROM users WHERE age > 18",
      "SELECT users WHERE age > 18",
      "WHERE age > 18 FROM users",
      "SELECT age > 18 FROM users"
    ],
    correctAnswer: "SELECT * FROM users WHERE age > 18"
  },
  {
    id: "sql_select_where_5",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה תחזיר השאילתה SELECT name FROM users WHERE age = 20?",
    options: [
      "רק את שמות המשתמשים שגילם 20",
      "את כל המשתמשים בטבלה",
      "רק את הגילאים של המשתמשים",
      "את כל המשתמשים ששמם הוא age"
    ],
    correctAnswer: "רק את שמות המשתמשים שגילם 20"
  },
  {
    id: "sql_select_where_6",
    courseId: "sql",
    subTopic: "select_where",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מנהל מערכת רוצה לשלוף רק את כתובות האימייל של משתמשים פעילים. איזו שאילתה מתאימה ביותר?",
    options: [
      "SELECT email FROM users WHERE status = 'active'",
      "SELECT * FROM users",
      "WHERE status = 'active'",
      "SELECT active FROM email"
    ],
    correctAnswer: "SELECT email FROM users WHERE status = 'active'"
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
    learningType: "knowledge",
    question: "מה עושה JOIN ב-SQL?",
    options: [
      "מחבר נתונים משתי טבלאות או יותר",
      "מוחק טבלה ממסד הנתונים",
      "ממיין רשומות לפי עמודה",
      "יוצר משתמש חדש"
    ],
    correctAnswer: "מחבר נתונים משתי טבלאות או יותר"
  },
  {
    id: "sql_joins_2",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה מחזיר INNER JOIN?",
    options: [
      "רק רשומות שיש להן התאמה בשתי הטבלאות",
      "את כל הרשומות מהטבלה השמאלית בלבד",
      "את כל הרשומות משתי הטבלאות ללא תנאי",
      "רק רשומות ללא התאמה"
    ],
    correctAnswer: "רק רשומות שיש להן התאמה בשתי הטבלאות"
  },
  {
    id: "sql_joins_3",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה ההבדל המרכזי בין INNER JOIN ל-LEFT JOIN?",
    options: [
      "LEFT JOIN מחזיר גם רשומות מהטבלה השמאלית שאין להן התאמה",
      "INNER JOIN מחזיר תמיד את כל הרשומות",
      "LEFT JOIN מוחק רשומות ללא התאמה",
      "אין הבדל בין סוגי ה-JOIN"
    ],
    correctAnswer: "LEFT JOIN מחזיר גם רשומות מהטבלה השמאלית שאין להן התאמה"
  },
  {
    id: "sql_joins_4",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "יש שתי טבלאות: users ו-orders. רוצים להציג רק משתמשים שביצעו הזמנה. איזה JOIN מתאים?",
    options: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN בלבד",
      "FULL JOIN בלבד"
    ],
    correctAnswer: "INNER JOIN"
  },
  {
    id: "sql_joins_5",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו שאילתה מחברת בין users ל-orders לפי מזהה המשתמש?",
    options: [
      "SELECT * FROM users JOIN orders ON users.id = orders.user_id",
      "SELECT users orders",
      "JOIN users WHERE orders",
      "SELECT * FROM users WHERE orders.user_id"
    ],
    correctAnswer: "SELECT * FROM users JOIN orders ON users.id = orders.user_id"
  },
  {
    id: "sql_joins_6",
    courseId: "sql",
    subTopic: "joins",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "רוצים להציג את כל המשתמשים, גם כאלה שלא ביצעו אף הזמנה. איזו שאילתה מתאימה ביותר?",
    options: [
      "SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id",
      "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id",
      "SELECT * FROM orders",
      "SELECT * FROM users WHERE orders IS NULL"
    ],
    correctAnswer: "SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id"
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
    learningType: "knowledge",
    question: "מהי המטרה המרכזית של נרמול מסד נתונים?",
    options: [
      "צמצום כפילויות ושיפור מבנה הנתונים",
      "הגדלת מספר הטבלאות ללא צורך",
      "מחיקת נתונים ישנים",
      "החלפת SQL בשפת תכנות"
    ],
    correctAnswer: "צמצום כפילויות ושיפור מבנה הנתונים"
  },
  {
    id: "sql_norm_2",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי נרמול?",
    options: [
      "נרמול מסייע לשמור על עקביות הנתונים",
      "נרמול תמיד מוחק נתונים",
      "נרמול מבטל את הצורך במפתחות",
      "נרמול מתאים רק לטבלאות ריקות"
    ],
    correctAnswer: "נרמול מסייע לשמור על עקביות הנתונים"
  },
  {
    id: "sql_norm_3",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה עלול לקרות בטבלה שאינה מנורמלת?",
    options: [
      "כפילויות, חוסר עקביות וקושי בעדכון נתונים",
      "השאילתות תמיד יהיו מהירות יותר",
      "לא ניתן להוסיף רשומות",
      "הטבלה תימחק אוטומטית"
    ],
    correctAnswer: "כפילויות, חוסר עקביות וקושי בעדכון נתונים"
  },
  {
    id: "sql_norm_4",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "בטבלת students נשמר שם הקורס שוב ושוב עבור כל סטודנט הרשום אליו. מה עשויה להיות הבעיה?",
    options: [
      "כפילות נתונים שעלולה לגרום לחוסר עקביות",
      "שימוש נכון במפתח ראשי",
      "שיפור אוטומטי בביצועים",
      "אין צורך בטבלת קורסים"
    ],
    correctAnswer: "כפילות נתונים שעלולה לגרום לחוסר עקביות"
  },
  {
    id: "sql_norm_5",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "רוצים להפריד נתוני לקוחות ונתוני הזמנות לשתי טבלאות. מה היתרון המרכזי בכך?",
    options: [
      "צמצום כפילויות וייצוג קשר ברור בין ישויות",
      "הפיכת כל השאילתות ללא נחוצות",
      "מחיקת הצורך במפתח זר",
      "הגדלת כפילויות כדי לשפר מהירות"
    ],
    correctAnswer: "צמצום כפילויות וייצוג קשר ברור בין ישויות"
  },
  {
    id: "sql_norm_6",
    courseId: "sql",
    subTopic: "normalization",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "במערכת מכירות, שינוי שם מוצר דורש עדכון של אותו שם בעשרות רשומות שונות. איזו בעיית תכנון זה מצביע עליה?",
    options: [
      "הטבלה אינה מנורמלת מספיק",
      "המערכת משתמשת ביותר מדי JOIN",
      "השאילתה משתמשת ב-WHERE",
      "יש יותר מדי מפתחות ראשיים"
    ],
    correctAnswer: "הטבלה אינה מנורמלת מספיק"
  },

  // =========================
  // OPTIMIZATION
  // =========================
  {
    id: "sql_opt_1",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהו Index במסד נתונים?",
    options: [
      "מבנה שמסייע לאתר נתונים במהירות גבוהה יותר",
      "פקודה למחיקת טבלה",
      "סוג של JOIN",
      "דרך לשמור תמונות במסד הנתונים"
    ],
    correctAnswer: "מבנה שמסייע לאתר נתונים במהירות גבוהה יותר"
  },
  {
    id: "sql_opt_2",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מהמשפטים הבאים נכון לגבי Index?",
    options: [
      "Index יכול לשפר ביצועי חיפוש וסינון",
      "Index תמיד מוחק רשומות כפולות",
      "Index מחליף את הצורך בטבלאות",
      "Index משמש רק לעיצוב ממשק משתמש"
    ],
    correctAnswer: "Index יכול לשפר ביצועי חיפוש וסינון"
  },
  {
    id: "sql_opt_3",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "למה שימוש מיותר ב-SELECT * עלול להיות פחות יעיל?",
    options: [
      "הוא מחזיר יותר עמודות ממה שבאמת צריך",
      "הוא מוחק את כל הרשומות",
      "הוא מחייב שימוש ב-DELETE",
      "הוא מונע שימוש ב-WHERE"
    ],
    correctAnswer: "הוא מחזיר יותר עמודות ממה שבאמת צריך"
  },
  {
    id: "sql_opt_4",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "שאילתה מחפשת משתמש לפי עמודת email בטבלה גדולה מאוד. מה יכול לשפר את הביצועים?",
    options: [
      "הוספת Index על עמודת email",
      "הסרת כל תנאי WHERE",
      "שימוש ב-SELECT * בלבד",
      "מחיקת הטבלה"
    ],
    correctAnswer: "הוספת Index על עמודת email"
  },
  {
    id: "sql_opt_5",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו שאילתה צפויה להיות יעילה יותר כאשר צריך רק שמות משתמשים פעילים?",
    options: [
      "SELECT name FROM users WHERE status = 'active'",
      "SELECT * FROM users",
      "SELECT * FROM users WHERE name IS NOT NULL",
      "DELETE FROM users WHERE status = 'active'"
    ],
    correctAnswer: "SELECT name FROM users WHERE status = 'active'"
  },
  {
    id: "sql_opt_6",
    courseId: "sql",
    subTopic: "optimization",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "בטבלה גדולה קיימת שאילתה איטית שמסננת לפי עמודה שאינה מאונדקסת. מהו הפתרון הסביר ביותר לשיפור הביצועים?",
    options: [
      "הוספת Index מתאים לעמודת הסינון",
      "החלפת כל השאילתות ב-SELECT *",
      "הסרת כל המפתחות מהטבלה",
      "הפסקת השימוש ב-WHERE"
    ],
    correctAnswer: "הוספת Index מתאים לעמודת הסינון"
  }
];
