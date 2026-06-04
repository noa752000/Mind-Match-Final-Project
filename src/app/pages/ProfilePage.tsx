import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { ProfileHeader } from '../components/ProfileHeader';
import { PersonalInfo } from '../components/PersonalInfo';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';

export function ProfilePage() {
  const { user, updateUserProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [studentId, setStudentId] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Populate from Firestore data when user loads
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      setInstitution(user.institution || '');
      setAcademicYear(user.academicYear || '');
      setStudentId(user.studentId || '');
    }
  }, [user]);

  const handleSave = async () => {
    setSaveStatus('saving');
    await updateUserProfile({ fullName, phone, institution, academicYear, studentId });
    // Also update Firebase Auth displayName
    if (auth.currentUser && fullName !== auth.currentUser.displayName) {
      await updateProfile(auth.currentUser, { displayName: fullName }).catch(() => {});
    }
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2500);
  };

  const handleCancel = () => {
    setPhone(user?.phone || '');
    setInstitution(user?.institution || '');
    setAcademicYear(user?.academicYear || '');
    setStudentId(user?.studentId || '');
  };

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-16" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1176px] mx-auto space-y-8">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900">הפרופיל שלי</h1>
              <p className="text-gray-600 mt-1">נהל את המידע האישי והגדרות החשבון שלך</p>
            </div>
            <div className="flex items-center gap-3">
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  נשמר בהצלחה
                </span>
              )}
<Button
                className="gap-2 bg-teal-600 hover:bg-teal-700"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                <Save className="w-4 h-4" />
                {saveStatus === 'saving' ? 'שומר...' : 'שמור שינויים'}
              </Button>
            </div>
          </div>

          <ProfileHeader />

          <PersonalInfo
            fullName={fullName}
            email={user?.email || ''}
            onFullNameChange={setFullName}
            phone={phone}
            institution={institution}
            academicYear={academicYear}
            studentId={studentId}
            onPhoneChange={setPhone}
            onInstitutionChange={setInstitution}
            onAcademicYearChange={setAcademicYear}
            onStudentIdChange={setStudentId}
          />

        </div>
      </main>
    </div>
  );
}
