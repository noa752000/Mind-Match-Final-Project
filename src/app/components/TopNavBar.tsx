import { Bell } from 'lucide-react';
import logoImage from '../../assets/logo.png';

interface TopNavBarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => void;
  onLogout: () => void;
  userName?: string;
}

export function TopNavBar({ onNavigate, userName }: TopNavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* לוגו בצד שמאל */}
        <div className="flex items-center">
          <img src={logoImage} alt="MindMatch Logo" className="h-18 w-auto" />
        </div>

        {/* משתמש והתראות */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors"
          >
            {userName || 'הדס לוי'}
          </button>
        </div>
      </div>
    </div>
  );
}