import { createLazyFileRoute } from '@tanstack/react-router';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useSettings } from '../hooks/useSetting';

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setSettings, experiments } = useSettings();

  return (
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
  );
}
