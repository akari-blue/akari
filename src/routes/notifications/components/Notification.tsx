import { BSkyNotification } from '@/lib/bluesky/types/BSkyNotification';
import { StarterpackJoinedNotification } from './StarterpackJoinedNotification';
import { QuoteNotification } from './QuoteNotification';
import { MentionNotification } from './MentionNotification';
import { ReplyNotification } from './ReplyNotification';
import { RepostNotification } from './RepostNotification';
import { LikeNotification } from './LikeNotification';
import { FollowNotification } from './FollowNotification';

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
