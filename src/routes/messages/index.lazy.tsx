import { createLazyFileRoute } from '@tanstack/react-router';
import { useConversations } from '../../lib/bluesky/hooks/useConversations';
import { Image } from '../../components/ui/Image';
import { cn } from '../../lib/utils';
import { useBlueskyStore } from '../../lib/bluesky/store';
import { Link } from '../../components/ui/Link';
import { Debug } from '../../components/ui/Debug';
import { BSkyConvo } from '../../lib/bluesky/types/BSkyConvo';
import TimeAgo from 'react-timeago-i18n';
import { Handle } from '../../components/ui/Handle';
import { Virtuoso } from 'react-virtuoso';
import { Loading } from '@/components/ui/loading';
import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';

function Conversation({ convo }: { convo: BSkyConvo }) {
  const session = useBlueskyStore((state) => state.session);
  const members = convo.members.filter((member) => member.did !== session?.did);

  return (
    <>
      <Debug value={convo} />

      {members.map((member) => (
        <div className="flex gap-2" key={member.did}>
          <Link to="/profile/$handle" params={{ handle: member.handle ?? member.did }}>
            <Image
              type="avatar"
              src={member.avatar}
              classNames={{
                image: cn(!member.associated?.labeler && 'rounded-full'),
                wrapper: 'size-24 aspect-square',
              }}
            />
          </Link>
          <Link to="/messages/$convoId" params={{ convoId: convo.id }}>
            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <Handle handle={member.handle ?? member.did} />
                {' · '}
                <TimeAgo date={convo.lastMessage.sentAt} />
              </div>
              <div>{convo.lastMessage.text}</div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export const Route = createLazyFileRoute('/messages/')({
  component: Messages,
});

function Messages() {
  const { data: convos, isLoading } = useConversations();

  if (isLoading) return <Loading />;

  return (
    <div className="w-[550px]">
      <Virtuoso
        useWindowScroll
        totalCount={convos?.length ?? 0}
        itemContent={(index: number) => {
          const convo = convos?.[index];
          if (!convo) return null;
          return <Conversation key={convo.id} convo={convo} />;
        }}
        components={{
          List: forwardRef(function List(props: HtmlHTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
            return <div ref={ref} {...props} className="flex flex-col gap-2" />;
          }),
        }}
      />
    </div>
  );
}
