'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  const [stars, setStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  // Detect mobile once on mount
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Fewer stars on mobile for better performance
    const count = mobile ? 15 : 60;
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 3,
    }));
    setStars(generated);
  }, []);

  // Subtle grid canvas — skip on mobile entirely
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw subtle dot grid
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gap = 60;
      const dotSize = 0.5;

      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const dist = Math.sqrt(
            (x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2
          );
          const maxDist = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
          const alpha = Math.max(0, 0.12 - (dist / maxDist) * 0.1);

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, #0D0B14 0%, #050408 100%)' }}
    >
      {/* Canvas grid — desktop only */}
      {!isMobile && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}

      {/* Twinkling stars — CSS animation on mobile, Framer on desktop */}
      {stars.map((star) =>
        isMobile ? (
          <div
            key={star.id}
            className="absolute rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: '#ffffff',
              opacity: 0.3,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ) : (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: '#ffffff',
            }}
            animate={{
              opacity: [0.05, 0.5, 0.05],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )
      )}

      {/* Ambient gradient orbs — DESKTOP ONLY (filter: blur is very GPU-heavy on mobile) */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              top: '10%',
              left: '5%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.03), transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [-30, 30, -30],
              y: [-20, 20, -20],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              bottom: '5%',
              right: '5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02), transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [20, -20, 20],
              y: [20, -20, 20],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.02), transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </div>
  );
}

