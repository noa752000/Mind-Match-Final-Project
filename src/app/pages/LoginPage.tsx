import { useState } from 'react';
import { GraduationCap, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Logo } from '../components/Logo';

interface LoginPageProps {
  onLogin: () => Promise<boolean>;
  onBackToHome: () => void;
}

export function LoginPage({ onLogin, onBackToHome }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const success = await onLogin();
      if (!success) {
        setError('התחברות נכשלה. אנא נסה שוב.');
      }
    } catch (err) {
      setError('אירעה שגיאה בעת ההתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50" dir="rtl">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" onClick={onBackToHome} className="text-gray-600">
              חזרה לדף הבית
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-start">
          {/* Right Side - Login Form */}
          <Card className="p-12 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="text-right mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">התחברות</h2>
              <p className="text-gray-600 text-xl leading-relaxed">
                ברוך שובך! התחבר עם חשבון Google שלך כדי להמשיך ללמוד
              </p>
            </div>

            <div className="space-y-6">
              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Google logo SVG */}
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                <span className="text-gray-700 font-medium text-base">
                  {isLoading ? 'מתחבר...' : 'התחבר עם Google'}
                </span>
              </button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-right">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-right">
                <p className="text-blue-600 text-sm leading-relaxed">
                  🔒 התחברות בטוחה עם Google - פרטיותך מוגנת
                </p>
              </div>
            </div>
          </Card>

          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div className="text-right">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                למידה חכמה,<br />
                <span className="bg-gradient-to-l from-teal-500 to-teal-600 bg-clip-text text-transparent">
                  תוצאות מדהימות
                </span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                הפלטפורמה המתקדמת ביותר ללמידה אקדמית עם בינה מלאכותית
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-teal-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">מורה AI אישי</h4>
                  <p className="text-gray-600 leading-relaxed">
                    קבל תשובות מיידיות והסברים מפורטים לכל שאלה בקורס
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">ניתוח ותובנות</h4>
                  <p className="text-gray-600 leading-relaxed">
                    עקוב אחר ההתקדמות שלך וקבל המלצות מותאמות אישית
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">למידה מותאמת</h4>
                  <p className="text-gray-600 leading-relaxed">
                    תרגול חכם שמתאים את עצמו לרמה ולקצב הלמידה שלך
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-l from-teal-500 to-teal-600 rounded-2xl text-white">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-teal-100 text-sm mb-1">מצטרפים אלינו</p>
                  <p className="text-3xl font-bold">8,500+ סטודנטים</p>
                </div>
                <GraduationCap className="w-16 h-16 text-teal-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
