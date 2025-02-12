import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { useBlueskyStore } from '../../../lib/bluesky/store';
import { UserIcon } from 'lucide-react';
import { Avatar } from '../../ui/avatar';
import { useProfile } from '@/lib/bluesky/hooks/use-profile';

export const ProfileLink = () => {
  const { t } = useTranslation('profile');
  const handle = useBlueskyStore((state) => state.session?.handle);
  const { data: profile } = useProfile({ handle });

  if (!handle) return null;

  return (
    <Link
      to="/profile/$handle"
      params={{
        handle,
      }}
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <UserIcon className="hidden sm:flex size-6 xl:size-5 active:scale-90" />
      <Avatar handle={handle} avatar={profile?.avatar} hover={false} classNames={{ wrapper: 'size-6 sm:hidden' }} />
      <span className="hidden xl:block">{t('profile')}</span>
    </Link>
  );
};
