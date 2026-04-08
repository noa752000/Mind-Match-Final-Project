import { Brain, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const learningStyles = [
  {
    type: 'Visual Learner',
    typeHe: 'לומד ויזואלי',
    percentage: 85,
    description: 'את מעדיפה תרשימים, גרפים ומצגות',
    color: 'from-blue-500 to-blue-600',
  },
  {
    type: 'Reading/Writing',
    typeHe: 'קריאה וכתיבה',
    percentage: 70,
    description: 'לימוד דרך טקסט וסיכומים',
    color: 'from-orange-500 to-orange-600',
  },
  {
    type: 'Kinesthetic',
    typeHe: 'למידה מעשית',
    percentage: 65,
    description: 'למידה דרך פרקטיקה ותרגול',
    color: 'from-purple-500 to-purple-600',
  },
];

const traits = [
  { label: 'למידה מהירה', value: 'גבוהה' },
  { label: 'זמן לימוד מועדף', value: '10:00-14:00' },
  { label: 'משך התמקדות', value: '45-60 דקות' },
  { label: 'סגנון תרגול', value: 'תרגול חוזר' },
];

export function LearningStyleInsights() {
  return (
    <Card className="p-5 border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 text-right">תובנות סגנון למידה</h2>
      </div>

      <div className="mb-3 p-3 bg-gradient-to-l from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-gray-900 mb-1">
              ניתוח AI
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              המערכת זיהתה שאת לומדת ויזואלית בעיקר. מומלץ להשתמש במפות חשיבה, 
              תרשימי זרימה ואינפוגרפיקות.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Styles Breakdown */}
      <div className="space-y-3 mb-6">
        {learningStyles.map((style, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="font-semibold text-gray-900">{style.typeHe}</span>
                {' '}
                <span className="text-sm text-gray-600">({style.type})</span>
              </div>
              <span className="text-sm text-gray-600">{style.percentage}%</span>
            </div>
            <Progress value={style.percentage} className="h-2 bg-gray-100" />
            <p className="text-sm text-gray-600 text-right">{style.description}</p>
          </div>
        ))}
      </div>

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