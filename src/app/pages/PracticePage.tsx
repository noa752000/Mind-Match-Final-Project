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

  return (
    <div className="fixed inset-0 top-20 mr-64 flex flex-col overflow-hidden" dir="rtl">

      {/* שורת עליונה: חזרה + התקדמות */}
      <div className="bg-white border-b border-gray-200 px-6 h-12 flex items-center justify-between flex-shrink-0 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{questionDataCourseId}</span>
          <span className="text-sm font-semibold text-gray-700">שאלה {currentQuestionIndex + 1} / {questions.length}</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-sm font-bold text-teal-600 w-8 text-left">{progressPct}%</span>
        </div>
      </div>

      {/* גוף הדף: שתי עמודות */}
      <div className="flex-1 flex min-h-0">

        {/* עמודה שמאל - השאלה על רקע כהה */}
        <div className="w-[45%] bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 flex flex-col justify-center px-10 py-8 text-white">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">
              שאלה {currentQuestionIndex + 1}
            </span>
            {question.subTopic && (
              <span className="text-xs text-teal-100 bg-white/10 px-2 py-1 rounded-full">{question.subTopic}</span>
            )}
          </div>

          <h2 className="text-xl font-bold leading-relaxed text-right whitespace-pre-line mb-6" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
          </h2>

          {question.imageUrl && (
            <div className="bg-white/10 rounded-2xl p-3 border border-white/20">
              <img
                src={question.imageUrl}
                alt="שאלה ויזואלית"
                className="w-full max-h-52 object-contain rounded-xl"
              />
            </div>
          )}

          <div className="mt-auto pt-6 flex items-center gap-3 opacity-60">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white/70">{progressPct}% הושלם</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>
        </div>

        {/* עמודה ימין - תשובות על רקע בהיר */}
        <div className="flex-1 bg-gray-50 flex flex-col justify-center px-10 py-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-right mb-4">בחר תשובה</p>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isRightAnswer = question.correctAnswer === option;
              const letters = ['א', 'ב', 'ג', 'ד'];

              let borderColor = 'border-gray-200';
              let bgColor = 'bg-white';
              let textColor = 'text-gray-800';
              let labelBg = 'bg-gray-100 text-gray-500';

              if (showFeedback) {
                if (isRightAnswer) {
                  borderColor = 'border-green-400';
                  bgColor = 'bg-green-50';
                  textColor = 'text-green-800';
                  labelBg = 'bg-green-200 text-green-700';
                } else if (isSelected) {
                  borderColor = 'border-red-400';
                  bgColor = 'bg-red-50';
                  textColor = 'text-red-800';
                  labelBg = 'bg-red-200 text-red-700';
                } else {
                  textColor = 'text-gray-400';
                  bgColor = 'bg-gray-50';
                  labelBg = 'bg-gray-100 text-gray-300';
                }
              } else if (isSelected) {
                borderColor = 'border-teal-500';
                bgColor = 'bg-teal-50';
                textColor = 'text-teal-900';
                labelBg = 'bg-teal-500 text-white';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                  className={`w-full flex items-center gap-3 text-right border-2 rounded-2xl px-4 py-3.5 transition-all duration-150 ${borderColor} ${bgColor} ${!showFeedback ? 'hover:border-teal-400 hover:bg-teal-50 hover:shadow-sm cursor-pointer' : 'cursor-default'}`}
                >
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${labelBg}`}>
                    {letters[idx]}
                  </span>
                  <span className={`flex-1 text-sm font-medium ${textColor}`}>
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </span>
                  {showFeedback && isRightAnswer && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                  {showFeedback && isSelected && !isRightAnswer && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-5 flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {isCorrect ? 'תשובה נכונה!' : 'תשובה שגויה'}
              </div>
              <button
                onClick={handleNextQuestion}
                className="flex-1 h-11 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? 'לשאלה הבאה' : 'סיום תרגול'}
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}