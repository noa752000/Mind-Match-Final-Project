import { Hero } from '../components/Hero';
import { AIExplanation } from '../components/AIExplanation';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

interface HomePageProps {
  onNavigate?: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => void;
  isGuest?: boolean;
  onLoginClick?: () => void;
}

export function HomePage({ onNavigate, isGuest, onLoginClick }: HomePageProps) {
  const handleNavigate = (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className={`${isGuest ? 'pt-20' : 'mr-64 pt-20'} min-h-screen bg-transparent`} dir="rtl">
      {isGuest && (
        <Navigation
          onNavigate={() => {}}
          isAuthenticated={false}
          onLoginClick={onLoginClick}
        />
      )}
      <main>
        <Hero onNavigate={handleNavigate} isGuest={isGuest} onLoginClick={onLoginClick} />
        <AIExplanation />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}