import { AccountSettings } from '../components/AccountSettings';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[800px] space-y-8">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900">הגדרות</h1>
            <p className="text-gray-600 mt-1">נהל את הגדרות החשבון שלך</p>
          </div>
          <AccountSettings />
        </div>
      </main>
    </div>
  );
}
