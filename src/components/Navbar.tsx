import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { BellIcon, HomeIcon, LogInIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { CreatePost } from './CreatePost';
import { cn } from '@/lib/utils';
import { appName } from '@/config';

const HomeLink = () => {
  return (
    <Link to="/">
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
  return (
    <Link to="/notifications">
      <BellIcon className="size-7 xl:hidden" />
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
        // base
        'dark:bg-black px-4 pt-1 z-50',
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
          'flex flex-row gap-2 justify-between p-2 pb-4',
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
