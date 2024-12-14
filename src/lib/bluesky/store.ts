import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BskyAgent } from '@atproto/api';

export type BlueskyCredentials = {
  handle: string;
  password: string;
};

type BlueskyState = {
  agent: BskyAgent | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  login: (credentials: BlueskyCredentials) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
};

const BLUESKY_SERVICE = 'https://bsky.social';

export const useBlueskyStore = create<BlueskyState>()(
  persist(
    (set, get) => ({
      agent: null,
      isAuthenticated: false,

      login: async (credentials: BlueskyCredentials) => {
        const agent = new BskyAgent({ service: BLUESKY_SERVICE });
        const response = await agent.login({
          identifier: credentials.handle,
          password: credentials.password,
        });

        // Store session data
        const session = response.data;
        set({ agent, isAuthenticated: true, session });
      },

      logout: () => {
        set({ agent: null, isAuthenticated: false, session: null });
        // reload the page after logout
        window.location.reload();
      },

      restoreSession: async () => {
        const { session } = get();
        if (session) {
          try {
            const agent = new BskyAgent({ service: BLUESKY_SERVICE });
            await agent.resumeSession(session);
            set({ agent, isAuthenticated: true });
          } catch (error) {
            console.error('Failed to restore session:', error);
            set({ agent: null, isAuthenticated: false, session: null });
          }
        }
      },

      session: null,
    }),
    {
      name: 'bluesky-store',
      partialize: (state) => ({ session: state.session }),
    },
  ),
);
