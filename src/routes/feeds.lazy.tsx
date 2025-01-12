import { StickyHeader } from '@/components/sticky-header';
import { Image } from '@/components/ui/image';
import { Link } from '@/components/ui/link';
import { useActorFeeds } from '@/lib/bluesky/hooks/use-actor-feeds';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/feeds')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: feeds } = useActorFeeds();
  return (
    <>
      <StickyHeader>{'feeds'}</StickyHeader>
      <div className="p-4 border-b">
        <h1 className="font-semibold text-2xl">{'my feeds'}</h1>
        <div>{"all the feeds you've saved, right in one place."}</div>
      </div>
      <div className="divide-y">
        {feeds?.map((feed) => (
          <Link
            key={feed.cid}
            className="p-3 flex flex-row gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 hover:no-underline"
            to="/profile/$handle/feed/$feed"
            params={{
              handle: feed.creator.handle ?? feed.creator.did,
              feed: feed.uri.split('/').pop()!,
            }}
          >
            <Image
              src={feed.avatar}
              classNames={{
                image: 'size-8 rounded-sm',
              }}
            />
            <div className="font-semibold">{feed.displayName}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
