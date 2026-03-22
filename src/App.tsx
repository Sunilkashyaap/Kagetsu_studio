/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplitSection from './components/SplitSection';
import WorkGallery from './components/WorkGallery';
import About from './components/About';
import Services from './components/Services';
import SocialFan from './components/SocialFan';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative w-full min-h-screen selection:bg-lime selection:text-ink">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <SplitSection />
        <WorkGallery />
        <About />
        <Services />
        <SocialFan />
      </main>

      <Footer />
    </div>
  );
}
