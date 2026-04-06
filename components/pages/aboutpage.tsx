'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Target, Award, TrendingUp, Shield, Zap, Sparkles, Globe2, ArrowUpRight } from 'lucide-react';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
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
  { name: 'Security Engineers', count: 50, color: '#00ff88' },
  { name: 'Full-Stack Devs', count: 75, color: '#00d4ff' },
  { name: 'AI Specialists', count: 25, color: '#a855f7' },
  { name: 'Enterprise Clients', count: 120, color: '#ff00ff' },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#a855f7]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#00ff88]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-20 px-4 min-h-[60vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">The VinusXTech Protocol</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00ff88] drop-shadow-2xl">
                The Future.
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
              {stats.map((stat, i) => (
                <RevealSection key={stat.name} delay={i * 0.1} className="text-center px-4">
                  <div 
                    className="text-5xl md:text-6xl mx-auto font-black mb-3 tracking-tighter"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, white, ${stat.color})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    <Counter value={stat.count} suffix="+" />
                  </div>
                  <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">{stat.name}</div>
                </RevealSection>
              ))}
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
                      Founded in 2018, VinusXTech emerged from a simple but radical vision inside a small terminal: bridging the chasm between rapid software development and unbreakable cybersecurity.
                    </p>
                    <p>
                      Our founders, veterans in offensive cybersecurity and enterprise architecture, recognized that modern businesses were forced to choose between moving fast and staying secure. We rejected that premise.
                    </p>
                    <p>
                      Today, we operate globally, deploying AI-driven monitoring, conducting deep-tier VAPT operations, and building infinitely scalable web applications for a roster of Fortune 500s and disruptive startups.
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
              {values.map((value, idx) => (
                <RevealSection key={value.title} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5"
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                      style={{ background: value.color }}
                    />
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}
                    >
                      <value.icon className="w-6 h-6" style={{ color: value.color }} />
                    </div>
                    
                    <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{value.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP / FOUNDERS */}
        <section className="py-20 px-4 relative mb-24">
          <div className="container mx-auto max-w-7xl">
            <RevealSection className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6 justify-center">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00d4ff]" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">Leadership</h2>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#00d4ff]" />
              </div>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">Founders</span>
              </h3>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Founder 1: Sambhav */}
              <RevealSection delay={0.1} className="h-full">
                <a 
                  href="https://sambhavmehra.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-3xl p-8 md:p-10 h-full relative overflow-hidden transition-all duration-500 border border-white/5 group-hover:border-[#00ff88]/30 group-hover:bg-white/[0.03]"
                  >
                    {/* Top glow border on hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Ambient glow in corner */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#00ff88]/5 border border-[#00ff88]/20 flex items-center justify-center opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-20 backdrop-blur-md">
                      <ArrowUpRight className="w-5 h-5 text-[#00ff88]" />
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-6 xl:items-start relative z-10">
                      {/* Avatar placeholder / Monogram */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,255,136,0.1)] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-shadow">
                        <span className="text-2xl md:text-3xl font-black italic text-[#00ff88] tracking-tighter">SM</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-[#00ff88] transition-colors">Sambhav Mehra</h4>
                        <a href="mailto:sambhavmehra07@gmail.com" className="text-[#00ff88] text-xs font-mono mb-4 block hover:underline" onClick={(e) => e.stopPropagation()}>{`sambhavmehra07@gmail.com`}</a>
                        
                        <div className="flex flex-wrap gap-2 mb-5">
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-300">Ethical Hacker</span>
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-300">SOC Expert</span>
                          <span className="px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[#00ff88]">AI / ML</span>
                        </div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed">
                          A passionate cybersecurity visionary specializing in advanced threat detection, penetration testing, and integrating artificial intelligence into security operations to build impenetrable infrastructures. Click to view full portfolio.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </RevealSection>

              {/* Founder 2: Ujjwal */}
              <RevealSection delay={0.2} className="h-full">
                <a 
                  href="#"
                  className="block group h-full cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-3xl p-8 md:p-10 h-full relative overflow-hidden transition-all duration-500 border border-white/5 group-hover:border-[#00d4ff]/30 group-hover:bg-white/[0.03]"
                  >
                    {/* Top glow border on hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Ambient glow in corner */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#00d4ff]/5 border border-[#00d4ff]/20 flex items-center justify-center opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-20 backdrop-blur-md">
                      <ArrowUpRight className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-6 xl:items-start relative z-10">
                      {/* Avatar placeholder / Monogram */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#00d4ff]/5 border border-[#00d4ff]/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,212,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-shadow">
                        <span className="text-2xl md:text-3xl font-black italic text-[#00d4ff] tracking-tighter">UK</span>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-[#00d4ff] transition-colors">Ujjwal Kumar</h4>
                        <a href="mailto:ujjwalsingh200707@gmail.com" className="text-[#00d4ff] text-xs font-mono mb-4 block hover:underline" onClick={(e) => e.stopPropagation()}>{`ujjwal@vinusxtech.com`}</a>
                        
                        <div className="flex flex-wrap gap-2 mb-5">
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-300">Python Developer</span>
                          <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[#00d4ff]">AI / ML Engineer</span>
                        </div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed">
                          An expert software engineer focused on developing scalable artificial intelligence architectures, training complex machine learning models, and building high-performance backend systems.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </RevealSection>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
