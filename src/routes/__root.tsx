import { createRootRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useBlueskyStore } from '../lib/bluesky/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { useSettings } from '../hooks/useSetting';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import i18n from '../i18n';
import { Toaster } from '@/components/ui/sonner';
import { Helmet } from 'react-helmet';
import { appName } from '@/config';
import { useUnreadCount } from '@/lib/bluesky/hooks/useUnreadCount';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    // Attempt to restore the session
    await useBlueskyStore.getState().restoreSession();

    if (location.pathname.startsWith('/login')) {
      // if already authenticated, redirect to root
      const { isAuthenticated } = useBlueskyStore.getState();
      if (isAuthenticated) throw redirect({ to: '/' });

      // if not authenticated, proceed to login
      return;
    }

    // redirect to profile
    if (location.pathname.startsWith('/@')) {
      throw redirect({
        to: '/profile/$handle',
        params: { handle: location.pathname.slice(2) },
      });
    }
  },
});

function Root() {
  const { experiments, font, language } = useSettings();
  const dir = i18n.dir(language);
  const router = useRouterState();
  const pathname = router.location.pathname;
  const { data: unreadCount } = useUnreadCount();

  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      console.info(`Service Worker at: ${swUrl}`);
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 5_000);
      }
    },
    onNeedRefresh() {
      toast.info('A new version of the app is available.', {
        action: {
          label: 'Update',
          onClick() {
            updateServiceWorker(true);
          },
        },
      });
    },
    onRegisterError(error) {
      if (experiments.devMode) toast.info('SW registration error', error);
    },
  });

  return (
    <>
      <Helmet titleTemplate={`${unreadCount ? `(${unreadCount})` : ''} %s - ${appName}`} defaultTitle={appName} />
      <OfflineBanner />
      <main
        dir={dir}
        lang={language}
        className={cn(
          'bg-background text-foreground',
          font.family === 'OpenDyslexic' && 'font-[OpenDyslexic]',
          font.family === 'Atkinson-Hyperlegible' && 'font-[Atkinson-Hyperlegible]',
          font.size === 'extra-small' && 'text-xs',
          font.size === 'small' && 'text-sm',
          font.size === 'medium' && 'text-base',
          font.size === 'large' && 'text-lg',
          font.size === 'extra-large' && 'text-xl',
        )}
      >
        <ErrorBoundary>
          <div className="flex mx-auto lg:flex-row lg:w-fit lg:gap-2">
            <Navbar />
            <div className="flex justify-center mx-auto">
              <ErrorBoundary>
                <div className={cn('flex flex-col gap-2 sm:border-x', pathname !== '/' && 'w-screen sm:w-[550px]')}>
                  <Outlet key="app" />
                </div>
              </ErrorBoundary>
            </div>
          </div>
          {experiments.devMode && (
            <div className="fixed bottom-12 right-2">
              <ReactQueryDevtools buttonPosition="relative" />
            </div>
          )}

          {experiments.devMode && (
            <TanStackRouterDevtools
              toggleButtonProps={{
                style: {
                  position: 'fixed',
                  bottom: '4rem',
                  left: '1em',
                },
              }}
            />
          )}
          <Toaster />
        </ErrorBoundary>
      </main>
    </>
  );
}
