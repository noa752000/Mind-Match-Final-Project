import { LearningStyleInsights } from '../components/LearningStyleInsights';
import { StrengthsWeaknesses } from '../components/StrengthsWeaknesses';
import { PreferredStudyMethods } from '../components/PreferredStudyMethods';
import { PerformanceAnalytics } from '../components/PerformanceAnalytics';
import { AIPersonalizationSummary } from '../components/AIPersonalizationSummary';
import { Card } from '../components/ui/card';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const quickStats = [
  {
    icon: TrendingUp,
    label: 'התקדמות השבוע',
    value: '+14%',
    subtext: 'שיפור משמעותי',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Clock,
    label: 'שעות לימוד חודשיות',
    value: '78.5',
    subtext: 'גבוה מהממוצע',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Target,
    label: 'יעדים שהושגו',
    value: '23/25',
    subtext: '92% הצלחה',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Award,
    label: 'הישגים חדשים',
    value: '5',
    subtext: 'החודש',
    color: 'from-orange-500 to-red-600',
  },
];

export function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1176px] mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">ניתוח ותובנות</h1>
            <p className="text-gray-600 mt-1">מעקב אחר הביצועים, ההתקדמות והמלצות AI מותאמות אישית</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-12 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="col-span-3">
                  <Card className="p-6 hover:shadow-lg transition-all border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-right flex-1">
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-2">{stat.subtext}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* AI Personalization Summary - Top Priority */}
          <AIPersonalizationSummary />

          {/* Learning Style & Study Methods */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <LearningStyleInsights />
            </div>
            <div className="col-span-7">
              <PreferredStudyMethods />
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <StrengthsWeaknesses />
          
          {/* Performance Analytics */}
          <PerformanceAnalytics />
        </div>
      </main>
    </div>
  );
}