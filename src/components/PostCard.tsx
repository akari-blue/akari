import { MessageCircle, Heart, Repeat } from 'lucide-react';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { Debug } from './ui/Debug';
import { BskyPost } from '../lib/bluesky/types';
import { cn } from '../lib/utils';
import { useRepost } from '../lib/bluesky/hooks/useRepost';
import { toast } from 'sonner';
import { FacetedText } from './FacetedText';
import { PostEmbed } from './PostEmbed';
import { Link } from './ui/Link';
import { ErrorBoundary } from './ErrorBoundary';
import { Image } from './ui/Image';
// import { usePostThread } from '../lib/bluesky/hooks/usePostThread';
import { useSettings } from '../hooks/useSetting';
import { FormattedNumber } from './ui/FormattedNumber';
import TimeAgo from 'react-timeago-i18n';

type PostCardProps = {
  post: BskyPost | undefined | null;
  context?: string;
  className?: string;
  onClick?: () => void;
};

const contextToText = (context: string) => {
  if (context === 'following') return 'following';
  if (context === 'friends') return 'friends';
  if (context === 'popfriends') return 'popular friends';
  if (context.startsWith('t-')) return `trending in ${context.slice(2)}`;

  return context;
};

const BetterContext = ({ context }: { context?: string }) => {
  if (!context) return null;

  return (
    <span title="Reason the post was included in the feed" className="text-gray-500 dark:text-gray-400">
      {` · `}
      {contextToText(context)}
    </span>
  );
};

export function PostCard({ post, context, className, onClick }: PostCardProps) {
  const like = useLike();
  const repost = useRepost();
  // const { data: reply } = usePostThread({ uri: post?.record.reply?.parent.uri });
  const { experiments } = useSettings();

  const handleLike = (uri: string, cid: string, currentLike?: string) => {
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
      {/* {!!post.record.reply && <PostCard post={reply} />} */}
      <div className="flex items-center space-x-3 mb-2">
        {post.author.avatar && (
          <Image type="avatar" src={post.author.avatar} alt={post.author.handle} className="w-10 h-10 rounded-full" />
        )}
        <div>
          <div>
            <Link
              to="/profile/$handle"
              params={{ handle: post.author.handle }}
              className="font-medium text-gray-900 dark:text-gray-100"
            >
              {post.author.displayName || post.author.handle}
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
              <TimeAgo date={post.record.createdAt} />
            </Link>
            {!experiments.zenMode && <BetterContext context={context} />}
          </div>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-3">
        <FacetedText text={post.record.text} facets={post.record.facets} />
      </p>
      <ErrorBoundary>
        <PostEmbed embed={post.embed} />
      </ErrorBoundary>
      <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
          <MessageCircle size={20} />
          {!experiments.zenMode && (
            <Link
              to="/profile/$handle/post/$postId"
              params={{ handle: post.author.handle, postId: post.uri.split('/').pop()! }}
            >
              <FormattedNumber value={post.replyCount} unit="replies" />
            </Link>
          )}
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
          {!experiments.zenMode && <FormattedNumber value={post.repostCount} unit="reposts" />}
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
          {!experiments.zenMode && <FormattedNumber value={post.likeCount} unit="likes" />}
        </button>
      </div>
      <Debug value={{ post, context }} />
    </div>
  );
}
