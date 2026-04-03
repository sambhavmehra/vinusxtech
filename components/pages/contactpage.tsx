'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CircleCheck as CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
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
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_dummy',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_dummy',
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_dummy'
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with secure, innovative solutions? Let's start the conversation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-dark rounded-3xl p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#00ff88]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-400">contact@vinusxtech.com</p>
                      <p className="text-gray-400">support@vinusxtech.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#a855f7]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Office</h3>
                      <p className="text-gray-400">123 Tech Valley Drive</p>
                      <p className="text-gray-400">Silicon Valley, CA 94025</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-dark rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-[#00ff88]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-[#00d4ff]">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[#a855f7] font-semibold">24/7 Security Support Available</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-dark rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ff88] transition-colors text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ff88] transition-colors text-white"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ff88] transition-colors text-white"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ff88] transition-colors text-white"
                      >
                        <option value="" className="bg-[#0A0A0F]">Select a service</option>
                        <option value="software-dev" className="bg-[#0A0A0F]">Software Development</option>
                        <option value="ai-solutions" className="bg-[#0A0A0F]">AI Solutions</option>
                        <option value="vapt" className="bg-[#0A0A0F]">VAPT Testing</option>
                        <option value="soc" className="bg-[#0A0A0F]">SOC Monitoring</option>
                        <option value="other" className="bg-[#0A0A0F]">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ff88] transition-colors text-white resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-full transition-colors glow-green flex items-center justify-center space-x-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#00d4ff]'}`}
                    >
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
