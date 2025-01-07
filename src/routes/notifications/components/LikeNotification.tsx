import { Avatar } from '@/components/ui/avatar';
import { Debug } from '@/components/ui/Debug';
import { FormattedText } from '@/components/ui/FormattedText';
import { Link } from '@/components/ui/Link';
import { Loading } from '@/components/ui/loading';
import { usePost } from '@/lib/bluesky/hooks/usePost';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { BSkyLikeNotification, isBSkyLikeNotification } from '@/lib/bluesky/types/BSkyNotification';
import { HeartIcon } from 'lucide-react';
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
    <div className="relative">
      <Link
        to="/profile/$handle/post/$postId"
        params={{
          handle: session.did!,
          postId: notification.record.subject.uri.split('/')[notification.record.subject.uri.split('/').length - 1]!,
        }}
        className="absolute inset-0"
      />
      <div className="flex flex-row gap-2 p-2 hover:no-underline">
        <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
          <HeartIcon className="fill-pink-500 stroke-pink-500 size-6" />
        </div>
        <div className="hover:no-underline w-full">
          <div className="px-2">
            <div className="flex flex-row gap-1 max-h-16">
              {notifications.map((notification) => (
                <Avatar
                  key={notification.author.did}
                  handle={notification.author.handle}
                  avatar={notification.author.avatar}
                  className="size-8"
                />
              ))}
            </div>
            <div>
              {notifications.map((notification) => notification.author.displayName).slice(-1)}
              {notifications.length - 1 >= 1 &&
                `${'and'} ${othersCount} ${othersCount >= 1 && (othersCount === 1 ? 'other' : 'others')} `}{' '}
              {t('likedYourPost')}
            </div>
            <div className="text-sm text-gray-500">
              <LikePost notification={notification} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LikePost({ notification }: { notification: BSkyLikeNotification }) {
  const session = useBlueskyStore((state) => state.session);
  const rkey = notification.record.subject.uri.split('/')[notification.record.subject.uri.split('/').length - 1] as string;
  const { data: post, isLoading } = usePost({ handle: session!.did, rkey });

  if (isLoading) <Loading />;
  if (!post) return null;

  return <FormattedText text={post.text} />;
}
