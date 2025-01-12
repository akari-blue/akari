import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet';
import { NotImplementedBox } from '@/components/ui/not-implemented-box';

export const Route = createLazyFileRoute('/profile/$handle/feed/$feed')({
  component: Feed,
});

function Feed() {
  const { handle } = Route.useParams();
  const params = Route.useParams();

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/profile/${handle}/feed/${params.feed}`} />
      </Helmet>
      <div className="p-2">
        <NotImplementedBox type="feed" />
      </div>
    </>
  );
}
