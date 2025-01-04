import { createLazyFileRoute } from '@tanstack/react-router';
import { useConversation } from '../../lib/bluesky/hooks/useConversation';
import { cn } from '../../lib/utils';
import { useBlueskyStore } from '../../lib/bluesky/store';
import { BSkyMessage } from '../../lib/bluesky/types/BSkyMessage';
import { Virtuoso } from 'react-virtuoso';
import { forwardRef, HtmlHTMLAttributes, Ref, useRef, useState } from 'react';
import { Loading } from '@/components/ui/loading';
import TimeAgo from 'react-timeago-i18n';
import { FormattedText } from '@/components/ui/FormattedText';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/components/ui/avatar';
import { Handle } from '@/components/ui/Handle';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { useSendMessage } from '@/lib/bluesky/hooks/useSendMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useHotkeys } from 'react-hotkeys-hook';

function Message({ message }: { message: BSkyMessage }) {
  const session = useBlueskyStore((state) => state.session);
  return (
    <div className={cn('flex flex-col', message.sender.did === session?.did ? 'items-end' : 'items-start')}>
      <div
        className={cn('p-2 w-fit rounded-sm', message.sender.did === session?.did ? 'bg-blue-600' : 'bg-gray-800')}
        key={message.id as string}
      >
        <FormattedText text={message.text} />
      </div>
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

  // @TODO: we should check that the editor is in focus
  useHotkeys(
    ['ctrl+enter'],
    async () => {
      await sendMessage();
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [message],
  );

  const onClick = async () => {
    await sendMessage();
  };

  return (
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
      <div className="flex justify-end p-2">
        <Button variant="outline" onClick={onClick} disabled={isPending}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

function Messages() {
  const { t } = useTranslation('messages');
  const { convoId } = Route.useParams();
  const session = useBlueskyStore((state) => state.session);
  const { data, isLoading, isError, error } = useConversation({ convoId });
  const messages = data?.messages;
  const convo = data?.convo;
  const otherMember = convo?.members.find((member) => member.did !== session?.did);

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
      <div className="flex flex-col h-screen-safe border-x">
        <div className="w-full p-2 bg-black border-b border-b-neutral-700 flex flex-row gap-2">
          <Avatar avatar={otherMember.avatar} handle={otherMember.handle} />
          <Handle handle={otherMember.handle} />
        </div>
        <div className="flex-grow overflow-y-auto p-2 border-b border-neutral-700">
          <Virtuoso
            initialTopMostItemIndex={(messages?.length ?? 0) - 1}
            totalCount={messages?.length ?? 0}
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
                  <div className="flex flex-col gap-2" ref={ref} style={style}>
                    {children}
                  </div>
                );
              }),
            }}
          />
        </div>
        <ReplyBox />
      </div>
    </>
  );
}
