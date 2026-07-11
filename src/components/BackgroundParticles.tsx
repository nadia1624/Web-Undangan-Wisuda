"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "petal" | "gold";
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Petal[] = [];
    const maxParticles = 65;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse for wind influence
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const type = Math.random() > 0.4 ? "petal" : "gold";
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "petal" ? Math.random() * 12 + 6 : Math.random() * 4 + 2,
        speedX: Math.random() * 1.5 - 0.5,
        speedY: Math.random() * 1.2 + 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        type,
      });
    }

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      // Premium coquette rose petal shape using Bezier curves
      context.fillStyle = `rgba(235, 200, 196, ${opacity})`;
      context.strokeStyle = `rgba(198, 142, 139, ${opacity * 0.4})`;
      context.lineWidth = 1;

      context.moveTo(0, 0);
      context.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      context.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);

      context.fill();
      context.stroke();
      context.restore();
    };

    const drawGoldSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      // Draw standard glowing radial light
      const grad = context.createRadialGradient(x, y, 0, x, y, size * 2.5);
      grad.addColorStop(0, `rgba(251, 245, 183, ${opacity})`);
      grad.addColorStop(0.3, `rgba(212, 175, 55, ${opacity * 0.6})`);
      grad.addColorStop(1, "rgba(212, 175, 55, 0)");

      context.fillStyle = grad;
      context.beginPath();
      context.arc(x, y, size * 2.5, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.forEach((p) => {
        // Move particle
        p.y += p.speedY;
        // Apply wind (base flow + gentle mouse push)
        const windX = 0.2 + (mouse.x - canvas.width / 2) * 0.0003;
        p.x += p.speedX + windX;
        p.rotation += p.rotationSpeed;

        // Reset particle when it goes off screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 1.2 + 0.6;
          p.speedX = Math.random() * 1.5 - 0.5;
          p.opacity = Math.random() * 0.6 + 0.2;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = canvas.width + 20;
        }

        // Draw particle based on its type
        if (p.type === "petal") {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
        } else {
          drawGoldSparkle(ctx, p.x, p.y, p.size, p.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* Blurred glowing light orbs in background */}
      <div className="absolute top-[10%] left-[20%] h-80 w-80 rounded-full bg-[#EBC8C4]/20 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] h-96 w-96 rounded-full bg-[#F4E8C1]/20 blur-[120px] animate-pulse-slow pointer-events-none delay-2000" />
      <div className="absolute top-[60%] left-[-10%] h-72 w-72 rounded-full bg-[#EADFD3]/30 blur-[90px] animate-pulse-slow pointer-events-none" />

      {/* Main falling particles canvas */}
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
