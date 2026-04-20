import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { CourseCard } from './CourseCard';
import { Button } from './ui/button';

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

export function CoursesList({ onOpenPractice }: CoursesListProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));

        const coursesData: Course[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            courseId: doc.id,
            title: data.title || '',
            semester: data.semester || '',
            progress: data.progress || 0,
            nextLesson: data.nextLesson || '',
            dueDate: data.dueDate || '',
            color: data.color || 'from-teal-500 to-teal-600',
            status: data.status === 'completed' ? 'completed' : 'active',
          };
        });

        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

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