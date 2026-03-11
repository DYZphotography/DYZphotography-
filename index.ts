export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'wedding' | 'portrait' | 'sports' | 'lifestyle' | 'family' | 'graduation' | 'event' | 'all';
  title: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  message: string;
}

export interface PhotoCategory {
  id: string;
  label: string;
  icon: string;
}
