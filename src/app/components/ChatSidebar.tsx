import { MessageSquare, Plus, Clock, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const conversationsByCourse: Record<string, Array<{
  id: number;
  title: string;
  date: string;
  preview: string;
  active: boolean;
}>> = {
  'sql': [
    {
      id: 1,
      title: 'SQL Joins - Advanced Queries',
      date: 'היום, 14:30',
      preview: 'מה ההבדל בין INNER JOIN ל-LEFT JOIN?',
      active: true,
    },
    {
      id: 2,
      title: 'Normalization - 3NF',
      date: 'אתמול, 11:20',
      preview: 'איך מגיעים לצורה נורמלית שלישית?',
      active: false,
    },
    {
      id: 3,
      title: 'Indexes and Performance',
      date: 'לפני 2 ימים',
      preview: 'איך אינדקסים משפרים ביצועים?',
      active: false,
    },
    {
      id: 4,
      title: 'Stored Procedures',
      date: 'לפני 3 ימים',
      preview: 'מה היתרונות של Stored Procedures?',
      active: false,
    },
    {
      id: 5,
      title: 'Transactions and ACID',
      date: 'לפני שבוע',
      preview: 'הסבר על עקרונות ACID',
      active: false,
    },
  ],
  'calculus1': [
    {
      id: 1,
      title: 'גבולות - מושגי יסוד',
      date: 'היום, 14:30',
      preview: 'מה זה גבול של פונקציה?',
      active: true,
    },
    {
      id: 2,
      title: 'נגזרות - כלל השרשרת',
      date: 'אתמול, 11:20',
      preview: 'איך מחשבים נגזרת של פונקציה מורכבת?',
      active: false,
    },
    {
      id: 3,
      title: 'חקירת פונקציות',
      date: 'לפני 2 ימים',
      preview: 'איך מוצאים נקודות קיצון?',
      active: false,
    },
    {
      id: 4,
      title: 'אינטגרלים - שיטות פתרון',
      date: 'לפני 3 ימים',
      preview: 'מה ההבדל בין אינטגרל מסוים ללא מסוים?',
      active: false,
    },
    {
      id: 5,
      title: 'כלל לופיטל',
      date: 'לפני שבוע',
      preview: 'מתי משתמשים בכלל לופיטל?',
      active: false,
    },
  ],
  'information-security': [
    {
      id: 1,
      title: 'הצפנה סימטרית ואסימטרית',
      date: 'היום, 14:30',
      preview: 'מה ההבדל בין הצפנה סימטרית לאסימטרית?',
      active: true,
    },
    {
      id: 2,
      title: 'RSA Algorithm',
      date: 'אתמול, 11:20',
      preview: 'איך עובד אלגוריתם RSA?',
      active: false,
    },
    {
      id: 3,
      title: 'Hash Functions',
      date: 'לפני 2 ימים',
      preview: 'מה זה Hash Function ולמה זה חשוב?',
      active: false,
    },
    {
      id: 4,
      title: 'SSL/TLS Protocols',
      date: 'לפני 3 ימים',
      preview: 'איך עובד SSL/TLS?',
      active: false,
    },
    {
      id: 5,
      title: 'Digital Signatures',
      date: 'לפני שבוע',
      preview: 'מה זה חתימה דיגיטלית?',
      active: false,
    },
  ],
  'oop': [
    {
      id: 1,
      title: 'פולימורפיזם',
      date: 'היום, 14:30',
      preview: 'מה זה פולימורפיזם?',
      active: true,
    },
    {
      id: 2,
      title: 'Encapsulation',
      date: 'אתמול, 11:20',
      preview: 'למה Encapsulation חשוב?',
      active: false,
    },
    {
      id: 3,
      title: 'Inheritance vs Composition',
      date: 'לפני 2 ימים',
      preview: 'מתי להשתמש בירושה ומתי בקומפוזיציה?',
      active: false,
    },
    {
      id: 4,
      title: 'Abstract Classes',
      date: 'לפני 3 ימים',
      preview: 'מה ההבדל בין Interface ל-Abstract Class?',
      active: false,
    },
    {
      id: 5,
      title: 'Design Patterns',
      date: 'לפני שבוע',
      preview: 'מה זה Singleton Pattern?',
      active: false,
    },
  ],
  'html': [
    {
      id: 1,
      title: 'Semantic HTML',
      date: 'היום, 14:30',
      preview: 'מה ההבדל בין div ל-section?',
      active: true,
    },
    {
      id: 2,
      title: 'Forms in HTML5',
      date: 'אתמול, 11:20',
      preview: 'איך עובדים Forms ב-HTML5?',
      active: false,
    },
    {
      id: 3,
      title: 'Accessibility',
      date: 'לפני 2 ימים',
      preview: 'למה Accessibility חשוב?',
      active: false,
    },
    {
      id: 4,
      title: 'Data Attributes',
      date: 'לפני 3 ימים',
      preview: 'איך משתמשים ב-data attributes?',
      active: false,
    },
    {
      id: 5,
      title: 'HTML5 APIs',
      date: 'לפני שבוע',
      preview: 'מה זה Local Storage?',
      active: false,
    },
  ],
  'linear-algebra': [
    {
      id: 1,
      title: 'מרחבים וקטוריים',
      date: 'היום, 14:30',
      preview: 'מה זה מרחב וקטורי?',
      active: true,
    },
    {
      id: 2,
      title: 'כפל מטריצות',
      date: 'אתמול, 11:20',
      preview: 'איך מכפילים מטריצות?',
      active: false,
    },
    {
      id: 3,
      title: 'דטרמיננטה ומטריצה הופכית',
      date: 'לפני 2 ימים',
      preview: 'איך מחשבים דטרמיננטה?',
      active: false,
    },
    {
      id: 4,
      title: 'טרנספורמציות לינאריות',
      date: 'לפני 3 ימים',
      preview: 'מה זה טרנספורמציה לינארית?',
      active: false,
    },
    {
      id: 5,
      title: 'ערכים עצמיים',
      date: 'לפני שבוע',
      preview: 'איך מוצאים ערכים וקטורים עצמיים?',
      active: false,
    },
  ],
  'requirements-design': [
    {
      id: 1,
      title: 'Use Case Diagrams',
      date: 'היום, 14:30',
      preview: 'מה זה Use Case Diagram?',
      active: true,
    },
    {
      id: 2,
      title: 'Class Diagrams',
      date: 'אתמול, 11:20',
      preview: 'איך מתכננים Class Diagram?',
      active: false,
    },
    {
      id: 3,
      title: 'דרישות פונקציונליות',
      date: 'לפני 2 ימים',
      preview: 'מה ההבדל בין Functional ל-Non-Functional?',
      active: false,
    },
    {
      id: 4,
      title: 'Agile Methodology',
      date: 'לפני 3 ימים',
      preview: 'איך עובדת מתודולוגיית Agile?',
      active: false,
    },
    {
      id: 5,
      title: 'Sequence Diagrams',
      date: 'לפני שבוע',
      preview: 'מתי משתמשים ב-Sequence Diagram?',
      active: false,
    },
  ],
  'mis-economics': [
    {
      id: 1,
      title: 'ROI - החזר השקעה',
      date: 'היום, 14:30',
      preview: 'מה זה ROI ואיך מחשבים אותו?',
      active: true,
    },
    {
      id: 2,
      title: 'NPV vs ROI',
      date: 'אתמול, 11:20',
      preview: 'מה ההבדל בין ROI ל-NPV?',
      active: false,
    },
    {
      id: 3,
      title: 'ניהול סיכונים',
      date: 'לפני 2 ימים',
      preview: 'איך מעריכים סיכונים בפרויקט IT?',
      active: false,
    },
    {
      id: 4,
      title: 'TCO - עלות כוללת',
      date: 'לפני 3 ימים',
      preview: 'מה זה TCO?',
      active: false,
    },
    {
      id: 5,
      title: 'תכנון תקציב IT',
      date: 'לפני שבוע',
      preview: 'איך מתכננים תקציב IT?',
      active: false,
    },
  ],
  'default': [
    {
      id: 1,
      title: 'SQL Joins - Advanced Queries',
      date: 'היום, 14:30',
      preview: 'מה ההבדל בין INNER JOIN ל-LEFT JOIN?',
      active: true,
    },
    {
      id: 2,
      title: 'Normalization - 3NF',
      date: 'אתמול, 11:20',
      preview: 'איך מגיעים לצורה נורמלית שלישית?',
      active: false,
    },
    {
      id: 3,
      title: 'UML Class Diagrams',
      date: 'לפני 2 ימים',
      preview: 'הסבר על יחסי ירושה בדיאגרמות',
      active: false,
    },
    {
      id: 4,
      title: 'React Hooks Explained',
      date: 'לפני 3 ימים',
      preview: 'מתי להשתמש ב-useEffect?',
      active: false,
    },
    {
      id: 5,
      title: 'Binary Search Algorithm',
      date: 'לפני שבוע',
      preview: 'סיבוכיות זמן של חיפוש בינארי',
      active: false,
    },
  ],
};

interface ChatSidebarProps {
  courseId?: string;
}

export function ChatSidebar({ courseId }: ChatSidebarProps) {
  const conversations = courseId && conversationsByCourse[courseId] 
    ? conversationsByCourse[courseId] 
    : conversationsByCourse['default'];

  return (
    <aside className="fixed right-64 top-0 h-screen w-80 bg-white border-l border-gray-200 flex flex-col z-30">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 justify-end mb-4">
          <div className="text-right">
            <h2 className="font-bold text-gray-900">שיחות AI</h2>
            <p className="text-sm text-gray-600">היסטוריית למידה</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          שיחה חדשה
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className={`w-full p-4 rounded-xl text-right transition-all ${
                conv.active
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <h3 className={`font-semibold text-sm ${
                  conv.active ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {conv.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2 text-right" dir="rtl" style={{ unicodeBidi: 'plaintext' }}>{conv.preview}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500 justify-end">
                <span>{conv.date}</span>
                <Clock className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="p-3 bg-blue-50 rounded-xl text-right">
          <p className="text-xs text-gray-700" dir="rtl" style={{ unicodeBidi: 'plaintext' }}>
            <strong>💡 טיפ:</strong> ככל שתשאל יותר שאלות, AI ילמד את סגנון הלמידה שלך טוב יותר
          </p>
        </div>
      </div>
    </aside>
  );
}