import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Local SQLite is fast; don't refetch on window focus or strictly retry
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity, // Keep data fresh aggressively since we control mutation caching locally
    },
  },
});
