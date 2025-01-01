import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export function TestRouterProvider({ children }: { children: ReactNode }) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const rootRoute = createRootRoute({
    component: Outlet,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => children,
  });

  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = createRouter({ routeTree });

  return (
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router as never} />
    </QueryClientProvider>
  );
}
