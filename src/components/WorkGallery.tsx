import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  '#0f1419', '#140f0f', '#0f140f', '#13130f',
  '#0f0f14', '#140f13', '#0f1413', '#13140f'
];

const posterCards = [
  { name: "Vagabond", year: "2024", img: "imh/vagabond.png", alt: "Vagabond Poster" },
  { name: "Bombay Nights", year: "2024", img: "imh/Bombay_2.png", alt: "Bombay Poster" },
  { name: "Bayaan", year: "2025", img: "imh/Bayaan.png", alt: "Bayaan Poster" },
  { name: "Barcelona", year: "2024", img: "imh/Barcelona_blue.png", alt: "Barcelona Poster" },
  { name: "Fight Club", year: "2024", img: "imh/fight_club.png", alt: "Fight Club Poster" },
  { name: "Serenity", year: "2024", img: "imh/serinity_copy.png", alt: "Serenity Poster" },
  { name: "Kagetsu", year: "2024", img: "imh/Kagetsu_card_copy.png", alt: "Kagetsu Card" },
  { name: "Creative Block", year: "2024", img: "imh/Creative_blockk_copy.png", alt: "Creative Block Poster" }
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

const videoCards = [
  { name: "Cinematic Reel", year: "2024", ratio: "16:9" },
  { name: "Music Video", year: "2024", ratio: "9:16" },
  { name: "Brand Film", year: "2024", ratio: "16:9" },
  { name: "Event Coverage", year: "2023", ratio: "16:9" },
  { name: "Short Film", year: "2024", ratio: "9:16" },
  { name: "Promo Cut", year: "2023", ratio: "16:9" },
  { name: "Documentary", year: "2024", ratio: "16:9" },
  { name: "Commercial", year: "2023", ratio: "16:9" }
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

const artCards = [
  { name: "Digital Illustration", year: "2024", top: "8%", left: "5%", rotate: -6, width: 220 },
  { name: "Character Design", year: "2024", top: "5%", left: "28%", rotate: 3, width: 180 },
  { name: "Abstract Series", year: "2023", top: "15%", left: "52%", rotate: -2, width: 260 },
  { name: "Concept Art", year: "2024", top: "3%", right: "8%", rotate: 5, width: 200 },
  { name: "3D Render", year: "2024", top: "48%", left: "8%", rotate: 4, width: 240 },
  { name: "Matte Painting", year: "2023", top: "42%", left: "35%", rotate: -5, width: 190 },
  { name: "Storyboards", year: "2024", top: "40%", right: "18%", rotate: 2, width: 220 },
  { name: "Environment", year: "2023", top: "55%", right: "4%", rotate: -3, width: 170 }
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

function PostersTab({ cards }: { cards: typeof posterCards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      const cardEl = cardsRef.current[index];
      const nextIndex = (activeIndex + 1) % cards.length;
      
      gsap.to(cardEl, {
        rotateY: 90,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setActiveIndex(nextIndex);
          setTimeout(() => {
            const nextCardEl = cardsRef.current[nextIndex];
            gsap.fromTo(nextCardEl, { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.2 });
            gsap.set(cardEl, { rotateY: 0, opacity: 1 });
          }, 50);
        }
      });
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
      {/* Left side number */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 font-heading text-[8vw] text-transparent transition-opacity duration-300" style={{ WebkitTextStroke: '2px rgba(240, 237, 230, 0.15)' }}>
        {String(activeIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
      </div>
      
      {/* Right side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-body text-[12px] text-[#F0EDE6] opacity-50 tracking-widest uppercase transition-opacity duration-300" style={{ writingMode: 'vertical-rl' }}>
        {cards[activeIndex].name}
      </div>

      {/* Stage */}
      <div className="relative w-[380px] h-[537px] perspective-1000">
        {cards.map((card, i) => {
          let diff = i - activeIndex;
          if (diff < -2) diff += cards.length;
          if (diff > 2) diff -= cards.length;
          
          let x = 0, rotate = 0, scale = 0.8, zIndex = 0, opacity = 0;
          
          if (diff === 0) { x = 0; rotate = 0; scale = 1; zIndex = 10; opacity = 1; }
          else if (diff === 1) { x = 15; rotate = 4; scale = 0.95; zIndex = 9; opacity = 1; }
          else if (diff === 2) { x = 30; rotate = 8; scale = 0.92; zIndex = 8; opacity = 1; }
          else if (diff === -1) { x = -15; rotate = -4; scale = 0.95; zIndex = 9; opacity = 1; }
          else if (diff === -2) { x = -30; rotate = -8; scale = 0.92; zIndex = 8; opacity = 1; }

          return (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              onClick={() => handleCardClick(i)}
              className="work-card absolute inset-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:brightness-125 overflow-hidden"
              style={{
                backgroundColor: card.color,
                transform: `translateX(${x}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex,
                opacity,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: diff === 0 ? '0 20px 40px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              <img src={card.img} alt={card.alt} />
              <div className="absolute bottom-4 left-4 font-body text-[13px] text-white">
                {card.name}
              </div>
              <div className="absolute bottom-4 right-4 font-body text-[13px] text-[#C8F135]">
                {card.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-[#C8F135]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}

function VideoEditsTab({ cards }: { cards: typeof videoCards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => setActiveIndex(p => Math.max(0, p - 1));
  const handleNext = () => setActiveIndex(p => Math.min(cards.length - 1, p + 1));

  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const containerWidth = containerRef.current.offsetWidth;
        const scrollLeft = activeEl.offsetLeft - containerWidth / 2 + activeEl.offsetWidth / 2;
        containerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const Perforations = () => (
    <div className="w-full h-[10px] flex gap-[20px] overflow-hidden opacity-30">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="w-[14px] h-[10px] border border-white/12 flex-shrink-0" />
      ))}
    </div>
  );

  return (
    <div className="relative w-full py-12 flex flex-col items-center overflow-hidden">
      <Perforations />
      
      <div className="relative w-full h-[340px] flex items-center my-4">
        <div 
          ref={containerRef}
          className="flex items-center gap-[12px] px-[50vw] overflow-x-hidden no-scrollbar"
        >
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            const isPortrait = card.ratio === '9:16';
            const width = isPortrait ? 133 : 420;
            
            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative flex-shrink-0 h-[236px] cursor-pointer transition-all duration-500 ease-out hover:brightness-125"
                style={{
                  width,
                  backgroundColor: card.color,
                  transform: isActive ? 'scale(1)' : 'scale(0.88)',
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'none' : 'grayscale(60%)',
                }}
              >
                <div className="absolute bottom-4 left-4 font-body text-[13px] text-white">
                  {card.name}
                </div>
                <div className="absolute bottom-4 right-4 font-body text-[13px] text-[#C8F135]">
                  {card.year}
                </div>
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[60px] h-[60px] rounded-full bg-[rgba(200,241,53,0.9)] flex items-center justify-center">
                      <Play size={24} className="text-[#0a0a0a] fill-[#0a0a0a] ml-1" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <button onClick={handlePrev} className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10 backdrop-blur-sm">
          ←
        </button>
        <button onClick={handleNext} className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10 backdrop-blur-sm">
          →
        </button>
      </div>

      <Perforations />
    </div>
  );
}

function ArtTab({ cards }: { cards: typeof artCards }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        top: cards[i].top || 'auto',
        left: cards[i].left || 'auto',
        right: cards[i].right || 'auto',
        width: cards[i].width,
        height: cards[i].width,
        rotation: cards[i].rotate,
        xPercent: 0,
        yPercent: 0,
      });
    });
  }, [cards]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeCard !== null) return;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCX = rect.left + rect.width / 2;
        const cardCY = rect.top + rect.height / 2;
        const dx = e.clientX - cardCX;
        const dy = e.clientY - cardCY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const baseRotation = cards[i].rotate;

        if (dist < 150) {
          const pull = (150 - dist) / 150;
          gsap.to(card, {
            x: dx * pull * 0.3,
            y: dy * pull * 0.3,
            rotation: baseRotation + (dx * pull * 0.05),
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          gsap.to(card, {
            x: 0, y: 0,
            rotation: baseRotation,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [activeCard, cards]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCard(null);
        resetCards();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetCards = () => {
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      gsap.to(card, {
        top: cards[idx].top || 'auto',
        left: cards[idx].left || 'auto',
        right: cards[idx].right || 'auto',
        width: cards[idx].width,
        height: cards[idx].width,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: cards[idx].rotate,
        opacity: 1,
        zIndex: 10,
        duration: 0.6,
        ease: "power3.inOut"
      });
    });
  };

  const handleCardClick = (i: number) => {
    if (activeCard === i) {
      setActiveCard(null);
      resetCards();
    } else {
      setActiveCard(i);
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        if (idx === i) {
          gsap.to(card, {
            top: '50%',
            left: '50%',
            right: 'auto',
            xPercent: -50,
            yPercent: -50,
            width: 400,
            height: 400,
            rotation: 0,
            opacity: 1,
            zIndex: 50,
            duration: 0.6,
            ease: "power3.inOut"
          });
        } else {
          gsap.to(card, {
            opacity: 0.2,
            zIndex: 10,
            duration: 0.6,
            ease: "power3.inOut"
          });
        }
      });
    }
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {cards.map((card, i) => (
        <div
          key={i}
          ref={el => cardsRef.current[i] = el}
          onClick={() => handleCardClick(i)}
          className="absolute cursor-pointer hover:brightness-125"
          style={{
            backgroundColor: card.color,
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10,
          }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#C8F135]" />
            <div className="w-[2px] h-2 bg-white/30" />
          </div>

          <div className="absolute bottom-4 left-4 font-body text-[13px] text-white">
            {card.name}
          </div>
          <div className="absolute bottom-4 right-4 font-body text-[13px] text-[#C8F135]">
            {card.year}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState('POSTERS');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  const handleTabClick = (category: string) => {
    if (category === activeCategory) return;
    
    const currentContent = contentRef.current;
    
    gsap.to(currentContent, {
      opacity: 0,
      y: -30,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(category);
        
        setTimeout(() => {
          gsap.fromTo(contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }, 0);
      }
    });
  };

  return (
    <section id="work" ref={sectionRef} className="w-full bg-[#0a0a0a] pt-0 overflow-hidden">
      {/* Header Row */}
      <div className="flex justify-between items-center px-5 py-6">
        <h2 className="font-heading text-3xl text-[#F0EDE6] tracking-wider m-0">
          THE WORK
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[
              { id: 'POSTERS' },
              { id: 'VIDEO EDITS' },
              { id: 'ART' }
            ].map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                {index > 0 && <span className="text-[#F0EDE6] opacity-30 mx-1">·</span>}
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`work-tab ${activeCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.id}
                </button>
              </div>
            ))}
          </div>
          <span className="font-body text-[13px] text-[#F0EDE6] opacity-50 uppercase tracking-widest ml-4 hidden md:block">
            Category 2025
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div ref={contentRef} className="w-full">
        {activeCategory === 'POSTERS' && <PostersTab cards={posterCards} />}
        {activeCategory === 'VIDEO EDITS' && <VideoEditsTab cards={videoCards} />}
        {activeCategory === 'ART' && <ArtTab cards={artCards} />}
      </div>
    </section>
  );
}
