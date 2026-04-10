import { useState } from 'react';

interface PracticePageProps {
  courseId: string;
  onBack: () => void;
}

const mockQuestions = [
  {
    id: 1,
    question: 'מה זה JOIN ב-SQL?',
    options: ['חיבור טבלאות', 'מחיקת נתונים', 'יצירת טבלה', 'עדכון שדה'],
    correct: 0,
  },
  {
    id: 2,
    question: 'מה זה PRIMARY KEY?',
    options: ['מפתח ייחודי', 'טבלה ראשית', 'שאילתה', 'אינדקס'],
    correct: 0,
  },
];

export function PracticePage({ courseId, onBack }: PracticePageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = mockQuestions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 pr-72">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 text-right">
          <h1 className="text-3xl font-bold mb-4">סיימת את התרגול 🎉</h1>
          <p className="text-gray-600 mb-6">קורס: {courseId}</p>
          <button
            onClick={onBack}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
          >
            חזרה לקורסים
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pr-72">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← חזרה לקורסים
          </button>

          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">תרגול</h1>
            <p className="text-gray-600 mt-1">קורס: {courseId}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-6 text-right">
            <p className="text-sm text-gray-500 mb-2">
              שאלה {currentQuestionIndex + 1} מתוך {mockQuestions.length}
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isRightAnswer = question.correct === index;

              let buttonClass =
                'w-full text-right border rounded-xl p-4 transition';

              if (showFeedback) {
                if (isRightAnswer) {
                  buttonClass += ' bg-green-100 border-green-500';
                } else if (isSelected && !isRightAnswer) {
                  buttonClass += ' bg-red-100 border-red-500';
                } else {
                  buttonClass += ' bg-white border-gray-200';
                }
              } else {
                buttonClass += ' bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-6 text-right">
              <p className={`font-medium mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'תשובה נכונה!' : 'תשובה לא נכונה'}
              </p>

              <button
                onClick={handleNextQuestion}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
              >
                לשאלה הבאה
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}