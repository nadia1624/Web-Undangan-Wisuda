"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Car, Heart } from "lucide-react";

export default function LocationSection() {
  const graduationDate = new Date("2026-07-12T07:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = graduationDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [graduationDate]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 md:py-28 relative bg-[#F7F2EC]/50 paper-texture">
      {/* Intricate Gold Divider line top & bottom */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-card max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border border-gold/20 shadow-md text-center mb-20"
        >
          <span className="font-accent text-2xl text-pink-dark block mb-1">
            Counting the Days
          </span>
          <h3 className="font-serif text-lg tracking-widest text-[#3d322d] uppercase mb-6">
            The Graduation Countdown
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-gold/30 bg-pearl flex flex-col items-center justify-center shadow-inner relative">
                  {/* Small inner ring */}
                  <div className="absolute inset-1 rounded-full border border-gold/5 pointer-events-none" />
                  <span className="font-serif text-lg sm:text-2xl font-bold text-gold-text-foil">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-sans tracking-widest mt-2.5 text-[#9c8982]">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map and Details Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Venue Address and Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div variants={itemVariants}>
              <span className="font-accent text-3xl text-pink-dark block mb-1">
                Directions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3d322d] uppercase tracking-wide">
                Venue Location
              </h2>
              <div className="w-16 h-[1px] bg-gold/30 mt-3" />
            </motion.div>

            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/15 flex gap-4"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-pink-soft/20 flex items-center justify-center text-pink-dark z-10 relative">
                  <MapPin className="w-5 h-5" />
                </div>
                {/* Pulsing Pin Ring */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-pink-soft/30 rounded-full animate-ping pointer-events-none" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#4a3e3d]">Fakultas Teknologi Informasi</h4>
                <p className="font-sans text-xs text-[#7a6a65] mt-1 leading-relaxed">
                  Gedung FTI, Kampus Limau Manis, Universitas Andalas, Padang, Sumatera Barat.
                </p>
              </div>
            </motion.div>

            {/* Parking info */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/15 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-pink-soft/20 flex items-center justify-center text-pink-dark flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#4a3e3d]">Area Parkir</h4>
                <p className="font-sans text-xs text-[#7a6a65] mt-1 leading-relaxed">
                  Parkir gratis tersedia di area luar Gedung Fakultas Teknologi Informasi (FTI) Universitas Andalas.
                </p>
              </div>
            </motion.div>

            {/* Contact Person */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/15 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-pink-soft/20 flex items-center justify-center text-pink-dark flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#4a3e3d]">Kontak RSVP</h4>
                <p className="font-sans text-xs text-[#7a6a65] mt-1">
                  Nadia Deari Hanifah: <span className="font-semibold text-pink-dark">083124517280</span>
                </p>
              </div>
            </motion.div>

            {/* Navigation Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <a
                href="https://www.google.com/maps/place/Fakultas+Teknologi+InformasiUniversitas+Andalas/@-0.9153454,100.4584784,17z/data=!4m14!1m7!3m6!1s0x2fd4b7963e1ea631:0x452d09b61f76d6ec!2sFakultas+Teknologi+InformasiUniversitas+Andalas!8m2!3d-0.9153508!4d100.4610533!16s%2Fg%2F125n3w9p3!3m5!1s0x2fd4b7963e1ea631:0x452d09b61f76d6ec!8m2!3d-0.9153508!4d100.4610533!16s%2Fg%2F125n3w9p3?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-dark text-white rounded-full font-serif text-sm tracking-wider hover:bg-pink-dark/95 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                Navigate with Google Maps
              </a>
            </motion.div>
          </div>

          {/* Right: Map Embed Frame (7 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border-2 border-gold p-2 bg-pearl shadow-lg relative"
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <iframe
                title="Grand Ballroom Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.282869032704!2d100.45847841421067!3d-0.9153507993322194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7963e1ea631%3A0x452d09b61f76d6ec!2sFakultas%20Teknologi%20Informasi%20-%20Universitas%20Andalas!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid"
                className="w-full h-full border-0 absolute inset-0 filter saturate-90 contrast-95"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
