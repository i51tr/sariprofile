import React from 'react';

interface SariLogoProps {
  className?: string;
  variant?: 'original' | 'white' | 'cyan' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const SariLogo: React.FC<SariLogoProps> = ({
  className = '',
  variant = 'original',
  size = 'md',
  showSubtitle = false,
}) => {
  // Height sizing
  const heightClasses = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  }[size];

  // If badge variant, wrap the authentic logo in clean white capsule
  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-2 bg-white/95 px-3.5 py-1.5 rounded-2xl shadow-md border border-slate-200/80 backdrop-blur-sm">
        <img
          src="/sari-logo.svg"
          alt="ساري - SARI"
          className={`${heightClasses} w-auto object-contain ${className}`}
          referrerPolicy="no-referrer"
        />
        {showSubtitle && (
          <span className="text-[11px] font-bold text-slate-700 font-['Tajawal'] border-r border-slate-300 pr-2 mr-1">
            النظام السعودي الذكي
          </span>
        )}
      </div>
    );
  }

  // If original variant, serve the exact image file directly without changing the shape
  if (variant === 'original') {
    return (
      <img
        src="/sari-logo.svg"
        alt="ساري - SARI"
        className={`${heightClasses} w-auto object-contain transition-transform ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // White and Cyan vector variants for dark backgrounds
  const isWhite = variant === 'white';
  const mainColor = isWhite ? '#FFFFFF' : '#38BDF8';
  const prongColor = isWhite ? '#CBD5E1' : '#97B3CD';
  const yellowColor = '#F6BC36';

  return (
    <svg
      viewBox="0 0 600 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${heightClasses} w-auto transition-transform ${className}`}
      aria-label="ساري - SARI"
    >
      {/* Prongs on Top of the Plug */}
      <rect x="100" y="32" width="16" height="46" rx="8" fill={prongColor}/>
      <rect x="138" y="32" width="16" height="46" rx="8" fill={prongColor}/>

      {/* Plug Collar (Shoulder) */}
      <rect x="76" y="74" width="102" height="18" rx="4" fill={mainColor}/>

      {/* Plug Body */}
      <path d="M85 92 H169 V122 C169 152, 85 152, 85 122 Z" fill={mainColor}/>

      {/* Plug Neck (Cable exit base) */}
      <rect x="119" y="152" width="16" height="12" rx="3" fill={mainColor}/>

      {/* Golden Lightning Bolt Inside Plug */}
      <path d="M129 101 L116 122 H126 L121 142 L137 118 H127 L132 101 Z" fill={yellowColor}/>

      {/* Smooth Cable Arc connecting Plug to Wordmark */}
      <path d="M127 164 C127 194, 155 200, 180 184 C195 174, 204 162, 222 152" stroke={mainColor} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>

      {/* SARI Arabic Wordmark */}
      <g fill={mainColor}>
        {/* Letter Yaa (ي) connecting seamlessly to the cable on left */}
        <path d="M214 146 C214 130, 226 120, 242 120 H284 V160 H238 C222 160, 214 154, 214 146 Z"/>
        <rect x="264" y="112" width="20" height="48" rx="1"/>

        {/* Letter Raa (ر) with downward descending stroke */}
        <path d="M296 112 H318 V160 H344 V184 H304 C296 184, 296 160, 296 160 V112 Z"/>

        {/* Letter Alif (ا) - Tall vertical pillar */}
        <rect x="356" y="80" width="24" height="92" rx="2"/>

        {/* Letter Seen (س) - 3 distinct vertical teeth on baseline, right edge descending */}
        <rect x="394" y="112" width="22" height="48" rx="1.5"/>
        <rect x="428" y="112" width="22" height="48" rx="1.5"/>
        <rect x="462" y="112" width="24" height="48" rx="1.5"/>
        <rect x="394" y="136" width="92" height="24"/>
        <rect x="466" y="152" width="20" height="24" rx="1"/>
      </g>

      {/* Two Golden Diamonds Under Letter Yaa (Dots of Yaa) */}
      <g fill={yellowColor}>
        <rect x="226" y="180" width="16" height="16" rx="2" transform="rotate(45 226 180)"/>
        <rect x="246" y="180" width="16" height="16" rx="2" transform="rotate(45 246 180)"/>
      </g>
    </svg>
  );
};
