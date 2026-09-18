import React from 'react';
import { Check, ShieldCheck, Zap, ArrowLeft, Star, Clock, CheckCircle2 } from 'lucide-react';
import { PRICING_PLANS } from '../data/sariContent';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-[#070D14] via-[#091522] to-[#070D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-cyan-400">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>باقات شفافة وشاملة لكل شيء</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            استثمار واحد.. <span className="bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">أمان وتوفير مستمر مدى الحياة</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            جميع الباقات تشمل الجهاز، التركيب المجاني بواسطة مهندس معتمد، تطبيق الجوال مدى الحياة، وضمان استبدال شامل.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between text-right relative transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0F2236] to-[#0A1624] border-2 border-emerald-500/80 shadow-2xl shadow-emerald-500/20 lg:-translate-y-2'
                  : 'bg-[#0A1422] border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>الأكثر طلباً للفلل في المملكة</span>
                </div>
              )}

              {/* Header */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-400">{plan.tag}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{plan.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="pt-3 pb-4 border-y border-slate-800/80">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white font-['Plus_Jakarta_Sans']">
                      {plan.priceSAR.toLocaleString('ar-SA')}
                    </span>
                    <span className="text-sm font-bold text-slate-400">ريال سعودي</span>
                    <span className="text-xs text-slate-500 line-through mr-2 font-['Plus_Jakarta_Sans']">
                      {plan.originalPriceSAR.toLocaleString('ar-SA')} ر.س
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>دفعة واحدة فقط • بدون رسوم اشتراك شهرية أو مخفية</span>
                  </div>
                </div>

                {/* Capacity Label */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-medium">
                  لوحة التوزيع: <strong className="text-cyan-300">{plan.panelCapacity}</strong>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-slate-200">ماذا تشمل هذه الباقة؟</div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 shadow-xl shadow-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">الضمان الذهبي الشامل من سـاري</div>
              <div className="text-xs text-slate-400">
                استبدال فوري للجهاز في حال حدوث أي عطل، وتجربة مطمئنة 100% مع دعم هندسي محلي معتمد.
              </div>
            </div>
          </div>
          <div className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 shrink-0">
            تركيب مجاني في 30 دقيقة
          </div>
        </div>

      </div>
    </section>
  );
};
