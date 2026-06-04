import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import { NotificationsPanel } from './NotificationsPanel';
import { useAuth } from '../contexts/AuthContext';

interface TopNavBarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => void;
  onLogout: () => void;
  userName?: string;
}

export function TopNavBar({ onNavigate, userName }: TopNavBarProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    if (user?.userId) {
      const key = `notifications_read_${user.userId}`;
      setHasUnread(localStorage.getItem(key) !== 'true');
    }
  }, [user?.userId]);

  const handleBellClick = () => {
    const next = !open;
    setOpen(next);
    if (next && user?.userId) {
      setHasUnread(false);
      localStorage.setItem(`notifications_read_${user.userId}`, 'true');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* לוגו */}
        <div className="flex items-center">
          <img src={logoImage} alt="MindMatch Logo" className="h-18 w-auto" />
        </div>

        {/* משתמש והתראות */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={handleBellClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {hasUnread && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {open && <NotificationsPanel onClose={() => setOpen(false)} />}
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors"
          >
            {userName || 'משתמש'}
          </button>
        </div>
      </div>
    </div>
  );
}
