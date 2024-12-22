import { queryOptions, useQuery } from '@tanstack/react-query';
import { type BlueskyState, useBlueskyStore } from '../store';

type PostThreadQueryOptions = Pick<BlueskyState, 'agent'> & {
  uri?: string;
};

export const postThreadQueryOptions = ({ agent, uri }: PostThreadQueryOptions) =>
  queryOptions({
    queryKey: ['post', { uri }],
    queryFn: async () => {
      if (!agent) throw new Error('Not authenticated');
      if (!uri) throw new Error('No URI provided');

      const response = await agent.api.app.bsky.feed.getPostThread({ uri });
      return response.data.thread;
    },
    enabled: !!agent && !!uri,
  });

export function usePostThread({ uri }: { uri?: string }) {
  const { agent } = useBlueskyStore();

  return useQuery(postThreadQueryOptions({ agent, uri }));
}
