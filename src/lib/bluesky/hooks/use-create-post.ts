import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { Facet } from '@atproto/api';
import { ReplyRef } from '@atproto/api/dist/client/types/app/bsky/feed/post';

export function useCreatePost() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ text, facets, reply }: { text: string; facets: Facet[]; reply?: ReplyRef }) => {
      try {
        const result = await agent.post({
          text,
          facets,
          reply,
        });
        toast.success(reply ? 'Reply posted successfully!' : 'Post created successfully!', {
          onDismiss() {
            navigate({
              to: '/profile/$handle/post/$postId',
              params: { handle: agent.session!.did, postId: result.uri.split('/')[4]! },
            });
          },
        });
        return result;
      } catch (error) {
        toast.error(
          error instanceof Error ? JSON.stringify(error) : reply ? 'Failed to create reply' : 'Failed to create post',
        );
        throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}
