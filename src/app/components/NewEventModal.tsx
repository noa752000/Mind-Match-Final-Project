import { useState } from 'react';
import { X, GraduationCap, Code, BookOpen, AlertCircle, Plus, Clock, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import type { EventType } from '../contexts/CalendarSyncContext';
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

const EVENT_TYPES = [
  {
    id: 'lecture' as const,
    label: 'שיעור',
    icon: GraduationCap,
    selected: 'bg-blue-500 text-white border-blue-500',
    base: 'border-blue-200 text-blue-700 hover:bg-blue-50',
  },
  {
    id: 'tutorial' as const,
    label: 'תרגול',
    icon: Code,
    selected: 'bg-purple-500 text-white border-purple-500',
    base: 'border-purple-200 text-purple-700 hover:bg-purple-50',
  },
  {
    id: 'self-study' as const,
    label: 'למידה עצמאית',
    icon: BookOpen,
    selected: 'bg-green-500 text-white border-green-500',
    base: 'border-green-200 text-green-700 hover:bg-green-50',
  },
  {
    id: 'deadline' as const,
    label: 'מועד הגשה',
    icon: AlertCircle,
    selected: 'bg-red-500 text-white border-red-500',
    base: 'border-red-200 text-red-700 hover:bg-red-50',
  },
];

// 08:00 to 23:00 in 30-minute steps
const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const totalMin = 8 * 60 + i * 30;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
});

export interface NewEventData {
  type: EventType;
  courseId: string;
  courseName: string;
  startTime: string;
  endTime: string;
  location?: string;
}

interface NewEventModalProps {
  onClose: () => void;
  onCreateEvent: (event: NewEventData) => void;
  dayLabel: string;
  dayDate: string;
  defaultStartTime: string;
}

export function NewEventModal({ onClose, onCreateEvent, dayLabel, dayDate, defaultStartTime }: NewEventModalProps) {
  const { user } = useAuth();
  const startIdx = Math.max(TIME_SLOTS.indexOf(defaultStartTime), 0);

  const [eventType, setEventType] = useState<EventType>('lecture');
  const [courseId, setCourseId] = useState('');
  const [startTime, setStartTime] = useState(TIME_SLOTS[startIdx]);
  const [endTime, setEndTime] = useState(TIME_SLOTS[Math.min(startIdx + 2, TIME_SLOTS.length - 1)]);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const userSelectedCourses = user?.selectedCourses || [];
  const filteredCourses = COURSES.filter(c => userSelectedCourses.includes(c.id));

  const handleSubmit = () => {
    if (!courseId) {
      setError('אנא בחר/י קורס');
      return;
    }
    if (endTime <= startTime) {
      setError('שעת הסיום חייבת להיות אחרי שעת ההתחלה');
      return;
    }
    const course = COURSES.find(c => c.id === courseId)!;
    onCreateEvent({
      type: eventType,
      courseId,
      courseName: course.name,
      startTime,
      endTime,
      location: location.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Gradient header */}
        <div className="bg-gradient-to-l from-teal-500 to-teal-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold">הוספת פעילות חדשה</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Day badge */}
          <div className="flex items-center gap-2 mt-3 bg-white/15 rounded-xl px-3 py-2 w-fit ml-auto">
            <Clock className="w-4 h-4 text-teal-100 flex-shrink-0" />
            <span className="font-semibold text-sm">{dayLabel}</span>
            <span className="text-teal-100 text-sm">{dayDate}</span>
          </div>
        </div>

        {/* Form body */}
        <div className="px-6 py-5 space-y-5">
          {/* Event type selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">סוג פעילות</label>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map((type) => {
                const Icon = type.icon;
                const active = eventType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id)}
                    className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      active ? type.selected : `bg-white ${type.base}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">קורס</label>
            {filteredCourses.length === 0 ? (
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-right text-sm bg-gray-50 text-gray-600">
                לא נמצאו קורסים משויכים למשתמש
              </div>
            ) : (
              <select
                value={courseId}
                onChange={(e) => { setCourseId(e.target.value); setError(''); }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                dir="rtl"
              >
                <option value="">בחר/י קורס...</option>
                {filteredCourses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Time range */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">שעת התחלה</label>
              <div className="relative">
                <select
                  value={startTime}
                  onChange={(e) => { setStartTime(e.target.value); setError(''); }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center bg-white appearance-none"
                >
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">שעת סיום</label>
              <div className="relative">
                <select
                  value={endTime}
                  onChange={(e) => { setEndTime(e.target.value); setError(''); }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center bg-white appearance-none"
                >
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Location (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
              הערה
              <span className="font-normal text-gray-400 mr-1">(אופציונלי)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="הוסף/הוסיפי הערה לפעילות..."
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                dir="rtl"
              />
              <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-right">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
          >
            <Plus className="w-4 h-4 ml-1.5" />
            הוסף פעילות
          </Button>
          <Button variant="ghost" onClick={onClose} className="text-gray-600">
            ביטול
          </Button>
        </div>
      </div>
    </div>
  );
}
