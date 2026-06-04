import { useState } from 'react';
import { Bell, Eye, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { ChangePasswordModal } from './ChangePasswordModal';
import { WeeklySummaryModal } from './WeeklySummaryModal';

export function AccountSettings() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [weeklySummaryEnabled, setWeeklySummaryEnabled] = useState(false);

  return (
    <>
    <Card className="p-8 border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-right">הגדרות חשבון</h3>

      <div className="space-y-6">
        {/* Security Settings */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-right flex items-center justify-start gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>אבטחה</span>
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>שנה</Button>
              <div className="text-right flex-1 mr-4">
                <p className="font-medium text-gray-900">סיסמה</p>
                <p className="text-sm text-gray-600">עודכנה לאחרונה לפני 3 חודשים</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-right flex items-center justify-start gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>התראות</span>
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <Switch defaultChecked />
              <div className="text-right flex-1 mr-4">
                <p className="font-medium text-gray-900">התראות מייל</p>
                <p className="text-sm text-gray-600">קבל עדכונים על קורסים ומטלות</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <Switch
                checked={weeklySummaryEnabled}
                onCheckedChange={(v) => {
                  setWeeklySummaryEnabled(v);
                  if (v) setShowWeeklySummary(true);
                }}
              />
              <div className="text-right flex-1 mr-4">
                <p className="font-medium text-gray-900">סיכומים שבועיים</p>
                <p className="text-sm text-gray-600">
                  {weeklySummaryEnabled
                    ? <button onClick={() => setShowWeeklySummary(true)} className="text-teal-600 hover:underline">לחצי לצפייה בסיכום השבועי ←</button>
                    : 'דוח התקדמות מופק על ידי AI'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-right flex items-center justify-start gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span>פרטיות</span>
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <Switch defaultChecked />
              <div className="text-right flex-1 mr-4">
                <p className="font-medium text-gray-900">פרופיל ציבורי</p>
                <p className="text-sm text-gray-600">אפשר לסטודנטים אחרים לראות את הפרופיל</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <Switch defaultChecked />
              <div className="text-right flex-1 mr-4">
                <p className="font-medium text-gray-900">שיתוף התקדמות</p>
                <p className="text-sm text-gray-600">הצג את ההתקדמות שלך בקבוצות</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    {showPasswordModal && (
      <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
    )}
    {showWeeklySummary && (
      <WeeklySummaryModal onClose={() => setShowWeeklySummary(false)} />
    )}
    </>
  );
}
