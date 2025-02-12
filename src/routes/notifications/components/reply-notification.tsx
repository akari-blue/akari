import { PostEmbed } from '@/components/post-embed';
import { Avatar } from '@/components/ui/avatar';
import { FormattedText } from '@/components/ui/formatted-text';
import { Handle } from '@/components/ui/handle';
import { Link } from '@/components/ui/link';
import { BSkyReplyNotification } from '@/lib/bluesky/types/bsky-notification';
import { ReplyIcon } from 'lucide-react';

export function ReplyNotification({ notification }: { notification: BSkyReplyNotification }) {
  return (
    <div className="relative">
      <Link
        to="/profile/$handle/post/$postId"
        params={{
          handle: notification.author.handle,
          postId: notification.uri.split('/')[notification.uri.split('/').length - 1]!,
        }}
        className="absolute inset-0"
      />
      <div className="flex flex-row gap-2 p-2 hover:no-underline">
        <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
          <Avatar
            handle={notification.author.handle}
            avatar={notification.author.avatar}
            classNames={{ wrapper: 'stroke-green-400 size-10' }}
          />
        </div>
        <div className="hover:no-underline w-full">
          <div className="px-2">
            <div className="flex flex-col">
              <div>
                {notification.author.displayName} <Handle handle={notification.author.handle} />
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <ReplyIcon /> {'replied to you'}
              </div>
            </div>
            <FormattedText text={notification.record.text} />
            <PostEmbed embed={notification.record.embed} />
          </div>
        </div>
      </div>
    </div>
  );
}
