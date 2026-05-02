'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Terminal, ArrowUpRight, ShieldCheck, Radar, Bug, Fingerprint, ScanEye } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
    {children}
  </motion.div>);
}
const vaptProcess = [
  { step: '01', title: 'Reconnaissance', description: 'Define scope, gather intelligence, and map every potential attack surface.', icon: ScanEye },
  { step: '02', title: 'Vulnerability Scan', description: 'Automated and manual deep-scanning to uncover hidden security weaknesses.', icon: Radar },
  { step: '03', title: 'Exploitation', description: 'Controlled exploitation of identified vulnerabilities to measure real-world impact.', icon: Bug },
  { step: '04', title: 'Reporting', description: 'Executive-grade report with findings, CVSS ratings, and actionable remediation.', icon: ShieldCheck },
];
const socProcess = [
  { step: '01', title: 'Live Monitoring', description: '24/7 monitoring of networks, systems, and applications using heuristic analysis.', icon: Eye },
  { step: '02', title: 'Threat Detection', description: 'AI-powered analytics and correlation engines to identify anomalous behavior.', icon: Radar },
  { step: '03', title: 'Incident Response', description: 'Rapid containment, forensic investigation, and automated threat mitigation.', icon: ShieldCheck },
  { step: '04', title: 'Hardening', description: 'Continuous security posture optimization and proactive defense updates.', icon: Fingerprint },
];
const tools = [
  { name: 'Nmap', description: 'Network discovery and security auditing', color: '#00ff88' },
  { name: 'Metasploit', description: 'Penetration testing framework', color: '#00d4ff' },
  { name: 'Burp Suite', description: 'Web application security testing', color: '#a855f7' },
  { name: 'Wireshark', description: 'Network protocol analyzer', color: '#00ff88' },
  { name: 'OWASP ZAP', description: 'Web app vulnerability scanner', color: '#00d4ff' },
  { name: 'Splunk', description: 'SIEM and log analysis platform', color: '#a855f7' },
  { name: 'Snort', description: 'Intrusion detection system', color: '#00ff88' },
  { name: 'CrowdStrike', description: 'Endpoint detection and response', color: '#00d4ff' },
];
const threats = [
  { name: 'SQL Injection', color: '#00ff88' },
  { name: 'Cross-Site Scripting (XSS)', color: '#00d4ff' },
  { name: 'DDoS Attacks', color: '#a855f7' },
  { name: 'Malware & Ransomware', color: '#00ff88' },
  { name: 'Phishing Attacks', color: '#00d4ff' },
  { name: 'Zero-Day Exploits', color: '#a855f7' },
  { name: 'Data Breaches', color: '#00ff88' },
  { name: 'Insider Threats', color: '#00d4ff' },
];
export default function SecurityPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  return (<div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
    {/* Dynamic Background */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background glows removed for global aesthetic */}
    </div>

    <div className="relative z-10 w-full">
      {/* ── HERO ── */}
      <section className="relative pt-20 pb-20 px-4 min-h-[55vh] flex flex-col justify-center items-center text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
            <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Defense Operations</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
            Cyber <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
              Security.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
            Protecting your digital assets with military-grade offensive security, real-time threat intelligence, and zero-trust architecture.
          </p>
        </motion.div>
      </section>

      {/* ── VAPT SECTION ── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">01. Offensive Security</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              VAPT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-white/50">Testing</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl font-light leading-relaxed">
              Vulnerability Assessment and Penetration Testing — a comprehensive security evaluation that identifies, classifies, and addresses security weaknesses in your systems, networks, and applications.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vaptProcess.map((item, index) => (<Reveal key={item.step} delay={index * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5">
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-[#00ff88]" />

                {/* Step number watermark */}
                <div className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] select-none">{item.step}</div>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#00ff88]/10 border border-[#00ff88]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-[#00ff88]" />
                </div>

                <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

                {/* Connecting line (except last) */}
                {index < 3 && (<div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-[#00ff88]/30 to-transparent" />)}
              </motion.div>
            </Reveal>))}
          </div>
        </div>
      </section>

      {/* ── SOC SECTION ── */}
      <section className="py-24 px-4 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4ff]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">02. Active Defense</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              SOC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-white/50">Monitoring</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl font-light leading-relaxed">
              Security Operations Center providing 24/7 autonomous monitoring of your security infrastructure. Our team continuously monitors, detects, analyzes, and neutralizes cybersecurity incidents in real-time.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socProcess.map((item, index) => (<Reveal key={item.step} delay={index * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="glass-card rounded-3xl p-8 h-full relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-[#00d4ff]" />
                <div className="absolute top-4 right-6 text-5xl font-black text-white/[0.03] select-none">{item.step}</div>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#00d4ff]/10 border border-[#00d4ff]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-[#00d4ff]" />
                </div>

                <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

                {index < 3 && (<div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />)}
              </motion.div>
            </Reveal>))}
          </div>
        </div>
      </section>

      {/* ── ARSENAL / TOOLS ── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-6 justify-center">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#a855f7]" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">Our Arsenal</h2>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#a855f7]" />
            </div>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight">
              Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00d4ff]">Tools</span>
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, index) => (<Reveal key={tool.name} delay={index * 0.05}>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-white/5 cursor-pointer">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${tool.color}05, transparent)` }} />

                <div className="flex items-center gap-4 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110" style={{ background: `${tool.color}10`, borderColor: `${tool.color}25` }}>
                    <Terminal className="w-5 h-5" style={{ color: tool.color }} />
                  </div>
                  <h4 className="text-lg font-bold text-white">{tool.name}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{tool.description}</p>
              </motion.div>
            </Reveal>))}
          </div>
        </div>
      </section>

      {/* ── THREATS ── */}
      <section className="py-24 px-4 relative">
        <div className="absolute left-0 top-1/3 w-[400px] h-[400px] bg-[#a855f7]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <Reveal className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#a855f7] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">Threat Matrix</h2>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Threats We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-white/50">Neutralize</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl font-light">
              Comprehensive protection against the full spectrum of modern cyber threats.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {threats.map((threat, index) => (<Reveal key={threat.name} delay={index * 0.05}>
              <motion.div whileHover={{ x: 4 }} className="flex items-center gap-4 p-4 rounded-2xl group cursor-default border border-white/5 transition-colors hover:bg-white/[0.02]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-transform duration-500 group-hover:scale-110" style={{ background: `${threat.color}10`, borderColor: `${threat.color}25` }}>
                  <AlertTriangle className="w-4 h-4" style={{ color: threat.color }} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{threat.name}</span>
              </motion.div>
            </Reveal>))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 pb-32 pt-12">
        <Reveal>
          <div className="relative rounded-[2.5rem] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[80%] bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Free Assessment</span>
              </motion.div>

              <Lock className="w-16 h-16 mx-auto mb-8 text-[#00ff88]/40" />

              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Secure</span> Your Business?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                Get a complimentary security assessment and discover how our offensive security team can fortify your digital infrastructure.
              </p>

              <div className="flex justify-center">
                <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block group">
                  <BorderGlow borderRadius={9999} backgroundColor="transparent" edgeSensitivity={30} glowRadius={15} glowIntensity={2} className="inline-block border border-[#00d4ff]/30 transition-all duration-300 group-hover:border-[#00d4ff]/60" glowColor="190 100 50" colors={['#00d4ff', '#00ff88', '#00d4ff']}>
                    <div
                      className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full text-white tracking-wide transition-all duration-300 group-hover:brightness-125"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 255, 136, 0.05) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,212,255,0.15)'
                      }}
                    >
                      Schedule Assessment
                      <ArrowUpRight className="w-5 h-5 text-[#00d4ff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </BorderGlow>
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  </div>);
}
