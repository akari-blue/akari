import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { SearchIcon } from 'lucide-react';

export const SearchLink = () => {
  const { t } = useTranslation('search');
  return (
    <Link
      to="/search"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <SearchIcon className="size-6 xl:size-5 active:scale-90" />
      <span className="hidden xl:block">{t('search')}</span>
    </Link>
  );
};
