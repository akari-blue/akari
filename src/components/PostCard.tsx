import { MessageCircle, Heart, Repeat } from 'lucide-react';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { formatDate } from '../lib/utils';
import { Debug } from './ui/Debug';
import { BskyPost } from '../lib/bluesky/types';
import { cn } from '../lib/utils';
import { useRepost } from '../lib/bluesky/hooks/useRepost';
import { toast } from 'sonner';
import { FacetedText } from './FacetedText';
import { PostEmbed } from './PostEmbed';
import { Link } from './ui/Link';
import { NotImplementedBox } from './ui/NotImplementedBox';
import { ErrorBoundary } from './ErrorBoundary';

type PostCardProps = {
  post: BskyPost | undefined | null;
  className?: string;
  onClick?: () => void;
};

export function PostCard({ post, className, onClick }: PostCardProps) {
  const like = useLike();
  const repost = useRepost();

  const handleLike = (uri: string, cid: string, currentLike?: `at://did:${string}`) => {
    like.mutate({ uri, cid, like: !currentLike });
  };

  const handleRepost = (uri: string, cid: string) => {
    repost.mutate({ uri, cid });
  };

  if (!post) {
    return <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow', className)}>No post found</div>;
  }

  return (
    <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow', className)} onClick={onClick} id={post.uri}>
      {!!post.record.reply && <NotImplementedBox type="reply" data={post.record.reply} />}
      <div className="flex items-center space-x-3 mb-2">
        {post.author.avatar && <img src={post.author.avatar} alt={post.author.handle} className="w-10 h-10 rounded-full" />}
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            <Link to="/profile/$handle" params={{ handle: post.author.handle }}>
              {post.author.displayName}
            </Link>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            <Link to="/profile/$handle" params={{ handle: post.author.handle }}>
              @{post.author.handle}
            </Link>
            {' · '}
            <Link
              to="/profile/$handle/post/$postId"
              params={{
                handle: post.author.handle,
                postId: post.uri.split('/').pop()!,
              }}
            >
              {formatDate(post.record.createdAt)}
            </Link>
          </div>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-3">
        {<FacetedText text={post.record.text} facets={post.record.facets} />}
      </p>
      <ErrorBoundary>
        <PostEmbed embed={post.embed} />
      </ErrorBoundary>
      <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
          <MessageCircle size={20} />
          <span>{post.replyCount}</span>
        </button>
        <button
          onClick={() =>
            post.viewer.repost
              ? toast.error('You already reposted this post', { duration: 2_000 })
              : handleRepost(post.uri, post.cid)
          }
          disabled={repost.isPending}
          className={cn(
            'flex items-center space-x-2 transition-colors',
            post.viewer?.repost ? 'text-green-500' : 'hover:text-green-500',
          )}
        >
          <Repeat size={20} className={cn(post.viewer.repost ? 'stroke-current' : '')} />
          <span>{post.repostCount}</span>
        </button>
        <button
          onClick={() => handleLike(post.uri, post.cid, post.viewer?.like)}
          disabled={like.isPending}
          className={cn(
            'flex items-center space-x-2 transition-colors',
            post.viewer?.like ? 'text-pink-500' : 'hover:text-pink-500',
          )}
        >
          <Heart size={20} className={cn(post.viewer?.like ? 'fill-current' : '')} />
          <span>{post.likeCount}</span>
        </button>
      </div>
      <Debug value={post} />
    </div>
  );
}
