"use client";

import React, { useState, useEffect, Suspense } from "react";
import EnvelopeLanding from "@/components/EnvelopeLanding";
import BackgroundParticles from "@/components/BackgroundParticles";
import AudioPlayer from "@/components/AudioPlayer";
import InvitationCard from "@/components/InvitationCard";
import DetailsSection from "@/components/DetailsSection";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";
import WishesSection from "@/components/WishesSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [guestName, setGuestName] = useState("");

  // Extract guest name query param client-side (safe from hydration mismatches)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("guest") || params.get("name") || "";
      setGuestName(to);
    }
  }, []);

  // Control scrolling and initialize Lenis when envelope opens
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";

      // Dynamically load Lenis for smooth scroll performance
      let lenisDestroy: () => void = () => {};
      
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenisDestroy = () => lenis.destroy();
      });

      return () => {
        lenisDestroy();
      };
    }
  }, [isOpened]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setPlayAudio(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none">
      {/* 1. Envelope Landing Cover Screen */}
      <EnvelopeLanding onOpen={handleOpenEnvelope} guestName={guestName} />

      {/* 2. Main Page Content (Revealed after envelope opens) */}
      {isOpened && (
        <div className="relative w-full z-20 flex flex-col bg-[#FDFBF8] satin-bg">
          {/* Animated Coquette Background Ornaments & Sparkles */}
          <BackgroundParticles />

          {/* Floating Audio Player control */}
          <AudioPlayer playSignal={playAudio} />

          {/* Scroll progress line indicator */}
          <ScrollProgressBar />

          {/* Core App sections */}
          <main className="w-full flex-grow relative z-30">
            <InvitationCard guestName={guestName} />
            <DetailsSection />
            <LocationSection />
            <GallerySection />
            <WishesSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

// Simple internal Scroll Progress Indicator component
function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-pink-soft/20 z-50">
      <div
        className="h-full bg-gradient-to-r from-pink-soft via-gold to-pink-dark transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

