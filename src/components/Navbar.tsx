import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';
import { useBlueskyStore } from '../lib/bluesky/store';
import { BellIcon, HomeIcon, LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';

const HomeLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link to="/">
      <HomeIcon className="size-10 md:hidden" />
      <h1 className="text-2xl font-bold hidden md:block">{t('appName')}</h1>
    </Link>
  );
};

const MessagesLink = () => {
  const { t } = useTranslation('messages');
  return (
    <Link to="/messages">
      <MailIcon className="size-10 md:hidden" />
      <span className="hidden md:block">{t('messages')}</span>
    </Link>
  );
};

const NotificationsLink = () => {
  const { t } = useTranslation('notifications');
  return (
    <Link to="/notifications">
      <BellIcon className="size-10 md:hidden" />
      <span className="hidden md:block">{t('notifications')}</span>
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
      <UserIcon className="size-10 md:hidden" />
      <span className="hidden md:block">{t('profile')}</span>
    </Link>
  );
};

const SettingsLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link to="/settings">
      <SettingsIcon className="size-10 md:hidden" />
      <span className="hidden md:block">{t('settings')}</span>
    </Link>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth();
  const { t } = useTranslation('auth');
  return (
    <button onClick={logout}>
      <LogOutIcon className="size-10 md:hidden" />
      <span className="hidden md:block">{t('logout')}</span>
    </button>
  );
};

const LoginButton = () => {
  const { t } = useTranslation('auth');
  return <Link to="/login">{t('login.default')}</Link>;
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col h-full p-2 items-center w-12 md:w-64 md:items-start">
      <HomeLink />
      <div className="flex flex-col gap-2 items-start">
        {isAuthenticated && <MessagesLink />}
        {isAuthenticated && <NotificationsLink />}
        {isAuthenticated && <ProfileLink />}
        <SettingsLink />
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};
