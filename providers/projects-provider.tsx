'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from "react";

export const mainQueryClient = new QueryClient();
function TanstackProvider({ children }: { children: ReactNode; }) {
  return (
    <QueryClientProvider client={mainQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export {
  TanstackProvider
};
