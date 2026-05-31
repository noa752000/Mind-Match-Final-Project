import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from './AuthContext';

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

interface CalendarSyncContextType {
  syncFromGoogleCalendar: () => Promise<boolean>;
  isSyncing: boolean;
  googleEvents: GoogleCalendarEvent[];
  weekStart: Date;
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
}

const CalendarSyncContext = createContext<CalendarSyncContextType | undefined>(undefined);

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // back to Sunday
  d.setHours(0, 0, 0, 0);
  return d;
}

export function CalendarSyncProvider({ children }: { children: React.ReactNode }) {
  const { googleAccessToken } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()));

  // Auto-sync when access token becomes available
  useEffect(() => {
    if (googleAccessToken) {
      syncFromGoogleCalendar();
    }
  }, [googleAccessToken]);

  const getAccessToken = async (): Promise<string | null> => {
    // Use token from login if available
    if (googleAccessToken) return googleAccessToken;

    // Otherwise re-trigger Google sign-in with calendar scope to get token
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/calendar');
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return credential?.accessToken || null;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  };

  const syncFromGoogleCalendar = async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        console.error('No Google access token available');
        return false;
      }

      // Fetch events for the displayed week (Sunday to Saturday)
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const params = new URLSearchParams({
        timeMin: weekStart.toISOString(),
        timeMax: weekEnd.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
        maxResults: '100',
      });

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error('Google Calendar API error:', err);
        return false;
      }

      const data = await response.json();
      setGoogleEvents(data.items || []);
      return true;
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const goToPrevWeek = () => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const goToNextWeek = () => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  // Re-sync when week changes
  useEffect(() => {
    if (googleAccessToken) {
      syncFromGoogleCalendar();
    }
  }, [weekStart]);

  return (
    <CalendarSyncContext.Provider value={{
      syncFromGoogleCalendar,
      isSyncing,
      googleEvents,
      weekStart,
      goToPrevWeek,
      goToNextWeek,
    }}>
      {children}
    </CalendarSyncContext.Provider>
  );
}

export function useCalendarSync() {
  const context = useContext(CalendarSyncContext);
  if (context === undefined) {
    throw new Error('useCalendarSync must be used within a CalendarSyncProvider');
  }
  return context;
}
