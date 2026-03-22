import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const row1Items = [
  { text: 'BRAND IDENTITY', title: "BRAND IDENTITY" },
  { text: 'POSTER DESIGN', title: "POSTER DESIGN" },
  { text: 'VIDEO EDITING', title: "VIDEO EDITING" },
  { text: 'COLOR GRADING', title: "COLOR GRADING" }
];

const row2Logos = [
  {
    name: 'PHOTOSHOP',
    title: "PHOTOSHOP",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <rect x="2" y="2" width="32" height="32" rx="6" fill="#1a1a1a" />
        <text x="18" y="25" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16" fill="#F0EDE6">Ps</text>
      </svg>
    )
  },
  {
    name: 'PREMIERE PRO',
    title: "PREMIERE PRO",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <rect x="2" y="2" width="32" height="32" rx="6" fill="#1a1a1a" />
        <text x="18" y="25" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16" fill="#F0EDE6">Pr</text>
      </svg>
    )
  },
  {
    name: 'AFTER EFFECTS',
    title: "AFTER EFFECTS",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <rect x="2" y="2" width="32" height="32" rx="6" fill="#1a1a1a" />
        <text x="18" y="25" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16" fill="#F0EDE6">Ae</text>
      </svg>
    )
  },
  {
    name: 'ILLUSTRATOR',
    title: "ILLUSTRATOR",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <rect x="2" y="2" width="32" height="32" rx="6" fill="#1a1a1a" />
        <text x="18" y="25" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16" fill="#F0EDE6">Ai</text>
      </svg>
    )
  },
  {
    name: 'DAVINCI RESOLVE',
    title: "DAVINCI RESOLVE",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
        <circle cx="18" cy="18" r="8" fill="#1a1a1a" />
      </svg>
    )
  },
  {
    name: 'BLENDER',
    title: "BLENDER",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <ellipse cx="18" cy="20" rx="14" ry="12" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
        <line x1="18" y1="4" x2="18" y2="12" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="20" r="4" fill="#1a1a1a" />
      </svg>
    )
  },
  {
    name: 'FIGMA',
    title: "FIGMA",
    svg: (
      <svg viewBox="0 0 28 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <rect x="0" y="0" width="14" height="14" rx="7" fill="#1a1a1a" />
        <rect x="14" y="0" width="14" height="14" rx="7" fill="#1a1a1a" />
        <rect x="0" y="14" width="14" height="14" rx="7" fill="#1a1a1a" />
        <circle cx="21" cy="21" r="7" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="0" y="28" width="14" height="8" rx="4" fill="#1a1a1a" />
      </svg>
    )
  },
  {
    name: 'CANVA',
    title: "CANVA",
    svg: (
      <svg viewBox="0 0 36 36" className="h-[20px] w-auto fill-[#1a1a1a] block">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
        <text x="18" y="24" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="18" fill="#1a1a1a">C</text>
      </svg>
    )
  }
];

export default function Services() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    gsap.to(row1Ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 22,
      ease: 'none',
    });

    gsap.set(row2Ref.current, { xPercent: -50 });
    gsap.to(row2Ref.current, {
      xPercent: 0,
      repeat: -1,
      duration: 30,
      ease: 'none',
    });
  }, []);

  return (
    <section id="services" className="w-full bg-cream pt-0 mt-0 pb-0 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end pb-10 relative pt-[80px] overflow-hidden">
        
        {/* Script overlay — absolute, out of flow */}
        <div className="absolute bottom-[-10px] left-[30%] -rotate-[6deg] font-script text-[12vw] text-[#C8F135] opacity-[0.18] pointer-events-none whitespace-nowrap z-0 leading-none">
          Kagetsu
        </div>

        {/* Left: Title */}
        <div className="relative z-[2]">
          <h2 className="font-heading text-8xl md:text-[10rem] leading-[0.8] tracking-tighter text-ink">
            SERVICES
          </h2>
          <p className="font-display italic text-4xl md:text-6xl text-ink/70 mt-4">
            & Expertise
          </p>
        </div>

        {/* Right: Description */}
        <div className="max-w-[480px] relative z-[2]">
          <p className="font-body text-[16px] text-[#1a1a1a] leading-[1.7]">
            We don't just make things look good. We build visual systems that demand attention. From cinematic edits that stop the scroll to brand identities that define a legacy, every pixel is crafted with obsession.
          </p>
        </div>
      </div>

      {/* Two-Row Opposing Marquee */}
      <div className="w-full py-[40px]">
        <div className="w-full flex flex-col shadow-[0_4px_40px_rgba(0,0,0,0.08)]">
          {/* Row 1 - Scrolls Left */}
          <div className="w-full overflow-hidden bg-[#1C2318] py-[18px] flex">
            <div ref={row1Ref} className="flex whitespace-nowrap items-center">
              {[...row1Items, ...row1Items, ...row1Items, ...row1Items].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-heading text-[28px] text-[#F0EDE6] tracking-[0.05em] leading-none">
                    {item.title || item.text}
                  </span>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#C8F135] mx-[28px]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="w-full overflow-hidden bg-[#F0EDE6] py-[14px] border-y-[1.5px] border-[#1a1a1a] flex">
            <div ref={row2Ref} className="inline-flex items-center w-max gap-0">
              {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((item, i) => (
                <div key={i} className="inline-flex items-center shrink-0">
                  <div className="inline-flex items-center gap-[10px] shrink-0 whitespace-nowrap">
                    {item.svg}
                    <span className="font-heading text-[15px] text-[#1a1a1a] tracking-[0.08em] leading-none mt-1">
                      {item.title || item.text}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#1a1a1a] opacity-50 mx-[20px] shrink-0 select-none">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
