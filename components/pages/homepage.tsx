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
    <div ref={containerRef} className="relative text-white selection:bg-[#00ff88] selection:text-black">
      
      {/* 3D Cinematic Canvas wrapper */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <CinematicScene scrollYProgress={scrollYProgress} />
      </div>

      <div className="relative z-10 w-full">
        
        {/* SECTION 1: HERO */}
        <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="text-center w-full max-w-5xl mx-auto flex flex-col items-center">
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
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll down</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
          </div>
        </section>

        {/* SECTION 2: SERVICES */}
        <section className="relative py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-20 pointer-events-auto">
              <h2 className="text-sm font-bold tracking-widest text-[#00ff88] uppercase mb-4">Phase 01 /// Architecture</h2>
              <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Scalable Solutions.<br />
                <span className="text-gray-500">Infinite Possibilities.</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <div key={service.title} className="pointer-events-auto">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section className="relative py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-24 pointer-events-auto">
              <h2 className="text-sm font-bold tracking-widest text-[#00d4ff] uppercase mb-4">Phase 02 /// Deployment</h2>
              <h3 className="text-5xl md:text-7xl font-bold mb-6">
                Featured Deployments
              </h3>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover our portfolio of enterprise-grade applications and security infrastructures actively defending global networks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={project.title} className="pointer-events-auto">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-20 pointer-events-auto">
              <Link href="/projects">
                <button className="px-8 py-4 bg-transparent border border-[#00d4ff]/40 text-[#00d4ff] font-semibold rounded-full hover:bg-[#00d4ff]/10 transition-all duration-300">
                  View full registry →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: CYBERSECURITY */}
        <section className="relative py-32 flex items-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2 pointer-events-auto">
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
                    <div 
                      key={feature}
                      className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md"
                    >
                      <Terminal className="w-5 h-5 text-[#a855f7]" />
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA */}
        <section className="relative min-h-[80vh] flex items-center justify-center pointer-events-none py-32">
          <div className="text-center z-10 px-4 pointer-events-auto relative">
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
          </div>
        </section>

      </div>
    </div>
  );
}
