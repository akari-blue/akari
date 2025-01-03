import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './useAuth';
import { BSkyMessage } from '../types/BSkyMessage';
import AtpAgent from '@atproto/api';

const getMessages = async (agent: AtpAgent, convoId: string) => {
  const response = await agent.api.chat.bsky.convo.getMessages({
    convoId,
  });

  return response?.data.messages
    .slice(0)
    .sort((a, b) => new Date(a.sentAt as string).getTime() - new Date(b.sentAt as string).getTime()) as BSkyMessage[];
};

const getConvo = async (agent: AtpAgent, convoId: string) => {
  const convo = await agent.api.chat.bsky.convo.getConvo({ convoId });
  return convo.data.convo;
};

export function useConversation({ convoId }: { convoId: string }) {
  const { agent } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['conversations', { convoId }],
    queryFn: async () => {
      // @ts-expect-error bsky_chat does in fact work
      const proxy = agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');

      const messages = await getMessages(proxy, convoId);
      const convo = await getConvo(proxy, convoId);

      return {
        messages,
        convo,
      };
    },
    enabled: !!agent && isAuthenticated,
  });
}
