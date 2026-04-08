import { User, Menu, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  onNavigate: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar') => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isAuthenticated?: boolean;
}

export function Navigation({ onNavigate, onLoginClick, onRegisterClick, isAuthenticated = false }: NavigationProps) {
  return (
    <nav className={`fixed top-0 right-0 left-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${isAuthenticated ? 'mr-64' : ''}`}>
      <div className="max-w-[1440px] mx-auto px-16 py-4">
        <div className="flex items-center justify-end">
          {isAuthenticated ? (
            /* Profile & Name - Right side for RTL */
            <div className="flex items-center gap-3 mr-8">
              <span className="text-gray-900 font-medium">הדס כהן</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => onNavigate('profile')}
              >
                <User className="w-5 h-5 text-gray-700" />
              </Button>
            </div>
          ) : (
            /* Login & Register Buttons for guests */
            <div className="flex items-center gap-3 mr-8">
              <Button 
                onClick={onLoginClick}
                variant="outline"
                className="px-6"
              >
                <LogIn className="w-4 h-4 ml-2" />
                התחבר
              </Button>
              <Button 
                onClick={onRegisterClick}
                className="bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6"
              >
                <UserPlus className="w-4 h-4 ml-2" />
                הירשם
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}