import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type NotificationsQueryOptions = Pick<BlueskyState, 'agent'>;

export const notificationsQueryOptions = ({ agent }: NotificationsQueryOptions) =>
  queryOptions({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');

      const response = await agent.api.app.bsky.notification.listNotifications();
      return response.data.notifications;
    },
    enabled: !!agent,
  });

export function useNotifications() {
  const agent = useBlueskyStore((state) => state.agent);

  return useQuery(notificationsQueryOptions({ agent }));
}
