import { createLazyFileRoute } from '@tanstack/react-router';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useSettings } from '../hooks/useSetting';
import { Input } from '../components/ui/Input';

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
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.zenMode}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, zenMode: on } }))}
          label="Zen Mode"
        />
        <p>Hide all numbers.</p>
      </div>
      <div className="border p-2">
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            min="1"
            max="4"
            value={experiments.columns}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              setSettings((state) => ({ experiments: { ...state.experiments, columns: value } }));
            }}
          />
        </div>
        <p>How many columns to display in the home view.</p>
      </div>
      <div className="border p-2">
        <ToggleSwitch
          on={experiments.responsiveUI}
          setOn={(on) => setSettings((state) => ({ experiments: { ...state.experiments, responsiveUI: on } }))}
          label="Responsive UI"
        />
        <p>Should the UI be fully responsive or fixed width.</p>
      </div>
    </div>
  );
}
