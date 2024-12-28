import { createLazyFileRoute } from '@tanstack/react-router';
import { useConversation } from '../../lib/bluesky/hooks/useConversation';
import { cn } from '../../lib/utils';
import { useBlueskyStore } from '../../lib/bluesky/store';
import { BSkyMessage } from '../../lib/bluesky/types/BSkyMessage';
import { Virtuoso } from 'react-virtuoso';
import { forwardRef } from 'react';
import { Loading } from '@/components/ui/loading';

function Message({ message }: { message: BSkyMessage }) {
  const session = useBlueskyStore((state) => state.session);
  return (
    <div className={cn('flex flex-col', message.sender.did === session?.did ? 'items-end' : 'items-start')}>
      <div
        className={cn(message.sender.did === session?.did ? 'bg-blue-600' : 'bg-neutral-800', 'p-2 w-fit rounded-sm')}
        key={message.id as string}
      >
        {message.text}
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute('/messages/$convoId')({
  component: Messages,
});

function Messages() {
  const { convoId } = Route.useParams();

  const { data: messages, isLoading, isError, error } = useConversation({ convoId });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="w-[550px] h-screen flex items-center justify-center">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="w-[550px]">
      <Virtuoso
        initialTopMostItemIndex={(messages?.length ?? 0) - 1}
        components={{
          List: forwardRef(({ children, style }, ref) => (
            <div className="flex flex-col gap-2" ref={ref} style={style}>
              {children}
            </div>
          )),
        }}
        useWindowScroll
        totalCount={messages?.length ?? 0}
        itemContent={(index: number) => {
          const message = messages?.[index];
          if (!message) return null;
          return <Message key={message.id} message={message} />;
        }}
      />
    </div>
  );
}
