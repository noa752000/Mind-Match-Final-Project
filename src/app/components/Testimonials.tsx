import { Star, Quote } from 'lucide-react';
import { Card } from './ui/card';

const testimonials = [
  {
    name: 'שרה כהן',
    role: 'סטודנטית שנה ב׳, מערכות מידע',
    image: 'https://images.unsplash.com/photo-1680983387172-aedb346ba443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3טודנט8ZW5wxfHx8fDE3NzMyOTI2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content: 'הפלטפורמה שינתה את דרך הלמידה שלי. הבינה המלאכותית מציעה תוכן מותאם אישית בדיוק כשאני צריכה.',
    rating: 5,
  },
  {
    name: 'דוד לוי',
    role: 'סטודנט שנה ג׳, ניתוח מערכות',
    image: 'https://images.unsplash.com/photo-1618316224214-a5bac0651def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNטודנט8ZW5wxfHx8fHwxNzczMjkxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content: 'המורה AI זמין תמיד ועוזר לי להבין מושגים מורכבים. הציונים שלי השתפרו משמעותית מאז שהתחלתי להשתמש במערכת.',
    rating: 5,
  },
  {
    name: 'מיכל אברהם',
    role: 'סטודנטית שנה א׳, מדעי המחשב',
    image: 'https://images.unsplash.com/photo-1709811240710-cff5f04deb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjb2xsZWdlJTIwc3טודנט8ZW5wxfHx8fDE3NzMyODQyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content: 'קבוצות הלמידה החכמות עזרו לי למצוא חברים ללימודים שבאמת מתאימים לי. למידה שיתופית במיטבה!',
    rating: 5,
  },
];

const universities = [
  { name: 'המכללה האקדמית תל אביב-יפו', logo: 'TAU', logoUrl: 'https://upload.wikimedia.org/wikipedia/he/a/a4/TelAvivYafoAcademic.svg' },
  { name: 'מכללת עמק יזרעאל', logo: 'EY', logoUrl: 'https://upload.wikimedia.org/wikipedia/he/8/83/EmeqIsrael.svg' },
  { name: 'אוניברסיטת תל אביב', logo: 'TAU', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Tel_Aviv_university_logo_-_English.png' },
  { name: 'אוניברסיטת בן גוריון', logo: 'BGU', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D7%9C%D7%95%D7%92%D7%95_%D7%90%D7%95%D7%A0%D7%99%D7%91%D7%A8%D7%A1%D7%99%D7%98%D7%AA_%D7%91%D7%9F_%D7%92%D7%95%D7%A8%D7%99%D7%95%D7%9F.PNG' },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-16 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Testimonials */}
        <div className="text-right mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            מה הסטודנטים אומרים
          </h2>
          <p className="text-xl text-gray-600">
            אלפי סטודנטים כבר משפרים את ציוניהם עם הפלטפורמה שלנו
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-span-12 md:col-span-4">
              <Card className="p-8 h-full hover:shadow-lg transition-shadow border-gray-100 flex flex-col">
                <div className="mb-6 flex-1">
                  <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
                  <p className="text-gray-700 leading-relaxed text-right mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-1 justify-end mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-end">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Academic Credibility */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            בשיתוף מוסדות אקדמיים מובילים
          </h3>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {universities.map((uni, index) => (
              <div
                key={index}
                className="w-32 h-20 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50/50 transition-all p-4"
              >
                {uni.logoUrl ? (
                  <img src={uni.logoUrl} alt={uni.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">{uni.logo}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
