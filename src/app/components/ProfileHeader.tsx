import { Edit2, Camera } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ProfileHeader() {
  return (
    <Card className="p-8 border-gray-100">
      <div className="flex items-start gap-8">
        {/* Profile Picture and Info */}
        <div className="flex flex-col items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <span className="text-4xl text-white font-bold">ה</span>
            </div>
            <button className="absolute bottom-1 left-1 w-8 h-8 rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-gray-700" />
            </button>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">הדס כהן</h1>
            <div className="flex items-center gap-3 justify-start">
              <Badge className="bg-green-100 text-green-700 text-sm">
                חשבון מאומת
              </Badge>
              <Badge className="bg-teal-100 text-teal-700 text-sm">
                סטודנטית פעילה
              </Badge>
            </div>
          </div>
        </div>

        {/* Profile Description and Stats */}
        <div className="flex-1 text-right">
          <div className="flex items-start justify-end mb-6">
            <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
              <Edit2 className="w-4 h-4" />
              ערוך פרופיל
            </Button>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            סטודנטית שנה ב׳ למערכות מידע, מתמחה בפיתוח תוכנה וניתוח נתונים. 
            חברה בקבוצת המצטיינים ומנטורית לסטודנטים חדשים.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">87</div>
              <div className="text-sm text-gray-600">ממוצע כללי</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
              <div className="text-sm text-gray-600">נקודות זכות</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
              <div className="text-sm text-gray-600">קורסים פעילים</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-sm text-gray-600">ימי למידה</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}