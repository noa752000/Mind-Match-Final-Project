import { TrendingUp, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const strengths = [
  {
    subject: 'מסדי נתונים',
    score: 92,
    trend: '+8%',
    note: 'ביצועים מצוינים ב-SQL ו-Normalization',
    recommendation: 'המשך ברמה הזו',
  },
  {
    subject: 'מבני נתונים',
    score: 88,
    trend: '+5%',
    note: ' excelente של מבני נתונים',
    recommendation: 'המשך ברמה הזו',
  },
  {
    subject: 'HTML',
    score: 85,
    trend: '+12%',
    note: 'שיפור משמעותי ב-React',
    recommendation: 'המשך ברמה הזו',
  },
];

const weaknesses = [
  {
    subject: 'אפיון ותכן',
    score: 68,
    trend: '-3%',
    note: 'צריך חיזוק ב-UML Diagrams',
    recommendation: 'תרגול נוסף מומלץ',
  },
  {
    subject: 'אבטחת מידע',
    score: 71,
    trend: '+2%',
    note: 'התקדמות איטית, דורש תשומת לב',
    recommendation: 'שיעור עם מורה AI',
  },
  {
    subject: 'רשתות תקשורת',
    score: 73,
    trend: '+1%',
    note: 'צריך תשומת לב לפרוטוקולי רשת',
    recommendation: 'לימוד מעמיק מומלץ',
  },
];

export function StrengthsWeaknesses() {
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

          <div className="space-y-4">
            {strengths.map((item, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-xl border border-green-200 h-[120px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-gray-900">{item.subject}</h4>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge className="bg-green-600 text-white">{item.score}</Badge>
                    <div className="text-sm text-green-600 font-medium mt-1">{item.trend}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-right">{item.note}</p>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  💡 {item.recommendation}
                </Badge>
              </div>
            ))}
          </div>
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

          <div className="space-y-4">
            {weaknesses.map((item, index) => (
              <div key={index} className="p-4 bg-orange-50 rounded-xl border border-orange-200 h-[120px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-gray-900">{item.subject}</h4>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge className="bg-orange-600 text-white">{item.score}</Badge>
                    <div className="text-sm text-orange-600 font-medium mt-1">{item.trend}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-right">{item.note}</p>
                <Badge className="bg-orange-100 text-orange-700 text-xs">
                  💡 {item.recommendation}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
}