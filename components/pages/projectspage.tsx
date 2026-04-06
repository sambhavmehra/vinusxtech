'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const projects = [
  {
    title: 'SIEM + IDS System',
    description: 'Enterprise-grade security information and event management system with integrated intrusion detection. Features real-time log analysis, automated threat response, and comprehensive security dashboards.',
    tags: ['Security', 'SIEM', 'Python', 'ELK Stack'],
    category: 'Cyber Security',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
    accent: '#00ff88',
  },
  {
    title: 'SHARVA AI',
    description: 'Advanced AI-powered analytics platform for predictive modeling and business intelligence. Leverages machine learning for data-driven decision making and automated insights generation.',
    tags: ['AI', 'Machine Learning', 'React', 'Python'],
    category: 'AI/ML',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
    accent: '#a855f7',
  },
  {
    title: 'SOAR SOC Platform',
    description: 'Security Orchestration, Automation and Response platform for streamlined incident management. Automates security workflows and integrates with multiple security tools for unified threat response.',
    tags: ['Security', 'Automation', 'Python', 'Kubernetes'],
    category: 'Cyber Security',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00ff88 100%)',
    accent: '#a855f7',
  },
  {
    title: 'Blockchain EHR',
    description: 'Decentralized electronic health records system built on blockchain technology. Ensures patient data privacy, integrity, and secure inter-hospital data sharing with smart contract automation.',
    tags: ['Blockchain', 'Healthcare', 'Smart Contracts'],
    category: 'Blockchain',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #a855f7 100%)',
    accent: '#00ff88',
  },
  {
    title: 'Cloud-Native E-Commerce',
    description: 'Scalable microservices-based e-commerce platform deployed on Kubernetes. Features real-time inventory management, AI-powered recommendations, and seamless payment integration.',
    tags: ['E-Commerce', 'Microservices', 'Next.js', 'AWS'],
    category: 'Full Stack',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
    accent: '#00d4ff',
  },
  {
    title: 'IoT Fleet Management',
    description: 'Real-time vehicle tracking and fleet management system using IoT sensors. Provides predictive maintenance alerts, route optimization, and comprehensive analytics dashboard.',
    tags: ['IoT', 'React', 'Node.js', 'MongoDB'],
    category: 'MERN Stack',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00d4ff 100%)',
    accent: '#00d4ff',
  },
  {
    title: 'Zero Trust Network',
    description: 'Enterprise zero trust network architecture implementation with micro-segmentation, continuous verification, and advanced threat detection capabilities.',
    tags: ['Security', 'Zero Trust', 'Python', 'Terraform'],
    category: 'Cyber Security',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
    accent: '#00ff88',
  },
  {
    title: 'AI Chatbot Platform',
    description: 'Intelligent customer service chatbot platform powered by NLP and machine learning. Features multi-language support, sentiment analysis, and seamless CRM integration.',
    tags: ['AI', 'NLP', 'Python', 'React'],
    category: 'AI/ML',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
    accent: '#a855f7',
  },
];

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  const categories = ['All', 'AI/ML', 'Full Stack', 'MERN Stack', 'Cyber Security', 'Blockchain'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
      {/* Dynamic Background — same as About page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#a855f7]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#00ff88]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full">
        {/* ── HERO ── */}
        <section className="relative pt-20 pb-20 px-4 min-h-[55vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Case Studies</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
                Portfolio.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              Innovative solutions that solve real-world problems and drive business success.
            </p>
          </motion.div>
        </section>

        {/* ── PROJECT CARDS ── */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <Reveal className="mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">Selected Work</h2>
              </div>
            </Reveal>

            <Reveal className="mb-10 text-center">
              <div className="flex flex-wrap justify-center items-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 border-[#00ff88]/50 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.4 }}
                    className="glass-card rounded-3xl overflow-hidden group cursor-pointer h-full relative border border-white/[0.06]"
                  >
                    {/* Gradient Banner */}
                    <div className="h-44 relative overflow-hidden">
                      <div className="absolute inset-0" style={{ background: project.gradient }} />
                      {/* Noise-like overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
                      {/* Glow on hover */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-700" />
                      {/* Project number */}
                      <div className="absolute top-5 left-6 text-white/20 text-7xl font-black select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      {/* Arrow */}
                      <motion.div
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500"
                        style={{ backgroundImage: project.gradient, WebkitBackgroundClip: 'text' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-400 group-hover:border-white/10 group-hover:text-gray-300 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-6 pt-5 border-t border-white/[0.06]">
                        <motion.button
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-2 text-sm font-medium transition-colors"
                          style={{ color: project.accent }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Project</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-4 pb-32 pt-12">
          <Reveal>
            <div
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[80%] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 p-12 md:p-20 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Open for Collaborations</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Have a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Vision</span>?
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  Let&apos;s architect something extraordinary together. Our engineering team is ready to turn your next big idea into production-grade reality.
                </p>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,136,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-bold rounded-full text-lg transition-all"
                >
                  Start Your Project
                  <ArrowUpRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
