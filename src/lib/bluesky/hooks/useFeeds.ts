import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useFeeds({ feeds }: { feeds: string[] }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['feeds', { feeds }],
    queryFn: async () => {
      if (feeds.length === 0) throw new Error('No feeds provided');
      if (!agent) throw new Error('Not authenticated');

      const response = await agent.api.app.bsky.feed.getFeedGenerators({
        feeds,
      });
      return response.data.feeds;
    },
    enabled: !!agent,
  });
}
