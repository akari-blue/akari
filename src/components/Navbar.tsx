import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { BellIcon, HomeIcon, LogInIcon, MailIcon, SearchIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { CreatePost } from './CreatePost';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useUnreadCount } from '@/lib/bluesky/hooks/useUnreadCount';
import { useConversations } from '@/lib/bluesky/hooks/useConversations';
import { useScollVisible } from '@/hooks/useScrollVisible';
import { Avatar } from './ui/avatar';
import { useProfile } from '@/lib/bluesky/hooks/useProfile';

const HomeLink = () => {
  const { t } = useTranslation('app');
  const location = useLocation();
  const queryClient = useQueryClient();
  return (
    <Link
      to="/"
      onClick={async () => {
        // if we're on the homepage already we need to invalidate the associated query
        if (location.pathname === '/') {
          // @TODO: we should really be invalidating the query for the current feed not all feeds
          await queryClient.invalidateQueries({
            queryKey: ['feed'],
          });
        }
      }}
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <HomeIcon className="size-7 xl:size-6 active:scale-90" />
      <span className="hidden xl:block">{t('home')}</span>
    </Link>
  );
};

const SearchLink = () => {
  const { t } = useTranslation('search');
  return (
    <Link
      to="/search"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <SearchIcon className="size-7 xl:size-6 active:scale-90" />
      <span className="hidden xl:block">{t('search')}</span>
    </Link>
  );
};

const MessagesLink = () => {
  const { t } = useTranslation('messages');
  const { data: convos } = useConversations();
  const unreadCount = convos?.map((convo) => convo.unreadCount).reduce((a, b) => a + b, 0) ?? 0;
  return (
    <Link
      to="/messages"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <div className="relative active:scale-90">
        <MailIcon className="size-7 xl:size-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </div>
      <span className="hidden xl:block">{t('messages')}</span>
    </Link>
  );
};

const NotificationsLink = () => {
  const { t } = useTranslation('notifications');
  const { data: unreadCount } = useUnreadCount();
  return (
    <Link
      to="/notifications"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <div className="relative">
        <BellIcon className="size-7 xl:size-6 active:scale-90" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </div>
      <span className="hidden xl:block">{t('notifications')}</span>
    </Link>
  );
};

const ProfileLink = () => {
  const { session } = useBlueskyStore();
  const { t } = useTranslation('profile');

  if (!session?.handle) return null;

  return (
    <Link
      to="/profile/$handle"
      params={{
        handle: session?.handle,
      }}
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <UserIcon className="size-7 xl:size-6 active:scale-90" />
      <span className="hidden xl:block">{t('profile')}</span>
    </Link>
  );
};

const SettingsLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link
      to="/settings"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <SettingsIcon className="size-7 xl:size-6 active:scale-90" />
      <span className="hidden xl:block">{t('settings')}</span>
    </Link>
  );
};

const LoginButton = () => {
  const { t } = useTranslation('auth');
  return (
    <Link to="/login">
      <LogInIcon className="size-7 xl:hidden active:scale-90" />
      <span className="hidden xl:block">{t('login.default')}</span>
    </Link>
  );
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isVisible = useScollVisible();
  const handle = useBlueskyStore((state) => state.session?.handle);
  const { data: profile } = useProfile({ handle });

  return (
    <div
      className={cn(
        'bg-background text-foreground sticky',
        // base
        'px-4 pt-1 z-40',
        // mobile
        'fixed bottom-0 left-0 right-0 pb-safe border-t border-gray-200 dark:border-gray-800',
        // tablet
        'md:top-0 md:right-auto md:border-r md:border-gray-200 md:dark:border-gray-800',
        // desktop
        'xl:bg-inherit xl:sticky xl:h-screen xl:border-none xl:top-0',
        // transition
        'transform transition-transform duration-200 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        'md:translate-y-0',
      )}
    >
      <div
        className={cn(
          // base
          'flex flex-row gap-2 justify-between p-2 pb-4 px-8',
          // tablet
          'md:px-0  md:flex-col md:gap-2 md:h-full md:space-y-8 md:justify-normal',
          // desktop
          'xl:space-y-0',
        )}
      >
        <div className="flex flex-row items-center gap-2 p-3">
          {handle && <Avatar handle={handle} avatar={profile?.avatar} hover={false} />}
        </div>
        <HomeLink />
        <SearchLink />
        {isAuthenticated && <MessagesLink />}
        {isAuthenticated && <NotificationsLink />}
        {isAuthenticated && <ProfileLink />}
        <SettingsLink />
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && location.pathname === '/' && <CreatePost />}
      </div>
    </div>
  );
};
