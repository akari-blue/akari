import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { useAuthorFeed } from '../../../lib/bluesky/hooks/useAuthorFeed';
import { PostCard } from '../../../components/PostCard';
import { BskyPost } from '../../../lib/bluesky/types';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/profile/$handle/')({
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading } = useProfile({ handle });
  const { data: feed } = useAuthorFeed({ handle });
  const { t } = useTranslation(['app', 'profile']);

  if (isLoading) return <div>{t('loading')}</div>;

  if (!profile) return <div>{t('profile:notFound')}</div>;

  return (
    feed
      // Filter out replies
      ?.filter(({ post }) => !(post.record as BskyPost['record']).reply)
      // Filter out reposts of other users
      ?.filter(({ post }) => post.author.handle === handle)
      ?.map(({ post }) => <PostCard key={post.uri} post={post as BskyPost} />)
  );
}
