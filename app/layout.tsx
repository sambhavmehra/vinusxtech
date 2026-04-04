import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import BackgroundAnimation from '@/components/animations/BackgroundAnimation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VinUSXtech - Building Secure Digital Solutions',
  description: 'Leading tech company providing software development, AI solutions, and cybersecurity services including VAPT and SOC monitoring.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050508" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <BackgroundAnimation />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
