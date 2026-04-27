export interface CourseData {
  id: string;
  title: string;
  category: string;
  level: string;
  students: number;
  rating: number;
  duration: string;
  description: string;
  longDescription: string;
  color: string;
  objectives: string[];
  syllabus: { week: number; title: string; topics: string[] }[];
}

export const coursesData: Record<string, CourseData> = {
  'calculus1': {
    id: 'calculus1',
    title: 'חדו"א 1',
    category: 'מתמטיקה',
    level: 'בסיסי',
    students: 1250,
    rating: 4.7,
    duration: '14 שבועות',
    description: 'מבוא לחשבון דיפרנציאלי ואינטגרלי - גבולות, נגזרות, אינטגרלים ושימושים',
    longDescription: 'קורס יסודי המקנה את הבסיס המתמטי הנדרש לכל סטודנט למערכות מידע. נלמד את עקרונות החשבון הדיפרנציאלי והאינטגרלי, תוך דגש על הבנה עמוקה ויישום מעשי.',
    color: 'from-blue-500 to-blue-600',
    objectives: [
      'הבנת מושג הגבול והרציפות',
      'חישוב נגזרות של פונקציות מורכבות',
      'פתרון בעיות אופטימיזציה',
      'חישוב אינטגרלים מסוימים ובלתי מסוימים',
      'יישום אינטגרלים לחישוב שטחים ונפחים'
    ],
    syllabus: [
      { week: 1, title: 'גבולות ורציפות', topics: ['הגדרת גבול', 'חישוב גבולות', 'פונקציות רציפות'] },
      { week: 2, title: 'נגזרות', topics: ['הגדרת הנגזרת', 'כללי גזירה', 'נגזרת של פונקציה מורכבת'] },
      { week: 3, title: 'יישומי נגזרות', topics: ['משפט הערך הממוצע', 'אופטימיזציה', 'ניתוח פונקציות'] },
      { week: 4, title: 'אינטגרלים', topics: ['האינטגרל המסוים', 'משפט היסוד', 'שיטות אינטגרציה'] },
    ]
  },
  'sql': {
    id: 'sql',
    title: 'SQL',
    category: 'מסדי נתונים',
    level: 'בינוני',
    students: 1680,
    rating: 4.7,
    duration: '10 שבועות',
    description: 'שאילתות SQL, עיצוב מסדי נתונים, אופטימיזציה ועבודה עם מסדי נתונים יחסיים',
    longDescription: 'קורס מקיף המלמד עבודה עם מסדי נתונים יחסיים באמצעות SQL. נלמד כיצד לתכנן מסדי נתונים, לכתוב שאילתות מורכבות ולבצע אופטימיזציה לביצועים.',
    color: 'from-cyan-500 to-cyan-600',
    objectives: [
      'הבנת עקרונות מסדי נתונים יחסיים',
      'כתיבת שאילתות SELECT מורכבות',
      'ביצוע פעולות JOIN בין טבלאות',
      'עיצוב סכמת מסד נתונים נורמלי',
      'אופטימיזציה של שאילתות ואינדקסים'
    ],
    syllabus: [
      { week: 1, title: 'יסודות SQL', topics: ['SELECT, WHERE, ORDER BY', 'INSERT, UPDATE, DELETE', 'סוגי נתונים'] },
      { week: 2, title: 'שאילתות מתקדמות', topics: ['JOIN - INNER, LEFT, RIGHT', 'GROUP BY ו-HAVING', 'פונקציות אגרגציה'] },
      { week: 3, title: 'עיצוב מסדי נתונים', topics: ['נורמליזציה', 'מפתחות ראשיים וזרים', 'אילוצים'] },
      { week: 4, title: 'אופטימיזציה', topics: ['אינדקסים', 'תכנון ביצוע', 'ביצועים'] },
    ]
  },
  'information-security': {
    id: 'information-security',
    title: 'אבטחת מידע',
    category: 'אבטחה',
    level: 'מתקדם',
    students: 1120,
    rating: 4.9,
    duration: '14 שבועות',
    description: 'הצפנה, אבטחת רשתות, פרוטוקולי אבטחה ושיטות הגנה על מידע',
    longDescription: 'קורס מתקדם העוסק בהגנה על מידע ומערכות מחשוב. נלמד על איומי אבטחה, שיטות הצפנה, אבטחת רשתות ודרכי הגנה על ארגונים.',
    color: 'from-red-500 to-red-600',
    objectives: [
      'הבנת איומי אבטחת מידע עכשוויים',
      'שימוש בשיטות הצפנה סימטריות ואסימטריות',
      'הגנה על רשתות תקשורת',
      'זיהוי ומניעת פריצות',
      'יישום מדיניות אבטחה ארגונית'
    ],
    syllabus: [
      { week: 1, title: 'יסודות אבטחת מידע', topics: ['CIA Triad', 'איומים ופגיעויות', 'ניהול סיכונים'] },
      { week: 2, title: 'קריפטוגרפיה', topics: ['הצפנה סימטרית', 'הצפנה אסימטרית', 'חתימות דיגיטליות'] },
      { week: 3, title: 'אבטחת רשתות', topics: ['Firewalls', 'IDS/IPS', 'VPN'] },
      { week: 4, title: 'אבטחת אפליקציות', topics: ['OWASP Top 10', 'SQL Injection', 'XSS'] },
    ]
  },
  'linear-algebra': {
    id: 'linear-algebra',
    title: 'אלגברה לינארית',
    category: 'מתמטיקה',
    level: 'בסיסי',
    students: 980,
    rating: 4.5,
    duration: '14 שבועות',
    description: 'מרחבים וקטוריים, מטריצות, טרנספורמציות לינאריות וערכים עצמיים',
    longDescription: 'קורס מתמטי המקנה הבנה במרחבים וקטוריים ומטריצות. הקורס חיוני להמשך לימודי מדעי המחשב ומערכות מידע.',
    color: 'from-purple-500 to-purple-600',
    objectives: [
      'הבנת מושג המרחב הווקטורי',
      'פעולות על מטריצות',
      'חישוב דטרמיננטה והופכי',
      'טרנספורמציות לינאריות',
      'ערכים וקטורים עצמיים'
    ],
    syllabus: [
      { week: 1, title: 'מרחבים וקטוריים', topics: ['וקטורים במרחב', 'פעולות על וקטורים', 'תלות לינארית'] },
      { week: 2, title: 'מטריצות', topics: ['פעולות על מטריצות', 'מטריצה הופכית', 'דטרמיננטה'] },
      { week: 3, title: 'טרנספורמציות', topics: ['טרנספורמציות לינאריות', 'גרעין ותמונה', 'מטריצת ייצוג'] },
      { week: 4, title: 'ערכים עצמיים', topics: ['ערכים וקטורים עצמיים', 'אלכסון מטריצה', 'יישומים'] },
    ]
  },
  'oop': {
    id: 'oop',
    title: 'תכנות מונחה עצמים',
    category: 'תכנות',
    level: 'בינוני',
    students: 1450,
    rating: 4.8,
    duration: '12 שבועות',
    description: 'עקרונות OOP, מחלקות, הורשה, פולימורפיזם ודפוסי עיצוב',
    longDescription: 'קורס מעמיק בתכנות מונחה עצמים. נלמד את עקרונות ה-OOP, מחלקות וממשקים, הורשה ופולימורפיזם, ודפוסי עיצוב נפוצים.',
    color: 'from-green-500 to-green-600',
    objectives: [
      'הבנת עקרונות OOP - עיטוף, הורשה, פולימורפיזם',
      'עיצוב וכתיבת מחלקות',
      'שימוש בהורשה וממשקים',
      'הכרת דפוסי עיצוב נפוצים',
      'כתיבת קוד מודולרי ותחזוקתי'
    ],
    syllabus: [
      { week: 1, title: 'מבוא ל-OOP', topics: ['מושגי יסוד', 'מחלקות ואובייקטים', 'עיטוף'] },
      { week: 2, title: 'הורשה', topics: ['יחסי הורשה', 'override ו-overload', 'מחלקות מופשטות'] },
      { week: 3, title: 'פולימורפיזם וממשקים', topics: ['פולימורפיזם', 'ממשקים', 'casting'] },
      { week: 4, title: 'דפוסי עיצוב', topics: ['Singleton', 'Factory', 'Observer'] },
    ]
  },
  'html': {
    id: 'html',
    title: 'HTML',
    category: 'פיתוח Web',
    level: 'בסיסי',
    students: 2100,
    rating: 4.6,
    duration: '6 שבועות',
    description: 'בניית דפי אינטרנט עם HTML5, סמנטיקה, נגישות ותקני Web',
    longDescription: 'קורס בסיסי המלמד כיצד לבנות דפי ינטרנט מובנים עם HTML5. דגש על סמנטיקה, נגישות ותקני Web מודרניים.',
    color: 'from-orange-500 to-orange-600',
    objectives: [
      'הבנת מבנה מסמך HTML',
      'שימוש בתגיות סמנטיות',
      'טפסים ואינטראקציה',
      'נגישות ותקני Web',
      'אינטגרציה עם CSS ו-JavaScript'
    ],
    syllabus: [
      { week: 1, title: 'יסודות HTML', topics: ['מבנה מסמך', 'תגיות בסיסיות', 'קישורים ותמונות'] },
      { week: 2, title: 'HTML5 סמנטי', topics: ['header, nav, main, footer', 'article ו-section', 'aside'] },
      { week: 3, title: 'טפסים', topics: ['input types', 'validation', 'accessibility'] },
      { week: 4, title: 'מולטימדיה ונגישות', topics: ['audio ו-video', 'ARIA', 'תקני נגישות'] },
    ]
  },
  'system_design': {
    id: 'system_design',
    title: 'אפיון ותכן',
    category: 'הנדסת תוכנה',
    level: 'מתקדם',
    students: 820,
    rating: 4.4,
    duration: '12 שבועות',
    description: 'ניתוח דרישות, עיצוב מערכות, UML, תהליכי פיתוח ומתודולוגיות',
    longDescription: 'קורס מתקדם בהנדסת תוכנה המלמד כיצד לאפיין ולתכנן מערכות מידע. נלמד ניתוח דרישות, מודלים, UML ומתודולוגיות פיתוח.',
    color: 'from-indigo-500 to-indigo-600',
    objectives: [
      'ניתוח וניהול דרישות',
      'עיצוב ארכיטקטורת מערכות',
      'שימוש ב-UML',
      'הכרת מתודולוגיות פיתוח',
      'תכנון מסמכי אפיון'
    ],
    syllabus: [
      { week: 1, title: 'ניתוח דרישות', topics: ['דרישות פונקציונליות', 'דרישות לא-פונקציונליות', 'Use Cases'] },
      { week: 2, title: 'UML', topics: ['Class Diagrams', 'Sequence Diagrams', 'Activity Diagrams'] },
      { week: 3, title: 'ארכיטקטורה', topics: ['דפוסי ארכיטקטורה', 'Layer Architecture', 'MVC'] },
      { week: 4, title: 'מתודולוגיות', topics: ['Waterfall', 'Agile', 'Scrum'] },
    ]
  },
  'mis-economics': {
    id: 'mis-economics',
    title: 'כלכלת מערכות מידע',
    category: 'ניהול',
    level: 'מתקדם',
    students: 650,
    rating: 4.3,
    duration: '10 שבועות',
    description: 'ניתוח כלכלי של מערכות מידע, ROI, ניהול פרויקטים וקבלת החלטות',
    longDescription: 'קורס המשלב בין כלכלה לטכנולוגיה. נלמד כיצד להעריך השקעות במערכות מידע, לנהל פרויקטים ולקבל החלטות עסקיות מושכלות.',
    color: 'from-amber-500 to-amber-600',
    objectives: [
      'הבנת העלויות והתועלות של מערכות מידע',
      'ניתוח ROI והחזר השקעה',
      'ניהול פרויקטי IT',
      'קבלת החלטות עסקיות מבוססות נתונים',
      'הערכת סיכונים ואסטרטגיה טכנולוגית'
    ],
    syllabus: [
      { week: 1, title: 'כלכלת IT', topics: ['עלויות פיתוח ותפעול', 'תועלות עסקיות', 'TCO'] },
      { week: 2, title: 'ROI וניתוח השקעות', topics: ['חישוב ROI', 'NPV', 'תקופת החזר'] },
      { week: 3, title: 'ניהול פרויקטים', topics: ['תכנון פרויקט', 'ניהול משאבים', 'GANTT'] },
      { week: 4, title: 'אסטרטגיה דיגיטלית', topics: ['טרנספורמציה דיגיטלית', 'יתרון תחרותי', 'חדשנות'] },
    ]
  },
};
