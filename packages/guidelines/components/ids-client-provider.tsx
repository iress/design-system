'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const IressProviderDynamic = dynamic(
  () =>
    import('@iress-oss/ids-components').then((mod) => ({
      default: ({ children }: { children: ReactNode }) => (
        <mod.IressProvider>{children}</mod.IressProvider>
      ),
    })),
  { ssr: false },
);

export function IDSClientProvider({ children }: { children: ReactNode }) {
  return <IressProviderDynamic>{children}</IressProviderDynamic>;
}
