"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MailOpen } from "lucide-react";

interface EnvelopeLandingProps {
  onOpen: () => void;
  guestName: string;
}

export default function EnvelopeLanding({ onOpen, guestName }: EnvelopeLandingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false); // When animation completes
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const envelopeRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || !envelopeRef.current) return;
    const rect = envelopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt ranges
    setRotateX(-y * 0.05); // Tilt vertical
    setRotateY(x * 0.05);  // Tilt horizontal
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Launch golden confetti sparkles
  const fireConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#D4AF37", "#FBF5B7", "#AA771C", "#EBC8C4"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#D4AF37", "#FBF5B7", "#AA771C", "#EBC8C4"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Play open sequence
    setTimeout(() => {
      // Trigger gold confetti
      fireConfetti();
      // Start audio after user interaction
      onOpen();
    }, 1200);

    setTimeout(() => {
      setIsOpened(true);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#F7F2EC] satin-bg px-4 py-8"
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative Floral Ornaments Background */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between p-4 sm:p-12">
            <div className="w-48 h-48 border-l border-t border-gold rounded-tl-full" />
            <div className="w-48 h-48 border-r border-t border-gold rounded-tr-full" />
            <div className="absolute bottom-12 left-12 w-48 h-48 border-l border-b border-gold rounded-bl-full" />
            <div className="absolute bottom-12 right-12 w-48 h-48 border-r border-b border-gold rounded-br-full" />
          </div>

          {/* Heading Above Envelope */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-8 z-10 select-none"
          >
            <p className="font-serif text-sm tracking-[0.25em] text-pink-dark uppercase mb-2">
              Graduation Invitation
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl font-light text-[#3d322d] italic">
              Nadia Deari Hanifah, S.Kom
            </h1>
            {guestName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 font-sans text-sm text-[#7a6a65]"
              >
                Exclusive invitation for: <span className="font-serif italic text-base font-semibold text-gold-text-foil">{guestName}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Realistic Envelope Area */}
          <motion.div
            ref={envelopeRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenEnvelope}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
            animate={
              isOpen
                ? { y: 60, scale: 0.95 }
                : { y: [0, -8, 0], rotate: [0, 0.5, 0] }
            }
            transition={
              isOpen
                ? { duration: 0.8, ease: "easeInOut" }
                : { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }
            className="relative w-full max-w-[340px] h-[220px] sm:max-w-[460px] sm:h-[300px] rounded-lg bg-[#EADFD3] shadow-[0_20px_50px_rgba(198,142,139,0.25)] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_30px_60px_rgba(198,142,139,0.4)] z-20"
          >
            {/* Inner Shadow & Paper texture */}
            <div className="absolute inset-0 rounded-lg overflow-hidden paper-texture border border-[#E4D5C5]" />

            {/* Back Flap Cover (Pocket Background) */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#E4D5C5] rounded-b-lg border-t border-[#DFCCA7]/30 z-0" />

            {/* Ribbon - Left & Right (tied around) */}
            <motion.div
              animate={isOpen ? { x: -200, opacity: 0 } : { x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute left-0 w-[45%] h-6 bg-gradient-to-r from-pink-soft to-pink-dark shadow-md z-30 flex items-center justify-end"
            >
              <div className="w-1 h-full bg-gold/30" />
            </motion.div>
            <motion.div
              animate={isOpen ? { x: 200, opacity: 0 } : { x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute right-0 w-[45%] h-6 bg-gradient-to-l from-pink-soft to-pink-dark shadow-md z-30 flex items-center justify-start"
            >
              <div className="w-1 h-full bg-gold/30" />
            </motion.div>

            {/* Vertical Ribbon Loop */}
            <motion.div
              animate={isOpen ? { y: -200, opacity: 0 } : { y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-6 bg-gradient-to-b from-pink-soft to-pink-dark shadow-md z-30"
            >
              <div className="h-full w-[2px] mx-auto bg-gold/30" />
            </motion.div>

            {/* Invitation Card sliding out */}
            <motion.div
              initial={{ y: 0, scale: 0.9 }}
              animate={isOpen ? { y: -150, scale: 1.05, zIndex: 10 } : { y: 0, scale: 0.9 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[5%] w-[90%] h-[90%] bg-pearl rounded border border-[#DFCCA7] p-6 shadow-md z-10 flex flex-col justify-between text-center select-none"
            >
              <div className="border border-gold-light p-4 h-full flex flex-col justify-between">
                <span className="font-serif italic text-xs text-gold tracking-widest uppercase">
                  Class of 2026
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#4a3a35] tracking-wide">
                    INVITATION
                  </h3>
                  <p className="font-sans text-[10px] uppercase text-[#7a6a65] tracking-widest mt-1">
                    Graduation Celebration
                  </p>
                </div>
                <p className="font-accent text-lg text-pink-dark">Nadia Deari Hanifah</p>
              </div>
            </motion.div>

            {/* Triangular side pockets (left & right folds) */}
            <div 
              className="absolute left-0 bottom-0 w-0 h-0 border-l-[170px] border-b-[110px] sm:border-l-[230px] sm:border-b-[150px] border-l-[#E6DFD5] border-b-transparent z-20"
              style={{ borderBottomColor: "rgba(230,223,213,0.98)" }}
            />
            <div 
              className="absolute right-0 bottom-0 w-0 h-0 border-r-[170px] border-b-[110px] sm:border-r-[230px] sm:border-b-[150px] border-r-[#E6DFD5] border-b-transparent z-20"
              style={{ borderBottomColor: "rgba(230,223,213,0.98)" }}
            />

            {/* Bottom triangular flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 w-0 h-0 border-b-[110px] sm:border-b-[150px] border-l-[170px] border-r-[170px] sm:border-l-[230px] sm:border-r-[230px] border-l-transparent border-r-transparent border-b-[#E8E0D7] z-20"
            />

            <motion.div
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderBottom: "1px solid rgba(212,175,55,0.2)"
              }}
              animate={isOpen ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 25 }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-[50%] bg-[#DFCCA7] shadow-inner rounded-t-lg z-25"
            />

            {/* Wax Seal - Gold foil circular badge */}
            <motion.div
              animate={
                isOpen
                  ? { scale: 0, rotate: 120, opacity: 0 }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                isOpen
                  ? { duration: 0.5, ease: "easeInOut" }
                  : { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
              className="absolute z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.25)] bg-[#D4AF37]"
              style={{
                background: "radial-gradient(circle, #FCF6BA 0%, #D4AF37 50%, #AA771C 100%)",
                border: "2px solid #FFFDFB",
              }}
            >
              {/* Inner seal monogram (cursive A surrounded by leaves) */}
              <div className="w-[85%] h-[85%] rounded-full border border-gold-light flex flex-col items-center justify-center text-[#5c3e12] select-none">
                <span className="font-accent text-3xl font-bold leading-none mt-1">C</span>
                <span className="text-[7px] font-sans tracking-widest font-semibold uppercase leading-none">
                  OPEN
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Tap instructions below envelope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 z-10 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleOpenEnvelope}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-gold/20 shadow-sm text-xs font-sans tracking-widest uppercase text-pink-dark hover:bg-white transition-colors"
            >
              <MailOpen className="w-3.5 h-3.5" />
              Tap Wax Seal to Open
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
