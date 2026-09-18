import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/sariContent';

interface FaqSectionProps {
  onOpenConsultant: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultant }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#070D14] border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>الشفافية الهندسية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            الأسئلة الأكثر شيوعاً عن نظام <span className="bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">ساري</span>
          </h2>

          <p className="text-slate-300 text-base">
            إجابات واضحة ومباشرة لكل ما يدور في ذهنك حول الأمان، التركيب، والتوفير المالي.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0A1422] border border-slate-800 overflow-hidden transition-all text-right"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 flex items-center justify-between gap-4 text-right cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-400 bg-emerald-500/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 bg-slate-900/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-gradient-to-l from-[#0E1B2B] to-[#08121D] border border-slate-700/80 space-y-3">
          <div className="text-sm font-bold text-white">هل لديك استفسار كهربائي خاص بمنزلك؟</div>
          <p className="text-xs text-slate-300">
            يمكنك التحدث مباشرة مع «مستشار ساري الذكي» أو حجز استشارة مجانية مع مهندسينا.
          </p>
          <button
            onClick={onOpenConsultant}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تحدث مع مستشار ساري الذكي الآن</span>
          </button>
        </div>

      </div>
    </section>
  );
};
