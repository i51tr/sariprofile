import React, { useState } from 'react';
import { ShieldCheck, Zap, Activity, Flame, ArrowLeft, CheckCircle2, ChevronLeft, Lock, Gauge, Sparkles } from 'lucide-react';
import { SariLogo } from './SariLogo';

interface HeroProps {
  onOpenOrder: () => void;
  onExploreSimulator: () => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, onExploreSimulator, onScrollTo }) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'protection' | 'consumption'>('protection');

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-7 text-right">
            {/* Top Pill with Official Sari Logo */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-inner">
              <div className="bg-white/95 px-2.5 py-0.5 rounded-lg">
                <SariLogo size="sm" variant="original" />
              </div>
              <span className="text-xs font-semibold text-emerald-300">
مشروع ساري : الجيل المتطور لإدارة وحماية الطاقة
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2]">
              أمان يحمي بيتك من الحرائق،
              <br />
              <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                وترشيد يخفّض فاتورتك حتى 40%
              </span>
              <br />
              <span className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-semibold mt-1 inline-block">
                بنظام سعودي ذكي واحد داخل لوحة القواطع، بدون أي تكسير.
              </span>
            </h1>

            {/* Sub-description with concise customer-oriented wording */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              يجمع <strong className="text-white font-bold">ساري (Sari)</strong> بين قوتين في جهاز مدمج واحد:
              <span className="text-emerald-400 font-semibold"> درع حماية استباقي 24/7</span> يكشف الالتماس الميكروي وسخونة القواطع قبل نشوب الشرر،
              و<span className="text-cyan-400 font-semibold">مراقب مالي ذكي</span> يترجم استهلاك أجهزتك لريالات لحظية لترشيد فاتورتك حتى 40%.
            </p>

            {/* Feature Bullets with immediate customer takeaways */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>كشف الالتماس والشرر الخفي بالجدران في 0.04 ثانية</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>تفكيك استهلاك كل مكيف وجهاز بالريال اللحظي</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>مراقبة وتيرة الاستهلاك الذكية لتفادي الهدر المالي</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>تركيب في 30 دقيقة بلوحة القواطع بدون أي تكسير</span>
              </div>
            </div>

            {/* CTA Buttons & Trust */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-order-cta"
                onClick={onOpenOrder}
                className="group px-7 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 cursor-pointer text-base"
              >
                <span>احجز جهاز ساري مع التركيب المجاني</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1.5" />
              </button>

              <button
                onClick={onExploreSimulator}
                className="px-6 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>جرّب المحاكي التفاعلي ومستشار AI</span>
              </button>
            </div>

            {/* Saudi Certifications & Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>مدعوم من شركة الطاقة السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>ضمان ذهبي شامل واستبدال فوري</span>
              </div>
            </div>
          </div>

          {/* Interactive Hardware & Panel Showcase Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-emerald-600/30 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0E1B2B] to-[#070F19] border border-slate-700/80 shadow-2xl p-5 space-y-5 text-right overflow-hidden">
                
                {/* Header of Device Mockup */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                    <span className="text-xs font-semibold text-emerald-400 font-['Plus_Jakarta_Sans']">SARI SMART CORE v3.4</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>حالة اللوحة: مؤمّنة بالكامل</span>
                  </div>
                </div>

                {/* Tab Switcher on the Card */}
                <div className="grid grid-cols-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => setActiveHeroTab('protection')}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeHeroTab === 'protection'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>درع الأمان والحماية (100%)</span>
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('consumption')}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeHeroTab === 'consumption'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>الاستهلاك والريال اللحظي</span>
                  </button>
                </div>

                {/* Active Tab View */}
                {activeHeroTab === 'protection' ? (
                  <div className="space-y-4">
                    {/* Primary Safety Metric */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-emerald-300 font-medium">مؤشر الحماية الكهربائية الاستباقية</div>
                        <div className="text-2xl font-black text-emerald-400 font-['Plus_Jakarta_Sans'] flex items-center gap-2 mt-0.5">
                          <span>100% SAFE</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans">0 مخاطر</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Sensor Diagnostics Grid */}
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">كشف الالتماس (Arc)</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1">آمن 0.01%</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">فحص 4.2M تردد</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">حرارة القواطع</div>
                        <div className="text-sm font-bold text-cyan-400 mt-1">36.2°C</div>
                        <div className="text-[9px] text-emerald-400 mt-0.5">أقل من الحد الأقصى</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400">جهد التغذية (V)</div>
                        <div className="text-sm font-bold text-slate-100 mt-1 font-['Plus_Jakarta_Sans']">224 V</div>
                        <div className="text-[9px] text-emerald-400 mt-0.5">مستقر تماماً 60Hz</div>
                      </div>
                    </div>

                    {/* Active Protection Note */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">منع الحرائق:</strong> تم فحص قاطع التكييف الرئيسي، لا توجد أي قفزات تيار مفاجئة أو تسريب في التأريض الأرضي.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Primary Cost Metric */}
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-cyan-300 font-medium">الاستهلاك اللحظي الآن</div>
                        <div className="text-2xl font-black text-cyan-300 font-['Plus_Jakarta_Sans'] flex items-baseline gap-1.5 mt-0.5">
                          <span>3.42</span>
                          <span className="text-sm font-sans text-slate-300">كيلوواط</span>
                          <span className="text-xs text-emerald-400 font-sans mr-2">≈ 0.61 ر.س/ساعة</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                        <Gauge className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Month Forecast & Tariff Indicator */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">توقع فاتورة نهاية الشهر:</span>
                        <span className="font-bold text-emerald-400">430 ر.س (ضمن النطاق الاقتصادي الممتاز)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-4/12 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>الاستهلاك الحالي: 2,340 ك.و.س</span>
                        <span className="text-emerald-400 font-medium">وفرت حتى الآن: 260 ر.س</span>
                      </div>
                    </div>

                    {/* Breakdown Pill */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex justify-between">
                        <span className="text-slate-400">المكيفات:</span>
                        <span className="font-bold text-slate-200">58% (250 ر.س)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex justify-between">
                        <span className="text-slate-400">أجهزة أخرى:</span>
                        <span className="font-bold text-slate-200">42% (180 ر.س)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom interactive action inside the card */}
                <div className="pt-2">
                  <button
                    onClick={onExploreSimulator}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>فتح محاكي لوحة ساري الكامل التفاعلي</span>
                    <ChevronLeft className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>

              </div>

              {/* Small floating badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-[#091420]/95 border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px]">حماية 24/7 متصلة</div>
                  <div className="text-[10px] text-slate-400">تنبيهات صوتية فورية على الجوال</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
