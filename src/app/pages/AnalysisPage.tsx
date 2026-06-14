import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../firebase';

import { LearningStyleInsights } from '../components/LearningStyleInsights';
import { StrengthsWeaknesses } from '../components/StrengthsWeaknesses';
import { PreferredStudyMethods } from '../components/PreferredStudyMethods';
import { PerformanceAnalytics } from '../components/PerformanceAnalytics';
import { AIPersonalizationSummary } from '../components/AIPersonalizationSummary';
import { WeeklySummaryCard } from '../components/WeeklySummaryCard';
import { Card } from '../components/ui/card';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

interface UserStats {
  averageGrade: number;
  completedQuestions: number;
  activeCourses: number;
  studyHours: number;
}

export function AnalysisPage() {
  const [stats, setStats] = useState<UserStats>({
    averageGrade: 0,
    completedQuestions: 0,
    activeCourses: 0,
    studyHours: 0,
  });

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeUser) {
        unsubscribeUser();
      }

      if (!user) {
        setStats({
          averageGrade: 0,
          completedQuestions: 0,
          activeCourses: 0,
          studyHours: 0,
        });
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
          return;
        }

        const data = userDoc.data();

        setStats({
          averageGrade: Number(data.averageGrade || 0),
          completedQuestions: Number(data.completedQuestions || 0),
          activeCourses: Array.isArray(data.selectedCourses) ? data.selectedCourses.length : 0,
          studyHours: Number(((data.totalStudyMinutes || 0) / 60).toFixed(1)),
        });
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

  const quickStats = [
    {
      icon: Award,
      label: 'ממוצע כללי',
      value: hasData ? stats.averageGrade : 'אין מספיק נתונים',
      subtext: 'ציון ממוצע',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Target,
      label: 'שאלות שנפתרו',
      value: hasData ? stats.completedQuestions : 'אין מספיק נתונים',
      subtext: 'סה״כ שאלות',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: TrendingUp,
      label: 'קורסים פעילים',
      value: stats.activeCourses,
      subtext: 'קורסים נבחרים',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Clock,
      label: 'שעות למידה',
      value: hasData ? stats.studyHours : 'אין מספיק נתונים',
      subtext: 'שעות מצטברות',
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1176px] mx-auto space-y-8">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">
              ניתוח ותובנות
            </h1>
            <p className="text-gray-600 mt-1">
              מעקב אחר הביצועים, ההתקדמות והמלצות AI מותאמות אישית
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div key={index} className="col-span-3" dir="rtl">
                  <Card className="p-6 hover:shadow-lg transition-all border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-right flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>

                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                          {stat.subtext}
                        </p>
                      </div>

                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          <WeeklySummaryCard />

          <AIPersonalizationSummary />

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <LearningStyleInsights />
            </div>

            <div className="col-span-7">
              <PreferredStudyMethods />
            </div>
          </div>

          <StrengthsWeaknesses />

          <PerformanceAnalytics />
        </div>
      </main>
    </div>
  );
}