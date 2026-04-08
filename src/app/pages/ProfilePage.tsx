import { ProfileHeader } from '../components/ProfileHeader';
import { PersonalInfo } from '../components/PersonalInfo';
import { AccountSettings } from '../components/AccountSettings';
import { LearningPreferences } from '../components/LearningPreferences';
import { Button } from '../components/ui/button';
import { Save, X } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1176px] mx-auto space-y-8">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">הפרופיל שלי</h1>
              <p className="text-gray-600 mt-1">נהל את המידע האישי והגדרות החשבון שלך</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <X className="w-4 h-4" />
                ביטול
              </Button>
              <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
                <Save className="w-4 h-4" />
                שמור שינויים
              </Button>
            </div>
          </div>

          <ProfileHeader />
          
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <PersonalInfo />
            </div>
            <div className="col-span-5">
              <LearningPreferences />
            </div>
          </div>

          <AccountSettings />
        </div>
      </main>
    </div>
  );
}