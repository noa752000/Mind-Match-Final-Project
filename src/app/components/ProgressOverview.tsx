import { CheckCircle, Clock, BookOpen, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

const stats = [
  {
    icon: BookOpen,
    label: 'קורסים פעילים',
    value: '8',
    subtext: 'מתוך 12',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: CheckCircle,
    label: 'ממוצע השלמה',
    value: '73%',
    subtext: '+12% השבוע',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Clock,
    label: 'שעות לימוד השבוע',
    value: '18.5',
    subtext: 'יעד: 20',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Award,
    label: 'ציון ממוצע',
    value: '87',
    subtext: 'מצוין!',
    color: 'from-orange-500 to-orange-600',
  },
];

export function ProgressOverview() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-12 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-span-3">
              <Card className="p-6 hover:shadow-lg transition-all border-gray-100 h-full min-h-[140px] overflow-hidden">
                <div className="flex items-start gap-3 h-full">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-base text-gray-600 leading-tight h-[32px] flex items-end justify-start">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2 leading-none mt-3">{stat.value}</p>
                    <p className="text-sm text-gray-500 leading-tight whitespace-nowrap">{stat.subtext}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress Bar */}
      <Card className="p-6 mt-6 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">יעד לימוד שבועי</h3>
          <div className="text-sm text-gray-600">18.5 / 20 שעות</div>
        </div>
        <Progress value={92.5} className="h-3 bg-gray-100" />
        <p className="text-xs text-gray-500 mt-2 text-right">נשארו 1.5 שעות להשגת היעד השבועי</p>
      </Card>
    </section>
  );
}