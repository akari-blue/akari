import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AtpSessionData, BskyAgent } from '@atproto/api';

export type BlueskyCredentials = {
  handle: string;
  password: string;
  authFactorToken?: string;
};

type Session = AtpSessionData & {
  didDoc?:
    | {
        service: {
          id: string;
          serviceEndpoint: string;
          type: 'AtprotoPersonalDataServer';
        }[];
      }
    | undefined;
};

type BlueskyState = {
  agent: BskyAgent | null;
  isAuthenticated: boolean;
  session: Session | null;
  login: (credentials: BlueskyCredentials) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
};

const AUTHENTICATED_ENDPOINT = 'https://bsky.social';
const GUEST_ENDPOINT = 'https://public.api.bsky.app';

export const useBlueskyStore = create<BlueskyState>()(
  persist(
    (set, get) => ({
      agent: new BskyAgent({ service: GUEST_ENDPOINT }),
      isAuthenticated: false,

      login: async (credentials: BlueskyCredentials) => {
        const agent = new BskyAgent({ service: AUTHENTICATED_ENDPOINT });
        const response = await agent.login({
          identifier: credentials.handle,
          password: credentials.password,
          authFactorToken: credentials.authFactorToken,
        });

        // Store session data
        const session = response.data;
        set({
          agent,
          isAuthenticated: true,
          session: {
            ...session,
            active: true,
            didDoc: session.didDoc as Session['didDoc'],
          },
        });
      },

      logout: () => {
        set({ agent: null, isAuthenticated: false, session: null });
        // reload the page after logout
        window.location.reload();
      },

      restoreSession: async () => {
        const { session, isAuthenticated } = get();
        if (session && !isAuthenticated) {
          try {
            const agent = new BskyAgent({ service: AUTHENTICATED_ENDPOINT });
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
