import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTimeline } from '../lib/bluesky/hooks/useTimeline';
import { PostCard } from './PostCard';
import { cn } from '../lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { useRepost } from '../lib/bluesky/hooks/useRepost';

export function Timeline() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useTimeline();
  const { ref, inView } = useInView();
  const like = useLike();
  const repost = useRepost();
  const posts = data?.pages.map((page) => page.feed.map(({ post }) => post)).flat() ?? [];
  const [selectedPost, setSelectedPost] = useState<string | null>(posts[0]?.uri ?? null);
  const getPost = (uri: string | null) => (uri ? posts.find((post) => post.uri === uri) : null);
  const getNextPost = (uri: string | null) => {
    const index = posts.findIndex((post) => post.uri === uri);
    return posts[index + 1];
  };
  const getPrevPost = (uri: string | null) => {
    const index = posts.findIndex((post) => post.uri === uri);
    return posts[index - 1];
  };

  // like post
  useHotkeys(
    'l',
    () => {
      const post = getPost(selectedPost);
      if (!post) return;

      like.mutate({ uri: post.uri, cid: post.cid, like: !post.viewer.like });
    },
    [selectedPost],
  );

  // repost post
  useHotkeys(
    't',
    () => {
      const post = getPost(selectedPost);
      if (!post) return;

      repost.mutate({ uri: post.uri, cid: post.cid });
    },
    [selectedPost],
  );

  // next post
  useHotkeys(
    'j',
    () => {
      const postUri = getNextPost(selectedPost).uri;
      if (!postUri) return;
      setSelectedPost(postUri);

      // scroll to the post
      const post = document.getElementById(postUri);
      if (post) {
        post.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [selectedPost],
  );

  // previous post
  useHotkeys(
    'k',
    () => {
      const postUri = getPrevPost(selectedPost).uri;
      if (!postUri) return;
      setSelectedPost(postUri);

      // scroll to the post
      const post = document.getElementById(postUri);
      if (post) {
        post.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [selectedPost],
  );

  // page down
  useHotkeys(
    'space',
    () => {
      window.scrollBy(0, window.innerHeight);
    },
    [],
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading timeline...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div>
          <PostCard
            key={post.uri}
            post={post}
            className={cn(selectedPost === post.uri && 'outline outline-red-500')}
            onClick={() => setSelectedPost(post.uri)}
          />
        </div>
      ))}

      <div ref={ref} className="h-10">
        {isFetchingNextPage && (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400">Loading more posts...</div>
        )}
      </div>
    </div>
  );
}
