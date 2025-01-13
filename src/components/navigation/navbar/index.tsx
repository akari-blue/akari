import { useLocation } from '@tanstack/react-router';
import { useAuth } from '../../../lib/bluesky/hooks/use-auth';
import { useBlueskyStore } from '../../../lib/bluesky/store';
import { CreatePost } from '../../create-post';
import { cn } from '@/lib/utils';
import { useScrollVisible } from '@/hooks/use-scroll-visible';
import { Avatar } from '../../ui/avatar';
import { useProfile } from '@/lib/bluesky/hooks/use-profile';
import { HomeLink } from './home-link';
import { SearchLink } from './search-link';
import { MessagesLink } from './messages-link';
import { NotificationsLink } from './notifications-link';
import { SettingsLink } from './settings-link';
import { ProfileLink } from './profile-link';
import { LoginButton } from './login-button';
import { useRef } from 'react';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollVisible(ref);
  const handle = useBlueskyStore((state) => state.session?.handle);
  const { data: profile } = useProfile({ handle });

  return (
    <div
      ref={ref}
      className={cn(
        'bg-background text-foreground sticky',
        // base
        'px-4 pt-1 z-40',
        // mobile
        'fixed bottom-0 left-0 right-0 pb-safe border-t border-gray-200 dark:border-gray-800',
        // tablet
        'md:top-0 md:right-auto md:border-r md:border-gray-200 md:dark:border-gray-800',
        // desktop
        'xl:bg-inherit xl:sticky xl:h-screen xl:border-none xl:top-0',
        // transition
        'transform transition-transform duration-200 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        'md:translate-y-0',
      )}
    >
      <div
        className={cn(
          // base
          'flex flex-row gap-2 justify-between px-6 pb-2 [&>*]:w-full [&>*]:justify-center',
          // tablet
          'md:px-0 md:flex-col md:gap-2 md:h-full md:justify-normal',
          // desktop
          'xl:space-y-0 xl:gap-0 xl:items-start xl:[&>*]:justify-start',
        )}
      >
        <div className="flex-row items-center gap-2 p-3 hidden md:flex">
          {handle && <Avatar handle={handle} avatar={profile?.avatar} hover={false} />}
        </div>
        <HomeLink />
        <SearchLink />
        {isAuthenticated && <MessagesLink />}
        {isAuthenticated && <NotificationsLink />}
        {isAuthenticated && <ProfileLink />}
        <SettingsLink />
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && location.pathname === '/' && <CreatePost className="!w-fit" />}
      </div>
    </div>
  );
};
