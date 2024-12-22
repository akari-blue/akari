import { BlueskyCredentials, useBlueskyStore } from '../store';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export function useAuth() {
  const { login, logout, isAuthenticated } = useBlueskyStore(
    useShallow((state) => ({ login: state.login, logout: state.logout, isAuthenticated: state.isAuthenticated })),
  );
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials: BlueskyCredentials) => {
      try {
        await login(credentials);
        toast.success('Successfully logged in!');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to login');
        throw error;
      }
    },
    onSuccess: () => {
      // Redirect to the homepage
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      const url = new URL(redirect || '/', window.location.origin);
      navigate({ to: url.pathname });
    },
  });

  return {
    login: loginMutation.mutate,
    logout: () => {
      logout();
      toast.success('Successfully logged out');
    },
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
// A sign in code has been sent to your email address
