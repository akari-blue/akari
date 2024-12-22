import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useProfile({ handle, forProfilePage }: { handle?: string; forProfilePage?: boolean }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['profile', handle],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');
      if (!handle) throw new Error('No handle provided');
      const response = await agent.api.app.bsky.actor.getProfile({ actor: handle });

      let pos_bsky = undefined;
      if (forProfilePage) {
        try {
          const res = await fetch(`https://skyzoo.blue/stats/plc/${response.data.did}`);
          const skyzoo_data = (await res.json()) as any;
          pos_bsky = skyzoo_data.pos_bsky as number;
        } catch (error) {}
      }

      return { ...response.data, pos_bsky };
    },
    enabled: !!agent && !!handle,
  });
}
