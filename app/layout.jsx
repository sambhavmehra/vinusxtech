
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
const BackgroundAnimation = dynamic(() => import('@/components/animations/BackgroundAnimation'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const LeadPopup = dynamic(() => import('@/components/LeadPopup'), { ssr: false });
import { ToastContainer } from 'react-toastify';

/* ================= FONT ================= */

const inter = Inter({ subsets: ['latin'] });

/* ================= SEO METADATA ================= */

export const metadata = {
  metadataBase: new URL("https://www.vinusxtech.me"),

  title: {
    default: "VinusXTech | AI, Cybersecurity & Custom App Development",
    template: "%s | VinusXTech",
  },

  description:
    "Empowering startups globally with advanced Agentic AI, VAPT cybersecurity, and custom web/mobile app development. Scale securely with VinusXTech.",

  keywords: [
    "VinusXTech",
    "VinusXTech cybersecurity services",
    "AI Solutions",
    "Cybersecurity",
    "Web Development",
    "App Development",
    "DevOps",
    "Digital Marketing",
    "VAPT",
    "Threat Protection",
    "Endpoint Security",
  ],

  authors: [
    {
      name: "VinusXTech",
      url: "https://www.vinusxtech.me",
    },
  ],

  creator: "VinusXTech",
  publisher: "VinusXTech",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  openGraph: {
    title: "VinusXTech | AI, Cybersecurity & Custom App Development",
    description:
      "Empowering startups globally with advanced Agentic AI, VAPT cybersecurity, and custom web/mobile app development. Scale securely with VinusXTech.",
    url: "https://www.vinusxtech.me",
    siteName: "VinusXTech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "VinusXTech Agentic AI and Cybersecurity services for startups",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VinusXTech | AI & Cybersecurity Solutions",
    description:
      "Empowering startups globally with advanced Agentic AI, VAPT cybersecurity, and custom web/mobile app development. Scale securely with VinusXTech.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.vinusxtech.me",
  },

  category: "technology",

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },

  themeColor: "#050508",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

/* ================= ROOT LAYOUT ================= */

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "VinusXTech",
        alternateName: "VinusXTech AI & Cybersecurity",
        url: "https://www.vinusxtech.me",
        logo: "https://www.vinusxtech.me/logo.png",
        description: "Empowering startups globally with advanced Agentic AI, VAPT cybersecurity, and custom web/mobile app development.",
        disambiguatingDescription: "VinusXTech is not related to any company named Venus Tech.",
        sameAs: [
          "https://github.com/vinusxtech",
          "https://linkedin.com/company/vinusxtech",
          "https://twitter.com/vinusxtech",
          "https://medium.com/@vinusxtech"
        ],
        knowsAbout: [
          "Agentic AI",
          "Cybersecurity",
          "VAPT (Vulnerability Assessment and Penetration Testing)",
          "Web Development",
          "Mobile App Development",
          "DevOps",
          "Digital Marketing"
        ],
        areaServed: "Worldwide"
      },
      {
        "@type": "WebSite",
        name: "VinusXTech",
        url: "https://www.vinusxtech.me",
        description: "Empowering startups globally with advanced Agentic AI, VAPT cybersecurity, and custom web/mobile app development."
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Manifest & PWA icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Font Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={`${inter.className} bg-[#050508] text-white antialiased selection:bg-[#00d4ff]/30 selection:text-white`}>
        <CustomCursor />
        {/* Dynamic Background */}
        <BackgroundAnimation />
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <Footer />

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />

        <Chatbot />
        <LeadPopup />

        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-0T6CQ1X3YX"
        />

        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0T6CQ1X3YX');
            `,
          }}
        />
      </body>
    </html>
  );
}
