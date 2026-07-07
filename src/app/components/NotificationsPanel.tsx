import { useEffect, useRef, useState } from 'react';
import { Bell, X, Calendar, Clock, Sparkles, Check, Users } from 'lucide-react';
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where, arrayRemove, arrayUnion, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';

const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

interface SessionInvite {
  id: string;
  createdByName: string;
  courseName: string;
  isGroup: boolean;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Notification {
  id: string;
  type: 'recommendation' | 'study' | 'lesson';
  title: string;
  description: string;
  time: string;
  read: boolean;
  courseId?: string;
}

interface CourseProgress {
  courseId: string;
  correctAnswers: number;
  totalAnswers: number;
  lastPracticedAt: { toDate?: () => Date } | null;
}

const COURSE_NAMES: Record<string, string> = {
  'calculus1': 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  'oop': 'תכנות מונחה עצמים',
  'html': 'HTML',
  'sql': 'SQL',
  'systems_analysis': 'אפיון ותכן',
  'cyber_security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

function daysAgoLabel(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
  if (days <= 0) return 'היום';
  if (days === 1) return 'אתמול';
  return `לפני ${days} ימים`;
}

function buildNotifications(
  selectedCourses: string[],
  progressMap: Record<string, CourseProgress>
): Notification[] {
  const items: Notification[] = [];
  const used = new Set<string>();

  const coursesWithProgress = selectedCourses
    .filter(id => progressMap[id] && progressMap[id].totalAnswers > 0)
    .sort((a, b) => {
      const accA = progressMap[a].correctAnswers / progressMap[a].totalAnswers;
      const accB = progressMap[b].correctAnswers / progressMap[b].totalAnswers;
      return accA - accB;
    });

  const unpracticed = selectedCourses.filter(
    id => !progressMap[id] || progressMap[id].totalAnswers === 0
  );

  // 1. Weakest course → AI recommendation to practice more
  if (coursesWithProgress.length > 0) {
    const id = coursesWithProgress[0];
    const acc = Math.round((progressMap[id].correctAnswers / progressMap[id].totalAnswers) * 100);
    if (acc < 80) {
      items.push({
        id: `rec-${id}`,
        type: 'recommendation',
        title: `המלצת AI: תגבור ב-${COURSE_NAMES[id] || id}`,
        description: `דיוק של ${acc}% — מומלץ לתרגל את הנושא בקרוב.`,
        time: 'היום',
        read: false,
        courseId: id,
      });
      used.add(id);
    }
  }

  // 2. Course not practiced in 7+ days → reminder
  const now = Date.now();
  const stale = coursesWithProgress.find(id => {
    if (used.has(id)) return false;
    const lu = progressMap[id]?.lastPracticedAt;
    if (!lu) return false;
    const date = lu.toDate ? lu.toDate() : new Date(lu as unknown as string);
    return now - date.getTime() > 7 * 24 * 60 * 60 * 1000;
  });
  if (stale) {
    const lu = progressMap[stale].lastPracticedAt;
    const date = lu?.toDate ? lu.toDate() : new Date();
    items.push({
      id: `study-${stale}`,
      type: 'study',
      title: `תזכורת לתרגול — ${COURSE_NAMES[stale] || stale}`,
      description: 'לא תרגלת קורס זה יותר משבוע — כדאי לחזור אליו.',
      time: daysAgoLabel(date),
      read: false,
      courseId: stale,
    });
    used.add(stale);
  }

  // 3. Unpracticed course → suggest starting
  for (const id of unpracticed) {
    if (items.length >= 4) break;
    items.push({
      id: `start-${id}`,
      type: 'recommendation',
      title: `התחל/י להתרגל ב-${COURSE_NAMES[id] || id}`,
      description: 'טרם תרגלת קורס זה — מומלץ להתחיל.',
      time: 'היום',
      read: false,
      courseId: id,
    });
  }

  // 4. Best course → positive reinforcement
  if (items.length < 4 && coursesWithProgress.length > 1) {
    const best = [...coursesWithProgress].reverse().find(id => !used.has(id));
    if (best) {
      const acc = Math.round((progressMap[best].correctAnswers / progressMap[best].totalAnswers) * 100);
      if (acc >= 85) {
        items.push({
          id: `good-${best}`,
          type: 'study',
          title: `כל הכבוד! ${acc}% דיוק ב-${COURSE_NAMES[best] || best}`,
          description: 'את/ה מצטיין/ת בקורס זה — המשך/י כך.',
          time: 'היום',
          read: true,
          courseId: best,
        });
      }
    }
  }

  return items;
}

function buildLessonReminders(
  docs: QueryDocumentSnapshot<DocumentData>[],
  userId: string
): Notification[] {
  const items: Notification[] = [];
  const now = new Date();
  const todayDow = now.getDay();
  const tomorrowDow = (todayDow + 1) % 7;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  docs.forEach(d => {
    const data = d.data();
    const acceptedBy: string[] = data.acceptedBy || [];
    const isCreator = data.createdBy === userId;
    const visible = isCreator ? acceptedBy.length > 0 : acceptedBy.includes(userId);
    if (!visible) return;

    let dayLabel: string | null = null;
    if (data.dayOfWeek === todayDow) {
      const [sh, sm] = (data.startTime || '0:0').split(':').map(Number);
      if (sh * 60 + sm >= nowMinutes) dayLabel = 'היום';
    } else if (data.dayOfWeek === tomorrowDow) {
      dayLabel = 'מחר';
    }
    if (!dayLabel) return;

    const otherName = isCreator ? data.participants?.[0]?.fullName : data.createdByName;
    const title = data.isGroup
      ? `תזכורת: שיעור קבוצתי — ${data.courseName}`
      : `תזכורת: שיעור עם ${otherName} — ${data.courseName}`;

    items.push({
      id: `lesson-${d.id}`,
      type: 'lesson',
      title,
      description: `${dayLabel} בשעה ${data.startTime}–${data.endTime}`,
      time: dayLabel,
      read: false,
      courseId: data.courseId,
    });
  });

  return items;
}

const typeConfig = {
  recommendation: { icon: Sparkles, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  study:          { icon: Calendar, color: 'text-teal-500',   bg: 'bg-teal-50'   },
  lesson:         { icon: Clock,    color: 'text-purple-500', bg: 'bg-purple-50' },
};

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { user } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Notification[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [invites, setInvites] = useState<SessionInvite[]>([]);

  const deleteNotification = (id: string) =>
    setItems(prev => prev.filter(n => n.id !== id));

  useEffect(() => {
    if (!user?.userId) {
      setItems([]);
      setLoadingItems(false);
      return;
    }

    const load = async () => {
      setLoadingItems(true);
      const selectedCourses = user.selectedCourses || [];

      const [progressSnap, sessionsSnap] = await Promise.all([
        getDocs(query(collection(db, 'course_progress'), where('userId', '==', user.userId))),
        getDocs(query(collection(db, 'studySessions'), where('participantIds', 'array-contains', user.userId))),
      ]);

      const progressMap: Record<string, CourseProgress> = {};
      progressSnap.docs.forEach(d => {
        const data = d.data() as CourseProgress;
        progressMap[data.courseId] = data;
      });

      const lessonItems = buildLessonReminders(sessionsSnap.docs, user.userId);
      setItems([...lessonItems, ...buildNotifications(selectedCourses, progressMap)]);
      setLoadingItems(false);
    };

    load();
  }, [user?.userId]);

  useEffect(() => {
    if (!user?.userId) {
      setInvites([]);
      return;
    }

    const q = query(collection(db, 'studySessions'), where('pendingFor', 'array-contains', user.userId));
    const unsubscribe = onSnapshot(q, (snap) => {
      setInvites(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          createdByName: data.createdByName,
          courseName: data.courseName,
          isGroup: data.isGroup,
          dayOfWeek: data.dayOfWeek,
          startTime: data.startTime,
          endTime: data.endTime,
        };
      }));
    });

    return () => unsubscribe();
  }, [user?.userId]);

  const respondToInvite = async (inviteId: string, accept: boolean) => {
    if (!user?.userId) return;
    const sessionRef = doc(db, 'studySessions', inviteId);
    await updateDoc(sessionRef, {
      pendingFor: arrayRemove(user.userId),
      ...(accept
        ? { acceptedBy: arrayUnion(user.userId) }
        : { declinedBy: arrayUnion(user.userId) }),
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed right-8 top-20 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[200] overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-500" />
          <h3 className="font-bold text-gray-900">התראות</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Notifications list */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
        {loadingItems ? (
          <div className="space-y-2 p-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : invites.length === 0 && items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            אין התראות חדשות
          </div>
        ) : (
          <>
            {invites.map(inv => (
              <div key={inv.id} className="flex items-start gap-3 px-5 py-4 bg-teal-50/40">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {inv.isGroup ? <Users className="w-4 h-4 text-teal-600" /> : <Calendar className="w-4 h-4 text-teal-600" />}
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {inv.isGroup
                      ? `${inv.createdByName} הזמינה אותך לשיעור קבוצתי`
                      : `${inv.createdByName} הזמינה אותך לשיעור משותף`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {inv.courseName} • יום {DAY_NAMES[inv.dayOfWeek]}, {inv.startTime}–{inv.endTime}
                  </p>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <button
                      onClick={() => respondToInvite(inv.id, false)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      דחה
                    </button>
                    <button
                      onClick={() => respondToInvite(inv.id, true)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      אשר
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {items.map(n => {
            const { icon: Icon, color, bg } = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors group ${!n.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold truncate ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {n.title}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.description}</p>
                </div>
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="flex-shrink-0 p-1 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 mt-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          </>
        )}
      </div>
    </div>
  );
}
