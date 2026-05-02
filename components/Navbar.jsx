'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', comingSoon: false },
  { name: 'About', path: '/about', comingSoon: false },
  { name: 'Work', path: '/projects', comingSoon: false },
  { name: 'Our Products', path: '/products', comingSoon: false },
  {
    name: 'Services',
    path: '/services',
    comingSoon: false,
    dropdown: [
      { name: 'Web & App Development', path: '/services/web-development' },
      { name: 'AI Solutions', path: '/services/ai-solutions' },
      { name: 'Cyber Security', path: '/security' },
      { name: 'DevOps', path: '/services/devops' },
      { name: 'Digital Marketing & SEO', path: '/services/digital-marketing' }
    ]
  },
  { name: 'Tools', path: '/tools', comingSoon: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const pathname = usePathname();

  // Simple scroll listener — only tracks scrolled state, NEVER hides
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  if (pathname === '/s-admin') return null;

  return (
    <>
      {/* 
        ALWAYS VISIBLE navbar. 
        On scroll: slides inward from full-width into a compact centered floating pill.
        Everything (logo, links, CTA) shrinks together.
      */}
      <nav
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled
          ? 'top-4 w-[98%] lg:w-[90%] xl:w-[75%] max-w-6xl rounded-full py-2.5 px-4 lg:px-6 bg-[#030305]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(255,255,255,0.03)_inset]'
          : 'top-0 w-full max-w-none rounded-none py-5 px-4 sm:px-6 lg:px-8 bg-transparent border border-transparent'
          }`}
      >
        {/* Subtle glowing bottom border when scrolled */}
        <div
          className={`absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/25 to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="flex items-center justify-between relative h-full">
          {/* Logo & Brand Name — name hides on scroll */}
          <Link href="/" className="relative z-[60] shrink-0 flex items-center group">
            <div className="absolute inset-0 bg-[#00d4ff]/15 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/logo.png"
              alt="VinUSXtech Logo"
              width={550}
              height={320}
              className={`object-contain relative z-10 drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'h-[36px] lg:h-[42px] w-auto' : 'h-[65px] lg:h-[80px] w-auto'
                }`}
              priority
            />
            <span className={`relative z-10 font-bold tracking-tight text-white whitespace-nowrap overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? 'max-w-0 opacity-0 ml-0 translate-x-[-10px]' : 'max-w-[200px] opacity-100 ml-3 translate-x-0 text-base md:text-lg lg:text-xl'
              }`}>
              Vinus<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">X</span>Tech
            </span>
          </Link>

          {/* Center Nav Links — shrink spacing & font on scroll */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 z-50 w-max">
            <div
              className={`flex items-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled
                ? 'gap-0 p-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.06]'
                : 'gap-1 p-1.5 bg-white/[0.01] backdrop-blur-md border border-white/[0.03]'
                }`}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navItems.map((item) => (
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative group flex items-center"
                    onMouseEnter={() => setHoveredPath(item.path)}
                  >
                    <div className={`relative flex items-center gap-1 rounded-full cursor-pointer transition-all duration-700 ${scrolled ? 'px-3 lg:px-4 py-1.5 text-[11px] lg:text-[12px]' : 'px-4 lg:px-5 py-2 text-[12px] lg:text-[13px]'} font-medium`}>
                      {hoveredPath === item.path && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute inset-0 bg-white/[0.06] rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      {pathname === item.path && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-[#a855f7]/10 rounded-full border border-white/[0.12]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-1 cursor-pointer transition-colors duration-300 ${pathname === item.path || pathname?.startsWith(item.path + '#') ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400 group-hover:text-white'}`}>
                        {item.name}
                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                      </span>
                    </div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {hoveredPath === item.path && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 z-50"
                        >
                          <div className="p-3 rounded-3xl bg-[#05050a]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col gap-1 overflow-hidden relative">
                            {/* Subtle inner glow for the dropdown */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
                            
                            {item.dropdown.map((dropItem, idx) => (
                              <motion.div
                                key={dropItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * idx + 0.1, duration: 0.3, ease: 'easeOut' }}
                                className="relative z-10"
                              >
                                <Link
                                  href={dropItem.path}
                                  className="group/link flex items-center justify-between px-4 py-3 text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all duration-300"
                                >
                                  <span className="font-medium tracking-wide">{dropItem.name}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-300 text-[#00d4ff]" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.comingSoon ? (
                  <div
                    key={item.path}
                    className={`relative rounded-full cursor-not-allowed flex items-center justify-center opacity-60 transition-all duration-700 ${scrolled ? 'px-3 lg:px-4 py-1.5 text-[11px] lg:text-[12px]' : 'px-4 lg:px-5 py-2 text-[12px] lg:text-[13px]'
                      } font-medium`}
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 whitespace-nowrap leading-none">
                      Soon
                    </span>
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onMouseEnter={() => setHoveredPath(item.path)}
                    className={`relative rounded-full group transition-all duration-700 ${scrolled ? 'px-3 lg:px-4 py-1.5 text-[11px] lg:text-[12px]' : 'px-4 lg:px-5 py-2 text-[12px] lg:text-[13px]'
                      } font-medium`}
                  >
                    {/* Hover Sliding Pill */}
                    {hoveredPath === item.path && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-white/[0.06] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active State Pill */}
                    {pathname === item.path && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-[#a855f7]/10 rounded-full border border-white/[0.12]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <span className={`relative z-10 transition-colors duration-300 ${pathname === item.path ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400 group-hover:text-white'
                      }`}>
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Side: CTA & Mobile Toggle — CTA shrinks on scroll */}
          <div className="flex items-center gap-3 z-[60]">
            <Link href="/contact" className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 font-bold bg-white text-black rounded-full overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] ${scrolled ? 'px-4 py-1.5 text-[11px]' : 'px-6 py-2 text-[13px]'
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contact Us</span>
                <ArrowUpRight className={`relative z-10 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${scrolled ? 'w-3 h-3' : 'w-4 h-4'
                  }`} />
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white focus:outline-none relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[#030305]/95 lg:hidden flex items-center justify-center overflow-y-auto pt-20 pb-10"
          >
            <div className="flex flex-col items-center w-full gap-4 min-h-max my-auto">
              {[...navItems, { name: 'Contact', path: '/contact', comingSoon: false }].map((item, i) => (
                <motion.div
                  key={item.name || item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="overflow-hidden w-full px-6 flex flex-col items-center"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className={`text-4xl font-light transition-all duration-300 py-2 tracking-tight flex items-center gap-2 ${pathname === item.path
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7] font-medium'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-8 h-8 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col items-center gap-4 mt-4 overflow-hidden w-full"
                          >
                            {item.dropdown.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                href={dropItem.path}
                                onClick={() => setIsOpen(false)}
                                className="text-xl text-gray-500 hover:text-white transition-colors"
                              >
                                {dropItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.comingSoon ? (
                    <div className="relative text-3xl font-light py-2 flex flex-col items-center justify-center cursor-not-allowed opacity-50">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 mb-2">Soon</span>
                      <span className="text-gray-500 tracking-wide">{item.name}</span>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-light transition-all duration-300 block py-2 tracking-tight ${pathname === item.path
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7] font-medium'
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
