import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBlueskyStore } from '../lib/bluesky/store';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { useSettings } from '../hooks/useSetting';
import { Button } from '../components/ui/Button';
import { useAuth } from '../lib/bluesky/hooks/useAuth';

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
    if (location.pathname === '/login') return;

    // redirect to profile
    if (location.pathname.startsWith('/@')) {
      throw redirect({
        to: '/profile/$handle',
        params: { handle: location.pathname.slice(2) },
      });
    }

    // Attempt to restore the session
    await useBlueskyStore.getState().restoreSession();

    // Redirect to login if not authenticated
    const { isAuthenticated } = useBlueskyStore.getState();
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href.trim(),
        },
      });
    }
  },
});

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <Button variant="ghost" onClick={logout}>
      Logout
    </Button>
  );
};

function Root() {
  const { experiments } = useSettings();
  return (
    <main className="text-black dark:text-white">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 max-w-2xl mx-auto py-8 px-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-between items-center">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-2xl font-bold">[placeholder name]</h1>
                  <LogoutButton />
                </div>
              </div>
              <ErrorBoundary>
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
