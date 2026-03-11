import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, Clock, CheckCircle } from 'lucide-react';
import type { ContactFormData } from '@/types';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [content, setContent] = useState({
    email: 'hello@photographer.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    hours: 'Monday - Friday: 9AM - 6PM',
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      pinterest: 'https://pinterest.com',
    },
  });
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.contact) {
          setContent(prev => ({ ...prev, ...parsed.contact }));
        }
      } catch (e) {
        console.error('Failed to load contact content');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactDetails = [
    { icon: Mail, label: 'Email', value: content.email, href: `mailto:${content.email}` },
    { icon: Phone, label: 'Phone', value: content.phone, href: `tel:${content.phone}` },
    { icon: MapPin, label: 'Location', value: content.location, href: '#' },
    { icon: Clock, label: 'Hours', value: content.hours, href: '#' },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 lg:py-32 bg-white"
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
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Ready to capture your special moments? Let's discuss your vision and create something beautiful together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactDetails.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{item.label}</p>
                      <p className="font-medium group-hover:text-neutral-700 transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: content.social.instagram, label: 'Instagram' },
                  { icon: Facebook, href: content.social.facebook, label: 'Facebook' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#f5f5f5] p-6 sm:p-10">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-neutral-600">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type *</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-black focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select an option</option>
                        <option value="wedding">Wedding</option>
                        <option value="portrait">Portrait Session</option>
                        <option value="family">Family Photography</option>
                        <option value="event">Event Coverage</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-black focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your vision, date, location, and any special requests..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-black text-white py-4 font-semibold flex items-center justify-center gap-2 group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Send Message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
