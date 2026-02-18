import type { Metadata } from 'next';
import '@/styles/globals.css';
import { RootLayout } from '@/components/layouts/RootLayout';

export const metadata: Metadata = {
  title: 'EasyAgent - AI Agent Builder',
  description: 'Build, manage, and deploy AI agents with ease using our intuitive platform.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'EasyAgent - AI Agent Builder',
    description: 'Build, manage, and deploy AI agents with ease using our intuitive platform.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
