import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/bluesky/hooks/useAuth';
import { Link } from './ui/Link';

const SettingsLink = () => {
  const { t } = useTranslation('app');
  return <Link to="/settings">{t('settings')}</Link>;
};

const LogoutButton = () => {
  const { logout } = useAuth();
  const { t } = useTranslation('auth');
  return <button onClick={logout}>{t('logout')}</button>;
};

const LoginButton = () => {
  const { t } = useTranslation('auth');
  return <Link to="/login">{t('login.default')}</Link>;
};

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <Link to="/">
          <h1 className="text-2xl font-bold">[placeholder name]</h1>
        </Link>
        <div className="flex flex-row gap-2">
          <SettingsLink />
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};
