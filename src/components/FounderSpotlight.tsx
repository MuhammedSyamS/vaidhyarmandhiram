import React from 'react';
import { motion } from 'framer-motion';

export default function FounderSpotlight() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Column: Photo */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative z-10 p-4 bg-white shadow-xl rotate-[-2deg] border border-accent-gold/20">
          {/* CLIENT ACTION REQUIRED: Replace this placeholder with the actual photograph of Dr. P. Abdul Sathar Gurukkal provided by the hospital. Recommended size: 800x1000px, format: JPG or WebP, file location: /public/images/founder-dr-sathar.jpg */}
          <img 
            src="/images/vmfounder.jpg" 
            alt="Dr. P. Abdul Sathar Gurukkal - Founder and Chief Physician, Vaidyarmandiram Ayurveda Hospital Kerala" 
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="absolute inset-0 border-2 border-accent-gold/30 m-2 pointer-events-none"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>

        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-primary-dark tracking-widest uppercase">
            Dr. P. Abdul Sathar Gurukkal
          </h3>
          <p className="text-accent-gold font-sans uppercase tracking-[0.2em] text-sm mt-1">
            Founder & Chief Physician
          </p>
        </div>
      </motion.div>

      {/* Right Column: Bio */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <span className="text-accent-gold font-sans uppercase tracking-[0.3em] text-sm font-bold">
            Our Founder
          </span>
          <h2 className="text-4xl md:text-5xl text-primary-dark leading-tight">
            Decades of Healing, <br/>
            <span className="">Rooted in Tradition</span>
          </h2>
        </div>

        <div className="space-y-6 text-text-muted font-sans leading-relaxed text-lg">
          <p>
            Vaidyarmandiram was born from the vision of Dr. P. Abdul Sathar Gurukkal, a healer whose life has been dedicated to the restoration of balance through Ayurveda. With decades of traditional training and a deep lineage of wisdom, he has touched the lives of thousands.
          </p>
          <p>
            His approach combines the strict adherence to classical Ayurvedic texts with a compassionate understanding of modern lifestyle challenges. Every treatment at our hospital is overseen by his clinical expertise, ensuring that the essence of tradition remains untainted.
          </p>
          <p>
            Today, Vaidyarmandiram stands as a testament to his commitment to authentic healing, serving as a sanctuary for those seeking physical rejuvenation and mental peace.
          </p>
        </div>

        <blockquote className="border-l-4 border-accent-gold pl-6 py-2 text-xl text-primary ">
          "Healing is not merely the absence of disease, but the harmonious alignment of the body, mind, and spirit with the laws of nature."
        </blockquote>

        <div>
          <a 
            href="/about" 
            className="inline-flex items-center gap-2 text-primary-dark text-lg hover:text-accent-gold transition-colors group"
          >
            Read the Full Story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
