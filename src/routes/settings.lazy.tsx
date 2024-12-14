import { createLazyFileRoute } from '@tanstack/react-router';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useSettings } from '../hooks/useSetting';
import { Button } from '../components/ui/Button';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAuth } from '../lib/bluesky/hooks/useAuth';

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setSettings, experiments } = useSettings();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 max-w-2xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <ErrorBoundary>
          <div className="flex flex-col gap-4">
            <div className="border p-2">
              <ToggleSwitch
                on={experiments.devMode}
                setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, devMode: on } }))}
                label="Developer Mode"
              />
              <p>Enable additional debugging tools.</p>
            </div>
            <div className="border p-2">
              <ToggleSwitch
                on={experiments.streamerMode}
                setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, streamerMode: on } }))}
                label="Streamer Mode"
              />
              <p>Hide sensitive information and blur all media content.</p>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
