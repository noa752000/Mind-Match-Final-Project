import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, setDoc, Timestamp } from 'firebase/firestore';
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
import { courseName } from '../lib/analyticsTypes';

interface PracticePageProps {
  courseId: string;
  onBack: () => void;
}

// Maps course catalog IDs (used in CoursesPage / selectedCourses) to the
// courseId values used in the questions data (Firestore "questions" collection
// and src/dataQ/* files), where they differ.
const QUESTION_DATA_COURSE_ID: Record<string, string> = {
  'html': 'html_fundamentals',
  'linear-algebra': 'linear_algebra',
  'mis-economics': 'information_systems_economics',
};

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
  // The courseId value as stored on the question documents themselves
  // (e.g. "html_fundamentals" for the "html" catalog course).
  const questionDataCourseId = QUESTION_DATA_COURSE_ID[courseId] || courseId;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
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
            where('courseId', '==', questionDataCourseId)
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
          firestoreLoaded = loadedQuestions.length > 0;
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
                .filter((q: any) => q.courseId === questionDataCourseId)
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

  // Refresh course_progress when finished
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && answers.length > 0) {
      updateCourseProgress().then(() => updateUserAggregateStats());
    }
  }, [currentQuestionIndex, questions.length, answers.length]);

  // Reset per-question timer whenever a new question is shown
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const scoreOutOf100 = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const displayedCourseName = courseName(courseId);
  const getSummaryMessage = (score: number) => {
    if (score >= 80) return 'מעולה! יש לך שליטה טובה בחומר.';
    if (score >= 60) return 'יפה מאוד! יש עוד קצת מקום לשיפור.';
    return 'כדאי לחזור על הנושא ולנסות שוב.';
  };

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
    const timeSpentSeconds = Math.round((Date.now() - questionStartTime) / 1000);
    try {
      await setDoc(doc(db, 'practice_results', `${appUserId}_${question.id}`), {
        userId: appUserId,
        courseId,
        questionId: question.id,
        isCorrect,
        difficulty: question.difficulty ?? 1,
        learningType: question.learningType ?? 'concept',
        timeSpentSeconds,
        answeredAt: Timestamp.now()
      });
      console.log('Answer saved to practice_results:', { userId: appUserId, questionId: question.id, isCorrect });
    } catch (error) {
      console.error('Error saving answer:', error);
    }

    // Recompute and save the course_progress summary from all practice_results so far
    await updateCourseProgress();
    await updateUserAggregateStats();
  };

  const updateCourseProgress = async () => {
    try {
      const resultsQuery = query(
        collection(db, 'practice_results'),
        where('userId', '==', appUserId)
      );
      const snapshot = await getDocs(resultsQuery);

      let totalAnswers = 0;
      let correctAnswers = 0;
      let knowledgeTotal = 0;
      let knowledgeCorrect = 0;
      let analysisTotal = 0;
      let analysisCorrect = 0;
      let visualTotal = 0;
      let visualCorrect = 0;
      let totalSeconds = 0;

      snapshot.docs.forEach((resultDoc) => {
        const data = resultDoc.data();
        if (data.courseId !== courseId) return;

        totalAnswers += 1;
        if (data.isCorrect) correctAnswers += 1;
        totalSeconds += data.timeSpentSeconds || 0;

        if (data.learningType === 'knowledge') {
          knowledgeTotal += 1;
          if (data.isCorrect) knowledgeCorrect += 1;
        } else if (data.learningType === 'analysis') {
          analysisTotal += 1;
          if (data.isCorrect) analysisCorrect += 1;
        } else if (data.learningType === 'visual') {
          visualTotal += 1;
          if (data.isCorrect) visualCorrect += 1;
        }
      });

      const wrongAnswers = totalAnswers - correctAnswers;
      // Score = correct / total questions in course (not just attempted questions)
      const totalQuestionsInCourse = questions.length;
      const accuracy = totalQuestionsInCourse > 0 ? Math.round((correctAnswers / totalQuestionsInCourse) * 100) : 0;
      const practicedMinutes = Math.round(totalSeconds / 60);

      await setDoc(doc(db, 'course_progress', `${appUserId}_${courseId}`), {
        userId: appUserId,
        courseId,
        totalAnswers,
        correctAnswers,
        wrongAnswers,
        totalQuestionsInCourse,
        accuracy,
        knowledgeTotal,
        knowledgeCorrect,
        analysisTotal,
        analysisCorrect,
        visualTotal,
        visualCorrect,
        practicedMinutes,
        lastPracticedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }, { merge: true });

      console.log('Updated course_progress:', {
        userId: appUserId,
        courseId,
        totalAnswers,
        correctAnswers,
        wrongAnswers,
        accuracy,
        knowledgeTotal,
        knowledgeCorrect,
        analysisTotal,
        analysisCorrect,
        visualTotal,
        visualCorrect,
        practicedMinutes
      });
    } catch (error) {
      console.error('Error updating course_progress:', error);
    }
  };

  // Recompute the user's aggregate stats (users/{uid}) from all of their course_progress docs
  const updateUserAggregateStats = async () => {
    try {
      const progressQuery = query(
        collection(db, 'course_progress'),
        where('userId', '==', appUserId)
      );
      const snapshot = await getDocs(progressQuery);

      let totalAnswers = 0;
      let correctAnswers = 0;
      let knowledgeTotal = 0;
      let knowledgeCorrect = 0;
      let analysisTotal = 0;
      let analysisCorrect = 0;
      let visualTotal = 0;
      let visualCorrect = 0;
      let practicedMinutes = 0;
      let lastPracticedAt: Timestamp | null = null;

      snapshot.docs.forEach((progressDoc) => {
        const data = progressDoc.data();
        totalAnswers += data.totalAnswers || 0;
        correctAnswers += data.correctAnswers || 0;
        knowledgeTotal += data.knowledgeTotal || 0;
        knowledgeCorrect += data.knowledgeCorrect || 0;
        analysisTotal += data.analysisTotal || 0;
        analysisCorrect += data.analysisCorrect || 0;
        visualTotal += data.visualTotal || 0;
        visualCorrect += data.visualCorrect || 0;
        practicedMinutes += data.practicedMinutes || 0;

        if (data.lastPracticedAt && (!lastPracticedAt || data.lastPracticedAt.seconds > lastPracticedAt.seconds)) {
          lastPracticedAt = data.lastPracticedAt;
        }
      });

      const averageGrade = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

      const accuracies: { type: 'knowledge' | 'analysis' | 'visual'; value: number }[] = [
        { type: 'knowledge', value: knowledgeTotal > 0 ? knowledgeCorrect / knowledgeTotal : -1 },
        { type: 'analysis', value: analysisTotal > 0 ? analysisCorrect / analysisTotal : -1 },
        { type: 'visual', value: visualTotal > 0 ? visualCorrect / visualTotal : -1 },
      ];
      const bestType = accuracies.reduce((best, curr) => (curr.value > best.value ? curr : best), accuracies[0]);
      const preferredLearningType = bestType.value >= 0 ? bestType.type : null;

      let studentLevel: 'beginner' | 'intermediate' | 'advanced';
      if (averageGrade < 60) {
        studentLevel = 'beginner';
      } else if (averageGrade <= 79) {
        studentLevel = 'intermediate';
      } else {
        studentLevel = 'advanced';
      }

      await setDoc(doc(db, 'users', appUserId), {
        averageGrade,
        completedQuestions: totalAnswers,
        preferredLearningType,
        studentLevel,
        totalStudyMinutes: practicedMinutes,
        weeklyStudyMinutes: practicedMinutes,
        lastPracticedAt: lastPracticedAt || Timestamp.now(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user aggregate stats:', error);
    }
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    setShowSummary(true);
  };

  const handlePracticeAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowSummary(false);
    setAnswers([]);
    setQuestionStartTime(Date.now());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
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
      <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-16 py-12">
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">תרגול</h1>
              <p className="text-xl text-gray-600">קורס: {questionDataCourseId}</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <Card className="p-8 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">אין שאלות לקורס הזה עדיין</h1>
            <p className="text-gray-600 mb-6">קורס: {questionDataCourseId}</p>
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

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Card className="relative overflow-hidden p-8 sm:p-10 lg:p-14 shadow-2xl border-gray-200 rounded-[32px]">
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-l from-teal-500 to-cyan-500 text-white shadow-xl mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">סיימת את התרגול!</h2>
              <p className="text-gray-600 text-lg max-w-xl leading-8">
                סיימת את כל השאלות במפגש התרגול הזה. הנה הסיכום שלך כדי לראות כמה התקדמת.
              </p>
            </div>

            <div className="mb-10 flex justify-center">
              <div className="inline-flex min-h-[72px] w-full max-w-xl items-center justify-center rounded-full bg-gradient-to-l from-teal-500 to-cyan-500 px-6 py-4 text-white shadow-lg shadow-teal-200/50">
                <span className="text-lg font-bold">{displayedCourseName}</span>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              <Card className="flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-teal-100 bg-teal-50 p-7 text-center shadow-lg">
                <p className="mb-2 text-sm font-semibold text-teal-700">תשובות נכונות</p>
                <p className="text-6xl font-bold text-gray-900">{correctCount}/{totalQuestions}</p>
              </Card>
              <Card className="flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-gray-100 bg-white p-7 text-center shadow-lg">
                <p className="mb-2 text-sm font-semibold text-gray-500">ציון סופי</p>
                <p className="text-6xl font-bold text-gray-900">{scoreOutOf100}</p>
              </Card>
              <Card className="flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-cyan-100 bg-gradient-to-l from-cyan-50 to-teal-50 p-7 text-center shadow-lg">
                <p className="mb-2 text-sm font-semibold text-teal-700">משוב</p>
                <p className="text-base leading-8 text-gray-700">{getSummaryMessage(scoreOutOf100)}</p>
              </Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                onClick={handlePracticeAgain}
                className="w-full bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-12 rounded-xl"
              >
                תרגול נוסף
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 rounded-xl border border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                חזרה לקורסים שלי
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-32" dir="rtl">
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
              <p className="text-xl text-gray-600">קורס: {questionDataCourseId}</p>
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
                  <div>קורס: {questionDataCourseId}</div>
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