import { Edit2, Mail, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ProfileCard() {
  return (
    <Card className="p-8 border-gray-100">
      <div className="flex items-start gap-6">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-5xl text-white font-bold">ש</span>
          </div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-right">
          <div className="flex items-start justify-between mb-4">
            <Button variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              ערוך פרופיל
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">שרה כהן</h1>
              <Badge className="bg-teal-100 text-teal-700 text-sm">
                סטודנטית פעילה
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-gray-700">sarah.cohen@mail.ac.il</span>
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span className="text-gray-700">שנה ב׳, סמסטר א׳</span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span className="text-gray-700">תואר ראשון במערכות מידע</span>
              <GraduationCap className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span className="text-gray-700">אוניברסיטת תל אביב</span>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-8 pt-6 border-t border-gray-200 justify-end">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">87</div>
              <div className="text-sm text-gray-600">ממוצע כללי</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-sm text-gray-600">נקודות זכות</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">קורסים פעילים</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">ימי למידה</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}