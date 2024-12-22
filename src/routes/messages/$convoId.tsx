import { createFileRoute } from '@tanstack/react-router';
import { useConversation, conversationQueryOptions } from '../../lib/bluesky/hooks/useConversation';
import { useTranslation } from 'react-i18next';
import { Handle } from '../../components/ui/Handle';
import { Debug } from '../../components/ui/Debug';
import TimeAgo from 'react-timeago-i18n';

export const Route = createFileRoute('/messages/$convoId')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { agent, isAuthenticated, session } = context.blueskyStore.getState();
    return context.queryClient.ensureQueryData(
      conversationQueryOptions({ convoId: params.convoId, agent, isAuthenticated, session }),
    );
  },
});

function RouteComponent() {
  const { t } = useTranslation('app');
  const { convoId } = Route.useParams();
  const { data: messages, isLoading } = useConversation({ convoId });

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {messages?.map((message) => (
        <div key={message.id as string}>
          <Handle handle={(message.sender as { did: string }).did} />: {message.text as string} -{' '}
          <TimeAgo date={message.sentAt as string} />
          <Debug value={message} />
        </div>
      ))}
    </div>
  );
}
