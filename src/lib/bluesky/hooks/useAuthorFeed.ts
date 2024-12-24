import { useInfiniteQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { AppBskyFeedDefs } from '@atproto/api';

type AuthorFeed = {
  cursor: string;
  feed: AppBskyFeedDefs.FeedViewPost[];
};

export function useAuthorFeed({ handle }: { handle: string }) {
  const { agent } = useBlueskyStore();

  return useInfiniteQuery<AuthorFeed>({
    queryKey: ['author-feed', handle],
    queryFn: async ({ pageParam: cursor }) => {
      if (!agent) throw new Error('Not authenticated');

      const response = await agent.api.app.bsky.feed.getAuthorFeed({ actor: handle, cursor: cursor as string });
      return response.data as AuthorFeed;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: undefined,
    enabled: !!agent,
    retry: 1,
  });
}
