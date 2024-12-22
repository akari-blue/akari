import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type ConversationQueryOptions = Pick<BlueskyState, 'agent' | 'session' | 'isAuthenticated'> & {
  convoId: string;
};

export const conversationQueryOptions = ({ convoId, agent, isAuthenticated, session }: ConversationQueryOptions) =>
  queryOptions({
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
        .sort((a, b) => new Date(a.sentAt as string).getTime() - new Date(b.sentAt as string).getTime());
    },
    enabled: !!agent && isAuthenticated,
  });

export function useConversation({ convoId }: { convoId: string }) {
  const agent = useBlueskyStore((state) => state.agent);
  const session = useBlueskyStore((state) => state.session);
  const isAuthenticated = useBlueskyStore((state) => state.isAuthenticated);

  return useQuery(conversationQueryOptions({ convoId, agent, isAuthenticated, session }));
}
