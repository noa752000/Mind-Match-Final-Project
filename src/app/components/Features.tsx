import React from 'react';
import { BookOpen, MessageSquare, Users, Calendar } from 'lucide-react';
import { Card } from './ui/card';

const features: { icon: React.ElementType; title: string; description: string; color: string; shadow: string }[] = [
  {
    icon: BookOpen,
    title: 'למידה מותאמת אישית',
    description: 'תוכן שמתאים עצמו לסגנון הלמידה, הקצב והרמה שלך. כל סטודנט מקבל חוויה ייחודית.',
    color: 'from-emerald-400 to-teal-600',
    shadow: 'shadow-emerald-200',
  },
  {
    icon: MessageSquare,
    title: 'מורה AI אישי',
    description: 'מורה וירטואלי זמין 24/7 לענות על שאלות, להסביר מושגים ולספק הדרכה אישית.',
    color: 'from-blue-400 to-indigo-600',
    shadow: 'shadow-blue-200',
  },
  {
    icon: Users,
    title: 'קבוצות לימוד חכמות',
    description: 'המערכת מחברת אותך עם סטודנטים בעלי רמה דומה ליצירת קבוצות לימוד אפקטיביות.',
    color: 'from-fuchsia-400 to-purple-600',
    shadow: 'shadow-fuchsia-200',
  },
  {
    icon: Calendar,
    title: 'תזמון חכם',
    description: 'מערכת תזמון שלומדת את הזמנים הטובים ביותר עבורך וממליצה על לוח לימודים אופטימלי.',
    color: 'from-orange-400 to-rose-500',
    shadow: 'shadow-orange-200',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-16 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-right mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            תכונות מתקדמות למידה חכמה
          </h2>
          <p className="text-xl text-gray-600">
            כלים חדשניים שמשנים את חוויית הלמידה האקדמית
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3">
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-gray-100 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg ${feature.shadow}`}>
                    {Icon && <Icon className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-right">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}