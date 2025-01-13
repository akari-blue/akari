import { Avatar } from '@/components/ui/avatar';
import { Link } from '@/components/ui/link';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { BSkyRepostNotification } from '@/lib/bluesky/types/bsky-notification';
import { Repeat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function RepostNotification({ notification }: { notification: BSkyRepostNotification }) {
  const session = useBlueskyStore((state) => state.session);
  const { t } = useTranslation('notifications');
  return (
    <div className="relative">
      <Link
        to="/profile/$handle/post/$postId"
        params={{
          handle: session!.did!,
          postId: notification.record.subject.uri.split('/')[notification.record.subject.uri.split('/').length - 1]!,
        }}
        className="absolute inset-0"
      />
      <div className="flex flex-row gap-2 p-2 hover:no-underline">
        <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
          <Repeat className="stroke-green-400 size-6" />
        </div>
        <div className="hover:no-underline w-full">
          <div className="px-2">
            <div className="flex flex-row gap-1 max-h-16">
              <Avatar
                handle={notification.author.handle}
                avatar={notification.author.avatar}
                classNames={{ wrapper: 'size-8' }}
              />
            </div>
            <div>
              {notification.author.displayName} {t('repostedYourPost')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
