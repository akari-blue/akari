import ReactPlayer from 'react-player';
import { BskyPostEmbed } from '../lib/bluesky/types';
import { Image } from './ui/Image';
import { NotImplementedBox } from './ui/NotImplementedBox';
import { cn } from '../lib/utils';

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
    default:
      return <NotImplementedBox type={embed.$type} data={embed.record} />;
  }
};
