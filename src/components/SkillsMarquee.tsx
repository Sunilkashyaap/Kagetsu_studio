import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const companies = [
  {
    name: "MICROSOFT",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="8" height="8" />
        <rect x="13" y="3" width="8" height="8" />
        <rect x="3" y="13" width="8" height="8" />
        <rect x="13" y="13" width="8" height="8" />
      </svg>
    )
  },
  {
    name: "CHRONICLE STUDIOS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <path d="M18 10L22 8V16L18 14" />
      </svg>
    )
  },
  {
    name: "AMAZON",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14C6.5 17 11.5 18 16 15" />
        <path d="M14 17L17 14.5L14 12" />
      </svg>
    )
  },
  {
    name: "REDBUS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="11" rx="2" />
        <path d="M3 10V14" />
        <path d="M21 10V14" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M6 6V10M12 6V10M18 6V10" />
      </svg>
    )
  },
  {
    name: "SKYBAGS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="14" height="12" rx="2" />
        <path d="M9 8V5A2 2 0 0115 5V8" />
        <path d="M12 8V20" />
      </svg>
    )
  },
  {
    name: "ZEBRONICS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6H20L4 18H20" />
      </svg>
    )
  }
];

export default function SkillsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, []);

  // Quadruple the items to ensure smooth infinite scrolling for wide screens
  const marqueeItems = [...companies, ...companies, ...companies, ...companies];

  return (
    <div className="relative z-20 w-full bg-[#EAE8E3] border-y border-ink/10 py-2.5 overflow-hidden flex items-center">
      <div 
        ref={marqueeRef}
        className="flex whitespace-nowrap items-center w-max"
      >
        {marqueeItems.map((company, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 px-8 text-ink"
          >
            {/* Diamond Separator */}
            <div className="w-1.5 h-1.5 bg-ink/30 rotate-45 mr-8" />
            
            <div className="w-5 h-5 flex items-center justify-center scale-90">
              {company.icon}
            </div>
            <span className="font-heading text-base md:text-lg tracking-[0.15em] uppercase mt-0.5">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
