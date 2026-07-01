import { useState, useEffect } from 'react';
import { Save, CheckCircle, Shield } from 'lucide-react';
import { ProfileHeader } from '../components/ProfileHeader';
import { PersonalInfo } from '../components/PersonalInfo';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';

const YEAR_LETTER_TO_NUMBER: Record<string, number> = { '׳': 1, '׳‘': 2, '׳’': 3, '׳“': 4 };

function yearFromAcademicYear(academicYear: string): number | undefined {
  const letter = academicYear.match(/׳©׳ ׳”\s*([׳׳‘׳’׳“])/)?.[1];
  return letter ? YEAR_LETTER_TO_NUMBER[letter] : undefined;
}

export function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { addUserCourse, removeUserCourse } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [studentId, setStudentId] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
    const year = yearFromAcademicYear(academicYear);
    await updateUserProfile({
      fullName, phone, institution, academicYear, studentId,
      ...(year !== undefined ? { year } : {}),
    });
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

  const toggleCourse = async (courseId: string) => {
    if (!user) return;
    const has = (user.selectedCourses || []).includes(courseId);
    if (has) await removeUserCourse(courseId);
    else await addUserCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-24" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900">׳”׳₪׳¨׳•׳₪׳™׳ ׳©׳׳™</h1>
              <p className="text-gray-600 mt-1">׳ ׳”׳ ׳׳× ׳”׳׳™׳“׳¢ ׳”׳׳™׳©׳™ ׳•׳”׳’׳“׳¨׳•׳× ׳”׳—׳©׳‘׳•׳ ׳©׳׳</p>
            </div>
            <div className="flex items-center gap-3">
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  ׳ ׳©׳׳¨ ׳‘׳”׳¦׳׳—׳”
                </span>
              )}
<Button
                className="gap-2 bg-teal-600 hover:bg-teal-700"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                <Save className="w-4 h-4" />
                {saveStatus === 'saving' ? '׳©׳•׳׳¨...' : '׳©׳׳•׳¨ ׳©׳™׳ ׳•׳™׳™׳'}
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
            selectedCourses={user?.selectedCourses || []}
            onToggleCourse={toggleCourse}
          />

          <Card className="p-8 border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4 text-right flex items-center justify-start gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>׳׳‘׳˜׳—׳”</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-xl text-right">
              <p className="font-medium text-gray-900 mb-2">׳¡׳™׳¡׳׳”</p>
              <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>׳©׳ ׳” ׳¡׳™׳¡׳׳”</Button>
            </div>
          </Card>

        </div>
      </main>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}

