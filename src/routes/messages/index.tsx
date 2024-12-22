import { createFileRoute } from '@tanstack/react-router';
import { useConversations, conversationsQueryOptions } from '../../lib/bluesky/hooks/useConversations';
import { useTranslation } from 'react-i18next';
import { Image } from '../../components/ui/Image';
import { cn } from '../../lib/utils';
import { useBlueskyStore } from '../../lib/bluesky/store';
import { Link } from '../../components/ui/Link';

export const Route = createFileRoute('/messages/')({
  component: Messages,
  loader: async ({ context }) => {
    const { agent, isAuthenticated, session } = context.blueskyStore.getState();
    return context.queryClient.ensureQueryData(conversationsQueryOptions({ agent, isAuthenticated, session }));
  },
});

function Messages() {
  const { session } = useBlueskyStore();
  const { data, isLoading } = useConversations();
  const { t } = useTranslation('app');

  if (isLoading) return <div className="w-[550px] h-screen overflow-y-scroll">{t('loading')}</div>;

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-screen">
      {data?.map((convo) => (
        <Link key={convo.id} to="/messages/$convoId" params={{ convoId: convo.id }}>
          {convo.members
            .filter((member) => member.did !== session?.did)
            .map((member) => (
              <div className="flex gap-2" key={member.did}>
                <Image
                  type="avatar"
                  src={member.avatar}
                  className={cn('size-24', member.associated?.labeler ? 'aspect-square' : 'rounded-full')}
                />
                <div>{convo.lastMessage?.text as string}</div>
              </div>
            ))}
        </Link>
      ))}
    </div>
  );
}
