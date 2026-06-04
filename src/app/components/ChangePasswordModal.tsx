import { useState } from 'react';
import { X, Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '../../firebase';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!current || !next || !confirm) { setError('יש למלא את כל השדות'); return; }
    if (next !== confirm) { setError('הסיסמאות החדשות אינן תואמות'); return; }
    if (next.length < 6) { setError('הסיסמה החדשה חייבת להכיל לפחות 6 תווים'); return; }

    const user = auth.currentUser;
    if (!user || !user.email) { setError('לא ניתן לזהות את המשתמש'); return; }

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, next);
      setDone(true);
      setTimeout(onClose, 2000);
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('הסיסמה הנוכחית שגויה');
      } else if (code === 'auth/weak-password') {
        setError('הסיסמה החדשה חלשה מדי');
      } else {
        setError(err?.message || 'אירעה שגיאה, נסי שוב');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-gray-700 to-gray-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">שינוי סיסמה</h2>
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {done ? (
            <div className="py-6 flex flex-col items-center gap-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="font-bold text-gray-900">הסיסמה שונתה בהצלחה!</p>
            </div>
          ) : (
            <>
              {/* Current password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-right">סיסמה נוכחית</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    placeholder="••••••••"
                    dir="rtl"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(v => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-right">סיסמה חדשה</label>
                <div className="relative">
                  <input
                    type={showNext ? 'text' : 'password'}
                    value={next}
                    onChange={e => setNext(e.target.value)}
                    placeholder="לפחות 6 תווים"
                    dir="rtl"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNext(v => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNext ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-right">אימות סיסמה חדשה</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="הזיני שוב את הסיסמה החדשה"
                  dir="rtl"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-right bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
                שמרי סיסמה חדשה
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
