import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Debug } from '../../../components/ui/Debug';
import { FollowButton } from '../../../components/ui/FollowButton';
import { FormattedNumber } from '../../../components/ui/FormattedNumber';
import { FormattedText } from '../../../components/ui/FormattedText';
import { useSettings } from '../../../hooks/useSetting';
import { useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { cn } from '../../../lib/utils';
import { Image } from '../../../components/ui/Image';
import { Badge } from '../../../components/ui/Badge';

export const Route = createFileRoute('/profile/$handle')({
  component: ProfileLayout,
});

function ProfileLayout() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle });
  const { experiments } = useSettings();
  const { t } = useTranslation(['app', 'profile']);
  const isLoading = isLoadingProfile;

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
      <Outlet />
    </>
  );
}
