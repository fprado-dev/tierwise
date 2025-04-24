'use client';

import { TanstackProvider } from '@/providers/projects-provider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode; }) {

  return (
    <TanstackProvider>
      {children}
    </TanstackProvider>
  );
}