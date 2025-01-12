import { useSettings } from '../../hooks/use-setting';
import { useProfile } from '../../lib/bluesky/hooks/use-profile';

export const Handle = ({ handle }: { handle: string }) => {
  const { experiments } = useSettings();
  const { data: profile } = useProfile({ handle });

  const resolvedHandle = profile?.handle || handle;

  if (experiments.cleanHandles) {
    return <span>{`@${resolvedHandle.replace('.bsky.social', '')}`}</span>;
  }

  return <span className="text-neutral-600 dark:text-neutral-400">{`@${resolvedHandle}`}</span>;
};
