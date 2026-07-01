import { useState } from 'react';
import { Sparkles, TrendingUp, Users, Eye, EyeOff, UserPlus, LogIn, ArrowRight, CheckCircle2 } from 'lucide-react';
import logoImage from '../../assets/logo.png';

interface LoginPageProps {
  onLogin: () => Promise<boolean>;
  onLoginWithEmail: (email: string, password: string) => Promise<boolean>;
  onRegisterWithEmail: (fullName: string, email: string, password: string) => Promise<boolean>;
  onBackToHome: () => void;
}

type Mode = 'login' | 'register';

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48">
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
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(135deg, #075985 0%, #0284c7 45%, #06b6d4 100%)' }}
      dir="rtl"
    >
      {/* Decorative shapes spanning the whole background */}
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-white/10 rounded-full z-0" />
      <div className="absolute bottom-0 -left-28 w-96 h-96 bg-teal-300/10 rounded-full z-0" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-300/10 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl z-0" />

      {/* Decorative dot grid */}
      <div
        className="absolute top-6 left-6 w-40 h-32 z-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1.5px)', backgroundSize: '14px 14px' }}
      />

      {/* Decorative sparkles */}
      <Sparkles className="absolute bottom-28 right-1/3 w-5 h-5 text-white/30 z-0" />
      <Sparkles className="absolute bottom-10 left-[38%] w-4 h-4 text-white/20 z-0" />
      <Sparkles className="absolute top-1/2 right-10 w-3 h-3 text-white/20 z-0" />

      {/* ===== Main content ===== */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-14 px-6 sm:px-10 lg:px-12 xl:px-16 py-6 lg:py-8">

        {/* ===== Marketing content ===== */}
        <div className="w-full lg:flex-[2] flex flex-col gap-5 lg:gap-6">
          {/* header: back button */}
          <div className="flex items-center">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-teal-100 hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה לדף הבית
            </button>
          </div>

          <div className="text-right">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3">
              למידה חכמה, <span className="text-teal-200">תוצאות מדהימות</span>
            </h2>
            <p className="text-teal-100 text-base lg:text-lg leading-relaxed">
              הפלטפורמה המתקדמת ביותר ללמידה אקדמית עם בינה מלאכותית - תרגול אישי, משוב מיידי וכלים חכמים
              שמתאימים את עצמם אליך, בכל מקום ובכל זמן. הצטרפו לאלפי סטודנטים שכבר משתמשים ב-MindMatch
              כדי להגיע להישגים גבוהים יותר בלימודים, בכל קורס ובכל שלב.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Sparkles, title: 'מורה AI אישי', desc: 'קבל תשובות מיידיות והסברים מפורטים לכל שאלה' },
              { icon: TrendingUp, title: 'ניתוח ותובנות', desc: 'עקוב אחר ההתקדמות שלך וקבל המלצות מותאמות' },
              { icon: Users, title: 'למידה מותאמת', desc: 'תרגול שמתאים את עצמו לרמה ולקצב הלמידה שלך' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 lg:py-3.5">
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold text-sm lg:text-base">{title}</p>
                  <p className="text-teal-100 text-xs lg:text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* trust indicators */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-teal-100 text-xs lg:text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-300" /> ללא כרטיס אשראי</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-300" /> ביטול בכל עת</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-300" /> תמיכה מלאה בעברית</span>
          </div>

          {/* students badge — pill shape */}
          <div className="self-start inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <p className="text-lg lg:text-xl font-bold text-white whitespace-nowrap">+8,500 סטודנטים</p>
            <span className="w-px h-5 bg-white/20" />
            <p className="text-teal-100 text-xs lg:text-sm whitespace-nowrap">מצטרפים אלינו כל יום</p>
          </div>
        </div>

        {/* ===== Auth Card — main element of the page ===== */}
        <div className="w-full lg:flex-[3] bg-white rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 flex rounded-xl bg-gray-100 p-1.5">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-semibold transition-all ${
                mode === 'login' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LogIn className="w-5 h-5" />
              התחברות
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-semibold transition-all ${
                mode === 'register' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              הרשמה
            </button>
          </div>
          <img src={logoImage} alt="Mind Match" className="h-12 lg:h-14 w-auto flex-shrink-0" />
        </div>

        <div className="text-right mb-7">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'ברוך שובך!' : 'הצטרף אלינו'}
          </h2>
          <p className="text-gray-500 text-base lg:text-lg">
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
                className="w-full px-4 py-3.5 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base bg-gray-50 focus:bg-white"
                placeholder="הזן שם מלא" required dir="rtl"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-right text-sm font-medium text-gray-700">אימייל</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 text-left border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base bg-gray-50 focus:bg-white"
              placeholder="example@email.com" required dir="ltr"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-right text-sm font-medium text-gray-700">סיסמה</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-10 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base bg-gray-50 focus:bg-white"
                placeholder={mode === 'register' ? 'לפחות 6 תווים' : '••••••••'} required dir="rtl"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  className="w-full px-4 py-3.5 pr-10 text-right border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base bg-gray-50 focus:bg-white"
                  placeholder="הזן את הסיסמה שוב" required dir="rtl"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
            className="w-full h-14 bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            {isLoading
              ? (mode === 'login' ? 'מתחבר...' : 'נרשם...')
              : (mode === 'login' ? 'התחבר' : 'הירשם')}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">או</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          <span className="text-gray-700 font-medium text-base">
            {isGoogleLoading ? 'מתחבר...' : (mode === 'login' ? 'התחבר עם Google' : 'הירשם עם Google')}
          </span>
        </button>
        </div>

      </div>

    </div>
    </div>
  );
}
