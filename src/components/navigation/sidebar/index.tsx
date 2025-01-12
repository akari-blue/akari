import { DotIcon, MenuIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Avatar } from '../../ui/avatar';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { useProfile } from '@/lib/bluesky/hooks/use-profile';
import { Handle } from '../../ui/handle';
import { Link } from '../../ui/link';
import { FormattedNumber } from '../../ui/formatted-number';
import { SearchLink } from './search-link';
import { HomeLink } from './home-link';
import { MessagesLink } from './messages-link';
import { NotificationsLink } from './notifications-link';
import { ProfileLink } from './profile-link';
import { SettingsLink } from './settings-link';
import { useLocation } from '@tanstack/react-router';
import AkariLogo from '@/../public/images/logo.svg';
import { Image } from '@/components/ui/image';

export const Sidebar = () => {
  const handle = useBlueskyStore((state) => state.session?.handle);
  const { data: profile } = useProfile({ handle });
  const location = useLocation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <MenuIcon className="!size-6 md:invisible stroke-gray-600" />
          {location.pathname === '/notifications' && 'notifications'}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen w-64 bg-background px-4" position="left" closeButton={false}>
        <div className="divide-y gap-2 flex flex-col">
          {handle ? (
            <div className="flex flex-col">
              <Avatar handle={handle} avatar={profile?.avatar} hover={false} className="size-12" />
              <div className="font-bold">{profile?.displayName}</div>
              <Handle handle={handle} />
              <div className="flex flex-row items-center text-sm ">
                <div className="flex flex-row gap-1">
                  <FormattedNumber value={profile?.followersCount} />
                  <div className="text-gray-400">{'followers'}</div>
                </div>
                <DotIcon className="size-4 text-gray-400" />
                <div className="flex flex-row gap-1">
                  <FormattedNumber value={profile?.followsCount} />
                  <div className="text-gray-400">{'following'}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <Image
                src={AkariLogo}
                alt="Akari"
                classNames={{
                  image: 'size-12',
                }}
                clickable={false}
              />
              <Link to="/">{'akari'}</Link>
            </div>
          )}
          <div className="pt-2">
            <div className="flex flex-col items-start gap-2 [&>*]:w-full [&>*]:justify-start">
              <SearchLink />
              <HomeLink />
              <MessagesLink />
              <NotificationsLink />
              <ProfileLink />
              <SettingsLink />
            </div>
          </div>
          <div className="flex flex-col p-2">
            <Link className="text-blue-500" href="https://bsky.social/about/support/tos">
              {'terms of service'}
            </Link>
            <Link className="text-blue-500" href="https://bsky.social/about/support/privacy-policy">
              {'privacy policy'}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
