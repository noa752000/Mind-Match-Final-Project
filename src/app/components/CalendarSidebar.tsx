import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScheduleRecommendationModal, RecommendationToSchedule } from './ScheduleRecommendationModal';

const aiRecommendations = [
  {
    title: 'תזמן תרגול SQL ביום רביעי',
    reason: 'זוהתה חולשה בנושא - מומלץ לתרגל לפני הבחינה',
    priority: 'high',
    time: '2 שעות',
    schedulable: { defaultType: 'tutorial' as const, defaultCourseId: 'sql' },
  },
  {
    title: 'הוסף שיעור חדו"א לשבוע הבא',
    reason: 'הנתונים מראים שאת מצליחה יותר בין 10:00-14:00',
    priority: 'medium',
    time: 'שעתיים',
    schedulable: { defaultType: 'lecture' as const, defaultCourseId: 'calculus1' },
  },
  {
    title: 'תרגול למידה עצמאית — אבטחת מידע',
    reason: 'לא תרגלת השבוע - מומלץ להכניס שעה',
    priority: 'low',
    time: 'שעה',
    schedulable: { defaultType: 'self-study' as const, defaultCourseId: 'information-security' },
  },
];

export function CalendarSidebar() {
  const [activeModal, setActiveModal] = useState<RecommendationToSchedule | null>(null);

  return (
    <>
      <div className="fixed left-0 top-20 w-64 bg-white border-l border-gray-200 p-5 overflow-y-auto h-[calc(100vh-5rem)]">
        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-3 justify-start">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-gray-900 text-sm">המלצות AI</h3>
          </div>

          <div className="space-y-2">
            {aiRecommendations.map((rec, index) => (
              <Card key={index} className="p-3 hover:shadow-md transition-shadow border-gray-200">
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex-1 text-right">
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">{rec.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{rec.reason}</p>
                  </div>
                  <Badge className={`text-xs flex-shrink-0 ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.time}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1 text-xs h-7 border-teal-200 text-teal-700 hover:bg-teal-50"
                  onClick={() => setActiveModal({ title: rec.title, ...rec.schedulable })}
                >
                  + הוסף ליומן
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {activeModal && (
        <ScheduleRecommendationModal
          key={activeModal.title}
          recommendation={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
