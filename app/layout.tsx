import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'TG Testing App',
  description: 'Generated by TG devs'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="min-h-dvh"
      lang="en"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-w-full min-h-dvh antialiased`}>
        <main className="relative grow flex flex-col pt-8 gap-4">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
