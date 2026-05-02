import React from 'react';

export const metadata = {
  title: 'Privacy Policy | VinusXTech',
  description: 'Privacy Policy and data handling practices for VinusXTech.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white pt-32 pb-24 bg-[#050508]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.02em] mb-4">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]">Policy</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#00d4ff]">01.</span> Introduction
            </h2>
            <p className="leading-relaxed mb-4">
              At VinusXTech, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our software development and cybersecurity services.
            </p>
            <p className="leading-relaxed">
              By accessing our platform, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#00ff88]">02.</span> Data Collection
            </h2>
            <p className="leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect includes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Personal Data:</strong> Name, email address, phone number, and company details when you submit a contact form or request a service audit.</li>
              <li><strong className="text-gray-200">Derivative Data:</strong> IP address, browser type, operating system, and access times automatically collected via server logs.</li>
              <li><strong className="text-gray-200">Security Audit Data:</strong> Information explicitly provided by your organization for the purpose of Vulnerability Assessment and Penetration Testing (VAPT).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#a855f7]">03.</span> Use of Your Information
            </h2>
            <p className="leading-relaxed mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We use information collected to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Deliver secure software solutions and infrastructure deployments.</li>
              <li>Execute authorized cybersecurity audits and threat monitoring.</li>
              <li>Improve our website performance and user experience.</li>
              <li>Respond to customer service and technical support requests.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#ffb347]">04.</span> Data Security
            </h2>
            <p className="leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. As a cybersecurity firm, we deploy zero-trust architecture, end-to-end encryption, and continuous SOC monitoring to protect our internal databases. However, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#ff6b6b]">05.</span> Contact Us
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy or our data handling practices, please contact our Data Protection Officer at:
            </p>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-400">
              <p className="mb-1">VinusXTech Security Division</p>
              <p className="mb-1">Gandhi Nagar, Bhopal</p>
              <p>Email: <a href="mailto:info@vinusxtech.me" className="text-[#00d4ff] hover:underline">info@vinusxtech.me</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
