import { useState } from 'react';
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
import { SettingsPage } from './pages/SettingsPage';
import { CommunityPage } from './pages/CommunityPage';
import { CalendarSyncProvider } from './contexts/CalendarSyncContext';

function AppContent() {
  const { isAuthenticated, user, loginWithGoogle, loginWithEmail, registerWithEmail, logout, loading } = useAuth();

  const [currentPage, setCurrentPage] = useState<
    'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'practice' | 'course-detail' | 'settings' | 'community'
  >('home');

  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [tutorCourseId, setTutorCourseId] = useState<string>('');
  const [practiceCourseId, setPracticeCourseId] = useState<string>('');

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-detail');
  };

  const handleOpenPractice = (courseId: string) => {
    setPracticeCourseId(courseId);
    setCurrentPage('practice');
  };

  const handleBackToCourses = () => {
    setCurrentPage('courses');
  };

  const handleOpenTutor = (courseId?: string) => {
    if (courseId) {
      setTutorCourseId(courseId);
    }
    setCurrentPage('tutor');
  };

  const handleBackToCourseFromTutor = () => {
    if (tutorCourseId) {
      setCurrentPage('course-detail');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
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
    return (
      <LoginPage
        onLogin={loginWithGoogle}
        onLoginWithEmail={loginWithEmail}
        onRegisterWithEmail={registerWithEmail}
        onBackToHome={() => {}}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        userName={user?.fullName}
      />
      <TopNavBar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
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
      {currentPage === 'settings' && <SettingsPage />}
      {currentPage === 'community' && <CalendarSyncProvider><CommunityPage /></CalendarSyncProvider>}
      {currentPage === 'practice' && (
        <PracticePage
          courseId={practiceCourseId}
          onBack={() => setCurrentPage('courses')}
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