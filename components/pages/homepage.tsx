'use client';

import { useScroll, motion, useTransform, useSpring, useMotionValueEvent, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Network, ShieldCheck, Cpu, Code2, ArrowRight, 
  Shield, Server, Zap, ChevronDown,
  Brain, Lock, Workflow, Terminal, Globe, Layers,
  ArrowUpRight, Sparkles
} from 'lucide-react';

// Dynamically import the 3D scene to avoid SSR issues
const CinematicScene = dynamic(() => import('@/components/3d/CinematicScene'), { ssr: false });

// ── Reusable animated section wrapper ──────────────────────────────────────
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 1.1, 
        delay, 
        ease: [0.16, 1, 0.3, 1],  // More cinematic ease-out
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ── Magnetic hover button ──────────────────────────────────────────────────
function MagneticButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'ghost' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const base = variant === 'primary'
    ? 'relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden group transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,212,255,0.4)]'
    : 'relative px-8 py-4 border border-white/20 text-white font-medium rounded-full overflow-hidden group hover:border-white/40 transition-all duration-300';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <Link href={href}>
        <button className={base}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
          {variant === 'primary' && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2" />
        </button>
      </Link>
    </motion.div>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
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
  icon: Icon, title, desc, color, className = '', delay = 0 
}: { 
  icon: any; title: string; desc: string; color: string; className?: string; delay?: number 
}) {
  return (
    <RevealSection delay={delay} className={className}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card rounded-2xl p-8 h-full cursor-default group relative overflow-hidden"
      >
        {/* Subtle corner glow on hover */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-[60px]"
          style={{ background: color }}
        />
        
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        
        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">{title}</h4>
        <p className="text-gray-500 font-light leading-relaxed text-sm">{desc}</p>
        
        <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ color }}>
          Explore <ArrowUpRight className="w-3 h-3" />
        </div>
      </motion.div>
    </RevealSection>
  );
}


// ══════════════════════════════════════════════════════════════════════════
// ██  HOMEPAGE  ██████████████████████████████████████████████████████████
// ══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Ultra-smooth spring for text parallax — low stiffness = buttery feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 30, mass: 1 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.10], [0, -60]);
  const heroScale = useTransform(smoothProgress, [0, 0.10], [1, 0.97]);

  return (
    <div ref={containerRef} className="relative text-white">
      
      {/* 3D Cinematic Canvas - fixed background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <CinematicScene scrollYProgress={scrollYProgress} />
      </div>

      {/* Dynamic Background Glows — consistent with other pages */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#a855f7]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#00ff88]/10 blur-[150px]" />
      </div>

      {/* Noise overlay for premium feel */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      <div className="relative z-10 w-full">

        {/* ═══════════════════ SECTION 1: HERO ═══════════════════ */}
        <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale, willChange: 'transform, opacity' }}
            className="text-center w-full max-w-7xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="text-xs font-medium tracking-wider uppercase text-gray-400">Next-Gen Technology Platform</span>
            </motion.div>

            {/* Title */}
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Massive ambient glow behind the text */}
              <h1 className="absolute inset-0 blur-[60px] opacity-40 text-[#00d4ff] text-6xl sm:text-7xl md:text-[9rem] font-black tracking-[-0.04em] leading-[0.85] uppercase pointer-events-none translate-y-2">
                V<span className="opacity-0">i</span>nusXTech
              </h1>
              
              <h1 className="relative text-6xl sm:text-7xl md:text-[9rem] font-black tracking-[-0.04em] leading-[0.85] mb-8 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 drop-shadow-2xl">
                V<span className="opacity-0">i</span>nusXTech
              </h1>
            </motion.div>

            {/* Tagline with staggered word animation */}
            <div className="text-lg md:text-2xl mb-12 max-w-3xl font-light leading-relaxed flex flex-wrap justify-center items-center gap-x-2 gap-y-1 relative z-10 w-full px-4">
              <motion.span 
                initial={{opacity: 0, y: 15}} 
                animate={{opacity: 1, y: 0}} 
                transition={{delay: 0.5, duration: 0.8, ease: "easeOut"}} 
                className="text-gray-300"
              >
                Engineering the Future with
              </motion.span>
              <motion.span 
                initial={{opacity: 0, scale: 0.8, filter: 'blur(8px)'}} 
                animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}} 
                transition={{delay: 0.7, duration: 0.8, type: 'spring', bounce: 0.4}} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff] font-semibold drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]"
              >
                Motion,
              </motion.span>
              <motion.span 
                initial={{opacity: 0, scale: 0.8, filter: 'blur(8px)'}} 
                animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}} 
                transition={{delay: 0.9, duration: 0.8, type: 'spring', bounce: 0.4}} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7] font-semibold drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                Intelligence,
              </motion.span>
              <motion.span 
                initial={{opacity: 0, y: 15}} 
                animate={{opacity: 1, y: 0}} 
                transition={{delay: 1.1, duration: 0.8, ease: "easeOut"}} 
                className="text-gray-300"
              >
                and
              </motion.span>
              <motion.span 
                initial={{opacity: 0, scale: 0.8, filter: 'blur(8px)'}} 
                animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}} 
                transition={{delay: 1.3, duration: 0.8, type: 'spring', bounce: 0.4}} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ff00ff] font-semibold drop-shadow-[0_0_15px_rgba(255,0,255,0.3)] relative pr-1"
              >
                Security.
                {/* Blinking terminal cursor */}
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="absolute -right-2 top-[10%] w-[3px] h-[80%] bg-[#ff00ff] shadow-[0_0_8px_#ff00ff]"
                />
              </motion.span>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <MagneticButton href="/contact" variant="primary">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost">
                Explore Services
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
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
                <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.05] tracking-tight">
                  Intelligence{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">
                    Amplified.
                  </span>
                </h3>
                <p className="text-lg text-gray-500 leading-relaxed font-light mb-8 max-w-lg">
                  We are a modern technology syndicate building the next evolution of intelligent platforms. VinusXTech bridges the gap between deep-tech AI and impenetrable cybersecurity architectures.
                </p>
                <Link href="/about" className="inline-flex items-center gap-3 text-white font-medium text-sm hover:text-[#00d4ff] transition-colors group">
                  <span>Discover our origin</span>
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
                <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
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
                  color="#00d4ff"
                  delay={0.1}
                />
              </div>
              
              <BentoCard
                icon={ShieldCheck}
                title="SOC Monitoring"
                desc="24/7 Security Operations Center with real-time threat detection and automated response."
                color="#a855f7"
                delay={0.2}
              />

              <BentoCard
                icon={Lock}
                title="VAPT & Red Teaming"
                desc="Vulnerability assessment and penetration testing with zero-day defense strategies."
                color="#ff4d8f"
                delay={0.15}
              />

              {/* Large card spanning 2 cols */}
              <div className="lg:col-span-2">
                <BentoCard
                  icon={Code2}
                  title="Full-Stack Engineering"
                  desc="High-performance, scalable web and mobile applications built with modern frameworks. From microservices to serverless — architecture designed for the future."
                  color="#00ff88"
                  delay={0.25}
                />
              </div>

              <BentoCard
                icon={Workflow}
                title="Automation"
                desc="Smart workflows and process orchestration that eliminate inefficiency at scale."
                color="#ff00ff"
                delay={0.2}
              />

              <BentoCard
                icon={Terminal}
                title="DevOps & Cloud"
                desc="CI/CD pipelines, container orchestration, and cloud-native infrastructure."
                color="#ffb347"
                delay={0.25}
              />

              <BentoCard
                icon={Globe}
                title="Digital Transformation"
                desc="End-to-end modernization strategies for enterprise systems and legacy platforms."
                color="#00d4ff"
                delay={0.3}
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
              <h3 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
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
        <section className="relative min-h-[80vh] flex items-center py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <RevealSection>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-4 mb-6 justify-center">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                  <h2 className="text-[11px] font-bold tracking-[0.3em] text-gray-400 uppercase font-mono">Advantage</h2>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
                </div>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Engineered for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
                    Dominance.
                  </span>
                </h3>
              </div>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Security First', 
                  icon: Shield, 
                  desc: 'Every line of code is written with a zero-trust mindset. We don\'t patch security — we architect it.',
                  color: '#00ff88',
                  metric: '0',
                  metricLabel: 'Breaches'
                },
                { 
                  title: 'Infinite Scale', 
                  icon: Layers, 
                  desc: 'Cloud-native architectures that grow organically with demand. No bottlenecks, no ceiling.',
                  color: '#00d4ff',
                  metric: '∞',
                  metricLabel: 'Scalability'
                },
                { 
                  title: 'Innovation Velocity', 
                  icon: Zap, 
                  desc: 'Rapid deployment cycles integrating the latest AI models and cutting-edge frameworks.',
                  color: '#a855f7',
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

        {/* ═══════════════════ SECTION 6: CTA ═══════════════════ */}
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
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-[0.9]">
                Build with<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
                  VinusXTech
                </span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-xl text-gray-500 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
                Secure your infrastructure. Automate your operations.<br />Design the future.
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
