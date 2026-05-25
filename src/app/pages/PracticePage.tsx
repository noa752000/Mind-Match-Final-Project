import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { calculus1Questions } from '../../dataQ/calculus1_questions.js';
import { linearAlgebraQuestions } from '../../dataQ/linearAlgebra_questions.js';
import { oopQuestions } from '../../dataQ/oop_questions.js';
import { htmlQuestions } from '../../dataQ/html_questions.js';
import { sqlQuestions } from '../../dataQ/sql_questions.js';
import { systemDesignQuestions } from '../../dataQ/systemDesign_questions.js';
import { securityQuestions } from '../../dataQ/security_questions.js';
import { economicsQuestions } from '../../dataQ/economics_questions.js';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BookOpen, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PracticePageProps {
  courseId: string;
  onBack: () => void;
}

interface Question {
  id: string;
  courseId?: string;
  subTopic?: string;
  difficulty?: number;
  format?: string;
  learningType?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
}

export function PracticePage({ courseId, onBack }: PracticePageProps) {
  const { user } = useAuth();
  const appUserId = user?.userId || "user_1";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStartTime] = useState(Date.now());
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean; timeSpent: number }[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        console.log('Loading questions from Firestore...');

        let loadedQuestions: Question[] = [];
        let firestoreLoaded = false;

        try {
          const q = query(
            collection(db, 'questions'),
            where('courseId', '==', courseId)
          );

          const querySnapshot = await getDocs(q);

          loadedQuestions = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              courseId: data.courseId || '',
              subTopic: data.subTopic || '',
              difficulty: data.difficulty || 1,
              format: data.format || 'mcq',
              learningType: data.learningType || 'concept',
              question: data.question || '',
              options: data.options || [],
              correctAnswer: data.correctAnswer || '',
              imageUrl: data.imageUrl || '',
            };
          });

          loadedQuestions.sort((a, b) => (a.difficulty || 0) - (b.difficulty || 0));
          firestoreLoaded = true;
          console.log('Questions loaded successfully');
        } catch (firebaseError) {
          console.error('Firestore error, loading local questions instead:', firebaseError);
        }

        if (!firestoreLoaded) {
              const allLocalQuestions = [
                ...calculus1Questions,
                ...linearAlgebraQuestions,
                ...oopQuestions,
                  ...htmlQuestions,
                  ...sqlQuestions,
                  ...systemDesignQuestions,
                  ...securityQuestions,
                  ...economicsQuestions
              ];

              loadedQuestions = allLocalQuestions
                .filter((q: any) => q.courseId === courseId)
                .map((q: any) => ({
                  id: q.id,
                  courseId: q.courseId,
                  subTopic: q.subTopic || '',
                  difficulty: q.difficulty || 1,
                  format: q.format || 'mcq',
                  learningType: q.learningType || 'concept',
                question: q.question || '',
                  options: q.options || [],
                  correctAnswer: q.correctAnswer || '',
                  imageUrl: q.imageUrl || '',
                }));

            loadedQuestions.sort((a, b) => (a.difficulty || 0) - (b.difficulty || 0));
  }

        setQuestions(loadedQuestions);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadQuestions();
    }
  }, [courseId]);

  // Save practice session when finished
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && answers.length > 0) {
      savePracticeSession();
    }
  }, [currentQuestionIndex, questions.length, answers.length]);

  const question = questions[currentQuestionIndex];

  const handleAnswerClick = async (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    const isCorrect = option === question.correctAnswer;
    const timeSpent = Date.now() - sessionStartTime; // This is approximate, could be improved with per-question timing

    // Track the answer
    const newAnswer = {
      questionId: question.id,
      isCorrect,
      timeSpent
    };
    setAnswers(prev => [...prev, newAnswer]);

    // Save individual answer to practice_results
    try {
      await setDoc(doc(db, 'practice_results', `${appUserId}_${courseId}_${question.id}`), {
        userId: appUserId,
        courseId,
        questionId: question.id,
        isCorrect,
        timeSpent,
        timestamp: new Date()
      });
      console.log('Answer saved to practice_results:', { userId: appUserId, questionId: question.id, isCorrect });
    } catch (error) {
      console.error('Error saving answer:', error);
    }

    // Update course_progress immediately after each answer
    try {
      const updatedAnswers = [...answers, newAnswer];
      const correctAnswers = updatedAnswers.filter(a => a.isCorrect).length;
      const totalAnswers = updatedAnswers.length;
      const progress = Math.round((correctAnswers / totalAnswers) * 100);
      const practicedMinutes = Math.round((Date.now() - sessionStartTime) / 60000); // Convert to minutes

      await setDoc(doc(db, 'course_progress', `${appUserId}_${courseId}`), {
        userId: appUserId,
        courseId,
        correctAnswers,
        totalAnswers,
        progress,
        practicedMinutes,
        lastUpdated: new Date()
      }, { merge: true });

      console.log('Updated course_progress:', {
        userId: appUserId,
        courseId,
        correctAnswers,
        totalAnswers,
        progress,
        practicedMinutes
      });
    } catch (error) {
      console.error('Error updating course_progress:', error);
    }
  };

  const savePracticeSession = async () => {
    if (answers.length === 0) return;

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalAnswers = answers.length;
    const progress = Math.round((correctAnswers / totalAnswers) * 100);
    const practicedMinutes = Math.round((Date.now() - sessionStartTime) / 60000); // Convert to minutes

    try {
      await setDoc(doc(db, 'course_progress', `${appUserId}_${courseId}`), {
        userId: appUserId,
        courseId,
        correctAnswers,
        totalAnswers,
        progress,
        practicedMinutes,
        lastUpdated: new Date()
      });
      console.log('Practice session saved to course_progress:', {
        userId: appUserId,
        courseId,
        correctAnswers,
        totalAnswers,
        progress,
        practicedMinutes
      });
    } catch (error) {
      console.error('Error saving practice session:', error);
    }
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    await savePracticeSession();
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <Card className="p-8 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-teal-500" />
            <h1 className="text-2xl font-bold text-gray-900">טוען שאלות...</h1>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-16 py-12">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">תרגול</h1>
              <p className="text-xl text-gray-600">קורס: {courseId}</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <Card className="p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">אין שאלות לקורס הזה עדיין</h1>
            <p className="text-gray-600 mb-6">קורס: {courseId}</p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              חזרה לקורסים
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-16 py-12">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">תרגול</h1>
              <p className="text-xl text-gray-600">קורס: {courseId}</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">סיימת את התרגול 🎉</h1>
            <p className="text-gray-600 mb-6">קורס: {courseId}</p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              חזרה לקורסים
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <div className="flex justify-between items-center">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              חזרה לקורסים
            </Button>

            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">תרגול</h1>
              <p className="text-xl text-gray-600">קורס: {courseId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gradient-to-l from-teal-500 to-teal-600 text-white">
        <div className="max-w-[1440px] mx-auto px-16 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{currentQuestionIndex + 1}</div>
              <div className="text-teal-100 text-sm">שאלה נוכחית</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{questions.length}</div>
              <div className="text-teal-100 text-sm">סה"כ שאלות</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</div>
              <div className="text-teal-100 text-sm">התקדמות</div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-[1440px] mx-auto px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group">
            {/* Question Header with Gradient */}
            <div className="bg-gradient-to-l from-teal-500 to-teal-600 p-6 text-white relative overflow-hidden min-h-[140px]">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <BookOpen className="w-24 h-24 absolute -top-4 -left-4 transform rotate-12" />
              </div>
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-white/30 mb-3">
                  שאלה {currentQuestionIndex + 1}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-white/90 justify-start mb-4">
                  <div>קורס: {courseId}</div>
                  {question.subTopic && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-white/50"></div>
                      <div>תת נושא: {question.subTopic}</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6 text-right">
                <h2 className="text-2xl font-semibold text-gray-900 leading-8 whitespace-pre-line">
                    <span dangerouslySetInnerHTML={{ __html: question.question }} />
                </h2>
              </div>

              {question.imageUrl && (
                <div className="mb-6">
                  <img
                    src={question.imageUrl}
                    alt="שאלה ויזואלית"
                    className="max-w-full mx-auto rounded-xl border"
                  />
                </div>
              )}

              <div className="space-y-3 mb-6">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isRightAnswer = question.correctAnswer === option;

                  let buttonClass = 'w-full text-right border rounded-xl p-4 transition';

                  if (showFeedback) {
                    if (isRightAnswer) {
                      buttonClass += ' bg-green-100 border-green-500 text-green-800';
                    } else if (isSelected && !isRightAnswer) {
                      buttonClass += ' bg-red-100 border-red-500 text-red-800';
                    } else {
                      buttonClass += ' bg-white border-gray-200 text-gray-700';
                    }
                  } else {
                    buttonClass += ' bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-gray-900';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      disabled={showFeedback}
                      className={buttonClass}
                    >
                      <span dangerouslySetInnerHTML={{ __html: option }} />
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">
                      {isCorrect ? 'תשובה נכונה!' : 'תשובה לא נכונה'}
                    </span>
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white group-hover:shadow-lg transition-all"
                  >
                    לשאלה הבאה
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}