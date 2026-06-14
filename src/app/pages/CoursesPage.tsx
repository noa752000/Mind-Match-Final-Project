import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { BookOpen, Clock, Users, Star, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  rating: number;
  duration: string;
  description: string;
  color: string;
}

const courses: Course[] = [
  {
    id: 'calculus1',
    title: 'חדו"א 1',
    category: 'מתמטיקה',
    level: 'בסיסי',
    rating: 4.7,
    duration: '14 שבועות',
    description: 'מבוא לחשבון דיפרנציאלי ואינטגרלי - גבולות, נגזרות, אינטגרלים ושימושים',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'linear-algebra',
    title: 'אלגברה לינארית',
    category: 'מתמטיקה',
    level: 'בסיסי',
    rating: 4.5,
    duration: '14 שבועות',
    description: 'מרחבים וקטוריים, מטריצות, טרנספורמציות לינאריות וערכים עצמיים',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'oop',
    title: 'תכנות מונחה עצמים',
    category: 'תכנות',
    level: 'בינוני',
    rating: 4.8,
    duration: '12 שבועות',
    description: 'עקרונות OOP, מחלקות, הורשה, פולימורפיזם ודפוסי עיצוב',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'html',
    title: 'HTML',
    category: 'פיתוח Web',
    level: 'בסיסי',
    rating: 4.6,
    duration: '6 שבועות',
    description: 'בניית דפי אינטרנט עם HTML5, סמנטיקה, נגישות ותקני Web',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'sql',
    title: 'SQL',
    category: 'מסדי נתונים',
    level: 'בינוני',
    rating: 4.7,
    duration: '10 שבועות',
    description: 'שאילתות SQL, עיצוב מסדי נתונים, אופטימיזציה ועבודה עם מסדי נתונים יחסיים',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'requirements-design',
    title: 'אפיון ותכן',
    category: 'הנדסת תוכנה',
    level: 'מתקדם',
    rating: 4.4,
    duration: '12 שבועות',
    description: 'ניתוח דרישות, עיצוב מערכות, UML, תהליכי פיתוח ומתודולוגיות',
    color: 'from-fuchsia-500 to-fuchsia-600',
  },
  {
    id: 'information-security',
    title: 'אבטחת מידע',
    category: 'אבטחה',
    level: 'מתקדם',
    rating: 4.9,
    duration: '14 שבועות',
    description: 'הצפנה, אבטחת רשתות, פרוטוקולי אבטחה ושיטות הגנה על מידע ומערכות',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'mis-economics',
    title: 'כלכלת מערכות מידע',
    category: 'ניהול',
    level: 'מתקדם',
    rating: 4.3,
    duration: '10 שבועות',
    description: 'ניתוח כלכלי של מערכות מידע, ROI, ניהול פרויקטים וקבלת החלטות',
    color: 'from-yellow-500 to-yellow-600',
  },
];

interface CoursesPageProps {
  onCourseSelect?: (courseId: string) => void;
}

export function CoursesPage({ onCourseSelect }: CoursesPageProps) {
  const [enrolledCounts, setEnrolledCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const counts: Record<string, number> = {};
        snap.docs.forEach(d => {
          const selectedCourses = (d.data().selectedCourses || []) as string[];
          selectedCourses.forEach(courseId => {
            counts[courseId] = (counts[courseId] || 0) + 1;
          });
        });
        setEnrolledCounts(counts);
      } catch (error) {
        console.error('Failed to fetch course enrollment counts:', error);
      }
    };

    fetchEnrollment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <div className="text-right">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              קטלוג הקורסים
            </h1>
            <p className="text-xl text-gray-600">
              גלה את הקורסים המוצעים במערכות מידע
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-[1440px] mx-auto px-16 py-12">
        <div className="grid grid-cols-12 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group">
                {/* Course Header with Gradient */}
                <div className={`bg-gradient-to-l ${course.color} p-6 text-white relative overflow-hidden min-h-[140px]`}>
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <BookOpen className="w-32 h-32 absolute -top-4 -left-4 transform rotate-12" />
                  </div>
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white border-white/30 mb-3">
                      {course.category}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2 text-right">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/90 justify-start">
                      <div className="flex items-center gap-1">
                        <span>{course.rating}</span>
                        <Star className="w-4 h-4 fill-white" />
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/50"></div>
                      <div className="flex items-center gap-1">
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 text-right mb-6 leading-relaxed flex-1">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">נושאים</span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>4 נושאים עיקריים</span>
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">רשומים</span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>{(enrolledCounts[course.id] ?? 0).toLocaleString()} סטודנטים</span>
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white group-hover:shadow-lg transition-all"
                    onClick={() => onCourseSelect?.(course.id)}
                  >
                    <TrendingUp className="w-4 h-4 ml-2" />
                    צפה בקורס
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}