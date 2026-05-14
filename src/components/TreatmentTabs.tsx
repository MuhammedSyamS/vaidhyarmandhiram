import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'panchakarma', label: 'Panchakarma' },
  { id: 'rejuvenation', label: 'Rejuvenation' },
  { id: 'spine-joint', label: 'Spine & Joint' },
  { id: 'skin', label: 'Skin Care' },
  { id: 'specialised', label: 'Specialised' },
];

const treatments = {
  panchakarma: [
    { name: 'Vamana', desc: 'Therapeutic emesis for Kapha detoxification.', duration: '60-90 mins' },
    { name: 'Virechana', desc: 'Purgation therapy for Pitta related disorders.', duration: '45-60 mins' },
    { name: 'Basti', desc: 'Medicated enemas for Vata balancing.', duration: '30-45 mins' },
    { name: 'Nasya', desc: 'Nasal administration for head and neck health.', duration: '20-30 mins' },
    { name: 'Raktamokshana', desc: 'Controlled bloodletting for skin and blood purity.', duration: '45-60 mins' },
  ],
  rejuvenation: [
    { name: 'Abhyangam', desc: 'Full body herbal oil massage.', duration: '60 mins' },
    { name: 'Shirodhara', desc: 'Continuous stream of warm oil on forehead.', duration: '45 mins' },
    { name: 'Pizhichil', desc: 'Medicated oil bath for rejuvenation.', duration: '75 mins' },
  ],
  'spine-joint': [
    { name: 'Kativasti', desc: 'Localized treatment for lower back pain.', duration: '45 mins' },
    { name: 'Greevavasti', desc: 'Treatment for neck and cervical issues.', duration: '45 mins' },
    { name: 'Januvasti', desc: 'Therapy for knee joint pain and arthritis.', duration: '45 mins' },
  ],
  skin: [
    { name: 'Udwarthanam', desc: 'Herbal powder scrub for skin glow and fat reduction.', duration: '60 mins' },
    { name: 'Mukhalepam', desc: 'Ayurvedic herbal facial for skin radiance.', duration: '45 mins' },
    { name: 'Ksheeradhara', desc: 'Medicated milk pouring for skin health.', duration: '45 mins' },
  ],
  specialised: [
    { name: 'Diabetes Management', desc: 'Holistic approach to blood sugar balance.', duration: 'Package' },
    { name: 'Weight Management', desc: 'Custom programs for healthy weight loss.', duration: 'Package' },
    { name: 'Stress Management', desc: 'Focus on mental peace and sleep quality.', duration: 'Package' },
  ],
};

export default function TreatmentTabs() {
  const [activeTab, setActiveTab] = useState('panchakarma');

  return (
    <div className="space-y-12">
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-2 md:gap-4 border-b border-accent-gold/20 pb-4 snap-x">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-2 font-serif text-lg transition-all relative whitespace-nowrap snap-center ${
              activeTab === cat.id ? 'text-primary-dark font-bold' : 'text-text-muted hover:text-primary'
            }`}
          >
            {cat.label}
            {activeTab === cat.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-[-17px] left-0 right-0 h-1 bg-accent-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {treatments[activeTab as keyof typeof treatments].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 shadow-md border-t-2 border-primary-dark/10 hover:border-accent-gold transition-colors space-y-4 group"
              >
                <h3 className="text-2xl font-serif text-primary-dark group-hover:text-accent-gold transition-colors">{item.name}</h3>
                <p className="text-text-muted font-sans leading-relaxed">{item.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-accent-gold/10">
                  <span className="text-xs font-sans uppercase tracking-widest text-earth">Duration: {item.duration}</span>
                  <a href={`/treatments/${activeTab}`} className="text-primary font-bold text-sm hover:underline">Details</a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
