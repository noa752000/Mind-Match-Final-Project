import { useState, useMemo } from 'react';
import { X, Plus, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useCalendarSync, EventType } from '../contexts/CalendarSyncContext';
import { useAuth } from '../contexts/AuthContext';

const COURSES = [
  { id: 'calculus1', name: 'חדו"א 1' },
  { id: 'linear-algebra', name: 'אלגברה לינארית' },
  { id: 'oop', name: 'תכנות מונחה עצמים' },
  { id: 'html', name: 'HTML' },
  { id: 'sql', name: 'SQL' },
  { id: 'systems_analysis', name: 'אפיון ותכן' },
  { id: 'cyber_security', name: 'אבטחת מידע' },
  { id: 'mis-economics', name: 'כלכלת מערכות מידע' },
];

const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const totalMin = 8 * 60 + i * 30;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
});

const DAY_LABELS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];

const CALENDAR_START_HOUR = 8;
const SLOT_HEIGHT = 60;

function buildDateTimeISO(date: Date, time: string): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}T${time}:00`;
}

function toTopPx(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h - CALENDAR_START_HOUR) * SLOT_HEIGHT + (m / 60) * SLOT_HEIGHT;
}

function durationHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh * 60 + em - sh * 60 - sm) / 60;
}

const DEFAULT_START_TIME = '10:00';

function addHoursToTime(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = Math.min(h * 60 + m + hours * 60, 23 * 60);
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
}

export interface RecommendationToSchedule {
  title: string;
  defaultType: EventType;
  defaultCourseId?: string;
  durationHours?: number;
}

interface ScheduleRecommendationModalProps {
  recommendation: RecommendationToSchedule;
  onClose: () => void;
}

export function ScheduleRecommendationModal({ recommendation, onClose }: ScheduleRecommendationModalProps) {
  const { weekStart, addLocalAppEvent, createGoogleCalendarEvent } = useCalendarSync();

  const daysOfWeek = useMemo(() => {
    return [0, 1, 2, 3, 4].map(offset => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + offset);
      return {
        offset,
        label: DAY_LABELS[offset],
        date: `${d.getDate()}/${d.getMonth() + 1}`,
        fullDate: d,
      };
    });
  }, [weekStart]);

  const [selectedDayOffset, setSelectedDayOffset] = useState(0);
  const [courseId, setCourseId] = useState(recommendation.defaultCourseId || '');
  const [startTime, setStartTime] = useState(DEFAULT_START_TIME);
  const [endTime, setEndTime] = useState(
    addHoursToTime(DEFAULT_START_TIME, recommendation.durationHours ?? 1)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const userSelectedCourses = user?.selectedCourses || [];
  const filteredCourses = COURSES.filter(c => userSelectedCourses.includes(c.id));

  const TYPE_LABELS: Record<EventType, string> = {
    lecture: 'שיעור',
    tutorial: 'תרגול',
    'self-study': 'למידה עצמאית',
    deadline: 'מועד הגשה',
  };

  const handleSubmit = async () => {
    if (!courseId) { setError('אנא בחרי קורס'); return; }
    if (endTime <= startTime) { setError('שעת הסיום חייבת להיות אחרי שעת ההתחלה'); return; }

    setIsSubmitting(true);
    const day = daysOfWeek[selectedDayOffset];
    const course = COURSES.find(c => c.id === courseId)!;
    const title = `${TYPE_LABELS[recommendation.defaultType]} — ${course.name}`;

    addLocalAppEvent({
      id: `local-${Date.now()}`,
      dayOfWeek: day.fullDate.getDay(),
      type: recommendation.defaultType,
      title,
      time: `${startTime}–${endTime}`,
      duration: Math.max(durationHours(startTime, endTime), 0.5),
      top: toTopPx(startTime),
    });

    createGoogleCalendarEvent({
      title,
      startDateTime: buildDateTimeISO(day.fullDate, startTime),
      endDateTime: buildDateTimeISO(day.fullDate, endTime),
      description: recommendation.title,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-teal-500 to-teal-600 px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-bold text-base">הוסף ליומן</span>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-teal-100 text-sm mt-2 text-right">{recommendation.title}</p>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Day selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">יום</label>
            <div className="grid grid-cols-5 gap-1">
              {daysOfWeek.map((day) => (
                <button
                  key={day.offset}
                  onClick={() => setSelectedDayOffset(day.offset)}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg border text-xs font-medium transition-all ${
                    selectedDayOffset === day.offset
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{day.label}</span>
                  <span className={`text-xs mt-0.5 ${selectedDayOffset === day.offset ? 'text-teal-100' : 'text-gray-400'}`}>
                    {day.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Course selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">קורס</label>
            {filteredCourses.length === 0 ? (
              <div className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm bg-gray-50 text-gray-600">
                לא נמצאו קורסים משויכים למשתמש
              </div>
            ) : (
              <select
                value={courseId}
                onChange={(e) => { setCourseId(e.target.value); setError(''); }}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                dir="rtl"
              >
                <option value="">בחרי קורס...</option>
                {filteredCourses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Time range */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">שעת התחלה</label>
              <select
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); setError(''); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center bg-white"
              >
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">שעת סיום</label>
              <select
                value={endTime}
                onChange={(e) => { setEndTime(e.target.value); setError(''); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center bg-white"
              >
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-right bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm"
          >
            <Plus className="w-4 h-4 ml-1" />
            {isSubmitting ? 'מוסיף...' : 'הוסף ליומן'}
          </Button>
          <Button variant="ghost" onClick={onClose} className="text-gray-600 text-sm">ביטול</Button>
        </div>
      </div>
    </div>
  );
}
