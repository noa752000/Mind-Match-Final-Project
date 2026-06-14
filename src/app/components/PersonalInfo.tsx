import { Mail, Calendar, MapPin, Phone } from 'lucide-react';
import { Card } from './ui/card';

interface PersonalInfoProps {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  academicYear: string;
  studentId: string;
  selectedCourses?: string[];
  onFullNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onInstitutionChange: (v: string) => void;
  onAcademicYearChange: (v: string) => void;
  onStudentIdChange: (v: string) => void;
  onToggleCourse?: (courseId: string) => void;
}

const fieldClass =
  'w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-white';
const readonlyClass =
  'w-full px-4 py-3 text-right bg-gray-50 rounded-lg text-gray-900 font-medium text-sm select-all';

export function PersonalInfo({
  fullName,
  email,
  phone,
  institution,
  academicYear,
  studentId,
  selectedCourses = [],
  onFullNameChange,
  onPhoneChange,
  onInstitutionChange,
  onAcademicYearChange,
  onStudentIdChange,
  onToggleCourse,
}: PersonalInfoProps) {
  return (
    <Card className="p-8 border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-right">מידע אישי</h3>

      <div className="space-y-5">
        {/* Name + Email */}
        <div className="grid grid-cols-2 gap-5">
          <div className="text-right">
            <label className="text-sm text-gray-500 block mb-1.5">שם מלא</label>
            <input
              type="text"
              value={fullName}
              onChange={e => onFullNameChange(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="text-right">
            <label className="text-sm text-gray-500 block mb-1.5">דואר אלקטרוני</label>
            <div className="relative">
              <div className={`${readonlyClass} pl-10`}>{email}</div>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Phone — editable */}
        <div className="grid grid-cols-2 gap-5">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-1.5">טלפון נייד</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={e => onPhoneChange(e.target.value)}
                placeholder="050-0000000"
                dir="ltr"
                className={`${fieldClass} pl-10`}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Institution + Year — editable */}
        <div className="grid grid-cols-2 gap-5">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-1.5">מוסד לימודים</label>
            <div className="relative">
              <select
                value={institution}
                onChange={e => onInstitutionChange(e.target.value)}
                dir="rtl"
                className={`${fieldClass} pr-10 appearance-none`}
              >
                <option value="">בחרי מוסד לימודים...</option>
                <optgroup label="אוניברסיטאות">
                  <option>אוניברסיטת תל אביב</option>
                  <option>האוניברסיטה העברית בירושלים</option>
                  <option>אוניברסיטת בר-אילן</option>
                  <option>אוניברסיטת חיפה</option>
                  <option>אוניברסיטת בן-גוריון בנגב</option>
                  <option>אוניברסיטת אריאל בשומרון</option>
                  <option>האוניברסיטה הפתוחה</option>
                  <option>הטכניון - מכון טכנולוגי לישראל</option>
                </optgroup>
                <optgroup label="מכללות אקדמיות">
                  <option>המכללה האקדמית תל אביב-יפו (MTA)</option>
                  <option>מכללת אפקה - המכללה האקדמית להנדסה בתל אביב</option>
                  <option>מכללת רופין</option>
                  <option>המכללה האקדמית נתניה</option>
                  <option>המכללה האקדמית ספיר</option>
                  <option>המכללה האקדמית עמק יזרעאל</option>
                  <option>המכללה האקדמית כנרת</option>
                  <option>המכללה האקדמית גליל מערבי</option>
                  <option>מכללת אשקלון</option>
                  <option>המרכז האקדמי פרס</option>
                  <option>המכללה האקדמית הדסה</option>
                  <option>מכללת סמי שמעון</option>
                </optgroup>
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-1.5">שנה אקדמית</label>
            <div className="relative">
              <select
                value={academicYear}
                onChange={e => onAcademicYearChange(e.target.value)}
                dir="rtl"
                className={`${fieldClass} pr-10 appearance-none`}
              >
                <option value="">בחר שנה</option>
                <option>שנה א׳, סמסטר א׳</option>
                <option>שנה א׳, סמסטר ב׳</option>
                <option>שנה ב׳, סמסטר א׳</option>
                <option>שנה ב׳, סמסטר ב׳</option>
                <option>שנה ג׳, סמסטר א׳</option>
                <option>שנה ג׳, סמסטר ב׳</option>
                <option>שנה ד׳, סמסטר א׳</option>
                <option>שנה ד׳, סמסטר ב׳</option>
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Courses — editable checkboxes */}
        <div className="text-right mt-4">
          <label className="text-sm text-gray-600 block mb-1.5">קורסים</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'sql', label: 'SQL' },
              { id: 'systems_analysis', label: 'אפיון ותכן' },
              { id: 'oop', label: 'תכנות מונחה עצמים' },
              { id: 'calculus1', label: 'חדו"א 1' },
              { id: 'linear-algebra', label: 'אלגברה לינארית' },
              { id: 'html', label: 'HTML' },
              { id: 'mis-economics', label: 'כלכלת מערכות מידע' },
              { id: 'cyber_security', label: 'אבטחת מידע' }
            ].map(c => (
              <label key={c.id} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCourses?.includes(c.id)}
                  onChange={() => onToggleCourse?.(c.id)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{c.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
