import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './useAuth';

export function useConversations() {
  const { agent, session } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      if (!session) return [];
      const pdsUrl = session.didDoc?.service[0]?.serviceEndpoint;
      if (!pdsUrl) return [];

      // @ts-expect-error bsky_chat does in fact work
      const proxy = agent?.withProxy('bsky_chat', 'did:web:api.bsky.chat');
      const response = await proxy?.api.chat.bsky.convo.listConvos();
      return response?.data.convos;
    },
    enabled: !!agent && isAuthenticated,
  });
}
