import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// @ts-ignore
import wImage from '../../imh/w.png';

export default function Hero() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
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

    if (portraitRef.current) {
      tl.fromTo(
        portraitRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
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

  return (
    <section id="home" className="relative h-screen w-full bg-cream bg-topo overflow-hidden flex items-center justify-center pt-20">
      {/* Background Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] flex pointer-events-none z-0 opacity-5">
        <div ref={marqueeRef} className="flex whitespace-nowrap font-heading text-[20vw] leading-none tracking-tighter text-ink">
          <span>DESIGNED WITH OBSESSION · EDITED WITH PRECISION · </span>
          <span>DESIGNED WITH OBSESSION · EDITED WITH PRECISION · </span>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div ref={heroTextRef} className="text-center mb-8">
          <h1 className="font-display font-bold text-6xl md:text-8xl tracking-tighter text-ink leading-none">
            KAGETSU
          </h1>
          <p className="font-script text-lime text-4xl md:text-6xl -mt-4 -rotate-6">
            Studio
          </p>
        </div>

        {/* Portrait Placeholder */}
        <div
          ref={portraitRef}
          className="w-64 h-96 md:w-80 md:h-[32rem] bg-dark/10 rounded-2xl overflow-hidden relative backdrop-blur-sm border border-ink/5"
        >
          <div
            className="w-full h-full bg-cover bg-center mix-blend-multiply opacity-80"
            style={{ backgroundImage: `url(${wImage})` }}
            aria-label="Kagetsu Studio Portrait"
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