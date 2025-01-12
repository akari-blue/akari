import { BellIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { useUnreadCount } from '@/lib/bluesky/hooks/use-unread-count';

export const NotificationsLink = () => {
  const { t } = useTranslation('notifications');
  const { data: unreadCount } = useUnreadCount();
  return (
    <Link
      to="/notifications"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <div className="relative">
        <BellIcon className="size-6 active:scale-90" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </div>
      <span>{t('notifications')}</span>
    </Link>
  );
};
