"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 relative bg-[#F7F2EC] satin-bg border-t border-gold/15 text-center overflow-hidden">
      {/* Background floral overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between p-12">
        <div className="w-36 h-36 border border-gold rounded-full" />
        <div className="w-36 h-36 border border-gold rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8 select-none">
        {/* Monogram/Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-12 h-12 rounded-full border border-gold/40 mx-auto flex items-center justify-center text-gold bg-pearl relative shadow-sm"
        >
          <span className="font-accent text-xl mt-1">ND</span>
          <div className="absolute inset-0.5 rounded-full border border-gold/10 pointer-events-none" />
        </motion.div>

        {/* Closing Headline */}
        <div className="space-y-2">
          <p className="font-accent text-3xl text-pink-dark">Thank You</p>
          <h2 className="font-serif text-xl sm:text-2xl font-light text-[#3d322d] uppercase tracking-[0.2em]">
            See You at My Graduation
          </h2>
        </div>

        {/* Elegant Gold Divider with ribbon loops illustration */}
        <div className="w-48 mx-auto py-2">
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-gold">
            <path d="M0 10 L35 10 C40 10, 43 5, 45 5 C47 5, 49 15, 51 15 C53 15, 55 5, 57 5 C59 5, 62 10, 65 10 L100 10" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Social Media Connections */}
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gold/25 text-[#7a6a65] flex items-center justify-center hover:border-gold hover:text-pink-dark hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-gold/25 text-[#7a6a65] flex items-center justify-center hover:border-gold hover:text-pink-dark hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a
            href="mailto:clarissa@example.com"
            className="w-9 h-9 rounded-full border border-gold/25 text-[#7a6a65] flex items-center justify-center hover:border-gold hover:text-pink-dark hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Scroll Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold/15 bg-pearl hover:bg-[#FFFDFB] text-[#9c8982] hover:text-pink-dark rounded-full text-xs font-sans tracking-widest uppercase transition-all shadow-sm cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to Top
          </button>
        </div>

        {/* Copyright Details */}
        <div className="text-[10px] font-sans tracking-widest text-[#9c8982]/85 uppercase">
          <p>© 2026 Nadia Deari Hanifah. All Rights Reserved.</p>
          <p className="mt-1 text-[9px] text-[#9c8982]/60">
            Crafted with love for class of 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
