import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BskyPost } from '../types';

export function useTag({ tag }: { tag: string }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['tag', { tag }],
    queryFn: async () => {
      if (!agent) {
        throw new Error('Not authenticated');
      }
      const response = await agent.api.app.bsky.feed.searchPosts({ q: `#${tag}` });
      return response.data.posts as BskyPost[];
    },
    enabled: !!agent,
  });
}
