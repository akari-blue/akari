import { BskyAgent } from '@atproto/api';
import { toast } from 'sonner';

const BLUESKY_SERVICE = 'https://bsky.social';

export const createAgent = () => new BskyAgent({ service: BLUESKY_SERVICE });

export const searchProfiles = async (agent: BskyAgent, query: string) => {
  if (query.length < 1) return [];
  
  try {
    const response = await agent.app.bsky.actor.searchActorsTypeahead({
      term: query,
      limit: 5
    });
    return response.data.actors;
  } catch (error) {
    toast.error('Failed to search profiles');
    return [];
  }
};