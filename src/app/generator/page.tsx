"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2, Trash2, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

interface GeneratedLink {
  id: string;
  name: string;
  url: string;
  whatsappUrl: string;
}

export default function GeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [history, setHistory] = useState<GeneratedLink[]>([]);
  const [origin, setOrigin] = useState("http://localhost:3000");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      const saved = localStorage.getItem("generated_invitations");
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const getCleanUrl = (name: string) => {
    return `${origin}/?to=${encodeURIComponent(name.trim())}`;
  };

  const getWhatsAppMessage = (name: string, url: string) => {
    const text = `Dear *${name}*,\n\nYou are cordially invited to celebrate the graduation of *Nadia Deari Hanifah, S.Kom*\n\nPlease find the invitation details at the link below:\n${url}\n\nThank you!`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const finalUrl = getCleanUrl(guestName);
    const waUrl = getWhatsAppMessage(guestName.trim(), finalUrl);

    const newLink: GeneratedLink = {
      id: String(Date.now()),
      name: guestName.trim(),
      url: finalUrl,
      whatsappUrl: waUrl,
    };

    const updated = [newLink, ...history];
    setHistory(updated);
    localStorage.setItem("generated_invitations", JSON.stringify(updated));
    setGuestName("");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyPreview = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("generated_invitations", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear the entire history?")) {
      setHistory([]);
      localStorage.removeItem("generated_invitations");
    }
  };

  const previewUrl = getCleanUrl(guestName || "Nama Tamu");

  return (
    <div className="min-h-screen w-full bg-[#F7F2EC] satin-bg py-12 px-4 select-none relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Decorative Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-between p-12">
        <div className="w-56 h-56 border border-gold rounded-full" />
        <div className="w-56 h-56 border border-gold rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-8 flex-grow">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#7a6a65] hover:text-pink-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View Invitation
          </Link>
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-pearl">
            <span className="font-accent text-lg mt-1">ND</span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center">
          <span className="font-accent text-3xl text-pink-dark block mb-1">
            Invitation Link Generator
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gold-text-foil">
            Guest Manager
          </h1>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Generate form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gold/20 shadow-lg relative overflow-hidden text-left">
              <div className="absolute inset-3 rounded-xl border border-gold/5 pointer-events-none" />
              
              <h3 className="font-serif text-lg text-[#3d322d] mb-4">Create Link</h3>
              
              <form onSubmit={handleGenerate} className="space-y-4 relative z-10">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#9c8982] font-semibold">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Aunt Cecelia & Family"
                    required
                    className="w-full bg-[#FFFDFB] border border-gold/20 focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#9c8982]/60 shadow-inner font-sans text-[#3d322d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-pink-dark hover:bg-pink-dark/95 text-[#FFFDFB] rounded-lg font-serif text-sm tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  Generate Invitation Link
                </button>
              </form>

              {/* Dynamic Preview Box */}
              <div className="mt-6 pt-6 border-t border-gold/10">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9c8982] font-semibold block mb-2">
                  Live Preview URL
                </span>
                <div className="bg-pearl/80 border border-gold/10 rounded-lg p-3 flex justify-between items-center gap-3">
                  <span className="text-xs text-[#7a6a65] truncate font-mono">
                    {previewUrl}
                  </span>
                  <button
                    onClick={() => copyPreview(previewUrl)}
                    className="p-2 rounded-md hover:bg-[#F7F2EC] text-[#9c8982] hover:text-[#4a3e3d] flex-shrink-0 transition-colors cursor-pointer"
                    title="Copy preview URL"
                  >
                    {copiedPreview ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel: History of links (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-gold/20 shadow-md min-h-[300px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gold/10">
                  <h3 className="font-serif text-lg text-[#3d322d]">Generated Invitation Links ({history.length})</h3>
                  {history.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-[10px] font-sans uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="py-16 text-center text-[#9c8982] space-y-2">
                    <Heart className="w-8 h-8 mx-auto text-pink-soft opacity-60" />
                    <p className="font-sans text-xs">No invitations generated yet.</p>
                    <p className="text-[10px] text-[#9c8982]/60">Enter names on the left to build shareable links.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1.5 scrollbar-thin text-left">
                    <AnimatePresence initial={false}>
                      {history.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          layout
                          className="bg-pearl/70 border border-gold/15 p-4 rounded-xl flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0 flex-grow space-y-1">
                            <h4 className="font-serif font-bold text-sm text-[#4a3e3d]">
                              {item.name}
                            </h4>
                            <p className="text-[10px] font-mono text-[#9c8982] truncate">
                              {item.url}
                            </p>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            {/* Copy button */}
                            <button
                              onClick={() => copyToClipboard(item.url, item.id)}
                              className="w-8 h-8 rounded-full border border-gold/25 text-[#9c8982] flex items-center justify-center hover:bg-white hover:text-pink-dark transition-colors cursor-pointer"
                              title="Copy URL"
                            >
                              {copiedId === item.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>

                            {/* WhatsApp share */}
                            <a
                              href={item.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full border border-gold/25 text-[#9c8982] flex items-center justify-center hover:bg-white hover:text-green-600 transition-colors"
                              title="Share on WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 rounded-full border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                              title="Remove Link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-sans tracking-widest text-[#9c8982]/60 uppercase pt-4 text-center">
                History is saved in your local web browser.
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[10px] font-sans tracking-widest text-[#9c8982]/70 uppercase pt-12 text-center select-none">
        © 2026 Nadia Deari Hanifah. Invitation Link Manager.
      </div>

    </div>
  );
}
