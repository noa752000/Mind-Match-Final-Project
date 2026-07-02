import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Users, Search, GraduationCap, BookOpen, Calendar, UserCheck } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { StudySessionModal } from '../components/StudySessionModal';

interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  institution?: string;
  selectedCourses?: string[];
  photoURL?: string;
}

const COURSE_NAMES: Record<string, string> = {
  'calculus1': 'חדו"א 1',
  'linear-algebra': 'אלגברה לינארית',
  'oop': 'תכנות מונחה עצמים',
  'html': 'HTML',
  'sql': 'SQL',
  'systems_analysis': 'אפיון ותכן',
  'cyber_security': 'אבטחת מידע',
  'mis-economics': 'כלכלת מערכות מידע',
};

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function getSharedCourses(myC: string[], theirC: string[]) {
  return (myC || []).filter(c => (theirC || []).includes(c));
}

interface StudentCardProps {
  profile: UserProfile;
  myCourses: string[];
  isSelected: boolean;
  onToggleSelect: () => void;
  onSchedule: () => void;
}

function StudentCard({ profile, myCourses, isSelected, onToggleSelect, onSchedule }: StudentCardProps) {
  const shared = getSharedCourses(myCourses, profile.selectedCourses || []);
  const totalCourses = (profile.selectedCourses || []).length;

  return (
    <Card className={`p-6 transition-all border-2 h-full flex flex-col ${isSelected ? 'border-teal-400 bg-teal-50/30' : 'border-gray-100 hover:shadow-md'}`}>
      <div className="flex items-start gap-4 flex-1" dir="rtl">
        {/* Avatar */}
        {profile.photoURL ? (
          <img src={profile.photoURL} alt={profile.fullName} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{getInitials(profile.fullName)}</span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0 text-right">
          <h3 className="font-bold text-gray-900 text-lg">{profile.fullName}</h3>
          {profile.institution ? (
            <p className="text-sm text-gray-500 flex items-center gap-1 justify-end mt-0.5">
              <span>{profile.institution}</span>
              <GraduationCap className="w-3.5 h-3.5" />
            </p>
          ) : (
            <p className="text-sm text-gray-300 mt-0.5 text-right">מוסד לא צוין</p>
          )}
          <div className="flex items-center gap-3 mt-2 justify-end">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              {totalCourses} קורסים
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            {shared.length > 0 && (
              <Badge className="bg-teal-100 text-teal-700 text-xs">
                {shared.length} משותפים
              </Badge>
            )}
          </div>

          {/* Shared courses tags — fixed height area */}
          <div className="flex flex-wrap gap-1 mt-2 justify-end min-h-[24px]">
            {shared.slice(0, 3).map(c => (
              <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {COURSE_NAMES[c] || c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions — always at bottom */}
      <div className="flex gap-2 mt-4">
        <Button
          size="sm"
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1"
          onClick={onSchedule}
        >
          <Calendar className="w-3.5 h-3.5" />
          קבע שיעור יחד
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={`text-xs gap-1 flex-shrink-0 ${isSelected ? 'border-teal-500 text-teal-700 bg-teal-50' : 'text-gray-600'}`}
          onClick={onToggleSelect}
          title="סמן להוספה לשיעור קבוצתי"
        >
          <UserCheck className="w-3.5 h-3.5" />
          {isSelected ? '✓ נוסף לקבוצה' : 'הוסף לקבוצה'}
        </Button>
      </div>
    </Card>
  );
}

export function CommunityPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'familiar' | 'all'>('familiar');
  const [selected, setSelected] = useState<string[]>([]);
  const [scheduleTarget, setScheduleTarget] = useState<UserProfile | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const all = snap.docs
          .map(d => ({ userId: d.id, ...d.data() } as UserProfile))
          .filter(u => {
            if (!u.fullName) return false;
            if (u.userId === user?.userId) return false;
            if (u.email?.toLowerCase() === user?.email?.toLowerCase()) return false;
            // filter duplicate records of the same person by name
            if (u.fullName?.toLowerCase() === user?.fullName?.toLowerCase()) return false;
            return true;
          });
        setUsers(all);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user?.userId]);

  const myCourses = user?.selectedCourses || [];
  const myInstitution = user?.institution || '';

  const familiar = users.filter(u =>
    (myInstitution && u.institution === myInstitution) ||
    getSharedCourses(myCourses, u.selectedCourses || []).length > 0
  );

  const displayed = (tab === 'familiar' ? familiar : users)
    .filter(u => u.fullName.includes(search) || (u.institution || '').includes(search));

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selectedProfiles = users.filter(u => selected.includes(u.userId));

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-24" dir="rtl">
      <main className="pt-8 px-8 pb-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 justify-end">
                קהילת הלומדים
                <Users className="w-8 h-8 text-teal-600" />
              </h1>
              <p className="text-gray-600 mt-1">מצאי שותפים ללמידה מקורסים ומוסדות משותפים</p>
            </div>

            {selected.length > 0 && (
              <Button
                className="bg-gradient-to-l from-teal-500 to-teal-600 text-white gap-2"
                onClick={() => setShowGroupModal(true)}
              >
                <Users className="w-4 h-4" />
                שיעור קבוצתי עם {selected.length} נבחרים
              </Button>
            )}
          </div>

          {/* Search + Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setTab('familiar')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tab === 'familiar' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500'}`}
              >
                מכירים ({familiar.length})
              </button>
              <button
                onClick={() => setTab('all')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${tab === 'all' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500'}`}
              >
                כולם ({users.length})
              </button>
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="חיפוש לפי שם או מוסד..."
                dir="rtl"
                className="w-full px-4 py-2 pr-9 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-56 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <Users className="w-16 h-16 text-gray-200" />
              <div>
                <p className="text-gray-500 font-medium">
                  {tab === 'familiar'
                    ? 'אין עדיין לומדים ממוסדך או עם קורסים משותפים'
                    : 'אין לומדים אחרים במערכת עדיין'}
                </p>
                {tab === 'familiar' && (
                  <p className="text-gray-400 text-sm mt-1">הוסיפי מוסד לימודים בפרופיל או עברי לטאב "כולם"</p>
                )}
              </div>
              {tab === 'familiar' && (
                <Button variant="outline" onClick={() => setTab('all')}>צפי בכל הלומדים</Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {displayed.map(u => (
                <StudentCard
                  key={u.userId}
                  profile={u}
                  myCourses={myCourses}
                  isSelected={selected.includes(u.userId)}
                  onToggleSelect={() => toggleSelect(u.userId)}
                  onSchedule={() => setScheduleTarget(u)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Schedule individual session */}
      {scheduleTarget && (
        <StudySessionModal
          participants={[scheduleTarget]}
          onClose={() => setScheduleTarget(null)}
        />
      )}

      {/* Schedule group session */}
      {showGroupModal && (
        <StudySessionModal
          participants={selectedProfiles}
          onClose={() => { setShowGroupModal(false); setSelected([]); }}
        />
      )}
    </div>
  );
}
