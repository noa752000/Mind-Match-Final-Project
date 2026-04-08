import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export function ChatInput() {
  return (
    <div className="border-t border-gray-200 bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          {/* Input Area */}
          <div className="flex-1 relative">
            <Textarea
              placeholder="שאל את השאלה שלך..."
              className="min-h-[60px] max-h-[200px] resize-none pr-4 text-right"
              dir="rtl"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-500" dir="rtl">
            Shift + Enter לשורה חדשה
          </p>
          <p className="text-xs text-gray-500" dir="rtl">
            מורה AI מונע בבינה מלאכותית • תשובות מדויקות ומותאמות אישית
          </p>
        </div>
      </div>
    </div>
  );
}