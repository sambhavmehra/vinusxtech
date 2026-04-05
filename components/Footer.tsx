'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Security', href: '/security' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    'AI Solutions',
    'Cybersecurity',
    'VAPT Testing',
    'SOC Monitoring',
    'Full-Stack Dev',
    'Cloud & DevOps',
  ],
  socials: [
    { icon: Github, href: '#', color: '#00ff88', label: 'GitHub' },
    { icon: Linkedin, href: '#', color: '#00d4ff', label: 'LinkedIn' },
    { icon: Twitter, href: '#', color: '#a855f7', label: 'Twitter' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#050508]/80 backdrop-blur-2xl border-t border-white/[0.05] overflow-hidden mt-10">
      {/* Absolute ambient glows specific to footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[100%] rounded-full bg-[#00ff88]/5 blur-[120px]" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[40%] h-[100%] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
      </div>

      {/* Top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Brand column */}
          <div className="md:col-span-2 lg:col-span-4 lg:pr-4">
            <Link href="/" className="inline-block mb-4 relative group">
              <div className="absolute inset-0 bg-[#00d4ff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image
                src="/logo.png"
                alt="VinUSXtech Logo"
                width={200}
                height={80}
                className="object-contain h-16 md:h-20 w-auto relative z-10 drop-shadow-2xl"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs font-light">
              Building secure digital solutions with cutting-edge technology and cybersecurity expertise. Engineering the future, one system at a time.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {footerLinks.socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-400 transition-all duration-300 relative overflow-hidden group"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: social.color }} />
                  <social.icon className="w-4 h-4 relative z-10 transition-colors duration-300 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gray-400 uppercase mb-4 font-mono">Navigate</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-[#00d4ff] transition-colors duration-300 text-xs sm:text-sm flex items-center gap-1.5 group font-medium"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gray-400 uppercase mb-4 font-mono">Capabilities</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-500 hover:text-[#00ff88] transition-colors duration-300 text-xs sm:text-sm flex items-center group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/50 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gray-400 uppercase mb-4 font-mono">Reach Out</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00ff88]/10 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#00ff88]" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-0.5 font-mono">Email</span>
                  <a href="mailto:info@vinusxtech.me" className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors font-medium">info@vinusxtech.me</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-[#00d4ff]/5 border border-[#00d4ff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00d4ff]/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#00d4ff]" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-0.5 font-mono">Phone</span>
                  <a href="tel:+919993016789" className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors font-medium">+91 9993016789</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-[#a855f7]/5 border border-[#a855f7]/10 flex items-center justify-center shrink-0 group-hover:bg-[#a855f7]/10 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#a855f7]" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-0.5 font-mono">Location</span>
                  <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors font-medium">Gandhi Nagar, Bhopal</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[10px] sm:text-xs font-mono font-medium">
            © {new Date().getFullYear()} VinusXTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-500 text-[10px] sm:text-xs font-medium hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 text-[10px] sm:text-xs font-medium hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
