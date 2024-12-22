import { createFileRoute } from '@tanstack/react-router';
import { profileQueryOptions, useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { postThreadQueryOptions, usePostThread } from '../../../lib/bluesky/hooks/usePostThread';
import { PostCard } from '../../../components/PostCard';
import { BskyPost } from '../../../lib/bluesky/types';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const formatUri = (params: { handle: string; postId: string }) =>
  `at://${params.handle}/app.bsky.feed.post/${params.postId}`;

export const Route = createFileRoute('/profile/$handle/post/$postId')({
  component: Profile,
  loader: async ({ params, context }) => {
    const { agent } = context.blueskyStore.getState();
    const [profile, postThread] = await Promise.all([
      context.queryClient.ensureQueryData(profileQueryOptions({ handle: params.handle, agent })),
      context.queryClient.ensureQueryData(postThreadQueryOptions({ uri: formatUri(params), agent })),
    ]);
    return { profile, postThread };
  },
});

function Profile() {
  const params = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle: params.handle });
  const { data: postThread, isLoading: isLoadingPost } = usePostThread({
    uri: formatUri(params),
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
