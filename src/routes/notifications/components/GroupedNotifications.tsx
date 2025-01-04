import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { useNotifications } from '@/lib/bluesky/hooks/useNotifications';
import { BSkyNotification } from '@/lib/bluesky/types/BSkyNotification';
import { forwardRef, HtmlHTMLAttributes, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { GroupNotification } from './GroupNotification';

// group notifications by uri
export function GroupedNotifications() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data, isLoading, fetchNextPage, isFetching } = useNotifications();
  const notifications = data?.pages.flatMap((page) => page.notifications);
  if (!notifications) return null;
  const grouped = notifications.reduce(
    (acc, notification) => {
      const reason = notification.reason === 'like' ? 'like' : notification.reason;
      const date = new Date(notification.indexedAt);
      const timestamp = `${date.getHours()}-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      const key = `${notification.record.$type === 'app.bsky.feed.like' ? notification.record.subject.uri : notification.record.subject}-${timestamp}-${reason}`;
      if (acc[key]) {
        acc[key]?.push(notification);
      } else {
        acc[key] = [notification];
      }
      return acc;
    },
    {} as Record<string, BSkyNotification[]>,
  );

  if (isLoading) return <Loading />;

  const list = Object.values(grouped);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={list.length}
      endReached={() => fetchNextPage()}
      components={{
        List: forwardRef(function List(props: HtmlHTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
          return <div ref={ref} {...props} className="flex flex-col gap-2" />;
        }),
        Footer: () => {
          return isFetching ? (
            <Loading />
          ) : (
            <div className="p-2 text-center">
              <Button
                onClick={() => {
                  fetchNextPage();
                }}
              >
                {t('loadMore')}
              </Button>
            </div>
          );
        },
      }}
      itemContent={(index: number) => {
        if (!list[index]) return null;
        return (
          <div key={list[index][0]?.uri} className="border-b border-neutral-700 hover:bg-neutral-500 hover:bg-opacity-10">
            <GroupNotification key={list[index][0]?.uri} notifications={list[index]} />
          </div>
        );
      }}
    />
  );
}
