'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    title: 'SIEM + IDS System',
    description: 'Enterprise-grade security information and event management system with integrated intrusion detection. Features real-time log analysis, automated threat response, and comprehensive security dashboards.',
    tags: ['Security', 'SIEM', 'Python', 'ELK Stack', 'Redis'],
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
  },
  {
    title: 'SHARVA AI',
    description: 'Advanced AI-powered analytics platform for predictive modeling and business intelligence. Leverages machine learning for data-driven decision making and automated insights generation.',
    tags: ['AI', 'Machine Learning', 'TensorFlow', 'React', 'Python'],
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
  },
  {
    title: 'SOAR SOC Platform',
    description: 'Security Orchestration, Automation and Response platform for streamlined incident management. Automates security workflows and integrates with multiple security tools for unified threat response.',
    tags: ['Security', 'Automation', 'Python', 'Docker', 'Kubernetes'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00ff88 100%)',
  },
  {
    title: 'Blockchain EHR',
    description: 'Decentralized electronic health records system built on blockchain technology. Ensures patient data privacy, integrity, and secure inter-hospital data sharing with smart contract automation.',
    tags: ['Blockchain', 'Healthcare', 'Ethereum', 'Smart Contracts', 'IPFS'],
    gradient: 'linear-gradient(135deg, #00ff88 0%, #a855f7 100%)',
  },
  {
    title: 'Cloud-Native E-Commerce',
    description: 'Scalable microservices-based e-commerce platform deployed on Kubernetes. Features real-time inventory management, AI-powered recommendations, and seamless payment integration.',
    tags: ['E-Commerce', 'Microservices', 'Next.js', 'AWS', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
  },
  {
    title: 'IoT Fleet Management',
    description: 'Real-time vehicle tracking and fleet management system using IoT sensors. Provides predictive maintenance alerts, route optimization, and comprehensive analytics dashboard.',
    tags: ['IoT', 'React', 'Node.js', 'MongoDB', 'MQTT'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #00d4ff 100%)',
  },
  {
    title: 'Zero Trust Network',
    description: 'Enterprise zero trust network architecture implementation with micro-segmentation, continuous verification, and advanced threat detection capabilities.',
    tags: ['Security', 'Network', 'Zero Trust', 'Python', 'Terraform'],
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
  },
  {
    title: 'AI Chatbot Platform',
    description: 'Intelligent customer service chatbot platform powered by NLP and machine learning. Features multi-language support, sentiment analysis, and seamless CRM integration.',
    tags: ['AI', 'NLP', 'Python', 'DialogFlow', 'React'],
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
  },
];

export default function ProjectsPage() {
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
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Innovative solutions that solve real-world problems and drive business success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have a <span className="text-gradient">Project</span> in Mind?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can turn your vision into reality with our expertise in development and security.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-full hover:bg-[#00d4ff] transition-colors glow-green"
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
