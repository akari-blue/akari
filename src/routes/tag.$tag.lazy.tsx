import { createLazyFileRoute } from '@tanstack/react-router';
import { PostCard } from '../components/PostCard';
import { useTag } from '../lib/bluesky/hooks/useTag';

export const Route = createLazyFileRoute('/tag/$tag')({
  component: Tag,
});

function Tag() {
  const { tag } = Route.useParams();
  const { data: posts } = useTag({ tag: tag });

  return posts?.map((post) => <PostCard key={post.uri} post={post} />);
}
