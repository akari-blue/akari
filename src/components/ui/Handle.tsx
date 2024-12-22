import { useSettings } from '../../hooks/useSetting';
import { useProfile } from '../../lib/bluesky/hooks/useProfile';

export const Handle = ({ handle }: { handle: string }) => {
  const experiments = useSettings((state) => state.experiments);
  const { data: profile } = useProfile({ handle });

  const resolvedHandle = profile?.handle || handle;

  if (experiments.cleanHandles) {
    return `@${resolvedHandle.replace('.bsky.social', '')}`;
  }

  return `@${resolvedHandle}`;
};
