'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Brain, Shield, Lock, Database, Cloud, Smartphone, Globe, CheckCircle2, Hexagon, Layers, Cpu } from 'lucide-react';

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

const developmentServices = [
  { icon: Code, title: 'Web Architecture', desc: 'Full-stack enterprise applications built on React, Next.js, and Node.js for absolute performance.', color: '#00d4ff' },
  { icon: Smartphone, title: 'Mobile Ecosystems', desc: 'Native-feel cross-platform mobile apps targeting global audiences across iOS and Android.', color: '#00d4ff' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Serverless and microservices running on AWS, Azure, and GCP designed for infinite scale.', color: '#00d4ff' },
  { icon: Database, title: 'Data Systems', desc: 'Optimized database architecture capable of handling extreme throughput volume flawlessly.', color: '#00d4ff' },
];

const aiServices = [
  { icon: Brain, title: 'Predictive ML', desc: 'Custom machine learning models for anomaly detection, deep classification, and predictive logic.', color: '#a855f7' },
  { icon: Globe, title: 'Natural Language', desc: 'Advanced NLP pipelines, autonomous conversational bots, and complex semantic intelligence.', color: '#a855f7' },
];

const vaptFeatures = [
  'Network Penetration Testing',
  'Web App Vulnerability Scans',
  'Mobile Architecture Review',
  'API Security Audits',
  'Advanced Social Engineering',
  'Zero-Day Threat Modeling',
  'Compliance (PCI-DSS, HIPAA)',
  'Executive Action Reports',
];

const socFeatures = [
  'Real-time Heuristic Monitroing',
  'Automated Incident Response',
  'Deep Security Log Forensics',
  'Dark Web Threat Intelligence',
  'AI-Driven Anomaly Alerts',
  'Regulatory Compliance Logging',
  'CISO Security Dashboard',
  'Continuous Security Patching',
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24 bg-[#050508]">

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[10%] w-[30%] h-[30%] rounded-full bg-[#00d4ff]/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[5%] w-[40%] h-[40%] rounded-full bg-[#a855f7]/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#00ff88]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">

        {/* HERO SECTION */}
        <section className="relative pt-20 pb-20 min-h-[50vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
            >
              <Hexagon className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Capabilities</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7] drop-shadow-2xl">
                Ecosystems.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              We engineer, secure, and scale high-performance architectures. From sovereign cloud infrastructure to offensive cybersecurity operations.
            </p>
          </motion.div>
        </section>

        {/* SECTION: SOFTWARE DEVELOPMENT */}
        <section className="py-24 max-w-7xl mx-auto">
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">01. Engineering</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-white/50">Development</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Building scalable, high-performance applications with cutting-edge technologies.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentServices.map((service, idx) => (
              <RevealSection key={service.title} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:border-[#00d4ff]/50 transition-colors duration-500">
                    <service.icon className="w-6 h-6 text-[#00d4ff]" />
                  </div>

                  <h4 className="text-xl font-bold mb-3 group-hover:text-white text-gray-200 transition-colors">{service.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* SECTION: AI SOLUTIONS */}
        <section className="py-24 max-w-7xl mx-auto relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/5 blur-[120px] rounded-full pointer-events-none" />

          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#a855f7] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">02. Intelligence</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-white/50">Solutions</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Leveraging massive neural networks to transform raw data into precise, actionable autonomy.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {aiServices.map((service, idx) => (
              <RevealSection key={service.title} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-[2rem] p-10 h-full relative overflow-hidden group border border-[#a855f7]/20"
                >
                  <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#a855f7]/20 rounded-full blur-[80px] group-hover:bg-[#a855f7]/40 transition-colors duration-700 pointer-events-none" />

                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="w-20 h-20 shrink-0 rounded-3xl flex items-center justify-center bg-[#a855f7]/10 border border-[#a855f7]/30 group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="w-10 h-10 text-[#a855f7]" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold mb-4 text-white">{service.title}</h4>
                      <p className="text-gray-400 text-base leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* SECTION: CYBERSECURITY */}
        <section className="py-24 max-w-7xl mx-auto mb-20 relative">
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">03. Defense</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Offensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-white/50">Security</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Military-grade defensive postures and relentless penetration testing for zero-trust environments.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* VAPT CARD */}
            <RevealSection>
              <div className="glass-card rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group h-full border-t border-[#00ff88]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent pointer-events-none" />
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#00ff88]/10 blur-[100px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-[#00ff88]" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">VAPT Testing</h3>
                      <p className="text-gray-400 text-sm mt-1">Vulnerability Assessment & Pen-Testing</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {vaptFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-3 hover:bg-white/[0.05] transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* SOC CARD */}
            <RevealSection delay={0.2}>
              <div className="glass-card rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group h-full border-t border-[#00d4ff]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent pointer-events-none" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00d4ff]/10 blur-[100px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">SOC Monitoring</h3>
                      <p className="text-gray-400 text-sm mt-1">24/7 Security Operations Center</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {socFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-3 hover:bg-white/[0.05] transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

      </div>
    </div>
  );
}
