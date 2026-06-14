// מאגר שאלות - חדו"א 1
// תתי נושא: גבולות, נגזרות, חקירת פונקציה, אינטגרלים
//
// חשוב לתצוגת RTL/LTR:
// 1. הטקסטים כאן כתובים בעברית, אבל ביטויים מתמטיים נשמרים בתוך question / options.
// 2. במסך התרגול מומלץ לעטוף ביטויים כמו f(x), x→a, x^2, ∫ בתוך <span dir="ltr">...</span>
// 3. לשאלות ויזואליות הושאר imageUrl ריק בשלב זה, כדי שתוכלי להוסיף תמונות בהמשך.

export const calculus1Questions = [
  // =========================
  // גבולות
  // =========================
  {
    id: "calc1_limits_1",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "אם קיים הגבול של f(x) כאשר x שואף ל-a, מה חייב להתקיים?",
    options: [
      "ערך הפונקציה בנקודה a חייב להיות שווה לגבול",
      "הגבול משמאל ומהימין חייבים להיות שווים",
      "הפונקציה חייבת להיות רציפה בנקודה a",
      "הפונקציה חייבת להיות מוגדרת בנקודה a"
    ],
    correctAnswer: "הגבול משמאל ומהימין חייבים להיות שווים"
  },
  {
    id: "calc1_limits_2",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "איזו מהטענות הבאות נכונה לגבי גבול אינסופי בנקודה x=a?",
    options: [
      "הפונקציה חייבת להיות מוגדרת ב-a",
      "הגבול קיים כמספר ממשי",
      "ערכי הפונקציה גדלים או קטנים ללא bound כאשר x מתקרב ל-a",
      "הפונקציה רציפה ב-a"
    ],
    correctAnswer: "ערכי הפונקציה גדלים או קטנים ללא bound כאשר x מתקרב ל-a"
  },
  {
    id: "calc1_limits_3",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "אם הגבול משמאל והגבול מימין שונים זה מזה, אז הגבול בנקודה אינו קיים.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "calc1_limits_4",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י את הגבול: lim(x→2) (3x+1).",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    id: "calc1_limits_5",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י את הגבול: lim(x→1) (x^2-1)/(x-1).",
    options: ["0", "1", "2", "לא קיים"],
    correctAnswer: "2"
  },
  {
    id: "calc1_limits_6",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י את הגבול: lim(x→∞) (2x^2+3x-1)/(x^2-4).",
    options: ["0", "2", "3", "∞"],
    correctAnswer: "2"
  },
  {
    id: "calc1_limits_7",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "לפי הגרף, מה ניתן להסיק אם כאשר x מתקרב ל-3 משמאל ומימין, ערכי הפונקציה מתקרבים ל-5, אבל בנקודה עצמה f(3)=1?",
    imageUrl: "/question-images/calc1_limits_7.png",
    options: [
      "הגבול בנקודה לא קיים",
      "הגבול קיים ושווה 5",
      "הגבול קיים ושווה 1",
      "הפונקציה רציפה ב-x=3"
    ],
    correctAnswer: "הגבול קיים ושווה 5"
  },
  {
    id: "calc1_limits_8",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בגרף נראה כי כאשר x מתקרב ל-2 משמאל, הפונקציה שואפת ל-4, וכאשר x מתקרב ל-2 מימין, הפונקציה שואפת ל-1. מה נכון?",
    imageUrl: "/question-images/calc1_limits_8.png",
    options: [
      "הגבול קיים ושווה 2.5",
      "הגבול קיים ושווה 4",
      "הגבול קיים ושווה 1",
      "הגבול ב-x=2 לא קיים"
    ],
    correctAnswer: "הגבול ב-x=2 לא קיים"
  },
  {
    id: "calc1_limits_9",
    courseId: "calculus1",
    subTopic: "limits",
    difficulty: 2,
    format: "true_false",
    learningType: "visual",
    question: "אם בגרף רואים אסימפטוטה אנכית ב-x=1, אז בהכרח קיים גבול סופי כאשר x שואף ל-1.",
    imageUrl: "/question-images/calc1_limits_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "לא נכון"
  },

  // =========================
  // נגזרות
  // =========================
  {
    id: "calc1_derivatives_1",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מהי המשמעות הגיאומטרית של הנגזרת בנקודה?",
    options: [
      "שטח מתחת לגרף",
      "שיפוע המשיק לגרף בנקודה",
      "ערך הפונקציה המקסימלי",
      "נקודת החיתוך עם ציר ה-y"
    ],
    correctAnswer: "שיפוע המשיק לגרף בנקודה"
  },
  {
    id: "calc1_derivatives_2",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "אם f'(a)=0, מה ניתן להסיק בוודאות?",
    options: [
      "ל-f יש מקסימום מקומי ב-a",
      "ל-f יש מינימום מקומי ב-a",
      "a היא נקודת קיצון",
      "a היא נקודה חשודה לקיצון, אך לא בהכרח נקודת קיצון"
    ],
    correctAnswer: "a היא נקודה חשודה לקיצון, אך לא בהכרח נקודת קיצון"
  },
  {
    id: "calc1_derivatives_3",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "אם f'(x)>0 בתחום מסוים, אז הפונקציה עולה בתחום זה.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "calc1_derivatives_4",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "מהי הנגזרת של f(x)=4x^3-2x?",
    options: ["12x^2-2", "12x-2", "4x^2-2", "3x^2-2"],
    correctAnswer: "12x^2-2"
  },
  {
    id: "calc1_derivatives_5",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהי הנגזרת של f(x)=x^4-3x^2+5?",
    options: ["4x^3-6x", "4x^3-3x", "x^3-6x", "4x^3-6"],
    correctAnswer: "4x^3-6x"
  },
  {
    id: "calc1_derivatives_6",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "אם f(x)=(2x-1)(x^2+1), מהי f'(x)?",
    options: [
      "2(x^2+1)+(2x-1)·2x",
      "(2x-1)·2x",
      "2x^2+2",
      "2(x^2+1)+(2x-1)"
    ],
    correctAnswer: "2(x^2+1)+(2x-1)·2x"
  },
  {
    id: "calc1_derivatives_7",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "לפי הגרף, באיזה סוג נקודה שיפוע המשיק שווה לאפס?",
    imageUrl: "/question-images/calc1_derivatives_7.png",
    options: [
      "רק בנקודת חיתוך עם ציר ה-x",
      "רק בנקודת פיתול",
      "בדרך כלל בנקודת מקסימום או מינימום מקומי",
      "בכל נקודה שבה הפונקציה חיובית"
    ],
    correctAnswer: "בדרך כלל בנקודת מקסימום או מינימום מקומי"
  },
  {
    id: "calc1_derivatives_8",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בגרף נראה כי הפונקציה יורדת בקטע מסוים. מה סימן הנגזרת באותו קטע?",
    imageUrl: "/question-images/calc1_derivatives_8.png",
    options: ["חיובי", "שלילי", "אפס", "לא ניתן לדעת"],
    correctAnswer: "שלילי"
  },
  {
    id: "calc1_derivatives_9",
    courseId: "calculus1",
    subTopic: "derivatives",
    difficulty: 2,
    format: "true_false",
    learningType: "visual",
    question: "אם בגרף רואים משיק אופקי בנקודה פנימית, אז הנגזרת באותה נקודה שווה לאפס.",
    imageUrl: "/question-images/calc1_derivatives_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // חקירת פונקציה
  // =========================
  {
    id: "calc1_function_investigation_1",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "איזה מן השלבים הבאים שייך בדרך כלל לחקירת פונקציה?",
    options: [
      "בדיקת תחום הגדרה ונקודות קיצון",
      "רק פתרון משוואה ריבועית",
      "רק חישוב שטח",
      "רק הצבת ערכים בטבלה"
    ],
    correctAnswer: "בדיקת תחום הגדרה ונקודות קיצון"
  },
  {
    id: "calc1_function_investigation_2",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מדוע בודקים אסימפטוטות, חיתוכי צירים ונקודות קיצון בעת חקירת פונקציה?",
    options: [
      "כדי לבנות תמונה איכותית של התנהגות הגרף",
      "כדי להוכיח שהפונקציה ליניארית",
      "כדי להימנע מחישוב נגזרות",
      "כדי למצוא תמיד את תחום ההגדרה בלבד"
    ],
    correctAnswer: "כדי לבנות תמונה איכותית של התנהגות הגרף"
  },
  {
    id: "calc1_function_investigation_3",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "בחקירת פונקציה, נקודות שבהן המכנה מתאפס עשויות להיות חשובות לבדיקת תחום ההגדרה ואסימפטוטות.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "calc1_function_investigation_4",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "מהו תחום ההגדרה של הפונקציה f(x)=1/(x-3)?",
    options: [
      "כל x",
      "כל x חוץ מ-0",
      "כל x חוץ מ-3",
      "x>3 בלבד"
    ],
    correctAnswer: "כל x חוץ מ-3"
  },
  {
    id: "calc1_function_investigation_5",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "לפונקציה f(x)=x^2-4 יש חיתוך עם ציר ה-x בנקודות:",
    options: [
      "x=±4",
      "x=±2",
      "x=0 ו-x=4",
      "אין חיתוך עם ציר ה-x"
    ],
    correctAnswer: "x=±2"
  },
  {
    id: "calc1_function_investigation_6",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "אם f(x)=x^3-3x, מהן הנקודות החשודות לקיצון?",
    options: [
      "x=±1",
      "x=0 בלבד",
      "x=±3",
      "אין נקודות חשודות לקיצון"
    ],
    correctAnswer: "x=±1"
  },
  {
    id: "calc1_function_investigation_7",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "לפי הסקיצה, לפונקציה יש אסימפטוטה אנכית וקיצון מקומי אחד. איזה מידע נוסף חשוב כדי להשלים חקירה סבירה?",
    imageUrl: "/question-images/calc1_function_investigation_7.png",
    options: [
      "רק צבע הגרף",
      "חיתוכי צירים ותחומי עליה/ירידה",
      "רק ערך הפונקציה ב-0",
      "רק אם הפונקציה זוגית"
    ],
    correctAnswer: "חיתוכי צירים ותחומי עליה/ירידה"
  },
  {
    id: "calc1_function_investigation_8",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 3,
    format: "mcq",
    learningType: "visual",
    question: "בגרף רואים שהפונקציה מתקרבת לקו אופקי כאשר x שואף ל-∞ וגם כאשר x שואף ל--∞. מה ניתן להסיק?",
    imageUrl: "/question-images/calc1_function_investigation_8.png",
    options: [
      "יש אסימפטוטה אופקית",
      "יש אסימפטוטה אנכית בלבד",
      "אין אסימפטוטות כלל",
      "בהכרח קיימת נקודת קיצון"
    ],
    correctAnswer: "יש אסימפטוטה אופקית"
  },
  {
    id: "calc1_function_investigation_9",
    courseId: "calculus1",
    subTopic: "function_investigation",
    difficulty: 2,
    format: "true_false",
    learningType: "visual",
    question: "אם מהגרף נראה שהפונקציה חוצה את ציר ה-x, אז קיימת לפחות נקודה אחת שבה ערך הפונקציה שווה לאפס.",
    imageUrl: "/question-images/calc1_function_investigation_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // אינטגרלים
  // =========================
  {
    id: "calc1_integrals_1",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 1,
    format: "mcq",
    learningType: "knowledge",
    question: "מה מייצג אינטגרל לא מסוים?",
    options: [
      "מספר קבוע בלבד",
      "משפחה של פונקציות קדומות",
      "רק שטח חיובי מתחת לגרף",
      "ערך הנגזרת בנקודה"
    ],
    correctAnswer: "משפחה של פונקציות קדומות"
  },
  {
    id: "calc1_integrals_2",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 2,
    format: "mcq",
    learningType: "knowledge",
    question: "מה ההבדל העיקרי בין אינטגרל מסוים לאינטגרל לא מסוים?",
    options: [
      "אינטגרל מסוים מחזיר מספר, ואינטגרל לא מסוים מחזיר פונקציה כללית עם קבוע",
      "אין הבדל",
      "אינטגרל לא מסוים תמיד קטן יותר",
      "אינטגרל מסוים אינו קשור לשטח"
    ],
    correctAnswer: "אינטגרל מסוים מחזיר מספר, ואינטגרל לא מסוים מחזיר פונקציה כללית עם קבוע"
  },
  {
    id: "calc1_integrals_3",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 1,
    format: "true_false",
    learningType: "knowledge",
    question: "בכל אינטגרל לא מסוים יש להוסיף קבוע אינטגרציה.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "calc1_integrals_4",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י: ∫ 3x^2 dx",
    options: ["x^3 + C", "3x^3 + C", "x^2 + C", "6x + C"],
    correctAnswer: "x^3 + C"
  },
  {
    id: "calc1_integrals_5",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י: ∫ (2x+1) dx",
    options: ["x^2+x + C", "2x^2+x + C", "x^2+1 + C", "2x+1 + C"],
    correctAnswer: "x^2+x + C"
  },
  {
    id: "calc1_integrals_6",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "חשב/י את האינטגרל המסוים: ∫_0^2 x dx",
    options: ["1", "2", "4", "0"],
    correctAnswer: "2"
  },
  {
    id: "calc1_integrals_7",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בגרף מוצג התחום הכלוא בין y=f(x), ציר ה-x והישרים x=a, x=b. מה מחשב האינטגרל המסוים בין a ל-b?",
    imageUrl: "/question-images/calc1_integrals_7.png",
    options: [
      "שיפוע המשיק הממוצע",
      "השטח החתום בין הגרף לציר ה-x",
      "מספר נקודות הקיצון",
      "ערך הפונקציה ב-b"
    ],
    correctAnswer: "השטח החתום בין הגרף לציר ה-x"
  },
  {
    id: "calc1_integrals_8",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 3,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט רואים שחלק מהשטח בין הגרף לציר ה-x נמצא מעל הציר וחלק מתחתיו. מה צריך לזכור לגבי אינטגרל מסוים?",
    imageUrl: "/question-images/calc1_integrals_8.png",
    options: [
      "כל השטחים נסכמים כחיוביים",
      "שטח מעל הציר נחשב שלילי ומתחת לציר חיובי",
      "שטח מעל הציר חיובי ומתחת לציר שלילי",
      "האינטגרל תמיד שווה לאפס במצב כזה"
    ],
    correctAnswer: "שטח מעל הציר חיובי ומתחת לציר שלילי"
  },
  {
    id: "calc1_integrals_9",
    courseId: "calculus1",
    subTopic: "integrals",
    difficulty: 2,
    format: "true_false",
    learningType: "visual",
    question: "אם הגרף כולו מעל ציר ה-x בתחום [a,b], אז האינטגרל המסוים באותו תחום יהיה לא שלילי.",
    imageUrl: "/question-images/calc1_integrals_9.png",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];
