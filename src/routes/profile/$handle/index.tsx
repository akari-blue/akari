import { useBlueskyStore } from '@/lib/bluesky/store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/$handle/')({
  beforeLoad: async ({ params }) => {
    const agent = useBlueskyStore.getState().agent;
    const profile = await agent.getProfile({ actor: params.handle });
    const requiresAuth = profile.data.labels?.find((label) => label.val === '!no-unauthenticated');
    if (!requiresAuth) return;
    const isAuthenticated = useBlueskyStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
});
