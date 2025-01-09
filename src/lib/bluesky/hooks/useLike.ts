import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BSkyPost } from '../types/BSkyPost';

export function useLike() {
  const { agent } = useBlueskyStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['like'],
    mutationFn: async ({ uri, cid }: { uri: string; cid: string }) => {
      return await agent.like(uri, cid);
    },
    onMutate: async ({ uri }) => {
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
                    likeCount: post.likeCount + 1,
                    viewer: {
                      ...post.viewer,
                      like: `at://did:${agent.session?.did}/app.bsky.feed.like/pending`,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }

      const postThreadQuery = cache.findAll({
        queryKey: ['post-thread'],
      });

      for (const query of postThreadQuery) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          post: BSkyPost;
          parent?: BSkyPost;
          replies: BSkyPost[];
        }>(query.queryKey, (old) => {
          if (!old) return old;
          return {
            post:
              old.post.uri === uri
                ? {
                    ...old.post,
                    likeCount: old.post.likeCount + 1,
                    viewer: {
                      ...old.post.viewer,
                      like: `at://did:${agent.session?.did}/app.bsky.feed.like/pending`,
                    },
                  }
                : old.post,
            parent:
              old.parent?.uri === uri
                ? {
                    ...old.parent,
                    likeCount: old.parent.likeCount + 1,
                    viewer: {
                      ...old.parent.viewer,
                      like: `at://did:${agent.session?.did}/app.bsky.feed.like/pending`,
                    },
                  }
                : old.parent,
            replies: old.replies.map((reply) => {
              if (reply.uri !== uri) return reply;

              return {
                ...reply,
                viewer: {
                  ...reply.viewer,
                  like: `at://did:${agent.session?.did}/app.bsky.feed.like/pending`,
                },
              };
            }),
          };
        });
      }

      return {
        previousData: queries.map((query) => ({
          queryKey: query.queryKey,
          state: query.state,
        })),
      };
    },
    onSuccess: async (data, { uri }) => {
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

      const postThreadQuery = cache.findAll({
        queryKey: ['post-thread'],
      });

      for (const query of postThreadQuery) {
        await queryClient.cancelQueries({ queryKey: query.queryKey });

        queryClient.setQueryData<{
          post: BSkyPost;
          parent?: BSkyPost;
          replies: BSkyPost[];
        }>(query.queryKey, (old) => {
          if (!old) return old;
          console.info('old', old);
          return {
            post:
              old.post.uri === uri
                ? {
                    ...old.post,
                    viewer: {
                      ...old.post.viewer,
                      like: data?.uri,
                    },
                  }
                : old.post,
            parent:
              old.parent?.uri === uri
                ? {
                    ...old.parent,
                    viewer: {
                      ...old.parent.viewer,
                      like: data?.uri,
                    },
                  }
                : old.parent,
            replies: old.replies.map((reply) => {
              if (reply.uri !== uri) return reply;

              return {
                ...reply,
                viewer: {
                  ...reply.viewer,
                  like: data?.uri,
                },
              };
            }),
          };
        });
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
