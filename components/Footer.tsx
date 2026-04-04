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
    <footer className="relative bg-[#050508] overflow-hidden">
      {/* Top gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="VinUSXtech Logo"
                width={160}
                height={60}
                className="object-contain h-20 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-xs">
              Building secure digital solutions with cutting-edge technology and cybersecurity expertise. Engineering the future, one system at a time.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {footerLinks.socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 font-mono">Navigate</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 font-mono">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 font-mono">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#00ff88]/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#00ff88]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-700 block mb-0.5 font-mono">Email</span>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">info@vinusxtech.me</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#00d4ff]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-700 block mb-0.5 font-mono">Phone</span>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">+91 9993016789</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#a855f7]/5 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a855f7]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-700 block mb-0.5 font-mono">Location</span>
                  <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Gandhi Nagar, Bhopal</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs font-mono">
            © {new Date().getFullYear()} VinusXTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-700 text-xs hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-700 text-xs hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
