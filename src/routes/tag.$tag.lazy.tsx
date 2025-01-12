import { createLazyFileRoute } from '@tanstack/react-router';
import { PostCard } from '../components/post-card';
import { useTag } from '../lib/bluesky/hooks/use-tag';
import { Helmet } from 'react-helmet';

export const Route = createLazyFileRoute('/tag/$tag')({
  component: Tag,
});

function Tag() {
  const { tag } = Route.useParams();
  const { data: posts } = useTag({ tag: tag });

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/hashtag/${tag}`} />
      </Helmet>
      {posts?.map((post) => <PostCard key={post.uri} post={post} />)}
    </>
  );
}
