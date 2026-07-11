"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  aspect: string; // Tailwind aspect class
}

export default function GallerySection() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      src: "/gallery_1.jpeg",
      alt: "Sidang Tugas Akhir - 18 Juni 2026",
      caption: "Sidang Tugas Akhir - 18 Juni 2026",
      aspect: "aspect-[3/4] sm:col-span-1 md:row-span-2",
    },
    {
      src: "/gallery_2.JPG",
      alt: "Yudisium FTI - 24 Juni 2026",
      caption: "Yudisium FTI - 24 Juni 2026",
      aspect: "aspect-[16/10] sm:col-span-2",
    },
    {
      src: "/graduate.jpeg",
      alt: "Official Portrait",
      caption: "Official Portrait",
      aspect: "aspect-[3/4] sm:col-span-1",
    },
    {
      src: "/gallery_4.jpeg",
      alt: "Selebrasi Sidang Tugas Akhir - 18 Juni 2026",
      caption: "Selebrasi Sidang Tugas Akhir - 18 Juni 2026",
      aspect: "aspect-[3/4] sm:col-span-1",
    },
    {
      src: "/gallery_5.jpeg",
      alt: "The people who stayed until the very end",
      caption: "The people who stayed until the very end",
      aspect: "aspect-[16/10] sm:col-span-2 lg:col-span-1",
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="py-20 px-4 md:py-28 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-accent text-3xl sm:text-4xl text-pink-dark block mb-2">
            Moments & Memories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gold-text-foil">
            Photo Gallery
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:auto-rows-[180px] lg:auto-rows-[220px]"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => setActiveImageIndex(index)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-gold/15 bg-pearl shadow-sm transition-shadow hover:shadow-lg ${img.aspect}`}
            >
              {/* Image element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
              />

              {/* Luxury Coquette Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-dark/70 via-pink-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5 text-left">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] space-y-1">
                  <div className="w-8 h-8 rounded-full bg-pearl/90 backdrop-blur flex items-center justify-center text-pink-dark mb-2 shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-gold-light block">
                    View Photo
                  </span>
                  <p className="font-serif text-sm font-semibold text-[#FFFDFB] leading-tight leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-[#3d322d]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-pearl/10 border border-pearl/20 text-pearl flex items-center justify-center hover:bg-pearl/20 transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-pearl/10 border border-pearl/20 text-pearl flex items-center justify-center hover:bg-pearl/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-pearl/10 border border-pearl/20 text-pearl flex items-center justify-center hover:bg-pearl/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <div className="relative border-4 border-pearl p-1 rounded bg-pearl shadow-2xl overflow-hidden max-h-[75vh]">
                <img
                  src={images[activeImageIndex].src}
                  alt={images[activeImageIndex].alt}
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              </div>

              {/* Caption Overlay at Bottom of Card */}
              <div className="mt-4 text-center max-w-md">
                <p className="font-serif italic text-base text-pearl">
                  {images[activeImageIndex].caption}
                </p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-gold mt-1.5">
                  {activeImageIndex + 1} of {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
