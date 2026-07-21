import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export const COURSE_NAMES: Record<string, string> = {
  calculus1: 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  oop: 'תכנות מונחה עצמים',
  html: 'HTML',
  sql: 'SQL',
  'systems_analysis': 'אפיון ותכן',
  'cyber_security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

export function courseName(courseId: string): string {
  return COURSE_NAMES[courseId] || courseId;
}

// Fixed total question count per course. Accuracy is always measured against
// this fixed denominator (not against however many questions were attempted),
// so answering e.g. 3/3 questions correctly does not read as 100%.
export const TOTAL_QUESTIONS_PER_COURSE: Record<string, number> = {
  calculus1: 36,
  'linear-algebra': 36,
  oop: 36,
  html: 36,
  sql: 36,
  systems_analysis: 36,
  cyber_security: 36,
  'mis-economics': 36,
};

export function courseAccuracy(correctAnswers: number, courseId: string, totalQuestionsInCourse?: number): number {
  const total = totalQuestionsInCourse || TOTAL_QUESTIONS_PER_COURSE[courseId] || 36;
  return total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
}

// Maps course catalog IDs (selectedCourses / course_progress) to the courseId
// values used on the question documents themselves, where they differ.
export const QUESTION_DATA_COURSE_ID: Record<string, string> = {
  'html': 'html_fundamentals',
  'linear-algebra': 'linear_algebra',
  'mis-economics': 'information_systems_economics',
};

// Fetches the real number of questions per course from the "questions"
// collection, so accuracy is measured against what's actually in the bank
// rather than a guessed constant. Falls back to TOTAL_QUESTIONS_PER_COURSE
// only if the live count comes back empty or the query fails.
export async function fetchTotalQuestionsPerCourse(courseIds: string[]): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  await Promise.all(courseIds.map(async (courseId) => {
    const questionDataCourseId = QUESTION_DATA_COURSE_ID[courseId] || courseId;
    try {
      const snap = await getDocs(query(collection(db, 'questions'), where('courseId', '==', questionDataCourseId)));
      map[courseId] = snap.size > 0 ? snap.size : (TOTAL_QUESTIONS_PER_COURSE[courseId] ?? 36);
    } catch {
      map[courseId] = TOTAL_QUESTIONS_PER_COURSE[courseId] ?? 36;
    }
  }));
  return map;
}

export type StudentLevel = 'beginner' | 'intermediate' | 'advanced';

export function studentLevelFor(averageGrade: number): StudentLevel {
  if (averageGrade < 60) return 'beginner';
  if (averageGrade <= 79) return 'intermediate';
  return 'advanced';
}

// The user's overall average is the average of each *currently selected*
// course's own accuracy — so adding or removing a course from the profile
// changes the average immediately, not just after practicing again.
export async function computeAverageGrade(
  userId: string,
  selectedCourses: string[]
): Promise<{ averageGrade: number; studentLevel: StudentLevel }> {
  const progressSnap = await getDocs(query(collection(db, 'course_progress'), where('userId', '==', userId)));
  const practicedSelected = progressSnap.docs
    .map((d) => d.data() as CourseProgressData)
    .filter((d) => selectedCourses.includes(d.courseId) && (d.totalAnswers || 0) > 0);

  const totalQuestionsMap = await fetchTotalQuestionsPerCourse(practicedSelected.map((d) => d.courseId));
  const courseAccuracies = practicedSelected.map((d) =>
    courseAccuracy(d.correctAnswers || 0, d.courseId, totalQuestionsMap[d.courseId])
  );

  const averageGrade = courseAccuracies.length > 0
    ? Math.round(courseAccuracies.reduce((sum, acc) => sum + acc, 0) / courseAccuracies.length)
    : 0;

  return { averageGrade, studentLevel: studentLevelFor(averageGrade) };
}

export type LearningType = 'knowledge' | 'analysis' | 'visual' | 'concept';

interface FirestoreTimestamp {
  toDate?: () => Date;
  seconds?: number;
}

export interface CourseProgressData {
  userId: string;
  courseId: string;
  totalAnswers: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestionsInCourse?: number;
  accuracy: number;
  knowledgeTotal: number;
  knowledgeCorrect: number;
  analysisTotal: number;
  analysisCorrect: number;
  visualTotal: number;
  visualCorrect: number;
  practicedMinutes: number;
  lastPracticedAt?: FirestoreTimestamp;
}

export interface PracticeResultData {
  userId: string;
  courseId: string;
  questionId: string;
  isCorrect: boolean;
  difficulty: number;
  learningType: LearningType;
  timeSpentSeconds: number;
  answeredAt?: FirestoreTimestamp;
}

export function timestampToDate(ts?: FirestoreTimestamp): Date | null {
  if (!ts) return null;
  if (typeof ts.toDate === 'function') return ts.toDate();
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000);
  return null;
}

export function formatMinutes(totalMinutes: number): string {
  const minutes = Math.round(totalMinutes || 0);
  if (minutes <= 0) return '0 דק׳';
  if (minutes < 60) return `${minutes} דק׳`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hours} שע׳ ${rem} דק׳` : `${hours} שע׳`;
}
