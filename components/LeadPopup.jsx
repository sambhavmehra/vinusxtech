'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { X, Rocket, User, Mail, Phone, Building2, Loader2 } from 'lucide-react';

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const pathname = usePathname();

  useEffect(() => {
    // Check if user already dismissed or submitted
    const dismissed = sessionStorage.getItem('leadPopupDismissed');
    if (dismissed) return;

    // Show popup after 3 minutes (180000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 180000);

    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setIsVisible(false);
    sessionStorage.setItem('leadPopupDismissed', 'true');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, chatHistory: [] }),
      });
      if (!res.ok) throw new Error('Failed');
      setIsSuccess(true);
      sessionStorage.setItem('leadPopupDismissed', 'true');
      setTimeout(() => setIsVisible(false), 3000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Do not show the popup on the contact page since there's already a form there
  if (pathname === '/contact') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a12] shadow-[0_0_80px_rgba(0,212,255,0.15)]"
          >
            {/* Gradient accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7]" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-10 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#00ff88]/15 flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-[#00ff88]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You! 🎉</h3>
                <p className="text-gray-400 text-sm mt-3 max-w-xs mx-auto">
                  Our team will reach out to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 flex items-center justify-center border border-[#00ff88]/20"
                  >
                    <Rocket className="w-7 h-7 text-[#00ff88]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">
                    Let's Build Something{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                      Amazing
                    </span>
                  </h3>
                  <p className="text-gray-500 text-xs mt-2 max-w-xs mx-auto">
                    Share your details and our experts will craft a custom solution for your business.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                    />
                  </div>

                  {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-[0_0_25px_rgba(0,255,136,0.25)]"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                    {isSubmitting ? 'Sending...' : 'Get Started'}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full text-center text-gray-600 text-[11px] hover:text-gray-400 transition-colors pt-1"
                  >
                    No thanks, I'm just browsing
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
