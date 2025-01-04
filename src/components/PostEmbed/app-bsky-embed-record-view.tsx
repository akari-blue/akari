import { isBlockedAuthor } from '@/lib/bluesky/types/BlockedAuthor';
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

export const AppBskyEmbedRecordView = ({ embed }: { embed: BSkyPostEmbed }) => {
  const { t } = useTranslation('post');
  if (embed.$type !== 'app.bsky.embed.record#view') return null;
  const author = embed.record.$type === 'app.bsky.embed.record#viewRecord' ? embed.record.author : embed.record.creator;
  if (!author) return <Debug value={embed.record} />;
  if (isBlockedAuthor(author)) {
    return (
      <div className={cn('bg-white dark:bg-neutral-900 p-4 rounded-lg shadow')}>
        <div className="text-gray-800 dark:text-gray-200 mb-3">{t('blockedAuthor')}</div>
      </div>
    );
  }

  if (embed.record.$type === 'app.bsky.embed.record#viewRecord' && embed.record.embeds && embed.record.embeds.length >= 1) {
    return <PostEmbed embed={embed.record.embeds?.[0]} />;
  }

  return (
    <div className="p-4 rounded-lg shadow border border-neutral-200 dark:border-neutral-800">
      {embed.record.$type === 'app.bsky.embed.record#viewRecord' && (
        <div className="flex items-center space-x-3 mb-2">
          <Avatar handle={author.handle} avatar={author.avatar} />
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              <Link to="/profile/$handle" params={{ handle: author.handle }}>
                {author.displayName || author.handle}
              </Link>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              <Link to="/profile/$handle" params={{ handle: author.handle }}>
                <Handle handle={author.handle} />
              </Link>
              {' · '}
              <Link
                to="/profile/$handle/post/$postId"
                params={{
                  handle: author.handle,
                  postId: embed.record.uri.split('/').pop()!,
                }}
              >
                <TimeAgo date={embed.record.indexedAt} />
              </Link>
            </div>
          </div>
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
                feed by <Handle handle={embed.record.creator.handle} />
              </div>
            </div>
          </div>
          <div>liked by {embed.record.likeCount} people</div>
        </Link>
      )}
      {embed.record.$type !== 'app.bsky.graph.defs#starterPackViewBasic' &&
        embed.record.$type !== 'app.bsky.feed.defs#generatorView' && (
          <p className="text-gray-800 dark:text-gray-200">
            {embed.record.facets ? (
              <FacetedText text={embed.record.value.text} facets={embed.record.facets} key={embed.record.uri} />
            ) : (
              <FormattedText text={embed.record.value.text} key={embed.record.uri} />
            )}
          </p>
        )}
    </div>
  );
};
