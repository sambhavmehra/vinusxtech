'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CircleCheck as CheckCircle, Loader2, Clock, Sparkles, ArrowUpRight, ChevronDown } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

/* ─── Reveal helper ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Contact info cards ─── */
const contactItems = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'vinusxtech@gmail.com',
    sub: 'We usually respond within 2-4 hours',
    color: '#00ff88',
    bg: 'rgba(0,255,136,0.08)',
    border: 'rgba(0,255,136,0.15)',
    href: 'mailto:vinusxtech@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Gandhi Nagar, Bhopal',
    sub: 'Madhya Pradesh, India',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.15)',
    href: 'https://maps.google.com',
  },
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  const dropdownRef = useRef(null);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const serviceOptions = [
    { value: "software-dev", label: "Software Development" },
    { value: "ai-solutions", label: "AI Solutions" },
    { value: "vapt", label: "VAPT Testing" },
    { value: "soc", label: "SOC Monitoring" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "other", label: "Other" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      alert('Failed to send message. Please ensure BREVO_API_KEY is set. Reach us at vinusxtech@gmail.com if this persists.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
      {/* ── Film-grain noise overlay ── */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      <div className="relative z-10 w-full">
        {/* ── HERO ── */}
        <section className="relative pt-20 pb-16 px-4 min-h-[55vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
                Open for New Projects
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
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

        {/* ── SPLIT CONTACT CARD ── */}
        <section className="py-12 px-4 pb-32">
          <div className="container mx-auto max-w-[1100px]">
            <Reveal>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
                  {/* ── LEFT: INFO PANEL ── */}
                  <div className="lg:col-span-2 p-10 lg:p-14 bg-white/[0.02] border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Get in Touch</h2>
                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-12">
                        We&apos;d love to hear from you. Our team is always ready to discuss your next big project.
                      </p>

                      <div className="space-y-8">
                        {contactItems.map((item) => (
                          <a href={item.href} key={item.label} className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                              <item.icon className="w-5 h-5" style={{ color: item.color }} />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">{item.label}</p>
                              <p className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-white" style={{ textShadow: `0 0 10px ${item.color}40` }}>{item.value}</p>
                              <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Business Hours Summary */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">Business Hours</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>Mon - Fri</span>
                          <span className="text-[#00ff88]">9:00 AM - 6:00 PM IST</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Saturday</span>
                          <span className="text-[#00d4ff]">10:00 AM - 4:00 PM IST</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT: FORM PANEL ── */}
                  <div className="lg:col-span-3 p-10 lg:p-14">
                    {submitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                        <div className="w-24 h-24 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mb-8 relative">
                          <div className="absolute inset-0 rounded-full border-t border-[#00ff88] animate-spin opacity-20" />
                          <CheckCircle className="w-12 h-12 text-[#00ff88]" />
                        </div>
                        <h3 className="text-4xl font-black mb-4 text-white">Message Sent!</h3>
                        <p className="text-gray-400 text-lg max-w-sm mx-auto leading-relaxed">
                          Thank you for reaching out. We will get back to you within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col h-full justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="relative group">
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] transition-colors peer placeholder-transparent" placeholder="Rahul Sharma" />
                            <label htmlFor="name" className="absolute left-0 -top-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-[#00ff88]">
                              Full Name *
                            </label>
                          </div>
                          <div className="relative group">
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] transition-colors peer placeholder-transparent" placeholder="rahul@example.com" />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-[#00ff88]">
                              Email Address *
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="relative group">
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] transition-colors peer placeholder-transparent" placeholder="Company Name" />
                            <label htmlFor="company" className="absolute left-0 -top-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-[#00ff88]">
                              Company (Optional)
                            </label>
                          </div>
                          {/* Custom Animated Select */}
                          <div className="relative group" ref={dropdownRef}>
                            <div
                              onClick={() => setIsServiceOpen(!isServiceOpen)}
                              className="w-full bg-transparent border-b border-white/20 py-3 flex items-center justify-between cursor-pointer transition-colors hover:border-white/40"
                            >
                              <span className={`text-sm ${formData.service ? 'text-white' : 'text-gray-400'}`}>
                                {formData.service ? serviceOptions.find(o => o.value === formData.service)?.label : 'Select a service...'}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isServiceOpen ? 'rotate-180 text-[#00ff88]' : ''}`} />
                            </div>
                            <label className="absolute left-0 -top-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#00ff88]">
                              Interested In
                            </label>

                            <AnimatePresence>
                              {isServiceOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                  exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full left-0 w-full mt-2 bg-[#05050A]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                                >
                                  <div className="p-1 flex flex-col">
                                    {serviceOptions.map((opt) => (
                                      <div
                                        key={opt.value}
                                        onClick={() => {
                                          setFormData({ ...formData, service: opt.value });
                                          setIsServiceOpen(false);
                                        }}
                                        className={`px-4 py-2.5 text-sm cursor-pointer transition-all rounded-lg ${formData.service === opt.value ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                                      >
                                        {opt.label}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="relative group pt-4">
                          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] transition-colors peer placeholder-transparent resize-none" placeholder="Tell us about your project..." />
                          <label htmlFor="message" className="absolute left-0 -top-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:text-[#00ff88]">
                            Message *
                          </label>
                        </div>

                        <div className="pt-6">
                          <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full overflow-hidden rounded-full py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${loading ? 'bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-[#00ff88] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'}`}
                          >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                              {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                              ) : (
                                <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                              )}
                            </div>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="max-w-7xl mx-auto px-4 pb-32 pt-16">
          <Reveal>
            <div className="relative rounded-[2.5rem] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[80%] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 p-12 md:p-20 text-center">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
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

                <div className="flex justify-center">
                  <motion.a href="/services" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block group">
                    <BorderGlow borderRadius={9999} backgroundColor="transparent" edgeSensitivity={30} glowRadius={15} glowIntensity={2} className="inline-block border border-[#ffb347]/30 transition-all duration-300 group-hover:border-[#ffb347]/60" glowColor="35 100 50" colors={['#ffb347', '#ff00ff', '#ffb347']}>
                      <div
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full text-white tracking-wide transition-all duration-300 group-hover:brightness-125"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 179, 71, 0.15) 0%, rgba(255, 0, 255, 0.05) 100%)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 20px rgba(255,179,71,0.15)'
                        }}
                      >
                        Explore Our Services
                        <ArrowUpRight className="w-5 h-5 text-[#ffb347] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </BorderGlow>
                  </motion.a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Decorative bottom line */}
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
