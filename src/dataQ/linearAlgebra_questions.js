// מאגר שאלות - אלגברה ליניארית
// תתי נושא: מטריצות, וקטורים, טרנספורמציות, ערכים עצמיים
//
// הערה לתצוגת עברית + ביטויים מתמטיים:
// במסך התרגול מומלץ להציג question / options באמצעות dangerouslySetInnerHTML,
// משום שחלק מהשאלות כוללות <span dir='ltr'>...</span> עבור כתיבה תקינה של סימונים מתמטיים.

export const linearAlgebraQuestions = [
  // =========================
  // מטריצות
  // =========================
  {
    id: "linalg_matrices_1",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי מטריצה ריבועית?",
    options: [
      "מטריצה שבה מספר השורות שווה למספר העמודות",
      "מטריצה שבה כל האיברים שווים זה לזה",
      "מטריצה שיש בה רק עמודה אחת",
      "מטריצה שיש בה רק שורה אחת"
    ],
    correctAnswer: "מטריצה שבה מספר השורות שווה למספר העמודות"
  },
  {
    id: "linalg_matrices_2",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מתי ניתן לבצע כפל בין שתי מטריצות?",
    options: [
      "כאשר מספר השורות בשתי המטריצות שווה",
      "כאשר מספר העמודות בשתי המטריצות שווה",
      "כאשר מספר העמודות של המטריצה הראשונה שווה למספר השורות של השנייה",
      "תמיד ניתן לבצע כפל בין כל שתי מטריצות"
    ],
    correctAnswer: "כאשר מספר העמודות של המטריצה הראשונה שווה למספר השורות של השנייה"
  },
  {
    id: "linalg_matrices_3",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "מטריצת יחידה היא בהכרח מטריצה ריבועית.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "linalg_matrices_4",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>A</span> היא מטריצה מסדר <span dir='ltr'>2×3</span> ו-<span dir='ltr'>B</span> היא מטריצה מסדר <span dir='ltr'>3×4</span>, מהו סדר המכפלה <span dir='ltr'>AB</span>?",
    options: [
      "<span dir='ltr'>2×4</span>",
      "<span dir='ltr'>3×3</span>",
      "<span dir='ltr'>2×3</span>",
      "<span dir='ltr'>4×2</span>"
    ],
    correctAnswer: "<span dir='ltr'>2×4</span>"
  },
  {
    id: "linalg_matrices_5",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>A</span> היא מטריצה כך ש-<span dir='ltr'>A^2 = A</span>, איך נקראת מטריצה כזו?",
    options: [
      "מטריצה הפיכה",
      "מטריצה אידמפוטנטית",
      "מטריצה סימטרית",
      "מטריצה אלכסונית"
    ],
    correctAnswer: "מטריצה אידמפוטנטית"
  },
  {
    id: "linalg_matrices_6",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>AB = I</span> עבור מטריצות ריבועיות <span dir='ltr'>A,B</span>, מה נובע?",
    options: [
      "רק <span dir='ltr'>A</span> הפיכה",
      "רק <span dir='ltr'>B</span> הפיכה",
      "שתי המטריצות הפיכות ו-<span dir='ltr'>B = A<sup>-1</sup></span>",
      "לא ניתן להסיק דבר"
    ],
    correctAnswer: "שתי המטריצות הפיכות ו-<span dir='ltr'>B = A<sup>-1</sup></span>"
  },
  {
    id: "linalg_matrices_7",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "במטריצה המוצגת, כל האיברים שמתחת לאלכסון הראשי הם אפס. כיצד נקראת מטריצה כזו?",
    imageUrl: "",
    options: [
      "מטריצה משולשית עליונה",
      "מטריצה משולשית תחתונה",
      "מטריצת אפס",
      "מטריצה אנטי-סימטרית"
    ],
    correctAnswer: "מטריצה משולשית עליונה"
  },
  {
    id: "linalg_matrices_8",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט של כפל שורות-עמודות, איזה איבר של המכפלה <span dir='ltr'>AB</span> מתקבל ממכפלת השורה הראשונה של <span dir='ltr'>A</span> בעמודה השנייה של <span dir='ltr'>B</span>?",
    imageUrl: "",
    options: [
      "האיבר <span dir='ltr'>(1,2)</span>",
      "האיבר <span dir='ltr'>(2,1)</span>",
      "האיבר <span dir='ltr'>(1,1)</span>",
      "האיבר <span dir='ltr'>(2,2)</span>"
    ],
    correctAnswer: "האיבר <span dir='ltr'>(1,2)</span>"
  },
  {
    id: "linalg_matrices_9",
    courseId: "linear_algebra",
    subTopic: "matrices",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם במטריצה כל האיברים מחוץ לאלכסון הראשי הם אפס, אז מדובר במטריצה אלכסונית.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // וקטורים
  // =========================
  {
    id: "linalg_vectors_1",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מה מאפיין וקטור במרחב?",
    options: [
      "יש לו רק גודל",
      "יש לו רק כיוון",
      "יש לו גודל וכיוון",
      "הוא תמיד מספר ממשי"
    ],
    correctAnswer: "יש לו גודל וכיוון"
  },
  {
    id: "linalg_vectors_2",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מתי שני וקטורים נקראים תלויים ליניארית?",
    options: [
      "כאשר הם מאונכים זה לזה",
      "כאשר אחד מהם הוא כפולה סקלרית של השני",
      "כאשר האורך שלהם שווה",
      "כאשר שניהם מתחילים בראשית"
    ],
    correctAnswer: "כאשר אחד מהם הוא כפולה סקלרית של השני"
  },
  {
    id: "linalg_vectors_3",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "מכפלה סקלרית של שני וקטורים יכולה להיות שלילית.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "linalg_vectors_4",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 1,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>u=(1,2)</span> ו-<span dir='ltr'>v=(3,-1)</span>, מהו <span dir='ltr'>u+v</span>?",
    options: [
      "<span dir='ltr'>(4,1)</span>",
      "<span dir='ltr'>(2,3)</span>",
      "<span dir='ltr'>(3,2)</span>",
      "<span dir='ltr'>(4,-2)</span>"
    ],
    correctAnswer: "<span dir='ltr'>(4,1)</span>"
  },
  {
    id: "linalg_vectors_5",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>u=(1,2)</span> ו-<span dir='ltr'>v=(2,4)</span>, מה נכון?",
    options: [
      "הווקטורים בלתי תלויים ליניארית",
      "הווקטורים תלויים ליניארית",
      "הווקטורים מאונכים",
      "המכפלה הסקלרית שלהם אפס"
    ],
    correctAnswer: "הווקטורים תלויים ליניארית"
  },
  {
    id: "linalg_vectors_6",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>u·v = 0</span> ושני הווקטורים אינם אפס, מה ניתן להסיק?",
    options: [
      "הווקטורים מקבילים",
      "הווקטורים שווים",
      "הווקטורים מאונכים",
      "אחד הווקטורים תלוי ליניארית בשני"
    ],
    correctAnswer: "הווקטורים מאונכים"
  },
  {
    id: "linalg_vectors_7",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט נראים שני וקטורים היוצאים מראשית ומצביעים לאותו כיוון, אך אורכיהם שונים. מה נכון?",
    imageUrl: "",
    options: [
      "הם בהכרח שווים",
      "הם בהכרח מאונכים",
      "ייתכן שאחד הוא כפולה סקלרית חיובית של השני",
      "הם בלתי תלויים ליניארית בהכרח"
    ],
    correctAnswer: "ייתכן שאחד הוא כפולה סקלרית חיובית של השני"
  },
  {
    id: "linalg_vectors_8",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בתרשים חיבור וקטורים לפי כלל המקבילית, מה מייצג האלכסון היוצא מנקודת ההתחלה המשותפת?",
    imageUrl: "",
    options: [
      "את ההפרש בין הווקטורים",
      "את הסכום של הווקטורים",
      "את האורך של שני הווקטורים יחד",
      "את המכפלה הסקלרית שלהם"
    ],
    correctAnswer: "את הסכום של הווקטורים"
  },
  {
    id: "linalg_vectors_9",
    courseId: "linear_algebra",
    subTopic: "vectors",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם שני וקטורים נראים מאונכים בשרטוט, אז המכפלה הסקלרית שלהם היא אפס.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // טרנספורמציות
  // =========================
  {
    id: "linalg_transformations_1",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהי טרנספורמציה ליניארית?",
    options: [
      "כל פונקציה בין שני מרחבים וקטוריים",
      "פונקציה השומרת חיבור וכפל בסקלר",
      "פונקציה השומרת רק מרחקים",
      "פונקציה השומרת רק זוויות"
    ],
    correctAnswer: "פונקציה השומרת חיבור וכפל בסקלר"
  },
  {
    id: "linalg_transformations_2",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "איזה תנאי הכרחי כדי שפונקציה <span dir='ltr'>T</span> תהיה ליניארית?",
    options: [
      "<span dir='ltr'>T(u+v)=T(u)+T(v)</span> וגם <span dir='ltr'>T(cu)=cT(u)</span>",
      "<span dir='ltr'>T(0)=1</span>",
      "<span dir='ltr'>T</span> חייבת להיות הפיכה",
      "<span dir='ltr'>T</span> חייבת לשמור אורכים"
    ],
    correctAnswer: "<span dir='ltr'>T(u+v)=T(u)+T(v)</span> וגם <span dir='ltr'>T(cu)=cT(u)</span>"
  },
  {
    id: "linalg_transformations_3",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "בכל טרנספורמציה ליניארית מתקיים <span dir='ltr'>T(0)=0</span>.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "linalg_transformations_4",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>T(x,y)=(x+y,y)</span>, מהו <span dir='ltr'>T(1,2)</span>?",
    options: [
      "<span dir='ltr'>(1,3)</span>",
      "<span dir='ltr'>(3,2)</span>",
      "<span dir='ltr'>(2,1)</span>",
      "<span dir='ltr'>(3,3)</span>"
    ],
    correctAnswer: "<span dir='ltr'>(3,2)</span>"
  },
  {
    id: "linalg_transformations_5",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "איזו מהפונקציות הבאות אינה ליניארית?",
    options: [
      "<span dir='ltr'>T(x,y)=(x+y,y)</span>",
      "<span dir='ltr'>T(x,y)=(2x,3y)</span>",
      "<span dir='ltr'>T(x,y)=(x,y)+ (1,0)</span>",
      "<span dir='ltr'>T(x,y)=(x-y,y)</span>"
    ],
    correctAnswer: "<span dir='ltr'>T(x,y)=(x,y)+ (1,0)</span>"
  },
  {
    id: "linalg_transformations_6",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "אם מטריצה <span dir='ltr'>A</span> מייצגת טרנספורמציה ליניארית ביחס לבסיס נתון, מה מייצגת הכפלה <span dir='ltr'>Ax</span>?",
    options: [
      "את האורך של <span dir='ltr'>x</span>",
      "את הדימוי של הווקטור <span dir='ltr'>x</span> תחת הטרנספורמציה",
      "את הגרעין של הטרנספורמציה",
      "את הדטרמיננטה של <span dir='ltr'>A</span>"
    ],
    correctAnswer: "את הדימוי של הווקטור <span dir='ltr'>x</span> תחת הטרנספורמציה"
  },
  {
    id: "linalg_transformations_7",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט נראה שכל נקודה במישור נמתחת פי <span dir='ltr'>2</span> ביחס לראשית. איזו טרנספורמציה מתוארת?",
    imageUrl: "",
    options: [
      "שיקוף",
      "הזזה",
      "מתיחה ליניארית",
      "סיבוב ב-<span dir='ltr'>90°</span>"
    ],
    correctAnswer: "מתיחה ליניארית"
  },
  {
    id: "linalg_transformations_8",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור נראה שווקטורים על ציר <span dir='ltr'>x</span> נשארים במקומם, ואילו וקטורים על ציר <span dir='ltr'>y</span> מתהפכים לסימן ההפוך. איזו טרנספורמציה מתוארת?",
    imageUrl: "",
    options: [
      "שיקוף ביחס לציר <span dir='ltr'>x</span>",
      "שיקוף ביחס לציר <span dir='ltr'>y</span>",
      "הזזה קבועה",
      "מתיחה אחידה"
    ],
    correctAnswer: "שיקוף ביחס לציר <span dir='ltr'>x</span>"
  },
  {
    id: "linalg_transformations_9",
    courseId: "linear_algebra",
    subTopic: "transformations",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם טרנספורמציה שומרת את הראשית במקומה ומבצעת רק מתיחה או סיבוב, ייתכן שהיא ליניארית.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },

  // =========================
  // ערכים עצמיים
  // =========================
  {
    id: "linalg_eigenvalues_1",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 1,
    format: "mcq",
    learningType: "concept",
    question: "מהו ערך עצמי של מטריצה?",
    options: [
      "מספר שמקיים <span dir='ltr'>Av = \lambda v</span> עבור וקטור לא אפס <span dir='ltr'>v</span>",
      "כל איבר על האלכסון הראשי",
      "הדטרמיננטה של המטריצה",
      "מספר השורות של המטריצה"
    ],
    correctAnswer: "מספר שמקיים <span dir='ltr'>Av = \lambda v</span> עבור וקטור לא אפס <span dir='ltr'>v</span>"
  },
  {
    id: "linalg_eigenvalues_2",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 2,
    format: "mcq",
    learningType: "concept",
    question: "מהו וקטור עצמי של מטריצה <span dir='ltr'>A</span>?",
    options: [
      "כל וקטור ששייך למטריצה",
      "וקטור לא אפס שמשתנה רק בגודל תחת פעולת <span dir='ltr'>A</span>",
      "וקטור שאורכו 1",
      "וקטור הנמצא בגרעין בלבד"
    ],
    correctAnswer: "וקטור לא אפס שמשתנה רק בגודל תחת פעולת <span dir='ltr'>A</span>"
  },
  {
    id: "linalg_eigenvalues_3",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 1,
    format: "true_false",
    learningType: "concept",
    question: "הווקטור האפס אינו יכול להיות וקטור עצמי.",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  },
  {
    id: "linalg_eigenvalues_4",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>A = \begin{pmatrix}2&0\\0&3\end{pmatrix}</span>, מהם הערכים העצמיים של <span dir='ltr'>A</span>?",
    options: [
      "<span dir='ltr'>2,3</span>",
      "<span dir='ltr'>1,6</span>",
      "<span dir='ltr'>0,5</span>",
      "<span dir='ltr'>2 בלבד</span>"
    ],
    correctAnswer: "<span dir='ltr'>2,3</span>"
  },
  {
    id: "linalg_eigenvalues_5",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 2,
    format: "mcq",
    learningType: "analysis",
    question: "אם <span dir='ltr'>v</span> הוא וקטור עצמי של <span dir='ltr'>A</span> עם ערך עצמי <span dir='ltr'>\lambda</span>, מהו הדימוי של <span dir='ltr'>v</span> תחת <span dir='ltr'>A</span>?",
    options: [
      "וקטור מאונך ל-<span dir='ltr'>v</span>",
      "<span dir='ltr'>\lambda v</span>",
      "<span dir='ltr'>v + \lambda</span>",
      "תמיד וקטור אפס"
    ],
    correctAnswer: "<span dir='ltr'>\lambda v</span>"
  },
  {
    id: "linalg_eigenvalues_6",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 3,
    format: "mcq",
    learningType: "analysis",
    question: "איזה מבין התנאים הבאים שקול לכך ש-<span dir='ltr'>\lambda</span> הוא ערך עצמי של <span dir='ltr'>A</span>?",
    options: [
      "<span dir='ltr'>det(A)=\lambda</span>",
      "<span dir='ltr'>det(A-\lambda I)=0</span>",
      "<span dir='ltr'>A=\lambda I</span>",
      "<span dir='ltr'>det(A+\lambda I)=0</span>"
    ],
    correctAnswer: "<span dir='ltr'>det(A-\lambda I)=0</span>"
  },
  {
    id: "linalg_eigenvalues_7",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "באיור נראה וקטור שכאשר מפעילים עליו את הטרנספורמציה הוא נשאר על אותו קו, ורק אורכו משתנה. מה ניתן להסיק?",
    imageUrl: "",
    options: [
      "הווקטור הוא וקטור עצמי",
      "הווקטור נמצא בגרעין בהכרח",
      "הטרנספורמציה אינה ליניארית",
      "הערך העצמי הוא תמיד 0"
    ],
    correctAnswer: "הווקטור הוא וקטור עצמי"
  },
  {
    id: "linalg_eigenvalues_8",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 2,
    format: "mcq",
    learningType: "visual",
    question: "בשרטוט רואים כי טרנספורמציה מותחת וקטור פי <span dir='ltr'>3</span> מבלי לשנות את כיוונו. מהו הערך העצמי המתאים?",
    imageUrl: "",
    options: [
      "<span dir='ltr'>0</span>",
      "<span dir='ltr'>1</span>",
      "<span dir='ltr'>3</span>",
      "<span dir='ltr'>-3</span>"
    ],
    correctAnswer: "<span dir='ltr'>3</span>"
  },
  {
    id: "linalg_eigenvalues_9",
    courseId: "linear_algebra",
    subTopic: "eigenvalues",
    difficulty: 1,
    format: "true_false",
    learningType: "visual",
    question: "אם וקטור משנה את כיוונו בדיוק להופכי תחת טרנספורמציה, עדיין ייתכן שהוא וקטור עצמי.",
    imageUrl: "",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון"
  }
];
