import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/data/content';
import type { Service } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [content, setContent] = useState({
    headline: 'What I Offer',
    subheadline: 'Professional photography services tailored to capture your most precious moments with artistry and care.',
  });

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.services) {
          setContent(prev => ({ ...prev, ...parsed.services }));
        }
      } catch (e) {
        console.error('Failed to load services content');
      }
    }
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {content.headline}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Price Tag */}
                {service.price && (
                  <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
                    {service.price}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-neutral-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Features Preview */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 bg-black text-white py-3 text-sm font-medium flex items-center justify-center gap-2 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                  <motion.button
                    onClick={scrollToContact}
                    className="px-4 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <div className="relative aspect-video overflow-hidden -mx-6 -mt-6 mb-6">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl">
                      {selectedService.title}
                    </DialogTitle>
                    {selectedService.price && (
                      <p className="text-white/90 font-semibold">{selectedService.price}</p>
                    )}
                  </DialogHeader>
                </div>
              </div>

              <DialogDescription className="text-neutral-600 leading-relaxed mb-6">
                {selectedService.description}
              </DialogDescription>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">What's Included:</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    setSelectedService(null);
                    scrollToContact();
                  }}
                  className="flex-1 bg-black text-white py-3 text-sm font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
