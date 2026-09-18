import React, { useState } from 'react';
import { Calculator, ShieldAlert, Sparkles, ArrowLeft, CheckCircle, Flame, Zap } from 'lucide-react';

interface SavingsCalculatorProps {
  onOpenOrder: (planId?: string) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onOpenOrder }) => {
  const [propertyType, setPropertyType] = useState<'apartment' | 'floor' | 'villa' | 'mansion'>('villa');
  const [currentBill, setCurrentBill] = useState<number>(1400);
  const [buildingAge, setBuildingAge] = useState<'new' | 'medium' | 'old'>('medium');
  const [hasCentralAC, setHasCentralAC] = useState<boolean>(true);
  const [hasEV, setHasEV] = useState<boolean>(false);

  // Calculations based on Saudi tariff structures and electrical age factors
  const savingsRate = propertyType === 'apartment' ? 0.28 : propertyType === 'floor' ? 0.32 : 0.38;
  const monthlySavings = Math.round(currentBill * savingsRate);
  const annualSavings = monthlySavings * 12;

  // Payback period in months
  const estimatedDeviceCost = propertyType === 'apartment' ? 1290 : propertyType === 'mansion' ? 3890 : 2190;
  const paybackMonths = (estimatedDeviceCost / monthlySavings).toFixed(1);

  // Electrical risk rating based on age and bill load
  let riskRating = 'متوسط';
  let riskColor = 'text-amber-400';
  let riskDescription = 'توجد أحمال تكييف صيفية عالية قد ترفع حرارة قواطع لوحة التوزيع فوق المعدل الطبيعي.';

  if (buildingAge === 'old' || currentBill > 2200) {
    riskRating = 'مرتفع وحرج';
    riskColor = 'text-rose-400';
    riskDescription = 'عمر التمديدات والأحمال الكبيرة يزيدان احتمالية الالتماس الميكروي وتآكل الأسلاك في الجدران.';
  } else if (buildingAge === 'new' && currentBill < 800) {
    riskRating = 'منخفض';
    riskColor = 'text-emerald-400';
    riskDescription = 'الشبكة حديثة، والتركيز الأساسي سيكون على ترشيد المكيفات وتفادي تجاوز الشريحة الأولى.';
  }

  const recommendedPlan = propertyType === 'apartment' ? 'home' : propertyType === 'mansion' ? 'business' : 'pro';

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-[#070D14] via-[#091422] to-[#070D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>حاسبة ساري الذكية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            كم ستوفر سنوياً؟ وما هو مستوى أمان شبكتك؟
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            أدخل تفاصيل عقارك لتكتشف الأثر المالي الفوري وتقييم الحماية الكهربائية المتوقعة مع ساري.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0C1726] border border-slate-700/80 shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Inputs Column (Right in RTL) */}
            <div className="lg:col-span-7 space-y-7 text-right">
              
              {/* Property Type Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-200">نوع العقار:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'apartment', label: 'شقة سكنية' },
                    { id: 'floor', label: 'دور مستقل' },
                    { id: 'villa', label: 'فيلا (دورين)' },
                    { id: 'mansion', label: 'قصر / عمارة' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setPropertyType(item.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        propertyType === item.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Bill Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">متوسط فاتورة الكهرباء الشهرية الحالية:</span>
                  <span className="text-xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
                    {currentBill.toLocaleString('ar-SA')} <span className="text-xs font-sans text-slate-300">ر.س</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={4500}
                  step={50}
                  value={currentBill}
                  onChange={e => setCurrentBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-['Plus_Jakarta_Sans']">
                  <span>300 ر.س</span>
                  <span>1,500 ر.س</span>
                  <span>3,000 ر.س</span>
                  <span>4,500+ ر.س</span>
                </div>
              </div>

              {/* Building Age & Extra Loads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200">عمر المبنى والتمديدات:</label>
                  <select
                    value={buildingAge}
                    onChange={e => setBuildingAge(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="new">حديث (أقل من 4 سنوات)</option>
                    <option value="medium">متوسط (4 إلى 10 سنوات)</option>
                    <option value="old">قديم (أكثر من 10 سنوات)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200">أحمال إضافية متوفرة:</label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasCentralAC}
                        onChange={e => setHasCentralAC(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span>تكييف مركزي / دكت</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEV}
                        onChange={e => setHasEV(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span>شاحن سيارة كهربائية (EV)</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>

            {/* Results Column (Left in RTL) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0E1F30] to-[#07111C] rounded-2xl border border-emerald-500/30 p-6 space-y-6 text-center shadow-xl">
              
              <div className="space-y-1">
                <div className="text-xs text-emerald-300 font-semibold">التوفير السنوي المتوقع بالريال</div>
                <div className="text-4xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
                  {annualSavings.toLocaleString('ar-SA')} <span className="text-base font-sans">ر.س / سنة</span>
                </div>
                <div className="text-xs text-slate-300">
                  أي ما يعادل <strong className="text-white">{monthlySavings.toLocaleString('ar-SA')} ر.س</strong> شهرياً في جيبك!
                </div>
              </div>

              {/* Payback period pill */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>استرداد قيمة جهاز ساري:</span>
                <span className="font-bold text-cyan-300 font-['Plus_Jakarta_Sans']">
                  خلال {paybackMonths} أشهر فقط
                </span>
              </div>

              {/* Risk Assessment Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-right space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">مؤشر الخطر الكهربائي الحالي:</span>
                  <span className={`text-xs font-bold ${riskColor}`}>{riskRating}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {riskDescription}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => onOpenOrder(recommendedPlan)}
                className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <span>احجز باقتك الموصى بها لهذا العقار</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
