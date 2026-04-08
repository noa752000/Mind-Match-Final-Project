import { ArrowRight, BookOpen, Clock, Users, Star, Award, CheckCircle, Circle, PlayCircle, TrendingUp, Calculator, BarChart, Activity, Sparkles, MessageCircle, Brain, Database, Shield, Code, FileText, DollarSign, Grid3x3 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useState } from 'react';
import { coursesData } from '../data/coursesData';

// נושאי תרגול לפי קורס
const courseTopics: Record<string, Array<{
  title: string;
  icon: typeof TrendingUp;
  iconColor: string;
  bgColor: string;
  hoverColor: string;
  totalQuestions: number;
  multipleChoice: number;
  trueFalse: number;
  openEnded: number;
}>> = {
  'calculus1': [
    {
      title: 'גבולות',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 15,
      multipleChoice: 8,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'נגזרות',
      icon: Calculator,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 22,
      multipleChoice: 12,
      trueFalse: 6,
      openEnded: 4,
    },
    {
      title: 'חקירת פונקציות',
      icon: BarChart,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 18,
      multipleChoice: 10,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'אינטגרלים',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 20,
      multipleChoice: 11,
      trueFalse: 5,
      openEnded: 4,
    },
  ],
  'sql': [
    {
      title: 'SELECT ו-WHERE',
      icon: Database,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 18,
      multipleChoice: 10,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'JOINs',
      icon: Grid3x3,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 24,
      multipleChoice: 14,
      trueFalse: 6,
      openEnded: 4,
    },
    {
      title: 'נורמליזציה',
      icon: BarChart,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 16,
      multipleChoice: 9,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'אופטימיזציה',
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 20,
      multipleChoice: 12,
      trueFalse: 5,
      openEnded: 3,
    },
  ],
  'information-security': [
    {
      title: 'הצפנה סימטרית',
      icon: Shield,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 17,
      multipleChoice: 9,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'הצפנה אסימטרית',
      icon: Shield,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 21,
      multipleChoice: 12,
      trueFalse: 5,
      openEnded: 4,
    },
    {
      title: 'Hash Functions',
      icon: Code,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 15,
      multipleChoice: 8,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'אבטחת רשתות',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 19,
      multipleChoice: 11,
      trueFalse: 5,
      openEnded: 3,
    },
  ],
  'oop': [
    {
      title: 'מחלקות ואובייקטים',
      icon: Code,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 16,
      multipleChoice: 9,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'הורשה',
      icon: BarChart,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 20,
      multipleChoice: 11,
      trueFalse: 6,
      openEnded: 3,
    },
    {
      title: 'פולימורפיזם',
      icon: Grid3x3,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 18,
      multipleChoice: 10,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'דפוסי עיצוב',
      icon: Sparkles,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 22,
      multipleChoice: 13,
      trueFalse: 5,
      openEnded: 4,
    },
  ],
  'html': [
    {
      title: 'סמנטיקה',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 14,
      multipleChoice: 8,
      trueFalse: 4,
      openEnded: 2,
    },
    {
      title: 'טפסים',
      icon: Code,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 19,
      multipleChoice: 11,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'נגישות',
      icon: Users,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 16,
      multipleChoice: 9,
      trueFalse: 5,
      openEnded: 2,
    },
    {
      title: 'HTML5 APIs',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 17,
      multipleChoice: 10,
      trueFalse: 4,
      openEnded: 3,
    },
  ],
  'linear-algebra': [
    {
      title: 'וקטורים',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 15,
      multipleChoice: 8,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'מטריצות',
      icon: Grid3x3,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 21,
      multipleChoice: 12,
      trueFalse: 5,
      openEnded: 4,
    },
    {
      title: 'טרנספורמציות',
      icon: Activity,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 18,
      multipleChoice: 10,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'ערכים עצמיים',
      icon: Calculator,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 19,
      multipleChoice: 11,
      trueFalse: 5,
      openEnded: 3,
    },
  ],
  'requirements-design': [
    {
      title: 'ניתוח דרישות',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 16,
      multipleChoice: 9,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'UML Diagrams',
      icon: BarChart,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 22,
      multipleChoice: 13,
      trueFalse: 5,
      openEnded: 4,
    },
    {
      title: 'ארכיטקטורה',
      icon: Grid3x3,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 18,
      multipleChoice: 10,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'מתודולוגיות',
      icon: Users,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 20,
      multipleChoice: 12,
      trueFalse: 5,
      openEnded: 3,
    },
  ],
  'mis-economics': [
    {
      title: 'ROI וניתוח השקעות',
      icon: DollarSign,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50',
      totalQuestions: 17,
      multipleChoice: 10,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'ניהול פרויקטים',
      icon: Users,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:border-green-500 hover:bg-green-50',
      totalQuestions: 20,
      multipleChoice: 12,
      trueFalse: 5,
      openEnded: 3,
    },
    {
      title: 'ניהול סיכונים',
      icon: Shield,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50',
      totalQuestions: 16,
      multipleChoice: 9,
      trueFalse: 4,
      openEnded: 3,
    },
    {
      title: 'אסטרטגיה דיגיטלית',
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:border-orange-500 hover:bg-orange-50',
      totalQuestions: 18,
      multipleChoice: 11,
      trueFalse: 4,
      openEnded: 3,
    },
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
  'information-security': [
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
  'requirements-design': [
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

interface CourseDetailPageProps {
  courseId: string;
  onBack?: () => void;
  onOpenTutor?: (courseId: string) => void;
}

export function CourseDetailPage({ courseId, onBack, onOpenTutor }: CourseDetailPageProps) {
  const course = coursesData[courseId] || coursesData['sql']; // Default to SQL if not found

  const handleOpenChat = () => {
    if (onOpenTutor) {
      onOpenTutor(courseId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-[1440px] mx-auto px-16 py-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:bg-blue-100 mb-4"
            onClick={onBack}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לקטלוג הקור��ים
          </Button>

          <div className="flex items-center justify-start gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
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
              <Badge variant="secondary" className="mr-2">{course.level}</Badge>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students.toLocaleString()} סטודנטים</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
            </div>
          </Card>

          {/* כפתור תרגול מהיר */}
          <Card className="p-6 bg-gradient-to-l from-blue-600 to-indigo-600 text-white hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <h2 className="text-xl font-bold mb-1">התחל תרגול</h2>
                <p className="text-blue-100 text-sm">
                  המערכת תבחר שאלות מותאמות לרמתך
                </p>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base font-semibold">
                <Brain className="w-5 h-5 ml-2" />
                התחל עכשיו
              </Button>
            </div>
          </Card>

          {/* קטגוריות תרגול לפי נושאים */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right">
              תרגול לפי נושאים
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {courseTopics[courseId]?.map((topic) => (
                <Card key={topic.title} className="p-8 hover:shadow-lg transition-shadow">
                  <div className={courseId === 'linear-algebra' || courseId === 'oop' ? 'text-left' : 'text-right'}>
                    <div className={`flex items-center ${courseId === 'linear-algebra' || courseId === 'oop' ? 'justify-start' : 'justify-end'} gap-4 mb-4`}>
                      <div className={`w-16 h-16 rounded-xl ${topic.bgColor} flex items-center justify-center`}>
                        <topic.icon className={`w-8 h-8 ${topic.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">
                      {topic.totalQuestions} שאלות זמינות
                    </p>
                    <div className="space-y-2 mb-6">
                      <button className={`w-full p-3 ${courseId === 'linear-algebra' || courseId === 'oop' ? 'text-left' : 'text-right'} rounded-lg border-2 border-gray-200 ${topic.hoverColor} transition-all flex items-center justify-between group`}>
                        <span className="font-medium text-gray-700">אמריקאיות</span>
                        <Badge variant="secondary" className={`${topic.bgColor} ${topic.iconColor.replace('text-', 'text-')} group-hover:bg-opacity-80`}>{topic.multipleChoice} שאלות</Badge>
                      </button>
                      <button className={`w-full p-3 ${courseId === 'linear-algebra' || courseId === 'oop' ? 'text-left' : 'text-right'} rounded-lg border-2 border-gray-200 ${topic.hoverColor} transition-all flex items-center justify-between group`}>
                        <span className="font-medium text-gray-700">נכון/לא נכון</span>
                        <Badge variant="secondary" className={`${topic.bgColor} ${topic.iconColor.replace('text-', 'text-')} group-hover:bg-opacity-80`}>{topic.trueFalse} שאלות</Badge>
                      </button>
                      <button className={`w-full p-3 ${courseId === 'linear-algebra' || courseId === 'oop' ? 'text-left' : 'text-right'} rounded-lg border-2 border-gray-200 ${topic.hoverColor} transition-all flex items-center justify-between group`}>
                        <span className="font-medium text-gray-700">פתוחות</span>
                        <Badge variant="secondary" className={`${topic.bgColor} ${topic.iconColor.replace('text-', 'text-')} group-hover:bg-opacity-80`}>{topic.openEnded} שאלות</Badge>
                      </button>
                    </div>
                    <Button variant="outline" className="w-full h-12 text-base font-semibold">
                      כל סוגי השאלות
                    </Button>
                  </div>
                </Card>
              ))}

              {/* שאלות מבחנים משנים קודמות */}
              <Card className="p-8 hover:shadow-lg transition-shadow col-span-2">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">שאלות מבחנים משנים קודמות</h3>
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
                      <Award className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">
                    35 שאלות ממבחנים קודמים
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button className="p-3 text-right rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group">
                      <span className="font-medium text-gray-700 block mb-1">אמריקאיות</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-700 group-hover:bg-red-200">20 שאלות</Badge>
                    </button>
                    <button className="p-3 text-right rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group">
                      <span className="font-medium text-gray-700 block mb-1">נכון/לא נכון</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-700 group-hover:bg-red-200">10 שאלות</Badge>
                    </button>
                    <button className="p-3 text-right rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group">
                      <span className="font-medium text-gray-700 block mb-1">פתוחות</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-700 group-hover:bg-red-200">5 שאלות</Badge>
                    </button>
                  </div>
                  <Button variant="outline" className="w-full h-12 text-base font-semibold">
                    כל סוגי השאלות
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* שאלות אחרונות */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">
              השאלות האחרונות שלך
            </h3>
            <div className="space-y-4">
              {recentQuestions[courseId]?.map((question) => (
                <div key={question.title} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-lg mb-1">{question.title}</p>
                    <p className="text-sm text-gray-600">{question.topic} • {question.daysAgo}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 font-semibold">
                    המשך
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* קישורים לעזרה וניתוח */}
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200">
              <div className="text-right">
                <MessageCircle className="w-12 h-12 text-blue-600 mb-4 mr-auto" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">צריך הסבר?</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  שאל את המורה AI או קבל הסבר מפורט על כל נושא בקורס
                </p>
                <Button variant="outline" className="w-full h-12 text-base font-semibold" onClick={handleOpenChat}>
                  פתח צ'אט עם מורה AI
                </Button>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
              <div className="text-right">
                <BarChart className="w-12 h-12 text-green-600 mb-4 mr-auto" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">צפה בניתוח הלמידה שלך</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  תובנות והמלצות מותאמות אישית על סמך ההתקדמות שלך
                </p>
                <Button variant="outline" className="w-full h-12 text-base font-semibold">
                  עבור לניתוח ותובנות
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}