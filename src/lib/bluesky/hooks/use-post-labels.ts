import { BskyAgent, moderatePost, ModerationOpts } from '@atproto/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BSkyPost } from '../types/bsky-post';

interface PostLabelsConfig {
  agent: BskyAgent;
  post: BSkyPost | null | undefined;
}

export const usePostLabels = ({ agent, post }: PostLabelsConfig) => {
  // Fetch user preferences including moderation settings
  const { data: preferences, isLoading: prefsLoading } = useQuery({
    queryKey: ['preferences', agent.session?.did],
    queryFn: async () => agent.getPreferences(),
    enabled: !!agent.session?.did,
  });

  // Fetch label definitions
  const { data: labelDefs, isLoading: defsLoading } = useQuery({
    queryKey: ['labelDefinitions', preferences?.moderationPrefs],
    queryFn: async () => agent.getLabelDefinitions(preferences!),
    enabled: !!preferences,
  });

  // Create moderation options
  const moderationOpts: ModerationOpts | undefined = useMemo(() => {
    if (!preferences || !labelDefs) return undefined;

    return {
      userDid: agent.session?.did,
      prefs: preferences.moderationPrefs,
      labelDefs,
    };
  }, [agent.session?.did, preferences, labelDefs]);

  // Get moderation UI state
  const moderation = useMemo(() => {
    if (!moderationOpts || !post) return null;

    return moderatePost(post, moderationOpts);
  }, [moderationOpts, post]);

  return {
    moderation,
    isLoading: prefsLoading || defsLoading,
    error: null,
    // Raw data for custom handling
    preferences,
    labelDefs,
  };
};
