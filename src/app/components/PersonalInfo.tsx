import { Mail, Calendar, GraduationCap, MapPin, Phone, Globe } from 'lucide-react';
import { Card } from './ui/card';

export function PersonalInfo() {
  return (
    <Card className="p-8 border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-right">מידע אישי</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">שם מלא</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <span className="text-gray-900 font-medium block truncate">הדס כהן</span>
            </div>
          </div>
          
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">תעודת זהות</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <span className="text-gray-900 font-medium block truncate">987654321</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">דואר אלקטרוני</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">hadas.cohen@mail.ac.il</span>
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">טלפון נייד</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">052-9876543</span>
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">תואר</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">תואר ראשון במערכות מידע</span>
              <GraduationCap className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">שנה אקדמית</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">שנה ב׳, סמסטר א׳</span>
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">מוסד לימודים</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">אוניברסיטת תל אביב</span>
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          <div className="text-right">
            <label className="text-sm text-gray-600 block mb-2">מספר סטודנט</label>
            <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center gap-3 justify-end">
              <span className="text-gray-900 truncate">2022-98765</span>
              <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
