import { MessageCircle, Heart, Repeat } from 'lucide-react';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { BSkyPost } from '../lib/bluesky/types/BSkyPost';
import { cn } from '../lib/utils';
import { useRepost } from '../lib/bluesky/hooks/useRepost';
import { toast } from 'sonner';
import { FacetedText } from './FacetedText';
import { PostEmbed } from './PostEmbed';
import { Link } from './ui/Link';
import { ErrorBoundary } from './ErrorBoundary';
import { useSettings } from '../hooks/useSetting';
import { FormattedNumber } from './ui/FormattedNumber';
import TimeAgo from 'react-timeago-i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Handle } from './ui/Handle';
import { FormattedText } from './ui/FormattedText';
import { Avatar } from './ui/avatar';
import { useUnlike } from '@/lib/bluesky/hooks/useUnlike';

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

type PostCardProps = {
  post: BSkyPost | undefined | null;
  context?: string;
  className?: string;
  onClick?: () => void;
};

export function PostCard({ post, context, className, onClick }: PostCardProps) {
  const { t } = useTranslation(['app', 'post']);
  const like = useLike();
  const unlike = useUnlike();
  const repost = useRepost();
  const { isAuthenticated } = useAuth();
  const { experiments } = useSettings();

  const handleLike = () => {
    if (!post) return;

    // unlike
    if (post.viewer.like) {
      unlike.mutate({ uri: post.viewer.like });
      return;
    }

    // like
    like.mutate({ uri: post.uri, cid: post.cid });
  };

  const handleRepost = (uri: string, cid: string) => {
    repost.mutate({ uri, cid });
  };

  if (!post) return null;

  return (
    <div className="relative hover:bg-neutral-500 hover:bg-opacity-10">
      <Link
        to="/profile/$handle/post/$postId"
        params={{ handle: post.author.handle, postId: post.uri.split('/').pop()! }}
        className="absolute inset-0"
      />
      <div className="flex flex-col border-b border-gray-200 dark:border-gray-800">
        <div className={cn('p-3 w-full max-w-[550px] gap-2 flex flex-row', className)} onClick={onClick} id={post.uri}>
          <div className="flex-shrink-0">
            <Avatar handle={post.author.handle} avatar={post.author.avatar} />
          </div>
          <div>
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
                  <Handle handle={post.author.handle} />
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
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 dark:text-gray-200">
                {post.record.facets ? (
                  <FacetedText text={post.record.text} facets={post.record.facets} key={`faceted-text-${post.uri}`} />
                ) : (
                  <FormattedText text={post.record.text} key={`formatted-text-${post.uri}`} />
                )}
              </p>
              <ErrorBoundary>{post.embed && <PostEmbed embed={post.embed} />}</ErrorBoundary>
              <div>
                <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                  <Link
                    to="/profile/$handle/post/$postId"
                    params={{ handle: post.author.handle, postId: post.uri.split('/').pop()! }}
                    className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle size={20} />
                    {!experiments.zenMode && <FormattedNumber value={post.replyCount} />}
                    <span className="hidden xl:block">{t('replies')}</span>
                  </Link>
                  {!(experiments.zenMode && !isAuthenticated) && (
                    <>
                      <button
                        onClick={() =>
                          post.viewer?.repost
                            ? toast.error('You already reposted this post', { duration: 2_000 })
                            : handleRepost(post.uri, post.cid)
                        }
                        disabled={repost.isPending || !isAuthenticated}
                        className={cn(
                          'flex items-center space-x-2 transition-colors',
                          post.viewer?.repost ? 'text-green-500' : 'hover:text-green-500',
                        )}
                      >
                        <Repeat size={20} className={cn(post.viewer?.repost ? 'stroke-current' : '')} />
                        {!experiments.zenMode && <FormattedNumber value={post.repostCount} />}
                        <span className="hidden xl:block">{t('reposts')}</span>
                      </button>
                      <button
                        onClick={handleLike}
                        disabled={like.isPending || unlike.isPaused || !isAuthenticated}
                        className={cn(
                          'flex items-center space-x-2 transition-colors',
                          post.viewer?.like ? 'text-pink-500' : 'hover:text-pink-500',
                        )}
                      >
                        <Heart size={20} className={cn(post.viewer?.like ? 'fill-current' : '')} />
                        {!experiments.zenMode && <FormattedNumber value={post.likeCount} />}
                        <span className="hidden xl:block">{t('likes')}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
