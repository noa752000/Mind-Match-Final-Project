import { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const SIZE = 150;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d')!;
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;
      ctx.drawImage(img, sx, sy, min, min, 0, 0, SIZE, SIZE);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function ProfileHeader() {
  const { user, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const initials = (user?.fullName || 'U')
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const displayPhoto = user?.photoURL;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.userId) return;

    if (!file.type.startsWith('image/')) { alert('ניתן להעלות רק קבצי תמונה'); return; }

    setUploading(true);
    setProgress(30);
    try {
      const base64 = await compressImage(file);
      setProgress(80);
      await updateUserProfile({ photoURL: base64 });
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert('שגיאה בעיבוד התמונה');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-8 border-gray-100">
      <div className="flex items-center gap-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {displayPhoto ? (
            <img
              src={displayPhoto}
              alt={user?.fullName}
              className="w-32 h-32 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <span className="text-4xl text-white font-bold">{initials}</span>
            </div>
          )}

          {/* Upload progress ring */}
          {uploading && (
            <div className="absolute inset-0 rounded-2xl bg-black/50 flex flex-col items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin mb-1" />
              <span className="text-white text-xs font-bold">{progress}%</span>
            </div>
          )}

          {/* Camera button */}
          <button
            onClick={() => !uploading && fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-1 left-1 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="שנה תמונת פרופיל"
          >
            <Camera className="w-4 h-4 text-gray-700" />
          </button>

          {/* Verified badge */}
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        </div>

        {/* Name + badges */}
        <div className="text-right flex-1">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {user?.fullName || 'משתמש'}
          </h1>
          <div className="flex items-center gap-3 justify-start">
            <Badge className="bg-teal-100 text-teal-700 text-base px-3 py-1">סטודנט פעיל</Badge>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </Card>
  );
}
