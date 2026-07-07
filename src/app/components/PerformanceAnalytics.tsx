import { Card } from './ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { courseName, timestampToDate, CourseProgressData, PracticeResultData } from '../lib/analyticsTypes';

interface PerformanceAnalyticsProps {
  courseProgress: CourseProgressData[];
  practiceResults: PracticeResultData[];
  loading?: boolean;
}

function buildWeeklyTrend(results: PracticeResultData[]) {
  const weeks: { week: string; grade: number | null; hours: number }[] = [];

  const dates = results
    .map(r => timestampToDate(r.answeredAt))
    .filter((d): d is Date => d !== null);

  if (dates.length === 0) return weeks;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

  const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
  earliest.setHours(0, 0, 0, 0);
  const weekStart = new Date(earliest);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  for (; weekStart <= currentWeekStart; weekStart.setDate(weekStart.getDate() + 7)) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const inWeek = results.filter(r => {
      const d = timestampToDate(r.answeredAt);
      return d !== null && d >= weekStart && d < weekEnd;
    });

    const total = inWeek.length;
    const correct = inWeek.filter(r => r.isCorrect).length;
    const seconds = inWeek.reduce((s, r) => s + (r.timeSpentSeconds || 0), 0);

    weeks.push({
      week: `${weekStart.getDate()}/${weekStart.getMonth() + 1}`,
      grade: total > 0 ? Math.round((correct / total) * 100) : null,
      hours: Math.round((seconds / 3600) * 10) / 10,
    });
  }

  return weeks;
}

export function PerformanceAnalytics({ courseProgress, practiceResults, loading }: PerformanceAnalyticsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-8 border-gray-100 h-96 animate-pulse bg-gray-50" />
        <Card className="p-8 border-gray-100 h-96 animate-pulse bg-gray-50" />
      </div>
    );
  }

  const weeklyTrend = buildWeeklyTrend(practiceResults);
  const hasTrendData = practiceResults.length > 0;

  const subjectScores = courseProgress
    .filter(p => p.totalAnswers > 0)
    .map(p => ({ id: p.courseId, name: courseName(p.courseId), score: p.accuracy }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      {/* Performance Trend */}
      <Card className="p-8 border-gray-100">
        <div className="flex items-center gap-3 mb-6 justify-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">מגמת ביצועים</h3>
        </div>

        {hasTrendData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  direction: 'rtl'
                }}
              />
              <Legend wrapperStyle={{ direction: 'rtl' }} />
              <Line
                type="monotone"
                dataKey="grade"
                stroke="#3b82f6"
                strokeWidth={3}
                name="דיוק שבועי (%)"
                dot={{ fill: '#3b82f6', r: 5 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="שעות תרגול"
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="py-16 text-center text-gray-500">
            עדיין אין מספיק נתוני תרגול להצגת מגמה. התחל/י לתרגל כדי לראות את ההתקדמות שלך כאן.
          </div>
        )}
      </Card>

      <Card className="p-8 border-gray-100">
        <div className="flex items-center gap-3 mb-6 justify-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">ציונים לפי נושא</h3>
        </div>

        {subjectScores.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectScores} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  direction: 'rtl',
                }}
              />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} name="ציון" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="py-16 text-center text-gray-500">
            עדיין לא נצברו נתוני דיוק עבור הקורסים שלך. תרגל/י שאלות כדי לראות פירוט לפי נושא.
          </div>
        )}
      </Card>
    </div>
  );
}
