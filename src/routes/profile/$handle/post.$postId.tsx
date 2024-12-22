import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { usePostThread } from '../../../lib/bluesky/hooks/usePostThread';
import { PostCard } from '../../../components/PostCard';
import { BskyPost } from '../../../lib/bluesky/types';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/profile/$handle/post/$postId')({
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle });
  const params = Route.useParams();
  const { data: postThread, isLoading: isLoadingPost } = usePostThread({
    uri: `at://${params.handle}/app.bsky.feed.post/${params.postId}`,
  });
  const { t } = useTranslation(['app', 'profile']);
  const isLoading = isLoadingProfile || isLoadingPost;

  if (isLoading) return <div className="w-[550px] h-screen overflow-y-scroll">{t('loading')}</div>;

  if (!profile) return <div className="w-[550px] h-screen overflow-y-scroll">{t('profile:notFound')}</div>;

  return (
    <>
      <PostCard post={postThread?.post as BskyPost} />
      <ErrorBoundary>
        {(postThread?.replies as { post: BskyPost }[])?.map((reply) => reply.post && <PostCard post={reply.post} />)}
      </ErrorBoundary>
    </>
  );
}
