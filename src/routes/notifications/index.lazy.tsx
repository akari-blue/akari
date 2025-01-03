import * as Ariakit from '@ariakit/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNotifications } from '@/lib/bluesky/hooks/useNotifications';
import { Loading } from '@/components/ui/loading';
import { GroupedNotifications } from './components/GroupedNotifications';
import { Notification } from './components/Notification';
import { Helmet } from 'react-helmet';
import { TabList } from '@/components/ui/tab-list';
import { Tab } from '@/components/ui/tab';

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
    <>
      <Helmet>
        <title>{t('notifications:notifications')}</title>
      </Helmet>
      <div className="flex flex-col gap-2 border">
        <Ariakit.TabProvider
          defaultSelectedId={selectedTab}
          setSelectedId={(selectedId) => {
            if (!selectedId) return;
            setSelectedTab(selectedId);
          }}
        >
          <TabList label="notifications" className="justify-between grid grid-cols-2">
            <Tab id="all" name={t('notifications:tabs.all')} selectedTab={selectedTab} />
            <Tab id="mentions" name={t('notifications:tabs.mentions')} selectedTab={selectedTab} />
          </TabList>
          <div className="p-2">
            <Ariakit.TabPanel tabId="all">{notifications && <GroupedNotifications />}</Ariakit.TabPanel>
            <Ariakit.TabPanel tabId="mentions" className="flex flex-col gap-2">
              {mentions?.map((notification) => (
                <div key={notification.uri} className="border-b border-neutral-700 hover:bg-neutral-500 hover:bg-opacity-10">
                  <Notification key={notification.uri} notification={notification} />
                </div>
              ))}
            </Ariakit.TabPanel>
          </div>
        </Ariakit.TabProvider>
      </div>
    </>
  );
}
