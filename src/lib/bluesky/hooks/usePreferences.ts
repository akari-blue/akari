import { queryOptions, useQuery } from '@tanstack/react-query';
import { BlueskyState, useBlueskyStore } from '../store';

type PreferencesQueryOptions = Pick<BlueskyState, 'agent' | 'isAuthenticated'>;

export const preferencesQueryOptions = ({ agent, isAuthenticated }: PreferencesQueryOptions) =>
  queryOptions({
    queryKey: ['preferences'],
    queryFn: async () => {
      const response = await agent?.api.app.bsky.actor.getPreferences();
      return response?.data.preferences;
    },
    enabled: !!agent && isAuthenticated,
  });

export function usePreferences() {
  const agent = useBlueskyStore((state) => state.agent);
  const isAuthenticated = useBlueskyStore((state) => state.isAuthenticated);

  return useQuery(preferencesQueryOptions({ agent, isAuthenticated }));
}
