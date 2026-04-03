'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function HeroAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#00ff88', '#00d4ff', '#a855f7'];
    const generated: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute rounded-full blur-[120px] opacity-30"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-[150px] opacity-20"
        style={{
          width: '500px',
          height: '500px',
          top: '30%',
          left: '20%',
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 80, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px] opacity-20"
        style={{
          width: '450px',
          height: '450px',
          top: '40%',
          right: '10%',
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -60, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Rotating ring */}
      <motion.div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          marginLeft: '-200px',
          marginTop: '-200px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(0,255,136,0.15)',
            boxShadow: '0 0 40px rgba(0,255,136,0.05) inset',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: '550px',
          height: '550px',
          marginLeft: '-275px',
          marginTop: '-275px',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(168,85,247,0.1)',
          }}
        />
        {/* Ring dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '8px',
            height: '8px',
            marginLeft: '-4px',
            marginTop: '-4px',
            borderRadius: '50%',
            background: '#a855f7',
            boxShadow: '0 0 12px #a855f7',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: '700px',
          height: '700px',
          marginLeft: '-350px',
          marginTop: '-350px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid rgba(0,212,255,0.08)',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            width: '10px',
            height: '10px',
            marginLeft: '-5px',
            marginTop: '-5px',
            borderRadius: '50%',
            background: '#00d4ff',
            boxShadow: '0 0 16px #00d4ff',
          }}
        />
      </motion.div>

      {/* Central pulsing core */}
      <div
        className="absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <motion.div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
            boxShadow: '0 0 60px #00ff88',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
