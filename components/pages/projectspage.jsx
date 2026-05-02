'use client';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Brain, ShieldAlert, Cloud, Code } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
    {children}
  </motion.div>);
}
const projects = [
  {
    title: 'FinTech Dashboard',
    description: 'A comprehensive financial analytics dashboard built for a leading banking client. Features real-time transaction monitoring, predictive forecasting, and interactive data visualization.',
    tags: ['FinTech', 'React', 'Node.js', 'PostgreSQL'],
    category: 'Full Stack',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
    accent: '#00ff88',
  },
  {
    title: 'HealthCare Portal',
    description: 'HIPAA-compliant telemedicine platform with secure video consultation, patient record management, and automated prescription routing for a healthcare provider.',
    tags: ['Healthcare', 'Next.js', 'AWS', 'WebRTC'],
    category: 'Full Stack',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00d4ff 100%)',
    accent: '#00d4ff',
  },
  {
    title: 'Retail Mobile App',
    description: 'High-performance e-commerce mobile application featuring AR product previews, personalized recommendations, and seamless one-click checkout.',
    tags: ['E-Commerce', 'React Native', 'GraphQL'],
    category: 'MERN Stack',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
    accent: '#00ff88',
  },
  {
    title: 'Supply Chain AI',
    description: 'AI-driven supply chain optimization tool for a logistics firm. Uses predictive models to minimize delivery delays and optimize warehouse inventory levels.',
    tags: ['AI/ML', 'Python', 'TensorFlow', 'Logistics'],
    category: 'AI/ML',
    gradient: 'linear-gradient(135deg, #ffb347 0%, #a855f7 100%)',
    accent: '#a855f7',
  },
  {
    title: 'Crypto Exchange UI',
    description: 'Ultra-low latency trading interface for a cryptocurrency exchange. Includes advanced charting tools, order book visualization, and secure wallet integration.',
    tags: ['Blockchain', 'Web3', 'React', 'TypeScript'],
    category: 'Blockchain',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00ff88 100%)',
    accent: '#00ff88',
  },
  {
    title: 'Smart City OS',
    description: 'Centralized IoT management platform for smart city infrastructure. Monitors traffic flow, energy grid usage, and public safety sensors in real time.',
    tags: ['IoT', 'Go', 'Vue.js', 'TimescaleDB'],
    category: 'Cyber Security',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #ffb347 100%)',
    accent: '#ffb347',
  },
];

const expertises = [
  { title: "Frontend & UI", desc: "React, Next.js, Vue, Tailwind CSS, Framer Motion, and WebGL for immersive experiences.", icon: Code, color: "#00d4ff" },
  { title: "Backend & API", desc: "Node.js, Python, Go, PostgreSQL, MongoDB, and GraphQL for scalable architecture.", icon: Cloud, color: "#a855f7" },
  { title: "Cloud & DevOps", desc: "AWS, GCP, Kubernetes, Docker, Terraform, and automated CI/CD pipelines.", icon: ShieldAlert, color: "#00ff88" },
  { title: "AI & Machine Learning", desc: "TensorFlow, PyTorch, LLM integrations (OpenAI/Anthropic), and custom RAG pipelines.", icon: Sparkles, color: "#ffb347" },
  { title: "Cyber Security", desc: "Penetration testing, Zero Trust architecture, DevSecOps, and continuous vulnerability assessment.", icon: ShieldAlert, color: "#ff0055" },
];

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
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
            <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Case Studies</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
              Work.
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
              {categories.map((category) => (<button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category
                ? 'bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 border-[#00ff88]/50 text-white shadow-[0_0_15px_rgba(0,255,136,0.15)]'
                : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}>
                {category}
              </button>))}
            </div>
          </Reveal>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (<motion.div key={project.title} layout initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-30px" }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 30, delay: (index % 3) * 0.1 }} className="glass-card rounded-[2rem] overflow-hidden group cursor-pointer h-full relative border border-white/[0.06] shadow-lg">
                {/* Gradient Banner */}
                <div className="h-40 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: project.gradient }} />
                  {/* Noise-like overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-700" />
                  {/* Project number */}
                  <div className="absolute top-5 left-6 text-white/20 text-6xl font-black select-none">
                    {String(projects.findIndex(p => p.title === project.title) + 1).padStart(2, '0')}
                  </div>
                  {/* Arrow */}
                  <motion.div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500" style={{ backgroundImage: project.gradient, WebkitBackgroundClip: 'text' }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (<span key={tag} className="px-3 py-1.5 text-[10px] font-medium rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-400 group-hover:border-white/10 group-hover:text-gray-300 transition-all duration-300">
                      {tag}
                    </span>))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-6 pt-5 border-t border-white/[0.06]">
                    <motion.button whileHover={{ x: 3 }} className="flex items-center gap-2 text-xs font-bold transition-colors" style={{ color: project.accent }}>
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </motion.button>
                    <motion.button whileHover={{ x: 3 }} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-300 transition-colors">
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── OUR EXPERTISE ── */}
      <section className="py-24 px-4 relative z-10 mt-12 bg-gradient-to-b from-transparent to-[#05050a]/80">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="mb-16">
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#a855f7]" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#a855f7] uppercase font-mono">Our Expertise</h2>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#a855f7]" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-center mb-6">Technology Stack</h3>
            <p className="text-gray-400 text-center max-w-2xl mx-auto text-lg">
              We bring deep technical knowledge and industry-leading best practices to every domain we operate in.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertises.map((exp, i) => (
              <Reveal key={exp.title} delay={i * 0.1}>
                <div className="glass-card p-8 rounded-[2rem] border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 group h-full bg-[#0a0a0f]/40">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                    <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-colors" style={{ backgroundImage: `linear-gradient(to right, white, ${exp.color})`, WebkitBackgroundClip: 'text' }}>
                    {exp.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 pb-32 pt-24">
        <Reveal>
          <div className="relative rounded-[2.5rem] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[80%] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Open for Collaborations</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Scale</span>?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                Let&apos;s build your next digital product together. Our experts are ready to turn your complex challenges into seamless, high-performance solutions.
              </p>

              <div className="flex justify-center">
                <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block group relative">
                  <BorderGlow borderRadius={9999} backgroundColor="transparent" edgeSensitivity={30} glowRadius={15} glowIntensity={2} className="inline-block border border-[#00ff88]/30 transition-all duration-500 group-hover:border-[#ff00ff]/60" glowColor="150 100 50" colors={['#00ff88', '#00d4ff', '#ff00ff']}>
                    <div
                      className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-full text-white tracking-widest uppercase transition-all duration-500 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,255,136,0.15)'
                      }}
                    >
                      {/* Hover Glossy Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                        background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 0 30px rgba(255,0,255,0.3)'
                      }} />
                      <span className="relative z-10 flex items-center gap-2">
                        Discuss Your Project
                        <ArrowUpRight className="w-4 h-4 text-[#00ff88] group-hover:text-[#ff00ff] group-hover:rotate-45 transition-all duration-500" />
                      </span>
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
