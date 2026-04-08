import { Brain } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-4 mb-6 justify-end">
      {/* Typing Animation */}
      <div className="flex-1 max-w-3xl">
        <div className="flex items-center gap-2 mb-2 justify-end">
          <Badge className="bg-blue-100 text-blue-700 text-xs">מורה AI</Badge>
        </div>

        <Card className="p-6 bg-gradient-to-l from-blue-50/50 to-indigo-50/50 border-blue-200">
          <div className="flex items-center gap-2 justify-end">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-600">AI חושב...</span>
          </div>
        </Card>
      </div>

      {/* AI Avatar */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
        <Brain className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}