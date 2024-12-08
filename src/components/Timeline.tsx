import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Repeat2, Heart } from 'lucide-react';
import { useTimeline } from '../lib/bluesky/hooks/useTimeline';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { formatDate } from '../lib/utils';
import { cn } from '../lib/utils';
import { BlueskyPost } from '../lib/bluesky/types';
import { PostCard } from './PostCard';

export function Timeline() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useTimeline();
  const { ref, inView } = useInView();

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
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <PostCard key={post.uri} post={post} />
          ))}
        </React.Fragment>
      ))}
      
      <div ref={ref} className="h-10">
        {isFetchingNextPage && (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400">
            Loading more posts...
          </div>
        )}
      </div>
    </div>
  );
}