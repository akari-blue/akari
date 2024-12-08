import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BlueskyPost } from '../types';

export function useLike() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uri, cid, like }: { uri: string; cid: string; like: boolean }) => {
      if (!agent) throw new Error('Not authenticated');

      try {
        if (like) {
          await agent.like(uri, cid);
        } else {
          await agent.deleteLike(uri);
        }
      } catch (error) {
        toast.error('Failed to update like status');
        throw error;
      }
    },
    onMutate: async ({ uri, like }) => {
      await queryClient.cancelQueries({ queryKey: ['timeline'] });
      
      const previousData = queryClient.getQueryData(['timeline']);
      
      queryClient.setQueryData(['timeline'], (old: any) => ({
        pages: old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((post: BlueskyPost) => {
            if (post.uri === uri) {
              return {
                ...post,
                likeCount: post.likeCount + (like ? 1 : -1),
                viewer: {
                  ...post.viewer,
                  like: like ? 'temp-like' : undefined,
                },
              };
            }
            return post;
          }),
        })),
      }));

      return { previousData };
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData(['timeline'], context.previousData);
      toast.error('Failed to update like status');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
  });
}