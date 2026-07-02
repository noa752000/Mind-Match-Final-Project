import { Bot, BookOpen, Calendar, Users, BarChart2, Mail } from 'lucide-react';
import logoImage from '../../assets/logo.png';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-16" dir="rtl">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-row gap-16 mb-10 items-start">

          {/* Columns */}
          <div className="flex flex-row gap-14 flex-1">

            {/* Navigation — real sections on this page */}
            <div className="text-right">
              <h4 className="text-white font-semibold mb-5">ניווט</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-teal-400 transition-colors"
                  >
                    בית
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('features')}
                    className="hover:text-teal-400 transition-colors"
                  >
                    תכונות
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('about')}
                    className="hover:text-teal-400 transition-colors"
                  >
                    הסבר AI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('testimonials')}
                    className="hover:text-teal-400 transition-colors"
                  >
                    המלצות
                  </button>
                </li>
              </ul>
            </div>

            {/* Features — what actually exists in the app */}
            <div className="text-right">
              <h4 className="text-white font-semibold mb-5">מה תמצאו אצלנו</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { icon: Bot,      label: 'מורה AI אישי' },
                  { icon: BookOpen, label: 'תרגול חכם' },
                  { icon: Calendar, label: 'לוח שנה לימודי' },
                  { icon: Users,    label: 'קהילת לומדים' },
                  { icon: BarChart2,label: 'ניתוח ביצועים' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 justify-end">
                    <span>{label}</span>
                    <Icon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-right">
              <h4 className="text-white font-semibold mb-5">צרו קשר</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 justify-end">
                  <span>mindmatch.support@gmail.com</span>
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                </li>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logoImage} alt="MindMatch" className="h-32 w-auto" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">© 2026 MindMatch. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
