import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/error-boundary';
import { FeedSelector } from '../components/feed-selector';
import { cn } from '../lib/utils';
import { useSettings } from '../hooks/use-setting';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { experiments } = useSettings();
  const columns = Math.min(experiments.columns || 1, 4);

  return (
    <div
      className={cn('grid gap-4')}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div className="flex flex-col gap-2" key={`column-${index}`}>
          <ErrorBoundary>
            <FeedSelector columnNumber={index} key={`column-${index}`} />
          </ErrorBoundary>
        </div>
      ))}
    </div>
  );
}
