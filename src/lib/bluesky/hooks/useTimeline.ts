import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query';
import { BlueskyState, useBlueskyStore } from '../store';
import { usePreferences } from './usePreferences';
import { BskyPost } from '../types';
import { getFeeds } from './useFeeds';
import { useSettings } from '../../../hooks/useSetting';

type Timeline = {
  feed: {
    post: BskyPost;
    feedContext: string;
  }[];
  cursor: string;
};

type TimelineQueryOptions = Pick<BlueskyState, 'agent' | 'isAuthenticated'> & {
  preferences: ReturnType<typeof usePreferences>['data'];
  columns: string[];
  columnNumber: number;
};

export const timelineQueryOptions = ({
  agent,
  isAuthenticated,
  preferences,
  columns,
  columnNumber,
}: TimelineQueryOptions) => {
  const selectedFeed = columns[columnNumber];
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

export function useTimeline(columnNumber: number) {
  const columns = useSettings((state) => state.columns);
  const agent = useBlueskyStore((state) => state.agent);
  const isAuthenticated = useBlueskyStore((state) => state.isAuthenticated);
  const { data: preferences } = usePreferences();

  return useInfiniteQuery(timelineQueryOptions({ agent, isAuthenticated, preferences, columns, columnNumber }));
}
