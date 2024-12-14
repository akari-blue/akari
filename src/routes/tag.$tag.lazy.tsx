import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Button } from '../components/ui/Button';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { PostCard } from '../components/PostCard';
import { useTag } from '../lib/bluesky/hooks/useTag';

export const Route = createLazyFileRoute('/tag/$tag')({
  component: Tag,
});

function Tag() {
  const { logout } = useAuth();
  const { tag } = Route.useParams();
  const { data: posts } = useTag({ tag: tag });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 max-w-2xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold">#{tag}</h1>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <ErrorBoundary>{posts?.map((post) => <PostCard key={post.uri} post={post} />)}</ErrorBoundary>
      </div>
    </div>
  );
}
