import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Toaster } from 'react-hot-toast';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickScan - Book MRI, CT Scans, Health Checkups',
  description: 'Book medical tests, scans, and health checkups with instant appointments. 950+ scan centers across India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}