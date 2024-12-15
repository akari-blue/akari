import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '../lib/bluesky/hooks/useProfile';
import { Image } from '../components/ui/Image';
import { Debug } from '../components/ui/Debug';
import { useAuthorFeed } from '../lib/bluesky/hooks/useAuthorFeed';
import { PostCard } from '../components/PostCard';
import { BskyPost } from '../lib/bluesky/types';

export const Route = createLazyFileRoute('/profile/$handle')({
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading } = useProfile({ handle });
  const { data: feed } = useAuthorFeed({ handle });

  if (isLoading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found</div>;

  return (
    <>
      <Image type="banner" src={profile?.banner} alt="Banner" className="w-full h-32 object-cover" />
      <div>
        <Image type="avatar" src={profile?.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{profile?.displayName}</h2>
          <p>{profile?.description}</p>
          <Debug value={profile} />
        </div>
      </div>
      {feed?.map(({ post }) => <PostCard key={post.uri} post={post as BskyPost} />)}
    </>
  );
}
