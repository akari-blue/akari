import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { BellIcon, HomeIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';

const HomeLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link to="/">
      <HomeIcon className="size-10 lg:hidden" />
      <h1 className="text-2xl font-bold hidden lg:block">{t('appName')}</h1>
    </Link>
  );
};

const MessagesLink = () => {
  const { t } = useTranslation('messages');
  return (
    <Link to="/messages">
      <MailIcon className="size-10 lg:hidden" />
      <span className="hidden lg:block">{t('messages')}</span>
    </Link>
  );
};

const NotificationsLink = () => {
  const { t } = useTranslation('notifications');
  return (
    <Link to="/notifications">
      <BellIcon className="size-10 lg:hidden" />
      <span className="hidden lg:block">{t('notifications')}</span>
    </Link>
  );
};

const ProfileLink = () => {
  const session = useBlueskyStore((state) => state.session);
  const { t } = useTranslation('profile');

  if (!session?.handle) return null;

  return (
    <Link
      to="/profile/$handle"
      params={{
        handle: session?.handle,
      }}
    >
      <UserIcon className="size-10 lg:hidden" />
      <span className="hidden lg:block">{t('profile')}</span>
    </Link>
  );
};

const SettingsLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link to="/settings">
      <SettingsIcon className="size-10 lg:hidden" />
      <span className="hidden lg:block">{t('settings')}</span>
    </Link>
  );
};

const LoginButton = () => {
  const { t } = useTranslation('auth');
  return <Link to="/login">{t('login.default')}</Link>;
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 lg:bg-inherit p-4 z-50 md:top-0 md:right-auto lg:relative lg:h-fit">
      <div className="flex flex-row gap-2 justify-between md:flex-col">
        <HomeLink />
        {isAuthenticated && <MessagesLink />}
        {isAuthenticated && <NotificationsLink />}
        {isAuthenticated && <ProfileLink />}
        <SettingsLink />
        {!isAuthenticated && <LoginButton />}
      </div>
    </div>
  );
};
