import ServicesPage from '@/components/pages/servicespage';

export const metadata = {
  title: 'Our Services | AI, Cybersecurity & Development | VinusXTech',
  description: 'Explore VinusXTech services: Agentic AI, VAPT cybersecurity, custom web & app development, DevOps automation, and digital marketing for startups.',
  alternates: {
    canonical: 'https://www.vinusxtech.me/services'
  }
};

export default function Page() {
  return <ServicesPage />;
}
