import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function usePostThread({ uri }: { uri?: string }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['post', { uri }],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');
      if (!uri) throw new Error('No URI provided');

      const response = await agent.api.app.bsky.feed.getPostThread({ uri });
      return response.data.thread;
    },
    enabled: !!agent && !!uri,
  });
}
