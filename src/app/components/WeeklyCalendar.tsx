import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCalendarSync, GoogleCalendarEvent, EventType } from '../contexts/CalendarSyncContext';
import { CalendarEvent } from './CalendarEvent';
import { NewEventModal, NewEventData } from './NewEventModal';

const timeSlots = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, '0')}:00`
);

const DAY_LABELS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const CALENDAR_START_HOUR = 0;
const SLOT_HEIGHT = 60;

const TYPE_LABELS: Record<EventType, string> = {
  lecture: 'שיעור',
  tutorial: 'תרגול',
  'self-study': 'למידה עצמאית',
  deadline: 'מועד הגשה',
};

function toTopPx(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h - CALENDAR_START_HOUR) * SLOT_HEIGHT + (m / 60) * SLOT_HEIGHT;
}

function durationHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return (eh * 60 + em - sh * 60 - sm) / 60;
}

function buildDateTimeISO(date: Date, time: string): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}T${time}:00`;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function convertGoogleEvent(event: GoogleCalendarEvent) {
  if (!event.start.dateTime || !event.end.dateTime) return null;
  const startTime = formatTime(event.start.dateTime);
  const endTime = formatTime(event.end.dateTime);
  const top = toTopPx(startTime);
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

interface ModalState {
  isOpen: boolean;
  day: { label: string; date: string; dayOfWeek: number; fullDate: Date } | null;
  time: string;
}

export function WeeklyCalendar() {
  const {
    googleEvents, weekStart, isSyncing,
    localAppEvents, addLocalAppEvent, createGoogleCalendarEvent,
  } = useCalendarSync();

  const [modal, setModal] = useState<ModalState>({ isOpen: false, day: null, time: '' });

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

  const handleSlotClick = (day: typeof daysOfWeek[0], time: string) => {
    setModal({ isOpen: true, day, time });
  };

  const handleCreateEvent = (data: NewEventData) => {
    const top = toTopPx(data.startTime);
    const duration = durationHours(data.startTime, data.endTime);

    addLocalAppEvent({
      id: `local-${Date.now()}`,
      dayOfWeek: modal.day!.dayOfWeek,
      type: data.type,
      title: `${TYPE_LABELS[data.type]} — ${data.courseName}`,
      location: data.location,
      time: `${data.startTime}–${data.endTime}`,
      duration: Math.max(duration, 0.5),
      top,
    });

    // Sync to Google Calendar (fire-and-forget)
    const fullDate = modal.day!.fullDate;
    createGoogleCalendarEvent({
      title: `${TYPE_LABELS[data.type]} — ${data.courseName}`,
      startDateTime: buildDateTimeISO(fullDate, data.startTime),
      endDateTime: buildDateTimeISO(fullDate, data.endTime),
      description: data.location,
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
              {/* Clickable time slot rows */}
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-[60px] border-b border-gray-200 hover:bg-teal-50/60 transition-colors cursor-pointer group/slot relative"
                  onClick={() => handleSlotClick(day, time)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity pointer-events-none">
                    <span className="flex items-center gap-1 bg-teal-100 text-teal-700 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                      <Plus className="w-3 h-3" />
                      הוסף פעילות
                    </span>
                  </div>
                </div>
              ))}

              {/* Events overlay — pointer-events-none so clicks reach the slot rows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative h-full">
                  {(eventsByDay[day.dayOfWeek] || []).map((event, i) =>
                    event ? <CalendarEvent key={i} {...event} /> : null
                  )}
                  {localAppEvents
                    .filter(e => e.dayOfWeek === day.dayOfWeek)
                    .map((event) => (
                      <CalendarEvent key={event.id} {...event} />
                    ))
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isSyncing && googleEvents.length === 0 && localAppEvents.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm border-t border-gray-200">
            לחצי על משבצת זמן כלשהי ליצירת פעילות, או לחצי על "סנכרן עם Google Calendar".
          </div>
        )}
      </div>

      {modal.isOpen && modal.day && (
        <NewEventModal
          key={`${modal.day.dayOfWeek}-${modal.time}`}
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
