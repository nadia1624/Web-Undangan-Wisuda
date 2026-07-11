"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

interface InvitationCardProps {
  guestName: string;
}

export default function InvitationCard({ guestName }: InvitationCardProps) {
  // Reveal animations configs
  const cardVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-4 md:py-24 relative overflow-hidden">
      {/* Background Ribbon Draping (Decorative graphic element) */}
      <div className="absolute top-[-5%] left-[-10%] w-[35%] h-[35%] opacity-20 pointer-events-none animate-float select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-pink-soft">
          <path d="M10 80 C 40 10, 60 10, 100 80 C 150 150, 180 80, 200 120" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M15 90 C 45 20, 65 20, 105 90 C 155 160, 185 90, 205 130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card paper-texture max-w-[650px] w-full p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl relative gold-border text-center overflow-hidden"
      >
        {/* Intricate Inner Border */}
        <div className="absolute inset-4 rounded-xl border border-gold/15 pointer-events-none" />
        <div className="absolute inset-5 rounded-xl border border-gold/5 pointer-events-none" />

        {/* Top Ornament */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold/30"></span>
            <span className="font-serif italic text-xs tracking-[0.3em] text-pink-dark uppercase">
              Class of 2026
            </span>
            <span className="h-[1px] w-8 bg-gold/30"></span>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-sm text-[#7a6a65] max-w-md mx-auto leading-relaxed mb-8"
        >
          "Life can be heavy especially if you try to carry it all at once. Part of growing up and moving into new chapters of your life is about catch and release. What I mean by that is knowing what things to keep and what things to release. You can't carry all things."
          <span className="block text-[10px] font-sans uppercase tracking-widest text-gold mt-2">
            — Taylor Swift —
          </span>
        </motion.p>

        {/* Graduate Portrait inside Luxury Coquette Frame */}
        <motion.div
          variants={itemVariants}
          className="relative w-44 h-56 sm:w-52 sm:h-68 mx-auto mb-8 z-10"
        >
          {/* Top Hanging Bow SVG decoration */}
          <div className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 w-14 h-10 z-20 pointer-events-none">
            <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-pink-dark">
              {/* Ribbon Bow */}
              <path d="M50 40 C35 25, 20 25, 20 40 C20 55, 35 55, 50 40" fill="currentColor" opacity="0.9"/>
              <path d="M50 40 C65 25, 80 25, 80 40 C80 55, 65 55, 50 40" fill="currentColor" opacity="0.9"/>
              {/* Bow Center */}
              <circle cx="50" cy="40" r="5" fill="#D4AF37"/>
              {/* Bow Tails */}
              <path d="M48 42 C40 55, 30 65, 25 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M52 42 C60 55, 70 65, 75 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Arched Gold Frame */}
          <div className="absolute inset-0 rounded-t-full rounded-b-lg border-2 border-gold p-1.5 shadow-[0_10px_25px_rgba(198,142,139,0.25)] bg-pearl">
            <div className="w-full h-full rounded-t-full rounded-b bg-[#F7F2EC] overflow-hidden relative">
              <img
                src="/graduate.jpeg"
                alt="Nadia Deari Hanifah"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-dark/15 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Graduate Info */}
        <motion.div variants={itemVariants} className="mb-6 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#3d322d] tracking-wide mb-1.5">
            Nadia Deari Hanifah, S.Kom
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#7a6a65] font-sans tracking-wide">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Bachelor of Information Systems</span>
          </div>
          <p className="font-sans text-xs text-[#9c8982] uppercase tracking-[0.15em] mt-2">
            Universitas Andalas
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div variants={itemVariants} className="w-24 mx-auto mb-8 relative z-10">
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
            <path d="M0 10 L40 10 C45 10, 48 5, 50 5 C52 5, 55 10, 60 10 L100 10" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="5" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Guest Greeting Box */}
        {guestName && (
          <motion.div
            variants={itemVariants}
            className="mb-8 p-5 bg-[#F7F2EC]/80 border border-gold/15 rounded-xl max-w-md mx-auto relative z-10"
          >
            <p className="font-sans text-xs uppercase text-[#9c8982] tracking-wider mb-1">
              Cordial Invitation For
            </p>
            <p className="font-accent text-3xl text-pink-dark leading-none py-1">
              {guestName}
            </p>
            <p className="font-sans text-[10px] text-[#7a6a65] mt-1">
              To witness and celebrate this milestone event.
            </p>
          </motion.div>
        )}

        {/* Event Snapshot */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-8 py-6 border-t border-b border-gold/10 relative z-10"
        >
          <div className="flex items-center gap-3 text-left">
            <Calendar className="w-5 h-5 text-pink-dark flex-shrink-0" />
            <div>
              <p className="font-serif text-sm font-semibold">Minggu, 12 Juli 2026</p>
              <p className="font-sans text-xs text-[#9c8982]">Pukul 12:00 - 14:30 WIB</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <MapPin className="w-5 h-5 text-pink-dark flex-shrink-0" />
            <div>
              <p className="font-serif text-sm font-semibold">Fakultas Teknologi Informasi</p>
              <p className="font-sans text-xs text-[#9c8982]">Universitas Andalas</p>
            </div>
          </div>
        </motion.div>

        {/* Ribbon Lace Corner Graphic */}
        <div className="absolute bottom-[-15px] right-[-15px] w-20 h-20 opacity-35 select-none pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
            <path d="M0 100 Q 50 50, 100 0" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 100 Q 60 60, 100 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
