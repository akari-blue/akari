import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useUpdateSeenNotifications() {
  const agent = useBlueskyStore((store) => store.agent);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['notifications-seen'],
    mutationFn: async () => {
      await agent.updateSeenNotifications(new Date().toISOString());
      await queryClient.invalidateQueries({
        queryKey: ['unread-count'],
      });
    },
  });
}
