import AISolutionsPage from '@/components/pages/services/aisolutionspage';

export const metadata = {
  title: 'Agentic AI Solutions & Automation | VinusXTech',
  description: 'Custom Agentic AI, machine learning, and automation solutions for tech startups and enterprises. Accelerate growth with VinusXTech.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/services/ai-solutions'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Agentic AI Development Solutions",
    "provider": {
      "@type": "Organization",
      "name": "VinusXTech",
      "url": "https://www.vinusxtech.me"
    },
    "description": "Custom Agentic AI, machine learning, and automation solutions for tech startups and enterprises."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AISolutionsPage />
    </>
  );
}
