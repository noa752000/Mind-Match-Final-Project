import { useEffect, useState } from 'react';
import { X, Sparkles, TrendingUp, TrendingDown, Star, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';

interface WeeklySummaryModalProps {
  onClose: () => void;
}

const COURSE_NAMES: Record<string, string> = {
  calculus1: 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  oop: 'תכנות מונחה עצמים',
  html: 'HTML',
  sql: 'SQL',
  'requirements-design': 'אפיון ותכן',
  'information-security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

export function WeeklySummaryModal({ onClose }: WeeklySummaryModalProps) {
  const { user } = useAuth();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    generateSummary();
  }, []);

  const generateSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const userId = user?.userId || 'user_1';

      // Fetch course progress
      const progressSnap = await getDocs(
        query(collection(db, 'course_progress'), where('userId', '==', userId))
      );
      const progressData = progressSnap.docs.map(d => d.data());

      // Fetch practice results
      const resultsSnap = await getDocs(
        query(collection(db, 'practice_results'), where('userId', '==', userId))
      );
      const resultsData = resultsSnap.docs.map(d => d.data());

      // Build data summary for AI
      const courseStats = progressData.map(p => {
        const name = COURSE_NAMES[p.courseId] || p.courseId;
        const accuracy = p.totalAnswers > 0
          ? Math.round((p.correctAnswers / p.totalAnswers) * 100)
          : 0;
        return `• ${name}: ${accuracy}% דיוק, ${p.totalAnswers || 0} שאלות, ${p.practicedMinutes || 0} דקות תרגול`;
      }).join('\n');

      const totalQuestions = progressData.reduce((s, p) => s + (p.totalAnswers || 0), 0);
      const totalMinutes = progressData.reduce((s, p) => s + (p.practicedMinutes || 0), 0);
      const avgAccuracy = progressData.length > 0
        ? Math.round(progressData.reduce((s, p) =>
            s + (p.totalAnswers > 0 ? (p.correctAnswers / p.totalAnswers) * 100 : 0), 0
          ) / progressData.length)
        : 0;

      const selectedCourses = (user?.selectedCourses || [])
        .map(id => COURSE_NAMES[id] || id).join(', ');

      const dataForAI = `
נתוני הלמידה של הסטודנט השבוע:
קורסים פעילים: ${selectedCourses || 'טרם נבחרו'}
סה"כ שאלות שנענו: ${totalQuestions}
סה"כ זמן תרגול: ${totalMinutes} דקות
דיוק ממוצע: ${avgAccuracy}%

פירוט לפי קורס:
${courseStats || 'אין נתוני תרגול עדיין'}
      `.trim();

      // Call Groq via Vite proxy
      const response = await fetch('/api/groq/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 800,
          messages: [
            {
              role: 'system',
              content: `אתה מנתח למידה AI של פלטפורמת MindMatch.
כתוב סיכום שבועי אישי בעברית לסטודנט.
הסיכום צריך להיות:
- חם ומעודד אך כנה
- מחולק לשלושה סעיפים עם כותרות: "מה הלך טוב:", "מה דורש שיפור:", "המלצות לשבוע הבא:"
- ללא אימוגים בכלל
- מבוסס על הנתונים בלבד
- עד 250 מילים
- ללא כותרת "סיכום שבועי" — תתחיל ישירות`
            },
            {
              role: 'user',
              content: dataForAI
            }
          ]
        })
      });

      if (!response.ok) throw new Error('שגיאה בחיבור ל-AI');
      const data = await response.json();
      setSummary(data.choices?.[0]?.message?.content || 'לא ניתן לייצר סיכום');
    } catch (err: any) {
      setError(err?.message || 'אירעה שגיאה בייצור הסיכום');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-teal-500 to-teal-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-lg font-bold">הסיכום השבועי שלי</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-teal-100 text-sm mt-1 text-right">
            מופק על ידי AI על בסיס נתוני הלמידה שלך
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
              <p className="text-gray-500 text-sm">ה-AI מנתח את הנתונים שלך...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-right">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap text-right">
              {summary}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <button
              onClick={generateSummary}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              ↻ רענן סיכום
            </button>
            <p className="text-xs text-gray-400">מופיע כל יום ראשון</p>
          </div>
        )}
      </div>
    </div>
  );
}
