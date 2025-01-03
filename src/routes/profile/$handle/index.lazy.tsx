import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '@/lib/bluesky/hooks/useProfile';
import { useAuthorFeed } from '@/lib/bluesky/hooks/useAuthorFeed';
import { PostCard } from '@/components/PostCard';
import { BSkyPost } from '@/lib/bluesky/types/BSkyPost';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/hooks/useSetting';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { FollowButton } from '@/components/ui/FollowButton';
import { FormattedNumber } from '@/components/ui/FormattedNumber';
import { FormattedText } from '@/components/ui/FormattedText';
import { Debug } from '@/components/ui/Debug';
import { forwardRef, HtmlHTMLAttributes, Ref, useState } from 'react';
import { NotImplementedBox } from '@/components/ui/NotImplementedBox';
import { Virtuoso } from 'react-virtuoso';
import { Loading } from '@/components/ui/loading';
import { NotFound } from '@/components/ui/not-found';
import { Helmet } from 'react-helmet';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { Tab } from '@/components/ui/tab';
import { TabList } from '@/components/ui/tab-list';
import { Handle } from '@/components/ui/Handle';
import { Avatar } from '@/components/ui/avatar';
import { Banner } from '@/components/ui/banner';

export const Route = createLazyFileRoute('/profile/$handle/')({
  component: Profile,
});

const List = forwardRef(function List(props: HtmlHTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
  return <div ref={ref} {...props} className="flex flex-col gap-2" />;
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
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
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
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
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
        <PostCard key={filteredPosts[index]?.post.uri} post={filteredPosts[index]?.post as BSkyPost} />
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
    ?.filter(({ post }) => (post.record as BSkyPost['record']).embed?.$type === 'app.bsky.embed.images');

  return (
    <Virtuoso
      useWindowScroll
      totalCount={filteredPosts.length}
      endReached={() => fetchNextPage()}
      components={{
        List,
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
  const { session } = useBlueskyStore();
  const { t } = useTranslation(['app', 'profile']);

  const [selectedTab, setSelectedTab] = useState<string | null>('posts');

  if (isLoading) return <Loading />;

  if (!profile) return <NotFound />;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/profile/${handle}`} />
      </Helmet>
      <div className="flex flex-col gap-2">
        <Banner banner={profile?.banner} />
        <div className="px-4 -mt-12">
          <Avatar avatar={profile?.avatar} handle={profile.handle} className="size-24" />
          <div>
            <div className="flex gap-2">
              <h2 className="text-xl font-bold">{profile?.displayName || profile.handle}</h2>
              <Badge title={profile.viewer?.following && profile.viewer?.followedBy ? 'You both follow each other' : ''}>
                {profile.viewer?.following && profile.viewer?.followedBy && 'Mutuals'}
              </Badge>
              {handle !== session?.handle && <FollowButton handle={handle} following={!!profile.viewer?.following} />}
            </div>
            <Handle handle={profile.handle} />
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
    </>
  );
}
