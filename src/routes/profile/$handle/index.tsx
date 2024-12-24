import * as Ariakit from '@ariakit/react';
import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from '../../../lib/bluesky/hooks/useProfile';
import { useAuthorFeed } from '../../../lib/bluesky/hooks/useAuthorFeed';
import { PostCard } from '../../../components/PostCard';
import { BSkyPost } from '../../../lib/bluesky/types/BSkyPost';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../hooks/useSetting';
import { Image } from '../../../components/ui/Image';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../lib/utils';
import { FollowButton } from '../../../components/ui/FollowButton';
import { FormattedNumber } from '../../../components/ui/FormattedNumber';
import { FormattedText } from '../../../components/ui/FormattedText';
import { Debug } from '../../../components/ui/Debug';
import { forwardRef, useState } from 'react';
import { NotImplementedBox } from '../../../components/ui/NotImplementedBox';
import { Virtuoso } from 'react-virtuoso';

export const Route = createFileRoute('/profile/$handle/')({
  component: Profile,
});

function All() {
  const { t } = useTranslation('app');
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return t('loading');
  if (!feed) return null;

  return (
    <Virtuoso
      useWindowScroll
      totalCount={feed.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
      }}
      itemContent={(index: number) => <PostCard key={feed[index]?.post.uri} post={feed[index]?.post as BSkyPost} />}
    />
  );
}

function Posts() {
  const { t } = useTranslation('app');
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return t('loading');
  if (!feed) return null;

  const filteredPosts = feed
    // Filter out replies
    ?.filter(({ post }) => !(post.record as BSkyPost['record']).reply)
    // Filter out reposts of other users
    ?.filter(({ post }) => post.author.handle === handle);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
      }}
      itemContent={(index: number) => (
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
      )}
    />
  );
}

function Reposts() {
  const { t } = useTranslation('app');
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return t('loading');
  if (!feed) return null;

  const filteredPosts = feed
    // Filter only reposts
    ?.filter(({ post }) => post.author.handle !== handle);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
      }}
      itemContent={(index: number) => (
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
      )}
    />
  );
}

function Replies() {
  const { t } = useTranslation('app');
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return t('loading');
  if (!feed) return null;

  const filteredPosts = feed
    // Filter to only replies
    ?.filter(({ post }) => (post.record as BSkyPost['record']).reply);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
      }}
      itemContent={(index: number) => (
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
      )}
    />
  );
}

function Media() {
  const { t } = useTranslation('app');
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return t('loading');
  if (!feed) return null;

  const filteredPosts = feed
    // Filter to only media
    ?.filter(({ post }) => (post.record as BSkyPost['record']).embed?.$type === 'app.bsky.embed.images');

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef((props, ref) => <div ref={ref} {...props} className="flex flex-col gap-2" />),
      }}
      itemContent={(index: number) => (
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
      )}
    />
  );
}

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading } = useProfile({ handle });
  const { experiments } = useSettings();
  const { t } = useTranslation(['app', 'profile']);

  const [selectedTab, setSelectedTab] = useState<string | null>('posts');

  if (isLoading) return <div className="w-[550px] h-screen overflow-y-scroll">{t('loading')}</div>;

  if (!profile) return <div className="w-[550px] h-screen overflow-y-scroll">{t('profile:notFound')}</div>;

  return (
    <div className="w-[550px] flex flex-col gap-2">
      <Image type="banner" src={profile?.banner} alt="Banner" classNames={{ image: 'w-full h-32 object-cover' }} />
      <div>
        <Image
          type="avatar"
          src={profile?.avatar}
          alt="Avatar"
          classNames={{
            image: cn('w-24 h-24', profile.associated?.labeler ? 'aspect-square' : 'rounded-full'),
          }}
        />
        <div>
          <div className="flex gap-2">
            <h2 className="text-xl font-bold">{profile?.displayName || profile.handle}</h2>
            <Badge title={profile.viewer?.following && profile.viewer?.followedBy ? 'You both follow each other' : ''}>
              {profile.viewer?.following && profile.viewer?.followedBy && 'Mutuals'}
            </Badge>
            {<FollowButton handle={handle} following={!!profile.viewer?.following} />}
          </div>
          {!experiments.zenMode && (
            <div className="flex gap-2">
              <FormattedNumber value={profile?.followersCount} unit={t('followers')} />
              <FormattedNumber value={profile?.followsCount} unit={t('following')} />
              <FormattedNumber value={profile?.postsCount} unit={t('posts')} />
            </div>
          )}
          <p>
            <FormattedText text={profile?.description ?? ''} linkify key="profile-description" />
          </p>
          <Debug value={profile} />
        </div>
      </div>
      <Ariakit.TabProvider
        defaultSelectedId={selectedTab}
        setSelectedId={(selectedId) => {
          if (!selectedId) return;
          setSelectedTab(selectedId);
        }}
      >
        <div>
          <Ariakit.TabList className="flex flex-row gap-4 max-w-full overflow-x-scroll bg-neutral-900" aria-label="tabs">
            <Ariakit.Tab
              id="all"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'all' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.all')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="posts"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'posts' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.posts')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="reposts"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'reposts' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.reposts')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="replies"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'replies' && 'bg-neutral-700',
              )}
            >
              {t('replies')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="media"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'media' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.media')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="likes"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'likes' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.likes')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="feeds"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'feeds' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.feeds')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="starter-packs"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'starter-packs' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.starterpacks')}
            </Ariakit.Tab>
            <Ariakit.Tab
              id="lists"
              className={cn(
                'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                selectedTab === 'lists' && 'bg-neutral-700',
              )}
            >
              {t('profile:tabs.lists')}
            </Ariakit.Tab>
          </Ariakit.TabList>
        </div>
        <Ariakit.TabPanel tabId="all">
          <All />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="posts">
          <Posts />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="reposts">
          <Reposts />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="replies">
          <Replies />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="media">
          <Media />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="likes">
          <NotImplementedBox type="likes" />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="feeds">
          <NotImplementedBox type="feeds" />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="starter-packs">
          <NotImplementedBox type="starter-packs" />
        </Ariakit.TabPanel>
        <Ariakit.TabPanel tabId="lists">
          <NotImplementedBox type="lists" />
        </Ariakit.TabPanel>
      </Ariakit.TabProvider>
    </div>
  );
}
