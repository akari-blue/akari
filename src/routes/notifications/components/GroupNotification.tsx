import {
  BSkyNotification,
  isBSkyFollowNotification,
  isBSkyLikeNotifications,
  isBSkyMentionNotification,
  isBSkyQuoteNotification,
  isBSkyReplyNotification,
  isBSkyRepostNotification,
  isBSkyStarterpackJoinedNotification,
} from '@/lib/bluesky/types/BSkyNotification';
import { StarterpackJoinedNotification } from './StarterpackJoinedNotification';
import { QuoteNotification } from './QuoteNotification';
import { MentionNotification } from './MentionNotification';
import { ReplyNotification } from './ReplyNotification';
import { RepostNotification } from './RepostNotification';
import { LikeNotification } from './LikeNotification';
import { FollowNotification } from './FollowNotification';

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
