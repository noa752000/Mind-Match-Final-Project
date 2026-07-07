import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CourseProgressData, formatMinutes } from '../lib/analyticsTypes';

interface LearningStyleInsightsProps {
  courseProgress: CourseProgressData[];
  preferredLearningType: 'knowledge' | 'analysis' | 'visual' | null;
  studentLevel: 'beginner' | 'intermediate' | 'advanced';
  weeklyStudyMinutes: number;
  totalStudyMinutes: number;
  loading?: boolean;
}

const TYPE_LABELS: Record<'knowledge' | 'analysis' | 'visual', { full: string; short: string; color: string }> = {
  visual: { full: 'שאלות חזותיות', short: 'חזותי', color: 'from-blue-500 to-blue-600' },
  analysis: { full: 'שאלות ניתוח ויישום', short: 'ניתוח ויישום', color: 'from-purple-500 to-purple-600' },
  knowledge: { full: 'שאלות ידע ועיון', short: 'ידע ועיון', color: 'from-orange-500 to-orange-600' },
};

const LEVEL_LABELS: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'מתחיל/ה',
  intermediate: 'בינוני/ת',
  advanced: 'מתקדם/ת',
};

const TYPE_ORDER: Array<'visual' | 'analysis' | 'knowledge'> = ['visual', 'analysis', 'knowledge'];

export function LearningStyleInsights({
  courseProgress,
  preferredLearningType,
  studentLevel,
  weeklyStudyMinutes,
  totalStudyMinutes,
  loading,
}: LearningStyleInsightsProps) {
  if (loading) {
    return <Card className="p-5 border-gray-100 h-96 animate-pulse bg-gray-50" />;
  }

  const totals = courseProgress.reduce(
    (acc, p) => ({
      knowledgeTotal: acc.knowledgeTotal + (p.knowledgeTotal || 0),
      knowledgeCorrect: acc.knowledgeCorrect + (p.knowledgeCorrect || 0),
      analysisTotal: acc.analysisTotal + (p.analysisTotal || 0),
      analysisCorrect: acc.analysisCorrect + (p.analysisCorrect || 0),
      visualTotal: acc.visualTotal + (p.visualTotal || 0),
      visualCorrect: acc.visualCorrect + (p.visualCorrect || 0),
    }),
    { knowledgeTotal: 0, knowledgeCorrect: 0, analysisTotal: 0, analysisCorrect: 0, visualTotal: 0, visualCorrect: 0 }
  );

  const byType: Record<'knowledge' | 'analysis' | 'visual', { total: number; correct: number }> = {
    knowledge: { total: totals.knowledgeTotal, correct: totals.knowledgeCorrect },
    analysis: { total: totals.analysisTotal, correct: totals.analysisCorrect },
    visual: { total: totals.visualTotal, correct: totals.visualCorrect },
  };

  const hasAnyData = totals.knowledgeTotal + totals.analysisTotal + totals.visualTotal > 0;

  const learningStyles = TYPE_ORDER.map((key) => {
    const { total, correct } = byType[key];
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return {
      key,
      label: TYPE_LABELS[key].full,
      percentage,
      total,
      description: total > 0
        ? `${correct}/${total} תשובות נכונות (${percentage}% דיוק)`
        : 'עדיין אין נתוני תרגול עבור סוג שאלות זה',
      color: TYPE_LABELS[key].color,
    };
  });

  const aiText = preferredLearningType
    ? `המערכת זיהתה שאת/ה מצליח/ה במיוחד ב${TYPE_LABELS[preferredLearningType].full}. מומלץ להמשיך להתמקד בסוג השאלות הזה, ולשלב תרגול בסוגים האחרים לשיפור מאוזן.`
    : 'עדיין אין מספיק נתונים לזיהוי סגנון הלמידה שלך. המשך/י לתרגל כדי לקבל ניתוח AI מותאם אישית.';

  const traits = [
    { label: 'רמת לומד/ת', value: LEVEL_LABELS[studentLevel] },
    { label: 'סגנון מועדף', value: preferredLearningType ? TYPE_LABELS[preferredLearningType].short : 'לא זוהה עדיין' },
    { label: 'תרגול השבוע', value: formatMinutes(weeklyStudyMinutes) },
    { label: 'תרגול כולל', value: formatMinutes(totalStudyMinutes) },
  ];

  return (
    <Card className="p-5 border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 text-right">תובנות סגנון למידה</h2>
      </div>

      <div className="mb-3 p-3 bg-gradient-to-l from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-right">
            <h3 className="font-semibold text-gray-900 mb-1">
              ניתוח AI
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {aiText}
            </p>
          </div>
        </div>
      </div>

      {/* Learning Styles Breakdown */}
      {hasAnyData ? (
        <div className="space-y-3 mb-6">
          {learningStyles.map((style) => (
            <div key={style.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{style.percentage}%</span>
                <span className="font-semibold text-gray-900 text-right">{style.label}</span>
              </div>
              <Progress value={style.percentage} className="h-2 bg-gray-100" />
              <p className="text-sm text-gray-600 text-right">{style.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl text-center text-sm text-gray-500">
          התחל/י לתרגל כדי לראות פילוח לפי סוגי שאלות.
        </div>
      )}

      {/* Learning Traits */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
        {traits.map((trait, index) => (
          <div key={index} className="text-right">
            <div className="text-sm text-gray-600 mb-1">{trait.label}</div>
            <Badge className="bg-gray-100 text-gray-900">{trait.value}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
