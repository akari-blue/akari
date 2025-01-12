import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function usePost({ handle, rkey }: { handle: string; rkey: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useQuery({
    queryKey: ['post', { handle, rkey }],
    queryFn: async () => {
      const response = await agent.getPost({ repo: handle, rkey });
      return response.value;
    },
    enabled: !!agent && !!handle,
  });
}
