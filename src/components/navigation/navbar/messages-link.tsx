import { useTranslation } from 'react-i18next';
import { Link } from '../../ui/link';
import { MailIcon } from 'lucide-react';
import { useConversations } from '@/lib/bluesky/hooks/use-conversations';

export const MessagesLink = () => {
  const { t } = useTranslation('messages');
  const { data: convos } = useConversations();
  const unreadCount = convos?.filter((convo) => convo.unreadCount >= 1).length || 0;
  return (
    <Link
      to="/messages"
      className="flex flex-row items-center gap-2 p-3 rounded-sm hover:no-underline hover:bg-gray-200 dark:hover:bg-gray-700 justify-center"
    >
      <div className="relative active:scale-90">
        <MailIcon className="size-6 xl:size-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </div>
      <span className="hidden xl:block">{t('messages')}</span>
    </Link>
  );
};
