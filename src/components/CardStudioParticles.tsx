"use client";

import React, { useEffect, useRef } from "react";

interface CardStudioParticlesProps {
  theme: "amber" | "emerald" | "orange" | "purple" | string;
}

export default function CardStudioParticles({ theme }: CardStudioParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse position tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Particle Color Definitions
    const themeColors: Record<string, { r: number; g: number; b: number }> = {
      amber: { r: 245, g: 158, b: 11 },   // Gold
      emerald: { r: 16, g: 185, b: 129 }, // Emerald
      orange: { r: 249, g: 115, b: 22 },  // Flame Orange
      purple: { r: 168, g: 85, b: 247 },  // Amethyst Purple
    };

    const rgb = themeColors[theme] || themeColors.emerald;

    // Create 50 Interactive Particles
    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1.2,
      baseAlpha: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulseAngle: Math.random() * Math.PI * 2,
    }));

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse alpha
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.2;

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Connect particles to mouse cursor if close
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const lineAlpha = (1 - distMouse / 140) * 0.45;
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Connect nearby particles together
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-80 transition-opacity duration-700"
    />
  );
}
