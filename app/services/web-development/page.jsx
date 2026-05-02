import WebDevelopmentPage from '@/components/pages/services/webdevelopmentpage';

export const metadata = {
  title: 'Custom Web & Mobile App Development | VinusXTech',
  description: 'Scalable Next.js web applications and custom mobile app development services for startups. Build for performance with VinusXTech.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/services/web-development'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Web & Mobile App Development",
    "provider": {
      "@type": "Organization",
      "name": "VinusXTech",
      "url": "https://www.vinusxtech.me"
    },
    "description": "Scalable Next.js web applications and custom mobile app development services for startups."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebDevelopmentPage />
    </>
  );
}
