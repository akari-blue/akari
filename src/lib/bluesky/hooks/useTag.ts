import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BSkyPost } from '../types/BSkyPost';

export function useTag({ tag }: { tag: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['tag', { tag }],
    queryFn: async () => {
      const response = await agent.api.app.bsky.feed.searchPosts({ q: `#${tag}` });
      return response.data.posts as BSkyPost[];
    },
    enabled: !!agent,
  });
}
