import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { CourseCard } from './CourseCard';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  courseId: string;
  title: string;
  semester: string;
  progress: number;
  nextLesson: string;
  dueDate: string;
  color: string;
  status: 'active' | 'completed';
}

interface CoursesListProps {
  onOpenPractice?: (courseId: string) => void;
}

const courseTitleMap: Record<string, string> = {
  calculus1: 'חדו"א 1',
  linear_algebra: 'אלגברה לינארית',
  sql: 'SQL',
  oop: 'תכנות מונחה עצמים',
  systems_analysis: 'ניתוח מערכות',
  html_fundamentals: 'יסודות HTML',
  cyber_security: 'אבטחת סייבר ואבטחת מידע',
  information_systems_economics: 'כלכלת מערכות מידע',

  // גיבויים אם עדיין יש מזהים ישנים
  course_1: 'SQL',
  course_2: 'ניתוח מערכות',
  course_3: 'תכנות מונחה עצמים',
  course_4: 'חדו"א 1',
  course_5: 'אלגברה לינארית',
  course_6: 'יסודות HTML',
  course_7: 'אבטחת סייבר ואבטחת מידע',
  course_8: 'כלכלת מערכות מידע',
};

function normalizeCourseId(data: any, docId: string) {
  const rawId = data.id || data.courseId || docId;
  const title = (data.title || '').trim();

  if (rawId === 'calculus1' || title === 'Calculus 1' || title === 'חדו"א 1') return 'calculus1';
  if (rawId === 'sql' || title === 'SQL') return 'sql';
  if (rawId === 'oop' || title.includes('Object-Oriented Programming') || title.includes('OOP')) return 'oop';
  if (rawId === 'systems_analysis' || title.includes('Systems Analysis') || title.includes('Use Cases')) return 'systems_analysis';
  if (rawId === 'html_fundamentals' || title.includes('HTML')) return 'html_fundamentals';
  if (rawId === 'linear_algebra' || title.includes('Linear Algebra')) return 'linear_algebra';
  if (rawId === 'cyber_security' || title.includes('Cyber Security')) return 'cyber_security';
  if (
    rawId === 'information_systems_economics' ||
    title.includes('Information Systems Economics')
  ) {
    return 'information_systems_economics';
  }

  return rawId;
}

function normalizeCourseTitle(courseId: string, originalTitle: string) {
  return courseTitleMap[courseId] || originalTitle || 'קורס ללא שם';
}

export function CoursesList({ onOpenPractice }: CoursesListProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCoursesAndInteractions = async () => {
      try {
        const userId = (user as any)?.id || (user as any)?.uid || 'user_1';

        const coursesSnapshot = await getDocs(collection(db, 'courses'));

        const interactionsQuery = query(
          collection(db, 'interactions'),
          where('userId', '==', userId)
        );
        const interactionsSnapshot = await getDocs(interactionsQuery);

        const interactions = interactionsSnapshot.docs.map((doc) => doc.data());

        const coursesData: Course[] = coursesSnapshot.docs.map((doc) => {
          const data = doc.data();
          const courseId = normalizeCourseId(data, doc.id);

          const courseInteractions = interactions.filter(
            (interaction: any) =>
              interaction.courseId === courseId ||
              interaction.courseId === data.courseId ||
              interaction.courseId === doc.id
          );

          const progress = Math.min(courseInteractions.length * 10, 100);

          return {
            courseId,
            title: normalizeCourseTitle(courseId, data.title || ''),
            semester:
              data.year === 1
                ? 'שנה א׳'
                : data.year === 2
                ? 'שנה ב׳'
                : data.year === 3
                ? 'שנה ג׳'
                : 'שנה לא ידועה',
            progress,
            nextLesson: 'המשך תרגול',
            dueDate: '',
            color: 'from-teal-500 to-teal-600',
            status: progress === 100 ? 'completed' : 'active',
          };
        });

        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses/interactions:', error);
      }
    };

    fetchCoursesAndInteractions();
  }, [user]);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">הקורסים שלי</h2>

        <div className="flex items-center gap-4">
          <Button className="text-sm text-teal-600 hover:text-teal-700 bg-transparent hover:bg-teal-50 border-0 shadow-none p-0">
            כל הקורסים ←
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {courses.map((course) => (
          <div key={course.courseId} className="col-span-4">
            <CourseCard
              {...course}
              onContinue={() => onOpenPractice?.(course.courseId)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}