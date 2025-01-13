import { createLazyFileRoute } from '@tanstack/react-router';
import { useConversation } from '@/lib/bluesky/hooks/use-conversation';
import { cn } from '@/lib/utils';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { BSkyMessageWithReactions } from '@/lib/bluesky/types/bsky-message';
import { Virtuoso } from 'react-virtuoso';
import { forwardRef, HtmlHTMLAttributes, Ref, useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/ui/loading';
import TimeAgo from 'react-timeago-i18n';
import { FormattedText } from '@/components/ui/formatted-text';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/ui/avatar';
import { Handle } from '@/components/ui/handle';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { useSendMessage } from '@/lib/bluesky/hooks/use-send-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StickyHeader } from '@/components/sticky-header';
import { FacetedText } from '@/components/faceted-text';
import { Badge } from '@/components/ui/badge';
import { useProfileLabels } from '@/lib/bluesky/hooks/use-profile-labels';

function Message({ message }: { message: BSkyMessageWithReactions }) {
  const session = useBlueskyStore((state) => state.session);
  return (
    <div className={cn('flex flex-col', message.sender.did === session?.did ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'p-2 w-fit rounded-sm text-white overflow-anchor-none max-w-[85%]',
          message.sender.did === session?.did
            ? 'bg-blue-500 dark:bg-blue-600'
            : 'text-black dark:text-white bg-gray-300 dark:bg-gray-800',
        )}
        key={message.id as string}
      >
        {message.facets ? (
          <div className="[&>*]:!text-white [&>a]:underline">
            <FacetedText text={message.text} facets={message.facets} />
          </div>
        ) : (
          <FormattedText text={message.text} />
        )}
      </div>
      {message.reactions.length >= 1 && <div>{message.reactions.map((reaction) => reaction.emoji).join(' ')}</div>}
      <div className="dark:text-gray-500 text-xs">
        <TimeAgo date={message.sentAt} roundStrategy="floor" />
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute('/messages/$convoId')({
  component: Messages,
});

type TiptapMethods = {
  clearContent: () => void;
};

function ReplyBox() {
  const queryClient = useQueryClient();
  const { convoId } = Route.useParams();
  const { mutateAsync, isPending } = useSendMessage({ convoId });
  const [message, setMessage] = useState<string>('');
  const ref = useRef<TiptapMethods | null>(null);

  const sendMessage = async () => {
    if (isPending) return;
    if (!message.trim()) return;
    await mutateAsync(
      { message: message.trim().replace(/\n{3,}/g, '\n\n') },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ['conversation', { convoId }],
          });
          ref.current?.clearContent();
          setMessage('');
        },
      },
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendMessage();
      }}
    >
      <div className="flex flex-row mb-14 md:mb-0">
        <MinimalTiptapEditor
          ref={ref}
          value={message}
          onChange={(value) => setMessage(value as string)}
          output="text"
          classNames={{
            wrapper: 'min-h-16 border-none',
            // for now let's hide the toolbar
            // @TODO: enable this once we workout rich text DMs
            toolbar: 'border-none hidden',
          }}
          placeholder="write a message"
        />
        <div className="flex justify-end p-2 items-end">
          <Button variant="outline" disabled={isPending} type="submit">
            <SendIcon />
          </Button>
        </div>
      </div>
    </form>
  );
}

const useMarkAsRead = ({ convoId }: { convoId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['conversation', { convoId }],
    mutationFn: async () => {
      const proxy = useBlueskyStore.getState().agent.withProxy('bsky_chat', 'did:web:api.bsky.chat');
      await proxy.chat.bsky.convo.updateRead({ convoId });

      // invalidate conversations query to update unread count
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });
};

function Messages() {
  const { t } = useTranslation('messages');
  const { convoId } = Route.useParams();
  const session = useBlueskyStore((state) => state.session);
  const { data, isLoading, isError, error } = useConversation({ convoId });
  const messages = data?.messages;
  const convo = data?.convo;
  const otherMember = convo?.members.find((member) => member.did !== session?.did);
  const hasUnread = (convo?.unreadCount ?? 0) > 0;
  const { mutate: markAsRead } = useMarkAsRead({ convoId });
  const agent = useBlueskyStore((state) => state.agent);
  const { moderation } = useProfileLabels({ agent, did: otherMember?.did, handle: otherMember?.handle });
  const profileLabels = moderation?.ui('profileList').informs.filter((label) => label.type === 'label');

  // mark as read on load if there are unread messages
  useEffect(() => {
    if (hasUnread) markAsRead();
  }, [hasUnread, markAsRead]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span>{error.message}</span>
      </div>
    );
  }

  if (messages?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span>{t('noMessages')}</span>
      </div>
    );
  }

  if (!otherMember) throw new Error('No other member found in conversation');

  return (
    <>
      <Helmet>
        <title>{t('chat')}</title>
      </Helmet>
      <div className="flex flex-col h-screen pb-safe divide-y">
        <StickyHeader>
          <Avatar avatar={otherMember.avatar} handle={otherMember.handle} />
          <div>
            <div className="font-bold">{otherMember.displayName}</div>
            <Handle handle={otherMember.handle} />
            <div className="flex gap-1 py-1">
              {profileLabels?.map((label) => (
                <Badge title={label.labelDef.locales[0]!.description} key={label.label.uri}>
                  {label.labelDef.locales[0]!.name}
                </Badge>
              ))}
            </div>
          </div>
        </StickyHeader>
        <div className="flex-grow overflow-y-auto px-2">
          <Virtuoso
            initialTopMostItemIndex={(messages?.length ?? 0) - 1}
            totalCount={messages?.length ?? 0}
            className="scrollbar-gutter-stable overflow-auto"
            itemContent={(index: number) => {
              const message = messages?.[index];
              if (!message) return null;
              return <Message key={message.id} message={message} />;
            }}
            components={{
              List: forwardRef(function List(
                { children, style }: HtmlHTMLAttributes<HTMLDivElement>,
                ref: Ref<HTMLDivElement>,
              ) {
                return (
                  <div className="flex flex-col gap-2 mr-4" ref={ref} style={style}>
                    {children}
                  </div>
                );
              }),
              Footer: () => <div className="overflow-anchor-auto h-[1px]" />,
            }}
          />
        </div>
        <ReplyBox />
        <div className="pb-safe-offset-8 md:pb-0 border-none" />
      </div>
    </>
  );
}
