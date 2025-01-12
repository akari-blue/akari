import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { HomeIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const HomeLink = () => {
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
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <HomeIcon className="size-6 xl:size-5 active:scale-90" />
      <span className="hidden xl:block">{t('home')}</span>
    </Link>
  );
};
