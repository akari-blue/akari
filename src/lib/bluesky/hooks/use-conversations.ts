import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './use-auth';
import { BSkyConvo } from '../types/bsky-convo';

export function useConversations() {
  const { agent, session } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      if (!session) return [];
      const pdsUrl = session.didDoc?.service[0]?.serviceEndpoint;
      if (!pdsUrl) return [];

      const proxy = agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');
      const response = await proxy.chat.bsky.convo.listConvos();
      const convos = response?.data.convos as BSkyConvo[];

      // unread go first
      return convos.sort((a, b) => {
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
        if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
        return new Date(b.lastMessage.sentAt).getTime() - new Date(a.lastMessage.sentAt).getTime();
      });
    },
    enabled: !!agent && isAuthenticated,
  });
}
