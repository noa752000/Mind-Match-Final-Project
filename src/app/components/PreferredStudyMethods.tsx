import { BookOpen, Video, Users, Headphones, FileText, Laptop } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

const methods = [
  {
    icon: Video,
    method: 'סרטוני הדרכה',
    usage: 85,
    hours: '42 שעות',
    color: 'from-red-500 to-pink-600',
  },
  {
    icon: FileText,
    method: 'קריאת חומר',
    usage: 78,
    hours: '35 שעות',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Laptop,
    method: 'תרגול מעשי',
    usage: 92,
    hours: '58 שעות',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Users,
    method: 'קבוצות לימוד',
    usage: 65,
    hours: '18 שעות',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Headphones,
    method: 'פודקאסטים',
    usage: 45,
    hours: '12 שעות',
    color: 'from-orange-500 to-yellow-600',
  },
  {
    icon: BookOpen,
    method: 'כרטיסיות זיכרון',
    usage: 55,
    hours: '15 שעות',
    color: 'from-teal-500 to-cyan-600',
  },
];

export function PreferredStudyMethods() {
  return (
    <Card className="p-8 border-gray-100 pt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 text-right">שיטות למידה מועדפות</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div key={index} className="col-span-4">
              <div className="text-right mb-4">
                <div className="flex items-center gap-3 mb-3 justify-end">
                  <span className="font-semibold text-gray-900">{method.method}</span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{method.hours}</span>
                  <span className="text-sm font-medium text-gray-900">{method.usage}%</span>
                </div>
                <Progress value={method.usage} className="h-2 bg-gray-100" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700 text-right leading-relaxed">
          <strong>המלצת AI:</strong> הנתונים מראים שאת מצליחה ביותר בלמידה מעשית ובצפייה בסרטונים. 
          מומלץ להגדיל את שיעור קבוצות הלימוד לשיפור הביצועים בקורסים מורכבים.
        </p>
      </div>
    </Card>
  );
}