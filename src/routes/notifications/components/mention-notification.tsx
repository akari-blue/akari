import { PostEmbed } from '@/components/post-embed';
import { Avatar } from '@/components/ui/avatar';
import { FormattedText } from '@/components/ui/formatted-text';
import { Handle } from '@/components/ui/handle';
import { BSkyMentionNotification } from '@/lib/bluesky/types/bsky-notification';

export function MentionNotification({ notification }: { notification: BSkyMentionNotification }) {
  return (
    <div className="flex flex-row gap-2 p-2">
      <div className="flex flex-shrink-0 w-12 justify-end aspect-square">
        <Avatar handle={notification.author.handle} avatar={notification.author.avatar} classNames={{ wrapper: 'size-8' }} />
      </div>
      <div className="flex-grow">
        <div>
          {notification.author.displayName} <Handle handle={notification.author.handle} />
        </div>
        <FormattedText text={notification.record.text} />
        <PostEmbed embed={notification.record.embed} />
      </div>
    </div>
  );
}
