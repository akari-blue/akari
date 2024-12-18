import { useSettings } from '../../hooks/useSetting';

export const Handle = ({ handle }: { handle: string }) => {
  const { experiments } = useSettings();
  if (experiments.cleanHandles) {
    return `@${handle.replace('.bsky.social', '')}`;
  }

  return `@${handle}`;
};
