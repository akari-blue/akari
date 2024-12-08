import React from 'react';
import { MessageCircle, Repeat2, Heart } from 'lucide-react';
import { BlueskyPost } from '../lib/bluesky/types';
import { useLike } from '../lib/bluesky/hooks/useLike';
import { formatDate } from '../lib/utils';
import { cn } from '../lib/utils';

interface PostCardProps {
  post: BlueskyPost;
}

export function PostCard({ post }: PostCardProps) {
  const like = useLike();

  const handleLike = (uri: string, cid: string, currentLike?: string) => {
    like.mutate({ uri, cid, like: !currentLike });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
      {post.reply && (
        <div className="mb-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Replying to @{post.reply.parent.author.handle}
          </div>
          <div className="mt-1 text-gray-600 dark:text-gray-300">
            {post.reply.parent.text}
          </div>
        </div>
      )}
      <div className="flex items-center space-x-3 mb-2">
        {post.author.avatar && (
          <img
            src={post.author.avatar}
            alt={post.author.handle}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {post.author.displayName}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            @{post.author.handle} · {formatDate(post.record.createdAt)}
          </div>
        </div>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-3">{post.record.text}</p>
      {post.embed?.images && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.embed.images.map((image, index) => (
            <img
              key={index}
              src={image.thumb}
              alt={image.alt}
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </div>
      )}
      <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
        <button className="flex items-center space-x-2 hover:text-purple-500 transition-colors">
          <MessageCircle size={20} />
          <span>{post.replyCount}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-purple-500 transition-colors">
          <Repeat2 size={20} />
          <span>{post.repostCount}</span>
        </button>
        <button 
          onClick={() => handleLike(post.uri, post.cid, post.viewer?.like)}
          disabled={like.isPending}
          className={cn(
            "flex items-center space-x-2 transition-colors",
            post.viewer?.like ? "text-purple-500" : "hover:text-purple-500"
          )}
        >
          <Heart 
            size={20} 
            className={cn(post.viewer?.like && "fill-current")}
          />
          <span>{post.likeCount}</span>
        </button>
      </div>
    </div>
  );
}