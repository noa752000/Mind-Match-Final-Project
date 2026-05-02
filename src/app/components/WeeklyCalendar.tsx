import { useMemo } from 'react';
import { useCalendarSync, GoogleCalendarEvent } from '../contexts/CalendarSyncContext';
import { CalendarEvent } from './CalendarEvent';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

const DAY_LABELS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const CALENDAR_START_HOUR = 8;
const SLOT_HEIGHT = 60; // px per hour

function toTopPx(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h - CALENDAR_START_HOUR) * SLOT_HEIGHT + (m / 60) * SLOT_HEIGHT;
}

function durationHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh * 60 + em - sh * 60 - sm) / 60;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function convertGoogleEvent(event: GoogleCalendarEvent) {
  // Skip all-day events (no dateTime)
  if (!event.start.dateTime || !event.end.dateTime) return null;

  const startTime = formatTime(event.start.dateTime);
  const endTime = formatTime(event.end.dateTime);
  const top = toTopPx(startTime);

  // Clamp to visible range
  if (top < 0 || top > SLOT_HEIGHT * timeSlots.length) return null;

  const duration = durationHours(startTime, endTime);

  return {
    type: 'lecture' as const,
    title: event.summary || 'אירוע',
    location: event.location || '',
    time: `${startTime}-${endTime}`,
    duration: Math.max(duration, 0.5),
    top,
  };
}

export function WeeklyCalendar() {
  const { googleEvents, weekStart, isSyncing } = useCalendarSync();

  // Build day columns for Sun–Thu of the current week
  const daysOfWeek = useMemo(() => {
    return [0, 1, 2, 3, 4].map(offset => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + offset);
      return {
        key: offset.toString(),
        label: DAY_LABELS[d.getDay()],
        date: `${d.getDate()}/${d.getMonth() + 1}`,
        dayOfWeek: d.getDay(),
        fullDate: d,
      };
    });
  }, [weekStart]);

  // Group Google Calendar events by day-of-week (0=Sun … 6=Sat)
  const eventsByDay = useMemo(() => {
    const map: Record<number, ReturnType<typeof convertGoogleEvent>[]> = {};
    for (const event of googleEvents) {
      const converted = convertGoogleEvent(event);
      if (!converted) continue;
      const dow = new Date(event.start.dateTime!).getDay();
      if (!map[dow]) map[dow] = [];
      map[dow].push(converted);
    }
    return map;
  }, [googleEvents]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {isSyncing && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-700 text-right">
          מסנכרן עם Google Calendar...
        </div>
      )}

      {/* Days Header */}
      <div className="grid border-b border-gray-200 bg-gray-50" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
        <div className="p-4 border-l border-gray-200" />
        {daysOfWeek.map((day) => (
          <div key={day.key} className="p-4 text-center border-l border-gray-200">
            <div className="font-semibold text-gray-900">{day.label}</div>
            <div className="text-sm text-gray-600">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
        {/* Time Column */}
        <div className="border-l border-gray-200">
          {timeSlots.map((time) => (
            <div key={time} className="h-[60px] border-b border-gray-200 px-3 py-2 text-sm text-gray-600 text-right">
              {time}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {daysOfWeek.map((day) => (
          <div key={day.key} className="border-l border-gray-200 relative">
            {timeSlots.map((time) => (
              <div key={time} className="h-[60px] border-b border-gray-200 hover:bg-blue-50/30 transition-colors" />
            ))}

            <div className="absolute inset-0 pointer-events-none">
              <div className="relative h-full pointer-events-auto">
                {(eventsByDay[day.dayOfWeek] || []).map((event, i) =>
                  event ? <CalendarEvent key={i} {...event} /> : null
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isSyncing && googleEvents.length === 0 && (
        <div className="p-6 text-center text-gray-500 text-sm border-t border-gray-200">
          לא נמצאו אירועים השבוע. לחץ על "סנכרן עם Google Calendar" להצגת האירועים שלך.
        </div>
      )}
    </div>
  );
}
