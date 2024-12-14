import { createLazyFileRoute } from '@tanstack/react-router';

import { Toaster } from 'sonner';
import { useBlueskyStore } from '../lib/bluesky/store';
import { Timeline } from '../components/Timeline';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Button } from '../components/ui/Button';
import { FeedSelector } from '../components/FeedSelector';

function Index() {
  const { logout } = useBlueskyStore();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 max-w-2xl mx-auto py-8 px-4">
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
      <Toaster position="bottom-right" closeButton richColors />
    </div>
  );
}

export const Route = createLazyFileRoute('/')({
  component: Index,
});
