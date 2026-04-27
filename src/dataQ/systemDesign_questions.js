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
    learningType: "concept",
    question: "מהי ארכיטקטורת תוכנה?",
    options: ["קוד בלבד", "מבנה המערכת", "טבלה", "משתנה"],
    correctAnswer: "מבנה המערכת"
  },
  {
    id: "arch_2",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה היתרון של ארכיטקטורת שכבות?",
    options: ["מורכבות", "הפרדה", "איטיות", "מחיקה"],
    correctAnswer: "הפרדה"
  },
  {
    id: "arch_3",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "ארכיטקטורה מגדירה מבנה מערכת.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "arch_4",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה היתרון של Microservices?",
    options: ["תלות גבוהה", "סקייל", "קוד אחד", "איטי"],
    correctAnswer: "סקייל"
  },
  {
    id: "arch_5",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מתי נבחר Monolith?",
    options: ["מערכת קטנה", "מערכת ענקית", "אין הבדל", "תמיד"],
    correctAnswer: "מערכת קטנה"
  },
  {
    id: "arch_6",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Microservices מאפשרים פיתוח עצמאי לכל שירות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "arch_7",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו ארכיטקטורה מחלקת לשכבות?",
    imageUrl: "",
    options: ["Layered", "JOIN", "SELECT", "UML"],
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
    imageUrl: "",
    options: ["Microservices", "Monolith", "Single", "Local"],
    correctAnswer: "Microservices"
  },
  {
    id: "arch_9",
    courseId: "systems_analysis",
    subTopic: "architecture",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Layered architecture מפרידה בין שכבות.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
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
    learningType: "concept",
    question: "מהו UML?",
    options: ["שפה גרפית", "קוד", "טבלה", "DB"],
    correctAnswer: "שפה גרפית"
  },
  {
    id: "uml_2",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה מציג Class Diagram?",
    options: ["נתונים", "מבנה מחלקות", "שרת", "רשת"],
    correctAnswer: "מבנה מחלקות"
  },
  {
    id: "uml_3",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "UML משמש להצגה גרפית.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "uml_4",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה מציג Use Case?",
    options: ["שדות", "אינטראקציה משתמש", "שרת", "SQL"],
    correctAnswer: "אינטראקציה משתמש"
  },
  {
    id: "uml_5",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מה מציג Sequence Diagram?",
    options: ["זרימה בזמן", "טבלה", "קוד", "מחלקות"],
    correctAnswer: "זרימה בזמן"
  },
  {
    id: "uml_6",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Sequence מציג סדר פעולות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "uml_7",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים מציג מחלקות?",
    imageUrl: "",
    options: ["Class", "JOIN", "HTML", "CSS"],
    correctAnswer: "Class"
  },
  {
    id: "uml_8",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים מציג אינטראקציה?",
    imageUrl: "",
    options: ["Use Case", "SELECT", "Table", "Loop"],
    correctAnswer: "Use Case"
  },
  {
    id: "uml_9",
    courseId: "systems_analysis",
    subTopic: "uml",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Class diagram מציג מחלקות.",
    imageUrl: "",
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
    learningType: "concept",
    question: "מהו ניתוח דרישות?",
    options: ["קוד", "הבנת צרכים", "DB", "שרת"],
    correctAnswer: "הבנת צרכים"
  },
  {
    id: "req_2",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מהי דרישה פונקציונלית?",
    options: ["ביצועים", "מה המערכת עושה", "UI", "אבטחה"],
    correctAnswer: "מה המערכת עושה"
  },
  {
    id: "req_3",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "דרישות מגדירות צרכים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "req_4",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהי דרישה לא פונקציונלית?",
    options: ["מה עושה", "איך עובד", "קוד", "טבלה"],
    correctAnswer: "איך עובד"
  },
  {
    id: "req_5",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מה חשוב בדרישות?",
    options: ["דיוק", "בלבול", "כפילויות", "איטיות"],
    correctAnswer: "דיוק"
  },
  {
    id: "req_6",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "דרישות לא ברורות גורמות לטעויות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "req_7",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה תרשים עוזר בדרישות?",
    imageUrl: "",
    options: ["Use Case", "SQL", "HTML", "CSS"],
    correctAnswer: "Use Case"
  },
  {
    id: "req_8",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה מתאר משתמש?",
    imageUrl: "",
    options: ["Actor", "DB", "Table", "JOIN"],
    correctAnswer: "Actor"
  },
  {
    id: "req_9",
    courseId: "systems_analysis",
    subTopic: "requirements",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Actor מייצג משתמש.",
    imageUrl: "",
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
    learningType: "concept",
    question: "מהי מתודולוגיה?",
    options: ["קוד", "שיטת עבודה", "DB", "טבלה"],
    correctAnswer: "שיטת עבודה"
  },
  {
    id: "meth_2",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה זה Agile?",
    options: ["קשיח", "גמיש", "DB", "קוד"],
    correctAnswer: "גמיש"
  },
  {
    id: "meth_3",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "Agile גמיש.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "meth_4",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה Waterfall?",
    options: ["שלבים", "אקראי", "מהיר", "לא מסודר"],
    correctAnswer: "שלבים"
  },
  {
    id: "meth_5",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מתי Agile עדיף?",
    options: ["שינויים", "יציב", "קבוע", "לא חשוב"],
    correctAnswer: "שינויים"
  },
  {
    id: "meth_6",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Waterfall קשיח.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "meth_7",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו שיטה איטרטיבית?",
    imageUrl: "",
    options: ["Agile", "Waterfall", "SQL", "HTML"],
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
    imageUrl: "",
    options: ["Waterfall", "Agile", "JOIN", "Loop"],
    correctAnswer: "Waterfall"
  },
  {
    id: "meth_9",
    courseId: "systems_analysis",
    subTopic: "methodologies",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Agile איטרטיבי.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];