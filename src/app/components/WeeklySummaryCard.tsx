import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Star, Loader2, RefreshCw } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/card';

const COURSE_NAMES: Record<string, string> = {
  calculus1: 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  oop: 'תכנות מונחה עצמים',
  html: 'HTML',
  sql: 'SQL',
  'systems_analysis': 'אפיון ותכן',
  'cyber_security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

const SECTION_META: Record<string, { icon: typeof TrendingUp; color: string; bg: string }> = {
  'מה הלך טוב': { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  'מה דורש שיפור': { icon: TrendingDown, color: 'text-orange-600', bg: 'bg-orange-50' },
  'המלצות לשבוע הבא': { icon: Star, color: 'text-blue-600', bg: 'bg-blue-50' },
};

const SECTION_HEADERS = Object.keys(SECTION_META);

function parseSummary(text: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = [];

  for (let i = 0; i < SECTION_HEADERS.length; i++) {
    const header = `${SECTION_HEADERS[i]}:`;
    const start = text.indexOf(header);
    if (start === -1) continue;

    const bodyStart = start + header.length;
    let bodyEnd = text.length;
    for (let j = 0; j < SECTION_HEADERS.length; j++) {
      if (j === i) continue;
      const nextStart = text.indexOf(`${SECTION_HEADERS[j]}:`, bodyStart);
      if (nextStart !== -1 && nextStart < bodyEnd) bodyEnd = nextStart;
    }

    sections.push({ title: SECTION_HEADERS[i], body: text.slice(bodyStart, bodyEnd).trim() });
  }

  return sections;
}

export function WeeklySummaryCard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.userId || user.weeklySummaryEnabled === false) return;
    generateSummary();
  }, [user?.userId]);

  const generateSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const userId = user?.userId || 'user_1';

      const progressSnap = await getDocs(
        query(collection(db, 'course_progress'), where('userId', '==', userId))
      );
      const progressData = progressSnap.docs.map(d => d.data());

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

  if (user?.weeklySummaryEnabled === false) return null;

  const sections = summary ? parseSummary(summary) : [];

  return (
      <Card className="overflow-hidden border-gray-100">
        <div className="bg-gradient-to-l from-teal-500 to-teal-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">הסיכום השבועי שלי</h2>
              <Sparkles className="w-5 h-5" />
            </div>
            <button
              onClick={generateSummary}
              disabled={loading}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              title="רענן סיכום"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-teal-100 text-sm mt-1 text-right">מופק על ידי AI על בסיס נתוני הלמידה שלך</p>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
              <p className="text-gray-500 text-sm">ה-AI מנתח את הנתונים שלך...</p>
            </div>
          )}

          {!loading && error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-right">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && sections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map(section => {
                const meta = SECTION_META[section.title];
                const Icon = meta.icon;
                return (
                  <div key={section.title} className={`rounded-xl p-4 ${meta.bg}`}>
                    <div className="flex items-center gap-2 justify-start mb-2">
                      <Icon className={`w-4 h-4 ${meta.color}`} />
                      <h3 className={`font-semibold ${meta.color}`}>{section.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed text-right whitespace-pre-wrap">
                      {section.body}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && sections.length === 0 && summary && (
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap text-right">{summary}</p>
          )}
        </div>
      </Card>
  );
}
