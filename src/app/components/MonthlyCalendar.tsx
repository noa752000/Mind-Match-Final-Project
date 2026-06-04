import { useMemo } from 'react';
import { useCalendarSync } from '../contexts/CalendarSyncContext';

const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const EVENT_COLORS: Record<string, string> = {
  lecture: 'bg-blue-400',
  tutorial: 'bg-purple-400',
  'self-study': 'bg-green-400',
  deadline: 'bg-red-400',
};

export function MonthlyCalendar() {
  const { weekStart, googleEvents, localAppEvents } = useCalendarSync();

  const year = weekStart.getFullYear();
  const month = weekStart.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Start from the Sunday before/on the first day
    const start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay());

    const cells: Date[] = [];
    const cur = new Date(start);
    while (cells.length < 42) {
      cells.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return { cells, firstDay, lastDay };
  }, [year, month]);

  const getEventsForDay = (date: Date) => {
    const dow = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    const events: { title: string; type: string }[] = [];

    googleEvents.forEach(e => {
      if (e.start.dateTime) {
        const evDate = new Date(e.start.dateTime).toISOString().split('T')[0];
        if (evDate === dateStr) events.push({ title: e.summary || 'אירוע', type: 'lecture' });
      }
    });

    localAppEvents.filter(e => e.dayOfWeek === dow).forEach(e => {
      events.push({ title: e.title, type: e.type });
    });

    return events;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" dir="rtl">
      {/* Day names header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {DAY_NAMES.map(d => (
          <div key={d} className="p-3 text-center text-sm font-semibold text-gray-600 border-l border-gray-200 first:border-l-0">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.cells.map((date, i) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday = date.getTime() === today.getTime();
          const dayEvents = getEventsForDay(date);

          return (
            <div
              key={i}
              className={`min-h-[110px] p-2 border-b border-l border-gray-100 first:border-l-0 ${
                !isCurrentMonth ? 'bg-gray-50' : 'bg-white hover:bg-gray-50 transition-colors'
              }`}
            >
              {/* Day number */}
              <div className="flex justify-end mb-1">
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday
                    ? 'bg-teal-600 text-white'
                    : isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-300'
                }`}>
                  {date.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((ev, j) => (
                  <div
                    key={j}
                    className={`${EVENT_COLORS[ev.type] || 'bg-gray-400'} text-white text-xs rounded px-1.5 py-0.5 truncate`}
                  >
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-400 text-right">+{dayEvents.length - 3} עוד</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
