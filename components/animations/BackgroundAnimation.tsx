'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const starCount = 50;
    const generated = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#0A0A0F] overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 4px rgba(255,255,255,0.5)',
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Subtle animated gradients */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
        style={{ background: 'radial-gradient(circle, #00ff88, transparent)' }}
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        animate={{
          x: [50, -50, 50],
          y: [50, -50, 50],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
