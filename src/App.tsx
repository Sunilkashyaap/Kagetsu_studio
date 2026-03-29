/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplitSection from './components/SplitSection';
import WorkGallery from './components/WorkGallery';
import About from './components/About';
import SkillsMarquee from './components/SkillsMarquee';
import Services from './components/Services';
import SocialFan from './components/SocialFan';
import Footer from './components/Footer';

// @ts-ignore
import songMp3 from '../imh/song.mp3';

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => { });
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };
  return (
    <div className="relative w-full min-h-screen selection:bg-lime selection:text-ink">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <SkillsMarquee />
        <SplitSection />
        <WorkGallery />
        <About />
        <Services />
        <SocialFan />
      </main>

      <Footer />

      <audio
        ref={audioRef}
        src={songMp3}
        loop
        muted
        autoPlay
        playsInline
      />
      <button
        onClick={toggleMute}
        className={`music-btn ${isMuted ? 'muted' : ''}`}
        aria-label="Toggle Background Music"
      >
        <svg className="music-btn-icon" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Speaker body */}
          <rect x="0" y="5" width="4" height="6" fill="currentColor" />
          {/* Speaker cone */}
          <polygon points="4,5 9,1 9,15 4,11" fill="currentColor" />
          {/* Sound waves (unmuted) */}
          <g className="music-btn-waves">
            <rect className="music-btn-wave" x="11" y="5" width="2" height="6" fill="currentColor" style={{ animationDelay: '0s' }} />
            <rect className="music-btn-wave" x="14" y="3" width="2" height="10" fill="currentColor" style={{ animationDelay: '0.2s' }} />
            <rect className="music-btn-wave" x="17" y="1" width="2" height="14" fill="currentColor" style={{ animationDelay: '0.4s' }} />
          </g>
          {/* X icon (muted) */}
          <g className="music-btn-x">
            <rect x="11" y="3" width="2" height="14" fill="#FF6B47" transform="rotate(-45 16 8)" />
            <rect x="11" y="3" width="2" height="14" fill="#FF6B47" transform="rotate(45 16 8)" />
          </g>
        </svg>
        <span className="music-btn-label">
          {isMuted ? 'MUSIC OFF' : 'MUSIC ON'}
        </span>
      </button>
    </div>
  );
}
