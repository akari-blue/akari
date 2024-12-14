import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BskyPost } from '../types';

const timelineQueryKey = ['timeline', { isAuthenticated: true }];

export function useRepost() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['repost'],
    mutationFn: async ({ uri, cid }: { uri: string; cid: string }) => {
      if (!agent) throw new Error('Not authenticated');

      toast.info('Reposting ' + uri);

      await agent.repost(uri, cid);
    },
    onMutate: async ({ uri }) => {
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
                  repostCount: post.repostCount + 1,
                  viewer: {
                    ...post.viewer,
                    repost: true,
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
      toast.error('Failed to repost ' + (error as Error).message);
    },
    onSuccess: () => {
      toast.success('Reposted successfully');
    },
  });
}
