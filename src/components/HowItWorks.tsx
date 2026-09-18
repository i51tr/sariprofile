import React from 'react';
import { ShoppingBag, Wrench, Smartphone, ArrowLeft, ShieldCheck, Zap, Clock } from 'lucide-react';

interface HowItWorksProps {
  onOpenOrder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenOrder }) => {
  const steps = [
    {
      stepNumber: '01',
      icon: ShoppingBag,
      title: 'اختر باقتك واطلب جهاز ساري',
      subtitle: 'طلب إلكتروني في دقيقة واحدة',
      description: 'حدد نوع عقارك (شقة، فيلا، أو مبنى تجاري) وقدّم طلبك عبر الموقع. سيتواصل معك مستشار ساري خلال 24 ساعة لتأكيد موعد الزيارة المناسب لك.',
      badge: 'تواصل سريع خلال 24 ساعة',
      highlight: 'شحن مجاني لكافة مناطق المملكة',
    },
    {
      stepNumber: '02',
      icon: Wrench,
      title: 'التركيب بواسطة مهندس كهربائي معتمد',
      subtitle: '30 دقيقة فقط بدون أي تكسير',
      description: 'يقوم مهندس ساري المعتمد بتركيب الجهاز الصغير والمدمج داخل لوحة القواطع الرئيسية الحالية (DB Panel). لا حاجة لتكسير جدران أو إعادة دهان، وتثبيت المجسات الحساسة دون قطع للأسلاك.',
      badge: 'مدعوم من شركة الطاقة السعودية',
      highlight: 'بدون أي فوضى أو انقطاع طويل للكهرباء',
    },
    {
      stepNumber: '03',
      icon: Smartphone,
      title: 'أمان تام وتوفير فوري عبر التطبيق',
      subtitle: 'تحكم وحماية مطلقة في جيبك',
      description: 'حمّل تطبيق ساري على جوالك (iOS أو Android). خلال 48 ساعة يتعلم الذكاء الاصطناعي بصمة أجهزتك بالكامل، لتبدأ فوراً في مراقبة كل ريال والاستمتاع بحماية استباقية 24/7.',
      badge: 'تطبيق مجاني مدى الحياة',
      highlight: 'تنبيهات صوتية فورية عند أي طارئ',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#070D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>رحلة العميل مع ساري</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            كيف يعمل نظام <span className="bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">ساري</span>؟
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            3 خطوات بسيطة ومدروسة تفصل بينك وبين حماية منزلك وتخفيض فاتورتك الشهرية.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.stepNumber}
                className="relative rounded-3xl bg-gradient-to-b from-[#0E1A29] to-[#08111C] border border-slate-700/80 p-6 sm:p-8 space-y-5 text-right shadow-xl hover:border-emerald-500/50 transition-all group"
              >
                {/* Step Number Watermark */}
                <div className="text-5xl font-black text-slate-800/60 font-['Plus_Jakarta_Sans'] absolute top-6 left-6 select-none group-hover:text-emerald-500/10 transition-colors">
                  {step.stepNumber}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-400">{step.badge}</span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <div className="text-xs font-medium text-slate-400">{step.subtitle}</div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Action Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenOrder}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer text-sm"
          >
            <span>ابدأ الآن واطلب جهاز ساري لمنزلك</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
