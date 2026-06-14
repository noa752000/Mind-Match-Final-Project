import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const questionsByCourse: Record<string, string[]> = {
  'sql': [
    'מה ההבדל בין INNER JOIN ל-OUTER JOIN?',
    'מה זה Normalization במסדי נתונים?',
    'איך עובד אינדקס במסד נתונים?',
    'מה זה PRIMARY KEY ו-FOREIGN KEY?',
    'איך לבצע אופטימיזציה לשאילתות?',
    'מה ההבדל בין WHERE ל-HAVING?',
  ],
  'calculus1': [
    'מה זה גבול של פונקציה?',
    'איך מחשבים נגזרת של פונקציה מורכבת?',
    'מה ההבדל בין אינטגרל מסוים ללא מסוים?',
    'איך פותרים גבולות עם אי-וודאות?',
    'מה זה כלל לופיטל?',
    'איך מוצאים נקודות קיצון?',
  ],
  'cyber_security': [
    'מה ההבדל בין הצפנה סימטרית לאסימטרית?',
    'איך עובד RSA?',
    'מה זה Man-in-the-Middle Attack?',
    'מה זה Hash Function?',
    'איך עובד SSL/TLS?',
    'מה זה Digital Signature?',
  ],
  'oop': [
    'מה זה פולימורפיזם?',
    'מה ההבדל בין Overloading ל-Overriding?',
    'מה זה Encapsulation?',
    'איך עובדת הורשה (Inheritance)?',
    'מה זה Abstract Class?',
    'מה ההבדל בין Interface ל-Abstract Class?',
  ],
  'html': [
    'מה ההבדל בין div ל-section?',
    'מה זה Semantic HTML?',
    'איך עובדים Forms ב-HTML5?',
    'מה זה Accessibility?',
    'איך משתמשים ב-data attributes?',
    'מה ההבדל בין inline ל-block elements?',
  ],
  'linear-algebra': [
    'מה זה מרחב וקטורי?',
    'איך מכפילים מטריצות?',
    'מה זה דטרמיננטה?',
    'מה זה טרנספורמציה לינארית?',
    'איך מוצאים ערכים עצמיים?',
    'מה זה בסיס של מרחב וקטורי?',
  ],
  'systems_analysis': [
    'מה זה Use Case Diagram?',
    'איך מתכננים Class Diagram?',
    'מה ההבדל בין Functional ל-Non-Functional דרישות?',
    'מה זה Sequence Diagram?',
    'איך עובדת מתודולוגיית Agile?',
    'מה ההבדל בין Waterfall ל-Scrum?',
  ],
  'mis-economics': [
    'מה זה ROI ואיך מחשבים אותו?',
    'מה ההבדל בין ROI ל-NPV?',
    'איך מעריכים סיכונים בפרויקט IT?',
    'מה זה TCO (Total Cost of Ownership)?',
    'איך מחשבים תקופת החזר השקעה?',
    'מה זה Break-Even Analysis?',
  ],
  'default': [
    'מה ההבדל בין INNER JOIN ל-OUTER JOIN?',
    'איך עובד אלגוריתם Merge Sort?',
    'הסבר על React Hooks?',
    'מה זה Normalization במסדי נתונים?',
    'איך מתכננים UML Class Diagram?',
    'תן דוגמה לשימוש ב-useState?',
  ],
};

interface QuickQuestionsProps {
  courseId?: string;
}

export function QuickQuestions({ courseId }: QuickQuestionsProps) {
  const questions = courseId && questionsByCourse[courseId] 
    ? questionsByCourse[courseId] 
    : questionsByCourse['default'];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-700">שאלות מוצעות</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-sm hover:bg-blue-50 hover:border-blue-300 transition-all"
            dir="rtl"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}