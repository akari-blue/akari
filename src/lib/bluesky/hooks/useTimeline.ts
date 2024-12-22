import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';
import { usePreferences } from './usePreferences';
import { BskyPost } from '../types';
import { getFeeds } from './useFeeds';

type Timeline = {
  feed: {
    post: BskyPost;
    feedContext: string;
  }[];
  cursor: string;
};

type TimelineQueryOptions = Pick<BlueskyState, 'agent' | 'isAuthenticated'> & {
  selectedFeed: string;
  preferences: ReturnType<typeof usePreferences>['data'];
};

export const timelineQueryOptions = ({ agent, isAuthenticated, selectedFeed, preferences }: TimelineQueryOptions) => {
  const feeds = getFeeds({ isAuthenticated, preferences });
  const feed = feeds.find((feed) => feed === selectedFeed) ?? feeds[0];
  return infiniteQueryOptions({
    queryKey: ['timeline', { feed, isAuthenticated }],
    queryFn: async ({ pageParam: cursor }) => {
      if (!agent) {
        throw new Error('Not authenticated');
      }

      // // guest
      // if (!isAuthenticated) {
      //   return agent.api.app.bsky.feed.getFeed({
      //     feed: "discover",
      //   });
      // }

      // authenticated
      const response = await agent.api.app.bsky.feed.getFeed({
        feed,
        cursor,
      });

      return response.data as Timeline;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: undefined as string | undefined,
    enabled: !!agent && feed !== undefined,
    retry: 1,
  });
};

export function useTimeline(selectedFeed: string) {
  const { agent, isAuthenticated } = useBlueskyStore();
  const { data: preferences } = usePreferences();

  return useInfiniteQuery(timelineQueryOptions({ agent, isAuthenticated, selectedFeed, preferences }));
}
