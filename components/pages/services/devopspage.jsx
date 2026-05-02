'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Cloud, Server, Workflow, RefreshCw, ShieldCheck, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  { icon: RefreshCw, title: 'CI/CD Pipelines', desc: 'Automated continuous integration and deployment pipelines for zero-downtime releases.', color: '#00d4ff' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Scalable, secure, and highly available architectures on AWS, Azure, and Google Cloud.', color: '#00ff88' },
  { icon: Workflow, title: 'Infrastructure as Code', desc: 'Automated infrastructure provisioning and management using Terraform and Ansible.', color: '#a855f7' },
  { icon: Server, title: 'Containerization', desc: 'Microservices architecture orchestration using Docker and Kubernetes.', color: '#ffb347' },
  { icon: Activity, title: 'Monitoring & Logging', desc: 'Real-time observability, alerting, and log management for full system visibility.', color: '#ff6b6b' },
  { icon: ShieldCheck, title: 'DevSecOps', desc: 'Integrating automated security checks and vulnerability scanning directly into the CI/CD pipeline.', color: '#00d4ff' },
];

const techStack = [
  { category: 'Cloud Providers', items: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'DigitalOcean'] },
  { category: 'CI/CD & Automation', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'ArgoCD'] },
  { category: 'Containers & IaC', items: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Helm'] },
  { category: 'Observability', items: ['Prometheus', 'Grafana', 'Datadog', 'ELK Stack', 'New Relic'] },
];

const process_steps = [
  { step: '01', title: 'Audit & Architecture', desc: 'We assess your current infrastructure and design a highly scalable, automated cloud architecture.' },
  { step: '02', title: 'Pipeline Setup', desc: 'Implementing robust CI/CD workflows for automated testing and seamless deployments.' },
  { step: '03', title: 'Migration & Orchestration', desc: 'Migrating legacy systems to containerized microservices managed by Kubernetes.' },
  { step: '04', title: 'Continuous Optimization', desc: '24/7 monitoring, cost optimization, and performance tuning of your cloud environments.' },
];

export default function DevOpsPage() {
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
              <RefreshCw className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Cloud & DevOps</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Infinite{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88] drop-shadow-2xl">
                Scale.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              We architect, automate, and optimize cloud infrastructure to ensure high availability, security, and lightning-fast deployments.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-24 max-w-7xl mx-auto">
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#00d4ff] uppercase font-mono">Core Capabilities</h2>
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
              Deployment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00d4ff]">Lifecycle</span>
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
              Cloud <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Stack</span>
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
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">Automate?</span>
            </h3>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Modernize your infrastructure and ship code faster with zero downtime. Let's build your CI/CD pipeline.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black font-bold text-sm hover:scale-105 transition-transform duration-300">
              Start Cloud Migration <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </section>

      </div>
    </div>
  );
}
