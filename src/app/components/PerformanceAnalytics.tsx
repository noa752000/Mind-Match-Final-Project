import { Card } from './ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const performanceData = [
  { id: 'sept', month: 'ספט׳', grade: 78, hours: 12 },
  { id: 'oct', month: 'אוק׳', grade: 82, hours: 15 },
  { id: 'nov', month: 'נוב׳', grade: 85, hours: 18 },
  { id: 'dec', month: 'דצמ׳', grade: 83, hours: 14 },
  { id: 'jan', month: 'ינו׳', grade: 87, hours: 20 },
  { id: 'feb', month: 'פבר׳', grade: 89, hours: 22 },
];

const subjectScores = [
  { id: 'db', name: 'מסדי נתונים', score: 92 },
  { id: 'ds', name: 'מבני נתונים', score: 88 },
  { id: 'sec', name: 'אבטחת מידע', score: 71 },
  { id: 'design', name: 'אפיון ותכן', score: 68 },
];

export function PerformanceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Performance Trend */}
      <Card className="p-8 border-gray-100">
        <div className="flex items-center gap-3 mb-6 justify-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">מגמת ביצועים</h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                direction: 'rtl'
              }} 
            />
            <Legend wrapperStyle={{ direction: 'rtl' }} />
            <Line 
              type="monotone" 
              dataKey="grade" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="ציון ממוצע"
              dot={{ fill: '#3b82f6', r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="שעות לימוד"
              dot={{ fill: '#8b5cf6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-8 border-gray-100">
        <div className="flex items-center gap-3 mb-6 justify-start">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">ציונים לפי נושא</h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectScores} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                direction: 'rtl',
              }}
            />
            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} name="ציון" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}