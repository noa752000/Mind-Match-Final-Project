import { useState } from 'react';
import { LogIn, GraduationCap, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Logo } from '../components/Logo';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<boolean>;
  onBackToHome: () => void;
  onRegister?: () => void;
}

export function LoginPage({ onLogin, onBackToHome, onRegister }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await onLogin(username, password);
    
    if (!success) {
      setError('שם משתמש או סיסמה שגויים');
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
                ברוך שובך! התחבר כדי להמשיך ללמוד
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-right text-sm font-medium text-gray-700">
                  שם משתמש
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="הזן שם משתמש"
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-right text-sm font-medium text-gray-700">
                  סיסמה
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="הזן סיסמה"
                  required
                  dir="rtl"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-right">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  'מתחבר...'
                ) : (
                  <>
                    <LogIn className="w-5 h-5 ml-2" />
                    התחבר
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                אין לך חשבון?{' '}
                <button 
                  onClick={onRegister}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  הירשם כאן
                </button>
              </p>
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