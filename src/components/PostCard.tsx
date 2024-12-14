import { MessageCircle, Heart, Repeat } from 'lucide-react';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { formatDate } from '../lib/utils';
import { Debug } from './ui/Debug';
import { BskyPost } from '../lib/bluesky/types';
import { cn } from '../lib/utils';
import { Image } from './ui/Image';
import { useRepost } from '../lib/bluesky/hooks/useRepost';
import { toast } from 'sonner';
import { FacetedText } from './FacetedText';

const postUriToLink = (uri: string) => {
  const [did, , rKey] = uri.split('//')[1].split('/');
  return `https://bsky.app/profile/${did}/post/${rKey}`;
};

type PostCardProps = {
  post: BskyPost;
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

  return (
    <div className={cn('bg-white dark:bg-gray-900 p-4 rounded-lg shadow', className)} onClick={onClick} id={post.uri}>
      {!!post.record.reply && <pre>{JSON.stringify(post.record.reply, null, 2)}</pre>}
      {/* {post.reply && (
        <div className="mb-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Replying to @{post.reply.parent.author.handle}
          </div>
          <div className="mt-1 text-gray-600 dark:text-gray-300">
            {post.reply.parent.text}
          </div>
        </div>
      )} */}
      <div className="flex items-center space-x-3 mb-2">
        {post.author.avatar && <img src={post.author.avatar} alt={post.author.handle} className="w-10 h-10 rounded-full" />}
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{post.author.displayName}</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            @{post.author.handle} ·{' '}
            <a href={postUriToLink(post.uri)} target="_blank" rel="noreferrer" className="hover:underline">
              {formatDate(post.record.createdAt)}
            </a>
          </div>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-3">
        {<FacetedText text={post.record.text} facets={post.record.facets} />}
      </p>
      {post.embed?.$type === 'app.bsky.embed.images#view' && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.embed.images.map((image) => (
            <Image key={image.thumb} src={image.thumb} alt={image.alt} className="rounded-lg w-full h-48 object-cover" />
          ))}
        </div>
      )}
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
