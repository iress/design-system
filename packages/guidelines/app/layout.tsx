import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { IDSClientProvider } from '@/components/ids-client-provider';
import './global.css';
import '@iress-oss/ids-components/dist/style.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Iress Design System',
    default: 'Iress Design System',
  },
  description:
    'Component documentation, patterns, and guidelines for building consistent Iress user interfaces.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IDSClientProvider>{children}</IDSClientProvider>
      </body>
    </html>
  );
}
