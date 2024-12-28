import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { Facet } from '@atproto/api';

export function useCreatePost() {
  const { agent, isAuthenticated } = useBlueskyStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ text, facets }: { text: string; facets: Facet[] }) => {
      if (!agent || !isAuthenticated) throw new Error('Not authenticated');

      try {
        const result = await agent.post({
          text,
          facets,
        });
        toast.success('Post created successfully!', {
          onDismiss() {
            navigate({
              to: '/profile/$handle/post/$postId',
              params: { handle: agent.session!.did, postId: result.uri.split('/')[4]! },
            });
          },
        });
        return result;
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
