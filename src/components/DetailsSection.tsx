"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles, HelpCircle } from "lucide-react";

export default function DetailsSection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const details = [
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Ceremony Schedule",
      subtitle: "Tanggal & Jam",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#7a6a65]">
          <div>
            <span className="font-semibold font-serif text-base text-[#4a3e3d] block">
              Minggu, 12 Juli 2026
            </span>
            <span className="text-xs uppercase tracking-wider text-pink-dark">
              Prosesi Kelulusan
            </span>
          </div>
          <div className="h-[1px] bg-gold/10 w-full" />
          <div className="space-y-2 text-xs">
            <div>
              <p className="font-semibold text-pink-dark">07:30 - 12:00 WIB</p>
              <p className="text-[10px]">Upacara Wisuda Resmi</p>
            </div>
            <div>
              <p className="font-semibold text-pink-dark">12:00 - 14:30 WIB</p>
              <p className="text-[10px]">Sesi Undangan & Foto Bersama</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold" />,
      title: "Fakultas Teknologi Informasi",
      subtitle: "Lokasi Wisuda",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#7a6a65]">
          <div>
            <span className="font-semibold font-serif text-base text-[#4a3e3d] block">
              Gedung FTI Unand
            </span>
            <span className="text-xs uppercase tracking-wider text-pink-dark">
              Universitas Andalas
            </span>
          </div>
          <div className="h-[1px] bg-gold/10 w-full" />
          <p className="text-xs leading-relaxed">
            Kampus Limau Manis, Kec. Pauh, Kota Padang, Sumatera Barat 25163, Indonesia.
          </p>
        </div>
      ),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "Dress Code",
      subtitle: "Earth Tone Theme",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#7a6a65]">
          <div>
            <span className="font-semibold font-serif text-base text-[#4a3e3d] block">
              Earth Tone Elegance
            </span>
            <span className="text-xs uppercase tracking-wider text-pink-dark">
              Tema Busana
            </span>
          </div>
          <div className="h-[1px] bg-gold/10 w-full" />
          <p className="text-xs leading-relaxed">
            Kami sangat menghargai jika para tamu undangan dapat mengenakan busana bernuansa bumi (earth tone).
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="bg-[#FFFDFB] border border-gold/15 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#7a6a65]">
              Beige & Cream
            </span>
            <span className="bg-[#FFFDFB] border border-gold/15 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#7a6a65]">
              Brown & Khaki
            </span>
            <span className="bg-[#FFFDFB] border border-gold/15 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#7a6a65]">
              Terracotta & Rust
            </span>
            <span className="bg-[#FFFDFB] border border-gold/15 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-[#7a6a65]">
              Olive Green
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-4 md:py-28 relative">
      {/* Background glowing decorations */}
      <div className="absolute top-[20%] left-[5%] w-64 h-64 bg-[#F4E8C1]/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-72 h-72 bg-[#EBC8C4]/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-accent text-3xl sm:text-4xl text-pink-dark block mb-2">
            Details of Ceremony
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gold-text-foil">
            Event Information
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {/* Details Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card glass-card-hover p-6 sm:p-8 rounded-xl relative flex flex-col sm:flex-row gap-5 items-start text-left"
            >
              {/* Gold Ornamented Icon */}
              <div className="w-12 h-12 rounded-full border border-gold/35 flex items-center justify-center bg-pearl flex-shrink-0 shadow-sm relative">
                <div className="absolute inset-1 rounded-full border border-gold/10" />
                {detail.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-[10px] uppercase font-sans tracking-widest text-[#9c8982]">
                    {detail.subtitle}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#3d322d]">
                    {detail.title}
                  </h3>
                </div>
                <div>{detail.content}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
