import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState({
    headline: "Capturing Life's Precious Moments",
    subheadline: 'Professional Photography Services',
    description: 'Wedding, Portrait, Family & Event Photography',
    ctaPrimary: 'View Portfolio',
    ctaSecondary: 'Book a Session',
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);
    // Load saved content
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.hero) {
          setContent(prev => ({ ...prev, ...parsed.hero }));
        }
      } catch (e) {
        console.error('Failed to load hero content');
      }
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />
        <img
          src="/images/hero-photographer.jpg"
          alt="Photographer in golden field"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-30 h-full flex items-center"
        style={{ opacity }}
      >
        <div className="section-padding w-full">
          <div className="max-w-3xl">
            {/* Headline */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ y: 100, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {content.headline.split(' ').map((word, index) => (
                  <span key={index} className="inline-block mr-4">
                    {word}
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 font-light"
              initial={{ y: 30, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.subheadline}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-white/70 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {content.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={() => scrollToSection('#portfolio')}
                className="group bg-white text-black px-8 py-4 font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="group border-2 border-white text-white px-8 py-4 font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white hover:text-black"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                {content.ctaSecondary}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
