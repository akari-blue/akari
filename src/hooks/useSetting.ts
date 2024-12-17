import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Settings = {
  experiments: {
    streamerMode: boolean;
    devMode: boolean;
    zenMode: boolean;
    columns: number;
    responsiveUI: boolean;
  };
  lastSelectedHomeFeed: string | null;
  setSettings: (
    partial: Settings | Partial<Settings> | ((state: Settings) => Settings | Partial<Settings>),
    replace?: boolean | undefined,
  ) => void;
};

export const useSettings = create<Settings>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `set` and `get` are required by zustand
    (set, _get) => ({
      experiments: {
        streamerMode: true,
        devMode: false,
        zenMode: false,
        columns: 1,
        responsiveUI: false,
      },
      lastSelectedHomeFeed: null,
      setSettings: set,
    }),
    {
      name: 'settings',
      partialize: (state) => ({ experiments: state.experiments }),
    },
  ),
);
