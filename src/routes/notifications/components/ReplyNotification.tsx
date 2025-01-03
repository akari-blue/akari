import { Avatar } from '@/components/ui/avatar';
import { BSkyReplyNotification } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function ReplyNotification({ notification }: { notification: BSkyReplyNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div>
      <div className="flex flex-row gap-1 overflow-hidden max-h-16">
        <Avatar handle={notification.author.handle} avatar={notification.author.avatar} className="size-8 " />
      </div>
      <div>
        {notification.author.displayName} {t('repliedToYourPost')}
      </div>
    </div>
  );
}
