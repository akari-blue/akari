import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useProfile({ handle }: { handle?: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['profile', handle],
    queryFn: async () => {
      if (!handle) throw new Error('No handle provided');
      const response = await agent.api.app.bsky.actor.getProfile({ actor: handle.toLowerCase() });
      return response.data;
    },
    enabled: !!agent && !!handle,
  });
}
