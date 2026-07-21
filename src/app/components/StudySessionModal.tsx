import { useState, useMemo } from 'react';
import { X, Calendar, Users, BookOpen, Clock, CheckCircle, Plus } from 'lucide-react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from './ui/button';
import { useCalendarSync } from '../contexts/CalendarSyncContext';
import { useAuth } from '../contexts/AuthContext';

interface Participant {
  userId: string;
  fullName: string;
  photoURL?: string;
}

interface StudySessionModalProps {
  participants: Participant[];
  onClose: () => void;
}

const COURSES = [
  { id: 'calculus1', name: 'חדו"א 1' },
  { id: 'linear-algebra', name: 'אלגברה לינארית' },
  { id: 'oop', name: 'תכנות מונחה עצמים' },
  { id: 'html', name: 'HTML' },
  { id: 'sql', name: 'SQL' },
  { id: 'systems_analysis', name: 'אפיון ותכן' },
  { id: 'cyber_security', name: 'אבטחת מידע' },
  { id: 'mis-economics', name: 'כלכלת מערכות מידע' },
];

const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const total = 8 * 60 + i * 30;
  const h = Math.floor(total / 60), m = total % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
});

const DAY_LABELS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];

export function StudySessionModal({ participants, onClose }: StudySessionModalProps) {
  const { weekStart } = useCalendarSync();
  const { user } = useAuth();
  const isGroup = participants.length > 1;

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [0, 1, 2, 3, 4].map(i => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return { label: DAY_LABELS[i], date: `${d.getDate()}/${d.getMonth() + 1}`, dow: d.getDay(), isPast: d < today };
    });
  }, [weekStart]);

  const [dayIdx, setDayIdx] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 5; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      if (d >= today) return i;
    }
    return 0;
  });
  
  const userSelectedCourses = user?.selectedCourses || [];
  const filteredCourses = COURSES.filter(c => userSelectedCourses.includes(c.id));
  const [courseId, setCourseId] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!courseId) { setError('בחר/י קורס'); return; }
    if (endTime <= startTime) { setError('שעת הסיום חייבת להיות אחרי שעת ההתחלה'); return; }
    if (!user) return;

    const day = days[dayIdx];
    const courseName = COURSES.find(c => c.id === courseId)?.name || courseId;

    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const duration = Math.max((eh * 60 + em - sh * 60 - sm) / 60, 0.5);
    const top = sh * 60 + sm;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'studySessions'), {
        createdBy: user.userId,
        createdByName: user.fullName || user.username,
        participants: participants.map(p => ({ userId: p.userId, fullName: p.fullName })),
        participantIds: [user.userId, ...participants.map(p => p.userId)],
        pendingFor: participants.map(p => p.userId),
        acceptedBy: [],
        declinedBy: [],
        courseId,
        courseName,
        isGroup,
        dayOfWeek: day.dow,
        startTime,
        endTime,
        time: `${startTime}–${endTime}`,
        duration,
        top,
        createdAt: Timestamp.now(),
      });

      setDone(true);
      setTimeout(onClose, 2500);
    } catch (e) {
      console.error('Failed to create study session invite:', e);
      setError('אירעה שגיאה בשליחת ההזמנה. נסה/י שוב.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-5 text-white bg-gradient-to-l ${isGroup ? 'from-purple-500 to-indigo-600' : 'from-teal-500 to-teal-600'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">
                {isGroup ? `שיעור קבוצתי (${participants.length})` : `שיעור עם ${participants[0]?.fullName}`}
              </h2>
              {isGroup ? <Users className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          {isGroup && (
            <div className="flex flex-wrap gap-1 mt-2 justify-end">
              {participants.map(p => (
                <span key={p.userId} className="text-xs bg-white/20 rounded-full px-2 py-0.5">{p.fullName}</span>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-5 space-y-4">
          {done ? (
            <div className="py-8 flex flex-col items-center gap-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="font-bold text-gray-900">ההזמנה נשלחה!</p>
              <p className="text-sm text-gray-500 text-center">
                {isGroup
                  ? 'חברי הקבוצה יקבלו התראה, והשיעור יתווסף ליומן לכל מי שיאשר'
                  : `${participants[0]?.fullName} יקבל/תקבל התראה, והשיעור יתווסף ליומן של שניכם לאחר האישור`}
              </p>
            </div>
          ) : (
            <>
              {/* Day */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">יום</label>
                <div className="grid grid-cols-5 gap-1">
                  {days.map((d, i) => (
                    <button key={i} disabled={d.isPast} onClick={() => setDayIdx(i)}
                      className={`flex flex-col items-center py-2 px-1 rounded-lg border text-xs font-medium transition-all ${
                        d.isPast
                          ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                          : dayIdx === i ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}>
                      <span>{d.label}</span>
                      <span className={`text-xs mt-0.5 ${
                        d.isPast ? 'text-gray-300' : dayIdx === i ? 'text-teal-100' : 'text-gray-400'
                      }`}>{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">קורס</label>
                {filteredCourses.length === 0 ? (
                  <div className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm bg-gray-50 text-gray-600">
                    לא נמצאו קורסים משויכים למשתמש
                  </div>
                ) : (
                  <select value={courseId} onChange={e => { setCourseId(e.target.value); setError(''); }}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white" dir="rtl">
                    <option value="">בחר/י קורס...</option>
                    {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
              </div>

              {/* Time */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">שעת התחלה</label>
                  <select value={startTime} onChange={e => { setStartTime(e.target.value); setError(''); }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 text-center bg-white">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">שעת סיום</label>
                  <select value={endTime} onChange={e => { setEndTime(e.target.value); setError(''); }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 text-center bg-white">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {error && <p className="text-red-600 text-sm text-right bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <Button onClick={handleCreate} disabled={submitting}
                className={`w-full text-white ${isGroup ? 'bg-gradient-to-l from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' : 'bg-teal-600 hover:bg-teal-700'}`}>
                <Plus className="w-4 h-4 ml-1.5" />
                {submitting ? 'שולח...' : isGroup ? 'שלח הזמנה לקבוצה' : 'שלח הזמנה'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
