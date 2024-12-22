import { createFileRoute } from '@tanstack/react-router';
import { preferencesQueryOptions } from '../lib/bluesky/hooks/usePreferences';
import { timelineQueryOptions } from '../lib/bluesky/hooks/useTimeline';
import { useSettings } from '../hooks/useSetting';

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    const { agent, isAuthenticated } = context.blueskyStore.getState();
    const { columns, experiments } = useSettings.getState();
    const columnsNumber = Math.min(experiments.columns || 1, 4);
    const preferences = await context.queryClient.ensureQueryData(preferencesQueryOptions({ agent, isAuthenticated }));

    const timelines = await Promise.all(
      Array.from({ length: columnsNumber }).map((_, index) => {
        return context.queryClient.ensureInfiniteQueryData(
          timelineQueryOptions({ agent, isAuthenticated, preferences, columns, columnNumber: index }),
        );
      }),
    );

    return {
      preferences,
      timelines,
    };
  },
});
