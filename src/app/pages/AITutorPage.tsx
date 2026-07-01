import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, GraduationCap, Loader2, BookOpen } from 'lucide-react';
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

  if (d.toDateString() === today.toDateString()) return '׳”׳™׳•׳';
  if (d.toDateString() === yesterday.toDateString()) return '׳׳×׳׳•׳';
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
  { id: 'calculus1',           title: '׳—׳“׳•"׳ 1',               color: 'from-blue-500 to-blue-600',     emoji: 'גˆ«' },
  { id: 'linear-algebra',      title: '׳׳׳’׳‘׳¨׳” ׳׳™׳ ׳׳¨׳™׳×',         color: 'from-purple-500 to-purple-600', emoji: 'ג•' },
  { id: 'oop',                  title: '׳×׳›׳ ׳•׳× ׳׳•׳ ׳—׳” ׳¢׳¦׳׳™׳',       color: 'from-green-500 to-green-600',   emoji: '{}' },
  { id: 'html',                 title: 'HTML',                   color: 'from-orange-500 to-orange-600', emoji: '<>' },
  { id: 'sql',                  title: 'SQL',                    color: 'from-cyan-500 to-cyan-600',     emoji: 'ג' },
  { id: 'systems_analysis',     title: '׳׳₪׳™׳•׳ ׳•׳×׳›׳',             color: 'from-indigo-500 to-indigo-600', emoji: 'ג¬¡' },
  { id: 'cyber_security',       title: '׳׳‘׳˜׳—׳× ׳׳™׳“׳¢',            color: 'from-red-500 to-red-600',       emoji: 'נ”’' },
  { id: 'mis-economics',        title: '׳›׳׳›׳׳× ׳׳¢׳¨׳›׳•׳× ׳׳™׳“׳¢',       color: 'from-amber-500 to-amber-600',   emoji: 'ג‚×' },
];

// Pollinations AI ג€” free, no API key needed

const SYSTEM_PROMPT = (courseName: string) =>
  `You are a professional academic tutor for the course "${courseName}" at an Israeli university. ` +
  `STRICT RULES: ` +
  `1. ALWAYS respond in Hebrew only. Never switch to English. ` +
  `2. Give complete, detailed explanations ג€” never cut off mid-sentence. Always finish your answer fully. ` +
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
    throw new Error(data?.error?.message || `׳©׳’׳™׳׳” ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '׳׳ ׳”׳×׳§׳‘׳׳” ׳×׳©׳•׳‘׳”';
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
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-teal-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
      }`}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Bot className="w-4 h-4 text-white" />
        }
      </div>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-teal-600 text-white rounded-tr-sm'
          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
      }`}>
        {!isUser && (
          <p className="text-xs text-indigo-500 font-semibold mb-1">׳׳•׳¨׳” AI</p>
        )}
        {isUser && (
          <p className="text-xs text-teal-100 font-semibold mb-1 text-right">{userName}</p>
        )}
        <div dir="rtl">{renderContent(msg.content)}</div>
      </div>
    </div>
  );
}

export function AITutorPage({ courseId: initialCourseId }: AITutorPageProps) {
  const { user } = useAuth();
  const userName = user?.fullName || '׳¡׳˜׳•׳“׳ ׳˜';

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
      // localStorage ׳׳׳ ג€” ׳׳ ׳©׳•׳׳¨׳™׳
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
      setError(err?.message || '׳׳™׳¨׳¢׳” ׳©׳’׳™׳׳”. ׳‘׳“׳•׳§ ׳©׳׳₪׳×׳— ׳”-API ׳׳•׳’׳“׳¨.');
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
    textareaRef.current?.focus();
  };

  return (
    <div className="flex h-screen mr-64 pt-24 bg-gray-50" dir="rtl">
      {/* Course list sidebar */}
      <aside className="w-72 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">׳׳•׳¨׳” AI</h2>
              <p className="text-xs text-gray-500">׳‘׳—׳¨׳™ ׳§׳•׳¨׳¡ ׳׳©׳•׳—׳— ׳¢׳ AI</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {ALL_COURSES.map(course => {
            const isActive = activeCourseId === course.id;
            const hasHistory = (conversations[course.id]?.length ?? 0) > 0;
            return (
              <button
                key={course.id}
                onClick={() => selectCourse(course.id)}
                className={`w-full text-right px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold`}>
                  {course.emoji}
                </div>
                <div className="flex-1 text-right min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? 'text-blue-800' : 'text-gray-800'}`}>
                    {course.title}
                  </p>
                  {hasHistory && (
                    <p className="text-xs text-gray-400">
                      {conversations[course.id].length} ׳”׳•׳“׳¢׳•׳×
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {!activeCourseId ? (
          /* Welcome screen */
          <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">׳©׳׳•׳ {userName}!</h2>
              <p className="text-gray-500">׳‘׳—׳¨׳™ ׳§׳•׳¨׳¡ ׳׳”׳¨׳©׳™׳׳” ׳›׳“׳™ ׳׳”׳×׳—׳™׳ ׳׳©׳•׳—׳— ׳¢׳ ׳”׳׳•׳¨׳” AI</p>
            </div>

            {myCourses.length > 0 ? (
              <div className="flex flex-col items-center gap-3 w-full max-w-md">
                <p className="text-sm font-semibold text-gray-600">׳”׳§׳•׳¨׳¡׳™׳ ׳©׳׳™</p>
                <div className="flex flex-wrap justify-center gap-3 w-full">
                  {myCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => selectCourse(course.id)}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-right"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {course.emoji}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{course.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                ׳¢׳“׳™׳™׳ ׳׳ ׳”׳•׳¡׳₪׳× ׳§׳•׳¨׳¡׳™׳.<br />
                ׳›׳ ׳¡׳™ ׳׳§׳˜׳׳•׳’ ׳”׳§׳•׳¨׳¡׳™׳ ׳•׳”׳•׳¡׳™׳₪׳™ ׳§׳•׳¨׳¡׳™׳ ׳׳¨׳©׳™׳׳” ׳©׳׳.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 flex-shrink-0">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCourse?.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {activeCourse?.emoji}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{activeCourse?.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                  ׳׳•׳¨׳” AI ׳׳•׳›׳ ׳׳¢׳–׳•׳¨
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300" />
                  <div>
                    <p className="text-gray-500 font-medium">׳©׳׳ ׳›׳ ׳©׳׳׳” ׳¢׳ {activeCourse?.title}</p>
                    <p className="text-gray-400 text-sm mt-1">׳”׳׳•׳¨׳” AI ׳™׳©׳™׳‘ ׳׳ ׳‘׳¢׳‘׳¨׳™׳× ׳¢׳ ׳”׳¡׳‘׳¨׳™׳ ׳‘׳¨׳•׳¨׳™׳</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {['׳”׳¡׳‘׳¨ ׳׳™ ׳׳× ׳”׳׳•׳©׳’ ׳”׳‘׳¡׳™׳¡׳™ ׳‘׳™׳•׳×׳¨', '׳׳™׳׳• ׳ ׳•׳©׳׳™׳ ׳—׳©׳•׳‘׳™׳ ׳׳‘׳—׳™׳ ׳”?', '׳×׳ ׳׳™ ׳“׳•׳’׳׳” ׳₪׳©׳•׳˜׳”'].map(q => (
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
                      <div className="flex items-center gap-3 my-4">
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
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  </div>
                </div>
              )}

              {error && (
                <div className="mx-auto max-w-sm p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-red-600 text-sm">{error}</p>
                  <p className="text-red-400 text-xs mt-1">
                    ׳‘׳“׳§׳™ ׳©׳™׳© ׳—׳™׳‘׳•׳¨ ׳׳׳™׳ ׳˜׳¨׳ ׳˜ ׳•׳ ׳¡׳™ ׳©׳•׳‘.
                  </p>
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
                  placeholder={`׳©׳׳׳™ ׳©׳׳׳” ׳¢׳ ${activeCourse?.title}...`}
                  rows={1}
                  dir="rtl"
                  className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[44px] max-h-32 overflow-y-auto"
                  style={{ fieldSizing: 'content' } as React.CSSProperties}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">Enter ׳׳©׳׳™׳—׳” ג€¢ Shift+Enter ׳׳©׳•׳¨׳” ׳—׳“׳©׳”</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

