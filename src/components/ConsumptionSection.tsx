import React from 'react';
import { 
  Zap, TrendingDown, DollarSign, Cpu, 
  Layers, CheckCircle2, ArrowLeft, ShieldCheck, Sparkles
} from 'lucide-react';

interface ConsumptionSectionProps {
  onOpenOrder: () => void;
  onScrollTo: (id: string) => void;
}

export const ConsumptionSection: React.FC<ConsumptionSectionProps> = ({ onOpenOrder, onScrollTo }) => {
  return (
    <section id="consumption" className="py-20 bg-gradient-to-b from-[#070D14] via-[#081320] to-[#070D14] border-t border-slate-800/80 relative">
      {/* Background cyan glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>الترشيد الذكي وتخفيض الفاتورة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            افهم استهلاكك بالريال..
            <br />
            <span className="bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              وخفّض فاتورتك الشهرية حتى 40% بدون تضحية بالراحة.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            بدلاً من صدمة الفاتورة في نهاية الشهر، يترجم ساري نبضات الكهرباء إلى ريالات واضحة لكل جهاز على جوالك، مع خطة ذكية تبقيك في الشريحة الأوفر دائماً.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Real-time SAR */}
          <div className="p-6 rounded-2xl bg-[#0B1522] border border-slate-800 hover:border-cyan-500/50 transition-all text-right space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-cyan-400">وضوح مالي فوري</span>
              <h3 className="text-lg font-bold text-white">الاستهلاك بالريال اللحظي</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              تعرف على تكلفة تشغيل المكيف، الفرن، أو السخان بالدقيقة والساعة بالريال بدلاً من أرقام الكيلوواط المبهمة.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تحديث كل 3 ثوانٍ بدقة 99.4%</span>
            </div>
          </div>

          {/* Card 2: Smart Consumption Guard */}
          <div className="p-6 rounded-2xl bg-[#0B1522] border border-slate-800 hover:border-emerald-500/50 transition-all text-right space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400">وفر حتى 40% من الهدر</span>
              <h3 className="text-lg font-bold text-white">مراقب مالي ذكي للاستهلاك</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ساري يرصد معدل الاستهلاك اليومي وينبهك استباقياً لضبط وتيرة التشغيل وتفادي تراكم الأحمال غير المبررة.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>يوفر 400 إلى 1,200 ر.س شهرياً</span>
            </div>
          </div>

          {/* Card 3: NILM Machine Learning */}
          <div className="p-6 rounded-2xl bg-[#0B1522] border border-slate-800 hover:border-cyan-500/50 transition-all text-right space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-cyan-400">بدون أفياش ذكية إضافية</span>
              <h3 className="text-lg font-bold text-white">التعرف على بصمة الأجهزة</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              خوارزمية الذكاء الاصطناعي تفكك استهلاك كل مكيف، غسالة، ومضخة بدقة من لوحة التوزيع دون الحاجة لأي حساس خارجي.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>يتعرف على أكثر من 30 جهازاً منزلياً</span>
            </div>
          </div>

          {/* Card 4: Vampire Load Detection */}
          <div className="p-6 rounded-2xl bg-[#0B1522] border border-slate-800 hover:border-emerald-500/50 transition-all text-right space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400">إيقاف الهدر الصامت</span>
              <h3 className="text-lg font-bold text-white">كشف الهدر الكهربائي الخفي</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              الأجهزة المهملة والشواحن وتهريب السخانات تمثل حتى 20% من الفاتورة. ساري يرصدها ويقترح جداول إيقاف توفر مالك فوراً.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>توفير فوري يبدأ من اليوم الأول</span>
            </div>
          </div>

        </div>

        {/* Real Comparison Case Study (Before & After Sari) */}
        <div className="mt-14 rounded-3xl bg-gradient-to-l from-[#0E1A29] to-[#09131F] border border-slate-700/80 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <span>نموذج واقعي موثّق من منازل الرياض والحسا</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                كيف خفّضت عائلة "أبو فهد" فاتورة الفيلا من 1,450 ر.س إلى 880 ر.س شهرياً؟
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                بعد تركيب ساري في لوحة التوزيع، اكتشف النظام أن سخان السطح كان يسحب كهرباء طوال 24 ساعة دون انقطاع لوجود تهريب بسيط، وأن مكيف الصالة كان مضبوطاً على 18° مما منع الكمبروسر من الفصل.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ضبط حرارة المكيف على 24° وفّر 210 ر.س شهرياً</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>جدولة السخان المركزي وفّرت 190 ر.س شهرياً</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ضبط وتيرة التشغيل الذكية وفّر 170 ر.س شهرياً</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>كشف سخونة القاطع حمى المنزل من التماس محقق</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onScrollTo('calculator')}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  احسب كم ستوفر في منزلك الآن
                </button>
              </div>
            </div>

            {/* Visual Stats Comparison Card */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-5 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">نتيجة التوفير في فيلا دورين</div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                  <div className="text-xs text-slate-400">قبل ساري</div>
                  <div className="text-2xl font-black text-rose-400 mt-1 font-['Plus_Jakarta_Sans']">
                    1,450 <span className="text-xs font-sans">ر.س</span>
                  </div>
                  <div className="text-[10px] text-rose-300 mt-0.5">تجاوز الشريحة الأولى</div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                  <div className="text-xs text-slate-400">بعد ساري</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-['Plus_Jakarta_Sans']">
                    880 <span className="text-xs font-sans">ر.س</span>
                  </div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">توفير 570 ر.س شهرياً</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                💰 <strong className="text-emerald-400">إجمالي التوفير السنوي:</strong> 6,840 ريال سعودي سنوياً + أمان كهربائي 100%.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

