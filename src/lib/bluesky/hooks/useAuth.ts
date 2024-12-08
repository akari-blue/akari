import { useBlueskyStore } from '../store';
import { BlueskyCredentials } from '../types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAuth() {
  const { login, logout, isAuthenticated } = useBlueskyStore();

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