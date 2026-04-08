import { TrendingUp, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

export function UnderstandingProgress() {
  return (
    <Card className="p-6 bg-white border-gray-200 mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 mb-4 justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">רמת הבנה נוכחית</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+18%</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-lg font-bold text-gray-900">78%</span>
                  <span className="text-sm text-gray-600">:SQL Joins</span>
                </div>
              </div>
              <Progress value={78} className="h-2 bg-gray-100" />
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700 text-right" dir="rtl" style={{ unicodeBidi: 'plaintext' }}>
                הבנת היטב את המושגים הבסיסיים. מומלץ לעבור לדוגמאות מורכבות יותר ולתרגל שאילתות מתקדמות.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}