import type { GalleryImage, Service, Testimonial, NavItem, PhotoCategory } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const photoCategories: PhotoCategory[] = [
  { id: 'all', label: 'All Work', icon: 'Grid3X3' },
  { id: 'wedding', label: 'Wedding', icon: 'Heart' },
  { id: 'portrait', label: 'Portrait', icon: 'User' },
  { id: 'family', label: 'Family', icon: 'Users' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'Sun' },
  { id: 'sports', label: 'Sports', icon: 'Trophy' },
  { id: 'event', label: 'Events', icon: 'Calendar' },
  { id: 'graduation', label: 'Graduation', icon: 'GraduationCap' },
];

// Get saved images from localStorage
export const getGalleryImages = (): GalleryImage[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('galleryImages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved images');
      }
    }
  }
  return defaultGalleryImages;
};

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/wedding-couple-1.jpg',
    alt: 'Wedding couple in golden field',
    category: 'wedding',
    title: 'Eternal Love',
    description: 'A beautiful wedding moment captured at sunset',
  },
  {
    id: '2',
    src: '/images/about-portrait.jpg',
    alt: 'Portrait photography',
    category: 'portrait',
    title: 'Behind the Lens',
    description: 'The artist at work',
  },
  {
    id: '3',
    src: '/images/portrait-session.jpg',
    alt: 'Professional portrait',
    category: 'portrait',
    title: 'Professional Elegance',
    description: 'Corporate headshot session',
  },
  {
    id: '4',
    src: '/images/sports-photography.jpg',
    alt: 'Sports action shot',
    category: 'sports',
    title: 'Peak Performance',
    description: 'Capturing the intensity of the game',
  },
  {
    id: '5',
    src: '/images/family-photography.jpg',
    alt: 'Family portrait',
    category: 'family',
    title: 'Family Bonds',
    description: 'Cherished family moments',
  },
  {
    id: '6',
    src: '/images/graduation-photography.jpg',
    alt: 'Graduation photo',
    category: 'graduation',
    title: 'Achievement Unlocked',
    description: 'Celebrating academic success',
  },
  {
    id: '7',
    src: '/images/lifestyle-photography.jpg',
    alt: 'Lifestyle photography',
    category: 'lifestyle',
    title: 'Morning Serenity',
    description: 'Peaceful moments by the sea',
  },
  {
    id: '8',
    src: '/images/event-coverage.jpg',
    alt: 'Event photography',
    category: 'event',
    title: 'Gala Evening',
    description: 'Elegant corporate event coverage',
  },
  {
    id: '9',
    src: '/images/wedding-detail.jpg',
    alt: 'Wedding details',
    category: 'wedding',
    title: 'Delicate Details',
    description: 'Beautiful wedding bouquet',
  },
  {
    id: '10',
    src: '/images/newborn-photography.jpg',
    alt: 'Newborn photography',
    category: 'family',
    title: 'New Beginnings',
    description: 'Welcoming new life',
  },
  {
    id: '11',
    src: '/images/engagement-photography.jpg',
    alt: 'Engagement photo',
    category: 'wedding',
    title: 'Promise of Forever',
    description: 'Sunflower field engagement',
  },
  {
    id: '12',
    src: '/images/maternity-photography.jpg',
    alt: 'Maternity photography',
    category: 'family',
    title: 'Expecting Joy',
    description: 'Beautiful maternity session',
  },
];

// For initial load, use default images
export const galleryImages = defaultGalleryImages;

export const services: Service[] = [
  {
    id: '1',
    title: 'Wedding Photography',
    description: 'Capturing the magic of your special day with elegant, timeless photographs that tell your unique love story. From intimate ceremonies to grand celebrations, every moment is preserved with artistry.',
    features: [
      'Full-day coverage',
      'Engagement session included',
      'Professional editing & retouching',
      'Online gallery for sharing',
      'High-resolution digital files',
      'Optional photo album',
    ],
    image: '/images/wedding-couple-1.jpg',
    price: 'Starting at $2,500',
  },
  {
    id: '2',
    title: 'Portrait Sessions',
    description: 'Professional portraits that showcase your personality, whether for personal branding, family memories, or creative expression. Studio or on-location options available.',
    features: [
      'Studio or outdoor location',
      'Wardrobe consultation',
      'Professional retouching',
      'Print packages available',
      'Quick turnaround time',
      'Multiple outfit changes',
    ],
    image: '/images/portrait-session.jpg',
    price: 'Starting at $350',
  },
  {
    id: '3',
    title: 'Event Coverage',
    description: 'From corporate gatherings to milestone celebrations, I document every important moment with discretion and artistry. Your event story told through stunning imagery.',
    features: [
      'Candid & posed coverage',
      'Quick turnaround time',
      'Highlight reel available',
      'Social media ready images',
      'Full gallery delivery',
      'Second shooter option',
    ],
    image: '/images/event-coverage.jpg',
    price: 'Starting at $800',
  },
  {
    id: '4',
    title: 'Family Photography',
    description: 'Preserve your family\'s precious moments with beautiful, natural photographs that capture the love and connection you share. Perfect for annual portraits or special occasions.',
    features: [
      'Outdoor or studio sessions',
      'Relaxed, fun atmosphere',
      'Kids & pets welcome',
      'Group & individual shots',
      'Holiday card packages',
      'Wall art options',
    ],
    image: '/images/family-photography.jpg',
    price: 'Starting at $450',
  },
  {
    id: '5',
    title: 'Lifestyle Photography',
    description: 'Authentic, storytelling photography that captures the essence of your everyday life. Perfect for brands, influencers, or anyone wanting to document their unique story.',
    features: [
      'Location scouting',
      'Styling guidance',
      'Natural light expertise',
      'Editorial quality',
      'Commercial licensing',
      'Quick delivery',
    ],
    image: '/images/lifestyle-photography.jpg',
    price: 'Starting at $600',
  },
  {
    id: '6',
    title: 'Sports Photography',
    description: 'Dynamic action shots that capture the intensity, emotion, and athleticism of sports. From individual athletes to team coverage, every moment of excellence is preserved.',
    features: [
      'Fast-action capture',
      'Team & individual shots',
      'Game day coverage',
      'High-speed photography',
      'Professional equipment',
      'Quick turnaround',
    ],
    image: '/images/sports-photography.jpg',
    price: 'Starting at $500',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Michael',
    event: 'Wedding Photography',
    quote: 'Absolutely stunning photos! She captured our wedding day perfectly, and every image tells a story. We couldn\'t be happier with the results. The attention to detail and the way she captured the emotions was incredible.',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '2',
    name: 'Jennifer Adams',
    event: 'Portrait Session',
    quote: 'Professional, creative, and a joy to work with. The portraits exceeded my expectations, and I\'ve received so many compliments. She made me feel comfortable and confident throughout the entire session.',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '3',
    name: 'David Chen',
    event: 'Corporate Event',
    quote: 'The event coverage was exceptional. Every important moment was captured beautifully, and the turnaround time was impressive. Our company will definitely be working with her again for future events.',
    image: '/images/testimonial-3.jpg',
  },
];

// Dynamic content that can be edited via admin
export const getAboutContent = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
  const parsed = saved ? JSON.parse(saved) : null;
  return {
    headline: parsed?.about?.headline || 'About Me',
    subheadline: parsed?.about?.subheadline || 'Passionate Photographer & Visual Storyteller',
    description: parsed?.about?.description || `With over 10 years of experience capturing life's most precious moments, I've developed a style that blends candid emotion with artistic composition. Every photograph tells a story, and I'm honored to help preserve your most cherished memories.

My journey began with a simple love for capturing authentic moments. Over the years, I've had the privilege of documenting hundreds of weddings, portraits, and special events. Each session is a unique opportunity to create something beautiful and timeless.

I believe that the best photographs come from genuine connections. That's why I take the time to understand your vision and make you feel comfortable in front of the camera. The result? Natural, stunning images that you'll treasure forever.`,
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '500+', label: 'Happy Clients' },
      { value: '50+', label: 'Awards Won' },
      { value: '10K+', label: 'Photos Delivered' },
    ],
  };
};

export const aboutContent = getAboutContent();

export const getContactInfo = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
  const parsed = saved ? JSON.parse(saved) : null;
  return {
    email: parsed?.contact?.email || 'hello@photographer.com',
    phone: parsed?.contact?.phone || '+1 (555) 123-4567',
    location: parsed?.contact?.location || 'New York, NY',
    social: {
      instagram: parsed?.contact?.social?.instagram || 'https://instagram.com',
      facebook: parsed?.contact?.social?.facebook || 'https://facebook.com',
      pinterest: parsed?.contact?.social?.pinterest || 'https://pinterest.com',
    },
    hours: parsed?.contact?.hours || 'Monday - Friday: 9AM - 6PM',
  };
};

export const contactInfo = getContactInfo();

export const getHeroContent = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
  const parsed = saved ? JSON.parse(saved) : null;
  return {
    headline: parsed?.hero?.headline || "Capturing Life's Precious Moments",
    subheadline: parsed?.hero?.subheadline || 'Professional Photography Services',
    description: parsed?.hero?.description || 'Wedding, Portrait, Family & Event Photography',
    ctaPrimary: parsed?.hero?.ctaPrimary || 'View Portfolio',
    ctaSecondary: parsed?.hero?.ctaSecondary || 'Book a Session',
  };
};

export const heroContent = getHeroContent();

export const getServicesContent = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
  const parsed = saved ? JSON.parse(saved) : null;
  return {
    headline: parsed?.services?.headline || 'What I Offer',
    subheadline: parsed?.services?.subheadline || 'Professional photography services tailored to capture your most precious moments with artistry and care.',
  };
};

export const servicesContent = getServicesContent();

export const getFooterContent = () => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('siteContent') : null;
  const parsed = saved ? JSON.parse(saved) : null;
  return {
    brandName: parsed?.footer?.brandName || 'LENS',
    tagline: parsed?.footer?.tagline || 'Capturing moments, creating memories',
  };
};

export const footerContent = getFooterContent();
