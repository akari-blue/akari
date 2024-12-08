import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';

export function useCreatePost() {
  const { agent, isAuthenticated } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!agent || !isAuthenticated) {
        throw new Error('Not authenticated');
      }

      try {
        await agent.post({
          text,
        });
        toast.success('Post created successfully!');
      } catch (error) {
        toast.error(error instanceof Error ? JSON.stringify(error) : 'Failed to create post');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
  });
}