import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// @ts-ignore
import vagabond from "../../imh/vagabond.png";
// @ts-ignore
import bombay from "../../imh/Zee.jpg";
// @ts-ignore
import bayaan from "../../imh/Bayaan.png";
// @ts-ignore
import barcelona from "../../imh/ali.jpg";
// @ts-ignore
import fightclub from "../../imh/fight club.png";
// @ts-ignore
import serenity from "../../imh/vishnu.jpg";
// @ts-ignore
import kagetsucard from "../../imh/Arcade.png";
// @ts-ignore
import creativeblock from "../../imh/Creative blockk copy.png";

// @ts-ignore
import animatingMp4 from "../../imh/Animating.mp4";
// @ts-ignore
import animateMp4 from "../../imh/animate.mp4";
// @ts-ignore
import fallenAngelsMp4 from "../../imh/Fallen Angels.mp4";
// @ts-ignore
import loveyousoMp4 from "../../imh/Love you so.mp4";
// @ts-ignore
import insaneMp4 from "../../imh/insane.mp4";
// @ts-ignore
import batMp4 from "../../imh/bat.mp4";
// @ts-ignore
import textMp4 from "../../imh/Text.mp4";

// @ts-ignore
import art1 from "../../imh/art/art (1).png";
// @ts-ignore
import art2 from "../../imh/art/new.jpg";
// @ts-ignore
import art3 from "../../imh/art/art (3).jpg";
// @ts-ignore
import art4 from "../../imh/art/art (4).jpg";
// @ts-ignore
import art5 from "../../imh/art/art (5).jpg";
// @ts-ignore
import art6 from "../../imh/art/art (6).jpg";
// @ts-ignore
import art7 from "../../imh/art/art (7).jpg";
// @ts-ignore
import art8 from "../../imh/art/art (8).jpg";

gsap.registerPlugin(ScrollTrigger);

const colors = [
  '#0f1419', '#140f0f', '#0f140f', '#13130f',
  '#0f0f14', '#140f13', '#0f1413', '#13140f'
];

const posterCards = [
  { name: "Vagabond", year: "2024", img: vagabond, alt: "Vagabond Poster" },
  { name: "Bombay Nights", year: "2024", img: bombay, alt: "Bombay Poster" },
  { name: "Bayaan", year: "2025", img: bayaan, alt: "Bayaan Poster" },
  { name: "Barcelona", year: "2024", img: barcelona, alt: "Barcelona Poster" },
  { name: "Fight Club", year: "2024", img: fightclub, alt: "Fight Club Poster" },
  { name: "Serenity", year: "2024", img: serenity, alt: "Serenity Poster" },
  { name: "Kagetsu", year: "2024", img: kagetsucard, alt: "Kagetsu Card" },
  { name: "Creative Block", year: "2024", img: creativeblock, alt: "Creative Block Poster" },
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

const videoCards = [
  { name: "Fallen Angels", year: "2024", ratio: "16:9" as const, video: fallenAngelsMp4 },
  { name: "Animating", year: "2025", ratio: "9:16" as const, video: animatingMp4 },
  { name: "Love You So", year: "2024", ratio: "16:9" as const, video: loveyousoMp4 },
  { name: "Bat", year: "2024", ratio: "1:1" as const, video: batMp4 },
  { name: "Text", year: "2024", ratio: "16:9" as const, video: textMp4 },
  { name: "Animate", year: "2025", ratio: "9:16" as const, video: animateMp4 },
  { name: "Insane", year: "2024", ratio: "16:9" as const, video: insaneMp4 },
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

const artCards = [
  { name: "Character Study", year: "2024", img: art1 },
  { name: "Tribal Threads", year: "2024", img: art2 },
  { name: "The Door", year: "2024", img: art3 },
  { name: "Confrontation", year: "2024", img: art4 },
  { name: "Burning City", year: "2024", img: art5 },
  { name: "Street King", year: "2024", img: art6 },
  { name: "Neon City", year: "2024", img: art7 },
  { name: "The Deal", year: "2024", img: art8 },
].map((c, i) => ({ ...c, color: colors[i % colors.length] }));

// Structured 4×2 grid positions with organic offsets
const structuredPositions = [
  { gridCol: 0, gridRow: 0, offsetX: -10, offsetY: 15, rotate: -6, width: 240, height: 300 },  // portrait
  { gridCol: 1, gridRow: 0, offsetX: 20, offsetY: -10, rotate: 4, width: 280, height: 210 },  // landscape
  { gridCol: 2, gridRow: 0, offsetX: -5, offsetY: 20, rotate: -2, width: 220, height: 220 },  // square
  { gridCol: 3, gridRow: 0, offsetX: 10, offsetY: -15, rotate: 5, width: 260, height: 195 },  // landscape
  { gridCol: 0, gridRow: 1, offsetX: 15, offsetY: -20, rotate: 3, width: 250, height: 320 },  // portrait tall
  { gridCol: 1, gridRow: 1, offsetX: -20, offsetY: 10, rotate: -5, width: 230, height: 230 },  // square
  { gridCol: 2, gridRow: 1, offsetX: 5, offsetY: -10, rotate: 2, width: 290, height: 200 },  // wide landscape
  { gridCol: 3, gridRow: 1, offsetX: -10, offsetY: 15, rotate: -4, width: 245, height: 280 },  // portrait
];

const ART_COLS = 4;
const ART_ROWS = 2;

function getCardPosition(index: number, containerW: number, containerH: number) {
  const pos = structuredPositions[index];
  const cellW = containerW / ART_COLS;
  const cellH = containerH / ART_ROWS;
  const x = pos.gridCol * cellW + cellW / 2 - pos.width / 2 + pos.offsetX;
  const y = pos.gridRow * cellH + cellH / 2 - pos.height / 2 + pos.offsetY;
  return { x, y, rotate: pos.rotate, width: pos.width, height: pos.height };
}

/* ─── Posters Tab ─── */
function PostersTab({ cards }: { cards: typeof posterCards }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex((activeIndex + 1) % cards.length);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '620px' }}>
      {/* Left counter */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 font-heading text-[8vw] text-transparent select-none"
        style={{ WebkitTextStroke: '2px rgba(240, 237, 230, 0.15)' }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
      </div>

      {/* Right side text */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-body text-[12px] text-[#F0EDE6] opacity-50 tracking-widest uppercase"
        style={{ writingMode: 'vertical-rl' }}
      >
        {cards[activeIndex].name}
      </div>

      {/* Card stage — no perspective, no 3D */}
      <div className="relative w-[380px] h-[537px]">
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
              onClick={() => handleCardClick(i)}
              className="work-card absolute inset-0 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: card.color,
                transform: `translate3d(${x}px, 0, 0) scale(${scale}) rotate(${rotate}deg)`,
                zIndex,
                opacity,
                transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: diff === 0 ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                willChange: 'transform',
              }}
            >
              <img
                src={card.img}
                alt={card.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
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
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer ${i === activeIndex ? 'bg-[#C8F135]' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Video Edits Tab ─── */
function VideoEditsTab({ cards }: { cards: typeof videoCards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePrev = () => setActiveIndex(p => Math.max(0, p - 1));
  const handleNext = () => setActiveIndex(p => Math.min(cards.length - 1, p + 1));

  // Scroll to center active card
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

  // Autoplay active video with sound, pause and mute all others
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIndex) {
        vid.muted = false;
        vid.currentTime = 0;
        vid.play().catch(() => {
          // Browser may block unmuted autoplay — fall back to muted
          vid.muted = true;
          vid.play().catch(() => { });
        });
      } else {
        vid.muted = true;
        vid.pause();
      }
    });
  }, [activeIndex]);

  const Perforations = () => (
    <div className="w-full h-[10px] flex gap-[20px] overflow-hidden opacity-30">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="w-[14px] h-[10px] border border-white/12 flex-shrink-0" />
      ))}
    </div>
  );

  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center overflow-hidden" style={{ height: '620px' }}>
      <Perforations />
      <div className="relative w-full h-[340px] flex items-center my-4">
        <div
          ref={containerRef}
          className="flex items-center gap-[12px] px-[50vw] overflow-x-hidden no-scrollbar"
        >
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            const isPortrait = card.ratio === '9:16';
            const isSquare = card.ratio === '1:1';
            const width = isPortrait ? 133 : isSquare ? 236 : 420;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative flex-shrink-0 h-[236px] cursor-pointer overflow-hidden"
                style={{
                  width,
                  backgroundColor: card.color,
                  transform: isActive ? 'scale(1)' : 'scale(0.88)',
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'none' : 'grayscale(60%)',
                  transition: 'transform 0.5s ease-out, opacity 0.5s ease-out, filter 0.5s ease-out',
                }}
              >
                <video
                  ref={el => videoRefs.current[i] = el}
                  src={card.video}
                  loop
                  playsInline
                  preload={i === 0 ? 'auto' : 'metadata'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 font-body text-[13px] text-white z-10 drop-shadow-md">
                  {card.name}
                </div>
                <div className="absolute bottom-4 right-4 font-body text-[13px] text-[#C8F135] z-10 drop-shadow-md">
                  {card.year}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10 backdrop-blur-sm"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10 backdrop-blur-sm"
        >
          →
        </button>
      </div>
      <Perforations />
    </div>
  );
}

/* ─── Art Tab ─── */
function ArtTab({ cards }: { cards: typeof artCards }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix 2 — Smooth repositioning on mount using GSAP stagger
  useEffect(() => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const containerH = containerRef.current.offsetHeight;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const { x, y, rotate, width, height } = getCardPosition(i, containerW, containerH);

      // Start stacked at center
      gsap.set(card, {
        x: containerW / 2 - width / 2,
        y: containerH / 2 - height / 2,
        rotation: 0,
        opacity: 0,
        scale: 0.85,
        position: 'absolute',
        width,
        height,
      });

      // Animate to structured position with stagger
      gsap.to(card, {
        x,
        y,
        rotation: rotate,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out'
      });
    });
  }, []);

  // Fix 5 — Magnetic hover uses absolute x/y not top/left
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeCard !== null || !containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const containerH = containerRef.current.offsetHeight;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const { x: baseX, y: baseY, rotate: baseRotate } = getCardPosition(i, containerW, containerH);
        const rect = card.getBoundingClientRect();
        const cardCX = rect.left + rect.width / 2;
        const cardCY = rect.top + rect.height / 2;
        const dx = e.clientX - cardCX;
        const dy = e.clientY - cardCY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const pull = (150 - dist) / 150;
          gsap.to(card, {
            x: baseX + dx * pull * 0.25,
            y: baseY + dy * pull * 0.25,
            rotation: baseRotate + dx * pull * 0.04,
            duration: 0.35,
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            x: baseX,
            y: baseY,
            rotation: baseRotate,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [activeCard]);

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

  // Reset cards to their structured grid positions
  const resetCards = () => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const containerH = containerRef.current.offsetHeight;

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const { x, y, rotate, width, height } = getCardPosition(idx, containerW, containerH);
      gsap.to(card, {
        x,
        y,
        width,
        height,
        rotation: rotate,
        opacity: 1,
        scale: 1,
        zIndex: 10,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    });
  };

  // Fix 6 — Click to center uses x/y not top/left
  const handleCardClick = (i: number) => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const containerH = containerRef.current.offsetHeight;

    if (activeCard === i) {
      setActiveCard(null);
      resetCards();
    } else {
      setActiveCard(i);
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // Reset ALL cards to full opacity first
        gsap.set(card, { opacity: 1, zIndex: 10 });

        if (idx === i) {
          gsap.to(card, {
            x: containerW / 2 - 200,
            y: containerH / 2 - 200,
            width: 400,
            height: 400,
            rotation: 0,
            opacity: 1,
            zIndex: 50,
            duration: 0.6,
            ease: 'power3.inOut'
          });
        } else {
          // Dim all others — single consistent opacity value
          gsap.to(card, {
            opacity: 0.15,
            zIndex: 10,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  // Fix 7 — Container must be position: relative with explicit height
  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '620px' }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={el => cardsRef.current[i] = el}
          onClick={() => handleCardClick(i)}
          className="absolute cursor-pointer overflow-hidden"
          style={{
            backgroundColor: card.color,
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10,
          }}
        >
          <img
            src={card.img}
            alt={card.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          {/* Fix 4 — Pushpin stays visible above image */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#C8F135',
              boxShadow: '0 0 6px rgba(200,241,53,0.8)'
            }} />
            <div style={{
              width: 2,
              height: 8,
              background: 'rgba(255,255,255,0.4)'
            }} />
          </div>
          {/* Fix 3 — Fix label visibility with frosted dark bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 12px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#F0EDE6',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
              {card.name}
            </span>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#C8F135',
              fontWeight: 500,
            }}>
              {card.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main WorkGallery ─── */
export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState('POSTERS');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      }
    });
    return () => st.kill();
  }, []);

  const handleTabClick = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
  };

  return (
    <section id="work" ref={sectionRef} className="w-full bg-[#0a0a0a] pt-0 overflow-hidden" style={{ contain: 'layout style paint', minHeight: 'auto' }}>
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

      <div ref={contentRef} className="w-full">
        {activeCategory === 'POSTERS' && <PostersTab cards={posterCards} />}
        {activeCategory === 'VIDEO EDITS' && <VideoEditsTab cards={videoCards} />}
        {activeCategory === 'ART' && <ArtTab cards={artCards} />}
      </div>
    </section>
  );
}