import { ProgressOverview } from '../components/ProgressOverview';
import { CoursesList } from '../components/CoursesList';
import { AIRecommendations } from '../components/AIRecommendations';

interface DashboardPageProps {
  onOpenPractice: (courseId: string) => void;
}

export function DashboardPage({ onOpenPractice }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1176px] mx-auto">
          {/* Page Header */}
          <div className="text-right mb-8">
            <h1 className="text-3xl font-bold text-gray-900">הקורסים שלי</h1>
          </div>

          <ProgressOverview />

          {/* 🔥 פה החיבור החשוב */}
          <CoursesList onOpenPractice={onOpenPractice} />

          <AIRecommendations />
        </div>
      </main>
    </div>
  );
}