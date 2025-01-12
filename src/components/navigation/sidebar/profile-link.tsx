import { UserIcon } from 'lucide-react';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';

export const ProfileLink = () => {
  const { t } = useTranslation('profile');
  const handle = useBlueskyStore((state) => state.session?.handle);

  if (!handle) return null;

  return (
    <Link
      to="/profile/$handle"
      params={{
        handle,
      }}
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <UserIcon className="flex size-6 active:scale-90" />
      <span>{t('profile')}</span>
    </Link>
  );
};
