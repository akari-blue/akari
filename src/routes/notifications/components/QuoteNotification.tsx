import { Avatar } from '@/components/ui/avatar';
import { BSkyQuoteNotification } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function QuoteNotification({ notification }: { notification: BSkyQuoteNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div className="p-2">
      <div className="flex flex-row gap-1 overflow-hidden max-h-16">
        <Avatar handle={notification.author.handle} avatar={notification.author.avatar} className="size-8 " />
      </div>
      <div>
        {notification.author.displayName} {t('quotedYourPost')}
      </div>
    </div>
  );
}
