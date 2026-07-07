import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCalendarSync, GoogleCalendarEvent } from '../contexts/CalendarSyncContext';
import { CalendarEvent } from './CalendarEvent';
import { NewEventModal, NewEventData } from './NewEventModal';
import { EventType } from '../contexts/CalendarSyncContext';

const timeSlots = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, '0')}:00`
);

const CALENDAR_START_HOUR = 0;
const SLOT_HEIGHT = 60;

const TYPE_LABELS: Record<EventType, string> = {
  lecture: 'שיעור', tutorial: 'תרגול',
  'self-study': 'למידה עצמאית', deadline: 'מועד הגשה',
};

function toTopPx(t: string) {
  const [h, m] = t.split(':').map(Number);
  return (h - CALENDAR_START_HOUR) * SLOT_HEIGHT + (m / 60) * SLOT_HEIGHT;
}
function durationHours(s: string, e: string) {
  const [sh, sm] = s.split(':').map(Number);
  const [eh, em] = e.split(':').map(Number);
  return (eh * 60 + em - sh * 60 - sm) / 60;
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
}
function buildDateTimeISO(date: Date, time: string) {
  const y = date.getFullYear(), mo = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}T${time}:00`;
}

function convertGoogleEvent(event: GoogleCalendarEvent) {
  if (!event.start.dateTime || !event.end.dateTime) return null;
  const startTime = formatTime(event.start.dateTime);
  const endTime = formatTime(event.end.dateTime);
  const top = toTopPx(startTime);
  if (top < 0 || top > SLOT_HEIGHT * 24) return null;
  return {
    type: 'lecture' as const,
    title: event.summary || 'אירוע',
    location: event.location || '',
    time: `${startTime}-${endTime}`,
    duration: Math.max(durationHours(startTime, endTime), 0.5),
    top,
  };
}

interface ModalState {
  isOpen: boolean;
  day: { label: string; date: string; dayOfWeek: number; fullDate: Date } | null;
  time: string;
}

export function DailyCalendar() {
  const { googleEvents, weekStart, isSyncing, localAppEvents, addLocalAppEvent, createGoogleCalendarEvent } = useCalendarSync();
  const [modal, setModal] = useState<ModalState>({ isOpen: false, day: null, time: '' });

  const dayOfWeek = weekStart.getDay();
  const dayLabel = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'][dayOfWeek];
  const dateLabel = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;

  const isPast = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return weekStart < today;
  }, [weekStart]);

  const dayEvents = useMemo(() => {
    return googleEvents
      .filter(e => e.start.dateTime && new Date(e.start.dateTime).getDay() === dayOfWeek)
      .map(convertGoogleEvent)
      .filter(Boolean) as ReturnType<typeof convertGoogleEvent>[];
  }, [googleEvents, dayOfWeek]);

  const localDayEvents = localAppEvents.filter(e => e.dayOfWeek === dayOfWeek);

  const handleSlotClick = (time: string) => {
    if (isPast) return;
    setModal({ isOpen: true, day: { label: dayLabel, date: dateLabel, dayOfWeek, fullDate: weekStart }, time });
  };

  const handleCreateEvent = (data: NewEventData) => {
    const top = toTopPx(data.startTime);
    const duration = durationHours(data.startTime, data.endTime);
    addLocalAppEvent({
      id: `local-${Date.now()}`,
      dayOfWeek,
      type: data.type,
      title: `${TYPE_LABELS[data.type]} — ${data.courseName}`,
      location: data.location,
      time: `${data.startTime}–${data.endTime}`,
      duration: Math.max(duration, 0.5),
      top,
    });
    createGoogleCalendarEvent({
      title: `${TYPE_LABELS[data.type]} — ${data.courseName}`,
      startDateTime: buildDateTimeISO(weekStart, data.startTime),
      endDateTime: buildDateTimeISO(weekStart, data.endTime),
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isSyncing && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-700 text-right">
            מסנכרן עם Google Calendar...
          </div>
        )}
        {/* Header */}
        <div className="grid border-b border-gray-200 bg-gray-50" style={{ gridTemplateColumns: '80px 1fr' }}>
          <div className="p-4 border-l border-gray-200" />
          <div className={`p-4 text-center border-l border-gray-200 ${isPast ? 'opacity-50' : ''}`}>
            <div className="font-semibold text-gray-900 text-lg">{dayLabel}</div>
            <div className="text-sm text-gray-600">{dateLabel}</div>
          </div>
        </div>
        {/* Grid */}
        <div className="grid" style={{ gridTemplateColumns: '80px 1fr' }}>
          <div className="border-l border-gray-200">
            {timeSlots.map(t => (
              <div key={t} className="h-[60px] border-b border-gray-200 px-3 py-2 text-sm text-gray-600 text-right">{t}</div>
            ))}
          </div>
          <div className={`border-l border-gray-200 relative ${isPast ? 'bg-gray-50/60' : ''}`}>
            {timeSlots.map(t => (
              <div
                key={t}
                className={`h-[60px] border-b border-gray-200 transition-colors relative ${
                  isPast ? 'cursor-not-allowed' : 'hover:bg-teal-50/60 cursor-pointer group/slot'
                }`}
                onClick={() => handleSlotClick(t)}
              >
                {!isPast && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity pointer-events-none">
                    <span className="flex items-center gap-1 bg-teal-100 text-teal-700 rounded-full px-2 py-0.5 text-xs font-medium">
                      <Plus className="w-3 h-3" />הוסף פעילות
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative h-full">
                {dayEvents.map((e, i) => e && <CalendarEvent key={i} {...e} />)}
                {localDayEvents.map(e => <CalendarEvent key={e.id} {...e} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.isOpen && modal.day && (
        <NewEventModal
          key={`${modal.time}`}
          onClose={() => setModal(s => ({ ...s, isOpen: false }))}
          onCreateEvent={handleCreateEvent}
          dayLabel={modal.day.label}
          dayDate={modal.day.date}
          defaultStartTime={modal.time}
        />
      )}
    </>
  );
}
