import { Sparkles, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

const aiRecommendations = [
  {
    title: 'תזמן תרגול SQL ביום רביעי',
    reason: 'זוהתה חולשה בנושא - מומלץ לתרגל לפני הבחינה',
    priority: 'high',
    time: '2 שעות',
  },
  {
    title: 'העבר למידה לשעות הבוקר',
    reason: 'הנתונים מראים שאת מצליחה יותר בין 10:00-14:00',
    priority: 'medium',
    time: 'התאמה',
  },
  {
    title: 'הפחת שעות למידה ביום ה׳',
    reason: 'יותר מדי אירועים - סיכון לעייפות',
    priority: 'low',
    time: 'שיפור',
  },
];

const upcomingDeadlines = [
  { title: 'מטלה - אבטחת מידע', date: 'יום ג׳, 23:59', course: 'אבטחת מידע', urgent: true },
  { title: 'בחינה - מסדי נתונים', date: 'יום ראשון, 10:00', course: 'מסדי נתונים', urgent: false },
  { title: 'פרויקט - פיתוח Web', date: 'בעוד שבוע', course: 'פיתוח Web', urgent: false },
];

export function CalendarSidebar() {
  return (
    <div className="fixed left-0 top-0 w-64 bg-white border-l border-gray-200 p-5 overflow-y-auto h-screen">
      {/* Productivity Score */}
      <Card className="p-4 mb-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-2 mb-3 justify-end">
          <h3 className="text-base font-bold text-gray-900">ציון פרודוקטיביות</h3>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="text-center mb-3">
          <div className="text-4xl font-bold text-blue-600 mb-1">84</div>
          <Badge className="bg-green-600 text-white text-xs">+7 מהשבוע שעבר</Badge>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-gray-900 font-medium">יעילות זמן</span>
              <span className="text-gray-600">72%</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-gray-900 font-medium">עמידה ביעדים</span>
              <span className="text-gray-600">88%</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-gray-900 font-medium">איזון עומס</span>
              <span className="text-gray-600">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-gray-900 text-sm">המלצות AI</h3>
        </div>

        <div className="space-y-2">
          {aiRecommendations.map((rec, index) => (
            <Card key={index} className="p-3 hover:shadow-md transition-shadow border-gray-200">
              <div className="flex items-start gap-2 mb-2">
                <div className="flex-1 text-right">
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
                <Badge className={`text-xs ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                  rec.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {rec.time}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-1 text-xs h-7">
                הוסף ללוח זמנים
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <div className="flex items-center gap-2 mb-3 justify-start">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-gray-900 text-sm">מועדים קרובים</h3>
        </div>

        <div className="space-y-2">
          {upcomingDeadlines.map((deadline, index) => (
            <Card key={index} className={`p-3 border-l-4 ${
              deadline.urgent ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
            }`}>
              <div className="text-left">
                <div className="flex items-center gap-2 justify-start mb-1">
                  <h4 className="font-semibold text-gray-900 text-xs">
                    {deadline.title}
                  </h4>
                  {deadline.urgent && (
                    <Badge className="bg-red-600 text-white text-xs">דחוף</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1 justify-start">
                  <Clock className="w-3 h-3" />
                  <span>{deadline.date}</span>
                </div>
                <p className="text-xs text-gray-600">{deadline.course}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <Card className="p-3 mt-5 bg-gray-50 border-gray-200">
        <h4 className="font-semibold text-gray-900 text-xs mb-2 text-right">סטטיסטיקה שבועית</h4>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">שעות למידה מתוכננות</span>
            <span className="font-medium text-gray-900">32</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">שיעורים</span>
            <span className="font-medium text-gray-900">12</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">תרגולים</span>
            <span className="font-medium text-gray-900">8</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">מועדי הגשה</span>
            <span className="font-medium text-gray-900">3</span>
          </div>
        </div>
      </Card>
    </div>
  );
}