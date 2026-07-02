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

interface PracticePageProps {
  courseId: string;
  onBack: () => void;
  backLabel?: string;
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

export function PracticePage({ courseId, onBack, backLabel = '{backLabel}' }: PracticePageProps) {
  const { user } = useAuth();
  const appUserId = user?.userId || "user_1";
  // The courseId value as stored on the question documents themselves
  // (e.g. "html_fundamentals" for the "html" catalog course).
  const questionDataCourseId = QUESTION_DATA_COURSE_ID[courseId] || courseId;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
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

    await updateCourseProgress();
    await updateUserAggregateStats();
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-20" dir="rtl">
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
      <div className="min-h-screen bg-gray-50 mr-64 pt-20" dir="rtl">
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
              {backLabel}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 mr-64 pt-20" dir="rtl">
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
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">סיימת את התרגול 🎉</h1>
            <p className="text-gray-600 mb-6">קורס: {questionDataCourseId}</p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              {backLabel}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progressPct = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const letters = ['א', 'ב', 'ג', 'ד'];

  return (
    <div className="fixed inset-0 top-20 mr-64 flex flex-col bg-gradient-to-br from-slate-50 via-white to-teal-50/40" dir="rtl">

      {/* שורת התקדמות */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 h-12 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-800 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-medium">{questionDataCourseId}</span>
          <span className="text-sm font-semibold text-gray-600">שאלה {currentQuestionIndex + 1} / {questions.length}</span>
          <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-teal-400 to-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-sm font-bold text-teal-600 w-8">{progressPct}%</span>
        </div>
      </div>

      {/* אזור תוכן - מרוכז, גולל רק אם צריך */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center px-6 py-5">
          <div className="w-full max-w-xl">

            {/* כרטיס שאלה */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 border border-gray-100 overflow-hidden">

              {/* פס צבע עליון */}
              <div className="h-1 bg-gradient-to-l from-teal-400 via-cyan-400 to-teal-600" />

              <div className="px-8 pt-6 pb-7">

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs font-bold bg-teal-500 text-white px-3 py-1 rounded-full">
                    שאלה {currentQuestionIndex + 1}
                  </span>
                  {question.subTopic && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{question.subTopic}</span>
                  )}
                </div>

                {/* טקסט השאלה */}
                <h2 className="text-lg font-bold text-gray-900 leading-relaxed text-right mb-5 whitespace-pre-line">
                  <span dangerouslySetInnerHTML={{ __html: question.question }} />
                </h2>

                {/* תמונה אם קיימת */}
                {question.imageUrl && (
                  <div className="mb-5 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={question.imageUrl}
                      alt="תמונה לשאלה"
                      className="w-full object-contain max-h-56"
                    />
                  </div>
                )}

                {/* קו הפרדה */}
                <div className="border-t border-gray-100 mb-4" />

                {/* כפתורי תשובה */}
                <div className="space-y-2">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isRightAnswer = question.correctAnswer === option;

                    let wrapCls = 'border-gray-200 bg-white text-gray-800 hover:border-teal-400 hover:bg-teal-50/50 hover:shadow-sm cursor-pointer';
                    let letterCls = 'bg-gray-100 text-gray-500';

                    if (showFeedback) {
                      if (isRightAnswer) {
                        wrapCls = 'border-green-400 bg-green-50 text-green-800 cursor-default';
                        letterCls = 'bg-green-500 text-white';
                      } else if (isSelected) {
                        wrapCls = 'border-red-400 bg-red-50 text-red-800 cursor-default';
                        letterCls = 'bg-red-500 text-white';
                      } else {
                        wrapCls = 'border-gray-100 bg-gray-50/60 text-gray-400 cursor-default';
                        letterCls = 'bg-gray-200 text-gray-400';
                      }
                    } else if (isSelected) {
                      wrapCls = 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm cursor-pointer';
                      letterCls = 'bg-teal-500 text-white';
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        disabled={showFeedback}
                        className={`w-full flex items-center gap-3 text-right border-2 rounded-2xl px-4 py-3 transition-all duration-150 ${wrapCls}`}
                      >
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${letterCls}`}>
                          {letters[idx]}
                        </span>
                        <span className="flex-1 text-sm font-medium">
                          <span dangerouslySetInnerHTML={{ __html: option }} />
                        </span>
                        {showFeedback && isRightAnswer && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                        {showFeedback && isSelected && !isRightAnswer && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* פידבק + כפתור הבא */}
                {showFeedback && (
                  <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold flex-shrink-0 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {isCorrect ? 'נכון!' : 'שגוי'}
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 h-10 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'לשאלה הבאה' : 'סיום תרגול'}
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}