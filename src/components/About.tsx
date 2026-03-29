import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// @ts-ignore
import aiImg from "../../imh/about/ai.png";
// @ts-ignore
import flagImg from "../../imh/about/flag.png";
// @ts-ignore
import studioImg from "../../imh/about/studio.png";
// @ts-ignore
import newImg from "../../imh/about/new.png";

// @ts-ignore
import thirtyNineImg from "../../imh/about/39.png";

const cards = [
  { id: 1, label: 'CREATIVE PROCESS', hoverText: 'Initial Concepts', hoverDir: 'top', img: aiImg, color: '#8a8a8a', left: '50%', top: '42%', rotation: -2, width: '280px', zIndex: 5 },
  { id: 2, label: 'LATE NIGHTS', hoverText: '3D Work', hoverDir: 'left', img: flagImg, color: '#6b6b6b', left: '25%', top: '22%', rotation: -8, width: '220px', zIndex: 3 },
  { id: 3, label: 'ARCHIVE · 2022', hoverText: 'Past Projects', hoverDir: 'bottom', img: thirtyNineImg, color: '#9a9a9a', left: '20%', top: '65%', rotation: 6, width: '200px', zIndex: 2 },
  { id: 4, label: 'THE STUDIO', hoverText: 'Started In 2020', hoverDir: 'right', img: studioImg, color: '#7a7a7a', left: '74%', top: '20%', rotation: 5, width: '210px', zIndex: 4 },
  { id: 5, label: 'BEHIND THE WORK', hoverText: 'Me', hoverDir: 'right', img: newImg, color: '#5a5a5a', left: '76%', top: '62%', rotation: -6, width: '220px', zIndex: 3 },
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
            className="scatter-card group"
            style={{
              width: card.width,
              zIndex: card.zIndex,
              transformOrigin: 'center center'
            }}
          >
            {card.img ? (
              <img src={card.img} alt={card.label} className="transition-transform duration-500" />
            ) : (
              <div 
                className="card-fill transition-transform duration-500" 
                style={{ 
                  backgroundColor: card.color,
                  filter: 'contrast(1.1) brightness(0.95)'
                }}
              />
            )}
            
            
            {/* Minimalist Hover Tooltips */}
            {card.hoverDir === 'left' && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 pr-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap -z-10">
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ink mr-3">{card.hoverText}</span>
                <div className="h-[1px] w-8 bg-ink"></div>
              </div>
            )}
            {card.hoverDir === 'right' && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 pl-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap -z-10">
                <div className="h-[1px] w-8 bg-ink"></div>
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ink ml-3">{card.hoverText}</span>
              </div>
            )}
            {card.hoverDir === 'top' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap -z-10">
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ink mb-3">{card.hoverText}</span>
                <div className="w-[1px] h-8 bg-ink"></div>
              </div>
            )}
            {card.hoverDir === 'bottom' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap -z-10">
                <div className="w-[1px] h-8 bg-ink"></div>
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ink mt-3">{card.hoverText}</span>
              </div>
            )}

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
