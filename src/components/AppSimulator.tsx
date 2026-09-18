import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, Zap, Bot, Flame, AlertTriangle, CheckCircle, 
  Send, RotateCcw, Power, Moon, Thermometer, Radio, 
  ChevronRight, Sparkles, MessageSquare, Info, Sliders, Check
} from 'lucide-react';
import { INITIAL_DEVICES, INITIAL_BREAKERS, INITIAL_ALERTS } from '../data/sariContent';
import { CircuitBreaker, DeviceUsage, ProtectionAlert, ChatMessage } from '../types';

interface AppSimulatorProps {
  onOpenOrder: () => void;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ onOpenOrder }) => {
  const [activeTab, setActiveTab] = useState<'protection' | 'consumption' | 'ai'>('protection');
  
  // Protection state
  const [breakers, setBreakers] = useState<CircuitBreaker[]>(INITIAL_BREAKERS);
  const [alerts, setAlerts] = useState<ProtectionAlert[]>(INITIAL_ALERTS);
  const [travelGuardActive, setTravelGuardActive] = useState(false);
  
  // Consumption state
  const [devices, setDevices] = useState<DeviceUsage[]>(INITIAL_DEVICES);
  const [ecoModeEnabled, setEcoModeEnabled] = useState(false);

  // AI Assistant Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      text: 'أهلاً بك! أنا «مستشار ساري الذكي»، مهندسك الشخصي لحماية شبكة منزلك الكهربائية وترشيد كل ريال في فاتورتك. كيف يمكنني مساعدتك اليوم؟',
      timestamp: 'الآن',
      suggestions: [
        'كيف أخفض فاتورة التكييف في الصيف؟',
        'كيف يحميني ساري من الالتماسات والحرائق؟',
        'هل تركيب ساري يحتاج تكسير بالجدران؟',
        'كيف أضبط وتيرة استهلاك المنزل الذكية؟',
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'ai') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Handle Eco Mode toggle
  const toggleEcoMode = () => {
    const nextState = !ecoModeEnabled;
    setEcoModeEnabled(nextState);

    if (nextState) {
      // Reduce heater & standby waste
      setDevices(prev =>
        prev.map(d => {
          if (d.category === 'water') {
            return { ...d, dailyHours: 4, monthlyCostSAR: 38.8, status: 'optimal' };
          }
          if (d.category === 'other') {
            return { ...d, dailyHours: 6, monthlyCostSAR: 9.3, status: 'optimal' };
          }
          return d;
        })
      );
      // Cool down water heater breaker
      setBreakers(prev =>
        prev.map(b => (b.id === 'b-water' ? { ...b, temperatureC: 39.2, status: 'safe' } : b))
      );
    } else {
      setDevices(INITIAL_DEVICES);
      setBreakers(INITIAL_BREAKERS);
    }
  };

  // Toggle Travel & Night Guard
  const toggleTravelGuard = () => {
    const nextState = !travelGuardActive;
    setTravelGuardActive(nextState);
    if (nextState) {
      // Alert user
      const newAlert: ProtectionAlert = {
        id: 'alt-' + Date.now(),
        type: 'standby_waste',
        title: 'تم تفعيل درع حراسة السفر والنوم',
        description: 'تم خفض الحساسية الترددية لمراقبة أي تسريب أو شرارة في الجدران، وتأمين الأجهزة الثانوية.',
        severity: 'info',
        timestamp: 'الآن',
        resolved: true,
        actionTaken: 'الشبكة تحت المراقبة المشددة.',
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  // Resolve an alert
  const resolveAlert = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, resolved: true, actionTaken: 'تم التحقق وتأكيد سلامة القاطع.' } : a))
    );
  };

  // Calculate totals
  const totalMonthlyCostSAR = Math.round(devices.reduce((acc, d) => acc + d.monthlyCostSAR, 0));
  const totalPowerWatts = devices.reduce((acc, d) => acc + d.powerWatts, 0);

  // Send message to Sari AI
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: 'الآن',
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsAiLoading(true);

    try {
      const historyPayload = chatMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/sari-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: historyPayload }),
      });

      const data = await res.json();
      const reply = data.reply || 'أهلاً بك! في ساري، نسهر على حماية شبكتك الكهربائية وترشيد كل ريال في فاتورتك.';

      const assistantMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: 'الآن',
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: 'bot-err-' + Date.now(),
        sender: 'assistant',
        text: 'يسعدني إخبارك بأن نظام ساري يدمج الحماية الاستباقية لكشف الالتماسات ودرجات حرارة القواطع وترشيد الفاتورة بنسبة تصل إلى 40% مع إمكانية التركيب بدون تكسير في 30 دقيقة.',
        timestamp: 'الآن',
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="simulator" className="py-20 bg-gradient-to-b from-[#070D14] via-[#09131F] to-[#070D14] relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>تجربة تفاعلية حية ومباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            عِش تجربة نظام <span className="bg-gradient-to-l from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">ساري</span> الآن
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            شاهد كيف يحرس ساري لوحة قواطع منزلك ويحوّل الواط المجرد إلى ريالات مفهومة، واختبر استجابة مستشار الأمان الذكي.
          </p>

          {/* Navigation Bar inside Simulator */}
          <div className="inline-flex p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-xl max-w-md w-full mt-4">
            <button
              onClick={() => setActiveTab('protection')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'protection'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>الحماية والأمان</span>
            </button>
            <button
              onClick={() => setActiveTab('consumption')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'consumption'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>الاستهلاك والريال</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>مستشار ساري AI</span>
            </button>
          </div>
        </div>

        {/* Dashboard Shell Container */}
        <div className="rounded-3xl bg-[#0A1422] border border-slate-700/80 shadow-2xl overflow-hidden">
          
          {/* Top Frame Status Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-200 font-['Plus_Jakarta_Sans']">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SARI LIVE CORE: PANEL-01 (RIYADH)</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-slate-400">
                التردد: <span className="text-slate-200 font-semibold font-['Plus_Jakarta_Sans']">60.02 Hz</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-slate-400">
                الجهد المتوسط: <span className="text-emerald-400 font-semibold font-['Plus_Jakarta_Sans']">224.3 V</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">التحديث: لحظي ومباشر</span>
              <button
                onClick={() => {
                  setDevices(INITIAL_DEVICES);
                  setBreakers(INITIAL_BREAKERS);
                  setEcoModeEnabled(false);
                  setTravelGuardActive(false);
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="إعادة ضبط المحاكي"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            </div>
          </div>

          {/* MAIN SIMULATOR CONTENT */}
          <div className="p-6 lg:p-8">
            
            {/* VIEW 1: ELECTRICAL PROTECTION & SAFETY SHIELD */}
            {activeTab === 'protection' && (
              <div className="space-y-8 text-right">
                
                {/* Hero Alert & Stats Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Safety Index Card */}
                  <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-300">مؤشر الحماية الكهربائية</span>
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-emerald-400 mt-2 font-['Plus_Jakarta_Sans']">
                      100% SAFE
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      لا يوجد أي التماس أو تسريب أرضي أو حرارة خطيرة باللوحة
                    </p>
                  </div>

                  {/* Arc-Fault Detection Engine */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">فاحص الالتماس الميكروي (Arc Faults)</span>
                      <Radio className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-black text-cyan-400 mt-2 font-['Plus_Jakarta_Sans']">
                      0.012% <span className="text-xs text-emerald-400 font-sans font-normal">طبيعي تماماً</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      تم فحص 4.2 مليون ذبذبة تيار في الثانية، لا توجد شرارة خفية في الجدران
                    </p>
                  </div>

                  {/* Night & Vacation Guard Action Control */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    travelGuardActive 
                      ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/10' 
                      : 'bg-slate-900/80 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">وضع حراسة السفر والنوم</span>
                      <Moon className={`w-5 h-5 ${travelGuardActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {travelGuardActive ? 'الحراسة القصوى مفعلة الآن' : 'غير مفعّل (حالة عادية)'}
                      </span>
                      <button
                        onClick={toggleTravelGuard}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          travelGuardActive
                            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {travelGuardActive ? 'إيقاف الحراسة' : 'تفعيل الدرع الآن'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Circuit Breakers Heat & Load Diagnostic */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-emerald-400" />
                        <span>مراقبة حرارة وأحمال القواطع الفرعية (Circuit Breakers Diagnostics)</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        حساسات ساري الحرارية ترصد أي سخونة غير معتادة بالقاطع قبل انصهاره
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                      5 قواطع نشطة
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {breakers.map(b => {
                      const loadPercent = Math.round((b.currentAmps / b.maxAmps) * 100);
                      const isHot = b.temperatureC > 50;

                      return (
                        <div
                          key={b.id}
                          className={`p-4 rounded-xl border transition-all ${
                            b.status === 'warning'
                              ? 'bg-amber-950/20 border-amber-500/40'
                              : 'bg-slate-900/80 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-bold text-slate-100 text-sm">{b.label}</div>
                              <div className="text-[11px] text-slate-400">{b.zone}</div>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                b.status === 'warning'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {b.status === 'warning' ? 'تنبيه حراري' : 'آمن ومستقر'}
                            </span>
                          </div>

                          {/* Metrics row */}
                          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                            <div className="p-2 rounded-lg bg-slate-950/60">
                              <div className="text-[10px] text-slate-400">الحمل</div>
                              <div className="text-xs font-bold text-slate-200 mt-0.5 font-['Plus_Jakarta_Sans']">
                                {b.currentAmps} / {b.maxAmps}A
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-950/60">
                              <div className="text-[10px] text-slate-400">الحرارة</div>
                              <div
                                className={`text-xs font-bold mt-0.5 font-['Plus_Jakarta_Sans'] ${
                                  isHot ? 'text-amber-400' : 'text-emerald-400'
                                }`}
                              >
                                {b.temperatureC}°C
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-950/60">
                              <div className="text-[10px] text-slate-400">الفولت</div>
                              <div className="text-xs font-bold text-cyan-300 mt-0.5 font-['Plus_Jakarta_Sans']">
                                {b.voltage}V
                              </div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>نسبة التحميل: {loadPercent}%</span>
                              <span>الحد الأقصى: {b.maxAmps}A</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  loadPercent > 70
                                    ? 'bg-amber-400'
                                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                                }`}
                                style={{ width: `${loadPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Safety Alerts Log */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>سجل الحماية الذكية وتنبيهات الطوارئ</span>
                  </h4>

                  <div className="space-y-2.5">
                    {alerts.map(a => (
                      <div
                        key={a.id}
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                          a.resolved
                            ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                            : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{a.title}</span>
                            <span className="text-[10px] text-slate-400">({a.timestamp})</span>
                          </div>
                          <p className="text-slate-300">{a.description}</p>
                          <div className="text-[11px] text-emerald-400 font-medium">
                            الإجراء المقترح: {a.actionTaken}
                          </div>
                        </div>

                        <div>
                          {a.resolved ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                              <Check className="w-3.5 h-3.5" />
                              تمت المعالجة
                            </span>
                          ) : (
                            <button
                              onClick={() => resolveAlert(a.id)}
                              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shrink-0"
                            >
                              معالجة وتأكيد الأمان
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: SMART CONSUMPTION & APPLIANCE BREAKDOWN IN SAR */}
            {activeTab === 'consumption' && (
              <div className="space-y-8 text-right">
                
                {/* Cost Header Highlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Monthly Forecast in SAR */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/40">
                    <div className="text-xs text-cyan-300 font-semibold">توقع فاتورة هذا الشهر (بالريال السعودي)</div>
                    <div className="text-3xl font-black text-cyan-300 mt-2 font-['Plus_Jakarta_Sans'] flex items-baseline gap-2">
                      <span>{totalMonthlyCostSAR}</span>
                      <span className="text-sm font-sans text-slate-300">ر.س / شهر</span>
                    </div>
                    <div className="text-xs text-emerald-400 font-medium mt-1">
                      {ecoModeEnabled ? '🔥 وفرت 125 ر.س عبر الوضع الاقتصادي!' : 'معدل الاستهلاك الشهري مستقر ومثالي'}
                    </div>
                  </div>

                  {/* Realtime Power Draw */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xs text-slate-400 font-semibold">القدرة الكهربائية اللحظية (Watts)</div>
                    <div className="text-3xl font-black text-slate-100 mt-2 font-['Plus_Jakarta_Sans'] flex items-baseline gap-2">
                      <span>{(totalPowerWatts / 1000).toFixed(2)}</span>
                      <span className="text-sm font-sans text-slate-400">كيلوواط</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      تكلفة الساعة الحالية: ≈ {( (totalPowerWatts / 1000) * 0.18 ).toFixed(2)} ر.س/ساعة
                    </div>
                  </div>

                  {/* Eco Mode Automation Switch */}
                  <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    ecoModeEnabled ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-slate-900/80 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">وضع التوفير التلقائي (Eco-Pilot)</span>
                      <Sliders className={`w-5 h-5 ${ecoModeEnabled ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate-400">
                        {ecoModeEnabled ? 'تم خفض هدر السخان والأجهزة' : 'جرّب التوفير الفوري بضغطة زر'}
                      </span>
                      <button
                        onClick={toggleEcoMode}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          ecoModeEnabled
                            ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {ecoModeEnabled ? 'الوضع مفعل ✓' : 'تفعيل التوفير'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Energy Efficiency Progress Gauge */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">
                      مؤشر كفاءة الاستهلاك الشهري الذكي:
                    </span>
                    <span className="font-bold text-emerald-400">ضمن النطاق الاقتصادي الموفر</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 flex">
                    <div className="w-5/12 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>استهلاكك المتوقع: 2,420 ك.و.س (وفرت أماناً من الهدر الكهربائي)</span>
                    <span className="text-emerald-400 font-semibold">معدل التوفير الشهري: 38%</span>
                  </div>
                </div>

                {/* Appliances Breakdown List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <span>تفكيك استهلاك الأجهزة بالريال والواط (Appliance NILM Intelligence)</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        يتعرف ساري على كل جهاز في بيتك بناءً على بصمة التردد الكهربائي
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {devices.map(device => (
                      <div
                        key={device.id}
                        className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{device.name}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                device.status === 'warning'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {device.status === 'warning' ? 'هدر كهربائي مرصود' : 'استهلاك مثالي'}
                            </span>
                          </div>
                          
                          {/* Progress bar per device */}
                          <div className="flex items-center gap-3">
                            <div className="w-44 h-1.5 bg-slate-950 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-400 rounded-full"
                                style={{ width: `${device.percentage * 2}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">
                              يمثل {device.percentage}% من الفاتورة • {device.dailyHours} ساعات يومياً
                            </span>
                          </div>
                        </div>

                        {/* Power & Cost Badge */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-left">
                            <div className="text-xs text-slate-400">التكلفة الشهرية</div>
                            <div className="text-base font-black text-cyan-300 font-['Plus_Jakarta_Sans']">
                              {device.monthlyCostSAR.toFixed(1)} <span className="text-xs font-sans">ر.س</span>
                            </div>
                          </div>
                          <div className="text-left border-r border-slate-800 pr-4">
                            <div className="text-xs text-slate-400">القدرة</div>
                            <div className="text-sm font-bold text-slate-200 font-['Plus_Jakarta_Sans']">
                              {device.powerWatts} W
                            </div>
                          </div>
                          <div className="text-left border-r border-slate-800 pr-4">
                            <div className="text-xs text-slate-400">صحة الجهاز</div>
                            <div className="text-sm font-bold text-emerald-400 font-['Plus_Jakarta_Sans']">
                              {device.healthScore}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: SARI AI SMART ELECTRICAL CONSULTANT */}
            {activeTab === 'ai' && (
              <div className="space-y-6 text-right">
                
                {/* AI Assistant Intro */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shrink-0 mt-0.5">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>مستشار ساري الذكي (Sari AI Electrical & Safety Engineer)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                        مدعوم بالذكاء الاصطناعي والكود السعودي
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      اسأل عن كل ما يخص حماية لوحة منزلك من الالتماسات، كيفية خفض فاتورة التكييف، فحص كفاءة الأجهزة، أو استفسارات تركيب جهاز ساري.
                    </p>
                  </div>
                </div>

                {/* Interactive Chat Box */}
                <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-4 max-h-[420px] overflow-y-auto">
                  {chatMessages.map(m => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                        {m.sender === 'user' ? (
                          <span>أنت</span>
                        ) : (
                          <span className="text-amber-400 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> مستشار ساري
                          </span>
                        )}
                        <span>• {m.timestamp}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed whitespace-pre-line ${
                          m.sender === 'user'
                            ? 'bg-slate-800 text-slate-100 rounded-tr-none'
                            : 'bg-[#0E1A29] text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md'
                        }`}
                      >
                        {m.text}
                      </div>

                      {/* Suggestions pill */}
                      {m.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3 justify-end max-w-xl">
                          {m.suggestions.map((s, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(s)}
                              className="text-xs py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:border-emerald-500/40 hover:text-emerald-300 transition-all cursor-pointer text-right"
                            >
                              💬 {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex items-center gap-2 text-xs text-amber-300 p-3 bg-slate-900/60 rounded-xl border border-slate-800 w-fit">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      <span>ساري يحلل شبكة الكهرباء ويصيغ الإجابة الهندسية...</span>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={e => setInputQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder="اكتب سؤالك هنا (مثال: كيف أحمي بيتي من التماس الكهرباء بالمكيفات؟)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isAiLoading || !inputQuery.trim()}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-md disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <span>إرسال</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Card CTA */}
          <div className="bg-slate-900/90 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 text-right">
              <strong className="text-white font-bold">جاهز لحماية منزلك وترشيد فاتورتك؟</strong>
              <span className="text-slate-400 block sm:inline sm:mr-2">
                ساري يُركّب في 30 دقيقة بدون أي تكسير، مع ضمان استبدال شامل ومعتمد.
              </span>
            </div>
            <button
              onClick={onOpenOrder}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md transition-all cursor-pointer shrink-0"
            >
              احجز جهازك مع التركيب المجاني
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
