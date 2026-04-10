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
import { RegisterPage } from './pages/RegisterPage';
import { PracticePage } from './pages/PracticePage';

function AppContent() {
  const { isAuthenticated, user, login, register, logout } = useAuth();
const [currentPage, setCurrentPage] = useState<
  'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'practice' | 'course-detail'
>('home');
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
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

  // אם המשתמש לא מחובר, הצג את עמוד ההתחברות
  if (!isAuthenticated) {
    if (authPage === 'login') {
      return (
        <LoginPage 
          onLogin={login} 
          onBackToHome={() => {}} 
          onRegister={() => setAuthPage('register')}
        />
      );
    } else {
      return (
        <RegisterPage 
          onRegister={register} 
          onBackToHome={() => {}} 
          onLogin={() => setAuthPage('login')}
        />
      );
    }
  }

  // הצג את הפלטפורמה המלאה עם משתמש מחובר
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} userName={user?.fullName} />
      <TopNavBar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} userName={user?.fullName} />
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && (
          <DashboardPage onOpenPractice={handleOpenPractice} />
      )}
      {currentPage === 'courses' && <CoursesPage onCourseSelect={handleCourseSelect} />}
      {currentPage === 'course-detail' && <CourseDetailPage courseId={selectedCourseId} onBack={handleBackToCourses} onOpenTutor={handleOpenTutor} />}
      {currentPage === 'calendar' && <CalendarPage />}
      {currentPage === 'tutor' && <AITutorPage courseId={tutorCourseId} onBack={handleBackToCourseFromTutor} />}
      {currentPage === 'analysis' && <AnalysisPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'practice' && (
          <PracticePage courseId="course_1" onBack={() => setCurrentPage('courses')} />
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