import { ArrowRight, BookOpen, Clock, Users, Award, CheckCircle, TrendingUp, Calculator, BarChart, Activity, Sparkles, MessageCircle, Brain, Database, Shield, Code, FileText, DollarSign, Grid3x3, Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { coursesData } from '../data/coursesData';
import { useAuth } from '../contexts/AuthContext';

// נושאי תרגול לפי קורס
const courseTopics: Record<string, Array<{
  title: string;
  description: string;
  icon: typeof TrendingUp;
  iconColor: string;
  bgColor: string;
  totalQuestions: number;
}>> = {
  'calculus1': [
    {
      title: 'גבולות',
      description: 'גבול של פונקציה מתאר את ההתנהגות של הפונקציה כאשר המשתנה מתקרב לערך מסוים. נושא זה הוא הבסיס להבנת רציפות, נגזרות ואינטגרלים.',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      totalQuestions: 15,
    },
    {
      title: 'נגזרות',
      description: 'הנגזרת מודדת את שיעור השינוי המיידי של פונקציה. נתרגל כללי גזירה, כלל השרשרת ויישומים כמו מציאת נקודות קיצון.',
      icon: Calculator,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      totalQuestions: 22,
    },
    {
      title: 'חקירת פונקציות',
      description: 'ניתוח מלא של פונקציה: תחום הגדרה, נקודות קיצון, נקודות פיתול, תחומי עלייה וירידה ושרטוט הגרף.',
      icon: BarChart,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      totalQuestions: 18,
    },
    {
      title: 'אינטגרלים',
      description: 'האינטגרל הוא הפעולה ההופכית לנגזרת ומשמש לחישוב שטחים ונפחים. נתרגל שיטות אינטגרציה כמו הצבה ואינטגרציה בחלקים.',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      totalQuestions: 20,
    },
  ],
  'sql': [
    { title: 'SELECT ו-WHERE', description: 'פקודות הבסיס לשליפת נתונים ממסד נתונים. נתרגל סינון שורות, מיון תוצאות ושימוש בפונקציות אגרגציה כמו COUNT, SUM ו-AVG.', icon: Database, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 18 },
    { title: 'JOINs', description: 'חיבור טבלאות מאפשר לשלוף נתונים ממספר טבלאות בו-זמנית. נתרגל INNER JOIN, LEFT JOIN, RIGHT JOIN ואת ההבדלים ביניהם.', icon: Grid3x3, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 24 },
    { title: 'נורמליזציה', description: 'תהליך ארגון הנתונים למניעת כפילויות ושמירה על שלמות הנתונים. נלמד את הצורות הנורמליות 1NF, 2NF ו-3NF עם דוגמאות מעשיות.', icon: BarChart, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: 'אופטימיזציה', description: 'שיפור ביצועי שאילתות SQL באמצעות אינדקסים, ניתוח תוכניות ביצוע ואסטרטגיות שאילתה יעילות.', icon: TrendingUp, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 20 },
  ],
  'cyber_security': [
    { title: 'הצפנה סימטרית', description: 'שיטת הצפנה בה אותו מפתח משמש להצפנה ולפענוח. נתרגל אלגוריתמים כמו AES ו-DES, יתרונות וחסרונות ומקרי שימוש.', icon: Shield, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 17 },
    { title: 'הצפנה אסימטרית', description: 'שיטת הצפנה עם זוג מפתחות — ציבורי ופרטי. נתרגל RSA, יישומים בחתימות דיגיטליות ואימות זהות.', icon: Shield, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 21 },
    { title: 'Hash Functions', description: 'פונקציות חד-כיווניות שממירות נתונים לתמצית בגודל קבוע. נתרגל MD5, SHA-256 ויישומים באימות סיסמאות ושלמות קבצים.', icon: Code, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 15 },
    { title: 'אבטחת רשתות', description: 'הגנה על תשתיות תקשורת מפני איומים. נתרגל Firewalls, IDS/IPS, VPN ופרוטוקולי אבטחה כמו TLS ו-IPSec.', icon: Activity, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 19 },
  ],
  'oop': [
    { title: 'מחלקות ואובייקטים', description: 'עקרון הבסיס של OOP — מחלקה כתבנית ואובייקט כמימוש. נתרגל יצירת מחלקות, שדות, מתודות, קונסטרקטורים ועיטוף.', icon: Code, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 16 },
    { title: 'הורשה', description: 'מנגנון שמאפשר למחלקה לרשת תכונות ממחלקה אחרת. נתרגל super, override, מחלקות מופשטות ויחסי is-a.', icon: BarChart, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 20 },
    { title: 'פולימורפיזם', description: 'יכולת אובייקטים שונים להגיב שונה לאותה הודעה. נתרגל method overriding, ממשקים (interface) ו-casting.', icon: Grid3x3, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: 'דפוסי עיצוב', description: 'פתרונות מוכחים לבעיות עיצוב נפוצות בתכנות מונחה עצמים. נתרגל Singleton, Factory, Observer ו-Strategy.', icon: Sparkles, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 22 },
  ],
  'html': [
    { title: 'סמנטיקה', description: 'שימוש בתגיות HTML5 בעלות משמעות כמו header, nav, main, section ו-article לתיאור מבנה הדף בצורה ברורה ונגישה.', icon: FileText, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 14 },
    { title: 'טפסים', description: 'יצירת טפסים אינטראקטיביים עם input types שונים, validation, labels ועקרונות נגישות בטפסים.', icon: Code, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 19 },
    { title: 'נגישות', description: 'הנגשת אתרים לאנשים עם מוגבלויות באמצעות ARIA attributes, ניגודיות צבעים וניווט מקלדת תקני.', icon: Users, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: 'HTML5 APIs', description: 'ממשקי תכנות מתקדמים של HTML5 כמו Local Storage, Geolocation, Canvas ו-Web Workers לאפליקציות עשירות.', icon: Activity, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 17 },
  ],
  'linear-algebra': [
    { title: 'וקטורים', description: 'גדלים בעלי כיוון ועוצמה. נתרגל חיבור וקטורים, כפל בסקלר, מכפלה סקלרית, מכפלה וקטורית ותכונות גיאומטריות.', icon: TrendingUp, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 15 },
    { title: 'מטריצות', description: 'מערכים דו-ממדיים של מספרים. נתרגל פעולות מטריצות, כפל מטריצות, מציאת מטריצה הופכית וחישוב דטרמיננטה.', icon: Grid3x3, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 21 },
    { title: 'טרנספורמציות', description: 'העברת וקטורים ממרחב אחד לאחר. נתרגל טרנספורמציות לינאריות, גרעין ותמונה ומטריצת ייצוג.', icon: Activity, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: 'ערכים עצמיים', description: 'סקלרים מיוחדים המקיימים Av=λv. נתרגל מציאת ערכים וקטורים עצמיים, פולינום אופייני ואלכסון מטריצה.', icon: Calculator, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 19 },
  ],
  'systems_analysis': [
    { title: 'ניתוח דרישות', description: 'תהליך זיהוי, ניתוח ותיעוד דרישות מערכת מהלקוח. נתרגל Use Cases, דרישות פונקציונליות ולא-פונקציונליות.', icon: FileText, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 16 },
    { title: 'UML Diagrams', description: 'שפת מידול גרפית לתיאור מערכות תוכנה. נתרגל Class Diagrams, Sequence Diagrams, Activity Diagrams ו-Use Case Diagrams.', icon: BarChart, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 22 },
    { title: 'ארכיטקטורה', description: 'תכנון המבנה הכללי של מערכת תוכנה. נתרגל דפוסי ארכיטקטורה כמו MVC, Layer Architecture ו-Microservices.', icon: Grid3x3, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: 'מתודולוגיות', description: 'שיטות פיתוח תוכנה שונות. נתרגל Waterfall, Agile, Scrum ו-Kanban — יתרונות, חסרונות ומתי להשתמש בכל אחד.', icon: Users, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 20 },
  ],
  'mis-economics': [
    { title: 'ROI וניתוח השקעות', description: 'מדידת כדאיות כלכלית של השקעות ב-IT. נתרגל חישוב ROI, NPV, IRR ותקופת החזר עם דוגמאות מהעולם האמיתי.', icon: DollarSign, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 17 },
    { title: 'ניהול פרויקטים', description: 'תכנון ובקרת פרויקטי IT. נתרגל Gantt charts, WBS, ניהול סיכונים, ניהול משאבים ועמידה בלוחות זמנים.', icon: Users, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 20 },
    { title: 'ניהול סיכונים', description: 'זיהוי, הערכה וטיפול בסיכונים בפרויקטי IT. נתרגל מטריצת סיכונים, הסתברות ועוצמה ואסטרטגיות תגובה.', icon: Shield, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: 'אסטרטגיה דיגיטלית', description: 'תכנון אסטרטגי של טרנספורמציה דיגיטלית. נתרגל ניתוח SWOT, יתרון תחרותי, חדשנות ומדדי הצלחה דיגיטליים.', icon: TrendingUp, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 18 },
  ],
};

// שאלות אחרונות לפי קורס
const recentQuestions: Record<string, Array<{
  title: string;
  topic: string;
  daysAgo: string;
}>> = {
  'calculus1': [
    { title: 'חישוב גבול של פונקציה רציונלית', topic: 'גבולות', daysAgo: 'לפני 2 ימים' },
    { title: 'נגזרת של פונקציה מורכבת', topic: 'נגזרות', daysAgo: 'לפני 3 ימים' },
    { title: 'מציאת נקודות קיצון', topic: 'חקירת פונקציות', daysAgo: 'לפני שבוע' },
  ],
  'sql': [
    { title: 'שאילתה עם INNER JOIN', topic: 'JOINs', daysAgo: 'לפני יום' },
    { title: 'נורמליזציה לצורה שלישית', topic: 'נורמליזציה', daysAgo: 'לפני 3 ימים' },
    { title: 'אופטימיזציה באמצעות אינדקסים', topic: 'אופטימיזציה', daysAgo: 'לפני 5 ימים' },
  ],
  'cyber_security': [
    { title: 'השוואה בין AES ל-DES', topic: 'הצפנה סימטרית', daysAgo: 'לפני 2 ימים' },
    { title: 'יישום RSA', topic: 'הצפנה אסימטרית', daysAgo: 'לפני 4 ימים' },
    { title: 'פונקציות Hash', topic: 'Hash Functions', daysAgo: 'לפני שבוע' },
  ],
  'oop': [
    { title: 'יישום ירושה ב-Java', topic: 'הורשה', daysAgo: 'לפני יום' },
    { title: 'דוגמה לפולימורפיזם', topic: 'פולימורפיזם', daysAgo: 'לפני 3 ימים' },
    { title: 'Singleton Pattern', topic: 'דפוסי עיצוב', daysAgo: 'לפני 6 ימים' },
  ],
  'html': [
    { title: 'שימוש נכון ב-section ו-article', topic: 'סמנטיקה', daysAgo: 'לפני יום' },
    { title: 'בניית טופס עם validation', topic: 'טפסים', daysAgo: 'לפני 4 ימים' },
    { title: 'ARIA attributes', topic: 'נגישות', daysAgo: 'לפני 5 ימים' },
  ],
  'linear-algebra': [
    { title: 'כפל מטריצות 3x3', topic: 'מטריצות', daysAgo: 'לפני 2 ימים' },
    { title: 'מציאת דטרמיננטה', topic: 'מטריצות', daysAgo: 'לפני 4 ימים' },
    { title: 'חישוב ערכים עצמיים', topic: 'ערכים עצמיים', daysAgo: 'לפני שבוע' },
  ],
  'systems_analysis': [
    { title: 'יצירת Use Case Diagram', topic: 'UML Diagrams', daysAgo: 'לפני יום' },
    { title: 'ניתוח דרישות לא-פונקציונליות', topic: 'ניתוח דרישות', daysAgo: 'לפני 3 ימים' },
    { title: 'השוואה בין Agile ל-Waterfall', topic: 'מתודולוגיות', daysAgo: 'לפני 6 ימים' },
  ],
  'mis-economics': [
    { title: 'חישוב ROI למערכת CRM', topic: 'ROI וניתוח השקעות', daysAgo: 'לפני 2 ימים' },
    { title: 'תכנון תקציב פרויקט', topic: 'ניהול פרויקטים', daysAgo: 'לפני 4 ימים' },
    { title: 'ניתוח סיכוני אבטחה', topic: 'ניהול סיכונים', daysAgo: 'לפני שבוע' },
  ],
};

// שאלות לדוגמה
const quizQuestions = {
  multipleChoice: [
    {
      question: 'מהו הפלט של השאילתה הבאה?\nSELECT COUNT(*) FROM students WHERE grade > 80;',
      options: ['מספר הסטודנטים עם ציון מעל 80', 'סכום הציונים', 'ממוצע הציונים', 'רשימת שמות הסטודנטים'],
      correct: 0,
    },
    {
      question: 'איזה סוג JOIN מחזיר רק שורות שיש להן התאמה בשני הטבלאות?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN'],
      correct: 2,
    },
    {
      question: 'מהי המטרה של נורמליזציה במסדי נתונים?',
      options: ['להאיץ שאילתות', 'להפחית כפילות נתונים', 'להגדיל את גודל הטבלאות', 'למחוק נתונים'],
      correct: 1,
    },
  ],
  trueFalse: [
    { question: 'ניתן להשתמש ב-WHERE עם פונקציות אגרגציה', answer: false },
    { question: 'PRIMARY KEY יכול להכיל ערכי NULL', answer: false },
    { question: 'אינדקס משפר את ביצועי SELECT אבל מאט INSERT', answer: true },
  ],
  openEnded: [
    { question: 'הסבר מהו FOREIGN KEY ומה התפקיד שלו במסד נתונים יחסי' },
    { question: 'כתוב שאילתה SQL שמחזירה את 5 הסטודנטים עם הציון הגבוה ביותר' },
    { question: 'מהם היתרונות והחסרונות של שימוש באינדקסים במסד נתונים?' },
  ],
};

const questionTypeDescriptions: Record<string, { knowledge: string; analysis: string; visuals: string }> = {
  'calculus1': {
    knowledge: 'הגדרות מתמטיות של גבולות, רציפות, נגזרות ואינטגרלים. בוחנות הבנת מושגי יסוד כמו כלל לופיטל, משפט הערך הממוצע ושיטות אינטגרציה.',
    analysis: 'פתרון תרגילי חישוב מורכבים — חישוב גבולות, נגזרות של פונקציות מורכבות, בעיות אופטימיזציה ומציאת שטחים באמצעות אינטגרלים.',
    visuals: 'קריאה וניתוח של גרפי פונקציות, זיהוי נקודות קיצון ופיתול מתרשים, והבנת התנהגות פונקציה לפי צורת הגרף.',
  },
  'linear-algebra': {
    knowledge: 'הגדרות של מרחבים וקטוריים, תלות ואי-תלות לינארית, מטריצות, טרנספורמציות לינאריות וערכים עצמיים.',
    analysis: 'חישוב דטרמיננטה, מציאת מטריצה הופכית, פתרון מערכות משוואות לינאריות ומציאת ערכים וקטורים עצמיים.',
    visuals: 'קריאת מטריצות וביצוע פעולות עליהן, ייצוג גיאומטרי של וקטורים ותרשימי טרנספורמציות במישור.',
  },
  'oop': {
    knowledge: 'מושגי יסוד בתכנות מונחה עצמים — מחלקות, אובייקטים, עיטוף, הורשה, פולימורפיזם וממשקים.',
    analysis: 'ניתוח תרחישי תכנות, בחירת דפוס עיצוב מתאים (Singleton, Factory, Observer) ופתרון בעיות ארכיטקטורת קוד.',
    visuals: 'קריאת קוד Java ו-Python, ניתוח class diagrams וזיהוי יחסי ירושה וקומפוזיציה בין מחלקות.',
  },
  'html': {
    knowledge: 'תגיות HTML5 ומשמעותן הסמנטית, מושגי נגישות, ARIA attributes ותקני Web מודרניים.',
    analysis: 'ניתוח מבנה דפי אינטרנט, בחירת תגית סמנטית מתאימה ופתרון בעיות נגישות וולידציה של טפסים.',
    visuals: 'קריאת קוד HTML ו-CSS, זיהוי שגיאות במבנה הדף ופירוש תרשימי פריסה ו-DOM.',
  },
  'sql': {
    knowledge: 'מושגי יסוד של מסדי נתונים יחסיים — מפתחות ראשיים וזרים, נורמליזציה, פקודות DDL ו-DML.',
    analysis: 'ניתוח שאילתות SQL מורכבות, פתרון בעיות נורמליזציה וזיהוי צווארי בקבוק בביצועי שאילתות.',
    visuals: 'קריאת שאילתות SQL וניחוש התוצאה, ניתוח תרשימי ERD וקריאת תוצאות JOIN בין טבלאות.',
  },
  'systems_analysis': {
    knowledge: 'מושגי UML, סוגי דרישות מערכת (פונקציונליות ולא-פונקציונליות) ומתודולוגיות פיתוח כמו Agile ו-Waterfall.',
    analysis: 'ניתוח תרחישי מערכת, זיהוי דרישות מתוך תיאור לקוח ובחירת ארכיטקטורה ומתודולוגיה מתאימה.',
    visuals: 'קריאת דיאגרמות UML — Use Case, Class, Sequence ו-Activity Diagrams וזיהוי יחסים בין רכיבי המערכת.',
  },
  'cyber_security': {
    knowledge: 'מושגי הצפנה סימטרית ואסימטרית, פרוטוקולי אבטחה (TLS, IPSec), Hash Functions ועקרונות ה-CIA Triad.',
    analysis: 'ניתוח תרחישי אבטחה, זיהוי פגיעויות (OWASP Top 10, SQL Injection, XSS) ובחירת מנגנון הגנה מתאים.',
    visuals: 'קריאת תרשימי רשת ופרוטוקולים, ניתוח קוד הצפנה ופירוש תרשימי תקשורת מאובטחת.',
  },
  'mis-economics': {
    knowledge: 'מושגי ROI, NPV, TCO, ניהול פרויקטי IT וכלי תכנון כמו WBS ותרשים Gantt.',
    analysis: 'חישוב ROI ותקופת החזר, ניתוח עלות-תועלת של השקעות IT וזיהוי סיכונים בפרויקטים.',
    visuals: 'קריאת תרשימי Gantt, גרפי עלות-זמן, מטריצות סיכונים ותרשימי מבנה ארגוני של פרויקטים.',
  },
};

const defaultQuestionTypes = {
  knowledge: 'הגדרות ומושגי יסוד של הקורס. בוחנות הבנת עקרונות בסיסיים ועובדות מרכזיות.',
  analysis: 'ניתוח תרחישים, פתרון בעיות והשוואה בין מושגים. דורשות חשיבה ביקורתית ויישום.',
  visuals: 'קריאה וניתוח של חומר ויזואלי — תרשימים, גרפים ודוגמאות הרלוונטיות לקורס.',
};

interface CourseDetailPageProps {
  courseId: string;
  onBack?: () => void;
  onOpenTutor?: (courseId: string) => void;
  onOpenPractice?: (courseId: string) => void;
}

export function CourseDetailPage({ courseId, onBack, onOpenTutor, onOpenPractice }: CourseDetailPageProps) {
  const course = coursesData[courseId] || coursesData['sql'];
  const { user, addUserCourse, removeUserCourse } = useAuth();

  const isInMyCourses = user?.selectedCourses?.includes(courseId) ?? false;
  const [toggling, setToggling] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    const fetchEnrolledCount = async () => {
      try {
        const countSnap = await getCountFromServer(
          query(collection(db, 'users'), where('selectedCourses', 'array-contains', courseId))
        );
        setEnrolledCount(countSnap.data().count);
      } catch (error) {
        console.error('Failed to fetch enrolled count:', error);
      }
    };

    fetchEnrolledCount();
  }, [courseId]);

  const handleToggleCourse = async () => {
    setToggling(true);
    if (isInMyCourses) {
      await removeUserCourse(courseId);
    } else {
      await addUserCourse(courseId);
    }
    setToggling(false);
  };

  const handleOpenChat = () => {
    if (onOpenTutor) {
      onOpenTutor(courseId);
    }
  };

  const qTypes = questionTypeDescriptions[courseId] || defaultQuestionTypes;

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-[1440px] mx-auto px-16 py-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:bg-blue-100 mb-4"
            onClick={onBack}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לקטלוג הקורסים
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              {onOpenPractice && (
                <button
                  onClick={() => onOpenPractice(courseId)}
                  className="flex items-center gap-2 h-12 px-6 text-base font-semibold text-teal-700 bg-white border-2 border-teal-300 hover:bg-teal-50 transition-all rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  התחל תרגול
                </button>
              )}
              <button
                onClick={handleToggleCourse}
                disabled={toggling}
                className={isInMyCourses
                  ? 'flex items-center gap-2 h-12 px-6 text-base font-semibold bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600 border-2 border-green-300 hover:border-red-300 transition-all rounded-xl disabled:opacity-50'
                  : 'flex items-center gap-2 h-12 px-6 text-base font-bold bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50'
                }
              >
                {isInMyCourses
                  ? <><CheckCircle className="w-5 h-5" />בקורסים שלי</>
                  : <><Plus className="w-5 h-5" />הוסף לקורסים שלי</>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-16 py-12">
        <div className="space-y-8">

          {/* הסבר כללי על הקורס */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-right">
              אודות הקורס
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-right mb-4">
              {course.longDescription}
            </p>
            <div className="flex items-center gap-6 text-gray-600 text-right">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{enrolledCount.toLocaleString()} סטודנטים</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.syllabus.length} נושאים עיקריים</span>
              </div>
            </div>
          </Card>

          {/* סוגי שאלות */}
          <Card className="p-8">
            <div className="flex items-center justify-start gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">מבנה השאלות בקורס</h2>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>

            <p className="text-gray-600 text-right mb-6 leading-relaxed">
              כל קורס מכיל <span className="font-bold text-gray-900">36 שאלות תרגול</span> המחולקות לשלושה סוגים, המיועדים לחזק היבטים שונים של ההבנה:
            </p>

            <div className="grid grid-cols-3 gap-6">
              {/* Knowledge */}
              <div className="bg-blue-50 rounded-2xl p-6 text-right border border-blue-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-blue-900">Knowledge</h3>
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">12 שאלות</div>
                <p className="text-sm text-blue-700 leading-relaxed">{qTypes.knowledge}</p>
              </div>

              {/* Analysis */}
              <div className="bg-purple-50 rounded-2xl p-6 text-right border border-purple-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-purple-900">Analysis</h3>
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">12 שאלות</div>
                <p className="text-sm text-purple-700 leading-relaxed">{qTypes.analysis}</p>
              </div>

              {/* Visuals */}
              <div className="bg-green-50 rounded-2xl p-6 text-right border border-green-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-green-900">Visuals</h3>
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">12 שאלות</div>
                <p className="text-sm text-green-700 leading-relaxed">{qTypes.visuals}</p>
              </div>
            </div>

          </Card>

          {/* קטגוריות תרגול לפי נושאים */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right">
              תרגול לפי נושאים
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {courseTopics[courseId]?.map((topic) => (
                <Card key={topic.title} className="p-8 hover:shadow-lg transition-shadow flex flex-col">
                  <div className="flex items-center justify-start gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 text-left flex-1">{topic.title}</h3>
                    <div className={`w-14 h-14 rounded-xl ${topic.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <topic.icon className={`w-7 h-7 ${topic.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-right leading-relaxed mb-6 flex-1">
                    {topic.description}
                  </p>
                </Card>
              ))}

              {/* מבחנים לדוגמה */}
              <Card className="p-8 hover:shadow-lg transition-shadow col-span-2">
                <div className="text-right">
                  <div className="flex items-center justify-start gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">מבחנים לדוגמה</h3>
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
                      <Award className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}