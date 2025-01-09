import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';
import { toast } from 'sonner';
import { BSkyPost } from '../types/BSkyPost';

export function useRepost() {
  const agent = useBlueskyStore((store) => store.agent);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['repost'],
    mutationFn: async ({ uri, cid }: { uri: string; cid: string }) => {
      toast.info('Reposting ' + uri);

      return await agent.repost(uri, cid);
    },
    onMutate: async ({ uri }) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      const previousData = queryClient.getQueryData(['feed']);

      queryClient.setQueryData<{
        pages: {
          feed: {
            post: BSkyPost;
            feedContext: string;
          }[];
          cursor: string;
        }[];
        pageParams: unknown;
      }>(['feed'], (old) => ({
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
                    repost: `at://did:${agent.session?.did}/app.bsky.feed.repost/pending`,
                  },
                },
              };
            }),
          })) ?? [],
        pageParams: old?.pageParams,
      }));

      return { previousData };
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
                      repost: data?.uri,
                    },
                  },
                };
              }),
            })) ?? [],
          pageParams: old?.pageParams,
        }));
      }
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['feed'], context?.previousData);
      toast.error('Failed to repost ' + (error as Error).message);
    },
  });
}
