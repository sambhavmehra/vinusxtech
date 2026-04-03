'use client';

import { motion } from 'framer-motion';

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 8,
  color: ['#00ff88', '#00d4ff', '#a855f7'][Math.floor(Math.random() * 3)],
}));

const orbs = [
  { x: 20, y: 20, size: 400, color: '#00ff8820', duration: 18 },
  { x: 80, y: 70, size: 500, color: '#00d4ff15', duration: 22 },
  { x: 50, y: 90, size: 350, color: '#a855f715', duration: 16 },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#0A0A0F]">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#00ff88 1px, transparent 1px),
            linear-gradient(90deg, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px] pointer-events-none"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff8840] to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
