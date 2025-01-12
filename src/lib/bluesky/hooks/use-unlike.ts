import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { BSkyPost } from '../types/bsky-post';
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
      const infiniteQueries = [...timelineQueries, ...authorFeedQueries];

      for (const query of infiniteQueries) {
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
                if (post.viewer?.like !== uri) {
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

      const postThreadQuery = cache.findAll({
        queryKey: ['post-thread', uri],
      });

      for (const query of postThreadQuery) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          post: BSkyPost;
          parent?: BSkyPost;
          replies: BSkyPost[];
        }>(query.queryKey, (old) => {
          if (!old) return old;
          if (old.post.viewer?.like !== uri) return old;

          return {
            post: {
              ...old.post,
              likeCount: old.post.likeCount - 1,
              viewer: {
                ...old.post.viewer,
                like: undefined,
              },
            },
            parent: old.parent,
            replies: old.replies,
          };
        });
      }

      return {
        previousData: [...infiniteQueries, ...postThreadQuery].map((query) => ({
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
      toast.error('failed to unlike post ' + (error as Error).message);
    },
  });
}
