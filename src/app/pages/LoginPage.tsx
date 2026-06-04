import { useState } from 'react';
import { GraduationCap, Sparkles, TrendingUp, Users, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Logo } from '../components/Logo';

interface LoginPageProps {
  onLogin: () => Promise<boolean>;
  onLoginWithEmail: (email: string, password: string) => Promise<boolean>;
  onRegisterWithEmail: (fullName: string, email: string, password: string) => Promise<boolean>;
  onBackToHome: () => void;
}

type Mode = 'login' | 'register';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

export function LoginPage({ onLogin, onLoginWithEmail, onRegisterWithEmail, onBackToHome }: LoginPageProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    resetForm();
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      const success = await onLogin();
      if (!success) {
        setError('התחברות עם Google נכשלה. אנא נסי שוב.');
      }
    } catch (err: any) {
      setError(err?.message || 'אירעה שגיאה בעת ההתחברות עם Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('הסיסמאות אינן תואמות');
        return;
      }
      if (password.length < 6) {
        setError('הסיסמה חייבת להכיל לפחות 6 תווים');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await onLoginWithEmail(email, password);
      } else {
        await onRegisterWithEmail(fullName, email, password);
      }
    } catch (err: any) {
      setError(err?.message || 'אירעה שגיאה. אנא נסי שוב.');
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

      <div className="flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-start">
          {/* Right Side - Auth Card */}
          <Card className="p-10 bg-white/80 backdrop-blur-sm shadow-xl">
            {/* Tab switcher */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LogIn className="w-4 h-4" />
                התחברות
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                הרשמה
              </button>
            </div>

            <div className="text-right mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'ברוך שובך!' : 'הצטרף אלינו'}
              </h2>
              <p className="text-gray-500 text-base">
                {mode === 'login'
                  ? 'התחבר לחשבון שלך כדי להמשיך ללמוד'
                  : 'צור חשבון חדש ותתחיל ללמוד בחינם'}
              </p>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-right text-sm font-medium text-gray-700">שם מלא</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    placeholder="הזן שם מלא"
                    required
                    dir="rtl"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-right text-sm font-medium text-gray-700">אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-right text-sm font-medium text-gray-700">סיסמה</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    placeholder={mode === 'register' ? 'לפחות 6 תווים' : '••••••••'}
                    required
                    dir="rtl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-right text-sm font-medium text-gray-700">אימות סיסמה</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                      placeholder="הזן את הסיסמה שוב"
                      required
                      dir="rtl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-right">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading
                  ? mode === 'login' ? 'מתחבר...' : 'נרשם...'
                  : mode === 'login' ? 'התחבר' : 'הירשם'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">או</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 mt-5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span className="text-gray-700 font-medium text-sm">
                {isGoogleLoading
                  ? 'מתחבר...'
                  : mode === 'login'
                  ? 'התחבר עם Google'
                  : 'הירשם עם Google'}
              </span>
            </button>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                {mode === 'login' ? 'עדיין אין לך חשבון? ' : 'כבר יש לך חשבון? '}
                <button
                  onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  {mode === 'login' ? 'הירשם כאן' : 'התחבר כאן'}
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
                  <p className="text-teal-100 text-sm mb-1">
                    {mode === 'login' ? 'מצטרפים אלינו' : 'הצטרפו אלינו'}
                  </p>
                  <p className="text-3xl font-bold">8,500+ סטודנטים</p>
                  {mode === 'register' && (
                    <p className="text-teal-100 text-sm mt-2">וכל יום מצטרפים עוד...</p>
                  )}
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
