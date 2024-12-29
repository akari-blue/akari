import { Handle } from '@/components/ui/Handle';
import { Image } from '@/components/ui/Image';
import { Link } from '@/components/ui/Link';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { BSkyNotification, isBSkyNotificationFeedLike } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function LikeNotification({ notifications }: { notifications: BSkyNotification[] }) {
  const { t } = useTranslation('notifications');
  const { session } = useBlueskyStore();
  const notification = notifications[0];
  if (!notification || !session) return null;
  const othersCount = notifications.length - 1;

  if (!isBSkyNotificationFeedLike(notification)) return null;

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
