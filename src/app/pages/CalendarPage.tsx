import { useState } from 'react';
import { CalendarHeader, CalendarViewType } from '../components/CalendarHeader';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { DailyCalendar } from '../components/DailyCalendar';
import { MonthlyCalendar } from '../components/MonthlyCalendar';
import { CalendarSidebar } from '../components/CalendarSidebar';
import { EventLegend } from '../components/EventLegend';
import { CalendarSyncProvider } from '../contexts/CalendarSyncContext';

export function CalendarPage() {
  const [viewType, setViewType] = useState<CalendarViewType>('weekly');

  return (
    <CalendarSyncProvider>
      <div className="min-h-screen bg-gray-50 pt-32" dir="rtl">
        <div className="flex">
          <div className="flex-1 mr-64 ml-64">
            <CalendarHeader viewType={viewType} onViewChange={setViewType} />

            <main className="p-8 pt-8">
              <div className="max-w-[1440px] mx-auto">
                {viewType !== 'monthly' && <EventLegend />}
                {viewType === 'weekly'  && <WeeklyCalendar />}
                {viewType === 'daily'   && <DailyCalendar />}
                {viewType === 'monthly' && <MonthlyCalendar />}
              </div>
            </main>
          </div>

          <CalendarSidebar />
        </div>
      </div>
    </CalendarSyncProvider>
  );
}
