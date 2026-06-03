import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

type MediaItem = {
  id: number;
  type: 'image' | 'youtube';
  src?: string;
  videoId?: string;
  category: string;
  alt: string;
};

const mediaItems: MediaItem[] = [
  { id: 4, type: 'image', src: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/skin-treatment.jpg', category: 'Facilities', alt: 'Hospital Entrance' },
  { id: 5, type: 'image', src: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/consultation-room.jpg', category: 'Facilities', alt: 'Consultation Room' },
  { id: 6, type: 'image', src: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/herbal-garden-1.jpg', category: 'Herbal Garden', alt: 'Ayurvedic Herbs' },
  { id: 7, type: 'image', src: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/herbal-garden-2.jpg', category: 'Herbal Garden', alt: 'Drying Herbs' },
  { id: 8, type: 'image', src: 'https://res.cloudinary.com/dhqtquwxc/image/upload/f_auto,q_auto/v1/vaidhyarmandhiram/images/spine-joint.jpg', category: 'Treatment Rooms', alt: 'Therapy Session' },
  // New Video Testimonials
  { id: 9, type: 'youtube', videoId: 'VltfB00alJg', category: 'Patient Testimonials', alt: 'Healing Experience' },
  { id: 10, type: 'youtube', videoId: 'jNgmz0PGPVc', category: 'Patient Testimonials', alt: 'Ayurvedic Journey' },
  { id: 11, type: 'youtube', videoId: 'eK7D6LQwX_4', category: 'Patient Testimonials', alt: 'Recovery Story' },
  { id: 12, type: 'youtube', videoId: 'j8JlkBjIkHg', category: 'Patient Testimonials', alt: 'Wellness Success' },
  { id: 13, type: 'youtube', videoId: 'Q3t8v3URZpY', category: 'Patient Testimonials', alt: 'Panchakarma Results' },
  { id: 14, type: 'youtube', videoId: 'fyJSd0Ad720', category: 'Patient Testimonials', alt: 'Patient Review' },
  { id: 15, type: 'youtube', videoId: 'ZbXsrEDkbiQ', category: 'Patient Testimonials', alt: 'Joint Pain Relief' },
  { id: 16, type: 'youtube', videoId: 'IyyYZOcOkAM', category: 'Patient Testimonials', alt: 'Health Transformation' },
  { id: 17, type: 'youtube', videoId: 'DcuYFXvicm4', category: 'Patient Testimonials', alt: 'Vaidyarmandiram Testimonial' },
  // Homepage Testimonials
  { id: 18, type: 'youtube', videoId: 'UTZ7tBpqD9s', category: 'Patient Testimonials', alt: 'Mrs. Lateesha Testimonial' },
  { id: 19, type: 'youtube', videoId: 'OKdHB708p6I', category: 'Patient Testimonials', alt: 'Nikhi Testimonial' },
  { id: 20, type: 'youtube', videoId: 's-ehW3aamw0', category: 'Patient Testimonials', alt: 'Mrs. Bismi Testimonial' },
  { id: 21, type: 'youtube', videoId: 'tpC90rfXm4I', category: 'Patient Testimonials', alt: 'Ms. Reshmi Testimonial' },
  { id: 22, type: 'youtube', videoId: 'AJtjtI7SkQA', category: 'Patient Testimonials', alt: 'Mrs. Jyothi Testimonial' },
  { id: 23, type: 'youtube', videoId: 's0l83M4YfiU', category: 'Patient Testimonials', alt: 'Al Sila Testimonial' },
  { id: 24, type: 'youtube', videoId: 'obJ0o76Clm0', category: 'Patient Testimonials', alt: 'Simi Testimonial' },
  { id: 25, type: 'youtube', videoId: 'hFZLc__xZRM', category: 'Patient Testimonials', alt: 'Miss Athira Testimonial' },
  { id: 26, type: 'youtube', videoId: 'SkjO74mjr1A', category: 'Patient Testimonials', alt: 'Husna Safeer Testimonial' },
];

const categories = ['All', 'Treatment Rooms', 'Herbal Garden', 'Facilities', 'Patient Wellness', 'Patient Testimonials'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = filter === 'All' ? mediaItems : mediaItems.filter(img => img.category === filter);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
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
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
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
                  src={item.type === 'youtube' ? `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` : item.src} 
                  alt={item.alt} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {item.type === 'youtube' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-4 text-white">
                      <Play fill="white" size={32} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <span className="text-white text-lg border border-white/50 px-6 py-2">
                    {item.type === 'youtube' ? 'Watch Video' : 'View Full Size'}
                  </span>
                  <span className="text-white text-sm font-bold uppercase tracking-wider">{item.alt}</span>
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
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full flex flex-col items-center justify-center h-full"
            >
              {filteredItems[selectedImage].type === 'youtube' ? (
                <div className="w-full max-w-lg mx-auto aspect-[9/16] relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe 
                    src={`https://www.youtube.com/embed/${filteredItems[selectedImage].videoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                <img 
                  src={filteredItems[selectedImage].src} 
                  alt={filteredItems[selectedImage].alt} 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              )}
              
              <div className="mt-6 text-center text-white space-y-2">
                <p className="text-2xl">{filteredItems[selectedImage].alt}</p>
                <p className="text-accent-gold font-sans uppercase tracking-[0.2em] text-sm">
                  {filteredItems[selectedImage].category}
                </p>
              </div>
            </motion.div>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
