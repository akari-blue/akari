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

export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    // Attempt to restore the session
    await useBlueskyStore.getState().restoreSession();

    if (location.pathname.startsWith('/login')) {
      // if already authenticated, redirect to root
      const { isAuthenticated } = useBlueskyStore.getState();
      if (isAuthenticated) {
        throw redirect({ to: '/' });
      }

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

  return (
    <main
      dir={dir}
      lang={language}
      className={cn(
        'text-black dark:text-white min-h-screen',
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
          <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 flex justify-center mx-auto">
            <ErrorBoundary>
              <div className={cn('flex flex-col gap-2', pathname !== '/' && 'w-[550px]')}>
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
        <Toaster position="bottom-right" />
      </ErrorBoundary>
    </main>
  );
}
