import { useInfiniteQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BSkyNotification } from '../types/BSkyNotification';

type Notifications = {
  cursor: string;
  notifications: BSkyNotification[];
};

export function useNotifications() {
  const agent = useBlueskyStore((store) => store.agent);

  return useInfiniteQuery<Notifications>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam: cursor }) => {
      const response = await agent.api.app.bsky.notification.listNotifications({ cursor: cursor as string });
      return response.data as Notifications;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    initialPageParam: undefined,
    enabled: !!agent,
  });
}
