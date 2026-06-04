import { useState, useRef, useEffect } from 'react';
import { X, Shield, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '../../firebase';
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from 'firebase/auth';

interface TwoFactorModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'phone' | 'code' | 'done';

export function TwoFactorModal({ onClose, onSuccess }: TwoFactorModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      recaptchaRef.current?.clear();
    };
  }, []);

  const handleSendCode = async () => {
    setError('');
    if (!phone.trim()) { setError('הכניסי מספר טלפון'); return; }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('לא מחובר');

      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
      }

      const session = await multiFactor(user).getSession();
      const provider = new PhoneAuthProvider(auth);
      const formatted = phone.startsWith('+') ? phone : `+972${phone.replace(/^0/, '')}`;
      const vid = await provider.verifyPhoneNumber(
        { phoneNumber: formatted, session },
        recaptchaRef.current
      );
      setVerificationId(vid);
      setStep('code');
    } catch (err: any) {
      setError(err?.message || 'שגיאה בשליחת הקוד');
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    if (!code.trim()) { setError('הכניסי את הקוד שקיבלת'); return; }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('לא מחובר');

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const assertion = PhoneMultiFactorGenerator.assertion(credential);
      await multiFactor(user).enroll(assertion, 'מספר טלפון');
      setStep('done');
      setTimeout(() => { onSuccess(); onClose(); }, 2000);
    } catch (err: any) {
      setError(err?.message || 'קוד שגוי, נסי שוב');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div ref={containerRef} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">אימות דו-שלבי</h2>
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <p className="text-blue-100 text-sm mt-2 text-right">
            הגן על חשבונך עם קוד SMS
          </p>
        </div>

        <div className="px-6 py-5 space-y-4">
          {step === 'phone' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                  מספר טלפון
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="050-0000000"
                    dir="ltr"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">ישלח קוד SMS לאימות</p>
              </div>

              <div id="recaptcha-container" />

              {error && <p className="text-red-600 text-sm text-right bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <Button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : null}
                שלחי קוד SMS
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                  קוד האימות
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="123456"
                  dir="ltr"
                  maxLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-widest"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">הקוד נשלח ל-{phone}</p>
              </div>

              {error && <p className="text-red-600 text-sm text-right bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <Button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full bg-gradient-to-l from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : null}
                אמתי ואפשרי
              </Button>

              <button
                onClick={() => setStep('phone')}
                className="w-full text-sm text-gray-500 hover:text-gray-700 text-center"
              >
                שינוי מספר טלפון
              </button>
            </>
          )}

          {step === 'done' && (
            <div className="py-6 flex flex-col items-center gap-3">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="font-bold text-gray-900">אימות דו-שלבי הופעל!</p>
              <p className="text-sm text-gray-500 text-center">מהכניסה הבאה תתבקשי להזין קוד SMS</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
