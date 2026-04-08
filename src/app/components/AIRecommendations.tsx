import { Sparkles, ArrowLeft, Clock, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const recommendations = [
  {
    title: 'תרגול נוסף ב-SQL Joins',
    reason: 'זוהתה חולשה בתרגילים אחרונים',
    time: '15 דקות',
    impact: 'גבוה',
    type: 'תרגול',
    color: 'from-red-500 to-orange-500',
  },
  {
    title: 'קבוצת לימוד: אלגוריתמים',
    reason: '3 סטודנטים ברמה דומה זמינו עכשיו',
    time: 'התחל עכשיו',
    impact: 'בינוני',
    type: 'קבוצה',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'סיכום חכם: מבני נתונים',
    reason: 'בחינה בעוד שבוע - AI יצר סיכום מותאם',
    time: '20 דקות',
    impact: 'גבוה',
    type: 'סיכום',
    color: 'from-blue-500 to-cyan-500',
  },
];

export function AIRecommendations() {
  return (
    <section className="mb-8">
      <div className="flex items-center mb-6 justify-start">
        <h2 className="text-2xl font-bold text-gray-900">מומלץ עבורך</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="col-span-4">
            <Card className="p-6 hover:shadow-lg transition-all border-gray-100 relative overflow-hidden">
              {/* Background gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${rec.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              
              <div className="relative">
                {/* Type Badge */}
                <Badge className="mb-4 bg-blue-100 text-blue-700">
                  {rec.type}
                </Badge>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right">
                  {rec.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-right leading-relaxed">
                  {rec.reason}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 justify-start">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium ${
                      rec.impact === 'גבוה' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{rec.time}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" className="w-full hover:bg-blue-50">
                  התחל
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* AI Insight Card */}
      <Card className="p-6 mt-6 bg-gradient-to-l from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-right">
          <h3 className="font-semibold text-gray-900 mb-2">תובנת AI היום</h3>
          <p className="text-gray-700 leading-relaxed">
            הביצועים שלך במסדי נתונים משתפרים! המשיכי להתמקד ב-Normalization וב-Query Optimization. 
            הזמן הטוב ביותר ללמידה שלך: בין 10:00-12:00 בבוקר.
          </p>
        </div>
      </Card>
    </section>
  );
}