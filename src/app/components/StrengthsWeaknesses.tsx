import { TrendingUp, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { courseName, CourseProgressData } from '../lib/analyticsTypes';

interface StrengthsWeaknessesProps {
  courseProgress: CourseProgressData[];
  loading?: boolean;
}

interface InsightItem {
  courseId: string;
  subject: string;
  note: string;
  recommendation: string;
}

const LEARNING_TYPE_LABELS: Record<string, string> = {
  knowledge: 'שאלות ידע',
  analysis: 'שאלות ניתוח',
  visual: 'שאלות חזותיות',
};

function learningTypeBreakdown(p: CourseProgressData) {
  return [
    { key: 'knowledge', total: p.knowledgeTotal, correct: p.knowledgeCorrect },
    { key: 'analysis', total: p.analysisTotal, correct: p.analysisCorrect },
    { key: 'visual', total: p.visualTotal, correct: p.visualCorrect },
  ]
    .filter(t => t.total > 0)
    .map(t => ({ ...t, acc: Math.round((t.correct / t.total) * 100) }));
}

function strengthNote(p: CourseProgressData): string {
  const types = learningTypeBreakdown(p).sort((a, b) => b.acc - a.acc);
  if (types.length === 0) return `${p.correctAnswers}/${p.totalAnswers} תשובות נכונות`;
  const top = types[0];
  return `${top.acc}% דיוק ב${LEARNING_TYPE_LABELS[top.key]}, מתוך ${p.totalAnswers} שאלות שנענו`;
}

function weaknessNote(p: CourseProgressData): string {
  const types = learningTypeBreakdown(p).sort((a, b) => a.acc - b.acc);
  if (types.length === 0) return `${p.correctAnswers}/${p.totalAnswers} תשובות נכונות בלבד`;
  const weakest = types[0];
  return `${weakest.acc}% דיוק ב${LEARNING_TYPE_LABELS[weakest.key]} — דורש תשומת לב`;
}

function strengthRecommendation(score: number): string {
  return score >= 90 ? 'מצוין! המשיכי לשמור על הרמה' : 'המשך ברמה הזו';
}

function weaknessRecommendation(score: number): string {
  return score < 50 ? 'מומלץ לחזור על החומר הבסיסי' : 'תרגול נוסף מומלץ';
}

function buildItem(p: CourseProgressData, isStrength: boolean): InsightItem {
  return {
    courseId: p.courseId,
    subject: courseName(p.courseId),
    note: isStrength ? strengthNote(p) : weaknessNote(p),
    recommendation: isStrength ? strengthRecommendation(p.accuracy) : weaknessRecommendation(p.accuracy),
  };
}

export function StrengthsWeaknesses({ courseProgress, loading }: StrengthsWeaknessesProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6"><Card className="p-6 h-80 animate-pulse bg-gray-50 border-gray-100" /></div>
        <div className="col-span-6"><Card className="p-6 h-80 animate-pulse bg-gray-50 border-gray-100" /></div>
      </div>
    );
  }

  const practiced = [...courseProgress]
    .filter(p => p.totalAnswers > 0)
    .sort((a, b) => b.accuracy - a.accuracy);

  if (practiced.length === 0) {
    return (
      <Card className="p-8 border-gray-100 text-center">
        <p className="text-gray-500">
          עדיין אין מספיק נתוני תרגול לזיהוי נקודות חוזק וחולשה. התחילי לתרגל כדי לקבל ניתוח מותאם אישית.
        </p>
      </Card>
    );
  }

  let strengthCourses: CourseProgressData[] = [];
  let weaknessCourses: CourseProgressData[] = [];

  if (practiced.length === 1) {
    if (practiced[0].accuracy >= 70) strengthCourses = practiced;
    else weaknessCourses = practiced;
  } else {
    const half = Math.ceil(practiced.length / 2);
    strengthCourses = practiced.slice(0, half).slice(0, 3);
    weaknessCourses = practiced.slice(half).slice(-3);
  }

  const strengthItems = strengthCourses.map(p => buildItem(p, true));
  const weaknessItems = weaknessCourses.map(p => buildItem(p, false));

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 gap-6 w-full max-w-[1200px]">
        {/* Strengths */}
        <div className="col-span-6">
          <Card className="p-6 border-gray-100 h-full w-full">
            <div className="flex items-center gap-3 mb-6 justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">נקודות חוזק</h3>
            </div>

            {strengthItems.length > 0 ? (
              <div className="space-y-4">
                {strengthItems.map((item) => (
                  <div key={item.courseId} className="p-4 bg-green-50 rounded-xl border border-green-200 h-[120px] flex flex-col justify-between">
                    <h4 className="font-semibold text-gray-900 text-right">{item.subject}</h4>
                    <p className="text-sm text-gray-700 text-right">{item.note}</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      💡 {item.recommendation}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">המשיכי לתרגל כדי לזהות נקודות חוזק.</p>
            )}
          </Card>
        </div>

        {/* Weaknesses */}
        <div className="col-span-6">
          <Card className="p-6 border-gray-100 h-full w-full">
            <div className="flex items-center gap-3 mb-6 justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">נקודות לשיפור</h3>
            </div>

            {weaknessItems.length > 0 ? (
              <div className="space-y-4">
                {weaknessItems.map((item) => (
                  <div key={item.courseId} className="p-4 bg-orange-50 rounded-xl border border-orange-200 h-[120px] flex flex-col justify-between">
                    <h4 className="font-semibold text-gray-900 text-right">{item.subject}</h4>
                    <p className="text-sm text-gray-700 text-right">{item.note}</p>
                    <Badge className="bg-orange-100 text-orange-700 text-xs">
                      💡 {item.recommendation}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">כל הכבוד! לא זוהו נקודות חולשה משמעותיות כרגע.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
