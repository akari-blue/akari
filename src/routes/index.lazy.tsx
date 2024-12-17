import { createLazyFileRoute } from '@tanstack/react-router';

import { Timeline } from '../components/Timeline';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { FeedSelector } from '../components/FeedSelector';
import { cn } from '../lib/utils';
import { useSettings } from '../hooks/useSetting';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { experiments } = useSettings();
  return (
    <div
      className={cn('grid gap-4')}
      style={{
        gridTemplateColumns: `repeat(${experiments.columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: experiments.columns }).map(() => (
        <div className="flex flex-col gap-2">
          <ErrorBoundary>
            <FeedSelector />
          </ErrorBoundary>
          <ErrorBoundary>
            <div className={cn(experiments.columns !== 1 && 'h-dvh overflow-scroll')}>
              <Timeline />
            </div>
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
