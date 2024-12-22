import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type ConversationsQueryOptions = Pick<BlueskyState, 'agent' | 'session' | 'isAuthenticated'>;

export const conversationsQueryOptions = ({ agent, isAuthenticated, session }: ConversationsQueryOptions) =>
  queryOptions({
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

export function useConversations() {
  const agent = useBlueskyStore((state) => state.agent);
  const session = useBlueskyStore((state) => state.session);
  const isAuthenticated = useBlueskyStore((state) => state.isAuthenticated);

  return useQuery(conversationsQueryOptions({ agent, isAuthenticated, session }));
}
