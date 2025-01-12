import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { useAuth } from './use-auth';
import { BSkyMessage, BSkyMessageWithReactions } from '../types/bsky-message';
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

const isEmojiOnly = (text: string): boolean => {
  const emojiRegex = /^[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}]+$/u;
  return emojiRegex.test(text);
};

const processMessageReactions = (messages: BSkyMessage[] | undefined): BSkyMessageWithReactions[] => {
  const processed: BSkyMessageWithReactions[] = [];
  let currentMessageIndex = -1;

  for (const message of messages ?? []) {
    if (isEmojiOnly(message.text)) {
      // Add emoji as reaction to previous message if it exists
      if (currentMessageIndex >= 0) {
        processed[currentMessageIndex]?.reactions.push({
          emoji: message.text,
          sender: message.sender,
        });
      }
    } else {
      // This is a new message
      processed.push({
        ...message,
        reactions: [],
      });
      currentMessageIndex++;
    }
  }

  return processed;
};

export function useConversation({ convoId }: { convoId: string }) {
  const { agent } = useBlueskyStore();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['conversation', { convoId }],
    queryFn: async () => {
      // @ts-expect-error bsky_chat does in fact work
      const proxy = agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');

      const messages = await getMessages(proxy, convoId);
      const messagesWithReactions = processMessageReactions(messages);
      const convo = await getConvo(proxy, convoId);

      return {
        messages: messagesWithReactions,
        convo,
      };
    },
    enabled: !!agent && isAuthenticated,
    // 30s
    staleTime: 30 * 1000,
  });
}
