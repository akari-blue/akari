import { createRootRoute, Outlet, redirect, ScrollRestoration, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBlueskyStore } from '../lib/bluesky/store';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { useSettings } from '../hooks/useSetting';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    // Attempt to restore the session
    await useBlueskyStore.getState().restoreSession();

    if (location.pathname.startsWith('/login')) {
      // if already authenticated, redirect to root
      const { isAuthenticated } = useBlueskyStore.getState();
      console.info('isAuthenticated', isAuthenticated);
      if (isAuthenticated) {
        throw redirect({ to: '/' });
      }

      // if not authenticated, proceed to login
      return;
    }

    // redirect to profile
    if (location.pathname.startsWith('/@')) {
      throw redirect({
        to: '/profile/$handle',
        params: { handle: location.pathname.slice(2) },
      });
    }
  },
});

function Root() {
  const { experiments } = useSettings();
  const router = useRouterState();
  const pathname = router.location.pathname;
  return (
    <main className={cn('text-black dark:text-white min-h-screen')}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div
            className={cn(
              'bg-white dark:bg-black text-gray-900 dark:text-gray-100 py-8 px-4',
              (pathname !== '/' || (pathname === '/' && !experiments.responsiveUI)) && 'max-w-2xl mx-auto',
            )}
          >
            <div className="flex flex-col gap-2">
              <Navbar />
              <ErrorBoundary>
                <ScrollRestoration />
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
          {experiments.devMode && <ReactQueryDevtools />}
        </QueryClientProvider>
        {experiments.devMode && <TanStackRouterDevtools />}
        <Toaster position="bottom-right" closeButton richColors />
      </ErrorBoundary>
    </main>
  );
}
