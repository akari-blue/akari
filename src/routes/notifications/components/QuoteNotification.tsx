import { Avatar } from '@/components/ui/avatar';
import { Link } from '@/components/ui/Link';
import { BSkyQuoteNotification } from '@/lib/bluesky/types/BSkyNotification';
import { useTranslation } from 'react-i18next';

export function QuoteNotification({ notification }: { notification: BSkyQuoteNotification }) {
  const { t } = useTranslation('notifications');
  return (
    <div className="relative">
      <Link
        to="/profile/$handle/post/$postId"
        params={{
          handle: notification.uri.split('//')[1]!.split('/')[0]!,
          postId: notification.uri.split('/').pop()!,
        }}
        className="absolute inset-0"
      />
      <div className="flex flex-row gap-2 p-2 hover:no-underline">
        <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
          <Avatar handle={notification.author.handle} avatar={notification.author.avatar} />
        </div>
        <div>
          <div className="flex flex-row gap-1 overflow-hidden max-h-16">
            <Avatar handle={notification.author.handle} avatar={notification.author.avatar} className="size-8" />
          </div>
          <div>
            {notification.author.displayName} {t('quotedYourPost')}
          </div>
        </div>
      </div>
    </div>
  );
}
