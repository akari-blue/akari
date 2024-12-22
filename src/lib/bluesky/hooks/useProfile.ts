import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type ProfileQueryOptions = Pick<BlueskyState, 'agent'> & {
  handle?: string;
};

export const profileQueryOptions = ({ agent, handle }: ProfileQueryOptions) =>
  queryOptions({
    queryKey: ['profile', handle],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');
      if (!handle) throw new Error('No handle provided');
      const response = await agent.api.app.bsky.actor.getProfile({ actor: handle });
      return response.data;
    },
    enabled: !!agent && !!handle,
  });

export function useProfile({ handle }: { handle?: string }) {
  const agent = useBlueskyStore((state) => state.agent);

  return useQuery(profileQueryOptions({ agent, handle }));
}
