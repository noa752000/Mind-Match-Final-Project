import { Hero } from '../components/Hero';
import { AIExplanation } from '../components/AIExplanation';
import { Features } from '../components/Features';
import { DashboardPreview } from '../components/DashboardPreview';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

interface HomePageProps {
  onNavigate?: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const handleNavigate = (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="mr-64 pt-16 min-h-screen bg-white" dir="rtl">
      <main>
        <Hero />
        <AIExplanation />
        <Features />
        <DashboardPreview onNavigate={handleNavigate} />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}