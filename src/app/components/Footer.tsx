import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logoImage from '../../assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-16" dir="ltr">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-12 mb-12">
          {/* Brand - Left for alignment */}
          <div className="col-span-12 md:col-span-4 text-left">
            <div className="mb-6 flex justify-start">
              <img src={logoImage} alt="MindMatch Logo" className="h-12 w-auto" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-12 md:col-span-2 text-left">
            <h4 className="text-white font-semibold mb-6">קישורים מהירים</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-teal-400 transition-colors">בית</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">תכונות</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">אודות</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">קורסים</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">מחירים</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-12 md:col-span-2 text-left">
            <h4 className="text-white font-semibold mb-6">תמיכה</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-teal-400 transition-colors">מרכז עזרה</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">שאלות נפוצות</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">צור קשר</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">מדיניות פרטיות</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-12 md:col-span-4 text-left">
            <h4 className="text-white font-semibold mb-6">יצירת קשר</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 justify-start">
                <Mail className="w-5 h-5 text-teal-400" />
                <span>support@learning-ai.co.il</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <Phone className="w-5 h-5 text-teal-400" />
                <span>03-1234567</span>
              </li>
              <li className="flex items-start gap-3 justify-start">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span>רחוב הרצל 123, תל אביב</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 למידה חכמה. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-teal-400 transition-colors">תנאי שימוש</a>
              <a href="#" className="hover:text-teal-400 transition-colors">מדיניות פרטיות</a>
              <a href="#" className="hover:text-teal-400 transition-colors">הצהרת נגישות</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}