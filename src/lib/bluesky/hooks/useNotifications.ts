import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useNotifications() {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');

      const response = await agent.api.app.bsky.notification.listNotifications();
      return response.data.notifications;
    },
    enabled: !!agent,
  });
}
