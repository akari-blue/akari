import { createLazyFileRoute } from '@tanstack/react-router';
import { useProfile } from '@/lib/bluesky/hooks/useProfile';
import { usePostThread } from '@/lib/bluesky/hooks/usePostThread';
import { PostCard } from '@/components/PostCard';
import { BSkyPost } from '@/lib/bluesky/types/BSkyPost';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Loading } from '@/components/ui/loading';
import { Virtuoso } from 'react-virtuoso';
import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';

export const Route = createLazyFileRoute('/profile/$handle/post/$postId')({
  component: Post,
});

const List = forwardRef(function List(props: HtmlHTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
  return <div ref={ref} {...props} className="flex flex-col gap-2" />;
});

function Post() {
  const { handle } = Route.useParams();
  const { data: profile, isLoading: isLoadingProfile } = useProfile({ handle });
  const params = Route.useParams();
  const { data: postThread, isLoading: isLoadingPost } = usePostThread({
    uri: `at://${params.handle}/app.bsky.feed.post/${params.postId}`,
  });
  const { t } = useTranslation(['app', 'profile']);
  const isLoading = isLoadingProfile || isLoadingPost;
  const replies = (postThread?.replies as { post: BSkyPost }[]) ?? [];

  if (isLoading) return <Loading />;

  if (!profile) return <div className="w-[550px] h-screen overflow-y-scroll">{t('profile:notFound')}</div>;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://bsky.app/profile/${handle}/post/${params.postId}`} />
      </Helmet>
      <Virtuoso
        useWindowScroll
        // we need the [&>*]: since we're targeting the window scroll div
        // and the div is inside of the Virtuoso component
        className="[&>*]:flex [&>*]:flex-col [&>*]:gap-2"
        totalCount={replies.length}
        itemContent={(index) => {
          const reply = replies?.[index];
          if (!reply) return null;
          return reply.post && <PostCard post={reply.post} key={reply.post.uri} />;
        }}
        components={{
          Header: () => <PostCard post={postThread?.post as BSkyPost} />,
          List,
          Footer: () => <div className="h-96" />,
        }}
      />
    </>
  );
}
