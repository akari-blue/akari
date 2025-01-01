import { render } from '@testing-library/react';
import { createRouter, createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from '../../routeTree.gen';

export function renderRoute(route: string) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const memoryHistory = createMemoryHistory({
    initialEntries: [route],
  });

  const router = createRouter({
    routeTree,
    context: {
      queryClient: testQueryClient,
    },
    defaultPreload: 'intent', // not sure if I need this or the next line
    defaultPreloadStaleTime: 0,
    history: memoryHistory, // also not sure if this is necessary but probably is
  });

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return {
    ...result,
    rerender: () =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      ),
  };
}
