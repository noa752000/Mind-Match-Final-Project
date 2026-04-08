import { useState } from 'react';
import { UserPlus, GraduationCap, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Logo } from '../components/Logo';

interface RegisterPageProps {
  onRegister: (fullName: string, email: string, password: string) => Promise<boolean>;
  onBackToHome: () => void;
  onLogin: () => void;
}

export function RegisterPage({ onRegister, onBackToHome, onLogin }: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setIsLoading(true);

    const success = await onRegister(fullName, email, password);
    
    if (!success) {
      setError('ההרשמה נכשלה. נסה שוב.');
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
        <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center">
          {/* Right Side - Register Form */}
          <Card className="p-12 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="text-right mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">הרשמה</h2>
              <p className="text-gray-600 text-lg">
                הצטרף לאלפי סטודנטים שכבר משתמשים בפלטפורמה
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-right text-sm font-medium text-gray-700">
                  שם מלא
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="הזן שם מלא"
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-right text-sm font-medium text-gray-700">
                  אימייל
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="example@email.com"
                  required
                  dir="ltr"
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
                  placeholder="לפחות 6 תווים"
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-right text-sm font-medium text-gray-700">
                  אימות סיסמה
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="הזן את הסיסמה שוב"
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
                  'נרשם...'
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 ml-2" />
                    הירשם
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                כבר יש לך חשבון?{' '}
                <button 
                  onClick={onLogin}
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  התחבר כאן
                </button>
              </p>
            </div>
          </Card>

          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div className="text-right">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                הצטרף לקהילה<br />
                <span className="bg-gradient-to-l from-teal-500 to-teal-600 bg-clip-text text-transparent">
                  של סטודנטים מובילים
                </span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                התחל את מסע הלמידה החכמה שלך עוד היום
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-teal-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">חינם להתחיל</h4>
                  <p className="text-gray-600 leading-relaxed">
                    גישה מלאה לכל התכונות ללא עלות
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">תוצאות מוכחות</h4>
                  <p className="text-gray-600 leading-relaxed">
                    95% מהסטודנטים משיגים ציונים גבוהים יותר
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">קהילה פעילה</h4>
                  <p className="text-gray-600 leading-relaxed">
                    למד יחד עם אלפי סטודנטים נוספים
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-l from-teal-500 to-teal-600 rounded-2xl text-white">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-teal-100 text-sm mb-1">הצטרפו אלינו</p>
                  <p className="text-3xl font-bold">8,500+ סטודנטים</p>
                  <p className="text-teal-100 text-sm mt-2">וכל יום מצטרפים עוד...</p>
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
