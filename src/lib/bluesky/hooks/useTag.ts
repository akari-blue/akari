import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';
import { BskyPost } from '../types';

type TagQueryOptions = Pick<BlueskyState, 'agent'> & {
  tag: string;
};

export const tagQueryOptions = ({ agent, tag }: TagQueryOptions) =>
  queryOptions({
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

export function useTag({ tag }: { tag: string }) {
  const agent = useBlueskyStore((state) => state.agent);

  return useQuery(tagQueryOptions({ agent, tag }));
}
