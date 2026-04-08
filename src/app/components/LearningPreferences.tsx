import { Book, Clock, Volume2, Palette } from 'lucide-react';
import { Card } from './ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';

export function LearningPreferences() {
  return (
    <Card className="p-8 border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-right">העדפות למידה</h3>
      
      <div className="space-y-6">
        {/* Language Preference */}
        <div className="text-right">
          <label className="text-sm font-medium text-gray-900 block mb-3">שפת ממשק</label>
          <Select defaultValue="he">
            <SelectTrigger>
              <SelectValue placeholder="בחר שפה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he">עברית</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Study Time Preference */}
        <div className="text-right">
          <label className="text-sm font-medium text-gray-900 block mb-3">זמן לימוד מועדף</label>
          <Select defaultValue="morning">
            <SelectTrigger>
              <SelectValue placeholder="בחר זמן" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">בוקר (06:00-12:00)</SelectItem>
              <SelectItem value="afternoon">צהריים (12:00-18:00)</SelectItem>
              <SelectItem value="evening">ערב (18:00-24:00)</SelectItem>
              <SelectItem value="night">לילה (00:00-06:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Study Session Length */}
        <div className="text-right">
          <label className="text-sm font-medium text-gray-900 block mb-3">משך מפגש למידה</label>
          <Select defaultValue="45">
            <SelectTrigger>
              <SelectValue placeholder="בחר משך זמן" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 דקות (פומודורו)</SelectItem>
              <SelectItem value="45">45 דקות (מומלץ)</SelectItem>
              <SelectItem value="60">60 דקות</SelectItem>
              <SelectItem value="90">90 דקות</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Difficulty */}
        <div className="text-right">
          <label className="text-sm font-medium text-gray-900 block mb-3">רמת קושי מועדפת</label>
          <Select defaultValue="adaptive">
            <SelectTrigger>
              <SelectValue placeholder="בחר רמה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">קלה</SelectItem>
              <SelectItem value="medium">בינונית</SelectItem>
              <SelectItem value="hard">קשה</SelectItem>
              <SelectItem value="adaptive">מותאמת (AI)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Preferences */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Switch defaultChecked />
            <div className="text-right flex-1 mr-4">
              <p className="font-medium text-gray-900">הפעל צלילים</p>
              <p className="text-sm text-gray-600">משוב קולי למשימות</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Switch defaultChecked />
            <div className="text-right flex-1 mr-4">
              <p className="font-medium text-gray-900">המלצות AI</p>
              <p className="text-sm text-gray-600">קבל המלצות מותאמות אישית</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Switch />
            <div className="text-right flex-1 mr-4">
              <p className="font-medium text-gray-900">מצב לא להפריע</p>
              <p className="text-sm text-gray-600">השתק התראות בזמן למידה</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}