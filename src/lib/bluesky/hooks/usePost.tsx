import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BskyPost } from '../types';

export function usePost({ uri }: { uri: string }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['post', { uri }],
    queryFn: async () => {
      if (!agent) {
        throw new Error('Not authenticated');
      }
      const response = await agent.api.app.bsky.feed.getPostThread({ uri });
      return response.data.thread.post as BskyPost;
    },
    enabled: !!agent,
  });
}
