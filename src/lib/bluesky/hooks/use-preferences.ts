import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './use-auth';

export function usePreferences() {
  const { agent } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const response = await agent.api.app.bsky.actor.getPreferences();
      return response?.data.preferences;
    },
    enabled: !!agent && isAuthenticated,
  });
}
