import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import { CalendarEvent } from './CalendarEvent';

interface CalendarEventData {
  id: string;
  type: 'lecture' | 'tutorial' | 'self-study' | 'ai-recommended' | 'deadline';
  title: string;
  location?: string;
  startTime: string; // ISO format: "2024-02-23T09:00:00"
  duration: number; // in hours
}

const daysOfWeek = [
  { key: 'sun', label: 'ראשון', date: '23/2' },
  { key: 'mon', label: 'שני', date: '24/2' },
  { key: 'tue', label: 'שלישי', date: '25/2' },
  { key: 'wed', label: 'רביעי', date: '26/2' },
  { key: 'thu', label: 'חמישי', date: '27/2' },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

// Default sample events (fallback if no Firestore data)
const defaultEvents: { [key: string]: any[] } = {
  sun: [
    { type: 'lecture', title: 'אבטחת מידע', location: '', time: '09:00-11:00', duration: 2, top: 60 },
    { type: 'ai-recommended', title: 'תרגול SQL Joins', location: 'למידה עצמית', time: '14:00-16:00', duration: 2, top: 360 },
  ],
  mon: [
    { type: 'tutorial', title: 'תרגול - מסדי נתונים', location: 'מעבדה 3', time: '10:00-12:00', duration: 2, top: 120 },
    { type: 'self-study', title: 'חזרה על חומר', location: 'ספרייה', time: '13:00-15:00', duration: 2, top: 300 },
    { type: 'lecture', title: 'מבני נתונים', location: '', time: '16:00-18:00', duration: 2, top: 480 },
  ],
  tue: [
    { type: 'lecture', title: 'HTML', location: '', time: '09:00-11:00', duration: 2, top: 60 },
    { type: 'deadline', title: 'הגשת מטלה - אפיון ותכנון', location: 'Moodle', time: '21:00', duration: 2, top: 780 },
  ],
  wed: [
    { type: 'lecture', title: 'אפיון ותכן', location: '', time: '10:00-12:00', duration: 2, top: 120 },
    { type: 'tutorial', title: 'תרגול UML', location: 'מעבדה 5', time: '14:00-16:00', duration: 2, top: 360 },
  ],
  thu: [
    { type: 'self-study', title: 'הכנה לבחינה', location: 'בית', time: '09:00-12:00', duration: 3, top: 60 },
    { type: 'lecture', title: 'אבטחת מידע', location: '', time: '17:00-19:00', duration: 2, top: 540 },
  ],
};

function getTimeToPixels(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const startHour = 8;
  return (hours - startHour) * 60 + minutes;
}

function getDayKeyFromDate(dateString: string): string {
  // dateString is in ISO format: "2024-02-23T09:00:00"
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const dayMap: { [key: number]: string } = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
  };
  return dayMap[dayOfWeek] || 'sun';
}

function convertFirestoreToDisplayFormat(firestoreEvents: CalendarEventData[]): { [key: string]: any[] } {
  const displayEvents: { [key: string]: any[] } = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
  };

  firestoreEvents.forEach((event) => {
    const dayKey = getDayKeyFromDate(event.startTime);
    const startTime = event.startTime.split('T')[1]?.substring(0, 5) || '08:00';
    const endTime = new Date(new Date(event.startTime).getTime() + event.duration * 60 * 60 * 1000)
      .toTimeString()
      .substring(0, 5);

    displayEvents[dayKey].push({
      type: event.type,
      title: event.title,
      location: event.location || '',
      time: `${startTime}-${endTime}`,
      duration: event.duration,
      top: getTimeToPixels(startTime),
    });
  });

  return displayEvents;
}

export function WeeklyCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState(defaultEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCalendarEvents = async () => {
      try {
        if (!user) {
          setEvents(defaultEvents);
          setLoading(false);
          return;
        }

        // Query calendar events from Firestore
        const eventsRef = collection(db, 'users', user.userId, 'calendar_events');
        const q = query(eventsRef);
        const snapshot = await getDocs(q);

        const firestoreEvents: CalendarEventData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CalendarEventData[];

        if (firestoreEvents.length > 0) {
          // Use Firestore events
          setEvents(convertFirestoreToDisplayFormat(firestoreEvents));
        } else {
          // No events yet, use defaults
          setEvents(defaultEvents);
        }
      } catch (error) {
        console.error('Error loading calendar events:', error);
        // Fall back to default events on error
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    };

    loadCalendarEvents();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex items-center justify-center">
        <p className="text-gray-600">טוען אירועים...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Days Header */}
      <div className="grid border-b border-gray-200 bg-gray-50" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
        <div className="p-4 border-l border-gray-200"></div>
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
            <div
              key={time}
              className="h-[60px] border-b border-gray-200 px-3 py-2 text-sm text-gray-600 text-right"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {daysOfWeek.map((day) => (
          <div key={day.key} className="border-l border-gray-200 relative">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-[60px] border-b border-gray-200 hover:bg-blue-50/30 transition-colors"
              ></div>
            ))}

            {/* Events for this day */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative h-full pointer-events-auto">
                {events[day.key]?.map((event, index) => (
                  <CalendarEvent key={index} {...event} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
