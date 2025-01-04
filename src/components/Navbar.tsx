import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { BellIcon, HomeIcon, LogInIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { CreatePost } from './CreatePost';
import { cn } from '@/lib/utils';
import { appName } from '@/config';
import { useQueryClient } from '@tanstack/react-query';
import { useUnreadCount } from '@/lib/bluesky/hooks/useUnreadCount';

const HomeLink = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  return (
    <Link
      to="/"
      onClick={() => {
        // if we're on the homepage already we need to invalidate the associated query
        if (location.pathname === '/') {
          // @TODO: we should really be invalidating the query for the current feed not all feeds
          queryClient.invalidateQueries({
            queryKey: ['feed'],
          });
        }
      }}
    >
      <HomeIcon className="size-7 xl:hidden" />
      <h1 className="text-2xl font-bold hidden xl:block">{appName}</h1>
    </Link>
  );
};

const MessagesLink = () => {
  const { t } = useTranslation('messages');
  return (
    <Link to="/messages">
      <MailIcon className="size-7 xl:hidden" />
      <span className="hidden xl:block">{t('messages')}</span>
    </Link>
  );
};

const NotificationsLink = () => {
  const { t } = useTranslation('notifications');
  const { data: unreadCount } = useUnreadCount();
  return (
    <Link to="/notifications" className="relative">
      <BellIcon className="size-7 xl:hidden" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {unreadCount}
        </span>
      )}
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
    >
      <UserIcon className="size-7 xl:hidden" />
      <span className="hidden xl:block">{t('profile')}</span>
    </Link>
  );
};

const SettingsLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link to="/settings">
      <SettingsIcon className="size-7 xl:hidden" />
      <span className="hidden xl:block">{t('settings')}</span>
    </Link>
  );
};

const LoginButton = () => {
  const { t } = useTranslation('auth');
  return (
    <Link to="/login">
      <LogInIcon className="size-7 xl:hidden" />
      <span className="hidden xl:block">{t('login.default')}</span>
    </Link>
  );
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div
      className={cn(
        'bg-background text-foreground',
        // base
        'px-4 pt-1 z-50',
        // mobile
        'fixed bottom-0 left-0 right-0 pb-safe border-t border-gray-200 dark:border-gray-800',
        // tablet
        'md:top-0 md:right-auto md:border-r md:border-gray-200 md:dark:border-gray-800',
        // desktop
        'xl:bg-inherit xl:relative xl:h-screen xl:border-none',
      )}
    >
      <div
        className={cn(
          // base
          'flex flex-row gap-2 justify-between p-2 pb-4 px-8',
          // tablet
          'md:flex-col md:gap-2 md:h-full md:space-y-8 md:justify-normal',
          // desktop
          'xl:space-y-0',
        )}
      >
        <HomeLink />
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
