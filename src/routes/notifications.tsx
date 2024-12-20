import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '../lib/bluesky/hooks/useNotifications';
import { Debug } from '../components/ui/Debug';
import { Notification as BskyNotification } from '@atproto/api/dist/client/types/app/bsky/notification/listNotifications';

export const Route = createFileRoute('/notifications')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading) return <div>{t('loading')}</div>;

  return (
    <div>
      {t('notifications:notifications')}
      {notifications?.map((notification) => <Notification key={notification.uri} notification={notification} />)}
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
