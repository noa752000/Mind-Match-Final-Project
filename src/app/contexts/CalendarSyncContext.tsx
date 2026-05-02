import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

interface CalendarSyncContextType {
  syncToGoogleCalendar: () => Promise<boolean>;
  syncFromGoogleCalendar: () => Promise<boolean>;
  isSyncing: boolean;
}

const CalendarSyncContext = createContext<CalendarSyncContextType | undefined>(undefined);

export function CalendarSyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = React.useState(false);

  const getGoogleAccessToken = async (): Promise<string | null> => {
    try {
      // Firebase automatically stores Google OAuth tokens
      const tokenResult = await (window as any).gapi?.auth2?.getAuthInstance()?.currentUser?.get()?.getAuthResponse()?.id_token;

      if (tokenResult) {
        return tokenResult;
      }

      // Alternative: Get from Firebase user
      const currentUser = (window as any).firebase?.auth?.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        return token;
      }

      return null;
    } catch (error) {
      console.error('Error getting Google access token:', error);
      return null;
    }
  };

  const syncToGoogleCalendar = async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      if (!user) {
        console.error('User not authenticated');
        return false;
      }

      // Get access token
      const token = await getGoogleAccessToken();
      if (!token) {
        console.error('Could not get Google access token');
        return false;
      }

      // TODO: Fetch events from Firestore
      // For now, show mock implementation
      console.log('Syncing to Google Calendar for user:', user.userId);

      // Mock implementation - in production, this would:
      // 1. Fetch all Mind-Match events from Firestore
      // 2. Call Google Calendar API to create/update events
      // 3. Store google calendar event IDs in Firestore for future syncing

      return true;
    } catch (error) {
      console.error('Error syncing to Google Calendar:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const syncFromGoogleCalendar = async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      if (!user) {
        console.error('User not authenticated');
        return false;
      }

      // Get access token
      const token = await getGoogleAccessToken();
      if (!token) {
        console.error('Could not get Google access token');
        return false;
      }

      // TODO: Fetch Google Calendar events
      // For now, show mock implementation
      console.log('Syncing from Google Calendar for user:', user.userId);

      // Mock implementation - in production, this would:
      // 1. Call Google Calendar API to fetch user's events
      // 2. Filter for relevant events (e.g., this week)
      // 3. Create events in Firestore if they don't already exist
      // 4. Store google calendar event IDs for future syncing

      return true;
    } catch (error) {
      console.error('Error syncing from Google Calendar:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <CalendarSyncContext.Provider value={{ syncToGoogleCalendar, syncFromGoogleCalendar, isSyncing }}>
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
