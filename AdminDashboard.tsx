import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Trash2, Edit, Plus, Image as ImageIcon, 
  Save, Check, AlertCircle, Settings, LogOut,
  Search, FileText, Phone, User, Briefcase, Home, Type
} from 'lucide-react';
import { galleryImages, photoCategories } from '@/data/content';
import type { GalleryImage } from '@/types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Default content configuration
const defaultContent = {
  hero: {
    headline: "Capturing Life's Precious Moments",
    subheadline: "Professional Photography Services",
    description: "Wedding, Portrait, Family & Event Photography",
    ctaPrimary: "View Portfolio",
    ctaSecondary: "Book a Session",
  },
  about: {
    headline: "About Me",
    subheadline: "Passionate Photographer & Visual Storyteller",
    description: `With over 10 years of experience capturing life's most precious moments, I've developed a style that blends candid emotion with artistic composition. Every photograph tells a story, and I'm honored to help preserve your most cherished memories.

My journey began with a simple love for capturing authentic moments. Over the years, I've had the privilege of documenting hundreds of weddings, portraits, and special events. Each session is a unique opportunity to create something beautiful and timeless.

I believe that the best photographs come from genuine connections. That's why I take the time to understand your vision and make you feel comfortable in front of the camera. The result? Natural, stunning images that you'll treasure forever.`,
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '500+', label: 'Happy Clients' },
      { value: '50+', label: 'Awards Won' },
      { value: '10K+', label: 'Photos Delivered' },
    ],
  },
  contact: {
    email: 'hello@photographer.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    hours: 'Monday - Friday: 9AM - 6PM',
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      pinterest: 'https://pinterest.com',
    },
  },
  services: {
    headline: "What I Offer",
    subheadline: "Professional photography services tailored to capture your most precious moments with artistry and care.",
  },
  testimonials: {
    headline: "What Clients Say",
  },
  footer: {
    brandName: "LENS",
    tagline: "Capturing moments, creating memories",
  },
};

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'content'>('gallery');
  const [images, setImages] = useState<GalleryImage[]>(galleryImages);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Content editing state
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });
  const [editingContentSection, setEditingContentSection] = useState<string | null>(null);

  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    title: '',
    description: '',
    category: 'wedding',
    alt: '',
  });

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (e) {
        console.error('Failed to load saved images');
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }, [images]);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredImages = images.filter(img => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         img.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageObj: GalleryImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          src: event.target?.result as string,
          alt: file.name,
          category: 'wedding',
          title: file.name.split('.')[0],
          description: '',
        };
        setImages(prev => [newImageObj, ...prev]);
        setIsUploading(false);
        showNotification('success', 'Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== id));
      showNotification('success', 'Image deleted successfully!');
    }
  };

  const handleUpdateImage = (updatedImage: GalleryImage) => {
    setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
    setEditingImage(null);
    showNotification('success', 'Image updated successfully!');
  };

  const handleAddImage = () => {
    if (!newImage.title || !newImage.src) {
      showNotification('error', 'Please fill in all required fields');
      return;
    }

    const imageToAdd: GalleryImage = {
      id: Date.now().toString(),
      src: newImage.src as string,
      alt: newImage.alt || newImage.title || '',
      category: (newImage.category as any) || 'wedding',
      title: newImage.title || '',
      description: newImage.description || '',
    };

    setImages(prev => [imageToAdd, ...prev]);
    setShowAddModal(false);
    setNewImage({ title: '', description: '', category: 'wedding', alt: '' });
    showNotification('success', 'Image added successfully!');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setIsUploading(true);
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newImageObj: GalleryImage = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              src: event.target?.result as string,
              alt: file.name,
              category: 'wedding',
              title: file.name.split('.')[0],
              description: '',
            };
            setImages(prev => [newImageObj, ...prev]);
          };
          reader.readAsDataURL(file);
        }
      });
      setIsUploading(false);
      showNotification('success', 'Images uploaded successfully!');
    }
  };

  const handleSaveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    showNotification('success', 'Content saved successfully! Refresh the page to see changes.');
    setEditingContentSection(null);
  };

  const handleResetContent = () => {
    if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      setContent(defaultContent);
      localStorage.setItem('siteContent', JSON.stringify(defaultContent));
      showNotification('success', 'Content reset to default!');
    }
  };

  const updateContentField = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-neutral-50"
    >
      {/* Header */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Settings className="w-6 h-6" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60 hidden sm:inline">Manage your website</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-[110] flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-neutral-200 flex flex-col">
          {/* Tabs */}
          <div className="p-4 border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-2 ${
                activeTab === 'gallery'
                  ? 'bg-black text-white'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-black text-white'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              Edit Content
            </button>
          </div>

          {/* Sidebar Content based on active tab */}
          {activeTab === 'gallery' && (
            <div className="flex-1 overflow-auto p-4">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Quick Stats
                </h3>
                <div className="space-y-2">
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xl font-bold">{images.length}</p>
                    <p className="text-xs text-neutral-500">Total Images</p>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-xl font-bold">{photoCategories.length - 1}</p>
                    <p className="text-xs text-neutral-500">Categories</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {photoCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-black text-white'
                          : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="flex-1 overflow-auto p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Sections
                </h3>
                <div className="space-y-1">
                  {[
                    { id: 'hero', label: 'Hero Section', icon: Home },
                    { id: 'about', label: 'About Section', icon: User },
                    { id: 'services', label: 'Services Section', icon: Briefcase },
                    { id: 'contact', label: 'Contact Info', icon: Phone },
                    { id: 'footer', label: 'Footer', icon: Type },
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setEditingContentSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        editingContentSection === section.id
                          ? 'bg-black text-white'
                          : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleResetContent}
                className="w-full mt-4 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                Reset to Default
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'gallery' && (
            <>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    <Upload className="w-5 h-5" />
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    URL
                  </button>
                </div>
              </div>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-neutral-300 rounded-lg p-8 mb-6 text-center hover:border-black transition-colors"
              >
                <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600 mb-1">Drag and drop images here</p>
                <p className="text-sm text-neutral-400">or click the upload button</p>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingImage(image)}
                          className="p-2 bg-white rounded-lg hover:bg-neutral-100 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm truncate">{image.title}</p>
                      <p className="text-xs text-neutral-500 capitalize">{image.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">No images found</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'content' && (
            <>
              {!editingContentSection ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="w-16 h-16 text-neutral-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Edit Website Content</h3>
                  <p className="text-neutral-500 max-w-md">
                    Select a section from the sidebar to edit text content, contact information, and more.
                  </p>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold capitalize">
                      {editingContentSection} Section
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveContent}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingContentSection(null)}
                        className="px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Hero Section Editor */}
                  {editingContentSection === 'hero' && (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                      <div>
                        <label className="block text-sm font-medium mb-2">Headline</label>
                        <input
                          type="text"
                          value={content.hero.headline}
                          onChange={(e) => updateContentField('hero', 'headline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subheadline</label>
                        <input
                          type="text"
                          value={content.hero.subheadline}
                          onChange={(e) => updateContentField('hero', 'subheadline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <input
                          type="text"
                          value={content.hero.description}
                          onChange={(e) => updateContentField('hero', 'description', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Primary Button</label>
                          <input
                            type="text"
                            value={content.hero.ctaPrimary}
                            onChange={(e) => updateContentField('hero', 'ctaPrimary', e.target.value)}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Secondary Button</label>
                          <input
                            type="text"
                            value={content.hero.ctaSecondary}
                            onChange={(e) => updateContentField('hero', 'ctaSecondary', e.target.value)}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About Section Editor */}
                  {editingContentSection === 'about' && (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                      <div>
                        <label className="block text-sm font-medium mb-2">Headline</label>
                        <input
                          type="text"
                          value={content.about.headline}
                          onChange={(e) => updateContentField('about', 'headline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subheadline</label>
                        <input
                          type="text"
                          value={content.about.subheadline}
                          onChange={(e) => updateContentField('about', 'subheadline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={content.about.description}
                          onChange={(e) => updateContentField('about', 'description', e.target.value)}
                          rows={10}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none resize-none"
                        />
                        <p className="text-xs text-neutral-500 mt-1">Use line breaks to separate paragraphs</p>
                      </div>
                    </div>
                  )}

                  {/* Services Section Editor */}
                  {editingContentSection === 'services' && (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                      <div>
                        <label className="block text-sm font-medium mb-2">Headline</label>
                        <input
                          type="text"
                          value={content.services.headline}
                          onChange={(e) => updateContentField('services', 'headline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={content.services.subheadline}
                          onChange={(e) => updateContentField('services', 'subheadline', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Section Editor */}
                  {editingContentSection === 'contact' && (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          value={content.contact.email}
                          onChange={(e) => updateContentField('contact', 'email', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={content.contact.phone}
                          onChange={(e) => updateContentField('contact', 'phone', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={content.contact.location}
                          onChange={(e) => updateContentField('contact', 'location', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Hours</label>
                        <input
                          type="text"
                          value={content.contact.hours}
                          onChange={(e) => updateContentField('contact', 'hours', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div className="border-t border-neutral-200 pt-4 mt-4">
                        <h4 className="font-medium mb-3">Social Media Links</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-neutral-600 mb-1">Instagram</label>
                            <input
                              type="url"
                              value={content.contact.social.instagram}
                              onChange={(e) => updateContentField('contact', 'social', { ...content.contact.social, instagram: e.target.value })}
                              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-neutral-600 mb-1">Facebook</label>
                            <input
                              type="url"
                              value={content.contact.social.facebook}
                              onChange={(e) => updateContentField('contact', 'social', { ...content.contact.social, facebook: e.target.value })}
                              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-neutral-600 mb-1">Pinterest</label>
                            <input
                              type="url"
                              value={content.contact.social.pinterest}
                              onChange={(e) => updateContentField('contact', 'social', { ...content.contact.social, pinterest: e.target.value })}
                              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer Section Editor */}
                  {editingContentSection === 'footer' && (
                    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                      <div>
                        <label className="block text-sm font-medium mb-2">Brand Name</label>
                        <input
                          type="text"
                          value={content.footer.brandName}
                          onChange={(e) => updateContentField('footer', 'brandName', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tagline</label>
                        <input
                          type="text"
                          value={content.footer.tagline}
                          onChange={(e) => updateContentField('footer', 'tagline', e.target.value)}
                          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Edit Image Modal */}
      <AnimatePresence>
        {editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setEditingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Edit Image</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editingImage.description || ''}
                    onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={editingImage.category}
                    onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  >
                    {photoCategories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={editingImage.alt}
                    onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleUpdateImage(editingImage)}
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Image Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add Image from URL</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL *</label>
                  <input
                    type="url"
                    value={newImage.src || ''}
                    onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={newImage.title || ''}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newImage.description || ''}
                    onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value as GalleryImage['category'] })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  >
                    {photoCategories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddImage}
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
