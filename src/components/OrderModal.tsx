import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowLeft, Phone, MapPin, Building, Calendar, Sparkles } from 'lucide-react';
import { PRICING_PLANS, SAUDI_CITIES } from '../data/sariContent';
import { OrderFormData } from '../types';
import { SariLogo } from './SariLogo';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, initialPlanId = 'pro' }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    city: 'الرياض',
    district: '',
    propertyType: 'فيلا مستقلة',
    planId: initialPlanId,
    preferredDate: 'خلال هذا الأسبوع',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const generatedRef = 'SARI-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(generatedRef);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0B1522] border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/95 px-3 py-1 rounded-xl shadow-sm border border-slate-200">
                  <SariLogo size="sm" variant="original" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>حجز جهاز ساري مع التركيب المجاني</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white">
                طلب نظام ساري لإدارة وحماية الطاقة الذكية
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                املأ بياناتك أدناه وسيتواصل معك مهندس ساري خلال 24 ساعة لتأكيد موعد الزيارة والتركيب.
              </p>
            </div>

            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">اختر الباقة المطلوبة:</label>
              <div className="grid grid-cols-3 gap-2">
                {PRICING_PLANS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlanId(p.id);
                      setFormData(prev => ({ ...prev, planId: p.id }));
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedPlanId === p.id
                        ? 'bg-emerald-950/50 border-emerald-400 text-emerald-300 shadow'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{p.name.split(' ')[0]}</div>
                    <div className="text-sm font-black text-emerald-400 mt-0.5 font-['Plus_Jakarta_Sans']">
                      {p.priceSAR.toLocaleString('ar-SA')} ر.س
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: خالد محمد الشمري"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">رقم الجوال السعودي *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-['Plus_Jakarta_Sans'] text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">المدينة *</label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    {SAUDI_CITIES.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">الحي / المنطقة</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    placeholder="مثال: حي الملقا، النرجس، الشاطئ..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">نوع العقار</label>
                  <select
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="شقة سكنية">شقة سكنية</option>
                    <option value="دور مستقل">دور مستقل</option>
                    <option value="فيلا مستقلة">فيلا مستقلة</option>
                    <option value="قصر أو مبنى كبير">قصر أو مبنى كبير</option>
                    <option value="مقر تجاري / مطعم">مقر تجاري / مطعم</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">الموعد المفضل للتركيب</label>
                  <select
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="خلال هذا الأسبوع">خلال هذا الأسبوع</option>
                    <option value="نهاية الأسبوع">نهاية الأسبوع (الجمعة/السبت)</option>
                    <option value="الأسبوع القادم">الأسبوع القادم</option>
                    <option value="في أقرب وقت متاح">في أقرب وقت متاح</option>
                  </select>
                </div>
              </div>

              {/* Summary Pill */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span>إجمالي القيمة: </span>
                  <strong className="text-emerald-400 text-sm font-['Plus_Jakarta_Sans']">
                    {currentPlan.priceSAR.toLocaleString('ar-SA')} ر.س
                  </strong>
                  <span className="text-slate-400 mr-2">(شامل التركيب المجاني والضمان الذهبي المعتمد)</span>
                </div>
                <span className="text-emerald-400 font-bold">الدفع عند التركيب</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>تأكيد الطلب وحجز موعد التركيب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400">تم استلام طلبك بنجاح!</span>
              <h3 className="text-2xl font-black text-white">
                أهلاً بك في عائلة سـاري الذكية
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                شكراً لك يا <strong>{formData.fullName}</strong>. تم تسجيل طلبك للباقة{' '}
                <span className="text-emerald-400 font-semibold">{currentPlan.name}</span> في مدينة{' '}
                <strong>{formData.city}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">رقم الطلب المرجعي:</span>
                <span className="font-bold text-cyan-300 font-['Plus_Jakarta_Sans']">{orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">حالة الطلب:</span>
                <span className="font-bold text-emerald-400">قيد جدولة المهندس المعتمد</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">موعد التواصل:</span>
                <span className="text-slate-200">خلال أقل من 24 ساعة</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer"
              >
                العودة للموقع
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
