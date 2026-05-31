import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useCalendarSync } from '../contexts/CalendarSyncContext';

export function CalendarHeader() {
  const { syncFromGoogleCalendar, isSyncing, weekStart, goToPrevWeek, goToNextWeek } = useCalendarSync();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });

  const handleSync = async () => {
    setSyncStatus('idle');
    const success = await syncFromGoogleCalendar();
    setSyncStatus(success ? 'success' : 'error');
    if (success) setTimeout(() => setSyncStatus('idle'), 3000);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">לוח זמנים חכם</h1>
            <p className="text-gray-600 mt-1">ניהול שבועי מותאם אישית</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className={`gap-2 ${syncStatus === 'success' ? 'bg-green-50 border-green-500 text-green-700' : syncStatus === 'error' ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
              onClick={handleSync}
              disabled={isSyncing}
            >
              <CalendarIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing
                ? 'מסנכרן...'
                : syncStatus === 'success'
                  ? '✓ סונכרן בהצלחה'
                  : syncStatus === 'error'
                    ? '✗ שגיאה בסנכרון'
                    : 'סנכרן עם Google Calendar'}
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-700">תצוגה שבועית</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goToNextWeek}>
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="text-center min-w-[280px]">
              <div className="text-lg font-semibold text-gray-900">
                {formatDate(weekStart)} - {formatDate(weekEnd)}
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={goToPrevWeek}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}