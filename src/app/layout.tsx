'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AuthProvider } from '../shared/context/AuthContext';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </QueryClientProvider>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}