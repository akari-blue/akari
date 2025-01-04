import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BSkyPost } from '../types/BSkyPost';

export function useLike() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['like'],
    mutationFn: async ({ uri, cid, like }: { uri: string; cid: string; like: boolean }) => {
      toast.info('Updating like status for ' + uri + ' to ' + like);

      if (like) {
        return await agent.like(uri, cid);
      }

      await agent.deleteLike(uri);
    },
    onMutate: async ({ uri, like }) => {
      const cache = queryClient.getQueryCache();
      const timelineQueries = cache.findAll({
        queryKey: ['feed'],
      });
      const authorFeedQueries = cache.findAll({
        queryKey: ['author-feed'],
      });
      const previousData = [...timelineQueries, ...authorFeedQueries];

      for (const query of timelineQueries) {
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
                      like: `at://imlunahey.com/app.bsky.feed.like/pending`,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }

      for (const query of authorFeedQueries) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          pages: {
            feed: {
              post: BSkyPost;
            }[];
            cursor: string;
          }[];
          pageParams: unknown;
        }>(query.queryKey, (old) => ({
          pages:
            old?.pages.map((page) => ({
              ...page,
              feed: page.feed.map(({ post }) => {
                if (post.uri !== uri) {
                  return {
                    post,
                  };
                }

                return {
                  post: {
                    ...post,
                    likeCount: post.likeCount + (like ? 1 : -1),
                    viewer: {
                      ...post.viewer,
                      like: `at://imlunahey.com/app.bsky.feed.like/pending`,
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
    onError: (error, _, context) => {
      // set the previous data back
      for (const query of context?.previousData ?? []) {
        queryClient.setQueryData(query.queryKey, query.state.data);
      }
      toast.error('Failed to update like status ' + (error as Error).message);
    },
    onSuccess: async (data, { like, uri }) => {
      toast.success('Like status updated to ' + like);

      const cache = queryClient.getQueryCache();
      const timelineQueries = cache.findAll({
        queryKey: ['feed'],
      });
      const authorFeedQueries = cache.findAll({
        queryKey: ['author-feed'],
      });

      for (const query of timelineQueries) {
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
                    viewer: {
                      ...post.viewer,
                      like: data?.uri,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }

      for (const query of authorFeedQueries) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<
          {
            post: BSkyPost;
          }[]
        >(query.queryKey, (old) =>
          old?.map(({ post }) => {
            if (post.uri !== uri) {
              return { post };
            }

            return {
              post: {
                ...post,
                viewer: {
                  ...post.viewer,
                  like: data?.uri,
                },
              },
            };
          }),
        );
      }
    },
  });
}
