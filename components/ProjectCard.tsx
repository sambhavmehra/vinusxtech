'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  gradient: string;
}

export default function ProjectCard({ title, description, tags, gradient }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="glass-dark rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: gradient,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-60" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-all">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full glass border border-white/10 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-sm text-[#00ff88] hover:text-[#00d4ff] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Project</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-sm text-[#00d4ff] hover:text-[#a855f7] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
