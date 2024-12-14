import ReactPlayer from 'react-player';
import { BskyPostEmbed } from '../lib/bluesky/types';
import { Image } from './ui/Image';
import { NotImplementedBox } from './ui/NotImplementedBox';
import { cn, formatDate } from '../lib/utils';
import { FacetedText } from './FacetedText';
import { Link } from './ui/Link';

export const PostEmbed = ({ embed }: { embed?: BskyPostEmbed | null }) => {
  if (!embed) return null;

  switch (embed.$type) {
    case 'app.bsky.embed.images#view':
      return (
        <div className={cn(embed.images.length >= 2 && 'grid grid-cols-2', 'gap-2 mb-3')}>
          {embed.images.map((image) => (
            <Image
              key={image.thumb}
              src={image.thumb}
              alt={image.alt}
              className={cn(embed.images.length >= 2 && 'h-48', 'rounded-lg w-full object-cover')}
            />
          ))}
        </div>
      );
    case 'app.bsky.embed.video#view':
      return (
        <div className="mb-3">
          <ReactPlayer url={embed.playlist} controls={true} width="100%" height="100%" />
        </div>
      );
    case 'app.bsky.embed.external#view':
      return (
        <div className="mb-3 bg-neutral-800 rounded p-2">
          <a href={embed.external.uri} target="_blank" rel="noreferrer" className="hover:underline">
            {embed.external.title}
          </a>
          <Image
            src={embed.external.thumb}
            alt={embed.external.title}
            className="rounded-lg w-full aspect-square object-cover"
          />
        </div>
      );
    case 'app.bsky.embed.record#view':
      return (
        <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow')}>
          {/* {!!embed.record.reply && <NotImplementedBox type="reply" data={post.record.reply} />} */}
          <div className="flex items-center space-x-3 mb-2">
            {embed.record.author.avatar && (
              <img src={embed.record.author.avatar} alt={embed.record.author.handle} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                <Link to="/profile/$handle" params={{ handle: embed.record.author.handle }}>
                  {embed.record.author.displayName}
                </Link>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <Link to="/profile/$handle" params={{ handle: embed.record.author.handle }}>
                  @{embed.record.author.handle}
                </Link>
                {' · '}
                <Link
                  to="/profile/$handle/post/$postId"
                  params={{
                    handle: embed.record.author.handle,
                    postId: embed.record.uri.split('/').pop()!,
                  }}
                >
                  {formatDate(embed.record.indexedAt)}
                </Link>
              </div>
            </div>
          </div>
          {embed.record.text && (
            <p className="text-gray-800 dark:text-gray-200 mb-3">
              {<FacetedText text={embed.record.text} facets={embed.record.facets} />}
            </p>
          )}
          {embed.record.embeds && embed.record.embeds.length >= 1 && <PostEmbed embed={embed.record.embeds?.[0]} />}
        </div>
      );
    default:
      return <NotImplementedBox type={embed.$type} data={embed.record} />;
  }
};
