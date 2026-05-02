'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Code, Smartphone, Cloud, Database, Globe, Server, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  { icon: Code, title: 'Custom Web Applications', desc: 'Full-stack enterprise applications built on React, Next.js, and Node.js with pixel-perfect UIs and blazing performance.', color: '#00d4ff' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Cross-platform mobile experiences using React Native and Flutter that feel native on iOS and Android.', color: '#a855f7' },
  { icon: Globe, title: 'Progressive Web Apps', desc: 'Offline-capable, installable web applications that blur the line between web and native experiences.', color: '#00ff88' },
  { icon: Server, title: 'Backend & API Systems', desc: 'Scalable RESTful and GraphQL APIs with microservices architecture, built for millions of concurrent users.', color: '#ffb347' },
  { icon: Database, title: 'Database Architecture', desc: 'Optimized SQL and NoSQL database design with sharding, replication, and real-time sync capabilities.', color: '#ff6b6b' },
  { icon: Layers, title: 'E-Commerce Platforms', desc: 'Custom storefronts with payment integration, inventory management, and conversion-optimized checkout flows.', color: '#00d4ff' },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Django', 'Go', 'GraphQL'] },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'] },
];

const process_steps = [
  { step: '01', title: 'Discovery & Planning', desc: 'We analyze your requirements, define the scope, and create a detailed project roadmap.' },
  { step: '02', title: 'UI/UX Design', desc: 'Our designers craft intuitive, conversion-optimized interfaces that delight your users.' },
  { step: '03', title: 'Development & Testing', desc: 'Agile sprints with continuous integration, automated testing, and quality assurance.' },
  { step: '04', title: 'Launch & Support', desc: 'Seamless deployment, performance monitoring, and ongoing maintenance post-launch.' },
];

export default function WebDevelopmentPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24 bg-[#050508]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="relative pt-20 pb-20 min-h-[50vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
              <Code className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Web & App Development</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7] drop-shadow-2xl">
                Digital Products.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              From concept to launch, we engineer high-performance web and mobile applications that scale with your business.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-24 max-w-7xl mx-auto">
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">What We Build</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-white/50">Expertise</span>
            </h3>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <RevealSection key={service.title} delay={idx * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:border-[#00d4ff]/50 transition-colors duration-500">
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{service.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-24 max-w-7xl mx-auto">
          <RevealSection className="text-center mb-20">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00d4ff]">Process</span>
            </h3>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process_steps.map((item, idx) => (
              <RevealSection key={item.step} delay={idx * 0.15}>
                <div className="glass-card rounded-3xl p-8 h-full border border-white/5 relative overflow-hidden group">
                  <span className="text-6xl font-black text-white/[0.03] absolute top-4 right-4 group-hover:text-white/[0.08] transition-colors duration-500">{item.step}</span>
                  <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Stack</span>
            </h3>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((group, idx) => (
              <RevealSection key={group.category} delay={idx * 0.1}>
                <div className="glass-card rounded-3xl p-8 h-full border border-white/5">
                  <h4 className="text-lg font-bold mb-4 text-[#00d4ff]">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 max-w-4xl mx-auto text-center">
          <RevealSection>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">Build?</span>
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Let&apos;s turn your idea into a production-grade digital product. Our engineering team is ready.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-black font-bold text-sm hover:scale-105 transition-transform duration-300">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </section>

      </div>
    </div>
  );
}
