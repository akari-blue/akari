import { createLazyFileRoute } from '@tanstack/react-router';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { FeedSelector } from '../components/FeedSelector';
import { cn } from '../lib/utils';
import { useSettings } from '../hooks/useSetting';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const experiments = useSettings((state) => state.experiments);
  const columns = Math.min(experiments.columns || 1, 4);
  return (
    <div
      className={cn('grid gap-4')}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div className="flex flex-col gap-2">
          <ErrorBoundary>
            <FeedSelector columnNumber={index} key={`column-${index}`} />
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
