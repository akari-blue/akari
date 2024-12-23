import { createFileRoute } from '@tanstack/react-router';
import { useConversation } from '../../lib/bluesky/hooks/useConversation';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { useBlueskyStore } from '../../lib/bluesky/store';

export const Route = createFileRoute('/messages/$convoId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation('app');
  const { convoId } = Route.useParams();
  const session = useBlueskyStore((state) => state.session);
  const { data: messages, isLoading } = useConversation({ convoId });

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {messages?.map((message) => (
        <div className={cn('flex flex-col', message.sender.did === session?.did ? 'items-end' : 'items-start')}>
          <div className="bg-neutral-800 p-2 w-fit" key={message.id as string}>
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
