import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { id: 'HOME' },
  { id: 'WORK' },
  { id: 'SERVICES' },
  { id: 'ABOUT' },
  { id: 'CONTACT' }
];

const socialLinks = [
  { id: 'BEHANCE', url: 'https://www.behance.net/sunilkashyaap' },
  { id: 'INSTAGRAM', url: 'https://www.instagram.com/kagetsu.studio/' },
  { id: 'LINKEDIN', url: 'https://www.linkedin.com/in/sunil-kashyap11' },
  { id: 'DRIBBBLE', url: 'https://dribbble.com/animevuee' }
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const leftLinksRef = useRef<HTMLDivElement>(null);
  const rightLinksRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGTextElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!footerRef.current || !triggerRef.current) return;

    // Initial state for inner elements so they are hidden before first open
    if (leftLinksRef.current && rightLinksRef.current && centerCardRef.current) {
      gsap.set([
        leftLinksRef.current.querySelectorAll('a, .hire-link'),
        rightLinksRef.current.querySelectorAll('a'),
        centerCardRef.current
      ], { autoAlpha: 0 });
    }

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top bottom",
      onEnter: () => {
        setIsOpen(true);
        openFooter();
      }
    });
  }, []);

  const openFooter = () => {
    gsap.to(footerRef.current, {
      y: "0%",
      duration: 0.75,
      ease: "expo.inOut",
      onComplete: () => {
        // Marquee
        if (marqueeRef.current && !marqueeTweenRef.current) {
          marqueeTweenRef.current = gsap.fromTo(marqueeRef.current,
            { x: 0 },
            { x: "-50%", duration: 18, ease: "none", repeat: -1 }
          );
        } else if (marqueeTweenRef.current) {
          marqueeTweenRef.current.play();
        }

        // Inner animations AFTER panel is fully visible
        if (leftLinksRef.current && rightLinksRef.current && centerCardRef.current) {
          const leftElements = leftLinksRef.current.querySelectorAll('a, .hire-link');
          const rightElements = rightLinksRef.current.querySelectorAll('a');

          const tl = gsap.timeline();
          tl.fromTo(leftElements,
            { x: -30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" }
          )
          .fromTo(rightElements,
            { x: 30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" },
            "<"
          )
          .fromTo(centerCardRef.current,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
            "<0.1"
          );
          
          if (pathRef.current) {
            try {
              const length = pathRef.current.getComputedTextLength();
              gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
              tl.to(pathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "<0.2");
            } catch (e) {
              // Fallback if getComputedTextLength fails
              tl.fromTo(pathRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "<0.2");
            }
          }
        }
      }
    });
  };

  const closeFooter = () => {
    setIsOpen(false);
    gsap.to(footerRef.current, { y: "100%", duration: 0.6, ease: "expo.inOut" }).then(() => {
      marqueeTweenRef.current?.pause(0);
      // Reset elements to invisible so they animate again next time
      if (leftLinksRef.current && rightLinksRef.current && centerCardRef.current) {
        gsap.set([
          leftLinksRef.current.querySelectorAll('a, .hire-link'),
          rightLinksRef.current.querySelectorAll('a'),
          centerCardRef.current
        ], { autoAlpha: 0 });
      }
    });
    window.scrollBy({ top: -100, behavior: 'smooth' });
  };

  return (
    <>
      {/* Trigger element at the bottom of the page */}
      <div ref={triggerRef} className="h-[10vh] w-full bg-transparent" />

      {/* Fixed Full-Screen Footer Panel */}
      <div 
        id="footer-panel"
        ref={footerRef} 
        className="fixed bottom-0 left-0 w-full h-screen z-[999] flex flex-col bg-[#1C2318] translate-y-full overflow-hidden"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* Curved Top Edge (SVG Wave) */}
        <div className="relative w-full -mt-[1px] flex-shrink-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="#1C2318" />
          </svg>
          
          {/* Circle Handle */}
          <div 
            className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ background: 'rgba(240,237,230,0.12)', border: '1px solid rgba(240,237,230,0.25)' }}
            onClick={closeFooter}
          >
            <span className="font-body text-[16px] text-[#F0EDE6] leading-none mb-[2px]">&times;</span>
          </div>
        </div>

        {/* Top Nav Bar */}
        <div className="flex justify-between items-center px-[48px] pt-[16px] flex-shrink-0">
          <div className="font-display font-bold text-[1.4rem] leading-[1.1] text-[#F0EDE6]">
            KAG<br />ETSU
          </div>
          <div className="flex items-center gap-[12px]">
            <button onClick={() => (window as any).openModal()} className="bg-[#C8F135] text-[#1C2318] px-[20px] py-[9px] rounded-full font-heading text-[15px] tracking-wider hover:bg-[#F0EDE6] transition-colors cursor-none">
              ✦ HIRE ME &rarr;
            </button>
            <button 
              onClick={closeFooter}
              className="w-[44px] h-[44px] border-[1.5px] border-[rgba(240,237,230,0.35)] rounded-[6px] flex items-center justify-center text-[#F0EDE6] text-[18px] hover:bg-[#F0EDE6]/10 transition-colors cursor-none"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Main Three-Column Layout */}
        <div 
          className="flex flex-row items-start justify-between px-[48px] pt-[40px] flex-1 gap-[40px] min-h-0 overflow-visible"
          style={{ height: 'calc(100vh - 200px)' }}
        >
          
          {/* Left Column */}
          <div ref={leftLinksRef} className="flex flex-col gap-[2px] flex-[0_0_240px]">
            <span className="block font-body text-[10px] tracking-[0.3em] uppercase text-[rgba(240,237,230,0.45)] mb-[18px]">PAGES</span>
            {navLinks.map(link => (
              <a key={link.id} href={link.id === 'CONTACT' ? '#' : `#${link.id.toLowerCase()}`} onClick={(e) => {
                if (link.id === 'CONTACT') {
                  e.preventDefault();
                  (window as any).openModal();
                }
                closeFooter();
              }} className="block font-heading text-[clamp(2rem,3.2vw,3rem)] text-[#F0EDE6] no-underline leading-[1.05] opacity-100 hover:text-[#C8F135] transition-colors duration-200 cursor-none">
                {link.id}
              </a>
            ))}
            <a href="#" onClick={(e) => { e.preventDefault(); (window as any).openModal(); closeFooter(); }} className="hire-link block font-heading text-[clamp(2rem,3.2vw,3rem)] text-[#C8F135] no-underline leading-[1.05] opacity-100 hover:text-[#F0EDE6] transition-colors duration-200 cursor-none mt-[20px]">
              HIRE ME
            </a>
          </div>

          {/* Center Column */}
          <div className="flex-1 flex justify-center items-end h-full">
            {/* Dark Card */}
            <div 
              ref={centerCardRef}
              className="bg-[#0d1a0b] w-[clamp(200px,20vw,300px)] aspect-[2/3] rounded-t-[12px] rounded-b-none border border-[rgba(200,241,53,0.25)] border-b-0 flex items-center justify-center opacity-100"
            >
              {/* SVG Monogram */}
              <svg viewBox="0 0 100 60" width="80" height="48">
                <text ref={pathRef} x="10" y="48" 
                      fontFamily="'Playfair Display', serif" 
                      fontSize="52" 
                      fontWeight="700"
                      fill="none" 
                      stroke="#C8F135" 
                      strokeWidth="1.5">KS</text>
              </svg>
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightLinksRef} className="flex flex-col gap-[2px] flex-[0_0_240px] text-right items-end">
            <span className="block font-body text-[10px] tracking-[0.3em] uppercase text-[rgba(240,237,230,0.45)] mb-[18px]">FOLLOW ON</span>
            {socialLinks.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener" className="block font-heading text-[clamp(2rem,3.2vw,3rem)] text-[#F0EDE6] no-underline leading-[1.05] opacity-100 hover:text-[#C8F135] transition-colors duration-200 cursor-none">
                {link.id}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(240,237,230,0.1)] px-[48px] py-[14px] flex justify-between items-center bg-[#1C2318] flex-shrink-0">
          {/* Marquee */}
          <div className="w-[55%] overflow-hidden relative">
            <div ref={marqueeRef} className="flex w-max gap-0">
              <span className="font-heading text-[13px] text-[#F0EDE6] opacity-45 tracking-[0.08em] whitespace-nowrap">
                ADOBE CC ✦ AFTER EFFECTS ✦ PREMIERE PRO ✦ PHOTOSHOP ✦ ILLUSTRATOR ✦ DAVINCI RESOLVE ✦ BLENDER ✦ FIGMA ✦&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span className="font-heading text-[13px] text-[#F0EDE6] opacity-45 tracking-[0.08em] whitespace-nowrap">
                ADOBE CC ✦ AFTER EFFECTS ✦ PREMIERE PRO ✦ PHOTOSHOP ✦ ILLUSTRATOR ✦ DAVINCI RESOLVE ✦ BLENDER ✦ FIGMA ✦&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
          
          {/* CTA Button */}
          <button onClick={() => (window as any).openModal()} className="bg-[#C8F135] text-[#1C2318] font-heading text-[14px] px-[24px] py-[10px] rounded-full flex-shrink-0 hover:bg-[#F0EDE6] transition-colors cursor-none">
            BUSINESS ENQUIRIES &rarr;
          </button>
        </div>

        {/* Copyright Line */}
        <div className="px-[48px] py-[10px] flex justify-between bg-[#1C2318] flex-shrink-0 border-t border-[rgba(240,237,230,0.06)]">
          <p className="font-body text-[12px] text-[#F0EDE6] opacity-40">© 2026 Kagetsu Studio. All rights reserved</p>
          <div className="font-body text-[12px] text-[#F0EDE6] opacity-40">
            PRIVACY POLICY &middot; TERMS
          </div>
        </div>
      </div>
    </>
  );
}
