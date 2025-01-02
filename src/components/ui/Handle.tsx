import { useSettings } from '../../hooks/useSetting';
import { useProfile } from '../../lib/bluesky/hooks/useProfile';

export const Handle = ({ handle }: { handle: string }) => {
  const { experiments } = useSettings();
  const { data: profile } = useProfile({ handle });

  const resolvedHandle = profile?.handle || handle;

  if (experiments.cleanHandles) {
    return <span>{`@${resolvedHandle.replace('.bsky.social', '')}`}</span>;
  }

  return <span className="text-slate-400">{`@${resolvedHandle}`}</span>;
};
