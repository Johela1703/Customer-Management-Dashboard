import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Advanced CRM Dashboard - Enterprise Customer Management',
  description:
    'A high-performance, real-time CRM dashboard built with Next.js App Router, TanStack Query, Tailwind CSS, and shadcn/ui components featuring advanced search, multi-criteria filtering, drag & drop, and bulk actions.',
  keywords: [
    'CRM',
    'Dashboard',
    'Next.js',
    'TanStack Query',
    'TypeScript',
    'Tailwind CSS',
    'Customer Management',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
