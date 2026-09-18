import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppSimulator } from './components/AppSimulator';
import { ProtectionSection } from './components/ProtectionSection';
import { ConsumptionSection } from './components/ConsumptionSection';
import { HowItWorks } from './components/HowItWorks';
import { SavingsCalculator } from './components/SavingsCalculator';
import { SariPulseShowcase } from './components/SariPulseShowcase';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { MessageSquare, ShieldCheck, ArrowUp } from 'lucide-react';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderPlanId, setOrderPlanId] = useState<string>('pro');

  const handleOpenOrder = (planId: string = 'pro') => {
    setOrderPlanId(planId);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070D14] text-slate-100 font-['Tajawal',sans-serif] selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation Bar */}
      <Navbar
        onOpenOrder={() => handleOpenOrder('pro')}
        onScrollTo={scrollToSection}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenOrder={() => handleOpenOrder('pro')}
          onExploreSimulator={() => scrollToSection('simulator')}
          onScrollTo={scrollToSection}
        />

        {/* Live Interactive Simulator & AI Consultant */}
        <AppSimulator
          onOpenOrder={() => handleOpenOrder('pro')}
        />

        {/* Superior Protection Pillar */}
        <ProtectionSection
          onOpenOrder={() => handleOpenOrder('pro')}
        />

        {/* Smart Consumption & Bill Optimization Pillar */}
        <ConsumptionSection
          onOpenOrder={() => handleOpenOrder('pro')}
          onScrollTo={scrollToSection}
        />

        {/* How It Works (3 Steps) */}
        <HowItWorks
          onOpenOrder={() => handleOpenOrder('pro')}
        />

        {/* Interactive Savings & Risk Calculator */}
        <SavingsCalculator
          onOpenOrder={handleOpenOrder}
        />

        {/* Animated Sari Exclusive Engineering & Core Pulse Showcase */}
        <SariPulseShowcase
          onOpenOrder={() => handleOpenOrder('pro')}
        />

        {/* Packages & Transparent Saudi Pricing */}
        <PricingSection
          onSelectPlan={handleOpenOrder}
        />

        {/* Comprehensive FAQ */}
        <FaqSection
          onOpenConsultant={() => scrollToSection('simulator')}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenOrder={() => handleOpenOrder('pro')}
      />

      {/* Floating Quick CTA Bar for mobile and desktop */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => scrollToSection('simulator')}
          className="p-3.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/40 shadow-xl hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold backdrop-blur-md"
          title="افتح مستشار ساري الذكي"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline">استشر مهندس ساري AI</span>
        </button>

        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-full bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700 shadow-xl hover:bg-slate-800 transition-all cursor-pointer backdrop-blur-md"
          title="الصعود للأعلى"
          aria-label="الصعود للأعلى"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Order Booking Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialPlanId={orderPlanId}
      />
    </div>
  );
}
