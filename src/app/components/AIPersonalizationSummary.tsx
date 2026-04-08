import { Sparkles, Brain, Target, TrendingUp, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const insights = [
  {
    icon: Brain,
    title: 'דפוס למידה',
    content: 'את מצליחה ביותר בשעות הבוקר (10:00-14:00) עם הפסקות של 15 דקות כל 45 דקות.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Target,
    title: 'יעדי שיפור',
    content: 'המלצה להתמקד ב-UML Diagrams ובאבטחת מידע. AI יצר תוכנית אימון מותאמת.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: TrendingUp,
    title: 'התקדמות',
    content: 'שיפור של 14% בממוצע בחודשיים האחרונים. קצב למידה מעולה!',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Clock,
    title: 'תזמון מומלץ',
    content: 'לוח הזמינו האופטימלי שלך: 3 שעות בוקר + 1.5 שעות אחה"צ, 5 ימים בשבוע.',
    color: 'from-blue-500 to-cyan-600',
  },
];

export function AIPersonalizationSummary() {
  return (
    <Card className="p-8 border-gray-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 text-right" dir="rtl">סיכום התאמה אישית AI</h2>
      </div>

      <div className="mb-8 p-6 bg-white rounded-xl border border-blue-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-right text-lg">ניתוח מקיף</h3>
        <p className="text-gray-700 leading-relaxed text-right mb-4">
          המערכת ניתחה <strong>156 ימי למידה</strong> ו-<strong>347 פעילויות</strong> כדי ליצור 
          פרופיל למידה מותאם אישית. הנתונים מראים שאת לומדת ויזואלית בעיקר, מצליחה במיוחד 
          בתרגול מעשי, ומעדיפה חומרים מוצגים בצורה מובנית וברורה.
        </p>
        <Badge className="bg-green-600 text-white">
          רמת דיוק: 94%
        </Badge>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="col-span-6">
              <Card className="p-6 border-gray-100 bg-white h-full hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-1 text-right">
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{insight.content}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-6 bg-white rounded-xl border border-purple-200">
        <h4 className="font-bold text-gray-900 mb-3 text-right">המלצות לשבוע הבא</h4>
        <ul className="space-y-2 text-left" dir="rtl">
          <li className="flex items-start gap-2 justify-start text-sm text-gray-700" dir="rtl">
            <span className="text-blue-600">•</span>
            <span>התמקדי ב-UML Diagrams - 4 שעות תרגול מומלצות</span>
          </li>
          <li className="flex items-start gap-2 justify-start text-sm text-gray-700" dir="rtl">
            <span className="text-blue-600">•</span>
            <span>הצטרפי לקבוצת לימוד באבטחת מידע ביום רביעי</span>
          </li>
          <li className="flex items-start gap-2 justify-start text-sm text-gray-700" dir="rtl">
            <span className="text-blue-600">•</span>
            <span>המשיכי את הקצב במסדי נתונים - הביצועים מצוינים</span>
          </li>
          <li className="flex items-start gap-2 justify-start text-sm text-gray-700" dir="rtl">
            <span className="text-blue-600">•</span>
            <span>סיכום חכם זמין לבחינת אלגוריתמים בשבוע הבא</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}