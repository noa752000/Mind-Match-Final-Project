import { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const TOTAL_COURSES = 8;

interface HeroProps {
  onRegisterClick?: () => void;
  onNavigate?: (page: 'home' | 'dashboard' | 'profile' | 'analysis' | 'tutor' | 'calendar' | 'courses' | 'course-detail') => void;
  isGuest?: boolean;
  onLoginClick?: () => void;
}

export function Hero({ onRegisterClick, onNavigate, isGuest, onLoginClick }: HeroProps) {
  // Display the logged-in user's name instead of a hardcoded name
  const { user } = useAuth();
  const displayName = user?.fullName || user?.username || 'סטודנט';

  const [studentsCount, setStudentsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        setStudentsCount(snap.size);
      } catch (error) {
        console.error('Failed to fetch homepage stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative pt-8 pb-20 px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Content - Right side for RTL */}
          <div className="col-span-12 md:col-span-6 text-right">
            <h2 className="text-2xl text-gray-700 mb-4">שלום {displayName}!</h2>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700">פלטפורמת למידה חכמה</span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              למידה מותאמת אישית
              <br />
              <span className="text-teal-600">מונעת בינה מלאכותית</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              פלטפורמת למידה מתקדמת לסטודנטים למערכות מידע. הבינה המלאכותית 
              שלנו לומדת את סגנון הלמידה שלך ומתאימה את התוכן במיוחד עבורך.
            </p>
            
            <div className="flex items-center gap-4 justify-start">
              <Button
                size="lg"
                className="text-lg px-8 bg-teal-600 hover:bg-teal-700"
                onClick={() => (isGuest ? onLoginClick?.() : onNavigate?.('dashboard'))}
              >
                התחל ללמוד עכשיו
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 mt-12 justify-start">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {studentsCount !== null ? studentsCount.toLocaleString() : '...'}
                </div>
                <div className="text-sm text-gray-600">סטודנטים פעילים</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{TOTAL_COURSES}</div>
                <div className="text-sm text-gray-600">קורסים</div>
              </div>
            </div>
          </div>

          {/* Image - Left side for RTL */}
          <div className="col-span-12 md:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1758612214899-c1bb0bfae408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3AlMjBtb2Rlcm58ZW58MXx8fHwxNzcxNDM0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student learning"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}