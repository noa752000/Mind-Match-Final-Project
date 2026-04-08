import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onRegisterClick?: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section className="relative pt-8 pb-20 px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Content - Right side for RTL */}
          <div className="col-span-12 md:col-span-6 text-right">
            <h2 className="text-2xl text-gray-700 mb-4">צהריים טובים הדס!</h2>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700">פלטפורמת למידה חכמה</span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              למידה מותאמת אישית
              <br />
              <span className="text-teal-600">מונעת בינה מלאכותית</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              פלטפורמת למידה מתקדמת לסטודנטים למערכות מידע. הבינה המלאכותית 
              שלנו לומדת את סגנון הלמידה שלך ומתאימה את התוכן במיוחד עבורך.
            </p>
            
            <div className="flex items-center gap-4 justify-start">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-teal-600 hover:bg-teal-700"
                onClick={onRegisterClick}
              >
                התחל ללמוד עכשיו
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                למד עוד
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12 mt-12 justify-center">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">סטודנטים פעילים</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">שביעות רצון</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">קורסים</div>
              </div>
            </div>
          </div>

          {/* Image - Left side for RTL */}
          <div className="col-span-12 md:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1758612214899-c1bb0bfae408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3AlMjBtb2Rlcm58ZW58MXx8fHwxNzcxNDM0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student learning"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}