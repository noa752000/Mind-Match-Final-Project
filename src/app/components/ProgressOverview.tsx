import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { CheckCircle, Clock, BookOpen, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface UserStats {
  averageGrade: number;
  completedQuestions: number;
  activeCourses: number;
  studyHours: number;
}

export function ProgressOverview() {
  const [stats, setStats] = useState<UserStats>({
    averageGrade: 0,
    completedQuestions: 0,
    activeCourses: 0,
    studyHours: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      if (!user) {
        setStats({
          averageGrade: 0,
          completedQuestions: 0,
          activeCourses: 0,
          studyHours: 0,
        });
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);

      unsubscribeUser = onSnapshot(userRef, (userDoc) => {
        if (!userDoc.exists()) {
          setStats({
            averageGrade: 0,
            completedQuestions: 0,
            activeCourses: 0,
            studyHours: 0,
          });
          setLoading(false);
          return;
        }

        const data = userDoc.data();

        setStats({
          averageGrade: Number(data.averageGrade || 0),
          completedQuestions: Number(data.completedQuestions || 0),
          activeCourses: Array.isArray(data.selectedCourses)
            ? data.selectedCourses.length
            : 0,
          studyHours: Number(((data.totalStudyMinutes || 0) / 60).toFixed(1)),
        });

        setLoading(false);
      });
    });

    return () => {
      if (unsubscribeUser) {
        unsubscribeUser();
      }

      unsubscribeAuth();
    };
  }, []);

  const hasData = stats.completedQuestions > 0;

  const weeklyGoal = stats.activeCourses * 2;
  const weeklyProgress =
    weeklyGoal > 0 ? (stats.studyHours / weeklyGoal) * 100 : 0;

  const remainingWeeklyHours =
    weeklyGoal > stats.studyHours ? weeklyGoal - stats.studyHours : 0;

  const statsConfig = [
    {
      icon: Award,
      label: 'ממוצע כללי',
      value: hasData ? stats.averageGrade.toString() : '—',
      subtext: hasData ? 'ציון ממוצע' : 'אין נתונים עדיין',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: CheckCircle,
      label: 'שאלות שנפתרו',
      value: hasData ? stats.completedQuestions.toString() : '—',
      subtext: hasData ? 'סה״כ שאלות' : 'אין נתונים עדיין',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: BookOpen,
      label: 'קורסים פעילים',
      value: stats.activeCourses.toString(),
      subtext: 'קורסים נבחרים',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      label: 'שעות למידה',
      value: hasData ? stats.studyHours.toFixed(1) : '—',
      subtext: hasData ? 'שעות מצטברות' : 'אין נתונים עדיין',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  if (loading) {
    return (
      <section className="mb-8">
        <div className="grid grid-cols-12 auto-rows-[140px] gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-span-3">
              <Card className="p-6 h-full animate-pulse">
                <div className="flex items-start gap-3 h-full">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8" dir="rtl">
      <div className="grid grid-cols-12 auto-rows-[140px] gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="col-span-3">
              <Card className="p-6 hover:shadow-lg transition-all border-gray-100 h-full overflow-hidden">
                <div className="flex items-start gap-3 h-full">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="text-right flex-1 min-w-0">
                    <p className="text-sm text-gray-600 leading-tight truncate">
                      {stat.label}
                    </p>

                    <p className="text-2xl font-bold text-gray-900 leading-tight mt-2 mb-1">
                      {stat.value}
                    </p>

                    <p className="text-xs text-gray-500 leading-tight truncate">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <Card className="p-6 mt-6 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">יעד לימוד שבועי</h3>

          <div className="text-sm text-gray-600">
            {stats.studyHours.toFixed(1)} / {weeklyGoal} שעות
          </div>
        </div>

        <Progress value={weeklyProgress} className="h-3 bg-gray-100" />

        <p className="text-xs text-gray-500 mt-2 text-right">
          נשארו {remainingWeeklyHours.toFixed(1)} שעות להשגת היעד השבועי
        </p>
      </Card>
    </section>
  );
}