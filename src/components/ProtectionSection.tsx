import React, { useState } from 'react';
import { 
  ShieldCheck, Flame, ZapOff, ThermometerSnowflake, 
  Moon, Activity, CheckCircle2, 
  Lock, AlertOctagon, Sparkles, RefreshCw, AlertTriangle
} from 'lucide-react';

interface ProtectionSectionProps {
  onOpenOrder: () => void;
}

export const ProtectionSection: React.FC<ProtectionSectionProps> = ({ onOpenOrder }) => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const protectionFeatures = [
    {
      id: 'arc',
      icon: Flame,
      title: 'كشف الالتماس والشرر الخفي بالجدران',
      subtitle: 'Micro-Arc Fault Detection (AFDD)',
      badge: 'ابتكار ساري الحصري',
      shortBenefit: 'يحمي منزلك وعائلتك من حرائق الكهرباء قبل نشوبها، برصد الشرر الميكروي داخل مواسير الجدران في 0.04 ثانية فقط.',
      metric: '0.04 ثانية',
      metricLabel: 'سرعة استجابة ورصد الشرر',
      diagnosticStatus: 'فحص الترددات نشط (4.2 مليون ذبذبة/ث)',
      details: [
        'رصد فوري لاهتراء عوازل الأسلاك القديمة داخل الجدران',
        'حماية ضد الشرر الناتج عن القوارض أو تمديدات غير مطابقة',
        'إنذار فوري على الجوال قبل أن ترتفع حرارة الجدار للاشتعال',
      ],
    },
    {
      id: 'thermal',
      icon: ThermometerSnowflake,
      title: 'المراقبة الحرارية لقواطع المكيفات',
      subtitle: 'Thermal Sensing & Breaker Guard',
      badge: 'صيف آمن 100%',
      shortBenefit: 'يراقب حرارة مفاتيح المكيفات في ذروة صيف المملكة الحار، وينبهك قبل انصهار القاطع أو اشتعال اللوحة.',
      metric: '36.2°C',
      metricLabel: 'حرارة اللوحة الحالية (آمنة)',
      diagnosticStatus: 'حساسات الليزر الحرارية تقرأ كل قاطع',
      details: [
        'منع انصهار مفاتيح القواطع في أوقات الذروة الصيفية',
        'كشف التحميل الزائد قبل أن يفصل القاطع فجأة ويزعج العائلة',
        'توجيه فوري لموازنة تشغيل المكيفات بين الغرف',
      ],
    },
    {
      id: 'surge',
      icon: ZapOff,
      title: 'حماية الأجهزة من تذبذب وقفزات الفولتية',
      subtitle: 'Voltage Surge & Spike Defense',
      badge: 'حماية بوردات الأجهزة',
      shortBenefit: 'يحمي بوردات المكيفات الإنفيرتر والشاشات وشواحن السيارات الكهربائية من التلف المفاجئ الناتج عن قفزات الجهد.',
      metric: '220V ± 5%',
      metricLabel: 'نطاق الجهد المضمون للأجهزة',
      diagnosticStatus: 'مستقر 60Hz - درع امتصاص القفزات مفعل',
      details: [
        'حماية فورية لبوردات المكيفات الحديثة باهظة الثمن',
        'تأمين شواحن السيارات الكهربائية المنزلية (EV)',
        'امتصاص الصدمات الكهربائية الناتجة عن الصواعق والشبكة',
      ],
    },
    {
      id: 'leakage',
      icon: AlertOctagon,
      title: 'كشف التسريب الأرضي والحماية من الصعق',
      subtitle: 'Ground Fault & Residual Current',
      badge: 'أمان الأطفال والمسابح',
      shortBenefit: 'يكشف أي تهريب كهربائي خفي في سخانات المياه وغسالات الصحون والمضخات، لحماية الأطفال والأسرة من خطر الصعق.',
      metric: '10 mA',
      metricLabel: 'حساسية فائقة لرصد التسريب',
      diagnosticStatus: 'خط التأريض (Earth) سليم وبدون تهريب',
      details: [
        'فحص دوري لحظي لسخانات مياه السطح ودورات المياه',
        'كشف تآكل عناصر التسخين والمضخات قبل وصول الكهرباء للماء',
        'تأمين أفياش غرف الأطفال والحدائق الخارجية',
      ],
    },
    {
      id: 'guard',
      icon: Moon,
      title: 'وضع "حراسة السفر والنوم" الذكي',
      subtitle: 'Night & Vacation Autonomous Shield',
      badge: 'راحة بال أثناء الغياب',
      shortBenefit: 'بضغطة زر واحدة، يؤمن ساري منزلك بالكامل أثناء نومك أو سفرك، ويفصل الخطوط المنسية ويرسل تنبيهات طوارئ.',
      metric: '100%',
      metricLabel: 'مستوى تأمين البيت أثناء السفر',
      diagnosticStatus: 'وضع الحراسة الذاتية جاهز للتشغيل',
      details: [
        'إطفاء تلقائي لهدر أجهزة وضع الاستعداد غير المستخدمة',
        'مراقبة مشددة لأي تشغيل غير معتاد لمضخة أو سخان',
        'إشعارات طوارئ SMS مباشرة لك ولأفراد العائلة المعتمدين',
      ],
    },
    {
      id: 'predictive',
      icon: Activity,
      title: 'الصيانة التنبؤية للأجهزة بالذكاء الاصطناعي',
      subtitle: 'Predictive Appliance Health AI',
      badge: 'وفر تكاليف الصيانة',
      shortBenefit: 'يتعلم سلوك كمبروسر المكيف ودينمو المياه، وينبهك بإجهاد المحرك قبل أن يتعطل بأسابيع لتوفير تكلفة الصيانة المفاجئة.',
      metric: '2 - 4 أسابيع',
      metricLabel: 'تنبؤ مسبق بالعطل قبل وقوعه',
      diagnosticStatus: 'محرك مكيف الصالة يعمل بكفاءة 96%',
      details: [
        'كشف مبكر لانسداد فلاتر المكيفات وارتفاع سحب الأمبير',
        'تنبيهك قبل احتراق دينمو المياه في أوقات غير مناسبة',
        'توفير مئات الريالات بتفادي الأعطال المفاجئة الكبرى',
      ],
    },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      const current = protectionFeatures[selectedFeature];
      setSimulationResult(`تم إجراء الاختبار بنجاح: استجاب درع «ساري» في ${current.metric} فقط وقام بتحييد الخطر وتأمين الدائرة.`);
    }, 900);
  };

  const current = protectionFeatures[selectedFeature];
  const CurrentIcon = current.icon;

  return (
    <section id="protection" className="py-20 bg-[#070D14] border-t border-slate-800/80 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>الحماية الكهربائية الاستباقية</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            لا نكتفي بعدّ الكيلوواط..
            <br />
            <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              بل نحمي بيتك وأسرتك من أخطار الكهرباء 24/7.
            </span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            الأنظمة العادية تخبرك فقط كم ستدفع نهاية الشهر. أما <strong className="text-white font-bold">ساري</strong> فيحول لوحة توزيع منزلك إلى درع أمان ذكي يستشعر الشرر وسخونة القواطع والالتماس ويمنع الكارثة قبل وقوعها.
          </p>
        </div>

        {/* Interactive Feature Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Feature Selector Buttons (Right side in RTL) */}
          <div className="lg:col-span-5 space-y-3">
            {protectionFeatures.map((feat, index) => {
              const Icon = feat.icon;
              const isSelected = selectedFeature === index;

              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    setSelectedFeature(index);
                    setSimulationResult(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-l from-[#0E1F30] to-[#0A1624] border-emerald-500/70 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">{feat.badge}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                    </div>
                    <div className={`font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {feat.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1">
                      {feat.shortBenefit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Live Visual Preview (Left side in RTL) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-[#0D1B2A] to-[#08111C] border border-slate-700/80 p-6 sm:p-8 space-y-6 text-right shadow-2xl relative overflow-hidden">
              
              {/* Top Badge & Metric */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-400">{current.badge}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{current.title}</h3>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-left shrink-0">
                  <div className="text-xs text-slate-400 font-medium">{current.metricLabel}</div>
                  <div className="text-2xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
                    {current.metric}
                  </div>
                </div>
              </div>

              {/* Concise Customer Benefit Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-l from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 text-right space-y-1">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>الفائدة المباشرة لمنزلك:</span>
                </div>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  {current.shortBenefit}
                </p>
              </div>

              {/* Live Sensor & Circuit Diagnostic Bar */}
              <div className="p-4 rounded-2xl bg-[#091420] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">حالة حساس ساري في لوحة التوزيع:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {current.diagnosticStatus}
                  </span>
                </div>

                {/* Diagnostic Metric Line */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">الجهد (Voltage)</div>
                    <div className="font-bold text-slate-200 mt-0.5 font-['Plus_Jakarta_Sans']">224 V</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">التردد (Frequency)</div>
                    <div className="font-bold text-emerald-400 mt-0.5 font-['Plus_Jakarta_Sans']">60.0 Hz</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">مؤشر الخطر</div>
                    <div className="font-bold text-emerald-400 mt-0.5">0.00% آمن</div>
                  </div>
                </div>

                {/* Interactive Simulator Trigger Button */}
                <div className="pt-2">
                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                    <span>{isSimulating ? 'جاري محاكاة الاستجابة...' : 'جرّب اختبار استجابة ساري الفورية (محاكاة حية)'}</span>
                  </button>

                  {simulationResult && (
                    <div className="mt-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{simulationResult}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bullet Highlights */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-300">كيف يضمن ساري هذه الحماية؟</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Trust & Order Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>مدعوم من شركة الطاقة السعودية وبدون أي تكسير</span>
                </div>
                <button
                  onClick={onOpenOrder}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer text-center"
                >
                  احجز فحص اللوحة وتركيب ساري
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
