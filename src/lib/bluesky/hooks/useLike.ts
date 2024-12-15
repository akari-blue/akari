import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BskyPost } from '../types';

const timelineQueryKey = ['timeline', { isAuthenticated: true }];

export function useLike() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['like'],
    mutationFn: async ({ uri, cid, like }: { uri: string; cid: string; like: boolean }) => {
      if (!agent) throw new Error('Not authenticated');

      toast.info('Updating like status for ' + uri + ' to ' + like);

      if (like) {
        await agent.like(uri, cid);
      } else {
        await agent.deleteLike(uri);
      }
    },
    onMutate: async ({ uri, like }) => {
      await queryClient.cancelQueries({ queryKey: timelineQueryKey });

      const previousData = queryClient.getQueryData(timelineQueryKey);

      queryClient.setQueryData<{
        pages: {
          feed: {
            post: BskyPost;
            feedContext: string;
          }[];
          cursor: string;
        }[];
        pageParams: unknown;
      }>(timelineQueryKey, (old) => ({
        pages:
          old?.pages.map((page) => ({
            ...page,
            feed: page.feed.map(({ post, feedContext }) => {
              if (post.uri !== uri) {
                return {
                  feedContext,
                  post,
                };
              }

              return {
                feedContext,
                post: {
                  ...post,
                  likeCount: post.likeCount + (like ? 1 : -1),
                  viewer: {
                    ...post.viewer,
                    // @TODO: confirm the format of like string
                    like: `at://did:${agent?.session?.did}`,
                  },
                },
              };
            }),
          })) ?? [],
        pageParams: old?.pageParams,
      }));

      return { previousData };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(timelineQueryKey, context?.previousData);
      toast.error('Failed to update like status ' + (error as Error).message);
    },
    onSuccess: (_, { like }) => {
      toast.success('Like status updated to ' + like);
    },
  });
}
