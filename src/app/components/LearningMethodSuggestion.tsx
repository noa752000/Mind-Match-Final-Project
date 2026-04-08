import { Sparkles, Video, BookOpen, Code, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function LearningMethodSuggestion() {
  return (
    <Card className="p-6 bg-gradient-to-l from-purple-50 to-indigo-50 border-purple-200 mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">המלצות למידה מותאמות אישית</h3>
          </div>

          <p className="text-sm text-gray-700 mb-4 leading-relaxed" dir="rtl" style={{ unicodeBidi: 'plaintext' }}>
            בהתבסס על סגנון הלמידה הוויזואלי שלך, הנה שיטות מומלצות להבנת הנושא:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Video className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">צפה בסרטון הדרכה</span>
              </div>
              <Badge className="bg-green-100 text-green-700 text-xs">מתאים במיוחד</Badge>
            </div>

            <div className="p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">תרגול בקוד</span>
              </div>
              <Badge className="bg-green-100 text-green-700 text-xs">מתאים במיוחד</Badge>
            </div>

            <div className="p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">קרא מאמר מעמיק</span>
              </div>
              <Badge className="bg-orange-100 text-orange-700 text-xs">מתאים</Badge>
            </div>

            <div className="p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">קבוצת לימוד</span>
              </div>
              <Badge className="bg-orange-100 text-orange-700 text-xs">מתאים</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}