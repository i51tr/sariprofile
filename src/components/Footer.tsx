import React from 'react';
import { Shield, Zap, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { SariLogo } from './SariLogo';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenOrder }) => {
  return (
    <footer className="bg-[#050A10] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-right text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 px-3 py-1 rounded-xl shadow-md">
                <SariLogo size="sm" variant="original" />
              </div>
              <div>
                <span className="text-xl font-black text-white">سـاري | SARI</span>
                <div className="text-[10px] text-slate-400">إدارة وحماية الطاقة الذكية</div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              المنظومة السعودية الرائدة التي تجمع بين الحماية الكهربائية الاستباقية لمنزلك من الالتماسات والحرائق، وبين الترشيد الذكي للاستهلاك وخفض الفاتورة حتى 40% بالريال السعودي.
            </p>

            <div className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>متاح للتركيب الفوري في كافة مدن ومناطق المملكة</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-bold text-white text-sm">روابط سريعة</div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('protection')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  منظومة الحماية والأمان
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('consumption')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  ترشيد الاستهلاك بالريال
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('simulator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  المحاكي التفاعلي ومستشار AI
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('pricing')} className="hover:text-slate-100 transition-colors cursor-pointer">
                  الباقات والأسعار
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Certifications */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-white text-sm">الاعتمادات والمطابقة</div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>مدعوم من شركة الطاقة السعودية</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>هيئة الاتصالات والفضاء والتقنية CST</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>ضمان ذهبي شامل واستبدال فوري</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Order */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-white text-sm">تواصل معنا</div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الرياض، طريق الملك فهد - المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-['Plus_Jakarta_Sans']">support@sari.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-['Plus_Jakarta_Sans']" dir="ltr">+966 11 820 4400</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenOrder}
                className="w-full py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 transition-all cursor-pointer"
              >
                اطلب جهاز ساري الآن
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} مشروع سـاري | SARI - إدارة وحماية الطاقة الذكية.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>صُمم وطُوّر بأعلى المعايير الهندسية في المملكة العربية السعودية 🇸🇦</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
