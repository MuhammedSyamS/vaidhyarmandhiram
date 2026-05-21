import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { id: 1, src: '/images/treatment-room-1.jpg', category: 'Treatment Rooms', alt: 'Panchakarma Treatment Room' },
  { id: 2, src: '/images/hero-bg.jpg', category: 'Treatment Rooms', alt: 'Abhyangam Session' },
  { id: 3, src: '/images/yoga-meditation.jpg', category: 'Patient Wellness', alt: 'Yoga and Meditation' },
  { id: 4, src: '/images/skin-treatment.jpg', category: 'Facilities', alt: 'Hospital Entrance' },
  { id: 5, src: '/images/consultation-room.jpg', category: 'Facilities', alt: 'Consultation Room' },
  { id: 6, src: '/images/herbal-garden-1.jpg', category: 'Herbal Garden', alt: 'Ayurvedic Herbs' },
  { id: 7, src: '/images/herbal-garden-2.jpg', category: 'Herbal Garden', alt: 'Drying Herbs' },
  { id: 8, src: '/images/spine-joint.jpg', category: 'Treatment Rooms', alt: 'Therapy Session' },
];

const categories = ['All', 'Treatment Rooms', 'Herbal Garden', 'Facilities', 'Patient Wellness'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="space-y-12">
      {/* Filter Buttons */}
      <div className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-4 pb-4 snap-x">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full border transition-all font-sans font-bold uppercase tracking-widest text-xs whitespace-nowrap snap-center ${
              filter === cat 
              ? 'bg-primary text-white border-primary shadow-lg' 
              : 'border-accent-gold/20 text-text-muted hover:border-accent-gold hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence>
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              <div 
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md border border-accent-gold/10"
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg border border-white/50 px-6 py-2">View Full Size</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
            >
              <img 
                src={filteredImages[selectedImage].src} 
                alt={filteredImages[selectedImage].alt} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center text-white space-y-2">
                <p className="text-2xl">{filteredImages[selectedImage].alt}</p>
                <p className="text-accent-gold font-sans uppercase tracking-[0.2em] text-sm">
                  {filteredImages[selectedImage].category}
                </p>
              </div>
            </motion.div>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
