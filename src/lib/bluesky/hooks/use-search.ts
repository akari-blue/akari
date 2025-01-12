import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BSkyPost } from '../types/bsky-post';

export function useSearch({ q }: { q: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['search', { q }],
    queryFn: async () => {
      const response = await agent.app.bsky.feed.searchPosts({ q });
      return response.data.posts as BSkyPost[];
    },
    enabled: !!agent && !!q.trim(),
  });
}
