import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid3X3, Heart, User, Users, Sun, Trophy, Calendar, GraduationCap } from 'lucide-react';
import { photoCategories, defaultGalleryImages } from '@/data/content';
import type { GalleryImage } from '@/types';

const iconMap: { [key: string]: React.ElementType } = {
  Grid3X3,
  Heart,
  User,
  Users,
  Sun,
  Trophy,
  Calendar,
  GraduationCap,
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages);

  // Load saved images from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('galleryImages');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved images');
      }
    }
  }, []);

  // Listen for storage changes (when admin updates images)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('galleryImages');
      if (saved) {
        try {
          setImages(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load saved images');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium tracking-widest text-neutral-500 uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My Work
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            A curated collection of moments captured through my lens. Each image tells a unique story.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {photoCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4"
                >
                  <motion.h3
                    className="text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    {image.title}
                  </motion.h3>
                  <p className="text-sm text-white/80 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {image.description}
                  </p>
                  <motion.span
                    className="mt-4 text-xs uppercase tracking-wider border border-white/50 px-4 py-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                  >
                    View
                  </motion.span>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Navigation */}
            <motion.button
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
            </motion.button>

            <motion.button
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
            </motion.button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
              
              {/* Image Info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-white/70 text-sm">{selectedImage.description}</p>
                <p className="text-white/50 text-xs mt-2 uppercase tracking-wider">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
