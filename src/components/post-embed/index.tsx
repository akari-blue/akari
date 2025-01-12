import ReactPlayer from 'react-player/lazy';
import { BSkyPostEmbed } from '../../lib/bluesky/types/bsky-post-embed';
import { Image } from '../ui/image';
import { NotImplementedBox } from '../ui/not-implemented-box';
import { cn } from '../../lib/utils';
import { useSettings } from '../../hooks/use-setting';
import { AppBskyEmbedRecordView } from './app-bsky-embed-record-view';
import { Globe2 } from 'lucide-react';
import { Link } from '../ui/link';

export const PostEmbed = ({ embed }: { embed?: BSkyPostEmbed | null }) => {
  const { experiments } = useSettings();
  if (!embed) return null;

  switch (embed.$type) {
    case 'app.bsky.embed.images#view': {
      return (
        <div className={cn(embed.images.length >= 2 && 'grid grid-cols-2', 'gap-2')}>
          {embed.images.map((image) => (
            <Image
              key={image.thumb}
              src={image.thumb}
              height={image.aspectRatio?.height}
              width={image.aspectRatio?.width}
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

      const isKnownGifSite = embed.external.uri.includes('tenor.com') || embed.external.uri.includes('gify.com');

      return (
        <>
          <div className="rounded-lg border overflow-hidden hover:no-underline hover:border-neutral-600 group">
            {isKnownGifSite ? (
              embed.external.thumb && (
                <Image
                  src={embed.external.uri.includes('.gif') ? embed.external.uri : embed.external.thumb}
                  alt={embed.external.title}
                  classNames={{
                    image: 'w-full object-cover border-b group-hover:border-neutral-600 aspect-video',
                  }}
                  clickable={false}
                  // pause the gif on click
                  onClick={(e) => {
                    e.currentTarget.src =
                      e.currentTarget.src === embed.external.uri ? embed.external.thumb : embed.external.uri;
                  }}
                />
              )
            ) : (
              <Link href={embed.external.uri} target="_blank">
                {embed.external.thumb && (
                  <Image
                    src={embed.external.uri.includes('.gif') ? embed.external.uri : embed.external.thumb}
                    alt={embed.external.title}
                    classNames={{
                      image: 'w-full object-cover border-b group-hover:border-neutral-600 aspect-video',
                    }}
                    clickable={false}
                  />
                )}
              </Link>
            )}
          </div>
          {!isKnownGifSite && (
            <Link
              className="rounded-lg border overflow-hidden hover:no-underline hover:border-neutral-600 group"
              href={embed.external.uri}
              target="_blank"
            >
              <div className="p-2 text-sm flex flex-col gap-2">
                {embed.external.title && <h2 className="font-bold">{embed.external.title}</h2>}
                <div>{embed.external.description && <p className="text-xs">{embed.external.description}</p>}</div>
                <div className="border-t text-xs text-gray-500 flex flex-row gap-2 items-center pt-2">
                  <Globe2 className="size-3" />
                  {new URL(embed.external.uri).hostname}
                </div>
              </div>
            </Link>
          )}
        </>
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
