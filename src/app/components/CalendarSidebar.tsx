import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import { EventType } from '../contexts/CalendarSyncContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScheduleRecommendationModal, RecommendationToSchedule } from './ScheduleRecommendationModal';

const COURSE_NAMES: Record<string, string> = {
  calculus1: 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  oop: 'תכנות מונחה עצמים',
  html: 'HTML',
  sql: 'SQL',
  'requirements-design': 'אפיון ותכן',
  'information-security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

interface CourseProgress {
  courseId: string;
  correctAnswers: number;
  totalAnswers: number;
  lastPracticedAt: { toDate?: () => Date } | null;
}

interface CalendarRecommendation {
  title: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  schedulable: { defaultType: EventType; defaultCourseId?: string; durationHours: number };
}

function buildCalendarRecommendations(
  selectedCourses: string[],
  progressMap: Record<string, CourseProgress>
): CalendarRecommendation[] {
  const recs: CalendarRecommendation[] = [];
  const used = new Set<string>();

  const coursesWithProgress = selectedCourses
    .filter(id => progressMap[id] && progressMap[id].totalAnswers > 0)
    .sort((a, b) => {
      const accA = progressMap[a].correctAnswers / progressMap[a].totalAnswers;
      const accB = progressMap[b].correctAnswers / progressMap[b].totalAnswers;
      return accA - accB;
    });

  const unpracticed = selectedCourses.filter(
    id => !progressMap[id] || progressMap[id].totalAnswers === 0
  );

  // 1. Weakest course → focused tutorial
  if (coursesWithProgress.length > 0) {
    const id = coursesWithProgress[0];
    const acc = Math.round((progressMap[id].correctAnswers / progressMap[id].totalAnswers) * 100);
    recs.push({
      title: `תזמני תרגול ב-${COURSE_NAMES[id] || id}`,
      reason: `דיוק של ${acc}% — מומלץ לתרגל לפני הבחינה`,
      priority: 'high',
      time: '2 שעות',
      schedulable: { defaultType: 'tutorial', defaultCourseId: id, durationHours: 2 },
    });
    used.add(id);
  }

  // 2. Course not practiced in 7+ days → review lecture
  if (recs.length < 3) {
    const now = Date.now();
    const stale = coursesWithProgress.find(id => {
      if (used.has(id)) return false;
      const lu = progressMap[id]?.lastPracticedAt;
      if (!lu) return true;
      const date = lu.toDate ? lu.toDate() : new Date(lu as unknown as string);
      return now - date.getTime() > 7 * 24 * 60 * 60 * 1000;
    });
    if (stale) {
      recs.push({
        title: `הוסיפי שיעור חזרה ב-${COURSE_NAMES[stale] || stale}`,
        reason: 'לא תרגלת קורס זה יותר משבוע',
        priority: 'medium',
        time: 'שעתיים',
        schedulable: { defaultType: 'lecture', defaultCourseId: stale, durationHours: 2 },
      });
      used.add(stale);
    }
  }

  // 3. Unpracticed course → self-study slot
  for (const id of unpracticed) {
    if (recs.length >= 3) break;
    if (used.has(id)) continue;
    recs.push({
      title: `תרגול למידה עצמאית — ${COURSE_NAMES[id] || id}`,
      reason: 'טרם תרגלת קורס זה — מומלץ להכניס שעה',
      priority: 'low',
      time: 'שעה',
      schedulable: { defaultType: 'self-study', defaultCourseId: id, durationHours: 1 },
    });
    used.add(id);
  }

  // 4. Best course → keep the momentum
  if (recs.length < 3 && coursesWithProgress.length > 1) {
    const best = [...coursesWithProgress].reverse().find(id => !used.has(id));
    if (best) {
      const acc = Math.round((progressMap[best].correctAnswers / progressMap[best].totalAnswers) * 100);
      recs.push({
        title: `המשיכי להתקדם ב-${COURSE_NAMES[best] || best}`,
        reason: `דיוק של ${acc}% — תזמני תרגול נוסף לשמירה על הרצף`,
        priority: 'medium',
        time: 'שעה',
        schedulable: { defaultType: 'tutorial', defaultCourseId: best, durationHours: 1 },
      });
      used.add(best);
    }
  }

  return recs.slice(0, 3);
}

export function CalendarSidebar() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<CalendarRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<RecommendationToSchedule | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    const load = async () => {
      setLoading(true);
      const selectedCourses = user.selectedCourses || [];

      const progressSnap = await getDocs(
        query(collection(db, 'course_progress'), where('userId', '==', user.userId))
      );

      const progressMap: Record<string, CourseProgress> = {};
      progressSnap.docs.forEach(d => {
        const data = d.data() as CourseProgress;
        progressMap[data.courseId] = data;
      });

      setRecommendations(buildCalendarRecommendations(selectedCourses, progressMap));
      setLoading(false);
    };

    load();
  }, [user?.userId]);

  return (
    <>
      <div className="fixed left-0 top-20 w-64 bg-white border-l border-gray-200 p-5 overflow-y-auto h-[calc(100vh-5rem)]">
        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-3 justify-start">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-gray-900 text-sm">המלצות AI</h3>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recommendations.length === 0 ? (
            <p className="text-xs text-gray-400 leading-relaxed">
              הוסיפי קורסים לפרופיל כדי לקבל המלצות מותאמות אישית.
            </p>
          ) : (
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-3 hover:shadow-md transition-shadow border-gray-200">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="flex-1 text-right">
                      <h4 className="font-semibold text-gray-900 text-xs mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{rec.reason}</p>
                    </div>
                    <Badge className={`text-xs flex-shrink-0 ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.time}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-1 text-xs h-7 border-teal-200 text-teal-700 hover:bg-teal-50"
                    onClick={() => setActiveModal({ title: rec.title, ...rec.schedulable })}
                  >
                    + הוסף ליומן
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeModal && (
        <ScheduleRecommendationModal
          key={activeModal.title}
          recommendation={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
