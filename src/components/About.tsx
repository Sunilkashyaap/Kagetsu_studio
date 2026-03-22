import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, label: 'CREATIVE PROCESS', color: '#8a8a8a', left: '50%', top: '42%', rotation: -2, width: '280px', zIndex: 5 },
  { id: 2, label: 'LATE NIGHTS', color: '#6b6b6b', left: '25%', top: '22%', rotation: -8, width: '220px', zIndex: 3 },
  { id: 3, label: 'ARCHIVE · 2022', color: '#9a9a9a', left: '20%', top: '65%', rotation: 6, width: '200px', zIndex: 2 },
  { id: 4, label: 'THE STUDIO', color: '#7a7a7a', left: '74%', top: '20%', rotation: 5, width: '210px', zIndex: 4 },
  { id: 5, label: 'BEHIND THE WORK', color: '#5a5a5a', left: '76%', top: '62%', rotation: -6, width: '220px', zIndex: 3 },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(cardsRef.current, {
      position: 'absolute',
      left: '50%',
      top: '40%',
      xPercent: -50,
      yPercent: -50,
      rotationZ: 0,
      scale: 0.9,
      opacity: 0,
      zIndex: 1
    });

    ScrollTrigger.create({
      trigger: '.scatter-container',
      start: 'top 60%',
      once: true,
      onEnter: () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const pos = cards[i];
          gsap.to(card, {
            left: pos.left,
            top: pos.top,
            xPercent: -50,
            yPercent: -50,
            rotationZ: pos.rotation,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            delay: i * 0.1,
            ease: 'power3.out'
          });
        });
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const pos = cards[i];

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -12,
          scale: 1.04,
          zIndex: 10,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          zIndex: pos.zIndex,
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-cream bg-topo pt-32 md:pt-48 pb-[40px] relative overflow-hidden flex flex-col items-center justify-center">
      <div className="scatter-container">
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="scatter-card"
            style={{
              width: card.width,
              zIndex: card.zIndex,
              transformOrigin: 'center center'
            }}
          >
            <div 
              className="card-fill" 
              style={{ 
                backgroundColor: card.color,
                filter: 'contrast(1.1) brightness(0.95)'
              }}
            />
            <span className="card-label">
              {card.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-30 mt-24 max-w-3xl mx-auto text-center px-6">
        <p className="font-display italic text-3xl md:text-5xl text-ink leading-tight mb-8">
          "I started with a blank canvas and an obsession with making things look extraordinary."
        </p>
        <div className="flex justify-center">
          <span className="font-script text-lime text-[2.8rem] mt-4 block leading-none">
            Kagetsu
          </span>
        </div>
      </div>
    </section>
  );
}
