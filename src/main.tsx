import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import './i18n';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

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

// Log debug details
console.info('__APP_NAME__', `"${__APP_NAME__}"`);
console.info('__APP_VERSION__', `"${__APP_VERSION__}"`);
console.info('__COMMIT_HASH__', `"${__COMMIT_HASH__}"`);
console.info('__BUILD_DATE__', `"${__BUILD_DATE__}"`);

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider storageKey="theme">
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
