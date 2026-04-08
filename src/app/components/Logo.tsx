import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
        <GraduationCap className="w-6 h-6 text-white" />
      </div>
      <div className="text-right">
        <h1 className="text-xl font-bold text-gray-900">פלטפורמת הלמידה האקדמית</h1>
        <p className="text-sm text-gray-600">מונעת בינה מלאכותית</p>
      </div>
    </div>
  );
}
