import SecurityPage from '@/components/pages/securitypage';

export const metadata = {
  title: 'VAPT & Penetration Testing Services | VinusXTech',
  description: 'Protect your startup with comprehensive VAPT and penetration testing. VinusXTech provides deep-level cybersecurity audits to identify and fix vulnerabilities.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/security'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "VAPT & Penetration Testing",
    "provider": {
      "@type": "Organization",
      "name": "VinusXTech",
      "url": "https://www.vinusxtech.me"
    },
    "description": "Protect your startup with comprehensive VAPT and penetration testing. VinusXTech provides deep-level cybersecurity audits."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SecurityPage />
    </>
  );
}
