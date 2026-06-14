import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuth } from './AuthContext';

export type EventType = 'lecture' | 'tutorial' | 'self-study' | 'deadline';

export interface LocalAppEvent {
  id: string;
  dayOfWeek: number;
  type: EventType;
  title: string;
  location?: string;
  time: string;
  duration: number;
  top: number;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export interface CreateGoogleEventParams {
  title: string;
  startDateTime: string;
  endDateTime: string;
  description?: string;
}

interface CalendarSyncContextType {
  syncFromGoogleCalendar: () => Promise<boolean>;
  isSyncing: boolean;
  googleEvents: GoogleCalendarEvent[];
  weekStart: Date;
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
  goToPrevDay: () => void;
  goToNextDay: () => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  localAppEvents: LocalAppEvent[];
  addLocalAppEvent: (event: LocalAppEvent) => void;
  createGoogleCalendarEvent: (params: CreateGoogleEventParams) => Promise<boolean>;
}

const CalendarSyncContext = createContext<CalendarSyncContextType | undefined>(undefined);

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // back to Sunday
  d.setHours(0, 0, 0, 0);
  return d;
}

export function CalendarSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, googleAccessToken } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [localAppEvents, setLocalAppEvents] = useState<LocalAppEvent[]>([]);
  const [confirmedSessions, setConfirmedSessions] = useState<LocalAppEvent[]>([]);
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()));

  // Subscribe to confirmed study sessions shared with other users
  useEffect(() => {
    if (!user?.userId) {
      setConfirmedSessions([]);
      return;
    }

    const q = query(collection(db, 'studySessions'), where('participantIds', 'array-contains', user.userId));
    const unsubscribe = onSnapshot(q, (snap) => {
      const sessions: LocalAppEvent[] = [];
      snap.docs.forEach(d => {
        const data = d.data();
        const acceptedBy: string[] = data.acceptedBy || [];
        const isCreator = data.createdBy === user.userId;
        const visible = isCreator ? acceptedBy.length > 0 : acceptedBy.includes(user.userId);
        if (!visible) return;

        const otherName = isCreator
          ? (data.participants?.[0]?.fullName || '')
          : data.createdByName;
        const title = data.isGroup
          ? `שיעור קבוצתי — ${data.courseName}`
          : `שיעור עם ${otherName} — ${data.courseName}`;

        sessions.push({
          id: d.id,
          dayOfWeek: data.dayOfWeek,
          type: 'lecture',
          title,
          time: data.time,
          duration: data.duration,
          top: data.top,
        });
      });
      setConfirmedSessions(sessions);
    });

    return () => unsubscribe();
  }, [user?.userId]);

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

  const goToNextWeek = () => setWeekStart(prev => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; });
  const goToPrevDay = () => setWeekStart(prev => { const d = new Date(prev); d.setDate(d.getDate() - 1); return d; });
  const goToNextDay = () => setWeekStart(prev => { const d = new Date(prev); d.setDate(d.getDate() + 1); return d; });
  const goToPrevMonth = () => setWeekStart(prev => { const d = new Date(prev); d.setMonth(d.getMonth() - 1); return d; });
  const goToNextMonth = () => setWeekStart(prev => { const d = new Date(prev); d.setMonth(d.getMonth() + 1); return d; });

  const addLocalAppEvent = (event: LocalAppEvent) => {
    setLocalAppEvents(prev => [...prev, event]);
  };

  const createGoogleCalendarEvent = async (params: CreateGoogleEventParams): Promise<boolean> => {
    try {
      const token = await getAccessToken();
      if (!token) return false;

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary: params.title,
            description: params.description,
            start: { dateTime: params.startDateTime, timeZone: 'Asia/Jerusalem' },
            end: { dateTime: params.endDateTime, timeZone: 'Asia/Jerusalem' },
          }),
        }
      );

      if (!response.ok) {
        console.error('Failed to create Google Calendar event:', await response.json());
        return false;
      }

      await syncFromGoogleCalendar();
      return true;
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      return false;
    }
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
      goToPrevDay,
      goToNextDay,
      goToPrevMonth,
      goToNextMonth,
      localAppEvents: [...localAppEvents, ...confirmedSessions],
      addLocalAppEvent,
      createGoogleCalendarEvent,
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
