import { useInfiniteQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { getTimeline, getDiscoverFeed } from '../api';
import { TimelinePage } from '../types';

export function useTimeline() {
  const { agent, isAuthenticated } = useBlueskyStore();

  return useInfiniteQuery<TimelinePage>({
    queryKey: ['timeline', isAuthenticated],
    queryFn: async ({ pageParam }) => {
      if (!agent) {
        throw new Error('Not authenticated');
      }
      return isAuthenticated ? 
        await getDiscoverFeed(agent, pageParam as string) : 
        await getTimeline(agent, pageParam as string);
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: '',
    enabled: !!agent,
    retry: 1,
  });
}