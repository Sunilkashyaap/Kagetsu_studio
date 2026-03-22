import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const scriptTweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerRef.current || !navItemsRef.current) return;

    if (isDrawerOpen) {
      gsap.to(drawerRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: 'expo.inOut',
        transformOrigin: 'top',
      });
      gsap.fromTo(
        navItemsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );

      scriptTweensRef.current = [
        gsap.to(".drawer-script", { y: -8, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(".drawer-script", { skewX: 2, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 }),
        gsap.to(".drawer-script", { color: "#d4ff4a", duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 })
      ];
    } else {
      gsap.to(drawerRef.current, {
        scaleY: 0,
        duration: 0.6,
        ease: 'expo.inOut',
        transformOrigin: 'top',
      });

      scriptTweensRef.current.forEach(tween => tween.kill());
      scriptTweensRef.current = [];
      gsap.set(".drawer-script", { y: 0, skewX: 0, color: "#C8F135" });
    }
  }, [isDrawerOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
          isScrolled ? 'bg-cream/90 backdrop-blur-md border-b border-ink/10 py-4' : 'bg-transparent py-6'
        } px-6 md:px-12 flex justify-between items-center`}
      >
        <div className="font-display font-bold text-2xl leading-none tracking-tighter">
          KAG<br />ETSU
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => (window as any).openModal()} className="hidden md:flex items-center gap-2 bg-lime text-ink px-6 py-2 rounded-full font-heading text-xl tracking-wider hover:bg-ink hover:text-lime transition-colors">
            ✦ HIRE ME &rarr;
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-ink/10 rounded-full transition-colors"
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Full Screen Drawer */}
      <div
        id="nav-drawer"
        ref={drawerRef}
        className="fixed inset-0 bg-dark z-50 scale-y-0 origin-top flex flex-col"
      >
        <div className="flex justify-between items-center p-6 md:p-12">
          <div className="font-display font-bold text-2xl leading-none tracking-tighter text-cream">
            KAG<br />ETSU
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-cream hover:bg-cream/10 rounded-full transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 items-center px-6 md:px-24 relative"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <div className="flex flex-col justify-center z-10">
            <ul ref={navItemsRef} className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id === 'CONTACT' ? '#' : `#${item.id.toLowerCase()}`}
                    onClick={(e) => {
                      if (item.id === 'CONTACT') {
                        e.preventDefault();
                        (window as any).openModal();
                      }
                      setIsDrawerOpen(false);
                    }}
                    className="font-heading text-6xl md:text-8xl text-cream hover:text-lime transition-colors block w-fit"
                  >
                    {item.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Decorative Signature */}
          <div className="flex items-center justify-center pointer-events-none opacity-20 md:opacity-100 z-10">
            <span className="drawer-script font-script text-lime text-[15vw] -rotate-12 select-none inline-block">
              Kagetsu
            </span>
          </div>

          <div className="flex flex-col justify-center md:items-end z-10">
            <div className="flex flex-col items-end text-cream space-y-2">
              {socialLinks.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener" className="block font-heading text-[clamp(2rem,3.5vw,3.2rem)] hover:text-lime transition-colors text-right leading-none">
                  {item.id}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
