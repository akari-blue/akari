import { Avatar } from '@/components/ui/avatar';
import { Link } from '@/components/ui/Link';
import { BSkyFollowNotification } from '@/lib/bluesky/types/BSkyNotification';
import { UserPlus2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FollowNotification({ notification }: { notification: BSkyFollowNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div className="relative">
      <Link
        to="/profile/$handle"
        params={{
          handle: notification.author.handle,
        }}
        className="absolute inset-0 p-"
      />
      <div className="flex flex-row gap-2 p-2 hover:no-underline">
        <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
          <UserPlus2 className="stroke-blue-400 size-6" />
        </div>
        <div className="hover:no-underline w-full">
          <div className="px-2">
            <div className="flex flex-row gap-1 max-h-16">
              <Avatar handle={notification.author.handle} avatar={notification.author.avatar} className="size-8" />
            </div>
            <div>
              {notification.author.displayName} {t('followedYou')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
