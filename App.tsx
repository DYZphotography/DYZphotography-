import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Portfolio from '@/sections/Portfolio';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import './App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-black z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Hidden admin access note - only visible in HTML source */}
      {/* Admin Portal: /admin.html */}
    </div>
  );
}

export default App;
