import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { LogInIcon } from 'lucide-react';

export const LoginButton = () => {
  const { t } = useTranslation('auth');
  return (
    <Link
      to="/login"
      className="flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 hidden justify-center md:flex"
    >
      <LogInIcon className="size-6 xl:hidden active:scale-90" />
      <span className="hidden xl:block">{t('login.default')}</span>
    </Link>
  );
};
