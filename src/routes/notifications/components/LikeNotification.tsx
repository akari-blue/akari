import { Avatar } from '@/components/ui/avatar';
import { Debug } from '@/components/ui/Debug';
import { Link } from '@/components/ui/Link';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { BSkyLikeNotification, isBSkyLikeNotification } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function LikeNotification({ notifications }: { notifications: BSkyLikeNotification[] }) {
  const { t } = useTranslation('notifications');
  const { session } = useBlueskyStore();
  const notification = notifications[0];
  if (!notification) throw new Error('Notification is missing');
  if (!session) throw new Error('Session is missing');
  const othersCount = notifications.length - 1;

  if (!isBSkyLikeNotification(notification)) throw new Error('Notification is not a like notification');

  return (
    <Link
      to="/profile/$handle/post/$postId"
      params={{
        handle: session.did!,
        postId: notification.record.subject.uri.split('/')[notification.record.subject.uri.split('/').length - 1]!,
      }}
      className="hover:no-underline"
    >
      <div className="p-2">
        <Debug value={notification} />
        <div className="flex flex-row gap-1 overflow-hidden max-h-16">
          {notifications.map((notification) => (
            <Avatar
              key={notification.author.did}
              handle={notification.author.handle}
              avatar={notification.author.avatar}
              className="size-8"
            />
          ))}
        </div>
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
    </Link>
  );
}
