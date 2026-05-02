import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Download, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useCalendarSync } from '../contexts/CalendarSyncContext';

export function CalendarHeader() {
  const { syncToGoogleCalendar, syncFromGoogleCalendar, isSyncing } = useCalendarSync();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Sunday

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4); // Thursday

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
  };

  // Google Calendar Sync Handler
  const handleGoogleCalendarSync = async () => {
    setSyncStatus('idle');

    try {
      // Sync both directions:
      // 1. Push Mind-Match events to Google Calendar
      // 2. Pull Google Calendar events to Mind-Match
      const toGoogleSuccess = await syncToGoogleCalendar();
      const fromGoogleSuccess = await syncFromGoogleCalendar();

      if (toGoogleSuccess && fromGoogleSuccess) {
        setSyncStatus('success');
        // Reset status after 3 seconds
        setTimeout(() => {
          setSyncStatus('idle');
        }, 3000);
        console.log('Google Calendar sync completed');
      } else {
        setSyncStatus('error');
      }
    } catch (error) {
      setSyncStatus('error');
      console.error('Failed to sync with Google Calendar:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900">לוח זמנים חכם</h1>
              <p className="text-gray-600 mt-1">ניהול שבועי מותאם אישית</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              ייצא
            </Button>
            <Button
              variant="outline"
              className={`gap-2 ${syncStatus === 'success' ? 'bg-green-50 border-green-500 text-green-700' : syncStatus === 'error' ? 'bg-red-50 border-red-500 text-red-700' : ''}`}
              onClick={handleGoogleCalendarSync}
              disabled={isSyncing}
            >
              <CalendarIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'מסנכרן...' : syncStatus === 'success' ? '✓ סונכרן בהצלחה' : syncStatus === 'error' ? '✗ שגיאה בסנכרון' : 'סנכרן עם Google Calendar'}
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
            <Badge variant="outline">תצוגה חודשית</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="text-center min-w-[280px]">
              <div className="text-lg font-semibold text-gray-900">
                {formatDate(weekStart)} - {formatDate(weekEnd)}
              </div>
              <div className="text-sm text-gray-600">שבוע 8, סמסטר א׳</div>
            </div>

            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}