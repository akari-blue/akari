import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/lib/bluesky/hooks/useNotifications';
import { Loading } from '@/components/ui/loading';
import { GroupedNotifications } from './components/GroupedNotifications';
import { Notification } from './components/Notification';

export const Route = createLazyFileRoute('/notifications/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['app', 'notifications']);
  const { data, isLoading } = useNotifications();
  const notifications = data?.pages.flatMap((page) => page.notifications);
  const mentions = notifications?.filter(
    (notification) =>
      notification.reason === 'mention' || notification.reason === 'reply' || notification.reason === 'quote',
  );
  const [selectedTab, setSelectedTab] = useState<string | undefined>();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <Ariakit.TabProvider
        defaultSelectedId={selectedTab}
        setSelectedId={(selectedId) => {
          if (!selectedId) return;
          setSelectedTab(selectedId);
        }}
      >
        <Ariakit.TabList className="grid grid-cols-2 gap-4 max-w-full overflow-x-scroll bg-neutral-900 p-2 m-2 mb-0 rounded-md">
          <Ariakit.Tab
            id="all"
            className={cn(
              'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
              selectedTab === 'all' && 'bg-neutral-700',
            )}
          >
            {t('notifications:tabs.all')}
          </Ariakit.Tab>
          <Ariakit.Tab
            id="mentions"
            className={cn(
              'flex h-10 items-center justify-center whitespace-nowrap bg-neutral-800 px-4',
              selectedTab === 'mentions' && 'bg-neutral-700',
            )}
          >
            {t('notifications:tabs.mentions')}
          </Ariakit.Tab>
        </Ariakit.TabList>
        <div className="p-2">
          <Ariakit.TabPanel tabId="all">{notifications && <GroupedNotifications />}</Ariakit.TabPanel>
          <Ariakit.TabPanel tabId="mentions" className="flex flex-col gap-2">
            {mentions?.map((notification) => (
              <div className="p-2 bg-neutral-800 rounded-lg">
                <Notification key={notification.uri} notification={notification} />
              </div>
            ))}
          </Ariakit.TabPanel>
        </div>
      </Ariakit.TabProvider>
    </div>
  );
}
