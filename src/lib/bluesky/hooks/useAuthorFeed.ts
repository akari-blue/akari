import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type AuthorFeedQueryOptions = Pick<BlueskyState, 'agent'> & {
  handle: string;
};

export const authorFeedQuerOptions = ({ agent, handle }: AuthorFeedQueryOptions) =>
  queryOptions({
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

export function useAuthorFeed({ handle }: { handle: string }) {
  const agent = useBlueskyStore((state) => state.agent);

  return useQuery(authorFeedQuerOptions({ agent, handle }));
}
