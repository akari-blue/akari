import { useInfiniteQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { usePreferences } from './use-preferences';
import { BSkyPost } from '../types/bsky-post';

type Feed = {
  feed: {
    post: BSkyPost;
    feedContext: string;
  }[];
  cursor: string;
};

export function useFeed(selectedFeed: string | undefined) {
  const agent = useBlueskyStore((store) => store.agent);
  const isAuthenticated = useBlueskyStore((store) => store.isAuthenticated);
  const preferences = usePreferences();
  const savedFeedsPrefV2 = isAuthenticated
    ? preferences.data?.find((item) => item.$type === 'app.bsky.actor.defs#savedFeedsPrefV2')
    : null;
  const feeds = (
    savedFeedsPrefV2?.items as
      | (
          | {
              type: 'feed';
              value: `at://${string}`;
              pinned: boolean;
              id: string;
            }
          | {
              type: 'timeline';
              value: string;
              pinned: boolean;
              id: string;
            }
        )[]
      | undefined
  )
    ?.filter((item) => item.type === 'feed')
    ?.map((item) => item.value) ?? ['at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot'];
  const feed = feeds.find((feed) => feed === selectedFeed) ?? feeds[0];

  return useInfiniteQuery<Feed>({
    queryKey: ['feed', { feed }],
    queryFn: async ({ pageParam }) => {
      if (!feed) throw new Error('Feed not found');

      const cursor = pageParam as string | undefined;
      const response = await agent.api.app.bsky.feed.getFeed({
        feed,
        cursor,
      });

      return response.data as Feed;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: undefined,
    enabled: !!agent && feed !== undefined,
    retry: 1,
    staleTime: Infinity,
  });
}
