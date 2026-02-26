import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from './client';

export function FetcherProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
