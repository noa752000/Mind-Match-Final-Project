import { Brain, Settings, Download, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TutorHeaderProps {
  courseTitle?: string;
  courseColor?: string;
}

export function TutorHeader({ courseTitle, courseColor }: TutorHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-80 bg-white border-b border-gray-200 z-30">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Title - Right for RTL */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${courseColor ? `bg-gradient-to-br ${courseColor}` : 'bg-gradient-to-br from-blue-500 to-indigo-600'} flex items-center justify-center`}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">
                {courseTitle ? `מורה AI - ${courseTitle}` : 'מורה AI'}
              </h1>
              <div className="flex items-center gap-2 mt-1 justify-end">
                <Badge className="bg-green-100 text-green-700 text-xs">
                  מחובר • זמין תמיד
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions - Left for RTL */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              ייצא שיחה
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              הגדרות
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}