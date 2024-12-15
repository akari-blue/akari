import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '../lib/bluesky/hooks/useProfile';
import { Image } from '../components/ui/Image';
import { Debug } from '../components/ui/Debug';
import { usePost } from '../lib/bluesky/hooks/usePost';
import { PostCard } from '../components/PostCard';

export const Route = createLazyFileRoute('/profile_/$handle/post/$postId')({
  component: Profile,
});

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle });
  const params = Route.useParams();
  const { data: post, isLoading: isLoadingPost } = usePost({
    uri: `at://${params.handle}/app.bsky.feed.post/${params.postId}`,
  });
  const isLoading = isLoadingProfile || isLoadingPost;

  if (isLoading) return <div>Loading...</div>;

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
      <PostCard post={post} />
    </>
  );
}
