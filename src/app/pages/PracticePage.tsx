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
import { BookOpen, CheckCircle, XCircle, ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { courseName } from '../lib/analyticsTypes';
import { coursesData } from '../data/coursesData';

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
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean; timeSpent: number }[]>([]);
  const [answerHistory, setAnswerHistory] = useState<(string | null)[]>([]);

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

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) return;
    const prevIdx = currentQuestionIndex - 1;
    const prevAnswer = answerHistory[prevIdx] ?? null;
    setCurrentQuestionIndex(prevIdx);
    setSelectedAnswer(prevAnswer);
    setShowFeedback(prevAnswer !== null);
  };

  const handleAnswerClick = async (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);

    // שמירת התשובה בהיסטוריה
    setAnswerHistory(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = option;
      return updated;
    });

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
    const nextIdx = currentQuestionIndex + 1;

    if (nextIdx < questions.length) {
      const nextAnswer = answerHistory[nextIdx] ?? null;
      setCurrentQuestionIndex(nextIdx);
      setSelectedAnswer(nextAnswer);
      setShowFeedback(nextAnswer !== null);
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
      <div className="min-h-screen bg-gray-50 mr-64 pt-28" dir="rtl">
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
      <div className="min-h-screen bg-gray-50 mr-64 pt-28" dir="rtl">
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

  if (showSummary) {
    return (
      <div className="fixed inset-0 top-28 mr-64 bg-gray-50 flex items-center justify-center" dir="rtl">
        <Card className="relative overflow-hidden w-full max-w-2xl mx-6 p-7 shadow-2xl border-gray-200 rounded-3xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-l from-teal-500 to-cyan-500 text-white shadow-lg mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">סיימת את התרגול!</h2>
            <p className="text-gray-500 text-sm">הנה הסיכום שלך</p>
          </div>

          {/* Course pill */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-l from-teal-500 to-cyan-500 px-6 py-2 text-white shadow-md">
              <span className="text-sm font-bold">{displayedCourseName}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Card className="flex flex-col items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 p-4 text-center shadow-sm">
              <p className="text-xs font-semibold text-teal-700 mb-1">תשובות נכונות</p>
              <p className="text-4xl font-bold text-gray-900">{correctCount}/{totalQuestions}</p>
            </Card>
            <Card className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">
              <p className="text-xs font-semibold text-gray-500 mb-1">ציון סופי</p>
              <p className="text-4xl font-bold text-gray-900">{scoreOutOf100}</p>
            </Card>
            <Card className="flex flex-col items-center justify-center rounded-2xl border border-cyan-100 bg-gradient-to-l from-cyan-50 to-teal-50 p-4 text-center shadow-sm">
              <p className="text-xs font-semibold text-teal-700 mb-1">משוב</p>
              <p className="text-sm leading-snug text-gray-700">{getSummaryMessage(scoreOutOf100)}</p>
            </Card>
          </div>

          {/* Buttons */}
          <div className="grid gap-3 grid-cols-2">
            <Button
              onClick={handlePracticeAgain}
              className="w-full bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-10 rounded-xl"
            >
              תרגול נוסף
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full h-10 rounded-xl border border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              חזרה לקורסים שלי
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correctAnswer;
  const progressPct = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const letters = ['א', 'ב', 'ג', 'ד'];
  const hebrewCourseName = coursesData[courseId]?.title ?? questionDataCourseId;

  return (
    <div
      className="fixed inset-0 top-28 mr-64 flex flex-col overflow-hidden"
      dir="rtl"
      style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #0891b2 100%)' }}
    >

      {/* עיגולים דקורטיביים */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-cyan-300/10 rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-teal-300/10 rounded-full blur-2xl z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute top-10 left-1/2 w-32 h-32 bg-cyan-200/10 rounded-full blur-xl z-0 pointer-events-none" />

      {/* גריד נקודות */}
      <div
        className="absolute top-4 right-4 w-44 h-36 z-0 opacity-25 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1.5px)', backgroundSize: '14px 14px' }}
      />
      <div
        className="absolute bottom-4 left-4 w-36 h-28 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1.5px)', backgroundSize: '14px 14px' }}
      />

      {/* Sparkles דקורטיביים */}
      <Sparkles className="absolute top-1/3 right-8 w-5 h-5 text-white/20 z-0 pointer-events-none" />
      <Sparkles className="absolute bottom-1/3 left-10 w-4 h-4 text-white/15 z-0 pointer-events-none" />
      <Sparkles className="absolute top-1/4 left-1/4 w-3 h-3 text-white/15 z-0 pointer-events-none" />

      {/* שורת ניווט */}
      <div className="relative z-10 px-6 h-11 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white/80">{currentQuestionIndex + 1} / {questions.length}</span>
          <div className="w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-sm font-bold text-white w-8">{progressPct}%</span>
        </div>
      </div>

      {/* תוכן מרכזי */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="min-h-full flex items-center justify-center px-6 py-3">
          <div className="w-full max-w-[500px]">

            {/* שם הקורס בעברית - מעל הכרטיס */}
            <div className="flex items-center justify-center mb-3">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-1.5 rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="text-xs font-bold text-white">{hebrewCourseName}</span>
              </div>
            </div>

            {/* כרטיס שאלה */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100" style={{ boxShadow: '0 10px 40px -8px rgba(0,0,0,0.10), 0 2px 12px -4px rgba(20,184,166,0.08)' }}>

              {/* פס צבע עליון */}
              <div className="h-1 bg-gradient-to-l from-teal-400 via-cyan-400 to-emerald-400" />

              <div className="px-7 pt-4 pb-5">

                {/* מספר שאלה + תת-נושא */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {question.subTopic && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">{question.subTopic}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                    שאלה {currentQuestionIndex + 1} מתוך {questions.length}
                  </span>
                </div>

                {/* שאלה */}
                <h2 className="text-base font-bold text-gray-900 leading-relaxed text-right mb-3 whitespace-pre-line">
                  <span dangerouslySetInnerHTML={{ __html: question.question }} />
                </h2>

                {/* תמונה */}
                {question.imageUrl && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={question.imageUrl} alt="תמונה לשאלה" className="w-full object-contain max-h-48" />
                  </div>
                )}

                {/* מפריד */}
                <div className="h-px bg-gradient-to-l from-transparent via-gray-200 to-transparent mb-3" />

                {/* תשובות */}
                <div className="space-y-1.5">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isRightAnswer = question.correctAnswer === option;

                    let wrapCls = 'border-gray-200 bg-gray-50/50 text-gray-800 hover:border-teal-400 hover:bg-teal-50/60 cursor-pointer';
                    let letterCls = 'bg-white text-gray-500 border border-gray-200';

                    if (showFeedback) {
                      if (isRightAnswer) {
                        wrapCls = 'border-green-400 bg-green-50 text-green-800 cursor-default';
                        letterCls = 'bg-green-500 text-white border-green-500';
                      } else if (isSelected) {
                        wrapCls = 'border-red-400 bg-red-50 text-red-800 cursor-default';
                        letterCls = 'bg-red-500 text-white border-red-500';
                      } else {
                        wrapCls = 'border-gray-100 bg-gray-50 text-gray-400 cursor-default';
                        letterCls = 'bg-gray-100 text-gray-300 border-gray-200';
                      }
                    } else if (isSelected) {
                      wrapCls = 'border-teal-500 bg-teal-50/80 text-teal-900 cursor-pointer';
                      letterCls = 'bg-teal-500 text-white border-teal-500';
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        disabled={showFeedback}
                        className={`w-full flex items-center gap-3 text-right border-2 rounded-xl px-3.5 py-2.5 transition-all duration-150 ${wrapCls}`}
                      >
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${letterCls}`}>
                          {letters[idx]}
                        </span>
                        <span className="flex-1 text-sm font-medium">
                          <span dangerouslySetInnerHTML={{ __html: option }} />
                        </span>
                        {showFeedback && isRightAnswer && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                        {showFeedback && isSelected && !isRightAnswer && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* אזור ניווט תחתון */}
                {(currentQuestionIndex > 0 || showFeedback) && (
                  <div className="mt-3 pt-3 border-t border-gray-100">

                    {/* שורת פידבק + הבא (אחרי מענה) */}
                    {showFeedback && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold flex-shrink-0 ${isCorrect ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                          {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? 'נכון!' : 'שגוי'}
                        </div>
                        <button
                          onClick={handleNextQuestion}
                          className="flex-1 h-9 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                          {currentQuestionIndex < questions.length - 1 ? 'לשאלה הבאה' : 'סיום תרגול'}
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* כפתור חזרה לשאלה קודמת */}
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handlePreviousQuestion}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-200 text-gray-500 hover:text-teal-600 hover:border-teal-300 hover:bg-teal-50/50 transition-all text-sm font-medium"
                      >
                        <ChevronRight className="w-4 h-4" />
                        צפה בתשובה של שאלה קודמת
                      </button>
                    )}
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