import { BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { courseName, formatMinutes, CourseProgressData } from '../lib/analyticsTypes';

interface CoursePracticeBreakdownProps {
  courseProgress: CourseProgressData[];
  loading?: boolean;
}

const COLORS = [
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-yellow-600',
  'from-red-500 to-pink-600',
  'from-teal-500 to-cyan-600',
];

export function CoursePracticeBreakdown({ courseProgress, loading }: CoursePracticeBreakdownProps) {
  if (loading) {
    return <Card className="p-8 border-gray-100 h-96 animate-pulse bg-gray-50" />;
  }

  const practiced = [...courseProgress]
    .filter(p => p.totalAnswers > 0)
    .sort((a, b) => b.practicedMinutes - a.practicedMinutes);

  if (practiced.length === 0) {
    return (
      <Card className="p-8 border-gray-100 pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-right">פילוח תרגול לפי קורס</h2>
        </div>
        <p className="text-gray-500 text-center py-8">
          עדיין אין נתוני תרגול. התחל/י לתרגל קורס כדי לראות פילוח מותאם אישית כאן.
        </p>
      </Card>
    );
  }

  const mostPracticed = practiced[0];
  const mostAccurate = [...practiced].sort((a, b) => b.accuracy - a.accuracy)[0];

  return (
    <Card className="p-8 border-gray-100 pt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 text-right">פילוח תרגול לפי קורס</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {practiced.map((p, index) => (
          <div key={p.courseId} className="col-span-4">
            <div className="text-right mb-4">
              <div className="flex items-center gap-3 mb-3 justify-end">
                <span className="font-semibold text-gray-900">{courseName(p.courseId)}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${COLORS[index % COLORS.length]} flex items-center justify-center`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{formatMinutes(p.practicedMinutes)} · {p.totalAnswers} שאלות</span>
                <span className="text-sm font-medium text-gray-900">{p.accuracy}%</span>
              </div>
              <Progress value={p.accuracy} className="h-2 bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700 text-right leading-relaxed">
          <strong>תובנת AI: </strong>
          הזמן הרב ביותר הושקע ב{courseName(mostPracticed.courseId)} ({formatMinutes(mostPracticed.practicedMinutes)}),
          {' '}והדיוק הגבוה ביותר נמדד ב{courseName(mostAccurate.courseId)} ({mostAccurate.accuracy}%).
          {practiced.length < 3 && ' המשך/י להוסיף קורסים ולתרגל כדי לקבל תמונה רחבה יותר.'}
        </p>
      </div>
    </Card>
  );
}
