import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Camera, Heart, Users } from 'lucide-react';

const icons = [Camera, Heart, Award, Users];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [content, setContent] = useState({
    headline: 'About Me',
    subheadline: 'Passionate Photographer & Visual Storyteller',
    description: `With over 10 years of experience capturing life's most precious moments, I've developed a style that blends candid emotion with artistic composition. Every photograph tells a story, and I'm honored to help preserve your most cherished memories.

My journey began with a simple love for capturing authentic moments. Over the years, I've had the privilege of documenting hundreds of weddings, portraits, and special events. Each session is a unique opportunity to create something beautiful and timeless.

I believe that the best photographs come from genuine connections. That's why I take the time to understand your vision and make you feel comfortable in front of the camera. The result? Natural, stunning images that you'll treasure forever.`,
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '500+', label: 'Happy Clients' },
      { value: '50+', label: 'Awards Won' },
      { value: '10K+', label: 'Photos Delivered' },
    ],
  });

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.about) {
          setContent(prev => ({ ...prev, ...parsed.about }));
        }
      } catch (e) {
        console.error('Failed to load about content');
      }
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                src="/images/about-portrait.jpg"
                alt="Photographer portrait"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-black text-white p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm text-white/80">Years Experience</p>
            </motion.div>

            {/* Decorative frame */}
            <motion.div
              className="absolute -top-4 -left-4 w-full h-full border-2 border-black/10 -z-10"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8">
            <motion.span
              className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {content.headline}
            </motion.span>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.subheadline}
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-black mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.div
              className="space-y-4 text-neutral-600 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {content.stats.map((stat, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex justify-center mb-2">
                      <Icon className="w-6 h-6 text-neutral-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-black">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-neutral-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
