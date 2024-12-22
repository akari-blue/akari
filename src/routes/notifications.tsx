import * as Ariakit from '@ariakit/react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { notificationsQueryOptions, useNotifications } from '../lib/bluesky/hooks/useNotifications';
import { Debug } from '../components/ui/Debug';
import { Notification as BskyNotification } from '@atproto/api/dist/client/types/app/bsky/notification/listNotifications';
import { useState } from 'react';
import { cn } from '../lib/utils';

export const Route = createFileRoute('/notifications')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { agent } = context.blueskyStore.getState();
    return context.queryClient.ensureQueryData(notificationsQueryOptions({ agent }));
  },
});

function RouteComponent() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data: notifications, isLoading } = useNotifications();
  const mentions = notifications?.filter(
    (notification) =>
      notification.reason === 'mention' || notification.reason === 'reply' || notification.reason === 'quote',
  );
  const [selectedTab, setSelectedTab] = useState<string | undefined>();

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <Ariakit.TabProvider
        defaultSelectedId={selectedTab}
        setSelectedId={(selectedId) => {
          if (!selectedId) return;
          setSelectedTab(selectedId);
        }}
      >
        <Ariakit.TabList className="grid grid-cols-2 gap-4 max-w-full overflow-x-scroll bg-neutral-900 p-2 m-2 mb-0 rounded-md">
          <Ariakit.Tab
            id="all"
            className={cn(
              'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
              selectedTab === 'all' && 'bg-neutral-700',
            )}
          >
            {t('notifications:tabs.all')}
          </Ariakit.Tab>
          <Ariakit.Tab
            id="mentions"
            className={cn(
              'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
              selectedTab === 'mentions' && 'bg-neutral-700',
            )}
          >
            {t('notifications:tabs.mentions')}
          </Ariakit.Tab>
        </Ariakit.TabList>
        <div className="p-2">
          <Ariakit.TabPanel tabId="all">
            {notifications?.map((notification) => <Notification key={notification.uri} notification={notification} />)}
          </Ariakit.TabPanel>
          <Ariakit.TabPanel tabId="mentions">
            {mentions?.map((notification) => <Notification key={notification.uri} notification={notification} />)}
          </Ariakit.TabPanel>
        </div>
      </Ariakit.TabProvider>
    </div>
  );
}

function Notification({ notification }: { notification: BskyNotification }) {
  switch (notification.reason) {
    case 'follow':
      return <FollowNotification notification={notification} />;
    case 'like':
      return <LikeNotification notification={notification} />;
    case 'repost':
      return <RepostNotification notification={notification} />;
    case 'reply':
      return <ReplyNotification notification={notification} />;
    case 'mention':
      return <MentionNotification notification={notification} />;
    case 'quote':
      return <QuoteNotification notification={notification} />;
    case 'starterpack-joined':
      return <StarterpackJoinedNotification notification={notification} />;
  }

  return (
    <div>
      {notification.author.displayName}
      <Debug value={notification} />
    </div>
  );
}

function FollowNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('followedYou')}
    </div>
  );
}

function LikeNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('likedYourPost')}
    </div>
  );
}

function RepostNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('repostedYourPost')}
    </div>
  );
}

function ReplyNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('repliedToYourPost')}
    </div>
  );
}

function MentionNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('mentionedYou')}
    </div>
  );
}

function QuoteNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('quotedYourPost')}
    </div>
  );
}

function StarterpackJoinedNotification({ notification }: { notification: BskyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('joinedYourStarterpack')}
    </div>
  );
}
