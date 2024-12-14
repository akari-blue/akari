import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useFeeds({ feeds }: { feeds: string[] }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['feeds', { feeds }],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');
      if (feeds.length === 0) throw new Error('No feeds provided');

      const response = await agent.app.bsky.feed.getFeedGenerators({
        feeds,
      });
      return response.data.feeds;
    },
    enabled: !!agent,
  });
}
