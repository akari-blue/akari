import { useMutation } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useSendMessage({ convoId }: { convoId: string }) {
  const agent = useBlueskyStore((store) => store.agent);

  return useMutation({
    mutationKey: ['convo', { convoId }],
    mutationFn: async ({ message }: { message: string }) => {
      // @ts-expect-error bsky_chat does in fact work
      const proxy = agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');
      await proxy.api.chat.bsky.convo.sendMessage({
        convoId,
        message: {
          text: message,
        },
      });
    },
  });
}
