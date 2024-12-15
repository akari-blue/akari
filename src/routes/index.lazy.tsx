import { createLazyFileRoute } from '@tanstack/react-router';

import { Timeline } from '../components/Timeline';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { FeedSelector } from '../components/FeedSelector';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <ErrorBoundary>
        <FeedSelector />
      </ErrorBoundary>
      <ErrorBoundary>
        <Timeline />
      </ErrorBoundary>
    </>
  );
}
