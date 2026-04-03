'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export default function ServiceCard({ icon: Icon, title, description, color }: ServiceCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05 }}
      className="relative glass-dark rounded-2xl p-8 transition-all duration-300 cursor-pointer group"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            boxShadow: `0 0 30px ${color}40`,
          }}
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
