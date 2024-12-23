import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './useAuth';
import { BSkyMessage } from '../types/BSkyMessage';

export function useConversation({ convoId }: { convoId: string }) {
  const { agent, session } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['conversations', { convoId }],
    queryFn: async () => {
      if (!session) return [];

      // @ts-expect-error bsky_chat does in fact work
      const proxy = agent?.withProxy('bsky_chat', 'did:web:api.bsky.chat');
      const response = await proxy?.api.chat.bsky.convo.getMessages({
        convoId,
      });

      return response?.data.messages
        .slice(0)
        .sort((a, b) => new Date(a.sentAt as string).getTime() - new Date(b.sentAt as string).getTime()) as BSkyMessage[];
    },
    enabled: !!agent && isAuthenticated,
  });
}
