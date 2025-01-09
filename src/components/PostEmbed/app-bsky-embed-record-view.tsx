import { useLocation, useNavigate } from '@tanstack/react-router';
import { BSkyPostEmbed } from '@/lib/bluesky/types/BSkyPostEmbed';
import { cn } from '@/lib/utils';
import TimeAgo from 'react-timeago-i18n';
import { PostEmbed } from '.';
import { FacetedText } from '../FacetedText';
import { Debug } from '@/components/ui/Debug';
import { Handle } from '@/components/ui/Handle';
import { NotImplementedBox } from '@/components/ui/NotImplementedBox';
import { Link } from '@/components/ui/Link';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/avatar';
import { FormattedText } from '../ui/FormattedText';
import { SatelliteDish } from 'lucide-react';

export const AppBskyEmbedRecordView = ({ embed }: { embed: BSkyPostEmbed }) => {
  const { t } = useTranslation('post');
  const navigate = useNavigate();
  const location = useLocation();
  if (embed.$type !== 'app.bsky.embed.record#view') return null;
  const author =
    embed.record.$type === 'app.bsky.embed.record#viewRecord' || embed.record.$type === 'app.bsky.embed.record#viewBlocked'
      ? embed.record.author
      : embed.record.creator;
  if (!author) return <Debug value={embed.record} />;
  if (author.viewer?.blockedBy) {
    return (
      <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow')}>
        <div className="text-gray-800 dark:text-gray-200 mb-3">{t('blockedByAuthor')}</div>
      </div>
    );
  }
  if (author.viewer?.blocking) {
    return (
      <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow')}>
        <div className="text-gray-800 dark:text-gray-200 mb-3">{t('blockedAuthor')}</div>
      </div>
    );
  }

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const cellText = document.getSelection();
    if (cellText?.type === 'Range') return;
    if (embed.record.$type !== 'app.bsky.embed.record#viewRecord') return;

    const handle = embed.record.author.handle;
    const postId = embed.record.uri.split('/').pop()!;
    if (location.pathname === `/profile/${handle}/post/${postId}`) return;
    console.info('Navigating from %s to %s', location.pathname, `/profile/${handle}/post/${postId}`);
    navigate({
      to: '/profile/$handle/post/$postId',
      params: { handle, postId },
    });
  };

  return (
    <div className="p-4 rounded-lg shadow border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 z-10">
      {embed.record.$type === 'app.bsky.embed.record#viewRecord' && (
        <div onClick={onClick}>
          <div className="flex items-center space-x-3 mb-2">
            <Avatar handle={author.handle} avatar={author.avatar} />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                <Link to="/profile/$handle" params={{ handle: author.handle }}>
                  {author.displayName || author.handle}
                </Link>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <Link to="/profile/$handle" params={{ handle: author.handle }} className="hover:no-underline">
                  <Handle handle={author.handle} />
                </Link>
                {' · '}
                <Link
                  to="/profile/$handle/post/$postId"
                  params={{
                    handle: author.handle,
                    postId: embed.record.uri.split('/').pop()!,
                  }}
                  className="hover:no-underline"
                >
                  <TimeAgo date={embed.record.indexedAt} />
                </Link>
              </div>
            </div>
          </div>
          <p className="text-gray-800 dark:text-gray-200">
            {embed.record.facets ? (
              <FacetedText text={embed.record.value.text} facets={embed.record.facets} key={embed.record.uri} />
            ) : (
              <FormattedText text={embed.record.value.text} key={embed.record.uri} />
            )}
          </p>
          <PostEmbed embed={embed.record.embeds?.[0]} />
        </div>
      )}
      {embed.record.$type === 'app.bsky.graph.defs#starterPackViewBasic' && (
        <div className="text-gray-800 dark:text-gray-200">
          <NotImplementedBox type={embed.record.$type} data={embed.record} />
        </div>
      )}
      {embed.record.$type === 'app.bsky.feed.defs#generatorView' && (
        <Link to="/profile/$handle/feed/$feed" params={{ handle: embed.record.creator.handle, feed: embed.record.cid }}>
          <div className="flex flex-row gap-2">
            <Avatar avatar={embed.record.avatar} handle={embed.record.displayName} />
            <div className="flex flex-col">
              <div>{embed.record.displayName}</div>
              <div>
                {'feed by '}
                <Handle handle={embed.record.creator.handle} />
              </div>
            </div>
          </div>
          <div>
            {'liked by '}
            {embed.record.likeCount}
            {' people'}
          </div>
        </Link>
      )}
      {embed.record.$type === 'app.bsky.graph.defs#listView' && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3">
            {embed.record.avatar ? (
              <Avatar avatar={embed.record.avatar} handle={author.handle} list={true} />
            ) : (
              <div className="bg-blue-500 p-2 aspect-square rounded-sm items-center justify-center">
                <SatelliteDish className="size-7" />
              </div>
            )}
            <div className="flex flex-col">
              <div>{embed.record.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {embed.record.purpose === 'app.bsky.graph.defs#modlist' && 'mod'}
                {'list by'} <Handle handle={author.handle} />
              </div>
            </div>
          </div>
          <div className="text-sm">
            <FormattedText text={embed.record.description} />
          </div>
        </div>
      )}
    </div>
  );
};
