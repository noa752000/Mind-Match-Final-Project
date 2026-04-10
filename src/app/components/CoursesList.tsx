import { CourseCard } from './CourseCard';
import { Button } from './ui/button';

const courses = [
  {
    courseId: 'course_4',
    title: 'אבטחת מידע',
    semester: 'סמסטר א׳ | שנה א׳',
    progress: 85,
    nextLesson: 'פרק 12: אבטחת מידע',
    dueDate: 'מטלה: 15 בפברואר',
    color: 'from-teal-500 to-teal-600',
    status: 'active' as const,
  },
  {
    courseId: 'course_2',
    title: 'אפיון ותכן',
    semester: 'סמסטר א׳ | שנה ב׳',
    progress: 62,
    nextLesson: 'פרק 8: UML Diagrams',
    dueDate: 'מטלה: 18 בפברואר',
    color: 'from-purple-500 to-purple-600',
    status: 'active' as const,
  },
  {
    courseId: 'course_1',
    title: 'מסדי נתונים',
    semester: 'סמסטר א׳ | שנה ב׳',
    progress: 78,
    nextLesson: 'פרק 10: Normalization',
    dueDate: 'בחינה: 22 בפברואר',
    color: 'from-green-500 to-green-600',
    status: 'active' as const,
  },
  {
    courseId: 'course_5',
    title: 'HTML',
    semester: 'סמסטר א׳ | שנה ב׳',
    progress: 45,
    nextLesson: 'פרק 5: React Components',
    dueDate: 'פרויקט: 25 בפברואר',
    color: 'from-cyan-500 to-cyan-600',
    status: 'active' as const,
  },
  {
    courseId: 'course_6',
    title: 'מבני נתונים',
    semester: 'סמסטר א׳ | שנה ב׳',
    progress: 91,
    nextLesson: 'פרק 14: Graph Algorithms',
    dueDate: 'מטלה: 12 בפברואר',
    color: 'from-orange-500 to-orange-600',
    status: 'active' as const,
  },
  {
    courseId: 'course_8',
    title: 'ניהול פרויקטים',
    semester: 'סמסטר א׳ | שנה ג׳',
    progress: 100,
    nextLesson: 'הקורס הושלם',
    dueDate: 'ציון סופי: 95',
    color: 'from-emerald-500 to-emerald-600',
    status: 'completed' as const,
  },
];

interface CoursesListProps {
  onOpenPractice?: (courseId: string) => void;
}

export function CoursesList({ onOpenPractice }: CoursesListProps) {
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
        {courses.map((course, index) => (
          <div key={index} className="col-span-4">
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