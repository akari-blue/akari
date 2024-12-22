import { createFileRoute } from '@tanstack/react-router';
import { tagQueryOptions } from '../lib/bluesky/hooks/useTag';

export const Route = createFileRoute('/tag/$tag')({
  loader: async ({ params, context }) => {
    const { agent } = context.blueskyStore.getState();
    return context.queryClient.ensureQueryData(tagQueryOptions({ tag: params.tag, agent }));
  },
});
