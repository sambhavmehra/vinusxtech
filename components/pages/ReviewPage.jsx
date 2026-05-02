'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Send, CircleCheck as CheckCircle, Loader2, Star, Quote, Sparkles, } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';
/* ─── Reveal helper ─── */
function Reveal({ children, className = '', delay = 0, }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10%' });
    return (<motion.div ref={ref} initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>);
}
export default function ReviewPage() {
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
        role: '',
        rating: 5,
        message: '',
    });
    const [hoveredStar, setHoveredStar] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok)
                throw new Error('Failed to send review');
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', company: '', role: '', rating: 5, message: '' });
            }, 6000);
        }
        catch (error) {
            console.error('Failed to send review:', error);
            alert('Failed to submit review. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (<div ref={containerRef} className="relative min-h-screen overflow-hidden text-white pt-24">
      {/* ── Fixed ambient blobs — Removed for global aesthetic ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Background glows removed */}
      </div>

      <div className="relative z-10 w-full">
        {/* ── HERO ── */}
        <section className="relative pt-20 pb-16 px-4 min-h-[45vh] flex flex-col justify-center items-center text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb347]"/>
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400">
                Client Testimonials
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[-0.03em] leading-[0.9] mb-8 uppercase">
              Share Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb347] via-[#ff00ff] to-[#a855f7]">
                Experience.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              Your feedback fuels our innovation. Let the world know how VinusXTech helped scale your infrastructure and secure your digital future.
            </p>
          </motion.div>
        </section>

        {/* ── FORM SECTION ── */}
        <section className="py-12 px-4 pb-32">
          <div className="container mx-auto max-w-4xl">
            <Reveal delay={0.15}>
              <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#ffb347]/10 blur-[80px]"/>
                
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <Quote className="w-6 h-6 text-[#ffb347]"/>
                  <h2 className="text-2xl font-bold">Leave a Review</h2>
                </div>

                {submitted ? (<motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="flex flex-col items-center justify-center py-20 text-center relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#ffb347]/10 border border-[#ffb347]/25 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-[#ffb347]"/>
                    </div>
                    <h3 className="text-3xl font-black mb-3 text-white">Review Submitted!</h3>
                    <p className="text-gray-400 text-lg">Thanks for sharing your experience with us!</p>
                  </motion.div>) : (<form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    
                    <div className="flex flex-col items-start gap-2 mb-4">
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                        Your Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                const isActive = hoveredStar !== null ? star <= hoveredStar : star <= formData.rating;
                const starColorClass = isActive ? 'fill-[#ffb347] text-[#ffb347]' : 'text-gray-600';
                return (<div key={star} className="cursor-pointer transition-transform hover:scale-110" onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(null)} onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}>
                              <Star className={`w-8 h-8 transition-colors duration-200 ${starColorClass}`}/>
                            </div>);
            })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                          Full Name *
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#ffb347]/60 focus:bg-[#ffb347]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"/>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                          Work Email *
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@company.com" className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#ffb347]/60 focus:bg-[#ffb347]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"/>
                        <p className="text-[10px] text-gray-400 mt-1">We use this to automatically fetch your Gravatar profile picture.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                          Company Name (Optional)
                        </label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#ffb347]/60 focus:bg-[#ffb347]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"/>
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                          Your Role / Title (Optional)
                        </label>
                        <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} placeholder="CTO" className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#ffb347]/60 focus:bg-[#ffb347]/[0.03] transition-all duration-300 text-white placeholder-gray-600 text-sm"/>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
                        Your Review *
                      </label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="VinusXTech completely transformed our infrastructure..." className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#ffb347]/60 focus:bg-[#ffb347]/[0.03] transition-all duration-300 text-white placeholder-gray-600 resize-none text-sm"/>
                    </div>

                    {/* Submit */}
                    <motion.div whileHover={!loading ? { scale: 1.05 } : {}} whileTap={!loading ? { scale: 0.95 } : {}} className="w-full group">
                      <BorderGlow borderRadius={9999} backgroundColor="rgba(255, 179, 71, 0.05)" edgeSensitivity={30} glowRadius={15} glowIntensity={2} className="w-full border border-[#ffb347]/30 transition-all duration-300 group-hover:bg-[#ffb347]/10" glowColor="35 100 50" colors={['#ffb347', '#ff00ff', '#ffb347']}>
                        <button type="submit" disabled={loading} className={`w-full px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-white'}`}>
                          {loading ? (<>
                              <Loader2 className="w-5 h-5 animate-spin"/>
                              <span>Submitting...</span>
                            </>) : (<>
                              <span>Submit Testimonial</span>
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
                            </>)}
                        </button>
                      </BorderGlow>
                    </motion.div>
                  </form>)}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-20 flex items-center justify-center gap-4">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#ffb347]/30"/>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-700 font-mono">
                  VinusXTech © {new Date().getFullYear()}
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#ffb347]/30"/>
              </div>
            </Reveal>
            
          </div>
        </section>
      </div>
    </div>);
}
