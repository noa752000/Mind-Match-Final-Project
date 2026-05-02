import { CalendarHeader } from '../components/CalendarHeader';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { CalendarSidebar } from '../components/CalendarSidebar';
import { EventLegend } from '../components/EventLegend';
import { CalendarSyncProvider } from '../contexts/CalendarSyncContext';

export function CalendarPage() {
  return (
    <CalendarSyncProvider>
      <div className="min-h-screen bg-gray-50 pt-16" dir="rtl">
        <div className="flex">
          {/* Main Content - עם margin לשני הסרגלים */}
          <div className="flex-1 mr-64 ml-64">
            <CalendarHeader />

            <main className="p-8 pt-8">
              <div className="max-w-[1440px] mx-auto">
                <EventLegend />
                <WeeklyCalendar />
              </div>
            </main>
          </div>

          {/* Calendar Sidebar - Left side for RTL */}
          <CalendarSidebar />
        </div>
      </div>
    </CalendarSyncProvider>
  );
}