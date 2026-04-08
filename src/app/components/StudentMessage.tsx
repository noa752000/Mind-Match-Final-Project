import { User } from 'lucide-react';
import { Card } from './ui/card';

interface StudentMessageProps {
  content: string;
  dir?: string;
}

export function StudentMessage({ content, dir = 'rtl' }: StudentMessageProps) {
  return (
    <div className="flex items-start gap-4 mb-6">
      {/* Student Avatar */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-white" />
      </div>

      {/* Message Content */}
      <div className="max-w-2xl">
        <Card className="p-5 bg-white border-gray-200">
          <p className="text-gray-900 leading-relaxed text-right" dir={dir} style={{ unicodeBidi: 'plaintext' }}>
            {content}
          </p>
        </Card>
      </div>
    </div>
  );
}