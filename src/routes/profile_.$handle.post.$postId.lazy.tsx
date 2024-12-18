import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '../lib/bluesky/hooks/useProfile';
import { Image } from '../components/ui/Image';
import { Debug } from '../components/ui/Debug';
import { usePostThread } from '../lib/bluesky/hooks/usePostThread';
import { PostCard } from '../components/PostCard';
import { cn } from '../lib/utils';
import { useSettings } from '../hooks/useSetting';
import { Badge } from '../components/ui/Badge';
import { FollowButton } from '../components/ui/FollowButton';
import { FormattedNumber } from '../components/ui/FormattedNumber';
import { FormattedText } from '../components/ui/FormattedText';
import { BskyPost } from '../lib/bluesky/types';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/profile_/$handle/post/$postId')({
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle });
  const params = Route.useParams();
  const { data: postThread, isLoading: isLoadingPost } = usePostThread({
    uri: `at://${params.handle}/app.bsky.feed.post/${params.postId}`,
  });
  const { experiments } = useSettings();
  const { t } = useTranslation(['app', 'profile']);
  const isLoading = isLoadingProfile || isLoadingPost;

  if (isLoading) return <div>{t('loading')}</div>;

  if (!profile) return <div>{t('profile:notFound')}</div>;

  return (
    <>
      <Image type="banner" src={profile?.banner} alt="Banner" className="w-full h-32 object-cover" />
      <div>
        <Image
          type="avatar"
          src={profile?.avatar}
          alt="Avatar"
          className={cn('w-24 h-24', profile.associated?.labeler ? 'aspect-square' : 'rounded-full')}
        />
        <div>
          <div className="flex gap-2">
            <h2 className="text-xl font-bold">{profile?.displayName || profile.handle}</h2>
            <Badge title={profile.viewer?.following && profile.viewer?.followedBy ? 'You both follow each other' : ''}>
              {profile.viewer?.following && profile.viewer?.followedBy && 'Mutuals'}
            </Badge>
            {<FollowButton handle={handle} following={!!profile.viewer?.following} />}
          </div>
          {!experiments.zenMode && (
            <div className="flex gap-2">
              <FormattedNumber value={profile?.followersCount} unit={t('followers')} />
              <FormattedNumber value={profile?.followsCount} unit={t('following')} />
              <FormattedNumber value={profile?.postsCount} unit={t('posts')} />
            </div>
          )}
          <p>
            <FormattedText text={profile?.description ?? ''} linkify key="profile-description" />
          </p>
          <Debug value={profile} />
        </div>
      </div>
      <PostCard post={postThread?.post as BskyPost} />
      <ErrorBoundary>
        {(postThread?.replies as { post: BskyPost }[])?.map((reply) => reply.post && <PostCard post={reply.post} />)}
      </ErrorBoundary>
    </>
  );
}
