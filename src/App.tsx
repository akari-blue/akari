import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useBlueskyStore } from "./lib/bluesky/store";
import { LoginForm } from "./components/LoginForm";
import { Timeline } from "./components/Timeline";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Button } from "./components/ui/Button";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FeedSelector } from "./components/FeedSelector";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

function BlueskyApp() {
  const { isAuthenticated, logout, restoreSession } = useBlueskyStore();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 max-w-2xl mx-auto py-8 px-4">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Welcome to Bluesky
          </h1>
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between items-center">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl font-bold">Feeds</h1>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
            <ErrorBoundary>
              <FeedSelector />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <Timeline />
          </ErrorBoundary>
        </div>
      )}
      <Toaster position="bottom-right" closeButton richColors />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BlueskyApp />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
