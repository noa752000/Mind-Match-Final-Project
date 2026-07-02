import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, GraduationCap, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

function formatDateLabel(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'היום';
  if (d.toDateString() === yesterday.toDateString()) return 'אתמול';
  return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isSameDay(a: number, b: number) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

interface AITutorPageProps {
  courseId?: string;
  onBack?: () => void;
}

const ALL_COURSES = [
  { id: 'calculus1',           title: 'חדו"א 1',               color: 'from-blue-500 to-blue-600',     emoji: '∫' },
  { id: 'linear-algebra',      title: 'אלגברה לינארית',         color: 'from-purple-500 to-purple-600', emoji: '⊕' },
  { id: 'oop',                  title: 'תכנות מונחה עצמים',       color: 'from-green-500 to-green-600',   emoji: '{}' },
  { id: 'html',                 title: 'HTML',                   color: 'from-orange-500 to-orange-600', emoji: '<>' },
  { id: 'sql',                  title: 'SQL',                    color: 'from-cyan-500 to-cyan-600',     emoji: '⊞' },
  { id: 'systems_analysis',     title: 'אפיון ותכן',             color: 'from-indigo-500 to-indigo-600', emoji: '⬡' },
  { id: 'cyber_security',       title: 'אבטחת מידע',            color: 'from-red-500 to-red-600',       emoji: '🔒' },
  { id: 'mis-economics',        title: 'כלכלת מערכות מידע',       color: 'from-amber-500 to-amber-600',   emoji: '₪' },
];

const SYSTEM_PROMPT = (courseName: string) =>
  `You are a professional academic tutor for the course "${courseName}" at an Israeli university. ` +
  `STRICT RULES: ` +
  `1. ALWAYS respond in Hebrew only. Never switch to English. ` +
  `2. Give complete, detailed explanations — never cut off mid-sentence. Always finish your answer fully. ` +
  `3. Structure your answer clearly: start with a brief definition, then explain in depth with examples, then summarize. ` +
  `4. Use a professional academic tone. No jokes, no roleplay, no asterisks. ` +
  `5. When showing code or formulas, use markdown code blocks.`;

async function callAI(messages: Message[], courseName: string): Promise<string> {
  const response = await fetch('/api/groq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT(courseName) },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.error?.message || `שגיאה ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'לא התקבלה תשובה';
}

function MessageBubble({ msg, userName }: { msg: Message; userName: string }) {
  const isUser = msg.role === 'user';

  const renderContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const code = part.replace(/^```\w*\n?/, '').replace(/```$/, '');
        return (
          <pre key={i} className="bg-gray-900 text-gray-100 rounded-lg p-3 text-sm overflow-x-auto my-2 text-left" dir="ltr">
            <code>{code}</code>
          </pre>
        );
      }
      return (
        <span key={i} className="whitespace-pre-wrap">{part}</span>
      );
    });
  };

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isUser ? 'bg-teal-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
      }`}>
        {isUser
          ? <User className="w-3 h-3 text-white" />
          : <Bot className="w-3 h-3 text-white" />
        }
      </div>
      <div className={`max-w-[78%] rounded-xl px-3 py-2 text-xs leading-normal ${
        isUser
          ? 'bg-teal-600 text-white rounded-tr-sm'
          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
      }`}>
        {!isUser && (
          <p className="text-[10px] text-indigo-500 font-semibold mb-0.5">מורה AI</p>
        )}
        {isUser && (
          <p className="text-[10px] text-teal-100 font-semibold mb-0.5 text-right">{userName}</p>
        )}
        <div dir="rtl">{renderContent(msg.content)}</div>
      </div>
    </div>
  );
}

export function AITutorPage({ courseId: initialCourseId }: AITutorPageProps) {
  const { user } = useAuth();
  const userName = user?.fullName || 'סטודנט';

  const storageKey = `mindmatch_chats_${user?.userId || 'guest'}`;

  const [activeCourseId, setActiveCourseId] = useState<string>(initialCourseId || '');
  const [conversations, setConversations] = useState<Record<string, Message[]>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(conversations));
    } catch {
      // localStorage מלא
    }
  }, [conversations, storageKey]);

  const activeCourse = ALL_COURSES.find(c => c.id === activeCourseId);
  const messages = conversations[activeCourseId] || [];

  const myCourses = ALL_COURSES.filter(c =>
    (user?.selectedCourses ?? []).includes(c.id)
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !activeCourseId || isLoading) return;

    setInput('');
    setError('');

    const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };
    const updatedMsgs = [...messages, userMsg];

    setConversations(prev => ({ ...prev, [activeCourseId]: updatedMsgs }));
    setIsLoading(true);

    try {
      const reply = await callAI(updatedMsgs, activeCourse?.title || activeCourseId);
      const aiMsg: Message = { role: 'assistant', content: reply, timestamp: Date.now() };
      setConversations(prev => ({
        ...prev,
        [activeCourseId]: [...updatedMsgs, aiMsg],
      }));
    } catch (err: any) {
      setError(err?.message || 'אירעה שגיאה. בדוק שמפתח ה-API מוגדר.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectCourse = (id: string) => {
    setActiveCourseId(id);
    setError('');
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  return (
    <div className="fixed inset-0 top-20 mr-64 flex flex-col bg-gray-50" dir="rtl">
      {!activeCourseId ? (
        /* ── Course selection screen ── */
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-4 gap-5 overflow-hidden relative"
             style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdf4 40%, #eff6ff 100%)' }}>

          {/* Decorative background blobs */}
          <div className="absolute top-8 right-12 w-48 h-48 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-12 left-16 w-56 h-56 rounded-full bg-indigo-200/25 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-teal-200/20 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl mb-3 ring-4 ring-white">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">מורה AI</h2>
            <p className="text-gray-500 text-sm text-center">שלום {userName}! בחרי קורס כדי להתחיל לשוחח</p>
          </div>

          {/* Course cards */}
          {myCourses.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl relative z-10">
              {myCourses.map(course => {
                const msgCount = conversations[course.id]?.length ?? 0;
                return (
                  <button
                    key={course.id}
                    onClick={() => selectCourse(course.id)}
                    className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all group text-center w-40 shadow-sm"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold overflow-hidden group-hover:scale-110 transition-transform flex-shrink-0 shadow-md`}>
                      <span className="text-xl leading-none">{course.emoji}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 leading-tight">{course.title}</span>
                    {msgCount > 0 ? (
                      <span className="text-xs text-blue-500 font-medium">{msgCount} הודעות</span>
                    ) : (
                      <span className="text-xs text-gray-400">התחל שיחה</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white max-w-sm shadow-md relative z-10">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold text-base mb-1">עדיין לא הוספת קורסים</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                כנסי לקטלוג הקורסים<br />והוסיפי קורסים לרשימה שלך
              </p>
            </div>
          )}
        </div>
      ) : (
        /* ── Chat interface ── */
        <>
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setActiveCourseId('')}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors pl-2 border-l border-gray-200 ml-2"
            >
              <ChevronRight className="w-4 h-4" />
              חזרה
            </button>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCourse?.color} flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden`}>
              <span className="text-base leading-none">{activeCourse?.emoji}</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{activeCourse?.title}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                מורה AI מוכן לעזור
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <BookOpen className="w-12 h-12 text-gray-300" />
                <div>
                  <p className="text-gray-500 font-medium">שאלי כל שאלה על {activeCourse?.title}</p>
                  <p className="text-gray-400 text-sm mt-1">המורה AI ישיב לך בעברית עם הסברים ברורים</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {['הסבר לי את המושג הבסיסי ביותר', 'אילו נושאים חשובים לבחינה?', 'תן לי דוגמה פשוטה'].map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); textareaRef.current?.focus(); }}
                      className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => {
              const showDate = i === 0 || !isSameDay(messages[i - 1].timestamp || 0, msg.timestamp || 0);
              return (
                <div key={i}>
                  {showDate && (
                    <div className="flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">
                        {formatDateLabel(msg.timestamp || Date.now())}
                      </span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  )}
                  <MessageBubble msg={msg} userName={userName} />
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl rounded-tl-sm px-3 py-2 shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                </div>
              </div>
            )}

            {error && (
              <div className="mx-auto max-w-sm p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-600 text-sm">{error}</p>
                <p className="text-red-400 text-xs mt-1">בדקי שיש חיבור לאינטרנט ונסי שוב.</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-end gap-3">
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0 h-11 w-11 p-0"
                size="icon"
              >
                {isLoading
                  ? <Loader2 className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />
                }
              </Button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`שאלי שאלה על ${activeCourse?.title}...`}
                rows={1}
                dir="rtl"
                className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[44px] max-h-32 overflow-y-auto"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">Enter לשליחה • Shift+Enter לשורה חדשה</p>
          </div>
        </>
      )}
    </div>
  );
}
