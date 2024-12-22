import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';
import type { usePreferences } from './usePreferences';

type FeedsQueryOptions = Pick<BlueskyState, 'agent'> & {
  feeds: string[];
};

export const feedsQueryOptions = ({ agent, feeds }: FeedsQueryOptions) =>
  queryOptions({
    queryKey: ['feeds', { feeds }],
    queryFn: async () => {
      if (feeds.length === 0) throw new Error('No feeds provided');
      if (!agent) throw new Error('Not authenticated');

      const response = await agent.api.app.bsky.feed.getFeedGenerators({
        feeds,
      });
      return response.data.feeds;
    },
    enabled: !!agent,
  });

export function useFeeds({ feeds }: { feeds: string[] }) {
  const { agent } = useBlueskyStore();

  return useQuery(feedsQueryOptions({ agent, feeds }));
}

interface FeedSelectorParams {
  isAuthenticated: boolean;
  preferences: ReturnType<typeof usePreferences>['data'];
}

export const getFeeds = ({ isAuthenticated, preferences }: FeedSelectorParams) => {
  const savedFeedsPrefV2 = isAuthenticated
    ? preferences?.find((item) => item.$type === 'app.bsky.actor.defs#savedFeedsPrefV2')
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

  return feeds;
};