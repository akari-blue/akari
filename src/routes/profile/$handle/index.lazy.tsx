import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '@/lib/bluesky/hooks/use-profile';
import { useAuthorFeed } from '@/lib/bluesky/hooks/use-author-feed';
import { PostCard } from '@/components/post-card';
import { BSkyPost } from '@/lib/bluesky/types/bsky-post';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/hooks/use-setting';
import { Badge } from '@/components/ui/badge';
import { FollowButton } from '@/components/ui/follow-button';
import { FormattedNumber } from '@/components/ui/formatted-number';
import { FormattedText } from '@/components/ui/formatted-text';
import { forwardRef, HtmlHTMLAttributes, Ref, useState } from 'react';
import { NotImplementedBox } from '@/components/ui/not-implemented-box';
import { Virtuoso } from 'react-virtuoso';
import { Loading } from '@/components/ui/loading';
import { NotFound } from '@/components/ui/not-found';
import { Helmet } from 'react-helmet';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { Tab } from '@/components/ui/tab';
import { TabList } from '@/components/ui/tab-list';
import { Handle } from '@/components/ui/handle';
import { Avatar } from '@/components/ui/avatar';
import { Banner } from '@/components/ui/banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { StickyHeader } from '@/components/sticky-header';
import { cn } from '@/lib/utils';

export const Route = createLazyFileRoute('/profile/$handle/')({
  component: Profile,
});

const List = forwardRef(function List(props: HtmlHTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
  return <div ref={ref} {...props} className="flex flex-col divide-y" />;
});

function All() {
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return <Loading />;
  if (!feed) return null;

  return (
    <Virtuoso
      useWindowScroll
      totalCount={feed.length}
      endReached={() => fetchNextPage()}
      components={{
        List,
      }}
      itemContent={(index: number) => <PostCard key={feed[index]?.post.uri} post={feed[index]?.post as BSkyPost} />}
    />
  );
}

function Posts() {
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return <Loading />;
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
        List,
      }}
      itemContent={(index: number) => (
        <ErrorBoundary>
          <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
        </ErrorBoundary>
      )}
    />
  );
}

function Reposts() {
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return <Loading />;
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
        List,
      }}
      itemContent={(index: number) => (
        <ErrorBoundary>
          <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
        </ErrorBoundary>
      )}
    />
  );
}

function Replies() {
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return <Loading />;
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
        List,
      }}
      itemContent={(index: number) => (
        <ErrorBoundary>
          <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
        </ErrorBoundary>
      )}
    />
  );
}

function Media() {
  const { handle } = Route.useParams();
  const { data, isLoading, fetchNextPage } = useAuthorFeed({ handle });
  const feed = data?.pages.flatMap((page) => page.feed);

  if (isLoading) return <Loading />;
  if (!feed) return null;

  const filteredPosts = feed
    // Filter to only media
    // TODO: fix this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.filter(({ post }) => (post.record as any).embed?.$type === 'app.bsky.embed.images');

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List,
      }}
      itemContent={(index: number) => (
        <ErrorBoundary>
          <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
        </ErrorBoundary>
      )}
    />
  );
}

function Profile() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading } = useProfile({ handle });
  const { experiments } = useSettings();
  const { session } = useBlueskyStore();
  const { t } = useTranslation(['app', 'profile']);
  const [selectedTab, setSelectedTab] = useState<string | null>('posts');
  const blocked = profile?.viewer?.blockingByList;

  if (isLoading) return <Loading />;

  if (!profile) return <NotFound />;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/profile/${handle}`} />
        <title>
          {profile.displayName ?? profile.handle} (@{handle})
        </title>
      </Helmet>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Banner banner={profile?.banner} classNames={{ image: cn(blocked && 'blur-xl') }} />
          <div className="px-4 -mt-12">
            <Avatar
              avatar={profile?.avatar}
              handle={profile.handle}
              classNames={{ wrapper: 'size-24 border-2', image: blocked && 'blur' }}
              hover={false}
            />
            <div>
              <div className="flex gap-2">
                <h2 className="text-xl font-bold">{profile?.displayName || profile.handle}</h2>
                <Badge title={profile.viewer?.following && profile.viewer?.followedBy ? 'You both follow each other' : ''}>
                  {profile.viewer?.following && profile.viewer?.followedBy && 'Mutuals'}
                </Badge>
                {handle !== session?.handle && !blocked && (
                  <FollowButton handle={handle} following={!!profile.viewer?.following} />
                )}
              </div>
              <Handle handle={profile.handle} />
              {!experiments.zenMode && !blocked && (
                <div className="flex gap-2">
                  <FormattedNumber value={profile?.followersCount} unit={t('followers')} />
                  <FormattedNumber value={profile?.followsCount} unit={t('following')} />
                  <FormattedNumber value={profile?.postsCount} unit={t('posts')} />
                </div>
              )}
              {!blocked && <FormattedText text={profile?.description ?? ''} linkify key="profile-description" />}

              {blocked && (
                <div className="p-2 border mt-2">
                  <span>{t('profile:blockedBy', { name: blocked.name })}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {!blocked && (
          <Ariakit.TabProvider
            defaultSelectedId={selectedTab}
            setSelectedId={(selectedId) => {
              if (!selectedId) return;
              setSelectedTab(selectedId);
            }}
          >
            <StickyHeader backButton={false} className="border-none p-0">
              <TabList label="Profile tabs">
                {[
                  {
                    name: t('profile:tabs.all'),
                    id: 'all',
                  },
                  { name: t('profile:tabs.posts'), id: 'posts' },
                  { name: t('profile:tabs.reposts'), id: 'reposts' },
                  { name: t('replies'), id: 'replies' },
                  { name: t('profile:tabs.media'), id: 'media' },
                  { name: t('profile:tabs.likes'), id: 'likes' },
                  { name: t('profile:tabs.feeds'), id: 'feeds' },
                  { name: t('profile:tabs.starterpacks'), id: 'starter-packs' },
                  { name: t('profile:tabs.lists'), id: 'lists' },
                ].map(({ name, id }) => (
                  <Tab name={name} id={id} selectedTab={selectedTab} key={id} />
                ))}
              </TabList>
            </StickyHeader>
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
        )}
      </div>
    </>
  );
}
