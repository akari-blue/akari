import ReactPlayer from 'react-player/lazy';
import { BSkyPostEmbed } from '../../lib/bluesky/types/BSkyPostEmbed';
import { Image } from '../ui/Image';
import { NotImplementedBox } from '../ui/NotImplementedBox';
import { cn } from '../../lib/utils';
import { useSettings } from '../../hooks/useSetting';
import { AppBskyEmbedRecordView } from './app-bsky-embed-record-view';
import { Link } from '../ui/Link';

export const PostEmbed = ({ embed }: { embed?: BSkyPostEmbed | null }) => {
  const { experiments } = useSettings();
  if (!embed) return null;

  switch (embed.$type) {
    case 'app.bsky.embed.images#view': {
      return (
        <div className={cn(embed.images.length >= 2 && 'grid grid-cols-2', 'gap-2')}>
          {embed.images.map((image) => (
            <Image
              type="post"
              key={image.thumb}
              src={image.thumb}
              alt={image.alt}
              classNames={{
                image: cn(embed.images.length >= 2 && 'h-48', 'rounded-lg w-full object-cover'),
              }}
            />
          ))}
        </div>
      );
    }
    case 'app.bsky.embed.video#view':
      return (
        <div className={cn('mb-3 w-full aspect-square', experiments.streamerMode && 'filter blur-md')}>
          <ReactPlayer
            url={embed.playlist}
            controls={true}
            width="100%"
            height="100%"
            muted={true}
            light={embed.thumbnail}
            config={{
              file: {
                attributes: {
                  preload: 'none',
                },
              },
            }}
          />
        </div>
      );
    case 'app.bsky.embed.external#view': {
      if (!embed.external.thumb) return null;
      if (embed.external.uri.startsWith('https://youtu.be/') || embed.external.uri.startsWith('https://youtube.com/')) {
        return (
          <div className="w-full aspect-video">
            <ReactPlayer
              url={embed.external.uri}
              controls={true}
              width="100%"
              height="100%"
              muted={true}
              light={embed.external.thumb}
              config={{
                file: {
                  attributes: {
                    preload: 'none',
                  },
                },
              }}
            />
          </div>
        );
      }
      return (
        <Link href={embed.external.uri} target="_blank" rel="noreferrer">
          <div className="rounded-lg">
            {embed.external.thumb && (
              <Image
                type="post"
                src={embed.external.uri.includes('.gif') ? embed.external.uri : embed.external.thumb}
                alt={embed.external.title}
                classNames={{
                  image: 'rounded-lg w-full object-cover aspect-video',
                }}
              />
            )}
          </div>
        </Link>
      );
    }
    case 'app.bsky.embed.record#view': {
      return <AppBskyEmbedRecordView embed={embed} />;
    }
    case 'app.bsky.embed.recordWithMedia#view': {
      const images =
        embed.media.$type === 'app.bsky.embed.images#view'
          ? embed.media.images
          : embed.media.external?.thumb
            ? [
                {
                  thumb: embed.media.external?.uri ?? embed.media.external?.thumb,
                  alt: embed.media.external?.description,
                },
              ]
            : [];

      if (images.length === 0) break;

      return (
        <div className={cn(images.length >= 2 && 'grid grid-cols-2', 'gap-2 mb-3')}>
          {images.map((image) => (
            <Image
              type="post"
              key={image.thumb}
              src={image.thumb}
              alt={image.alt}
              classNames={{
                image: cn(images.length >= 2 && 'h-48', 'rounded-lg w-full object-cover'),
              }}
            />
          ))}
        </div>
      );
    }
  }

  // @ts-expect-error this is a catch-all for any embeds that are not implemented
  return <NotImplementedBox type={embed.$type} data={embed.record} />;
};
