import DevOpsPage from '@/components/pages/services/devopspage';

export const metadata = {
  title: 'Cloud Infrastructure & DevOps Automation | VinusXTech',
  description: 'Enterprise-grade CI/CD pipelines, Kubernetes orchestration, and cloud-native DevOps solutions for startups. Zero-downtime deployments by VinusXTech.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/services/devops'
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cloud Infrastructure & DevOps Automation",
    "provider": {
      "@type": "Organization",
      "name": "VinusXTech",
      "url": "https://www.vinusxtech.me"
    },
    "description": "Enterprise-grade CI/CD pipelines, Kubernetes orchestration, and cloud-native DevOps solutions for startups."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevOpsPage />
    </>
  );
}
