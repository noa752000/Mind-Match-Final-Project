import { Brain, Target, TrendingUp, Award } from 'lucide-react';

export function AIExplanation() {
  return (
    <section id="about" className="py-20 px-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-right mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            איך הבינה המלאכותית לומדת אותך?
          </h2>
          <p className="text-xl text-gray-600">
            המערכת שלנו משתמשת באלגוריתמים מתקדמים כדי להבין את סגנון הלמידה שלך 
            ולהתאים את החומר והקצב במיוחד עבורך
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Step 1 */}
          <div className="col-span-12 md:col-span-3 text-right">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">ניתוח התנהגות</h3>
              <p className="text-gray-600 leading-relaxed">
                המערכת עוקבת אחר דפוסי הלמידה שלך, זמני תגובה, וסוגי שאלות שאתה פותר
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-span-12 md:col-span-3 text-right">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">זיהוי חוזקות וחולשות</h3>
              <p className="text-gray-600 leading-relaxed">
                AI מזהה את התחומים שבהם אתה מצטיין ואלו שדורשים תרגול נוסף
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-span-12 md:col-span-3 text-right">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">התאמת תוכן</h3>
              <p className="text-gray-600 leading-relaxed">
                תוכן הלמידה מותאם באופן דינמי לרמת הידע והקצב שלך
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-span-12 md:col-span-3 text-right">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">שיפור מתמיד</h3>
              <p className="text-gray-600 leading-relaxed">
                המערכת משתפרת עם כל אינטראקציה, מבטיחה למידה אופטימלית
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}