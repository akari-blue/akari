import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SearchHistory = {
  history: string[];
  setSearchHistory: (
    partial: SearchHistory | Partial<SearchHistory> | ((state: SearchHistory) => SearchHistory | Partial<SearchHistory>),
    replace?: boolean | undefined,
  ) => void;
};

export const useSearchHistory = create<SearchHistory>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `set` and `get` are required by zustand
    (set, _get) => ({
      history: [],
      setSearchHistory: set,
    }),
    {
      name: 'settings',
      partialize: (state) => ({
        history: state.history,
      }),
    },
  ),
);
