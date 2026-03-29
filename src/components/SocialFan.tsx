import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SocialFan() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.swap-card'));
    const dots = Array.from(document.querySelectorAll('.swap-dot'));
    let currentIndex = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let paused = false;

    function initStack() {
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: i * 32,
          y: i * -32,
          scale: 1 - (i * 0.04),
          zIndex: cards.length - i,
          opacity: i < 3 ? 1 : 0,
          rotation: 0
        });
      });
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function swapCard() {
      if (cards.length === 0) return;
      const front = cards[currentIndex];
      const total = cards.length;

      // Exit: front card slides left and fades
      gsap.to(front, {
        x: -180,
        opacity: 0,
        rotation: -6,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Reset to back of stack position (invisible)
          gsap.set(front, {
            x: 96,
            y: -96,
            scale: 0.88,
            zIndex: 1,
            opacity: 0,
            rotation: 0
          });
        }
      });

      // All remaining cards step forward to their new position
      cards.forEach((card, i) => {
        if (card === front) return;
        const newPos = ((i - currentIndex - 1 + total) % total);
        gsap.to(card, {
          x: newPos * 32,
          y: newPos * -32,
          scale: 1 - (newPos * 0.04),
          zIndex: total - newPos,
          opacity: newPos < 3 ? 1 : 0,
          duration: 0.5,
          ease: "power3.out"
        });
      });

      currentIndex = (currentIndex + 1) % total;
      updateDots();
    }

    function startCycle() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!paused) swapCard();
      }, 4000);
    }

    const stage = document.querySelector('.cardswap-stage');
    if (!stage) return;

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };
    const handleClick = () => { swapCard(); };

    stage.addEventListener('mouseenter', handleMouseEnter);
    stage.addEventListener('mouseleave', handleMouseLeave);
    stage.addEventListener('click', handleClick);

    // Init
    initStack();

    // ScrollTrigger entrance
    const st = ScrollTrigger.create({
      trigger: '#fan',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cards,
          { x: 120, opacity: 0 },
          {
            x: (i) => i * 32,
            opacity: (i) => i < 3 ? 1 : 0,
            duration: 0.7,
            stagger: { each: 0.1, from: "end" },
            ease: "power3.out",
            onComplete: () => {
              setTimeout(startCycle, 800);
            }
          }
        );
      }
    });

    return () => {
      if (timer) clearInterval(timer);
      stage.removeEventListener('mouseenter', handleMouseEnter);
      stage.removeEventListener('mouseleave', handleMouseLeave);
      stage.removeEventListener('click', handleClick);
      st.kill();
    };
  }, []);

  return (
    <section id="fan" className="w-full bg-cream bg-topo relative overflow-hidden min-h-screen flex items-center px-[8vw] box-border">
      <div className="flex items-center justify-between w-full gap-[6vw]">

        {/* Left Block - 38% */}
        <div className="flex-[0_0_38%] flex flex-col justify-center gap-0 z-20">
          <span className="font-body text-[13px] uppercase tracking-[0.1em] text-[#1a1a1a] opacity-60 mb-[16px] block">THE CREATOR</span>
          <h2 className="font-heading text-[clamp(3.5rem,6vw,7rem)] leading-[0.95] text-[#1a1a1a] m-0 mb-[28px]">ONE MIND.<br />ALL OF IT.</h2>
          <p className="font-body text-[16px] text-[#1a1a1a] opacity-60 leading-[1.65] max-w-[380px] mb-[36px]">
            Not a team. Not an agency.<br />
            Just one person obsessed with<br />
            making things look extraordinary.
          </p>
          <div className="swap-dots flex gap-[10px] items-center">
            <span className="swap-dot active w-[9px] h-[9px] rounded-full border-[1.5px] border-[rgba(26,26,26,0.3)] bg-transparent transition-colors duration-300"></span>
            <span className="swap-dot w-[9px] h-[9px] rounded-full border-[1.5px] border-[rgba(26,26,26,0.3)] bg-transparent transition-colors duration-300"></span>
            <span className="swap-dot w-[9px] h-[9px] rounded-full border-[1.5px] border-[rgba(26,26,26,0.3)] bg-transparent transition-colors duration-300"></span>
            <span className="swap-dot w-[9px] h-[9px] rounded-full border-[1.5px] border-[rgba(26,26,26,0.3)] bg-transparent transition-colors duration-300"></span>
            <span className="swap-dot w-[9px] h-[9px] rounded-full border-[1.5px] border-[rgba(26,26,26,0.3)] bg-transparent transition-colors duration-300"></span>
          </div>
          <div className="font-body text-[12px] text-[#1a1a1a] opacity-40 tracking-[0.2em] uppercase mt-[20px]">
            PUNE, INDIA · EST. 2021
          </div>
        </div>

        {/* Right Block - 58% */}
        <div className="flex-[0_0_58%] relative h-[520px] flex items-center justify-end">
          <div className="cardswap-stage relative w-[576px] h-[480px] cursor-pointer">

            {/* Card 1 */}
            <div className="swap-card absolute bottom-0 left-0 w-[480px] h-[340px] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col border border-[rgba(255,255,255,0.15)] bg-[#1C2318]">
              <div className="h-[40px] w-full flex items-center px-[16px] gap-[8px] bg-[#243020] rounded-t-[14px] shrink-0">
                <span className="text-[13px] leading-none text-[#C8F135]">●</span>
                <span className="font-body text-[14px] font-medium text-[#C8F135]">Designer</span>
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                <span className="absolute font-heading text-[9rem] leading-none text-[#C8F135] opacity-10 select-none">01</span>
                <span className="relative font-heading text-[2.6rem] leading-none text-[#C8F135] z-10 tracking-[0.04em]">BORN TO CREATE</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="swap-card absolute bottom-0 left-0 w-[480px] h-[340px] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col border border-[rgba(0,0,0,0.08)] bg-[#F0EDE6]">
              <div className="h-[40px] w-full flex items-center px-[16px] gap-[8px] bg-[#E4E0D8] rounded-t-[14px] shrink-0">
                <span className="text-[13px] leading-none text-[#1C2318]">≡</span>
                <span className="font-body text-[14px] font-medium text-[#1C2318]">Editor</span>
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                <span className="absolute font-heading text-[9rem] leading-none text-[#1C2318] opacity-10 select-none">02</span>
                <span className="relative font-heading text-[2.6rem] leading-none text-[#1C2318] z-10 tracking-[0.04em]">CUTS THAT HIT</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="swap-card absolute bottom-0 left-0 w-[480px] h-[340px] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col border border-[rgba(0,0,0,0.08)] bg-[#C8F135]">
              <div className="h-[40px] w-full flex items-center px-[16px] gap-[8px] bg-[#b8de2a] rounded-t-[14px] shrink-0">
                <span className="text-[13px] leading-none text-[#1C2318]">✦</span>
                <span className="font-body text-[14px] font-medium text-[#1C2318]">Animator</span>
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                <span className="absolute font-heading text-[9rem] leading-none text-[#1C2318] opacity-10 select-none">03</span>
                <span className="relative font-heading text-[2.6rem] leading-none text-[#1C2318] z-10 tracking-[0.04em]">FRAMES IN MOTION</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="swap-card absolute bottom-0 left-0 w-[480px] h-[340px] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col border border-[rgba(255,255,255,0.15)] bg-[#FF6B47]">
              <div className="h-[40px] w-full flex items-center px-[16px] gap-[8px] bg-[#e85a38] rounded-t-[14px] shrink-0">
                <span className="text-[13px] leading-none text-[#F0EDE6]">◈</span>
                <span className="font-body text-[14px] font-medium text-[#F0EDE6]">Strategist</span>
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                <span className="absolute font-heading text-[9rem] leading-none text-[#F0EDE6] opacity-10 select-none">04</span>
                <span className="relative font-heading text-[2.6rem] leading-none text-[#F0EDE6] z-10 tracking-[0.04em]">VISION FIRST</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="swap-card absolute bottom-0 left-0 w-[480px] h-[340px] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col border border-[rgba(255,255,255,0.15)] bg-[#0f1a0c]">
              <div className="h-[40px] w-full flex items-center px-[16px] gap-[8px] bg-[#162310] rounded-t-[14px] shrink-0">
                <span className="text-[13px] leading-none text-[#C8F135]">◉</span>
                <span className="font-body text-[14px] font-medium text-[#C8F135]">Kagetsu Studio</span>
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                <span className="absolute font-heading text-[9rem] leading-none text-[#C8F135] opacity-10 select-none">05</span>
                <span className="relative font-heading text-[2.6rem] leading-none text-[#C8F135] z-10 tracking-[0.04em]">ONE PERSON. ALL IN.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}