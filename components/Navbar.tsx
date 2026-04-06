'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', comingSoon: false },
  { name: 'About', path: '/about', comingSoon: false },
  { name: 'Services', path: '/services', comingSoon: false },
  { name: 'Projects', path: '/projects', comingSoon: false },
  { name: 'Security', path: '/security', comingSoon: false },
  { name: 'Our Tools', path: '/tools', comingSoon: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-1 md:py-2 bg-[#050508]/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
            : 'py-4 md:py-6 bg-transparent'
        }`}
      >
        {/* Animated bottom gradient line when scrolled */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative h-full">
          {/* Logo */}
          <Link href="/" className="relative z-[60] shrink-0 flex items-center group">
            <div className="absolute inset-0 bg-[#00d4ff]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image
              src="/logo.png"
              alt="VinUSXtech Logo"
              width={550}
              height={320}
              className={`object-contain transition-all duration-500 relative z-10 drop-shadow-2xl ${
                scrolled ? 'h-[40px] md:h-[65px] w-auto' : 'h-[60px] md:h-[150px] w-auto'
              }`}
              priority
            />
          </Link>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 z-50">
            {/* Nav pill container */}
            <div className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full transition-all duration-500 bg-[#0A0A0F]/60 backdrop-blur-xl border ${
              scrolled ? 'border-white/[0.08] shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'border-white/[0.04]'
            }`}>
              {navItems.map((item) => (
                item.comingSoon ? (
                  <div
                    key={item.path}
                    className="relative px-4 py-2 text-[13px] font-medium rounded-full cursor-default flex items-center justify-center"
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 whitespace-nowrap leading-none backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]">Coming Soon</span>
                    <span className="text-gray-500 hover:text-gray-400 transition-colors">{item.name}</span>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative px-5 py-2 text-[13px] font-medium transition-colors duration-300 rounded-full group"
                  >
                    {pathname === item.path && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.12] shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${
                      pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Side: CTA & Mobile Token */}
          <div className="flex items-center gap-4 z-[60]">
            {/* CTA */}
            <Link href="/contact" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,136,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-bold bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black rounded-full shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all duration-300 group"
              >
                Contact Us
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none relative w-10 h-10 flex items-center justify-center"
            >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          </div> {/* End Right Side context */}
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[#050508]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {[...navItems, { name: 'Contact', path: '/contact', comingSoon: false }].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {item.comingSoon ? (
                    <div className="relative text-3xl font-light block py-3 flex flex-col items-center justify-center cursor-default group">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 mb-1 leading-none backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">Coming Soon</span>
                      <span className="text-gray-500 group-hover:text-gray-400 transition-colors">{item.name}</span>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-light transition-colors duration-300 block py-3 ${
                        pathname === item.path 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
