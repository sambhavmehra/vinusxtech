import React from 'react';

export const metadata = {
  title: 'Terms of Service | VinusXTech',
  description: 'Terms of Service and usage conditions for VinusXTech.',
};

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white pt-32 pb-24 bg-[#050508]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.02em] mb-4">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">Service</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#00d4ff]">01.</span> Agreement to Terms
            </h2>
            <p className="leading-relaxed mb-4">
              By accessing our website and utilizing our software engineering, AI solutions, or cybersecurity services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any of these terms, you are prohibited from using or accessing our platforms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#00ff88]">02.</span> Intellectual Property
            </h2>
            <p className="leading-relaxed mb-4">
              Unless otherwise stated in a specific Master Services Agreement (MSA), the website and its original content, features, and functionality are owned by VinusXTech and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="leading-relaxed">
              Custom software code, AI models, and infrastructure architecture developed for clients remain the intellectual property of VinusXTech until final payment is received and intellectual property transfer agreements are explicitly signed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#a855f7]">03.</span> Cybersecurity Authorization
            </h2>
            <p className="leading-relaxed mb-4">
              By engaging VinusXTech for Vulnerability Assessment and Penetration Testing (VAPT) or SOC Monitoring, you explicitly authorize our security engineers to perform offensive security operations against the designated targets.
            </p>
            <p className="leading-relaxed">
              You must provide written proof of authorization and ownership for any networks, applications, or infrastructure designated for testing. VinusXTech is not liable for incidental downtime or data loss resulting from standard security testing procedures.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#ffb347]">04.</span> Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              In no event shall VinusXTech, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-[#ff6b6b]">05.</span> Governing Law
            </h2>
            <p className="leading-relaxed mb-4">
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-400 mt-6">
              <p className="mb-1">VinusXTech Legal Department</p>
              <p className="mb-1">Gandhi Nagar, Bhopal</p>
              <p>Email: <a href="mailto:legal@vinusxtech.me" className="text-[#00ff88] hover:underline">legal@vinusxtech.me</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
