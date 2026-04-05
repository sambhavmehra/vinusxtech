import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import BackgroundAnimation from '@/components/animations/BackgroundAnimation';
import { ToastContainer } from 'react-toastify';

/* ================= FONT ================= */

const inter = Inter({ subsets: ['latin'] });

/* ================= SEO METADATA ================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://vinusxtech.me"),

  title: {
    default: "VinusXtech | Building Secure Digital Solutions",
    template: "%s | VinusXtech",
  },

  description:
    "VinusXtech is a leading technology company specializing in ethical hacking, penetration testing, vulnerability assessment, SIEM monitoring, AI solutions, and secure web applications.",

  keywords: [
    "VinusXtech",
    "Cybersecurity Solutions",
    "Ethical Hacking",
    "Penetration Testing",
    "Vulnerability Assessment",
    "VAPT",
    "SIEM Monitoring",
    "SOC Operations",
    "AI Solutions",
    "Secure Web Applications",
    "Tech Startup",
  ],

  authors: [
    {
      name: "VinusXtech",
      url: "https://vinusxtech.me",
    },
  ],

  creator: "VinusXtech",
  publisher: "VinusXtech",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  openGraph: {
    title: "VinusXtech | Secure Digital Solutions",
    description:
      "Explore enterprise-grade cybersecurity projects, AI solutions, and secure applications by VinusXtech.",
    url: "https://vinusxtech.me",
    siteName: "VinusXtech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "VinusXtech Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VinusXtech | Secure Digital Solutions",
    description:
      "Cybersecurity, penetration testing, SIEM monitoring, AI, and secure software development.",
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
    canonical: "https://vinusxtech.me",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VinusXtech",
    url: "https://vinusxtech.me",
    logo: "https://vinusxtech.me/logo.png",
    description: "Leading tech company providing software development, AI solutions, and cybersecurity services.",
    sameAs: [
      "https://github.com/vinusxtech",
      "https://linkedin.com/company/vinusxtech",
    ],
    knowsAbout: [
      "Cybersecurity",
      "Ethical Hacking",
      "Penetration Testing",
      "VAPT",
      "SIEM",
      "AI Solutions",
      "Software Development",
      "SOC Operations",
    ],
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

      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <BackgroundAnimation />
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <Footer />
        
        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />

        <Chatbot />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0T6CQ1X3YX"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
