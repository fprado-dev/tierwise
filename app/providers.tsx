'use client';

import { ProjectsProvider } from '@/providers/projects-provider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode; }) {
  return (
    <ProjectsProvider>
      {children}
    </ProjectsProvider>
  );
}