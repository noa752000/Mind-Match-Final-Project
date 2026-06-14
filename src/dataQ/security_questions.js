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
    learningType: "knowledge",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
    question: "איזה מאפיין הופך פונקציית Hash לשימושית לאחסון סיסמאות?",
    options: [
      "היא מאפשרת לשחזר את הסיסמה המקורית בקלות",
      "היא מייצרת פלט חד-כיווני שקשה להחזיר לקלט המקורי",
      "היא שומרת את הסיסמה במסד הנתונים ללא שינוי",
      "היא מוחקת סיסמאות ישנות אוטומטית"
    ],
    correctAnswer: "היא מייצרת פלט חד-כיווני שקשה להחזיר לקלט המקורי"
  },
  {
    id: "hash_4",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "למה נהוג לשמור סיסמאות באמצעות Hash ולא כטקסט רגיל?",
    options: [
      "כדי שניתן יהיה לשחזר אותן בקלות",
      "כדי להגן על הסיסמאות במקרה של דליפת נתונים",
      "כדי להאיץ את חיבור האינטרנט",
      "כדי לחסוך מקום בדיסק"
    ],
    correctAnswer: "כדי להגן על הסיסמאות במקרה של דליפת נתונים"
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
    question: "ארגון גילה ששני קבצים שונים יצרו אותו ערך Hash. כיצד נקרא מצב זה?",
    options: ["Encryption", "Collision", "Authentication", "Decryption"],
    correctAnswer: "Collision"
  },
  {
    id: "hash_7",
    courseId: "cyber_security",
    subTopic: "hash_functions",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזו פונקציה היא Hash?",
    imageUrl: "/question-images/hash_7.png",
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
    imageUrl: "/question-images/hash_8.png",
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
    imageUrl: "/question-images/hash_9.png",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
    question: "מהו מאפיין מרכזי של הצפנה אסימטרית?",
    options: [
      "היא משתמשת באותו מפתח להצפנה ולפענוח",
      "היא משתמשת בזוג מפתחות: ציבורי ופרטי",
      "היא אינה דורשת מפתחות כלל",
      "היא משמשת רק למחיקת נתונים"
    ],
    correctAnswer: "היא משתמשת בזוג מפתחות: ציבורי ופרטי"
  },
  {
    id: "asym_4",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו תפקידו העיקרי של ה-Private Key בהצפנה אסימטרית?",
    options: [
      "לשתף מידע עם כל המשתמשים",
      "לפענח מידע שהוצפן באמצעות ה-Public Key המתאים",
      "להחליף את ה-Public Key",
      "למחוק הודעות מוצפנות"
    ],
    correctAnswer: "לפענח מידע שהוצפן באמצעות ה-Public Key המתאים"
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
    question: "מה עלול לקרות אם ה-Private Key של משתמש נחשף?",
    options: [
      "לא תהיה השפעה על אבטחת המידע",
      "ניתן יהיה לפענח מידע שיועד למשתמש",
      "ה-Public Key יימחק אוטומטית",
      "ההצפנה תהפוך למהירה יותר"
    ],
    correctAnswer: "ניתן יהיה לפענח מידע שיועד למשתמש"
  },
  {
    id: "asym_7",
    courseId: "cyber_security",
    subTopic: "asymmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה אלגוריתם אסימטרי?",
    imageUrl: "/question-images/asym_7.png",
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
    imageUrl: "/question-images/asym_8.png",
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
    imageUrl: "/question-images/asym_9.png",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
    question: "איזה מאפיין נכון לגבי הצפנה סימטרית?",
    options: [
      "היא משתמשת בשני מפתחות שונים",
      "היא משתמשת באותו מפתח להצפנה ולפענוח",
      "היא אינה דורשת מפתח",
      "היא מבוססת רק על פונקציית Hash"
    ],
    correctAnswer: "היא משתמשת באותו מפתח להצפנה ולפענוח"
  },
  {
    id: "sym_4",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו אחד האתגרים המרכזיים בשימוש בהצפנה סימטרית?",
    options: [
      "מהירות נמוכה מאוד",
      "הצורך להעביר את המפתח המשותף בצורה מאובטחת",
      "חוסר יכולת להצפין קבצים",
      "שימוש בשני מפתחות שונים"
    ],
    correctAnswer: "הצורך להעביר את המפתח המשותף בצורה מאובטחת"
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
    question: "מדוע ארגונים משתמשים לעיתים קרובות בהצפנה סימטרית להעברת כמויות גדולות של מידע?",
    options: [
      "היא אינה דורשת מפתחות",
      "היא מהירה ויעילה יחסית",
      "היא מבטלת את הצורך באבטחת מידע",
      "היא מונעת כל מתקפה אפשרית"
    ],
    correctAnswer: "היא מהירה ויעילה יחסית"
  },
  {
    id: "sym_7",
    courseId: "cyber_security",
    subTopic: "symmetric_encryption",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "איזה אלגוריתם סימטרי?",
    imageUrl: "/question-images/sym_7.png",
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
    imageUrl: "/question-images/sym_8.png",
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
    imageUrl: "/question-images/sym_9.png",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
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
    learningType: "knowledge",
    question: "מהו התפקיד המרכזי של Firewall ברשת ארגונית?",
    options: [
      "הצפנת מסדי נתונים",
      "סינון ובקרת תעבורת רשת",
      "יצירת גיבויים אוטומטיים",
      "מחיקת וירוסים מכל מחשב"
    ],
    correctAnswer: "סינון ובקרת תעבורת רשת"
  },
  {
    id: "net_4",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהי המטרה העיקרית של מתקפת DDoS?",
    options: [
      "להצפין מידע בארגון",
      "ליצור עומס חריג על שירות עד שאינו זמין למשתמשים",
      "לשנות סיסמאות משתמשים",
      "למחוק מסדי נתונים"
    ],
    correctAnswer: "ליצור עומס חריג על שירות עד שאינו זמין למשתמשים"
  },
  {
    id: "net_5",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "ארגון חושש מגישה לא מורשית לרשת הפנימית שלו. איזה אמצעי הגנה יסייע ביותר?",
    options: ["Firewall", "HTML", "JOIN", "DELETE"],
    correctAnswer: "Firewall"
  },
  {
    id: "net_6",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "true_false",
    learningType: "analysis",
    question: "מהי ההשפעה העיקרית של מתקפת DDoS על שרת?",
    options: [
      "האצת ביצועי השרת",
      "יצירת עומס שמונע ממשתמשים לקבל שירות",
      "הצפנת כל הנתונים בשרת",
      "מחיקת מסד הנתונים"
    ],
    correctAnswer: "יצירת עומס שמונע ממשתמשים לקבל שירות"
  },
  {
    id: "net_7",
    courseId: "cyber_security",
    subTopic: "network_cyber_security",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "מה מגן על רשת?",
    imageUrl: "/question-images/net_7.png",
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
    imageUrl: "/question-images/net_8.png",
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
    imageUrl: "/question-images/net_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];