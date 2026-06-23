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
