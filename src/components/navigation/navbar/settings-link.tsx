import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { SettingsIcon } from 'lucide-react';

export const SettingsLink = () => {
  const { t } = useTranslation('app');
  return (
    <Link
      to="/settings"
      className="flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 hidden justify-center md:flex"
    >
      <SettingsIcon className="size-6 xl:size-5 active:scale-90" />
      <span className="hidden xl:block">{t('settings')}</span>
    </Link>
  );
};
