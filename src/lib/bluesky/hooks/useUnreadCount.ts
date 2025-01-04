import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useUnreadCount() {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['unread-count'],
    queryFn: async () => {
      const response = await agent.api.app.bsky.notification.getUnreadCount();
      return response.data.count;
    },
    enabled: !!agent,
    // refetch every 10 seconds since we don't have a websocket connection
    refetchInterval: 10_000,
    initialData: 0,
  });
}
