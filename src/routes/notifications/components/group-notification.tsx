import {
  BSkyNotification,
  isBSkyFollowNotification,
  isBSkyLikeNotifications,
  isBSkyMentionNotification,
  isBSkyQuoteNotification,
  isBSkyReplyNotification,
  isBSkyRepostNotification,
  isBSkyStarterpackJoinedNotification,
} from '@/lib/bluesky/types/bsky-notification';
import { StarterpackJoinedNotification } from './starterpack-joined-notification';
import { QuoteNotification } from './quote-notification';
import { MentionNotification } from './mention-notification';
import { ReplyNotification } from './reply-notification';
import { RepostNotification } from './repost-notification';
import { LikeNotification } from './like-notification';
import { FollowNotification } from './follow-notification';

export function GroupNotification({ notifications }: { notifications: BSkyNotification[] }) {
  const notification = notifications[0];
  if (!notification) return null;

  switch (true) {
    case isBSkyFollowNotification(notification):
      return <FollowNotification notification={notification} />;
    case isBSkyLikeNotifications(notifications):
      return <LikeNotification notifications={notifications} />;
    case isBSkyRepostNotification(notification):
      return <RepostNotification notification={notification} />;
    case isBSkyReplyNotification(notification):
      return <ReplyNotification notification={notification} />;
    case isBSkyMentionNotification(notification):
      return <MentionNotification notification={notification} />;
    case isBSkyQuoteNotification(notification):
      return <QuoteNotification notification={notification} />;
    case isBSkyStarterpackJoinedNotification(notification):
      return <StarterpackJoinedNotification notification={notification} />;
  }
}
