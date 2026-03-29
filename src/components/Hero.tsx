import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// @ts-ignore
import maoImage from '../../imh/mao.png';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: 'linear',
      });
    }

    // Page Load Animation
    const tl = gsap.timeline({ delay: 0.2 });

    if (heroTextRef.current) {
      tl.fromTo(
        heroTextRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }

    // Cinematic Portrait Entrance
    if (portraitRef.current) {
      tl.fromTo(
        portraitRef.current,
        // xPercent locks the absolute centering (-translate-x-1/2 equivalent in JS) securely
        { xPercent: -50, y: 60, opacity: 0 },
        { xPercent: -50, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      );
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    // Fluid CSS transition injected directly mimicking prompt restraints
    img.style.transition = 'transform 0.1s ease-out';

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor vector relative to center of section
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Inverse dampening (-0.02 multiplier)
      let moveX = deltaX * -0.02;
      let moveY = deltaY * -0.02;

      // Absolute capping to ensure it remains a subtle micro-interaction
      moveX = Math.max(-15, Math.min(15, moveX));
      moveY = Math.max(-15, Math.min(15, moveY));

      img.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      // Return smoothly to true origin center
      img.style.transform = `translate(0px, 0px)`;
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen w-full bg-cream bg-topo overflow-hidden flex items-center justify-center pt-20">
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] flex pointer-events-none z-0 opacity-5">
        <div ref={marqueeRef} className="flex whitespace-nowrap font-heading text-[20vw] leading-none tracking-tighter text-ink">
          <span>DESIGNED WITH OBSESSION · EDITED WITH PRECISION · </span>
          <span>DESIGNED WITH OBSESSION · EDITED WITH PRECISION · </span>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center h-full w-full">
        <div ref={heroTextRef} className="text-center mt-[4vh] mb-8">
          <h1 className="font-display font-bold text-6xl md:text-8xl tracking-tighter text-ink leading-none">
            KAGETSU
          </h1>
          <p className="font-script text-lime text-4xl md:text-6xl -mt-4 -rotate-6">
            Studio
          </p>
        </div>

        {/* Portrait — pinned to bottom */}
        <div
          ref={portraitRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[28rem] md:w-[36rem] overflow-hidden"
        >
          <img
            ref={imageRef}
            src={maoImage}
            alt="Kagetsu Studio Portrait"
            className="block mx-auto w-full h-auto object-contain object-center transition-transform duration-500 ease-out hover:translate-y-[-6px] hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Floating Badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-12 left-6 md:left-12 bg-dark text-cream px-6 py-4 rounded-2xl flex flex-col gap-1 z-20"
      >
        <span className="font-heading text-xl tracking-widest text-lime">STUDIO</span>
        <span className="font-body text-sm font-medium">EST. 2025</span>
      </div>
    </section>
  );
}