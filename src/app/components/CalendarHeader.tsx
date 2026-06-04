import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useCalendarSync } from '../contexts/CalendarSyncContext';

export type CalendarViewType = 'daily' | 'weekly' | 'monthly';

interface CalendarHeaderProps {
  viewType: CalendarViewType;
  onViewChange: (v: CalendarViewType) => void;
}

const VIEW_LABELS: Record<CalendarViewType, string> = {
  daily: 'יומי',
  weekly: 'שבועי',
  monthly: 'חודשי',
};

export function CalendarHeader({ viewType, onViewChange }: CalendarHeaderProps) {
  const {
    syncFromGoogleCalendar, isSyncing, weekStart,
    goToPrevWeek, goToNextWeek,
    goToPrevDay, goToNextDay,
    goToPrevMonth, goToNextMonth,
  } = useCalendarSync();

  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSync = async () => {
    setSyncStatus('idle');
    const success = await syncFromGoogleCalendar();
    setSyncStatus(success ? 'success' : 'error');
    if (success) setTimeout(() => setSyncStatus('idle'), 3000);
  };

  const handlePrev = () => {
    if (viewType === 'daily') goToPrevDay();
    else if (viewType === 'weekly') goToPrevWeek();
    else goToPrevMonth();
  };

  const handleNext = () => {
    if (viewType === 'daily') goToNextDay();
    else if (viewType === 'weekly') goToNextWeek();
    else goToNextMonth();
  };

  const getTitle = () => {
    const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
      d.toLocaleDateString('he-IL', opts);

    if (viewType === 'daily') {
      return fmt(weekStart, { weekday: 'long', day: 'numeric', month: 'long' });
    }
    if (viewType === 'monthly') {
      return fmt(weekStart, { month: 'long', year: 'numeric' });
    }
    // weekly
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 4);
    return `${fmt(weekStart, { day: 'numeric', month: 'long' })} - ${fmt(weekEnd, { day: 'numeric', month: 'long' })}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">לוח זמנים חכם</h1>
            <p className="text-gray-600 mt-1">ניהול מותאם אישית</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className={`gap-2 ${syncStatus === 'success' ? 'bg-green-50 border-green-500 text-green-700' : syncStatus === 'error' ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
              onClick={handleSync}
              disabled={isSyncing}
            >
              <CalendarIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'מסנכרן...' : syncStatus === 'success' ? '✓ סונכרן' : syncStatus === 'error' ? '✗ שגיאה' : 'סנכרן עם Google Calendar'}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation + View Switcher */}
        <div className="flex items-center justify-between">
          {/* View switcher */}
          <div className="flex rounded-lg bg-gray-100 p-1 gap-1">
            {(['daily', 'weekly', 'monthly'] as CalendarViewType[]).map(v => (
              <button
                key={v}
                onClick={() => onViewChange(v)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewType === v
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {VIEW_LABELS[v]}
              </button>
            ))}
          </div>

          {/* Date navigation */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="text-center min-w-[260px]">
              <div className="text-lg font-semibold text-gray-900">{getTitle()}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handlePrev}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
