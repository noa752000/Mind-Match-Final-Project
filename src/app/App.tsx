import { useState, useEffect } from 'react';
import { coursesData } from './data/coursesData';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { TopNavBar } from './components/TopNavBar';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { AITutorPage } from './pages/AITutorPage';
import { CalendarPage } from './pages/CalendarPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/LoginPage';
import { PracticePage } from './pages/PracticePage';
import { CommunityPage } from './pages/CommunityPage';
import { CalendarSyncProvider } from './contexts/CalendarSyncContext';

function AppContent() {
  const { isAuthenticated, user, loginWithGoogle, loginWithEmail, registerWithEmail, logout, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState<
    'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'practice' | 'course-detail' | 'community'
  >('home');

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [tutorCourseId, setTutorCourseId] = useState<string>('');
  const [practiceCourseId, setPracticeCourseId] = useState<string>('');
  const [practiceSource, setPracticeSource] = useState<'dashboard' | 'course-detail' | 'courses'>('courses');
  const [guestMode, setGuestMode] = useState(false);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-detail');
    scrollTop();
  };

  const handleOpenPractice = (courseId: string) => {
    setPracticeCourseId(courseId);
    setPracticeSource(
      currentPage === 'dashboard' ? 'dashboard' :
      currentPage === 'course-detail' ? 'course-detail' :
      'courses'
    );
    setCurrentPage('practice');
    scrollTop();
  };

  const handleBackToCourses = () => {
    setCurrentPage('courses');
    scrollTop();
  };

  const handleOpenTutor = (courseId?: string) => {
    if (courseId) setTutorCourseId(courseId);
    setCurrentPage('tutor');
    scrollTop();
  };

  const handleBackToCourseFromTutor = () => {
    setCurrentPage(tutorCourseId ? 'course-detail' : 'dashboard');
    scrollTop();
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    scrollTop();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (guestMode) {
      return (
        <HomePage
          onNavigate={() => {}}
          isGuest
          onLoginClick={() => setGuestMode(false)}
        />
      );
    }
    return (
      <LoginPage
        onLogin={loginWithGoogle}
        onLoginWithEmail={loginWithEmail}
        onRegisterWithEmail={registerWithEmail}
        onBackToHome={() => setGuestMode(true)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-100">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => { setCurrentPage(page); scrollTop(); }}
        onLogout={handleLogout}
        userName={user?.fullName}
      />
      <TopNavBar
        currentPage={currentPage}
        onNavigate={(page) => { setCurrentPage(page); scrollTop(); }}
        onLogout={handleLogout}
        userName={user?.fullName}
      />

      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && (
        <DashboardPage onOpenPractice={handleOpenPractice} onNavigateToCourses={() => setCurrentPage('courses')} />
      )}
      {currentPage === 'courses' && (
        <CoursesPage onCourseSelect={handleCourseSelect} />
      )}
      {currentPage === 'course-detail' && (
        <CourseDetailPage
          courseId={selectedCourseId}
          onBack={handleBackToCourses}
          onOpenTutor={handleOpenTutor}
          onOpenPractice={handleOpenPractice}
        />
      )}
      {currentPage === 'calendar' && <CalendarPage />}
      {currentPage === 'tutor' && (
        <AITutorPage
          courseId={tutorCourseId}
          onBack={handleBackToCourseFromTutor}
        />
      )}
      {currentPage === 'analysis' && <AnalysisPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'community' && <CalendarSyncProvider><CommunityPage /></CalendarSyncProvider>}
      {currentPage === 'practice' && (
        <PracticePage
          courseId={practiceCourseId}
          onBack={() => {
            if (practiceSource === 'dashboard') setCurrentPage('dashboard');
            else if (practiceSource === 'course-detail') setCurrentPage('course-detail');
            else setCurrentPage('courses');
          }}
          backLabel={
            practiceSource === 'dashboard' ? 'חזרה לקורסים שלי' :
            practiceSource === 'course-detail' ? `חזרה ל${coursesData[practiceCourseId]?.title ?? 'הקורס'}` :
            'חזרה לקורסים'
          }
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}