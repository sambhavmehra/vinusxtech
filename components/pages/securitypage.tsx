'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Terminal } from 'lucide-react';

const vaptProcess = [
  {
    step: '1',
    title: 'Planning & Reconnaissance',
    description: 'Define scope, gather intelligence, and identify potential attack vectors.',
  },
  {
    step: '2',
    title: 'Vulnerability Scanning',
    description: 'Automated and manual scanning to discover security weaknesses.',
  },
  {
    step: '3',
    title: 'Exploitation',
    description: 'Attempt to exploit identified vulnerabilities to assess real-world impact.',
  },
  {
    step: '4',
    title: 'Reporting',
    description: 'Comprehensive report with findings, risk ratings, and remediation steps.',
  },
];

const socProcess = [
  {
    step: '1',
    title: 'Real-time Monitoring',
    description: '24/7 monitoring of networks, systems, and applications for security threats.',
  },
  {
    step: '2',
    title: 'Threat Detection',
    description: 'Advanced analytics and AI to identify potential security incidents.',
  },
  {
    step: '3',
    title: 'Incident Response',
    description: 'Rapid response to contain, investigate, and mitigate security threats.',
  },
  {
    step: '4',
    title: 'Continuous Improvement',
    description: 'Regular updates, reporting, and security posture optimization.',
  },
];

const tools = [
  { name: 'Nmap', description: 'Network discovery and security auditing' },
  { name: 'Metasploit', description: 'Penetration testing framework' },
  { name: 'Burp Suite', description: 'Web application security testing' },
  { name: 'Wireshark', description: 'Network protocol analyzer' },
  { name: 'OWASP ZAP', description: 'Web app vulnerability scanner' },
  { name: 'Splunk', description: 'SIEM and log analysis platform' },
  { name: 'Snort', description: 'Intrusion detection system' },
  { name: 'CrowdStrike', description: 'Endpoint detection and response' },
];

const threats = [
  'SQL Injection',
  'Cross-Site Scripting (XSS)',
  'DDoS Attacks',
  'Malware & Ransomware',
  'Phishing Attacks',
  'Zero-Day Exploits',
  'Data Breaches',
  'Insider Threats',
];

export default function SecurityPage() {
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
              <span className="text-gradient">Cybersecurity</span> Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Protecting your digital assets with enterprise-grade security solutions and expert threat management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-dark rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/20 flex items-center justify-center glow-green">
                  <Shield className="w-10 h-10 text-[#00ff88]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                VAPT <span className="text-gradient">Testing</span>
              </h2>
              <p className="text-gray-300 text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                Vulnerability Assessment and Penetration Testing (VAPT) is a comprehensive security evaluation
                that identifies, classifies, and addresses security vulnerabilities in your systems, networks,
                and applications.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vaptProcess.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="text-4xl font-bold text-[#00ff88] mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-dark rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-[#00d4ff]/20 flex items-center justify-center glow-blue">
                  <Eye className="w-10 h-10 text-[#00d4ff]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                SOC <span className="text-gradient">Monitoring</span>
              </h2>
              <p className="text-gray-300 text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                Security Operations Center (SOC) provides 24/7 monitoring and management of your security
                infrastructure. Our team of experts continuously monitors, detects, analyzes, and responds to
                cybersecurity incidents.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {socProcess.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <div className="text-4xl font-bold text-[#00d4ff] mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Security <span className="text-gradient">Tools</span>
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
              Industry-leading tools and technologies we use to protect your infrastructure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-dark rounded-xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Terminal className="w-6 h-6 text-[#00ff88]" />
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
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
              Threats We <span className="text-gradient">Protect Against</span>
            </h2>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
              Comprehensive protection against modern cyber threats.
            </p>

            <div className="glass-dark rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {threats.map((threat, index) => (
                  <motion.div
                    key={threat}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-3 glass rounded-lg"
                  >
                    <AlertTriangle className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
                    <span className="text-gray-300">{threat}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-3xl p-12 text-center"
          >
            <Lock className="w-16 h-16 text-[#00ff88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Secure</span> Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Get a free security assessment and discover how we can protect your digital assets.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-full hover:bg-[#00d4ff] transition-colors glow-green"
            >
              Schedule Assessment
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
