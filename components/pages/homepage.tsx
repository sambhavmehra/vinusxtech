'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Code, Shield, Brain, Lock, ArrowRight, CircleCheck, Terminal } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';

// Dynamically import the 3D scene to avoid SSR issues
const CinematicScene = dynamic(() => import('@/components/3d/CinematicScene'), { ssr: false });

const services = [
  {
    icon: Code,
    title: 'Software Development',
    description: 'Custom web and mobile applications built with cutting-edge technologies for scalable, high-performance solutions.',
    color: '#00ff88',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Machine learning models and AI-powered applications that transform data into actionable insights.',
    color: '#00d4ff',
  },
  {
    icon: Shield,
    title: 'VAPT Testing',
    description: 'Comprehensive vulnerability assessment and penetration testing to identify and fix security weaknesses.',
    color: '#a855f7',
  },
  {
    icon: Lock,
    title: 'SOC Monitoring',
    description: '24/7 security operations center monitoring to detect, analyze, and respond to cyber threats in real-time.',
    color: '#00ff88',
  },
];

const projects = [
  {
    title: 'SIEM + IDS System',
    description: 'Real-time security information and event management system with intrusion detection capabilities.',
    tags: ['Security', 'SIEM', 'Python', 'ELK Stack'],
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
  },
  {
    title: 'SHARVA AI',
    description: 'Advanced AI-powered analytics platform for predictive modeling and business intelligence.',
    tags: ['AI', 'Machine Learning', 'TensorFlow', 'React'],
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
  },
  {
    title: 'SOAR SOC Platform',
    description: 'Security Orchestration, Automation and Response platform for incident management.',
    tags: ['Security', 'Automation', 'Python', 'Docker'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00ff88 100%)',
  },
];

const features = [
  'Zero Trust Architecture',
  'Automated Threat Response',
  'Quantum-Safe Encryption',
  'Proactive Threat Hunting'
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-[#05050A] text-white selection:bg-[#00ff88] selection:text-black">
      
      {/* 3D Cinematic Canvas wrapper */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <CinematicScene scrollYProgress={scrollYProgress} />
      </div>

      <div className="relative z-10 w-full">
        
        {/* SECTION 1: HERO */}
        <section className="relative h-[120vh] flex flex-col items-center justify-center px-4 overflow-hidden">
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1], [0, -100]),
              scale: useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
            }}
            className="text-center w-full max-w-5xl mx-auto flex flex-col items-center mt-[-10vh]"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-6">
                <span className="block text-white">We Build</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7] pb-4">
                   &amp; Secure
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-gray-300 font-light tracking-wide mt-2">
                  Digital Solutions.
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-light"
            >
              Experience the pinnacle of AI integration, enterprise development, and next-gen cybersecurity.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex gap-6"
            >
              <Link href="/contact" className="pointer-events-auto">
                <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#00ff88] transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(0,255,136,0.2)]">
                  Initiate Sequence
                </button>
              </Link>
              <Link href="/services" className="pointer-events-auto">
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Explore Tech
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll down</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* SECTION 2: SERVICES */}
        <section className="relative min-h-[150vh] pt-[20vh] pb-[30vh]">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.35], [0, 1, 1, 0]),
                x: useTransform(scrollYProgress, [0.1, 0.15], [-100, 0]),
              }}
              className="mb-20 pointer-events-auto"
            >
              <h2 className="text-sm font-bold tracking-widest text-[#00ff88] uppercase mb-4">Phase 01 /// Architecture</h2>
              <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Scalable Solutions.<br />
                <span className="text-gray-500">Infinite Possibilities.</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  style={{
                    opacity: useTransform(
                      scrollYProgress, 
                      [0.12 + index * 0.02, 0.18 + index * 0.02, 0.3, 0.35], 
                      [0, 1, 1, 0]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [0.12 + index * 0.02, 0.18 + index * 0.02],
                      [100, 0]
                    )
                  }}
                  className="pointer-events-auto"
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section className="relative min-h-[150vh] py-[20vh]">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.65], [0, 1, 1, 0]),
                scale: useTransform(scrollYProgress, [0.35, 0.4], [0.8, 1]),
              }}
              className="text-center mb-24 pointer-events-auto"
            >
              <h2 className="text-sm font-bold tracking-widest text-[#00d4ff] uppercase mb-4">Phase 02 /// Deployment</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6">
                Featured Deployments
              </h3>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover our portfolio of enterprise-grade applications and security infrastructures actively defending global networks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  style={{
                    opacity: useTransform(scrollYProgress, [0.4 + index * 0.05, 0.45 + index * 0.05, 0.6, 0.65], [0, 1, 1, 0]),
                    z: useTransform(scrollYProgress, [0.4, 0.5], [-500, 0]),
                    rotateX: useTransform(scrollYProgress, [0.4, 0.48], [45, 0]),
                  }}
                  className="pointer-events-auto [perspective:1000px]"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]),
              }}
              className="text-center mt-20 pointer-events-auto"
            >
              <Link href="/projects">
                <button className="px-8 py-4 bg-transparent border border-[#00d4ff]/40 text-[#00d4ff] font-semibold rounded-full hover:bg-[#00d4ff]/10 transition-all duration-300">
                  View full registry →
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: CYBERSECURITY */}
        <section className="relative min-h-[150vh] py-[20vh] flex items-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <motion.div
                style={{
                  opacity: useTransform(scrollYProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]),
                  x: useTransform(scrollYProgress, [0.65, 0.75], [-150, 0])
                }}
                className="lg:w-1/2 pointer-events-auto"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-[2px] bg-[#a855f7]" />
                  <h2 className="text-sm font-bold tracking-widest text-[#a855f7] uppercase">Phase 03 /// Defense</h2>
                </div>
                <h3 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00d4ff]">Absolute</span> <br />
                  Digital Defense.
                </h3>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                  We engineer zero-trust environments. Our advanced SOC monitoring and VAPT services provide an impenetrable shield around your most critical digital assets.
                </p>
                
                <div className="flex flex-col gap-4">
                  {features.map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md"
                    >
                      <Terminal className="w-5 h-5 text-[#a855f7]" />
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA */}
        <section className="relative h-[100vh] flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]),
              scale: useTransform(scrollYProgress, [0.85, 0.95], [0.8, 1])
            }}
            className="text-center z-10 px-4 pointer-events-auto mt-[15vh]"
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Evolve?</span>
            </h2>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
              Join the ranks of enterprises secured and accelerated by VinUSXtech.
            </p>
            <Link href="/contact">
              <button className="px-10 py-5 bg-[#00ff88] text-black text-xl font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(0,255,136,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] relative overflow-hidden group">
                <span className="relative z-10">Start the Revolution</span>
                <div className="absolute inset-0 block bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
              </button>
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
