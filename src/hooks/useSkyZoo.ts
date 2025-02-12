import { useQuery } from '@tanstack/react-query';

export function useSkyZoo({ did }: { did: string }) {
  return useQuery({
    queryKey: ['sky-zoo', { did }],
    queryFn: async () => {
      const response = await fetch(`https://skyzoo.blue/stats/plc/${did}`);
      if (!response.ok) throw new Error('Failed to fetch SkyZoo stats');
      return (await response.json()) as {
        did: string;
        pos_atproto: number;
        pos_bsky: number;
        createdAt: string;
      };
    },
  });
}
