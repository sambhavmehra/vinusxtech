'use client';

import { useScroll, motion, useTransform, useMotionValueEvent, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Network, ShieldCheck, Cpu, Code2, ArrowRight,
  Shield, Server, Zap, ChevronDown,
  Brain, Lock, Workflow, Terminal, Globe, Layers,
  ArrowUpRight, Sparkles, Star, Quote, User
} from 'lucide-react';
import ScrollFloat from '../ScrollFloat';


import BorderGlow from '../ui/BorderGlow';

// ── Reusable animated section wrapper ──────────────────────────────────────
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Magnetic hover button ──────────────────────────────────────────────────
function MagneticButton({ children, href, variant = 'primary' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const base = variant === 'primary'
    ? 'relative px-8 py-4 bg-transparent text-white font-bold rounded-full overflow-hidden group transition-all duration-300 w-full h-full'
    : 'relative px-8 py-4 bg-transparent text-white font-medium rounded-full overflow-hidden group transition-all duration-300 w-full h-full';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
      className="inline-block group w-full sm:w-auto"
    >
      <Link href={href}>
        <BorderGlow
          borderRadius={9999}
          backgroundColor={variant === 'primary' ? 'rgba(255, 255, 255, 0.05)' : 'transparent'}
          glowColor={variant === 'primary' ? '180 100 50' : '0 0 100'}
          edgeSensitivity={30}
          glowRadius={15}
          glowIntensity={variant === 'primary' ? 2 : 1}
          className={`inline-block transition-all duration-300 w-full ${variant === 'primary' ? 'border border-white/20 group-hover:bg-white/10' : 'border border-white/20 group-hover:bg-white/5'}`}
        >
          <button
            className="relative px-8 py-4 text-white font-bold rounded-full overflow-hidden transition-all duration-500 w-full h-full flex items-center justify-center gap-2"
            style={{
              background: variant === 'primary'
                ? 'linear-gradient(145deg, rgba(0, 212, 255, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(0, 212, 255, 0.1) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: variant === 'primary'
                ? 'inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.4), inset 0 0 20px rgba(0,212,255,0.15), 0 0 25px rgba(0,212,255,0.25), 0 4px 15px rgba(0,0,0,0.3)'
                : 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:scale-105">{children}</span>
            {variant === 'primary' && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 0, 128, 0.45) 0%, rgba(255, 179, 71, 0.35) 50%, rgba(168, 85, 247, 0.25) 100%)',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.3), 0 0 40px rgba(255,0,128,0.5), 0 0 80px rgba(255,0,128,0.2)'
                }}
              />
            )}
          </button>
        </BorderGlow>
      </Link>
    </motion.div>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────
function AnimatedStat({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const dur = 2000;
    const step = dur / value;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-black text-gradient mb-2 font-mono">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">{label}</div>
    </div>
  );
}

// ── Tech stack marquee ────────────────────────────────────────────────────
function TechMarquee() {
  const techs = ['React', 'Next.js', 'TensorFlow', 'Python', 'Kubernetes', 'Splunk SIEM', 'Elastic Stack', 'Node.js', 'WebGL', 'Three.js', 'TypeScript', 'Docker', 'AWS', 'Go'];
  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="mx-8 text-lg font-medium text-gray-600 hover:text-[#00d4ff] transition-colors duration-300 cursor-default select-none">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Bento service card ────────────────────────────────────────────────────
function BentoCard({
  icon: Icon, title, desc, color, className = '', delay = 0, features = []
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <RevealSection delay={delay} className={`${className} h-full relative`}>
        <motion.div
          layoutId={`bento-${title.replace(/\s+/g, '-')}`}
          onClick={() => setIsExpanded(true)}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`glass-card rounded-2xl p-8 h-full group relative overflow-hidden cursor-pointer flex flex-col ${isExpanded ? 'opacity-0 pointer-events-none' : ''}`}
        >
          {/* Subtle corner glow on hover */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-[60px]"
            style={{ background: color }}
          />

          <div className="flex justify-between items-start mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100" style={{ color }}>
              Explore <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <h4 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(135deg, white, ${color})`, WebkitBackgroundClip: 'text' }}>{title}</h4>
          <p className="text-gray-500 font-light leading-relaxed text-sm line-clamp-3">{desc}</p>
        </motion.div>
      </RevealSection>

      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-[#050508]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`bento-${title.replace(/\s+/g, '-')}`}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass-card w-full max-w-3xl rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative z-10 flex flex-col shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{ borderColor: `${color}40`, boxShadow: `0 0 80px ${color}20` }}
            >
              {/* Modal Glow */}
              <div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-[80px] pointer-events-none"
                style={{ background: color }}
              />

              <div className="flex justify-between items-start mb-8 relative z-10 flex-wrap gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color }} />
                  </div>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, white, ${color})`, WebkitBackgroundClip: 'text' }}>{title}</h4>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0 ml-auto"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 relative z-10">{desc}</p>

              {features.length > 0 && (
                <div className="border-t border-white/10 pt-8 relative z-10">
                  <h5 className="text-xs uppercase tracking-[0.25em] font-mono text-gray-500 mb-6">Core Capabilities</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                        <div className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_10px_currentColor]" style={{ background: color, color: color }} />
                        <span className="text-gray-300 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


// ══════════════════════════════════════════════════════════════════════════
// ██  HOMEPAGE  ██████████████████████████████████████████████████████████
// ══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [reviews, setReviews] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    fetch('/api/review')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(console.error);
  }, []);

  // Direct scroll tracking — no spring delay so hero appears instantly when scrolling back up
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative text-white">


      {/* Dynamic Background Glows — removed for pure black aesthetic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
        {/* Colorful glows removed to achieve the requested Option 1 (Pure Deep Black) */}
      </div>

      {/* Noise overlay for premium feel — desktop only (SVG filters are GPU-heavy on mobile) */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      )}

      <div className="relative z-10 w-full">

        {/* ═══════════════════ SECTION 1: HERO ═══════════════════ */}
        <section className="relative min-h-screen flex flex-col items-start justify-center pt-24 sm:pt-32 px-0 sm:px-4 overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale, willChange: 'transform, opacity' }}
            className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 sm:px-8 md:px-16 pointer-events-auto"
          >
            {/* Centered Badge spanning full width */}
            <div className="col-span-1 lg:col-span-2 flex justify-center w-full mb-2 lg:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span className="text-xs font-medium tracking-wider uppercase text-gray-400">Next-Gen Technology Platform</span>
              </motion.div>
            </div>

            {/* Left Column: Text */}
            <div className="text-left flex flex-col items-start relative z-10">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Massive ambient glow behind the text - Static color prevents lag */}
                <h1 className="absolute inset-0 blur-[60px] opacity-20 text-white text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.02em] leading-[1.1] pointer-events-none translate-y-2">
                  We Don&apos;t Build Software.<br />We Build Intelligent Power.
                </h1>

                {/* Solid White Text */}
                <motion.h1
                  className="relative text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-[-0.02em] leading-[1.1] mb-6 sm:mb-8 text-white drop-shadow-2xl"
                >
                  We Don&apos;t Build Software.<br />We Build Intelligent Power.
                </motion.h1>
              </motion.div>

              {/* Tagline with staggered word animation */}
              <div className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl font-light leading-relaxed flex flex-wrap justify-start items-center gap-x-2 gap-y-1 relative z-10 w-full text-gray-300">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  Engineering the Future with
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-white font-medium"
                >
                  Agentic AI,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-white font-medium"
                >
                  Advanced Cybersecurity,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                >
                  and
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-white font-medium relative pr-1"
                >
                  Custom Software Development.
                  {/* Blinking terminal cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="absolute -right-2 top-[10%] w-[2px] h-[80%] bg-white"
                  />
                </motion.span>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-start w-full sm:w-auto"
              >
                <MagneticButton href="/contact" variant="primary">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost">
                  Explore Services
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Column: Intelligent Power Animation — desktop only */}
            <div className="hidden lg:flex items-center justify-center relative w-full aspect-square max-h-[600px] pointer-events-none">
              {/* Central Glowing Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-40 h-40 bg-gradient-to-br from-[#00d4ff]/40 to-transparent rounded-full blur-[40px]"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute w-20 h-20 bg-white rounded-full shadow-[0_0_60px_#ffffff]"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute w-24 h-24 border border-white/20 rounded-full border-t-white/80"
                />
              </div>

              {/* Orbital Rings */}
              <motion.div
                animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
                transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: "linear" } }}
                className="absolute w-[70%] h-[70%] rounded-full border border-white/10 border-t-[#00d4ff]/60 border-r-[#00d4ff]/60"
                style={{ transformStyle: 'preserve-3d' }}
              />

              <motion.div
                animate={{ rotateX: [70, 70], rotateY: [45, 45], rotateZ: [0, -360] }}
                transition={{ rotateZ: { duration: 25, repeat: Infinity, ease: "linear" } }}
                className="absolute w-[90%] h-[90%] rounded-full border border-white/5 border-b-white/40 border-l-white/40"
                style={{ transformStyle: 'preserve-3d', borderStyle: 'dashed' }}
              />

              <motion.div
                animate={{ rotateX: [45, 45], rotateY: [-45, -45], rotateZ: [0, 360] }}
                transition={{ rotateZ: { duration: 15, repeat: Infinity, ease: "linear" } }}
                className="absolute w-[50%] h-[50%] rounded-full border border-white/10 border-r-[#00d4ff]/40"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Floating Data Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, (i % 2 === 0 ? 20 : -20), 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]"
                  style={{
                    left: `${40 + Math.random() * 20}%`,
                    top: `${40 + Math.random() * 20}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator — hidden on mobile to avoid overlap with CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════ SECTION 2: ABOUT ═══════════════════ */}
        <section className="relative min-h-screen flex items-center py-32">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Text */}
              <RevealSection>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-[#00d4ff] to-transparent" />
                  <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">Who We Are</h2>
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-[1.05] tracking-tight">
                  Intelligence{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">
                    Amplified.
                  </span>
                </h3>
                <p className="text-lg text-gray-500 leading-relaxed font-light mb-8 max-w-lg">
                At VinusXTech, we create intelligent digital experiences that keep businesses ahead of the curve. From fast, secure websites and custom mobile apps to powerful AI solutions, our goal is to simplify technology and deliver real results. We handle the code, security, and performance so you can focus on what you do best—growing your business.
                </p>
                <Link href="/about" className="inline-flex items-center gap-3 text-white font-medium text-sm hover:text-[#00d4ff] transition-colors group">
                  <span>About VinusXTech — AI & Cybersecurity Experts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </RevealSection>

              {/* Right Stats */}
              <RevealSection delay={0.2}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <AnimatedStat value={50} label="Projects Delivered" suffix="+" />
                  </div>
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <AnimatedStat value={99} label="Uptime Guaranteed" suffix="%" />
                  </div>
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <AnimatedStat value={24} label="Hour Support" suffix="/7" />
                  </div>
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <AnimatedStat value={15} label="Team Members" suffix="+" />
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ═══════════════════ SECTION 3: SERVICES (Bento Grid) ═══════════════════ */}
        <section className="relative min-h-screen flex items-center py-32">
          <div className="container mx-auto px-4 max-w-7xl w-full">
            <RevealSection>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00ff88]" />
                  <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">Capabilities</h2>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#00ff88]" />
                </div>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                  Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Nodes</span>
                </h3>
              </div>
            </RevealSection>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Large card spanning 2 cols */}
              <div className="lg:col-span-2">
                <BentoCard
                  icon={Brain}
                  title="AI Systems & Intelligence"
                  desc="Predictive models, intelligent agents, and neural architectures that learn, adapt, and evolve. From NLP pipelines to computer vision — we build AI that thinks."
                  color="#00d4ffff"
                  delay={0.1}
                  features={[
                    'Custom Neural Architecture Design',
                    'Predictive Analytics & Forecasting',
                    'Real-time Machine Vision',
                    'Autonomous Agent Development',
                    'Deep Semantic Intelligence & RAG'
                  ]}
                />
              </div>

              <BentoCard
                icon={ShieldCheck}
                title="SOC Monitoring"
                desc="24/7 Security Operations Center with real-time threat detection and automated response."
                color="#a855f7"
                delay={0.2}
                features={[
                  'Real-time Heuristic Monitoring',
                  'Automated Incident Response',
                  'AI-Driven Anomaly Alerts',
                  'Dark Web Threat Intelligence'
                ]}
              />

              <BentoCard
                icon={Lock}
                title="VAPT & Red Teaming"
                desc="Vulnerability assessment and penetration testing with zero-day defense strategies."
                color="#ff4d8f"
                delay={0.15}
                features={[
                  'Network Penetration Testing',
                  'API Security Audits',
                  'Zero-Day Threat Modeling',
                  'Advanced Social Engineering'
                ]}
              />

              {/* Large card spanning 2 cols */}
              <div className="lg:col-span-2">
                <BentoCard
                  icon={Code2}
                  title="Full-Stack Engineering"
                  desc="High-performance, scalable web and mobile applications built with modern frameworks. From microservices to serverless — architecture designed for the future."
                  color="#00ff88"
                  delay={0.25}
                  features={[
                    'Next.js React Ecosystems',
                    'High-Load Microservice Backends',
                    'Interactive WebGL Interfaces',
                    'Event-Driven Architectures',
                    'Enterprise System Development'
                  ]}
                />
              </div>

              <BentoCard
                icon={Workflow}
                title="Automation"
                desc="Smart workflows and process orchestration that eliminate inefficiency at scale."
                color="#ff00ff"
                delay={0.2}
                features={[
                  'Robotic Process Automation (RPA)',
                  'API Ecosystem Orchestration',
                  'Self-Healing Infrastructure',
                  'CI/CD Pipeline Generation'
                ]}
              />

              <BentoCard
                icon={Terminal}
                title="DevOps & Cloud"
                desc="CI/CD pipelines, container orchestration, and cloud-native infrastructure."
                color="#ffb347"
                delay={0.25}
                features={[
                  'Container Orchestration (K8s)',
                  'Infrastructure as Code (IaC)',
                  'Multi-Region High Availability',
                  'Zero-Downtime Deployments'
                ]}
              />

              <BentoCard
                icon={Globe}
                title="Digital Transformation"
                desc="End-to-end modernization strategies for enterprise systems and legacy platforms."
                color="#00d4ff"
                delay={0.3}
                features={[
                  'Monolith to Microservices',
                  'Legacy Database Migrations',
                  'Digital Strategy Consulting',
                  'Enterprise Cloud Adoption'
                ]}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════ SECTION 4: TECH MARQUEE ═══════════════════ */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <RevealSection>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#a855f7] to-transparent" />
                <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">Arsenal</h2>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ff00ff]">Stack</span>
              </h3>
            </RevealSection>
          </div>

          <TechMarquee />

          <div className="container mx-auto px-4 max-w-7xl mt-12">
            <RevealSection delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'React & Next.js', cat: 'Frontend' },
                  { name: 'TensorFlow & PyTorch', cat: 'AI/ML' },
                  { name: 'Kubernetes & Docker', cat: 'DevOps' },
                  { name: 'Splunk & Elastic', cat: 'Security' },
                  { name: 'Node.js & Go', cat: 'Backend' },
                  { name: 'Python & Rust', cat: 'Systems' },
                  { name: 'WebGL & Three.js', cat: '3D/WebXR' },
                  { name: 'AWS & GCP', cat: 'Cloud' },
                ].map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -2, borderColor: 'rgba(0,212,255,0.3)' }}
                    className="glass-card flex flex-col items-center justify-center p-6 rounded-xl cursor-default group"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-2 font-mono">{tech.cat}</span>
                    <span className="font-semibold text-gray-300 text-sm text-center group-hover:text-white transition-colors">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══════════════════ SECTION 5: WHY US ═══════════════════ */}
        <section className="relative flex flex-col justify-center pt-16 pb-16 mt-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <RevealSection>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                  <h2 className="text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase font-mono">Advantage</h2>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
                </div>
                <div className="flex justify-center w-full mb-0">
                  <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='top bottom+=10%'
                    scrollEnd='bottom center+=20%'
                    stagger={0.03}
                    textClassName="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white pb-4"
                  >
                    Engineered for Dominance.
                  </ScrollFloat>
                </div>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Security First',
                  icon: Shield,
                  desc: 'Every line of code is written with a zero-trust mindset. We don\'t patch security — we architect it.',
                  color: '#ffffff',
                  metric: '0',
                  metricLabel: 'Breaches'
                },
                {
                  title: 'Infinite Scale',
                  icon: Layers,
                  desc: 'Cloud-native architectures that grow organically with demand. No bottlenecks, no ceiling.',
                  color: '#ffffff',
                  metric: '∞',
                  metricLabel: 'Scalability'
                },
                {
                  title: 'Innovation Velocity',
                  icon: Zap,
                  desc: 'Rapid deployment cycles integrating the latest AI models and cutting-edge frameworks.',
                  color: '#ffffff',
                  metric: '10x',
                  metricLabel: 'Faster'
                },
              ].map((item, i) => (
                <RevealSection key={item.title} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="glass-card rounded-2xl p-10 group cursor-default relative overflow-hidden h-full"
                  >
                    {/* Background accent */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                      style={{ background: item.color }}
                    />

                    {/* Metric */}
                    <div className="text-5xl font-black mb-6 font-mono" style={{ color: item.color }}>
                      {item.metric}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-6 font-mono">{item.metricLabel}</div>

                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: `${item.color}12` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>

                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ SECTION 6: REVIEWS ═══════════════════ */}
        {reviews.length > 0 && (
          <section className="relative min-h-[80vh] flex items-center py-32 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
              <RevealSection>
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-4 mb-6 justify-center">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#ffb347]" />
                    <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#ffb347] uppercase font-mono">Testimonials</h2>
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#ffb347]" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                    Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb347] to-[#ff00ff]">Reviews</span>
                  </h3>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((testimonial, i) => {
                  const colors = ['#ffb347', '#00d4ff', '#a855f7', '#00ff88'];
                  const color = colors[i % colors.length];

                  return (
                    <RevealSection key={testimonial.id || i} delay={i * 0.15}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="glass-card rounded-2xl p-8 group relative overflow-hidden h-full flex flex-col justify-between"
                      >
                        {/* Background accent */}
                        <div
                          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                          style={{ background: color }}
                        />

                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <Quote className="w-8 h-8 opacity-20" style={{ color }} />
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating || 5)].map((_, idx) => (
                                <Star key={idx} className="w-3.5 h-3.5 fill-current" style={{ color }} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 font-light text-base leading-relaxed mb-8 relative z-10 italic">
                            "{testimonial.message}"
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-6 relative z-10 flex items-center gap-4">
                          {/* Client Image / Icon */}
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={`VinusXTech AI solutions - ${testimonial.name}`}
                              className="w-12 h-12 rounded-full object-cover border-2 shadow-lg flex-shrink-0"
                              style={{ borderColor: `${color}40` }}
                            />
                          ) : (
                            <div
                              className="w-12 h-12 rounded-full border-2 shadow-lg flex-shrink-0 flex items-center justify-center bg-white/5"
                              style={{ borderColor: `${color}40` }}
                            >
                              <User className="w-5 h-5 text-gray-300" />
                            </div>
                          )}

                          {/* Client Details */}
                          <div>
                            <h4 className="text-white font-bold text-base">{testimonial.name}</h4>
                            {testimonial.role && (
                              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mt-0.5">
                                {testimonial.role} {testimonial.company && `, ${testimonial.company}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </RevealSection>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════ SECTION 7: CTA ═══════════════════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-32 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#00d4ff]/10 via-[#a855f7]/10 to-[#00ff88]/10 blur-[120px] animate-breathe" />
          </div>

          <div className="text-center z-10 px-4 relative">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs font-medium tracking-wider uppercase text-gray-400">Ready to Launch</span>
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-[0.9]">
                Build with<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
                  VinusXTech
                </span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-xl text-gray-500 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
                From Agentic AI to VAPT cybersecurity, VinusXTech builds the technology that scales your startup.<br />Let&apos;s design the future together.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MagneticButton href="/contact" variant="primary">
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton href="/services" variant="ghost">
                  View All Services
                </MagneticButton>
              </div>
            </RevealSection>

            {/* Decorative bottom line */}
            <RevealSection delay={0.5}>
              <div className="mt-20 flex items-center justify-center gap-4">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#00d4ff]/30" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-700 font-mono">VinusXTech © {new Date().getFullYear()}</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#00d4ff]/30" />
              </div>
            </RevealSection>
          </div>
        </section>

      </div>
    </div>
  );
}
