import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { useFeeds } from '../lib/bluesky/hooks/useFeeds';
import { usePreferences } from '../lib/bluesky/hooks/usePreferences';
import { useSettings } from '../hooks/useSetting';
import * as Ariakit from '@ariakit/react';
import { cn } from '../lib/utils';
import { Timeline } from './Timeline';
import { useTranslation } from 'react-i18next';

export const FeedSelector = ({ columnNumber = 1 }: { columnNumber: number }) => {
  const { setSettings, columns } = useSettings();
  const { t } = useTranslation('app');
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
    ?.map((item) => item.value) ?? ['at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot'];
  const { isLoading, error, data } = useFeeds({ feeds });
  const selectedFeed = columns[columnNumber] ?? feeds[0];

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-400">{t('loading')}</div>;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg w-[550px]">
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
        {/* // if there are less than 2 feeds, don't show the selector */}
        {feeds.length >= 2 && (
          <div>
            <Ariakit.TabList
              className="flex flex-row gap-4 max-w-full overflow-x-scroll bg-neutral-900 p-2 m-2 mb-0 rounded-md"
              aria-label="feeds"
            >
              {data?.map((feed) => (
                <Ariakit.Tab
                  id={feed.uri}
                  className={cn(
                    'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
                    selectedFeed === feed.uri && 'bg-neutral-700',
                  )}
                >
                  {feed.displayName}
                </Ariakit.Tab>
              ))}
            </Ariakit.TabList>
          </div>
        )}
        {data?.map((feed) => (
          <Ariakit.TabPanel tabId={feed.uri} className="flex-1 overflow-y-scroll min-h-0">
            <Timeline columnNumber={columnNumber} />
          </Ariakit.TabPanel>
        ))}
      </Ariakit.TabProvider>
    </div>
  );
};
