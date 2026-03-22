import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    if (leftRef.current) {
      tl.fromTo(
        leftRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
    if (rightRef.current) {
      tl.fromTo(
        rightRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-cream py-24 md:py-48 relative overflow-hidden">
      {/* Background bleeding images */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-96 bg-dark/10 rounded-3xl overflow-hidden opacity-50 md:opacity-100 pointer-events-none">
        <div className="w-full h-full bg-cover bg-center mix-blend-multiply" style={{ backgroundImage: 'url(https://picsum.photos/seed/poster/400/600)' }} aria-label="Poster Work" />
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-96 bg-dark/10 rounded-3xl overflow-hidden opacity-50 md:opacity-100 pointer-events-none">
        <div className="w-full h-full bg-cover bg-center mix-blend-multiply" style={{ backgroundImage: 'url(https://picsum.photos/seed/video/400/600)' }} aria-label="Video Work" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12 relative z-10">
        {/* Left Column */}
        <div ref={leftRef} className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="relative mb-6">
            <h2 className="font-heading text-7xl md:text-9xl tracking-tighter text-ink leading-[0.8]">
              POSTER<br />WORK
            </h2>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-lime text-6xl md:text-8xl -rotate-12 whitespace-nowrap drop-shadow-md">
              Design
            </span>
          </div>
          <p className="font-body text-lg md:text-xl text-ink/70 mb-8 max-w-sm">
            Brand identities, poster series, and print work.
          </p>
          <button className="w-16 h-16 bg-lime text-ink flex items-center justify-center hover:bg-ink hover:text-lime transition-colors">
            <ArrowRight size={32} />
          </button>
        </div>

        {/* Right Column */}
        <div ref={rightRef} className="flex flex-col items-center text-center md:items-end md:text-right">
          <div className="relative mb-6">
            <h2 className="font-heading text-7xl md:text-9xl tracking-tighter text-ink leading-[0.8]">
              VIDEO<br />EDITS
            </h2>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-lime text-6xl md:text-8xl -rotate-12 whitespace-nowrap drop-shadow-md">
              Motion
            </span>
          </div>
          <p className="font-body text-lg md:text-xl text-ink/70 mb-8 max-w-sm">
            Cinematic cuts, color grading, reels.
          </p>
          <button className="w-16 h-16 bg-lime text-ink flex items-center justify-center hover:bg-ink hover:text-lime transition-colors">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
