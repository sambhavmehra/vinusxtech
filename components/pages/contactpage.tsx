'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CircleCheck as CheckCircle,
  Loader2,
  MessageSquare,
  Clock,
  Shield,
  Sparkles,
  ArrowUpRight,
  Zap,
  Users,
  Star,
} from 'lucide-react';

/* ─── Reveal helper (same pattern as ProjectsPage) ─── */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Contact info cards ─── */
const contactItems = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@vinusxtech.me',
    sub: 'We reply within 24 hours',
    color: '#00ff88',
    bg: 'rgba(0,255,136,0.08)',
    border: 'rgba(0,255,136,0.15)',
    href: 'mailto:info@vinusxtech.me',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 9993016789',
    sub: 'Mon – Fri, 9 AM – 6 PM IST',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.15)',
    href: 'tel:+919993016789',
  },
  {
    icon: MapPin,
    label: 'Our Office',
    value: 'Gandhi Nagar, Bhopal',
    sub: 'Madhya Pradesh, India',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.15)',
    href: '#',
  },
];



/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix = '', label, color }: { value: number; suffix?: string; label: string; color: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const dur = 1800;
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
      <div className="text-5xl md:text-6xl font-black font-mono mb-2" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-medium">{label}</div>
    </div>
  );
}

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send email');
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      }, 6000);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(
        'Failed to send message. Please ensure BREVO_API_KEY is set. Reach us at info@vinusxtech.me if this persists.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
      {/* ── Fixed ambient blobs — identical to HomePage ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00d4ff]/10 blur-[150px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#a855f7]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#00ff88]/10 blur-[150px]" />
      </div>

      {/* ── Film-grain noise overlay — identical to HomePage ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative z-10 w-full">
        {/* ── HERO ── */}
        <section className="relative pt-20 pb-16 px-4 min-h-[55vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
                Open for New Projects
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Let&apos;s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]">
                Connect.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              Ready to transform your business with secure, innovative solutions? Tell us about your
              vision and let&apos;s build something extraordinary.
            </p>
          </motion.div>
        </section>

        {/* ── CONTACT INFO CARDS ── */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <Reveal className="mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#00ff88] to-transparent" />
                <h2 className="text-xs font-bold tracking-[0.3em] text-[#00ff88] uppercase font-mono">
                  Reach Out
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {contactItems.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.1}>
                  <motion.a
                    href={item.href}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="flex flex-col gap-4 p-8 rounded-3xl h-full group cursor-pointer relative overflow-hidden"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"
                      style={{ background: `${item.bg}` }}
                    />
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ background: `${item.bg}`, border: `1px solid ${item.border}` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500"
                        style={{ backgroundImage: `linear-gradient(135deg, ${item.color}, #ffffff)`, WebkitBackgroundClip: 'text' }}>
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: item.color }}
                    />
                  </motion.a>
                </Reveal>
              ))}
            </div>

            {/* ── MAIN GRID: Hours + Form ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Left panel */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Business Hours */}
                <Reveal delay={0.1}>
                  <div className="glass-card rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-5 h-5 text-[#00d4ff]" />
                      <h2 className="text-xl font-bold">Business Hours</h2>
                    </div>
                    <div className="space-y-4">
                      {[
                        { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM', color: '#00ff88' },
                        { day: 'Saturday', hours: '10:00 AM – 4:00 PM', color: '#00d4ff' },
                        { day: 'Sunday', hours: 'Closed', color: '#6b7280' },
                      ].map(({ day, hours, color }) => (
                        <div key={day} className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-0">
                          <span className="text-sm text-gray-400">{day}</span>
                          <span className="text-sm font-semibold" style={{ color }}>{hours}</span>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                        <p className="text-sm font-semibold text-[#a855f7]">24/7 Security Support Available</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

              </div>

              {/* Right panel — Form */}
              <Reveal className="lg:col-span-3" delay={0.15}>
                <div className="glass-card rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="w-5 h-5 text-[#00ff88]" />
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/25 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-[#00ff88]" />
                      </div>
                      <h3 className="text-3xl font-black mb-3">Message Sent!</h3>
                      <p className="text-gray-400 text-lg">We&apos;ll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#00ff88]/60 focus:bg-[#00ff88]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#00ff88]/60 focus:bg-[#00ff88]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"
                          />
                        </div>
                      </div>

                      {/* Company + Service row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#00ff88]/60 focus:bg-[#00ff88]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#0A0A0F] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#00ff88]/60 transition-all duration-300 text-white text-sm appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[#0A0A0F]">Select a service</option>
                            <option value="software-dev" className="bg-[#0A0A0F]">Software Development</option>
                            <option value="ai-solutions" className="bg-[#0A0A0F]">AI Solutions</option>
                            <option value="vapt" className="bg-[#0A0A0F]">VAPT Testing</option>
                            <option value="soc" className="bg-[#0A0A0F]">SOC Monitoring</option>
                            <option value="other" className="bg-[#0A0A0F]">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Tell us about your project, goals, and timeline..."
                          className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#00ff88]/60 focus:bg-[#00ff88]/[0.03] transition-all duration-300 text-white placeholder-gray-600 resize-none text-sm"
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 40px rgba(0,255,136,0.3)' } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className={`w-full px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${loading
                            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black'
                          }`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-gray-600 mt-2">
                        By sending, you agree to our privacy policy. We&apos;ll never share your data.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="max-w-7xl mx-auto px-4 pb-32 pt-16">
          <Reveal>
            <div
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[80%] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 p-12 md:p-20 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
                    Why Choose Us
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Your Next Big{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                    Move
                  </span>{' '}
                  Starts Here.
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  Whether it&apos;s fortifying your security posture or launching a next-gen AI platform,
                  our team is ready to architect something extraordinary with you.
                </p>

                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,136,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-bold rounded-full text-lg transition-all"
                >
                  Explore Our Services
                  <ArrowUpRight className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </Reveal>

          {/* Decorative bottom line — same as HomePage */}
          <Reveal delay={0.4}>
            <div className="mt-20 flex items-center justify-center gap-4">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#00d4ff]/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-700 font-mono">
                VinusXTech © {new Date().getFullYear()}
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#00d4ff]/30" />
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
