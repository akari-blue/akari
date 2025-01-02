import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function usePostThread({ uri }: { uri?: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['post', { uri }],
    queryFn: async () => {
      if (!uri) throw new Error('No URI provided');

      const response = await agent.api.app.bsky.feed.getPostThread({ uri });
      return response.data.thread;
    },
    enabled: !!agent && !!uri,
  });
}
