import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../lib/bluesky/hooks/useNotifications';
import { Debug } from '../components/ui/Debug';
import { forwardRef, useState } from 'react';
import { cn } from '../lib/utils';
import { BSkyNotification } from '../lib/bluesky/types/BSkyNotification';
import { Link } from '../components/ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { Image } from '../components/ui/Image';
import { Handle } from '../components/ui/Handle';
import { Virtuoso } from 'react-virtuoso';
import { Button } from '../components/ui/Button';

export const Route = createLazyFileRoute('/notifications')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data, isLoading } = useNotifications();
  const notifications = data?.pages.flatMap((page) => page.notifications);
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
            id="grouped"
            className={cn(
              'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
              selectedTab === 'grouped' && 'bg-neutral-700',
            )}
          >
            {t('notifications:tabs.grouped')}
          </Ariakit.Tab>
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
          <Ariakit.TabPanel tabId="grouped">{notifications && <GroupedNotifications />}</Ariakit.TabPanel>
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

// group notifications by uri
function GroupedNotifications() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data, isLoading, fetchNextPage, isFetching } = useNotifications();
  const notifications = data?.pages.flatMap((page) => page.notifications);
  if (!notifications) return null;
  const grouped = notifications.reduce(
    (acc, notification) => {
      if (notification.reason === 'like') {
        if (acc[notification.record.subject.uri]) {
          acc[notification.record.subject.uri]?.push(notification);
        } else {
          acc[notification.record.subject.uri] = [notification];
        }
      }
      return acc;
    },
    {} as Record<string, BSkyNotification[]>,
  );

  if (isLoading) return <div>{t('loading')}</div>;

  const list = Object.values(grouped);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={list.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
        Footer: () => {
          return isFetching ? (
            <div className="p-2 text-center">{t('loading')}</div>
          ) : (
            <div className="p-2 text-center">
              <Button
                onClick={() => {
                  fetchNextPage();
                }}
              >
                load more
              </Button>
            </div>
          );
        },
      }}
      itemContent={(index: number) => {
        if (!list[index]) return null;
        return (
          <div key={list[index][0]?.uri} className="p-2 bg-neutral-800 rounded-lg mb-2">
            <div className="text-sm text-neutral-400">{t('groupedNotifications')}</div>
            <GroupNotification key={list[index][0]?.uri} notifications={list[index]} />
          </div>
        );
      }}
    />
  );
}

function GroupNotification({ notifications }: { notifications: BSkyNotification[] }) {
  const notification = notifications[0];
  if (!notification) return null;

  switch (notification?.reason) {
    case 'follow':
      return <FollowNotification notification={notification} />;
    case 'like':
      return <LikeNotification notifications={notifications} />;
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
}

function Notification({ notification }: { notification: BSkyNotification }) {
  switch (notification.reason) {
    case 'follow':
      return <FollowNotification notification={notification} />;
    case 'like':
      return <LikeNotification notifications={[notification]} />;
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

function FollowNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('followedYou')}
    </div>
  );
}

function LikeNotification({ notifications }: { notifications: BSkyNotification[] }) {
  const { t } = useTranslation('notifications');
  const { session } = useBlueskyStore();
  const notification = notifications[0];
  if (!notification || !session) return null;
  const othersCount = notifications.length - 1;

  return (
    <div>
      <div className="flex flex-row gap-1 overflow-hidden max-h-16">
        {notifications.map((notification) => (
          <Image type="avatar" classNames={{ wrapper: 'aspect-square size-8' }} src={notification.author.avatar} />
        ))}
      </div>
      <div>
        <Handle handle={notification.author.handle} />
        {notifications.map((notification) => notification.author.displayName).slice(-1)}
        {notifications.length - 1 >= 1 &&
          `${t('and')} ${othersCount} ${othersCount >= 1 && (othersCount === 1 ? t('other') : t('others'))} `}{' '}
        <Link
          to="/profile/$handle/post/$postId"
          params={{
            handle: session.did!,
            postId: notification.record.subject.uri.split('/')[notification.record.subject.uri.split('/').length - 1]!,
          }}
        >
          {t('likedYourPost')}
        </Link>
      </div>
    </div>
  );
}

function RepostNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('repostedYourPost')}
    </div>
  );
}

function ReplyNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('repliedToYourPost')}
    </div>
  );
}

function MentionNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('mentionedYou')}
    </div>
  );
}

function QuoteNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('quotedYourPost')}
    </div>
  );
}

function StarterpackJoinedNotification({ notification }: { notification: BSkyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      {notification.author.displayName} {t('joinedYourStarterpack')}
    </div>
  );
}
