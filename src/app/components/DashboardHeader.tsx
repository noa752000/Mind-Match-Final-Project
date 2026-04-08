import { Bell, Search, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function DashboardHeader() {
  return (
    <header className="fixed top-0 left-0 right-64 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-30">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Greeting - Right side for RTL */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900">שלום, הדס!</h1>
            <p className="text-sm text-gray-600">בואי נמשיך ללמוד היום</p>
          </div>

          {/* Icons - Left side for RTL */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}