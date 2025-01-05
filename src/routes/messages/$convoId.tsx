import { useBlueskyStore } from '@/lib/bluesky/store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/messages/$convoId')({
  beforeLoad: async ({ params }) => {
    const isAuthenticated = useBlueskyStore.getState().isAuthenticated;
    if (!isAuthenticated) throw redirect({ to: '/login', search: { redirect: `/messages/${params.convoId}` } });
  },
});
