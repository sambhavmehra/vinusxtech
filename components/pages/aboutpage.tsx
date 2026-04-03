'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Every solution we build is designed with security at its core, protecting your data and users.',
    color: '#00ff88',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of the curve, leveraging the latest technologies to deliver cutting-edge solutions.',
    color: '#00d4ff',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We work closely with you to understand and exceed your expectations.',
    color: '#a855f7',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in code quality, security practices, and service delivery.',
    color: '#00ff88',
  },
];

const team = [
  {
    name: 'Security Team',
    description: 'Certified ethical hackers and cybersecurity experts',
    count: '50+',
    color: '#00ff88',
  },
  {
    name: 'Developers',
    description: 'Full-stack engineers and software architects',
    count: '75+',
    color: '#00d4ff',
  },
  {
    name: 'AI Specialists',
    description: 'Machine learning engineers and data scientists',
    count: '25+',
    color: '#a855f7',
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-gradient">VinUSXtech</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are a team of passionate technologists and security experts dedicated to building secure,
              innovative digital solutions that drive business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2018, VinUSXtech emerged from a simple vision: to bridge the gap between
                  innovative software development and robust cybersecurity. Our founders, veterans in both
                  fields, recognized that modern businesses needed partners who could deliver both.
                </p>
                <p>
                  Today, we've grown into a team of 150+ specialists serving clients worldwide. From startups
                  to Fortune 500 companies, we've delivered over 500 projects spanning software development,
                  AI solutions, and comprehensive cybersecurity services.
                </p>
                <p>
                  Our unique approach combines cutting-edge development practices with enterprise-grade
                  security from day one. We don't just build software—we build secure, scalable, and
                  future-proof solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-8"
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-[#00ff88]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-400">
                      To empower businesses with secure, innovative technology solutions that drive growth and
                      protect digital assets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-400">
                      To be the global leader in secure software development and cybersecurity services,
                      setting industry standards for excellence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6 hover:scale-105 transition-transform"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${value.color}40, ${value.color}20)`,
                    boxShadow: `0 0 30px ${value.color}40`,
                  }}
                >
                  <value.icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              World-class experts across multiple domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-8 text-center"
              >
                <div
                  className="text-6xl font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${group.color}, ${group.color}80)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {group.count}
                </div>
                <h3 className="text-2xl font-bold mb-2">{group.name}</h3>
                <p className="text-gray-400">{group.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
