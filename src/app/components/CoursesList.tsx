import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { CourseCard } from './CourseCard';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
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
  onNavigateToCourses?: () => void;
}

const COURSE_META: Record<string, { title: string; color: string }> = {
  'calculus1':          { title: 'חדו"א 1',               color: 'from-blue-500 to-blue-600' },
  'linear-algebra':     { title: 'אלגברה לינארית',         color: 'from-purple-500 to-purple-600' },
  'oop':                { title: 'תכנות מונחה עצמים',       color: 'from-green-500 to-green-600' },
  'html':               { title: 'HTML',                   color: 'from-orange-500 to-orange-600' },
  'sql':                { title: 'SQL',                    color: 'from-pink-500 to-pink-600' },
  'requirements-design':{ title: 'אפיון ותכן',             color: 'from-fuchsia-500 to-fuchsia-600' },
  'information-security':{ title: 'אבטחת מידע',            color: 'from-red-500 to-red-600' },
  'mis-economics':      { title: 'כלכלת מערכות מידע',       color: 'from-yellow-500 to-yellow-600' },
};

export function CoursesList({ onOpenPractice, onNavigateToCourses }: CoursesListProps) {
  const { user, removeUserCourse } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCourses = user?.selectedCourses ?? [];

  useEffect(() => {
    const buildCourses = async () => {
      setLoading(true);
      try {
        if (selectedCourses.length === 0) {
          setCourses([]);
          return;
        }

        const userId = user?.userId || 'user_1';

        // Fetch progress for each selected course
        const progressQuery = query(
          collection(db, 'course_progress'),
          where('userId', '==', userId)
        );
        const progressSnap = await getDocs(progressQuery);
        const progressMap: Record<string, number> = {};
        progressSnap.docs.forEach(d => {
          const data = d.data();
          progressMap[data.courseId] = data.progress ?? 0;
        });

        const built: Course[] = selectedCourses.map(courseId => {
          const meta = COURSE_META[courseId];
          const progress = progressMap[courseId] ?? 0;
          return {
            courseId,
            title: meta?.title ?? courseId,
            semester: '',
            progress,
            nextLesson: 'המשך תרגול',
            dueDate: '',
            color: meta?.color ?? 'from-teal-500 to-teal-600',
            status: progress === 100 ? 'completed' : 'active',
          };
        });

        setCourses(built);
      } catch (err) {
        console.error('Error building courses list:', err);
      } finally {
        setLoading(false);
      }
    };

    buildCourses();
  }, [selectedCourses.join(','), user?.userId]);

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">הקורסים שלי</h2>
        <div className="grid grid-cols-12 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="col-span-4">
              <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">הקורסים שלי</h2>
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-teal-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">עדיין לא הוספת קורסים</h3>
            <p className="text-gray-500 text-sm">גלה את הקורסים הזמינים והוסף את אלו שמעניינים אותך</p>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white mt-2"
            onClick={onNavigateToCourses}
          >
            עבור לקטלוג הקורסים
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">הקורסים שלי</h2>
        <Button
          className="text-sm text-teal-600 hover:text-teal-700 bg-transparent hover:bg-teal-50 border-0 shadow-none p-0"
          onClick={onNavigateToCourses}
        >
          כל הקורסים ←
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {courses.map(course => (
          <div key={course.courseId} className="col-span-4">
            <CourseCard
              {...course}
              onContinue={() => onOpenPractice?.(course.courseId)}
              onRemove={() => removeUserCourse(course.courseId)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
