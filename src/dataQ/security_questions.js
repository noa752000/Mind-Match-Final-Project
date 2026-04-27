export const securityQuestions = [
  // =========================
  // HASH FUNCTIONS
  // =========================
  {
    id: "hash_1",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי פונקציית Hash?",
    options: ["הצפנה הפיכה", "מיפוי חד כיווני", "מיון נתונים", "מחיקה"],
    correctAnswer: "מיפוי חד כיווני"
  },
  {
    id: "hash_2",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מה מאפיין Hash טוב?",
    options: ["חוזר על עצמו", "קשה להפוך", "איטי", "קצר"],
    correctAnswer: "קשה להפוך"
  },
  {
    id: "hash_3",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "Hash הוא חד כיווני.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "hash_4",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "למה משתמשים ב-Hash לסיסמאות?",
    options: ["להצפין", "להגן", "לשמור בצורה בטוחה", "למחוק"],
    correctAnswer: "לשמור בצורה בטוחה"
  },
  {
    id: "hash_5",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מהו Collision?",
    options: ["אותו קלט", "אותו פלט", "פלט שונה", "אין קשר"],
    correctAnswer: "אותו פלט"
  },
  {
    id: "hash_6",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Collision הוא מצב שבו שני קלטים נותנים אותו פלט.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "hash_7",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו פונקציה היא Hash?",
    imageUrl: "",
    options: ["SHA-256", "SELECT", "JOIN", "HTML"],
    correctAnswer: "SHA-256"
  },
  {
    id: "hash_8",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה קורה אם משנים תו אחד בקלט?",
    imageUrl: "",
    options: ["אין שינוי", "שינוי קטן", "שינוי גדול", "שגיאה"],
    correctAnswer: "שינוי גדול"
  },
  {
    id: "hash_9",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Hash משתנה משמעותית עם שינוי קטן בקלט.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // ASYMMETRIC
  // =========================
  {
    id: "asym_1",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי הצפנה אסימטרית?",
    options: ["מפתח אחד", "שני מפתחות", "ללא מפתח", "Hash"],
    correctAnswer: "שני מפתחות"
  },
  {
    id: "asym_2",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מהו Public Key?",
    options: ["סודי", "גלוי", "לא קיים", "איטי"],
    correctAnswer: "גלוי"
  },
  {
    id: "asym_3",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "יש שני מפתחות בהצפנה אסימטרית.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "asym_4",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מה עושה Private Key?",
    options: ["גלוי", "סודי", "משותף", "נמחק"],
    correctAnswer: "סודי"
  },
  {
    id: "asym_5",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "איך מצפינים?",
    options: ["Public", "Private", "שניהם", "אין"],
    correctAnswer: "Public"
  },
  {
    id: "asym_6",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "Private Key חייב להישאר סודי.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "asym_7",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה אלגוריתם אסימטרי?",
    imageUrl: "",
    options: ["RSA", "AES", "MD5", "SHA"],
    correctAnswer: "RSA"
  },
  {
    id: "asym_8",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה סודי?",
    imageUrl: "",
    options: ["Private Key", "Public Key", "Both", "None"],
    correctAnswer: "Private Key"
  },
  {
    id: "asym_9",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Public Key ניתן לשיתוף.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // SYMMETRIC
  // =========================
  {
    id: "sym_1",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי הצפנה סימטרית?",
    options: ["מפתח אחד", "שני מפתחות", "Hash", "אין"],
    correctAnswer: "מפתח אחד"
  },
  {
    id: "sym_2",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "יתרון הצפנה סימטרית?",
    options: ["איטי", "מהיר", "לא בטוח", "מורכב"],
    correctAnswer: "מהיר"
  },
  {
    id: "sym_3",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "אותו מפתח להצפנה ופענוח.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sym_4",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "חיסרון?",
    options: ["שיתוף מפתח", "מהיר", "קל", "פשוט"],
    correctAnswer: "שיתוף מפתח"
  },
  {
    id: "sym_5",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "מתי נשתמש?",
    options: ["מידע גדול", "קטן", "אין", "לא חשוב"],
    correctAnswer: "מידע גדול"
  },
  {
    id: "sym_6",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "הצפנה סימטרית מהירה.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "sym_7",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה אלגוריתם סימטרי?",
    imageUrl: "",
    options: ["AES", "RSA", "SHA", "MD5"],
    correctAnswer: "AES"
  },
  {
    id: "sym_8",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "כמה מפתחות?",
    imageUrl: "",
    options: ["1", "2", "3", "אין"],
    correctAnswer: "1"
  },
  {
    id: "sym_9",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "משתמשים במפתח אחד.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // NETWORK cyber_security
  // =========================
  {
    id: "net_1",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי אבטחת רשת?",
    options: ["קוד", "הגנה על רשת", "DB", "טבלה"],
    correctAnswer: "הגנה על רשת"
  },
  {
    id: "net_2",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מהו Firewall?",
    options: ["חומה", "מסנן תעבורה", "קוד", "DB"],
    correctAnswer: "מסנן תעבורה"
  },
  {
    id: "net_3",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "Firewall מסנן תעבורה.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "net_4",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהי מתקפת DDoS?",
    options: ["עומס", "הצפנה", "Hash", "מפתח"],
    correctAnswer: "עומס"
  },
  {
    id: "net_5",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "איך מגנים?",
    options: ["Firewall", "DELETE", "JOIN", "HTML"],
    correctAnswer: "Firewall"
  },
  {
    id: "net_6",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "DDoS מעמיס על שרת.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "net_7",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה מגן על רשת?",
    imageUrl: "",
    options: ["Firewall", "SQL", "HTML", "CSS"],
    correctAnswer: "Firewall"
  },
  {
    id: "net_8",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה חוסם תעבורה?",
    imageUrl: "",
    options: ["Firewall", "JOIN", "SELECT", "Loop"],
    correctAnswer: "Firewall"
  },
  {
    id: "net_9",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "Firewall מגן על רשת.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];