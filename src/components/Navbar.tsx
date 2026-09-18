import React, { useState } from 'react';
import { Shield, Zap, Menu, X, PhoneCall, ArrowLeft, ChevronDown, Sparkles } from 'lucide-react';
import { SariLogo } from './SariLogo';

interface NavbarProps {
  onOpenOrder: (planId?: string) => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070D14]/90 border-b border-slate-800/80 transition-all">
      {/* Top micro-announcement banner displaying the official brand name */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-[#0A1828] to-cyan-950/90 text-emerald-300 text-xs py-1.5 px-4 text-center border-b border-emerald-500/20 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          سـاري | SARI
        </span>
        <span className="font-medium text-slate-200">
نظام ساري الذكي: احمِ مبناك وخفّض فاتورتك حتى 40% مع تركيب مجاني في 30 دقيقة
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="sari-brand-logo"
          >
            {/* Official Sari Logo in High-Fidelity Capsule */}
            <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-md border border-slate-200/80 group-hover:scale-105 transition-all flex items-center">
              <SariLogo size="sm" variant="original" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-['Tajawal']">سـاري</span>
                <span className="text-xs font-black text-cyan-400 tracking-wider uppercase font-['Plus_Jakarta_Sans']">SARI</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">  حماية استباقية •طاقة ذكية</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button 
              onClick={() => handleNavClick('protection')} 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              الحماية والأمان
            </button>
            <button 
              onClick={() => handleNavClick('consumption')} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              ترشيد الاستهلاك
            </button>
            <button 
              onClick={() => handleNavClick('simulator')} 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/60 text-emerald-300"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              المحاكي التفاعلي
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')} 
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              كيف يعمل
            </button>
            <button 
              onClick={() => handleNavClick('calculator')} 
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              حاسبة التوفير
            </button>
            <button 
              onClick={() => handleNavClick('pricing')} 
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              الباقات
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              الأسئلة الشائعة
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('simulator')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              تجربة النظام
            </button>
            <button
              id="nav-order-btn"
              onClick={() => onOpenOrder()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>اطلب جهاز ساري</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenOrder()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400"
            >
              اطلب ساري
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A121C] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('protection')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>الحماية والأمان الكهربائي</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => handleNavClick('consumption')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>ترشيد الاستهلاك بالريال</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => handleNavClick('simulator')}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-right font-semibold"
            >
              <span>المحاكي التفاعلي ومستشار AI</span>
              <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full">حي ومباشر</span>
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>كيف يعمل ساري</span>
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>حاسبة التوفير المتوقع</span>
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>الباقات والأسعار</span>
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/60 text-right"
            >
              <span>الأسئلة الشائعة</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-md flex items-center justify-center gap-2"
            >
              <span>اطلب جهاز ساري وتحديد موعد التركيب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
