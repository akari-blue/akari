import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BSkyPost } from '../types/BSkyPost';
import { toast } from 'sonner';

export function useUnlike() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['unlike'],
    mutationFn: async ({ uri }: { uri: string }) => {
      await agent.deleteLike(uri);
    },
    onMutate: async ({ uri }) => {
      const cache = queryClient.getQueryCache();
      const timelineQueries = cache.findAll({
        queryKey: ['feed'],
      });
      const authorFeedQueries = cache.findAll({
        queryKey: ['author-feed'],
      });
      const previousData = [...timelineQueries, ...authorFeedQueries];

      for (const query of previousData) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          pages: {
            feed: {
              post: BSkyPost;
              feedContext: string;
            }[];
            cursor: string;
          }[];
          pageParams: unknown;
        }>(query.queryKey, (old) => ({
          pages:
            old?.pages.map((page) => ({
              ...page,
              feed: page.feed.map(({ post, feedContext }) => {
                if (post.viewer.like !== uri) {
                  return {
                    feedContext,
                    post,
                  };
                }

                return {
                  feedContext,
                  post: {
                    ...post,
                    likeCount: post.likeCount - 1,
                    viewer: {
                      ...post.viewer,
                      like: undefined,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }

      return {
        previousData: previousData.map((query) => ({
          queryKey: query.queryKey,
          state: query.state,
        })),
      };
    },
    onSuccess: async (_, { uri }) => {
      const cache = queryClient.getQueryCache();
      const timelineQueries = cache.findAll({
        queryKey: ['feed'],
      });
      const authorFeedQueries = cache.findAll({
        queryKey: ['author-feed'],
      });

      const queries = [...timelineQueries, ...authorFeedQueries];

      for (const query of queries) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          pages: {
            feed: {
              post: BSkyPost;
              feedContext: string;
            }[];
            cursor: string;
          }[];
          pageParams: unknown;
        }>(query.queryKey, (old) => ({
          pages:
            old?.pages.map((page) => ({
              ...page,
              feed: page.feed.map(({ post, feedContext }) => {
                if (post.viewer.like !== uri) {
                  return {
                    feedContext,
                    post,
                  };
                }

                return {
                  feedContext,
                  post: {
                    ...post,
                    viewer: {
                      ...post.viewer,
                      like: undefined,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }
    },
    onError: (error, _, context) => {
      // set the previous data back
      for (const query of context?.previousData ?? []) {
        queryClient.setQueryData(query.queryKey, query.state.data);
      }
      toast.error('failed to unlike post ' + (error as Error).message);
    },
  });
}
