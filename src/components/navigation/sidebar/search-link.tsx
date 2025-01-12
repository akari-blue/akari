import { SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';

export const SearchLink = () => {
  const { t } = useTranslation('search');
  return (
    <Link
      to="/search"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <SearchIcon className="size-6 active:scale-90" />
      <span>{t('search')}</span>
    </Link>
  );
};
