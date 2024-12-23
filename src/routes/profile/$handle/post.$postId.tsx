import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { usePostThread } from '../../../lib/bluesky/hooks/usePostThread';
import { PostCard } from '../../../components/PostCard';
import { BSkyPost } from '../../../lib/bluesky/types/BSkyPost';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export const Route = createFileRoute('/profile/$handle/post/$postId')({
  component: Post,
});

function Post() {
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
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/profile/${handle}/post/${params.postId}`} />
      </Helmet>
      <PostCard post={postThread?.post as BSkyPost} />
      <ErrorBoundary>
        {(postThread?.replies as { post: BSkyPost }[])?.map((reply) => reply.post && <PostCard post={reply.post} />)}
      </ErrorBoundary>
    </>
  );
}
