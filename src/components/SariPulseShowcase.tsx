import React, { useState, useEffect } from 'react';
import { 
  Zap, ShieldCheck, Activity, Cpu, Sparkles, 
  Flame, RefreshCw, CheckCircle2, Waves, ArrowRight, Play, Pause
} from 'lucide-react';
import { SariLogo } from './SariLogo';

interface SariPulseShowcaseProps {
  onOpenOrder: () => void;
}

export const SariPulseShowcase: React.FC<SariPulseShowcaseProps> = ({ onOpenOrder }) => {
  const [activeTab, setActiveTab] = useState<'pulse' | 'arc' | 'frequencies'>('pulse');
  const [isArcTriggered, setIsArcTriggered] = useState(false);
  const [arcTimer, setArcTimer] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Trigger test arc animation
  const handleTriggerArcTest = () => {
    setIsArcTriggered(true);
    setArcTimer('0.038 ثانية');
    setTimeout(() => {
      setIsArcTriggered(false);
    }, 2800);
  };

  return (
    <section id="sari-core" className="py-24 bg-[#060B12] border-t border-slate-800/90 relative overflow-hidden">
      {/* Background Animated Gradient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Focused EXCLUSIVELY on SARI */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span>تقنية ساري الحصرية والمحمية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            هندسة الذكاء الكهربائي في <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">نظام سـاري</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            ابتكار سعودي صُمم خصيصاً ليحول لوحة قواطع منزلك إلى مركز أمان استباقي ومراقب مالي لحظي، بدون أي تكسير، ومع استجابة كهرومغناطيسية أسرع من رمشة العين.
          </p>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            <button
              onClick={() => setActiveTab('pulse')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'pulse'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>نبض الطاقة وسريان التيار المباشر</span>
            </button>

            <button
              onClick={() => setActiveTab('arc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'arc'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>درع الاستجابة الفورية (0.04 ثانية)</span>
            </button>

            <button
              onClick={() => setActiveTab('frequencies')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'frequencies'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>فاحص الترددات والذبذبات 4.2MHz</span>
            </button>
          </div>
        </div>

        {/* Central Animated Interactive Stage */}
        <div className="bg-gradient-to-b from-[#0B1522] via-[#09121E] to-[#070D14] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* TAB 1: Real-time Energy Current Pulse Animation */}
          {activeTab === 'pulse' && (
            <div className="space-y-8 relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">سريان الكهرباء عبر لوحة التوزيع</div>
                  <h3 className="text-xl font-bold text-white mt-0.5">محاكاة سريان الطاقة تحت حراسة نظام ساري</h3>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>التيار مستقر: 224V | 60Hz</span>
                </div>
              </div>

              {/* Animated SVG Diagram */}
              <div className="relative py-4 px-2">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  
                  {/* Node 1: Main Supply */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2 relative">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">الشبكة العمومية</div>
                    <div className="text-[11px] text-slate-400 font-['Plus_Jakarta_Sans']">220V - 60Hz</div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                      تغذية مستمرة
                    </span>
                  </div>

                  {/* Flow Arrow with Animated Dash */}
                  <div className="hidden md:flex flex-col items-center justify-center text-center">
                    <div className="w-full h-1 bg-slate-800 relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-[pulse_1.5s_infinite]"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">تيار الدخول</span>
                  </div>

                  {/* Center Node: SARI CORE UNIT */}
                  <div className="p-6 rounded-3xl bg-gradient-to-b from-[#10273F] to-[#0A1828] border-2 border-emerald-500/80 text-center space-y-3 relative shadow-xl shadow-emerald-500/20 scale-105">
                    <div className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                      درع سـاري الذكي
                    </div>

                    <div className="pt-2 flex justify-center">
                      <div className="bg-white/95 px-3 py-1 rounded-xl shadow-inner inline-block">
                        <SariLogo size="sm" variant="original" />
                      </div>
                    </div>

                    <div className="text-xs text-emerald-300 font-bold">
                      فحص مستمر 4.2 مليون ذبذبة/ث
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-slate-900/80 p-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 font-semibold">
                        درع الشرر: نشط
                      </div>
                      <div className="bg-slate-900/80 p-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 font-semibold">
                        الترشيد: 100%
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow to Circuits */}
                  <div className="hidden md:flex flex-col items-center justify-center text-center">
                    <div className="w-full h-1 bg-slate-800 relative overflow-hidden rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 animate-[pulse_1.5s_infinite]"></div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">توزيع آمن ومحمي</span>
                  </div>

                  {/* Node 3: Home Circuits */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white">دوائر المنزل</div>
                    <div className="text-[11px] text-slate-400">مكيفات، سخانات، مطبخ</div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                      محمية من الحرائق 100%
                    </span>
                  </div>

                </div>
              </div>

              {/* Real-time Metric Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-[#091422] border border-slate-800 text-right">
                  <div className="text-[11px] text-slate-400">سرعة العزل الوقائي</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5 font-['Plus_Jakarta_Sans']">0.04 ثانية</div>
                </div>
                <div className="p-3 rounded-xl bg-[#091422] border border-slate-800 text-right">
                  <div className="text-[11px] text-slate-400">توفير الفاتورة الشهري</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5 font-['Plus_Jakarta_Sans']">حتى 40%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#091422] border border-slate-800 text-right">
                  <div className="text-[11px] text-slate-400">دقة تفكيك الأجهزة (NILM)</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5 font-['Plus_Jakarta_Sans']">99.4%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#091422] border border-slate-800 text-right">
                  <div className="text-[11px] text-slate-400">وقت التركيب في اللوحة</div>
                  <div className="text-lg font-bold text-white mt-0.5 font-['Plus_Jakarta_Sans']">30 دقيقة</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Instant 0.04s Arc Fault Neutralization Animation */}
          {activeTab === 'arc' && (
            <div className="space-y-6 relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">تجربة الاستجابة الكهرومغناطيسية</div>
                  <h3 className="text-xl font-bold text-white mt-0.5">شاهد كيف يعزل ساري الشرر قبل وصول الحرارة للاشتعال</h3>
                </div>
                <button
                  onClick={handleTriggerArcTest}
                  disabled={isArcTriggered}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isArcTriggered ? 'جاري تحييد الشرر...' : 'محاكاة حدوث شرر في الجدار'}</span>
                </button>
              </div>

              {/* Interactive Visual Canvas */}
              <div className="p-6 rounded-2xl bg-[#08121D] border border-slate-800 text-center space-y-4">
                <div className="relative py-6">
                  {isArcTriggered ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500 text-rose-300 text-sm font-bold">
                        <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
                        <span>تم رصد شرر ميكروي خفي في ماسورة الجدار (Micro-Arc)</span>
                      </div>
                      <div className="text-3xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
                        تم عزل الخط في: {arcTimer}
                      </div>
                      <p className="text-xs text-emerald-300 max-w-md mx-auto">
                        نجح درع ساري في قطع التغذية وإخماد الشرر قبل أن ترتفع درجة حرارة العازل البلاستيكي إلى 80°C، حامياً المنزل من حريق محقق.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-white">النظام في حالة حراسة يقظة 24/7</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        اضغط على الزر أعلاه لمحاكاة نشوب شرر كهربائي خفي داخل تمديدات الجدران، وشاهد سرعة استجابة ساري الفائقة في 0.04 ثانية فقط.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">القواطع العادية التقليدية</div>
                    <div className="font-bold text-rose-400 mt-1">لا ترى الشرر الميكروي إطلاقاً</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                    <div className="text-emerald-300 font-bold">نظام ساري الذكي</div>
                    <div className="font-bold text-emerald-400 mt-1">يرصد الشرر خلال 0.04 ثانية</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">النتيجة للمنزل</div>
                    <div className="font-bold text-slate-200 mt-1">حماية 100% لأرواح العائلة والمبنى</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 4.2MHz Frequency Spectrum Equalizer */}
          {activeTab === 'frequencies' && (
            <div className="space-y-6 relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="text-right">
                  <div className="text-xs font-bold text-cyan-400">خوارزميات الذكاء الاصطناعي الترددية</div>
                  <h3 className="text-xl font-bold text-white mt-0.5">كيف يفرق ساري بين صوت الموتور الطبيعي والشرر الخطر؟</h3>
                </div>
                <div className="text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl font-semibold">
                  تحليل طيفي عالي الدقة (4.2M عينة/ثانية)
                </div>
              </div>

              {/* Animated Equalizer Waveform Bars */}
              <div className="p-6 rounded-2xl bg-[#08121D] border border-slate-800 space-y-6">
                <div className="flex items-end justify-center gap-1.5 h-32 pt-6">
                  {[45, 78, 32, 90, 65, 82, 40, 95, 55, 70, 85, 48, 92, 60, 75, 50, 88, 62, 79, 44, 83, 67, 91, 58].map((height, i) => (
                    <div
                      key={i}
                      className="w-2.5 rounded-t-full bg-gradient-to-t from-emerald-500 via-teal-400 to-cyan-300 transition-all duration-300"
                      style={{
                        height: `${Math.min(100, Math.max(20, (height + (i % 3) * 15)))}%`,
                        opacity: i % 2 === 0 ? 0.9 : 0.7,
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-right">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>تفكيك بصمة الأجهزة (Appliance Signature)</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      يعرف ساري بدقة متى يبدأ كمبروسر المكيف، متى تعمل غسالة الصحون، ومتى يسخن سخان المياه بدون الحاجة لأي حساسات خارجية.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>فلترة الذبذبات غير الضارة وتفادي الإنذار الكاذب</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      يمتلك ساري خوارزمية ذكية لا تتأثر بالشرر الطبيعي الصغير لمفاتيح الإضاءة، بل تعزل فقط الترددات غير الطبيعية المؤدية للحرائق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تركيب معتمد ومدعوم من شركة الطاقة السعودية</span>
            </div>
            <button
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>احجز جهاز ساري لمنزلك الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
