import { Avatar } from '@/components/ui/avatar';
import { Link } from '@/components/ui/Link';
import { BSkyFollowNotification } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function FollowNotification({ notification }: { notification: BSkyFollowNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <Link
      to="/profile/$handle"
      params={{
        handle: notification.author.handle,
      }}
      className="hover:no-underline"
    >
      <div className="p-2">
        <div className="flex flex-row gap-1 overflow-hidden max-h-16">
          <Avatar handle={notification.author.handle} avatar={notification.author.avatar} className="size-8 " />
        </div>
        <div>
          {notification.author.displayName} {t('followedYou')}
        </div>
      </div>
    </Link>
  );
}
