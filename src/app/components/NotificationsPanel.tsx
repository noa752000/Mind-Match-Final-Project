import { useEffect, useRef, useState } from 'react';
import { Bell, X, BookOpen, Calendar, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export interface Notification {
  id: string;
  type: 'recommendation' | 'exam' | 'deadline' | 'study';
  title: string;
  description: string;
  time: string;
  read: boolean;
  courseId?: string;
}

const COURSE_NAMES: Record<string, string> = {
  'calculus1': 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  'oop': 'תכנות מונחה עצמים',
  'html': 'HTML',
  'sql': 'SQL',
  'requirements-design': 'אפיון ותכן',
  'information-security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

function buildNotifications(selectedCourses: string[]): Notification[] {
  const base: Notification[] = [
    {
      id: 'rec-sql',
      type: 'recommendation',
      title: 'המלצת AI: תגבור SQL',
      description: 'זוהתה חולשה בנושא JOINs — מומלץ לתרגל לפני הבחינה הקרובה.',
      time: 'לפני שעה',
      read: false,
      courseId: 'sql',
    },
    {
      id: 'exam-mis',
      type: 'exam',
      title: 'בחינה — כלכלת מערכות מידע',
      description: 'בחינה ביום ראשון הקרוב, 10:00. הכינו את הנושאים: ROI, NPV, ניהול פרויקטים.',
      time: 'לפני 3 שעות',
      read: false,
      courseId: 'mis-economics',
    },
    {
      id: 'deadline-security',
      type: 'deadline',
      title: 'מטלה דחופה — אבטחת מידע',
      description: 'מועד הגשה: יום ג׳ ב-23:59. נותרו פחות מ-48 שעות.',
      time: 'לפני 5 שעות',
      read: false,
      courseId: 'information-security',
    },
    {
      id: 'rec-morning',
      type: 'study',
      title: 'טיפ למידה',
      description: 'הנתונים מראים שהציונים שלך גבוהים יותר בשעות הבוקר (10:00–14:00).',
      time: 'אתמול',
      read: true,
    },
    {
      id: 'rec-calculus',
      type: 'recommendation',
      title: 'המלצת AI: אינטגרלים',
      description: 'לא תרגלת חדו"א השבוע — מומלץ להקדיש שעה לאינטגרלים.',
      time: 'אתמול',
      read: true,
      courseId: 'calculus1',
    },
  ];

  // Sort: user's courses first, then others
  return base.sort((a, b) => {
    const aRelevant = !a.courseId || selectedCourses.includes(a.courseId);
    const bRelevant = !b.courseId || selectedCourses.includes(b.courseId);
    if (aRelevant && !bRelevant) return -1;
    if (!aRelevant && bRelevant) return 1;
    return 0;
  });
}

const typeConfig = {
  recommendation: { icon: Sparkles, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  exam:           { icon: BookOpen, color: 'text-blue-500',   bg: 'bg-blue-50'   },
  deadline:       { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50'    },
  study:          { icon: Calendar, color: 'text-teal-500',   bg: 'bg-teal-50'   },
};

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { user } = useAuth();
  const panelRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(() => buildNotifications(user?.selectedCourses ?? []));
  const unread = items.filter(n => !n.read).length;

  const deleteNotification = (id: string) =>
    setItems(prev => prev.filter(n => n.id !== id));

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
        {items.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            אין התראות חדשות
          </div>
        ) : (
          items.map(n => {
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
          })
        )}
      </div>
    </div>
  );
}
