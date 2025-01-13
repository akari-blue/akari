import { BskyAgent, moderateProfile, ModerationOpts } from '@atproto/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface ProfileLabelsConfig {
  agent: BskyAgent;
  did: string | null | undefined;
  handle: string | null | undefined;
}

export const useProfileLabels = ({ agent, did, handle }: ProfileLabelsConfig) => {
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
    if (!moderationOpts || !handle || !did) return null;

    return moderateProfile(
      {
        did,
        handle,
      },
      moderationOpts,
    );
  }, [moderationOpts, did, handle]);

  return {
    moderation,
    isLoading: prefsLoading || defsLoading,
    error: null,
    // Raw data for custom handling
    preferences,
    labelDefs,
  };
};
