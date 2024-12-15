import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useAuthorFeed({ handle }: { handle: string }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['author-feed', handle],
    queryFn: async () => {
      if (!agent) {
        throw new Error('Not authenticated');
      }
      const response = await agent.api.app.bsky.feed.getAuthorFeed({ actor: handle });
      return response.data.feed;
    },
    enabled: !!agent,
  });
}
