import { useState } from 'react';
import { Sparkles, TrendingUp, Users, Eye, EyeOff, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import logoImage from '../../assets/new.png';

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
    setEmail(''); setPassword(''); setConfirmPassword('');
    setFullName(''); setError('');
    setShowPassword(false); setShowConfirmPassword(false);
  };

  const switchMode = (newMode: Mode) => { setMode(newMode); resetForm(); };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      const success = await onLogin();
      if (!success) setError('התחברות עם Google נכשלה. אנא נסה שוב.');
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
      if (password !== confirmPassword) { setError('הסיסמאות אינן תואמות'); return; }
      if (password.length < 6) { setError('הסיסמה חייבת להכיל לפחות 6 תווים'); return; }
    }
    setIsLoading(true);
    try {
      if (mode === 'login') await onLoginWithEmail(email, password);
      else await onRegisterWithEmail(fullName, email, password);
    } catch (err: any) {
      setError(err?.message || 'אירעה שגיאה. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" dir="rtl">

      {/* ===== RIGHT SIDE — Auth Form ===== */}
      <div className="w-1/2 bg-white flex flex-col overflow-y-auto">

        <div className="px-12 pt-8 flex-shrink-0" />

        <div className="flex-1 flex flex-col justify-center px-16 py-8">
          <div className="w-full max-w-md mx-auto">

            <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'login' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LogIn className="w-4 h-4" />
                התחברות
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'register' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                הרשמה
              </button>
            </div>

            <div className="text-right mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                {mode === 'login' ? 'ברוך שובך!' : 'הצטרף אלינו'}
              </h2>
              <p className="text-gray-500">
                {mode === 'login'
                  ? 'התחבר לחשבון שלך כדי להמשיך ללמוד'
                  : 'צור חשבון חדש והתחל ללמוד בחינם'}
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-right text-sm font-medium text-gray-700">שם מלא</label>
                  <input
                    type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white"
                    placeholder="הזן שם מלא" required dir="rtl"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-right text-sm font-medium text-gray-700">אימייל</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-left border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white"
                  placeholder="example@email.com" required dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-right text-sm font-medium text-gray-700">סיסמה</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white"
                    placeholder={mode === 'register' ? 'לפחות 6 תווים' : '••••••••'} required dir="rtl"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-right text-sm font-medium text-gray-700">אימות סיסמה</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-10 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white"
                      placeholder="הזן את הסיסמה שוב" required dir="rtl"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-right">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit" disabled={isLoading || isGoogleLoading}
                className="w-full h-12 bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading
                  ? (mode === 'login' ? 'מתחבר...' : 'נרשם...')
                  : (mode === 'login' ? 'התחבר' : 'הירשם')}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">או</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span className="text-gray-700 font-medium text-sm">
                {isGoogleLoading ? 'מתחבר...' : (mode === 'login' ? 'התחבר עם Google' : 'הירשם עם Google')}
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* ===== LEFT SIDE — Marketing ===== */}
      <div className="w-1/2 flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2d4a 0%, #1a5272 50%, #2a7a8a 100%)' }}>

        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full z-0" />
        <div className="absolute bottom-0 -left-20 w-64 h-64 bg-teal-800/20 rounded-full z-0" />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-white/5 rounded-full z-0" />

        {/* Header with logo + back button */}
        <div className="px-10 pt-8 flex items-center justify-between" style={{ position: 'relative' }}>
          <img src={logoImage} alt="Mind Match" className="h-32 w-auto" />
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-teal-100 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הבית
          </button>
        </div>

        {/* Main marketing content */}
        <div className="relative flex-1 flex flex-col justify-center px-12 pb-12">
          <div className="text-right mb-12">
            <h2 className="text-5xl font-bold text-white leading-tight mb-4">
              למידה חכמה,<br />
              <span className="text-teal-100">תוצאות מדהימות</span>
            </h2>
            <p className="text-teal-100 text-lg leading-relaxed">
              הפלטפורמה המתקדמת ביותר ללמידה<br />אקדמית עם בינה מלאכותית
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Sparkles, title: 'מורה AI אישי', desc: 'קבל תשובות מיידיות והסברים מפורטים לכל שאלה' },
              { icon: TrendingUp, title: 'ניתוח ותובנות', desc: 'עקוב אחר ההתקדמות שלך וקבל המלצות מותאמות' },
              { icon: Users, title: 'למידה מותאמת', desc: 'תרגול שמתאים את עצמו לרמה ולקצב הלמידה שלך' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{title}</p>
                  <p className="text-teal-100 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 self-end">
            <div className="text-right">
              <p className="text-xl font-bold text-white">+8,500 סטודנטים</p>
              <p className="text-teal-100 text-xs">מצטרפים אלינו כל יום</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
