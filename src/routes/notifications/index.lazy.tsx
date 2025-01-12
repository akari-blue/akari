import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNotifications } from '@/lib/bluesky/hooks/use-notifications';
import { Loading } from '@/components/ui/loading';
import { GroupedNotifications } from './components/grouped-notifications';
import { Notification } from './components/notification';
import { Helmet } from 'react-helmet';
import { TabList } from '@/components/ui/tab-list';
import { Tab } from '@/components/ui/tab';
import { useUpdateSeenNotifications } from '@/lib/bluesky/hooks/use-update-seen-notifications';
import { NavHeader } from '@/components/navigation/navheader';
import { StickyHeader } from '@/components/sticky-header';
import { cn } from '@/lib/utils';
import { useOfflineStatus } from '@/hooks/use-offline-status';

export const Route = createLazyFileRoute('/notifications/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['app', 'notifications']);
  const isOffline = useOfflineStatus();
  const { data, isLoading } = useNotifications();
  const notifications = data?.pages.flatMap((page) => page.notifications);
  const mentions = notifications?.filter(
    (notification) =>
      notification.reason === 'mention' || notification.reason === 'reply' || notification.reason === 'quote',
  );
  const [selectedTab, setSelectedTab] = useState<string | undefined>();
  const { mutate: updateSeenNotifications } = useUpdateSeenNotifications();

  // update seen on mount
  useEffect(() => {
    updateSeenNotifications();
  }, [updateSeenNotifications]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{t('notifications:notifications')}</title>
      </Helmet>

      <Ariakit.TabProvider
        defaultSelectedId={selectedTab}
        setSelectedId={(selectedId) => {
          if (!selectedId) return;
          setSelectedTab(selectedId);
        }}
      >
        <StickyHeader backButton={false} className="p-0 border-none flex flex-col">
          <NavHeader />
          <TabList
            label="notifications"
            className={cn('sticky bg-background z-40 w-full grid grid-cols-2', isOffline ? 'top-[46px]' : 'top-0')}
          >
            <Tab id="all" name={t('notifications:tabs.all')} selectedTab={selectedTab} />
            <Tab id="mentions" name={t('notifications:tabs.mentions')} selectedTab={selectedTab} />
          </TabList>
        </StickyHeader>
        <div className="flex flex-col">
          <Ariakit.TabPanel tabId="all">{notifications && <GroupedNotifications />}</Ariakit.TabPanel>
          <Ariakit.TabPanel tabId="mentions" className="flex flex-col">
            {mentions?.map((notification) => (
              <div key={notification.uri} className="border-neutral-700 hover:bg-neutral-500 hover:bg-opacity-10">
                <Notification key={notification.uri} notification={notification} />
              </div>
            ))}
          </Ariakit.TabPanel>
        </div>
      </Ariakit.TabProvider>
    </>
  );
}
