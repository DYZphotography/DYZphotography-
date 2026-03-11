import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { navItems } from '@/data/content';

export default function Footer() {
  const [content, setContent] = useState({
    brandName: 'LENS',
    tagline: 'Capturing moments, creating memories',
  });

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.footer) {
          setContent(prev => ({ ...prev, ...parsed.footer }));
        }
      } catch (e) {
        console.error('Failed to load footer content');
      }
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8" />
              <span className="font-bold text-xl tracking-wider font-['Montserrat']">
                {content.brandName}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {content.tagline}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-block hover:translate-x-1 transition-transform"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Wedding Photography',
                'Portrait Sessions',
                'Family Photography',
                'Event Coverage',
                'Lifestyle Photography',
                'Sports Photography',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="text-white/60 hover:text-white transition-colors text-sm inline-block hover:translate-x-1 transition-transform"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to receive updates on new galleries and special offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} {content.brandName} Photography. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group"
            whileHover={{ y: -2 }}
          >
            Back to top
            <span className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUp className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
