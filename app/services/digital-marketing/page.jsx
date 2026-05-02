import DigitalMarketingPage from '@/components/pages/services/digitalmarketingpage';

export const metadata = {
  title: 'Digital Marketing & SEO Services for Startups | VinusXTech',
  description: 'Data-driven digital marketing, technical SEO, and performance advertising to grow your startup. Get measurable ROI with VinusXTech.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/services/digital-marketing'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Marketing & SEO Services",
    "provider": {
      "@type": "Organization",
      "name": "VinusXTech",
      "url": "https://www.vinusxtech.me"
    },
    "description": "Data-driven digital marketing, technical SEO, and performance advertising to grow your startup."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalMarketingPage />
    </>
  );
}
