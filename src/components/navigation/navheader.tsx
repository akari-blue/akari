import { useLocation } from '@tanstack/react-router';
import { HashIcon, SettingsIcon } from 'lucide-react';
import AkariLogo from '@/../public/images/logo.svg';
import { useAuth } from '@/lib/bluesky/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Image } from '../ui/image';
import { Sidebar } from './sidebar';
import { Link } from '../ui/link';

export const NavHeader = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className={cn('w-full flex items-center justify-between p-2 pb-0', !isAuthenticated && 'border-b')}>
      <Sidebar />
      {location.pathname === '/' && (
        <Button
          onClick={() => {
            // scroll to top and invalidate the query
            window.scrollTo({ top: 0 });
          }}
          variant="ghost"
          className="hover:bg-transparent active:scale-90"
        >
          <Image
            src={AkariLogo}
            alt="Akari"
            classNames={{
              image: 'size-12',
            }}
            clickable={false}
          />
        </Button>
      )}
      {location.pathname === '/' ? (
        <Button variant="ghost" asChild>
          <Link to="/feeds">
            <HashIcon className="size-12" />
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" asChild>
          <Link to="/notifications/settings">
            <SettingsIcon className="!size-6 md:invisible stroke-gray-600" />
          </Link>
        </Button>
      )}
    </div>
  );
};
