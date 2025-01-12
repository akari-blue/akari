import { useAuth } from '../lib/bluesky/hooks/use-auth';
import { useFeeds } from '../lib/bluesky/hooks/use-feeds';
import { usePreferences } from '../lib/bluesky/hooks/use-preferences';
import { useSettings } from '../hooks/use-setting';
import * as Ariakit from '@ariakit/react';
import { Timeline } from './timeline';
import { Loading } from './ui/loading';
import { TabList } from './ui/tab-list';
import { Tab } from './ui/tab';
import { useQueryClient } from '@tanstack/react-query';
import { useOfflineStatus } from '@/hooks/use-offline-status';
import { cn } from '@/lib/utils';
import { StickyHeader } from './sticky-header';
import { NavHeader } from './navigation/navheader';
import { useActorFeeds } from '@/lib/bluesky/hooks/use-actor-feeds';

export const FeedSelector = ({ columnNumber = 1 }: { columnNumber: number }) => {
  const isOffline = useOfflineStatus();
  const queryClient = useQueryClient();
  const { setSettings, columns } = useSettings();
  const { isAuthenticated } = useAuth();
  const { data: preferences } = usePreferences();
  const savedFeedsPrefV2 = isAuthenticated
    ? preferences?.find((item) => item.$type === 'app.bsky.actor.defs#savedFeedsPrefV2')
    : null;
  const feeds = (
    savedFeedsPrefV2?.items as
      | (
          | {
              type: 'feed';
              value: `at://${string}`;
              pinned: boolean;
              id: string;
            }
          | {
              type: 'timeline';
              value: string;
              pinned: boolean;
              id: string;
            }
        )[]
      | undefined
  )
    ?.filter((item) => item.type === 'feed')
    .filter((item) => item.pinned)
    ?.map((item) => item.value) ?? ['at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot'];
  const { isLoading, error, data } = useActorFeeds();
  const selectedFeed = columns[columnNumber] ?? feeds[0];

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div className="flex flex-col rounded-lg">
      {isLoading ? (
        <Loading />
      ) : (
        <Ariakit.TabProvider
          defaultSelectedId={selectedFeed}
          setSelectedId={(selectedId) => {
            if (!selectedId) return;
            setSettings((state) => {
              const columns = [...state.columns];
              columns[columnNumber] = selectedId;
              return {
                ...state,
                columns: columns,
              };
            });
          }}
        >
          <StickyHeader backButton={false} className="p-0 border-none flex flex-col">
            <NavHeader />
            {/* if there are less than 2 feeds, don't show the selector */}
            {feeds.length >= 2 && (
              <TabList label="feed selector" className={cn('sticky bg-background z-40', isOffline ? 'top-[46px]' : 'top-0')}>
                {data?.map((feed) => {
                  return (
                    <Tab
                      id={feed.uri}
                      name={feed.displayName}
                      selectedTab={selectedFeed}
                      key={feed.uri}
                      onClick={async () => {
                        // if this tab is already selected we need to invalidate the associated query
                        if (selectedFeed === feed.uri) {
                          await queryClient.invalidateQueries({
                            queryKey: ['feed', { feed: selectedFeed }],
                          });
                        }
                      }}
                    />
                  );
                })}
              </TabList>
            )}
          </StickyHeader>

          {/* if there are less than 2 feeds, don't show the selector */}
          {feeds.length >= 2 && (
            <>
              {data?.map((feed) => (
                <Ariakit.TabPanel key={feed.uri} tabId={feed.uri}>
                  <Timeline columnNumber={columnNumber} />
                </Ariakit.TabPanel>
              ))}
            </>
          )}
          {feeds.length === 1 && <Timeline columnNumber={columnNumber} />}
        </Ariakit.TabProvider>
      )}
    </div>
  );
};
