'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="VinUSXtech Logo"
                width={105}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Building secure digital solutions with cutting-edge technology and cybersecurity expertise.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#00ff88' }}
                className="text-gray-400 hover:text-[#00ff88] transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#00d4ff' }}
                className="text-gray-400 hover:text-[#00d4ff] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: '#a855f7' }}
                className="text-gray-400 hover:text-[#a855f7] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Security', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Software Development', 'AI Solutions', 'VAPT Testing', 'SOC Monitoring', 'Cybersecurity'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-[#00ff88] transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#00ff88] mt-0.5" />
                <span className="text-gray-400 text-sm">contact@vinusxtech.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#00d4ff] mt-0.5" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#a855f7] mt-0.5" />
                <span className="text-gray-400 text-sm">Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VinusXTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
