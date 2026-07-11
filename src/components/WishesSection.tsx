"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, User, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load wishes on mount (KV database with localStorage fallback)
  useEffect(() => {
    const defaultWishes: Wish[] = [];

    fetch("/api/wishes")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setWishes(resData.data);
        } else {
          // Fallback to localStorage if KV is not configured
          const savedWishes = localStorage.getItem("graduation_wishes");
          if (savedWishes) {
            try {
              setWishes(JSON.parse(savedWishes));
            } catch (e) {
              setWishes(defaultWishes);
            }
          } else {
            setWishes(defaultWishes);
            localStorage.setItem("graduation_wishes", JSON.stringify(defaultWishes));
          }
        }
      })
      .catch((err) => {
        console.warn("API wishes fetch failed. Using local storage fallback.", err);
        const savedWishes = localStorage.getItem("graduation_wishes");
        if (savedWishes) {
          try {
            setWishes(JSON.parse(savedWishes));
          } catch (e) {
            setWishes(defaultWishes);
          }
        } else {
          setWishes(defaultWishes);
          localStorage.setItem("graduation_wishes", JSON.stringify(defaultWishes));
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), date: dateStr }),
      });
      const resData = await response.json();

      if (resData.success) {
        setWishes((prev) => [resData.data, ...prev]);
      } else {
        // Fallback to localStorage if KV is not configured
        const newWish: Wish = resData.data || {
          id: String(Date.now()),
          name: name.trim(),
          message: message.trim(),
          date: dateStr,
        };
        const updated = [newWish, ...wishes];
        setWishes(updated);
        localStorage.setItem("graduation_wishes", JSON.stringify(updated));
      }

      setName("");
      setMessage("");
      setShowSuccess(true);

      // Trigger flower petal & gold confetti
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#EBC8C4", "#FFFDFB", "#D4AF37", "#F7F2EC"],
      });

      // Clear success notification
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (err) {
      console.warn("API wishes save failed. Storing locally as fallback.", err);
      const newWish: Wish = {
        id: String(Date.now()),
        name: name.trim(),
        message: message.trim(),
        date: dateStr,
      };
      const updated = [newWish, ...wishes];
      setWishes(updated);
      localStorage.setItem("graduation_wishes", JSON.stringify(updated));

      setName("");
      setMessage("");
      setShowSuccess(true);

      // Trigger flower petal & gold confetti
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#EBC8C4", "#FFFDFB", "#D4AF37", "#F7F2EC"],
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const wishCardVariants: any = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 md:py-28 relative bg-[#F7F2EC]/30 paper-texture">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-accent text-3xl sm:text-4xl text-pink-dark block mb-2">
            Send Your Love
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gold-text-foil">
            Guest Book & Wishes
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Input Form (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-gold/20 shadow-lg relative overflow-hidden"
            >
              {/* Inner border line */}
              <div className="absolute inset-3 rounded-xl border border-gold/5 pointer-events-none" />

              <h3 className="font-serif text-xl text-[#3d322d] mb-1">Leave a Wish</h3>
              <p className="font-sans text-xs text-[#7a6a65] mb-6">
                Your kind messages and graduation wishes are deeply appreciated!
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Guest Name Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#9c8982] font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-pink-dark" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-[#FFFDFB] border border-gold/20 focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#9c8982]/60 shadow-inner font-sans"
                  />
                </div>

                {/* Wish Message TextArea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#9c8982] font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-pink-dark" />
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Write your congratulations message here..."
                    className="w-full bg-[#FFFDFB] border border-gold/20 focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#9c8982]/60 shadow-inner resize-none font-sans"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-pink-dark hover:bg-pink-dark/95 text-[#FFFDFB] rounded-lg font-serif text-sm tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </form>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg text-center font-sans flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-green-600 text-green-600" />
                    Thank you! Your wish was added successfully.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Wishes Display List (7 cols) */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin"
            >
              <AnimatePresence initial={false}>
                {wishes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-8 rounded-xl border border-gold/10 shadow-sm text-center relative overflow-hidden py-16"
                  >
                    <Heart className="w-8 h-8 mx-auto text-pink-soft opacity-60 mb-3 animate-pulse" />
                    <h4 className="font-serif font-bold text-[#4a3e3d] text-base mb-1">
                      Belum Ada Ucapan
                    </h4>
                    <p className="font-sans text-xs text-[#9c8982]">
                      Kirimkan ucapan selamat Anda untuk Nadia Deari Hanifah melalui formulir di samping.
                    </p>
                  </motion.div>
                ) : (
                  wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      variants={wishCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9, y: -15 }}
                      layout
                      className="glass-card p-6 rounded-xl border border-gold/15 shadow-sm text-left relative overflow-hidden"
                    >
                      {/* Pink Ribbon Tag on Wish Card */}
                      <div className="absolute top-0 right-6 w-3 h-6 bg-pink-soft/40 rounded-b" />

                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-serif font-bold text-[#4a3e3d] text-base leading-tight">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] font-sans text-[#9c8982] uppercase tracking-wider flex-shrink-0">
                          {wish.date}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#7a6a65] leading-relaxed italic">
                        "{wish.message}"
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
