import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';

import { LearningStyleInsights } from '../components/LearningStyleInsights';
import { StrengthsWeaknesses } from '../components/StrengthsWeaknesses';
import { CoursePracticeBreakdown } from '../components/CoursePracticeBreakdown';
import { PerformanceAnalytics } from '../components/PerformanceAnalytics';
import { WeeklySummaryCard } from '../components/WeeklySummaryCard';
import { Card } from '../components/ui/card';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import type { CourseProgressData, PracticeResultData } from '../lib/analyticsTypes';

interface UserStats {
  averageGrade: number;
  completedQuestions: number;
  activeCourses: number;
  studyHours: number;
  preferredLearningType: 'knowledge' | 'analysis' | 'visual' | null;
  studentLevel: 'beginner' | 'intermediate' | 'advanced';
  weeklyStudyMinutes: number;
  totalStudyMinutes: number;
}

const QUESTION_DATA_COURSE_ID: Record<string, string> = {
  'html': 'html_fundamentals',
  'linear-algebra': 'linear_algebra',
  'mis-economics': 'information_systems_economics',
};

const FALLBACK_TOTAL_QUESTIONS: Record<string, number> = {
  'calculus1': 36, 'linear-algebra': 36, 'oop': 36, 'html': 36,
  'sql': 24, 'systems_analysis': 36, 'cyber_security': 36, 'mis-economics': 36,
};

const DEFAULT_STATS: UserStats = {
  averageGrade: 0,
  completedQuestions: 0,
  activeCourses: 0,
  studyHours: 0,
  preferredLearningType: null,
  studentLevel: 'beginner',
  weeklyStudyMinutes: 0,
  totalStudyMinutes: 0,
};

export function AnalysisPage() {
  const { user: authUser } = useAuth();
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [courseProgress, setCourseProgress] = useState<CourseProgressData[]>([]);
  const [practiceResults, setPracticeResults] = useState<PracticeResultData[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Live stats from user doc (uses Firebase UID as doc key)
  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubscribeUser) unsubscribeUser();

      if (!firebaseUser) {
        setStats(DEFAULT_STATS);
        return;
      }

      const userRef = doc(db, 'users', firebaseUser.uid);
      unsubscribeUser = onSnapshot(userRef, (userDoc) => {
        if (!userDoc.exists()) { setStats(DEFAULT_STATS); return; }
        const data = userDoc.data();
        setStats({
          averageGrade: Number(data.averageGrade || 0),
          completedQuestions: Number(data.completedQuestions || 0),
          activeCourses: Array.isArray(data.selectedCourses) ? data.selectedCourses.length : 0,
          studyHours: Number(((data.totalStudyMinutes || 0) / 60).toFixed(1)),
          preferredLearningType: data.preferredLearningType ?? null,
          studentLevel: data.studentLevel || 'beginner',
          weeklyStudyMinutes: Number(data.weeklyStudyMinutes || 0),
          totalStudyMinutes: Number(data.totalStudyMinutes || 0),
        });
      });
    });

    return () => {
      if (unsubscribeUser) unsubscribeUser();
      unsubscribeAuth();
    };
  }, []);

  // Analytics data — uses the same userId as PracticePage and CoursesList
  useEffect(() => {
    const appUserId = authUser?.userId;
    if (!appUserId) {
      setCourseProgress([]);
      setPracticeResults([]);
      setLoadingAnalytics(false);
      return;
    }
    loadAnalytics(appUserId);
  }, [authUser?.userId]);

  const loadAnalytics = async (userId: string) => {
    setLoadingAnalytics(true);
    try {
      const [progressSnap, resultsSnap] = await Promise.all([
        getDocs(query(collection(db, 'course_progress'), where('userId', '==', userId))),
        getDocs(query(collection(db, 'practice_results'), where('userId', '==', userId))),
      ]);

      const rawProgress = progressSnap.docs.map(d => d.data() as CourseProgressData);
      console.log('[AnalysisPage] userId:', userId);
      console.log('[AnalysisPage] rawProgress:', rawProgress.map(p => ({ courseId: p.courseId, correctAnswers: p.correctAnswers, totalAnswers: p.totalAnswers, accuracy: p.accuracy })));

      // Fetch total question count per course from Firestore so that
      // accuracy = correctAnswers / totalQuestionsInCourse (not just attempted).
      const courseIds = [...new Set(rawProgress.map(p => p.courseId))];
      const totalQuestionsMap: Record<string, number> = {};
      await Promise.all(courseIds.map(async courseId => {
        const questionDataCourseId = QUESTION_DATA_COURSE_ID[courseId] || courseId;
        try {
          const snap = await getDocs(
            query(collection(db, 'questions'), where('courseId', '==', questionDataCourseId))
          );
          const count = snap.size;
          console.log(`[AnalysisPage] courseId=${courseId} questionDataCourseId=${questionDataCourseId} firestoreCount=${count}`);
          totalQuestionsMap[courseId] = count > 0 ? count : (FALLBACK_TOTAL_QUESTIONS[courseId] ?? 36);
        } catch (e) {
          console.warn(`[AnalysisPage] getDocs failed for ${courseId}:`, e);
          totalQuestionsMap[courseId] = FALLBACK_TOTAL_QUESTIONS[courseId] ?? 36;
        }
      }));

      console.log('[AnalysisPage] totalQuestionsMap:', totalQuestionsMap);

      const correctedProgress = rawProgress.map(p => {
        const total = totalQuestionsMap[p.courseId] ?? p.totalQuestionsInCourse ?? p.totalAnswers;
        const accuracy = total > 0 ? Math.round((p.correctAnswers / total) * 100) : 0;
        console.log(`[AnalysisPage] ${p.courseId}: correctAnswers=${p.correctAnswers} total=${total} accuracy=${accuracy}`);
        return { ...p, accuracy };
      });

      setCourseProgress(correctedProgress);
      setPracticeResults(resultsSnap.docs.map(d => d.data() as PracticeResultData));
    } catch (error) {
      console.error('Error loading analytics data:', error);
      setCourseProgress([]);
      setPracticeResults([]);
    } finally {
      setLoadingAnalytics(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
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

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <LearningStyleInsights
                courseProgress={courseProgress}
                preferredLearningType={stats.preferredLearningType}
                studentLevel={stats.studentLevel}
                weeklyStudyMinutes={stats.weeklyStudyMinutes}
                totalStudyMinutes={stats.totalStudyMinutes}
                loading={loadingAnalytics}
              />
            </div>

            <div className="col-span-7">
              <CoursePracticeBreakdown courseProgress={courseProgress} loading={loadingAnalytics} />
            </div>
          </div>

          <StrengthsWeaknesses
            courseProgress={courseProgress}
            loading={loadingAnalytics}
          />

          <PerformanceAnalytics
            courseProgress={courseProgress}
            practiceResults={practiceResults}
            loading={loadingAnalytics}
          />
        </div>
      </main>
    </div>
  );
}
