'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Shield, Lock, Database, Cloud, Smartphone, Globe, CircleCheck as CheckCircle } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const developmentServices = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Full-stack web applications using React, Next.js, Node.js, and modern frameworks.',
    color: '#00ff88',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    color: '#00d4ff',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure on AWS, Azure, and Google Cloud Platform.',
    color: '#a855f7',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimized database architecture and data management solutions.',
    color: '#00ff88',
  },
];

const aiServices = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Custom ML models for prediction, classification, and pattern recognition.',
    color: '#00d4ff',
  },
  {
    icon: Globe,
    title: 'Natural Language Processing',
    description: 'NLP solutions for text analysis, sentiment analysis, and chatbots.',
    color: '#a855f7',
  },
];

const securityServices = [
  {
    icon: Shield,
    title: 'VAPT Testing',
    description: 'Comprehensive vulnerability assessment and penetration testing services.',
    color: '#00ff88',
  },
  {
    icon: Lock,
    title: 'SOC Monitoring',
    description: '24/7 security operations center for threat detection and response.',
    color: '#00d4ff',
  },
];

const vaptFeatures = [
  'Network Security Assessment',
  'Web Application Testing',
  'Mobile App Security',
  'API Security Testing',
  'Social Engineering Tests',
  'Physical Security Assessment',
  'Compliance Audits (PCI-DSS, HIPAA)',
  'Detailed Remediation Reports',
];

const socFeatures = [
  'Real-time Threat Monitoring',
  'Incident Response Management',
  'Security Log Analysis',
  'Threat Intelligence Integration',
  'Automated Alert Systems',
  'Compliance Reporting',
  'Security Metrics Dashboard',
  'Regular Security Updates',
];

export default function ServicesPage() {
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
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions to build, secure, and scale your digital infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="text-gradient">Software Development</span>
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
              Building scalable, high-performance applications with cutting-edge technologies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="text-gradient">AI Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
              Leveraging artificial intelligence to transform data into actionable insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {aiServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="text-gradient">Cybersecurity Services</span>
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
              Enterprise-grade security solutions to protect your digital assets.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {securityServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold mb-6 text-[#00ff88]">VAPT Services Include</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vaptFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8"
              >
                <h3 className="text-3xl font-bold mb-6 text-[#00d4ff]">SOC Services Include</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
