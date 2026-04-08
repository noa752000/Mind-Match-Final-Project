import { GraduationCap, Code, BookOpen, Sparkles, AlertCircle } from 'lucide-react';

const legendItems = [
  { icon: GraduationCap, label: 'שיעור', color: 'bg-blue-100 border-blue-600' },
  { icon: Code, label: 'תרגול', color: 'bg-purple-100 border-purple-600' },
  { icon: BookOpen, label: 'למידה עצמית', color: 'bg-green-100 border-green-600' },
  { icon: Sparkles, label: 'המלצת AI', color: 'bg-indigo-100 border-indigo-600' },
  { icon: AlertCircle, label: 'מועד הגשה', color: 'bg-red-100 border-red-600' },
];

export function EventLegend() {
  return (
    <div className="flex items-center gap-6 justify-end mb-4">
      <div className="text-sm text-gray-600 font-medium">מקרא:</div>
      {legendItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{item.label}</span>
            <div className={`w-8 h-8 rounded-lg ${item.color} border-r-4 flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
