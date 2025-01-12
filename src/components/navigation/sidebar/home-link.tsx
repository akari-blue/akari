import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';

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
      <HomeIcon className="size-6 active:scale-90" />
      <span>{t('home')}</span>
    </Link>
  );
};
