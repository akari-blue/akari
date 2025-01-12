import { BSkyNotification } from '@/lib/bluesky/types/bsky-notification';
import { StarterpackJoinedNotification } from './starterpack-joined-notification';
import { QuoteNotification } from './quote-notification';
import { MentionNotification } from './mention-notification';
import { ReplyNotification } from './reply-notification';
import { RepostNotification } from './repost-notification';
import { LikeNotification } from './like-notification';
import { FollowNotification } from './follow-notification';

export function Notification({ notification }: { notification: BSkyNotification }) {
  switch (notification.reason) {
    case 'follow':
      return <FollowNotification notification={notification} />;
    case 'like':
      return <LikeNotification notifications={[notification]} />;
    case 'repost':
      return <RepostNotification notification={notification} />;
    case 'reply':
      return <ReplyNotification notification={notification} />;
    case 'mention':
      return <MentionNotification notification={notification} />;
    case 'quote':
      return <QuoteNotification notification={notification} />;
    case 'starterpack-joined':
      return <StarterpackJoinedNotification notification={notification} />;
  }
}
