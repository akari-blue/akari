import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBlueskyStore } from '../lib/bluesky/store';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { useSettings } from '../hooks/useSetting';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from '../components/ui/Link';

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

    console.info('beforeLoad', location.pathname);
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

const SettingsLink = () => {
  return <Link to="/settings">Settings</Link>;
};

const LogoutButton = () => {
  const { logout } = useAuth();
  return <button onClick={logout}>Logout</button>;
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
                  <Link to="/">
                    <h1 className="text-2xl font-bold">[placeholder name]</h1>
                  </Link>
                  <div className="flex flex-row gap-2">
                    <SettingsLink />
                    <LogoutButton />
                  </div>
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
