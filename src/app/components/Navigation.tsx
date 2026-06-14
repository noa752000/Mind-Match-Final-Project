import { Bell } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar') => void;
  onLoginClick?: () => void;
  isAuthenticated?: boolean;
}

export function Navigation({ onNavigate, onLoginClick, isAuthenticated = false }: NavigationProps) {
  return (
    <nav className={`fixed top-0 right-0 left-0 z-30 h-20 bg-white border-b border-gray-200 ${isAuthenticated ? 'mr-64' : ''}`}>
      <div className="h-full px-8 flex items-center justify-between">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors"
            >
              משתמש
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <button
                onClick={onLoginClick}
                className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors"
              >
                אורח
              </button>
            </div>
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
            >
              התחברות / הרשמה
            </button>
          </>
        )}
      </div>
    </nav>
  );
}