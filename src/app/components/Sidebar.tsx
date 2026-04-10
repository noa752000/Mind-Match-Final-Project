import { Home, BookOpen, MessageSquare, Users, Calendar, BarChart3, Settings, HelpCircle, LogOut, User, GraduationCap, Bell } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage?: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'practice' | 'course-detail';
  onNavigate?: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'practice' | 'course-detail') => void;
  onLogout?: () => void;
  userName?: string;
}

export function Sidebar({ currentPage = 'dashboard', onNavigate, onLogout, userName = 'הדס לוי' }: SidebarProps) {
  const menuItems = [
    { id: 'home' as const, icon: Home, label: 'בית' },
    { id: 'courses' as const, icon: GraduationCap, label: 'קורסים' },
    { id: 'dashboard' as const, icon: BookOpen, label: 'הקורסים שלי' },
    { id: 'calendar' as const, icon: Calendar, label: 'לוח שנה' },
    { id: 'analysis' as const, icon: BarChart3, label: 'לוח מחוונים' },
    { id: 'profile' as const, icon: User, label: 'פרופיל' },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'הגדרות', action: () => console.log('הגדרות') },
    { icon: HelpCircle, label: 'עזרה', action: () => console.log('עזרה') },
    { icon: LogOut, label: 'התנתק', action: onLogout },
  ];

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-l border-gray-200 flex flex-col z-40">
      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-end gap-3 ${
                    isActive 
                      ? 'bg-teal-600 text-white hover:bg-teal-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => onNavigate?.(item.id)}
                >
                  <span>{item.label}</span>
                  <Icon className="w-5 h-5" />
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isLogout = item.label === 'התנתק';
            return (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={`w-full justify-end gap-3 ${
                    isLogout 
                      ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={item.action}
                >
                  <span>{item.label}</span>
                  <Icon className="w-5 h-5" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}