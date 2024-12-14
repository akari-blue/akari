import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBlueskyStore } from '../lib/bluesky/store';

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

function Root() {
  return (
    <main className="text-black dark:text-white">
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <TanStackRouterDevtools />
      </ErrorBoundary>
    </main>
  );
}
