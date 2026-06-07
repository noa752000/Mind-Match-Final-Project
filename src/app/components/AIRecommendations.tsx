import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Target, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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

interface Recommendation {
  title: string;
  reason: string;
  time: string;
  impact: 'גבוה' | 'בינוני';
  type: string;
  color: string;
  courseId: string;
}

interface CourseProgress {
  courseId: string;
  correctAnswers: number;
  totalAnswers: number;
  practicedMinutes: number;
  lastUpdated: { toDate?: () => Date } | null;
}

interface AIRecommendationsProps {
  onOpenPractice?: (courseId: string) => void;
}

function buildRecommendations(
  selectedCourses: string[],
  progressMap: Record<string, CourseProgress>
): Recommendation[] {
  const recs: Recommendation[] = [];
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

  // 1. Weakest course → more practice
  if (coursesWithProgress.length > 0) {
    const id = coursesWithProgress[0];
    const acc = Math.round((progressMap[id].correctAnswers / progressMap[id].totalAnswers) * 100);
    recs.push({
      title: `תרגול נוסף ב-${COURSE_NAMES[id] || id}`,
      reason: `דיוק של ${acc}% — יש מקום לשיפור`,
      time: '15 דקות',
      impact: 'גבוה',
      type: 'תרגול',
      color: 'from-red-500 to-orange-500',
      courseId: id,
    });
    used.add(id);
  }

  // 2. Course not practiced in 7+ days
  if (recs.length < 3) {
    const now = Date.now();
    const stale = coursesWithProgress.find(id => {
      if (used.has(id)) return false;
      const lu = progressMap[id]?.lastUpdated;
      if (!lu) return true;
      const date = lu.toDate ? lu.toDate() : new Date(lu as unknown as string);
      return now - date.getTime() > 7 * 24 * 60 * 60 * 1000;
    });
    if (stale) {
      recs.push({
        title: `חזרה על ${COURSE_NAMES[stale] || stale}`,
        reason: 'לא תרגלת קורס זה יותר משבוע',
        time: '20 דקות',
        impact: 'גבוה',
        type: 'חזרה',
        color: 'from-blue-500 to-cyan-500',
        courseId: stale,
      });
      used.add(stale);
    }
  }

  // 3. Best course → keep going
  if (recs.length < 3 && coursesWithProgress.length > 1) {
    const best = [...coursesWithProgress].reverse().find(id => !used.has(id));
    if (best) {
      const acc = Math.round((progressMap[best].correctAnswers / progressMap[best].totalAnswers) * 100);
      recs.push({
        title: `המשיכי להתקדם ב-${COURSE_NAMES[best] || best}`,
        reason: `דיוק של ${acc}% — את מצטיינת בקורס זה`,
        time: '15 דקות',
        impact: 'בינוני',
        type: 'תרגול',
        color: 'from-purple-500 to-pink-500',
        courseId: best,
      });
      used.add(best);
    }
  }

  // 4. Fill with unpracticed courses
  for (const id of unpracticed) {
    if (recs.length >= 3) break;
    if (used.has(id)) continue;
    recs.push({
      title: `התחילי להתרגל ב-${COURSE_NAMES[id] || id}`,
      reason: 'טרם תרגלת קורס זה — הגיע הזמן להתחיל',
      time: '10 דקות',
      impact: 'בינוני',
      type: 'התחלה',
      color: 'from-green-500 to-teal-500',
      courseId: id,
    });
    used.add(id);
  }

  return recs.slice(0, 3);
}

async function fetchAIInsight(
  selectedCourses: string[],
  progressMap: Record<string, CourseProgress>
): Promise<string> {
  const courseStats = selectedCourses.map(id => {
    const p = progressMap[id];
    const name = COURSE_NAMES[id] || id;
    if (!p || p.totalAnswers === 0) return `• ${name}: טרם תורגל`;
    const acc = Math.round((p.correctAnswers / p.totalAnswers) * 100);
    return `• ${name}: ${acc}% דיוק, ${p.totalAnswers} שאלות, ${p.practicedMinutes} דקות`;
  }).join('\n');

  const response = await fetch('/api/groq/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 120,
      messages: [
        {
          role: 'system',
          content: `אתה מנתח למידה של פלטפורמת MindMatch.
כתוב תובנה יומית קצרה בעברית (2-3 משפטים בלבד) המבוססת על הנתונים.
התובנה צריכה להיות אישית, מעודדת, וכוללת המלצה אחת ספציפית.
ללא אימוגים. ללא כותרת.`,
        },
        {
          role: 'user',
          content: `נתוני הלמידה:\n${courseStats}`,
        },
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export function AIRecommendations({ onOpenPractice }: AIRecommendationsProps) {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;
    loadData();
  }, [user?.userId]);

  const loadData = async () => {
    setLoadingRecs(true);
    setLoadingInsight(true);

    const userId = user!.userId;
    const selectedCourses = user?.selectedCourses || [];

    const progressSnap = await getDocs(
      query(collection(db, 'course_progress'), where('userId', '==', userId))
    );

    const progressMap: Record<string, CourseProgress> = {};
    progressSnap.docs.forEach(d => {
      const data = d.data() as CourseProgress;
      progressMap[data.courseId] = data;
    });

    const recs = buildRecommendations(selectedCourses, progressMap);
    setRecommendations(recs);
    setLoadingRecs(false);

    if (selectedCourses.length > 0) {
      try {
        const insight = await fetchAIInsight(selectedCourses, progressMap);
        setAiInsight(insight);
      } catch {
        setAiInsight('');
      }
    }
    setLoadingInsight(false);
  };

  if (loadingRecs) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">מומלץ עבורך</h2>
        <div className="grid grid-cols-12 gap-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="col-span-4">
              <Card className="p-6 h-44 animate-pulse bg-gray-100 border-gray-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">מומלץ עבורך</h2>
        <Card className="p-8 text-center border-gray-100">
          <p className="text-gray-500">הוסיפי קורסים לפרופיל כדי לקבל המלצות מותאמות אישית.</p>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center mb-6 justify-start">
        <h2 className="text-2xl font-bold text-gray-900">מומלץ עבורך</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="col-span-4">
            <Card className="p-6 hover:shadow-lg transition-all border-gray-100 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${rec.color} opacity-10 rounded-full -mr-16 -mt-16`} />
              <div className="relative">
                <Badge className="mb-4 bg-blue-100 text-blue-700">{rec.type}</Badge>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-4 text-right leading-relaxed">{rec.reason}</p>
                <div className="flex items-center gap-4 mb-4 justify-start">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium ${rec.impact === 'גבוה' ? 'text-green-600' : 'text-orange-600'}`}>
                      {rec.impact}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{rec.time}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full hover:bg-blue-50"
                  onClick={() => onOpenPractice?.(rec.courseId)}
                >
                  התחל
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card className="p-6 mt-6 bg-gradient-to-l from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-right">
          <h3 className="font-semibold text-gray-900 mb-2">תובנת AI היום</h3>
          {loadingInsight ? (
            <div className="flex items-center gap-2 justify-end">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-gray-400 text-sm">מנתח את הנתונים שלך...</span>
            </div>
          ) : aiInsight ? (
            <p className="text-gray-700 leading-relaxed">{aiInsight}</p>
          ) : (
            <p className="text-gray-500 text-sm">המשיכי להתרגל כדי לקבל תובנות מותאמות אישית.</p>
          )}
        </div>
      </Card>
    </section>
  );
}
