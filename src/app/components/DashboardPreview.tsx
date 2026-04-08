import { Play } from 'lucide-react';
import { Button } from './ui/button';
import { BarChart3 } from 'lucide-react';
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
  { month: 'ספט׳', grade: 78, hours: 12 },
  { month: 'אוק׳', grade: 82, hours: 15 },
  { month: 'נוב׳', grade: 85, hours: 18 },
  { month: 'דצמ׳', grade: 83, hours: 14 },
  { month: 'ינו׳', grade: 87, hours: 20 },
  { month: 'פבר׳', grade: 89, hours: 22 },
];

const subjectScores = [
  { name: 'מסדי נתונים', score: 92 },
  { name: 'מבני נתונים', score: 88 },
  { name: 'אבטחת מידע', score: 71 },
  { name: 'אפיון ותכן', score: 68 },
];

interface DashboardPreviewProps {
  onNavigate?: (page: 'analysis') => void;
}

export function DashboardPreview({ onNavigate }: DashboardPreviewProps) {
  return (
    <section className="py-20 px-16 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-right mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            לוח המחוונים האישי שלך
          </h2>
          <p className="text-xl text-gray-600">
            מעקב אחר ההתקדמות, ניתוח ביצועים והמלצות מותאמות - הכל במקום אחד
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-violet-400/10 rounded-3xl blur-3xl"></div>
          
          {/* Dashboard mockup */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/80"></div>
                <div className="w-3 h-3 rounded-full bg-white/60"></div>
                <div className="w-3 h-3 rounded-full bg-white/40"></div>
              </div>
              <span className="text-white text-sm font-medium text-right">לוח מחוונים - מערכות מידע</span>
              <div className="w-20"></div>
            </div>

            <div className="p-8 bg-gray-50">
              <div className="grid grid-cols-2 gap-6">
                {/* Performance Trend Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-right">מגמת ביצועים</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          direction: 'rtl',
                          fontSize: '12px'
                        }} 
                      />
                      <Legend wrapperStyle={{ direction: 'rtl', fontSize: '12px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="grade" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="ציון ממוצע"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="שעות לימוד"
                        dot={{ fill: '#8b5cf6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Subject Scores Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-right">ציונים לפי נושא</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={subjectScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6b7280" 
                        style={{ fontSize: '10px' }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          direction: 'rtl',
                          fontSize: '12px'
                        }} 
                      />
                      <Bar 
                        dataKey="score" 
                        fill="#3b82f6"
                        radius={[6, 6, 0, 0]}
                        name="ציון"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* View Analysis Button */}
              <div className="mt-6 text-center">
                <Button 
                  variant="outline"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onNavigate?.('analysis');
                  }}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <BarChart3 className="w-4 h-4 ml-2" />
                  צפה בניתוח ותובנות המלא
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}