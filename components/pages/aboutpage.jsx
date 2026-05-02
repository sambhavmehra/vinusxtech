'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Target, Award, Shield, Zap, Sparkles, Globe2, ArrowUpRight } from 'lucide-react';
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
    {children}
  </motion.div>);
}
function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView)
      return;
    let start = 0;
    const duration = 2000;
    const step = 20;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref} className="font-mono">{count}{suffix}</span>;
}
const values = [
  { icon: Shield, title: 'Security First', description: 'Every solution we build is designed with zero-trust architecture at its core. Security isn\'t an afterthought; it\'s the foundation.', color: '#00ff88' },
  { icon: Zap, title: 'Innovation Velocity', description: 'We stay ahead of the curve, aggressively integrating the latest AI models and cutting-edge operational frameworks.', color: '#00d4ff' },
  { icon: Users, title: 'Symbiotic Growth', description: 'Your success is intrinsically tied to ours. We operate as an extension of your team, deeply aligning with your goals.', color: '#a855f7' },
  { icon: Award, title: 'Uncompromising Excellence', description: 'We maintain ruthless standards in code quality, automated testing, and continuous delivery pipelines.', color: '#ffb347' },
];
const stats = [
  { name: 'Projects', count: 50, color: '#00d4ff' },
  { name: 'Clients', count: 30, color: '#a855f7' },
  { name: 'Uptime %', count: 99, color: '#00ff88' },
  { name: 'Team', count: 15, color: '#ffb347' },
];
export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  return (<div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">

    {/* Dynamic Background */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background glows removed for global aesthetic */}
    </div>

    <div className="relative z-10 w-full">

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-20 px-4 min-h-[60vh] flex flex-col justify-center items-center text-center">
        <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400">The VinusXTech Protocol</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00ff88] drop-shadow-2xl">
              Us.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
            We are a syndicate of elite technologists, ethical hackers, and AI researchers architecting impenetrable, autonomous digital ecosystems.
          </p>
        </motion.div>
      </section>

      {/* STATS STRIP SECTION */}
      <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-xl relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {stats.map((stat, i) => (<RevealSection key={stat.name} delay={i * 0.1} className="text-center px-4">
              <div className="text-5xl md:text-6xl mx-auto font-black mb-3 tracking-tighter" style={{
                backgroundImage: `linear-gradient(135deg, white, ${stat.color})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <Counter value={stat.count} suffix="+" />
              </div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">{stat.name}</div>
            </RevealSection>))}
          </div>
        </div>
      </section>

      {/* STORY & MISSION (BENTO BOX LAYOUT) */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <RevealSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">Origin & Directive</h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main Story Card */}
            <RevealSection className="lg:col-span-2 h-full">
              <div className="glass-card rounded-3xl p-10 md:p-14 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00ff88]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />

                <h3 className="text-3xl md:text-5xl font-bold mb-8">The Genesis</h3>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light relative z-10">
                  <p>
                  At VinusXTech, we believe technology should be both powerful and secure — not a compromise between the two.
                  </p>
                  <p>
                   Founded in 2026, we come from strong backgrounds in cybersecurity and software development, where we saw businesses struggling with systems that were either fast but vulnerable, or secure but inefficient. We set out to change that.
                  </p>
                  <p>
                 Today, we build AI-driven, secure, and scalable digital solutions — from intelligent applications and automation systems to cybersecurity services like VAPT and threat protection.
                  </p>
                  <p>
               We focus on solving real problems, not just delivering code.
Our goal is simple: help businesses grow with technology that is smart, reliable, and built for the future.
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* Mission & Vision Stack */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              <RevealSection delay={0.2} className="h-full">
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Target className="w-10 h-10 text-[#00d4ff] mb-6" />
                  <h4 className="text-2xl font-bold mb-4 text-white">Our Mission</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    To empower enterprises with autonomous security operations and scalable technology architectures that eliminate bottlenecks and mitigate existential threats.
                  </p>
                </div>
              </RevealSection>

              <RevealSection delay={0.3} className="h-full">
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Globe2 className="w-10 h-10 text-[#a855f7] mb-6" />
                  <h4 className="text-2xl font-bold mb-4 text-white">Our Vision</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    To become the global nexus for secure innovation, setting the absolute standard for how code is written, deployed, and defended in the digital age.
                  </p>
                </div>
              </RevealSection>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-4 relative mb-24">
        <div className="container mx-auto max-w-7xl">
          <RevealSection className="text-center mb-24">
            <div className="inline-flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#a855f7]" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">Guiding Principles</h2>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#a855f7]" />
            </div>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00d4ff]">Values</span>
            </h3>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (<RevealSection key={value.title} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ background: value.color }} />

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}>
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>

                <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            </RevealSection>))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - 2 COLUMN LAYOUT */}
      <section className="pt-24 pb-8 px-4 relative overflow-hidden">
        {/* Ambient Background Glows Removed for Performance */}

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* LEFT COLUMN - TEXT CONTENT */}
            <RevealSection className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00d4ff]" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">The VinusXTech Advantage</h2>
              </div>
              
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Why Choose <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00ff88]">VinusXTech</span>
              </h3>
              
              <p className="text-lg text-gray-400 font-light leading-relaxed mb-12 max-w-xl">
                We architect intelligent, scalable systems that simplify complex technology. By seamlessly integrating AI, advanced cybersecurity, and automation, we empower businesses to accelerate growth and dominate their digital landscape.
              </p>

              <div className="space-y-8">
                {/* Point 1 */}
                <motion.div whileHover={{ x: 10 }} className="flex gap-4 group transition-transform duration-300">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:bg-[#00d4ff]/20 group-hover:scale-110 transition-all">
                      <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">Cross-Domain Expertise</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We master the complete technological spectrum—delivering world-class AI solutions, impenetrable cybersecurity, and scalable application development under one roof.
                    </p>
                  </div>
                </motion.div>

                {/* Point 2 */}
                <motion.div whileHover={{ x: 10 }} className="flex gap-4 group transition-transform duration-300">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center group-hover:bg-[#a855f7]/20 group-hover:scale-110 transition-all">
                      <Target className="w-4 h-4 text-[#a855f7]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors">Tailored Strategic Solutions</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      No cookie-cutter templates. We architect bespoke digital strategies and custom infrastructure perfectly aligned with your unique business objectives.
                    </p>
                  </div>
                </motion.div>

                {/* Point 3 */}
                <motion.div whileHover={{ x: 10 }} className="flex gap-4 group transition-transform duration-300">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center group-hover:bg-[#00ff88]/20 group-hover:scale-110 transition-all">
                      <Zap className="w-4 h-4 text-[#00ff88]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">Proven Scalable Architecture</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      From initial MVP to enterprise deployment, we engineer resilient systems designed to handle compounding traffic and massive scale without friction.
                    </p>
                  </div>
                </motion.div>

                {/* Point 4 */}
                <motion.div whileHover={{ x: 10 }} className="flex gap-4 group transition-transform duration-300">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">End-to-End Partnership</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We are not just vendors; we are your technology partners. We provide complete lifecycle support from conceptualization and design to deployment and continuous optimization.
                    </p>
                  </div>
                </motion.div>
              </div>
            </RevealSection>

            {/* RIGHT COLUMN - VISUAL */}
            <RevealSection delay={0.2} className="relative h-full min-h-[500px] lg:min-h-[700px] flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[4/5]">
                {/* Image Container with overflow-hidden */}
                <div className="absolute inset-0 rounded-[2.5rem] glass-card border border-white/10 overflow-hidden group">
                  {/* Inner Glow / Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#05050a] via-transparent to-[#00d4ff]/20 z-10 opacity-60 mix-blend-overlay" />
                  
                  {/* Futuristic Image */}
                  <img 
                    src="/why-choose-us.jpg" 
                    alt="Premium AI and Technology Core" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80"
                  />

                  {/* Data Processing Lines */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05050a] to-transparent z-10" />
                </div>

                {/* Holographic Floating UI Elements (Outside overflow-hidden) */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -left-6 md:-left-12 z-20 glass-card px-6 py-4 rounded-2xl border border-[#00d4ff]/30 shadow-[0_0_30px_rgba(0,212,255,0.15)] backdrop-blur-xl flex items-center gap-4 bg-black/40"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-1">Security Status</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" /> Protected
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 -right-6 md:-right-12 z-20 glass-card px-6 py-4 rounded-2xl border border-[#a855f7]/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-xl flex items-center gap-4 bg-black/40"
                >
                  <div className="w-10 h-10 rounded-full bg-[#a855f7]/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-[#a855f7]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-1">AI Engine</p>
                    <p className="text-sm font-bold text-white">Online & Learning</p>
                  </div>
                </motion.div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

    </div>
  </div>);
}
